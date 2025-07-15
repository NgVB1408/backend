// index.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Bật CORS cho tất cả origin (hoặc cấu hình cụ thể hơn nếu cần)
app.use(cors());

// ✅ Optional: parse JSON nếu bạn dùng POST với JSON body
app.use(express.json());

// ✅ Route gốc
app.get('/', (req, res) => {
  res.send('🎉 Hello from Render!');
});

// ✅ Route API trả về dữ liệu mẫu
app.get('/api/data', (req, res) => {
  res.json({
    status: 'success',
    message: 'Dữ liệu API trả về từ backend Render thành công!',
    timestamp: new Date().toISOString()
  });
});

// ✅ Lắng nghe trên PORT (Render sẽ gán port qua biến môi trường)
app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại cổng ${PORT}`);
});
