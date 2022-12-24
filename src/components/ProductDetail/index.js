import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { FaLock, FaPhone, FaTruck, FaTruckMoving } from 'react-icons/fa';
import Button from '~/components/Button';
import ColorSelection from '~/components/ColorSelection';
import SizeSelection from '~/components/SizeSelection';
import styles from './ProductDetail.module.scss';

import galleries from '~/assets/images/categories/galleries';
import { addItemToCart } from '~/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function ProductDetail({ product }) {
    const { id } = useParams();

    const [chooseSize, setChooseSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [chooseColor, setChooseColor] = useState(0);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const dispatch = useDispatch();
    console.log(product.colors);

    const addToCart = () => {
        const size = product.sizes[chooseSize].value;
        const color = product.colors[chooseColor];
        dispatch(addItemToCart(id, quantity, size, color));
        alert('Item added successfully to cart');
    };

    return (
        <div className={cx('product-detail')}>
            <div className={cx('order')}>
                <div className={cx('heading')}>
                    <h2>{product.name}</h2>
                </div>
                <div className={cx('price')}>
                    <span>{product.price.toLocaleString({ miniumFractionDigits: 3 })}đ</span>
                </div>
                <div className={cx('variants')}>
                    <div className={cx('size')}>
                        <div className={cx('header')}>Kích thước:</div>
                        <div className={cx('select')}>
                            {product.sizes.map((item, index) => (
                                <div className={cx('element')} key={index}>
                                    <SizeSelection
                                        size={item.value}
                                        onChange={() => setChooseSize(index)}
                                        checked={index == chooseSize}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('colors')}>
                        <div className={cx('header')}>Màu sắc: </div>
                        <div className={cx('select')}>
                            {product.colors.map((item, index) => (
                                <div className={cx('element')} key={index}>
                                    <ColorSelection
                                        color={item}
                                        onChange={() => setChooseColor(index)}
                                        checked={index == chooseColor}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('quantity')}>
                            <button className={cx('btn')} onClick={handleDecrement}>
                                -
                            </button>
                            <div className={cx('text')}>{quantity}</div>
                            <button className={cx('btn')} onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                        <div className={cx('add-btn')}>
                            <Button primary onClick={addToCart}>
                                Thêm vào giỏ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('delivery')}>
                <ul className={cx('info-list')}>
                    <li className={cx('item')}>
                        <span>
                            <FaLock />
                        </span>
                        Cam kết 100% chính hãng
                    </li>

                    <li className={cx('item')}>
                        <span>
                            <FaTruckMoving />
                        </span>
                        Giao hàng dự kiến: <br /> <b>Thứ 2 - Thứ 6 từ 9h00 - 17h00</b>
                    </li>
                    <li className={cx('item')}>
                        <span>
                            <FaPhone />
                        </span>
                        Hỗ trợ 24/7 <br /> Với các kênh chat, email & phone
                    </li>
                </ul>
            </div>
            <div className={cx('description')}>{product.description}</div>
        </div>
    );
}

export default ProductDetail;
