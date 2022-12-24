import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import SideBar from '~/components/Layout/components/SideBar';
import Pagination from '~/components/Pagination';
import PostShow from '~/components/PostShow';
import SideBox from '~/components/SideBox';

import styles from './News.module.scss';

const cx = classNames.bind(styles);

function News() {
    return (
        <>
            <Breadcrumb cases={{ title: 'Tin tức' }} />

            <div className={cx('container')}>
                <div className={cx('wrap-content')}>
                    <PostShow horizontal largeShow />
                    <Pagination />
                </div>
                <SideBar>
                    <SideBox title="Bài viết mới nhất" collapsible>
                        <ul className={cx('list-item')}>
                            <li className={cx('item')}>
                                <PostShow horizontal miniShow />
                            </li>
                        </ul>
                    </SideBox>
                    <SideBox title="Danh mục bài viết" collapsible>
                        <div className={cx('sidebar-list')}>
                            <ul className={cx('menu-list')}>
                                <li className={cx('item')}>
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/collection">Danh mục sản phẩm</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/news">Tin tức & sự kiện</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/about">Giới thiệu</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="/contact">Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                    </SideBox>
                </SideBar>
            </div>
        </>
    );
}

export default News;
