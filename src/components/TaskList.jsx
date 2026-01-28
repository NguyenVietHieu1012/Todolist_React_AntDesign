import {Link} from 'react-router-dom';
import { Table, Button, Tag, Space } from 'antd';

const TaskList = ({ setShowForm,taskList, startEdit, deleteTask, setTaskList }) => {
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
            to={`/detail/${record.id}`}
            state={{ task: record }}
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
            <Button
            type="primary"
            onClick={() => {
                startEdit(record);
                setShowForm(true);
            }}
            >
            Edit
            </Button>
            <Button
            danger
            type='primary'
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
                type="primary"
                danger
                onClick={() => setTaskList([])}
                >
                Remove all items in task list
                </Button>

                <Button
                // type="primary"
                color='cyan'
                variant='solid'
                style={{ marginLeft: '20px' }}
                onClick={() => setShowForm(true)}
                >
                + Add Task
                </Button>
            </div>
        </div>
    );
};

export default TaskList;