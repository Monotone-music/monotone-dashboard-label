import { useState } from "react";
import styles from "./styles.module.scss";
import AccountsBreadcrumb from "../AccountsBreadcrumb/AccountsBreadcrumb";
import AccountsPagination from "../AccountsPagination/AccountsPagination";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { getAllArtists } from "@/service/adminService";
import AccountsMobileCard from "../AccountsMobileCard/AccountsMobileCard";
import { User } from "@/interface/User";
import PuffLoader from "react-spinners/PuffLoader";
import AccountsSearch from "../AccountsSearch/AccountsSearch";
import useMediaQuery from "@/util/useMediaQuery";
import AccountsTable from "../AccountsTable/AccountsTable";

const ArtistAccount = () => {
  const rowPerPage = 5;
  const { token } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery(`(max-width: 767px)`);

  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["artists", token, currentPage, searchQuery],
    queryFn: () =>
      getAllArtists(token, "artist", currentPage, rowPerPage, searchQuery),
  });

  const { accounts, total, totalPages } = data || {};

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Reset to the first page on a new search
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <AccountsBreadcrumb
        stage1Link="/admin/accounts-management/artist"
        stage1Title="Artists"
      />

      <AccountsSearch onSearch={handleSearch} />

      <div className={styles["list-wrapper"]}>
        {isFetching ? (
          <div className={styles.loading}>
            <PuffLoader color="black" />
          </div>
        ) : accounts && accounts.length > 0 ? (
          accounts.map((item: User, index: number) => {
            return isMobile ? (
              <AccountsMobileCard
                key={index}
                displayName={item.profile?.displayName}
                username={item.profile?.displayName}
              />
            ) : (
              <AccountsTable />
            );
          })
        ) : (
          <div className={styles.noResults}>
            No results found for "{searchQuery}"
          </div>
        )}
      </div>

      <AccountsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default ArtistAccount;
