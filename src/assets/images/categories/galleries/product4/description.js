import classNames from 'classnames/bind';
import styles from './description.module.scss';
const cx = classNames.bind(styles);
function Description() {
    const sizeImg = require('~/assets/images/categories/galleries/product4/product4Size.jpg');

    return (
        <div className={cx('description')}>
            <div>
                <h1>Thông tin sản phẩm</h1>
                <p>
                    - Công nghệ vải E-COOLDRY độc quyền của EGAN, được dệt từ sợi đặc biệt mang lại chất vải mềm mại dễ
                    chịu, thấm hút mồ hôi cực tốt, thoát nhiệt thật nhanh, chống nhiễm lạnh vào cơ thể.
                </p>
                <p>
                    - Bo dệt được sản xuất từ dòng máy nhập khẩu tân tiến nhất, tạo ra chất bo co giãn thoải mái, giúp
                    bạn tự tin vận động.
                </p>
                <p>
                    - Chú trọng sức khỏe người dùng là yếu tố hàng đầu của hãng thể thao Egan, trang phục Victor có thêm
                    hoạt chất kháng khuẩn cao đạt 99,8%, chỉ số chống nắng ưu việt đạt UV/UPF 70+, bảo vệ làn da của bạn
                    an toàn khi hoạt động ngoài trời.
                </p>
                <p>
                    - Điểm nhấn của BST lần này là logo Egan được làm từ chất liệu Silicon cao cấp, hiệu ứng 3D sang
                    trọng ( là công nghệ độc quyền tại Việt Nam).
                </p>
            </div>

            <div>
                <h1>Màu sắc</h1>
                <p>VICTOR giúp bạn dễ dàng lựa chọn với 6 tông màu: Trắng - Vàng kem - Hồng - Đỏ - Xanh da - Tím.</p>
            </div>
            <div>
                <h1>Size</h1>
                <img src={sizeImg} alt="size" />
            </div>
            <div>
                <h1>Thông tin thương hiệu</h1>
                <p>
                    - CP SPORT được biết đến là một đơn vị sản xuất trang phục thể thao và đồng phục chuyên nghiệp với
                    hơn 13 năm kinh nghiệm, phương châm “Uy tín nằm ở chất lượng”, CP SPORT luôn nỗ lực từng ngày để
                    phát triển kỹ thuật, công nghệ sản xuất hiện đại để từng sản phẩm khi đến tay khách hàng chỉnh chu
                    nhất. <br />- Nắm bắt được xu hướng thời trang và nhu cầu tiêu dùng của khách hàng, CP SPORT cho ra
                    mắt thương hiệu cao cấp Egan vào năm 2018 và đón nhận được nhiều sự yêu thích của khách hàng khi
                    Egan sử dụng các chất liệu có tính năng bảo vệ sức khỏe cho người sử dụng cùng các thiết kế được
                    thực hiện theo tiêu chí: đẳng cấp và tạo nên sự khác biệt.{' '}
                </p>
            </div>
            <div>
                #egan #cpsport #aothethao #quanaothethao #quanthethao #quanaothethaonam #aobongda #quanaobongda
                #aodabanh #aodabong #quanaodabong #aobongdadep #aodabanhdep #aodabongdep #aobongdathietke #aodabanhalpha
                #aodaudep #aobongdaegan
            </div>
        </div>
    );
}

export default Description;
