interface Article {
  /** リンクのURL */
  href?: string;
  /** 画像のURL */
  src?: string;
  /** タイトル */
  title?: string;
  /** 説明文 */
  desc?: string;
}

interface LinkCardProps {
  /** 記事の配列 */
  articles?: Article[];
}

const LinkCard: React.FC<LinkCardProps> = ({ articles = [] }) => {
  return (
    <>
      {articles.map((column, index) => (
        <a
          key={index}
          href={column.href || 'https://www.hayakawashobo.co.jp/'}
          target="_blank"
          rel="noreferrer"
          className={`
            col-span-1 flex w-full items-center justify-start gap-4 rounded-md
            border border-gray-100 bg-white p-2.5
            hover:border-hover/20 hover:opacity-80
          `}
        >
          <div
            className={`
              relative flex aspect-1/1 size-10 flex-none items-center
              justify-center border border-gray-200
              md:size-16
            `}
          >
            <img
              src={column.src || 'https://place-hold.it/300x300/ccc'}
              className="h-full w-auto object-cover"
              alt={column.title || 'タイトルが入ります'}
            />
          </div>
          <div
            className={`
              flex w-full flex-auto flex-col items-start justify-center gap-1
            `}
          >
            <h3
              className={`
                typo-md text-text line-clamp-1 w-full leading-none font-bold
              `}
            >
              {column.title || 'タイトルが入ります'}
            </h3>
            {column.desc && (
              <div
                className={`
                  typo-sm text-text-light line-clamp-2 w-full leading-snug
                `}
              >
                {column.desc}
              </div>
            )}
          </div>
        </a>
      ))}
    </>
  );
};

export default LinkCard;
