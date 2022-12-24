import classNames from 'classnames/bind';
import styles from './Submenu.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Submenu({ children }) {
    return <ul className={cx('submenu')}>{children}</ul>;
}
Submenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Submenu;
