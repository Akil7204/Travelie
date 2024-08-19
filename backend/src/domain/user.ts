
export interface User {
    username: string;
    phone?: number;
    email: string;
    password: string;
    profileImage?: string;
    otp?: string;
    otpVerified?: boolean; 
}
