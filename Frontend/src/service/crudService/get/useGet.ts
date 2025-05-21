import { useState, useEffect } from "react";

export const useGet = (
    apiPath: string,
) => {
    const [data, setData] = useState<any>([]);

    const token = localStorage.getItem("token");

    useEffect(()=>{

        const fetchData = async () => {
            try{
                const response = await fetch(apiPath, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if(response.ok){
                    const data = await response.json()
                    setData(data)
                } else {
                    alert("Lỗi không lấy được dữ liệu")
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])
    return {data, setData};
}