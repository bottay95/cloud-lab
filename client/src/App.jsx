import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // CÂU 47: Lấy dữ liệu với Link API mới
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 49: Gửi dữ liệu với Link API mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchStudents();
        setFormData({ studentId: '', name: '', email: '' });
      }
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#0056b3' }}>Quản Lý Sinh Viên</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h4 style={{ marginTop: 0 }}>Thêm Sinh Viên Mới</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nhập MSSV"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Nhập Họ và tên"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ marginRight: '10px', padding: '8px', width: '200px' }}
          />
          <input
            type="email"
            placeholder="Nhập Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ marginRight: '10px', padding: '8px', width: '200px' }}
          />
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Thêm Sinh Viên
          </button>
        </form>
      </div>

      <h3>Danh sách hiện tại:</h3>
      <ul style={{ lineHeight: '1.8' }}>
        {students.map((student) => (
          <li key={student._id}>
            <strong>{student.studentId}</strong> - {student.name} <em>({student.email})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;