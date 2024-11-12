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
  currentPage: number;
  totalPages: number
  handlePagination: (newPage: number) => void;
}

const AccountsPagination: React.FC<PaginationComponentProps> = ({
  currentPage,  
  totalPages,
  handlePagination,
}) => {


  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage === 1 ? `${styles.disabled} pointer-events-none opacity-50` : 'cursor-pointer'}
            onClick={() => handlePagination(currentPage - 1)
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
            className={currentPage >= totalPages ? `${styles.disabled} pointer-events-none opacity-50` : 'cursor-pointer'}
            onClick={() => handlePagination(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AccountsPagination;