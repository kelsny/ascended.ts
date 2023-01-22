import type { Stringifiable } from "./utility";

export type Join<A, Sep extends string = "", R extends string = ""> = A extends [infer Part, ...infer Rest] ? Join<Rest, Sep, R extends "" ? `${Part & Stringifiable}` : `${R}${Sep}${Part & Stringifiable}`> : R;

export type Reverse<A, R extends unknown[] = []> = A extends [infer Head, ...infer Tail] ? Reverse<Tail, [Head, ...R]> : R;

export type Zip<A extends unknown[], B extends unknown[]> = { [K in keyof A]: K extends keyof B ? [A[K], B[K]] : never };

export type Tuple<L extends number, T = unknown, R extends unknown[] = []> = number extends L ? T[] : L extends R["length"] ? R : Tuple<L, T, [T, ...R]>;
