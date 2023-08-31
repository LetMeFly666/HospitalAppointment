// app.js
App({
    hospitalList: [{
        id: '1',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西京医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西京医院-全景照.jpg',  // 全景
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西京医院-专家介绍.png',  // 专家介绍、陪诊案例
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西京医院-医院介绍.png',  // 医院介绍
        name: '西京医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.987677,
            latitude: 34.272145,
            name: '西京医院',
            address: '陕西省西安市新城区长乐西路127号',
        }
    }, {
        id: '2',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/唐都医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/唐都医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/唐都医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/唐都医院-全景照.jpg',  // 同全景照
        name: '唐都医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 109.063021,
            latitude: 34.283533,
            name: '唐都医院',
            address: '陕西省西安市灞桥区新寺路1号',
        }
    }, {
        id: '3',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第一附属医院-Logo.jpg',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第一附属医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第一附属医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第一附属医院-医院介绍.png',
        name: '西安交通大学第一附属医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.936734,
            latitude: 34.219375,
            name: '西安交通大学第一附属医院',
            address: '陕西省西安市雁塔区雁塔西路277号',
        }
    }, {
        id: '4',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第二附属医院-Logo.jpg',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第二附属医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安交通大学第二附属医院-专家介绍.webp',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西京医院-全景照.jpg',  // 同全景照
        name: '西安交通大学第二附属医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.951096,
            latitude: 34.270853,
            name: '西安交通大学第二附属医院',
            address: '陕西省西安市新城区西五路157号',
        }
    }, {
        id: '5',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省人民医院-Logo.jpg',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省人民医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省人民医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省人民医院-全景照.jpg',  // 同全景照
        name: '陕西省人民医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.930479,
            latitude: 34.239695,
            name: '陕西省人民医院',
            address: '陕西省西安市碑林区友谊西路256号',
        }
    }, {
        id: '6',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省肿瘤医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省肿瘤医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省肿瘤医院-专家介绍.webp',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省肿瘤医院-全景照.png',  // 同全景照
        name: '陕西省肿瘤医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.932712,
            latitude: 34.219214,
            name: '陕西省肿瘤医院',
            address: '陕西省西安市雁塔区雁塔西路309号',
        }
    }, {
        id: '7',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安国际医学中心医院-Logo.webp',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安国际医学中心医院-全景照.webp',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安国际医学中心医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安国际医学中心医院-医院介绍.jpg',
        name: '西安国际医学中心医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.842341,
            latitude: 34.145658,
            name: '西安国际医学中心医院',
            address: '陕西省西安市长安区经十六路与纬二十八路交叉口西南220米',
        }
    }, {
        id: '8',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市人民医院（西安市第四医院）-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市人民医院（西安市第四医院）-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市人民医院（西安市第四医院）-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市人民医院（西安市第四医院）-医院介绍.jpg',
        name: '西安市人民医院（西安市第四医院）',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.963495,
            latitude: 34.260303,
            name: '西安市人民医院（西安市第四医院）',
            address: '陕西省西安市新城区解放路与东大街交叉口北100米',
        }
    }, {
        id: '9',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省中医医院-Logo.webp',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省中医医院-全景照.png',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省中医医院-专家介绍.webp',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/陕西省中医医院-医院介绍.png',
        name: '陕西省中医医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.945299,
            latitude: 34.264164,
            name: '陕西省中医医院',
            address: '陕西省西安市莲湖区西华门2号',
        }
    }, {
        id: '10',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市儿童医院-Logo.webp',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市儿童医院-全景照.jpeg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市儿童医院-专家介绍.jpeg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市儿童医院-医院介绍.jpg',
        name: '西安市儿童医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.926845,
            latitude: 34.26245,
            name: '西安市儿童医院',
            address: '陕西省西安市莲湖区西举院巷69号',
        }
    }, {
        id: '11',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西北妇女儿童医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西北妇女儿童医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西北妇女儿童医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西北妇女儿童医院-医院介绍.jpg',
        name: '西北妇女儿童医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 109.011446,
            latitude: 34.196003,
            name: '西北妇女儿童医院',
            address: '陕西省西安市雁塔区雁翔路1616号',
        }
    }, {
        id: '12',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市中心医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市中心医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市中心医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市中心医院-全景照.jpg',  // 同全景照
        name: '西安市中心医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.94857,
            latitude: 34.271736,
            name: '西安市中心医院',
            address: '陕西省西安市新城区西五路161号',
        }
    }, {
        id: '13',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安高新医院-Logo.jpg',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安高新医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安高新医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安高新医院-医院介绍.jpeg',
        name: '西安高新医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.880268,
            latitude: 34.230075,
            name: '西安高新医院',
            address: '陕西省西安市雁塔区团结南路16号',
        }
    }, {
        id: '14',
        logo: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市红会医院-Logo.png',
        fullView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市红会医院-全景照.jpg',
        expertImg: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市红会医院-专家介绍.jpg',
        introView: 'https://www.letmefly.xyz/LetHA/static/pic/hospital/西安市红会医院-医院介绍.jpg',
        name: '西安市红会医院',
        rank: '三甲',
        type: '综合医院',
        location: {
            longitude: 108.948479,
            latitude: 34.24264,
            name: '西安市红会医院',
            address: '陕西省西安市碑林区友谊东路555号',
        }
    }]
})
