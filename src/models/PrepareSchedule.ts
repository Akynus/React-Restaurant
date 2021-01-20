import {Moment} from "moment";

export default interface PrepareSchedule {
    item: any;
    price: number;
    endTime: Moment;
}