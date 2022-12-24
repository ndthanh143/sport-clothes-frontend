import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './sideBar.module.scss';
import SideBox from '~/components/SideBox';
import PostShow from '~/components/PostShow';
const cx = classNames.bind(styles);

function SideBar({ children }) {
    return (
        <div className={cx('container')}>
            <div className={cx('side-bar')}>{children}</div>
        </div>
    );
}

export default SideBar;
