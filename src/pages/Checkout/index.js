import className from 'classnames/bind';
import styles from './Checkout.module.scss';
import ShippingInfo from '~/components/ShippingInfo';
import { useSelector } from 'react-redux';
import OrderConfirm from '~/components/OrderConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutStep from '~/components/CheckoutStep';
import Payment from '~/components/Payment';
import OrderSuccess from '~/components/OrderSuccess';

const cx = className.bind(styles);

function Checkout() {
    const { shippingInfo } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    let RenderComponent;
    let shipping;
    let confirmOrder;
    let payment;
    const props = { shipping: false, confirmOrder: false, payment: false };

    // if (!isAuthenticated) {
    //     navigate('/login');
    // }

    switch (pathname) {
        case '/shipping':
            RenderComponent = ShippingInfo;
            props.shipping = true;
            break;
        case '/order/confirm':
            RenderComponent = OrderConfirm;
            props.confirmOrder = true;
            break;
        case '/order/payment':
            RenderComponent = Payment;
            props.payment = true;
            break;
        case '/order/success':
            RenderComponent = OrderSuccess;
            break;
        default:
            navigate('/shipping');
    }
    return (
        <div className={cx('container')}>
            <CheckoutStep {...props} />
            <RenderComponent />
        </div>
    );
}

export default Checkout;
