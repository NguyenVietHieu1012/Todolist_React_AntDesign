import { Form, Input, Select, Button, Card, Space } from 'antd';

const TaskForm = ({
  showForm,
  setShowForm,
  name,
  setName,
  des,
  setDes,
  status,
  setStatus,
  editingFlag,
  setEditingFlag,
  handleSubmit,
}) => {
  if (!showForm) return null;

  return (
    <div style={{ marginLeft: '30px' }}>
      <Card
        title={editingFlag ? `Đang sửa Task số ${editingFlag}` : 'Thêm Task Mới'}
        style={{ width: 325 }}
      >
        <Form layout="vertical">
          <Form.Item label="Name Task">
            <Input
              placeholder="Tên task"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Mô tả công việc"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Status">
            <Select
              placeholder="Select task status"
              value={status}
              onChange={(value) => setStatus(value)}
              allowClear
            >
              <Select.Option value="Ongoing">Ongoing</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button color='cyan' variant='solid' onClick={handleSubmit}>
                {editingFlag ? 'Save changes' : 'Add to table'}
              </Button>

              <Button
                danger
                onClick={() => {
                  setEditingFlag(null);
                  setName('');
                  setDes('');
                  setStatus('');
                  setShowForm(false);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TaskForm;
