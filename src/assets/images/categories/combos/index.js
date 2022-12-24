import sportImages from '~/assets/images/categories/sport';
const combos = [
    {
        id: 1,
        title: 'Set thể thao thu đông',
        url: require('~/assets/images/categories/combos/set_the_thao_thu_dong.jpg'),
        products: [sportImages[2], sportImages[3], sportImages[4]],
    },
    {
        id: 2,
        title: 'Set thể thao dạo phố',
        url: require('~/assets/images/categories/combos/set_the_thao_dao_pho.jpg'),
        products: [sportImages[5], sportImages[6], sportImages[7]],
    },
    {
        id: 3,
        title: 'Set tập luyện thể thao',
        url: require('~/assets/images/categories/combos/set_tap_luyen_the_thao.jpg'),
        products: [sportImages[6]],
    },
];

export default combos;
