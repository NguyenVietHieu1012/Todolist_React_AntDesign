import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TaskManager = () => {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");
    const [editingFlag, setEditingFlag] = useState(null);
    const [taskList, setTaskList] = useState(
        () => {
            const savedTasks = localStorage.getItem("myTasks"); // Lấy dữ liệu đã lưu trước đó
            return savedTasks ? JSON.parse(savedTasks) : []; // Nếu có dữ liệu → parse JSON → dùng làm state ban đầu. Nếu ko -> mảng rỗng
        } // truyền function vào useState để function chỉ cần gọi duy nhất 1 lần khi component mount lần đầu 
    );
    const [showForm, setShowForm] = useState(false);

    // LocalStorage
    useEffect(
        () => {
            localStorage.setItem("myTasks", JSON.stringify(taskList));
        }, [taskList] // Nếu [taskList] thay đổi thì chạy đoạn code trong useEffect
    );

    // Hàm xử lý logic khi bấm nút 
    const handleSubmit = () => {
        // Edit Task
        if (editingFlag !== null) {
            setTaskList(taskList.map(t => t.id === editingFlag ? { ...t, name, des, status } : t));
            setEditingFlag(null);
        } 
        // Add Task
        else {
            const newId = taskList.length > 0 ? Math.max(...taskList.map(t => t.id)) + 1 : 1;
            const createdAt = new Date().toISOString(); // lưu thời gian tạo
            setTaskList([...taskList, { id: newId, name, des, status, createdAt}]);
        }
        setName(""); 
        setDes(""); 
        setStatus("");
        setShowForm(false); // submit xong thì ẩn form
    };

    const startEdit = (task) => {
        setEditingFlag(task.id);
        setName(task.name); 
        setDes(task.des); 
        setStatus(task.status);
        setShowForm(true); // mở form khi bấm edit
    };

    const deleteTask = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ko?")) setTaskList(taskList.filter(t => t.id !== id));
    };

    return (
        <div className="table-component" style={{display: "flex", height: "auto"}}>
            {/* Truyền dữ liệu qua props */}
            <TaskForm 
                showForm={showForm}
                setShowForm={setShowForm}
                name={name} 
                setName={setName} 
                des={des} 
                setDes={setDes} 
                status={status} 
                setStatus={setStatus} 
                editingFlag={editingFlag} 
                setEditingFlag={setEditingFlag}
                handleSubmit={handleSubmit}
            />
            
            <TaskList 
                taskList={taskList} 
                startEdit={startEdit} 
                deleteTask={deleteTask} 
                setTaskList={setTaskList}
                setShowForm={setShowForm}
            />
        </div>
    );
};

export default TaskManager;