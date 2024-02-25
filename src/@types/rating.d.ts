import { IUser } from "./user";

export interface IRating {
  rating: number;
  comment: string;
  postedBy: IUser;
}
