// import { useState, useEffect } from "react";

// export const useGetProducts
//  = (
//     apiPath: string,
//     params?: Record<string, string | number | boolean>
// ) => {
//     const [data, setData] = useState<{
//         products: any[];
//         totalPages: number;
//     } | null>(null);

//     const token = localStorage.getItem("token");

//     useEffect(()=>{
        
//         // Tạo query string từ params
//         const queryString = params
//             ? "?" + new URLSearchParams(params as Record<string, string>).toString()
//             : "";
        
//         const fullUrl = apiPath + queryString;

//         const fetchData = async () => {
//             try{
//                 const response = await fetch(fullUrl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                 });

//                 if (response.ok) {
//                     if (response.status === 204) { // No Content
//                         setData(null);
//                     } else {
//                         const data = await response.json();
//                         setData(data);
//                     }
//                 } else {
//                     const error = await response.text();
//                     throw new Error(error || 'Lỗi không lấy được dữ liệu');
//                 }
//             } catch (error) {
//                 alert(error)
//             }
//         }
//         fetchData();
//     }, [apiPath, JSON.stringify(params)])
//     return {data, setData};
// }

import { useState, useEffect } from "react";

export const useGetProducts = (apiPath: string) => {
    const [data, setData] = useState<{
        products: any[];
        totalPages: number;
    } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Không có token thì không gọi API
        if (!token) {
            console.error("Không tìm thấy token.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(apiPath, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (response.ok) {
                    if (response.status === 204) {
                        setData(null); // Không có nội dung
                    } else {
                        const json = await response.json();
                        setData(json);
                    }
                } else {
                    const error = await response.text();
                    throw new Error(error || "Lỗi không lấy được dữ liệu.");
                }
            } catch (error) {
                console.error("Lỗi khi fetch sản phẩm:", error);
                alert("Lỗi khi lấy dữ liệu sản phẩm. Xem console để biết chi tiết.");
            }
        };

        fetchData();
    }, [apiPath]);

    return { data, setData };
};
