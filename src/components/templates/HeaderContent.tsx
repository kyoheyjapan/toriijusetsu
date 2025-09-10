import siteConfig from '../../site.config.json';
import Textlink from '../atoms/Textlink';
import VaulDrawer from '../templates/VaulDrawer.tsx';
import Logo from '../vi/Logo';

interface GlobalItem {
  /** ナビゲーションリンクのURL */
  url: string;
  /** 英語のナビゲーションラベル */
  navLabelEng: string;
}

const globalItems = Object.values(siteConfig.global) as GlobalItem[];

/**
 * ヘッダーコンテンツコンポーネント
 */
const HeaderContent: React.FC = () => (
  <header className="mx-auto max-w-(--container-5xl) bg-white">
    <nav
      className={`
        flex items-center justify-between p-6
        lg:px-8
      `}
      aria-label="Global"
    >
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <Logo className="h-10 text-primary" />
      </a>
      <div>
        <ul
          className={`
            hidden items-start gap-x-6
            lg:flex
          `}
        >
          {globalItems.map((item) => (
            <li key={item.url}>
              <Textlink a href={item.url} className={`
                text-md font-bold text-gray-900
              `}>
                {item.navLabelEng}
              </Textlink>
            </li>
          ))}
        </ul>
        <div
          className={`
            flex
            lg:hidden
          `}
        >
          <VaulDrawer className="h-auto" />
        </div>
      </div>
    </nav>
  </header>
);

export default HeaderContent;
