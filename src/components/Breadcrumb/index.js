import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './breadcrumb.module.scss';

const cx = classNames.bind(styles);

function Breadcrumb({ cases }) {
    const crumbs = [
        {
            title: 'Trang Chủ',
            to: '/',
        },
    ].concat(cases);

    return (
        <nav className={cx('container')}>
            <ol className={cx('breadcrumb-list')}>
                {crumbs.map((crumb, index) => {
                    const disabled = index === crumbs.length - 1 ? 'disabled' : false;
                    return (
                        <li key={index} className={cx('item')}>
                            {disabled ? (
                                <span className={cx('btn', 'disabled')}>{crumb.title}</span>
                            ) : (
                                <Link to={crumb.to} className={cx('btn')}>
                                    {crumb.title}
                                </Link>
                                // <span></span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
