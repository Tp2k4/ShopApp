import {useState, useEffect} from "react";
import { handleFilter } from "./handleFilter";

export function useFilter (items: any[], filterOptions: string[], typeFilter: string) {
    // Này là option tất cả. 
    const all = filterOptions[0]
    const [selectedFilter, setSelectedFilter] = useState(all);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);

    useEffect(() => {
        let filtered = items;
        
        if (selectedFilter !== all) {
          filtered = handleFilter(selectedFilter, typeFilter, filtered);
        }
        setFilteredItems(filtered);
      }, [selectedFilter, items]);

    return {filteredItems, selectedFilter, setSelectedFilter}
}