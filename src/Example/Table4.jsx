import React, { useState, useEffect } from "react";

const Table = () => {
    // Không cần state 'id' nữa vì nó sẽ tự động sinh ra
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");

    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("myTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(taskList));
    }, [taskList]);

    const handleSubmit = () => {
        if (!name) return alert("Vui lòng nhập Tên Task");

        // TỰ ĐỘNG TẠO ID: 
        // Tìm số ID lớn nhất hiện có trong mảng, nếu mảng rỗng thì bắt đầu từ 0, sau đó cộng thêm 1.
        const newId = taskList.length > 0 
            ? Math.max(...taskList.map(task => Number(task.id))) + 1 
            : 1;

        const newTask = { 
            id: newId, // Gán ID tự động vào đây
            name, 
            des, 
            status 
        };

        setTaskList([...taskList, newTask]);
        
        // Reset các ô nhập liệu còn lại
        setName("");
        setDes("");
        setStatus("");
    };

    return (
        <div className="table-component">
            <table className="add-task" border="1">
                <thead>
                    <tr>
                        <th colSpan="2">Add Task Form (Auto ID)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID Task</td>
                        {/* Hiển thị ID tiếp theo sẽ được tạo để người dùng biết */}
                        <td style={{ fontWeight: 'bold', color: 'blue' }}>
                            {taskList.length > 0 ? Math.max(...taskList.map(t => Number(t.id))) + 1 : 1}
                        </td>
                    </tr>
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
                            <button onClick={handleSubmit} style={{backgroundColor: "aquamarine", cursor: "pointer"}}>Submit</button> 
                        </th>
                    </tr>
                </tfoot>
            </table>

            <br />

            <table className="todolist" border="1" style={{width: "100%"}}>
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
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <button 
                                onClick={() => setTaskList([])} 
                                style={{ marginTop: "10px", color: "red", cursor: "pointer" }}
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

export default Table;