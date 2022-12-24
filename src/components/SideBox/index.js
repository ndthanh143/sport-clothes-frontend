import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBox.module.scss';
const cx = classNames.bind(styles);

function SideBox({ title, children, collapsible }) {
    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        if (!collapse) {
            setCollapse(true);
        } else {
            setCollapse(false);
        }
    };
    return (
        <div className={cx('container')}>
            <div className={cx('title')} onClick={collapsible ? handleCollapse : null}>
                <h2>{title}</h2>
            </div>
            <div className={collapse ? cx('content', 'collapsible') : cx('content')}> {children} </div>
        </div>
    );
}

export default SideBox;
