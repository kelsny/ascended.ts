import type { Assume, FromEntries, Join, Not, PadStart, Split, Tuple, WithStringKeys, Zip } from "./utility";

export type LimitedDecrement<N extends number> = N extends -1 ? -1 : Tuple<N> extends [any, ...infer X] ? X["length"] : -1;
export type LimitedIncrement<N extends number> = Tuple<N> extends infer X extends unknown[] ? [any, ...X]["length"] : never;

type DigitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type ReversedDigitsList = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
type ComplementaryDigitMap = WithStringKeys<FromEntries<Zip<DigitsList, ReversedDigitsList>>>;
export type Digit = DigitsList[number];

export type IsOdd<N extends number> = `${N}` extends `${string}${1 | 3 | 5 | 7 | 9}` ? true : false;
export type IsEven<N extends number> = `${N}` extends `${string}${0 | 2 | 4 | 6 | 8}` ? true : false;
export type IsNegative<N extends number> = `${N}` extends `-${string}` ? true : false;
export type IsPositive<N extends number> = `${N}` extends `-${string}` ? false : true;

type CompareDigits<A extends Digit, B extends Digit> = { 0: { 0: 0; 1: -1; 2: -1; 3: -1; 4: -1; 5: -1; 6: -1; 7: -1; 8: -1; 9: -1 }; 1: { 0: 1; 1: 0; 2: -1; 3: -1; 4: -1; 5: -1; 6: -1; 7: -1; 8: -1; 9: -1 }; 2: { 0: 1; 1: 1; 2: 0; 3: -1; 4: -1; 5: -1; 6: -1; 7: -1; 8: -1; 9: -1 }; 3: { 0: 1; 1: 1; 2: 1; 3: 0; 4: -1; 5: -1; 6: -1; 7: -1; 8: -1; 9: -1 }; 4: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 0; 5: -1; 6: -1; 7: -1; 8: -1; 9: -1 }; 5: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 1; 5: 0; 6: -1; 7: -1; 8: -1; 9: -1 }; 6: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 1; 5: 1; 6: 0; 7: -1; 8: -1; 9: -1 }; 7: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 1; 5: 1; 6: 1; 7: 0; 8: -1; 9: -1 }; 8: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 1; 5: 1; 6: 1; 7: 1; 8: 0; 9: -1 }; 9: { 0: 1; 1: 1; 2: 1; 3: 1; 4: 1; 5: 1; 6: 1; 7: 1; 8: 1; 9: 0 } }[A][B];

type CompareNumericalStringsHelper<
    A extends unknown[],
    B extends unknown[],
> = [A, B] extends [[infer AI, ...infer AT], [infer BI, ...infer BT]]
    ? CompareDigits<AsNumber<AI> & Digit, AsNumber<BI> & Digit> extends 0
        ? CompareNumericalStringsHelper<AT, BT>
        : CompareDigits<AsNumber<AI> & Digit, AsNumber<BI> & Digit>
    : 0;

type CompareNumericalStrings<
    A extends string,
    B extends string,
    AR extends unknown[] = Split<A>,
    BR extends unknown[] = Split<B>,
> = [AR["length"], BR["length"]] extends [1, 1]
    ? CompareDigits<AsNumber<AR[0]> & Digit, AsNumber<BR[0]> & Digit>
    : GT<AR["length"], BR["length"]> extends true
        ? 1
        : GT<BR["length"], AR["length"]> extends true
            ? -1
            : CompareNumericalStringsHelper<AR, BR>;

export type GT<A extends number, B extends number> =
    `${A}` extends `-${infer A extends number}`
        ? `${B}` extends `-${infer B extends number}`
            ? CompareNumericalStrings<`${A}`, `${B}`> extends -1
                ? true
                : false
            : false
        : `${B}` extends `-${infer _ extends number}`
            ? true
            : CompareNumericalStrings<`${A}`, `${B}`> extends 1
                ? true
                : false;

