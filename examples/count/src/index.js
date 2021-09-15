import { render } from "cue";

import App from "./App";

function launchElement(name, node) {
  customElements.define(name, class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.append(node);
    }
  });
}

launchElement('count-box', <App name="haha"/>);

render(<App />, document.getElementById("root"));
