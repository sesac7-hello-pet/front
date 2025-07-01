"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

interface User {
  id: number;
  email: string;
  role: string;
  nickname: string;
  username: string;
  phoneNumber: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    getUserList();
  }, []);

  async function getUserList() {
    const res = api.get("/users");
    setUsers((await res).data);
  }

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          {user.role}
          {user.username}
          {user.email}
          {user.nickname}
          {user.phoneNumber}
        </li>
      ))}
    </ul>
  );
}
