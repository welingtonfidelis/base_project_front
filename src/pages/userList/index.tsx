import { useCallback, useEffect, useMemo, useState } from "react";
import { FiUser, FiTrash2 } from "react-icons/fi";

import { User } from "../../domains/user";
import { userRequests } from "../../services/requests/user/index_old";
import { Container, MainContent } from "./styles";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { Avatar } from "@chakra-ui/react";

export const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [getUserListLoading, setGetUserListLoading] = useState(false);

  const { listUsers } = userRequests();

  const getUserList = async () => {
    setGetUserListLoading(true);

    const { ok, data } = await listUsers({ page: currentPage });

    if (ok && data) {
      setUserList(data.users);
      setTotalUsers(data.total);
    }

    setGetUserListLoading(false);
  };

  useEffect(() => {
    getUserList();
  }, [currentPage]);

  const columnHeader = useMemo(() => ["", "Nome", "Email", "Editar"], []);
  const columnData = useMemo(() => {
    return userList.map((item) => [
      <Avatar name={item.name} />,
      item.name,
      item.email,
      <FiTrash2 />,
    ]);
  }, [userList]);

  return (
    <Container>
      <MainContent>
        <Preloader isLoading={getUserListLoading}>
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={totalUsers}
      />
    </Container>
  );
};
