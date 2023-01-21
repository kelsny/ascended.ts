import type { GTE } from "./math";

export type Assume<T, U> = T extends U ? T : U;

export type Tuple<L extends number, T = unknown, R extends unknown[] = []> = number extends L ? T[] : L extends R["length"] ? R : Tuple<L, T, [T, ...R]>;

export type Split<S, Sep extends string = "", R extends unknown[] = []> = S extends `${infer Part}${Sep}${infer Rest}` ? Split<Rest, Sep, [...R, Part]> : R;

export type IsUnknown<T> = unknown extends T ? (IsAny<T> extends false ? true : false) : false;
export type IsAny<T> = 0 extends 1 & T ? true : false;

export type Not<X extends boolean> = [X] extends [true] ? false : [X] extends [false] ? true : boolean;

export type Stringifiable = string | number | bigint | boolean | null | undefined;

export type Join<A, Sep extends string = "", R extends string = ""> = A extends [infer Part, ...infer Rest] ? Join<Rest, Sep, R extends "" ? `${Part & Stringifiable}` : `${R}${Sep}${Part & Stringifiable}`> : R;

export type PadStart<S extends string, L extends number, C extends string = " "> = GTE<Split<S>["length"], L> extends true ? S : PadStart<`${C}${S}`, L, C>;

export type Reverse<A, R extends unknown[] = []> = A extends [infer Head, ...infer Tail] ? Reverse<Tail, [Head, ...R]> : R;

export type Zip<A extends unknown[], B extends unknown[]> = { [K in keyof A]: K extends keyof B ? [A[K], B[K]] : never };

export type FromEntries<E extends [unknown, unknown][]> = { [T in E[number] as T[0] & PropertyKey]: T[1] };

export type WithStringKeys<T> = { [K in keyof T as K extends string | number ? `${K}` : never]: T[K] }