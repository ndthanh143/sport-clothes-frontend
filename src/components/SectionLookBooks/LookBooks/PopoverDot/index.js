import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PopoverDot.module.scss';
import PopoverProduct from '../PopoverProduct/PopoverProduct';

const cx = classNames.bind(styles);

function PopoverDot({ product }) {
    const [active, setActive] = useState(false);

    const handleSetActive = () => {
        setActive(!active);
    };

    return (
        <div className="container">
            <button className={cx('popover-dot')} onClick={handleSetActive}>
                <svg className={active ? cx('active') : null} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                </svg>
            </button>
            <PopoverProduct product={product} active={active} />
        </div>
    );
}

export default PopoverDot;
