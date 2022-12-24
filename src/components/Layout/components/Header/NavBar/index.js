import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function NavBar() {
    const [navbarSticky, setNavbarSticky] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY > 270) {
            setNavbarSticky(true);
            setIsSticky(true);
        } else {
            setNavbarSticky(false);
            setIsSticky(false);
        }
    };
    // useEffect(() => {
    //     window.addEventListener('scroll', controlNavbar);

    //     return () => {
    //         window.removeEventListener('scroll', controlNavbar);
    //     };
    // }, []);

    return (
        <div className={cx('container', navbarSticky && 'navbar-sticky')}>
            <div className={cx('navbar-wrapper')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Shop quần áo Duy Thanh" />
                </div>
                <div className={cx('menu-wrapper')}>
                    <Menu isSticky={isSticky}>
                        <MenuItem title="Trang chủ" to={config.routes.home} />
                        <MenuItem
                            title="Danh mục sản phẩm "
                            to={config.routes.collection}
                            icon={<FaChevronUp />}
                            hasSubmenu
                        />
                        <MenuItem title="Giới thiệu" to={config.routes.about} />
                        <MenuItem title="Liên hệ" to={config.routes.contact} />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
