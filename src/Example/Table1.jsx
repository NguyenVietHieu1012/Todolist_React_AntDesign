import React, {useState} from "react";

const Table = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");

    const [idSubmit, setIdSubmit] = useState("");
    const [nameSubmit, setNameSubmit] = useState("");
    const [desSubmit, setDesSubmit] = useState("");
    const [statusSubmit, setStatusSubmit] = useState("");

    const handleSubmit = () => {
        setIdSubmit(id);
        setNameSubmit(name);
        setDesSubmit(des);
        setStatusSubmit(status);
    };

    return (
        <div>
            <table className="add-task" border="1">
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
                        <th colSpan="2"> <button onClick={handleSubmit} style={{backgroundColor: "aquamarine"}}>Submit</button> </th>
                    </tr>
                </tfoot>
            </table>

            <table class="todolist" border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{idSubmit}</td>
                        <td>{nameSubmit}</td>
                        <td>{desSubmit}</td>
                        <td>{statusSubmit}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table