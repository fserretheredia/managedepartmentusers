export interface Department {
    id: number;
    name: string;
    users: number[];
}

export interface BodyDepartment {
    name: string;
    users?: number[];
}