// import { Either, right } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either"
import * as RA from "fp-ts/lib/ReadonlyArray";
import { pipe } from "fp-ts/lib/function";
import { pipeable } from "fp-ts/lib/pipeable";

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

const createCreditCard = (a:string) => (b:string) => (c:string) =>
    new CreditCard(a, b, c);

const v1 = (s: string): E.Either<ReadonlyArray<string>, string> => {
    return s !== "invalid" ? E.right(s) : E.left(RA.of("invalid number"));
};

const v2 = (s: string): E.Either<ReadonlyArray<string>, string> => {
    return s !== "invalid" ? E.right(s) : E.left(RA.of("invalid expiry"));
};

const v3 = (s: string): E.Either<ReadonlyArray<string>, string> => {
    return s !== "invalid" ? E.right(s) : E.left(RA.of("invalid cvv"));
};


// from https://stackoverflow.com/a/67940028/1062607
export const validate = (card: CreditCard): E.Either<ReadonlyArray<string>, CreditCard> => {
    const validation = E.getApplicativeValidation(RA.getSemigroup<string>())
    const V = pipeable(validation)
    
    const fromPipe = pipe(
      validation.of(createCreditCard),
      V.ap(v1(card.number)),
      V.ap(v2(card.expiry)),
      V.ap(v3(card.cvv))
    )
    
    return fromPipe;
}
