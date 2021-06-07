// import { Either, right } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either"
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
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

export const validate = (card: CreditCard): E.Either<NonEmptyArray<string>, CreditCard> => {
    // return right("happy case");

    const f = (a:string) => (b:string) => (c:string) =>
        new CreditCard(a, b, c);

    // Demo from fp-ts docs ---------------------------------------------------
    // const fa: O.Option<string> = O.some('a');
    // const fb: O.Option<string> = O.some('b');
    // const fc: O.Option<string> = O.some('c');

    // const resultDemo = pipe(
    //     O.some(f),
    //     O.ap(fa),
    //     O.ap(fb),
    //     O.ap(fc)
    // )

    // Using Either instead of Option -----------------------------------------
    // const fa: E.Either<NonEmptyArray<string>, string> = E.right('a');
    // const fb: E.Either<NonEmptyArray<string>, string> = E.right('b');
    // const fc: E.Either<NonEmptyArray<string>, string> = E.right('c');

    // const result = pipe(
    //     E.right(f),
    //     E.ap(fa),
    //     E.ap(fb),
    //     E.ap(fc)
    // )
    // return result;

    // Me, with no idea about TS, trying to port the above --------------------
    // Of course, it doesn't work...
    //
    // const validateNumber: E.Either<NonEmptyArray<string>, string> = (s: string) => {
    //     return E.right(s);
    //     return s === "invalid" ? E.left(["invalid number"]) : E.right('a');
    // }
    // const validateExpiry: E.Either<NonEmptyArray<string>, string> = (s: string) => {
    //     return s === "invalid" ? E.left(["invalid expiry"]) : E.right('a');
    // }
    // const validateCvv: E.Either<NonEmptyArray<string>, string> = (s: string) => {
    //     return s === "invalid" ? E.left(["invalid cvv"]) : E.right('a');
    // }
    
    // const result2 = pipe(
    //     E.right(f),
    //     E.ap(validateNumber),
    //     E.ap(validateExpiry),
    //     E.ap(validateCvv)
    // )
    // return result;

    return E.right(card);
}
