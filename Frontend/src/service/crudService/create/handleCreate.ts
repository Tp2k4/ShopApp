export const handleCreate= async (
    apiPath: string,
    newItemInfo: any,
    setNewItemInfo: React.Dispatch<React.SetStateAction<any>>,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const token = localStorage.getItem("token")

    try{
        const response = await fetch(apiPath, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

              },
            body: JSON.stringify(newItemInfo),
        })

        if(response.ok){

          //Giúp update ngay item đã thêm lên màn hình mà không cần phải load lại trang
          const addedItem = await response.json()
          setItems((prevItems) => [...prevItems, addedItem]);
          
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

          setShowPopup(false);
          alert("Thêm thành công.")

        } else {
            alert("Lỗi khi thêm.")
        }
    } catch (error) {
        alert(error)
    }
}