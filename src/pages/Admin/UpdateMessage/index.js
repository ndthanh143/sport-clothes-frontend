import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessageDetails, updateMessage } from '~/actions/messageActions';
import Loader from '~/components/Loader';
import { UPDATE_MESSAGE_RESET } from '~/constants/messageConstants';
import styles from './UpdateMessage.module.scss';
const cx = classNames.bind(styles);

function UpdateMessage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.messageDetails);
    const { isUpdated } = useSelector((state) => state.updateMessage);

    useEffect(() => {
        dispatch(getMessageDetails(id));
        if (isUpdated) {
            dispatch({ type: UPDATE_MESSAGE_RESET });
        }
    }, [dispatch, isUpdated]);

    const handleChangeStatus = (changeStatus) => {
        if (changeStatus !== message.status) {
            const status = changeStatus;
            dispatch(updateMessage(id, status));
        }
    };

    console.log(message);
    if (loading === false) {
        return (
            <div className={cx('container')}>
                <h2 className={cx('heading')}>Chi tiết phiếu phản hồi thắc mắc </h2>
                <div className={cx('status')}>
                    <div
                        className={cx('confirm', { active: message.status === 'Đã giải quyết' })}
                        onClick={() => handleChangeStatus('Đã giải quyết')}
                    >
                        <div className={cx('icon')}>
                            <FaCheck />
                        </div>
                        <span>Đã giải quyết</span>
                    </div>
                    <div
                        className={cx('un-confirm', { active: message.status === 'Chưa giải quyết' })}
                        onClick={() => handleChangeStatus('Chưa giải quyết')}
                    >
                        <div className={cx('icon')}>
                            <FaCheck />
                        </div>
                        <span>chưa giải quyết</span>
                    </div>
                </div>
                <div className={cx('message-info')}>
                    <div className={cx('sender-info')}>
                        <h3>Thông tin người gửi</h3>
                        <div className={cx('field')}>
                            <label className={cx('title')}>Tên:</label>
                            <p>{message.senderInfo.name}</p>
                        </div>
                        <div className={cx('field')}>
                            <label className={cx('title')}>Email:</label>
                            <p>{message.senderInfo.email}</p>
                        </div>
                        <div className={cx('field')}>
                            <label className={cx('title')}>Số điện thoại:</label>
                            <p>{message.senderInfo.phoneNo}</p>
                        </div>
                    </div>
                    <div className={cx('title')}>
                        <h3>
                            Tiêu đề: "<span>{message.title}</span>"
                        </h3>
                    </div>
                    <div className={cx('content')}>
                        <h3>Nội dung:</h3>
                        <p>{message.content}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default UpdateMessage;
