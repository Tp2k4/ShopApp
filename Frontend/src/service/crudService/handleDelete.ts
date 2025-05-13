export const handleDelete = async (
    id: string,
    apiPath: string,
    setFunction: React.Dispatch<React.SetStateAction<any[]>>
)=>{
    try{
        const response = await fetch(`${apiPath}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(response.ok){
            setFunction((prevItems) => prevItems.filter(
                (item) => item.id !== id
            ));
        } else {
            alert("Lỗi khi xóa.")
        }

    } catch (error){
        alert(error)
    }
}