import { Form, Row, Col, Button, Input } from 'antd';
import React from 'react'
import { PlusCircleFilled } from '@ant-design/icons';

const TodoForm = ({ onFormSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            descricao: form.getFieldValue('descricao'),
            startDate: form.getFieldValue('startDate'),
            endDate: form.getFieldValue('endDate'),
            completed: false,
        });
        console.log(form.getFieldValue('title'));

        form.resetFields();
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className='todo-form'>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item name={'title'}
                    rules={[{required: true, message: 'This field is required'}]}>
                        <Input placeholder='What needs to be done?'></Input>
                    </Form.Item>
                    <Form.Item name={'descricao'}
                    rules={[{required: false}]}>
                        <Input placeholder='Descreva a atividade'></Input>
                    </Form.Item>
                    <Form.Item name={'startDate'}
                    rules={[{required: true, message: 'This field is required'}]}>
                        <Input type='date'></Input>
                    </Form.Item>
                    <Form.Item name={'endDate'}
                    rules={[{required: true, message: 'This field is required'}]}>
                        <Input type='date'></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type='primary' htmlType='submit' block>
                        <PlusCircleFilled/>
                        Add
                    </Button>
                </Col>
            </Row>

        </Form>
    )
}

export default TodoForm;