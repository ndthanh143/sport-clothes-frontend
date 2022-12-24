import classNames from 'classnames/bind';
import styles from './About.module.scss';
import aboutPageImages from '~/assets/images/aboutPageImages';
import Breadcrumb from '~/components/Breadcrumb';
import SideBar from '~/components/Layout/components/SideBar';
import SideBox from '~/components/SideBox';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function About() {
    return (
        <>
            <Breadcrumb cases={{ title: 'Shop Thời Trang Thể Thao' }} />
            <div className={cx('container')}>
                <div className={cx('wrap-content')}>
                    <div className={cx('header')}>
                        <h1>Giới Thiệu Shop Thời Trang Thể Thao</h1>
                    </div>
                    <div className={cx('content')}>
                        <h4 className={cx('title')}> Giới Thiệu Shop Thời Trang Thể Thao</h4>
                        <p>
                            &emsp; Đây là sản phẩm đồ án CNTT của Sinh Viên năm 3 trường Đại học Sư Phạm kỹ thuật Thành
                            Phố Hồ Chí Minh
                        </p>
                        <div className={cx('image')}>
                            <img src={aboutPageImages[0]} alt="img" />
                            <br />
                            <span>Hình ảnh thanh niên đang vui vẻ chụp hình trước miếng bò beefstake</span>
                        </div>
                        <p>
                            &emsp; Sau đây là những hình ảnh xàm xí một chút về một trong những chiến dịch đáng nhớ
                            trong đời tôi, MÙA HÈ XANH Đak Nông 2022 !!!. Nếu bạn rảnh có thể xem, còn không thì cứ vui
                            vẻ lướt qua nhé
                        </p>
                        <div className={cx('image')}>
                            <img src={aboutPageImages[1]} alt="img" />
                            <br />
                            <span>Đây là lúc thể hiện ngầu lòi chơi đàn với mấy đứa nhỏ nè.</span>
                        </div>
                        <p>
                            &emsp; Ở trên đó 21 ngày, là một quãng thời gian vô cùng tuyệt vời. Gần như tất cả chúng tôi
                            đã bỏ hết mọi ưu phiền lo âu để đắm chìm trong những không khí trong lành, những ngày tháng
                            ăn nằm dầm dề với nhau mà không khi nào nhạt phai
                        </p>
                        <div className={cx('image')}>
                            <img src={aboutPageImages[2]} alt="img" />
                            <br />
                            <img src={aboutPageImages[3]} alt="img" />
                            <br />
                            <span>
                                Đi ngang đường tự nhiên gặp chú gì vừa đi làm về mang chùm bơ ra cho mà không dám nhận
                                tại chỉ huy trưởng nó đang nhìn :V.
                            </span>
                        </div>
                        <p>
                            &emsp; Hình ảnh đồng quê này yên bình thực sự đấy. Cái lạnh của vùng núi, sự mộc mạc của con
                            người
                        </p>
                        <div className={cx('image')}>
                            <img src={aboutPageImages[4]} alt="img" />
                            <br />
                            <span>Những hoạt động thường ngày.</span>
                            <div className={cx('image')}>
                                <img src={aboutPageImages[5]} alt="img" />
                                <br />
                                <img src={aboutPageImages[6]} alt="img" />
                                <br />
                                <img src={aboutPageImages[7]} alt="img" />
                                <br />
                                <img src={aboutPageImages[8]} alt="img" />
                                <br />
                                <img src={aboutPageImages[9]} alt="img" />
                                <br />
                            </div>

                            <span>
                                Lưu từng này thôi, viết cái báo cáo đã sắp hết deadline rồi, mai mốt rảnh up tiếp :Vv
                            </span>
                        </div>
                    </div>
                </div>
                <SideBar>
                    <SideBox title="Danh Mục page" collapsible>
                        <div className={cx('sidebar-list')}>
                            <ul className={cx('menu-list')}>
                                <li className={cx('item')}>
                                    <Link to="/">Thông tin tuyển dụng</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Tìm kiếm</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Giới thiệu</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Chính sách đổi trả</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Chính sách cộng tác viên & Đại lý</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Hướng dẫn mua hàng</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Chính sách bảo mật</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/">Hướng dẫn cách thanh toán và áp dụng Voucher trên REEPAY</Link>
                                </li>
                            </ul>
                        </div>
                    </SideBox>
                </SideBar>
            </div>
        </>
    );
}

export default About;
