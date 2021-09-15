import { render, defineWebComponents } from "cue";

// 引入组件
import App from "./App";

// 创建Web components
defineWebComponents('count-box', App);

// 渲染组件
render(<App />, document.getElementById("root"));

console.log('获取DOM节点：', App());
