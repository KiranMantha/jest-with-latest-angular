# Integrating jest with angular 12 +

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-wvshji)

## Steps

1. uninstall jasmine & karma using `npm uninstall -D @types/jasmine jasmine jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter ts-node`
2. install jest using `npm i -D @types/jest jest jest-preset-angular @angular-builders/jest`
3. create file `setupJest.ts` in root and add below content

```typescript
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import 'jest-preset-angular';
import 'zone.js';
import 'zone.js/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

```

4. create file `jest.config.js` in root and add below content

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'json', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
```

5. replace `test` part of `angular.json` with below content

```json
...
"test": {
  "builder": "@angular-builders/jest:run",
  "options": {
    "main": ["setupJest.ts"],
    "tsConfig": "src/tsconfig.spec.json",
    "no-cache": true
  }
}
...
```

6. add ` "esModuleInterop": true` to `compilerOptions` in `tsconfig.json`
7. open `tsconfig.spec.json` and replace `jasmine` with `jest` in `types` field
8. that's it jest is now comlpetely integrated with latest angular
