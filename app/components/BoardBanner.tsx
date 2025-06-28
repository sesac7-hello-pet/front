export default function BoardBanner() {
  return (
    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-center gap-8 rounded-[48px] bg-amber-50 p-16 shadow-lg">
      <div className="space-y-2 text-center text-amber-400">
        <h2 className="text-3xl font-semibold">
          유기동물들의&nbsp;가족이&nbsp;되어주세요
        </h2>
        <p className="text-2xl">평생&nbsp;가족&nbsp;찾으러&nbsp;가기</p>
      </div>

      {/* 버튼만 두고 링크는 나중에 onClick으로 연결 */}
      <button className="rounded-full bg-amber-400 px-10 py-3 text-lg font-semibold text-white">
        TEST
      </button>
    </div>
  );
}
