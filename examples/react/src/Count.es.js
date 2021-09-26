var s = "_$_DELEGATE";

function d(e) {
  let n = document.createElement("template");
  return n.innerHTML = e, n.content.firstChild;
}

function p$1(e, n) {
  if (typeof n == "string") {
    e.innerHTML = n;
    return;
  }

  function t(r) {
    let o = typeof r;
    (o === "string" || o === "number") && (o === "number" && (r = r.toString()), e.innerText = r);
  }

  n.subscribe(t, !0);
}

function $(e, n = window.document) {
  let t = n[s] || (n[s] = new Set());

  for (let r = 0, o = e.length; r < o; r++) {
    let i = e[r];
    t.has(i) || (t.add(i), n.addEventListener(i, a));
  }
}

function a(e) {
  let n = `$$${e.type}`,
      t = e.composedPath && e.composedPath()[0] || e.target;

  for (e.target !== t && Object.defineProperty(e, "target", {
    configurable: !0,
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,

    get() {
      return t;
    }

  }); t !== null;) {
    let r = t[n];

    if (r && !t.disabled) {
      let o = t[`${n}Data`];
      if (o !== void 0 ? r(o, e) : r(e), e.cancelBubble) return;
    }

    t = t.host && t.host !== t && t.host instanceof Node ? t.host : t.parentNode;
  }
}

var e = [];

function p(n) {
  let o = [],
      i = function (...t) {
    return t.length ? u(t[0]) : c();
  };

  i.subscribe = (t, r) => {
    o.indexOf(t) === -1 && o.push(t), r && t(n);
  }, i.unsubscribe = t => {
    let r = o.indexOf(t);
    r > -1 && o.splice(r, 1);
  };

  function u(t) {
    if (t === n && (n === null || typeof n != "object")) return;
    let r = n;
    n = t;

    for (let f = o.length - 1; f > -1; f--) o[f](n, r);
  }

  function c() {
    let t = e[e.length - 1];
    return t && i.subscribe(t[0]), n;
  }

  return i;
}

var style = "button {\n  padding: 0 10px;\n  cursor: pointer;\n}\nspan {\n  margin: 0 10px;\n}\n";

const _tmpl$ = d(`<div><style></style><button type="button"> - </button><span></span><button type="button"> + </button></div>`);

const App = (props = {
  onIncrement: () => {},
  onDecrement: () => {}
}) => {
  const count = p(0);

  const increment = () => {
    count(count() + 1);
    props.onIncrement();
  };

  const decrement = () => {
    count(count() - 1);
    props.onDecrement();
  };

  return (() => {
    const _el$ = _tmpl$.cloneNode(true),
          _el$2 = _el$.firstChild,
          _el$3 = _el$2.nextSibling,
          _el$4 = _el$3.nextSibling,
          _el$5 = _el$4.nextSibling;

    p$1(_el$2, style);

    _el$3.$$click = decrement;

    p$1(_el$4, count);

    _el$5.$$click = increment;
    return _el$;
  })();
};

$(["click"]);

export { App as default };
