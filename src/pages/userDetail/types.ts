export interface FormProps {
    name: string;
    username: string;
    email: string;
    password: string;
    repeated_password: string;
    is_blocked: boolean;
    permissions: string[]
}