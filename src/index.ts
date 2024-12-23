export interface CompilerState {
  declarationBuilders: string[];
  externalValues: any[];
}

// eslint-disable-next-line
export const getExternalKeys = (state: CompilerState): string[] => state.externalValues.map((_, idx) => 'f' + (idx + 1));

// eslint-disable-next-line
export const getDeclarations = (state: CompilerState): string => state.declarationBuilders.map((str, idx) => 'var d' + (idx + 1) + '=' + str + ';').join('');
