import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, getAllProducts, clearErrors } from '~/actions/productActions';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import ProductGallery from '~/components/ProductGallery';
import ProductDetail from '~/components/ProductDetail';
import ProductItemCard from '~/components/ProductItemCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
    let { className, style, onClick } = props;
    className = cx('next');

    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
}

function SamplePrevArrow(props) {
    let { className, style, onClick } = props;
    className = cx('prev');
    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
}
//
function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector((state) => state.productDetails);
    const { products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProductDetails(id));
        dispatch(getAllProducts());

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, id]);

    const settings = {
        className: 'center',
        infinite: false,
        centerPadding: '60px',
        speed: 300,
        slidesToShow: 5,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    if (!loading && product._id) {
        const cases = [
            {
                title: product.category,
                to: `/collection/${product.category}`,
            },
            {
                title: product.name,
                to: null,
            },
        ];
        return (
            <>
                <Breadcrumb cases={cases} />
                <div className={cx('product')}>
                    <div className={cx('detail')}>
                        <div className={cx('content', 'row')}>
                            <div className={cx('wrap-gallery')}>
                                <ProductGallery product={product} />
                            </div>
                            <div className={cx('wrap-detail')}>
                                <ProductDetail product={product} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('relation')}>
                        <h1 className={cx('heading')}>Sản phẩm liên quan</h1>
                        <div className={cx('content')}>
                            <Slider {...settings}>
                                {products.map((item, index) => (
                                    <div key={index}>
                                        <ProductItemCard item={item} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <Loader />;
    }
}

export default ProductDetails;
