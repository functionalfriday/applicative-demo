// import { Either, right } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

export class CreditCard {
  constructor(
    public readonly number: string,
    public readonly expiry: string,
    public readonly cvv: string
  ) {}
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
): E.Either<Array<string>, CreditCard> => {
  // return right("happy case");

  const f = (a: string) => (b: string) => (c: string) =>
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

  const v1 = (s: string): E.Either<string[], string> => {
    return s !== "invalid" ? E.right(s) : E.left(["invalid number"]);
  };

  const v2 = (s: string): E.Either<string[], string> => {
    return s !== "invalid" ? E.right(s) : E.left(["invalid expiry"]);
  };

  const v3 = (s: string): E.Either<string[], string> => {
    return s !== "invalid" ? E.right(s) : E.left(["invalid cvv"]);
  };

  const r = pipe(
    E.of(f),
    E.ap(v1(card.number)),
    E.ap(v2(card.expiry)),
    E.ap(v3(card.cvv))
  );

  return r;
  // const result2 = pipe(
  //     E.right(f),
  //     E.ap(validateNumber),
  //     E.ap(validateExpiry),
  //     E.ap(validateCvv)
  // )
  // return result;

  //   return E.right(card);
};
