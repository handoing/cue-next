# cue-next

面向未来的多框架兼容式框架

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 介绍

- 基于jsx
- 无虚拟DOM
- less runtime
- 组件支持任意dom框架及Web components

## 例子

示例代码见`examples/count`

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <count-box></count-box>

  <script src="/src/index.js" type="module"></script>
</body>
</html>
```

`/src/index.js`
```js
import { render, defineWebComponents } from "cue";
import App from "./App";

// 渲染组件
render(<App />, document.getElementById("root"));

// 创建Web components
defineWebComponents('count-box', App);

console.log('获取App的DOM节点：', App());
```

`/src/App.js`
```js
import { reactive } from "reactive";
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

export default App;
```

## 进度
- [x] JSX
- [x] 事件绑定
- [x] 组件化
- [ ] 生命周期
- [x] Web components
- [ ] SSR

## 问题
- [ ] props
- [ ] 控制流
- [ ] 动画

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/iiiiiii7"><img src="https://avatars.githubusercontent.com/u/9876343?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Double Han</b></sub></a><br /><a href="#blog-handoing" title="Blogposts">📝</a> <a href="https://github.com/handoing/cue-next/commits?author=handoing" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!