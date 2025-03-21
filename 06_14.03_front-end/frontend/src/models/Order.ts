import { person } from "./Person"
import { Product } from "./Product"

export type Order = {
    id: number,
    created: Date,
    person: person,
    totalSum: number,
    products: Product[],
}