export type GTE<A extends number, B extends number> = true extends GT<A, B> | EQ<A, B> ? true : false;

export type LT<A extends number, B extends number> = Not<GTE<A, B>>;

export type LTE<A extends number, B extends number> = Not<GT<A, B>>;

export type EQ<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;

type AsNumber<N> = N extends "-0" ? 0 : N extends `${infer X extends number}` ? X : N extends number ? N : never;

type ModTenHelper<A extends unknown[]> = A extends [...Tuple<10>, ...infer Rest] ? ModTenHelper<Rest> : A["length"];
type ModTen<N extends number> = ModTenHelper<Tuple<N>>;

type DivTenHelper<A extends unknown[], R extends number = 0> = A extends [...Tuple<10>, ...infer Rest] ? DivTenHelper<Rest, LimitedIncrement<R>> : R;
type DivTen<N extends number> = DivTenHelper<Tuple<N>>;

type StringAdd<
    A extends string,
    B extends string,
    Carry extends number = 0,
    I extends number = LimitedDecrement<Split<A>["length"]>,
    J extends number = LimitedDecrement<Split<B>["length"]>,
    R extends string = "",
    X extends number = IsNegative<I> extends true ? 0 : AsNumber<Split<A>[I]>,
    Y extends number = IsNegative<J> extends true ? 0 : AsNumber<Split<B>[J]>,
> = true extends (IsPositive<I> | IsPositive<J> | EQ<Carry, 1>)
    ? StringAdd<A, B, DivTen<[...Tuple<X>, ...Tuple<Y>, ...Tuple<Carry>]["length"] & number>, LimitedDecrement<I>, LimitedDecrement<J>, `${ModTen<[...Tuple<X>, ...Tuple<Y>, ...Tuple<Carry>]["length"] & number>}${R}`>
    : R;

export type Add<A extends number, B extends number> =
    Assume<`${A}` extends `-${infer A extends number}`
        ? `${B}` extends `-${infer B extends number}`
            ? AsNumber<`-${StringAdd<`${A}`, `${B}`>}`>
            : GT<A, B> extends true
                ? AsNumber<`-${Subtract<A, B>}`>
                : Subtract<B, A>
        : `${B}` extends `-${infer B extends number}`
            ? GT<A, B> extends true
                ? Subtract<A, B>
                : AsNumber<`-${Subtract<B, A>}`>
            : AsNumber<StringAdd<`${A}`, `${B}`>>, number>;

type NinesComplement<S extends string, A extends string[] = Split<S>> = Join<{
    [K in keyof A]: A[K] extends keyof ComplementaryDigitMap ? ComplementaryDigitMap[A[K]] : never;
}>;

type TensComplements<S extends string> = StringAdd<NinesComplement<S>, "1">;

type TrimZeroes<C extends string> = C extends `0${infer R}` ? TrimZeroes<R> : C;

type StringSubtract<
    A extends string,
    RawB extends string,
    B extends string = PadStart<RawB, Split<A>["length"], "0">,
    C extends string = StringAdd<A, TensComplements<B>>,
> = EQ<Split<A>["length"], Split<C>["length"]> extends true
    ? TensComplements<C>
    : C extends `${infer _}${infer C}`
        ? TrimZeroes<C>
        : never;

export type Subtract<A extends number, B extends number> =
    Assume<`${A}` extends `-${infer A extends number}`
        ? `${B}` extends `-${infer B extends number}`
            ? GT<A, B> extends true
                ? AsNumber<`-${Subtract<A, B>}`>
                : Subtract<B, A>
            : AsNumber<`-${Add<A, B>}`>
        : `${B}` extends `-${infer B extends number}`
            ? Add<A, B>
            : GT<A, B> extends true
                ? AsNumber<StringSubtract<`${A}`, `${B}`>>
                : AsNumber<`-${StringSubtract<`${B}`, `${A}`>}`>, number>;
