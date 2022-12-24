import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import sliderImages from '~/assets/images/slider';
import styles from './Slider.module.scss';
import BtnSlider from './BtnSlider';

const cx = classNames.bind(styles);

function Slider() {
    const delay = 15000;
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex !== sliderImages.length) {
            setSlideIndex(slideIndex + 1);
        } else {
            setSlideIndex(1);
        }
    };
    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
        } else {
            setSlideIndex(sliderImages.length);
        }
    };
    const moveToSlide = (index) => {
        setSlideIndex(index);
    };

    useEffect(() => {
        setTimeout(nextSlide, delay);
    }, [slideIndex]);

    return (
        <div className="slider">
            <div className={cx('container')}>
                <div className={cx('slides')}>
                    <div className={cx('wrap-slides')}>
                        {sliderImages.map((item, index) => (
                            <div className={slideIndex === item.id ? cx('image', 'active') : cx('image')} key={index}>
                                <img src={item.url} alt={`slide${index + 1}`} key={index + 1} />
                            </div>
                        ))}
                    </div>
                    <BtnSlider moveSlide={prevSlide} direction="prev" classname={cx('prev-btn')} />
                    <BtnSlider moveSlide={nextSlide} direction="next" classname={cx('next-btn')} />

                    <div className={cx('container-dots')}>
                        {Array.from({ length: 4 }).map((_item, index) => (
                            <span
                                key={index}
                                onClick={() => moveToSlide(index + 1)}
                                className={slideIndex === index + 1 ? cx('dot', 'active') : cx('dot')}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
