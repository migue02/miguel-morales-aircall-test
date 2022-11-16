import { ReactNode } from "react";

export type UserType = {
    username: string;
    loading: boolean;
    refreshToken: () => void;
    login: (name: string, password: string) => Promise<boolean>;
    isLoggedIn: (name: string, password: string) => Promise<boolean>;
};

export interface IUserProvider {
    children: ReactNode;
}