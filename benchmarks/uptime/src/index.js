import { render } from "cue";

// 引入组件
import App from "./App";

var s = window.performance.now();
// 渲染组件
render(<App />, document.getElementById("root"));
console.log('initial render: ' + (window.performance.now() - s) + 'ms')
