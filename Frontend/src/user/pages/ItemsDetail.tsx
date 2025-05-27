import HeaderUser from "../../shared/components/ui/HeaderUser";
import { useGet } from "../../service/crudService";
import { Button } from "../../shared/components/button";

function ItemsDetail() {
  const { data } = useGet("/database/items.json");
   if (!data || !data.specs) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-[var(--medium-gap)] overflow-x-hidden">
      <HeaderUser className="fixed top-0 z-50" />
      <div className="pt-[calc(var(--medium-gap)_+_var(--header-height))] w-full h-full  overflow-x-hidden overflow-y-auto gap-[var(--medium-gap)] flex flex-col">
        <div className="flex min-h-[400px] w-full">
          <div className="min-h-[400px] min-w-[400px] bg-white border-r border-[var(--line-color)]"></div>
          <div className="flex flex-col gap-[var(--small-gap)] items-start p-[var(--medium-gap)] w-full h-full bg-white">
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
              <span>{data.specs.warranty}</span>
            </div>
            <div>
              <strong>Loại: </strong>
              <span>{data.specs.color}</span>
            </div>
          </div>
        </div>
        <div className="min-h-[300px] w-full h-full bg-white"></div>
      </div>
    </div>
  );
}

export default ItemsDetail;
