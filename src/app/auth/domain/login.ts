
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    id: string;
    email: string;
    fullName: string;
    active: boolean;
    roles: string[];
    token: string;
}
