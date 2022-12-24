import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function Menu({ children, isSticky }) {
    return <nav className={isSticky ? cx('menu', 'menu-sticky') : cx('menu')}>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
