import React from "react";
import {Button, DatePicker, Form, Input, Select} from "antd";
import {useGetAllAuthorsQuery} from "../api/author.api";
import {IAuthor, IBook, IBookOut} from "../user.types";
import {useAddBookMutation} from "../api/book.api";

export const CreateBook: React.FC = () => {
    const [form] = Form.useForm();
    const {isLoading, isError, data} = useGetAllAuthorsQuery();
    const [addBook] = useAddBookMutation();

    const handleForm = (values:any) => {
        const author:IAuthor = data?.find(author => author.id === values.authors)!;
        const book: IBookOut = {
            title: values.title,
            isbn: values.isbn,
            totalPages: values.total,
            pablishedDate: values.pdate,
            authors: Array.of(author)
        };
        console.log(book)
        addBook(book);
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
                            <Select.Option id={id} value={id}>{fullName}</Select.Option>
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