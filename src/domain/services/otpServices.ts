export class OtpService {
    static generateOtp(): { otp: string; expiry: Date } {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10); // OTP valid for 10 minutes
        return { otp, expiry };
    }

    static isOtpValid(storedOtp: string, storedExpiry: Date, providedOtp: string): boolean {
        return storedOtp === providedOtp && new Date() <= storedExpiry;
    }
}
