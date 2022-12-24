import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SectionCollection.module.scss';

const cx = classNames.bind(styles);

function SectionCollection({ to, title, children, titleAlignCenter }) {
    const props = {};

    return (
        <div {...props} className={cx('section-collection')}>
            <div className={cx('container')}>
                {title ? (
                    <h2 className={titleAlignCenter ? cx('title', 'title-align-center') : cx('title')}>
                        {to ? (
                            <Link className={cx('link')} to={to}>
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                    </h2>
                ) : undefined}
                <div className={cx('wrap-list')}>{children}</div>
            </div>
        </div>
    );
}

export default SectionCollection;
