import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AccountsSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const AccountsSearch: React.FC<AccountsSearchProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input); // Pass the input back to the parent component after debouncing
    }, 300);

    return () => clearTimeout(delayDebounce); // Clear the timeout if input changes
  }, [input, onSearch]);

  const handleClear = () => {
    setInput("");
    onSearch(""); // Clear the search results
  };
  return (
    <div className={styles.searchContainer}>
    <Input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      className={styles.searchBar}
    />
    {input && (
      <Button onClick={handleClear} className={styles.clearButton}>
        Clear
      </Button>
    )}
  </div>
  );
};

export default AccountsSearch;
