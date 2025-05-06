import Button from "../button/Button";
import DetailButton from "../button/DetailButton";
import Avatar from "../ui/Avatar";

import { useToggleDetail } from "../../utils/useToggleDetail";
import React from "react";

const NUM_COLUMNS = 7;

interface AccountListProps<T = any> {
  accounts: T[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function AccountList({
  accounts,
  children,
  className = "",
  ...rest
}: AccountListProps) {
  const { openDetailIds, toggleDetail } = useToggleDetail();

  return (
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Stt</th>
          <th>Username</th>
          <th>Họ và tên</th>
          <th>Số điện thoại</th>
          <th>Trạng thái</th>
          <th>Vai trò</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.name}</td>
              <td>{account.phone}</td>
              <td>{account.state}</td>
              <td>{account.role}</td>
              <td className="!py-0">
                <div className="flex gap-[var(--small-gap)] justify-end">
                  <DetailButton
                    onClick={() => toggleDetail(index)}
                    text="Chi tiết"
                  />
                  <Button
                    className="text-[var(--caption)]"
                    type="button"
                    text="Chỉnh sửa"
                    width="auto"
                  />
                </div>
              </td>
            </tr>

            {openDetailIds.includes(index) && (
              <tr>
                <td className="bg-white" colSpan={NUM_COLUMNS}>
                  <div className="caption flex flex-col gap-[var(--small-gap)] border border-[var(--line-color)] rounded-md p-[var(--small-gap)]">
                    <p>
                      <strong>Địa chỉ: </strong> {account.address}{" "}
                    </p>
                    <p>
                      <strong>Email: </strong> {account.email}{" "}
                    </p>
                    <Avatar src={account.avatar} size="24px" />
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default AccountList;
