function isDateInRange(startDateStr: string, endDateStr: string, checkDateStr: string): boolean {
    const parseDate = (str: string) => {
      const [day, month, year] = str.split("/").map(Number);
      return new Date(year, month - 1, day); // month - 1 vì tháng trong JS bắt đầu từ 0
    };
  
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    const checkDate = parseDate(checkDateStr);
  
    return checkDate >= startDate && checkDate <= endDate;
}
  