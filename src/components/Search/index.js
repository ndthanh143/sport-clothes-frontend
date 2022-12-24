import { useState } from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import styles from './search.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductSearch } from '~/actions/productActions';
import { memo } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const dispatch = useDispatch();
    const { loading, productSearch, error } = useSelector((state) => state.productSearch);

    useEffect(() => {
        dispatch(getProductSearch(searchValue.trim()));
    }, [searchValue]);
    useEffect(() => {
        setSearchResult(productSearch);
    }, [productSearch]);

    return (
        <div className={cx('search')}>
            <form action={`/search/${searchValue}`} className={cx('form-search')}>
                <div className={cx('wrap-tippy')}>
                    <Tippy
                        interactive={true}
                        placement={'bottom'}
                        visible={showResult && searchValue.trim() !== ''}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    {searchResult.length == 0 ? (
                                        <div className={cx('no-item-show')}>Không có sản phẩm nào...</div>
                                    ) : (
                                        <>
                                            {searchResult.slice(0, 4).map((item, index) => (
                                                <div className={cx('wrap-item-result')} key={index}>
                                                    <div className={cx('title')}>
                                                        <Link
                                                            to={`/product/${item._id}`}
                                                            className={cx('name')}
                                                            onClick={() => {
                                                                setSearchValue('');
                                                                handleHideResult();
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <p className={cx('price')}>
                                                            {item.price.toLocaleString({ miniumFractionDigits: 3 })}đ
                                                        </p>
                                                    </div>
                                                    <div className={cx('thumb')}>
                                                        <img src={item.images[0].url} alt={item.name} />
                                                    </div>
                                                </div>
                                            ))}

                                            {searchResult.length > 4 ? (
                                                <Link
                                                    className={cx('more')}
                                                    to={`/search/${searchValue}`}
                                                    onClick={() => {
                                                        setSearchValue('');
                                                        handleHideResult();
                                                    }}
                                                >
                                                    Xem thêm {searchResult.length - 4} sản phẩm
                                                </Link>
                                            ) : null}
                                        </>
                                    )}
                                </PopperWrapper>
                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <input
                            value={searchValue}
                            placeholder="Tìm kiếm sản phẩm..."
                            spellCheck={false}
                            required
                            onFocus={() => {
                                setShowResult(true);
                            }}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </Tippy>
                </div>

                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </form>
        </div>
    );
}

export default memo(Search);
