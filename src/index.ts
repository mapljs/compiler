export interface Builder<T> {
  push: (...x: T[]) => number;
  join: (s: string) => string;
  map: (fn: (x: T, i: number, arr: any[]) => any) => any[];
}

export interface IterableBuilder<T> extends Builder<T>, Iterable<T> {}

export interface CompilerState {
  contentBuilder: Builder<string>;
  declarationBuilders: Builder<Builder<string>>;
  externalValues: IterableBuilder<any>;
}

// eslint-disable-next-line
export const getExternalKeys = (state: CompilerState): string[] => state.externalValues.map((_, idx) => 'f' + (idx + 1));

// eslint-disable-next-line
export const getDeclarations = (state: CompilerState): string => state.declarationBuilders.map((strs, idx) => 'var d' + (idx + 1) + '=' + strs.join('') + ';').join('');

/**
 * A fake builder usable for contentBuilder and declarationBuilders
 */
export const statelessNoOpBuilder: Builder<any> = {
  push: () => 0,
  join: () => '',
  map: () => []
};

// eslint-disable-next-line
export const createNoOpBuilder = () => {
  let len = 0;

  return {
    push: () => ++len,
    join: () => '',
    map: () => []
  } as Builder<any>;
};

// eslint-disable-next-line
export const createDeclaration = (state: CompilerState): Builder<string> => state.declarationBuilders === statelessNoOpBuilder ? statelessNoOpBuilder : [] as string[];
