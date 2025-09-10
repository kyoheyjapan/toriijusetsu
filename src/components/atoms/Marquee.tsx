// MarqueeWrapper.tsx
import { useEffect, useState, type ReactNode } from 'react';

interface MarqueeWrapperProps {
  /** 子要素 */
  children: ReactNode;
  /** react-fast-marqueeに渡す追加のプロパティ */
  [key: string]: any;
}

const MarqueeWrapper: React.FC<MarqueeWrapperProps> = ({ children, ...props }) => {
  const [MarqueeComponent, setMarqueeComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // クライアントサイドでのみインポート
    import('react-fast-marquee').then((module) => {
      setMarqueeComponent(() => module.default);
    });
  }, []);

  if (!MarqueeComponent) return <div>{children}</div>;

  return <MarqueeComponent {...props}>{children}</MarqueeComponent>;
};

export default MarqueeWrapper;
