import { Pagination as PaginationBar } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

import { Props } from "./types";
import { Container } from "./styles";

export const Pagination = (props: Props) => {
  const { currentPage, onPageChange, totalItems, itemsPerPage } = props;
  const perPage = itemsPerPage || 20;

  return (
    <Container hasContent={totalItems > perPage}>
      <PaginationBar
        totalItems={totalItems}
        itemsPerPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        startLabel={<FaAngleDoubleLeft />}
        endLabel={<FaAngleDoubleRight />}
        nextLabel={<FaAngleRight />}
        prevLabel={<FaAngleLeft />}
      />
    </Container>
  );
};
