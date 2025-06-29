import {
  Button,
  CancelButton,
  DetailButton,
} from "../../shared/components/button";
import { useToggleDetail } from "../../shared/utils/useToggleDetail";

import { useSearchParams } from "react-router-dom";
import React from "react";

const NUM_COLUMNS = 7;

interface AccountListProps<T = any> {
  setShowPopupModify: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopupConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setAccounts: React.Dispatch<React.SetStateAction<T[]>>;
  accounts: T[];
  setSelectedAccountId: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function AccountList({
  setShowPopupModify,
  setShowPopupConfirmDelete,
  setAccounts,
  accounts,
  setSelectedAccountId,
  children,
  className = "",
  ...rest
}: AccountListProps) {
  const [, setSearchParams] = useSearchParams();
  const { openDetailIds, toggleDetail } = useToggleDetail();

  return (
    <div className="max-h-[600px] overflow-y-auto">
      <table className={` ${className}`} {...rest}>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Vai trò</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, id) => (
            <React.Fragment key={id}>
              <tr>
                <td>{account.id}</td>
                <td>{account.name}</td>
                <td>{account.phoneNumber}</td>
                <td>{account.email}</td>
                <td>{account.state}</td>
                <td>{account.role}</td>
                <td className="!py-0">
                  <div className="flex gap-[var(--small-gap)] justify-end">
                    <DetailButton
                      onClick={() => toggleDetail(id)}
                      text="Chi tiết"
                    />
                    <Button
                      type="button"
                      text="Chỉnh sửa"
                      width="auto"
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set("id", account.id);
                            return newParams;
                          },
                          { replace: true }
                        );
                        setShowPopupModify(true);
                      }}
                    />
                    <CancelButton
                      text="Xóa"
                      onClick={() => {
                        setSelectedAccountId(account.id);
                        setShowPopupConfirmDelete(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
              {openDetailIds.includes(id) && (
                <tr>
                  <td className="bg-white" colSpan={NUM_COLUMNS}>
                    <div className="caption flex flex-col gap-[var(--small-gap)] border border-[var(--line-color)] rounded-md p-[var(--small-gap)]">
                      <p>
                        <strong>Địa chỉ: </strong> {account.address}{" "}
                      </p>
                      <p>
                        <strong>Ngày sinh: </strong> {account.dateOfBirth}{" "}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
