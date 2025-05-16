import { useState, useEffect } from "react";

export const handleUpdate = (
    apiPath?: string,
) => {
    const [data, setData] = useState<any>([]);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8020/api/v1/gmshop/promotion/set-promotion/3", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`, 
                    },
                });

                if(response.ok){
                    const json = await response.json()
                    setData(json)
                } else {
                    alert("Lỗi khi thêm sản phẩm.")
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])
    return {data, setData};
}