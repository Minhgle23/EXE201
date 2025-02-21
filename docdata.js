const fs = require('fs');

// Đọc file database.json
const rawData = fs.readFileSync('database.json');
const data = JSON.parse(rawData);

console.log(data); // Kiểm tra nội dung file