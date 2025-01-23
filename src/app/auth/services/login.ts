import { LoginResponse } from "@/app/auth/domain/login";
import { RegisterRequest } from "@/app/auth/domain/register";
import { User } from "@/app/auth/domain/user";
import { api } from "@/shared/lib/api";
import { AxiosError } from "axios";

export class AuthService {
    static login = async (email: string, password: string): Promise<User> => {
        try {
            const { data } = await api.post<LoginResponse>('/auth/login', { email, password })
            return this.loginAdapter(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw new Error('Unable to login')
        }
    }

    static register = async (registerRequest: RegisterRequest): Promise<User> => {
        try {
            const { data } = await api.post<LoginResponse>('/auth/register', registerRequest)
            return this.loginAdapter(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw new Error('Unable to login')
        }
    }

    static loginAdapter = ({ active, ...res }: LoginResponse): User => ({
        ...res,
        isActive: active
    })

    static checkStatus = async (): Promise<User> => {
        try {
            const { data } = await api.get<LoginResponse>('/auth/check-status');
            return this.loginAdapter(data);
        } catch (error) {
            console.log(error)
            throw new Error('UnAuthorized')
        }
    }
}