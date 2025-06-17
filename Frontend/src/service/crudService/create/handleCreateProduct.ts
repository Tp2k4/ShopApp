export const handleCreateProduct = async (
    
    apiPath: string,
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    newItemInfo: any,
    setNewItemInfo: React.Dispatch<React.SetStateAction<any>>,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    // Lấy token
    const token = localStorage.getItem("token")

    // Tạo formData, cần thiết cho việc truyền data về backend nếu data có chứa file
    // Nếu data truyền về backend không có file, thì truyền bằng json như như bình thường
    const formData = new FormData();
    // Thêm tất cả ảnh từ formData (formData này có được setFiles bên ImportImage) vào files
    files.forEach(file => formData.append("productImages", file))

    try{    
        const response = await fetch(apiPath, {
            method: "POST", 
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

            // Gọi API thêm ảnh
            const productId = String(newProductJson.id)

            const responseForAddImage = await fetch("https://gm-12tk.onrender.com/api/v1/gmshop/product/upload-img/" + productId, {
                method: "POST", 
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })

            if (responseForAddImage.ok){
                alert("Thêm thành công.");
                setFiles([]);
            } else {
                alert("Đã thêm thông tin sản phẩm thành công nhưng lỗi khi gọi API thêm ảnh");
            }

            setShowPopup(false); // chỉ gọi 1 lần



        } else {
            alert("Lỗi khi thêm.")
        }
    } catch (error) {
        alert(error)
    }
}