import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { saveShippingInfo } from '~/actions/cartActions';
import { getAllProvinces } from '~/actions/provinceActions';
import Button from '../Button';
import CheckoutStep from '../CheckoutStep';
import styles from './ShippingInfo.module.scss';

const cx = classNames.bind(styles);

function ShippingInfo() {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const { shippingInfo } = useSelector((state) => state.cart);
    const { provinces } = useSelector((state) => state.provinces);

    const [name, setName] = useState(shippingInfo.name);
    const [address, setAddress] = useState(shippingInfo.address);
    const [province, setProvince] = useState(shippingInfo.province);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProvinces());
    }, []);
    let provinceData = [];
    if (provinces.length > 0) {
        provinces.map((item) => {
            provinceData.push({ value: item.name, label: item.name });
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ name, address, province, phoneNo }));
        navigate('/order/confirm');
    };
    if (loading === false) {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            return (
                <>
                    <div className={cx('container')}>
                        <form className={cx('content')} onSubmit={(e) => submitHandler(e)}>
                            <h1 className={cx('heading')}>Thông tin vận chuyển</h1>
                            <div className={cx('field')}>
                                <label>Tên người nhận</label>
                                <br />
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className={cx('field')}>
                                <label>Địa chỉ</label>
                                <br />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={cx('field')}>
                                <label>Tỉnh thành</label>
                                <br />

                                <Select
                                    options={provinceData}
                                    isSearchable={false}
                                    onChange={(e) => setProvince(e.value)}
                                />
                            </div>
                            <div className={cx('field')}>
                                <label>Số điện thoại</label>
                                <br />

                                <input
                                    type="text"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={cx('submit')}>
                                <button>Continue</button>
                            </div>
                        </form>
                    </div>
                </>
            );
        }
    }
}

export default ShippingInfo;
