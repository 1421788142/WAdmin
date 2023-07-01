export interface deviceNum {
    parkNum: number,
    siteNum: number,
    deviceNum: number,
    spigotNum: number,
}

export interface toDay {
    totalOrders: number,
    useOrders: number,
    consumePower: number,
    discharge: number,
}

export interface toDayOrdersInterface {
    value: number,
    date: string,
}


export interface topRanking {
    value: number,
    name: string,
}

export interface deviceStatisticsInterface {
    value: number,
    name: string,
}

export interface amountStatisticsInterface {
    value: number,
    date: string,
}

export interface topDevice {
    id: number,
    value: number,
    name: string,
}

export interface parkInterface {
    Longitude: number,
    Latitude: number,
    value: number,
    parkName: string,
    address: string,
    parkId: string,
}