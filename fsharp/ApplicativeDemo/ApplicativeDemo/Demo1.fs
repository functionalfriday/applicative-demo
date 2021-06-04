module ApplicativeDemo.Demo1

open Xunit
open TestHelper

type CreditCard = {
      Number: string
      Expiry: string
      Cvv: string }

let createCreditCard number expiry cvv = {
      Number = number
      Expiry = expiry
      Cvv = cvv }

// check 1
let validateNumber number: Result<string, string> =
    if String.length number < 2 then
        Error "invalid credit card number"
    else
        Ok number

// check 2
let validateExpiry expiry: Result<string, string> =
    if expiry = "invalid" then
        Error "invalid expiry"
    else
        Ok expiry

// check 3
let validateCvv cvv: Result<string, string> =
    if cvv = "invalid" then
        Error "invalid cvv"
    else
        Ok cvv

// Result<'a, 'b> -> Result<('a -> 'c), 'b> -> Result<'c, 'b>
let apply a f =
    match f, a with
    | Ok g, Ok x -> g x |> Ok
    | Error e, Ok _ -> e |> Error
    | Ok _, Error e -> e |> Error
    | Error e1, Error _ -> e1 |> Error // <- NOTE: e2 is ignored
    
// v1    
let validateCreditCardV1 card: Result<CreditCard, string> =
    Ok createCreditCard
    |> apply (validateNumber card.Number)
    |> apply (validateExpiry card.Expiry)
    |> apply (validateCvv card.Cvv)

// v2
let validateCreditCardV2 card: Result<CreditCard, string> =
    (validateNumber card.Number)
    |> Result.map createCreditCard 
    |> apply (validateExpiry card.Expiry)
    |> apply (validateCvv card.Cvv)

// v3
let (<!>) a b = Result.map a b

let validateCreditCardV3 card: Result<CreditCard, string> =
    createCreditCard
    <!> validateNumber card.Number
    |> apply (validateExpiry card.Expiry)
    |> apply (validateCvv card.Cvv)

// v4
let (<*>) a b = apply b a

let validateCreditCardV4 card: Result<CreditCard, string> =
    createCreditCard
    <!> validateNumber card.Number
    <*> validateExpiry card.Expiry
    <*> validateCvv card.Cvv


// switch between different validation versions...
let validateCreditCard =
//    validateCreditCardV1
//    validateCreditCardV2
//    validateCreditCardV3
    validateCreditCardV4

[<Fact>]
let ``valid input returns credit card`` () =
    let card = createCreditCard "number" "expiry" "cvv"
    let expected = { Number = "number"; Expiry = "expiry"; Cvv = "cvv" }
    let result = validateCreditCard card
    checkOk result expected

[<Theory>]
[<InlineData("x", "expiry", "cvv", "invalid credit card number")>]
[<InlineData("123", "invalid", "cvv", "invalid expiry")>]
[<InlineData("123", "expiry", "invalid", "invalid cvv")>]
let ``single invalid input returns correct error message`` (number:string, expiry:string, cvv:string, expected:string) =
    let card = createCreditCard number expiry cvv
    let result = validateCreditCard card
    checkError result expected
