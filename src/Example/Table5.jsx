import React, { useState, useEffect } from "react";

const Table = () => {
    // --- 1. STATES QUẢN LÝ FORM ---
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");
    const [editingId, setEditingId] = useState(null); // Lưu ID nếu đang sửa, null nếu đang thêm mới

    // --- 2. STATES QUẢN LÝ DANH SÁCH (LocalStorage) ---
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("myTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Tự động lưu vào máy mỗi khi taskList thay đổi
    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(taskList));
    }, [taskList]);

    // --- 3. LOGIC XỬ LÝ (SUBMIT / THÊM MỚI / SỬA) ---
    const handleSubmit = () => {
        if (!name) return alert("Vui lòng nhập Tên Task");

        if (editingId !== null) {
            // === LOGIC: CẬP NHẬT DÒNG ĐANG SỬA ===
            const updatedList = taskList.map((task) =>
                task.id === editingId ? { ...task, name, des, status } : task
            );
            setTaskList(updatedList);
            setEditingId(null); // Sửa xong thì quay về chế độ thêm mới
        } else {
            // === LOGIC: THÊM MỚI DÒNG ===
            // Tìm ID lớn nhất + 1
            const newId = taskList.length > 0 ? Math.max(...taskList.map(t => Number(t.id))) + 1 : 1;
            const newTask = { id: newId, name, des, status };
            setTaskList([...taskList, newTask]); // Spread để thêm vào cuối mảng
        }

        // Reset lại form sau khi hoàn tất
        setName(""); setDes(""); setStatus("");
    };

    // --- 4. LOGIC PHỤ (SỬA / XÓA) ---
    const startEdit = (task) => {
        setEditingId(task.id); // Đánh dấu ID đang sửa
        setName(task.name);    // Đổ dữ liệu cũ lên input
        setDes(task.des);
        setStatus(task.status);
    };

    const deleteTask = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            // === LOGIC: XÓA DÒNG ===
            // Lọc ra những dòng KHÔNG trùng với ID được chọn
            const newList = taskList.filter(task => task.id !== id);
            setTaskList(newList);
        }
    };

    return (
        <div className="table-component" style={{ padding: "20px" }}>
            {/* PHẦN FORM NHẬP LIỆU */}
            <table className="add-task" border="1" style={{ width: "400px" }}>
                <thead>
                    <tr>
                        <th colSpan="2" style={{ backgroundColor: editingId ? "orange" : "aquamarine" }}>
                            {editingId ? `Đang sửa ID: ${editingId}` : "Thêm Task Mới"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name Task</td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" value={des} onChange={(e) => setDes(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td><input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2">
                            <button onClick={handleSubmit}>
                                {editingId ? "Lưu thay đổi" : "Thêm vào bảng"}
                            </button>
                            {editingId && <button onClick={() => {setEditingId(null); setName(""); setDes(""); setStatus("");}}>Hủy</button>}
                        </th>
                    </tr>
                </tfoot>
            </table>

            <br />

            {/* PHẦN HIỂN THỊ DANH SÁCH */}
            <table className="todolist" border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr style={{ backgroundColor: "#eee" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.des}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => startEdit(task)}>Sửa</button>
                                <button onClick={() => deleteTask(task.id)} style={{ color: "red", marginLeft: "5px" }}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;