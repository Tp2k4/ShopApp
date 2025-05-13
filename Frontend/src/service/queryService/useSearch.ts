import {useState, useEffect} from "react";
import { handleFilter } from "./handleFilter";

export function useSearch (items: any[], typeFilter: string) {
    // Này là option tất cả. 
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState<any[]>([]);

    useEffect(() => {
        let filtered = items;
        
        if (searchQuery !== "") {
          filtered = handleFilter(searchQuery, typeFilter, filtered);
        }
        setFilteredItems(filtered);
      }, [searchQuery, items]);

    return {filteredItems, searchQuery, setSearchQuery}
}