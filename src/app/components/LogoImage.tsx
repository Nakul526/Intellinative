import { useTheme } from '../../context/ThemeContext';
import logoWhite from '../../assets/IntelliNative-White.png';
import logoDark from '../../assets/IntelliNative-Dark.png';

// Both logo PNGs are 1024×1024. Content occupies (140,254)–(890,690).
// Add 10px padding on each side so no edge pixels are clipped.
const IMG_SIZE = 1024;
const PAD_X = 30;
const PAD_Y = 12;
const CX1 = 140 - PAD_X, CY1 = 254 - PAD_Y, CX2 = 890 + PAD_X, CY2 = 690 + PAD_Y;
const CONTENT_W = CX2 - CX1; // 810
const CONTENT_H = CY2 - CY1; // 460

interface LogoImageProps {
  /** Desired rendered height of the logo content in px */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LogoImage({ height = 36, className, style }: LogoImageProps) {
  const { isDark } = useTheme();
  const scale = height / CONTENT_H;
  const displaySize = IMG_SIZE * scale;
  const containerWidth = CONTENT_W * scale;

  return (
    <div
      className={className}
      style={{
        height,
        width: containerWidth,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={isDark ? logoWhite : logoDark}
        alt="IntelliNative"
        style={{
          position: 'absolute',
          height: displaySize,
          width: displaySize,
          top: -(CY1 * scale),
          left: -(CX1 * scale),
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
