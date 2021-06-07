import { left, right } from "fp-ts/lib/Either";
import { CreditCard, validate } from "./creditcard_validator";

describe("credit card validator", () => {
    it("valid inputs create valid credit card", () => {
        
        // arrange
        const number = "123";
        const expiry = "345";
        const cvv = "678";
        const creditcard = new CreditCard(number, expiry, cvv);
        
        // act
        const result = validate(creditcard);
        
        // assert
        expect(result).toEqual(right(creditcard));
    })

    it("invalid inputs create correct validation error message", () => {
        
        // arrange
        const number = "invalid";
        const expiry = "invalid";
        const cvv = "invalid";
        const creditcard = new CreditCard(number, expiry, cvv);
        
        // act
        const result = validate(creditcard);
        
        // assert
        const expected = left([
                "invalid number",
                "invalid expiry",
                "invalid cvv",
            ]);

        expect(result).toEqual(expected);
    })
})