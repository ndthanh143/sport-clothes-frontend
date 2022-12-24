import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMessage, getAllMessages } from '~/actions/messageActions';
import Loader from '~/components/Loader';
import { DELETE_MESSAGE_RESET } from '~/constants/messageConstants';
import styles from './ListMessages.module.scss';

const cx = classNames.bind(styles);

function ListMessages() {
    const { loading, messages } = useSelector((state) => state.messages);
    const { isDeleted } = useSelector((state) => state.deleteMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessages());
        if (isDeleted) {
            alert('Deleted successfully!!');
            dispatch({ type: DELETE_MESSAGE_RESET });
        }
    }, [dispatch, isDeleted]);

    const handleDeleteMessage = (id) => {
        dispatch(deleteMessage(id));
    };
    if (loading) {
        <Loader />;
    } else {
        return (
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Danh sách phản hồi thắc mắc</h1>

                <div className={cx('table')}>
                    <div className={cx('field-bar')}>
                        <div className={cx('field', 'name')}>Tên người gửi</div>
                        <div className={cx('field', 'email')}>Email</div>
                        <div className={cx('field', 'phone')}>Số điện thoại</div>
                        <div className={cx('field', 'title')}>Tiêu đề</div>
                        <div className={cx('field', 'status')}>Trạng thái</div>
                        <div className={cx('field', 'action')}>Action</div>
                    </div>
                    <div className={cx('objects')}>
                        {messages.map((item, index) => (
                            <div className={cx('item', { ['even']: index % 2 == 0 })} key={index}>
                                <div className={cx('field', 'name')}>{item.senderInfo.name}</div>
                                <div className={cx('field', 'email')}>{item.senderInfo.email}</div>
                                <div className={cx('field', 'phone')}>{item.senderInfo.phoneNo}</div>
                                <div className={cx('field', 'title')}>{item.title}</div>
                                <div
                                    className={cx('field', 'status', {
                                        unread: item.status === 'Chưa giải quyết',
                                        confirm: item.status === 'Đã giải quyết',
                                    })}
                                >
                                    {item.status}
                                </div>
                                <div className={cx('field', 'action')}>
                                    <Link to={`/admin/message/edit/${item._id}`}>
                                        <button className={cx('edit')}>
                                            <FaPen />
                                        </button>
                                    </Link>
                                    <button className={cx('delete')} onClick={() => handleDeleteMessage(item._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListMessages;
