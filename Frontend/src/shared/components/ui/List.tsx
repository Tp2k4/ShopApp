import { Account } from "../../../interface/account";
import Button from "../button/Button";
import SelectButton from "../button/SelectButton";

interface ListProps {
  dict: Account[];
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function List({ dict, children, className = "", ...rest }: ListProps) {
  console.log(dict);

  return (
    <table className={` ${className}`} {...rest}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Họ và tên</th>
          <th>Số điện thoại</th>
          <th>Trạng thái</th>
          <th>Vai trò</th>
          <th>
            {/* div này có chiều cao bằng các button bên trong td, 
            mục đích để các ô th cao bằng td */}
            <div className="h-8"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {dict.map((account) => (
          <tr key={account.username}>
            <td>{account.username}</td>
            <td>{account.name}</td>
            <td>{account.phone}</td>
            <td>{account.state}</td>
            <td>{account.role}</td>
            <td>
              <div className="flex gap-[var(--small-gap)] justify-end">
                <SelectButton text="Chi tiết" width="auto" />
                <Button
                  className="text-[var(--caption)]"
                  type="button"
                  text="Chỉnh sửa"
                  width="auto"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
