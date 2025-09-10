import { Inner } from '../molecules/Inner';

const columns = [
  {
    id: 11,
    href: 'https://www.willseed.co.jp/case/case27.html',
    src: 'img/column/11.png',
    title: '官と民の共創が生み出す創発効果',
    desc: '官民合同チームで自治体が抱える課題の解決に向けた提案を行い、次世代リーダーとしての個人の成長機会とするプロジェクト型学習プログラムに取り組んだ山梨県大月市。企業でも社会課題に向き合うことが経営上で重視されるようになった今、官民が互いに越境したことで多くの気づきが得られました。 ',
  },
  {
    id: 12,
    href: 'https://www.willseed.co.jp/case/case30.html',
    src: 'img/column/12.png',
    title: '人材育成で社内文化を変える「NTT East College」の挑戦',
    desc: '人的資本経営が叫ばれる昨今、企業は自社の社会におけるパーパスを捉え直すとともに、社員一人ひとりがキャリアを自律的に考えられる土壌づくりを行う必要性が増しています。「経営戦略と人事戦略を統合していく」といっても、どのように仕組みを作り、自社に文化として浸透させていくかは、企業ごとにさまざまな可能性があることでしょう。その好例としてご紹介したい施策が、NTT東日本が2023年度に設立した企業内大学「NTT East College」です。どのような背景で立ち上がり、どのような取り組みを行っているのでしょうか。 ',
  },
  {
    id: 1,
    href: 'https://www.willseed.co.jp/column/202402-3/',
    src: 'img/column/1.png',
    title: '異業種・越境学習プログラム『GIFT Essentials』体験者インタビュー',
    desc: 'カゴメ株式会社の福原大典さま、堀江健一さま、佐藤洸史さまに、NPOが普段から取り組んでいる課題・テーマに対して異業種チームで向き合い、フィールドワークやワークショップを通じて課題設定と解決策立案を行うプログラム『GIFT Essentials』への参加理由や、越境体験からの気づきを伺いました。 ',
  },
  {
    id: 2,
    href: 'https://www.willseed.co.jp/column/202306-1/',
    src: 'img/column/2.png',
    title: '異業種×社会課題×デザイン思考で未来を共創する',
    desc: '2022年2月9日（水）、セミナー「越境は個人のパーパスをどう磨くか」を開催しました。前半は石山恒貴氏（法政大学大学院政策創造研究科 教授）による基調講演、後半には参加者同士のディスカッションや石山氏への質疑応答の時間も設け、越境学習への理解をさらに深めて頂きました。本レポートでは、石山氏による基調講演と質疑応答の内容の一部をご紹介します。',
  },
  {
    id: 3,
    href: 'https://www.willseed.co.jp/column/202203-1/',
    src: 'img/column/3.png',
    title: '越境は個人のパーパスをどう磨くか',
    desc: '2022年2月9日（水）、セミナー「越境は個人のパーパスをどう磨くか」を開催しました。前半は石山恒貴氏（法政大学大学院政策創造研究科 教授）による基調講演、後半には参加者同士のディスカッションや石山氏への質疑応答の時間も設け、越境学習への理解をさらに深めて頂きました。本レポートでは、石山氏による基調講演と質疑応答の内容の一部をご紹介します。',
  },
  {
    id: 4,
    href: 'https://www.willseed.co.jp/column/202302-1/',
    src: 'img/column/4.png',
    title: '越境からエンゲージメントの可能性を探る',
    desc: '2023年1月17日（火）、石山恒貴氏（法政大学大学院政策創造研究科 教授）をゲストに迎えたセミナー「もっと知りたい!! 越境学習」を開催しました。',
  },
  {
    id: 5,
    href: 'https://www.willseed.co.jp/column/202301-1/',
    src: 'img/column/5.png',
    title: '今、リーダーに必要なリフレクションと越境学習の親和性',
    desc: '2022年11月21日（月）、熊平美香氏（一般社団法人21世紀学び研究所代表）をお招きし、セミナー「もっと知りたい!!越境学習 第2回」をオンラインにて開催しました。経済産業省が定める「社会人基礎力」に「リフレクション」を盛り込む提案を行うなど、日本におけるリフレクションの第一人者であり、数多くのリーダー育成に携わってきた熊平氏に、リフレクションを通じて自分をアップデートするためのポイントや越境学習との親和性について伺いました。',
  },
  {
    id: 6,
    href: 'https://www.willseed.co.jp/column/202312-1/',
    src: 'img/column/6.png',
    title: '成功への道！越境学習企画に欠かせないポイントを掴む',
    desc: 'ウィル・シードは2015年より、セクターの壁を越えて、異なる背景や経験を持つ「他者」や「他社」と共に真正面から社会課題に取り組む越境プログラムを実施しています。このプログラムには、次世代を担うリーダーとして期待される若手・中堅の方たちが参加しており、今年度だけでも150人以上の参加者を迎え入れることができました。 越境学習の波が高まる中、その企画をどのように進め、どんな点を重視して取り組むべきか、効果を最大化するポイントは何か。具体的な方法やポイントを弊社企画部長の岸本がまとめます。人材育成の最前線で取り組む人事の方々に、有益で実践的なヒントになれば幸いです。 ',
  },
  {
    id: 7,
    href: 'https://www.willseed.co.jp/column/202211-1/',
    src: 'img/column/7.png',
    title: '企業で越境学習を企画する際に必要なこととは？',
    desc: '2022年10月14日（金）、逢坂浩一郎氏（NECマネジメントパートナー株式会社）をお招きし、セミナー「もっと知りたい！越境学習」をオンラインにて開催しました。当日は企業内人事・教育に携わるみなさまが参加し、企画者としての難しさや押さえるべきポイントについて共に考えました。 本レポートでは、逢坂氏と参加されたみなさまとの対話の内容を抜粋してご紹介します。',
  },
  {
    id: 8,
    href: 'https://www.willseed.co.jp/column/202206-1/',
    src: 'img/column/8.png',
    title: '大企業の “キャリア自律パラドックス”をどう乗り越えるか',
    desc: '2022年5月19日（木）、セミナー「【ゲリラ人事大学】大企業の“キャリア自律パラドックス”をどう乗り越えるか」をオンラインにて開催しました。『遊ばせる技術　チームの成果をワンランク上げる仕組み』の著者である神谷俊氏、チーム学習の第一人者である日本アクションラーニング協会代表の清宮普美代氏、X-Border Fantasyの岸本渉が中心となり、各企業人事のみなさまと共に考えを深めました。神谷俊氏の基調講演を中心に、当日のセミナー内容を抜粋してご紹介します。',
  },
  {
    id: 9,
    href: 'https://www.willseed.co.jp/column/202206-3/',
    src: 'img/column/9.png',
    title: '【前編】社会課題に向き合い、企業人に”市民感覚”と志を取り戻す',
    desc: '2022年、ウィル・シードに発足したチーム、X-Border Fantasy（クロスボーダー・ファンタジー）。越境学習体験を通じて、参加者自身の志を掘り起こす機会を提供しています。X-Border Fantasyが提供するプログラムの一つ、「GIFT」についてご紹介します。',
  },
  {
    id: 10,
    href: 'https://www.willseed.co.jp/column/202206-4/',
    src: 'img/column/10.png',
    title: '【後編】社会課題に向き合い、企業人に”市民感覚”と志を取り戻す',
    desc: '2022年、ウィル・シードに発足したチーム、X-Border Fantasy（クロスボーダー・ファンタジー）。越境学習体験を通じて、参加者自身の志を掘り起こす機会を提供しています。X-Border Fantasyが提供するプログラムの一つ、「GIFT」についてご紹介します。',
  },
];
const Column = ({ id }) => {
  return (
    <>
      <Inner id={id} size="md">
        <div className="relative flex flex-col gap-8 lg:gap-8">
          <div className="xs:grid-cols-2 grid grid-cols-1 gap-2 sm:gap-2">
            {columns.map((column, index) => (
              <Item
                key={index}
                href={column.href}
                src={column.src}
                title={column.title}
                desc={column.desc}
              />
            ))}
          </div>
        </div>
      </Inner>
    </>
  );
};
export default Column;

function Item({
  href = 'https://www.willseed.co.jp/',
  src = 'https://place-hold.it/300x300/ccc',
  title = 'タイトルが入ります',
  desc = '概要文が入ります',
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="border-bd bg-bg hover:border-sec flex items-center justify-start gap-4 rounded border p-2.5 hover:opacity-80"
      >
        <div className="flex aspect-1/1 w-10 flex-none items-center justify-center border md:w-16">
          <img src={url(src)} alt={`${title} ${desc}`} />
        </div>
        <div className="flex flex-auto flex-col items-start justify-center gap-2">
          <h3 className="typo-md text-pri line-clamp-1 leading-none font-bold">{title}</h3>
          <div className="typo-xs text-txt line-clamp-1 leading-none">{desc}</div>
        </div>
      </a>
    </>
  );
}
