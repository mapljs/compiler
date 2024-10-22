export interface Builder<T> {
  push: (...x: T[]) => number;
  join: (s: string) => string;
  map: (fn: (x: T, i: number, arr: this) => any) => any[];
}

export interface IterableBuilder<T> extends Builder<T>, Iterable<T> {}

export interface CompilerState {
  contentBuilder: Builder<string>;
  declarationBuilders: Builder<Builder<string>>;
  externalValues: IterableBuilder<any>;
}

export function getExternalKeys(state: CompilerState): string[] {
  // eslint-disable-next-line
  return state.externalValues.map((_, idx) => 'f' + (idx + 1));
}

export function getDeclarations(state: CompilerState): string {
  return state.declarationBuilders.map((strs, idx) => `var d${idx + 1}=${strs.join('')};`).join('');
}

/**
 * A fake builder usable for contentBuilder and declarationBuilders
 */
export const statelessNoOpBuilder: Builder<any> = {
  push: () => 0,
  join: () => '',
  map: () => []
};

/**
 * A fake builder usable for externalValues
 */
export function statefulNoOpBuilder(): IterableBuilder<any> {
  const internalArray: null[] = [];

  return {
    push: () => internalArray.push(null),
    join: () => '',
    map: (fn) => internalArray.map(fn),
    [Symbol.iterator]: () => ({
      next: () => ({ done: true, value: null })
    })
  };
}
