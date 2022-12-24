import classNames from 'classnames/bind';
import styles from './LookBooks.module.scss';
import Button from '~/components/Button';
import combos from '~/assets/images/categories/combos';
import PopoverDot from './PopoverDot';
// import PopoverProduct from './PopoverProduct/PopoverProduct';

const cx = classNames.bind(styles);

function LookBooks() {
    return (
        <div className={cx('look-books', 'row')}>
            {combos.map((combo) => (
                <div key={combo.id} className={cx(`look-book-${combo.id}`, 'col-3')}>
                    <div className={cx('image')}>
                        <img src={combo.url} alt={combo.title} />
                        {combo.products.map((item, index) => (
                            <span className={cx(`popover-${index + 1}`)} key={index}>
                                <PopoverDot product={item} />
                            </span>
                        ))}
                    </div>
                    <div className={cx('detail')}>
                        <p className={cx('title')}>{combo.title}</p>
                        <div className={cx('button')}>
                            <Button primary>Mua Combo</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LookBooks;
