import SelectButton from "./SelectButton";
import { useState, useEffect } from "react";

interface Props {
  width: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<string>>;
}

const DateOfBirthPicker: React.FC<Props> = ({ width, setDateOfBirth }) => {
  //Lấy năm hiện tại
  const current_year = new Date().getFullYear();

  //Lấy 150 năm từ năm hiện tại
  const years = Array.from({ length: 150 }, (_, i) => current_year - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const [year, setYear] = useState(current_year);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  //Cập nhật lại các ngày trong mục chọn tùy vào tháng được chọn
  useEffect(() => {
    const days = new Date(year, month, 0).getDate();
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));

    //Ví dụ: Nếu ngày đang được chọn là 30, mà người dùng chọn lại tháng 2 => reset ngày về 1
    if (day > days) setDay(1);
  }, [year, month]);

  // Gộp lại thành chuỗi dd-mm-yyyy
  useEffect(() => {
    // Hàm này để thêm số 0 phía trước nếu số < 10, ví dụ: 1/1/2023 -> 01/01/2023
    const pad = (n: number) => (n < 10 ? `0${n}` : n);

    // Format lại định dạng dd-mm-yyyy
    const formatted = `${year}-${pad(month)}-${pad(day)}`;

    setDateOfBirth(formatted);
  }, [day, month, year]);

  return (
    <div className={`${width} flex gap-[var(--small-gap)]`}>
      {/* Ngày */}
      <SelectButton
        width="w-1/3"
        value={day}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setDay(Number(event.target.value))
        }
        dataset={daysInMonth}
      />

      {/* Tháng */}
      <SelectButton
        width="w-1/3"
        value={month}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setMonth(Number(event.target.value))
        }
        dataset={months}
      />

      {/* Năm */}
      <SelectButton
        width="w-1/3"
        value={year}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setYear(Number(event.target.value))
        }
        dataset={years}
      />
    </div>
  );
};

export default DateOfBirthPicker;
