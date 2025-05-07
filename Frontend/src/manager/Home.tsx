import ManagerLayout from "../shared/layout/ManagerLayout";
import Box from "../shared/components/ui/Box";

import { useEffect, useState } from "react";

function Home() {
  const [home, setHome] = useState<any>();

  useEffect(() => {
    fetch("/database/home.json")
      .then((res) => res.json())
      .then((data) => setHome(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  return (
    <ManagerLayout>
      <Box
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        height="100%"
        width="100%"
      >
        <div>
          <strong>Thống kê trong ngày</strong>
        </div>
        <div>
          <strong>
            Lịch làm việc trong tuần của nhân viên{home.todayRevenue}
          </strong>
        </div>
        <div>
          <strong>Doanh thu 3 tháng gần nhất</strong>
        </div>
      </Box>
    </ManagerLayout>
  );
}

export default Home;
