export interface CompilerState {
  contentBuilder: string[];
  declarationBuilders: string[][];
  externalValues: any[];
  localVarCount: number;
}

export function getExternalKeys(state: CompilerState): string[] {
  // eslint-disable-next-line
  return state.externalValues.map((_, idx) => 'f' + idx);
}

export function getDeclarations(state: CompilerState): string {
  return state.declarationBuilders.map((strs, idx) => `var d${idx}=${strs.join('')};`).join('');
}

export function getContent(state: CompilerState): string {
  return state.contentBuilder.join('');
}
