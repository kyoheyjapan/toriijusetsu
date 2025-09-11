import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loader from '../atoms/Loader.tsx';

/**
 * ローディングアニメーションコンポーネント
 * Layout.astroのスクリプトと連携してローディング制御を行います
 */
const LoadingAnimation: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Layout.astroのスクリプトと連携してローディング制御
    const handleLoad = (): void => {
      setTimeout(() => {
        setLoading(false);
        // bodyのloadingクラスを削除（Layout.astroのスクリプトと連携）
        document.body.classList.remove('loading');
      }, 1500);
    };

    // DOMContentLoadedイベントを待つ
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleLoad);
    } else {
      handleLoad();
    }

    // 保険としてwindow.loadイベントも監視
    const handleWindowLoad = (): void => {
      setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading');
      }, 2500);
    };

    window.addEventListener('load', handleWindowLoad);

    return () => {
      document.removeEventListener('DOMContentLoaded', handleLoad);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  // フェードアウトのアニメーション設定
  const fadeVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.35 } },
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          variants={fadeVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          <div
            className={`
              fixed top-0 left-0 z-50 flex size-full flex-col items-center
              justify-center gap-2 bg-[#171D5D]
            `}
          >
            <Loader className="relative z-10" />
            <div
              className={`
                noise-bg absolute inset-0 z-0 size-full mix-blend-overlay
              `}
            ></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
