// import { useState, useEffect } from "react";

// export const useGet = (apiPath: string) => {
//   const [data, setData] = useState<any>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const headers: HeadersInit = {
//           "Content-Type": "application/json",
//         };

//         if (token) {
//           headers["Authorization"] = `Bearer ${token}`;
//         }

//         const response = await fetch(apiPath, {
//           method: "GET",
//           headers: headers,
//         });

//         if (!response.ok) {
//           alert("Lỗi không lấy được dữ liệu");
//           return;
//         }

//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         alert("Đã xảy ra lỗi: " + error);
//       }
//     };

//     fetchData();
//   }, [apiPath]);

//   return { data, setData };
// };

import { useState, useEffect } from "react";

export const useGet = (apiPath: string) => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(apiPath, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        alert("Lỗi không lấy được dữ liệu");
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      alert("Đã xảy ra lỗi: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiPath]);

  return { data, setData };
};
