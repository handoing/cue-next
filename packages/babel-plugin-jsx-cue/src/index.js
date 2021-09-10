import SyntaxJSX from "@babel/plugin-syntax-jsx";

function transformJSX(path, { opts }) {
  console.log(path);
}

function preProcess(path) {
  console.log(path);
}

function postProcess(path) {
  console.log(path);
}


export default () => {
  return {
    name: "JSX CUE",
    inherits: SyntaxJSX,
    visitor: {
      JSXElement: transformJSX,
      JSXFragment: transformJSX,
      Program: {
        enter: preProcess,
        exit: postProcess
      }
    }
  };
};
