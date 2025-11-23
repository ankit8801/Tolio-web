import { createContext } from "react";

const SearchContext = createContext({
  search: "",
  setSearch: () => {},
  searchRef: null,
  focusSearchBox: () => {},
});

export default SearchContext;
