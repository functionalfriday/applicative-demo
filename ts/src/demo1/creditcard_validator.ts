// import { Either, right } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either"
import * as RA from "fp-ts/lib/ReadonlyArray";
import { pipe } from "fp-ts/lib/function";

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

// from https://stackoverflow.com/q/67932588/1062607
export const validate = (card: CreditCard): E.Either<ReadonlyArray<string>, CreditCard> => {

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
    
        const V = E.getApplicativeValidation((RA.getSemigroup<string>()));
    
        // this does not work, because V.ap wants 2 arguments but only has 1?
        // const fromPipe = pipe(
        //     V.of(createCreditCard),
        //     V.ap(v1(card.number)),
        //     V.ap(v2(card.expiry)),
        //     V.ap(v3(card.cvv))
        // );
        // return fromPipe;
    
        // this works, but is ugly
        const liftedFunction = V.of(createCreditCard);
        const afterFirstValidation = V.ap(liftedFunction, v1(card.number));
        const afterSecondValidation = V.ap(afterFirstValidation, v2(card.expiry));
        const afterThirdValidation = V.ap(afterSecondValidation, v3(card.cvv));
    
        return afterThirdValidation;
}
