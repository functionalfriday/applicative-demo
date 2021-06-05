using Xunit;

namespace ApplicativeDemo1
{
    public class Demo1
    {
        [Fact]
        public void Valid_number()
        {
            var creditCard = new CreditCard("123", "456", "789");
            var numberValidation = creditCard.Number.ValidateNumber();
            numberValidation.CheckOk("123");
        }

        [Fact]
        public void Invalid_number()
        {
            var creditCard = new CreditCard("invalid", "456", "789");
            var numberValidation = creditCard.Number.ValidateNumber();
            numberValidation.CheckError("invalid number: invalid");
        }
    }
}