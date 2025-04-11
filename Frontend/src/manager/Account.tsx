import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/Box";
import Button from "../shared/components/Button";

function Account() {
  return (
    <ManagerLayout>
      <Box height="100%" width="100%">
        <div className="w-full heading3 font-bold text-[var(--primary-color)] text-center py-[var(--big-gap)]">
          QUẢN LÝ TÀI KHOẢN
        </div>

        {/* */}
        <div className="flex items-center">
          <div>Danh mục tài khoản</div>
          <Button type="button" text="Thêm tài khoản" width="130px" />
          {/* Drop down menu */}
          {/* Search button */}
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Account;
