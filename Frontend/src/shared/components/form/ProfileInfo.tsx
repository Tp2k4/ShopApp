import { useGet } from "../../../service/crudService";
import { Box } from "../ui";

interface ProfileInfoProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}
function ProfileInfo({ className = "", children, ...rest }: ProfileInfoProps) {
  const account = localStorage.getItem("user");
  return (
    <div
      className={`flex flex-col gap-[var(--medium-gap)] ${className}`}
      {...rest}
    >
      <Box
        className="flex items-head justify-start p-[var(--medium-gap)] gap-[var(--small-gap)]"
        width="100%"
        height="100%"
      >
        <div className="flex flex-col gap-[var(--small-gap)] w-full h-full">
          <div className="text-[var(--text-color)] heading1 font-bold w-full h-auto">
            Thông tin tài khoản
          </div>
          <div className="flex gap-[var(--medium-gap)] w-full h-[80%]">
            <Box
              className="flex flex-col items-end justify-start gap-[var(--small-gap)]"
              width="20%"
              height="100%"
            >
              <div className="text-black body-text font-bold">Họ tên:</div>
              <div className="text-black body-text font-bold">Giới tính:</div>
              <div className="text-black body-text font-bold">
                {" "}
                Số điện thoại:
              </div>
              <div className="text-black body-text font-bold h-[40px]">
                Địa chỉ:
              </div>
              <div className="text-black body-text font-bold">Email:</div>
              <div className="text-black body-text font-bold">Mật khẩu:</div>
              <div className="text-black body-text font-bold">Ngày sinh:</div>
            </Box>
            <Box
              className="flex flex-col iitems-start justify-end gap-[var(--small-gap)]"
              width="80%"
              height="100%"
            ></Box>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ProfileInfo;
