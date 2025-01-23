import { AuthStatus, User } from "@/app/auth/domain/user";
import { AuthService } from "@/app/auth/services/login";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { RegisterRequest } from "@/app/auth/domain/register";

export interface AuthState {
    status: AuthStatus;
    user?: User;

    loginUser: (email: string, password: string) => Promise<void>
    register: (registerRequest: RegisterRequest) => Promise<void>
    checkAuthStatus: () => Promise<void>
    logoutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {
        try {
            const user = await AuthService.login(email, password);
            set({ status: "authorized", user });
        } catch (error) {
            set({ status: "unauthorized", user: undefined })
            throw error;
        }
    },
    register: async (registerRequest: RegisterRequest) => {
        try {
            const user = await AuthService.register(registerRequest);
            set({ status: "authorized", user });
        } catch (error) {
            set({ status: "unauthorized", user: undefined })
            throw error;
        }
    },
    checkAuthStatus: async () => {
        try {
            const user = await AuthService.checkStatus();
            set({ status: "authorized", user });
        } catch (error) {
            set({ status: "unauthorized", user: undefined })
            throw new Error('UnAuthorized')
        }
    },
    logoutUser: () => {
        set({ status: "unauthorized", user: undefined })
    }

})


export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi, { name: 'auth-storage' }
        )
    )
);