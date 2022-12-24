import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '~/actions/productActions';
import Loader from '~/components/Loader';
import SuccessModal from '~/components/SuccessModal';
import { DELETE_PRODUCT_RESET } from '~/constants/productConstants';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function ListProducts() {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const { loading, products, error } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted, loading: deleteLoading } = useSelector((state) => state.deleteProduct);

    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, deleteError, isDeleted]);

    const handleDeleteProduct = (id) => {
        // cảnh báo
        // Xóa
        dispatch(deleteProduct(id));
    };

    if (loading || deleteLoading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Danh sách sản phẩm</h1>

                <div className={cx('table')}>
                    <div className={cx('field-bar')}>
                        <div className={cx('field', 'image')}>Image</div>
                        <div className={cx('field', 'id')}>ID</div>
                        <div className={cx('field', 'name')}>Name</div>
                        <div className={cx('field', 'price')}>Price</div>
                        <div className={cx('field', 'stock')}>Stock</div>
                        <div className={cx('field', 'category')}>Category</div>
                        <div className={cx('field', 'action')}>Action</div>
                    </div>
                    <div className={cx('objects')}>
                        {products.map((item, index) => (
                            <div className={cx('item', { ['even']: index % 2 == 0 })} key={index}>
                                <div className={cx('field', 'image')}>
                                    <img src={item.images[0].url} alt="Ảnh sản phẩm" />
                                </div>
                                <div className={cx('field', 'id')}>{item._id}</div>
                                <div className={cx('field', 'name')}>{item.name}</div>
                                <div className={cx('field', 'price')}>{item.price}</div>
                                <div className={cx('field', 'stock')}>{item.stock}</div>
                                <div className={cx('field', 'category')}>{item.category}</div>

                                <div className={cx('field', 'action')}>
                                    <Link to={`/admin/product/edit/${item._id}`}>
                                        <button className={cx('edit')}>
                                            <FaPen />
                                        </button>
                                    </Link>
                                    <button className={cx('delete')} onClick={() => handleDeleteProduct(item._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListProducts;
