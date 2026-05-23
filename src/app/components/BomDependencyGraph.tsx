/**
 * BomDependencyGraph — Graph View + Tree View tabs
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Search, X, ChevronRight, Shield,
  AlertTriangle, Info, CheckCircle2, ChevronDown,
} from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────────── */
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

interface Component {
  id: string; name: string; type: string; severity: Severity; version?: string;
}
interface DependencyPath {
  name: string; tag: 'ROOT' | 'HIGH' | 'CRITICAL' | 'TARGET' | null;
}
interface TreeNode {
  id: string; name: string; severity: Severity; version?: string;
  children?: TreeNode[];
}

/* ─── Data ────────────────────────────────────────────────────── */
const SEVERITY_CONFIG: Record<Severity, {
  color: string; bg: string; border: string; label: string; count: number; pct: string;
}> = {
  CRITICAL: { color: '#E53935', bg: '#FDECEC', border: 'rgba(229,57,53,0.3)',  label: 'CRITICAL', count: 50,   pct: '2%'  },
  HIGH:     { color: '#EF6C00', bg: '#FFF3E0', border: 'rgba(239,108,0,0.3)',  label: 'HIGH',     count: 60,   pct: '3%'  },
  MEDIUM:   { color: '#F59E0B', bg: '#FEF4E0', border: 'rgba(245,158,11,0.3)', label: 'MEDIUM',   count: 202,  pct: '9%'  },
  LOW:      { color: '#00B1DC', bg: '#E6F7FC', border: 'rgba(0,177,220,0.3)',  label: 'LOW',      count: 42,   pct: '2%'  },
  NONE:     { color: '#10B981', bg: '#E6F8F2', border: 'rgba(16,185,129,0.3)', label: 'NONE',     count: 1830, pct: '84%' },
};

const TOTAL   = 2184;
const PROJECT = 'acme-db-01';

const COMPONENTS: Component[] = [
  { id: 'c1', name: 'google.golang.org/grpc', type: 'library', severity: 'CRITICAL' },
  { id: 'c2', name: 'stdlib',                  type: 'library', severity: 'CRITICAL' },
  { id: 'c3', name: 'crypto/tls',              type: 'library', severity: 'CRITICAL' },
  { id: 'c4', name: 'net/http',                type: 'library', severity: 'CRITICAL' },
  { id: 'c5', name: 'encoding/json',           type: 'library', severity: 'CRITICAL' },
  { id: 'c6', name: 'golang.org/x/crypto',     type: 'library', severity: 'CRITICAL' },
  { id: 'c7', name: 'google.golang.org/protobuf', type: 'library', severity: 'CRITICAL' },
  { id: 'h1', name: 'github.com/anchore/grype', type: 'library', severity: 'HIGH' },
  { id: 'h2', name: 'golang.org/x/net',          type: 'library', severity: 'HIGH' },
  { id: 'h3', name: 'github.com/docker/cli',      type: 'library', severity: 'HIGH' },
  { id: 'm1', name: 'gopkg.in/yaml.v3',           type: 'library', severity: 'MEDIUM' },
  { id: 'm2', name: 'github.com/spf13/cobra',     type: 'library', severity: 'MEDIUM' },
  { id: 'l1', name: 'github.com/google/uuid',     type: 'library', severity: 'LOW' },
];

const DEPENDENCY_PATH: DependencyPath[] = [
  { name: PROJECT,                    tag: 'ROOT' },
  { name: 'github.com/anchore/grype', tag: 'HIGH' },
  { name: 'google.golang.org/grpc',   tag: 'CRITICAL' },
];

