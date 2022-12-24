import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '~/actions/productActions';
import { deleteUser, getAllUsers } from '~/actions/userActions';
import Loader from '~/components/Loader';
import { DELETE_USER_RESET } from '~/constants/userConstants';
import styles from './ListUser.module.scss';

const cx = classNames.bind(styles);

function ListUsers() {
    const dispatch = useDispatch();

    const { loading, users, error } = useSelector((state) => state.auth);
    const { isDeleted, error: deleteError } = useSelector((state) => state.deleteUser);

    useEffect(() => {
        dispatch(getAllUsers());

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert('Deleted successfully!!');
            dispatch({ type: DELETE_USER_RESET });
        }
    }, [dispatch, isDeleted, deleteError]);

    const handleDeleteUser = (id) => {
        // cảnh báo
        // Xóa
        dispatch(deleteUser(id));
    };

    if (loading) {
        <Loader />;
    } else {
        return (
            <div className={cx('container')}>
                <h1 className={cx('heading')}>Danh sách tài khoản người dùng</h1>

                <div className={cx('table')}>
                    <div className={cx('field-bar')}>
                        <div className={cx('field', 'id')}>ID</div>
                        <div className={cx('field', 'name')}>Name</div>
                        <div className={cx('field', 'email')}>Email</div>
                        <div className={cx('field', 'role')}>Role</div>
                        <div className={cx('field', 'action')}>Action</div>
                    </div>
                    <div className={cx('objects')}>
                        {users.map((item, index) => (
                            <div className={cx('item', { ['even']: index % 2 == 0 })} key={index}>
                                <div className={cx('field', 'id')}>{item._id}</div>
                                <div className={cx('field', 'name')}>{item.name}</div>
                                <div className={cx('field', 'email')}>{item.email}</div>
                                <div className={cx('field', 'role')}>{item.role}</div>
                                <div className={cx('field', 'action')}>
                                    <Link to={`/admin/user/edit/${item._id}`}>
                                        <button className={cx('edit')}>
                                            <FaPen />
                                        </button>
                                    </Link>
                                    <button className={cx('delete')} onClick={() => handleDeleteUser(item._id)}>
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

export default ListUsers;
