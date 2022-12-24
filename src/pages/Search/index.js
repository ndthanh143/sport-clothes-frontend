import { useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductSearch } from '~/actions/productActions';
import SectionCollection from '~/components/Layout/components/SectionCollection';
import ProductShow from '~/components/ProductShow';
import styles from './Search.module.scss';
import { useMemo } from 'react';
import Loader from '~/components/Loader';
const cx = classNames.bind(styles);

function Search() {
    const { keyword } = useParams();
    const dispatch = useDispatch();

    const { loading, productSearch } = useSelector((state) => state.productSearch);
    useEffect(() => {
        dispatch(getProductSearch(keyword));
    }, []);
    if (loading === false) {
        const products = productSearch;
        return (
            <div className={cx('container')}>
                <div className={cx('heading')}>
                    <h1 className={cx('title')}>Tìm kiếm</h1>
                    <p className={cx('sub-title')}>
                        Có <b>{productSearch.length} sản phẩm </b>cho tìm kiếm
                    </p>
                </div>
                <div className={cx('product-result')}>
                    <p>Kết quả tìm kiếm cho "{keyword}".</p>
                    <SectionCollection>
                        <ProductShow products={productSearch} numberColumn="col-4" />
                    </SectionCollection>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default memo(Search);
