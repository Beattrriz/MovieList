import { User } from "./user.models";

export interface LoginResponse {
    token: string;
    user: User;
  }