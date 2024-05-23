import { Moment } from "moment";
import { Status } from "./status";

export type TDay = {
  status: Status | undefined;
  date: Moment;
  studentId: string;
  attendanceId: string | undefined;
};
export type TRecord = {
  name: string;
  monday: TDay;
  tuesday: TDay;
  wednesday: TDay;
  thursday: TDay;
  friday: TDay;
  saturday: TDay;
  sunday: TDay;
};
