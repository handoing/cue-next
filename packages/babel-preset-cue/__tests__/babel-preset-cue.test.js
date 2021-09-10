'use strict';

const babel = require('@babel/core');
const preset = require('..');

describe('cue', () => {
  test('module mode preamble', () => {
    const { code } = babel.transformSync(`
    const div = <div>1</div>;
    `, {
      presets: [
        preset
      ],
      babelrc: false,
      compact: true
    });

    console.log(code);
  });
});
