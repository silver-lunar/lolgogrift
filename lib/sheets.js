export async function getProducts() {
  try {
    const SPREADSHEET_ID = '1Hzaiw4DpWmi4j4HtTpdTk7AGwqj8lb8aLe_YRXG5_aM'; // <--- วาง SPREADSHEET_ID
    const SHEET_NAME = 'Sheet1';
    const URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet data: ${res.statusText}`);
    }

    // Google Sheets API คืนค่ามาเป็น Text ที่ต้องตัดส่วนที่ไม่ใช่ JSON ออก
    let text = await res.text();
    const jsonString = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/s)[1];
    const data = JSON.parse(jsonString);

    // แปลงข้อมูลจากโครงสร้างของ Google Sheets ให้เป็น Array ของ Object ที่เราใช้งานได้
    const headers = data.table.cols.map(col => col.label);
    const rows = data.table.rows;

    const products = rows.map(row => {
      const product = {};
      headers.forEach((header, index) => {
        const cell = row.c[index];
        product[header] = cell ? cell.v : null;
      });
      return product;
    });

    // แปลง price ให้เป็นตัวเลข
    const formattedProducts = products.map(product => ({
      ...product,
      price: Number(product.price) || 0,
    }));

    return formattedProducts;

  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return []; // คืนค่าเป็น array ว่างถ้าเกิดข้อผิดพลาด
  }
}