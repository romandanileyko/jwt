import React from "react";
import {Button, DatePicker, Form, Input, Select} from "antd";
import {useGetAllAuthorsQuery} from "../api/author.api";

export const CreateBook: React.FC = () => {
    const [form] = Form.useForm();
    const {isLoading, isError, data} = useGetAllAuthorsQuery();
    const handleForm = (values:any) => {
        console.log(values)

    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleForm}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="ISBN"
                    name="isbn"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Total Pages"
                    name="total"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Pablished Date"
                    name="pdate"
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    label="Authors"
                    name="authors"
                >
                    <Select loading={isLoading}>
                {
                    data?.map(({id, firstName, lastName}) => {
                        let fullName = firstName.concat(" ").concat(lastName);
                        return (
                            <Select.Option id={id} value={fullName}>{fullName}</Select.Option>
                        )
                    })
                }
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}