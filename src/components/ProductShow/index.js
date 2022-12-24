// import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductShow.module.scss';
import ProductItemCard from '~/components/ProductItemCard';

const cx = classNames.bind(styles);

function ProductShow({ products, numberColumn, horizontal }) {
    return (
        <div className={cx('product-list', 'row-wrap')}>
            {products.map((item, index) => (
                <ProductItemCard item={item} numberColumn={numberColumn} horizontal={horizontal} key={index} />
            ))}
        </div>
    );
}

export default ProductShow;
