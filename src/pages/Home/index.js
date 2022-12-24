import React, { useEffect } from 'react';
import Slider from '~/components/Layout/components/Slider';
import Collections from '~/components/Layout/components/Collections';
import SectionCollection from '~/components/Layout/components/SectionCollection';
import ProductShow from '~/components/ProductShow';
import Banner from '~/components/Banner';
import banners from '~/assets/images/banner';
import SectionLookBooks from '~/components/SectionLookBooks';

import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Button from '~/components/Button';
import PostShow from '~/components/PostShow';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '~/actions/productActions';
import Loader from '~/components/Loader';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const { loading, products } = useSelector((state) => state.products);
    let footballProducts = [];
    let sportProducts = [];
    let volleyballProducts = [];
    let newProducts = [];
    let accessory = [];

    useEffect(() => {
        dispatch(getAllProducts(currentPage));
    }, [dispatch]);

    if (loading === false) {
        products.map((item) => {
            switch (item.category) {
                case 'Quan ao bong da':
                    footballProducts.push(item);
                    break;
                case 'Quan ao the thao':
                    sportProducts.push(item);
                    break;
                case 'Quan ao bong chuyen':
                    volleyballProducts.push(item);
                    break;
                case 'Phu kien the thao':
                    accessory.push(item);
                    break;

                default:
                    break;
            }
        });
    }

    if (!loading && products) {
        return (
            <React.Fragment>
                <Slider />
                <Collections />
                <div className={cx('section-new-product')}>
                    <SectionCollection title="sản phẩm mới" to="/collection">
                        <ProductShow products={products} numberColumn="col-4" />
                        <div>
                            <Banner url={banners[0].url} to={banners[0].to} />
                        </div>
                    </SectionCollection>
                </div>
                <div className={cx('section-combo')}>
                    <SectionCollection title="Combo thời trang thể thao">
                        <SectionLookBooks />
                    </SectionCollection>
                </div>
                <div className={cx('section-football')}>
                    <SectionCollection title="Trang phục bóng đá" to="/collection/quan-ao-bong-da">
                        <ProductShow products={footballProducts} numberColumn="col-4" horizontal />
                        <div className={cx('section-football-clothes', 'row')}>
                            <div className={cx('banner', 'col-2')}>
                                <Banner url={banners[1].url} to={banners[1].to} />
                            </div>
                            <div className={cx('banner', 'col-2')}>
                                <Banner url={banners[2].url} to={banners[2].to} />
                            </div>
                        </div>
                    </SectionCollection>
                </div>
                <div className={cx('section-voleyball')}>
                    <SectionCollection title="Trang phục bóng chuyền" to="/collection/quan-ao-bong-chuyen">
                        <ProductShow products={volleyballProducts} numberColumn="col-6" />
                    </SectionCollection>
                </div>
                <div className={cx('section-accessory')}>
                    <SectionCollection title="Phụ kiện thể thao" to="/collection/phu-kien-the-thao">
                        <ProductShow products={accessory} numberColumn="col-5" />
                    </SectionCollection>
                </div>
                <div className={cx('section-bottom')}>
                    <SectionCollection>
                        <div className={cx('wrapper')}>
                            <Link to="/collection" className={cx('link')}>
                                <Button basic className={cx('bottom-btn')}>
                                    Xem thêm nhiều sản phẩm khác
                                </Button>
                            </Link>
                        </div>
                    </SectionCollection>
                </div>
            </React.Fragment>
        );
    } else {
        return <Loader />;
    }
}

export default Home;
