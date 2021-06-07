using System;
using System.Linq;
using LaYumba.Functional;

namespace ApplicativeDemo1
{
    public static class MyFunctionalExtensions
    {
        public static Validation<Func<T2, T3, R>> Apply3<T1, T2, T3, R>(
            this Validation<Func<T1, T2, T3, R>> @this, Validation<T1> arg)
        {
            return @this
                .Map(F.CurryFirst)
                .Apply1(arg);
        }
        
        public static Validation<Func<T2, R>> Apply2<T1, T2, R>(
            this Validation<Func<T1, T2, R>> @this, Validation<T1> arg)
        {
            return @this
                .Map(F.Curry)
                .Apply1(arg);
        }

        public static Validation<R> Apply1<T, R>(this Validation<Func<T, R>> valF, Validation<T> valT)
        {
            return valF
                .Match(
                    errF => 
                        valT.Match(
                            errT => F.Invalid(errF.Concat(errT)), 
                            _ => F.Invalid(errF)), 
                    f => valT.Match(
                        err => F.Invalid(err), 
                        t => F.Valid(f(t))));
        }
    }
}