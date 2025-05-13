import Header from "../shared/components/ui/Header";
import Box from "../shared/components/ui/Box";
import { useEffect, useState } from "react";
import OrderItems from "../shared/components/list/OrderItems";



function BuyHistory() {
  const [buyhistory, setBuyHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("/database/buyhistory.json")
      .then((res) => res.json())    
      .then((data) => setBuyHistory(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
        <Header role="User" />
        <Box className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]" width="75%" height="100%">
          {buyhistory.map((order) => (
            <OrderItems data={order}/>
          ))}
        </Box>
    </div>
  );
}

export default BuyHistory; 
