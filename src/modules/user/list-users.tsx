"use client";
import AxiosDigestAuth from "@mhoc/axios-digest-auth";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  cardNo: string;
  cardName: string;
}

export default function ListUsers() {
  const digestAuth = new AxiosDigestAuth({
    username: "admin",
    password: "admin123",
  });

  const [users, setUsers] = useState<User[]>([]);
  const url =
    "http://192.168.1.54/cgi-bin/recordFinder.cgi?action=find&name=AccessControlCard&condition.count=1024";
  const getUsers = async () => {
    const response = await digestAuth.request({
      headers: { Accept: "application/json" },
      method: "GET",
      url: url,
    });
    setUsers(response.data);
  };
  getUsers();

  return (
    <div>
      <Table>
        <TableCaption>Lista de usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.cardNo}</TableCell>
              <TableCell>{user.cardName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
