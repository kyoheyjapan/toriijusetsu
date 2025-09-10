import clsx from 'clsx';
import React from 'react';

/**
 * レスポンシブ対応の改行を制御するコンポーネント
 *
 * @example
 * // スマホのみ改行
 * <p>テキスト<Br sp />改行後のテキスト</p>
 *
 * // スマホとタブレットで改行、PCでは改行なし
 * <p>テキスト<Br sptb />改行後のテキスト</p>
 *
 * @param props - Brコンポーネントのプロパティ
 * @param props.sp - スマホのみ改行 (～767px)
 * @param props.tb - タブレットのみ改行 (768px～1023px)
 * @param props.pc - PCのみ改行 (1024px～)
 * @param props.sptb - スマホとタブレットで改行 (～1023px)
 * @param props.tbsp - スマホとタブレットで改行（sptbと同等、後方互換用）
 * @param props.tbpc - タブレットとPCで改行 (768px～)
 * @param props.pctb - タブレットとPCで改行（tbpcと同等、後方互換用）
 * @param props.className - 追加のクラス名
 * @param props.aria - アクセシビリティ属性（オプション）
 */

type BrProps = {
  sp?: boolean;
  tb?: boolean;
  pc?: boolean;
  sptb?: boolean;
  tbsp?: boolean;
  tbpc?: boolean;
  pctb?: boolean;
  all?: boolean;
  className?: string;
  'aria-hidden'?: boolean;
} & React.HTMLAttributes<HTMLBRElement>;

const Br: React.FC<BrProps> = ({
  sp,
  tb,
  pc,
  sptb,
  tbsp,
  tbpc,
  pctb,
  all,
  className,
  'aria-hidden': ariaHidden,
  ...rest
}) => {
  // ブレークポイントに基づくクラス名の生成
  const breakpointClasses = clsx(
    // スマホ (～767px)
    sp &&
      `
      block
      md:hidden
      lg:hidden
    `,

    // スマホとタブレット (～1023px)
    (sptb || tbsp) &&
      `
      block
      md:block
      lg:hidden
    `,

    // タブレットのみ (768px～1023px)
    tb &&
      `
      hidden
      md:block
      lg:hidden
    `,

    // タブレットとPC (768px～)
    (tbpc || pctb) &&
      `
      hidden
      md:block
      lg:block
    `,

    // PCのみ (1024px～)
    pc &&
      `
      hidden
      md:hidden
      lg:block
    `,

    // 全て
    all && 'block',

    // 追加のカスタムクラス
    className,
  );

  return (
    <br
      className={breakpointClasses}
      aria-hidden={ariaHidden ?? true} // デフォルトでスクリーンリーダーからは隠す
      {...rest}
    />
  );
};

export default Br;
