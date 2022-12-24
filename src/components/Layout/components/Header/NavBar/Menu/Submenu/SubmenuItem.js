import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Submenu.module.scss';
import Submenu from './Submenu';
import SubmenuItem from './SubmenuItem';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function SubMenuItem({ title, to, icon, hasSubmenu, ListSubmenuItem }) {
    return hasSubmenu ? (
        <li className={cx('sub-item', { hasSubmenu })}>
            <Link to={to} className={cx('item-link')}>
                <span className={cx('title')}>{title}</span>
                {icon ? <span className={cx('icon')}>{icon}</span> : undefined}
            </Link>
            <div className={cx('submenu-wrapper', 'level-2')}>
                <Submenu>
                    {ListSubmenuItem.map((item, index) => (
                        <SubmenuItem title={item} to="/collection" key={index}></SubmenuItem>
                    ))}
                </Submenu>
            </div>
        </li>
    ) : (
        <li className={cx('sub-item')}>
            <Link to={to} className={cx('item-link')}>
                <span className={cx('title')}>{title}</span>
                {icon ? <span className={cx('icon')}>{icon}</span> : undefined}
            </Link>
        </li>
    );
}

SubMenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.node.isRequired,
    icon: PropTypes.node,
    hasSubmenu: PropTypes.bool,
    ListSubmenuItem: PropTypes.array,
};

export default SubMenuItem;
