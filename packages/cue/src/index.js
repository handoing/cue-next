const $$EVENTS = "_$_DELEGATE";

export function render(node, parentNode) {
  parentNode.appendChild(node);
}

export function createComponent(component) {
  const node = component();
  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < node.length; i++) {
      fragment.appendChild(node[i]);
    }
    return fragment;
  }
  return node;
}

export function template(tpl) {
  const t = document.createElement("template");
  t.innerHTML = tpl;
  return t.content.firstChild;
}

export function insert(dom, reactive) {
  function _insert(value) {
    const t = typeof value;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      dom.innerText = value;
    }
  }
  reactive.subscribe(_insert, true);
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
