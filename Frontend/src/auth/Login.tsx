import Box from "../shared/components/ui/Box";
import Line from "../shared/components/ui/Line";
import Button from "../shared/components/button/Button";
import InputField from "../shared/components/form/InputField";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const API = "http://localhost:8020/api/v1/gmshop/user/login"

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex w-[800px] gap-[var(--big-gap)]">
        {/*  */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="logo text-[var(--primary-color)]">GAMING GEAR</div>
          <div className="heading2">
            Giúp bạn mua sắm thỏa thích chuột, bàn phím, tai nghe, … với giá rẻ
          </div>
        </div>

        {/*  */}
        <div className="flex-1 flex justify-center">
          <Box
            className="flex flex-col items-center gap-[var(--medium-gap)] p-[var(--medium-gap)]"
            width="350px"
            height="auto"
          >
            <form
              action={API}
              className="w-full flex flex-col gap-[var(--medium-gap)]"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col gap-[var(--small-gap)]">
                <InputField width="w-full" placeholder="username" type="text" onChange={handelChange
                    
                  }/>
                <InputField
                  width="w-full"
                  placeholder="password"
                  type="password"
                  onChange={handelChange}
                />
              </div>

              <Button type="submit" width="w-full" text="Đăng nhập" />
            </form>

            {/*  */}
            <Link
              className="text-[var(--link-text)] hover:underline"
              to="/forgot-password"
            >
              Quên mật khẩu?
            </Link>
            <Line width="w-full" />
            <Button
              onClick={() => navigate("/create-account")}
              type="button"
              width="w-auto"
              text="Tạo tài khoản mới"
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Login;


// import Box from "../shared/components/ui/Box";
// import Line from "../shared/components/ui/Line";
// import Button from "../shared/components/button/Button";
// import InputField from "../shared/components/form/InputField";

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Login() {
//   const navigate = useNavigate();
//   const API = "http://localhost:8020/api/v1/gmshop/user/login";

//   const [formValues, setFormValues] = useState({
//     phone_number: "",
//     password: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formValues)
//       });

//       if (res.ok) {
//         const result = await res.json();
//         console.log("Đăng nhập thành công:", result);

//         // Lưu token vào localStorage
//         localStorage.setItem("token", result.token);

//         // Chuyển hướng người dùng
//         navigate("/account-manager");
//       } else {
//         const errorText = await res.text();
//         console.error("Đăng nhập thất bại:", errorText);
//         alert(errorText);
//       }
//     } catch (err) {
//       console.error("Lỗi kết nối:", err);
//       alert("Lỗi kết nối đến server.");
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center">
//       <div className="flex w-[800px] gap-[var(--big-gap)]">
//         <div className="flex-1 flex flex-col justify-center">
//           <div className="logo text-[var(--primary-color)]">GAMING GEAR</div>
//           <div className="heading2">
//             Giúp bạn mua sắm thỏa thích chuột, bàn phím, tai nghe, … với giá rẻ
//           </div>
//         </div>

//         <div className="flex-1 flex justify-center">
//           <Box
//             className="flex flex-col items-center gap-[var(--medium-gap)] p-[var(--medium-gap)]"
//             width="350px"
//             height="auto"
//           >
//             <form
//               className="w-full flex flex-col gap-[var(--medium-gap)]"
//               onSubmit={handleSubmit}
//             >
//               <div className="w-full flex flex-col gap-[var(--small-gap)]">
//                 <InputField
//                   name="phone_number"
//                   width="w-full"
//                   placeholder="Số điện thoại"
//                   type="text"
//                   value={formValues.phone_number}
//                   onChange={handleChange}
//                 />
//                 <InputField
//                   name="password"
//                   width="w-full"
//                   placeholder="Mật khẩu"
//                   type="password"
//                   value={formValues.password}
//                   onChange={handleChange}
//                 />
//               </div>

//               <Button type="submit" width="w-full" text="Đăng nhập" />
//             </form>

//             <Link
//               className="text-[var(--link-text)] hover:underline"
//               to="/forgot-password"
//             >
//               Quên mật khẩu?
//             </Link>
//             <Line width="w-full" />
//             <Button
//               onClick={() => navigate("/create-account")}
//               type="button"
//               width="w-auto"
//               text="Tạo tài khoản mới"
//             />
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
