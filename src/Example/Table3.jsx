import React, { useState, useEffect } from "react";

const Table = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");

  // 1. Khởi tạo state từ localStorage (nếu có), nếu không thì là mảng rỗng []
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 2. "Người giám sát": Cứ khi nào taskList thay đổi là lưu vào kho ngay
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(taskList));
  }, [taskList]); // [taskList] nghĩa là: "Hãy chạy hàm này mỗi khi taskList thay đổi"

  const handleSubmit = () => {
    if(!id || !name) return alert("Vui lòng nhập ID và Tên!");

    const newTask = { id, name, des, status };
    setTaskList([...taskList, newTask]);

    setId(""); setName(""); setDes(""); setStatus("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Form nhập liệu</h3>
      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <hr />
      <h3>Danh sách đã lưu (F5 không mất)</h3>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
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
      
      <button 
        onClick={() => setTaskList([])} 
        style={{ marginTop: "10px", color: "red" }}
      >
        Xóa tất cả danh sách
      </button>
    </div>
  );
};

export default Table;