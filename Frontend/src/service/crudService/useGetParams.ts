import { useState, useEffect, useCallback } from "react";

interface UseGetParamsOptions {
  enabled?: boolean; // Có tự động gọi API khi mount không, mặc định true
}

interface UseGetParamsResult<T> {
  data: T | null;
  refetch: () => void;
}

export function useGetParams<T = any>(
  apiPath: string,
  params: Record<string, any>,
  options: UseGetParamsOptions = { enabled: true }
): UseGetParamsResult<T> {
  const { enabled = true } = options;

  const [data, setData] = useState<T | null>(null);

  const token = localStorage.getItem("token");

  // 
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  // Hàm gọi API
  const fetchData = useCallback(() => {
    if (!apiPath) return;

    const fullUrl = apiPath + queryString;

    const fetchData = async () => {
        try{
            const response = await fetch(fullUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
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

    fetchData()    
  }, [params]);

  // Tự động gọi API khi mount hoặc params/url thay đổi nếu enabled = true
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, refetch: fetchData };
}