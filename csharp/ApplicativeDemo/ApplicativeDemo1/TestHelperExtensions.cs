using System.Linq;
using FluentAssertions;
using LaYumba.Functional;
// ReSharper disable HeapView.ClosureAllocation
// ReSharper disable HeapView.DelegateAllocation
// ReSharper disable HeapView.ObjectAllocation
// ReSharper disable HeapView.PossibleBoxingAllocation

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

        public static void CheckErrors<T>(this Validation<T> validation, params string[] expected)
        {
            var expectedErrors = expected.ToList().Select(F.Error);
            validation
                .Match(
                    errors => errors.Should().BeEquivalentTo(expectedErrors),
                    s => true.Should().BeFalse());
        }
    }
}