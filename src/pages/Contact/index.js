import { useState } from 'react';
import classNames from 'classnames/bind';
import { FaEnvelope, FaLocationArrow, FaPhone } from 'react-icons/fa';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import styles from './contact.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { newMessage } from '~/actions/messageActions';
import Loader from '~/components/Loader';
import { clearErrors } from '~/reducers/messageReducers';

const cx = classNames.bind(styles);
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { loading, success } = useSelector((state) => state.newMessage);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const senderInfo = { name, email, phoneNo };
        try {
            dispatch(newMessage(senderInfo, title, content));
            clearForm();
        } catch (error) {
            dispatch(clearErrors());
        }
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhoneNo('');
        setTitle('');
        setContent('');
    };

    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                <Breadcrumb cases={{ title: 'Liên hệ' }} />
                <div className={cx('container')}>
                    <div className={cx('location')}></div>
                    <div className={cx('content')}>
                        <div className={cx('info')}>
                            <h2 className={cx('heading')}>Thông tin liên hệ</h2>
                            <ul className={cx('contact-list')}>
                                <li>
                                    <span className={cx('icon')}>
                                        <FaLocationArrow />
                                    </span>
                                    <span className={cx('description')}>
                                        <p className={cx('title')}>Địa chỉ</p>
                                        <p>KTX Khu B, phường Đông Hòa, Dĩ An, Bình Dương</p>
                                    </span>
                                </li>
                                <li>
                                    <span className={cx('icon')}>
                                        <FaEnvelope />
                                    </span>
                                    <span className={cx('description')}>
                                        <p className={cx('title')}>Email</p>
                                        <p>thanhnd143@gmail.com</p>
                                    </span>
                                </li>
                                <li>
                                    <span className={cx('icon')}>
                                        <FaPhone />
                                    </span>
                                    <span className={cx('description')}>
                                        <p className={cx('title')}>Điện thoại</p>
                                        <p>0354.560.042</p>
                                    </span>
                                </li>
                                <li>
                                    <span className={cx('icon')}>
                                        <FaEnvelope />
                                    </span>
                                    <span className={cx('description')}>
                                        <p className={cx('title')}>Thời gian làm việc</p>
                                        <p>
                                            Thứ 2 đến Thứ 6 từ 8h đến 18h; <br />
                                            Thứ 7 và Chủ nhật từ 8h00 đến 17h00
                                        </p>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('form')}>
                            <h2 className={cx('heading')}>Gửi thắc mắc cho chúng tôi</h2>
                            <p className={cx('legend')}>Đừng ngại để lại tin nhắn để Shop hỗ trợ bạn nhanh hơn nhé!</p>
                            {success ? (
                                <div className={cx('anounce')}>
                                    <p>
                                        Cám ơn bạn đã liên hệ, Chúng tôi sẽ trả lời trực tiếp thông qua email và số điện
                                        thoại bạn để lại ngay khi có thể
                                    </p>
                                </div>
                            ) : null}
                            <form action="#" className={cx('form-input')}>
                                <input
                                    type="text"
                                    placeholder="Tên của bạn"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại của bạn"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Tiêu đề nội dung"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <textarea
                                    placeholder="Nội dung"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <p className={cx('caption')}>
                                    This site is protected by reCAPTCHA and the Google{' '}
                                    <a href="https://policies.google.com/privacy">&nbsp;Privacy Policy&nbsp;</a> and{' '}
                                    <a href="https://policies.google.com/terms">&nbsp;Terms of Service&nbsp;</a> apply.
                                </p>
                                <div className={cx('submit-btn')} onClick={handleSubmit}>
                                    <input type="submit" value="GỬI CHO CHÚNG TÔI" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Contact;
