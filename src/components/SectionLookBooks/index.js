import classNames from 'classnames/bind';
import styles from './SectionLookBooks.module.scss';
import LookBooks from './LookBooks';

const cx = classNames.bind(styles);

function SectionLookBooks() {
    return (
        <div className={cx('section-look-book')}>
            <LookBooks />
        </div>
    );
}

export default SectionLookBooks;
