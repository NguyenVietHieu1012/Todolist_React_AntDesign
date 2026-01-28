import { useLocation, useParams, Link } from 'react-router-dom';
import { Card, Tag, Button, Row, Col} from 'antd';
import dayjs from 'dayjs';

const TaskDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const taskFromState = location.state?.task;
  let task = taskFromState;

  if (!task) {
    const saved = localStorage.getItem('myTasks');
    const savedTasks = saved ? JSON.parse(saved) : [];
    task = savedTasks.find(t => Number(t.id) === Number(id));
  }

  if (!task) {
    return (
      <Row justify="center" style={{ marginTop: 40 }}>
        <Col span={12}>
            <Link to="/">
                <Button>Quay lại</Button>
            </Link>
        </Col>
      </Row>
    );
  }

  const STATUS_COLOR = {
    Pending: 'red',
    Ongoing: 'orange',
    Done: 'green',
  };

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col span={12}>
        <Card
          title="Chi tiết Task"
          extra={
            <Tag color={STATUS_COLOR[task.status] || 'default'}>
              {task.status || 'Unknown'}
            </Tag>
          }
        >
          <h3>{task.name}</h3>

          <p style={{ color: '#888' }}>
            <strong>Thời gian tạo:</strong>{' '}
            {task.createdAt
              ? dayjs(task.createdAt).format('DD/MM/YYYY HH:mm:ss')
              : 'Không có'}
          </p>

          <hr />

          <p>
            <strong>Mô tả:</strong><br />
            {task.des || 'Không có mô tả'}
          </p>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Link to="/">
              <Button type="primary">
                ← Quay lại danh sách
              </Button>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TaskDetail;
