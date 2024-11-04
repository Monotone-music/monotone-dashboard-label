import React, { useState } from "react";
import styles from "./styles.module.scss";
import AccountsBreadcrumb from "../AccountsBreadcrumb/AccountsBreadcrumb";
import AccountsMobileCard from "../AccountsMobileCard/AccountsMobileCard";
import dataArtist from "../../../../data/mockArtistData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AccountsPagination from "../AccountsPagination/AccountsPagination";

const ArtistAccount = () => {
  const rowPerPage = 5;
  const [data, setData] = useState(dataArtist);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(data.length / rowPerPage);
  const currentPage = Math.floor(startIndex / rowPerPage) + 1;

  const handlePagination = (newStartIndex: number, newEndIndex: number) => {
    setLoading(true);
    setTimeout(() => {
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
      setLoading(false);
    }, 500); // Simulate loading delay
  };

  return (
    <div className={styles.container}>
      <AccountsBreadcrumb
        stage1Link="/admin/accounts-management/artist"
        stage1Title="Artists"
      />

      <div className={styles["list-wrapper"]}>
        {loading ? (
          <div className={styles.loading}>Loading...</div> // Replace with your loading indicator component
        ) : (
          <div className={styles["list-wrapper"]}>
            {data.slice(startIndex, endIndex).map((item, index) => (
              <AccountsMobileCard
                key={index}
                firstName={item.firstName}
                lastName={item.lastName}
              />
            ))}
          </div>
        )}
      </div>

      <AccountsPagination
        startIndex={startIndex}
        endIndex={endIndex}
        rowPerPage={rowPerPage}
        totalItems={data.length}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default ArtistAccount;
