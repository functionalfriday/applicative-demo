module ApplicativeDemo.TestHelper

open Swensen.Unquote

let checkOk result expected =
    match result with
    | Ok actual -> actual =! expected
    | Error _ -> true =! false

let checkError result expected =
    match result with
    | Ok _ -> true =! false
    | Error e -> e =! expected

let splitToList (s:string) = s.Split(",") |> List.ofArray
