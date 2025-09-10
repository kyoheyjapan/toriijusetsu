/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';
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
  /** リンクURL（オプション） */
  href?: string;
}

interface NewsProps {
  /** ニュースエリアの最大高さ */
  maxHeight?: string;
}

// windowオブジェクトを拡張
declare global {
  interface Window {
    newsArticles?: NewsArticle[];
  }
}

// データの型チェック用関数
const isValidNewsArticle = (article: any): article is NewsArticle => {
  return (
    article &&
    typeof article === 'object' &&
    typeof article.genre === 'string' &&
    typeof article.date === 'string' &&
    typeof article.title === 'string' &&
    (article.href === undefined || typeof article.href === 'string')
  );
};

const isValidNewsData = (data: any): data is NewsArticle[] => {
  return Array.isArray(data) && data.every(isValidNewsArticle);
};

/**
 * ニュースセクションコンポーネント
 * 外部スクリプトからニュースデータを動的に読み込みます
 */
const News: React.FC<NewsProps> = ({ maxHeight = '280px' }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // すでにwindow.newsArticlesがあれば即利用
    if (typeof window !== 'undefined' && window.newsArticles) {
      if (isMounted) {
        if (!isValidNewsData(window.newsArticles)) {
          setError('ニュースデータの形式が正しくありません');
          setLoading(false);
        } else {
          setArticles(window.newsArticles);
          setLoading(false);
        }
      }
      return () => {
        isMounted = false;
      };
    }

    // なければscriptタグを動的に追加
    const script = document.createElement('script');
    script.src = '/cms/img/usr/aisakatouma/newsArticles.js';
    script.async = true;

    script.onload = (): void => {
      if (isMounted) {
        if (window.newsArticles && isValidNewsData(window.newsArticles)) {
          setArticles(window.newsArticles);
          setLoading(false);
        } else {
          setError('ニュースデータの形式が正しくありません');
          setLoading(false);
        }
      }
    };

    script.onerror = (): void => {
      if (isMounted) {
        setError('ニュースデータの読み込みに失敗しました');
        setLoading(false);
      }
    };

    document.body.appendChild(script);

    return () => {
      isMounted = false;
      // クリーンアップ: scriptタグを削除
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <section className="relative mx-auto box-border flex w-full flex-col">
        <Heading color="gray" align="center" navLabel="お知らせ" navLabelEng="NEWS" />
        <Spacer size="2xs" />
        <div className="py-4 text-center">読み込み中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className={`
        relative mx-auto box-border flex w-full flex-col
      `}>
        <Heading color="gray" align="center" navLabel="お知らせ" navLabelEng="NEWS" />
        <Spacer size="2xs" />
        <div className="py-4 text-center text-red-500">{error}</div>
      </section>
    );
  }

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
              <div
                className={`
                  group w-full py-2 font-bold text-gray-500
                  [&>span]:line-clamp-1
                `}
                dangerouslySetInnerHTML={{ __html: article.title }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
