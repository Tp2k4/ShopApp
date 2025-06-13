
export const handleModify = async (
    apiPath: string,
    id: number,
    itemInfo: any,
    setItemInfo: React.Dispatch<React.SetStateAction<any>>,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,

) => {
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(apiPath + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(itemInfo),
        }
        );

        if (response.ok) {
            setItemInfo((prevOrder: any) => {
                const resetOrder: any = {};
                for (const key in prevOrder) {
                    if (Object.prototype.hasOwnProperty.call(prevOrder, key)) {
                        resetOrder[key] = "";
                    }
                }
                return resetOrder;
            });
            alert("Sửa thông tin thành công.");
        } else {
            alert("Sửa thông tin thất bại.");
        }

        setShowPopup(false);
    } catch (error){
        alert(error)
    }
  };