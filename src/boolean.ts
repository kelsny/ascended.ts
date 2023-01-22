export type Bit = 0  | 1

export type BitToBoolean<B extends Bit> = [B] extends [1] ? true : false;

export type Not<X extends boolean> = [X] extends [true] ? false : [X] extends [false] ? true : boolean;

export type And<A extends boolean, B extends boolean> = [A, B] extends [true, true] ? true : false;

export type Or<A extends boolean, B extends boolean> = [A | B] extends [true] ? true : false;

export type Xor<A extends boolean, B extends boolean> = [A & B] extends [never] ? true : false;

export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>;

export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>;

export type Xnor<A extends boolean, B extends boolean> = Not<Xor<A, B>>