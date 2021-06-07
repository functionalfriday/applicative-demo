import { Either, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

export class CreditCard {
    number: string;
    expiry: string;
    cvv: string;
    
    constructor(number: string, expiry: string, cvv: string) {
        this.number = number;
        this.expiry = expiry;
        this.cvv = cvv;
    }
}

export const validate = (card: CreditCard): Either<NonEmptyArray<string>, string> => {
    return right("happy case");
}