/* ─── Tree data ────────────────────────────────────────────────── */
const TREE_DATA: TreeNode = {
  id: 'root', name: PROJECT, severity: 'NONE', version: 'v2.4.1',
  children: [
    {
      id: 't1', name: 'google.golang.org/grpc', severity: 'CRITICAL', version: 'v1.53.0',
      children: [
        { id: 't1a', name: 'golang.org/x/crypto',      severity: 'CRITICAL', version: 'v0.5.0' },
        { id: 't1b', name: 'golang.org/x/net',          severity: 'HIGH',     version: 'v0.7.0' },
        { id: 't1c', name: 'google.golang.org/protobuf', severity: 'CRITICAL', version: 'v1.28.1' },
      ],
    },
    {
      id: 't2', name: 'github.com/anchore/grype', severity: 'HIGH', version: 'v0.65.1',
      children: [
        { id: 't2a', name: 'github.com/docker/cli', severity: 'HIGH',   version: 'v23.0.1' },
        { id: 't2b', name: 'gopkg.in/yaml.v3',      severity: 'MEDIUM', version: 'v3.0.1' },
      ],
    },
    {
      id: 't3', name: 'github.com/spf13/cobra', severity: 'MEDIUM', version: 'v1.7.0',
      children: [
        { id: 't3a', name: 'github.com/google/uuid', severity: 'LOW',  version: 'v1.3.0' },
        { id: 't3b', name: 'github.com/spf13/pflag', severity: 'NONE', version: 'v1.0.5' },
      ],
    },
    {
      id: 't4', name: 'encoding/json', severity: 'CRITICAL', version: 'go1.20',
    },
    {
      id: 't5', name: 'net/http', severity: 'CRITICAL', version: 'go1.20',
    },
    {
      id: 't6', name: '+ 1,825 clean dependencies', severity: 'NONE',
    },
  ],
};

/* ─── Bubble layout — spread out positions ─────────────────────── */
interface BubbleLayout { id: Severity; cx: number; cy: number; r: number }
const BUBBLES: BubbleLayout[] = [
  { id: 'CRITICAL', cx: 160, cy: 110, r: 52  },
  { id: 'NONE',     cx: 130, cy: 320, r: 100 },
  { id: 'HIGH',     cx: 360, cy: 320, r: 55  },
  { id: 'MEDIUM',   cx: 440, cy: 175, r: 72  },
  { id: 'LOW',      cx: 385, cy: 445, r: 40  },
];
const HUB = { cx: 268, cy: 240, r: 38 };

const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  ROOT:     { bg: '#E6F7FC', color: '#007AA6' },
  HIGH:     { bg: '#FFF3E0', color: '#EF6C00' },
  CRITICAL: { bg: '#FDECEC', color: '#E53935' },
  TARGET:   { bg: '#E6F7FC', color: '#007AA6' },
};

