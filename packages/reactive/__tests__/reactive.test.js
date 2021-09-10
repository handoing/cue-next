'use strict';

const { reactive, computed } = require('..');

describe('cue', () => {
  test('module mode preamble', () => {
    const data = reactive('0');
    expect(data()).toMatch('0');
    data('1');
    expect(data()).toMatch('1');
  });
});
