export default function Withdraw() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white px-4">
      {/* 회원 탈퇴 페이지 타이틀 */}
      <h1 className="mb-8 text-center text-3xl font-bold tracking-widest text-amber-400">
        회원 탈퇴
      </h1>

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="
      w-full
      rounded-lg
      px-4
      py-3
      shadow
      placeholder-gray-400
      focus:ring-2
      focus:ring-amber-400
    "
      />

      {/* 비밀번호 검증하기 버튼 */}
      <button
        type="button"
        disabled={false /* 비밀번호 입력 여부에 따라 활성/비활성 처리 */}
        className="
      mt-4
      w-full
      rounded-lg
      bg-amber-400
      py-3
      font-semibold
      text-white
      shadow-md
      transition
      hover:bg-amber-500
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
      >
        비밀번호 확인
      </button>
    </div>
  );
}
