import classNames from 'classnames/bind';
import styles from './Address.module.scss';

const cx = classNames.bind(styles);

function Address() {
    return <div classNames={cx()}>Địa chỉ</div>;
}

export default Address;
