import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/actions/userActions';
import MyOrders from '~/components/MyOrders';
import Profile from '~/components/Profile';
import Loader from '~/components/Loader';
import OrderDetails from '~/components/OrderDetails';

const cx = className.bind(styles);

function Account(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);

    if (loading === false && !isAuthenticated) {
        navigate('/login');
    }

    let ComponentRender;
    let heading = '';
    switch (location.pathname) {
        case '/account':
            ComponentRender = Profile;
            heading = 'Tài khoản của bạn';
            break;
        case '/myorders':
            ComponentRender = MyOrders;
            heading = 'Đơn hàng của bạn';

            break;
        case `/order/${id}`:
            ComponentRender = OrderDetails;
            heading = 'Chi tiết đơn hàng';

            break;
        default:
            return;
    }

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };
    if (loading === false) {
        return (
            <div className={cx('container')}>
                <div className={cx('heading')}>
                    <h2>{heading}</h2>
                </div>
                <div className={cx('wrapper')}>
                    <div className={cx('sidebar')}>
                        <h4 className={cx('title')}>Tài khoản</h4>
                        <ul className={cx('list-item')}>
                            <li className={cx('item')}>
                                <Link to="/account">Thông tin tài khoản</Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="/myorders">Đơn hàng</Link>
                            </li>
                            <li className={cx('item')} onClick={handleLogout}>
                                <Link to="/">Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content')}>
                        <ComponentRender />
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default Account;
