export const handleFilter = (
    selectedValue: string, 
    filterField: string,     
    items: any[]
) => {

    return items.filter((item)=> {
        // Lặp qua từng item, lưu trường dùng để lọc vào itemSearchTerm
        // Đồng thời định dạng viết thường hết cho dễ tìm kiếm
        const itemFieldValue = String(item[filterField]).toLowerCase();
        
        // Định dạng xóa khoảng trắng ở đầu và cuối, viết thường cho input search người dùng nhập vào
        const filterValueNormalized = selectedValue.toLowerCase().trim();
        
        return itemFieldValue.includes(filterValueNormalized);
    });
}

