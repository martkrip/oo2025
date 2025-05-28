import type { ReactNode } from "react";
import type { Result } from "./result.ts";

export interface Athlete {
  totalPoints: ReactNode;
  id?: number;
  name: string;
  country: string;
  age: number;
  results: Result[];
}
