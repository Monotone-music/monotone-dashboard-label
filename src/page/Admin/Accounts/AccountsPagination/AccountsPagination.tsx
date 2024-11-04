import React from "react";
import styles from "./styles.module.scss";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  startIndex: number;
  endIndex: number;
  rowPerPage: number;
  totalItems: number;
  handlePagination: (newStartIndex: number, newEndIndex: number) => void;
}

const AccountsPagination: React.FC<PaginationComponentProps> = ({
  startIndex,
  endIndex,
  rowPerPage,
  totalItems,
  handlePagination,
}) => {
  const totalPages = Math.ceil(totalItems / rowPerPage);
  const currentPage = Math.floor(startIndex / rowPerPage) + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={startIndex === 0 ? `${styles.disabled} pointer-events-none opacity-50` : undefined}
            onClick={() =>
              handlePagination(startIndex - rowPerPage, endIndex - rowPerPage)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <span className={styles.pageNumber}>
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={endIndex >= totalItems ? `${styles.disabled} pointer-events-none opacity-50` : undefined}
            onClick={() =>
              handlePagination(startIndex + rowPerPage, endIndex + rowPerPage)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AccountsPagination;