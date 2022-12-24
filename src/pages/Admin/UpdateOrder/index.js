import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getOrderDetails, updateOrder } from '~/actions/orderAction';
import Loader from '~/components/Loader';
import { UPDATE_ORDER_RESET } from '~/constants/orderConstants';
import styles from './UpdateOrder.module.scss';

const cx = classNames.bind(styles);

function UpdateOrder() {
    const { id } = useParams();
    const { loading: updateLoading, isUpdated } = useSelector((state) => state.updateOrder);
    const { order, loading } = useSelector((state) => state.orderDetails);
    const { shippingInfo, totalPrice, paymentInfo, orderStatus, orderItems } = order;

    const [optionOrderStatus, setOptionOrderStatus] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const orderStatusData = [
        { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
        { label: 'Đã xác nhận', value: 'Đã xác nhận' },
        { label: 'Đang vận chuyển', value: 'Đang vận chuyển' },
        { label: 'Đã giao hàng', value: 'Đã giao hàng' },
        { label: 'Đã hủy', value: 'Đã hủy' },
    ];
    const paymentStatusData = [
        { label: 'Chưa thanh toán', value: 'Chưa thanh toán' },
        { label: 'Đã thanh toán', value: 'Đã thanh toán' },
    ];

    let paymentType = '';
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetails(id));
        setOptionOrderStatus({ label: orderStatus, value: orderStatus });
        if (paymentInfo) {
            setPaymentStatus({ label: paymentInfo.status, value: paymentInfo.status });
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    }, [dispatch, orderStatus, isUpdated]);
    const handleSubmit = () => {
        const paymentInfoData = { type: paymentInfo.type, status: paymentStatus.value };
        const OrderStatusData = optionOrderStatus.value;
        dispatch(updateOrder(id, OrderStatusData, paymentInfoData));
    };

    if (loading == false) {
        switch (paymentInfo.type) {
            case 'banking':
                paymentType = 'Chuyển khoản ngân hàng';
                break;
            case 'momo':
                paymentType = 'Thanh toán qua MoMo';
                break;
            case 'direct':
                paymentType = 'Thanh toán khi nhận hàng';
                break;
            default:
                return;
        }
        return (
            <div className={cx('container')}>
                <div className={cx('order-details')}>
                    <h2 className={cx('heading')}>Thông tin khách hàng</h2>
                    <div className={cx('shipping')}>
                        <div className={cx('content')}>
                            <p className={cx('field')}>
                                <label>Name:</label>
                                <span className={cx('text')}>{shippingInfo.name}</span>
                            </p>
                            <p className={cx('field', 'even')}>
                                <label>Phone:</label>
                                <span className={cx('text')}> {shippingInfo.phoneNo}</span>
                            </p>
                            <p className={cx('field')}>
                                <label>Address:</label>
                                <span className={cx('text')}>{shippingInfo.address}</span>
                            </p>
                            <p className={cx('field', 'even')}>
                                <label>Phương thức thanh toán:</label>
                                <span className={cx('text')}> {paymentType}</span>
                            </p>
                            <p className={cx('field')}>
                                <label>Tổng cộng:</label>
                                <span className={cx('text')}>
                                    {totalPrice.toLocaleString({ miniumFractionDigits: 3 })}VNĐ
                                </span>
                            </p>
                            <p className={cx('field', 'even')}>
                                <label>Thanh toán:</label>
                                <span className={cx('text', { paid: paymentInfo.status === 'Đã thanh toán' })}>
                                    {paymentInfo.status}
                                </span>
                            </p>
                            <p className={cx('field', 'order-status')}>
                                <label>Trạng thái:</label>
                                <span
                                    className={cx('text', {
                                        'wait-confirm': orderStatus === 'Chờ xác nhận',
                                        delivered: orderStatus === 'Đã giao hàng',
                                        cancel: orderStatus === 'Đã hủy',
                                        processing: orderStatus === 'Đã xác nhận' || orderStatus === 'Đang vận chuyển',
                                    })}
                                >
                                    {orderStatus}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={cx('items')}>
                        <h2 className={cx('heading')}>Sản phẩm</h2>
                        {orderItems.map((item, index) => (
                            <div className={cx('product')} key={index}>
                                <div className={cx('thumb')}>
                                    <img src={item.image} alt="thumb" />
                                </div>
                                <div className={cx('description')}>
                                    <div className={cx('name')}>{item.name}</div>
                                    <div className={cx('size')}>Size: {item.size}</div>
                                    <div className={cx('color')}>Màu sắc: {item.color}</div>
                                </div>
                                <div className={cx('total')}>
                                    {item.quantity} x {item.price.toLocaleString({ miniumFractionDigits: 3 })}VNĐ ={' '}
                                    <b>{(item.quantity * item.price).toLocaleString({ miniumFractionDigits: 3 })}VNĐ</b>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('notation')}>
                        <h2 className={cx('heading')}>Ghi chú đơn hàng</h2>
                        <p>{order.notation == '' ? '...' : order.notation}</p>
                    </div>
                </div>
                <div className={cx('operation')}>
                    <h2>Tùy chỉnh</h2>
                    <div className={cx('status-update')}>
                        <p className={cx('title')}>Trạng thái đơn hàng</p>

                        <Select
                            defaultValue={optionOrderStatus}
                            isSearchable={false}
                            options={orderStatusData}
                            onChange={(e) => setOptionOrderStatus(e)}
                        />
                    </div>
                    <div className={cx('payment-update')}>
                        <p className={cx('title')}>Trạng thái thanh toán</p>

                        <Select
                            defaultValue={paymentStatus}
                            isSearchable={false}
                            options={paymentStatusData}
                            onChange={(e) => setPaymentStatus(e)}
                        />
                    </div>
                    <button onClick={handleSubmit} className={cx('btn-submit')}>
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default UpdateOrder;
