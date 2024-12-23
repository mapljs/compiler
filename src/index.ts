export type LazyString = string | LazyString[];

export interface CompilerState {
  declarationBuilders: LazyString[];
  externalValues: any[];
  globalBuilders: Map<string, LazyString>;
}

// eslint-disable-next-line
export const getExternalKeys = (state: CompilerState): string[] => state.externalValues.map((_, idx) => 'f' + (idx + 1));

// eslint-disable-next-line
export const getDeclarations = (state: CompilerState): string => {
  // @ts-expect-error TSC dies lol
  // eslint-disable-next-line
  let str = state.declarationBuilders.flat(Infinity).map((str, idx) => 'var d' + (idx + 1) + '=' + str + ';').join('');

  state.globalBuilders.forEach((val, key) => {
    str += 'var ';
    str += key;
    str += '=';
    str += typeof val === 'string' ? val : val.flat(Infinity).join('');
  });

  return str;
};
