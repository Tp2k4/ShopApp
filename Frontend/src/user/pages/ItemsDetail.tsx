import HeaderUser from "../../shared/components/ui/HeaderUser";
import { useGet } from "../../service/crudService";
import { Button } from "../../shared/components/button";
import { useParams } from "react-router-dom";
import ImageGallery from "../pagecontents/ImageGallery";
import AddItemsButton from "../../shared/components/button/AddItemsButton";

function ItemsDetail() {
  const { category_id, id } = useParams();
  const { data } = useGet(`http://localhost:8020/api/v1/gmshop/product/${id}`);
  if (!data || !data.specs) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-[var(--medium-gap)] overflow-x-auto overflow-y-auto items-center">
      <HeaderUser className="fixed top-0 z-50" />
      <div className="pt-[calc(var(--medium-gap)_+_var(--header-height))] w-full gap-[var(--medium-gap)] flex flex-col max-w-[1200px]">
        <div className="flex flex-col w-full overflow-hidden rounded-md md:flex md:flex-row">
          <div className="h-auto w-full p-[var(--big-gap)] md:w-[50%] bg-white ]">
            <ImageGallery imagesSource={data.productImages} />
          </div>
          <div className="flex flex-col gap-[var(--small-gap)] items-start p-[var(--big-gap)] h-auto w-full md:w-[50%] heading3 bg-white">
            <strong>{data.name}</strong>

            <div className="flex gap-[var(--small-gap)]">
              <span className="font-semibold text-red-500 heading3">
                {data.price?.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-black opacity-[var(--caption-opacity)]  line-through decoration-[1px] heading3">
                {data.originPrice?.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-[var(--small-gap)]">
              <Button text="Mua ngay" type="button" />
              <AddItemsButton productId={data.id} price={data.price} />
            </div>
            <div>
              <strong>Hãng: </strong>
              <span>{data.brand_id}</span>
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
        <div className="flex flex-col md:items-start md:flex-row gap-[var(--medium-gap)] w-full">
          <div className="md:w-[70%] w-full h-auto bg-white rounded-md p-[var(--big-gap)] flex flex-col gap-[var(--medium-gap)]">
            <div>{data.description_1}</div>
            <div>{data.description_2}</div>
            <div>{data.description_3}</div>
          </div>
          <div className="md:w-[30%] w-full p-[var(--big-gap)] flex flex-col gap-[var(--medium-gap)] bg-white rounded-md h-auto ">
            <div className="font-bold heading3">Thông số kỹ thuật</div>
            <table className="w-full h-full border border-[var(--line-color)] ">
              <tr className="border-b border-[var(--line-color)]">
                <th className="border-r border-[var(--line-color)] w-1/2">
                  Tên Thông số
                </th>
                <th>Giá trị</th>
              </tr>
              {data.specs &&
                Object.entries(data.specs as Record<string, any>).map(
                  ([key, value]) => (
                    <tr
                      className="border-b border-[var(--line-color)]"
                      key={key}
                    >
                      <td className="border-r border-[var(--line-color)] w-1/2">
                        {key}
                      </td>
                      <td>{value}</td>
                    </tr>
                  )
                )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsDetail;
