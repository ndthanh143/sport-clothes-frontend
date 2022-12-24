import classNames from 'classnames/bind';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import styles from './CheckoutStep.module.scss';
const cx = classNames.bind(styles);

function CheckoutStep({ shipping, confirmOrder, payment }) {
    const { pathname } = useLocation();

    return (
        <div className={cx('container')}>
            {shipping ? (
                <>
                    <div className={cx('step')}>Shipping Info</div>
                    <div className={cx('step', 'incomplete')}>Confirm Order</div>
                    <div className={cx('step', 'incomplete')}>Payment</div>
                </>
            ) : null}
            {confirmOrder ? (
                <>
                    <Link to="/shipping">
                        <div className={cx('back')}>
                            <FaArrowCircleLeft className={cx('icon')} />
                        </div>
                    </Link>
                    <div className={cx('step', 'complete')}>Shipping Info</div>
                    <div className={cx('step')}>Confirm Order</div>
                    <div className={cx('step', 'incomplete')}>Payment</div>
                </>
            ) : null}
            {payment ? (
                <>
                    <Link to="/order/confirm">
                        <div className={cx('back')}>
                            <FaArrowCircleLeft className={cx('icon')} />
                        </div>
                    </Link>
                    <div className={cx('step', 'complete')}>Shipping Info</div>
                    <div className={cx('step', 'complete')}>Confirm Order</div>
                    <div className={cx('step')}>Payment</div>
                </>
            ) : null}
        </div>
    );
}

export default CheckoutStep;
