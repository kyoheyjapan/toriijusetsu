import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useRef, useState } from 'react';

// Arrowコンポーネント
function Arrow(props) {
  const disabled = props.disabled ? ' opacity-30 cursor-not-allowed' : '';
  return (
    <>
      {props.left && (
        <svg
          onClick={props.onClick}
          aria-hidden="true"
          aria-label="ページトップ・矢印"
          viewBox="0 0 64 32"
          className="absolute top-1/2 right-2 z-10 -mt-4 aspect-[2/1] h-8 w-8 rotate-90 cursor-pointer fill-white opacity-0 drop-shadow-lg transition-all duration-300 group-hover:opacity-80 hover:scale-110 hover:fill-blue-500"
          role="img"
        >
          <path d="M32 0H31V1H30V2H29V3H28V4H27V5H26V6H25V7H24V8H23V9H22V10H21V11H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H11V21H10V22H9V23H8V24H7V25H6V26H5V27H4V28H3V29H2V30H1V31H0V32H1H2V31H3V30H4V29H5V28H6V27H7V26H8V25H9V24H10V23H11V22H12V21H13V20H14V19H15V18H16V17H17V16H18V15H19V14H20V13H21V12H22V11H23V10H24V9H25V8H26V7H27V6H28V5H29V4H30V3H31V2H32H33V3H34V4H35V5H36V6H37V7H38V8H39V9H40V10H41V11H42V12H43V13H44V14H45V15H46V16H47V17H48V18H49V19H50V20H51V21H52V22H53V23H54V24H55V25H56V26H57V27H58V28H59V29H60V30H61V31H62V32H63H64V31H63V30H62V29H61V28H60V27H59V26H58V25H57V24H56V23H55V22H54V21H53V20H52V19H51V18H50V17H49V16H48V15H47V14H46V13H45V12H44V11H43V10H42V9H41V8H40V7H39V6H38V5H37V4H36V3H35V2H34V1H33V0H32Z" />
        </svg>
      )}
      {!props.left && (
        <svg
          onClick={props.onClick}
          aria-hidden="true"
          aria-label="ページトップ・矢印"
          viewBox="0 0 64 32"
          className="absolute top-1/2 left-2 z-10 -mt-4 aspect-[2/1] h-8 w-8 -rotate-90 cursor-pointer fill-white opacity-0 drop-shadow-lg transition-all duration-300 group-hover:opacity-80 hover:scale-110 hover:fill-blue-500"
          role="img"
        >
          <path d="M32 0H31V1H30V2H29V3H28V4H27V5H26V6H25V7H24V8H23V9H22V10H21V11H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H11V21H10V22H9V23H8V24H7V25H6V26H5V27H4V28H3V29H2V30H1V31H0V32H1H2V31H3V30H4V29H5V28H6V27H7V26H8V25H9V24H10V23H11V22H12V21H13V20H14V19H15V18H16V17H17V16H18V15H19V14H20V13H21V12H22V11H23V10H24V9H25V8H26V7H27V6H28V5H29V4H30V3H31V2H32H33V3H34V4H35V5H36V6H37V7H38V8H39V9H40V10H41V11H42V12H43V13H44V14H45V15H46V16H47V17H48V18H49V19H50V20H51V21H52V22H53V23H54V24H55V25H56V26H57V27H58V28H59V29H60V30H61V31H62V32H63H64V31H63V30H62V29H61V28H60V27H59V26H58V25H57V24H56V23H55V22H54V21H53V20H52V19H51V18H50V17H49V16H48V15H47V14H46V13H45V12H44V11H43V10H42V9H41V8H40V7H39V6H38V5H37V4H36V3H35V2H34V1H33V0H32Z" />
        </svg>
      )}
    </>
  );
}
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-40');
        slide.style.borderColor = 'transparent';
      });
    }

    function addActive(idx) {
      if (slider.slides[idx]) {
        slider.slides[idx].classList.add('active');
        slider.slides[idx].classList.remove('opacity-40');
        slider.slides[idx].classList.add('opacity-100');
        slider.slides[idx].style.borderColor = '#3b82f6'; // Tailwind の blue-500 に相当
      }
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;

      // 初期状態で最初のスライドをアクティブに
      addActive(slider.track.details.rel);
      addClickEvents();

      // メインスライダーのアニメーション開始時の処理
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        const relIdx = main.track.absToRel(next);
        addActive(relIdx);

        // サムネイルスライダーの範囲内に収まるようにインデックスを調整
        const adjustedIdx = Math.min(slider.track.details.maxIdx, Math.max(0, relIdx));

        // サムネイルを移動（ループ時にも正しく動作するよう調整）
        slider.moveToIdx(adjustedIdx);
      });
    });

    // メインスライダーのスライド変更時の処理を追加
    mainRef.current?.on('slideChanged', (main) => {
      const currentIdx = main.track.details.rel;
      removeActive();
      addActive(currentIdx);

      // サムネイルの位置を同期（インデックスが範囲内かチェック）
      if (currentIdx >= 0 && currentIdx <= slider.track.details.maxIdx) {
        slider.moveToIdx(currentIdx);
      }
    });
  };
}
// ファイルが動画かどうかを判定する関数
const isVideoFile = (src) => {
  if (typeof src === 'string') {
    return (
      src.toLowerCase().endsWith('.mov') ||
      src.toLowerCase().endsWith('.mp4') ||
      src.toLowerCase().endsWith('.webm')
    );
  }
  // オブジェクトの場合はpcまたはspのパスをチェック
  const path = src.pc || src.sp;
  return (
    path.toLowerCase().endsWith('.mov') ||
    path.toLowerCase().endsWith('.mp4') ||
    path.toLowerCase().endsWith('.webm')
  );
};
// ビデオタイプを判定する関数
const getVideoType = (src) => {
  const path = typeof src === 'string' ? src : src.pc || src.sp;
  const extension = path.toLowerCase().split('.').pop();
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'mov':
      return 'video/quicktime';
    default:
      return 'video/mp4';
  }
};
const SliderReact = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [opacities, setOpacities] = useState([]);
  const videoRefs = useRef([]);
  const previousSlideRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayTimeout = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // レスポンシブ判定のためのウィンドウサイズ監視
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px未満はモバイルと判定
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントのリスナー設定
    window.addEventListener('resize', checkMobile);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 現在の環境に合わせた画像配列を取得
  const getCurrentImages = () => {
    return images.map((image) => (isMobile ? image.sp : image.pc));
  };

  const currentImages = getCurrentImages();
  const isSingleImage = currentImages.length <= 1;

  // 動画の再生/停止を制御する関数
  const handleVideoPlayback = (currentIndex) => {
    // 現在のスライドのビデオ要素
    const currentVideo = videoRefs.current[currentIndex];
    // 前のスライドのビデオ要素
    const previousVideo = videoRefs.current[previousSlideRef.current];

    // 前のスライドの動画を停止（Promise処理を適切に行う）
    if (previousVideo) {
      // pause()を呼び出す前にビデオの状態を確認
      const isPaused = previousVideo.paused;
      if (!isPaused) {
        // ビデオが再生中なら、安全に停止する
        const pausePromise = previousVideo.pause();
        // 一時停止した後にタイムラインをリセット
        if (pausePromise !== undefined) {
          Promise.resolve(pausePromise).then(() => {
            previousVideo.currentTime = 0;
          });
        } else {
          previousVideo.currentTime = 0;
        }
      }
    }

    // 現在のスライドの動画を再生（動画がロードされ利用可能な場合のみ）
    if (currentVideo && isVideoFile(currentImages[currentIndex])) {
      // 再生前に一度ロードを確実にする
      currentVideo.load();

      // play()はPromiseを返すので適切に処理する
      const playPromise = currentVideo.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 再生開始成功
            console.log('動画の再生が開始されました');
          })
          .catch((error) => {
            // 自動再生失敗時の処理
            console.log('動画の自動再生に失敗しました:', error);

            // 自動再生に失敗した場合は、ミュートしてから再度再生を試みる
            // (多くのブラウザはミュート状態なら自動再生を許可する)
            currentVideo.muted = true;
            currentVideo.play().catch((e) => {
              console.log('ミュート状態でも再生に失敗しました:', e);
            });
          });
      }
    }

    previousSlideRef.current = currentIndex;
  };

  // 自動再生の制御
  const startAutoPlay = () => {
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
    autoPlayTimeout.current = setTimeout(() => {
      if (instanceRef.current && isAutoPlaying) {
        instanceRef.current.next();
      }
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
  };

  // マウスイベントのハンドラー
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    startAutoPlay();
  };

  // クリーンアップ処理
  useEffect(() => {
    return () => {
      stopAutoPlay();
    };
  }, []);

  const [mainRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: currentImages.length,
    loop: !isSingleImage,
    breakpoints: {
      '(min-width: 500px)': {
        loop: !isSingleImage,
      },
    },
    slideChanged(slider) {
      const newIndex = slider.track.details.rel;
      setCurrentSlide(newIndex);
      handleVideoPlayback(newIndex);
      if (isAutoPlaying) {
        startAutoPlay();
      }
    },
    created() {
      setLoaded(true);
      // 初期表示時に最初の動画を再生
      if (isVideoFile(currentImages[0])) {
        handleVideoPlayback(0);
      }
      if (isAutoPlaying) {
        startAutoPlay();
      }
    },
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion);
      setOpacities(new_opacities);
    },
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      loop: !isSingleImage,
      slides: {
        origin: 'auto',
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  // コンポーネントのアンマウント時に動画を停止
  // クリーンアップ関数でビデオの再生を適切に停止
  useEffect(() => {
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          // ビデオが再生中かチェック
          if (!video.paused) {
            const pausePromise = video.pause();
            // Promise APIを使って安全に停止
            if (pausePromise !== undefined) {
              pausePromise
                .then(() => {
                  video.currentTime = 0;
                })
                .catch((e) => {
                  console.log('クリーンアップ時のビデオ停止に失敗:', e);
                });
            } else {
              video.currentTime = 0;
            }
          }
        }
      });
    };
  }, []);

  // ウィンドウサイズやデバイス変更時にスライダーを更新
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [isMobile, instanceRef]);

  return (
    <div
      className="relative flex w-full flex-col gap-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* メインスライダー */}
      <div className="navigation-wrapper group relative mt-10 aspect-[4/5] w-full border-b border-gray-100 sm:mt-0 sm:aspect-[16/9]">
        <div
          ref={mainRef}
          className="keen-slider f-full relative aspect-[4/5] w-full sm:aspect-[16/9]"
        >
          {currentImages.map((src, index) => {
            const originalImage = images[index];
            const hasLink = !!originalImage.link;
            const content = isVideoFile(src) ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="object-cover"
                controls
                preload="metadata"
                playsInline
                muted
                loop
                aria-label={`の動画 ${index + 1}`}
              >
                <source src={src} type={getVideoType(src)} />
                <track kind="captions" srcLang="ja" label="日本語" />
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            ) : (
              <img
                src={src}
                alt={`写真 ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            );

            return (
              <div
                key={index}
                className="keen-slider__slide relative flex w-full items-center justify-center"
                style={{ opacity: opacities[index] }}
              >
                {hasLink ? (
                  <a
                    href={originalImage.link}
                    className="block h-full w-full"
                    onClick={(e) => {
                      // スライダーの操作とリンククリックの競合を防ぐため
                      e.stopPropagation();
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>

        {/* 矢印ナビゲーション */}
        {loaded && instanceRef.current && !isSingleImage && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={!instanceRef.current.options.loop && currentSlide === 0}
            />
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={
                !instanceRef.current.options.loop &&
                currentSlide === instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {/* サムネイルスライダー */}
      {!isSingleImage && (
        <div className="relative hidden sm:block">
          <div ref={thumbnailRef} className="keen-slider max-w-container-md mx-auto h-auto w-full">
            {images.map((image, index) => {
              const hasLink = !!image.link;
              const content = isVideoFile(image) ? (
                <video
                  className="object-cover"
                  muted
                  preload="metadata"
                  loop
                  playsInline
                  aria-hidden="true"
                >
                  <source src={image.pc} type={getVideoType(image)} />
                  お使いのブラウザは動画タグをサポートしていません。
                </video>
              ) : (
                <img
                  src={image.pc}
                  alt={`写真サムネイル ${index + 1}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              );

              return (
                <div
                  key={index}
                  className="keen-slider__slide keen-thumbnail-slide relative aspect-video h-full w-auto cursor-pointer border-2 border-transparent opacity-40 hover:opacity-80"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ドットナビゲーション */}
      {loaded && instanceRef.current && !isSingleImage && (
        <div className="dots mt-4 flex justify-center gap-2 sm:hidden">
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`dot h-2 w-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`写真 ${idx + 1} へ移動`}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SliderReact;
