import { useState, useEffect } from 'react';

const API_URL = 'https://mern-backend-234975.onrender.com/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });

  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Thêm hoặc cập nhật sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // CREATE
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        await fetchStudents();

        setFormData({
          studentId: '',
          name: '',
          email: ''
        });

        setEditingId(null);
      }
    } catch (error) {
      console.error('Lỗi khi lưu sinh viên:', error);
    }
  };

  // Chọn sinh viên để sửa
  const handleEdit = (student) => {
    setEditingId(student._id);

    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
  };

  // Xóa sinh viên
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa sinh viên này không?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchStudents();
      }
    } catch (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
    }
  };

  // Hủy cập nhật
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      studentId: '',
      name: '',
      email: ''
    });
  };

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h2 style={{ color: '#0056b3' }}>
        Quản Lý Sinh Viên
      </h2>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      >
        <h4 style={{ marginTop: 0 }}>
          {editingId
            ? 'Cập Nhật Sinh Viên'
            : 'Thêm Sinh Viên Mới'}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nhập MSSV"
            value={formData.studentId}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentId: e.target.value
              })
            }
            required
            style={{
              marginRight: '10px',
              padding: '8px'
            }}
          />

          <input
            type="text"
            placeholder="Nhập Họ và tên"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            required
            style={{
              marginRight: '10px',
              padding: '8px',
              width: '200px'
            }}
          />

          <input
            type="email"
            placeholder="Nhập Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            required
            style={{
              marginRight: '10px',
              padding: '8px',
              width: '200px'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '8px 15px',
              backgroundColor: editingId
                ? '#007bff'
                : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            {editingId
              ? 'Cập nhật'
              : 'Thêm Sinh Viên'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '8px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Hủy
            </button>
          )}
        </form>
      </div>

      <h3>Danh sách hiện tại:</h3>

      <ul style={{ lineHeight: '1.8' }}>
        {students.map((student) => (
          <li key={student._id} style={{ marginBottom: '10px' }}>
            <strong>{student.studentId}</strong>
            {' - '}
            {student.name}
            {' '}
            <em>({student.email})</em>

            <button
              onClick={() => handleEdit(student)}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#ffc107',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sửa
            </button>

            <button
              onClick={() => handleDelete(student._id)}
              style={{
                marginLeft: '5px',
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;