import classNames from 'classnames/bind';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const { pathname } = useLocation();
    const [email, setEmail] = useState('');
    return (
        <div className={cx('container')}>
            {pathname === '/password/forgot' ? (
                <>
                    <div className={cx('content')}>
                        <h4 className={cx('heading')}>
                            Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email. Bạn sẽ nhận được một liên kết
                            tạo mật khẩu mới qua email.
                        </h4>
                        <p className={cx('label')}>Tên đăng nhập hoặc email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type here"
                            className={cx('input-email')}
                        />
                        <div>
                            <button className={cx('submit-btn')}>Đặt lại mật khẩu</button>
                        </div>
                    </div>
                    <div className={cx('title')}>Quên mật khẩu</div>
                </>
            ) : (
                <>
                    <div className={cx('content')}>
                        <h4 className={cx('heading')}>Vui lòng nhập mật khẩu mới</h4>
                        <input
                            type="password"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập vào mật khẩu"
                            className={cx('input-password')}
                        />
                        <div>
                            <button className={cx('submit-btn')}>Xác nhận</button>
                        </div>
                    </div>
                    <div className={cx('title')}>Đặt lại mật khẩu</div>
                </>
            )}
        </div>
    );
}

export default ForgotPassword;
