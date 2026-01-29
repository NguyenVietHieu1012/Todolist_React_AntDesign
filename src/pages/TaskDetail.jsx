import { useLocation, Link } from 'react-router-dom';
import { Card, Tag, Button, Row, Col} from 'antd';
import dayjs from 'dayjs';

const TaskDetail = () => {
  const location = useLocation(); // chỉ ra toàn bộ thông tin của route hiện tại

  console.log({location}); 

  /* 
    {
      "location": {
        "hash": "",
        "key": "dyrz4rsm",
        "pathname": "/detail/1",
        "search": "",
        "state": {
          "task": {
            "id": 1,
            "name": "Thu thập yêu cầu",
            "des": "Làm việc với các bên liên quan để xác định mục tiêu, phạm vi và yêu cầu chi tiết của dự án.",
            "status": "Done",
            "createdAt": "2026-01-28T08:45:12.745Z"
          }
        }
      }
    }
  */

  const taskFromState = location.state?.task; // lấy task từ trong state, nếu ko có thì trả về undefined
  let task = taskFromState;

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
              : 'Không tìm thấy ngày giờ'}
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
