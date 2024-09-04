# `@mapl/compiler`
Basic compiler state for all compilation process.

```ts
import type { 
  CompilerState, 
  GenericCompilerState
} from '@mapl/compiler';

const state: CompilerState = [
  // Content builder
  [], 
  // Declaration builders 
  [],
  // External values
  [], 
  // Local variable count
  0
];
```

Here are common methods to parse results from the compiler state:
```ts
import {
  getContent,
  getDeclarations,
  getExternalKeys
} from '@mapl/compiler';

getContent(state); // Join and return the content as string
getDeclarations(state); // Return variable declaration statements
getExternalKeys(state); // Return a list of keys
```

Example usage:
```ts
const state = ...;

state[0].push(`return m===d0(m);`);
state[1].push(['(m)=>m']);

const fn = Function(...getExternalKeys(state), `${getDeclarations(state)}return (m)=>{${getContent(m)}};`);

fn(0); // true
fn(NaN); // false
```
