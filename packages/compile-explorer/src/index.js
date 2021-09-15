import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import preset from 'babel-preset-cue';
import beautify from 'beautify';
import theme from './theme';

Babel.registerPreset('babel-preset-cue', preset);

monaco.editor.defineTheme('my-theme', theme);
monaco.editor.setTheme('my-theme');

const sharedEditorOptions = {
  fontSize: 14,
  scrollBeyondLastLine: false,
  renderWhitespace: 'selection',
  minimap: {
    enabled: false,
  },
};

const editor = monaco.editor.create(document.getElementById('source'), {
  value: `import { reactive } from "reactive";
import style from './App.css';

const App = () => {
  const count = reactive(0);
  const increment = () => {
    count(count() + 1);
  };
  const decrement = () => {
    count(count() - 1);
  };
  return (
    <>
      <style>{style}</style>
      <button type="button" onClick={decrement}> - </button>
      <span>{count()}</span>
      <button type="button" onClick={increment}> + </button>
    </>
  );
};

export default App;`,
  language: 'javascript',
  wordWrap: 'bounded',
  ...sharedEditorOptions,
});
editor.getModel().updateOptions({
  tabSize: 2,
});

const output = monaco.editor.create(document.getElementById('output'), {
  value: '',
  language: 'javascript',
  readOnly: true,
  ...sharedEditorOptions,
});
output.getModel().updateOptions({
  tabSize: 2,
});

editor.onDidChangeModelContent(debounce(reCompile));
reCompile();

function compile(source) {
  const { ast, code } = Babel.transform(source, {
    presets: [ 'babel-preset-cue' ],
    babelrc: false,
    compact: true
  });
  return { ast, code };
}

function compileCode(source) {
  let lastSuccessfulCode = '';
  console.clear();
  const start = performance.now();
  const { code, ast } = compile(source);
  console.log(`Compiled in ${(performance.now() - start).toFixed(2)}ms.`);
  console.log(`AST: `, ast);
  lastSuccessfulCode = code + `\n\n// Check the console for the AST`;
  return lastSuccessfulCode;
}

function reCompile() {
  const src = editor.getValue();
  const res = compileCode(src);
  if (res) {
    output.setValue(beautify(res, { format: 'js' }));
  }
}

function debounce(fn, delay = 300) {
  let prevTimer;
  return (...args) => {
    if (prevTimer) {
      clearTimeout(prevTimer);
    }
    prevTimer = window.setTimeout(() => {
      fn(...args);
      prevTimer = null;
    }, delay);
  };
}
