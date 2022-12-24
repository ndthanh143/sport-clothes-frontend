import classNames from 'classnames/bind';
import styles from './SizeSelection.module.scss';
const cx = classNames.bind(styles);

function SizeSelection({ size, onChange, checked }) {

    return (
        <label className={cx('custom-radio-btn')}>
            <input type="radio" name="size-option" value={size} onChange={onChange} checked={checked}/>
            <span className={cx('checkmark')}></span>
            <span className={cx('text')}>{size}</span>
        </label>
    );
}

export default SizeSelection;
