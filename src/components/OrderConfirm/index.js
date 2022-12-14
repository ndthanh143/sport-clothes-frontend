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
                                    <div className={cx('color')}>M??u s???c: {item.color}</div>
                                </div>
                                <div className={cx('total')}>
                                    {item.quantity} x {item.price.toLocaleString({ miniumFractionDigits: 3 })}VN?? ={' '}
                                    <b>{(item.quantity * item.price).toLocaleString({ miniumFractionDigits: 3 })}VN??</b>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('notation')}>
                        <h2 className={cx('heading')}>Ghi ch??:</h2>
                        <p>{notation}</p>
                    </div>
                </div>
                <SideBar>
                    <SideBox title="T???ng gi?? tr??? ????n h??ng">
                        <ul className={cx('menu-list')}>
                            <li className={cx('item')}>
                                <p className={cx('title')}>Ti???n h??ng:</p>
                                <span className={cx('price')}>
                                    {total.toLocaleString({ miniumFractionDigits: 3 })}??
                                </span>
                            </li>
                            <li className={cx('item')}>
                                <p className={cx('title')}>Ph?? v???n chuy???n:</p>
                                <span className={cx('price')}>0??</span>
                            </li>
                            <li className={cx('item', 'total')}>
                                <p className={cx('title')}>T???ng ti???n thanh to??n:</p>
                                <span className={cx('price')}>0??</span>
                            </li>
                            <li className={cx('item', 'btn-proceed')}>
                                <Button primary to="/order/payment">
                                    ??i t???i b?????c thanh to??n
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
