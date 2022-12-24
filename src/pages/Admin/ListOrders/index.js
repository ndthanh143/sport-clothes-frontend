import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder, getAllOrders } from '~/actions/orderAction';
import { clearErrors } from '~/actions/productActions';
import Loader from '~/components/Loader';
import styles from './ListOrders.module.scss';

const cx = classNames.bind(styles);

function ListOrders() {
    const { orders, loading, error } = useSelector((state) => state.orders);
    const { loading: deleteLoading, isDeleted } = useSelector((state) => state.deleteOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        // if (deleteError) {
        //     alert(deleteError);
        //     dispatch(clearErrors());
        // }

        // if (isDeleted) {
        //     alert('Deleted successfully!!');
        // }
    }, [dispatch, isDeleted]);
    const handleDeleteOrder = (id) => {
        // cảnh báo
        dispatch(deleteOrder(id));
    };
    if (!loading && !deleteLoading) {
        return (
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Danh sách đơn hàng</h1>

                <div className={cx('table')}>
                    <div className={cx('field-bar')}>
                        <div className={cx('field', 'id')}>ID</div>
                        <div className={cx('field', 'NoItems')}>Số lượng sản phẩm</div>
                        <div className={cx('field', 'totalPrice')}>Tổng tiền</div>
                        <div className={cx('field', 'payment')}>Thanh toán</div>
                        <div className={cx('field', 'status')}>Status</div>
                        <div className={cx('field', 'action')}>Action</div>
                    </div>
                    <div className={cx('objects')}>
                        {orders.map((item, index) => (
                            <div className={cx('item', { ['even']: index % 2 == 0 })} key={index}>
                                <div className={cx('field', 'id')}>{item._id}</div>
                                <div className={cx('field', 'NoItems')}>{item.orderItems.length}</div>
                                <div className={cx('field', 'totalPrice')}>
                                    {item.totalPrice.toLocaleString({ miniumFractionDigits: 3 })}đ
                                </div>
                                <div className={cx('field', 'payment')}>
                                    {item.paymentInfo.type} - {item.paymentInfo.status}
                                </div>
                                <div
                                    className={cx('field', 'status', {
                                        'wait-confirm': item.orderStatus === 'Chờ xác nhận',
                                        delivered: item.orderStatus === 'Đã giao hàng',
                                        cancel: item.orderStatus === 'Đã hủy',
                                        processing:
                                            item.orderStatus === 'Đã xác nhận' ||
                                            item.orderStatus === 'Đang vận chuyển',
                                    })}
                                >
                                    {item.orderStatus}
                                </div>
                                <div className={cx('field', 'action')}>
                                    <Link to={`/admin/order/edit/${item._id}`}>
                                        <button className={cx('edit')}>
                                            <FaPen />
                                        </button>
                                    </Link>
                                    <button className={cx('delete')} onClick={() => handleDeleteOrder(item._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default ListOrders;
