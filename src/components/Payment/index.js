import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newOrder } from '~/actions/orderAction';
import Button from '../Button';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

function Payment() {
    const [bankingPayment, setBankingPayment] = useState(true);
    const [momoPayment, setMomoPayment] = useState(false);
    const [directPayment, setDirectPayment] = useState(false);
    const dispatch = useDispatch();

    const { notation, cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = () => {
        let paymentInfo;
        if (bankingPayment) {
            //handle
            paymentInfo = { type: 'banking' };
        } else if (momoPayment) {
            //handle
            paymentInfo = { type: 'momo' };
        } else {
            //handle
            paymentInfo = { type: 'direct' };
        }
        const orderItems = cartItems;

        dispatch(newOrder(shippingInfo, user, orderItems, paymentInfo, notation));
    };

    const handleChoosePayment = (type) => {
        switch (type) {
            case 'banking':
                setBankingPayment(true);
                setMomoPayment(false);
                setDirectPayment(false);
                break;
            case 'momo':
                setMomoPayment(true);
                setBankingPayment(false);
                setDirectPayment(false);
                break;
            case 'direct':
                setDirectPayment(true);
                setBankingPayment(false);
                setMomoPayment(false);
                break;
            default:
                return;
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <h2 className={cx('heading')}>Chọn phương thức thanh toán</h2>
                <div
                    className={cx('method', { active: bankingPayment })}
                    onClick={() => handleChoosePayment('banking')}
                >
                    <div className={cx('content')}>
                        <span className={cx('title')}>Chuyển khoản ngân hàng</span>
                        <span className={cx('icon')}>Momo</span>
                    </div>
                    <div className={cx('script')}>
                        Chuyển khoản qua tài khoản ngân hàng của chúng tôi. Số tài khoản sẽ hiển thị trong đơn hàng sau
                        khi bạn Click vào nút Thanh Toán!
                    </div>
                </div>
                <div className={cx('method', { active: momoPayment })} onClick={() => handleChoosePayment('momo')}>
                    <div className={cx('content')}>
                        <span className={cx('title')}>Thanh toán qua MoMo</span>
                        <span className={cx('icon')}>Momo</span>
                    </div>
                    <div className={cx('script')}>Hãy mở App Momo lên và nhấn Đặt Hàng để quét mã thanh toán</div>
                </div>
                <div className={cx('method', { active: directPayment })} onClick={() => handleChoosePayment('direct')}>
                    <div className={cx('content')}>
                        <span className={cx('title')}>Thanh toán khi nhận hàng</span>
                        <span className={cx('icon')}>Momo</span>
                    </div>
                    <div className={cx('script')}>Thanh toán trực tiếp cho shipper khi nhận hàng</div>
                </div>
                <div className={cx('submit-btn')}>
                    <Button primary onClick={handleSubmit} to="/order/success">
                        Hoàn tất
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
