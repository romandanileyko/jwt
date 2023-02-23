import {useDeleteBookByIdMutation, useGetAllBooksQuery} from "../api/book.api";
import {ColumnsType} from "antd/es/table";
import {IBook} from "../user.types";
import {Table} from "antd";

const BookPage = () => {
    const {isLoading, isError, data} = useGetAllBooksQuery();
    const [deleteBook] = useDeleteBookByIdMutation();

    const deleteHeandler = async (event: React.MouseEvent<HTMLAnchorElement>, record: IBook) => {
        await deleteBook(record.id).unwrap();
    };

    const columns: ColumnsType<IBook> = [
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: 'Total Pages',
            dataIndex: 'totalPages',
            key: 'totalPages',
        },
        {
            title: 'Pablished Date',
            dataIndex: 'pablishedDate',
            key: 'pablishedDate',
        },
        {
            title: 'Authors',
            dataIndex: 'authors',
            key: 'authors',
            render: (_,{authors}) => (
                <>
                    {
                        authors.map((author) => {
                            return author.firstName
                                .concat(" ")
                                .concat(author.lastName)
                        })
                    }
                </>

            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) =>
                <a onClick={(event => deleteHeandler(event, record))}>Delete</a>

        }
    ];

    return (
        <Table
            rowKey={(_) => _.id}
            columns={columns}
            dataSource={data}
            loading={isLoading}
        />
    )
}
export default BookPage;