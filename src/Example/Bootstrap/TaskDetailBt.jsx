import { useLocation, useParams, Link } from "react-router-dom";
import dayjs from "dayjs";

const TaskDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const taskFromState = location.state?.task;
    let task = taskFromState;

    if (!task) {
        const saved = localStorage.getItem("myTasks");
        const savedTasks = saved ? JSON.parse(saved) : [];
        task = savedTasks.find(t => Number(t.id) === Number(id));
    }

    if (!task) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">Task not found</div>
                <Link to="/" className="btn btn-secondary mt-3">Quay lại</Link>
            </div>
        );
    }

    const STATUS_CLASS = {
        Pending: "badge bg-danger",
        Ongoing: "badge bg-warning text-dark",
        Done: "badge bg-success"
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Chi tiết Task</h5>
                            <span className={STATUS_CLASS[task.status] || "badge bg-secondary"}>
                                {task.status || "Unknown"}
                            </span>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title mb-3">{task.name}</h4>

                            <p className="text-muted mb-2">
                                <strong>Thời gian tạo:</strong>{" "}
                                {task.createdAt
                                    ? dayjs(task.createdAt).format("DD/MM/YYYY HH:mm:ss")
                                    : "Không có"}
                            </p>

                            <hr />

                            <p className="card-text">
                                <strong>Mô tả:</strong><br />
                                {task.des || "Không có mô tả"}
                            </p>
                        </div>

                        <div className="card-footer text-end">
                            <Link to="/" className="btn btn-outline-primary">
                                ← Quay lại danh sách
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
