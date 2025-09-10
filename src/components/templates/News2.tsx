/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import Heading from '../atoms/Heading';
import Spacer from '../atoms/Spacer';
import Textlink from '../atoms/Textlink';

interface NewsArticle {
  /** ジャンル */
  genre: string;
  /** 日付 */
  date: string;
  /** タイトル */
  title: string;
  /** リンクURL */
  href: string;
}

interface NewsProps {
  /** ニュースエリアの最大高さ */
  maxHeight?: string;
}

/**
 * ニュースセクションコンポーネント（静的データ版）
 * 固定のニュースデータを表示します
 */
const News: React.FC<NewsProps> = ({ maxHeight = '280px' }) => {
  const newsData: NewsArticle[] = [
    {
      genre: '発売',
      date: '2024.03.12',
      title: '『ブレイクショットの軌跡』発売',
      href: 'https://www.hayakawa-online.co.jp/shop/g/g0000614759/',
    },
    {
      genre: 'イベント',
      date: '2024.01.20',
      title: '逢坂冬馬×佐藤究 トークイベント開催決定',
      href: 'https://www.hayakawabooks.com/n/nd8a344312ff6',
    },
    {
      genre: 'インタビュー',
      date: '2023.11.15',
      title: '『歌われなかった海賊へ』インタビュー掲載',
      href: 'https://shosetsu-maru.com/interviews/authors/storybox_interview/140',
    },
    {
      genre: '発売',
      date: '2023.10.18',
      title: '『歌われなかった海賊へ』発売',
      href: 'https://www.hayakawa-online.co.jp/shop/g/g0000910010/',
    },
    {
      genre: '受賞',
      date: '2022.04.13',
      title: '『同志少女よ、敵を撃て』本屋大賞受賞',
      href: 'https://www.hontai.or.jp/prize/',
    },
  ];

  const [articles] = useState<NewsArticle[]>(newsData);

  return (
    <section id="news" className={`
      relative mx-auto box-border flex w-full flex-col
    `}>
      <Heading color="gray" align="center" navLabel="お知らせ" navLabelEng="NEWS" />
      <Spacer size="2xs" />
      <div
        className={`
          flex w-full flex-col gap-2 overflow-y-scroll border border-gray-100
          px-6 py-4
          md:px-10 md:py-8
        `}
        style={{ maxHeight }}
        data-lenis-prevent
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className={`
              flex w-full flex-col gap-x-2
              md:flex-row md:items-baseline md:gap-x-5
            `}
          >
            <div
              className={`
                item-center flex min-w-[160px] flex-none justify-start gap-x-2
                md:gap-x-5
              `}
            >
              <p
                className={`
                  min-w-[32px] flex-none text-xs
                  md:min-w-[88px] md:text-sm
                `}
              >
                {article.genre}
              </p>
              <p
                className={`
                  flex-auto text-xs
                  md:text-sm
                `}
              >
                {article.date}
              </p>
            </div>
            {article.href ? (
              <Textlink
                hierarchy="tertiary"
                underline="pp"
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className={`
                  group w-full py-2
                  [&>span]:line-clamp-1
                `}
                dangerouslySetInnerHTML={{ __html: article.title }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: article.title }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
