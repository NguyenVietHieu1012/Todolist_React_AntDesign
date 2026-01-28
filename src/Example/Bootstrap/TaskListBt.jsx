import {Link} from 'react-router-dom';

const TaskListBt = ({ setShowForm,taskList, startEdit, deleteTask, setTaskList }) => {
    const STATUS_MAP = {
        Pending: { color: "red" },
        Ongoing: { color: "orange" },
        Done: { color: "green" }
    };

    return (
        <div className="task-list" style={{width: "50%", marginLeft: "150px" }}>
            <table className="table" border="1" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Description</th> */}
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task) => (
                        <tr key={task.id} >
                            <td scope="row">{task.id}</td>
                            <td><Link to={`/detail/${task.id}`} state={{ task }} style={{textDecoration: "none", color: "black"}}>{task.name}</Link></td> 
                            {/* <td>{task.des}</td> */}
                            <td style={{ color: STATUS_MAP[task.status]?.color }}>{task.status}</td>
                            <td>
                                <button onClick={
                                    () => {startEdit(task); setShowForm(true);}} type="button" className="btn btn-primary" > Edit </button>
                                <button onClick={() => deleteTask(task.id)} type="button" className="btn btn-danger" style={{marginLeft: "20px"}}> Remove </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" style={{alignItems: "center"}}>
                            <button onClick={() => setTaskList([])}  type="button" className="btn btn-primary" >
                                Remove all items in task list
                            </button>
                            {/* Button mở form */}
                            <button
                                className="btn btn-success"
                                onClick={() => setShowForm(true)}
                                type="button"
                                style={{marginLeft: "20px"}}
                            >
                                + Add Task
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>        
    );
};

export default TaskListBt;