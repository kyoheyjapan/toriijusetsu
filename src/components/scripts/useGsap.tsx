import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect } from 'react';

// GSAPにScrollToPluginを登録
gsap.registerPlugin(ScrollToPlugin);

interface UseSmoothScrollOptions {
  /** デスクトップでのスクロールオフセット（px） */
  desktopOffset?: number;
  /** モバイルでのスクロールオフセット（px） */
  mobileOffset?: number;
  /** イベントリスナーを追加するコンテナのセレクタ */
  containerSelector?: string;
}

/**
 * スムーズスクロール機能を提供するカスタムフック
 * @param options - スクロール設定オプション
 */
const useSmoothScroll = ({
  desktopOffset = 0,
  mobileOffset = 0,
  containerSelector = 'body',
}: UseSmoothScrollOptions = {}): void => {
  useEffect(() => {
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.warn(`Container with selector "${containerSelector}" not found`);
      return;
    }

    const handleClick = (e: Event): void => {
      const target = (e.target as Element)?.closest('a[href*="#"]') as HTMLAnchorElement; // href属性が "#" を含む <a> タグをさがす
      if (!target) return; // クリックされた要素が <a> タグでなければ何もしない

      e.preventDefault();
      const href = target.getAttribute('href');
      if (!href) return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const currentOffset = window.innerWidth >= 768 ? desktopOffset : mobileOffset;
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement.offsetTop - currentOffset,
            autoKill: false,
          },
          ease: 'power2',
        });
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [desktopOffset, mobileOffset, containerSelector]);
};

export default useSmoothScroll;
