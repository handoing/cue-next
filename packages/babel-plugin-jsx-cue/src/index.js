import SyntaxJSX from "@babel/plugin-syntax-jsx";
import { transformJSX } from "./transform";
import postprocess from "./postprocess";
import preprocess from "./preprocess";

export default () => {
  return {
    name: "JSX CUE",
    inherits: SyntaxJSX,
    visitor: {
      JSXElement: transformJSX,
      JSXFragment: transformJSX,
      Program: {
        enter: preprocess,
        exit: postprocess
      }
    }
  };
};
