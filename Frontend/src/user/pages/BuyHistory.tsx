import HeaderUser from "../../shared/components/ui/HeaderUser";
import Box from "../../shared/components/ui/Box";
import OrderItems from "../pagecontents/OrderItems";
import { useGet } from "../../service/crudService";
import UserProfileNavigation from "../../shared/components/ui/UserProfileNavigation";

function BuyHistory() {
  const { data: buyhistory } = useGet("/database/buyhistory.json");

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUser />
      <div className="flex gap-[var(--medium-gap)] w-[75%]">
        <UserProfileNavigation className="w-[25%] h-[auto]" />
        <Box
          className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
          width="75%"
        >
          {buyhistory.map((order: any) => (
            <OrderItems data={order} />
          ))}
        </Box>
      </div>
    </div>
  );
}

export default BuyHistory;
