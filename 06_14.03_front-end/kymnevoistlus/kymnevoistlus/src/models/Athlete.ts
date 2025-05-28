export interface Athlete {
    id: number;
    name: string;
    country: string;
    age: number;
    totalPoints: number;
    results: {
        [event: string]: number;
    };
}