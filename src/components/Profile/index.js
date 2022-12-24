import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);
function Profile() {
    const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);

    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <h4 className={cx('title')}>Thông tin tài khoản</h4>
                <div className={cx('detail')}>
                    <p className={cx('text', 'userName')}>
                        <b>Tên chủ tài khoản: </b>
                        {user.name}
                    </p>
                    <p className={cx('text')}>
                        <b>Email: </b>
                        {user.email}
                    </p>
                    <p className={cx('text')}>Việt Nam</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
