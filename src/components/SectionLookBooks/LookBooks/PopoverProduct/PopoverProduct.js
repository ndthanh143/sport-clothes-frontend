import classNames from 'classnames/bind';
import styles from './PopoverProduct.module.scss';

const cx = classNames.bind(styles);

function PopoverProduct({ product, active }) {
    return (
        <div className={active ? cx('popover-product', 'active') : cx('popover-product')}>
            <div className={cx('thumb')}>
                <img src={product.url} alt={product.title} />
            </div>
            <div className={cx('text')}>
                <p className={cx('title')}>{product.title}</p>
                <p className={cx('price')}>{product.price},000đ</p>
            </div>
        </div>
    );
}

export default PopoverProduct;
