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

export function createDeclaration(state: CompilerState): Builder<string> {
  return state.declarationBuilders === statelessNoOpBuilder ? statelessNoOpBuilder : [] as string[];
}
