import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';
import { getAdminProducts } from '~/actions/productActions';
import { getAllUsers } from '~/actions/userActions';
import { getAllOrders } from '~/actions/orderAction';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function Dashboard() {
    const { products: adminProducts, loading: ldProd } = useSelector((state) => state.adminProducts);
    const { users, loading: ldUser, user } = useSelector((state) => state.auth);
    const { orders, totalAmount, loading: ldOrder } = useSelector((state) => state.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllUsers());
        dispatch(getAllOrders());
    }, []);
    console.log(ldProd, ldUser, ldOrder);
    if (ldProd === false && ldUser === false && ldOrder === false) {
        return (
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Xin chào {user.name} !!!</h1>
                <div className={cx('fields')}>
                    <div className={cx('total')}>
                        <h3 className={cx('title')}>Số lượng lúa thu được</h3>
                        <div className={cx('number')}>{totalAmount.toLocaleString({ miniumFractionDigits: 3 })} ký</div>
                    </div>
                    <div className={cx('management')}>
                        <div className={cx('type', 'product')}>
                            <h3 className={cx('title')}>Số lượng đồ chơi</h3>
                            <div className={cx('number')}>{adminProducts.length} cái</div>
                        </div>
                        <div className={cx('type', 'order')}>
                            <h3 className={cx('title')}>Số lượng đơn hàng</h3>
                            <div className={cx('number')}>{orders.length} đơn</div>
                        </div>
                        <div className={cx('type', 'user')}>
                            <h3 className={cx('title')}>Dân số</h3>
                            <div className={cx('number')}>{users.length} người</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default Dashboard;
