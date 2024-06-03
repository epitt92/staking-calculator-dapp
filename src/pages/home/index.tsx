import React, { useState } from "react";
import SearchBar from "../../components/searchBar";
import SpreadSheet from "../../components/spreadsheet";
const Home:React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  
  return (
    <div className="p-3 h-full flex flex-col">
      <h1 className="text-left font-bold text-[black] text-3xl">
        Your Personal Staking Calculator
      </h1>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex gap-4 rounded items-center p-2 mt-4 flex-grow overflow-hidden h-full">
        <SpreadSheet columns={3} searchValue={searchValue}/>
      </div>
    </div>
  )
}

export default Home;