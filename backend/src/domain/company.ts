
export interface Company {
    companyname: string;
    phone: number;
    email: string;
    password: string;
    profileImage?: string;
    otp?: string;
    otpVerified?: boolean; 
    adminVerified?: boolean;
}