export type FromEntries<E extends [unknown, unknown][]> = { [T in E[number] as T[0] & PropertyKey]: T[1] };
