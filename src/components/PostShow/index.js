import classNames from 'classnames/bind';
import styles from './PostShow.module.scss';
import posts from '~/assets/images/posts';

const cx = classNames.bind(styles);
function PostShow({ numberColumn, horizontal, row, miniShow, largeShow }) {
    const classnames = {
        postList: 'posts-list',
        horizontal,
        row,
        miniShow,
        largeShow,
    };
    return (
        <div className={cx(classnames)}>
            {posts.map((post, index) => (
                <div className={cx('post', numberColumn)} key={index}>
                    <div className={cx('thumb')}>
                        <img src={post.url} alt={post.title} />
                    </div>
                    <div className={cx('description')}>
                        <span className={cx('title')}>
                            <p>{post.title}</p>
                        </span>
                        <span className={cx('date')}>
                            <b>Tin tức</b>&nbsp;-&nbsp;{post.date}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostShow;
