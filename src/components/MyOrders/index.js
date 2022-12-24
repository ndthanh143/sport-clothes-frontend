import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaStreetView } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { myOrders } from '~/actions/orderAction';
import Loader from '../Loader';
import styles from './MyOrders.module.scss';

const cx = classNames.bind(styles);
function MyOrders() {
    const { orders, loading } = useSelector((state) => state.myOrders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myOrders());
    }, []);

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('container')}>
                {orders.length > 0 ? (
                    <div className={cx('table')}>
                        <div className={cx('field-bar')}>
                            <div className={cx('field', 'id')}>ID</div>
                            <div className={cx('field', 'date')}>Ngày đặt hàng</div>
                            <div className={cx('field', 'status')}>Tình Trạng</div>
                            <div className={cx('field', 'total')}>Tổng</div>
                            <div className={cx('field', 'action')}>Thao tác</div>
                        </div>
                        <div className={cx('objects')}>
                            {orders.map((item, index) => (
                                <div className={cx('item')} key={index}>
                                    <div className={cx('field', 'id')}>{item._id}</div>
                                    <div className={cx('field', 'date')}>{item.createdAt}</div>
                                    <div className={cx('field', 'status')}>{item.orderStatus}</div>
                                    <div className={cx('field', 'total')}>
                                        {item.totalPrice.toLocaleString({ miniumFractionDigits: 3 })}đ
                                    </div>
                                    <div className={cx('field', 'action')}>
                                        <div className={cx('view')}>
                                            <Link to={`/order/${item._id}`}>
                                                <button className={cx('view-btn')}>
                                                    <AiFillEye />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={cx('order')}>
                        <p className={cx('text')}>Bạn chưa đặt mua sản phẩm nào.</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MyOrders;
