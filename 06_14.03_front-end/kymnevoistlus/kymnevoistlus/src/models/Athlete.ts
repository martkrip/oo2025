export interface Result {
  id: number;
  event: string;
  result: number;
  points: number;
}

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