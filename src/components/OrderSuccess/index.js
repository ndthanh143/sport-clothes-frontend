import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './OrderSuccess.module.scss';
const cx = classNames.bind(styles);

function OrderSuccess() {
    useEffect(() => {
        localStorage.setItem('cartItems', []);
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <FaCheck />
            </div>
            <h3 className={cx('title')}>Order Successfully</h3>
            <p className={cx('text')}>Thank you so much for your order.</p>

            <Link to="/myorders">
                <button className={cx('direction-btn')}>Xem thông tin đơn hàng</button>
            </Link>
        </div>
    );
}

export default OrderSuccess;
