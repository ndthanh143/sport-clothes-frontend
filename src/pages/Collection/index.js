import classNames from 'classnames/bind';
import SectionCollection from '~/components/Layout/components/SectionCollection';
import ProductShow from '~/components/ProductShow';
import styles from './Collection.module.scss';
import banners from '~/assets/images/banner';
import images from '~/assets/images';
import FilterBlock from '~/components/FilterBlock';
import PaginationComp from '~/components/Pagination';
import ScrollToTop from '~/ScrollToTop';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearErrors, getAllProducts } from '~/actions/productActions';
import Loader from '~/components/Loader';
import Breadcrumb from '~/components/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Collection() {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.products);
    const [priceRange, setPriceRange] = useState(null);

    //filter category
    const location = useLocation();
    let category;
    let cases = [{ title: 'Danh mục', to: '/collection' }];
    let title = '';
    switch (location.pathname) {
        case '/collection/thoi-trang-the-thao':
            category = 'Quan ao the thao';
            cases = cases.concat({ title: 'Thời trang thể Thao' });
            title = 'Thời trang thể Thao';
            break;
        case '/collection/quan-ao-bong-da':
            category = 'Quan ao bong da';
            cases = cases.concat({ title: 'Quần áo bóng đá' });
            title = 'Quần áo bóng đá';

            break;
        case '/collection/quan-ao-bong-chuyen':
            category = 'Quan ao bong chuyen';
            cases = cases.concat({ title: 'Quần áo bóng chuyền' });
            title = 'Quần áo bóng chuyền';

            break;
        case '/collection/phu-kien-the-thao':
            category = 'Phu kien the thao';
            cases = cases.concat({ title: 'Phụ kiện thể thao' });
            title = 'Phụ kiện thể thao';
            break;
        case '/collection/trang-phuc-chay-bo':
            category = 'Trang phuc chay bo';
            cases = cases.concat({ title: 'Trang phục chạy bộ' });
            title = 'Trang phục chạy bộ';

            break;
        case '/collection/do-clb-doi-tuyen':
            category = 'Do CLB - Doi tuyen';
            cases = cases.concat({ title: 'Đồ CLB - Đội tuyển' });
            title = 'Đồ CLB - Đội tuyển';

            break;
        case '/collection':
            category = null;
            cases = cases.concat({ title: 'Tất cả sản phẩm' });
            title = 'Tất cả sản phẩm';

        default:
            break;
    }

    useEffect(() => {
        dispatch(getAllProducts(currentPage, category));

        if (error) {
            clearErrors(error);
        }
    }, [dispatch, currentPage, category]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const ListCheckBox = {
        brand: ['CP - SPORT', 'EGAN', 'KHÁC'],
        price: ['Dưới 100.000', '100.000đ - 200.000đ', '200.000đ - 300.000đ', 'Trên 300.000đ'],
        size: ['S', 'M', 'L', 'XL', 'XXL'],
    };
    const ListColor = [
        'red',
        'yellow',
        'orange',
        'white',
        'purple',
        'black',
        'light-green',
        'dark-green',
        'gray',
        'light-blue',
        'dark-blue',
        'blue',
        'copper',
        'greyish',
        'dark-gray',
    ];
    const filterPrice = (index) => {
        let price = [];
        switch (index) {
            case 0:
                price[0] = 0;
                price[1] = 100000;
                dispatch(getAllProducts(currentPage, category, price));
                break;
            case 1:
                price[0] = 100000;
                price[1] = 200000;
                dispatch(getAllProducts(currentPage, category, price));
                break;
            case 2:
                price[0] = 200000;
                price[1] = 300000;
                dispatch(getAllProducts(currentPage, category, price));
                break;
            case 3:
                price[0] = 300000;
                price[1] = 1000000;
                dispatch(getAllProducts(currentPage, category, price));
                break;
            default:
                price = null;
                break;
        }
        console.log(index);
        setPriceRange(index);
    };
    if (!loading) {
        return (
            <>
                {/* <ScrollToTop /> */}
                <Breadcrumb cases={cases} />
                <div className={cx('collection')}>
                    <div className={cx('banner')}>
                        <img src={banners[3].url} alt="collection" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('wrapper-content')}>
                            <div className={cx('heading')}>
                                <h1 className={cx('title')}>{title}</h1>
                            </div>
                            <div className={cx('filter')}>
                                <p className={cx('title-filter')}>
                                    <span className={cx('icon')}>
                                        <img src={images.filterIconTitle} alt="filter" />
                                    </span>
                                    Bộ lọc
                                </p>
                                <div className={cx('group-filter', 'row')}>
                                    <FilterBlock
                                        title="Lọc giá"
                                        ListCheckBox={ListCheckBox.price}
                                        checked={priceRange}
                                        onChange={(index) => filterPrice(index)}
                                    />
                                    <FilterBlock title="Thương hiệu" ListCheckBox={ListCheckBox.brand} />
                                    <FilterBlock title="Màu sắc" ListColor={ListColor} />
                                    <FilterBlock title="Kích thước" ListCheckBox={ListCheckBox.size} />
                                </div>
                            </div>
                            <div className={cx('wrap-list')}>
                                <SectionCollection>
                                    <ProductShow products={products} numberColumn="col-4" />
                                </SectionCollection>
                            </div>
                            {productsCount > resPerPage ? (
                                <PaginationComp
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                />
                            ) : null}
                            {productsCount > 0 ? null : (
                                <div className={cx('result')}>
                                    <h2>Chưa có sản phẩm nào trong danh mục này</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <Loader />;
    }
}

export default Collection;
