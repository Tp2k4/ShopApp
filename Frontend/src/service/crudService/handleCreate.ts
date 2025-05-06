export const handleCreate = async (
    apiPath: string,
    newItem: any,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setNewItem: React.Dispatch<React.SetStateAction<any>>
) => {

    try{
        const response = await fetch(`${apiPath}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(newItem),
        })

        if(response.ok){
            const addedItem = await response.json()
            setItems((prevItems) => [...prevItems, addedItem]);
            
            // set tất cả các trường về mặt định ""
            setNewItem((prevOrder: any) => {
                const resetOrder: any = {};
                for (const key in prevOrder) {
                  if (Object.prototype.hasOwnProperty.call(prevOrder, key)) {
                    resetOrder[key] = "";
                  }
                }
                return resetOrder;
            });

        } else {
            alert("Lỗi khi thêm sản phẩm.")
        }
    } catch (error) {
        alert(error)
    }
}