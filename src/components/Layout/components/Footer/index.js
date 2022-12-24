import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import logos from '~/assets/images/logos';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer>
            <div className={cx('container')}>
                <div className={cx('footer-content')}>
                    <div className={cx('widget-wrapper', 'row')}>
                        <div className={cx('widget', 'col-2')}>
                            <h4 className={cx('title')}>Về Duy Thanh Sport</h4>
                            <div className={cx('content')}>
                                <div className={cx('text-about', 'col-2')}>
                                    <p>
                                        Trang mua sắm tẹt ga thoải mái từ A - B, Giao hàng siêu tốc như cách người yêu
                                        cũ bỏ bạn !! Đùa thôi, Đây là đồ án hơi hơi tâm huyết của tui, chúc bạn dạo chơi
                                        dui dẻ ^^
                                    </p>
                                    <div className={cx('logo')}>
                                        <img src={logos[0].url} />
                                    </div>
                                </div>

                                <div className={cx('address', 'col-2')}>
                                    <ul>
                                        <li>
                                            <b>Địa chỉ: </b>51 Linh Trung, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh
                                        </li>
                                        <li>
                                            <b>Điện thoại: </b>0354.560.042
                                        </li>
                                        <li>
                                            <b>Email: </b>nguyenduythanh421.tna@gmail.com
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('widget', 'col-2')}>
                                <h4 className={cx('title')}>hỗ trợ khách hàng</h4>
                                <div className={cx('content')}>
                                    <ul className={cx('list-item')}>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Thông tin tuyển dụng
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Tìm kiếm
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Giới thiệu
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Chính sách đổi trả
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Chính sách Cộng tác viên &amp; Đại lý
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Hướng dẫn mua hàng
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Chính sách bảo mật
                                            </Link>
                                        </li>
                                        <li className={cx('item')}>
                                            <Link className={cx('link')} to="#">
                                                Hướng dẫn cách thanh toán và áp dụng Voucher trên REEPAY
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('widget', 'col-2')}>
                                <h4 className={cx('title')}>Facebook</h4>
                                <div className={cx('Facebook')}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('btns')}>
                    <Link to="#" className={cx('btn')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60">
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                        </svg>
                        <span>Shopee</span>
                    </Link>
                    <Link to="#" className={cx('btn')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60">
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                        </svg>
                        <span>Lazada</span>
                    </Link>
                    <Link to="#" className={cx('btn')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="180px" height="60px" viewBox="0 0 180 60">
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                            <polyline points="179,1 179,59 1,59 1,1 179,1" />
                        </svg>
                        <span>Tiki</span>
                    </Link>
                </div>
            </div>
            <div className={cx('copyright')}>
                <p>
                    Shop nhỏ của Nguyễn Duy Thanh <br />
                    <br />
                    Người đại diện: Nguyễn Duy Thanh
                </p>
                <p>
                    Copyright ©{' '}
                    <a href="#" className={cx('link')}>
                        Olalalala
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
}

export default Footer;
