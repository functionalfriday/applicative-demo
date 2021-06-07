using System;
using System.Linq;
using LaYumba.Functional;
using static LaYumba.Functional.F;

namespace ApplicativeDemo1
{
    public static class MyFunctionalExtensions
    {
        // Validation<(T1 -> T2 -> T3 -> R)> -> Validation<T1> -> Validation<(T2 -> T3 -> R)>
        public static Validation<Func<T2, T3, R>> Apply3<T1, T2, T3, R>(
            this Validation<Func<T1, T2, T3, R>> @this, Validation<T1> arg)
        {
            return @this
                .Map(MyCurryFirst)
                .Apply1(arg);
        }
        
        // Validation<(T1 -> T2 -> R)> -> Validation<T1> -> Validation<(T2 -> R)>
        public static Validation<Func<T2, R>> Apply2<T1, T2, R>(
            this Validation<Func<T1, T2, R>> @this, Validation<T1> arg)
        {
            return @this
                .Map(MyCurry)
                .Apply1(arg);
        }

        // Validation<(T -> R)> -> Validation<T1> -> Validation<R>
        public static Validation<R> Apply1<T, R>(this Validation<Func<T, R>> valF, Validation<T> valT)
        {
            return valF
                .Match(
                    errF => 
                        valT.Match(
                            errT => Invalid(errF.Concat(errT)), 
                            _ => Invalid(errF)), 
                    f => valT.Match(
                        err => Invalid(err), 
                        t => Valid(f(t))));
        }
        
        // (T1 -> T2 -> R) -> (T1 -> (T2 -> R))
        public static Func<T1, Func<T2, R>> MyCurry<T1, T2, R>(this Func<T1, T2, R> func)
        {
            return t1 => t2 => func(t1, t2);
        }
        
        // (T1 -> T2 -> T3 -> R) -> (T1 -> (T2 -> T3 -> R))
        public static Func<T1, Func<T2, T3, R>> MyCurryFirst<T1, T2, T3, R>(this Func<T1, T2, T3, R> @this)
        {
            return t1 => (t2, t3) => @this(t1, t2, t3);
        }
    }
}