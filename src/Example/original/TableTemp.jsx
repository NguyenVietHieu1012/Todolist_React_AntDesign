import React, {useState} from "react";
import { useEffect } from "react";
const TableTemp = () => {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");
    const [editingFlag, setEditingFlag] = useState(null); // nếu là null --> thêm mới, có giá trị --> đang sửa

    // 1. Khởi tạo từ localStorage nếu ko thì là []
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("myTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // 2. Lưu TaskList mỗi khi có thay đổi
    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(taskList));
    }, [taskList]) // [taskList] nghĩa là: "Hãy chạy hàm này mỗi khi taskList thay đổi"

    const handleSubmit = () => {

        if (editingFlag !== null){
            // Cập nhật dòng đang sửa
            const updatedList = taskList.map(
                (task) => task.id === editingFlag ? {...task, name, des, status} : task
            );
            setTaskList(updatedList);
            setEditingFlag(null); // Sửa xong thì quay về chế độ thêm mới
        }
        else {
            // Thêm task mới
            const newId = taskList.length > 0 ? Math.max(...taskList.map(t => Number(t.id))) + 1 : 1;
            const newTask = { id: newId, name, des, status};
            setTaskList([...taskList, newTask]); // Spread để thêm vào cuối mảng 
        }

        //Reset lại form sau khi hoàn tất
        setName("");
        setDes("");
        setStatus("");
    };

    const startEdit = (task) => {
        setEditingFlag(task.id); // Đánh dấu ID đang sửa
        setName(task.name);
        setDes(task.des);
        setStatus(task.status);
    };

    const deleteTask = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ko?")) {
            // Lọc ra những dòng ko trùng với ID được chọn
            const newList = taskList.filter(task => task.id !== id);
            setTaskList(newList);
        }
    };
    return (
        <div className="table-component">
            {/* Form nhập liệu */}
            <table className="add-task" border="1">
                <thead>
                    <tr>
                        <th colSpan="2" style={{ backgroundColor: editingFlag ? "orange" : "aquamarine" }}>
                            {editingFlag ? `Đang sửa ID: ${editingFlag}` : "Thêm Task Mới"}
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
                                {editingFlag ? "Lưu thay đổi" : "Thêm vào bảng"}
                            </button>
                            {editingFlag && <button onClick={() => {setEditingFlag(null); setName(""); setDes(""); setStatus("");}}>Hủy</button>}
                        </th>
                    </tr>
                </tfoot>
            </table>

            {/* Bảng TODOLIST */}
            <table className="todolist" border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task, index) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.des}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => startEdit(task)}> Edit </button>
                                <button onClick={() => deleteTask(task.id)} style={{ color: "red", marginLeft: "5px" }}> Remove </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">
                            <button 
                                onClick={() => setTaskList([])} 
                                style={{ marginTop: "10px", color: "red" }}
                            >
                                Xóa tất cả danh sách
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TableTemp