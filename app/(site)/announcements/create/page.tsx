// 공고 등록 페이지
export default function Page() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      {/* 상단 네비게이션 */}
      <nav className="w-full bg-yellow-100 py-3 px-10 flex justify-between items-center text-yellow-600 font-semibold">
        <span className="text-lg">HELLO PET 🐱</span>
        <div className="space-x-6">
          <a href="#">입양게시판</a>
          <a href="#">자유게시판</a>
          <a href="#">마이페이지</a>
          <a href="#">로그아웃</a>
        </div>
      </nav>

      {/* 등록 폼 */}
      <div className="bg-yellow-50 w-full max-w-2xl mt-10 p-10 rounded-xl shadow-md text-yellow-700 font-medium">
        <h2 className="text-center text-xl mb-8">등록 등록 페이지</h2>

        {/* 동물 종류 */}
        <div className="mb-4">
          <label className="block mb-1">동물</label>
          <div className="space-x-4">
            <label>
              <input type="checkbox" className="mr-1" defaultChecked /> 강아지
            </label>
            <label>
              <input type="checkbox" className="mr-1" /> 고양이
            </label>
            <label>
              <input type="checkbox" className="mr-1" /> 기타
            </label>
          </div>
        </div>

        {/* 종류 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="종류를 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
        </div>

        {/* 성별 */}
        <div className="mb-4">
          <label className="block mb-1">성별</label>
          <div className="flex items-center space-x-6">
            <label>
              <input type="radio" name="gender" className="mr-1" /> 남
            </label>
            <label>
              <input type="radio" name="gender" className="mr-1" /> 여
            </label>
            <button className="ml-auto flex items-center text-yellow-700 hover:underline">
              <span className="mr-1">사진첨부하기</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276a1 1 0 00-.553-1.894H5a1 1 0 00-.553 1.894L9 10m6 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m6 0V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 상태 입력들 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="건강상태를 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
          <input
            type="text"
            placeholder="성격을 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
          <input
            type="text"
            placeholder="나이를 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
          <input
            type="text"
            placeholder="보호 중인 보호소와 연락처를 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
          <input
            type="text"
            placeholder="발견장소를 입력해주세요."
            className="w-full border-b border-yellow-300 bg-transparent outline-none py-2"
          />
        </div>

        {/* 공고기간 */}
        <div className="mt-4 mb-6">
          <label className="block mb-1">공고기간을 선택해주세요.</label>
          <input
            type="date"
            className="border border-yellow-300 rounded px-2 py-1 bg-white"
            defaultValue="2025-06-27"
          />
        </div>

        {/* 버튼 */}
        <div className="text-center">
          <button className="bg-yellow-400 text-white px-6 py-2 rounded-full shadow hover:bg-yellow-500 transition">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
