export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* 카드 */}
      <div className="w-full max-w-md rounded-2xl shadow-[0_0_0_4px_rgba(253,224,71,0.25)] p-10">
        {/* 제목 */}
        <h1 className="mb-12 text-center text-4xl font-bold tracking-widest text-amber-400">
          로그인
        </h1>

        {/* 폼 */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-400 py-3 font-semibold text-white shadow-md transition hover:bg-amber-500"
          >
            로그인
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-amber-400 hover:underline">회원가입</p>
        </div>
      </div>
    </div>
  );
}
