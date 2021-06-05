using FluentAssertions;
using LaYumba.Functional;

namespace ApplicativeDemo1
{
    public static class TestHelperExtensions
    {
        public static void CheckOk<T>(this Validation<T> validation, T expected) =>
            validation
                .Match(
                    _ => true.Should().BeFalse(),
                    s => s.Should().Be(expected));

        public static void CheckError<T>(this Validation<T> validation, string expected) =>
            validation
                .Match(
                    errors => errors.Should().BeEquivalentTo(F.Error(expected)),
                    s => true.Should().BeFalse());
    }
}