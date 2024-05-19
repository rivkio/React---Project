export type AuthContextType = {
    token: string;
    user: User | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>
    register: (form: RegisterUser) => Promise<void>
    logout: () => void;
}

export type User = {
    _id: string
    isBusiness: boolean
    email: string
    name: {
        first: string
        middle: string
        last: string
    },
    phone: string
    address: {
        street: string
        city: string
        state: string
        zip: string
    }
}