using FluentAssertions;
using Xunit;

namespace ApplicativeDemo1
{
    public class Demo1
    {
        [Fact]
        public void Test1()
        {
            // TODO setup credit card -> check new record syntax
            var creditCard = new CreditCard();
            // TODO create method to check validation result
            creditCard.Number.ValidateNumber().Should().Be("todo");
        }
    }
}