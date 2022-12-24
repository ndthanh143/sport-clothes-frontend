import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import SideBox from '~/components/SideBox';
import styles from './Cart.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import SideBar from '~/components/Layout/components/SideBar';
import { removeItemFromCart, saveNotation, updateItemCart } from '~/actions/cartActions';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
const cx = classNames.bind(styles);

function Cart() {
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const handleIncrement = (index) => {
        cartItems[index].quantity++;
        const item = cartItems[index];
        dispatch(updateItemCart(item));
    };
    const handleDecrement = (index) => {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            const item = cartItems[index];
            dispatch(updateItemCart(item));
        }
    };
    const checkoutHandler = () => {
        if (isAuthenticated) {
            dispatch(saveNotation(note));
            navigate('/shipping');
        } else {
            navigate('/login?');
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItemFromCart(item));
    };

    let total = 0;
    cartItems.map((item) => {
        total += item.price * item.quantity;
    });

    return (
        <>
            <Breadcrumb cases={{ title: `Giỏ hàng (${cartItems.length})` }} />
            <div className={cx('container')}>
                <div className={cx('heading')}>
                    <h1 className={cx('title')}>Giỏ hàng của bạn</h1>
                </div>
                <div className={cx('content-wrapper')}>
                    <div className={cx('content')}>
                        <p className={cx('sub-title')}>
                            Bạn đang có <b>{cartItems.length} sản phẩm </b> trong giỏ hàng
                        </p>
                        <div className={cx('field-bar')}>
                            <div className={cx('thumb')}></div>
                            <div className={cx('description')}>Sản phẩm</div>
                            <div className={cx('price')}>Giá</div>
                            <div className={cx('quantity')}>Số lượng</div>
                            <div className={cx('calc')}>Thành tiền</div>
                        </div>
                        {cartItems.map((item, index) => (
                            <div className={cx('product')} key={index}>
                                <div className={cx('thumb')}>
                                    <div className={cx('clear-btn')} onClick={() => handleRemoveItem(item)}>
                                        <BsTrash />
                                    </div>
                                    <Link to={`/product/${item.product}`} className={cx('image')}>
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                </div>
                                <div className={cx('description')}>
                                    <p className={cx('name')}>{item.name}</p>
                                    <p className={cx('size')}>
                                        Size: <b>{item.size}</b>
                                    </p>
                                    <p className={cx('color')}>
                                        Màu: <b>{item.color}</b>
                                    </p>
                                </div>
                                <div className={cx('price')}>
                                    {item.price.toLocaleString({ miniumFractionDigits: 3 })}đ
                                </div>
                                <div className={cx('quantity')}>
                                    <span className={cx('value')}>{item.quantity}</span>
                                    <div className={cx('action')}>
                                        <button className={cx('action-btn')} onClick={() => handleIncrement(index)}>
                                            +
                                        </button>
                                        <button className={cx('action-btn')} onClick={() => handleDecrement(index)}>
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('calc')}>
                                    {(item.price * item.quantity).toLocaleString({ miniumFractionDigits: 3 })}đ
                                </div>
                            </div>
                        ))}

                        <div className={cx('notation')}>
                            <label className={cx('title')}>Ghi chú đơn hàng</label>
                            <textarea
                                type="text"
                                name="note"
                                className={cx('text-input')}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </div>

                    <SideBar>
                        <SideBox title="Cộng giỏ hàng">
                            <ul className={cx('menu-list')}>
                                <li className={cx('item')}>
                                    <p className={cx('title')}>Tổng tiền:</p>
                                    <span className={cx('price')}>
                                        {total.toLocaleString({ miniumFractionDigits: 3 })}đ
                                    </span>
                                </li>
                                <li className={cx('item')}>
                                    {/* <p className={cx('sub-title')}>Bạn có thể nhập mã giảm giá ở trang thanh toán</p> */}
                                    <div className={cx('button-pay')} onClick={checkoutHandler}>
                                        <Button primary>tiến hành Thanh toán</Button>
                                    </div>
                                </li>
                            </ul>
                        </SideBox>
                    </SideBar>
                </div>
                <Link to="/collection" className={cx('btn-buy-more')}>
                    <Button tton basic>
                        Tiếp tục mua hàng
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Cart;
