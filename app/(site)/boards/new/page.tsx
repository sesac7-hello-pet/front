"use client";

import api from "@/app/lib/api";
import React, { useState } from "react";

export default function BoardCreate() {
  const [category, setCategory] = useState<string>("커뮤니티");
  const [petType, setPetType] = useState<string>("강아지");

  const changeButton = (state: string, current: string) =>
    `w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
      state == current
        ? "bg-amber-400 text-white"
        : "bg-amber-50 text-amber-300 hover:bg-amber-100"
    }`;

  function clickCategory(selectd: string) {
    setCategory(selectd);
  }

  function clickPetType(selectd: string) {
    setPetType(selectd);
  }

  async function createBoard(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: "title",
      content: "content",
      img_url: "img_url",
      boardCategory: "QNA",
      petType: "DOG",
    };

    const res = await api.post("/boards", payload);
    console.log(res.data);
  }

  return (
    <div>
      <div>
        <p>
          카테고리
          <button
            onClick={() => clickCategory("커뮤니티")}
            className={changeButton("커뮤니티", category)}
          >
            커뮤니티
          </button>
          <button
            onClick={() => clickCategory("Q & A")}
            className={changeButton("Q & A", category)}
          >
            Q & A
          </button>
        </p>
        <p>
          동물 종류
          <button
            onClick={() => clickPetType("강아지")}
            className={changeButton("강아지", petType)}
          >
            강아지
          </button>
          <button
            onClick={() => clickPetType("고양이")}
            className={changeButton("고양이", petType)}
          >
            고양이
          </button>
          <button
            onClick={() => clickPetType("기타")}
            className={changeButton("기타", petType)}
          >
            기타
          </button>
        </p>
        <form onSubmit={createBoard}>
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
          <button type="submit">등록하기</button>
        </form>
      </div>
    </div>
  );
}
