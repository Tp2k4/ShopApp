export const handleModifyProduct = async (
    
    apiPath: string,
    id: number,
    files: File[],
    newItemInfo: any,
    setNewItemInfo: React.Dispatch<React.SetStateAction<any>>,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    // Lấy token
    const token = localStorage.getItem("token")

    // Tạo formData, cần thiết cho việc truyền data về backend nếu data có chứa file
    // Nếu data truyền về backend không có file, thì truyền bằng json như như bình thường
    const formData = new FormData();
    // Thêm tất cả ảnh từ formData (formData này có được setFiles bên ImportImage) vào filesfiles
    files.forEach(file => formData.append("productImages", file))

    try{    
        const response = await fetch(apiPath + id, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            body: JSON.stringify(newItemInfo),
        })

        // Kiểm tra nếu gọi thành công thì hiển thị ngay trên màn hình rồi đặt các trường thuộc tính thông tin về mặc định
        if(response.ok){
            //Giúp update ngay item đã thêm lên màn hình mà không cần phải load lại trang
            const newProductJson = await response.json()
            setItems((prevItems) => [...prevItems, newProductJson]);
            
            // set tất cả các trường về mặt định ""
            setNewItemInfo((prevOrder: any) => {
                const resetOrder: any = {};
                for (const key in prevOrder) {
                  if (Object.prototype.hasOwnProperty.call(prevOrder, key)) {
                    resetOrder[key] = "";
                  }
                }
                return resetOrder;
            });

            // Gọi API chỉnh sửa ảnh
            const productId = String(newProductJson.id)

            const responseForAddImage = await fetch("http://localhost:8020/api/v1/gmshop/product/update-img/" + productId, {
                method: "PUT", 
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })

            if (!responseForAddImage.ok){
                alert("Lỗi khi gọi API chỉnh sửa ảnh")
            }


        } else {
            alert("Lỗi khi chỉnh sửa.")
        }
    } catch (error) {
        alert(error)
    }
}