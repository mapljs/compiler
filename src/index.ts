export type CompilerState = [
  contentBuilder: string[],
  declarationBuilder: string[][],
  externalValues: any[],
  localVarCount: number
];

export type GenericCompilerState = [...CompilerState, ...any[]];

export function getExternalKeys(state: GenericCompilerState): string[] {
  // eslint-disable-next-line
  return state[2].map((_, idx) => 'f' + idx);
}

export function getDeclarations(state: GenericCompilerState): string {
  return state[1].map((strs, idx) => `var d${idx}=${strs.join('')};`).join('');
}

export function getContent(state: GenericCompilerState): string {
  return state[0].join('');
}
