import { render, defineWebComponents } from "cue";

// 引入组件
import App from "./App";

// 创建Web components
defineWebComponents('count-box', App({
  count: 10,
  onIncrement() { console.log('Web Components onIncrement') },
  onDecrement() { console.log('Web Components onDecrement') },
}));

// 渲染组件
render(<App onIncrement={() => {}} onDecrement={() => {}}/>, document.getElementById("root"));
