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
          aria-label="前の画像へ"
          viewBox="0 0 64 32"
          className="absolute top-1/2 left-2 z-10 -mt-4 aspect-[2/1] h-8 w-8 -rotate-90 cursor-pointer fill-gray-400 opacity-70 drop-shadow-lg transition-all duration-300 hover:scale-110 hover:fill-blue-600"
          role="img"
        >
          <path d="M32 0H31V1H30V2H29V3H28V4H27V5H26V6H25V7H24V8H23V9H22V10H21V11H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H11V21H10V22H9V23H8V24H7V25H6V26H5V27H4V28H3V29H2V30H1V31H0V32H1H2V31H3V30H4V29H5V28H6V27H7V26H8V25H9V24H10V23H11V22H12V21H13V20H14V19H15V18H16V17H17V16H18V15H19V14H20V13H21V12H22V11H23V10H24V9H25V8H26V7H27V6H28V5H29V4H30V3H31V2H32H33V3H34V4H35V5H36V6H37V7H38V8H39V9H40V10H41V11H42V12H43V13H44V14H45V15H46V16H47V17H48V18H49V19H50V20H51V21H52V22H53V23H54V24H55V25H56V26H57V27H58V28H59V29H60V30H61V31H62V32H63H64V31H63V30H62V29H61V28H60V27H59V26H58V25H57V24H56V23H55V22H54V21H53V20H52V19H51V18H50V17H49V16H48V15H47V14H46V13H45V12H44V11H43V10H42V9H41V8H40V7H39V6H38V5H37V4H36V3H35V2H34V1H33V0H32Z" />
        </svg>
      )}
      {!props.left && (
        <svg
          onClick={props.onClick}
          aria-hidden="true"
          aria-label="次の画像へ"
          viewBox="0 0 64 32"
          className="absolute top-1/2 right-2 z-10 -mt-4 aspect-[2/1] h-8 w-8 rotate-90 cursor-pointer fill-gray-400 opacity-70 drop-shadow-lg transition-all duration-300 hover:scale-110 hover:fill-blue-600"
          role="img"
        >
          <path d="M32 0H31V1H30V2H29V3H28V4H27V5H26V6H25V7H24V8H23V9H22V10H21V11H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H11V21H10V22H9V23H8V24H7V25H6V26H5V27H4V28H3V29H2V30H1V31H0V32H1H2V31H3V30H4V29H5V28H6V27H7V26H8V25H9V24H10V23H11V22H12V21H13V20H14V19H15V18H16V17H17V16H18V15H19V14H20V13H21V12H22V11H23V10H24V9H25V8H26V7H27V6H28V5H29V4H30V3H31V2H32H33V3H34V4H35V5H36V6H37V7H38V8H39V9H40V10H41V11H42V12H43V13H44V14H45V15H46V16H47V17H48V18H49V19H50V20H51V21H52V22H53V23H54V24H55V25H56V26H57V27H58V28H59V29H60V30H61V31H62V32H63H64V31H63V30H62V29H61V28H60V27H59V26H58V25H57V24H56V23H55V22H54V21H53V20H52V19H51V18H50V17H49V16H48V15H47V14H46V13H45V12H44V11H43V10H42V9H41V8H40V7H39V6H38V5H37V4H36V3H35V2H34V1H33V0H32Z" />
        </svg>
      )}
    </>
  );
}

const SliderBookCoverReact = ({ images = [], className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const autoPlayTimeout = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // スライダーが存在するか確認
  const isSingleImage = images.length <= 1;

  // 自動再生の制御関数
  const startAutoPlay = () => {
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
    // スライドが1枚しかない場合は自動再生しない
    if (isSingleImage) return;

    autoPlayTimeout.current = setTimeout(() => {
      if (instanceRef.current && isAutoPlaying) {
        instanceRef.current.next();
      }
    }, 6000); // 6秒ごとに次のスライドへ
  };

  const stopAutoPlay = () => {
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
  };

  // マウスイベントのハンドラー
  const handleMouseEnter = () => {
    if (isSingleImage) return; // スライドが1枚しかない場合は処理しない
    setIsAutoPlaying(false);
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    if (isSingleImage) return; // スライドが1枚しかない場合は処理しない
    setIsAutoPlaying(true);
    startAutoPlay();
  };

  // スライダーインスタンスへの参照
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      if (isAutoPlaying && !isSingleImage) {
        startAutoPlay();
      }
    },
    created() {
      setLoaded(true);
      if (isAutoPlaying && !isSingleImage) {
        startAutoPlay();
      }
    },
    loop: !isSingleImage,
    drag: !isSingleImage,
    slides: {
      perView: 1,
      spacing: 15,
    },
    mode: 'snap',
  });

  // コンポーネントのアンマウント時にタイマーをクリーンアップ
  useEffect(() => {
    return () => {
      stopAutoPlay();
    };
  }, []);

  // imagesの内容が変更された場合にisSingleImageの評価を再実行
  useEffect(() => {
    // スライドが1枚しかない場合は自動再生を停止
    if (isSingleImage) {
      stopAutoPlay();
      setIsAutoPlaying(false);
    } else if (isAutoPlaying) {
      startAutoPlay();
    }
  }, [images, isSingleImage]);

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="keen-slider-wrapper aspect-square">
        <div ref={sliderRef} className="keen-slider">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex aspect-square h-full w-full items-center justify-center bg-white"
            >
              {image.link ? (
                <a
                  href={image.link}
                  className="flex h-full w-full items-center justify-center"
                  onClick={(e) => {
                    // スライダーの操作とリンククリックの競合を防ぐため
                    e.stopPropagation();
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt || ''}
                    className="aspect-[111/160] h-full max-h-[80%] object-contain shadow-xl transition-transform duration-300 hover:scale-105"
                  />
                </a>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt || ''}
                    className="aspect-[111/160] h-full max-h-[80%] object-contain shadow-xl transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {loaded && !isSingleImage && (
        <>
          <Arrow
            left
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
          />
          <Arrow
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
          />
          {/* ドットナビゲーション - SliderReactと同様のスタイルに変更 */}
          <div className="dots mt-4 flex justify-center gap-2">
            {[...Array(images.length).keys()].map((idx) => {
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
        </>
      )}
    </div>
  );
};

export default SliderBookCoverReact;
