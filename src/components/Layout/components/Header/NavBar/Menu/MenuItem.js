import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import Submenu, { SubmenuItem } from './Submenu';
import { FaChevronRight } from 'react-icons/fa';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, hasSubmenu }) {
    return hasSubmenu ? (
        <>
            <NavLink className={(nav) => cx('menu-item', { active: nav.isActive }, 'has-submenu')} to={to}>
                <span className={cx('title')}>{title}</span>
                {icon ? <span className={cx('icon')}>{icon}</span> : undefined}
                <div className={cx('submenu-wrapper')}>
                    <Submenu>
                        <SubmenuItem title="Thời Trang Thể Thao" to="/collection/thoi-trang-the-thao"></SubmenuItem>

                        <SubmenuItem title="Quần Áo Bóng Đá" to="/collection/quan-ao-bong-da"></SubmenuItem>

                        <SubmenuItem title="Quần Áo Bóng Chuyền" to="/collection/quan-ao-bong-chuyen"></SubmenuItem>

                        <SubmenuItem title="Trang Phục Chạy Bộ" to="/collection/trang-phuc-chay-bo"></SubmenuItem>
                        <SubmenuItem title="Đồ CLB - Đội Tuyển" to="/collection/do-clb-doi-tuyen"></SubmenuItem>
                        <SubmenuItem title="Phụ Kiện Thể Thao" to="/collection/phu-kien-the-thao"></SubmenuItem>
                    </Submenu>
                </div>
            </NavLink>
        </>
    ) : (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('title')}>{title}</span>
            {icon ? <span className={cx('icon')}>{icon}</span> : undefined}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.node.isRequired,
    icon: PropTypes.node,
    hasSubmenu: PropTypes.bool,
};

export default MenuItem;
