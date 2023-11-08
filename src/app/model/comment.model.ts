import {User} from "./user.model";

export interface Comment {
  text: string;
  author: User;
}
