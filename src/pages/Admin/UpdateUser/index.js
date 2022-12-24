import classNames from 'classnames/bind';
import styles from './updateUser.module.scss';
import Select from 'react-select';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdminUser, updateUser } from '~/actions/userActions';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function UpdateUser() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading } = useSelector((state) => state.updateUser);
    const [optionRole, setOptionRole] = useState();
    const [name, setName] = useState('');
    const roleData = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    const handleSubmit = () => {
        const role = optionRole.value;
        dispatch(updateUser(id, name, role));
    };

    useEffect(() => {
        dispatch(getAdminUser(id));
        setOptionRole({
            label: user.role,
            value: user.role,
        });
        setName(user.name);
    }, [dispatch, user.role]);

    if (loading == false && !updateLoading) {
        return (
            <div className={cx('container')}>
                <h2 className={cx('heading')}>Thông tin người dùng</h2>
                <div className={cx('user-details')}>
                    <div className={cx('field')}>
                        <label>Tên người dùng:</label>
                        <input
                            type="text"
                            value={name}
                            className={cx('text-input')}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Email:</label>
                        <p>{user.email}</p>
                    </div>
                    <div className={cx('field')}>
                        <label>Quyền:</label>
                        <div className={cx('option-select')}>
                            <Select
                                defaultValue={optionRole}
                                isSearchable={false}
                                options={roleData}
                                onChange={(e) => setOptionRole(e)}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className={cx('btn-submit')}>
                    Lưu thay đổi
                </button>
            </div>
        );
    } else {
        return <Loader />;
    }
}

export default UpdateUser;
