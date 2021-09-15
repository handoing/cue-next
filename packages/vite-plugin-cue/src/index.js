import { transformAsync } from '@babel/core';
import cue from 'babel-preset-cue';

export default function cuePlugin(options = {}) {
  return {
    name: 'cue',
    enforce: 'pre',

    async transform(source, id) {
      if (!/\.js/.test(id)) return null;

      const babelOptions = {
        filename: id,
        presets: [ cue ]
      };

      const { code, map } = await transformAsync(source, babelOptions);

      options.debug && console.log(code);

      return { code, map };
    },
  };
}
