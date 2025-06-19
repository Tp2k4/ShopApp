import { useGet } from "../../service/crudService";
import { Box } from "../../shared/components/ui";
import { useState, useEffect } from "react";
import { Button } from "../../shared/components/button";
import PopupModifyUserInfo from "../popup/PopupModifyUserInfo";
import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/paths";
import { BASE_API } from "../../shared/paths";
interface ProfileInfoProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function ProfileInfo({ className = "", children, ...rest }: ProfileInfoProps) {
  const { data: userAccountInfo } = useGet(`${BASE_API}user/get-user`);

  const [updatedUserInfo, setUpdatedUserInfo] = useState<any>({
    fullname: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    is_active: 1,
    role_id: 2,
    facebook_account_id: "",
    google_account_id: "",
  });

  useEffect(() => {
    if (!userAccountInfo) return;

    setUpdatedUserInfo({
      fullname: userAccountInfo.name || "",
      date_of_birth: userAccountInfo.dateOfBirth || "",
      phone_number: userAccountInfo.phoneNumber || "",
      email: userAccountInfo.email || "",
      address: userAccountInfo.address || "",
      is_active: 1,
      role_id: 2,
      facebook_account_id: "",
      google_account_id: "",
    });
  }, [userAccountInfo]);

  const [showPopupModify, setShowPopupModify] = useState(false);

  return (
    <Box
      className={`flex flex-col gap-[var(--medium-gap)] ${className} items-start justify-start p-[var(--medium-gap)] gap-[var(--small-gap)]`}
      width="100%"
      height="400px"
      {...rest}
    >
      <div className="flex flex-col gap-[var(--medium-gap)] w-full h-full">
        <div className="text-[var(--text-color)] heading2 w-full h-auto">
          Thông tin tài khoản:
        </div>

        <div className="flex gap-[var(--medium-gap)] w-full h-[80%]">
          <div className="flex flex-col items-start justify-start gap-[var(--medium-gap)] w-full h-full">
            <div className="flex flex-col w-full gap-[var(--small-gap)]">
              {/* Họ và tên */}
              <div className="flex w-full">
                <div className="font-bold w-[200px]">Họ tên:</div>
                <div>{userAccountInfo.name}</div>
              </div>

              {/* Sdt */}
              <div className="flex w-full">
                <div className="font-bold w-[200px]">Số điện thoại:</div>
                <div>{userAccountInfo.phoneNumber}</div>
              </div>

              {/* Email */}
              <div className="flex w-full">
                <div className="font-bold w-[200px]">Email:</div>
                <div>{userAccountInfo.email}</div>
              </div>

              {/* Địa chỉ */}
              <div className="flex w-full">
                <div className="font-bold w-[200px]">Địa chỉ:</div>
                <div>{userAccountInfo.address}</div>
              </div>

              {/* Ngày sinh */}
              <div className="flex w-full">
                <div className="font-bold w-[200px]">Ngày sinh:</div>
                <div>{userAccountInfo.dateOfBirth}</div>
              </div>
            </div>

            {/* Đổi mật khẩu */}
            <Link
              className="text-blue-600 hover:underline"
              to={ROUTES.AUTH.FORGOT_PASSWORD}
            >
              Thay đổi mật khẩu
            </Link>

            <Button
              text="Chỉnh sửa"
              type="button"
              onClick={() => setShowPopupModify(true)}
            />
          </div>
        </div>
      </div>

      {/* Hiện popup chỉnh sửa thông tin tài khoản người dùng */}
      {showPopupModify && (
        <PopupModifyUserInfo
          userId={userAccountInfo.id}
          updatedUserInfo={updatedUserInfo}
          setUpdatedUserInfo={setUpdatedUserInfo}
          setShowPopup={setShowPopupModify}
        />
      )}
    </Box>
  );
}

export default ProfileInfo;
