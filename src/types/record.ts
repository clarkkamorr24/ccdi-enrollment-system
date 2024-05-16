import { Moment } from "moment";

export type TDay = {
  present: boolean | undefined;
  date: Moment;
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
