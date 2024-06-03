import React from "react";
import searchIcon from "../../assets/img/search-icon.svg"
interface ISearchBar {
  searchValue: string;
  setSearchValue: (e:string) => void;
}
  const SearchBar: React.FC<ISearchBar> = ({searchValue,setSearchValue}) => {
  return (
      <div className="bg-[#f3f3f3] flex gap-4 rounded items-center p-2">
        <img src={searchIcon} alt="search-icon" />
        <input className="w-full p-0 leading-none focus:outline-none bg-[transparent]"
          type="text"
          placeholder="Type a search query to filter"
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
        >
        </input>
      </div>
  )
}
export default SearchBar;