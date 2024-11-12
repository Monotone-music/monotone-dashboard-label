export interface User {
    username: string;
    email: string;
    password: string;
    profile: {
        displayName: string;
        bio: string;
    }
    role: string;
    createAt: Date;
    modifiedAt: Date
}