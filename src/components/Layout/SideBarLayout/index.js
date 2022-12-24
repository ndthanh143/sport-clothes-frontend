import { useState } from 'react';
import { FaBook, FaChevronDown, FaProductHunt } from 'react-icons/fa';
import { AiFillDashboard, AiFillMessage } from 'react-icons/ai';
import { BsFillHandbagFill, BsFillPeopleFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { GrFormAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideBarLayout.module.scss';
import { useDispatch } from 'react-redux';
import { logout } from '~/actions/userActions';
const cx = classNames.bind(styles);

function SideBarLayout({ children }) {
    const [openSubnav, setOpenSubnav] = useState(false);
    const dispatch = useDispatch();

    const handleOpenSubnav = () => {
        if (openSubnav) {
            setOpenSubnav(!openSubnav);
        }
        if (!openSubnav) {
            setOpenSubnav(!openSubnav);
        }
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <ul className={cx('sidebar-list')}>
                        <li className={cx('sidebar-item', 'dashboard')}>
                            <Link to="/admin/dashboard">
                                <span className={cx('icon-nav')}>
                                    <AiFillDashboard />
                                </span>{' '}
                                Dashboard
                            </Link>
                        </li>
                        <li
                            className={cx('sidebar-item', 'product', { openSubnav: openSubnav })}
                            onClick={handleOpenSubnav}
                        >
                            <span className={cx('wrapper-text')}>
                                <p className={cx('text')}>
                                    <span className={cx('icon-nav')}>
                                        <FaProductHunt />
                                    </span>
                                    Sản phẩm
                                </p>{' '}
                                <span className={cx('icon')}>
                                    <FaChevronDown />
                                </span>
                            </span>
                            <ul
                                className={cx('product-nav-list')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <li className={cx('item')}>
                                    <Link to="/admin/product" className={cx('link')}>
                                        <span className={cx('icon-nav')}>
                                            <FaBook />
                                        </span>
                                        Tất cả sản phẩm
                                    </Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/admin/product/new" className={cx('link')}>
                                        <span className={cx('icon-nav')}>
                                            <GrFormAdd />
                                        </span>
                                        Thêm
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={cx('sidebar-item', 'order')}>
                            <Link to="/admin/orders">
                                <span className={cx('icon-nav')}>
                                    <BsFillHandbagFill />
                                </span>
                                Đơn hàng
                            </Link>
                        </li>
                        <li className={cx('sidebar-item', 'user')}>
                            <Link to="/admin/users">
                                <span className={cx('icon-nav')}>
                                    <BsFillPeopleFill />
                                </span>
                                Users
                            </Link>
                        </li>
                        <li className={cx('sidebar-item', 'message')}>
                            <Link to="/admin/messages">
                                <span className={cx('icon-nav')}>
                                    <AiFillMessage />
                                </span>
                                Phản hồi
                            </Link>
                        </li>
                        <li className={cx('sidebar-item')} onClick={handleLogout}>
                            <a href="/login">
                                <span className={cx('icon-nav')}>
                                    <FiLogOut />
                                </span>
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default SideBarLayout;
