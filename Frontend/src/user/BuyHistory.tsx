import Header from "../shared/components/ui/Header";
import Box from "../shared/components/ui/Box";
import { useEffect, useState } from "react";
import OrderItems from "./OrderItems";
import { useGet } from "../service/crudService";

function BuyHistory() {
  const { data: buyhistory, setData: setBuyHistory } = useGet(
    "/database/buyhistory.json"
  );

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="User" />
      <Box
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        width="75%"
        height="100%"
      >
        {buyhistory.map((order: any) => (
          <OrderItems data={order} />
        ))}
      </Box>
    </div>
  );
}

export default BuyHistory;
