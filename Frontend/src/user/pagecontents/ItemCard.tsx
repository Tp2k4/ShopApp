import sample from "../../assets/avatar/sample.jpg";
import Icon from "../../shared/components/ui/DynamicIcon";
export default function ItemCard() {
  return (
    <div className="items-center justify-start w-[var(--itemcard-width)] h-auto flex flex-col bg-white pt-[4px] rounded-sm border-stone-300 border-[1px]">
      <div className="flex flex-col items-center justify-center w-[var(--itembox-width)] h-auto gap-[var(--small-gap)]">
        <img src={sample} alt="Item" className="object-cover w-full h-full" />
        <div className=" font-bold body-text w-[200px] h-auto overflow-visible break-words text-left ">
          Tai nghe gaming gear
        </div>
        <div className="flex flex-wrap items-center justify-center bg-stone-300 rounded-md h-[50px] w-[200px] gap-[var(--small-gap)] p-[var(--smallest-gap)]">
          <div className="flex justify-center items-center gap-[var(--smallest-gap)]">
            <Icon
              name="BiBluetooth"
              className="opacity-[var(--caption-opacity)] text-[10px]"
            />
            <div className=" opacity-[var(--caption-opacity)] items-spec">
              wireless
            </div>
          </div>
          <div className="flex justify-center items-center gap-[var(--smallest-gap)]">
            <Icon
              name="BiHeadphone"
              className="opacity-[var(--caption-opacity)] text-[10px]"
            />
            <div className=" opacity-[var(--caption-opacity)] items-spec">
              chụp tai
            </div>
          </div>
          <div className="flex justify-center items-center gap-[var(--smallest-gap)]">
            <Icon
              name="BiUsb"
              className="opacity-[var(--caption-opacity)] text-[10px]"
            />
            <div className=" opacity-[var(--caption-opacity)] items-spec">
              USB-A
            </div>
          </div>
          <div className="flex justify-center items-center gap-[var(--smallest-gap)]">
            <Icon
              name="BiUsb"
              className="opacity-[var(--caption-opacity)] text-[10px]"
            />
            <div className=" opacity-[var(--caption-opacity)] items-spec">
              USB-A
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-[200px] h-auto gap-[var(--smallest-gap)]">
          <div className="flex justify-start w-full text-black opacity-[var(--caption-opacity)] body-text line-through">
            500000đ
          </div>
          <div className="flex justify-start w-full text-red-500 body-text">
            500000đ
          </div>
        </div>
      </div>
    </div>
  );
}
