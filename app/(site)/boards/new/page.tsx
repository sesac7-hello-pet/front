export default function BoardCreate() {
  return (
    <div>
      <div>
        <p>
          카테고리
          <button>커뮤니티</button>
          <button>Q & A</button>
        </p>
        <p>
          동물 종류
          <button>강아지</button>
          <button>고양이</button>
          <button>기타</button>
        </p>
        <form>
          <p>
            <input type="text" placeholder="제목을 입력해주세요." />
          </p>
          <p>
            <textarea placeholder="5자 이상의 내용을 입력해주세요."></textarea>
          </p>
          <p>
            <label>사진업로드</label>
            <input type="file" />
            <button>사진첨부</button>
          </p>
          <button>등록하기</button>
        </form>
      </div>
    </div>
  );
}
