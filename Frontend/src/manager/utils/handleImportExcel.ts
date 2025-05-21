import ExcelJS from "exceljs";

export async function handleImportExcel(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<void> {
  const file = e.target.files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.worksheets[0];
  const rows: any[] = [];

  worksheet.eachRow((row) => {
    const rowValues = row.values;
    rows.push(Array.isArray(rowValues) ? rowValues.slice(1) : rowValues);
  });

  const [headers, ...body] = rows;
  const formatted = body.map((row) =>
    headers.reduce((acc: any, key: any, i: number) => {
      acc[key] = row[i];
      return acc;
    }, {})
  );

  localStorage.setItem("excelData", JSON.stringify(formatted));
}
