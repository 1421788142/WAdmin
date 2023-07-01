import { ref, } from 'vue'
import {
    deviceNum,
    toDay,
    toDayOrdersInterface,
    topRanking,
    deviceStatisticsInterface,
    amountStatisticsInterface,
    topDevice,
    parkInterface
} from '@/apis/dataScreen/home';


export const chartData = () => {
    // 头部汇总
    const headData = ref<deviceNum>({
        parkNum: 42,
        siteNum: 234,
        deviceNum: 234,
        spigotNum: 234,
    })

    // 今日统计
    const toDayData = ref<toDay>({
        totalOrders: 42,
        useOrders: 12,
        consumePower: 234,
        discharge: 0.5,
    })

    const toDayOrders = ref<toDayOrdersInterface[]>([
        { value: 10, date: "00:00" },
        { value: 2, date: "00:30" },
        { value: 4, date: "01:00" },
        { value: 6, date: "01:30" },
        { value: 10, date: "02:00" },
        { value: 12, date: "02:30" },
        { value: 5, date: "03:00" },
        { value: 10, date: "03:30" },
        { value: 23, date: "04:00" },
        { value: 5, date: "04:30" },
        { value: 12, date: "05:00" },
        { value: 6, date: "05:30" },
        { value: 34, date: "06:00" },
        { value: 23, date: "06:30" },
        { value: 44, date: "07:00" },
        { value: 23, date: "07:30" },
        { value: 55, date: "08:00" },
        { value: 23, date: "08:30" },
        { value: 12, date: "09:00" },
        { value: 45, date: "09:30" },
        { value: 33, date: "10:00" },
        { value: 38, date: "10:30" },
        { value: 47, date: "11:00" },
        { value: 18, date: "11:30" },
        { value: 23, date: "12:00" },
        { value: 53, date: "12:30" },
        { value: 23, date: "13:00" },
        { value: 22, date: "13:30" },
        { value: 38, date: "14:00" },
        { value: 28, date: "14:30" },
        { value: 45, date: "15:00" },
        { value: 19, date: "15:30" },
        { value: 11, date: "16:00" },
        { value: 55, date: "16:30" },
        { value: 22, date: "17:00" },
        { value: 44, date: "17:30" },
        { value: 55, date: "18:00" },
        { value: 33, date: "18:30" },
        { value: 54, date: "19:00" },
        { value: 55, date: "19:30" },
        { value: 56, date: "20:00" },
        { value: 52, date: "20:30" },
        { value: 55, date: "21:00" },
        { value: 52, date: "21:30" },
        { value: 59, date: "22:00" },
        { value: 52, date: "22:30" },
        { value: 50, date: "23:00" },
        { value: 52, date: "23:30" },
        { value: 55, date: "24:00" },
    ])

    const topData = ref<topRanking[]>([
        { value: 25, name: "小三里桥" },
        { value: 23, name: "老人大" },
        { value: 18, name: "梁溪景贤路" },
        { value: 23, name: "清明桥" },
        { value: 44, name: "万达广场路面" },
        { value: 42, name: "万达广场地下一层" },
        { value: 42, name: "新吴区微纳园" },
        { value: 22, name: "新吴区软件园" },
        { value: 16, name: "无锡人民医院" },
        { value: 26, name: "无锡交通旅游" },
    ])
    let deviceStatisticsData = ref<deviceStatisticsInterface[]>([
        { value: 52, name: "设备在线" },
        { value: 37, name: "设备使用" },
        { value: 5, name: "设备离线" },
    ])

    const amountStatisticsData = ref<amountStatisticsInterface[]>([
        { value: 10, date: "00:00" },
        { value: 2, date: "00:30" },
        { value: 4, date: "01:00" },
        { value: 6, date: "01:30" },
        { value: 10, date: "02:00" },
        { value: 12, date: "02:30" },
        { value: 5, date: "03:00" },
        { value: 10, date: "03:30" },
        { value: 23, date: "04:00" },
        { value: 5, date: "04:30" },
        { value: 12, date: "05:00" },
        { value: 6, date: "05:30" },
        { value: 34, date: "06:00" },
        { value: 23, date: "06:30" },
        { value: 44, date: "07:00" },
        { value: 23, date: "07:30" },
        { value: 55, date: "08:00" },
        { value: 23, date: "08:30" },
        { value: 12, date: "09:00" },
        { value: 45, date: "09:30" },
        { value: 33, date: "10:00" },
        { value: 38, date: "10:30" },
        { value: 47, date: "11:00" },
        { value: 18, date: "11:30" },
        { value: 23, date: "12:00" },
        { value: 53, date: "12:30" },
        { value: 23, date: "13:00" },
        { value: 22, date: "13:30" },
        { value: 38, date: "14:00" },
        { value: 28, date: "14:30" },
        { value: 45, date: "15:00" },
        { value: 19, date: "15:30" },
        { value: 11, date: "16:00" },
        { value: 55, date: "16:30" },
        { value: 22, date: "17:00" },
        { value: 44, date: "17:30" },
        { value: 55, date: "18:00" },
        { value: 33, date: "18:30" },
        { value: 54, date: "19:00" },
        { value: 55, date: "19:30" },
        { value: 56, date: "20:00" },
        { value: 52, date: "20:30" },
        { value: 55, date: "21:00" },
        { value: 52, date: "21:30" },
        { value: 59, date: "22:00" },
        { value: 52, date: "22:30" },
        { value: 50, date: "23:00" },
        { value: 52, date: "23:30" },
        { value: 55, date: "24:00" },
    ])

    const topDeviceData = ref<topDevice[]>([
        { id: 1, value: 25, name: "小三里桥" },
        { id: 2, value: 23, name: "老人大" },
        { id: 3, value: 18, name: "梁溪景贤路" },
        { id: 4, value: 23, name: "清明桥" },
        { id: 5, value: 44, name: "万达广场路面" },
        { id: 6, value: 42, name: "万达广场地下一层" },
        { id: 7, value: 42, name: "新吴区微纳园" },
        { id: 8, value: 22, name: "新吴区软件园" },
        { id: 9, value: 16, name: "无锡人民医院" },
        { id: 10, value: 26, name: "无锡交通旅游" },
    ])

    const mapData = ref<parkInterface[]>([
        { Longitude: 106.587768, Latitude: 29.563010, address: '重庆市南岸区南坪西路', value: 164, parkName: '嘉陵公园', parkId: 'pk001' },
        { Longitude: 106.481766, Latitude: 29.536968, address: '重庆市渝北区金开大道', value: 135, parkName: '黄山公园', parkId: 'pk002' },
        { Longitude: 106.505020, Latitude: 29.561818, address: '重庆市渝中区嘉滨路', value: 113, parkName: '红照壁公园', parkId: 'pk003' },
        { Longitude: 106.551112, Latitude: 29.567869, address: '重庆市江北区建新东路', value: 67, parkName: '洪湖公园', parkId: 'pk004' },
        { Longitude: 106.558695, Latitude: 29.559503, address: '重庆市江北区建新东路', value: 86, parkName: '北滨公园', parkId: 'pk005' },
        { Longitude: 106.489603, Latitude: 29.429462, address: '重庆市巴南区二圣镇', value: 50, parkName: '二圣公园', parkId: 'pk006' },
        { Longitude: 106.485026, Latitude: 29.534703, address: '重庆市渝北区金开大道', value: 107, parkName: '兴隆湖公园', parkId: 'pk007' },
        { Longitude: 106.484187, Latitude: 29.543855, address: '重庆市渝北区龙头寺路', value: 196, parkName: '花卉园公园', parkId: 'pk008' },
        { Longitude: 106.530953, Latitude: 29.563696, address: '重庆市渝中区长江二路', value: 121, parkName: '罗汉寺公园', parkId: 'pk009' },
        { Longitude: 106.520190, Latitude: 29.548365, address: '重庆市江北区建新东路', value: 76, parkName: '观音桥公园', parkId: 'pk010' },
        { Longitude: 106.544226, Latitude: 29.570398, address: '重庆市渝北区福利社区', value: 43, parkName: '小龙坎公园', parkId: 'pk011' },
        { Longitude: 106.532784, Latitude: 29.528051, address: '重庆市江北区建新北路', value: 199, parkName: '北城天街公园', parkId: 'pk012' },
        { Longitude: 120.307547, Latitude: 31.570441, address: '江阴市滨江路', value: 91, parkName: '鹿山公园', parkId: 'pk0013' },
        { Longitude: 120.318146, Latitude: 31.546686, address: '无锡市江阴路', value: 139, parkName: '湖滨公园', parkId: 'pk0014' },
        { Longitude: 120.270035, Latitude: 31.558826, address: '锡山区锡东路', value: 118, parkName: '静安公园', parkId: 'pk0015' },
        { Longitude: 120.316234, Latitude: 31.574728, address: '无锡市江阴北路', value: 54, parkName: '云林公园', parkId: 'pk0016' },
        { Longitude: 120.305989, Latitude: 31.569587, address: '江阴市滨江东路', value: 168, parkName: '百合公园', parkId: 'pk0017' },
        { Longitude: 120.279029, Latitude: 31.609398, address: '无锡市新区芳草路', value: 177, parkName: '太湖公园', parkId: 'pk0018' },
        { Longitude: 120.310468, Latitude: 31.555508, address: '江阴市中山北路', value: 34, parkName: '钱江公园', parkId: 'pk0019' },
        { Longitude: 120.300459, Latitude: 31.583818, address: '无锡市宜兴路', value: 121, parkName: '锡北公园', parkId: 'pk0020' },
        { Longitude: 120.338106, Latitude: 31.586994, address: '无锡市胡埭镇东山路', value: 37, parkName: '东山公园', parkId: 'pk0021' },
        { Longitude: 120.292204, Latitude: 31.571758, address: '江阴市人民中路', value: 93, parkName: '鸿桥公园', parkId: 'pk0022' },
        { Longitude: 121.514977, Latitude: 31.248523, address: '上海市长宁区威宁路99弄', value: 162, parkName: '红梅公园', parkId: 'pk0022' },
        { Longitude: 121.640338, Latitude: 31.131412, address: '上海市浦东新区张杨路599弄', value: 58, parkName: '春申公园', parkId: 'pk0023' },
        { Longitude: 121.442939, Latitude: 31.223143, address: '上海市静安区共和新路338弄', value: 199, parkName: '九州公园', parkId: 'pk0024' },
        { Longitude: 121.383974, Latitude: 31.114406, address: '上海市松江区环城南路858弄', value: 177, parkName: '古华公园', parkId: 'pk0025' },
        { Longitude: 121.542728, Latitude: 31.228056, address: '上海市普陀区光复西路600弄', value: 109, parkName: '长风公园', parkId: 'pk0026' },
        { Longitude: 121.473655, Latitude: 31.240101, address: '上海市闸北区七浦路588弄', value: 114, parkName: '彭浦公园', parkId: 'pk0027' },
        { Longitude: 121.289902, Latitude: 31.203166, address: '上海市杨浦区平凉路458弄', value: 40, parkName: '东外滩公园', parkId: 'pk0028' },
        { Longitude: 121.472303, Latitude: 31.315101, address: '上海市虹口区杨树浦路238弄', value: 106, parkName: '虹口公园', parkId: 'pk0029' },
        { Longitude: 121.508104, Latitude: 31.175299, address: '上海市徐汇区乐山路456弄', value: 28, parkName: '徐汇公园', parkId: 'pk0030' },
        { Longitude: 121.473923, Latitude: 31.246045, address: '上海市普陀区上海火车站北广场', value: 130, parkName: '共青公园', parkId: 'pk0031' },
    ])

    return {
        topData,
        deviceStatisticsData,
        amountStatisticsData,
        headData,
        toDayData,
        toDayOrders,
        topDeviceData,
        mapData
    }
}