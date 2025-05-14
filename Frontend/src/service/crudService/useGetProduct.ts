import { useState, useEffect } from "react";

export const useGetProduct = (
    apiPath: string,
    params?: Record<string, string | number | boolean>
) => {
    const [data, setData] = useState<{
        products: any[];
        totalPages: number;
    } | null>(null);

    const token = localStorage.getItem("token");

    useEffect(()=>{
        
        // Tạo query string từ params
        const queryString = params
            ? "?" + new URLSearchParams(params as Record<string, string>).toString()
            : "";
        
        const fullUrl = apiPath + queryString;

        const fetchData = async () => {
            try{
                const response = await fetch(fullUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    // credentials: "include"
                });

                if (response.ok) {
                    if (response.status === 204) { // No Content
                        setData(null);
                    } else {
                        const data = await response.json();
                        setData(data);
                    }
                } else {
                    const error = await response.text();
                    throw new Error(error || 'Lỗi không lấy được dữ liệu');
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])
    return {data, setData};
}