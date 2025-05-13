import { useState } from "react";

export function useToggleDetail(){
    const [openDetailIds, setOpenDetailIds] = useState<number[]>([]);

    //Hàm này dùng để thêm các id vào openDetailIds của những item được nhấn vào nút Chi tiết
    const toggleDetail = (id: number) => {
    setOpenDetailIds((prev) => {
        if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
        } else {
        return [...prev, id];
        }
    });
    };

    return { openDetailIds, toggleDetail };
}