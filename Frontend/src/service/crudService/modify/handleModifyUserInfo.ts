export const handleModifyUserInfo = async (
  apiPath: string,
  id: number,
  userInfo: any,
  setUserInfo: React.Dispatch<React.SetStateAction<any>>,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  try {
    const response = await fetch(apiPath + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      setUserInfo((prevOrder: any) => {
        const resetOrder: any = {};
        for (const key in prevOrder) {
          if (Object.prototype.hasOwnProperty.call(prevOrder, key)) {
            resetOrder[key] = "";
          }
        }
        return resetOrder;
      });
      alert("Sửa thông tin thành công.");
    } else {
      alert("Sửa thông tin thất bại.");
    }
    setShowPopup(false);
  } catch (error) {
    alert(error);
  }
};
