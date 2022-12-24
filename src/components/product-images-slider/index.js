import React, { useState, useEffect } from 'react';
import './product-images-slider.scss';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

const ProductImagesSlider = ({ product }) => {
    const [activeThumb, setActiveThumb] = useState();
    let imageUrls = [];
    product.images.map((image) => {
        imageUrls = [...imageUrls, image.url];
    });

    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{ swiper: activeThumb }}
                className="product-images-slider"
            >
                {imageUrls.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} alt="slider images" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={10}
                // slidesPerView={imageUrls.length > 5 ? 5 : imageUrls.length}
                slidesPerView={5}

                modules={[Navigation, Thumbs]}
                className="product-images-slider-thumbs"
            >
                {imageUrls.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={item} alt="slider images" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
ProductImagesSlider.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductImagesSlider;
