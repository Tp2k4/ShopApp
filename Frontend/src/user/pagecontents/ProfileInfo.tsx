import { useGet } from "../../service/crudService";
import { Box } from "../../shared/components/ui";
import { useState, useEffect } from "react";
import { Button } from "../../shared/components/button";
import LabeledInputField from "../../shared/components/form/LabeledInputField";

interface ProfileInfoProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function ProfileInfo({ className = "", children, ...rest }: ProfileInfoProps) {
  const rawAccount = localStorage.getItem("userAccount");
  const account = rawAccount ? JSON.parse(rawAccount) : null;
  const token = localStorage.getItem("token");
  const { data: userAccount } = useGet("/database/profile.json");
  localStorage.setItem("userAccount", JSON.stringify(userAccount));
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
    password: "",
  });

  useEffect(() => {
    if (!account) return;

    setUpdatedUserInfo({
      fullname: account.name,
      date_of_birth: account.dateOfBirth,
      //gender
      phone_number: account.phoneNumber,
      email: account.email,
      address: account.address,
      is_active: account.state,
      role_id: account.role,
      facebook_account_id: "",
      google_account_id: "",
      password: "123",
    });
  }, []);
  const [showPopupModify, setShowPopupModify] = useState(false);

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
              <div className="font-bold text-black body-text">Họ tên:</div>
              <div className="font-bold text-black body-text">Giới tính:</div>
              <div className="font-bold text-black body-text">
                {" "}
                Số điện thoại:
              </div>
              <div className="text-black body-text font-bold h-[40px]">
                Địa chỉ:
              </div>
              <div className="font-bold text-black body-text">Email:</div>
              <div className="font-bold text-black body-text">Mật khẩu:</div>
              <div className="font-bold text-black body-text">Ngày sinh:</div>
            </Box>
            <Box
              className="flex flex-col iitems-start justify-end gap-[var(--small-gap)]"
              width="80%"
              height="100%"
            ></Box>
          </div>
        </div>
        <Button
          text="Chỉnh sửa"
          type="button"
          onClick={() => setShowPopupModify(true)}
        />
        {showPopupModify && (
          <div className="fixed inset-0 flex items-center justify-center z-49">
            <div className="absolute inset-0 bg-black opacity-70"></div>

            <div className="rounded-md z-50 flex flex-col gap-[var(--medium-gap)] bg-white p-[var(--big-gap)]">
              <div className="flex flex-col gap-[var(--medium-gap)]">
                <div className="flex flex-col gap-[var(--medium-gap)]">
                  <div>Thông tin tài khoản:</div>
                  <LabeledInputField
                    value={updatedUserInfo.fullname || ""}
                    onChange={(e: any) => {
                      console.log("onChange", e.target.value);
                      setUpdatedUserInfo((prev: any) => ({
                        ...prev,
                        fullname: e.target.value,
                      }));
                    }}
                    label="Họ và tên: "
                    placeholder="Nguyễn Văn A"
                    inputFieldWidth="w-[240px]"
                  />
                  <Button
                    text="Lưu"
                    type="button"
                    onClick={() => {
                      () => {
                        fetch(
                          "http://localhost:8020/api/v1/gmshop/user/update/" +
                            "8",
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(updatedUserInfo),
                          }
                        );
                      };
                      setShowPopupModify(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

export default ProfileInfo;
