const babel = require('@babel/core');
const beautify = require('beautify');
const preset = require('..');

describe('cue', () => {
  test('module mode preamble', () => {
    const { code } = babel.transformSync(`
    const div = (
      <button type="button" onClick={this.increment}>
        {count()}
      </button>
    )
    `, {
      presets: [
        preset
      ],
      babelrc: false,
      compact: true
    });

    console.log(beautify(code, { format: 'js' }));
  });
});
