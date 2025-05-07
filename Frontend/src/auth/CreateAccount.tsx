// import Box from "../shared/components/ui/Box";
// import Line from "../shared/components/ui/Line";
// import Button from "../shared/components/button/Button";
// import RadioButton from "../shared/components/form/RadioButton";
// import InputField from "../shared/components/form/InputField";
// import DateOfBirthPicker from "../shared/components/form/DateOfBirthPicker";

// import { Link } from "react-router-dom";

// function CreateAccount() {
//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Box
//         width="400px"
//         height="auto"
//         className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
//       >
//         <div className="heading3 font-semibold text-center">
//           Tạo tài khoản mới
//         </div>

//         {/*  */}
//         <Line width="w-full" />
//         <InputField placeholder="Họ và tên" type="text" />

//         {/*  */}

//         <div className="flex flex-col gap-[var(--small-gap)]">
//           <div className="caption">Ngày sinh:</div>
//           <DateOfBirthPicker width="w-full" />
//         </div>
//         <div className="flex flex-col gap-[var(--small-gap)]">
//           <div className="caption">Giới tính:</div>
//           <div className="flex gap-[var(--small-gap)] w-1/2">
//             <RadioButton width="w-1/2" name="gender" text="Nam" />
//             <RadioButton width="w-1/2" name="gender" text="Nữ" />
//           </div>
//         </div>

//         {/*  */}
//         <div className="flex flex-col gap-[var(--small-gap)]">
//           <InputField placeholder="Số điện thoại" type="text" />
//           <InputField placeholder="Email" type="text" />
//           <InputField placeholder="Mật khẩu mới" type="text" />
//           <InputField placeholder="Địa chỉ" type="text" />
//         </div>

//         {/*  */}
//         <Line width="w-full" />
//         <div className="flex flex-col items-center gap-[var(--medium-gap)]">
//           <Button text="Đăng kí" type="submit" width="w-auto" />
//           <Link
//             className=" text-[var(--link-text)] hover:underline"
//             to="/login"
//           >
//             Bạn đã có tài khoản?
//           </Link>
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default CreateAccount;


import React, { useState } from "react";
import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import RadioButton from "../shared/components/form/RadioButton";
import InputField from "../shared/components/form/InputField";
import DateOfBirthPicker from "../shared/components/form/DateOfBirthPicker";
import { Link, useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  // States cho form
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(""); // định dạng YYYY-MM-DD
  const [gender, setGender] = useState("Nam");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !email || !password || !dob) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8020/api/v1/gmshop/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          dateOfBirth: dob,
          gender,
          phone,
          email,
          password,
          address,

        }),
      });

      if (res.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        const errorMsg = await res.text();
        alert(`Đăng ký thất bại: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối tới máy chủ.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Box
        width="400px"
        height="auto"
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
      >
        <div className="heading3 font-semibold text-center">Tạo tài khoản mới</div>
        <Line width="w-full" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--medium-gap)]">
  <InputField
    placeholder="Họ và tên"
    type="text"
    value={fullName}
    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFullName(e.target.value)}
  />

  <div className="flex flex-col gap-[var(--small-gap)]">
    <div className="caption">Ngày sinh:</div>
    <DateOfBirthPicker
      width="w-full"
      value={dob}
      onChange={(date) => setDob(date)} // nhận từ DateOfBirthPicker
    />
  </div>

  <div className="flex flex-col gap-[var(--small-gap)]">
    <div className="caption">Giới tính:</div>
    <div className="flex gap-[var(--small-gap)] w-1/2">
      <RadioButton
        width="w-1/2"
        name="gender"
        text="Nam"
        checked={gender === "Nam"}
        onChange={() => setGender("Nam")}
      />
      <RadioButton
        width="w-1/2"
        name="gender"
        text="Nữ"
        checked={gender === "Nữ"}
        onChange={() => setGender("Nữ")}
      />
    </div>
  </div>

  <div className="flex flex-col gap-[var(--small-gap)]">
    <InputField
      placeholder="Số điện thoại"
      type="text"
      value={phone}
      onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone(e.target.value)}
    />
    <InputField
      placeholder="Email"
      type="text"
      value={email}
      onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
    />
    <InputField
      placeholder="Mật khẩu mới"
      type="password"
      value={password}
      onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
    />
    <InputField
      placeholder="Địa chỉ"
      type="text"
      value={address}
      onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAddress(e.target.value)}
    />
  </div>

  <Line width="w-full" />
  <div className="flex flex-col items-center gap-[var(--medium-gap)]">
    <Button text="Đăng ký" type="submit" width="w-auto" />
    <Link className="text-[var(--link-text)] hover:underline" to="/login">
      Bạn đã có tài khoản?
    </Link>
  </div>
</form>

      </Box>
    </div>
  );
}

export default CreateAccount;