function SevIcon({ sev }: { sev: Severity }) {
  const Icon = sev === 'CRITICAL' || sev === 'HIGH' ? AlertTriangle
             : sev === 'MEDIUM' || sev === 'LOW'   ? Info
             : CheckCircle2;
  return <Icon className="w-3 h-3" style={{ color: SEVERITY_CONFIG[sev].color }} />;
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function BomDependencyGraph() {
  const [activeTab, setActiveTab]     = useState<'graph' | 'tree'>('graph');
  const [view, setView]               = useState<'overview' | 'cluster' | 'detail'>('overview');
  const [activeSev, setActiveSev]     = useState<Severity | null>(null);
  const [activeComp, setActiveComp]   = useState<Component | null>(null);
  const [search, setSearch]           = useState('');
  const searchRef                     = useRef<HTMLInputElement>(null);

  function openCluster(sev: Severity) {
    setActiveSev(sev); setSearch(''); setView('cluster');
    setTimeout(() => searchRef.current?.focus(), 100);
  }
  function openDetail(comp: Component) { setActiveComp(comp); setView('detail'); }
  function goBack() {
    if (view === 'detail') { setView('cluster'); setActiveComp(null); }
    else { setView('overview'); setActiveSev(null); }
  }

  const filteredComps = activeSev
    ? COMPONENTS.filter(c => c.severity === activeSev && c.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--p3)', boxShadow: 'var(--sh-md)', background: 'var(--p0)' }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--p3)', background: 'var(--p1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}>
            <Shield className="w-4 h-4" style={{ color: 'var(--c5)' }} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: 'var(--ink-950)' }}>Dependency Graph</div>
            <div className="text-[11px]" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
              {PROJECT} · {TOTAL.toLocaleString()} components · 0 vulnerable
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as Severity[]).map(s => {
            const cfg = SEVERITY_CONFIG[s];
            return (
              <div key={s} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="text-[11px] font-medium" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                  {cfg.count} {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-0 px-5 pt-3 pb-0"
        style={{ borderBottom: '1px solid var(--p3)' }}>
        {[
          { key: 'graph', label: 'Graph View', icon: (
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="2.5" />
              <line x1="2" y1="8" x2="5.5" y2="8" /><line x1="10.5" y1="8" x2="14" y2="8" />
              <line x1="8" y1="2" x2="8" y2="5.5" /><line x1="8" y1="10.5" x2="8" y2="14" />
            </svg>
          )},
          { key: 'tree', label: 'Tree View', icon: (
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="4" x2="13" y2="4" />
              <line x1="3" y1="8" x2="13" y2="8" />
              <line x1="3" y1="12" x2="13" y2="12" />
            </svg>
          )},
        ].map(tab => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'graph' | 'tree')}
              className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors"
              style={{
                color: active ? 'var(--c5)' : 'var(--ink-500)',
                borderBottom: active ? '2px solid var(--c5)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Body ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'graph' ? (
          <motion.div
            key="graph-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
            style={{ minHeight: 480 }}
          >
            {/* Left: bubble chart */}
            <div className="flex-1 relative" style={{ background: '#F8FAFB', minWidth: 0 }}>
              <BubbleChart activeSev={activeSev} onClickBubble={openCluster} />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-center"
                style={{ color: 'var(--ink-500)' }}>
                Click a severity cluster to inspect its components
              </div>
            </div>

            {/* Right: overview / cluster / detail panel */}
            <div className="flex-shrink-0"
              style={{ width: 340, borderLeft: '1px solid var(--p3)', background: 'var(--p0)' }}>
              <AnimatePresence mode="wait">
                {view === 'overview' && (
                  <motion.div key="ov" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="h-full flex flex-col">
                    <OverviewPanel onClickSeverity={openCluster} />
                  </motion.div>
                )}
                {view === 'cluster' && activeSev && (
                  <motion.div key="cl" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="h-full flex flex-col">
                    <ClusterPanel
                      severity={activeSev} components={filteredComps}
                      allComponents={COMPONENTS.filter(c => c.severity === activeSev)}
                      search={search} onSearch={setSearch} onBack={goBack}
                      onClickComp={openDetail} searchRef={searchRef}
                    />
                  </motion.div>
                )}
                {view === 'detail' && activeComp && (
                  <motion.div key="dt" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="h-full flex flex-col">
                    <DetailPanel comp={activeComp} onBack={goBack} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tree-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <TreeViewPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Bubble Chart SVG ────────────────────────────────────────── */
function BubbleChart({ activeSev, onClickBubble }: {
  activeSev: Severity | null; onClickBubble: (s: Severity) => void;
}) {
  return (
    <svg viewBox="0 0 570 510" className="w-full h-full" style={{ maxHeight: 450 }}>
      {/* Hub lines */}
      {BUBBLES.map(b => (
        <line key={b.id}
          x1={HUB.cx} y1={HUB.cy} x2={b.cx} y2={b.cy}
          stroke={SEVERITY_CONFIG[b.id].color} strokeWidth={1}
          strokeOpacity={activeSev && activeSev !== b.id ? 0.08 : 0.22}
          strokeDasharray="4 3"
        />
      ))}

      {/* Hub */}
      <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r}
        fill="white" stroke="var(--c5)" strokeWidth={1.5}
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,177,220,0.2))' }}
      />
      <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 8}
        fill="none" stroke="var(--c5)" strokeWidth={0.7} strokeOpacity={0.2}>
        <animate attributeName="r" values={`${HUB.r + 8};${HUB.r + 18};${HUB.r + 8}`} dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x={HUB.cx} y={HUB.cy - 6} textAnchor="middle" fontSize={9} fontWeight="700" fill="#0E1A2E" fontFamily="Inter">
        {PROJECT.split('-').slice(0, 2).join('-')}
      </text>
      <text x={HUB.cx} y={HUB.cy + 8} textAnchor="middle" fontSize={7.5} fill="#6B7589" fontFamily="JetBrains Mono, monospace">
        {TOTAL.toLocaleString()} comp.
      </text>

      {/* Severity bubbles */}
      {BUBBLES.map(b => {
        const cfg = SEVERITY_CONFIG[b.id];
        const isActive = activeSev === b.id;
        const isDimmed = activeSev !== null && !isActive;
        return (
          <g key={b.id} style={{ cursor: 'pointer' }} onClick={() => onClickBubble(b.id)}>
            {isActive && (
              <circle cx={b.cx} cy={b.cy} r={b.r + 10}
                fill="none" stroke={cfg.color} strokeWidth={1.5} strokeOpacity={0.4}>
                <animate attributeName="r" values={`${b.r + 8};${b.r + 22};${b.r + 8}`} dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={b.cx} cy={b.cy} r={b.r}
              fill={cfg.bg} stroke={cfg.color}
              strokeWidth={isActive ? 2 : 1.5}
              strokeOpacity={isDimmed ? 0.25 : 0.7}
              fillOpacity={isDimmed ? 0.35 : 1}
              style={{ transition: 'all 0.2s', filter: isActive ? `drop-shadow(0 4px 16px ${cfg.color}55)` : 'none' }}
            />
            <text x={b.cx} y={b.cy - b.r * 0.18}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={b.r * 0.22} fontWeight="600" fill={cfg.color}
              fontFamily="JetBrains Mono, monospace"
              fillOpacity={isDimmed ? 0.35 : 0.8}
              style={{ letterSpacing: '0.04em' }}>
              {cfg.label}
            </text>
            <text x={b.cx} y={b.cy + b.r * 0.24}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={b.r * 0.42} fontWeight="700" fill={cfg.color}
              fontFamily="Inter, system-ui" fillOpacity={isDimmed ? 0.35 : 1}
              style={{ letterSpacing: '-0.04em' }}>
              {cfg.count >= 1000 ? `${(cfg.count / 1000).toFixed(1)}k` : cfg.count}
            </text>
            <text x={b.cx} y={b.cy + b.r * 0.65}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={b.r * 0.18} fontWeight="500" fill={cfg.color}
              fontFamily="Inter, system-ui" fillOpacity={isDimmed ? 0.25 : 0.55}>
              {cfg.pct}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Tree View Panel ─────────────────────────────────────────── */
function TreeViewPanel() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root', 't1', 't2']));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterSev, setFilterSev] = useState<Severity | 'ALL'>('ALL');

  function toggle(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function renderNode(node: TreeNode, depth: number, isLast: boolean, parentLines: boolean[]) {
    const cfg = SEVERITY_CONFIG[node.severity];
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isOpen = expanded.has(node.id);
    const isSelected = selectedId === node.id;
    const dimmed = filterSev !== 'ALL' && node.severity !== filterSev && node.id !== 'root';

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-0 group cursor-pointer select-none"
          style={{
            background: isSelected ? cfg.bg : 'transparent',
            opacity: dimmed ? 0.35 : 1,
            transition: 'background 0.15s, opacity 0.15s',
          }}
          onClick={() => { setSelectedId(node.id === selectedId ? null : node.id); }}
          onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--p1)'; }}
          onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          {/* Indent lines */}
          {Array.from({ length: depth }).map((_, i) => (
            <div key={i} className="flex-shrink-0 flex justify-center" style={{ width: 24 }}>
              <div style={{
                width: 1, height: '100%', minHeight: 36,
                background: parentLines[i] ? 'var(--p3)' : 'transparent',
              }} />
            </div>
          ))}

          {/* Branch connector */}
          {depth > 0 && (
            <div className="flex-shrink-0 flex items-center" style={{ width: 24 }}>
              <div style={{ width: 10, height: 1, background: 'var(--p3)' }} />
            </div>
          )}

          {/* Expand toggle */}
          <div className="flex-shrink-0 w-5 h-9 flex items-center justify-center">
            {hasChildren ? (
              <button
                onClick={e => { e.stopPropagation(); toggle(node.id); }}
                className="w-4 h-4 rounded flex items-center justify-center transition-colors"
                style={{ background: isOpen ? 'var(--p2)' : 'transparent' }}
              >
                <ChevronDown
                  className="w-3 h-3 transition-transform duration-200"
                  style={{ color: 'var(--ink-500)', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                />
              </button>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--p3)' }} />
            )}
          </div>

          {/* Severity dot */}
          <div className="w-2 h-2 rounded-full flex-shrink-0 mr-2"
            style={{ background: cfg.color }} />

          {/* Name */}
          <span className="text-[13px] flex-1 py-2.5 pr-2 truncate"
            style={{
              color: isSelected ? cfg.color : 'var(--ink-950)',
              fontFamily: node.id === 'root' ? 'var(--f-d)' : 'var(--f-m)',
              fontWeight: node.id === 'root' ? 700 : 500,
            }}>
            {node.name}
          </span>

          {/* Version + severity badge */}
          <div className="flex items-center gap-2 pr-4 flex-shrink-0">
            {node.version && (
              <span className="text-[10px]" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
                {node.version}
              </span>
            )}
            {node.severity !== 'NONE' && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: cfg.bg, color: cfg.color, fontFamily: 'var(--f-m)', border: `1px solid ${cfg.border}` }}>
                {node.severity}
              </span>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isOpen && (
          <div>
            {node.children!.map((child, i) =>
              renderNode(
                child, depth + 1, i === node.children!.length - 1,
                [...parentLines, i < node.children!.length - 1],
              )
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex" style={{ minHeight: 480 }}>
      {/* Tree */}
      <div className="flex-1 flex flex-col" style={{ background: '#F8FAFB', minWidth: 0 }}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3"
          style={{ borderBottom: '1px solid var(--p3)', background: 'var(--p0)' }}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
            Filter:
          </span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(s => {
            const active = filterSev === s;
            const color = s === 'ALL' ? 'var(--c5)' : SEVERITY_CONFIG[s].color;
            const bg    = s === 'ALL' ? 'var(--c1)' : SEVERITY_CONFIG[s].bg;
            return (
              <button key={s}
                onClick={() => setFilterSev(s)}
                className="text-[10px] font-bold px-2 py-0.5 rounded transition-all"
                style={{
                  background: active ? bg : 'transparent',
                  color: active ? color : 'var(--ink-500)',
                  border: `1px solid ${active ? color : 'var(--p3)'}`,
                  fontFamily: 'var(--f-m)',
                }}>
                {s}
              </button>
            );
          })}
          <div className="flex-1" />
          <button
            onClick={() => setExpanded(new Set(['root', 't1', 't2', 't3', 't4', 't5', 't6']))}
            className="text-[11px] font-medium"
            style={{ color: 'var(--c5)' }}>
            Expand all
          </button>
          <span style={{ color: 'var(--p3)' }}>·</span>
          <button
            onClick={() => setExpanded(new Set(['root']))}
            className="text-[11px] font-medium"
            style={{ color: 'var(--ink-500)' }}>
            Collapse
          </button>
        </div>

        {/* Tree nodes */}
        <div className="flex-1 overflow-y-auto py-2">
          {renderNode(TREE_DATA, 0, true, [])}
        </div>

        <div className="px-5 py-2.5 text-[11px]"
          style={{ borderTop: '1px solid var(--p3)', color: 'var(--ink-500)', background: 'var(--p0)' }}>
          {TOTAL.toLocaleString()} total · Click a row to inspect · Click ▸ to expand
        </div>
      </div>

      {/* Right: details panel */}
      <div className="flex-shrink-0"
        style={{ width: 300, borderLeft: '1px solid var(--p3)', background: 'var(--p0)' }}>
        <AnimatePresence mode="wait">
          {selectedId ? (
            (() => {
              const flat = flattenTree(TREE_DATA);
              const node = flat.find(n => n.id === selectedId);
              if (!node) return null;
              const cfg = SEVERITY_CONFIG[node.severity];
              return (
                <motion.div key={selectedId}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="h-full flex flex-col">
                  <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--p3)', background: cfg.bg }}>
                    <div className="text-[13px] font-bold break-all mb-1.5"
                      style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>
                      {node.name}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontFamily: 'var(--f-m)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                      {node.severity}
                    </span>
                  </div>
                  <div className="px-5 py-4 space-y-3 flex-1">
                    {[
                      { label: 'VERSION',  value: node.version || 'N/A' },
                      { label: 'TYPE',     value: 'library' },
                      { label: 'CHILDREN', value: `${node.children?.length ?? 0} direct` },
                      { label: 'SEVERITY', value: node.severity },
                    ].map(row => (
                      <div key={row.label}>
                        <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                          style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
                          {row.label}
                        </div>
                        <div className="text-[13px] font-medium"
                          style={{ color: row.label === 'SEVERITY' ? cfg.color : 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>
                          {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })()
          ) : (
            <motion.div key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="h-full flex flex-col items-center justify-center px-6 text-center">
              <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: 'var(--p2)', border: '1px solid var(--p3)' }}>
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--ink-400)' }} />
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: 'var(--ink-950)' }}>
                Select a node
              </div>
              <div className="text-[12px]" style={{ color: 'var(--ink-500)' }}>
                Click any dependency in the tree to inspect its details.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function flattenTree(node: TreeNode): TreeNode[] {
  return [node, ...(node.children?.flatMap(flattenTree) ?? [])];
}

/* ─── Overview Panel ─────────────────────────────────────────── */
function OverviewPanel({ onClickSeverity }: { onClickSeverity: (s: Severity) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--p3)' }}>
        <div className="text-[15px] font-semibold mb-1" style={{ color: 'var(--ink-950)' }}>
          Component Overview
        </div>
        <div className="text-[12px]" style={{ color: 'var(--ink-500)' }}>
          {TOTAL.toLocaleString()} components grouped by vulnerability severity. Select a cluster to explore.
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3">
        {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NONE'] as Severity[]).map(sev => {
          const cfg = SEVERITY_CONFIG[sev];
          return (
            <motion.button key={sev} whileHover={{ x: 2 }} onClick={() => onClickSeverity(sev)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors"
              style={{ borderBottom: '1px solid var(--p3)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = cfg.bg)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>
                  {cfg.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold tabular-nums" style={{ color: cfg.color }}>
                  {cfg.count >= 1000 ? `${(cfg.count / 1000).toFixed(1)}k` : cfg.count}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--ink-500)' }}>{cfg.pct}</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--ink-500)' }} />
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--p3)', background: 'var(--p1)' }}>
        <div className="text-[11px] font-semibold mb-2" style={{ color: 'var(--c6)' }}>How to explore</div>
        <ul className="space-y-1">
          {[
            'Click a severity cluster to list its components',
            'Click any component to view its dependency chain',
            'Switch to Tree View for path-tracing and export',
          ].map(tip => (
            <li key={tip} className="text-[11px]" style={{ color: 'var(--ink-500)' }}>· {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Cluster Panel ──────────────────────────────────────────── */
function ClusterPanel({ severity, components, allComponents, search, onSearch, onBack, onClickComp, searchRef }: {
  severity: Severity; components: Component[]; allComponents: Component[];
  search: string; onSearch: (v: string) => void; onBack: () => void;
  onClickComp: (c: Component) => void; searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  const cfg = SEVERITY_CONFIG[severity];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid var(--p3)' }}>
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] font-medium"
          style={{ color: 'var(--ink-500)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-950)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-500)')}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>
      <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--p3)', background: cfg.bg }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ background: cfg.color }} />
          <span className="text-[15px] font-bold" style={{ color: cfg.color, fontFamily: 'var(--f-m)' }}>
            {cfg.label} {cfg.count}
          </span>
        </div>
        <div className="text-[11px]" style={{ color: 'var(--ink-500)' }}>{cfg.pct} of {TOTAL.toLocaleString()} total</div>
      </div>
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--p3)' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--p2)', border: '1px solid var(--p3)' }}>
          <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ink-500)' }} />
          <input ref={searchRef as React.RefObject<HTMLInputElement>} value={search}
            onChange={e => onSearch(e.target.value)} placeholder="Filter components…"
            className="flex-1 text-[13px] outline-none bg-transparent" style={{ color: 'var(--ink-950)' }} />
          {search && <button onClick={() => onSearch('')}><X className="w-3.5 h-3.5" style={{ color: 'var(--ink-500)' }} /></button>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {components.length === 0 ? (
          <div className="px-5 py-8 text-center text-[13px]" style={{ color: 'var(--ink-500)' }}>
            No components match &ldquo;{search}&rdquo;
          </div>
        ) : components.map(comp => (
          <motion.button key={comp.id} whileHover={{ x: 2 }} onClick={() => onClickComp(comp)}
            className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors"
            style={{ borderBottom: '1px solid var(--p3)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--p1)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
              <div className="min-w-0">
                <div className="text-[13px] font-medium truncate" style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>{comp.name}</div>
                <div className="text-[11px]" style={{ color: 'var(--ink-500)' }}>{comp.type}</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ink-500)' }} />
          </motion.button>
        ))}
        {components.length < allComponents.length && (
          <div className="px-5 py-3 text-[11px]" style={{ color: 'var(--ink-500)' }}>
            Showing {components.length} of {allComponents.length}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Detail Panel ───────────────────────────────────────────── */
function DetailPanel({ comp, onBack }: { comp: Component; onBack: () => void }) {
  const cfg = SEVERITY_CONFIG[comp.severity];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid var(--p3)' }}>
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] font-medium"
          style={{ color: 'var(--ink-500)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-950)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-500)')}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <button onClick={onBack}><X className="w-4 h-4" style={{ color: 'var(--ink-500)' }} /></button>
      </div>
      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <div className="text-[14px] font-semibold mb-2 break-all"
          style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>{comp.name}</div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold mb-6"
          style={{ background: cfg.bg, color: cfg.color, fontFamily: 'var(--f-m)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
          {comp.severity}
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>Dependency Path from Root</div>
        <div className="space-y-2">
          {DEPENDENCY_PATH.map((node, i) => {
            const isTarget = i === DEPENDENCY_PATH.length - 1;
            const tagCfg = node.tag ? TAG_STYLE[node.tag] : null;
            const nodeCfg = isTarget ? cfg : null;
            return (
              <div key={i}>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                  style={{ background: isTarget ? cfg.bg : 'var(--p1)', border: `1px solid ${isTarget ? cfg.border : 'var(--p3)'}` }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: nodeCfg ? nodeCfg.color : 'var(--c5)' }} />
                    <span className="text-[12px] font-medium truncate"
                      style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>{node.name}</span>
                  </div>
                  {tagCfg && node.tag && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ml-2 flex-shrink-0"
                      style={{ background: tagCfg.bg, color: tagCfg.color }}>{node.tag}</span>
                  )}
                </div>
                {i < DEPENDENCY_PATH.length - 1 && (
                  <div className="flex justify-start pl-4 py-0.5">
                    <span style={{ color: 'var(--ink-500)', fontSize: 16 }}>↓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 px-3 py-2 rounded-lg text-[12px]"
          style={{ background: 'var(--p1)', border: '1px solid var(--p3)', color: 'var(--ink-500)' }}>
          Path depth: <strong style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>
            {DEPENDENCY_PATH.length - 1} hops
          </strong> from root
        </div>
        <div className="mt-5">
          <div className="text-[11px] font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>Details</div>
          <table className="w-full text-[12px]">
            <tbody>
              <tr>
                <td className="py-1.5 pr-3" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)', textTransform: 'uppercase', fontSize: 10 }}>TYPE</td>
                <td className="py-1.5 font-medium" style={{ color: 'var(--ink-950)' }}>{comp.type}</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)', textTransform: 'uppercase', fontSize: 10 }}>SEVERITY</td>
                <td className="py-1.5"><span className="font-semibold" style={{ color: cfg.color, fontFamily: 'var(--f-m)' }}>{comp.severity}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
