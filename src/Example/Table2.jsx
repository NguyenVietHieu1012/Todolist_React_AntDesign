import React, { useState } from "react";

const Table = () => {
  // 1. Các State để giữ nội dung đang nhập ở ô Input
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");

  // 2. State duy nhất để giữ DANH SÁCH các dòng đã submit (Mảng các Object)
  const [taskList, setTaskList] = useState([]);

  const handleSubmit = () => {
    // Tạo một đối tượng mới từ dữ liệu đang nhập
    const newTask = {
      id: id,
      name: name,
      des: des,
      status: status
    };

    // Thêm đối tượng mới vào mảng cũ bằng Spread Operator [...]
    setTaskList([...taskList, newTask]);

    // (Tùy chọn) Xóa sạch ô input sau khi thêm để người dùng nhập dòng tiếp theo
    setId("");
    setName("");
    setDes("");
    setStatus("");
  };

  return (
    <div>
      <table className="add-task" border="1" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th colSpan="2">Add Task Form</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID Task</td>
            <td><input type="text" value={id} onChange={(e) => setId(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Name Task</td>
            <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><input type="text" value={des} onChange={(e) => setDes(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Status</td>
            <td><input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2">
              <button onClick={handleSubmit} style={{ backgroundColor: "aquamarine", cursor: "pointer" }}>
                Submit (Thêm dòng)
              </button>
            </th>
          </tr>
        </tfoot>
      </table>

      <table className="todolist" border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. Dùng .map() để duyệt qua mảng taskList và in ra từng dòng <tr> */}
          {taskList.map((task, index) => (
            <tr key={index}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.des}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;