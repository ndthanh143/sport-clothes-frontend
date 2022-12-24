import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Register.module.scss';
import { register, clearErrors } from '~/actions/userActions';
import SuccessModal from '~/components/SuccessModal';
import Loader from '~/components/Loader';
const cx = classNames.bind(styles);

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [showConfirmPasswdError, setShowConfirmPasswdError] = useState(false);

    const dispatch = useDispatch();

    const { error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (password !== confirmPassword && confirmPassword !== '') {
            setShowConfirmPasswdError(true);
        } else {
            setShowConfirmPasswdError(false);
        }
    }, [confirmPassword]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            dispatch(register({ name, email, password }));
            setOpenModal(true);
        }
    };
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                <div className={cx('container')}>
                    <div className={cx('heading')}>
                        <h2 className={cx('title')}>Đăng ký</h2>
                    </div>
                    <div className={cx('account-form')}>
                        <form onSubmit={submitHandler} autoComplete="off">
                            <div className={cx('input-wrapper')}>
                                <input
                                    type="text"
                                    required
                                    placeholder="Họ và tên"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>

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
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('input-wrapper')}>
                                <input
                                    className={showConfirmPasswdError ? cx('error-input') : null}
                                    type="password"
                                    required
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                {showConfirmPasswdError && (
                                    <span className={cx('error-log')}>Mật khẩu nhập lại không khớp</span>
                                )}
                            </div>
                            <div className={cx('recaptcha')}>
                                <p className={cx('content')}>
                                    This site is protected by reCAPTCHA and the Google{' '}
                                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                                </p>
                            </div>
                            <div className={cx('submit-btn', 'disa')}>
                                <Button primary>Đăng ký</Button>
                            </div>
                        </form>
                        <div className={cx('secondary-action')}>
                            <p>
                                Đã có tài khoản ? &nbsp;<Link to="/login">Đăng nhập</Link>
                            </p>
                        </div>
                    </div>
                    {openModal && <SuccessModal title={'Registered successfully'} to={'/login'} />}
                </div>
            </>
        );
    }
}

export default Register;
