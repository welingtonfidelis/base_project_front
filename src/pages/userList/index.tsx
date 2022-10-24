import { useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import { Container, MainContent } from "./styles";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { Avatar } from "@chakra-ui/react";
import { useGetListUsers } from "../../services/requests/user";
import { t } from "i18next";

export const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetListUsers({page: currentPage -1})

  const columnHeader = useMemo(() => t('pages.user_list.table_header_columns').split('/'), []);
  const columnData = useMemo(() => {
    if (!data) return [];

    return data?.users.map((item) => [
      <Avatar name={item.name} />,
      item.name,
      item.email,
      <FiTrash2 />,
    ]);
  }, [data]);

  return (
    <Container>
      <MainContent>
        <Preloader isLoading={isLoading}>
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={data?.total || 0}
      />
    </Container>
  );
};
