import React from 'react';
import classNames from 'classnames/bind';
import styles from './Collections.module.scss';
import videos from '~/assets/videos';
import ReactPlayer from 'react-player/youtube';
import sportImages from '~/assets/images/categories/sport';
import Button from '~/components/Button';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Collections() {
    return (
        <div className={cx('collections')}>
            <div className={cx('container', 'row')}>
                <div className={cx('banner')}>
                    {/* <ReactPlayer url={videos.HomeCategory} width="100%" height="100%" volume="0" /> */}
                    <img src={images.sale} />
                </div>
                <div className={cx('product-demo')}>
                    <img src={sportImages[0].url} alt="thoi-trang-the-thao" />
                    <div className={cx('body')}>
                        <p></p>
                        <h3 className={cx('title')}>thời trang thể thao</h3>
                        <p className={cx('action')}>
                            <div className={cx('button')}>
                                <Button primary to="/collection/thoi-trang-the-thao">
                                    Xem Ngay
                                </Button>
                            </div>
                        </p>
                    </div>
                </div>
                <div className={cx('product-demo')}>
                    <img src={sportImages[1].url} alt="phu-kien-the-thao" />
                    <div className={cx('body')}>
                        <p></p>
                        <h3 className={cx('title')}>phụ kiện thể thao</h3>
                        <p className={cx('action')}>
                            <div className={cx('button')}>
                                <Button primary to="/collection/phu-kien-the-thao">
                                    Xem Ngay
                                </Button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;
