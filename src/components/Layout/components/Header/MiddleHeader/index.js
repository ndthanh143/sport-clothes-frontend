import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './MiddleHeader.module.scss';
import Search from '~/components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/actions/userActions';
import { removeItemFromCart } from '~/actions/cartActions';
import { FaChevronDown, FaUser, FaUserAlt } from 'react-icons/fa';
import Loader from '~/components/Loader';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCartDash } from 'react-icons/bs';

const cx = classNames.bind(styles);

function MiddleHeader() {
    const [actionShow, setActionShow] = useState({
        account: false,
        cart: false,
    });
    let totalPrice = 0;
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading, user } = useSelector((state) => {
        return state.auth;
    });

    console.log(loading, isAuthenticated);

    const { cartItems } = useSelector((state) => state.cart);

    const handleActionShow = (type) => {
        if (type === 'account') {
            if (actionShow.account === false) {
                setActionShow({ account: true, cart: false });
            } else {
                setActionShow({ account: false, cart: false });
            }
        }
        if (type === 'cart') {
            if (actionShow.cart === false) {
                setActionShow({ account: false, cart: true });
            } else {
                setActionShow({ account: false, cart: false });
            }
        }
    };

    const handleDeleteProduct = (item) => {
        dispatch(removeItemFromCart(item));
    };

    const handleLogout = () => {
        dispatch(logout());
        // window.location.reload();
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };
    if (!loading) {
        return (
            <div className={cx('middle')}>
                <div className={cx('container')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src={images.logo} alt="Shop h??ng Nguy???n Duy Thanh" />
                        </Link>
                    </div>
                    <div className={cx('search')}>
                        <Search />
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('box')}>
                            <p className={cx('title')}>0354560042</p>
                            <p className={cx('sub-title')}>T?? v???n mi???n ph??</p>
                        </div>
                        <div className={cx('box')}>
                            <p className={cx('title')}>FREE SHIPPING</p>
                            <p className={cx('sub-title')}>????n h??ng tr??n 1 Tri???u ?????ng</p>
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <div
                            className={actionShow.account ? cx('account', 'js-action-show') : cx('account')}
                            onClick={() => {
                                handleActionShow('account');
                            }}
                        >
                            {isAuthenticated ? (
                                <div className={cx('text')}>
                                    <div className={cx('link')}>
                                        <span className={cx('box-icon')}>
                                            <AiOutlineUser />
                                        </span>
                                        <span className={cx('box-text')}>T??i kho???n c???a t??i</span>
                                        <span className={cx('arrow-drop')}>
                                            <FaChevronDown />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className={cx('text')}>
                                    <div className={cx('link')}>
                                        <span className={cx('box-icon')}>
                                            <AiOutlineUser />
                                        </span>
                                        <span className={cx('box-text')}>????ng nh???p / ????ng k??</span>
                                    </div>
                                </Link>
                            )}

                            {isAuthenticated && (
                                <div className={cx('dropdown')} onClick={(e) => handleDropdownClick(e)}>
                                    <div className={cx('dropdown-content')}>
                                        <div className={cx('title')}>
                                            <h2 className={cx('heading')}>Th??ng tin t??i kho???n</h2>
                                        </div>
                                        <div className={cx('inner')}>
                                            <h2 className={cx('user-name')}>{user.name}</h2>
                                            <ul className={cx('list')}>
                                                <li className={cx('item')}>
                                                    <Link to="/account">T??i kho???n c???a t??i</Link>
                                                </li>
                                                {user && user.role !== 'user' ? (
                                                    <li className={cx('item')}>
                                                        <Link to="/admin/dashboard">
                                                            <b>Trang qu???n l??</b>
                                                        </Link>
                                                    </li>
                                                ) : null}
                                                <li className={cx('item')} onClick={handleLogout}>
                                                    ????ng xu???t
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className={actionShow.cart ? cx('cart', 'js-action-show') : cx('cart')}
                            onClick={() => handleActionShow('cart')}
                        >
                            <div className={cx('text')}>
                                <div className={cx('link')}>
                                    <span className={cx('box-icon')}>
                                        {/* <img src={images.cart} alt="Cart" /> */}
                                        <BsCartDash />
                                        <span className={cx('count-holder')}>
                                            <span className={cx('count')}>{cartItems.length}</span>
                                        </span>
                                    </span>
                                    <span className={cx('box-text')}>Gi??? h??ng</span>
                                </div>
                                <div className={cx('dropdown')} onClick={(e) => handleDropdownClick(e)}>
                                    <div className={cx('dropdown-content')}>
                                        <div className={cx('title')}>
                                            <h2 className={cx('content')}>gi??? h??ng</h2>
                                        </div>
                                        <div className={cx('cart-view')}>
                                            {cartItems.length > 0 ? (
                                                cartItems.map((item, index) => {
                                                    totalPrice += item.price * item.quantity;
                                                    return (
                                                        <div className={cx('cart-view-container')} key={index}>
                                                            <Link
                                                                to={`/product/${item.product}`}
                                                                className={cx('thumb')}
                                                            >
                                                                <img src={item.image} alt="" />
                                                            </Link>
                                                            <div className={cx('content')}>
                                                                <p className={cx('name')}>{item.name}</p>
                                                                <div className={cx('value')}>
                                                                    <div className={cx('props')}>
                                                                        {item.size} / {item.color}
                                                                    </div>
                                                                    <span className={cx('quantity')}>
                                                                        {item.quantity}
                                                                    </span>
                                                                    <span className={cx('price')}>
                                                                        {item.price.toLocaleString({
                                                                            miniumFractionDigits: 3,
                                                                        })}
                                                                        ??
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <button
                                                                className={cx('delete-button')}
                                                                onClick={() => {
                                                                    handleDeleteProduct(item);
                                                                }}
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <>
                                                    <div className={cx('mini-cart-icon')}>
                                                        <img src={images.cartEmty} alt="cart" />
                                                    </div>
                                                    <div className={cx('content')}>Hi???n ch??a c?? s???n ph???m</div>
                                                </>
                                            )}
                                        </div>
                                        <table className={cx('total')}>
                                            <tbody>
                                                <tr>
                                                    <td className={cx('total-text')}>T???ng ti???n:</td>
                                                    <td className={cx('total-amount')}>
                                                        {totalPrice.toLocaleString({ miniumFractionDigits: 3 })}???
                                                    </td>
                                                </tr>
                                                <tr className={cx('button')}>
                                                    <td>
                                                        <span className={cx('link-to-cart')}>
                                                            <Button primary to="/cart">
                                                                xem gi??? h??ng
                                                            </Button>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={cx('link-to-pay')}>
                                                            <Button primaryReverse to="/shipping">
                                                                thanh to??n
                                                            </Button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default MiddleHeader;
