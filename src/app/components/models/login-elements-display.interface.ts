export interface LoginElementsDisplayModel {
    greeting: StatusTimeModel,
    tutorial: StatusTimeModel,
    requestName: StatusTimeModel,
    login: StatusTimeModel
}

export interface StatusTimeModel {
    status: boolean,
    time: number
}