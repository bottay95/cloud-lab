const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối với MongoDB Atlas của bạn
mongoose.connect('mongodb+srv://buicongtay:congtay123@cluster0.9ojkgmm.mongodb.net/cloud_lab?appName=Cluster0')
  .then(() => console.log('Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối DB:', err));

// Câu 36: API GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Câu 37: API POST - Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// Câu 38: API PUT - Cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// Câu 39: API DELETE - Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Đã xóa sinh viên' });
});

// Khởi chạy server ở Port 5000
app.listen(5000, () => {
  console.log('Server đang chạy ở port 5000');
});