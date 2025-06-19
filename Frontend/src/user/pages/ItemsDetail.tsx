import HeaderUserNoSearch from "../../shared/components/ui/HeaderUserNoSearch";
import { useGet } from "../../service/crudService";
import { BASE_API } from "../../shared/paths";
import { useParams } from "react-router-dom";
import ImageGallery from "../pagecontents/ImageGallery";
import AddItemsButton from "../../shared/components/button/AddItemsButton";
import { useState } from "react";
import PopupConfirm from "../popup/PopupConfirm";
import Footer from "../../shared/components/ui/Footer";
import { ROUTES } from "../../shared/paths";
function ItemsDetail() {
  // Popup
  const [showPopup, setShowPopup] = useState(false);

  const { id } = useParams();
  const { data } = useGet(`${BASE_API}product/${id}`);
  if (!data || !data.specs) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="h-full w-screen flex flex-col gap-[var(--medium-gap)] overflow-x-auto overflow-y-auto items-center">
      <HeaderUserNoSearch className="fixed top-0 z-50" />
      <div className="pt-[calc(var(--medium-gap)_+_var(--header-height))] w-full gap-[var(--medium-gap)] flex flex-col max-w-[1200px]">
        <div className="flex flex-col w-full overflow-hidden rounded-md md:flex md:flex-row">
          <div className="h-auto w-full p-[var(--big-gap)] md:w-[50%] bg-white ]">
            <ImageGallery imagesSource={data.productImages} />
          </div>
          <div className="flex flex-col gap-[var(--small-gap)] items-start p-[var(--big-gap)] h-auto w-full md:w-[50%] heading3 bg-white">
            <strong className="heading2">{data.name}</strong>

            <div className="flex gap-[var(--small-gap)]">
              <span className="font-semibold text-red-500 heading3">
                {data.sellPrice?.toLocaleString("vi-VN")}đ
              </span>
              {data.sellPrice < data.price && (
                <span className="text-black opacity-[var(--caption-opacity)]  line-through decoration-[1px] heading3">
                  {data.price?.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-[var(--small-gap)]">
              <AddItemsButton
                productId={data.id}
                price={data.price}
                text="Thêm vào giỏ hàng"
                setShowPopup={setShowPopup}
              />
              <AddItemsButton
                text="Mua ngay"
                productId={data.id}
                price={data.price}
                setShowPopup={setShowPopup}
                link={ROUTES.USER.SHOPPING_CART}
              />
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
        <div className="flex flex-col md:items-start md:flex-row gap-[var(--medium-gap)] -full">
          <div className="md:w-[70%] w-full h-auto bg-white rounded-md p-[var(--big-gap)] flex flex-col gap-[var(--medium-gap)]">
            <div className="font-bold heading3">Thông tin mô tả</div>
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
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Màu sắc
                </td>
                <td>{data.specs.color || "Không có thông tin"}</td>
              </tr>
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Dung lượng pin (mAh)
                </td>
                <td>{data.specs.battery || "Không có thông tin"}</td>
              </tr>
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Thời gian bảo hành
                </td>
                <td>{data.specs.warranty || "Không có thông tin"}</td>
              </tr>
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Loại kết nối
                </td>
                <td>{data.specs.connectionType || "Không có thông tin"} </td>
              </tr>
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Cân nặng
                </td>
                <td>{data.specs.weight || "Không có thông tin"} </td>
              </tr>
              <tr className="border-b border-[var(--line-color)]">
                <td className="border-r border-[var(--line-color)] w-1/2">
                  Led
                </td>
                <td>{data.specs.led ? "Có" : "Không"} </td>
              </tr>
              {data.category_id === "keyboard" && (
                <tr className="border-b border-[var(--line-color)]">
                  <td className="border-r border-[var(--line-color)] w-1/2">
                    Kiểu bàn phím
                  </td>
                  <td>{data.specs.numKeys} phím </td>
                </tr>
              )}
              {data.category_id === "keyboard" && (
                <tr className="border-b border-[var(--line-color)]">
                  <td className="border-r border-[var(--line-color)] w-1/2">
                    Loại công tắc (switch)
                  </td>
                  <td>{data.specs.switchType} </td>
                </tr>
              )}
              {data.category_id === "mouse" && (
                <tr className="border-b border-[var(--line-color)]">
                  <td className="border-r border-[var(--line-color)] w-1/2">
                    Độ phân giải tối đa (Max DPI)
                  </td>
                  <td>{data.specs.maxDpi}</td>
                </tr>
              )}
              {data.category_id === "headphone" && (
                <tr className="border-b border-[var(--line-color)]">
                  <td className="border-r border-[var(--line-color)] w-1/2">
                    Khử tiếng ồn
                  </td>
                  <td>{data.specs.noiseCancelling ? "Có" : "Không"}</td>
                </tr>
              )}
              {data.category_id === "headphone" && (
                <tr className="border-b border-[var(--line-color)]">
                  <td className="border-r border-[var(--line-color)] w-1/2">
                    Micro
                  </td>
                  <td>{data.specs.hasMic ? "Có" : "Không"}</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
      <Footer className="" />
      {showPopup && <PopupConfirm setShowPopup={setShowPopup} />}
    </div>
  );
}

export default ItemsDetail;
