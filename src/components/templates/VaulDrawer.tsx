import React from 'react';
import { Drawer } from 'vaul';
import siteConfig from '../../site.config.json';
import MenuBars from '../atoms/MenuBars';
import Spacer from '../atoms/Spacer';
import Textlink from '../atoms/Textlink';
import Logo from '../vi/Logo';
const globalItems = Object.values(siteConfig.global);
const subItems = Object.values(siteConfig.sub);
interface VaulDrawerProps {
  className?: string;
}

// navLabelEngを持つかどうかを判定するType Guard
function hasNavLabelEng(item: any): item is { navLabelEng: string } {
  return (
    typeof item === 'object' &&
    item !== null &&
    'navLabelEng' in item &&
    typeof item.navLabelEng === 'string'
  );
}

const VaulDrawer: React.FC<VaulDrawerProps> = ({ className = '' }) => {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <button
          type="button"
          aria-label="メニューを開く"
          className={`
            group relative flex aspect-square h-auto w-[64px] cursor-pointer
            justify-center transition-all duration-0
            ${className}
          `}
        >
          <MenuBars className="h-20" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={`
            fixed top-2 right-2 bottom-2 z-50 flex w-[310px] outline-none
          `}
          style={
            {
              // The gap between the edge of the screen and the drawer is 8px in this case.
              '--initial-transform': 'calc(100% + 8px)',
            } as React.CSSProperties
          }
        >
          <div
            className={`
              flex size-full grow flex-col rounded-[16px] bg-zinc-50 p-5
            `}
          >
            <div className="mx-auto w-full max-w-md">
              <Drawer.Description>
                <div className="py-10">
                  <Logo className="w-9 text-primary" />
                  <Spacer size="4xl" />
                  <ul role="list" className="flex flex-col justify-center gap-4">
                    <li>
                      <Textlink
                        href="/"
                        hierarchy="tertiary"
                        size="2xl"
                        className="w-full tracking-widest"
                      >
                        HOME
                      </Textlink>
                    </li>
                    <Spacer size="4xs" />
                    {globalItems.map((item) => (
                      <li>
                        {hasNavLabelEng(item) && item.navLabelEng && (
                          <Textlink
                            href={item.url}
                            hierarchy="tertiary"
                            size="2xl"
                            className="w-full tracking-widest"
                            position="right"
                            icon="chevronRight"
                          >
                            {item.navLabelEng}
                          </Textlink>
                        )}
                      </li>
                    ))}
                    <Spacer size="4xs" />
                    {subItems.map((item) => (
                      <li>
                        {hasNavLabelEng(item) && item.navLabelEng && (
                          <Textlink
                            href={item.url}
                            hierarchy="tertiary"
                            size="2xl"
                            className="w-full tracking-widest"
                          >
                            {item.navLabelEng}
                          </Textlink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VaulDrawer;
