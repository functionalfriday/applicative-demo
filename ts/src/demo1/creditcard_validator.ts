// import { Either, right } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import * as S from "fp-ts/lib/Semigroup";
import { flip, pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { Semigroup } from "fp-ts/lib/string";
// import { getSemigroup, of } from "fp-ts/lib/ReadonlyArray";
import * as RA from "fp-ts/lib/ReadonlyArray";
import { sequenceT } from "fp-ts/lib/Apply";

export class CreditCard {
    constructor(
        public readonly number: string,
        public readonly expiry: string,
        public readonly cvv: string
    ) { }
}

function x() {
    const n1 = O.of(3);
    const n2 = O.of(4);
    const n3 = O.of(5);

    const f =
        (num1: number) =>
            (num2: number) =>
                (num3: number): number =>
                    num1 * num2 * num3;

    //   const f1 = O.ap(n1);
    //   const f2 = f1(O.of(f));

    const af = O.of(f);

    const af1 = O.ap(n1)(af);
    const af2 = O.ap(n2)(af1);
    const af3 = O.ap(n3)(af2);

    pipe(O.of(f), O.ap(n1), O.ap(n2), O.ap(n3));

    return af3;
}

export const validate = (
    card: CreditCard
): E.Either<ReadonlyArray<string>, CreditCard> => {
    const createCreditCard = (a: string) => (b: string) => (c: string) =>
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

    const liftedFunction = V.of(createCreditCard);
    const afterFirstValidation = V.ap(liftedFunction, v1(card.number));
    const afterSecondValidation = V.ap(afterFirstValidation, v2(card.expiry));
    const afterThirdValidation = V.ap(afterSecondValidation, v3(card.cvv));

    return afterThirdValidation;
};
