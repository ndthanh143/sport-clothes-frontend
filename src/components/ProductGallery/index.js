import React from 'react';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImagesSlider from '~/components/product-images-slider';
import classNames from 'classnames/bind';
import styles from './ProductGallery.module.scss';
const cx = classNames.bind(styles);

function ProductGallery({ product }) {
    return (
        <div className={cx('product-gallery')}>
            <ProductImagesSlider product={product} />
        </div>
    );
}

export default ProductGallery;
