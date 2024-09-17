export interface UserState {
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'vendor';
    password: string;
}