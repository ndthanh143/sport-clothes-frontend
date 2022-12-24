import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { login } from '~/actions/userActions';
import { clearErrors } from '~/actions/productActions';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error]);
    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('heading')}>
                    <h2 className={cx('title')}>Đăng nhập</h2>
                </div>

                <div className={cx('account-form')}>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('recaptcha')}>
                            <p className={cx('content')}>
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                            </p>
                        </div>
                        <div className={cx('submit-btn')}>
                            <Button primary>đăng nhập</Button>
                        </div>
                    </form>
                    <div className={cx('secondary-action')}>
                        <p>
                            Khách hàng mới? <Link to="/register">Tạo tài khoản</Link>
                        </p>
                        <p>
                            Quên mật khẩu? <a href="/password/forgot">Khôi phục mật khẩu</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
