using System;
using LaYumba.Functional;
using static LaYumba.Functional.F;

namespace ApplicativeDemo1
{
    public static class CreditCardValidationExtensions
    {
        public static Validation<string> ValidateNumber(this string s) =>
            s == "invalid"
                ? Error($"invalid number: {s}")
                : Valid(s);

        public static Validation<string> ValidateExpiry(this string s) =>
            s == "invalid"
                ? Error($"invalid expiry: {s}")
                : Valid(s);

        public static Validation<string> ValidateCvv(this string s) =>
            s == "invalid"
                ? Error($"invalid cvv: {s}")
                : Valid(s);

        private static Func<string, string, string, CreditCard> wrapper = 
            (number, expiry, cvv) => new CreditCard(number, expiry, cvv);

        public static Validation<CreditCard> Validate(this CreditCard card)
        {
            var result = Valid(wrapper)
                .Apply(card.Number.ValidateNumber())
                .Apply(card.Expiry.ValidateExpiry())
                .Apply(card.Cvv.ValidateCvv());

            return result;
        }
    }
}