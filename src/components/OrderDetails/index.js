import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails } from '~/actions/orderAction';
import Loader from '../Loader';
import styles from './OrderDetails.module.scss';
import images from '~/assets/images';
import { AiFillBank } from 'react-icons/ai';

const cx = classNames.bind(styles);
function OrderDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { order, loading } = useSelector((state) => state.orderDetails);
    const { shippingInfo, totalPrice, paymentInfo, orderStatus, orderItems } = order;
    const { user } = useSelector((state) => state.auth);

    let paymentType = '';
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch]);

    if (loading == false) {
        if (user._id === order.user._id) {
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
                    <div className={cx('payment')}>
                        {paymentInfo.type === 'momo' && (
                            <div className={cx('momo')}>
                                <h3 className={cx('heading')}>
                                    Quét mã để thanh toán
                                    <img src={images.momo_icon} className={cx('icon')} />
                                </h3>
                                <div className={cx('info')}>
                                    <p>Người nhận: Nguyễn Duy Thanh</p>
                                    <p>Số điện thoại: 0354560042</p>
                                    <p>Số tiền: {totalPrice.toLocaleString({ miniumFractionDigits: 3 })}đ</p>
                                    <p>Ghi chú chuyển tiền bạn ghi mã đơn hàng: {id}</p>
                                </div>
                                <div className={cx('qr-code')}>
                                    <img src={images.qr_code_momo} alt="QR CODE" />
                                </div>
                                <div className={cx('note')}>
                                    Sử dụng app MoMo để quét mã trên và thanh toán, đơn hàng sẽ xử lý tự động và cập
                                    nhật trong vòng 30p
                                </div>
                            </div>
                        )}
                        {paymentInfo.type === 'banking' && (
                            <div className={cx('banking')}>
                                <h3 className={cx('heading')}>
                                    Chuyển tiền ngân hàng
                                    <AiFillBank className={cx('icon')} />
                                </h3>
                                <div className={cx('info')}>
                                    <p>Ngân hàng: Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)</p>
                                    <p>Số tài khoản: 31410003966506</p>
                                    <p>Tên người nhận: NGUYEN DUY THANH</p>
                                    <p>Số tiền: {totalPrice.toLocaleString({ miniumFractionDigits: 3 })}đ</p>
                                    <p>Ghi chú chuyển tiền bạn ghi mã đơn hàng: {id}</p>
                                </div>
                                <div className={cx('note')}>
                                    Sau khi chuyển tiền, đơn hàng sẽ xử lý tự động và cập nhật trong vòng 30p
                                </div>
                            </div>
                        )}
                        {paymentInfo.type === 'direct' && (
                            <div className={cx('direct')}>
                                <h3 className={cx('heading')}>Thanh toán khi nhận hàng</h3>
                                <div className={cx('info')}>
                                    <p>
                                        Bạn vui lòng chuẩn bị số tiền tương ứng và thanh toán cho shipper khi nhận hàng.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('order-details')}>
                        <h2 className={cx('heading')}>#{id}</h2>
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
                                <p className={cx('field', 'order-status')}>
                                    <label>Trạng thái:</label>
                                    <span className={cx('text')}>{orderStatus}</span>
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
                                        <b>
                                            {(item.quantity * item.price).toLocaleString({ miniumFractionDigits: 3 })}
                                            VNĐ
                                        </b>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('notation')}>
                            <h2 className={cx('heading')}>Ghi chú đơn hàng</h2>
                            <p>{order.notation == '' ? '...' : order.notation}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            navigate('/');
        }
    } else {
        return <Loader />;
    }
}

export default OrderDetails;
