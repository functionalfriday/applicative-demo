using LaYumba.Functional;
using static LaYumba.Functional.F;

namespace ApplicativeDemo1
{
    public static class CreditCardValidationExtensions
    {
        public static Validation<string> ValidateNumber(this string number) => 
            number == "invalid" 
                ? Invalid<string>(number) 
                : Valid(number);
    }
}