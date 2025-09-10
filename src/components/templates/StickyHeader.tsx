import React, { useEffect, useRef, useState, type ReactNode } from 'react';

interface StickyHeaderProps {
  /** ヘッダー内容 */
  children: ReactNode;
}

/**
 * StickyHeader
 * スクロール方向で表示/非表示を切り替えるヘッダーラッパー
 * - ページトップ: 表示
 * - 下スクロール: 非表示
 * - 上スクロール: 表示
 */
const StickyHeader: React.FC<StickyHeaderProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setShow(true); // ページトップ
      } else if (currentY > lastScrollY.current) {
        setShow(false); // 下スクロール
      } else {
        setShow(true); // 上スクロール
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 z-50 w-full transition-transform duration-300
        ease-in-out
        ${show ? 'translate-y-0' : '-translate-y-full'}
      `}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
};

export default StickyHeader;
