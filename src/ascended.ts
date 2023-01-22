import type { Add } from "ts-arithmetic";
import type { Tuple } from "./array";
import type { IsUnknown } from "./utility";

export type A<T extends Ascended = AscendedDefaults> = T["arguments"][0] & T["constraints"][0];
export type B<T extends Ascended = AscendedDefaults> = T["arguments"][1] & T["constraints"][1];
export type C<T extends Ascended = AscendedDefaults> = T["arguments"][2] & T["constraints"][2];
export type D<T extends Ascended = AscendedDefaults> = T["arguments"][3] & T["constraints"][3];
export type E<T extends Ascended = AscendedDefaults> = T["arguments"][4] & T["constraints"][4];
export type F<T extends Ascended = AscendedDefaults> = T["arguments"][5] & T["constraints"][5];
export type G<T extends Ascended = AscendedDefaults> = T["arguments"][6] & T["constraints"][6];
export type H<T extends Ascended = AscendedDefaults> = T["arguments"][7] & T["constraints"][7];
export type I<T extends Ascended = AscendedDefaults> = T["arguments"][8] & T["constraints"][8];
export type J<T extends Ascended = AscendedDefaults> = T["arguments"][9] & T["constraints"][9];

export type At<N extends number, T extends Ascended<Add<N, 1>>, Default = unknown> = IsUnknown<T["arguments"]> extends true ? Default : T["arguments"][N];
export type Checked<
    N extends number,
    T extends Ascended<Add<N, 1>>,
    Default = N extends keyof T["constraints"] ? T["constraints"][N] : never
> = N extends keyof T["constraints"] ? (T["arguments"][N] extends T["constraints"][N] ? T["arguments"][N] : Default) : never;
export type Optional<
    N extends number,
    T extends Ascended<Add<N, 1>>,
    Default = N extends keyof T["constraints"] ? Exclude<T["constraints"][N], undefined> : never
> = N extends keyof T["constraints"] ? (T["arguments"][N] extends Exclude<T["constraints"][N], undefined> ? T["arguments"][N] : Default) : never;
export type Lossy<N extends number, T extends Ascended<Add<N, 1>>> = N extends keyof T["constraints"] ? T["arguments"][N] & T["constraints"][N] : never;

export type Ascended<Constraints extends number | unknown[] = unknown[], Return extends unknown = unknown> = AscendedType<
    number extends Constraints
        ? number[]
        : unknown[] extends Constraints
        ? unknown[]
        : Constraints extends unknown[]
        ? Constraints
        : Tuple<Constraints extends number ? Constraints : Constraints extends unknown[] ? Constraints["length"] : number>,
    Return
>;

interface AscendedType<Constraints extends unknown[] = unknown[], Return = unknown> {
    readonly return: Return;
    readonly arguments: unknown[];
    readonly constraints: Constraints;
    readonly 0: this["arguments"][0];
    readonly 1: this["arguments"][1];
    readonly 2: this["arguments"][2];
    readonly 3: this["arguments"][3];
    readonly 4: this["arguments"][4];
    readonly 5: this["arguments"][5];
    readonly 6: this["arguments"][6];
    readonly 7: this["arguments"][7];
    readonly 8: this["arguments"][8];
    readonly 9: this["arguments"][9];
}

interface AscendedDefaults extends AscendedType<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]> {}

export type Apply<A extends AscendedType, Arguments extends A["constraints"]> = (A & { readonly arguments: Arguments })["return"];
