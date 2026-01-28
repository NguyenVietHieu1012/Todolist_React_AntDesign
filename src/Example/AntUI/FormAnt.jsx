import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function SimpleForm() {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      name="simple_form"
      layout="vertical"
      style={{ maxWidth: 480 }}
      onFinish={onFinish}
      initialValues={{ status: 'pending' }}
    >
      <Form.Item
        label="Name Task"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên task' }]}
      >
        <Input placeholder="Nhập tên task" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập description' }]}
      >
        <TextArea rows={4} placeholder="Nhập mô tả task" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Vui lòng chọn status' }]}
      >
        <Select placeholder="Chọn status">
          <Option value="pending">Pending</Option>
          <Option value="ongoing">Ongoing</Option>
          <Option value="done">Done</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
