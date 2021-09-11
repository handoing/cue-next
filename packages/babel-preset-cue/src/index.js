const jsxTransform = require("babel-plugin-jsx-cue");

export default (context, options = {}) => {
  const plugins = [
    [
      jsxTransform,
      Object.assign(
        {
          moduleName: "cue",
          builtIns: [],
          contextToCustomElements: true,
          wrapConditionals: true,
          generate: "dom"
        },
        options
      )
    ]
  ];

  return {
    plugins
  };
};
