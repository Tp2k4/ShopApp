import { useState, useEffect } from "react";

export const useGet = (
    apiPath: string,
) => {
    const [data, setData] = useState<any>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(apiPath, {
                    method: "GET",
                    headers: {
                    //   Authorization: `Bearer ${token}`, 
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