import classNames from 'classnames/bind';
import styles from './Pagination.scss';
import Pagination from 'react-js-pagination';

const cx = classNames.bind(styles);

function PaginationComp(props) {
    const { activePage, itemsCountPerPage, totalItemsCount, onChange } = props;
    const pageCount = Math.ceil(totalItemsCount / itemsCountPerPage);

    return (
        <div className={cx('wrapper-pagination')}>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                onChange={onChange}
                hideFirstLastPages={true}
                nextPageText={activePage == pageCount ? null : 'Next'}
                prevPageText={activePage == 1 ? null : 'Prev'}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
}

export default PaginationComp;
