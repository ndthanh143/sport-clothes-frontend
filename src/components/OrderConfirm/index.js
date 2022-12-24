import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import SideBar from '../Layout/components/SideBar';
import SideBox from '../SideBox';
import styles from './OrderConfirm.module.scss';

const cx = classNames.bind(styles);

function OrderConfirm() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { notation, shippingInfo, cartItems } = useSelector((state) => state.cart);
    console.log(notation);
    const navigate = useNavigate();
    let total = 0;
    cartItems.map((item) => {
        total += item.price * item.quantity;
    });
    if (!isAuthenticated) {
        navigate('/login');
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('order')}>
                    <div className={cx('shipping')}>
                        <h2 className={cx('heading')}>Shipping Info</h2>
                        <div className={cx('content')}>
                            <p className={cx('field')}>
                                <b>Name:</b> {shippingInfo.name}
                            </p>
                            <p className={cx('field')}>
                                <b>Phone:</b> {shippingInfo.phoneNo}
                            </p>
                            <p className={cx('field')}>
                                <b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.province}`}
                            </p>
                        </div>
                    </div>
                    <div className={cx('cart')}>
                        <h2 className={cx('heading')}>Your cart items:</h2>
                        {cartItems.map((item, index) => (
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
                        <h2 className={cx('heading')}>Ghi chú:</h2>
                        <p>{notation}</p>
                    </div>
                </div>
                <SideBar>
                    <SideBox title="Tổng giá trị đơn hàng">
                        <ul className={cx('menu-list')}>
                            <li className={cx('item')}>
                                <p className={cx('title')}>Tiền hàng:</p>
                                <span className={cx('price')}>
                                    {total.toLocaleString({ miniumFractionDigits: 3 })}đ
                                </span>
                            </li>
                            <li className={cx('item')}>
                                <p className={cx('title')}>Phí vận chuyển:</p>
                                <span className={cx('price')}>0đ</span>
                            </li>
                            <li className={cx('item', 'total')}>
                                <p className={cx('title')}>Tổng tiền thanh toán:</p>
                                <span className={cx('price')}>0đ</span>
                            </li>
                            <li className={cx('item', 'btn-proceed')}>
                                <Button primary to="/order/payment">
                                    Đi tới bước thanh toán
                                </Button>
                            </li>
                        </ul>
                    </SideBox>
                </SideBar>
            </div>
        );
    }
}

export default OrderConfirm;
