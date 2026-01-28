import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager = () => {
    // 1. Quản lý State chung
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");
    const [editingFlag, setEditingFlag] = useState(null);
    const [taskList, setTaskList] = useState(
        () => {
            const savedTasks = localStorage.getItem("myTasks");
            return savedTasks ? JSON.parse(savedTasks) : [];
        }
    );
    const [showForm, setShowForm] = useState(false);

    // 2. LocalStorage
    useEffect(
        () => {
            localStorage.setItem("myTasks", JSON.stringify(taskList));
        }, [taskList]
    );

    // 3. Hàm xử lý logic
    const handleSubmit = () => {
        if (editingFlag !== null) {
            setTaskList(taskList.map(t => t.id === editingFlag ? { ...t, name, des, status } : t));
            setEditingFlag(null);
        } 
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
            {/* Truyền dữ liệu qua PROPS */}
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