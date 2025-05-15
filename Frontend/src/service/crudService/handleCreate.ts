export const handleCreate = async (
    apiPath: string,
    newItemInfo: any,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setNewItemInfo: React.Dispatch<React.SetStateAction<any>>
) => {

    try{
        const response = await fetch(apiPath, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
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

        } else {
            alert("Lỗi khi thêm.")
        }
    } catch (error) {
        alert(error)
    }
}