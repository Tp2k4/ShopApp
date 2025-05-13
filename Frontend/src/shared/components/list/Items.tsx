import Line from "../ui/Line";
import Button from "../button/Button";
function Items() {


  return (
    <div className="flex flex-col gap-[var(--medium-gap)]">
        <div>Đang vận chuyển </div>
        <Line width="w-full"/>
        <div className="gap-[var(--medium-gap)] w-full flex items-center justify-between">
            <div className="flex  items-center gap-[var(--medium-gap)]">
              <div className="w-[80px] h-[80px] bg-[var(--primary-color)] rounded-sm"></div>
              <div className="flex flex-col">
                  <div>Tai nghe gaming vippro</div>
                  <div className="opacity-[var(--caption-opacity)]">Phân loại: Hồng</div>
                  <div className="opacity-[var(--caption-opacity)]">x1</div>
              </div>
            </div>
            <div className="flex flex-col gap-[var(--medium-gap)]">
              <div className="flex gap-[var(--small-gap)]">
                <div className="line-through text-[var(--original-price-color)]">400000đ</div>
                <div className="text-[var(--discounted-price-color)]">500000đ</div>
              </div>
              <div className="flex justify-end"><Button text="Mua lại" type="button" width="w-auto"/></div>
            </div>
        </div>
        
    </div>
  );
}

export default Items;

