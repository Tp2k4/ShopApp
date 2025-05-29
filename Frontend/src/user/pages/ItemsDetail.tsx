import HeaderUser from "../../shared/components/ui/HeaderUser";
import { useGet } from "../../service/crudService";
import { Button } from "../../shared/components/button";
import sample from "../../assets/avatar/sample.jpg";

function ItemsDetail() {
  const { data } = useGet("/database/items.json");
  if (!data || !data.specs) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-[var(--medium-gap)] overflow-x-hidden overflow-y-auto items-center">
      <HeaderUser className="fixed top-0 z-50" />
      <div className="pt-[calc(var(--medium-gap)_+_var(--header-height))] w-full gap-[var(--medium-gap)] flex flex-col max-w-[1200px] ">
        <div className="flex flex-grow-0 flex-shrink-0 aspect-[5/2] w-full ">
          <div className="flex flex-col h-full w-[50%] bg-white border-r border-[var(--line-color)]">
            <div className=" w-full h-5/6 p-[var(--medium-gap)]">
              <img
                src={sample}
                alt="Product Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center justify-center w-full h-1/6">
              <div className="h-full aspect-square">
                <img
                  src={sample}
                  alt="Product Thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--small-gap)] items-start p-[var(--medium-gap)] wh-full min-w-[50%] bg-white">
            <strong>{data.product_name}</strong>

            <div className="flex flex-col gap-[var(--small-gap)]">
              <span>{data.sell_price}</span>
              <span>{data.original_price}</span>
            </div>
            <Button text="Mua ngay" type="button" />
            <div>
              <strong>Hãng: </strong>
              <span>{data.brand}</span>
            </div>
            <div>
              <strong>Bảo hành: </strong>
              <span>{data.specs?.warranty}</span>
            </div>
            <div>
              <strong>Loại: </strong>
              <span>{data.specs?.color}</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-white">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsDetail;
