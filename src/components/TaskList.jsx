import {Link} from 'react-router-dom';
import { Table, Button, Tag, Space } from 'antd';

const TaskList = ({ setShowForm, taskList, startEdit, deleteTask, setTaskList }) => {
    const STATUS_MAP = {
        Pending: { color: "red" },
        Ongoing: { color: "orange" },
        Done: { color: "green" }
    };

    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
        <Link
            to={`/detail/${record.id}`} //${record.id} là dynamic route parameter
            state={{ task: record }} // Truyền dữ liệu trực tiếp sang page tiếp theo
            style={{ textDecoration: 'none', color: 'black' }}
        >
            {text}
        </Link>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
        <Tag color={STATUS_MAP[status]?.color}>
            {status}
        </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
        <Space>
            <Button type="primary"
                onClick={() => {
                    startEdit(record);
                    // setShowForm(true);
                }}
            >
            Edit
            </Button>
            <Button danger type='primary'
                onClick={() => deleteTask(record.id)}
            >
            Remove
            </Button>
        </Space>
        ),
    },
    ];

    return (
        <div style={{ width: '50%', margin: "auto" }}>
            <Table
                columns={columns}
                dataSource={taskList}
                rowKey="id"
                pagination={false}
            />

            <div style={{ marginTop: '16px' }}>
                <Button
                // type="primary"
                color='green' variant='solid'
                style={{ marginRight: '20px' , marginBottom: "15px"}}
                onClick={() => setShowForm(true)}
                >
                + Add Task
                </Button>

                <Button type="primary" danger
                    // style={{ marginLeft: '20px' }}
                    onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xóa ko?")) setTaskList([]);}}
                >
                Remove all items in task list
                </Button>
            </div>
        </div>
    );
};

export default TaskList;