import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner({ url, to }) {
    return (
        <Link to={to} className={cx('banner')}>
            <img src={url} alt="" className={cx('image')} />
        </Link>
    );
}

export default Banner;
