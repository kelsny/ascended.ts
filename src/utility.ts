export type Assume<T, U> = T extends U ? T : U;

export type IsUnknown<T> = unknown extends T ? (IsAny<T> extends false ? true : false) : false;
export type IsAny<T> = 0 extends 1 & T ? true : false;

export type Stringifiable = string | number | bigint | boolean | null | undefined;

export type WithStringKeys<T> = { [K in keyof T as K extends string | number ? `${K}` : never]: T[K] };

export type WithNumberKeys<T> = { [K in keyof T as K extends number ? K : K extends string ? K extends `${infer K extends number}` ? K : never : never]: T[K] };