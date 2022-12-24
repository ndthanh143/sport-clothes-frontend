import { useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames/bind';
import ImageUploading from 'react-images-uploading';
import { FaCloudUploadAlt } from 'react-icons/fa';
import styles from './UpdateProduct.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct } from '~/actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessModal from '~/components/SuccessModal';
import { UPDATE_PRODUCT_RESET } from '~/constants/productConstants';
import Loader from '~/components/Loader';
import { getAllCategories } from '~/actions/categoryActions';

const cx = classNames.bind(styles);

function UpdateProduct() {
    const { id } = useParams();
    const { product, loading } = useSelector((state) => state.productDetails);
    const { loading: updateLoading, isUpdated } = useSelector((state) => state.updateProduct);
    const { loading: categoryLoading, categories } = useSelector((state) => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let categoryData = [];

    const colorData = [
        { value: 'red', label: 'Đỏ' },
        { value: 'blue', label: 'Xanh dương' },
        { value: 'yellow', label: 'Vàng' },
        { value: 'white', label: 'Trắng' },
        { value: 'black', label: 'Đen' },
        { value: 'orange', label: 'Cam' },
        { value: 'purple', label: 'Tím' },
        { value: 'gray', label: 'Xám' },
        { value: 'greyish', label: 'Xám nhạt' },
        { value: 'light-blue', label: 'Xanh biển nhạt' },
        { value: 'dark-blue', label: 'Xanh biển đậm' },
        { value: 'dark-gray', label: 'Xám đậm' },
        { value: 'copper', label: 'Đồng' },
        { value: 'light-green', label: 'Xanh lá nhạt' },
        { value: 'dark-green', label: 'Xanh lá đậm' },
    ];

    const [openModal, setOpenModal] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [colors, setColors] = useState([]);
    const [images, setImages] = useState([]);

    const [s, setS] = useState(0);
    const [m, setM] = useState(0);
    const [l, setL] = useState(0);
    const [xl, setXL] = useState(0);
    const [xxl, setXXL] = useState(0);

    const handleUploadImages = (imageList) => {
        setImages(imageList);
    };
    const handleRemove = (index) => {
        let urls = images;
        urls = urls.filter((item) => item !== images[index]);
        setImages(urls);
    };

    useEffect(
        () => {
            dispatch(getProductDetails(id));
            if (product._id == id) {
                setName(product.name);
                setPrice(product.price);
                setCategory(product.category);
                setColors(product.colors);
                setDescription(product.description);
                let imgUrls = [];
                product.images.map((item) => {
                    imgUrls.push({ data_url: item.url });
                });
                setImages(imgUrls);

                setS(product.sizes.find((item) => item.value === 'S').amount);
                setM(product.sizes.find((item) => item.value === 'M').amount);
                setL(product.sizes.find((item) => item.value === 'L').amount);
                setXL(product.sizes.find((item) => item.value === 'XL').amount);
                setXXL(product.sizes.find((item) => item.value === 'XXL').amount);
            }
        },
        [product._id, product.name, product.price],
        product.category,
        product.images,
    );
    console.log(product);
    useEffect(() => {
        dispatch(getAllCategories());
        if (categories.length > 0) {
            setCategory(categories[0].name);
        }
    }, [dispatch, categories.length]);
    useEffect(() => {
        //handle input price, stock < 0
        if (price < 0 || price == null) {
            setPrice(0);
        }
        // if (stock < 0 || price == null) {
        //     setStock(0);
        // }

        if (isUpdated) {
            setOpenModal(true);
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [isUpdated]);
    const submitHandler = (e) => {
        e.preventDefault();
        let imgData = [];
        images.map((item) => {
            imgData.push({ url: item.data_url });
        });

        let colorList = [];
        colors.map((item) => {
            colorList.push(item.value);
        });
        const sizes = [
            { value: 'S', amount: s },
            { value: 'M', amount: m },
            { value: 'L', amount: l },
            { value: 'XL', amount: xl },
            { value: 'XXL', amount: xxl },
        ];
        let stock = 0;
        sizes.map((item) => {
            stock += item.amount;
        });
        dispatch(updateProduct(id, name, price, category, stock, imgData, colorList, sizes, description));
    };

    if (loading || updateLoading || categoryLoading) {
        return <Loader />;
    } else {
        categories.map((item) => {
            categoryData.push({
                value: item.name,
                label: item.name,
            });
        });
        return (
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <form className={cx('form')}>
                        <div className={cx('field', 'fieldName')}>
                            <label className={cx('label')}>Product name</label>
                            <div className={cx('value')}>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Type here"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('field', 'fieldCategory')}>
                            <label className={cx('label')}>Category</label>
                            <div className={cx('value')}>
                                <Select
                                    defaultValue={() => {
                                        const index = categoryData.findIndex((x) => x.value === category);
                                        return categoryData[index];
                                    }}
                                    isSearchable={false}
                                    options={categoryData}
                                    onChange={(e) => setCategory(e.value)}
                                />
                            </div>
                        </div>

                        <div className={cx('field', 'fieldImage')}>
                            <label className={cx('label')}>Images</label>
                            <div className={cx('value')}>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={handleUploadImages}
                                    dataURLKey="data_url"
                                >
                                    {({ onImageUpload }) => (
                                        <>
                                            <div className={cx('list-image')}>
                                                {images.map((item, index) => (
                                                    <div className={cx('image')} key={index}>
                                                        <img src={item.data_url} alt="image" />
                                                        <div
                                                            className={cx('remove')}
                                                            onClick={() => {
                                                                handleRemove(index);
                                                            }}
                                                        >
                                                            Xóa
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cx('upload')}>
                                                <FaCloudUploadAlt className={cx('icon')} onClick={onImageUpload} />
                                            </div>
                                        </>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                        <div className={cx('field', 'fieldColors')}>
                            <label className={cx('label')}>Color</label>
                            <div className={cx('value')}>
                                <Select
                                    defaultValue={() => {
                                        let array = [];
                                        colors.map((item) => {
                                            let color = colorData.find((i) => i.value === item);
                                            array.push(color);
                                        });
                                        return array;
                                    }}
                                    options={colorData}
                                    multiple={true}
                                    isSearchable={false}
                                    isMulti
                                    onChange={(array) => setColors(array)}
                                />
                            </div>
                        </div>
                        <div className={cx('field', 'fieldPrice')}>
                            <label className={cx('label')}>Price</label>
                            <div className={cx('value')}>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <label className={cx('label')}>VNĐ</label>
                            </div>
                        </div>
                        <div className={cx('field', 'fieldStock')}>
                            <label className={cx('label')}>Số lượng</label>

                            <div className={cx('value')}>
                                <span>S: </span>
                                <input type="number" value={s} onChange={(e) => setS(parseInt(e.target.value))} />
                            </div>
                            <div className={cx('value')}>
                                <span>M: </span>
                                <input type="number" value={m} onChange={(e) => setM(parseInt(e.target.value))} />
                            </div>
                            <div className={cx('value')}>
                                <span>L: </span>
                                <input type="number" value={l} onChange={(e) => setL(parseInt(e.target.value))} />
                            </div>
                            <div className={cx('value')}>
                                <span>XL:</span>
                                <input type="number" value={xl} onChange={(e) => setXL(parseInt(e.target.value))} />
                            </div>
                            <div className={cx('value')}>
                                <span>XL:</span>
                                <input type="number" value={xxl} onChange={(e) => setXXL(parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className={cx('field', 'fieldDescription')}>
                            <label className={cx('label')}>Description</label>
                            <div className={cx('value')}>
                                <textarea
                                    type="text"
                                    className={cx('input')}
                                    resizable={false}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('submit')}>
                            <input type="submit" onClick={(e) => submitHandler(e)} />
                        </div>
                    </form>
                </div>
                {openModal && <SuccessModal title={'Item updated successfully'} to={'/admin/product'} />}
            </div>
        );
    }
}

export default UpdateProduct;
