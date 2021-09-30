import { reactive, memo } from 'reactive';
export { reactive, memo };

const $$EVENTS = "_$_DELEGATE";

const mountedQueue = [];

export function render(node, parentNode) {
  parentNode.appendChild(node);
  const mount = mountedQueue.shift();
  mount();
}

export function onMounted(fn = () => {}) {
  mountedQueue.push(fn);
}

export function createComponent(component, props) {
  const node = component(props);
  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < node.length; i++) {
      fragment.appendChild(node[i]);
    }
    return fragment;
  }
  return node;
}

export function defineWebComponents(name, component) {
  customElements.define(name, class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      render(component, shadow);
    }
  });
  return component;
}

export function template(tpl) {
  const t = document.createElement("template");
  t.innerHTML = tpl;
  return t.content.firstChild;
}

export function insert(dom, reactive, replaceDom) {
  if (reactive.isReactive) {
    function _insert(value) {
      const t = typeof value;
      if (t === "string" || t === "number") {
        if (t === "number") value = value.toString();
        if (dom.lastChild) {
          dom.lastChild.parentNode.replaceChild(document.createTextNode(value), dom.lastChild);
        } else {
          dom.appendChild(document.createTextNode(value));
        }
      }
    }
    reactive.subscribe(_insert, true);
    return;
  }

  if (typeof reactive === 'function') {
    const _memo = memo(reactive);
    let _dom = _memo();

    _memo.subscribe((node) => {
      _dom.parentNode.replaceChild(node, _dom);
      _dom = node;
    }, false);

    if (Array.isArray(_dom)) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < _dom.length; i++) {
        fragment.appendChild(_dom[i]);
      }
      dom.appendChild(fragment);
      return;
    }
    dom.appendChild(_dom);
    return;
  }

  if (replaceDom) {
    replaceDom.parentNode.replaceChild(document.createTextNode(reactive), replaceDom);
  } else {
    if (dom.lastChild) {
      dom.lastChild.parentNode.replaceChild(document.createTextNode(reactive), dom.lastChild);
    } else {
      dom.appendChild(document.createTextNode(reactive));
    }
  }
}

export function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    node.addEventListener(name, e => handler[0](handler[1], e));
  } else node.addEventListener(name, handler);
}

export function delegateEvents(eventNames, document = window.document) {
  const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
  for (let i = 0, l = eventNames.length; i < l; i++) {
    const name = eventNames[i];
    if (!e.has(name)) {
      e.add(name);
      document.addEventListener(name, eventHandler);
    }
  }
}

function eventHandler(e) {
  const key = `$$${e.type}`;
  let node = (e.composedPath && e.composedPath()[0]) || e.target;
  if (e.target !== node) {
    Object.defineProperty(e, "target", {
      configurable: true,
      value: node
    });
  }

  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node;
    }
  });

  while (node !== null) {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== undefined ? handler(data, e) : handler(e);
      if (e.cancelBubble) return;
    }
    node =
      node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
  }
}
