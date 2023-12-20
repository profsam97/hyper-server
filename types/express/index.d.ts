import { User } from "../../src/entities/User";

declare module 'express-serve-static-core'{
    interface Request{
        user : User;
        token : string;
    }
    interface Application {
        close(callback?: () => void): void;
    }
}
