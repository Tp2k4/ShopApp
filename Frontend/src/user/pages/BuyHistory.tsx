import HeaderUserNoSearch from "../../shared/components/ui/HeaderUserNoSearch";
import Box from "../../shared/components/ui/Box";
import OrderItems from "../pagecontents/OrderItems";
import { useGet } from "../../service/crudService";
import UserProfileNavigation from "../../shared/components/ui/UserProfileNavigation";
import { BASE_TEST_API } from "../../shared/paths";
import Footer from "../../shared/components/ui/Footer";

function BuyHistory() {
  const { data: buyhistory } = useGet(`${BASE_TEST_API}orders/user/history`);

  return (
    <div className="h-full w-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <HeaderUserNoSearch />
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
      <Footer className="" />
    </div>
  );
}

export default BuyHistory;
