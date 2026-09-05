import type { UserRole } from "./constants";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}