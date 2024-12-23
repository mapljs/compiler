export type LazyString = string | LazyString[];

export interface CompilerState {
  declarationBuilders: LazyString[];
  externalValues: any[];
  globalBuilders: [name: string, LazyString][];
}

// eslint-disable-next-line
export const getExternalKeys = (state: CompilerState): string[] => state.externalValues.map((_, idx) => 'f' + (idx + 1));

// eslint-disable-next-line
export const getDeclarations = (state: CompilerState): string =>
  // @ts-expect-error TSC dies lol
  // eslint-disable-next-line
  state.declarationBuilders.flat(Infinity).map((str, idx) => 'var d' + (idx + 1) + '=' + str + ';').join('') +
  // eslint-disable-next-line
  state.globalBuilders.map((pair) => 'var ' + pair[0] + '=' + (typeof pair[1] === 'string' ? pair[1] : pair[1].flat(Infinity).join(''))).join('');
