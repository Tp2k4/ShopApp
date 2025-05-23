export const handleDelete = async (
    
    apiPath: string,
    id: string,
    setFunction: React.Dispatch<React.SetStateAction<any[]>>
)=>{
    const token = localStorage.getItem("token");

    try{
        const response = await fetch(apiPath + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
        })

        if(response.ok){
            setFunction((prevItems) => prevItems.filter(
                (item) => String(item.id) !== id
            ));
        } else {
            const errorData = await response.json();
            alert(`Lỗi khi xóa: ${errorData.message || 'Không xác định'}`);
        }

    } catch (error){
        alert(`Lỗi khi xóa: ${error instanceof Error ? error.message : 'Không xác định'}`);
    }
}