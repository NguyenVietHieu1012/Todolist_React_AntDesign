const TaskForm = ({ showForm, setShowForm, name, setName, des, setDes, status, setStatus, editingFlag, setEditingFlag, handleSubmit }) => {
  return (
    <div className="task-form" style={{width: "325px", border: "none", marginLeft: "30px"}}>
      <table className={`task-form table ${showForm ? "d-block" : "d-none"}`} border="1" >
        <thead>
          <tr>
            <th colSpan="2" style={{ backgroundColor: editingFlag ? "orange" : "#E0E0E0" }}>
              {editingFlag ? `Đang sửa Task số ${editingFlag}` : "Thêm Task Mới"}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td >
              <label htmlFor="taskName" className="form-label">Name Task</label>
            </td>
            <td>
              <input
                id="taskName"
                type="text"
                className="form-control"
                placeholder="Tên task"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td >
              <label htmlFor="taskDescription" className="form-label">Description</label>
            </td>
            <td>
              <textarea
                id="taskDescription"
                className="form-control"
                rows="3"
                placeholder="Mô tả công việc"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td >
              <label htmlFor="taskStatus" className="form-label">Status</label>
            </td>
            <td>
              <select
                id="taskStatus"
                className="form-select"
                aria-label="Select task status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Open this select menu</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th colSpan="2" style={{ textAlign: "left", padding: "8px" }}>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-success"
                style={{ marginLeft: "0" }}
              >
                {editingFlag ? "Save changes" : "Add to table"}
              </button>

              <button
                  onClick={() => {
                    setEditingFlag(null);
                    setName("");
                    setDes("");
                    setStatus("");
                    setShowForm(false);
                  }}
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    
  );
};

export default TaskForm;
