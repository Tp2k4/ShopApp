import { Button, CancelButton } from "../../../shared/components/button";
import { handleDelete } from "../../../service/crudService";

import React from "react";

interface PopupConfirmDelete {
  apiPath: string;
  setItems: React.Dispatch<React.SetStateAction<any>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItemId: string;
}

const PopupConfirmDelete = ({
  apiPath,
  setItems,
  setShowPopup,
  selectedItemId,
}: PopupConfirmDelete) => {
  return (
    <div className="fixed z-49 inset-0 flex items-center justify-center">
      {/* Nền đen mờ */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Hộp thoại trắng */}
      <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
        <div>Bạn chắc chắn muốn xóa?</div>
        <div className="flex gap-[var(--small-gap)]">
          <Button
            type="button"
            text="Xóa"
            onClick={() => {
              handleDelete(apiPath, selectedItemId, setItems);
              setShowPopup(false);
            }}
          />
          <CancelButton text="Hủy" onClick={() => setShowPopup(false)} />
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmDelete;
