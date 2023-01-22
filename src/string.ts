import type { Join, Reverse } from "./array";
import type { GtOrEq } from "ts-arithmetic";

export type Split<S, Sep extends string = "", R extends unknown[] = []> = S extends `${infer Part}${Sep}${infer Rest}` ? Split<Rest, Sep, [...R, Part]> : S extends "" ? R : [...R, S];

export type InsertFromEnd<S extends string, Index extends number, Char extends string, Right extends string = ""> =
    Split<Right>["length"] extends Index ? `${S}${Char}${Right}` : Join<Reverse<Split<S>>> extends `${infer C}${infer R}` ? InsertFromEnd<Join<Reverse<Split<R>>>, Index, Char, `${C}${Right}`> : never;

export type PadStart<S extends string, L extends number, C extends string = " "> = GtOrEq<Split<S>["length"], L> extends true ? S : PadStart<`${C}${S}`, L, C>;
export type PadEnd<S extends string, L extends number, C extends string = " "> = GtOrEq<Split<S>["length"], L> extends true ? S : PadEnd<`${S}${C}`, L, C>;
