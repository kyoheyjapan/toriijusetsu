import clsx from 'clsx';
import React from 'react';
import Textlink from './Textlink.tsx';

interface SectionTitleProps {
  label?: string;
  title?: string;
  href?: string;
  caption?: string;
  textBody?: string;
  labelClass?: string;
  subtitleClass?: string;
  titleClass?: string;
  textBodyClass?: string;
  captionClass?: string;
  containerClass?: string;
  titleContainerClass?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  title,
  href,
  caption,
  textBody,
  labelClass,
  titleClass,
  textBodyClass,
  captionClass,
  containerClass,
  titleContainerClass,
}) => {
  return (
    <div
      className={clsx(
        'relative flex w-full flex-col items-center justify-center gap-3',
        containerClass,
      )}
    >
      <h2
        className={clsx(
          'text-box-en kerning-all font-regular font-sans fluid-t-[14px,16px] tracking-widest text-brand-500',
          labelClass,
        )}
      >
        {label}
      </h2>
      {title && (
        <div className={clsx('z-10 -mt-px flex flex-col gap-4', titleContainerClass)}>
          <h3
            className={clsx(
              'text-box-jp kerning-all font-sans fluid-t-[18px,22px] font-bold text-brand-500',
              titleClass,
            )}
          >
            {title}
          </h3>
        </div>
      )}
      {textBody && (
        <p
          className={clsx(
            'text-box-jp type-md text-gray-650 font-sans leading-relaxed font-medium',
            textBodyClass,
          )}
        >
          {textBody}
        </p>
      )}
      {caption && (
        <p
          className={clsx(
            'text-box-jp type-xs text-gray-650 font-sans leading-relaxed font-medium',
            captionClass,
          )}
        >
          {caption}
        </p>
      )}
      {href && (
        <Textlink
          href={href}
          hierarchy="tertiary"
          position="right"
          icon="ArrowRightLong"
          underline="pp"
          className="absolute top-3 right-0"
        >
          read more
        </Textlink>
      )}
    </div>
  );
};

export default SectionTitle;
