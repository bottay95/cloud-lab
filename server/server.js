
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

require('dotenv').config();

const app = express();

// =========================
// KIỂM TRA AUTO-DEPLOY
// =========================
console.log('Backend v1.2 - Auto Deploy test lan 2');

// =========================
// CẤU HÌNH CORS
// =========================
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// =========================
// KẾT NỐI MONGODB ATLAS
// =========================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối DB:', err));

// =========================
// API GET - LẤY DANH SÁCH
// =========================
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Lỗi lấy danh sách sinh viên:', error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
});

// =========================
// API POST - THÊM SINH VIÊN
// =========================
app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    console.error('Lỗi thêm sinh viên:', error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
});

// =========================
// API PUT - CẬP NHẬT
// =========================
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    console.error('Lỗi cập nhật sinh viên:', error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
});

// =========================
// API DELETE - XÓA
// =========================
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Đã xóa sinh viên'
    });
  } catch (error) {
    console.error('Lỗi xóa sinh viên:', error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
});
// =========================
// HEALTH CHECK
// =========================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
// =========================
// KHỞI CHẠY SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy ở port ${PORT}`);
});
