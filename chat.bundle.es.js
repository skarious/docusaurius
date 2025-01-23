function ds(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return e ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const ue = {}, Bt = [], Je = () => {
}, vl = () => !1, xl = /^on[^a-z]/, or = (t) => xl.test(t), gs = (t) => t.startsWith("onUpdate:"), me = Object.assign, ms = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, yl = Object.prototype.hasOwnProperty, se = (t, e) => yl.call(t, e), Z = Array.isArray, $t = (t) => cr(t) === "[object Map]", qc = (t) => cr(t) === "[object Set]", ee = (t) => typeof t == "function", _e = (t) => typeof t == "string", _s = (t) => typeof t == "symbol", fe = (t) => t !== null && typeof t == "object", Mc = (t) => fe(t) && ee(t.then) && ee(t.catch), Nc = Object.prototype.toString, cr = (t) => Nc.call(t), kl = (t) => cr(t).slice(8, -1), Ic = (t) => cr(t) === "[object Object]", bs = (t) => _e(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Hn = /* @__PURE__ */ ds(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ir = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, El = /-(\w)/g, Gt = ir((t) => t.replace(El, (e, n) => n ? n.toUpperCase() : "")), wl = /\B([A-Z])/g, Mt = ir(
  (t) => t.replace(wl, "-$1").toLowerCase()
), Fc = ir(
  (t) => t.charAt(0).toUpperCase() + t.slice(1)
), Sr = ir(
  (t) => t ? `on${Fc(t)}` : ""
), bn = (t, e) => !Object.is(t, e), jn = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Gn = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Xr = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Cl = (t) => {
  const e = _e(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Qs;
const Qr = () => Qs || (Qs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vs(t) {
  if (Z(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = _e(r) ? Tl(r) : vs(r);
      if (s)
        for (const o in s)
          e[o] = s[o];
    }
    return e;
  } else {
    if (_e(t))
      return t;
    if (fe(t))
      return t;
  }
}
const Al = /;(?![^(]*\))/g, Sl = /:([^]+)/, Dl = /\/\*[^]*?\*\//g;
function Tl(t) {
  const e = {};
  return t.replace(Dl, "").split(Al).forEach((n) => {
    if (n) {
      const r = n.split(Sl);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function Sn(t) {
  let e = "";
  if (_e(t))
    e = t;
  else if (Z(t))
    for (let n = 0; n < t.length; n++) {
      const r = Sn(t[n]);
      r && (e += r + " ");
    }
  else if (fe(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Rl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ql = /* @__PURE__ */ ds(Rl);
function Lc(t) {
  return !!t || t === "";
}
const Zn = (t) => _e(t) ? t : t == null ? "" : Z(t) || fe(t) && (t.toString === Nc || !ee(t.toString)) ? JSON.stringify(t, Oc, 2) : String(t), Oc = (t, e) => e && e.__v_isRef ? Oc(t, e.value) : $t(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : qc(e) ? {
  [`Set(${e.size})`]: [...e.values()]
} : fe(e) && !Z(e) && !Ic(e) ? String(e) : e;
let Be;
class Ml {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Be, !e && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = Be;
      try {
        return Be = this, e();
      } finally {
        Be = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Be = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Nl(t, e = Be) {
  e && e.active && e.effects.push(t);
}
function Il() {
  return Be;
}
const xs = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Pc = (t) => (t.w & ht) > 0, Bc = (t) => (t.n & ht) > 0, Fl = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= ht;
}, Ll = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      Pc(s) && !Bc(s) ? s.delete(t) : e[n++] = s, s.w &= ~ht, s.n &= ~ht;
    }
    e.length = n;
  }
}, Kn = /* @__PURE__ */ new WeakMap();
let un = 0, ht = 1;
const es = 30;
let $e;
const At = Symbol(""), ts = Symbol("");
class ys {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Nl(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = $e, n = at;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = $e, $e = this, at = !0, ht = 1 << ++un, un <= es ? Fl(this) : eo(this), this.fn();
    } finally {
      un <= es && Ll(this), ht = 1 << --un, $e = this.parent, at = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    $e === this ? this.deferStop = !0 : this.active && (eo(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function eo(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let at = !0;
const $c = [];
function Yt() {
  $c.push(at), at = !1;
}
function Xt() {
  const t = $c.pop();
  at = t === void 0 ? !0 : t;
}
function qe(t, e, n) {
  if (at && $e) {
    let r = Kn.get(t);
    r || Kn.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = xs()), zc(s);
  }
}
function zc(t, e) {
  let n = !1;
  un <= es ? Bc(t) || (t.n |= ht, n = !Pc(t)) : n = !t.has($e), n && (t.add($e), $e.deps.push(t));
}
function tt(t, e, n, r, s, o) {
  const c = Kn.get(t);
  if (!c)
    return;
  let i = [];
  if (e === "clear")
    i = [...c.values()];
  else if (n === "length" && Z(t)) {
    const l = Number(r);
    c.forEach((a, u) => {
      (u === "length" || u >= l) && i.push(a);
    });
  } else
    switch (n !== void 0 && i.push(c.get(n)), e) {
      case "add":
        Z(t) ? bs(n) && i.push(c.get("length")) : (i.push(c.get(At)), $t(t) && i.push(c.get(ts)));
        break;
      case "delete":
        Z(t) || (i.push(c.get(At)), $t(t) && i.push(c.get(ts)));
        break;
      case "set":
        $t(t) && i.push(c.get(At));
        break;
    }
  if (i.length === 1)
    i[0] && ns(i[0]);
  else {
    const l = [];
    for (const a of i)
      a && l.push(...a);
    ns(xs(l));
  }
}
function ns(t, e) {
  const n = Z(t) ? t : [...t];
  for (const r of n)
    r.computed && to(r);
  for (const r of n)
    r.computed || to(r);
}
function to(t, e) {
  (t !== $e || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
function Ol(t, e) {
  var n;
  return (n = Kn.get(t)) == null ? void 0 : n.get(e);
}
const Pl = /* @__PURE__ */ ds("__proto__,__v_isRef,__isVue"), Uc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(_s)
), Bl = /* @__PURE__ */ ks(), $l = /* @__PURE__ */ ks(!1, !0), zl = /* @__PURE__ */ ks(!0), no = /* @__PURE__ */ Ul();
function Ul() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = ce(this);
      for (let o = 0, c = this.length; o < c; o++)
        qe(r, "get", o + "");
      const s = r[e](...n);
      return s === -1 || s === !1 ? r[e](...n.map(ce)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Yt();
      const r = ce(this)[e].apply(this, n);
      return Xt(), r;
    };
  }), t;
}
function Hl(t) {
  const e = ce(this);
  return qe(e, "has", t), e.hasOwnProperty(t);
}
function ks(t = !1, e = !1) {
  return function(r, s, o) {
    if (s === "__v_isReactive")
      return !t;
    if (s === "__v_isReadonly")
      return t;
    if (s === "__v_isShallow")
      return e;
    if (s === "__v_raw" && o === (t ? e ? oa : Zc : e ? Gc : Vc).get(r))
      return r;
    const c = Z(r);
    if (!t) {
      if (c && se(no, s))
        return Reflect.get(no, s, o);
      if (s === "hasOwnProperty")
        return Hl;
    }
    const i = Reflect.get(r, s, o);
    return (_s(s) ? Uc.has(s) : Pl(s)) || (t || qe(r, "get", s), e) ? i : ye(i) ? c && bs(s) ? i : i.value : fe(i) ? t ? Kc(i) : Cs(i) : i;
  };
}
const jl = /* @__PURE__ */ Hc(), Vl = /* @__PURE__ */ Hc(!0);
function Hc(t = !1) {
  return function(n, r, s, o) {
    let c = n[r];
    if (Zt(c) && ye(c) && !ye(s))
      return !1;
    if (!t && (!Wn(s) && !Zt(s) && (c = ce(c), s = ce(s)), !Z(n) && ye(c) && !ye(s)))
      return c.value = s, !0;
    const i = Z(n) && bs(r) ? Number(r) < n.length : se(n, r), l = Reflect.set(n, r, s, o);
    return n === ce(o) && (i ? bn(s, c) && tt(n, "set", r, s) : tt(n, "add", r, s)), l;
  };
}
function Gl(t, e) {
  const n = se(t, e);
  t[e];
  const r = Reflect.deleteProperty(t, e);
  return r && n && tt(t, "delete", e, void 0), r;
}
function Zl(t, e) {
  const n = Reflect.has(t, e);
  return (!_s(e) || !Uc.has(e)) && qe(t, "has", e), n;
}
function Kl(t) {
  return qe(t, "iterate", Z(t) ? "length" : At), Reflect.ownKeys(t);
}
const jc = {
  get: Bl,
  set: jl,
  deleteProperty: Gl,
  has: Zl,
  ownKeys: Kl
}, Wl = {
  get: zl,
  set(t, e) {
    return !0;
  },
  deleteProperty(t, e) {
    return !0;
  }
}, Jl = /* @__PURE__ */ me(
  {},
  jc,
  {
    get: $l,
    set: Vl
  }
), Es = (t) => t, lr = (t) => Reflect.getPrototypeOf(t);
function Mn(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const s = ce(t), o = ce(e);
  n || (e !== o && qe(s, "get", e), qe(s, "get", o));
  const { has: c } = lr(s), i = r ? Es : n ? Ss : vn;
  if (c.call(s, e))
    return i(t.get(e));
  if (c.call(s, o))
    return i(t.get(o));
  t !== s && t.get(e);
}
function Nn(t, e = !1) {
  const n = this.__v_raw, r = ce(n), s = ce(t);
  return e || (t !== s && qe(r, "has", t), qe(r, "has", s)), t === s ? n.has(t) : n.has(t) || n.has(s);
}
function In(t, e = !1) {
  return t = t.__v_raw, !e && qe(ce(t), "iterate", At), Reflect.get(t, "size", t);
}
function ro(t) {
  t = ce(t);
  const e = ce(this);
  return lr(e).has.call(e, t) || (e.add(t), tt(e, "add", t, t)), this;
}
function so(t, e) {
  e = ce(e);
  const n = ce(this), { has: r, get: s } = lr(n);
  let o = r.call(n, t);
  o || (t = ce(t), o = r.call(n, t));
  const c = s.call(n, t);
  return n.set(t, e), o ? bn(e, c) && tt(n, "set", t, e) : tt(n, "add", t, e), this;
}
function oo(t) {
  const e = ce(this), { has: n, get: r } = lr(e);
  let s = n.call(e, t);
  s || (t = ce(t), s = n.call(e, t)), r && r.call(e, t);
  const o = e.delete(t);
  return s && tt(e, "delete", t, void 0), o;
}
function co() {
  const t = ce(this), e = t.size !== 0, n = t.clear();
  return e && tt(t, "clear", void 0, void 0), n;
}
function Fn(t, e) {
  return function(r, s) {
    const o = this, c = o.__v_raw, i = ce(c), l = e ? Es : t ? Ss : vn;
    return !t && qe(i, "iterate", At), c.forEach((a, u) => r.call(s, l(a), l(u), o));
  };
}
function Ln(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, o = ce(s), c = $t(o), i = t === "entries" || t === Symbol.iterator && c, l = t === "keys" && c, a = s[t](...r), u = n ? Es : e ? Ss : vn;
    return !e && qe(
      o,
      "iterate",
      l ? ts : At
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = a.next();
        return h ? { value: f, done: h } : {
          value: i ? [u(f[0]), u(f[1])] : u(f),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function rt(t) {
  return function(...e) {
    return t === "delete" ? !1 : this;
  };
}
function Yl() {
  const t = {
    get(o) {
      return Mn(this, o);
    },
    get size() {
      return In(this);
    },
    has: Nn,
    add: ro,
    set: so,
    delete: oo,
    clear: co,
    forEach: Fn(!1, !1)
  }, e = {
    get(o) {
      return Mn(this, o, !1, !0);
    },
    get size() {
      return In(this);
    },
    has: Nn,
    add: ro,
    set: so,
    delete: oo,
    clear: co,
    forEach: Fn(!1, !0)
  }, n = {
    get(o) {
      return Mn(this, o, !0);
    },
    get size() {
      return In(this, !0);
    },
    has(o) {
      return Nn.call(this, o, !0);
    },
    add: rt("add"),
    set: rt("set"),
    delete: rt("delete"),
    clear: rt("clear"),
    forEach: Fn(!0, !1)
  }, r = {
    get(o) {
      return Mn(this, o, !0, !0);
    },
    get size() {
      return In(this, !0);
    },
    has(o) {
      return Nn.call(this, o, !0);
    },
    add: rt("add"),
    set: rt("set"),
    delete: rt("delete"),
    clear: rt("clear"),
    forEach: Fn(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = Ln(
      o,
      !1,
      !1
    ), n[o] = Ln(
      o,
      !0,
      !1
    ), e[o] = Ln(
      o,
      !1,
      !0
    ), r[o] = Ln(
      o,
      !0,
      !0
    );
  }), [
    t,
    n,
    e,
    r
  ];
}
const [
  Xl,
  Ql,
  ea,
  ta
] = /* @__PURE__ */ Yl();
function ws(t, e) {
  const n = e ? t ? ta : ea : t ? Ql : Xl;
  return (r, s, o) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(
    se(n, s) && s in r ? n : r,
    s,
    o
  );
}
const na = {
  get: /* @__PURE__ */ ws(!1, !1)
}, ra = {
  get: /* @__PURE__ */ ws(!1, !0)
}, sa = {
  get: /* @__PURE__ */ ws(!0, !1)
}, Vc = /* @__PURE__ */ new WeakMap(), Gc = /* @__PURE__ */ new WeakMap(), Zc = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap();
function ca(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ia(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ca(kl(t));
}
function Cs(t) {
  return Zt(t) ? t : As(
    t,
    !1,
    jc,
    na,
    Vc
  );
}
function la(t) {
  return As(
    t,
    !1,
    Jl,
    ra,
    Gc
  );
}
function Kc(t) {
  return As(
    t,
    !0,
    Wl,
    sa,
    Zc
  );
}
function As(t, e, n, r, s) {
  if (!fe(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = s.get(t);
  if (o)
    return o;
  const c = ia(t);
  if (c === 0)
    return t;
  const i = new Proxy(
    t,
    c === 2 ? r : n
  );
  return s.set(t, i), i;
}
function zt(t) {
  return Zt(t) ? zt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Zt(t) {
  return !!(t && t.__v_isReadonly);
}
function Wn(t) {
  return !!(t && t.__v_isShallow);
}
function Wc(t) {
  return zt(t) || Zt(t);
}
function ce(t) {
  const e = t && t.__v_raw;
  return e ? ce(e) : t;
}
function Jc(t) {
  return Gn(t, "__v_skip", !0), t;
}
const vn = (t) => fe(t) ? Cs(t) : t, Ss = (t) => fe(t) ? Kc(t) : t;
function Yc(t) {
  at && $e && (t = ce(t), zc(t.dep || (t.dep = xs())));
}
function Xc(t, e) {
  t = ce(t);
  const n = t.dep;
  n && ns(n);
}
function ye(t) {
  return !!(t && t.__v_isRef === !0);
}
function Ut(t) {
  return aa(t, !1);
}
function aa(t, e) {
  return ye(t) ? t : new ua(t, e);
}
class ua {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : ce(e), this._value = n ? e : vn(e);
  }
  get value() {
    return Yc(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Wn(e) || Zt(e);
    e = n ? e : ce(e), bn(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : vn(e), Xc(this));
  }
}
function ge(t) {
  return ye(t) ? t.value : t;
}
const fa = {
  get: (t, e, n) => ge(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const s = t[e];
    return ye(s) && !ye(n) ? (s.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Qc(t) {
  return zt(t) ? t : new Proxy(t, fa);
}
function ha(t) {
  const e = Z(t) ? new Array(t.length) : {};
  for (const n in t)
    e[n] = da(t, n);
  return e;
}
class pa {
  constructor(e, n, r) {
    this._object = e, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return Ol(ce(this._object), this._key);
  }
}
function da(t, e, n) {
  const r = t[e];
  return ye(r) ? r : new pa(
    t,
    e,
    n
  );
}
class ga {
  constructor(e, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new ys(e, () => {
      this._dirty || (this._dirty = !0, Xc(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const e = ce(this);
    return Yc(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function ma(t, e, n = !1) {
  let r, s;
  const o = ee(t);
  return o ? (r = t, s = Je) : (r = t.get, s = t.set), new ga(r, s, o || !s, n);
}
function ut(t, e, n, r) {
  let s;
  try {
    s = r ? t(...r) : t();
  } catch (o) {
    ar(o, e, n);
  }
  return s;
}
function Fe(t, e, n, r) {
  if (ee(t)) {
    const o = ut(t, e, n, r);
    return o && Mc(o) && o.catch((c) => {
      ar(c, e, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < t.length; o++)
    s.push(Fe(t[o], e, n, r));
  return s;
}
function ar(t, e, n, r = !0) {
  const s = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const c = e.proxy, i = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let u = 0; u < a.length; u++)
          if (a[u](t, c, i) === !1)
            return;
      }
      o = o.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      ut(
        l,
        null,
        10,
        [t, c, i]
      );
      return;
    }
  }
  _a(t, n, s, r);
}
function _a(t, e, n, r = !0) {
  console.error(t);
}
let xn = !1, rs = !1;
const ke = [];
let Ze = 0;
const Ht = [];
let et = null, yt = 0;
const ei = /* @__PURE__ */ Promise.resolve();
let Ds = null;
function Kt(t) {
  const e = Ds || ei;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ba(t) {
  let e = Ze + 1, n = ke.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    yn(ke[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function Ts(t) {
  (!ke.length || !ke.includes(
    t,
    xn && t.allowRecurse ? Ze + 1 : Ze
  )) && (t.id == null ? ke.push(t) : ke.splice(ba(t.id), 0, t), ti());
}
function ti() {
  !xn && !rs && (rs = !0, Ds = ei.then(ri));
}
function va(t) {
  const e = ke.indexOf(t);
  e > Ze && ke.splice(e, 1);
}
function xa(t) {
  Z(t) ? Ht.push(...t) : (!et || !et.includes(
    t,
    t.allowRecurse ? yt + 1 : yt
  )) && Ht.push(t), ti();
}
function io(t, e = xn ? Ze + 1 : 0) {
  for (; e < ke.length; e++) {
    const n = ke[e];
    n && n.pre && (ke.splice(e, 1), e--, n());
  }
}
function ni(t) {
  if (Ht.length) {
    const e = [...new Set(Ht)];
    if (Ht.length = 0, et) {
      et.push(...e);
      return;
    }
    for (et = e, et.sort((n, r) => yn(n) - yn(r)), yt = 0; yt < et.length; yt++)
      et[yt]();
    et = null, yt = 0;
  }
}
const yn = (t) => t.id == null ? 1 / 0 : t.id, ya = (t, e) => {
  const n = yn(t) - yn(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ri(t) {
  rs = !1, xn = !0, ke.sort(ya);
  try {
    for (Ze = 0; Ze < ke.length; Ze++) {
      const e = ke[Ze];
      e && e.active !== !1 && ut(e, null, 14);
    }
  } finally {
    Ze = 0, ke.length = 0, ni(), xn = !1, Ds = null, (ke.length || Ht.length) && ri();
  }
}
function ka(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || ue;
  let s = n;
  const o = e.startsWith("update:"), c = o && e.slice(7);
  if (c && c in r) {
    const u = `${c === "modelValue" ? "model" : c}Modifiers`, { number: f, trim: h } = r[u] || ue;
    h && (s = n.map((d) => _e(d) ? d.trim() : d)), f && (s = n.map(Xr));
  }
  let i, l = r[i = Sr(e)] || // also try camelCase event handler (#2249)
  r[i = Sr(Gt(e))];
  !l && o && (l = r[i = Sr(Mt(e))]), l && Fe(
    l,
    t,
    6,
    s
  );
  const a = r[i + "Once"];
  if (a) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[i])
      return;
    t.emitted[i] = !0, Fe(
      a,
      t,
      6,
      s
    );
  }
}
function si(t, e, n = !1) {
  const r = e.emitsCache, s = r.get(t);
  if (s !== void 0)
    return s;
  const o = t.emits;
  let c = {}, i = !1;
  if (!ee(t)) {
    const l = (a) => {
      const u = si(a, e, !0);
      u && (i = !0, me(c, u));
    };
    !n && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  return !o && !i ? (fe(t) && r.set(t, null), null) : (Z(o) ? o.forEach((l) => c[l] = null) : me(c, o), fe(t) && r.set(t, c), c);
}
function ur(t, e) {
  return !t || !or(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), se(t, e[0].toLowerCase() + e.slice(1)) || se(t, Mt(e)) || se(t, e));
}
let Ee = null, oi = null;
function Jn(t) {
  const e = Ee;
  return Ee = t, oi = t && t.type.__scopeId || null, e;
}
function ft(t, e = Ee, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && xo(-1);
    const o = Jn(e);
    let c;
    try {
      c = t(...s);
    } finally {
      Jn(o), r._d && xo(1);
    }
    return c;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Dr(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [c],
    slots: i,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    data: h,
    setupState: d,
    ctx: k,
    inheritAttrs: b
  } = t;
  let I, T;
  const C = Jn(t);
  try {
    if (n.shapeFlag & 4) {
      const A = s || r;
      I = Ge(
        u.call(
          A,
          A,
          f,
          o,
          d,
          h,
          k
        )
      ), T = l;
    } else {
      const A = e;
      I = Ge(
        A.length > 1 ? A(
          o,
          { attrs: l, slots: i, emit: a }
        ) : A(
          o,
          null
          /* we know it doesn't need it */
        )
      ), T = e.props ? l : Ea(l);
    }
  } catch (A) {
    gn.length = 0, ar(A, t, 1), I = pe(Le);
  }
  let N = I;
  if (T && b !== !1) {
    const A = Object.keys(T), { shapeFlag: j } = N;
    A.length && j & 7 && (c && A.some(gs) && (T = wa(
      T,
      c
    )), N = pt(N, T));
  }
  return n.dirs && (N = pt(N), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && (N.transition = n.transition), I = N, Jn(C), I;
}
const Ea = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || or(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, wa = (t, e) => {
  const n = {};
  for (const r in t)
    (!gs(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ca(t, e, n) {
  const { props: r, children: s, component: o } = t, { props: c, children: i, patchFlag: l } = e, a = o.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? lo(r, c, a) : !!c;
    if (l & 8) {
      const u = e.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (c[h] !== r[h] && !ur(a, h))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : r === c ? !1 : r ? c ? lo(r, c, a) : !0 : !!c;
  return !1;
}
function lo(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (e[o] !== t[o] && !ur(n, o))
      return !0;
  }
  return !1;
}
function Aa({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; )
    (t = e.vnode).el = n, e = e.parent;
}
const Sa = (t) => t.__isSuspense;
function Da(t, e) {
  e && e.pendingBranch ? Z(t) ? e.effects.push(...t) : e.effects.push(t) : xa(t);
}
const On = {};
function Tr(t, e, n) {
  return ci(t, e, n);
}
function ci(t, e, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: c } = ue) {
  var i;
  const l = Il() === ((i = xe) == null ? void 0 : i.scope) ? xe : null;
  let a, u = !1, f = !1;
  if (ye(t) ? (a = () => t.value, u = Wn(t)) : zt(t) ? (a = () => t, r = !0) : Z(t) ? (f = !0, u = t.some((A) => zt(A) || Wn(A)), a = () => t.map((A) => {
    if (ye(A))
      return A.value;
    if (zt(A))
      return wt(A);
    if (ee(A))
      return ut(A, l, 2);
  })) : ee(t) ? e ? a = () => ut(t, l, 2) : a = () => {
    if (!(l && l.isUnmounted))
      return h && h(), Fe(
        t,
        l,
        3,
        [d]
      );
  } : a = Je, e && r) {
    const A = a;
    a = () => wt(A());
  }
  let h, d = (A) => {
    h = C.onStop = () => {
      ut(A, l, 4);
    };
  }, k;
  if (En)
    if (d = Je, e ? n && Fe(e, l, 3, [
      a(),
      f ? [] : void 0,
      d
    ]) : a(), s === "sync") {
      const A = ku();
      k = A.__watcherHandles || (A.__watcherHandles = []);
    } else
      return Je;
  let b = f ? new Array(t.length).fill(On) : On;
  const I = () => {
    if (C.active)
      if (e) {
        const A = C.run();
        (r || u || (f ? A.some(
          (j, q) => bn(j, b[q])
        ) : bn(A, b))) && (h && h(), Fe(e, l, 3, [
          A,
          // pass undefined as the old value when it's changed for the first time
          b === On ? void 0 : f && b[0] === On ? [] : b,
          d
        ]), b = A);
      } else
        C.run();
  };
  I.allowRecurse = !!e;
  let T;
  s === "sync" ? T = I : s === "post" ? T = () => Te(I, l && l.suspense) : (I.pre = !0, l && (I.id = l.uid), T = () => Ts(I));
  const C = new ys(a, T);
  e ? n ? I() : b = C.run() : s === "post" ? Te(
    C.run.bind(C),
    l && l.suspense
  ) : C.run();
  const N = () => {
    C.stop(), l && l.scope && ms(l.scope.effects, C);
  };
  return k && k.push(N), N;
}
function Ta(t, e, n) {
  const r = this.proxy, s = _e(t) ? t.includes(".") ? ii(r, t) : () => r[t] : t.bind(r, r);
  let o;
  ee(e) ? o = e : (o = e.handler, n = e);
  const c = xe;
  Wt(this);
  const i = ci(s, o.bind(r), n);
  return c ? Wt(c) : St(), i;
}
function ii(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function wt(t, e) {
  if (!fe(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), ye(t))
    wt(t.value, e);
  else if (Z(t))
    for (let n = 0; n < t.length; n++)
      wt(t[n], e);
  else if (qc(t) || $t(t))
    t.forEach((n) => {
      wt(n, e);
    });
  else if (Ic(t))
    for (const n in t)
      wt(t[n], e);
  return t;
}
function li(t, e) {
  const n = Ee;
  if (n === null)
    return t;
  const r = gr(n) || n.proxy, s = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [c, i, l, a = ue] = e[o];
    c && (ee(c) && (c = {
      mounted: c,
      updated: c
    }), c.deep && wt(i), s.push({
      dir: c,
      instance: r,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
function mt(t, e, n, r) {
  const s = t.dirs, o = e && e.dirs;
  for (let c = 0; c < s.length; c++) {
    const i = s[c];
    o && (i.oldValue = o[c].value);
    let l = i.dir[r];
    l && (Yt(), Fe(l, n, 8, [
      t.el,
      i,
      t,
      e
    ]), Xt());
  }
}
function Ra() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Dn(() => {
    t.isMounted = !0;
  }), Rs(() => {
    t.isUnmounting = !0;
  }), t;
}
const Ie = [Function, Array], ai = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ie,
  onEnter: Ie,
  onAfterEnter: Ie,
  onEnterCancelled: Ie,
  // leave
  onBeforeLeave: Ie,
  onLeave: Ie,
  onAfterLeave: Ie,
  onLeaveCancelled: Ie,
  // appear
  onBeforeAppear: Ie,
  onAppear: Ie,
  onAfterAppear: Ie,
  onAppearCancelled: Ie
}, qa = {
  name: "BaseTransition",
  props: ai,
  setup(t, { slots: e }) {
    const n = gu(), r = Ra();
    let s;
    return () => {
      const o = e.default && fi(e.default(), !0);
      if (!o || !o.length)
        return;
      let c = o[0];
      if (o.length > 1) {
        for (const b of o)
          if (b.type !== Le) {
            c = b;
            break;
          }
      }
      const i = ce(t), { mode: l } = i;
      if (r.isLeaving)
        return Rr(c);
      const a = ao(c);
      if (!a)
        return Rr(c);
      const u = ss(
        a,
        i,
        r,
        n
      );
      os(a, u);
      const f = n.subTree, h = f && ao(f);
      let d = !1;
      const { getTransitionKey: k } = a.type;
      if (k) {
        const b = k();
        s === void 0 ? s = b : b !== s && (s = b, d = !0);
      }
      if (h && h.type !== Le && (!kt(a, h) || d)) {
        const b = ss(
          h,
          i,
          r,
          n
        );
        if (os(h, b), l === "out-in")
          return r.isLeaving = !0, b.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Rr(c);
        l === "in-out" && a.type !== Le && (b.delayLeave = (I, T, C) => {
          const N = ui(
            r,
            h
          );
          N[String(h.key)] = h, I._leaveCb = () => {
            T(), I._leaveCb = void 0, delete u.delayedLeave;
          }, u.delayedLeave = C;
        });
      }
      return c;
    };
  }
}, Ma = qa;
function ui(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(e.type, r)), r;
}
function ss(t, e, n, r) {
  const {
    appear: s,
    mode: o,
    persisted: c = !1,
    onBeforeEnter: i,
    onEnter: l,
    onAfterEnter: a,
    onEnterCancelled: u,
    onBeforeLeave: f,
    onLeave: h,
    onAfterLeave: d,
    onLeaveCancelled: k,
    onBeforeAppear: b,
    onAppear: I,
    onAfterAppear: T,
    onAppearCancelled: C
  } = e, N = String(t.key), A = ui(n, t), j = ($, X) => {
    $ && Fe(
      $,
      r,
      9,
      X
    );
  }, q = ($, X) => {
    const z = X[1];
    j($, X), Z($) ? $.every((J) => J.length <= 1) && z() : $.length <= 1 && z();
  }, W = {
    mode: o,
    persisted: c,
    beforeEnter($) {
      let X = i;
      if (!n.isMounted)
        if (s)
          X = b || i;
        else
          return;
      $._leaveCb && $._leaveCb(
        !0
        /* cancelled */
      );
      const z = A[N];
      z && kt(t, z) && z.el._leaveCb && z.el._leaveCb(), j(X, [$]);
    },
    enter($) {
      let X = l, z = a, J = u;
      if (!n.isMounted)
        if (s)
          X = I || l, z = T || a, J = C || u;
        else
          return;
      let B = !1;
      const re = $._enterCb = (D) => {
        B || (B = !0, D ? j(J, [$]) : j(z, [$]), W.delayedLeave && W.delayedLeave(), $._enterCb = void 0);
      };
      X ? q(X, [$, re]) : re();
    },
    leave($, X) {
      const z = String(t.key);
      if ($._enterCb && $._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      j(f, [$]);
      let J = !1;
      const B = $._leaveCb = (re) => {
        J || (J = !0, X(), re ? j(k, [$]) : j(d, [$]), $._leaveCb = void 0, A[z] === t && delete A[z]);
      };
      A[z] = t, h ? q(h, [$, B]) : B();
    },
    clone($) {
      return ss($, e, n, r);
    }
  };
  return W;
}
function Rr(t) {
  if (fr(t))
    return t = pt(t), t.children = null, t;
}
function ao(t) {
  return fr(t) ? t.children ? t.children[0] : void 0 : t;
}
function os(t, e) {
  t.shapeFlag & 6 && t.component ? os(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function fi(t, e = !1, n) {
  let r = [], s = 0;
  for (let o = 0; o < t.length; o++) {
    let c = t[o];
    const i = n == null ? c.key : String(n) + String(c.key != null ? c.key : o);
    c.type === Re ? (c.patchFlag & 128 && s++, r = r.concat(
      fi(c.children, e, i)
    )) : (e || c.type !== Le) && r.push(i != null ? pt(c, { key: i }) : c);
  }
  if (s > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
function Ue(t, e) {
  return ee(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    me({ name: t.name }, e, { setup: t })
  ) : t;
}
const hn = (t) => !!t.type.__asyncLoader, fr = (t) => t.type.__isKeepAlive;
function Na(t, e) {
  hi(t, "a", e);
}
function Ia(t, e) {
  hi(t, "da", e);
}
function hi(t, e, n = xe) {
  const r = t.__wdc || (t.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return t();
  });
  if (hr(e, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      fr(s.parent.vnode) && Fa(r, e, n, s), s = s.parent;
  }
}
function Fa(t, e, n, r) {
  const s = hr(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  pi(() => {
    ms(r[e], s);
  }, n);
}
function hr(t, e, n = xe, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), o = e.__weh || (e.__weh = (...c) => {
      if (n.isUnmounted)
        return;
      Yt(), Wt(n);
      const i = Fe(e, n, t, c);
      return St(), Xt(), i;
    });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const nt = (t) => (e, n = xe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!En || t === "sp") && hr(t, (...r) => e(...r), n)
), La = nt("bm"), Dn = nt("m"), Oa = nt("bu"), Pa = nt("u"), Rs = nt("bum"), pi = nt("um"), Ba = nt("sp"), $a = nt(
  "rtg"
), za = nt(
  "rtc"
);
function Ua(t, e = xe) {
  hr("ec", t, e);
}
const Ha = Symbol.for("v-ndc");
function uo(t, e, n, r) {
  let s;
  const o = n && n[r];
  if (Z(t) || _e(t)) {
    s = new Array(t.length);
    for (let c = 0, i = t.length; c < i; c++)
      s[c] = e(t[c], c, void 0, o && o[c]);
  } else if (typeof t == "number") {
    s = new Array(t);
    for (let c = 0; c < t; c++)
      s[c] = e(c + 1, c, void 0, o && o[c]);
  } else if (fe(t))
    if (t[Symbol.iterator])
      s = Array.from(
        t,
        (c, i) => e(c, i, void 0, o && o[i])
      );
    else {
      const c = Object.keys(t);
      s = new Array(c.length);
      for (let i = 0, l = c.length; i < l; i++) {
        const a = c[i];
        s[i] = e(t[a], a, i, o && o[i]);
      }
    }
  else
    s = [];
  return n && (n[r] = s), s;
}
function pn(t, e, n = {}, r, s) {
  if (Ee.isCE || Ee.parent && hn(Ee.parent) && Ee.parent.isCE)
    return e !== "default" && (n.name = e), pe("slot", n, r && r());
  let o = t[e];
  o && o._c && (o._d = !1), oe();
  const c = o && di(o(n)), i = Se(
    Re,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      c && c.key || `_${e}`
    },
    c || (r ? r() : []),
    c && t._ === 1 ? 64 : -2
  );
  return !s && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]), o && o._c && (o._d = !0), i;
}
function di(t) {
  return t.some((e) => Qn(e) ? !(e.type === Le || e.type === Re && !di(e.children)) : !0) ? t : null;
}
const cs = (t) => t ? Ci(t) ? gr(t) || t.proxy : cs(t.parent) : null, dn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ me(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => cs(t.parent),
    $root: (t) => cs(t.root),
    $emit: (t) => t.emit,
    $options: (t) => qs(t),
    $forceUpdate: (t) => t.f || (t.f = () => Ts(t.update)),
    $nextTick: (t) => t.n || (t.n = Kt.bind(t.proxy)),
    $watch: (t) => Ta.bind(t)
  })
), qr = (t, e) => t !== ue && !t.__isScriptSetup && se(t, e), ja = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: c, type: i, appContext: l } = t;
    let a;
    if (e[0] !== "$") {
      const d = c[e];
      if (d !== void 0)
        switch (d) {
          case 1:
            return r[e];
          case 2:
            return s[e];
          case 4:
            return n[e];
          case 3:
            return o[e];
        }
      else {
        if (qr(r, e))
          return c[e] = 1, r[e];
        if (s !== ue && se(s, e))
          return c[e] = 2, s[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = t.propsOptions[0]) && se(a, e)
        )
          return c[e] = 3, o[e];
        if (n !== ue && se(n, e))
          return c[e] = 4, n[e];
        is && (c[e] = 0);
      }
    }
    const u = dn[e];
    let f, h;
    if (u)
      return e === "$attrs" && qe(t, "get", e), u(t);
    if (
      // css module (injected by vue-loader)
      (f = i.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== ue && se(n, e))
      return c[e] = 4, n[e];
    if (
      // global properties
      h = l.config.globalProperties, se(h, e)
    )
      return h[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: s, ctx: o } = t;
    return qr(s, e) ? (s[e] = n, !0) : r !== ue && se(r, e) ? (r[e] = n, !0) : se(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (o[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, c) {
    let i;
    return !!n[c] || t !== ue && se(t, c) || qr(e, c) || (i = o[0]) && se(i, c) || se(r, c) || se(dn, c) || se(s.config.globalProperties, c);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : se(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function fo(t) {
  return Z(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let is = !0;
function Va(t) {
  const e = qs(t), n = t.proxy, r = t.ctx;
  is = !1, e.beforeCreate && ho(e.beforeCreate, t, "bc");
  const {
    // state
    data: s,
    computed: o,
    methods: c,
    watch: i,
    provide: l,
    inject: a,
    // lifecycle
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: d,
    updated: k,
    activated: b,
    deactivated: I,
    beforeDestroy: T,
    beforeUnmount: C,
    destroyed: N,
    unmounted: A,
    render: j,
    renderTracked: q,
    renderTriggered: W,
    errorCaptured: $,
    serverPrefetch: X,
    // public API
    expose: z,
    inheritAttrs: J,
    // assets
    components: B,
    directives: re,
    filters: D
  } = e;
  if (a && Ga(a, r, null), c)
    for (const v in c) {
      const S = c[v];
      ee(S) && (r[v] = S.bind(n));
    }
  if (s) {
    const v = s.call(n, n);
    fe(v) && (t.data = Cs(v));
  }
  if (is = !0, o)
    for (const v in o) {
      const S = o[v], G = ee(S) ? S.bind(n, n) : ee(S.get) ? S.get.bind(n, n) : Je, te = !ee(S) && ee(S.set) ? S.set.bind(n) : Je, ie = Tt({
        get: G,
        set: te
      });
      Object.defineProperty(r, v, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (ae) => ie.value = ae
      });
    }
  if (i)
    for (const v in i)
      gi(i[v], r, n, v);
  if (l) {
    const v = ee(l) ? l.call(n) : l;
    Reflect.ownKeys(v).forEach((S) => {
      Xa(S, v[S]);
    });
  }
  u && ho(u, t, "c");
  function V(v, S) {
    Z(S) ? S.forEach((G) => v(G.bind(n))) : S && v(S.bind(n));
  }
  if (V(La, f), V(Dn, h), V(Oa, d), V(Pa, k), V(Na, b), V(Ia, I), V(Ua, $), V(za, q), V($a, W), V(Rs, C), V(pi, A), V(Ba, X), Z(z))
    if (z.length) {
      const v = t.exposed || (t.exposed = {});
      z.forEach((S) => {
        Object.defineProperty(v, S, {
          get: () => n[S],
          set: (G) => n[S] = G
        });
      });
    } else
      t.exposed || (t.exposed = {});
  j && t.render === Je && (t.render = j), J != null && (t.inheritAttrs = J), B && (t.components = B), re && (t.directives = re);
}
function Ga(t, e, n = Je) {
  Z(t) && (t = ls(t));
  for (const r in t) {
    const s = t[r];
    let o;
    fe(s) ? "default" in s ? o = jt(
      s.from || r,
      s.default,
      !0
      /* treat default function as factory */
    ) : o = jt(s.from || r) : o = jt(s), ye(o) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : e[r] = o;
  }
}
function ho(t, e, n) {
  Fe(
    Z(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function gi(t, e, n, r) {
  const s = r.includes(".") ? ii(n, r) : () => n[r];
  if (_e(t)) {
    const o = e[t];
    ee(o) && Tr(s, o);
  } else if (ee(t))
    Tr(s, t.bind(n));
  else if (fe(t))
    if (Z(t))
      t.forEach((o) => gi(o, e, n, r));
    else {
      const o = ee(t.handler) ? t.handler.bind(n) : e[t.handler];
      ee(o) && Tr(s, o, t);
    }
}
function qs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: c }
  } = t.appContext, i = o.get(e);
  let l;
  return i ? l = i : !s.length && !n && !r ? l = e : (l = {}, s.length && s.forEach(
    (a) => Yn(l, a, c, !0)
  ), Yn(l, e, c)), fe(e) && o.set(e, l), l;
}
function Yn(t, e, n, r = !1) {
  const { mixins: s, extends: o } = e;
  o && Yn(t, o, n, !0), s && s.forEach(
    (c) => Yn(t, c, n, !0)
  );
  for (const c in e)
    if (!(r && c === "expose")) {
      const i = Za[c] || n && n[c];
      t[c] = i ? i(t[c], e[c]) : e[c];
    }
  return t;
}
const Za = {
  data: po,
  props: go,
  emits: go,
  // objects
  methods: fn,
  computed: fn,
  // lifecycle
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  // assets
  components: fn,
  directives: fn,
  // watch
  watch: Wa,
  // provide / inject
  provide: po,
  inject: Ka
};
function po(t, e) {
  return e ? t ? function() {
    return me(
      ee(t) ? t.call(this, this) : t,
      ee(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Ka(t, e) {
  return fn(ls(t), ls(e));
}
function ls(t) {
  if (Z(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ae(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function fn(t, e) {
  return t ? me(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function go(t, e) {
  return t ? Z(t) && Z(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : me(
    /* @__PURE__ */ Object.create(null),
    fo(t),
    fo(e ?? {})
  ) : e;
}
function Wa(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = me(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Ae(t[r], e[r]);
  return n;
}
function mi() {
  return {
    app: null,
    config: {
      isNativeTag: vl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ja = 0;
function Ya(t, e) {
  return function(r, s = null) {
    ee(r) || (r = me({}, r)), s != null && !fe(s) && (s = null);
    const o = mi(), c = /* @__PURE__ */ new Set();
    let i = !1;
    const l = o.app = {
      _uid: Ja++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Eu,
      get config() {
        return o.config;
      },
      set config(a) {
      },
      use(a, ...u) {
        return c.has(a) || (a && ee(a.install) ? (c.add(a), a.install(l, ...u)) : ee(a) && (c.add(a), a(l, ...u))), l;
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), l;
      },
      component(a, u) {
        return u ? (o.components[a] = u, l) : o.components[a];
      },
      directive(a, u) {
        return u ? (o.directives[a] = u, l) : o.directives[a];
      },
      mount(a, u, f) {
        if (!i) {
          const h = pe(
            r,
            s
          );
          return h.appContext = o, u && e ? e(h, a) : t(h, a, f), i = !0, l._container = a, a.__vue_app__ = l, gr(h.component) || h.component.proxy;
        }
      },
      unmount() {
        i && (t(null, l._container), delete l._container.__vue_app__);
      },
      provide(a, u) {
        return o.provides[a] = u, l;
      },
      runWithContext(a) {
        Xn = l;
        try {
          return a();
        } finally {
          Xn = null;
        }
      }
    };
    return l;
  };
}
let Xn = null;
function Xa(t, e) {
  if (xe) {
    let n = xe.provides;
    const r = xe.parent && xe.parent.provides;
    r === n && (n = xe.provides = Object.create(r)), n[t] = e;
  }
}
function jt(t, e, n = !1) {
  const r = xe || Ee;
  if (r || Xn) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Xn._context.provides;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && ee(e) ? e.call(r && r.proxy) : e;
  }
}
function Qa(t, e, n, r = !1) {
  const s = {}, o = {};
  Gn(o, dr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), _i(t, e, s, o);
  for (const c in t.propsOptions[0])
    c in s || (s[c] = void 0);
  n ? t.props = r ? s : la(s) : t.type.props ? t.props = s : t.props = o, t.attrs = o;
}
function eu(t, e, n, r) {
  const {
    props: s,
    attrs: o,
    vnode: { patchFlag: c }
  } = t, i = ce(s), [l] = t.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const u = t.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (ur(t.emitsOptions, h))
          continue;
        const d = e[h];
        if (l)
          if (se(o, h))
            d !== o[h] && (o[h] = d, a = !0);
          else {
            const k = Gt(h);
            s[k] = as(
              l,
              i,
              k,
              d,
              t,
              !1
              /* isAbsent */
            );
          }
        else
          d !== o[h] && (o[h] = d, a = !0);
      }
    }
  } else {
    _i(t, e, s, o) && (a = !0);
    let u;
    for (const f in i)
      (!e || // for camelCase
      !se(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Mt(f)) === f || !se(e, u))) && (l ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[u] !== void 0) && (s[f] = as(
        l,
        i,
        f,
        void 0,
        t,
        !0
        /* isAbsent */
      )) : delete s[f]);
    if (o !== i)
      for (const f in o)
        (!e || !se(e, f)) && (delete o[f], a = !0);
  }
  a && tt(t, "set", "$attrs");
}
function _i(t, e, n, r) {
  const [s, o] = t.propsOptions;
  let c = !1, i;
  if (e)
    for (let l in e) {
      if (Hn(l))
        continue;
      const a = e[l];
      let u;
      s && se(s, u = Gt(l)) ? !o || !o.includes(u) ? n[u] = a : (i || (i = {}))[u] = a : ur(t.emitsOptions, l) || (!(l in r) || a !== r[l]) && (r[l] = a, c = !0);
    }
  if (o) {
    const l = ce(n), a = i || ue;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = as(
        s,
        l,
        f,
        a[f],
        t,
        !se(a, f)
      );
    }
  }
  return c;
}
function as(t, e, n, r, s, o) {
  const c = t[n];
  if (c != null) {
    const i = se(c, "default");
    if (i && r === void 0) {
      const l = c.default;
      if (c.type !== Function && !c.skipFactory && ee(l)) {
        const { propsDefaults: a } = s;
        n in a ? r = a[n] : (Wt(s), r = a[n] = l.call(
          null,
          e
        ), St());
      } else
        r = l;
    }
    c[
      0
      /* shouldCast */
    ] && (o && !i ? r = !1 : c[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Mt(n)) && (r = !0));
  }
  return r;
}
function bi(t, e, n = !1) {
  const r = e.propsCache, s = r.get(t);
  if (s)
    return s;
  const o = t.props, c = {}, i = [];
  let l = !1;
  if (!ee(t)) {
    const u = (f) => {
      l = !0;
      const [h, d] = bi(f, e, !0);
      me(c, h), d && i.push(...d);
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  if (!o && !l)
    return fe(t) && r.set(t, Bt), Bt;
  if (Z(o))
    for (let u = 0; u < o.length; u++) {
      const f = Gt(o[u]);
      mo(f) && (c[f] = ue);
    }
  else if (o)
    for (const u in o) {
      const f = Gt(u);
      if (mo(f)) {
        const h = o[u], d = c[f] = Z(h) || ee(h) ? { type: h } : me({}, h);
        if (d) {
          const k = vo(Boolean, d.type), b = vo(String, d.type);
          d[
            0
            /* shouldCast */
          ] = k > -1, d[
            1
            /* shouldCastTrue */
          ] = b < 0 || k < b, (k > -1 || se(d, "default")) && i.push(f);
        }
      }
    }
  const a = [c, i];
  return fe(t) && r.set(t, a), a;
}
function mo(t) {
  return t[0] !== "$";
}
function _o(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function bo(t, e) {
  return _o(t) === _o(e);
}
function vo(t, e) {
  return Z(e) ? e.findIndex((n) => bo(n, t)) : ee(e) && bo(e, t) ? 0 : -1;
}
const vi = (t) => t[0] === "_" || t === "$stable", Ms = (t) => Z(t) ? t.map(Ge) : [Ge(t)], tu = (t, e, n) => {
  if (e._n)
    return e;
  const r = ft((...s) => Ms(e(...s)), n);
  return r._c = !1, r;
}, xi = (t, e, n) => {
  const r = t._ctx;
  for (const s in t) {
    if (vi(s))
      continue;
    const o = t[s];
    if (ee(o))
      e[s] = tu(s, o, r);
    else if (o != null) {
      const c = Ms(o);
      e[s] = () => c;
    }
  }
}, yi = (t, e) => {
  const n = Ms(e);
  t.slots.default = () => n;
}, nu = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = ce(e), Gn(e, "_", n)) : xi(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && yi(t, e);
  Gn(t.slots, dr, 1);
}, ru = (t, e, n) => {
  const { vnode: r, slots: s } = t;
  let o = !0, c = ue;
  if (r.shapeFlag & 32) {
    const i = e._;
    i ? n && i === 1 ? o = !1 : (me(s, e), !n && i === 1 && delete s._) : (o = !e.$stable, xi(e, s)), c = e;
  } else
    e && (yi(t, e), c = { default: 1 });
  if (o)
    for (const i in s)
      !vi(i) && !(i in c) && delete s[i];
};
function us(t, e, n, r, s = !1) {
  if (Z(t)) {
    t.forEach(
      (h, d) => us(
        h,
        e && (Z(e) ? e[d] : e),
        n,
        r,
        s
      )
    );
    return;
  }
  if (hn(r) && !s)
    return;
  const o = r.shapeFlag & 4 ? gr(r.component) || r.component.proxy : r.el, c = s ? null : o, { i, r: l } = t, a = e && e.r, u = i.refs === ue ? i.refs = {} : i.refs, f = i.setupState;
  if (a != null && a !== l && (_e(a) ? (u[a] = null, se(f, a) && (f[a] = null)) : ye(a) && (a.value = null)), ee(l))
    ut(l, i, 12, [c, u]);
  else {
    const h = _e(l), d = ye(l);
    if (h || d) {
      const k = () => {
        if (t.f) {
          const b = h ? se(f, l) ? f[l] : u[l] : l.value;
          s ? Z(b) && ms(b, o) : Z(b) ? b.includes(o) || b.push(o) : h ? (u[l] = [o], se(f, l) && (f[l] = u[l])) : (l.value = [o], t.k && (u[t.k] = l.value));
        } else
          h ? (u[l] = c, se(f, l) && (f[l] = c)) : d && (l.value = c, t.k && (u[t.k] = c));
      };
      c ? (k.id = -1, Te(k, n)) : k();
    }
  }
}
const Te = Da;
function su(t) {
  return ou(t);
}
function ou(t, e) {
  const n = Qr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: o,
    createElement: c,
    createText: i,
    createComment: l,
    setText: a,
    setElementText: u,
    parentNode: f,
    nextSibling: h,
    setScopeId: d = Je,
    insertStaticContent: k
  } = t, b = (p, g, _, E = null, x = null, M = null, O = !1, m = null, F = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !kt(p, g) && (E = dt(p), ae(p, x, M, !0), p = null), g.patchFlag === -2 && (F = !1, g.dynamicChildren = null);
    const { type: y, ref: L, shapeFlag: P } = g;
    switch (y) {
      case pr:
        I(p, g, _, E);
        break;
      case Le:
        T(p, g, _, E);
        break;
      case Mr:
        p == null && C(g, _, E, O);
        break;
      case Re:
        B(
          p,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        break;
      default:
        P & 1 ? j(
          p,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        ) : P & 6 ? re(
          p,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        ) : (P & 64 || P & 128) && y.process(
          p,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F,
          Qe
        );
    }
    L != null && x && us(L, p && p.ref, M, g || p, !g);
  }, I = (p, g, _, E) => {
    if (p == null)
      r(
        g.el = i(g.children),
        _,
        E
      );
    else {
      const x = g.el = p.el;
      g.children !== p.children && a(x, g.children);
    }
  }, T = (p, g, _, E) => {
    p == null ? r(
      g.el = l(g.children || ""),
      _,
      E
    ) : g.el = p.el;
  }, C = (p, g, _, E) => {
    [p.el, p.anchor] = k(
      p.children,
      g,
      _,
      E,
      p.el,
      p.anchor
    );
  }, N = ({ el: p, anchor: g }, _, E) => {
    let x;
    for (; p && p !== g; )
      x = h(p), r(p, _, E), p = x;
    r(g, _, E);
  }, A = ({ el: p, anchor: g }) => {
    let _;
    for (; p && p !== g; )
      _ = h(p), s(p), p = _;
    s(g);
  }, j = (p, g, _, E, x, M, O, m, F) => {
    O = O || g.type === "svg", p == null ? q(
      g,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ) : X(
      p,
      g,
      x,
      M,
      O,
      m,
      F
    );
  }, q = (p, g, _, E, x, M, O, m) => {
    let F, y;
    const { type: L, props: P, shapeFlag: U, transition: K, dirs: Q } = p;
    if (F = p.el = c(
      p.type,
      M,
      P && P.is,
      P
    ), U & 8 ? u(F, p.children) : U & 16 && $(
      p.children,
      F,
      null,
      E,
      x,
      M && L !== "foreignObject",
      O,
      m
    ), Q && mt(p, null, E, "created"), W(F, p, p.scopeId, O, E), P) {
      for (const R in P)
        R !== "value" && !Hn(R) && o(
          F,
          R,
          null,
          P[R],
          M,
          p.children,
          E,
          x,
          de
        );
      "value" in P && o(F, "value", null, P.value), (y = P.onVnodeBeforeMount) && Ve(y, E, p);
    }
    Q && mt(p, null, E, "beforeMount");
    const w = (!x || x && !x.pendingBranch) && K && !K.persisted;
    w && K.beforeEnter(F), r(F, g, _), ((y = P && P.onVnodeMounted) || w || Q) && Te(() => {
      y && Ve(y, E, p), w && K.enter(F), Q && mt(p, null, E, "mounted");
    }, x);
  }, W = (p, g, _, E, x) => {
    if (_ && d(p, _), E)
      for (let M = 0; M < E.length; M++)
        d(p, E[M]);
    if (x) {
      let M = x.subTree;
      if (g === M) {
        const O = x.vnode;
        W(
          p,
          O,
          O.scopeId,
          O.slotScopeIds,
          x.parent
        );
      }
    }
  }, $ = (p, g, _, E, x, M, O, m, F = 0) => {
    for (let y = F; y < p.length; y++) {
      const L = p[y] = m ? ct(p[y]) : Ge(p[y]);
      b(
        null,
        L,
        g,
        _,
        E,
        x,
        M,
        O,
        m
      );
    }
  }, X = (p, g, _, E, x, M, O) => {
    const m = g.el = p.el;
    let { patchFlag: F, dynamicChildren: y, dirs: L } = g;
    F |= p.patchFlag & 16;
    const P = p.props || ue, U = g.props || ue;
    let K;
    _ && _t(_, !1), (K = U.onVnodeBeforeUpdate) && Ve(K, _, g, p), L && mt(g, p, _, "beforeUpdate"), _ && _t(_, !0);
    const Q = x && g.type !== "foreignObject";
    if (y ? z(
      p.dynamicChildren,
      y,
      m,
      _,
      E,
      Q,
      M
    ) : O || S(
      p,
      g,
      m,
      null,
      _,
      E,
      Q,
      M,
      !1
    ), F > 0) {
      if (F & 16)
        J(
          m,
          g,
          P,
          U,
          _,
          E,
          x
        );
      else if (F & 2 && P.class !== U.class && o(m, "class", null, U.class, x), F & 4 && o(m, "style", P.style, U.style, x), F & 8) {
        const w = g.dynamicProps;
        for (let R = 0; R < w.length; R++) {
          const H = w[R], Y = P[H], he = U[H];
          (he !== Y || H === "value") && o(
            m,
            H,
            Y,
            he,
            x,
            p.children,
            _,
            E,
            de
          );
        }
      }
      F & 1 && p.children !== g.children && u(m, g.children);
    } else
      !O && y == null && J(
        m,
        g,
        P,
        U,
        _,
        E,
        x
      );
    ((K = U.onVnodeUpdated) || L) && Te(() => {
      K && Ve(K, _, g, p), L && mt(g, p, _, "updated");
    }, E);
  }, z = (p, g, _, E, x, M, O) => {
    for (let m = 0; m < g.length; m++) {
      const F = p[m], y = g[m], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        F.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (F.type === Re || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !kt(F, y) || // - In the case of a component, it could contain anything.
        F.shapeFlag & 70) ? f(F.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      b(
        F,
        y,
        L,
        null,
        E,
        x,
        M,
        O,
        !0
      );
    }
  }, J = (p, g, _, E, x, M, O) => {
    if (_ !== E) {
      if (_ !== ue)
        for (const m in _)
          !Hn(m) && !(m in E) && o(
            p,
            m,
            _[m],
            null,
            O,
            g.children,
            x,
            M,
            de
          );
      for (const m in E) {
        if (Hn(m))
          continue;
        const F = E[m], y = _[m];
        F !== y && m !== "value" && o(
          p,
          m,
          y,
          F,
          O,
          g.children,
          x,
          M,
          de
        );
      }
      "value" in E && o(p, "value", _.value, E.value);
    }
  }, B = (p, g, _, E, x, M, O, m, F) => {
    const y = g.el = p ? p.el : i(""), L = g.anchor = p ? p.anchor : i("");
    let { patchFlag: P, dynamicChildren: U, slotScopeIds: K } = g;
    K && (m = m ? m.concat(K) : K), p == null ? (r(y, _, E), r(L, _, E), $(
      g.children,
      _,
      L,
      x,
      M,
      O,
      m,
      F
    )) : P > 0 && P & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (z(
      p.dynamicChildren,
      U,
      _,
      x,
      M,
      O,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || x && g === x.subTree) && ki(
      p,
      g,
      !0
      /* shallow */
    )) : S(
      p,
      g,
      _,
      L,
      x,
      M,
      O,
      m,
      F
    );
  }, re = (p, g, _, E, x, M, O, m, F) => {
    g.slotScopeIds = m, p == null ? g.shapeFlag & 512 ? x.ctx.activate(
      g,
      _,
      E,
      O,
      F
    ) : D(
      g,
      _,
      E,
      x,
      M,
      O,
      F
    ) : ne(p, g, F);
  }, D = (p, g, _, E, x, M, O) => {
    const m = p.component = du(
      p,
      E,
      x
    );
    if (fr(p) && (m.ctx.renderer = Qe), mu(m), m.asyncDep) {
      if (x && x.registerDep(m, V), !p.el) {
        const F = m.subTree = pe(Le);
        T(null, F, g, _);
      }
      return;
    }
    V(
      m,
      p,
      g,
      _,
      x,
      M,
      O
    );
  }, ne = (p, g, _) => {
    const E = g.component = p.component;
    if (Ca(p, g, _))
      if (E.asyncDep && !E.asyncResolved) {
        v(E, g, _);
        return;
      } else
        E.next = g, va(E.update), E.update();
    else
      g.el = p.el, E.vnode = g;
  }, V = (p, g, _, E, x, M, O) => {
    const m = () => {
      if (p.isMounted) {
        let { next: L, bu: P, u: U, parent: K, vnode: Q } = p, w = L, R;
        _t(p, !1), L ? (L.el = Q.el, v(p, L, O)) : L = Q, P && jn(P), (R = L.props && L.props.onVnodeBeforeUpdate) && Ve(R, K, L, Q), _t(p, !0);
        const H = Dr(p), Y = p.subTree;
        p.subTree = H, b(
          Y,
          H,
          // parent may have changed if it's in a teleport
          f(Y.el),
          // anchor may have changed if it's in a fragment
          dt(Y),
          p,
          x,
          M
        ), L.el = H.el, w === null && Aa(p, H.el), U && Te(U, x), (R = L.props && L.props.onVnodeUpdated) && Te(
          () => Ve(R, K, L, Q),
          x
        );
      } else {
        let L;
        const { el: P, props: U } = g, { bm: K, m: Q, parent: w } = p, R = hn(g);
        if (_t(p, !1), K && jn(K), !R && (L = U && U.onVnodeBeforeMount) && Ve(L, w, g), _t(p, !0), P && sn) {
          const H = () => {
            p.subTree = Dr(p), sn(
              P,
              p.subTree,
              p,
              x,
              null
            );
          };
          R ? g.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !p.isUnmounted && H()
          ) : H();
        } else {
          const H = p.subTree = Dr(p);
          b(
            null,
            H,
            _,
            E,
            p,
            x,
            M
          ), g.el = H.el;
        }
        if (Q && Te(Q, x), !R && (L = U && U.onVnodeMounted)) {
          const H = g;
          Te(
            () => Ve(L, w, H),
            x
          );
        }
        (g.shapeFlag & 256 || w && hn(w.vnode) && w.vnode.shapeFlag & 256) && p.a && Te(p.a, x), p.isMounted = !0, g = _ = E = null;
      }
    }, F = p.effect = new ys(
      m,
      () => Ts(y),
      p.scope
      // track it in component's effect scope
    ), y = p.update = () => F.run();
    y.id = p.uid, _t(p, !0), y();
  }, v = (p, g, _) => {
    g.component = p;
    const E = p.vnode.props;
    p.vnode = g, p.next = null, eu(p, g.props, E, _), ru(p, g.children, _), Yt(), io(), Xt();
  }, S = (p, g, _, E, x, M, O, m, F = !1) => {
    const y = p && p.children, L = p ? p.shapeFlag : 0, P = g.children, { patchFlag: U, shapeFlag: K } = g;
    if (U > 0) {
      if (U & 128) {
        te(
          y,
          P,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        return;
      } else if (U & 256) {
        G(
          y,
          P,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        return;
      }
    }
    K & 8 ? (L & 16 && de(y, x, M), P !== y && u(_, P)) : L & 16 ? K & 16 ? te(
      y,
      P,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ) : de(y, x, M, !0) : (L & 8 && u(_, ""), K & 16 && $(
      P,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ));
  }, G = (p, g, _, E, x, M, O, m, F) => {
    p = p || Bt, g = g || Bt;
    const y = p.length, L = g.length, P = Math.min(y, L);
    let U;
    for (U = 0; U < P; U++) {
      const K = g[U] = F ? ct(g[U]) : Ge(g[U]);
      b(
        p[U],
        K,
        _,
        null,
        x,
        M,
        O,
        m,
        F
      );
    }
    y > L ? de(
      p,
      x,
      M,
      !0,
      !1,
      P
    ) : $(
      g,
      _,
      E,
      x,
      M,
      O,
      m,
      F,
      P
    );
  }, te = (p, g, _, E, x, M, O, m, F) => {
    let y = 0;
    const L = g.length;
    let P = p.length - 1, U = L - 1;
    for (; y <= P && y <= U; ) {
      const K = p[y], Q = g[y] = F ? ct(g[y]) : Ge(g[y]);
      if (kt(K, Q))
        b(
          K,
          Q,
          _,
          null,
          x,
          M,
          O,
          m,
          F
        );
      else
        break;
      y++;
    }
    for (; y <= P && y <= U; ) {
      const K = p[P], Q = g[U] = F ? ct(g[U]) : Ge(g[U]);
      if (kt(K, Q))
        b(
          K,
          Q,
          _,
          null,
          x,
          M,
          O,
          m,
          F
        );
      else
        break;
      P--, U--;
    }
    if (y > P) {
      if (y <= U) {
        const K = U + 1, Q = K < L ? g[K].el : E;
        for (; y <= U; )
          b(
            null,
            g[y] = F ? ct(g[y]) : Ge(g[y]),
            _,
            Q,
            x,
            M,
            O,
            m,
            F
          ), y++;
      }
    } else if (y > U)
      for (; y <= P; )
        ae(p[y], x, M, !0), y++;
    else {
      const K = y, Q = y, w = /* @__PURE__ */ new Map();
      for (y = Q; y <= U; y++) {
        const Me = g[y] = F ? ct(g[y]) : Ge(g[y]);
        Me.key != null && w.set(Me.key, y);
      }
      let R, H = 0;
      const Y = U - Q + 1;
      let he = !1, Ne = 0;
      const gt = new Array(Y);
      for (y = 0; y < Y; y++)
        gt[y] = 0;
      for (y = K; y <= P; y++) {
        const Me = p[y];
        if (H >= Y) {
          ae(Me, x, M, !0);
          continue;
        }
        let je;
        if (Me.key != null)
          je = w.get(Me.key);
        else
          for (R = Q; R <= U; R++)
            if (gt[R - Q] === 0 && kt(Me, g[R])) {
              je = R;
              break;
            }
        je === void 0 ? ae(Me, x, M, !0) : (gt[je - Q] = y + 1, je >= Ne ? Ne = je : he = !0, b(
          Me,
          g[je],
          _,
          null,
          x,
          M,
          O,
          m,
          F
        ), H++);
      }
      const qn = he ? cu(gt) : Bt;
      for (R = qn.length - 1, y = Y - 1; y >= 0; y--) {
        const Me = Q + y, je = g[Me], Xs = Me + 1 < L ? g[Me + 1].el : E;
        gt[y] === 0 ? b(
          null,
          je,
          _,
          Xs,
          x,
          M,
          O,
          m,
          F
        ) : he && (R < 0 || y !== qn[R] ? ie(je, _, Xs, 2) : R--);
      }
    }
  }, ie = (p, g, _, E, x = null) => {
    const { el: M, type: O, transition: m, children: F, shapeFlag: y } = p;
    if (y & 6) {
      ie(p.component.subTree, g, _, E);
      return;
    }
    if (y & 128) {
      p.suspense.move(g, _, E);
      return;
    }
    if (y & 64) {
      O.move(p, g, _, Qe);
      return;
    }
    if (O === Re) {
      r(M, g, _);
      for (let P = 0; P < F.length; P++)
        ie(F[P], g, _, E);
      r(p.anchor, g, _);
      return;
    }
    if (O === Mr) {
      N(p, g, _);
      return;
    }
    if (E !== 2 && y & 1 && m)
      if (E === 0)
        m.beforeEnter(M), r(M, g, _), Te(() => m.enter(M), x);
      else {
        const { leave: P, delayLeave: U, afterLeave: K } = m, Q = () => r(M, g, _), w = () => {
          P(M, () => {
            Q(), K && K();
          });
        };
        U ? U(M, Q, w) : w();
      }
    else
      r(M, g, _);
  }, ae = (p, g, _, E = !1, x = !1) => {
    const {
      type: M,
      props: O,
      ref: m,
      children: F,
      dynamicChildren: y,
      shapeFlag: L,
      patchFlag: P,
      dirs: U
    } = p;
    if (m != null && us(m, null, _, p, !0), L & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const K = L & 1 && U, Q = !hn(p);
    let w;
    if (Q && (w = O && O.onVnodeBeforeUnmount) && Ve(w, g, p), L & 6)
      Ce(p.component, _, E);
    else {
      if (L & 128) {
        p.suspense.unmount(_, E);
        return;
      }
      K && mt(p, null, g, "beforeUnmount"), L & 64 ? p.type.remove(
        p,
        g,
        _,
        x,
        Qe,
        E
      ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (M !== Re || P > 0 && P & 64) ? de(
        y,
        g,
        _,
        !1,
        !0
      ) : (M === Re && P & 384 || !x && L & 16) && de(F, g, _), E && De(p);
    }
    (Q && (w = O && O.onVnodeUnmounted) || K) && Te(() => {
      w && Ve(w, g, p), K && mt(p, null, g, "unmounted");
    }, _);
  }, De = (p) => {
    const { type: g, el: _, anchor: E, transition: x } = p;
    if (g === Re) {
      It(_, E);
      return;
    }
    if (g === Mr) {
      A(p);
      return;
    }
    const M = () => {
      s(_), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (p.shapeFlag & 1 && x && !x.persisted) {
      const { leave: O, delayLeave: m } = x, F = () => O(_, M);
      m ? m(p.el, M, F) : F();
    } else
      M();
  }, It = (p, g) => {
    let _;
    for (; p !== g; )
      _ = h(p), s(p), p = _;
    s(g);
  }, Ce = (p, g, _) => {
    const { bum: E, scope: x, update: M, subTree: O, um: m } = p;
    E && jn(E), x.stop(), M && (M.active = !1, ae(O, p, g, _)), m && Te(m, g), Te(() => {
      p.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve());
  }, de = (p, g, _, E = !1, x = !1, M = 0) => {
    for (let O = M; O < p.length; O++)
      ae(p[O], g, _, E, x);
  }, dt = (p) => p.shapeFlag & 6 ? dt(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : h(p.anchor || p.el), nn = (p, g, _) => {
    p == null ? g._vnode && ae(g._vnode, null, null, !0) : b(g._vnode || null, p, g, null, null, null, _), io(), ni(), g._vnode = p;
  }, Qe = {
    p: b,
    um: ae,
    m: ie,
    r: De,
    mt: D,
    mc: $,
    pc: S,
    pbc: z,
    n: dt,
    o: t
  };
  let rn, sn;
  return e && ([rn, sn] = e(
    Qe
  )), {
    render: nn,
    hydrate: rn,
    createApp: Ya(nn, rn)
  };
}
function _t({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function ki(t, e, n = !1) {
  const r = t.children, s = e.children;
  if (Z(r) && Z(s))
    for (let o = 0; o < r.length; o++) {
      const c = r[o];
      let i = s[o];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[o] = ct(s[o]), i.el = c.el), n || ki(c, i)), i.type === pr && (i.el = c.el);
    }
}
function cu(t) {
  const e = t.slice(), n = [0];
  let r, s, o, c, i;
  const l = t.length;
  for (r = 0; r < l; r++) {
    const a = t[r];
    if (a !== 0) {
      if (s = n[n.length - 1], t[s] < a) {
        e[r] = s, n.push(r);
        continue;
      }
      for (o = 0, c = n.length - 1; o < c; )
        i = o + c >> 1, t[n[i]] < a ? o = i + 1 : c = i;
      a < t[n[o]] && (o > 0 && (e[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, c = n[o - 1]; o-- > 0; )
    n[o] = c, c = e[c];
  return n;
}
const iu = (t) => t.__isTeleport, Re = Symbol.for("v-fgt"), pr = Symbol.for("v-txt"), Le = Symbol.for("v-cmt"), Mr = Symbol.for("v-stc"), gn = [];
let ze = null;
function oe(t = !1) {
  gn.push(ze = t ? null : []);
}
function lu() {
  gn.pop(), ze = gn[gn.length - 1] || null;
}
let kn = 1;
function xo(t) {
  kn += t;
}
function Ei(t) {
  return t.dynamicChildren = kn > 0 ? ze || Bt : null, lu(), kn > 0 && ze && ze.push(t), t;
}
function be(t, e, n, r, s, o) {
  return Ei(
    we(
      t,
      e,
      n,
      r,
      s,
      o,
      !0
      /* isBlock */
    )
  );
}
function Se(t, e, n, r, s) {
  return Ei(
    pe(
      t,
      e,
      n,
      r,
      s,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Qn(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function kt(t, e) {
  return t.type === e.type && t.key === e.key;
}
const dr = "__vInternal", wi = ({ key: t }) => t ?? null, Vn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? _e(t) || ye(t) || ee(t) ? { i: Ee, r: t, k: e, f: !!n } : t : null);
function we(t, e = null, n = null, r = 0, s = null, o = t === Re ? 0 : 1, c = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && wi(e),
    ref: e && Vn(e),
    scopeId: oi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee
  };
  return i ? (Is(l, n), o & 128 && t.normalize(l)) : n && (l.shapeFlag |= _e(n) ? 8 : 16), kn > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && ze.push(l), l;
}
const pe = au;
function au(t, e = null, n = null, r = 0, s = null, o = !1) {
  if ((!t || t === Ha) && (t = Le), Qn(t)) {
    const i = pt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Is(i, n), kn > 0 && !o && ze && (i.shapeFlag & 6 ? ze[ze.indexOf(t)] = i : ze.push(i)), i.patchFlag |= -2, i;
  }
  if (xu(t) && (t = t.__vccOpts), e) {
    e = uu(e);
    let { class: i, style: l } = e;
    i && !_e(i) && (e.class = Sn(i)), fe(l) && (Wc(l) && !Z(l) && (l = me({}, l)), e.style = vs(l));
  }
  const c = _e(t) ? 1 : Sa(t) ? 128 : iu(t) ? 64 : fe(t) ? 4 : ee(t) ? 2 : 0;
  return we(
    t,
    e,
    n,
    r,
    s,
    c,
    o,
    !0
  );
}
function uu(t) {
  return t ? Wc(t) || dr in t ? me({}, t) : t : null;
}
function pt(t, e, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: c } = t, i = e ? fu(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: i,
    key: i && wi(i),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? Z(s) ? s.concat(Vn(e)) : [s, Vn(e)] : Vn(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: c,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Re ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && pt(t.ssContent),
    ssFallback: t.ssFallback && pt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Ns(t = " ", e = 0) {
  return pe(pr, null, t, e);
}
function mn(t = "", e = !1) {
  return e ? (oe(), Se(Le, null, t)) : pe(Le, null, t);
}
function Ge(t) {
  return t == null || typeof t == "boolean" ? pe(Le) : Z(t) ? pe(
    Re,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? ct(t) : pe(pr, null, String(t));
}
function ct(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : pt(t);
}
function Is(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (Z(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Is(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !(dr in e) ? e._ctx = Ee : s === 3 && Ee && (Ee.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    ee(e) ? (e = { default: e, _ctx: Ee }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Ns(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function fu(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = Sn([e.class, r.class]));
      else if (s === "style")
        e.style = vs([e.style, r.style]);
      else if (or(s)) {
        const o = e[s], c = r[s];
        c && o !== c && !(Z(o) && o.includes(c)) && (e[s] = o ? [].concat(o, c) : c);
      } else
        s !== "" && (e[s] = r[s]);
  }
  return e;
}
function Ve(t, e, n, r = null) {
  Fe(t, e, 7, [
    n,
    r
  ]);
}
const hu = mi();
let pu = 0;
function du(t, e, n) {
  const r = t.type, s = (e ? e.appContext : t.appContext) || hu, o = {
    uid: pu++,
    vnode: t,
    type: r,
    parent: e,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ml(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: bi(r, s),
    emitsOptions: si(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ue,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ue,
    data: ue,
    props: ue,
    attrs: ue,
    slots: ue,
    refs: ue,
    setupState: ue,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = e ? e.root : o, o.emit = ka.bind(null, o), t.ce && t.ce(o), o;
}
let xe = null;
const gu = () => xe || Ee;
let Fs, Ft, yo = "__VUE_INSTANCE_SETTERS__";
(Ft = Qr()[yo]) || (Ft = Qr()[yo] = []), Ft.push((t) => xe = t), Fs = (t) => {
  Ft.length > 1 ? Ft.forEach((e) => e(t)) : Ft[0](t);
};
const Wt = (t) => {
  Fs(t), t.scope.on();
}, St = () => {
  xe && xe.scope.off(), Fs(null);
};
function Ci(t) {
  return t.vnode.shapeFlag & 4;
}
let En = !1;
function mu(t, e = !1) {
  En = e;
  const { props: n, children: r } = t.vnode, s = Ci(t);
  Qa(t, n, s, e), nu(t, r);
  const o = s ? _u(t, e) : void 0;
  return En = !1, o;
}
function _u(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = Jc(new Proxy(t.ctx, ja));
  const { setup: r } = n;
  if (r) {
    const s = t.setupContext = r.length > 1 ? vu(t) : null;
    Wt(t), Yt();
    const o = ut(
      r,
      t,
      0,
      [t.props, s]
    );
    if (Xt(), St(), Mc(o)) {
      if (o.then(St, St), e)
        return o.then((c) => {
          ko(t, c, e);
        }).catch((c) => {
          ar(c, t, 0);
        });
      t.asyncDep = o;
    } else
      ko(t, o, e);
  } else
    Ai(t, e);
}
function ko(t, e, n) {
  ee(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : fe(e) && (t.setupState = Qc(e)), Ai(t, n);
}
let Eo;
function Ai(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && Eo && !r.render) {
      const s = r.template || qs(t).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: c } = t.appContext.config, { delimiters: i, compilerOptions: l } = r, a = me(
          me(
            {
              isCustomElement: o,
              delimiters: i
            },
            c
          ),
          l
        );
        r.render = Eo(s, a);
      }
    }
    t.render = r.render || Je;
  }
  Wt(t), Yt(), Va(t), Xt(), St();
}
function bu(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, n) {
        return qe(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function vu(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return bu(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function gr(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Qc(Jc(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in dn)
          return dn[n](t);
      },
      has(e, n) {
        return n in e || n in dn;
      }
    }));
}
function xu(t) {
  return ee(t) && "__vccOpts" in t;
}
const Tt = (t, e) => ma(t, e, En);
function Si(t, e, n) {
  const r = arguments.length;
  return r === 2 ? fe(e) && !Z(e) ? Qn(e) ? pe(t, null, [e]) : pe(t, e) : pe(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Qn(n) && (n = [n]), pe(t, e, n));
}
const yu = Symbol.for("v-scx"), ku = () => jt(yu), Eu = "3.3.4", wu = "http://www.w3.org/2000/svg", Et = typeof document < "u" ? document : null, wo = Et && /* @__PURE__ */ Et.createElement("template"), Cu = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const s = e ? Et.createElementNS(wu, t) : Et.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (t) => Et.createTextNode(t),
  createComment: (t) => Et.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Et.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, s, o) {
    const c = n ? n.previousSibling : e.lastChild;
    if (s && (s === o || s.nextSibling))
      for (; e.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); )
        ;
    else {
      wo.innerHTML = r ? `<svg>${t}</svg>` : t;
      const i = wo.content;
      if (r) {
        const l = i.firstChild;
        for (; l.firstChild; )
          i.appendChild(l.firstChild);
        i.removeChild(l);
      }
      e.insertBefore(i, n);
    }
    return [
      // first
      c ? c.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
};
function Au(t, e, n) {
  const r = t._vtc;
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
function Su(t, e, n) {
  const r = t.style, s = _e(n);
  if (n && !s) {
    if (e && !_e(e))
      for (const o in e)
        n[o] == null && fs(r, o, "");
    for (const o in n)
      fs(r, o, n[o]);
  } else {
    const o = r.display;
    s ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"), "_vod" in t && (r.display = o);
  }
}
const Co = /\s*!important$/;
function fs(t, e, n) {
  if (Z(n))
    n.forEach((r) => fs(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Du(t, e);
    Co.test(n) ? t.setProperty(
      Mt(r),
      n.replace(Co, ""),
      "important"
    ) : t[r] = n;
  }
}
const Ao = ["Webkit", "Moz", "ms"], Nr = {};
function Du(t, e) {
  const n = Nr[e];
  if (n)
    return n;
  let r = Gt(e);
  if (r !== "filter" && r in t)
    return Nr[e] = r;
  r = Fc(r);
  for (let s = 0; s < Ao.length; s++) {
    const o = Ao[s] + r;
    if (o in t)
      return Nr[e] = o;
  }
  return e;
}
const So = "http://www.w3.org/1999/xlink";
function Tu(t, e, n, r, s) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(So, e.slice(6, e.length)) : t.setAttributeNS(So, e, n);
  else {
    const o = ql(e);
    n == null || o && !Lc(n) ? t.removeAttribute(e) : t.setAttribute(e, o ? "" : n);
  }
}
function Ru(t, e, n, r, s, o, c) {
  if (e === "innerHTML" || e === "textContent") {
    r && c(r, s, o), t[e] = n ?? "";
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    t._value = n;
    const a = i === "OPTION" ? t.getAttribute("value") : t.value, u = n ?? "";
    a !== u && (t.value = u), n == null && t.removeAttribute(e);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof t[e];
    a === "boolean" ? n = Lc(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  l && t.removeAttribute(e);
}
function Pt(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function qu(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
function Mu(t, e, n, r, s = null) {
  const o = t._vei || (t._vei = {}), c = o[e];
  if (r && c)
    c.value = r;
  else {
    const [i, l] = Nu(e);
    if (r) {
      const a = o[e] = Lu(r, s);
      Pt(t, i, a, l);
    } else
      c && (qu(t, i, c, l), o[e] = void 0);
  }
}
const Do = /(?:Once|Passive|Capture)$/;
function Nu(t) {
  let e;
  if (Do.test(t)) {
    e = {};
    let r;
    for (; r = t.match(Do); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Mt(t.slice(2)), e];
}
let Ir = 0;
const Iu = /* @__PURE__ */ Promise.resolve(), Fu = () => Ir || (Iu.then(() => Ir = 0), Ir = Date.now());
function Lu(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Fe(
      Ou(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = Fu(), n;
}
function Ou(t, e) {
  if (Z(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (s) => !s._stopped && r && r(s));
  } else
    return e;
}
const To = /^on[a-z]/, Pu = (t, e, n, r, s = !1, o, c, i, l) => {
  e === "class" ? Au(t, r, s) : e === "style" ? Su(t, n, r) : or(e) ? gs(e) || Mu(t, e, n, r, c) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Bu(t, e, r, s)) ? Ru(
    t,
    e,
    r,
    o,
    c,
    i,
    l
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), Tu(t, e, r, s));
};
function Bu(t, e, n, r) {
  return r ? !!(e === "innerHTML" || e === "textContent" || e in t && To.test(e) && ee(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || To.test(e) && _e(n) ? !1 : e in t;
}
const st = "transition", on = "animation", er = (t, { slots: e }) => Si(Ma, $u(t), e);
er.displayName = "Transition";
const Di = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
er.props = /* @__PURE__ */ me(
  {},
  ai,
  Di
);
const bt = (t, e = []) => {
  Z(t) ? t.forEach((n) => n(...e)) : t && t(...e);
}, Ro = (t) => t ? Z(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
function $u(t) {
  const e = {};
  for (const B in t)
    B in Di || (e[B] = t[B]);
  if (t.css === !1)
    return e;
  const {
    name: n = "v",
    type: r,
    duration: s,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: c = `${n}-enter-active`,
    enterToClass: i = `${n}-enter-to`,
    appearFromClass: l = o,
    appearActiveClass: a = c,
    appearToClass: u = i,
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: h = `${n}-leave-active`,
    leaveToClass: d = `${n}-leave-to`
  } = t, k = zu(s), b = k && k[0], I = k && k[1], {
    onBeforeEnter: T,
    onEnter: C,
    onEnterCancelled: N,
    onLeave: A,
    onLeaveCancelled: j,
    onBeforeAppear: q = T,
    onAppear: W = C,
    onAppearCancelled: $ = N
  } = e, X = (B, re, D) => {
    vt(B, re ? u : i), vt(B, re ? a : c), D && D();
  }, z = (B, re) => {
    B._isLeaving = !1, vt(B, f), vt(B, d), vt(B, h), re && re();
  }, J = (B) => (re, D) => {
    const ne = B ? W : C, V = () => X(re, B, D);
    bt(ne, [re, V]), qo(() => {
      vt(re, B ? l : o), ot(re, B ? u : i), Ro(ne) || Mo(re, r, b, V);
    });
  };
  return me(e, {
    onBeforeEnter(B) {
      bt(T, [B]), ot(B, o), ot(B, c);
    },
    onBeforeAppear(B) {
      bt(q, [B]), ot(B, l), ot(B, a);
    },
    onEnter: J(!1),
    onAppear: J(!0),
    onLeave(B, re) {
      B._isLeaving = !0;
      const D = () => z(B, re);
      ot(B, f), ju(), ot(B, h), qo(() => {
        B._isLeaving && (vt(B, f), ot(B, d), Ro(A) || Mo(B, r, I, D));
      }), bt(A, [B, D]);
    },
    onEnterCancelled(B) {
      X(B, !1), bt(N, [B]);
    },
    onAppearCancelled(B) {
      X(B, !0), bt($, [B]);
    },
    onLeaveCancelled(B) {
      z(B), bt(j, [B]);
    }
  });
}
function zu(t) {
  if (t == null)
    return null;
  if (fe(t))
    return [Fr(t.enter), Fr(t.leave)];
  {
    const e = Fr(t);
    return [e, e];
  }
}
function Fr(t) {
  return Cl(t);
}
function ot(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.add(n)), (t._vtc || (t._vtc = /* @__PURE__ */ new Set())).add(e);
}
function vt(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.remove(r));
  const { _vtc: n } = t;
  n && (n.delete(e), n.size || (t._vtc = void 0));
}
function qo(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Uu = 0;
function Mo(t, e, n, r) {
  const s = t._endId = ++Uu, o = () => {
    s === t._endId && r();
  };
  if (n)
    return setTimeout(o, n);
  const { type: c, timeout: i, propCount: l } = Hu(t, e);
  if (!c)
    return r();
  const a = c + "end";
  let u = 0;
  const f = () => {
    t.removeEventListener(a, h), o();
  }, h = (d) => {
    d.target === t && ++u >= l && f();
  };
  setTimeout(() => {
    u < l && f();
  }, i + 1), t.addEventListener(a, h);
}
function Hu(t, e) {
  const n = window.getComputedStyle(t), r = (k) => (n[k] || "").split(", "), s = r(`${st}Delay`), o = r(`${st}Duration`), c = No(s, o), i = r(`${on}Delay`), l = r(`${on}Duration`), a = No(i, l);
  let u = null, f = 0, h = 0;
  e === st ? c > 0 && (u = st, f = c, h = o.length) : e === on ? a > 0 && (u = on, f = a, h = l.length) : (f = Math.max(c, a), u = f > 0 ? c > a ? st : on : null, h = u ? u === st ? o.length : l.length : 0);
  const d = u === st && /\b(transform|all)(,|$)/.test(
    r(`${st}Property`).toString()
  );
  return {
    type: u,
    timeout: f,
    propCount: h,
    hasTransform: d
  };
}
function No(t, e) {
  for (; t.length < e.length; )
    t = t.concat(t);
  return Math.max(...e.map((n, r) => Io(n) + Io(t[r])));
}
function Io(t) {
  return Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function ju() {
  return document.body.offsetHeight;
}
const Fo = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return Z(e) ? (n) => jn(e, n) : e;
};
function Vu(t) {
  t.target.composing = !0;
}
function Lo(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Gu = {
  created(t, { modifiers: { lazy: e, trim: n, number: r } }, s) {
    t._assign = Fo(s);
    const o = r || s.props && s.props.type === "number";
    Pt(t, e ? "change" : "input", (c) => {
      if (c.target.composing)
        return;
      let i = t.value;
      n && (i = i.trim()), o && (i = Xr(i)), t._assign(i);
    }), n && Pt(t, "change", () => {
      t.value = t.value.trim();
    }), e || (Pt(t, "compositionstart", Vu), Pt(t, "compositionend", Lo), Pt(t, "change", Lo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, modifiers: { lazy: n, trim: r, number: s } }, o) {
    if (t._assign = Fo(o), t.composing || document.activeElement === t && t.type !== "range" && (n || r && t.value.trim() === e || (s || t.type === "number") && Xr(t.value) === e))
      return;
    const c = e ?? "";
    t.value !== c && (t.value = c);
  }
}, Zu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ku = (t, e) => (n) => {
  if (!("key" in n))
    return;
  const r = Mt(n.key);
  if (e.some((s) => s === r || Zu[s] === r))
    return t(n);
}, Wu = {
  beforeMount(t, { value: e }, { transition: n }) {
    t._vod = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : cn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), cn(t, !0), r.enter(t)) : r.leave(t, () => {
      cn(t, !1);
    }) : cn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    cn(t, e);
  }
};
function cn(t, e) {
  t.style.display = e ? t._vod : "none";
}
const Ju = /* @__PURE__ */ me({ patchProp: Pu }, Cu);
let Oo;
function Yu() {
  return Oo || (Oo = su(Ju));
}
const Xu = (...t) => {
  const e = Yu().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const s = Qu(r);
    if (!s)
      return;
    const o = e._component;
    !ee(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
    const c = n(s, !1, s instanceof SVGElement);
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), c;
  }, e;
};
function Qu(t) {
  return _e(t) ? document.querySelector(t) : t;
}
function Ti(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function ef(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
function Ri(t) {
  return t instanceof Map ? t.clear = t.delete = t.set = function() {
    throw new Error("map is read-only");
  } : t instanceof Set && (t.add = t.clear = t.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(t), Object.getOwnPropertyNames(t).forEach((e) => {
    const n = t[e], r = typeof n;
    (r === "object" || r === "function") && !Object.isFrozen(n) && Ri(n);
  }), t;
}
class Po {
  /**
   * @param {CompiledMode} mode
   */
  constructor(e) {
    e.data === void 0 && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function qi(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function lt(t, ...e) {
  const n = /* @__PURE__ */ Object.create(null);
  for (const r in t)
    n[r] = t[r];
  return e.forEach(function(r) {
    for (const s in r)
      n[s] = r[s];
  }), /** @type {T} */
  n;
}
const tf = "</span>", Bo = (t) => !!t.scope, nf = (t, { prefix: e }) => {
  if (t.startsWith("language:"))
    return t.replace("language:", "language-");
  if (t.includes(".")) {
    const n = t.split(".");
    return [
      `${e}${n.shift()}`,
      ...n.map((r, s) => `${r}${"_".repeat(s + 1)}`)
    ].join(" ");
  }
  return `${e}${t}`;
};
class rf {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(e, n) {
    this.buffer = "", this.classPrefix = n.classPrefix, e.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(e) {
    this.buffer += qi(e);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(e) {
    if (!Bo(e))
      return;
    const n = nf(
      e.scope,
      { prefix: this.classPrefix }
    );
    this.span(n);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(e) {
    Bo(e) && (this.buffer += tf);
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(e) {
    this.buffer += `<span class="${e}">`;
  }
}
const $o = (t = {}) => {
  const e = { children: [] };
  return Object.assign(e, t), e;
};
class Ls {
  constructor() {
    this.rootNode = $o(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(e) {
    this.top.children.push(e);
  }
  /** @param {string} scope */
  openNode(e) {
    const n = $o({ scope: e });
    this.add(n), this.stack.push(n);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(e) {
    return this.constructor._walk(e, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(e, n) {
    return typeof n == "string" ? e.addText(n) : n.children && (e.openNode(n), n.children.forEach((r) => this._walk(e, r)), e.closeNode(n)), e;
  }
  /**
   * @param {Node} node
   */
  static _collapse(e) {
    typeof e != "string" && e.children && (e.children.every((n) => typeof n == "string") ? e.children = [e.children.join("")] : e.children.forEach((n) => {
      Ls._collapse(n);
    }));
  }
}
class sf extends Ls {
  /**
   * @param {*} options
   */
  constructor(e) {
    super(), this.options = e;
  }
  /**
   * @param {string} text
   */
  addText(e) {
    e !== "" && this.add(e);
  }
  /** @param {string} scope */
  startScope(e) {
    this.openNode(e);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(e, n) {
    const r = e.root;
    n && (r.scope = `language:${n}`), this.add(r);
  }
  toHTML() {
    return new rf(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function wn(t) {
  return t ? typeof t == "string" ? t : t.source : null;
}
function Mi(t) {
  return Nt("(?=", t, ")");
}
function of(t) {
  return Nt("(?:", t, ")*");
}
function cf(t) {
  return Nt("(?:", t, ")?");
}
function Nt(...t) {
  return t.map((n) => wn(n)).join("");
}
function lf(t) {
  const e = t[t.length - 1];
  return typeof e == "object" && e.constructor === Object ? (t.splice(t.length - 1, 1), e) : {};
}
function Os(...t) {
  return "(" + (lf(t).capture ? "" : "?:") + t.map((r) => wn(r)).join("|") + ")";
}
function Ni(t) {
  return new RegExp(t.toString() + "|").exec("").length - 1;
}
function af(t, e) {
  const n = t && t.exec(e);
  return n && n.index === 0;
}
const uf = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function Ps(t, { joinWith: e }) {
  let n = 0;
  return t.map((r) => {
    n += 1;
    const s = n;
    let o = wn(r), c = "";
    for (; o.length > 0; ) {
      const i = uf.exec(o);
      if (!i) {
        c += o;
        break;
      }
      c += o.substring(0, i.index), o = o.substring(i.index + i[0].length), i[0][0] === "\\" && i[1] ? c += "\\" + String(Number(i[1]) + s) : (c += i[0], i[0] === "(" && n++);
    }
    return c;
  }).map((r) => `(${r})`).join(e);
}
const ff = /\b\B/, Ii = "[a-zA-Z]\\w*", Bs = "[a-zA-Z_]\\w*", Fi = "\\b\\d+(\\.\\d+)?", Li = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", Oi = "\\b(0b[01]+)", hf = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", pf = (t = {}) => {
  const e = /^#![ ]*\//;
  return t.binary && (t.begin = Nt(
    e,
    /.*\b/,
    t.binary,
    /\b.*/
  )), lt({
    scope: "meta",
    begin: e,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (n, r) => {
      n.index !== 0 && r.ignoreMatch();
    }
  }, t);
}, Cn = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, df = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [Cn]
}, gf = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [Cn]
}, mf = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, mr = function(t, e, n = {}) {
  const r = lt(
    {
      scope: "comment",
      begin: t,
      end: e,
      contains: []
    },
    n
  );
  r.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const s = Os(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  return r.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: Nt(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        s,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  ), r;
}, _f = mr("//", "$"), bf = mr("/\\*", "\\*/"), vf = mr("#", "$"), xf = {
  scope: "number",
  begin: Fi,
  relevance: 0
}, yf = {
  scope: "number",
  begin: Li,
  relevance: 0
}, kf = {
  scope: "number",
  begin: Oi,
  relevance: 0
}, Ef = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    Cn,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [Cn]
    }
  ]
}, wf = {
  scope: "title",
  begin: Ii,
  relevance: 0
}, Cf = {
  scope: "title",
  begin: Bs,
  relevance: 0
}, Af = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + Bs,
  relevance: 0
}, Sf = function(t) {
  return Object.assign(
    t,
    {
      /** @type {ModeCallback} */
      "on:begin": (e, n) => {
        n.data._beginMatch = e[1];
      },
      /** @type {ModeCallback} */
      "on:end": (e, n) => {
        n.data._beginMatch !== e[1] && n.ignoreMatch();
      }
    }
  );
};
var Pn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: df,
  BACKSLASH_ESCAPE: Cn,
  BINARY_NUMBER_MODE: kf,
  BINARY_NUMBER_RE: Oi,
  COMMENT: mr,
  C_BLOCK_COMMENT_MODE: bf,
  C_LINE_COMMENT_MODE: _f,
  C_NUMBER_MODE: yf,
  C_NUMBER_RE: Li,
  END_SAME_AS_BEGIN: Sf,
  HASH_COMMENT_MODE: vf,
  IDENT_RE: Ii,
  MATCH_NOTHING_RE: ff,
  METHOD_GUARD: Af,
  NUMBER_MODE: xf,
  NUMBER_RE: Fi,
  PHRASAL_WORDS_MODE: mf,
  QUOTE_STRING_MODE: gf,
  REGEXP_MODE: Ef,
  RE_STARTERS_RE: hf,
  SHEBANG: pf,
  TITLE_MODE: wf,
  UNDERSCORE_IDENT_RE: Bs,
  UNDERSCORE_TITLE_MODE: Cf
});
function Df(t, e) {
  t.input[t.index - 1] === "." && e.ignoreMatch();
}
function Tf(t, e) {
  t.className !== void 0 && (t.scope = t.className, delete t.className);
}
function Rf(t, e) {
  e && t.beginKeywords && (t.begin = "\\b(" + t.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", t.__beforeBegin = Df, t.keywords = t.keywords || t.beginKeywords, delete t.beginKeywords, t.relevance === void 0 && (t.relevance = 0));
}
function qf(t, e) {
  Array.isArray(t.illegal) && (t.illegal = Os(...t.illegal));
}
function Mf(t, e) {
  if (t.match) {
    if (t.begin || t.end)
      throw new Error("begin & end are not supported with match");
    t.begin = t.match, delete t.match;
  }
}
function Nf(t, e) {
  t.relevance === void 0 && (t.relevance = 1);
}
const If = (t, e) => {
  if (!t.beforeMatch)
    return;
  if (t.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const n = Object.assign({}, t);
  Object.keys(t).forEach((r) => {
    delete t[r];
  }), t.keywords = n.keywords, t.begin = Nt(n.beforeMatch, Mi(n.begin)), t.starts = {
    relevance: 0,
    contains: [
      Object.assign(n, { endsParent: !0 })
    ]
  }, t.relevance = 0, delete n.beforeMatch;
}, Ff = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
], Lf = "keyword";
function Pi(t, e, n = Lf) {
  const r = /* @__PURE__ */ Object.create(null);
  return typeof t == "string" ? s(n, t.split(" ")) : Array.isArray(t) ? s(n, t) : Object.keys(t).forEach(function(o) {
    Object.assign(
      r,
      Pi(t[o], e, o)
    );
  }), r;
  function s(o, c) {
    e && (c = c.map((i) => i.toLowerCase())), c.forEach(function(i) {
      const l = i.split("|");
      r[l[0]] = [o, Of(l[0], l[1])];
    });
  }
}
function Of(t, e) {
  return e ? Number(e) : Pf(t) ? 0 : 1;
}
function Pf(t) {
  return Ff.includes(t.toLowerCase());
}
const zo = {}, Dt = (t) => {
  console.error(t);
}, Uo = (t, ...e) => {
  console.log(`WARN: ${t}`, ...e);
}, Lt = (t, e) => {
  zo[`${t}/${e}`] || (console.log(`Deprecated as of ${t}. ${e}`), zo[`${t}/${e}`] = !0);
}, tr = new Error();
function Bi(t, e, { key: n }) {
  let r = 0;
  const s = t[n], o = {}, c = {};
  for (let i = 1; i <= e.length; i++)
    c[i + r] = s[i], o[i + r] = !0, r += Ni(e[i - 1]);
  t[n] = c, t[n]._emit = o, t[n]._multi = !0;
}
function Bf(t) {
  if (Array.isArray(t.begin)) {
    if (t.skip || t.excludeBegin || t.returnBegin)
      throw Dt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), tr;
    if (typeof t.beginScope != "object" || t.beginScope === null)
      throw Dt("beginScope must be object"), tr;
    Bi(t, t.begin, { key: "beginScope" }), t.begin = Ps(t.begin, { joinWith: "" });
  }
}
function $f(t) {
  if (Array.isArray(t.end)) {
    if (t.skip || t.excludeEnd || t.returnEnd)
      throw Dt("skip, excludeEnd, returnEnd not compatible with endScope: {}"), tr;
    if (typeof t.endScope != "object" || t.endScope === null)
      throw Dt("endScope must be object"), tr;
    Bi(t, t.end, { key: "endScope" }), t.end = Ps(t.end, { joinWith: "" });
  }
}
function zf(t) {
  t.scope && typeof t.scope == "object" && t.scope !== null && (t.beginScope = t.scope, delete t.scope);
}
function Uf(t) {
  zf(t), typeof t.beginScope == "string" && (t.beginScope = { _wrap: t.beginScope }), typeof t.endScope == "string" && (t.endScope = { _wrap: t.endScope }), Bf(t), $f(t);
}
function Hf(t) {
  function e(c, i) {
    return new RegExp(
      wn(c),
      "m" + (t.case_insensitive ? "i" : "") + (t.unicodeRegex ? "u" : "") + (i ? "g" : "")
    );
  }
  class n {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    // @ts-ignore
    addRule(i, l) {
      l.position = this.position++, this.matchIndexes[this.matchAt] = l, this.regexes.push([l, i]), this.matchAt += Ni(i) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const i = this.regexes.map((l) => l[1]);
      this.matcherRe = e(Ps(i, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(i) {
      this.matcherRe.lastIndex = this.lastIndex;
      const l = this.matcherRe.exec(i);
      if (!l)
        return null;
      const a = l.findIndex((f, h) => h > 0 && f !== void 0), u = this.matchIndexes[a];
      return l.splice(0, a), Object.assign(l, u);
    }
  }
  class r {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(i) {
      if (this.multiRegexes[i])
        return this.multiRegexes[i];
      const l = new n();
      return this.rules.slice(i).forEach(([a, u]) => l.addRule(a, u)), l.compile(), this.multiRegexes[i] = l, l;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(i, l) {
      this.rules.push([i, l]), l.type === "begin" && this.count++;
    }
    /** @param {string} s */
    exec(i) {
      const l = this.getMatcher(this.regexIndex);
      l.lastIndex = this.lastIndex;
      let a = l.exec(i);
      if (this.resumingScanAtSamePosition() && !(a && a.index === this.lastIndex)) {
        const u = this.getMatcher(0);
        u.lastIndex = this.lastIndex + 1, a = u.exec(i);
      }
      return a && (this.regexIndex += a.position + 1, this.regexIndex === this.count && this.considerAll()), a;
    }
  }
  function s(c) {
    const i = new r();
    return c.contains.forEach((l) => i.addRule(l.begin, { rule: l, type: "begin" })), c.terminatorEnd && i.addRule(c.terminatorEnd, { type: "end" }), c.illegal && i.addRule(c.illegal, { type: "illegal" }), i;
  }
  function o(c, i) {
    const l = (
      /** @type CompiledMode */
      c
    );
    if (c.isCompiled)
      return l;
    [
      Tf,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      Mf,
      Uf,
      If
    ].forEach((u) => u(c, i)), t.compilerExtensions.forEach((u) => u(c, i)), c.__beforeBegin = null, [
      Rf,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      qf,
      // default to 1 relevance if not specified
      Nf
    ].forEach((u) => u(c, i)), c.isCompiled = !0;
    let a = null;
    return typeof c.keywords == "object" && c.keywords.$pattern && (c.keywords = Object.assign({}, c.keywords), a = c.keywords.$pattern, delete c.keywords.$pattern), a = a || /\w+/, c.keywords && (c.keywords = Pi(c.keywords, t.case_insensitive)), l.keywordPatternRe = e(a, !0), i && (c.begin || (c.begin = /\B|\b/), l.beginRe = e(l.begin), !c.end && !c.endsWithParent && (c.end = /\B|\b/), c.end && (l.endRe = e(l.end)), l.terminatorEnd = wn(l.end) || "", c.endsWithParent && i.terminatorEnd && (l.terminatorEnd += (c.end ? "|" : "") + i.terminatorEnd)), c.illegal && (l.illegalRe = e(
      /** @type {RegExp | string} */
      c.illegal
    )), c.contains || (c.contains = []), c.contains = [].concat(...c.contains.map(function(u) {
      return jf(u === "self" ? c : u);
    })), c.contains.forEach(function(u) {
      o(
        /** @type Mode */
        u,
        l
      );
    }), c.starts && o(c.starts, i), l.matcher = s(l), l;
  }
  if (t.compilerExtensions || (t.compilerExtensions = []), t.contains && t.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return t.classNameAliases = lt(t.classNameAliases || {}), o(
    /** @type Mode */
    t
  );
}
function $i(t) {
  return t ? t.endsWithParent || $i(t.starts) : !1;
}
function jf(t) {
  return t.variants && !t.cachedVariants && (t.cachedVariants = t.variants.map(function(e) {
    return lt(t, { variants: null }, e);
  })), t.cachedVariants ? t.cachedVariants : $i(t) ? lt(t, { starts: t.starts ? lt(t.starts) : null }) : Object.isFrozen(t) ? lt(t) : t;
}
var Vf = "11.9.0";
class Gf extends Error {
  constructor(e, n) {
    super(e), this.name = "HTMLInjectionError", this.html = n;
  }
}
const Lr = qi, Ho = lt, jo = Symbol("nomatch"), Zf = 7, zi = function(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), r = [];
  let s = !0;
  const o = "Could not find the language '{}', did you forget to load/include a language module?", c = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let i = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: sf
  };
  function l(v) {
    return i.noHighlightRe.test(v);
  }
  function a(v) {
    let S = v.className + " ";
    S += v.parentNode ? v.parentNode.className : "";
    const G = i.languageDetectRe.exec(S);
    if (G) {
      const te = X(G[1]);
      return te || (Uo(o.replace("{}", G[1])), Uo("Falling back to no-highlight mode for this block.", v)), te ? G[1] : "no-highlight";
    }
    return S.split(/\s+/).find((te) => l(te) || X(te));
  }
  function u(v, S, G) {
    let te = "", ie = "";
    typeof S == "object" ? (te = v, G = S.ignoreIllegals, ie = S.language) : (Lt("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Lt("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), ie = v, te = S), G === void 0 && (G = !0);
    const ae = {
      code: te,
      language: ie
    };
    ne("before:highlight", ae);
    const De = ae.result ? ae.result : f(ae.language, ae.code, G);
    return De.code = ae.code, ne("after:highlight", De), De;
  }
  function f(v, S, G, te) {
    const ie = /* @__PURE__ */ Object.create(null);
    function ae(w, R) {
      return w.keywords[R];
    }
    function De() {
      if (!m.keywords) {
        y.addText(L);
        return;
      }
      let w = 0;
      m.keywordPatternRe.lastIndex = 0;
      let R = m.keywordPatternRe.exec(L), H = "";
      for (; R; ) {
        H += L.substring(w, R.index);
        const Y = x.case_insensitive ? R[0].toLowerCase() : R[0], he = ae(m, Y);
        if (he) {
          const [Ne, gt] = he;
          if (y.addText(H), H = "", ie[Y] = (ie[Y] || 0) + 1, ie[Y] <= Zf && (P += gt), Ne.startsWith("_"))
            H += R[0];
          else {
            const qn = x.classNameAliases[Ne] || Ne;
            de(R[0], qn);
          }
        } else
          H += R[0];
        w = m.keywordPatternRe.lastIndex, R = m.keywordPatternRe.exec(L);
      }
      H += L.substring(w), y.addText(H);
    }
    function It() {
      if (L === "")
        return;
      let w = null;
      if (typeof m.subLanguage == "string") {
        if (!e[m.subLanguage]) {
          y.addText(L);
          return;
        }
        w = f(m.subLanguage, L, !0, F[m.subLanguage]), F[m.subLanguage] = /** @type {CompiledMode} */
        w._top;
      } else
        w = d(L, m.subLanguage.length ? m.subLanguage : null);
      m.relevance > 0 && (P += w.relevance), y.__addSublanguage(w._emitter, w.language);
    }
    function Ce() {
      m.subLanguage != null ? It() : De(), L = "";
    }
    function de(w, R) {
      w !== "" && (y.startScope(R), y.addText(w), y.endScope());
    }
    function dt(w, R) {
      let H = 1;
      const Y = R.length - 1;
      for (; H <= Y; ) {
        if (!w._emit[H]) {
          H++;
          continue;
        }
        const he = x.classNameAliases[w[H]] || w[H], Ne = R[H];
        he ? de(Ne, he) : (L = Ne, De(), L = ""), H++;
      }
    }
    function nn(w, R) {
      return w.scope && typeof w.scope == "string" && y.openNode(x.classNameAliases[w.scope] || w.scope), w.beginScope && (w.beginScope._wrap ? (de(L, x.classNameAliases[w.beginScope._wrap] || w.beginScope._wrap), L = "") : w.beginScope._multi && (dt(w.beginScope, R), L = "")), m = Object.create(w, { parent: { value: m } }), m;
    }
    function Qe(w, R, H) {
      let Y = af(w.endRe, H);
      if (Y) {
        if (w["on:end"]) {
          const he = new Po(w);
          w["on:end"](R, he), he.isMatchIgnored && (Y = !1);
        }
        if (Y) {
          for (; w.endsParent && w.parent; )
            w = w.parent;
          return w;
        }
      }
      if (w.endsWithParent)
        return Qe(w.parent, R, H);
    }
    function rn(w) {
      return m.matcher.regexIndex === 0 ? (L += w[0], 1) : (Q = !0, 0);
    }
    function sn(w) {
      const R = w[0], H = w.rule, Y = new Po(H), he = [H.__beforeBegin, H["on:begin"]];
      for (const Ne of he)
        if (Ne && (Ne(w, Y), Y.isMatchIgnored))
          return rn(R);
      return H.skip ? L += R : (H.excludeBegin && (L += R), Ce(), !H.returnBegin && !H.excludeBegin && (L = R)), nn(H, w), H.returnBegin ? 0 : R.length;
    }
    function p(w) {
      const R = w[0], H = S.substring(w.index), Y = Qe(m, w, H);
      if (!Y)
        return jo;
      const he = m;
      m.endScope && m.endScope._wrap ? (Ce(), de(R, m.endScope._wrap)) : m.endScope && m.endScope._multi ? (Ce(), dt(m.endScope, w)) : he.skip ? L += R : (he.returnEnd || he.excludeEnd || (L += R), Ce(), he.excludeEnd && (L = R));
      do
        m.scope && y.closeNode(), !m.skip && !m.subLanguage && (P += m.relevance), m = m.parent;
      while (m !== Y.parent);
      return Y.starts && nn(Y.starts, w), he.returnEnd ? 0 : R.length;
    }
    function g() {
      const w = [];
      for (let R = m; R !== x; R = R.parent)
        R.scope && w.unshift(R.scope);
      w.forEach((R) => y.openNode(R));
    }
    let _ = {};
    function E(w, R) {
      const H = R && R[0];
      if (L += w, H == null)
        return Ce(), 0;
      if (_.type === "begin" && R.type === "end" && _.index === R.index && H === "") {
        if (L += S.slice(R.index, R.index + 1), !s) {
          const Y = new Error(`0 width match regex (${v})`);
          throw Y.languageName = v, Y.badRule = _.rule, Y;
        }
        return 1;
      }
      if (_ = R, R.type === "begin")
        return sn(R);
      if (R.type === "illegal" && !G) {
        const Y = new Error('Illegal lexeme "' + H + '" for mode "' + (m.scope || "<unnamed>") + '"');
        throw Y.mode = m, Y;
      } else if (R.type === "end") {
        const Y = p(R);
        if (Y !== jo)
          return Y;
      }
      if (R.type === "illegal" && H === "")
        return 1;
      if (K > 1e5 && K > R.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return L += H, H.length;
    }
    const x = X(v);
    if (!x)
      throw Dt(o.replace("{}", v)), new Error('Unknown language: "' + v + '"');
    const M = Hf(x);
    let O = "", m = te || M;
    const F = {}, y = new i.__emitter(i);
    g();
    let L = "", P = 0, U = 0, K = 0, Q = !1;
    try {
      if (x.__emitTokens)
        x.__emitTokens(S, y);
      else {
        for (m.matcher.considerAll(); ; ) {
          K++, Q ? Q = !1 : m.matcher.considerAll(), m.matcher.lastIndex = U;
          const w = m.matcher.exec(S);
          if (!w)
            break;
          const R = S.substring(U, w.index), H = E(R, w);
          U = w.index + H;
        }
        E(S.substring(U));
      }
      return y.finalize(), O = y.toHTML(), {
        language: v,
        value: O,
        relevance: P,
        illegal: !1,
        _emitter: y,
        _top: m
      };
    } catch (w) {
      if (w.message && w.message.includes("Illegal"))
        return {
          language: v,
          value: Lr(S),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: w.message,
            index: U,
            context: S.slice(U - 100, U + 100),
            mode: w.mode,
            resultSoFar: O
          },
          _emitter: y
        };
      if (s)
        return {
          language: v,
          value: Lr(S),
          illegal: !1,
          relevance: 0,
          errorRaised: w,
          _emitter: y,
          _top: m
        };
      throw w;
    }
  }
  function h(v) {
    const S = {
      value: Lr(v),
      illegal: !1,
      relevance: 0,
      _top: c,
      _emitter: new i.__emitter(i)
    };
    return S._emitter.addText(v), S;
  }
  function d(v, S) {
    S = S || i.languages || Object.keys(e);
    const G = h(v), te = S.filter(X).filter(J).map(
      (Ce) => f(Ce, v, !1)
    );
    te.unshift(G);
    const ie = te.sort((Ce, de) => {
      if (Ce.relevance !== de.relevance)
        return de.relevance - Ce.relevance;
      if (Ce.language && de.language) {
        if (X(Ce.language).supersetOf === de.language)
          return 1;
        if (X(de.language).supersetOf === Ce.language)
          return -1;
      }
      return 0;
    }), [ae, De] = ie, It = ae;
    return It.secondBest = De, It;
  }
  function k(v, S, G) {
    const te = S && n[S] || G;
    v.classList.add("hljs"), v.classList.add(`language-${te}`);
  }
  function b(v) {
    let S = null;
    const G = a(v);
    if (l(G))
      return;
    if (ne(
      "before:highlightElement",
      { el: v, language: G }
    ), v.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", v);
      return;
    }
    if (v.children.length > 0 && (i.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(v)), i.throwUnescapedHTML))
      throw new Gf(
        "One of your code blocks includes unescaped HTML.",
        v.innerHTML
      );
    S = v;
    const te = S.textContent, ie = G ? u(te, { language: G, ignoreIllegals: !0 }) : d(te);
    v.innerHTML = ie.value, v.dataset.highlighted = "yes", k(v, G, ie.language), v.result = {
      language: ie.language,
      // TODO: remove with version 11.0
      re: ie.relevance,
      relevance: ie.relevance
    }, ie.secondBest && (v.secondBest = {
      language: ie.secondBest.language,
      relevance: ie.secondBest.relevance
    }), ne("after:highlightElement", { el: v, result: ie, text: te });
  }
  function I(v) {
    i = Ho(i, v);
  }
  const T = () => {
    A(), Lt("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function C() {
    A(), Lt("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let N = !1;
  function A() {
    if (document.readyState === "loading") {
      N = !0;
      return;
    }
    document.querySelectorAll(i.cssSelector).forEach(b);
  }
  function j() {
    N && A();
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", j, !1);
  function q(v, S) {
    let G = null;
    try {
      G = S(t);
    } catch (te) {
      if (Dt("Language definition for '{}' could not be registered.".replace("{}", v)), s)
        Dt(te);
      else
        throw te;
      G = c;
    }
    G.name || (G.name = v), e[v] = G, G.rawDefinition = S.bind(null, t), G.aliases && z(G.aliases, { languageName: v });
  }
  function W(v) {
    delete e[v];
    for (const S of Object.keys(n))
      n[S] === v && delete n[S];
  }
  function $() {
    return Object.keys(e);
  }
  function X(v) {
    return v = (v || "").toLowerCase(), e[v] || e[n[v]];
  }
  function z(v, { languageName: S }) {
    typeof v == "string" && (v = [v]), v.forEach((G) => {
      n[G.toLowerCase()] = S;
    });
  }
  function J(v) {
    const S = X(v);
    return S && !S.disableAutodetect;
  }
  function B(v) {
    v["before:highlightBlock"] && !v["before:highlightElement"] && (v["before:highlightElement"] = (S) => {
      v["before:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    }), v["after:highlightBlock"] && !v["after:highlightElement"] && (v["after:highlightElement"] = (S) => {
      v["after:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    });
  }
  function re(v) {
    B(v), r.push(v);
  }
  function D(v) {
    const S = r.indexOf(v);
    S !== -1 && r.splice(S, 1);
  }
  function ne(v, S) {
    const G = v;
    r.forEach(function(te) {
      te[G] && te[G](S);
    });
  }
  function V(v) {
    return Lt("10.7.0", "highlightBlock will be removed entirely in v12.0"), Lt("10.7.0", "Please use highlightElement now."), b(v);
  }
  Object.assign(t, {
    highlight: u,
    highlightAuto: d,
    highlightAll: A,
    highlightElement: b,
    // TODO: Remove with v12 API
    highlightBlock: V,
    configure: I,
    initHighlighting: T,
    initHighlightingOnLoad: C,
    registerLanguage: q,
    unregisterLanguage: W,
    listLanguages: $,
    getLanguage: X,
    registerAliases: z,
    autoDetection: J,
    inherit: Ho,
    addPlugin: re,
    removePlugin: D
  }), t.debugMode = function() {
    s = !1;
  }, t.safeMode = function() {
    s = !0;
  }, t.versionString = Vf, t.regex = {
    concat: Nt,
    lookahead: Mi,
    either: Os,
    optional: cf,
    anyNumberOfTimes: of
  };
  for (const v in Pn)
    typeof Pn[v] == "object" && Ri(Pn[v]);
  return Object.assign(t, Pn), t;
}, Jt = zi({});
Jt.newInstance = () => zi({});
var Kf = Jt;
Jt.HighlightJS = Jt;
Jt.default = Jt;
const nr = /* @__PURE__ */ Ti(Kf);
function Wf(t) {
  const e = t.regex, n = e.concat(/[\p{L}_]/u, e.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, s = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, o = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, c = t.inherit(o, {
    begin: /\(/,
    end: /\)/
  }), i = t.inherit(t.APOS_STRING_MODE, { className: "string" }), l = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), a = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [s]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [s]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          o,
          l,
          i,
          c,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  o,
                  c,
                  l,
                  i
                ]
              }
            ]
          }
        ]
      },
      t.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      s,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              l
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [a],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [a],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: e.concat(
          /</,
          e.lookahead(e.concat(
            n,
            // <tag/>
            // <tag>
            // <tag ...
            e.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0,
            starts: a
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: e.concat(
          /<\//,
          e.lookahead(e.concat(
            n,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const Vo = "[A-Za-z$_][0-9A-Za-z$_]*", Jf = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
], Yf = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Ui = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Hi = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], ji = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], Xf = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Qf = [].concat(
  ji,
  Ui,
  Hi
);
function eh(t) {
  const e = t.regex, n = (S, { after: G }) => {
    const te = "</" + S[0].slice(1);
    return S.input.indexOf(te, G) !== -1;
  }, r = Vo, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, c = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (S, G) => {
      const te = S[0].length + S.index, ie = S.input[te];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ie === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ie === ","
      ) {
        G.ignoreMatch();
        return;
      }
      ie === ">" && (n(S, { after: te }) || G.ignoreMatch());
      let ae;
      const De = S.input.substring(te);
      if (ae = De.match(/^\s*=/)) {
        G.ignoreMatch();
        return;
      }
      if ((ae = De.match(/^\s+extends\s+/)) && ae.index === 0) {
        G.ignoreMatch();
        return;
      }
    }
  }, i = {
    $pattern: Vo,
    keyword: Jf,
    literal: Yf,
    built_in: Qf,
    "variable.language": Xf
  }, l = "[0-9](_?[0-9])*", a = `\\.(${l})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", f = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${a})|\\.)?|(${a}))[eE][+-]?(${l})\\b` },
      { begin: `\\b(${u})\\b((${a})\\b|\\.)?|(${a})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, h = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: i,
    contains: []
    // defined later
  }, d = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "xml"
    }
  }, k = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "css"
    }
  }, b = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "graphql"
    }
  }, I = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      h
    ]
  }, C = {
    className: "comment",
    variants: [
      t.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      t.C_BLOCK_COMMENT_MODE,
      t.C_LINE_COMMENT_MODE
    ]
  }, N = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    d,
    k,
    b,
    I,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    f
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  h.contains = N.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: i,
    contains: [
      "self"
    ].concat(N)
  });
  const A = [].concat(C, h.contains), j = A.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: i,
      contains: ["self"].concat(A)
    }
  ]), q = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: i,
    contains: j
  }, W = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          e.concat(r, "(", e.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, $ = {
    relevance: 0,
    match: e.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Ui,
        ...Hi
      ]
    }
  }, X = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, z = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [q],
    illegal: /%/
  }, J = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(S) {
    return e.concat("(?!", S.join("|"), ")");
  }
  const re = {
    match: e.concat(
      /\b/,
      B([
        ...ji,
        "super",
        "import"
      ]),
      r,
      e.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  }, D = {
    begin: e.concat(/\./, e.lookahead(
      e.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ne = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      q
    ]
  }, V = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", v = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      e.lookahead(V)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      q
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: i,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: j, CLASS_REFERENCE: $ },
    illegal: /#(?![$_A-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      X,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      d,
      k,
      b,
      I,
      C,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      f,
      $,
      {
        className: "attr",
        begin: r + e.lookahead(":"),
        relevance: 0
      },
      v,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          C,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: V,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: t.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: i,
                    contains: j
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: c.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": c.isTrulyOpeningTag,
                end: c.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: c.begin,
                end: c.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      z,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          q,
          t.inherit(t.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      D,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [q]
      },
      re,
      J,
      W,
      ne,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const Vi = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, th = {}, nh = { class: "chat-button" };
function rh(t, e) {
  return oe(), be("button", nh, [
    pn(t.$slots, "default")
  ]);
}
const sh = /* @__PURE__ */ Vi(th, [["render", rh]]);
function oh() {
  const t = /* @__PURE__ */ new Map();
  function e(s, o) {
    const c = t.get(s);
    c && c.splice(c.indexOf(o) >>> 0, 1);
  }
  function n(s, o) {
    let c = t.get(s);
    return c ? c.push(o) : c = [o], t.set(s, c), () => e(s, o);
  }
  function r(s, o) {
    const c = t.get(s);
    c && c.slice().forEach(async (i) => {
      await i(o);
    });
  }
  return {
    on: n,
    off: e,
    emit: r
  };
}
function ch(t) {
  if (!document.querySelector(t)) {
    const n = document.createElement("div");
    t.startsWith("#") && (n.id = t.replace("#", "")), t.startsWith(".") && n.classList.add(t.replace(".", "")), document.body.appendChild(n);
  }
}
const Rt = oh(), ih = { class: "chat-layout" }, lh = {
  key: 0,
  class: "chat-header"
}, ah = {
  key: 2,
  class: "chat-footer"
}, uh = /* @__PURE__ */ Ue({
  __name: "Layout",
  setup(t) {
    const e = Ut(null);
    function n() {
      const r = e.value;
      r && (r.scrollTop = r.scrollHeight);
    }
    return Dn(() => {
      Rt.on("scrollToBottom", n), window.addEventListener("resize", n);
    }), Rs(() => {
      Rt.off("scrollToBottom", n), window.removeEventListener("resize", n);
    }), (r, s) => (oe(), be("main", ih, [
      r.$slots.header ? (oe(), be("div", lh, [
        pn(r.$slots, "header")
      ])) : mn("", !0),
      r.$slots.default ? (oe(), be("div", {
        key: 1,
        ref_key: "chatBodyRef",
        ref: e,
        class: "chat-body"
      }, [
        pn(r.$slots, "default")
      ], 512)) : mn("", !0),
      r.$slots.footer ? (oe(), be("div", ah, [
        pn(r.$slots, "footer")
      ])) : mn("", !0)
    ]));
  }
}), ln = {
  webhookUrl: "http://localhost:5678",
  webhookConfig: {
    method: "POST",
    headers: {}
  },
  target: "#n8n-chat",
  mode: "window",
  loadPreviousSession: !0,
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",
  defaultLanguage: "en",
  showWelcomeScreen: !1,
  initialMessages: ["Hi there! 👋", "My name is Nathan. How can I assist you today?"],
  i18n: {
    en: {
      title: "Hi there! 👋",
      subtitle: "Start a chat. We're here to help you 24/7.",
      footer: "",
      getStarted: "New Conversation",
      inputPlaceholder: "Type your question.."
    }
  },
  theme: {}
}, fh = "#n8n-chat", hh = "n8n-chat", Go = `${hh}/sessionId`, Gi = "Chat", Zi = "ChatOptions";
function $s() {
  return jt(Gi);
}
function zs() {
  return {
    options: jt(Zi)
  };
}
function _r() {
  const { options: t } = zs(), e = (t == null ? void 0 : t.defaultLanguage) ?? "en";
  function n(s) {
    var o, c;
    return ((c = (o = t == null ? void 0 : t.i18n) == null ? void 0 : o[e]) == null ? void 0 : c[s]) ?? s;
  }
  function r(s) {
    var o, c;
    return !!((c = (o = t == null ? void 0 : t.i18n) == null ? void 0 : o[e]) != null && c[s]);
  }
  return { t: n, te: r };
}
const ph = { class: "chat-get-started" }, dh = /* @__PURE__ */ Ue({
  __name: "GetStarted",
  setup(t) {
    const { t: e } = _r();
    return (n, r) => (oe(), be("div", ph, [
      pe(sh, {
        onClick: r[0] || (r[0] = (s) => n.$emit("click:button"))
      }, {
        default: ft(() => [
          Ns(Zn(ge(e)("getStarted")), 1)
        ]),
        _: 1
      })
    ]));
  }
}), gh = {}, mh = { class: "chat-powered-by" }, _h = /* @__PURE__ */ we("a", { href: "https://n8n.io?utm_source=n8n-external&utm_medium=widget-powered-by" }, "n8n", -1);
function bh(t, e) {
  return oe(), be("div", mh, [
    Ns(" Powered by "),
    _h
  ]);
}
const vh = /* @__PURE__ */ Vi(gh, [["render", bh]]), xh = { class: "chat-get-started-footer" }, yh = { key: 0 }, kh = /* @__PURE__ */ Ue({
  __name: "GetStartedFooter",
  setup(t) {
    const { t: e, te: n } = _r();
    return (r, s) => (oe(), be("div", xh, [
      ge(n)("footer") ? (oe(), be("div", yh, Zn(ge(e)("footer")), 1)) : mn("", !0),
      pe(vh)
    ]));
  }
});
var le = {};
const Eh = "Á", wh = "á", Ch = "Ă", Ah = "ă", Sh = "∾", Dh = "∿", Th = "∾̳", Rh = "Â", qh = "â", Mh = "´", Nh = "А", Ih = "а", Fh = "Æ", Lh = "æ", Oh = "⁡", Ph = "𝔄", Bh = "𝔞", $h = "À", zh = "à", Uh = "ℵ", Hh = "ℵ", jh = "Α", Vh = "α", Gh = "Ā", Zh = "ā", Kh = "⨿", Wh = "&", Jh = "&", Yh = "⩕", Xh = "⩓", Qh = "∧", ep = "⩜", tp = "⩘", np = "⩚", rp = "∠", sp = "⦤", op = "∠", cp = "⦨", ip = "⦩", lp = "⦪", ap = "⦫", up = "⦬", fp = "⦭", hp = "⦮", pp = "⦯", dp = "∡", gp = "∟", mp = "⊾", _p = "⦝", bp = "∢", vp = "Å", xp = "⍼", yp = "Ą", kp = "ą", Ep = "𝔸", wp = "𝕒", Cp = "⩯", Ap = "≈", Sp = "⩰", Dp = "≊", Tp = "≋", Rp = "'", qp = "⁡", Mp = "≈", Np = "≊", Ip = "Å", Fp = "å", Lp = "𝒜", Op = "𝒶", Pp = "≔", Bp = "*", $p = "≈", zp = "≍", Up = "Ã", Hp = "ã", jp = "Ä", Vp = "ä", Gp = "∳", Zp = "⨑", Kp = "≌", Wp = "϶", Jp = "‵", Yp = "∽", Xp = "⋍", Qp = "∖", ed = "⫧", td = "⊽", nd = "⌅", rd = "⌆", sd = "⌅", od = "⎵", cd = "⎶", id = "≌", ld = "Б", ad = "б", ud = "„", fd = "∵", hd = "∵", pd = "∵", dd = "⦰", gd = "϶", md = "ℬ", _d = "ℬ", bd = "Β", vd = "β", xd = "ℶ", yd = "≬", kd = "𝔅", Ed = "𝔟", wd = "⋂", Cd = "◯", Ad = "⋃", Sd = "⨀", Dd = "⨁", Td = "⨂", Rd = "⨆", qd = "★", Md = "▽", Nd = "△", Id = "⨄", Fd = "⋁", Ld = "⋀", Od = "⤍", Pd = "⧫", Bd = "▪", $d = "▴", zd = "▾", Ud = "◂", Hd = "▸", jd = "␣", Vd = "▒", Gd = "░", Zd = "▓", Kd = "█", Wd = "=⃥", Jd = "≡⃥", Yd = "⫭", Xd = "⌐", Qd = "𝔹", eg = "𝕓", tg = "⊥", ng = "⊥", rg = "⋈", sg = "⧉", og = "┐", cg = "╕", ig = "╖", lg = "╗", ag = "┌", ug = "╒", fg = "╓", hg = "╔", pg = "─", dg = "═", gg = "┬", mg = "╤", _g = "╥", bg = "╦", vg = "┴", xg = "╧", yg = "╨", kg = "╩", Eg = "⊟", wg = "⊞", Cg = "⊠", Ag = "┘", Sg = "╛", Dg = "╜", Tg = "╝", Rg = "└", qg = "╘", Mg = "╙", Ng = "╚", Ig = "│", Fg = "║", Lg = "┼", Og = "╪", Pg = "╫", Bg = "╬", $g = "┤", zg = "╡", Ug = "╢", Hg = "╣", jg = "├", Vg = "╞", Gg = "╟", Zg = "╠", Kg = "‵", Wg = "˘", Jg = "˘", Yg = "¦", Xg = "𝒷", Qg = "ℬ", em = "⁏", tm = "∽", nm = "⋍", rm = "⧅", sm = "\\", om = "⟈", cm = "•", im = "•", lm = "≎", am = "⪮", um = "≏", fm = "≎", hm = "≏", pm = "Ć", dm = "ć", gm = "⩄", mm = "⩉", _m = "⩋", bm = "∩", vm = "⋒", xm = "⩇", ym = "⩀", km = "ⅅ", Em = "∩︀", wm = "⁁", Cm = "ˇ", Am = "ℭ", Sm = "⩍", Dm = "Č", Tm = "č", Rm = "Ç", qm = "ç", Mm = "Ĉ", Nm = "ĉ", Im = "∰", Fm = "⩌", Lm = "⩐", Om = "Ċ", Pm = "ċ", Bm = "¸", $m = "¸", zm = "⦲", Um = "¢", Hm = "·", jm = "·", Vm = "𝔠", Gm = "ℭ", Zm = "Ч", Km = "ч", Wm = "✓", Jm = "✓", Ym = "Χ", Xm = "χ", Qm = "ˆ", e_ = "≗", t_ = "↺", n_ = "↻", r_ = "⊛", s_ = "⊚", o_ = "⊝", c_ = "⊙", i_ = "®", l_ = "Ⓢ", a_ = "⊖", u_ = "⊕", f_ = "⊗", h_ = "○", p_ = "⧃", d_ = "≗", g_ = "⨐", m_ = "⫯", __ = "⧂", b_ = "∲", v_ = "”", x_ = "’", y_ = "♣", k_ = "♣", E_ = ":", w_ = "∷", C_ = "⩴", A_ = "≔", S_ = "≔", D_ = ",", T_ = "@", R_ = "∁", q_ = "∘", M_ = "∁", N_ = "ℂ", I_ = "≅", F_ = "⩭", L_ = "≡", O_ = "∮", P_ = "∯", B_ = "∮", $_ = "𝕔", z_ = "ℂ", U_ = "∐", H_ = "∐", j_ = "©", V_ = "©", G_ = "℗", Z_ = "∳", K_ = "↵", W_ = "✗", J_ = "⨯", Y_ = "𝒞", X_ = "𝒸", Q_ = "⫏", eb = "⫑", tb = "⫐", nb = "⫒", rb = "⋯", sb = "⤸", ob = "⤵", cb = "⋞", ib = "⋟", lb = "↶", ab = "⤽", ub = "⩈", fb = "⩆", hb = "≍", pb = "∪", db = "⋓", gb = "⩊", mb = "⊍", _b = "⩅", bb = "∪︀", vb = "↷", xb = "⤼", yb = "⋞", kb = "⋟", Eb = "⋎", wb = "⋏", Cb = "¤", Ab = "↶", Sb = "↷", Db = "⋎", Tb = "⋏", Rb = "∲", qb = "∱", Mb = "⌭", Nb = "†", Ib = "‡", Fb = "ℸ", Lb = "↓", Ob = "↡", Pb = "⇓", Bb = "‐", $b = "⫤", zb = "⊣", Ub = "⤏", Hb = "˝", jb = "Ď", Vb = "ď", Gb = "Д", Zb = "д", Kb = "‡", Wb = "⇊", Jb = "ⅅ", Yb = "ⅆ", Xb = "⤑", Qb = "⩷", e0 = "°", t0 = "∇", n0 = "Δ", r0 = "δ", s0 = "⦱", o0 = "⥿", c0 = "𝔇", i0 = "𝔡", l0 = "⥥", a0 = "⇃", u0 = "⇂", f0 = "´", h0 = "˙", p0 = "˝", d0 = "`", g0 = "˜", m0 = "⋄", _0 = "⋄", b0 = "⋄", v0 = "♦", x0 = "♦", y0 = "¨", k0 = "ⅆ", E0 = "ϝ", w0 = "⋲", C0 = "÷", A0 = "÷", S0 = "⋇", D0 = "⋇", T0 = "Ђ", R0 = "ђ", q0 = "⌞", M0 = "⌍", N0 = "$", I0 = "𝔻", F0 = "𝕕", L0 = "¨", O0 = "˙", P0 = "⃜", B0 = "≐", $0 = "≑", z0 = "≐", U0 = "∸", H0 = "∔", j0 = "⊡", V0 = "⌆", G0 = "∯", Z0 = "¨", K0 = "⇓", W0 = "⇐", J0 = "⇔", Y0 = "⫤", X0 = "⟸", Q0 = "⟺", ev = "⟹", tv = "⇒", nv = "⊨", rv = "⇑", sv = "⇕", ov = "∥", cv = "⤓", iv = "↓", lv = "↓", av = "⇓", uv = "⇵", fv = "̑", hv = "⇊", pv = "⇃", dv = "⇂", gv = "⥐", mv = "⥞", _v = "⥖", bv = "↽", vv = "⥟", xv = "⥗", yv = "⇁", kv = "↧", Ev = "⊤", wv = "⤐", Cv = "⌟", Av = "⌌", Sv = "𝒟", Dv = "𝒹", Tv = "Ѕ", Rv = "ѕ", qv = "⧶", Mv = "Đ", Nv = "đ", Iv = "⋱", Fv = "▿", Lv = "▾", Ov = "⇵", Pv = "⥯", Bv = "⦦", $v = "Џ", zv = "џ", Uv = "⟿", Hv = "É", jv = "é", Vv = "⩮", Gv = "Ě", Zv = "ě", Kv = "Ê", Wv = "ê", Jv = "≖", Yv = "≕", Xv = "Э", Qv = "э", ex = "⩷", tx = "Ė", nx = "ė", rx = "≑", sx = "ⅇ", ox = "≒", cx = "𝔈", ix = "𝔢", lx = "⪚", ax = "È", ux = "è", fx = "⪖", hx = "⪘", px = "⪙", dx = "∈", gx = "⏧", mx = "ℓ", _x = "⪕", bx = "⪗", vx = "Ē", xx = "ē", yx = "∅", kx = "∅", Ex = "◻", wx = "∅", Cx = "▫", Ax = " ", Sx = " ", Dx = " ", Tx = "Ŋ", Rx = "ŋ", qx = " ", Mx = "Ę", Nx = "ę", Ix = "𝔼", Fx = "𝕖", Lx = "⋕", Ox = "⧣", Px = "⩱", Bx = "ε", $x = "Ε", zx = "ε", Ux = "ϵ", Hx = "≖", jx = "≕", Vx = "≂", Gx = "⪖", Zx = "⪕", Kx = "⩵", Wx = "=", Jx = "≂", Yx = "≟", Xx = "⇌", Qx = "≡", ey = "⩸", ty = "⧥", ny = "⥱", ry = "≓", sy = "ℯ", oy = "ℰ", cy = "≐", iy = "⩳", ly = "≂", ay = "Η", uy = "η", fy = "Ð", hy = "ð", py = "Ë", dy = "ë", gy = "€", my = "!", _y = "∃", by = "∃", vy = "ℰ", xy = "ⅇ", yy = "ⅇ", ky = "≒", Ey = "Ф", wy = "ф", Cy = "♀", Ay = "ﬃ", Sy = "ﬀ", Dy = "ﬄ", Ty = "𝔉", Ry = "𝔣", qy = "ﬁ", My = "◼", Ny = "▪", Iy = "fj", Fy = "♭", Ly = "ﬂ", Oy = "▱", Py = "ƒ", By = "𝔽", $y = "𝕗", zy = "∀", Uy = "∀", Hy = "⋔", jy = "⫙", Vy = "ℱ", Gy = "⨍", Zy = "½", Ky = "⅓", Wy = "¼", Jy = "⅕", Yy = "⅙", Xy = "⅛", Qy = "⅔", ek = "⅖", tk = "¾", nk = "⅗", rk = "⅜", sk = "⅘", ok = "⅚", ck = "⅝", ik = "⅞", lk = "⁄", ak = "⌢", uk = "𝒻", fk = "ℱ", hk = "ǵ", pk = "Γ", dk = "γ", gk = "Ϝ", mk = "ϝ", _k = "⪆", bk = "Ğ", vk = "ğ", xk = "Ģ", yk = "Ĝ", kk = "ĝ", Ek = "Г", wk = "г", Ck = "Ġ", Ak = "ġ", Sk = "≥", Dk = "≧", Tk = "⪌", Rk = "⋛", qk = "≥", Mk = "≧", Nk = "⩾", Ik = "⪩", Fk = "⩾", Lk = "⪀", Ok = "⪂", Pk = "⪄", Bk = "⋛︀", $k = "⪔", zk = "𝔊", Uk = "𝔤", Hk = "≫", jk = "⋙", Vk = "⋙", Gk = "ℷ", Zk = "Ѓ", Kk = "ѓ", Wk = "⪥", Jk = "≷", Yk = "⪒", Xk = "⪤", Qk = "⪊", eE = "⪊", tE = "⪈", nE = "≩", rE = "⪈", sE = "≩", oE = "⋧", cE = "𝔾", iE = "𝕘", lE = "`", aE = "≥", uE = "⋛", fE = "≧", hE = "⪢", pE = "≷", dE = "⩾", gE = "≳", mE = "𝒢", _E = "ℊ", bE = "≳", vE = "⪎", xE = "⪐", yE = "⪧", kE = "⩺", EE = ">", wE = ">", CE = "≫", AE = "⋗", SE = "⦕", DE = "⩼", TE = "⪆", RE = "⥸", qE = "⋗", ME = "⋛", NE = "⪌", IE = "≷", FE = "≳", LE = "≩︀", OE = "≩︀", PE = "ˇ", BE = " ", $E = "½", zE = "ℋ", UE = "Ъ", HE = "ъ", jE = "⥈", VE = "↔", GE = "⇔", ZE = "↭", KE = "^", WE = "ℏ", JE = "Ĥ", YE = "ĥ", XE = "♥", QE = "♥", ew = "…", tw = "⊹", nw = "𝔥", rw = "ℌ", sw = "ℋ", ow = "⤥", cw = "⤦", iw = "⇿", lw = "∻", aw = "↩", uw = "↪", fw = "𝕙", hw = "ℍ", pw = "―", dw = "─", gw = "𝒽", mw = "ℋ", _w = "ℏ", bw = "Ħ", vw = "ħ", xw = "≎", yw = "≏", kw = "⁃", Ew = "‐", ww = "Í", Cw = "í", Aw = "⁣", Sw = "Î", Dw = "î", Tw = "И", Rw = "и", qw = "İ", Mw = "Е", Nw = "е", Iw = "¡", Fw = "⇔", Lw = "𝔦", Ow = "ℑ", Pw = "Ì", Bw = "ì", $w = "ⅈ", zw = "⨌", Uw = "∭", Hw = "⧜", jw = "℩", Vw = "Ĳ", Gw = "ĳ", Zw = "Ī", Kw = "ī", Ww = "ℑ", Jw = "ⅈ", Yw = "ℐ", Xw = "ℑ", Qw = "ı", eC = "ℑ", tC = "⊷", nC = "Ƶ", rC = "⇒", sC = "℅", oC = "∞", cC = "⧝", iC = "ı", lC = "⊺", aC = "∫", uC = "∬", fC = "ℤ", hC = "∫", pC = "⊺", dC = "⋂", gC = "⨗", mC = "⨼", _C = "⁣", bC = "⁢", vC = "Ё", xC = "ё", yC = "Į", kC = "į", EC = "𝕀", wC = "𝕚", CC = "Ι", AC = "ι", SC = "⨼", DC = "¿", TC = "𝒾", RC = "ℐ", qC = "∈", MC = "⋵", NC = "⋹", IC = "⋴", FC = "⋳", LC = "∈", OC = "⁢", PC = "Ĩ", BC = "ĩ", $C = "І", zC = "і", UC = "Ï", HC = "ï", jC = "Ĵ", VC = "ĵ", GC = "Й", ZC = "й", KC = "𝔍", WC = "𝔧", JC = "ȷ", YC = "𝕁", XC = "𝕛", QC = "𝒥", eA = "𝒿", tA = "Ј", nA = "ј", rA = "Є", sA = "є", oA = "Κ", cA = "κ", iA = "ϰ", lA = "Ķ", aA = "ķ", uA = "К", fA = "к", hA = "𝔎", pA = "𝔨", dA = "ĸ", gA = "Х", mA = "х", _A = "Ќ", bA = "ќ", vA = "𝕂", xA = "𝕜", yA = "𝒦", kA = "𝓀", EA = "⇚", wA = "Ĺ", CA = "ĺ", AA = "⦴", SA = "ℒ", DA = "Λ", TA = "λ", RA = "⟨", qA = "⟪", MA = "⦑", NA = "⟨", IA = "⪅", FA = "ℒ", LA = "«", OA = "⇤", PA = "⤟", BA = "←", $A = "↞", zA = "⇐", UA = "⤝", HA = "↩", jA = "↫", VA = "⤹", GA = "⥳", ZA = "↢", KA = "⤙", WA = "⤛", JA = "⪫", YA = "⪭", XA = "⪭︀", QA = "⤌", e1 = "⤎", t1 = "❲", n1 = "{", r1 = "[", s1 = "⦋", o1 = "⦏", c1 = "⦍", i1 = "Ľ", l1 = "ľ", a1 = "Ļ", u1 = "ļ", f1 = "⌈", h1 = "{", p1 = "Л", d1 = "л", g1 = "⤶", m1 = "“", _1 = "„", b1 = "⥧", v1 = "⥋", x1 = "↲", y1 = "≤", k1 = "≦", E1 = "⟨", w1 = "⇤", C1 = "←", A1 = "←", S1 = "⇐", D1 = "⇆", T1 = "↢", R1 = "⌈", q1 = "⟦", M1 = "⥡", N1 = "⥙", I1 = "⇃", F1 = "⌊", L1 = "↽", O1 = "↼", P1 = "⇇", B1 = "↔", $1 = "↔", z1 = "⇔", U1 = "⇆", H1 = "⇋", j1 = "↭", V1 = "⥎", G1 = "↤", Z1 = "⊣", K1 = "⥚", W1 = "⋋", J1 = "⧏", Y1 = "⊲", X1 = "⊴", Q1 = "⥑", eS = "⥠", tS = "⥘", nS = "↿", rS = "⥒", sS = "↼", oS = "⪋", cS = "⋚", iS = "≤", lS = "≦", aS = "⩽", uS = "⪨", fS = "⩽", hS = "⩿", pS = "⪁", dS = "⪃", gS = "⋚︀", mS = "⪓", _S = "⪅", bS = "⋖", vS = "⋚", xS = "⪋", yS = "⋚", kS = "≦", ES = "≶", wS = "≶", CS = "⪡", AS = "≲", SS = "⩽", DS = "≲", TS = "⥼", RS = "⌊", qS = "𝔏", MS = "𝔩", NS = "≶", IS = "⪑", FS = "⥢", LS = "↽", OS = "↼", PS = "⥪", BS = "▄", $S = "Љ", zS = "љ", US = "⇇", HS = "≪", jS = "⋘", VS = "⌞", GS = "⇚", ZS = "⥫", KS = "◺", WS = "Ŀ", JS = "ŀ", YS = "⎰", XS = "⎰", QS = "⪉", eD = "⪉", tD = "⪇", nD = "≨", rD = "⪇", sD = "≨", oD = "⋦", cD = "⟬", iD = "⇽", lD = "⟦", aD = "⟵", uD = "⟵", fD = "⟸", hD = "⟷", pD = "⟷", dD = "⟺", gD = "⟼", mD = "⟶", _D = "⟶", bD = "⟹", vD = "↫", xD = "↬", yD = "⦅", kD = "𝕃", ED = "𝕝", wD = "⨭", CD = "⨴", AD = "∗", SD = "_", DD = "↙", TD = "↘", RD = "◊", qD = "◊", MD = "⧫", ND = "(", ID = "⦓", FD = "⇆", LD = "⌟", OD = "⇋", PD = "⥭", BD = "‎", $D = "⊿", zD = "‹", UD = "𝓁", HD = "ℒ", jD = "↰", VD = "↰", GD = "≲", ZD = "⪍", KD = "⪏", WD = "[", JD = "‘", YD = "‚", XD = "Ł", QD = "ł", eT = "⪦", tT = "⩹", nT = "<", rT = "<", sT = "≪", oT = "⋖", cT = "⋋", iT = "⋉", lT = "⥶", aT = "⩻", uT = "◃", fT = "⊴", hT = "◂", pT = "⦖", dT = "⥊", gT = "⥦", mT = "≨︀", _T = "≨︀", bT = "¯", vT = "♂", xT = "✠", yT = "✠", kT = "↦", ET = "↦", wT = "↧", CT = "↤", AT = "↥", ST = "▮", DT = "⨩", TT = "М", RT = "м", qT = "—", MT = "∺", NT = "∡", IT = " ", FT = "ℳ", LT = "𝔐", OT = "𝔪", PT = "℧", BT = "µ", $T = "*", zT = "⫰", UT = "∣", HT = "·", jT = "⊟", VT = "−", GT = "∸", ZT = "⨪", KT = "∓", WT = "⫛", JT = "…", YT = "∓", XT = "⊧", QT = "𝕄", eR = "𝕞", tR = "∓", nR = "𝓂", rR = "ℳ", sR = "∾", oR = "Μ", cR = "μ", iR = "⊸", lR = "⊸", aR = "∇", uR = "Ń", fR = "ń", hR = "∠⃒", pR = "≉", dR = "⩰̸", gR = "≋̸", mR = "ŉ", _R = "≉", bR = "♮", vR = "ℕ", xR = "♮", yR = " ", kR = "≎̸", ER = "≏̸", wR = "⩃", CR = "Ň", AR = "ň", SR = "Ņ", DR = "ņ", TR = "≇", RR = "⩭̸", qR = "⩂", MR = "Н", NR = "н", IR = "–", FR = "⤤", LR = "↗", OR = "⇗", PR = "↗", BR = "≠", $R = "≐̸", zR = "​", UR = "​", HR = "​", jR = "​", VR = "≢", GR = "⤨", ZR = "≂̸", KR = "≫", WR = "≪", JR = `
`, YR = "∄", XR = "∄", QR = "𝔑", eq = "𝔫", tq = "≧̸", nq = "≱", rq = "≱", sq = "≧̸", oq = "⩾̸", cq = "⩾̸", iq = "⋙̸", lq = "≵", aq = "≫⃒", uq = "≯", fq = "≯", hq = "≫̸", pq = "↮", dq = "⇎", gq = "⫲", mq = "∋", _q = "⋼", bq = "⋺", vq = "∋", xq = "Њ", yq = "њ", kq = "↚", Eq = "⇍", wq = "‥", Cq = "≦̸", Aq = "≰", Sq = "↚", Dq = "⇍", Tq = "↮", Rq = "⇎", qq = "≰", Mq = "≦̸", Nq = "⩽̸", Iq = "⩽̸", Fq = "≮", Lq = "⋘̸", Oq = "≴", Pq = "≪⃒", Bq = "≮", $q = "⋪", zq = "⋬", Uq = "≪̸", Hq = "∤", jq = "⁠", Vq = " ", Gq = "𝕟", Zq = "ℕ", Kq = "⫬", Wq = "¬", Jq = "≢", Yq = "≭", Xq = "∦", Qq = "∉", eM = "≠", tM = "≂̸", nM = "∄", rM = "≯", sM = "≱", oM = "≧̸", cM = "≫̸", iM = "≹", lM = "⩾̸", aM = "≵", uM = "≎̸", fM = "≏̸", hM = "∉", pM = "⋵̸", dM = "⋹̸", gM = "∉", mM = "⋷", _M = "⋶", bM = "⧏̸", vM = "⋪", xM = "⋬", yM = "≮", kM = "≰", EM = "≸", wM = "≪̸", CM = "⩽̸", AM = "≴", SM = "⪢̸", DM = "⪡̸", TM = "∌", RM = "∌", qM = "⋾", MM = "⋽", NM = "⊀", IM = "⪯̸", FM = "⋠", LM = "∌", OM = "⧐̸", PM = "⋫", BM = "⋭", $M = "⊏̸", zM = "⋢", UM = "⊐̸", HM = "⋣", jM = "⊂⃒", VM = "⊈", GM = "⊁", ZM = "⪰̸", KM = "⋡", WM = "≿̸", JM = "⊃⃒", YM = "⊉", XM = "≁", QM = "≄", eN = "≇", tN = "≉", nN = "∤", rN = "∦", sN = "∦", oN = "⫽⃥", cN = "∂̸", iN = "⨔", lN = "⊀", aN = "⋠", uN = "⊀", fN = "⪯̸", hN = "⪯̸", pN = "⤳̸", dN = "↛", gN = "⇏", mN = "↝̸", _N = "↛", bN = "⇏", vN = "⋫", xN = "⋭", yN = "⊁", kN = "⋡", EN = "⪰̸", wN = "𝒩", CN = "𝓃", AN = "∤", SN = "∦", DN = "≁", TN = "≄", RN = "≄", qN = "∤", MN = "∦", NN = "⋢", IN = "⋣", FN = "⊄", LN = "⫅̸", ON = "⊈", PN = "⊂⃒", BN = "⊈", $N = "⫅̸", zN = "⊁", UN = "⪰̸", HN = "⊅", jN = "⫆̸", VN = "⊉", GN = "⊃⃒", ZN = "⊉", KN = "⫆̸", WN = "≹", JN = "Ñ", YN = "ñ", XN = "≸", QN = "⋪", eI = "⋬", tI = "⋫", nI = "⋭", rI = "Ν", sI = "ν", oI = "#", cI = "№", iI = " ", lI = "≍⃒", aI = "⊬", uI = "⊭", fI = "⊮", hI = "⊯", pI = "≥⃒", dI = ">⃒", gI = "⤄", mI = "⧞", _I = "⤂", bI = "≤⃒", vI = "<⃒", xI = "⊴⃒", yI = "⤃", kI = "⊵⃒", EI = "∼⃒", wI = "⤣", CI = "↖", AI = "⇖", SI = "↖", DI = "⤧", TI = "Ó", RI = "ó", qI = "⊛", MI = "Ô", NI = "ô", II = "⊚", FI = "О", LI = "о", OI = "⊝", PI = "Ő", BI = "ő", $I = "⨸", zI = "⊙", UI = "⦼", HI = "Œ", jI = "œ", VI = "⦿", GI = "𝔒", ZI = "𝔬", KI = "˛", WI = "Ò", JI = "ò", YI = "⧁", XI = "⦵", QI = "Ω", eF = "∮", tF = "↺", nF = "⦾", rF = "⦻", sF = "‾", oF = "⧀", cF = "Ō", iF = "ō", lF = "Ω", aF = "ω", uF = "Ο", fF = "ο", hF = "⦶", pF = "⊖", dF = "𝕆", gF = "𝕠", mF = "⦷", _F = "“", bF = "‘", vF = "⦹", xF = "⊕", yF = "↻", kF = "⩔", EF = "∨", wF = "⩝", CF = "ℴ", AF = "ℴ", SF = "ª", DF = "º", TF = "⊶", RF = "⩖", qF = "⩗", MF = "⩛", NF = "Ⓢ", IF = "𝒪", FF = "ℴ", LF = "Ø", OF = "ø", PF = "⊘", BF = "Õ", $F = "õ", zF = "⨶", UF = "⨷", HF = "⊗", jF = "Ö", VF = "ö", GF = "⌽", ZF = "‾", KF = "⏞", WF = "⎴", JF = "⏜", YF = "¶", XF = "∥", QF = "∥", eL = "⫳", tL = "⫽", nL = "∂", rL = "∂", sL = "П", oL = "п", cL = "%", iL = ".", lL = "‰", aL = "⊥", uL = "‱", fL = "𝔓", hL = "𝔭", pL = "Φ", dL = "φ", gL = "ϕ", mL = "ℳ", _L = "☎", bL = "Π", vL = "π", xL = "⋔", yL = "ϖ", kL = "ℏ", EL = "ℎ", wL = "ℏ", CL = "⨣", AL = "⊞", SL = "⨢", DL = "+", TL = "∔", RL = "⨥", qL = "⩲", ML = "±", NL = "±", IL = "⨦", FL = "⨧", LL = "±", OL = "ℌ", PL = "⨕", BL = "𝕡", $L = "ℙ", zL = "£", UL = "⪷", HL = "⪻", jL = "≺", VL = "≼", GL = "⪷", ZL = "≺", KL = "≼", WL = "≺", JL = "⪯", YL = "≼", XL = "≾", QL = "⪯", eO = "⪹", tO = "⪵", nO = "⋨", rO = "⪯", sO = "⪳", oO = "≾", cO = "′", iO = "″", lO = "ℙ", aO = "⪹", uO = "⪵", fO = "⋨", hO = "∏", pO = "∏", dO = "⌮", gO = "⌒", mO = "⌓", _O = "∝", bO = "∝", vO = "∷", xO = "∝", yO = "≾", kO = "⊰", EO = "𝒫", wO = "𝓅", CO = "Ψ", AO = "ψ", SO = " ", DO = "𝔔", TO = "𝔮", RO = "⨌", qO = "𝕢", MO = "ℚ", NO = "⁗", IO = "𝒬", FO = "𝓆", LO = "ℍ", OO = "⨖", PO = "?", BO = "≟", $O = '"', zO = '"', UO = "⇛", HO = "∽̱", jO = "Ŕ", VO = "ŕ", GO = "√", ZO = "⦳", KO = "⟩", WO = "⟫", JO = "⦒", YO = "⦥", XO = "⟩", QO = "»", eP = "⥵", tP = "⇥", nP = "⤠", rP = "⤳", sP = "→", oP = "↠", cP = "⇒", iP = "⤞", lP = "↪", aP = "↬", uP = "⥅", fP = "⥴", hP = "⤖", pP = "↣", dP = "↝", gP = "⤚", mP = "⤜", _P = "∶", bP = "ℚ", vP = "⤍", xP = "⤏", yP = "⤐", kP = "❳", EP = "}", wP = "]", CP = "⦌", AP = "⦎", SP = "⦐", DP = "Ř", TP = "ř", RP = "Ŗ", qP = "ŗ", MP = "⌉", NP = "}", IP = "Р", FP = "р", LP = "⤷", OP = "⥩", PP = "”", BP = "”", $P = "↳", zP = "ℜ", UP = "ℛ", HP = "ℜ", jP = "ℝ", VP = "ℜ", GP = "▭", ZP = "®", KP = "®", WP = "∋", JP = "⇋", YP = "⥯", XP = "⥽", QP = "⌋", eB = "𝔯", tB = "ℜ", nB = "⥤", rB = "⇁", sB = "⇀", oB = "⥬", cB = "Ρ", iB = "ρ", lB = "ϱ", aB = "⟩", uB = "⇥", fB = "→", hB = "→", pB = "⇒", dB = "⇄", gB = "↣", mB = "⌉", _B = "⟧", bB = "⥝", vB = "⥕", xB = "⇂", yB = "⌋", kB = "⇁", EB = "⇀", wB = "⇄", CB = "⇌", AB = "⇉", SB = "↝", DB = "↦", TB = "⊢", RB = "⥛", qB = "⋌", MB = "⧐", NB = "⊳", IB = "⊵", FB = "⥏", LB = "⥜", OB = "⥔", PB = "↾", BB = "⥓", $B = "⇀", zB = "˚", UB = "≓", HB = "⇄", jB = "⇌", VB = "‏", GB = "⎱", ZB = "⎱", KB = "⫮", WB = "⟭", JB = "⇾", YB = "⟧", XB = "⦆", QB = "𝕣", e2 = "ℝ", t2 = "⨮", n2 = "⨵", r2 = "⥰", s2 = ")", o2 = "⦔", c2 = "⨒", i2 = "⇉", l2 = "⇛", a2 = "›", u2 = "𝓇", f2 = "ℛ", h2 = "↱", p2 = "↱", d2 = "]", g2 = "’", m2 = "’", _2 = "⋌", b2 = "⋊", v2 = "▹", x2 = "⊵", y2 = "▸", k2 = "⧎", E2 = "⧴", w2 = "⥨", C2 = "℞", A2 = "Ś", S2 = "ś", D2 = "‚", T2 = "⪸", R2 = "Š", q2 = "š", M2 = "⪼", N2 = "≻", I2 = "≽", F2 = "⪰", L2 = "⪴", O2 = "Ş", P2 = "ş", B2 = "Ŝ", $2 = "ŝ", z2 = "⪺", U2 = "⪶", H2 = "⋩", j2 = "⨓", V2 = "≿", G2 = "С", Z2 = "с", K2 = "⊡", W2 = "⋅", J2 = "⩦", Y2 = "⤥", X2 = "↘", Q2 = "⇘", e$ = "↘", t$ = "§", n$ = ";", r$ = "⤩", s$ = "∖", o$ = "∖", c$ = "✶", i$ = "𝔖", l$ = "𝔰", a$ = "⌢", u$ = "♯", f$ = "Щ", h$ = "щ", p$ = "Ш", d$ = "ш", g$ = "↓", m$ = "←", _$ = "∣", b$ = "∥", v$ = "→", x$ = "↑", y$ = "­", k$ = "Σ", E$ = "σ", w$ = "ς", C$ = "ς", A$ = "∼", S$ = "⩪", D$ = "≃", T$ = "≃", R$ = "⪞", q$ = "⪠", M$ = "⪝", N$ = "⪟", I$ = "≆", F$ = "⨤", L$ = "⥲", O$ = "←", P$ = "∘", B$ = "∖", $$ = "⨳", z$ = "⧤", U$ = "∣", H$ = "⌣", j$ = "⪪", V$ = "⪬", G$ = "⪬︀", Z$ = "Ь", K$ = "ь", W$ = "⌿", J$ = "⧄", Y$ = "/", X$ = "𝕊", Q$ = "𝕤", ez = "♠", tz = "♠", nz = "∥", rz = "⊓", sz = "⊓︀", oz = "⊔", cz = "⊔︀", iz = "√", lz = "⊏", az = "⊑", uz = "⊏", fz = "⊑", hz = "⊐", pz = "⊒", dz = "⊐", gz = "⊒", mz = "□", _z = "□", bz = "⊓", vz = "⊏", xz = "⊑", yz = "⊐", kz = "⊒", Ez = "⊔", wz = "▪", Cz = "□", Az = "▪", Sz = "→", Dz = "𝒮", Tz = "𝓈", Rz = "∖", qz = "⌣", Mz = "⋆", Nz = "⋆", Iz = "☆", Fz = "★", Lz = "ϵ", Oz = "ϕ", Pz = "¯", Bz = "⊂", $z = "⋐", zz = "⪽", Uz = "⫅", Hz = "⊆", jz = "⫃", Vz = "⫁", Gz = "⫋", Zz = "⊊", Kz = "⪿", Wz = "⥹", Jz = "⊂", Yz = "⋐", Xz = "⊆", Qz = "⫅", eU = "⊆", tU = "⊊", nU = "⫋", rU = "⫇", sU = "⫕", oU = "⫓", cU = "⪸", iU = "≻", lU = "≽", aU = "≻", uU = "⪰", fU = "≽", hU = "≿", pU = "⪰", dU = "⪺", gU = "⪶", mU = "⋩", _U = "≿", bU = "∋", vU = "∑", xU = "∑", yU = "♪", kU = "¹", EU = "²", wU = "³", CU = "⊃", AU = "⋑", SU = "⪾", DU = "⫘", TU = "⫆", RU = "⊇", qU = "⫄", MU = "⊃", NU = "⊇", IU = "⟉", FU = "⫗", LU = "⥻", OU = "⫂", PU = "⫌", BU = "⊋", $U = "⫀", zU = "⊃", UU = "⋑", HU = "⊇", jU = "⫆", VU = "⊋", GU = "⫌", ZU = "⫈", KU = "⫔", WU = "⫖", JU = "⤦", YU = "↙", XU = "⇙", QU = "↙", e3 = "⤪", t3 = "ß", n3 = "	", r3 = "⌖", s3 = "Τ", o3 = "τ", c3 = "⎴", i3 = "Ť", l3 = "ť", a3 = "Ţ", u3 = "ţ", f3 = "Т", h3 = "т", p3 = "⃛", d3 = "⌕", g3 = "𝔗", m3 = "𝔱", _3 = "∴", b3 = "∴", v3 = "∴", x3 = "Θ", y3 = "θ", k3 = "ϑ", E3 = "ϑ", w3 = "≈", C3 = "∼", A3 = "  ", S3 = " ", D3 = " ", T3 = "≈", R3 = "∼", q3 = "Þ", M3 = "þ", N3 = "˜", I3 = "∼", F3 = "≃", L3 = "≅", O3 = "≈", P3 = "⨱", B3 = "⊠", $3 = "×", z3 = "⨰", U3 = "∭", H3 = "⤨", j3 = "⌶", V3 = "⫱", G3 = "⊤", Z3 = "𝕋", K3 = "𝕥", W3 = "⫚", J3 = "⤩", Y3 = "‴", X3 = "™", Q3 = "™", eH = "▵", tH = "▿", nH = "◃", rH = "⊴", sH = "≜", oH = "▹", cH = "⊵", iH = "◬", lH = "≜", aH = "⨺", uH = "⃛", fH = "⨹", hH = "⧍", pH = "⨻", dH = "⏢", gH = "𝒯", mH = "𝓉", _H = "Ц", bH = "ц", vH = "Ћ", xH = "ћ", yH = "Ŧ", kH = "ŧ", EH = "≬", wH = "↞", CH = "↠", AH = "Ú", SH = "ú", DH = "↑", TH = "↟", RH = "⇑", qH = "⥉", MH = "Ў", NH = "ў", IH = "Ŭ", FH = "ŭ", LH = "Û", OH = "û", PH = "У", BH = "у", $H = "⇅", zH = "Ű", UH = "ű", HH = "⥮", jH = "⥾", VH = "𝔘", GH = "𝔲", ZH = "Ù", KH = "ù", WH = "⥣", JH = "↿", YH = "↾", XH = "▀", QH = "⌜", e6 = "⌜", t6 = "⌏", n6 = "◸", r6 = "Ū", s6 = "ū", o6 = "¨", c6 = "_", i6 = "⏟", l6 = "⎵", a6 = "⏝", u6 = "⋃", f6 = "⊎", h6 = "Ų", p6 = "ų", d6 = "𝕌", g6 = "𝕦", m6 = "⤒", _6 = "↑", b6 = "↑", v6 = "⇑", x6 = "⇅", y6 = "↕", k6 = "↕", E6 = "⇕", w6 = "⥮", C6 = "↿", A6 = "↾", S6 = "⊎", D6 = "↖", T6 = "↗", R6 = "υ", q6 = "ϒ", M6 = "ϒ", N6 = "Υ", I6 = "υ", F6 = "↥", L6 = "⊥", O6 = "⇈", P6 = "⌝", B6 = "⌝", $6 = "⌎", z6 = "Ů", U6 = "ů", H6 = "◹", j6 = "𝒰", V6 = "𝓊", G6 = "⋰", Z6 = "Ũ", K6 = "ũ", W6 = "▵", J6 = "▴", Y6 = "⇈", X6 = "Ü", Q6 = "ü", e8 = "⦧", t8 = "⦜", n8 = "ϵ", r8 = "ϰ", s8 = "∅", o8 = "ϕ", c8 = "ϖ", i8 = "∝", l8 = "↕", a8 = "⇕", u8 = "ϱ", f8 = "ς", h8 = "⊊︀", p8 = "⫋︀", d8 = "⊋︀", g8 = "⫌︀", m8 = "ϑ", _8 = "⊲", b8 = "⊳", v8 = "⫨", x8 = "⫫", y8 = "⫩", k8 = "В", E8 = "в", w8 = "⊢", C8 = "⊨", A8 = "⊩", S8 = "⊫", D8 = "⫦", T8 = "⊻", R8 = "∨", q8 = "⋁", M8 = "≚", N8 = "⋮", I8 = "|", F8 = "‖", L8 = "|", O8 = "‖", P8 = "∣", B8 = "|", $8 = "❘", z8 = "≀", U8 = " ", H8 = "𝔙", j8 = "𝔳", V8 = "⊲", G8 = "⊂⃒", Z8 = "⊃⃒", K8 = "𝕍", W8 = "𝕧", J8 = "∝", Y8 = "⊳", X8 = "𝒱", Q8 = "𝓋", ej = "⫋︀", tj = "⊊︀", nj = "⫌︀", rj = "⊋︀", sj = "⊪", oj = "⦚", cj = "Ŵ", ij = "ŵ", lj = "⩟", aj = "∧", uj = "⋀", fj = "≙", hj = "℘", pj = "𝔚", dj = "𝔴", gj = "𝕎", mj = "𝕨", _j = "℘", bj = "≀", vj = "≀", xj = "𝒲", yj = "𝓌", kj = "⋂", Ej = "◯", wj = "⋃", Cj = "▽", Aj = "𝔛", Sj = "𝔵", Dj = "⟷", Tj = "⟺", Rj = "Ξ", qj = "ξ", Mj = "⟵", Nj = "⟸", Ij = "⟼", Fj = "⋻", Lj = "⨀", Oj = "𝕏", Pj = "𝕩", Bj = "⨁", $j = "⨂", zj = "⟶", Uj = "⟹", Hj = "𝒳", jj = "𝓍", Vj = "⨆", Gj = "⨄", Zj = "△", Kj = "⋁", Wj = "⋀", Jj = "Ý", Yj = "ý", Xj = "Я", Qj = "я", e4 = "Ŷ", t4 = "ŷ", n4 = "Ы", r4 = "ы", s4 = "¥", o4 = "𝔜", c4 = "𝔶", i4 = "Ї", l4 = "ї", a4 = "𝕐", u4 = "𝕪", f4 = "𝒴", h4 = "𝓎", p4 = "Ю", d4 = "ю", g4 = "ÿ", m4 = "Ÿ", _4 = "Ź", b4 = "ź", v4 = "Ž", x4 = "ž", y4 = "З", k4 = "з", E4 = "Ż", w4 = "ż", C4 = "ℨ", A4 = "​", S4 = "Ζ", D4 = "ζ", T4 = "𝔷", R4 = "ℨ", q4 = "Ж", M4 = "ж", N4 = "⇝", I4 = "𝕫", F4 = "ℤ", L4 = "𝒵", O4 = "𝓏", P4 = "‍", B4 = "‌", $4 = {
  Aacute: Eh,
  aacute: wh,
  Abreve: Ch,
  abreve: Ah,
  ac: Sh,
  acd: Dh,
  acE: Th,
  Acirc: Rh,
  acirc: qh,
  acute: Mh,
  Acy: Nh,
  acy: Ih,
  AElig: Fh,
  aelig: Lh,
  af: Oh,
  Afr: Ph,
  afr: Bh,
  Agrave: $h,
  agrave: zh,
  alefsym: Uh,
  aleph: Hh,
  Alpha: jh,
  alpha: Vh,
  Amacr: Gh,
  amacr: Zh,
  amalg: Kh,
  amp: Wh,
  AMP: Jh,
  andand: Yh,
  And: Xh,
  and: Qh,
  andd: ep,
  andslope: tp,
  andv: np,
  ang: rp,
  ange: sp,
  angle: op,
  angmsdaa: cp,
  angmsdab: ip,
  angmsdac: lp,
  angmsdad: ap,
  angmsdae: up,
  angmsdaf: fp,
  angmsdag: hp,
  angmsdah: pp,
  angmsd: dp,
  angrt: gp,
  angrtvb: mp,
  angrtvbd: _p,
  angsph: bp,
  angst: vp,
  angzarr: xp,
  Aogon: yp,
  aogon: kp,
  Aopf: Ep,
  aopf: wp,
  apacir: Cp,
  ap: Ap,
  apE: Sp,
  ape: Dp,
  apid: Tp,
  apos: Rp,
  ApplyFunction: qp,
  approx: Mp,
  approxeq: Np,
  Aring: Ip,
  aring: Fp,
  Ascr: Lp,
  ascr: Op,
  Assign: Pp,
  ast: Bp,
  asymp: $p,
  asympeq: zp,
  Atilde: Up,
  atilde: Hp,
  Auml: jp,
  auml: Vp,
  awconint: Gp,
  awint: Zp,
  backcong: Kp,
  backepsilon: Wp,
  backprime: Jp,
  backsim: Yp,
  backsimeq: Xp,
  Backslash: Qp,
  Barv: ed,
  barvee: td,
  barwed: nd,
  Barwed: rd,
  barwedge: sd,
  bbrk: od,
  bbrktbrk: cd,
  bcong: id,
  Bcy: ld,
  bcy: ad,
  bdquo: ud,
  becaus: fd,
  because: hd,
  Because: pd,
  bemptyv: dd,
  bepsi: gd,
  bernou: md,
  Bernoullis: _d,
  Beta: bd,
  beta: vd,
  beth: xd,
  between: yd,
  Bfr: kd,
  bfr: Ed,
  bigcap: wd,
  bigcirc: Cd,
  bigcup: Ad,
  bigodot: Sd,
  bigoplus: Dd,
  bigotimes: Td,
  bigsqcup: Rd,
  bigstar: qd,
  bigtriangledown: Md,
  bigtriangleup: Nd,
  biguplus: Id,
  bigvee: Fd,
  bigwedge: Ld,
  bkarow: Od,
  blacklozenge: Pd,
  blacksquare: Bd,
  blacktriangle: $d,
  blacktriangledown: zd,
  blacktriangleleft: Ud,
  blacktriangleright: Hd,
  blank: jd,
  blk12: Vd,
  blk14: Gd,
  blk34: Zd,
  block: Kd,
  bne: Wd,
  bnequiv: Jd,
  bNot: Yd,
  bnot: Xd,
  Bopf: Qd,
  bopf: eg,
  bot: tg,
  bottom: ng,
  bowtie: rg,
  boxbox: sg,
  boxdl: og,
  boxdL: cg,
  boxDl: ig,
  boxDL: lg,
  boxdr: ag,
  boxdR: ug,
  boxDr: fg,
  boxDR: hg,
  boxh: pg,
  boxH: dg,
  boxhd: gg,
  boxHd: mg,
  boxhD: _g,
  boxHD: bg,
  boxhu: vg,
  boxHu: xg,
  boxhU: yg,
  boxHU: kg,
  boxminus: Eg,
  boxplus: wg,
  boxtimes: Cg,
  boxul: Ag,
  boxuL: Sg,
  boxUl: Dg,
  boxUL: Tg,
  boxur: Rg,
  boxuR: qg,
  boxUr: Mg,
  boxUR: Ng,
  boxv: Ig,
  boxV: Fg,
  boxvh: Lg,
  boxvH: Og,
  boxVh: Pg,
  boxVH: Bg,
  boxvl: $g,
  boxvL: zg,
  boxVl: Ug,
  boxVL: Hg,
  boxvr: jg,
  boxvR: Vg,
  boxVr: Gg,
  boxVR: Zg,
  bprime: Kg,
  breve: Wg,
  Breve: Jg,
  brvbar: Yg,
  bscr: Xg,
  Bscr: Qg,
  bsemi: em,
  bsim: tm,
  bsime: nm,
  bsolb: rm,
  bsol: sm,
  bsolhsub: om,
  bull: cm,
  bullet: im,
  bump: lm,
  bumpE: am,
  bumpe: um,
  Bumpeq: fm,
  bumpeq: hm,
  Cacute: pm,
  cacute: dm,
  capand: gm,
  capbrcup: mm,
  capcap: _m,
  cap: bm,
  Cap: vm,
  capcup: xm,
  capdot: ym,
  CapitalDifferentialD: km,
  caps: Em,
  caret: wm,
  caron: Cm,
  Cayleys: Am,
  ccaps: Sm,
  Ccaron: Dm,
  ccaron: Tm,
  Ccedil: Rm,
  ccedil: qm,
  Ccirc: Mm,
  ccirc: Nm,
  Cconint: Im,
  ccups: Fm,
  ccupssm: Lm,
  Cdot: Om,
  cdot: Pm,
  cedil: Bm,
  Cedilla: $m,
  cemptyv: zm,
  cent: Um,
  centerdot: Hm,
  CenterDot: jm,
  cfr: Vm,
  Cfr: Gm,
  CHcy: Zm,
  chcy: Km,
  check: Wm,
  checkmark: Jm,
  Chi: Ym,
  chi: Xm,
  circ: Qm,
  circeq: e_,
  circlearrowleft: t_,
  circlearrowright: n_,
  circledast: r_,
  circledcirc: s_,
  circleddash: o_,
  CircleDot: c_,
  circledR: i_,
  circledS: l_,
  CircleMinus: a_,
  CirclePlus: u_,
  CircleTimes: f_,
  cir: h_,
  cirE: p_,
  cire: d_,
  cirfnint: g_,
  cirmid: m_,
  cirscir: __,
  ClockwiseContourIntegral: b_,
  CloseCurlyDoubleQuote: v_,
  CloseCurlyQuote: x_,
  clubs: y_,
  clubsuit: k_,
  colon: E_,
  Colon: w_,
  Colone: C_,
  colone: A_,
  coloneq: S_,
  comma: D_,
  commat: T_,
  comp: R_,
  compfn: q_,
  complement: M_,
  complexes: N_,
  cong: I_,
  congdot: F_,
  Congruent: L_,
  conint: O_,
  Conint: P_,
  ContourIntegral: B_,
  copf: $_,
  Copf: z_,
  coprod: U_,
  Coproduct: H_,
  copy: j_,
  COPY: V_,
  copysr: G_,
  CounterClockwiseContourIntegral: Z_,
  crarr: K_,
  cross: W_,
  Cross: J_,
  Cscr: Y_,
  cscr: X_,
  csub: Q_,
  csube: eb,
  csup: tb,
  csupe: nb,
  ctdot: rb,
  cudarrl: sb,
  cudarrr: ob,
  cuepr: cb,
  cuesc: ib,
  cularr: lb,
  cularrp: ab,
  cupbrcap: ub,
  cupcap: fb,
  CupCap: hb,
  cup: pb,
  Cup: db,
  cupcup: gb,
  cupdot: mb,
  cupor: _b,
  cups: bb,
  curarr: vb,
  curarrm: xb,
  curlyeqprec: yb,
  curlyeqsucc: kb,
  curlyvee: Eb,
  curlywedge: wb,
  curren: Cb,
  curvearrowleft: Ab,
  curvearrowright: Sb,
  cuvee: Db,
  cuwed: Tb,
  cwconint: Rb,
  cwint: qb,
  cylcty: Mb,
  dagger: Nb,
  Dagger: Ib,
  daleth: Fb,
  darr: Lb,
  Darr: Ob,
  dArr: Pb,
  dash: Bb,
  Dashv: $b,
  dashv: zb,
  dbkarow: Ub,
  dblac: Hb,
  Dcaron: jb,
  dcaron: Vb,
  Dcy: Gb,
  dcy: Zb,
  ddagger: Kb,
  ddarr: Wb,
  DD: Jb,
  dd: Yb,
  DDotrahd: Xb,
  ddotseq: Qb,
  deg: e0,
  Del: t0,
  Delta: n0,
  delta: r0,
  demptyv: s0,
  dfisht: o0,
  Dfr: c0,
  dfr: i0,
  dHar: l0,
  dharl: a0,
  dharr: u0,
  DiacriticalAcute: f0,
  DiacriticalDot: h0,
  DiacriticalDoubleAcute: p0,
  DiacriticalGrave: d0,
  DiacriticalTilde: g0,
  diam: m0,
  diamond: _0,
  Diamond: b0,
  diamondsuit: v0,
  diams: x0,
  die: y0,
  DifferentialD: k0,
  digamma: E0,
  disin: w0,
  div: C0,
  divide: A0,
  divideontimes: S0,
  divonx: D0,
  DJcy: T0,
  djcy: R0,
  dlcorn: q0,
  dlcrop: M0,
  dollar: N0,
  Dopf: I0,
  dopf: F0,
  Dot: L0,
  dot: O0,
  DotDot: P0,
  doteq: B0,
  doteqdot: $0,
  DotEqual: z0,
  dotminus: U0,
  dotplus: H0,
  dotsquare: j0,
  doublebarwedge: V0,
  DoubleContourIntegral: G0,
  DoubleDot: Z0,
  DoubleDownArrow: K0,
  DoubleLeftArrow: W0,
  DoubleLeftRightArrow: J0,
  DoubleLeftTee: Y0,
  DoubleLongLeftArrow: X0,
  DoubleLongLeftRightArrow: Q0,
  DoubleLongRightArrow: ev,
  DoubleRightArrow: tv,
  DoubleRightTee: nv,
  DoubleUpArrow: rv,
  DoubleUpDownArrow: sv,
  DoubleVerticalBar: ov,
  DownArrowBar: cv,
  downarrow: iv,
  DownArrow: lv,
  Downarrow: av,
  DownArrowUpArrow: uv,
  DownBreve: fv,
  downdownarrows: hv,
  downharpoonleft: pv,
  downharpoonright: dv,
  DownLeftRightVector: gv,
  DownLeftTeeVector: mv,
  DownLeftVectorBar: _v,
  DownLeftVector: bv,
  DownRightTeeVector: vv,
  DownRightVectorBar: xv,
  DownRightVector: yv,
  DownTeeArrow: kv,
  DownTee: Ev,
  drbkarow: wv,
  drcorn: Cv,
  drcrop: Av,
  Dscr: Sv,
  dscr: Dv,
  DScy: Tv,
  dscy: Rv,
  dsol: qv,
  Dstrok: Mv,
  dstrok: Nv,
  dtdot: Iv,
  dtri: Fv,
  dtrif: Lv,
  duarr: Ov,
  duhar: Pv,
  dwangle: Bv,
  DZcy: $v,
  dzcy: zv,
  dzigrarr: Uv,
  Eacute: Hv,
  eacute: jv,
  easter: Vv,
  Ecaron: Gv,
  ecaron: Zv,
  Ecirc: Kv,
  ecirc: Wv,
  ecir: Jv,
  ecolon: Yv,
  Ecy: Xv,
  ecy: Qv,
  eDDot: ex,
  Edot: tx,
  edot: nx,
  eDot: rx,
  ee: sx,
  efDot: ox,
  Efr: cx,
  efr: ix,
  eg: lx,
  Egrave: ax,
  egrave: ux,
  egs: fx,
  egsdot: hx,
  el: px,
  Element: dx,
  elinters: gx,
  ell: mx,
  els: _x,
  elsdot: bx,
  Emacr: vx,
  emacr: xx,
  empty: yx,
  emptyset: kx,
  EmptySmallSquare: Ex,
  emptyv: wx,
  EmptyVerySmallSquare: Cx,
  emsp13: Ax,
  emsp14: Sx,
  emsp: Dx,
  ENG: Tx,
  eng: Rx,
  ensp: qx,
  Eogon: Mx,
  eogon: Nx,
  Eopf: Ix,
  eopf: Fx,
  epar: Lx,
  eparsl: Ox,
  eplus: Px,
  epsi: Bx,
  Epsilon: $x,
  epsilon: zx,
  epsiv: Ux,
  eqcirc: Hx,
  eqcolon: jx,
  eqsim: Vx,
  eqslantgtr: Gx,
  eqslantless: Zx,
  Equal: Kx,
  equals: Wx,
  EqualTilde: Jx,
  equest: Yx,
  Equilibrium: Xx,
  equiv: Qx,
  equivDD: ey,
  eqvparsl: ty,
  erarr: ny,
  erDot: ry,
  escr: sy,
  Escr: oy,
  esdot: cy,
  Esim: iy,
  esim: ly,
  Eta: ay,
  eta: uy,
  ETH: fy,
  eth: hy,
  Euml: py,
  euml: dy,
  euro: gy,
  excl: my,
  exist: _y,
  Exists: by,
  expectation: vy,
  exponentiale: xy,
  ExponentialE: yy,
  fallingdotseq: ky,
  Fcy: Ey,
  fcy: wy,
  female: Cy,
  ffilig: Ay,
  fflig: Sy,
  ffllig: Dy,
  Ffr: Ty,
  ffr: Ry,
  filig: qy,
  FilledSmallSquare: My,
  FilledVerySmallSquare: Ny,
  fjlig: Iy,
  flat: Fy,
  fllig: Ly,
  fltns: Oy,
  fnof: Py,
  Fopf: By,
  fopf: $y,
  forall: zy,
  ForAll: Uy,
  fork: Hy,
  forkv: jy,
  Fouriertrf: Vy,
  fpartint: Gy,
  frac12: Zy,
  frac13: Ky,
  frac14: Wy,
  frac15: Jy,
  frac16: Yy,
  frac18: Xy,
  frac23: Qy,
  frac25: ek,
  frac34: tk,
  frac35: nk,
  frac38: rk,
  frac45: sk,
  frac56: ok,
  frac58: ck,
  frac78: ik,
  frasl: lk,
  frown: ak,
  fscr: uk,
  Fscr: fk,
  gacute: hk,
  Gamma: pk,
  gamma: dk,
  Gammad: gk,
  gammad: mk,
  gap: _k,
  Gbreve: bk,
  gbreve: vk,
  Gcedil: xk,
  Gcirc: yk,
  gcirc: kk,
  Gcy: Ek,
  gcy: wk,
  Gdot: Ck,
  gdot: Ak,
  ge: Sk,
  gE: Dk,
  gEl: Tk,
  gel: Rk,
  geq: qk,
  geqq: Mk,
  geqslant: Nk,
  gescc: Ik,
  ges: Fk,
  gesdot: Lk,
  gesdoto: Ok,
  gesdotol: Pk,
  gesl: Bk,
  gesles: $k,
  Gfr: zk,
  gfr: Uk,
  gg: Hk,
  Gg: jk,
  ggg: Vk,
  gimel: Gk,
  GJcy: Zk,
  gjcy: Kk,
  gla: Wk,
  gl: Jk,
  glE: Yk,
  glj: Xk,
  gnap: Qk,
  gnapprox: eE,
  gne: tE,
  gnE: nE,
  gneq: rE,
  gneqq: sE,
  gnsim: oE,
  Gopf: cE,
  gopf: iE,
  grave: lE,
  GreaterEqual: aE,
  GreaterEqualLess: uE,
  GreaterFullEqual: fE,
  GreaterGreater: hE,
  GreaterLess: pE,
  GreaterSlantEqual: dE,
  GreaterTilde: gE,
  Gscr: mE,
  gscr: _E,
  gsim: bE,
  gsime: vE,
  gsiml: xE,
  gtcc: yE,
  gtcir: kE,
  gt: EE,
  GT: wE,
  Gt: CE,
  gtdot: AE,
  gtlPar: SE,
  gtquest: DE,
  gtrapprox: TE,
  gtrarr: RE,
  gtrdot: qE,
  gtreqless: ME,
  gtreqqless: NE,
  gtrless: IE,
  gtrsim: FE,
  gvertneqq: LE,
  gvnE: OE,
  Hacek: PE,
  hairsp: BE,
  half: $E,
  hamilt: zE,
  HARDcy: UE,
  hardcy: HE,
  harrcir: jE,
  harr: VE,
  hArr: GE,
  harrw: ZE,
  Hat: KE,
  hbar: WE,
  Hcirc: JE,
  hcirc: YE,
  hearts: XE,
  heartsuit: QE,
  hellip: ew,
  hercon: tw,
  hfr: nw,
  Hfr: rw,
  HilbertSpace: sw,
  hksearow: ow,
  hkswarow: cw,
  hoarr: iw,
  homtht: lw,
  hookleftarrow: aw,
  hookrightarrow: uw,
  hopf: fw,
  Hopf: hw,
  horbar: pw,
  HorizontalLine: dw,
  hscr: gw,
  Hscr: mw,
  hslash: _w,
  Hstrok: bw,
  hstrok: vw,
  HumpDownHump: xw,
  HumpEqual: yw,
  hybull: kw,
  hyphen: Ew,
  Iacute: ww,
  iacute: Cw,
  ic: Aw,
  Icirc: Sw,
  icirc: Dw,
  Icy: Tw,
  icy: Rw,
  Idot: qw,
  IEcy: Mw,
  iecy: Nw,
  iexcl: Iw,
  iff: Fw,
  ifr: Lw,
  Ifr: Ow,
  Igrave: Pw,
  igrave: Bw,
  ii: $w,
  iiiint: zw,
  iiint: Uw,
  iinfin: Hw,
  iiota: jw,
  IJlig: Vw,
  ijlig: Gw,
  Imacr: Zw,
  imacr: Kw,
  image: Ww,
  ImaginaryI: Jw,
  imagline: Yw,
  imagpart: Xw,
  imath: Qw,
  Im: eC,
  imof: tC,
  imped: nC,
  Implies: rC,
  incare: sC,
  in: "∈",
  infin: oC,
  infintie: cC,
  inodot: iC,
  intcal: lC,
  int: aC,
  Int: uC,
  integers: fC,
  Integral: hC,
  intercal: pC,
  Intersection: dC,
  intlarhk: gC,
  intprod: mC,
  InvisibleComma: _C,
  InvisibleTimes: bC,
  IOcy: vC,
  iocy: xC,
  Iogon: yC,
  iogon: kC,
  Iopf: EC,
  iopf: wC,
  Iota: CC,
  iota: AC,
  iprod: SC,
  iquest: DC,
  iscr: TC,
  Iscr: RC,
  isin: qC,
  isindot: MC,
  isinE: NC,
  isins: IC,
  isinsv: FC,
  isinv: LC,
  it: OC,
  Itilde: PC,
  itilde: BC,
  Iukcy: $C,
  iukcy: zC,
  Iuml: UC,
  iuml: HC,
  Jcirc: jC,
  jcirc: VC,
  Jcy: GC,
  jcy: ZC,
  Jfr: KC,
  jfr: WC,
  jmath: JC,
  Jopf: YC,
  jopf: XC,
  Jscr: QC,
  jscr: eA,
  Jsercy: tA,
  jsercy: nA,
  Jukcy: rA,
  jukcy: sA,
  Kappa: oA,
  kappa: cA,
  kappav: iA,
  Kcedil: lA,
  kcedil: aA,
  Kcy: uA,
  kcy: fA,
  Kfr: hA,
  kfr: pA,
  kgreen: dA,
  KHcy: gA,
  khcy: mA,
  KJcy: _A,
  kjcy: bA,
  Kopf: vA,
  kopf: xA,
  Kscr: yA,
  kscr: kA,
  lAarr: EA,
  Lacute: wA,
  lacute: CA,
  laemptyv: AA,
  lagran: SA,
  Lambda: DA,
  lambda: TA,
  lang: RA,
  Lang: qA,
  langd: MA,
  langle: NA,
  lap: IA,
  Laplacetrf: FA,
  laquo: LA,
  larrb: OA,
  larrbfs: PA,
  larr: BA,
  Larr: $A,
  lArr: zA,
  larrfs: UA,
  larrhk: HA,
  larrlp: jA,
  larrpl: VA,
  larrsim: GA,
  larrtl: ZA,
  latail: KA,
  lAtail: WA,
  lat: JA,
  late: YA,
  lates: XA,
  lbarr: QA,
  lBarr: e1,
  lbbrk: t1,
  lbrace: n1,
  lbrack: r1,
  lbrke: s1,
  lbrksld: o1,
  lbrkslu: c1,
  Lcaron: i1,
  lcaron: l1,
  Lcedil: a1,
  lcedil: u1,
  lceil: f1,
  lcub: h1,
  Lcy: p1,
  lcy: d1,
  ldca: g1,
  ldquo: m1,
  ldquor: _1,
  ldrdhar: b1,
  ldrushar: v1,
  ldsh: x1,
  le: y1,
  lE: k1,
  LeftAngleBracket: E1,
  LeftArrowBar: w1,
  leftarrow: C1,
  LeftArrow: A1,
  Leftarrow: S1,
  LeftArrowRightArrow: D1,
  leftarrowtail: T1,
  LeftCeiling: R1,
  LeftDoubleBracket: q1,
  LeftDownTeeVector: M1,
  LeftDownVectorBar: N1,
  LeftDownVector: I1,
  LeftFloor: F1,
  leftharpoondown: L1,
  leftharpoonup: O1,
  leftleftarrows: P1,
  leftrightarrow: B1,
  LeftRightArrow: $1,
  Leftrightarrow: z1,
  leftrightarrows: U1,
  leftrightharpoons: H1,
  leftrightsquigarrow: j1,
  LeftRightVector: V1,
  LeftTeeArrow: G1,
  LeftTee: Z1,
  LeftTeeVector: K1,
  leftthreetimes: W1,
  LeftTriangleBar: J1,
  LeftTriangle: Y1,
  LeftTriangleEqual: X1,
  LeftUpDownVector: Q1,
  LeftUpTeeVector: eS,
  LeftUpVectorBar: tS,
  LeftUpVector: nS,
  LeftVectorBar: rS,
  LeftVector: sS,
  lEg: oS,
  leg: cS,
  leq: iS,
  leqq: lS,
  leqslant: aS,
  lescc: uS,
  les: fS,
  lesdot: hS,
  lesdoto: pS,
  lesdotor: dS,
  lesg: gS,
  lesges: mS,
  lessapprox: _S,
  lessdot: bS,
  lesseqgtr: vS,
  lesseqqgtr: xS,
  LessEqualGreater: yS,
  LessFullEqual: kS,
  LessGreater: ES,
  lessgtr: wS,
  LessLess: CS,
  lesssim: AS,
  LessSlantEqual: SS,
  LessTilde: DS,
  lfisht: TS,
  lfloor: RS,
  Lfr: qS,
  lfr: MS,
  lg: NS,
  lgE: IS,
  lHar: FS,
  lhard: LS,
  lharu: OS,
  lharul: PS,
  lhblk: BS,
  LJcy: $S,
  ljcy: zS,
  llarr: US,
  ll: HS,
  Ll: jS,
  llcorner: VS,
  Lleftarrow: GS,
  llhard: ZS,
  lltri: KS,
  Lmidot: WS,
  lmidot: JS,
  lmoustache: YS,
  lmoust: XS,
  lnap: QS,
  lnapprox: eD,
  lne: tD,
  lnE: nD,
  lneq: rD,
  lneqq: sD,
  lnsim: oD,
  loang: cD,
  loarr: iD,
  lobrk: lD,
  longleftarrow: aD,
  LongLeftArrow: uD,
  Longleftarrow: fD,
  longleftrightarrow: hD,
  LongLeftRightArrow: pD,
  Longleftrightarrow: dD,
  longmapsto: gD,
  longrightarrow: mD,
  LongRightArrow: _D,
  Longrightarrow: bD,
  looparrowleft: vD,
  looparrowright: xD,
  lopar: yD,
  Lopf: kD,
  lopf: ED,
  loplus: wD,
  lotimes: CD,
  lowast: AD,
  lowbar: SD,
  LowerLeftArrow: DD,
  LowerRightArrow: TD,
  loz: RD,
  lozenge: qD,
  lozf: MD,
  lpar: ND,
  lparlt: ID,
  lrarr: FD,
  lrcorner: LD,
  lrhar: OD,
  lrhard: PD,
  lrm: BD,
  lrtri: $D,
  lsaquo: zD,
  lscr: UD,
  Lscr: HD,
  lsh: jD,
  Lsh: VD,
  lsim: GD,
  lsime: ZD,
  lsimg: KD,
  lsqb: WD,
  lsquo: JD,
  lsquor: YD,
  Lstrok: XD,
  lstrok: QD,
  ltcc: eT,
  ltcir: tT,
  lt: nT,
  LT: rT,
  Lt: sT,
  ltdot: oT,
  lthree: cT,
  ltimes: iT,
  ltlarr: lT,
  ltquest: aT,
  ltri: uT,
  ltrie: fT,
  ltrif: hT,
  ltrPar: pT,
  lurdshar: dT,
  luruhar: gT,
  lvertneqq: mT,
  lvnE: _T,
  macr: bT,
  male: vT,
  malt: xT,
  maltese: yT,
  Map: "⤅",
  map: kT,
  mapsto: ET,
  mapstodown: wT,
  mapstoleft: CT,
  mapstoup: AT,
  marker: ST,
  mcomma: DT,
  Mcy: TT,
  mcy: RT,
  mdash: qT,
  mDDot: MT,
  measuredangle: NT,
  MediumSpace: IT,
  Mellintrf: FT,
  Mfr: LT,
  mfr: OT,
  mho: PT,
  micro: BT,
  midast: $T,
  midcir: zT,
  mid: UT,
  middot: HT,
  minusb: jT,
  minus: VT,
  minusd: GT,
  minusdu: ZT,
  MinusPlus: KT,
  mlcp: WT,
  mldr: JT,
  mnplus: YT,
  models: XT,
  Mopf: QT,
  mopf: eR,
  mp: tR,
  mscr: nR,
  Mscr: rR,
  mstpos: sR,
  Mu: oR,
  mu: cR,
  multimap: iR,
  mumap: lR,
  nabla: aR,
  Nacute: uR,
  nacute: fR,
  nang: hR,
  nap: pR,
  napE: dR,
  napid: gR,
  napos: mR,
  napprox: _R,
  natural: bR,
  naturals: vR,
  natur: xR,
  nbsp: yR,
  nbump: kR,
  nbumpe: ER,
  ncap: wR,
  Ncaron: CR,
  ncaron: AR,
  Ncedil: SR,
  ncedil: DR,
  ncong: TR,
  ncongdot: RR,
  ncup: qR,
  Ncy: MR,
  ncy: NR,
  ndash: IR,
  nearhk: FR,
  nearr: LR,
  neArr: OR,
  nearrow: PR,
  ne: BR,
  nedot: $R,
  NegativeMediumSpace: zR,
  NegativeThickSpace: UR,
  NegativeThinSpace: HR,
  NegativeVeryThinSpace: jR,
  nequiv: VR,
  nesear: GR,
  nesim: ZR,
  NestedGreaterGreater: KR,
  NestedLessLess: WR,
  NewLine: JR,
  nexist: YR,
  nexists: XR,
  Nfr: QR,
  nfr: eq,
  ngE: tq,
  nge: nq,
  ngeq: rq,
  ngeqq: sq,
  ngeqslant: oq,
  nges: cq,
  nGg: iq,
  ngsim: lq,
  nGt: aq,
  ngt: uq,
  ngtr: fq,
  nGtv: hq,
  nharr: pq,
  nhArr: dq,
  nhpar: gq,
  ni: mq,
  nis: _q,
  nisd: bq,
  niv: vq,
  NJcy: xq,
  njcy: yq,
  nlarr: kq,
  nlArr: Eq,
  nldr: wq,
  nlE: Cq,
  nle: Aq,
  nleftarrow: Sq,
  nLeftarrow: Dq,
  nleftrightarrow: Tq,
  nLeftrightarrow: Rq,
  nleq: qq,
  nleqq: Mq,
  nleqslant: Nq,
  nles: Iq,
  nless: Fq,
  nLl: Lq,
  nlsim: Oq,
  nLt: Pq,
  nlt: Bq,
  nltri: $q,
  nltrie: zq,
  nLtv: Uq,
  nmid: Hq,
  NoBreak: jq,
  NonBreakingSpace: Vq,
  nopf: Gq,
  Nopf: Zq,
  Not: Kq,
  not: Wq,
  NotCongruent: Jq,
  NotCupCap: Yq,
  NotDoubleVerticalBar: Xq,
  NotElement: Qq,
  NotEqual: eM,
  NotEqualTilde: tM,
  NotExists: nM,
  NotGreater: rM,
  NotGreaterEqual: sM,
  NotGreaterFullEqual: oM,
  NotGreaterGreater: cM,
  NotGreaterLess: iM,
  NotGreaterSlantEqual: lM,
  NotGreaterTilde: aM,
  NotHumpDownHump: uM,
  NotHumpEqual: fM,
  notin: hM,
  notindot: pM,
  notinE: dM,
  notinva: gM,
  notinvb: mM,
  notinvc: _M,
  NotLeftTriangleBar: bM,
  NotLeftTriangle: vM,
  NotLeftTriangleEqual: xM,
  NotLess: yM,
  NotLessEqual: kM,
  NotLessGreater: EM,
  NotLessLess: wM,
  NotLessSlantEqual: CM,
  NotLessTilde: AM,
  NotNestedGreaterGreater: SM,
  NotNestedLessLess: DM,
  notni: TM,
  notniva: RM,
  notnivb: qM,
  notnivc: MM,
  NotPrecedes: NM,
  NotPrecedesEqual: IM,
  NotPrecedesSlantEqual: FM,
  NotReverseElement: LM,
  NotRightTriangleBar: OM,
  NotRightTriangle: PM,
  NotRightTriangleEqual: BM,
  NotSquareSubset: $M,
  NotSquareSubsetEqual: zM,
  NotSquareSuperset: UM,
  NotSquareSupersetEqual: HM,
  NotSubset: jM,
  NotSubsetEqual: VM,
  NotSucceeds: GM,
  NotSucceedsEqual: ZM,
  NotSucceedsSlantEqual: KM,
  NotSucceedsTilde: WM,
  NotSuperset: JM,
  NotSupersetEqual: YM,
  NotTilde: XM,
  NotTildeEqual: QM,
  NotTildeFullEqual: eN,
  NotTildeTilde: tN,
  NotVerticalBar: nN,
  nparallel: rN,
  npar: sN,
  nparsl: oN,
  npart: cN,
  npolint: iN,
  npr: lN,
  nprcue: aN,
  nprec: uN,
  npreceq: fN,
  npre: hN,
  nrarrc: pN,
  nrarr: dN,
  nrArr: gN,
  nrarrw: mN,
  nrightarrow: _N,
  nRightarrow: bN,
  nrtri: vN,
  nrtrie: xN,
  nsc: yN,
  nsccue: kN,
  nsce: EN,
  Nscr: wN,
  nscr: CN,
  nshortmid: AN,
  nshortparallel: SN,
  nsim: DN,
  nsime: TN,
  nsimeq: RN,
  nsmid: qN,
  nspar: MN,
  nsqsube: NN,
  nsqsupe: IN,
  nsub: FN,
  nsubE: LN,
  nsube: ON,
  nsubset: PN,
  nsubseteq: BN,
  nsubseteqq: $N,
  nsucc: zN,
  nsucceq: UN,
  nsup: HN,
  nsupE: jN,
  nsupe: VN,
  nsupset: GN,
  nsupseteq: ZN,
  nsupseteqq: KN,
  ntgl: WN,
  Ntilde: JN,
  ntilde: YN,
  ntlg: XN,
  ntriangleleft: QN,
  ntrianglelefteq: eI,
  ntriangleright: tI,
  ntrianglerighteq: nI,
  Nu: rI,
  nu: sI,
  num: oI,
  numero: cI,
  numsp: iI,
  nvap: lI,
  nvdash: aI,
  nvDash: uI,
  nVdash: fI,
  nVDash: hI,
  nvge: pI,
  nvgt: dI,
  nvHarr: gI,
  nvinfin: mI,
  nvlArr: _I,
  nvle: bI,
  nvlt: vI,
  nvltrie: xI,
  nvrArr: yI,
  nvrtrie: kI,
  nvsim: EI,
  nwarhk: wI,
  nwarr: CI,
  nwArr: AI,
  nwarrow: SI,
  nwnear: DI,
  Oacute: TI,
  oacute: RI,
  oast: qI,
  Ocirc: MI,
  ocirc: NI,
  ocir: II,
  Ocy: FI,
  ocy: LI,
  odash: OI,
  Odblac: PI,
  odblac: BI,
  odiv: $I,
  odot: zI,
  odsold: UI,
  OElig: HI,
  oelig: jI,
  ofcir: VI,
  Ofr: GI,
  ofr: ZI,
  ogon: KI,
  Ograve: WI,
  ograve: JI,
  ogt: YI,
  ohbar: XI,
  ohm: QI,
  oint: eF,
  olarr: tF,
  olcir: nF,
  olcross: rF,
  oline: sF,
  olt: oF,
  Omacr: cF,
  omacr: iF,
  Omega: lF,
  omega: aF,
  Omicron: uF,
  omicron: fF,
  omid: hF,
  ominus: pF,
  Oopf: dF,
  oopf: gF,
  opar: mF,
  OpenCurlyDoubleQuote: _F,
  OpenCurlyQuote: bF,
  operp: vF,
  oplus: xF,
  orarr: yF,
  Or: kF,
  or: EF,
  ord: wF,
  order: CF,
  orderof: AF,
  ordf: SF,
  ordm: DF,
  origof: TF,
  oror: RF,
  orslope: qF,
  orv: MF,
  oS: NF,
  Oscr: IF,
  oscr: FF,
  Oslash: LF,
  oslash: OF,
  osol: PF,
  Otilde: BF,
  otilde: $F,
  otimesas: zF,
  Otimes: UF,
  otimes: HF,
  Ouml: jF,
  ouml: VF,
  ovbar: GF,
  OverBar: ZF,
  OverBrace: KF,
  OverBracket: WF,
  OverParenthesis: JF,
  para: YF,
  parallel: XF,
  par: QF,
  parsim: eL,
  parsl: tL,
  part: nL,
  PartialD: rL,
  Pcy: sL,
  pcy: oL,
  percnt: cL,
  period: iL,
  permil: lL,
  perp: aL,
  pertenk: uL,
  Pfr: fL,
  pfr: hL,
  Phi: pL,
  phi: dL,
  phiv: gL,
  phmmat: mL,
  phone: _L,
  Pi: bL,
  pi: vL,
  pitchfork: xL,
  piv: yL,
  planck: kL,
  planckh: EL,
  plankv: wL,
  plusacir: CL,
  plusb: AL,
  pluscir: SL,
  plus: DL,
  plusdo: TL,
  plusdu: RL,
  pluse: qL,
  PlusMinus: ML,
  plusmn: NL,
  plussim: IL,
  plustwo: FL,
  pm: LL,
  Poincareplane: OL,
  pointint: PL,
  popf: BL,
  Popf: $L,
  pound: zL,
  prap: UL,
  Pr: HL,
  pr: jL,
  prcue: VL,
  precapprox: GL,
  prec: ZL,
  preccurlyeq: KL,
  Precedes: WL,
  PrecedesEqual: JL,
  PrecedesSlantEqual: YL,
  PrecedesTilde: XL,
  preceq: QL,
  precnapprox: eO,
  precneqq: tO,
  precnsim: nO,
  pre: rO,
  prE: sO,
  precsim: oO,
  prime: cO,
  Prime: iO,
  primes: lO,
  prnap: aO,
  prnE: uO,
  prnsim: fO,
  prod: hO,
  Product: pO,
  profalar: dO,
  profline: gO,
  profsurf: mO,
  prop: _O,
  Proportional: bO,
  Proportion: vO,
  propto: xO,
  prsim: yO,
  prurel: kO,
  Pscr: EO,
  pscr: wO,
  Psi: CO,
  psi: AO,
  puncsp: SO,
  Qfr: DO,
  qfr: TO,
  qint: RO,
  qopf: qO,
  Qopf: MO,
  qprime: NO,
  Qscr: IO,
  qscr: FO,
  quaternions: LO,
  quatint: OO,
  quest: PO,
  questeq: BO,
  quot: $O,
  QUOT: zO,
  rAarr: UO,
  race: HO,
  Racute: jO,
  racute: VO,
  radic: GO,
  raemptyv: ZO,
  rang: KO,
  Rang: WO,
  rangd: JO,
  range: YO,
  rangle: XO,
  raquo: QO,
  rarrap: eP,
  rarrb: tP,
  rarrbfs: nP,
  rarrc: rP,
  rarr: sP,
  Rarr: oP,
  rArr: cP,
  rarrfs: iP,
  rarrhk: lP,
  rarrlp: aP,
  rarrpl: uP,
  rarrsim: fP,
  Rarrtl: hP,
  rarrtl: pP,
  rarrw: dP,
  ratail: gP,
  rAtail: mP,
  ratio: _P,
  rationals: bP,
  rbarr: vP,
  rBarr: xP,
  RBarr: yP,
  rbbrk: kP,
  rbrace: EP,
  rbrack: wP,
  rbrke: CP,
  rbrksld: AP,
  rbrkslu: SP,
  Rcaron: DP,
  rcaron: TP,
  Rcedil: RP,
  rcedil: qP,
  rceil: MP,
  rcub: NP,
  Rcy: IP,
  rcy: FP,
  rdca: LP,
  rdldhar: OP,
  rdquo: PP,
  rdquor: BP,
  rdsh: $P,
  real: zP,
  realine: UP,
  realpart: HP,
  reals: jP,
  Re: VP,
  rect: GP,
  reg: ZP,
  REG: KP,
  ReverseElement: WP,
  ReverseEquilibrium: JP,
  ReverseUpEquilibrium: YP,
  rfisht: XP,
  rfloor: QP,
  rfr: eB,
  Rfr: tB,
  rHar: nB,
  rhard: rB,
  rharu: sB,
  rharul: oB,
  Rho: cB,
  rho: iB,
  rhov: lB,
  RightAngleBracket: aB,
  RightArrowBar: uB,
  rightarrow: fB,
  RightArrow: hB,
  Rightarrow: pB,
  RightArrowLeftArrow: dB,
  rightarrowtail: gB,
  RightCeiling: mB,
  RightDoubleBracket: _B,
  RightDownTeeVector: bB,
  RightDownVectorBar: vB,
  RightDownVector: xB,
  RightFloor: yB,
  rightharpoondown: kB,
  rightharpoonup: EB,
  rightleftarrows: wB,
  rightleftharpoons: CB,
  rightrightarrows: AB,
  rightsquigarrow: SB,
  RightTeeArrow: DB,
  RightTee: TB,
  RightTeeVector: RB,
  rightthreetimes: qB,
  RightTriangleBar: MB,
  RightTriangle: NB,
  RightTriangleEqual: IB,
  RightUpDownVector: FB,
  RightUpTeeVector: LB,
  RightUpVectorBar: OB,
  RightUpVector: PB,
  RightVectorBar: BB,
  RightVector: $B,
  ring: zB,
  risingdotseq: UB,
  rlarr: HB,
  rlhar: jB,
  rlm: VB,
  rmoustache: GB,
  rmoust: ZB,
  rnmid: KB,
  roang: WB,
  roarr: JB,
  robrk: YB,
  ropar: XB,
  ropf: QB,
  Ropf: e2,
  roplus: t2,
  rotimes: n2,
  RoundImplies: r2,
  rpar: s2,
  rpargt: o2,
  rppolint: c2,
  rrarr: i2,
  Rrightarrow: l2,
  rsaquo: a2,
  rscr: u2,
  Rscr: f2,
  rsh: h2,
  Rsh: p2,
  rsqb: d2,
  rsquo: g2,
  rsquor: m2,
  rthree: _2,
  rtimes: b2,
  rtri: v2,
  rtrie: x2,
  rtrif: y2,
  rtriltri: k2,
  RuleDelayed: E2,
  ruluhar: w2,
  rx: C2,
  Sacute: A2,
  sacute: S2,
  sbquo: D2,
  scap: T2,
  Scaron: R2,
  scaron: q2,
  Sc: M2,
  sc: N2,
  sccue: I2,
  sce: F2,
  scE: L2,
  Scedil: O2,
  scedil: P2,
  Scirc: B2,
  scirc: $2,
  scnap: z2,
  scnE: U2,
  scnsim: H2,
  scpolint: j2,
  scsim: V2,
  Scy: G2,
  scy: Z2,
  sdotb: K2,
  sdot: W2,
  sdote: J2,
  searhk: Y2,
  searr: X2,
  seArr: Q2,
  searrow: e$,
  sect: t$,
  semi: n$,
  seswar: r$,
  setminus: s$,
  setmn: o$,
  sext: c$,
  Sfr: i$,
  sfr: l$,
  sfrown: a$,
  sharp: u$,
  SHCHcy: f$,
  shchcy: h$,
  SHcy: p$,
  shcy: d$,
  ShortDownArrow: g$,
  ShortLeftArrow: m$,
  shortmid: _$,
  shortparallel: b$,
  ShortRightArrow: v$,
  ShortUpArrow: x$,
  shy: y$,
  Sigma: k$,
  sigma: E$,
  sigmaf: w$,
  sigmav: C$,
  sim: A$,
  simdot: S$,
  sime: D$,
  simeq: T$,
  simg: R$,
  simgE: q$,
  siml: M$,
  simlE: N$,
  simne: I$,
  simplus: F$,
  simrarr: L$,
  slarr: O$,
  SmallCircle: P$,
  smallsetminus: B$,
  smashp: $$,
  smeparsl: z$,
  smid: U$,
  smile: H$,
  smt: j$,
  smte: V$,
  smtes: G$,
  SOFTcy: Z$,
  softcy: K$,
  solbar: W$,
  solb: J$,
  sol: Y$,
  Sopf: X$,
  sopf: Q$,
  spades: ez,
  spadesuit: tz,
  spar: nz,
  sqcap: rz,
  sqcaps: sz,
  sqcup: oz,
  sqcups: cz,
  Sqrt: iz,
  sqsub: lz,
  sqsube: az,
  sqsubset: uz,
  sqsubseteq: fz,
  sqsup: hz,
  sqsupe: pz,
  sqsupset: dz,
  sqsupseteq: gz,
  square: mz,
  Square: _z,
  SquareIntersection: bz,
  SquareSubset: vz,
  SquareSubsetEqual: xz,
  SquareSuperset: yz,
  SquareSupersetEqual: kz,
  SquareUnion: Ez,
  squarf: wz,
  squ: Cz,
  squf: Az,
  srarr: Sz,
  Sscr: Dz,
  sscr: Tz,
  ssetmn: Rz,
  ssmile: qz,
  sstarf: Mz,
  Star: Nz,
  star: Iz,
  starf: Fz,
  straightepsilon: Lz,
  straightphi: Oz,
  strns: Pz,
  sub: Bz,
  Sub: $z,
  subdot: zz,
  subE: Uz,
  sube: Hz,
  subedot: jz,
  submult: Vz,
  subnE: Gz,
  subne: Zz,
  subplus: Kz,
  subrarr: Wz,
  subset: Jz,
  Subset: Yz,
  subseteq: Xz,
  subseteqq: Qz,
  SubsetEqual: eU,
  subsetneq: tU,
  subsetneqq: nU,
  subsim: rU,
  subsub: sU,
  subsup: oU,
  succapprox: cU,
  succ: iU,
  succcurlyeq: lU,
  Succeeds: aU,
  SucceedsEqual: uU,
  SucceedsSlantEqual: fU,
  SucceedsTilde: hU,
  succeq: pU,
  succnapprox: dU,
  succneqq: gU,
  succnsim: mU,
  succsim: _U,
  SuchThat: bU,
  sum: vU,
  Sum: xU,
  sung: yU,
  sup1: kU,
  sup2: EU,
  sup3: wU,
  sup: CU,
  Sup: AU,
  supdot: SU,
  supdsub: DU,
  supE: TU,
  supe: RU,
  supedot: qU,
  Superset: MU,
  SupersetEqual: NU,
  suphsol: IU,
  suphsub: FU,
  suplarr: LU,
  supmult: OU,
  supnE: PU,
  supne: BU,
  supplus: $U,
  supset: zU,
  Supset: UU,
  supseteq: HU,
  supseteqq: jU,
  supsetneq: VU,
  supsetneqq: GU,
  supsim: ZU,
  supsub: KU,
  supsup: WU,
  swarhk: JU,
  swarr: YU,
  swArr: XU,
  swarrow: QU,
  swnwar: e3,
  szlig: t3,
  Tab: n3,
  target: r3,
  Tau: s3,
  tau: o3,
  tbrk: c3,
  Tcaron: i3,
  tcaron: l3,
  Tcedil: a3,
  tcedil: u3,
  Tcy: f3,
  tcy: h3,
  tdot: p3,
  telrec: d3,
  Tfr: g3,
  tfr: m3,
  there4: _3,
  therefore: b3,
  Therefore: v3,
  Theta: x3,
  theta: y3,
  thetasym: k3,
  thetav: E3,
  thickapprox: w3,
  thicksim: C3,
  ThickSpace: A3,
  ThinSpace: S3,
  thinsp: D3,
  thkap: T3,
  thksim: R3,
  THORN: q3,
  thorn: M3,
  tilde: N3,
  Tilde: I3,
  TildeEqual: F3,
  TildeFullEqual: L3,
  TildeTilde: O3,
  timesbar: P3,
  timesb: B3,
  times: $3,
  timesd: z3,
  tint: U3,
  toea: H3,
  topbot: j3,
  topcir: V3,
  top: G3,
  Topf: Z3,
  topf: K3,
  topfork: W3,
  tosa: J3,
  tprime: Y3,
  trade: X3,
  TRADE: Q3,
  triangle: eH,
  triangledown: tH,
  triangleleft: nH,
  trianglelefteq: rH,
  triangleq: sH,
  triangleright: oH,
  trianglerighteq: cH,
  tridot: iH,
  trie: lH,
  triminus: aH,
  TripleDot: uH,
  triplus: fH,
  trisb: hH,
  tritime: pH,
  trpezium: dH,
  Tscr: gH,
  tscr: mH,
  TScy: _H,
  tscy: bH,
  TSHcy: vH,
  tshcy: xH,
  Tstrok: yH,
  tstrok: kH,
  twixt: EH,
  twoheadleftarrow: wH,
  twoheadrightarrow: CH,
  Uacute: AH,
  uacute: SH,
  uarr: DH,
  Uarr: TH,
  uArr: RH,
  Uarrocir: qH,
  Ubrcy: MH,
  ubrcy: NH,
  Ubreve: IH,
  ubreve: FH,
  Ucirc: LH,
  ucirc: OH,
  Ucy: PH,
  ucy: BH,
  udarr: $H,
  Udblac: zH,
  udblac: UH,
  udhar: HH,
  ufisht: jH,
  Ufr: VH,
  ufr: GH,
  Ugrave: ZH,
  ugrave: KH,
  uHar: WH,
  uharl: JH,
  uharr: YH,
  uhblk: XH,
  ulcorn: QH,
  ulcorner: e6,
  ulcrop: t6,
  ultri: n6,
  Umacr: r6,
  umacr: s6,
  uml: o6,
  UnderBar: c6,
  UnderBrace: i6,
  UnderBracket: l6,
  UnderParenthesis: a6,
  Union: u6,
  UnionPlus: f6,
  Uogon: h6,
  uogon: p6,
  Uopf: d6,
  uopf: g6,
  UpArrowBar: m6,
  uparrow: _6,
  UpArrow: b6,
  Uparrow: v6,
  UpArrowDownArrow: x6,
  updownarrow: y6,
  UpDownArrow: k6,
  Updownarrow: E6,
  UpEquilibrium: w6,
  upharpoonleft: C6,
  upharpoonright: A6,
  uplus: S6,
  UpperLeftArrow: D6,
  UpperRightArrow: T6,
  upsi: R6,
  Upsi: q6,
  upsih: M6,
  Upsilon: N6,
  upsilon: I6,
  UpTeeArrow: F6,
  UpTee: L6,
  upuparrows: O6,
  urcorn: P6,
  urcorner: B6,
  urcrop: $6,
  Uring: z6,
  uring: U6,
  urtri: H6,
  Uscr: j6,
  uscr: V6,
  utdot: G6,
  Utilde: Z6,
  utilde: K6,
  utri: W6,
  utrif: J6,
  uuarr: Y6,
  Uuml: X6,
  uuml: Q6,
  uwangle: e8,
  vangrt: t8,
  varepsilon: n8,
  varkappa: r8,
  varnothing: s8,
  varphi: o8,
  varpi: c8,
  varpropto: i8,
  varr: l8,
  vArr: a8,
  varrho: u8,
  varsigma: f8,
  varsubsetneq: h8,
  varsubsetneqq: p8,
  varsupsetneq: d8,
  varsupsetneqq: g8,
  vartheta: m8,
  vartriangleleft: _8,
  vartriangleright: b8,
  vBar: v8,
  Vbar: x8,
  vBarv: y8,
  Vcy: k8,
  vcy: E8,
  vdash: w8,
  vDash: C8,
  Vdash: A8,
  VDash: S8,
  Vdashl: D8,
  veebar: T8,
  vee: R8,
  Vee: q8,
  veeeq: M8,
  vellip: N8,
  verbar: I8,
  Verbar: F8,
  vert: L8,
  Vert: O8,
  VerticalBar: P8,
  VerticalLine: B8,
  VerticalSeparator: $8,
  VerticalTilde: z8,
  VeryThinSpace: U8,
  Vfr: H8,
  vfr: j8,
  vltri: V8,
  vnsub: G8,
  vnsup: Z8,
  Vopf: K8,
  vopf: W8,
  vprop: J8,
  vrtri: Y8,
  Vscr: X8,
  vscr: Q8,
  vsubnE: ej,
  vsubne: tj,
  vsupnE: nj,
  vsupne: rj,
  Vvdash: sj,
  vzigzag: oj,
  Wcirc: cj,
  wcirc: ij,
  wedbar: lj,
  wedge: aj,
  Wedge: uj,
  wedgeq: fj,
  weierp: hj,
  Wfr: pj,
  wfr: dj,
  Wopf: gj,
  wopf: mj,
  wp: _j,
  wr: bj,
  wreath: vj,
  Wscr: xj,
  wscr: yj,
  xcap: kj,
  xcirc: Ej,
  xcup: wj,
  xdtri: Cj,
  Xfr: Aj,
  xfr: Sj,
  xharr: Dj,
  xhArr: Tj,
  Xi: Rj,
  xi: qj,
  xlarr: Mj,
  xlArr: Nj,
  xmap: Ij,
  xnis: Fj,
  xodot: Lj,
  Xopf: Oj,
  xopf: Pj,
  xoplus: Bj,
  xotime: $j,
  xrarr: zj,
  xrArr: Uj,
  Xscr: Hj,
  xscr: jj,
  xsqcup: Vj,
  xuplus: Gj,
  xutri: Zj,
  xvee: Kj,
  xwedge: Wj,
  Yacute: Jj,
  yacute: Yj,
  YAcy: Xj,
  yacy: Qj,
  Ycirc: e4,
  ycirc: t4,
  Ycy: n4,
  ycy: r4,
  yen: s4,
  Yfr: o4,
  yfr: c4,
  YIcy: i4,
  yicy: l4,
  Yopf: a4,
  yopf: u4,
  Yscr: f4,
  yscr: h4,
  YUcy: p4,
  yucy: d4,
  yuml: g4,
  Yuml: m4,
  Zacute: _4,
  zacute: b4,
  Zcaron: v4,
  zcaron: x4,
  Zcy: y4,
  zcy: k4,
  Zdot: E4,
  zdot: w4,
  zeetrf: C4,
  ZeroWidthSpace: A4,
  Zeta: S4,
  zeta: D4,
  zfr: T4,
  Zfr: R4,
  ZHcy: q4,
  zhcy: M4,
  zigrarr: N4,
  zopf: I4,
  Zopf: F4,
  Zscr: L4,
  zscr: O4,
  zwj: P4,
  zwnj: B4
};
var Ki = $4, Us = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Qt = {}, Zo = {};
function z4(t) {
  var e, n, r = Zo[t];
  if (r)
    return r;
  for (r = Zo[t] = [], e = 0; e < 128; e++)
    n = String.fromCharCode(e), /^[0-9a-z]$/i.test(n) ? r.push(n) : r.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
  for (e = 0; e < t.length; e++)
    r[t.charCodeAt(e)] = t[e];
  return r;
}
function br(t, e, n) {
  var r, s, o, c, i, l = "";
  for (typeof e != "string" && (n = e, e = br.defaultChars), typeof n > "u" && (n = !0), i = z4(e), r = 0, s = t.length; r < s; r++) {
    if (o = t.charCodeAt(r), n && o === 37 && r + 2 < s && /^[0-9a-f]{2}$/i.test(t.slice(r + 1, r + 3))) {
      l += t.slice(r, r + 3), r += 2;
      continue;
    }
    if (o < 128) {
      l += i[o];
      continue;
    }
    if (o >= 55296 && o <= 57343) {
      if (o >= 55296 && o <= 56319 && r + 1 < s && (c = t.charCodeAt(r + 1), c >= 56320 && c <= 57343)) {
        l += encodeURIComponent(t[r] + t[r + 1]), r++;
        continue;
      }
      l += "%EF%BF%BD";
      continue;
    }
    l += encodeURIComponent(t[r]);
  }
  return l;
}
br.defaultChars = ";/?:@&=+$,-_.!~*'()#";
br.componentChars = "-_.!~*'()";
var U4 = br, Ko = {};
function H4(t) {
  var e, n, r = Ko[t];
  if (r)
    return r;
  for (r = Ko[t] = [], e = 0; e < 128; e++)
    n = String.fromCharCode(e), r.push(n);
  for (e = 0; e < t.length; e++)
    n = t.charCodeAt(e), r[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  return r;
}
function vr(t, e) {
  var n;
  return typeof e != "string" && (e = vr.defaultChars), n = H4(e), t.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    var s, o, c, i, l, a, u, f = "";
    for (s = 0, o = r.length; s < o; s += 3) {
      if (c = parseInt(r.slice(s + 1, s + 3), 16), c < 128) {
        f += n[c];
        continue;
      }
      if ((c & 224) === 192 && s + 3 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), (i & 192) === 128)) {
        u = c << 6 & 1984 | i & 63, u < 128 ? f += "��" : f += String.fromCharCode(u), s += 3;
        continue;
      }
      if ((c & 240) === 224 && s + 6 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), l = parseInt(r.slice(s + 7, s + 9), 16), (i & 192) === 128 && (l & 192) === 128)) {
        u = c << 12 & 61440 | i << 6 & 4032 | l & 63, u < 2048 || u >= 55296 && u <= 57343 ? f += "���" : f += String.fromCharCode(u), s += 6;
        continue;
      }
      if ((c & 248) === 240 && s + 9 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), l = parseInt(r.slice(s + 7, s + 9), 16), a = parseInt(r.slice(s + 10, s + 12), 16), (i & 192) === 128 && (l & 192) === 128 && (a & 192) === 128)) {
        u = c << 18 & 1835008 | i << 12 & 258048 | l << 6 & 4032 | a & 63, u < 65536 || u > 1114111 ? f += "����" : (u -= 65536, f += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023))), s += 9;
        continue;
      }
      f += "�";
    }
    return f;
  });
}
vr.defaultChars = ";/?:@&=+$,#";
vr.componentChars = "";
var j4 = vr, V4 = function(e) {
  var n = "";
  return n += e.protocol || "", n += e.slashes ? "//" : "", n += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? n += "[" + e.hostname + "]" : n += e.hostname || "", n += e.port ? ":" + e.port : "", n += e.pathname || "", n += e.search || "", n += e.hash || "", n;
};
function rr() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var G4 = /^([a-z0-9.+-]+:)/i, Z4 = /:[0-9]*$/, K4 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, W4 = ["<", ">", '"', "`", " ", "\r", `
`, "	"], J4 = ["{", "}", "|", "\\", "^", "`"].concat(W4), Y4 = ["'"].concat(J4), Wo = ["%", "/", "?", ";", "#"].concat(Y4), Jo = ["/", "?", "#"], X4 = 255, Yo = /^[+a-z0-9A-Z_-]{0,63}$/, Q4 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Xo = {
  javascript: !0,
  "javascript:": !0
}, Qo = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function e5(t, e) {
  if (t && t instanceof rr)
    return t;
  var n = new rr();
  return n.parse(t, e), n;
}
rr.prototype.parse = function(t, e) {
  var n, r, s, o, c, i = t;
  if (i = i.trim(), !e && t.split("#").length === 1) {
    var l = K4.exec(i);
    if (l)
      return this.pathname = l[1], l[2] && (this.search = l[2]), this;
  }
  var a = G4.exec(i);
  if (a && (a = a[0], s = a.toLowerCase(), this.protocol = a, i = i.substr(a.length)), (e || a || i.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = i.substr(0, 2) === "//", c && !(a && Xo[a]) && (i = i.substr(2), this.slashes = !0)), !Xo[a] && (c || a && !Qo[a])) {
    var u = -1;
    for (n = 0; n < Jo.length; n++)
      o = i.indexOf(Jo[n]), o !== -1 && (u === -1 || o < u) && (u = o);
    var f, h;
    for (u === -1 ? h = i.lastIndexOf("@") : h = i.lastIndexOf("@", u), h !== -1 && (f = i.slice(0, h), i = i.slice(h + 1), this.auth = f), u = -1, n = 0; n < Wo.length; n++)
      o = i.indexOf(Wo[n]), o !== -1 && (u === -1 || o < u) && (u = o);
    u === -1 && (u = i.length), i[u - 1] === ":" && u--;
    var d = i.slice(0, u);
    i = i.slice(u), this.parseHost(d), this.hostname = this.hostname || "";
    var k = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!k) {
      var b = this.hostname.split(/\./);
      for (n = 0, r = b.length; n < r; n++) {
        var I = b[n];
        if (I && !I.match(Yo)) {
          for (var T = "", C = 0, N = I.length; C < N; C++)
            I.charCodeAt(C) > 127 ? T += "x" : T += I[C];
          if (!T.match(Yo)) {
            var A = b.slice(0, n), j = b.slice(n + 1), q = I.match(Q4);
            q && (A.push(q[1]), j.unshift(q[2])), j.length && (i = j.join(".") + i), this.hostname = A.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > X4 && (this.hostname = ""), k && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var W = i.indexOf("#");
  W !== -1 && (this.hash = i.substr(W), i = i.slice(0, W));
  var $ = i.indexOf("?");
  return $ !== -1 && (this.search = i.substr($), i = i.slice(0, $)), i && (this.pathname = i), Qo[s] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
rr.prototype.parseHost = function(t) {
  var e = Z4.exec(t);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t);
};
var t5 = e5;
Qt.encode = U4;
Qt.decode = j4;
Qt.format = V4;
Qt.parse = t5;
var xt = {}, Or, ec;
function Wi() {
  return ec || (ec = 1, Or = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), Or;
}
var Pr, tc;
function Ji() {
  return tc || (tc = 1, Pr = /[\0-\x1F\x7F-\x9F]/), Pr;
}
var Br, nc;
function n5() {
  return nc || (nc = 1, Br = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), Br;
}
var $r, rc;
function Yi() {
  return rc || (rc = 1, $r = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), $r;
}
var sc;
function r5() {
  return sc || (sc = 1, xt.Any = Wi(), xt.Cc = Ji(), xt.Cf = n5(), xt.P = Us, xt.Z = Yi()), xt;
}
(function(t) {
  function e(D) {
    return Object.prototype.toString.call(D);
  }
  function n(D) {
    return e(D) === "[object String]";
  }
  var r = Object.prototype.hasOwnProperty;
  function s(D, ne) {
    return r.call(D, ne);
  }
  function o(D) {
    var ne = Array.prototype.slice.call(arguments, 1);
    return ne.forEach(function(V) {
      if (V) {
        if (typeof V != "object")
          throw new TypeError(V + "must be object");
        Object.keys(V).forEach(function(v) {
          D[v] = V[v];
        });
      }
    }), D;
  }
  function c(D, ne, V) {
    return [].concat(D.slice(0, ne), V, D.slice(ne + 1));
  }
  function i(D) {
    return !(D >= 55296 && D <= 57343 || D >= 64976 && D <= 65007 || (D & 65535) === 65535 || (D & 65535) === 65534 || D >= 0 && D <= 8 || D === 11 || D >= 14 && D <= 31 || D >= 127 && D <= 159 || D > 1114111);
  }
  function l(D) {
    if (D > 65535) {
      D -= 65536;
      var ne = 55296 + (D >> 10), V = 56320 + (D & 1023);
      return String.fromCharCode(ne, V);
    }
    return String.fromCharCode(D);
  }
  var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, u = /&([a-z#][a-z0-9]{1,31});/gi, f = new RegExp(a.source + "|" + u.source, "gi"), h = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, d = Ki;
  function k(D, ne) {
    var V = 0;
    return s(d, ne) ? d[ne] : ne.charCodeAt(0) === 35 && h.test(ne) && (V = ne[1].toLowerCase() === "x" ? parseInt(ne.slice(2), 16) : parseInt(ne.slice(1), 10), i(V)) ? l(V) : D;
  }
  function b(D) {
    return D.indexOf("\\") < 0 ? D : D.replace(a, "$1");
  }
  function I(D) {
    return D.indexOf("\\") < 0 && D.indexOf("&") < 0 ? D : D.replace(f, function(ne, V, v) {
      return V || k(ne, v);
    });
  }
  var T = /[&<>"]/, C = /[&<>"]/g, N = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function A(D) {
    return N[D];
  }
  function j(D) {
    return T.test(D) ? D.replace(C, A) : D;
  }
  var q = /[.?*+^$[\]\\(){}|-]/g;
  function W(D) {
    return D.replace(q, "\\$&");
  }
  function $(D) {
    switch (D) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }
  function X(D) {
    if (D >= 8192 && D <= 8202)
      return !0;
    switch (D) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }
  var z = Us;
  function J(D) {
    return z.test(D);
  }
  function B(D) {
    switch (D) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  function re(D) {
    return D = D.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (D = D.replace(/ẞ/g, "ß")), D.toLowerCase().toUpperCase();
  }
  t.lib = {}, t.lib.mdurl = Qt, t.lib.ucmicro = r5(), t.assign = o, t.isString = n, t.has = s, t.unescapeMd = b, t.unescapeAll = I, t.isValidEntityCode = i, t.fromCodePoint = l, t.escapeHtml = j, t.arrayReplaceAt = c, t.isSpace = $, t.isWhiteSpace = X, t.isMdAsciiPunct = B, t.isPunctChar = J, t.escapeRE = W, t.normalizeReference = re;
})(le);
var xr = {}, s5 = function(e, n, r) {
  var s, o, c, i, l = -1, a = e.posMax, u = e.pos;
  for (e.pos = n + 1, s = 1; e.pos < a; ) {
    if (c = e.src.charCodeAt(e.pos), c === 93 && (s--, s === 0)) {
      o = !0;
      break;
    }
    if (i = e.pos, e.md.inline.skipToken(e), c === 91) {
      if (i === e.pos - 1)
        s++;
      else if (r)
        return e.pos = u, -1;
    }
  }
  return o && (l = e.pos), e.pos = u, l;
}, oc = le.unescapeAll, o5 = function(e, n, r) {
  var s, o, c = 0, i = n, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (e.charCodeAt(n) === 60) {
    for (n++; n < r; ) {
      if (s = e.charCodeAt(n), s === 10 || s === 60)
        return l;
      if (s === 62)
        return l.pos = n + 1, l.str = oc(e.slice(i + 1, n)), l.ok = !0, l;
      if (s === 92 && n + 1 < r) {
        n += 2;
        continue;
      }
      n++;
    }
    return l;
  }
  for (o = 0; n < r && (s = e.charCodeAt(n), !(s === 32 || s < 32 || s === 127)); ) {
    if (s === 92 && n + 1 < r) {
      if (e.charCodeAt(n + 1) === 32)
        break;
      n += 2;
      continue;
    }
    if (s === 40 && (o++, o > 32))
      return l;
    if (s === 41) {
      if (o === 0)
        break;
      o--;
    }
    n++;
  }
  return i === n || o !== 0 || (l.str = oc(e.slice(i, n)), l.lines = c, l.pos = n, l.ok = !0), l;
}, c5 = le.unescapeAll, i5 = function(e, n, r) {
  var s, o, c = 0, i = n, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (n >= r || (o = e.charCodeAt(n), o !== 34 && o !== 39 && o !== 40))
    return l;
  for (n++, o === 40 && (o = 41); n < r; ) {
    if (s = e.charCodeAt(n), s === o)
      return l.pos = n + 1, l.lines = c, l.str = c5(e.slice(i + 1, n)), l.ok = !0, l;
    if (s === 40 && o === 41)
      return l;
    s === 10 ? c++ : s === 92 && n + 1 < r && (n++, e.charCodeAt(n) === 10 && c++), n++;
  }
  return l;
};
xr.parseLinkLabel = s5;
xr.parseLinkDestination = o5;
xr.parseLinkTitle = i5;
var l5 = le.assign, a5 = le.unescapeAll, qt = le.escapeHtml, Ye = {};
Ye.code_inline = function(t, e, n, r, s) {
  var o = t[e];
  return "<code" + s.renderAttrs(o) + ">" + qt(t[e].content) + "</code>";
};
Ye.code_block = function(t, e, n, r, s) {
  var o = t[e];
  return "<pre" + s.renderAttrs(o) + "><code>" + qt(t[e].content) + `</code></pre>
`;
};
Ye.fence = function(t, e, n, r, s) {
  var o = t[e], c = o.info ? a5(o.info).trim() : "", i = "", l = "", a, u, f, h, d;
  return c && (f = c.split(/(\s+)/g), i = f[0], l = f.slice(2).join("")), n.highlight ? a = n.highlight(o.content, i, l) || qt(o.content) : a = qt(o.content), a.indexOf("<pre") === 0 ? a + `
` : c ? (u = o.attrIndex("class"), h = o.attrs ? o.attrs.slice() : [], u < 0 ? h.push(["class", n.langPrefix + i]) : (h[u] = h[u].slice(), h[u][1] += " " + n.langPrefix + i), d = {
    attrs: h
  }, "<pre><code" + s.renderAttrs(d) + ">" + a + `</code></pre>
`) : "<pre><code" + s.renderAttrs(o) + ">" + a + `</code></pre>
`;
};
Ye.image = function(t, e, n, r, s) {
  var o = t[e];
  return o.attrs[o.attrIndex("alt")][1] = s.renderInlineAsText(o.children, n, r), s.renderToken(t, e, n);
};
Ye.hardbreak = function(t, e, n) {
  return n.xhtmlOut ? `<br />
` : `<br>
`;
};
Ye.softbreak = function(t, e, n) {
  return n.breaks ? n.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
Ye.text = function(t, e) {
  return qt(t[e].content);
};
Ye.html_block = function(t, e) {
  return t[e].content;
};
Ye.html_inline = function(t, e) {
  return t[e].content;
};
function en() {
  this.rules = l5({}, Ye);
}
en.prototype.renderAttrs = function(e) {
  var n, r, s;
  if (!e.attrs)
    return "";
  for (s = "", n = 0, r = e.attrs.length; n < r; n++)
    s += " " + qt(e.attrs[n][0]) + '="' + qt(e.attrs[n][1]) + '"';
  return s;
};
en.prototype.renderToken = function(e, n, r) {
  var s, o = "", c = !1, i = e[n];
  return i.hidden ? "" : (i.block && i.nesting !== -1 && n && e[n - 1].hidden && (o += `
`), o += (i.nesting === -1 ? "</" : "<") + i.tag, o += this.renderAttrs(i), i.nesting === 0 && r.xhtmlOut && (o += " /"), i.block && (c = !0, i.nesting === 1 && n + 1 < e.length && (s = e[n + 1], (s.type === "inline" || s.hidden || s.nesting === -1 && s.tag === i.tag) && (c = !1))), o += c ? `>
` : ">", o);
};
en.prototype.renderInline = function(t, e, n) {
  for (var r, s = "", o = this.rules, c = 0, i = t.length; c < i; c++)
    r = t[c].type, typeof o[r] < "u" ? s += o[r](t, c, e, n, this) : s += this.renderToken(t, c, e);
  return s;
};
en.prototype.renderInlineAsText = function(t, e, n) {
  for (var r = "", s = 0, o = t.length; s < o; s++)
    t[s].type === "text" ? r += t[s].content : t[s].type === "image" ? r += this.renderInlineAsText(t[s].children, e, n) : t[s].type === "softbreak" && (r += `
`);
  return r;
};
en.prototype.render = function(t, e, n) {
  var r, s, o, c = "", i = this.rules;
  for (r = 0, s = t.length; r < s; r++)
    o = t[r].type, o === "inline" ? c += this.renderInline(t[r].children, e, n) : typeof i[o] < "u" ? c += i[t[r].type](t, r, e, n, this) : c += this.renderToken(t, r, e, n);
  return c;
};
var u5 = en;
function He() {
  this.__rules__ = [], this.__cache__ = null;
}
He.prototype.__find__ = function(t) {
  for (var e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === t)
      return e;
  return -1;
};
He.prototype.__compile__ = function() {
  var t = this, e = [""];
  t.__rules__.forEach(function(n) {
    n.enabled && n.alt.forEach(function(r) {
      e.indexOf(r) < 0 && e.push(r);
    });
  }), t.__cache__ = {}, e.forEach(function(n) {
    t.__cache__[n] = [], t.__rules__.forEach(function(r) {
      r.enabled && (n && r.alt.indexOf(n) < 0 || t.__cache__[n].push(r.fn));
    });
  });
};
He.prototype.at = function(t, e, n) {
  var r = this.__find__(t), s = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__[r].fn = e, this.__rules__[r].alt = s.alt || [], this.__cache__ = null;
};
He.prototype.before = function(t, e, n, r) {
  var s = this.__find__(t), o = r || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
};
He.prototype.after = function(t, e, n, r) {
  var s = this.__find__(t), o = r || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s + 1, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
};
He.prototype.push = function(t, e, n) {
  var r = n || {};
  this.__rules__.push({
    name: t,
    enabled: !0,
    fn: e,
    alt: r.alt || []
  }), this.__cache__ = null;
};
He.prototype.enable = function(t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return t.forEach(function(r) {
    var s = this.__find__(r);
    if (s < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[s].enabled = !0, n.push(r);
  }, this), this.__cache__ = null, n;
};
He.prototype.enableOnly = function(t, e) {
  Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(n) {
    n.enabled = !1;
  }), this.enable(t, e);
};
He.prototype.disable = function(t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return t.forEach(function(r) {
    var s = this.__find__(r);
    if (s < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[s].enabled = !1, n.push(r);
  }, this), this.__cache__ = null, n;
};
He.prototype.getRules = function(t) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
};
var Hs = He, f5 = /\r\n?|\n/g, h5 = /\0/g, p5 = function(e) {
  var n;
  n = e.src.replace(f5, `
`), n = n.replace(h5, "�"), e.src = n;
}, d5 = function(e) {
  var n;
  e.inlineMode ? (n = new e.Token("inline", "", 0), n.content = e.src, n.map = [0, 1], n.children = [], e.tokens.push(n)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}, g5 = function(e) {
  var n = e.tokens, r, s, o;
  for (s = 0, o = n.length; s < o; s++)
    r = n[s], r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
}, m5 = le.arrayReplaceAt;
function _5(t) {
  return /^<a[>\s]/i.test(t);
}
function b5(t) {
  return /^<\/a\s*>/i.test(t);
}
var v5 = function(e) {
  var n, r, s, o, c, i, l, a, u, f, h, d, k, b, I, T, C = e.tokens, N;
  if (e.md.options.linkify) {
    for (r = 0, s = C.length; r < s; r++)
      if (!(C[r].type !== "inline" || !e.md.linkify.pretest(C[r].content)))
        for (o = C[r].children, k = 0, n = o.length - 1; n >= 0; n--) {
          if (i = o[n], i.type === "link_close") {
            for (n--; o[n].level !== i.level && o[n].type !== "link_open"; )
              n--;
            continue;
          }
          if (i.type === "html_inline" && (_5(i.content) && k > 0 && k--, b5(i.content) && k++), !(k > 0) && i.type === "text" && e.md.linkify.test(i.content)) {
            for (u = i.content, N = e.md.linkify.match(u), l = [], d = i.level, h = 0, a = 0; a < N.length; a++)
              b = N[a].url, I = e.md.normalizeLink(b), e.md.validateLink(I) && (T = N[a].text, N[a].schema ? N[a].schema === "mailto:" && !/^mailto:/i.test(T) ? T = e.md.normalizeLinkText("mailto:" + T).replace(/^mailto:/, "") : T = e.md.normalizeLinkText(T) : T = e.md.normalizeLinkText("http://" + T).replace(/^http:\/\//, ""), f = N[a].index, f > h && (c = new e.Token("text", "", 0), c.content = u.slice(h, f), c.level = d, l.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [["href", I]], c.level = d++, c.markup = "linkify", c.info = "auto", l.push(c), c = new e.Token("text", "", 0), c.content = T, c.level = d, l.push(c), c = new e.Token("link_close", "a", -1), c.level = --d, c.markup = "linkify", c.info = "auto", l.push(c), h = N[a].lastIndex);
            h < u.length && (c = new e.Token("text", "", 0), c.content = u.slice(h), c.level = d, l.push(c)), C[r].children = o = m5(o, n, l);
          }
        }
  }
}, Xi = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, x5 = /\((c|tm|r|p)\)/i, y5 = /\((c|tm|r|p)\)/ig, k5 = {
  c: "©",
  r: "®",
  p: "§",
  tm: "™"
};
function E5(t, e) {
  return k5[e.toLowerCase()];
}
function w5(t) {
  var e, n, r = 0;
  for (e = t.length - 1; e >= 0; e--)
    n = t[e], n.type === "text" && !r && (n.content = n.content.replace(y5, E5)), n.type === "link_open" && n.info === "auto" && r--, n.type === "link_close" && n.info === "auto" && r++;
}
function C5(t) {
  var e, n, r = 0;
  for (e = t.length - 1; e >= 0; e--)
    n = t[e], n.type === "text" && !r && Xi.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), n.type === "link_open" && n.info === "auto" && r--, n.type === "link_close" && n.info === "auto" && r++;
}
var A5 = function(e) {
  var n;
  if (e.md.options.typographer)
    for (n = e.tokens.length - 1; n >= 0; n--)
      e.tokens[n].type === "inline" && (x5.test(e.tokens[n].content) && w5(e.tokens[n].children), Xi.test(e.tokens[n].content) && C5(e.tokens[n].children));
}, cc = le.isWhiteSpace, ic = le.isPunctChar, lc = le.isMdAsciiPunct, S5 = /['"]/, ac = /['"]/g, uc = "’";
function Bn(t, e, n) {
  return t.substr(0, e) + n + t.substr(e + 1);
}
function D5(t, e) {
  var n, r, s, o, c, i, l, a, u, f, h, d, k, b, I, T, C, N, A, j, q;
  for (A = [], n = 0; n < t.length; n++) {
    for (r = t[n], l = t[n].level, C = A.length - 1; C >= 0 && !(A[C].level <= l); C--)
      ;
    if (A.length = C + 1, r.type === "text") {
      s = r.content, c = 0, i = s.length;
      e:
        for (; c < i && (ac.lastIndex = c, o = ac.exec(s), !!o); ) {
          if (I = T = !0, c = o.index + 1, N = o[0] === "'", u = 32, o.index - 1 >= 0)
            u = s.charCodeAt(o.index - 1);
          else
            for (C = n - 1; C >= 0 && !(t[C].type === "softbreak" || t[C].type === "hardbreak"); C--)
              if (t[C].content) {
                u = t[C].content.charCodeAt(t[C].content.length - 1);
                break;
              }
          if (f = 32, c < i)
            f = s.charCodeAt(c);
          else
            for (C = n + 1; C < t.length && !(t[C].type === "softbreak" || t[C].type === "hardbreak"); C++)
              if (t[C].content) {
                f = t[C].content.charCodeAt(0);
                break;
              }
          if (h = lc(u) || ic(String.fromCharCode(u)), d = lc(f) || ic(String.fromCharCode(f)), k = cc(u), b = cc(f), b ? I = !1 : d && (k || h || (I = !1)), k ? T = !1 : h && (b || d || (T = !1)), f === 34 && o[0] === '"' && u >= 48 && u <= 57 && (T = I = !1), I && T && (I = h, T = d), !I && !T) {
            N && (r.content = Bn(r.content, o.index, uc));
            continue;
          }
          if (T) {
            for (C = A.length - 1; C >= 0 && (a = A[C], !(A[C].level < l)); C--)
              if (a.single === N && A[C].level === l) {
                a = A[C], N ? (j = e.md.options.quotes[2], q = e.md.options.quotes[3]) : (j = e.md.options.quotes[0], q = e.md.options.quotes[1]), r.content = Bn(r.content, o.index, q), t[a.token].content = Bn(
                  t[a.token].content,
                  a.pos,
                  j
                ), c += q.length - 1, a.token === n && (c += j.length - 1), s = r.content, i = s.length, A.length = C;
                continue e;
              }
          }
          I ? A.push({
            token: n,
            pos: o.index,
            single: N,
            level: l
          }) : T && N && (r.content = Bn(r.content, o.index, uc));
        }
    }
  }
}
var T5 = function(e) {
  var n;
  if (e.md.options.typographer)
    for (n = e.tokens.length - 1; n >= 0; n--)
      e.tokens[n].type !== "inline" || !S5.test(e.tokens[n].content) || D5(e.tokens[n].children, e);
};
function tn(t, e, n) {
  this.type = t, this.tag = e, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
tn.prototype.attrIndex = function(e) {
  var n, r, s;
  if (!this.attrs)
    return -1;
  for (n = this.attrs, r = 0, s = n.length; r < s; r++)
    if (n[r][0] === e)
      return r;
  return -1;
};
tn.prototype.attrPush = function(e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
};
tn.prototype.attrSet = function(e, n) {
  var r = this.attrIndex(e), s = [e, n];
  r < 0 ? this.attrPush(s) : this.attrs[r] = s;
};
tn.prototype.attrGet = function(e) {
  var n = this.attrIndex(e), r = null;
  return n >= 0 && (r = this.attrs[n][1]), r;
};
tn.prototype.attrJoin = function(e, n) {
  var r = this.attrIndex(e);
  r < 0 ? this.attrPush([e, n]) : this.attrs[r][1] = this.attrs[r][1] + " " + n;
};
var js = tn, R5 = js;
function Qi(t, e, n) {
  this.src = t, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = e;
}
Qi.prototype.Token = R5;
var q5 = Qi, M5 = Hs, zr = [
  ["normalize", p5],
  ["block", d5],
  ["inline", g5],
  ["linkify", v5],
  ["replacements", A5],
  ["smartquotes", T5]
];
function Vs() {
  this.ruler = new M5();
  for (var t = 0; t < zr.length; t++)
    this.ruler.push(zr[t][0], zr[t][1]);
}
Vs.prototype.process = function(t) {
  var e, n, r;
  for (r = this.ruler.getRules(""), e = 0, n = r.length; e < n; e++)
    r[e](t);
};
Vs.prototype.State = q5;
var N5 = Vs, Ur = le.isSpace;
function Hr(t, e) {
  var n = t.bMarks[e] + t.tShift[e], r = t.eMarks[e];
  return t.src.substr(n, r - n);
}
function fc(t) {
  var e = [], n = 0, r = t.length, s, o = !1, c = 0, i = "";
  for (s = t.charCodeAt(n); n < r; )
    s === 124 && (o ? (i += t.substring(c, n - 1), c = n) : (e.push(i + t.substring(c, n)), i = "", c = n + 1)), o = s === 92, n++, s = t.charCodeAt(n);
  return e.push(i + t.substring(c)), e;
}
var I5 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h, d, k, b, I, T, C, N, A, j, q;
  if (n + 2 > r || (u = n + 1, e.sCount[u] < e.blkIndent) || e.sCount[u] - e.blkIndent >= 4 || (i = e.bMarks[u] + e.tShift[u], i >= e.eMarks[u]) || (j = e.src.charCodeAt(i++), j !== 124 && j !== 45 && j !== 58) || i >= e.eMarks[u] || (q = e.src.charCodeAt(i++), q !== 124 && q !== 45 && q !== 58 && !Ur(q)) || j === 45 && Ur(q))
    return !1;
  for (; i < e.eMarks[u]; ) {
    if (o = e.src.charCodeAt(i), o !== 124 && o !== 45 && o !== 58 && !Ur(o))
      return !1;
    i++;
  }
  for (c = Hr(e, n + 1), f = c.split("|"), k = [], l = 0; l < f.length; l++) {
    if (b = f[l].trim(), !b) {
      if (l === 0 || l === f.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(b))
      return !1;
    b.charCodeAt(b.length - 1) === 58 ? k.push(b.charCodeAt(0) === 58 ? "center" : "right") : b.charCodeAt(0) === 58 ? k.push("left") : k.push("");
  }
  if (c = Hr(e, n).trim(), c.indexOf("|") === -1 || e.sCount[n] - e.blkIndent >= 4 || (f = fc(c), f.length && f[0] === "" && f.shift(), f.length && f[f.length - 1] === "" && f.pop(), h = f.length, h === 0 || h !== k.length))
    return !1;
  if (s)
    return !0;
  for (C = e.parentType, e.parentType = "table", A = e.md.block.ruler.getRules("blockquote"), d = e.push("table_open", "table", 1), d.map = I = [n, 0], d = e.push("thead_open", "thead", 1), d.map = [n, n + 1], d = e.push("tr_open", "tr", 1), d.map = [n, n + 1], l = 0; l < f.length; l++)
    d = e.push("th_open", "th", 1), k[l] && (d.attrs = [["style", "text-align:" + k[l]]]), d = e.push("inline", "", 0), d.content = f[l].trim(), d.children = [], d = e.push("th_close", "th", -1);
  for (d = e.push("tr_close", "tr", -1), d = e.push("thead_close", "thead", -1), u = n + 2; u < r && !(e.sCount[u] < e.blkIndent); u++) {
    for (N = !1, l = 0, a = A.length; l < a; l++)
      if (A[l](e, u, r, !0)) {
        N = !0;
        break;
      }
    if (N || (c = Hr(e, u).trim(), !c) || e.sCount[u] - e.blkIndent >= 4)
      break;
    for (f = fc(c), f.length && f[0] === "" && f.shift(), f.length && f[f.length - 1] === "" && f.pop(), u === n + 2 && (d = e.push("tbody_open", "tbody", 1), d.map = T = [n + 2, 0]), d = e.push("tr_open", "tr", 1), d.map = [u, u + 1], l = 0; l < h; l++)
      d = e.push("td_open", "td", 1), k[l] && (d.attrs = [["style", "text-align:" + k[l]]]), d = e.push("inline", "", 0), d.content = f[l] ? f[l].trim() : "", d.children = [], d = e.push("td_close", "td", -1);
    d = e.push("tr_close", "tr", -1);
  }
  return T && (d = e.push("tbody_close", "tbody", -1), T[1] = u), d = e.push("table_close", "table", -1), I[1] = u, e.parentType = C, e.line = u, !0;
}, F5 = function(e, n, r) {
  var s, o, c;
  if (e.sCount[n] - e.blkIndent < 4)
    return !1;
  for (o = s = n + 1; s < r; ) {
    if (e.isEmpty(s)) {
      s++;
      continue;
    }
    if (e.sCount[s] - e.blkIndent >= 4) {
      s++, o = s;
      continue;
    }
    break;
  }
  return e.line = o, c = e.push("code_block", "code", 0), c.content = e.getLines(n, o, 4 + e.blkIndent, !1) + `
`, c.map = [n, e.line], !0;
}, L5 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h = !1, d = e.bMarks[n] + e.tShift[n], k = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || d + 3 > k || (o = e.src.charCodeAt(d), o !== 126 && o !== 96) || (a = d, d = e.skipChars(d, o), c = d - a, c < 3) || (f = e.src.slice(a, d), i = e.src.slice(d, k), o === 96 && i.indexOf(String.fromCharCode(o)) >= 0))
    return !1;
  if (s)
    return !0;
  for (l = n; l++, !(l >= r || (d = a = e.bMarks[l] + e.tShift[l], k = e.eMarks[l], d < k && e.sCount[l] < e.blkIndent)); )
    if (e.src.charCodeAt(d) === o && !(e.sCount[l] - e.blkIndent >= 4) && (d = e.skipChars(d, o), !(d - a < c) && (d = e.skipSpaces(d), !(d < k)))) {
      h = !0;
      break;
    }
  return c = e.sCount[n], e.line = l + (h ? 1 : 0), u = e.push("fence", "code", 0), u.info = i, u.content = e.getLines(n + 1, l, c, !0), u.markup = f, u.map = [n, e.line], !0;
}, hc = le.isSpace, O5 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h, d, k, b, I, T, C, N, A, j, q, W, $, X = e.lineMax, z = e.bMarks[n] + e.tShift[n], J = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(z++) !== 62)
    return !1;
  if (s)
    return !0;
  for (l = d = e.sCount[n] + 1, e.src.charCodeAt(z) === 32 ? (z++, l++, d++, o = !1, A = !0) : e.src.charCodeAt(z) === 9 ? (A = !0, (e.bsCount[n] + d) % 4 === 3 ? (z++, l++, d++, o = !1) : o = !0) : A = !1, k = [e.bMarks[n]], e.bMarks[n] = z; z < J && (c = e.src.charCodeAt(z), hc(c)); ) {
    c === 9 ? d += 4 - (d + e.bsCount[n] + (o ? 1 : 0)) % 4 : d++;
    z++;
  }
  for (b = [e.bsCount[n]], e.bsCount[n] = e.sCount[n] + 1 + (A ? 1 : 0), u = z >= J, C = [e.sCount[n]], e.sCount[n] = d - l, N = [e.tShift[n]], e.tShift[n] = z - e.bMarks[n], q = e.md.block.ruler.getRules("blockquote"), T = e.parentType, e.parentType = "blockquote", h = n + 1; h < r && ($ = e.sCount[h] < e.blkIndent, z = e.bMarks[h] + e.tShift[h], J = e.eMarks[h], !(z >= J)); h++) {
    if (e.src.charCodeAt(z++) === 62 && !$) {
      for (l = d = e.sCount[h] + 1, e.src.charCodeAt(z) === 32 ? (z++, l++, d++, o = !1, A = !0) : e.src.charCodeAt(z) === 9 ? (A = !0, (e.bsCount[h] + d) % 4 === 3 ? (z++, l++, d++, o = !1) : o = !0) : A = !1, k.push(e.bMarks[h]), e.bMarks[h] = z; z < J && (c = e.src.charCodeAt(z), hc(c)); ) {
        c === 9 ? d += 4 - (d + e.bsCount[h] + (o ? 1 : 0)) % 4 : d++;
        z++;
      }
      u = z >= J, b.push(e.bsCount[h]), e.bsCount[h] = e.sCount[h] + 1 + (A ? 1 : 0), C.push(e.sCount[h]), e.sCount[h] = d - l, N.push(e.tShift[h]), e.tShift[h] = z - e.bMarks[h];
      continue;
    }
    if (u)
      break;
    for (j = !1, i = 0, a = q.length; i < a; i++)
      if (q[i](e, h, r, !0)) {
        j = !0;
        break;
      }
    if (j) {
      e.lineMax = h, e.blkIndent !== 0 && (k.push(e.bMarks[h]), b.push(e.bsCount[h]), N.push(e.tShift[h]), C.push(e.sCount[h]), e.sCount[h] -= e.blkIndent);
      break;
    }
    k.push(e.bMarks[h]), b.push(e.bsCount[h]), N.push(e.tShift[h]), C.push(e.sCount[h]), e.sCount[h] = -1;
  }
  for (I = e.blkIndent, e.blkIndent = 0, W = e.push("blockquote_open", "blockquote", 1), W.markup = ">", W.map = f = [n, 0], e.md.block.tokenize(e, n, h), W = e.push("blockquote_close", "blockquote", -1), W.markup = ">", e.lineMax = X, e.parentType = T, f[1] = e.line, i = 0; i < N.length; i++)
    e.bMarks[i + n] = k[i], e.tShift[i + n] = N[i], e.sCount[i + n] = C[i], e.bsCount[i + n] = b[i];
  return e.blkIndent = I, !0;
}, P5 = le.isSpace, B5 = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || (o = e.src.charCodeAt(a++), o !== 42 && o !== 45 && o !== 95))
    return !1;
  for (c = 1; a < u; ) {
    if (i = e.src.charCodeAt(a++), i !== o && !P5(i))
      return !1;
    i === o && c++;
  }
  return c < 3 ? !1 : (s || (e.line = n + 1, l = e.push("hr", "hr", 0), l.map = [n, e.line], l.markup = Array(c + 1).join(String.fromCharCode(o))), !0);
}, el = le.isSpace;
function pc(t, e) {
  var n, r, s, o;
  return r = t.bMarks[e] + t.tShift[e], s = t.eMarks[e], n = t.src.charCodeAt(r++), n !== 42 && n !== 45 && n !== 43 || r < s && (o = t.src.charCodeAt(r), !el(o)) ? -1 : r;
}
function dc(t, e) {
  var n, r = t.bMarks[e] + t.tShift[e], s = r, o = t.eMarks[e];
  if (s + 1 >= o || (n = t.src.charCodeAt(s++), n < 48 || n > 57))
    return -1;
  for (; ; ) {
    if (s >= o)
      return -1;
    if (n = t.src.charCodeAt(s++), n >= 48 && n <= 57) {
      if (s - r >= 10)
        return -1;
      continue;
    }
    if (n === 41 || n === 46)
      break;
    return -1;
  }
  return s < o && (n = t.src.charCodeAt(s), !el(n)) ? -1 : s;
}
function $5(t, e) {
  var n, r, s = t.level + 2;
  for (n = e + 2, r = t.tokens.length - 2; n < r; n++)
    t.tokens[n].level === s && t.tokens[n].type === "paragraph_open" && (t.tokens[n + 2].hidden = !0, t.tokens[n].hidden = !0, n += 2);
}
var z5 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h, d, k, b, I, T, C, N, A, j, q, W, $, X, z, J, B, re, D, ne, V, v = !1, S = !0;
  if (e.sCount[n] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[n] - e.listIndent >= 4 && e.sCount[n] < e.blkIndent)
    return !1;
  if (s && e.parentType === "paragraph" && e.sCount[n] >= e.blkIndent && (v = !0), (J = dc(e, n)) >= 0) {
    if (f = !0, re = e.bMarks[n] + e.tShift[n], T = Number(e.src.slice(re, J - 1)), v && T !== 1)
      return !1;
  } else if ((J = pc(e, n)) >= 0)
    f = !1;
  else
    return !1;
  if (v && e.skipSpaces(J) >= e.eMarks[n])
    return !1;
  if (I = e.src.charCodeAt(J - 1), s)
    return !0;
  for (b = e.tokens.length, f ? (V = e.push("ordered_list_open", "ol", 1), T !== 1 && (V.attrs = [["start", T]])) : V = e.push("bullet_list_open", "ul", 1), V.map = k = [n, 0], V.markup = String.fromCharCode(I), N = n, B = !1, ne = e.md.block.ruler.getRules("list"), q = e.parentType, e.parentType = "list"; N < r; ) {
    for (z = J, C = e.eMarks[N], u = A = e.sCount[N] + J - (e.bMarks[n] + e.tShift[n]); z < C; ) {
      if (o = e.src.charCodeAt(z), o === 9)
        A += 4 - (A + e.bsCount[N]) % 4;
      else if (o === 32)
        A++;
      else
        break;
      z++;
    }
    if (c = z, c >= C ? a = 1 : a = A - u, a > 4 && (a = 1), l = u + a, V = e.push("list_item_open", "li", 1), V.markup = String.fromCharCode(I), V.map = h = [n, 0], f && (V.info = e.src.slice(re, J - 1)), X = e.tight, $ = e.tShift[n], W = e.sCount[n], j = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = l, e.tight = !0, e.tShift[n] = c - e.bMarks[n], e.sCount[n] = A, c >= C && e.isEmpty(n + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, n, r, !0), (!e.tight || B) && (S = !1), B = e.line - n > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = j, e.tShift[n] = $, e.sCount[n] = W, e.tight = X, V = e.push("list_item_close", "li", -1), V.markup = String.fromCharCode(I), N = n = e.line, h[1] = N, c = e.bMarks[n], N >= r || e.sCount[N] < e.blkIndent || e.sCount[n] - e.blkIndent >= 4)
      break;
    for (D = !1, i = 0, d = ne.length; i < d; i++)
      if (ne[i](e, N, r, !0)) {
        D = !0;
        break;
      }
    if (D)
      break;
    if (f) {
      if (J = dc(e, N), J < 0)
        break;
      re = e.bMarks[N] + e.tShift[N];
    } else if (J = pc(e, N), J < 0)
      break;
    if (I !== e.src.charCodeAt(J - 1))
      break;
  }
  return f ? V = e.push("ordered_list_close", "ol", -1) : V = e.push("bullet_list_close", "ul", -1), V.markup = String.fromCharCode(I), k[1] = N, e.line = N, e.parentType = q, S && $5(e, b), !0;
}, U5 = le.normalizeReference, $n = le.isSpace, H5 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h, d, k, b, I, T, C, N, A, j = 0, q = e.bMarks[n] + e.tShift[n], W = e.eMarks[n], $ = n + 1;
  if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(q) !== 91)
    return !1;
  for (; ++q < W; )
    if (e.src.charCodeAt(q) === 93 && e.src.charCodeAt(q - 1) !== 92) {
      if (q + 1 === W || e.src.charCodeAt(q + 1) !== 58)
        return !1;
      break;
    }
  for (l = e.lineMax, N = e.md.block.ruler.getRules("reference"), k = e.parentType, e.parentType = "reference"; $ < l && !e.isEmpty($); $++)
    if (!(e.sCount[$] - e.blkIndent > 3) && !(e.sCount[$] < 0)) {
      for (C = !1, u = 0, f = N.length; u < f; u++)
        if (N[u](e, $, l, !0)) {
          C = !0;
          break;
        }
      if (C)
        break;
    }
  for (T = e.getLines(n, $, e.blkIndent, !1).trim(), W = T.length, q = 1; q < W; q++) {
    if (o = T.charCodeAt(q), o === 91)
      return !1;
    if (o === 93) {
      d = q;
      break;
    } else
      o === 10 ? j++ : o === 92 && (q++, q < W && T.charCodeAt(q) === 10 && j++);
  }
  if (d < 0 || T.charCodeAt(d + 1) !== 58)
    return !1;
  for (q = d + 2; q < W; q++)
    if (o = T.charCodeAt(q), o === 10)
      j++;
    else if (!$n(o))
      break;
  if (b = e.md.helpers.parseLinkDestination(T, q, W), !b.ok || (a = e.md.normalizeLink(b.str), !e.md.validateLink(a)))
    return !1;
  for (q = b.pos, j += b.lines, c = q, i = j, I = q; q < W; q++)
    if (o = T.charCodeAt(q), o === 10)
      j++;
    else if (!$n(o))
      break;
  for (b = e.md.helpers.parseLinkTitle(T, q, W), q < W && I !== q && b.ok ? (A = b.str, q = b.pos, j += b.lines) : (A = "", q = c, j = i); q < W && (o = T.charCodeAt(q), !!$n(o)); )
    q++;
  if (q < W && T.charCodeAt(q) !== 10 && A)
    for (A = "", q = c, j = i; q < W && (o = T.charCodeAt(q), !!$n(o)); )
      q++;
  return q < W && T.charCodeAt(q) !== 10 || (h = U5(T.slice(1, d)), !h) ? !1 : (s || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[h] > "u" && (e.env.references[h] = { title: A, href: a }), e.parentType = k, e.line = n + j + 1), !0);
}, j5 = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], yr = {}, V5 = "[a-zA-Z_:][a-zA-Z0-9:._-]*", G5 = "[^\"'=<>`\\x00-\\x20]+", Z5 = "'[^']*'", K5 = '"[^"]*"', W5 = "(?:" + G5 + "|" + Z5 + "|" + K5 + ")", J5 = "(?:\\s+" + V5 + "(?:\\s*=\\s*" + W5 + ")?)", tl = "<[A-Za-z][A-Za-z0-9\\-]*" + J5 + "*\\s*\\/?>", nl = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", Y5 = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", X5 = "<[?][\\s\\S]*?[?]>", Q5 = "<![A-Z]+\\s+[^>]*>", eV = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", tV = new RegExp("^(?:" + tl + "|" + nl + "|" + Y5 + "|" + X5 + "|" + Q5 + "|" + eV + ")"), nV = new RegExp("^(?:" + tl + "|" + nl + ")");
yr.HTML_TAG_RE = tV;
yr.HTML_OPEN_CLOSE_TAG_RE = nV;
var rV = j5, sV = yr.HTML_OPEN_CLOSE_TAG_RE, Ot = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + rV.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(sV.source + "\\s*$"), /^$/, !1]
], oV = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(a) !== 60)
    return !1;
  for (l = e.src.slice(a, u), o = 0; o < Ot.length && !Ot[o][0].test(l); o++)
    ;
  if (o === Ot.length)
    return !1;
  if (s)
    return Ot[o][2];
  if (c = n + 1, !Ot[o][1].test(l)) {
    for (; c < r && !(e.sCount[c] < e.blkIndent); c++)
      if (a = e.bMarks[c] + e.tShift[c], u = e.eMarks[c], l = e.src.slice(a, u), Ot[o][1].test(l)) {
        l.length !== 0 && c++;
        break;
      }
  }
  return e.line = c, i = e.push("html_block", "", 0), i.map = [n, c], i.content = e.getLines(n, c, e.blkIndent, !0), !0;
}, gc = le.isSpace, cV = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || (o = e.src.charCodeAt(a), o !== 35 || a >= u))
    return !1;
  for (c = 1, o = e.src.charCodeAt(++a); o === 35 && a < u && c <= 6; )
    c++, o = e.src.charCodeAt(++a);
  return c > 6 || a < u && !gc(o) ? !1 : (s || (u = e.skipSpacesBack(u, a), i = e.skipCharsBack(u, 35, a), i > a && gc(e.src.charCodeAt(i - 1)) && (u = i), e.line = n + 1, l = e.push("heading_open", "h" + String(c), 1), l.markup = "########".slice(0, c), l.map = [n, e.line], l = e.push("inline", "", 0), l.content = e.src.slice(a, u).trim(), l.map = [n, e.line], l.children = [], l = e.push("heading_close", "h" + String(c), -1), l.markup = "########".slice(0, c)), !0);
}, iV = function(e, n, r) {
  var s, o, c, i, l, a, u, f, h, d = n + 1, k, b = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[n] - e.blkIndent >= 4)
    return !1;
  for (k = e.parentType, e.parentType = "paragraph"; d < r && !e.isEmpty(d); d++)
    if (!(e.sCount[d] - e.blkIndent > 3)) {
      if (e.sCount[d] >= e.blkIndent && (a = e.bMarks[d] + e.tShift[d], u = e.eMarks[d], a < u && (h = e.src.charCodeAt(a), (h === 45 || h === 61) && (a = e.skipChars(a, h), a = e.skipSpaces(a), a >= u)))) {
        f = h === 61 ? 1 : 2;
        break;
      }
      if (!(e.sCount[d] < 0)) {
        for (o = !1, c = 0, i = b.length; c < i; c++)
          if (b[c](e, d, r, !0)) {
            o = !0;
            break;
          }
        if (o)
          break;
      }
    }
  return f ? (s = e.getLines(n, d, e.blkIndent, !1).trim(), e.line = d + 1, l = e.push("heading_open", "h" + String(f), 1), l.markup = String.fromCharCode(h), l.map = [n, e.line], l = e.push("inline", "", 0), l.content = s, l.map = [n, e.line - 1], l.children = [], l = e.push("heading_close", "h" + String(f), -1), l.markup = String.fromCharCode(h), e.parentType = k, !0) : !1;
}, lV = function(e, n) {
  var r, s, o, c, i, l, a = n + 1, u = e.md.block.ruler.getRules("paragraph"), f = e.lineMax;
  for (l = e.parentType, e.parentType = "paragraph"; a < f && !e.isEmpty(a); a++)
    if (!(e.sCount[a] - e.blkIndent > 3) && !(e.sCount[a] < 0)) {
      for (s = !1, o = 0, c = u.length; o < c; o++)
        if (u[o](e, a, f, !0)) {
          s = !0;
          break;
        }
      if (s)
        break;
    }
  return r = e.getLines(n, a, e.blkIndent, !1).trim(), e.line = a, i = e.push("paragraph_open", "p", 1), i.map = [n, e.line], i = e.push("inline", "", 0), i.content = r, i.map = [n, e.line], i.children = [], i = e.push("paragraph_close", "p", -1), e.parentType = l, !0;
}, rl = js, kr = le.isSpace;
function Xe(t, e, n, r) {
  var s, o, c, i, l, a, u, f;
  for (this.src = t, this.md = e, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", o = this.src, f = !1, c = i = a = u = 0, l = o.length; i < l; i++) {
    if (s = o.charCodeAt(i), !f)
      if (kr(s)) {
        a++, s === 9 ? u += 4 - u % 4 : u++;
        continue;
      } else
        f = !0;
    (s === 10 || i === l - 1) && (s !== 10 && i++, this.bMarks.push(c), this.eMarks.push(i), this.tShift.push(a), this.sCount.push(u), this.bsCount.push(0), f = !1, a = 0, u = 0, c = i + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Xe.prototype.push = function(t, e, n) {
  var r = new rl(t, e, n);
  return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
};
Xe.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Xe.prototype.skipEmptyLines = function(e) {
  for (var n = this.lineMax; e < n && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
Xe.prototype.skipSpaces = function(e) {
  for (var n, r = this.src.length; e < r && (n = this.src.charCodeAt(e), !!kr(n)); e++)
    ;
  return e;
};
Xe.prototype.skipSpacesBack = function(e, n) {
  if (e <= n)
    return e;
  for (; e > n; )
    if (!kr(this.src.charCodeAt(--e)))
      return e + 1;
  return e;
};
Xe.prototype.skipChars = function(e, n) {
  for (var r = this.src.length; e < r && this.src.charCodeAt(e) === n; e++)
    ;
  return e;
};
Xe.prototype.skipCharsBack = function(e, n, r) {
  if (e <= r)
    return e;
  for (; e > r; )
    if (n !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
Xe.prototype.getLines = function(e, n, r, s) {
  var o, c, i, l, a, u, f, h = e;
  if (e >= n)
    return "";
  for (u = new Array(n - e), o = 0; h < n; h++, o++) {
    for (c = 0, f = l = this.bMarks[h], h + 1 < n || s ? a = this.eMarks[h] + 1 : a = this.eMarks[h]; l < a && c < r; ) {
      if (i = this.src.charCodeAt(l), kr(i))
        i === 9 ? c += 4 - (c + this.bsCount[h]) % 4 : c++;
      else if (l - f < this.tShift[h])
        c++;
      else
        break;
      l++;
    }
    c > r ? u[o] = new Array(c - r + 1).join(" ") + this.src.slice(l, a) : u[o] = this.src.slice(l, a);
  }
  return u.join("");
};
Xe.prototype.Token = rl;
var aV = Xe, uV = Hs, zn = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", I5, ["paragraph", "reference"]],
  ["code", F5],
  ["fence", L5, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", O5, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", B5, ["paragraph", "reference", "blockquote", "list"]],
  ["list", z5, ["paragraph", "reference", "blockquote"]],
  ["reference", H5],
  ["html_block", oV, ["paragraph", "reference", "blockquote"]],
  ["heading", cV, ["paragraph", "reference", "blockquote"]],
  ["lheading", iV],
  ["paragraph", lV]
];
function Er() {
  this.ruler = new uV();
  for (var t = 0; t < zn.length; t++)
    this.ruler.push(zn[t][0], zn[t][1], { alt: (zn[t][2] || []).slice() });
}
Er.prototype.tokenize = function(t, e, n) {
  for (var r, s, o = this.ruler.getRules(""), c = o.length, i = e, l = !1, a = t.md.options.maxNesting; i < n && (t.line = i = t.skipEmptyLines(i), !(i >= n || t.sCount[i] < t.blkIndent)); ) {
    if (t.level >= a) {
      t.line = n;
      break;
    }
    for (s = 0; s < c && (r = o[s](t, i, n, !1), !r); s++)
      ;
    t.tight = !l, t.isEmpty(t.line - 1) && (l = !0), i = t.line, i < n && t.isEmpty(i) && (l = !0, i++, t.line = i);
  }
};
Er.prototype.parse = function(t, e, n, r) {
  var s;
  t && (s = new this.State(t, e, n, r), this.tokenize(s, s.line, s.lineMax));
};
Er.prototype.State = aV;
var fV = Er;
function hV(t) {
  switch (t) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
var pV = function(e, n) {
  for (var r = e.pos; r < e.posMax && !hV(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (n || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}, dV = le.isSpace, gV = function(e, n) {
  var r, s, o, c = e.pos;
  if (e.src.charCodeAt(c) !== 10)
    return !1;
  if (r = e.pending.length - 1, s = e.posMax, !n)
    if (r >= 0 && e.pending.charCodeAt(r) === 32)
      if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
        for (o = r - 1; o >= 1 && e.pending.charCodeAt(o - 1) === 32; )
          o--;
        e.pending = e.pending.slice(0, o), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (c++; c < s && dV(e.src.charCodeAt(c)); )
    c++;
  return e.pos = c, !0;
}, mV = le.isSpace, Gs = [];
for (var mc = 0; mc < 256; mc++)
  Gs.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(t) {
  Gs[t.charCodeAt(0)] = 1;
});
var _V = function(e, n) {
  var r, s = e.pos, o = e.posMax;
  if (e.src.charCodeAt(s) !== 92)
    return !1;
  if (s++, s < o) {
    if (r = e.src.charCodeAt(s), r < 256 && Gs[r] !== 0)
      return n || (e.pending += e.src[s]), e.pos += 2, !0;
    if (r === 10) {
      for (n || e.push("hardbreak", "br", 0), s++; s < o && (r = e.src.charCodeAt(s), !!mV(r)); )
        s++;
      return e.pos = s, !0;
    }
  }
  return n || (e.pending += "\\"), e.pos++, !0;
}, bV = function(e, n) {
  var r, s, o, c, i, l, a, u, f = e.pos, h = e.src.charCodeAt(f);
  if (h !== 96)
    return !1;
  for (r = f, f++, s = e.posMax; f < s && e.src.charCodeAt(f) === 96; )
    f++;
  if (o = e.src.slice(r, f), a = o.length, e.backticksScanned && (e.backticks[a] || 0) <= r)
    return n || (e.pending += o), e.pos += a, !0;
  for (i = l = f; (i = e.src.indexOf("`", l)) !== -1; ) {
    for (l = i + 1; l < s && e.src.charCodeAt(l) === 96; )
      l++;
    if (u = l - i, u === a)
      return n || (c = e.push("code_inline", "code", 0), c.markup = o, c.content = e.src.slice(f, i).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = l, !0;
    e.backticks[u] = i;
  }
  return e.backticksScanned = !0, n || (e.pending += o), e.pos += a, !0;
}, wr = {};
wr.tokenize = function(e, n) {
  var r, s, o, c, i, l = e.pos, a = e.src.charCodeAt(l);
  if (n || a !== 126 || (s = e.scanDelims(e.pos, !0), c = s.length, i = String.fromCharCode(a), c < 2))
    return !1;
  for (c % 2 && (o = e.push("text", "", 0), o.content = i, c--), r = 0; r < c; r += 2)
    o = e.push("text", "", 0), o.content = i + i, e.delimiters.push({
      marker: a,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: s.can_open,
      close: s.can_close
    });
  return e.pos += s.length, !0;
};
function _c(t, e) {
  var n, r, s, o, c, i = [], l = e.length;
  for (n = 0; n < l; n++)
    s = e[n], s.marker === 126 && s.end !== -1 && (o = e[s.end], c = t.tokens[s.token], c.type = "s_open", c.tag = "s", c.nesting = 1, c.markup = "~~", c.content = "", c = t.tokens[o.token], c.type = "s_close", c.tag = "s", c.nesting = -1, c.markup = "~~", c.content = "", t.tokens[o.token - 1].type === "text" && t.tokens[o.token - 1].content === "~" && i.push(o.token - 1));
  for (; i.length; ) {
    for (n = i.pop(), r = n + 1; r < t.tokens.length && t.tokens[r].type === "s_close"; )
      r++;
    r--, n !== r && (c = t.tokens[r], t.tokens[r] = t.tokens[n], t.tokens[n] = c);
  }
}
wr.postProcess = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (_c(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && _c(e, r[n].delimiters);
};
var Cr = {};
Cr.tokenize = function(e, n) {
  var r, s, o, c = e.pos, i = e.src.charCodeAt(c);
  if (n || i !== 95 && i !== 42)
    return !1;
  for (s = e.scanDelims(e.pos, i === 42), r = 0; r < s.length; r++)
    o = e.push("text", "", 0), o.content = String.fromCharCode(i), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: i,
      // Total length of these series of delimiters.
      //
      length: s.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: s.can_open,
      close: s.can_close
    });
  return e.pos += s.length, !0;
};
function bc(t, e) {
  var n, r, s, o, c, i, l = e.length;
  for (n = l - 1; n >= 0; n--)
    r = e[n], !(r.marker !== 95 && r.marker !== 42) && r.end !== -1 && (s = e[r.end], i = n > 0 && e[n - 1].end === r.end + 1 && // check that first two markers match and adjacent
    e[n - 1].marker === r.marker && e[n - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    e[r.end + 1].token === s.token + 1, c = String.fromCharCode(r.marker), o = t.tokens[r.token], o.type = i ? "strong_open" : "em_open", o.tag = i ? "strong" : "em", o.nesting = 1, o.markup = i ? c + c : c, o.content = "", o = t.tokens[s.token], o.type = i ? "strong_close" : "em_close", o.tag = i ? "strong" : "em", o.nesting = -1, o.markup = i ? c + c : c, o.content = "", i && (t.tokens[e[n - 1].token].content = "", t.tokens[e[r.end + 1].token].content = "", n--));
}
Cr.postProcess = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (bc(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && bc(e, r[n].delimiters);
};
var vV = le.normalizeReference, jr = le.isSpace, xV = function(e, n) {
  var r, s, o, c, i, l, a, u, f, h = "", d = "", k = e.pos, b = e.posMax, I = e.pos, T = !0;
  if (e.src.charCodeAt(e.pos) !== 91 || (i = e.pos + 1, c = e.md.helpers.parseLinkLabel(e, e.pos, !0), c < 0))
    return !1;
  if (l = c + 1, l < b && e.src.charCodeAt(l) === 40) {
    for (T = !1, l++; l < b && (s = e.src.charCodeAt(l), !(!jr(s) && s !== 10)); l++)
      ;
    if (l >= b)
      return !1;
    if (I = l, a = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), a.ok) {
      for (h = e.md.normalizeLink(a.str), e.md.validateLink(h) ? l = a.pos : h = "", I = l; l < b && (s = e.src.charCodeAt(l), !(!jr(s) && s !== 10)); l++)
        ;
      if (a = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < b && I !== l && a.ok)
        for (d = a.str, l = a.pos; l < b && (s = e.src.charCodeAt(l), !(!jr(s) && s !== 10)); l++)
          ;
    }
    (l >= b || e.src.charCodeAt(l) !== 41) && (T = !0), l++;
  }
  if (T) {
    if (typeof e.env.references > "u")
      return !1;
    if (l < b && e.src.charCodeAt(l) === 91 ? (I = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? o = e.src.slice(I, l++) : l = c + 1) : l = c + 1, o || (o = e.src.slice(i, c)), u = e.env.references[vV(o)], !u)
      return e.pos = k, !1;
    h = u.href, d = u.title;
  }
  return n || (e.pos = i, e.posMax = c, f = e.push("link_open", "a", 1), f.attrs = r = [["href", h]], d && r.push(["title", d]), e.md.inline.tokenize(e), f = e.push("link_close", "a", -1)), e.pos = l, e.posMax = b, !0;
}, yV = le.normalizeReference, Vr = le.isSpace, kV = function(e, n) {
  var r, s, o, c, i, l, a, u, f, h, d, k, b, I = "", T = e.pos, C = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91 || (l = e.pos + 2, i = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), i < 0))
    return !1;
  if (a = i + 1, a < C && e.src.charCodeAt(a) === 40) {
    for (a++; a < C && (s = e.src.charCodeAt(a), !(!Vr(s) && s !== 10)); a++)
      ;
    if (a >= C)
      return !1;
    for (b = a, f = e.md.helpers.parseLinkDestination(e.src, a, e.posMax), f.ok && (I = e.md.normalizeLink(f.str), e.md.validateLink(I) ? a = f.pos : I = ""), b = a; a < C && (s = e.src.charCodeAt(a), !(!Vr(s) && s !== 10)); a++)
      ;
    if (f = e.md.helpers.parseLinkTitle(e.src, a, e.posMax), a < C && b !== a && f.ok)
      for (h = f.str, a = f.pos; a < C && (s = e.src.charCodeAt(a), !(!Vr(s) && s !== 10)); a++)
        ;
    else
      h = "";
    if (a >= C || e.src.charCodeAt(a) !== 41)
      return e.pos = T, !1;
    a++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (a < C && e.src.charCodeAt(a) === 91 ? (b = a + 1, a = e.md.helpers.parseLinkLabel(e, a), a >= 0 ? c = e.src.slice(b, a++) : a = i + 1) : a = i + 1, c || (c = e.src.slice(l, i)), u = e.env.references[yV(c)], !u)
      return e.pos = T, !1;
    I = u.href, h = u.title;
  }
  return n || (o = e.src.slice(l, i), e.md.inline.parse(
    o,
    e.md,
    e.env,
    k = []
  ), d = e.push("image", "img", 0), d.attrs = r = [["src", I], ["alt", ""]], d.children = k, d.content = o, h && r.push(["title", h])), e.pos = a, e.posMax = C, !0;
}, EV = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, wV = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, CV = function(e, n) {
  var r, s, o, c, i, l, a = e.pos;
  if (e.src.charCodeAt(a) !== 60)
    return !1;
  for (i = e.pos, l = e.posMax; ; ) {
    if (++a >= l || (c = e.src.charCodeAt(a), c === 60))
      return !1;
    if (c === 62)
      break;
  }
  return r = e.src.slice(i + 1, a), wV.test(r) ? (s = e.md.normalizeLink(r), e.md.validateLink(s) ? (n || (o = e.push("link_open", "a", 1), o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto", o = e.push("text", "", 0), o.content = e.md.normalizeLinkText(r), o = e.push("link_close", "a", -1), o.markup = "autolink", o.info = "auto"), e.pos += r.length + 2, !0) : !1) : EV.test(r) ? (s = e.md.normalizeLink("mailto:" + r), e.md.validateLink(s) ? (n || (o = e.push("link_open", "a", 1), o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto", o = e.push("text", "", 0), o.content = e.md.normalizeLinkText(r), o = e.push("link_close", "a", -1), o.markup = "autolink", o.info = "auto"), e.pos += r.length + 2, !0) : !1) : !1;
}, AV = yr.HTML_TAG_RE;
function SV(t) {
  var e = t | 32;
  return e >= 97 && e <= 122;
}
var DV = function(e, n) {
  var r, s, o, c, i = e.pos;
  return !e.md.options.html || (o = e.posMax, e.src.charCodeAt(i) !== 60 || i + 2 >= o) || (r = e.src.charCodeAt(i + 1), r !== 33 && r !== 63 && r !== 47 && !SV(r)) || (s = e.src.slice(i).match(AV), !s) ? !1 : (n || (c = e.push("html_inline", "", 0), c.content = e.src.slice(i, i + s[0].length)), e.pos += s[0].length, !0);
}, vc = Ki, TV = le.has, RV = le.isValidEntityCode, xc = le.fromCodePoint, qV = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, MV = /^&([a-z][a-z0-9]{1,31});/i, NV = function(e, n) {
  var r, s, o, c = e.pos, i = e.posMax;
  if (e.src.charCodeAt(c) !== 38)
    return !1;
  if (c + 1 < i) {
    if (r = e.src.charCodeAt(c + 1), r === 35) {
      if (o = e.src.slice(c).match(qV), o)
        return n || (s = o[1][0].toLowerCase() === "x" ? parseInt(o[1].slice(1), 16) : parseInt(o[1], 10), e.pending += RV(s) ? xc(s) : xc(65533)), e.pos += o[0].length, !0;
    } else if (o = e.src.slice(c).match(MV), o && TV(vc, o[1]))
      return n || (e.pending += vc[o[1]]), e.pos += o[0].length, !0;
  }
  return n || (e.pending += "&"), e.pos++, !0;
};
function yc(t, e) {
  var n, r, s, o, c, i, l, a, u = {}, f = e.length;
  if (f) {
    var h = 0, d = -2, k = [];
    for (n = 0; n < f; n++)
      if (s = e[n], k.push(0), (e[h].marker !== s.marker || d !== s.token - 1) && (h = n), d = s.token, s.length = s.length || 0, !!s.close) {
        for (u.hasOwnProperty(s.marker) || (u[s.marker] = [-1, -1, -1, -1, -1, -1]), c = u[s.marker][(s.open ? 3 : 0) + s.length % 3], r = h - k[h] - 1, i = r; r > c; r -= k[r] + 1)
          if (o = e[r], o.marker === s.marker && o.open && o.end < 0 && (l = !1, (o.close || s.open) && (o.length + s.length) % 3 === 0 && (o.length % 3 !== 0 || s.length % 3 !== 0) && (l = !0), !l)) {
            a = r > 0 && !e[r - 1].open ? k[r - 1] + 1 : 0, k[n] = n - r + a, k[r] = a, s.open = !1, o.end = n, o.close = !1, i = -1, d = -2;
            break;
          }
        i !== -1 && (u[s.marker][(s.open ? 3 : 0) + (s.length || 0) % 3] = i);
      }
  }
}
var IV = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (yc(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && yc(e, r[n].delimiters);
}, FV = function(e) {
  var n, r, s = 0, o = e.tokens, c = e.tokens.length;
  for (n = r = 0; n < c; n++)
    o[n].nesting < 0 && s--, o[n].level = s, o[n].nesting > 0 && s++, o[n].type === "text" && n + 1 < c && o[n + 1].type === "text" ? o[n + 1].content = o[n].content + o[n + 1].content : (n !== r && (o[r] = o[n]), r++);
  n !== r && (o.length = r);
}, Zs = js, kc = le.isWhiteSpace, Ec = le.isPunctChar, wc = le.isMdAsciiPunct;
function Tn(t, e, n, r) {
  this.src = t, this.env = n, this.md = e, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1;
}
Tn.prototype.pushPending = function() {
  var t = new Zs("text", "", 0);
  return t.content = this.pending, t.level = this.pendingLevel, this.tokens.push(t), this.pending = "", t;
};
Tn.prototype.push = function(t, e, n) {
  this.pending && this.pushPending();
  var r = new Zs(t, e, n), s = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], s = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(s), r;
};
Tn.prototype.scanDelims = function(t, e) {
  var n = t, r, s, o, c, i, l, a, u, f, h = !0, d = !0, k = this.posMax, b = this.src.charCodeAt(t);
  for (r = t > 0 ? this.src.charCodeAt(t - 1) : 32; n < k && this.src.charCodeAt(n) === b; )
    n++;
  return o = n - t, s = n < k ? this.src.charCodeAt(n) : 32, a = wc(r) || Ec(String.fromCharCode(r)), f = wc(s) || Ec(String.fromCharCode(s)), l = kc(r), u = kc(s), u ? h = !1 : f && (l || a || (h = !1)), l ? d = !1 : a && (u || f || (d = !1)), e ? (c = h, i = d) : (c = h && (!d || a), i = d && (!h || f)), {
    can_open: c,
    can_close: i,
    length: o
  };
};
Tn.prototype.Token = Zs;
var LV = Tn, Cc = Hs, Gr = [
  ["text", pV],
  ["newline", gV],
  ["escape", _V],
  ["backticks", bV],
  ["strikethrough", wr.tokenize],
  ["emphasis", Cr.tokenize],
  ["link", xV],
  ["image", kV],
  ["autolink", CV],
  ["html_inline", DV],
  ["entity", NV]
], Zr = [
  ["balance_pairs", IV],
  ["strikethrough", wr.postProcess],
  ["emphasis", Cr.postProcess],
  ["text_collapse", FV]
];
function Rn() {
  var t;
  for (this.ruler = new Cc(), t = 0; t < Gr.length; t++)
    this.ruler.push(Gr[t][0], Gr[t][1]);
  for (this.ruler2 = new Cc(), t = 0; t < Zr.length; t++)
    this.ruler2.push(Zr[t][0], Zr[t][1]);
}
Rn.prototype.skipToken = function(t) {
  var e, n, r = t.pos, s = this.ruler.getRules(""), o = s.length, c = t.md.options.maxNesting, i = t.cache;
  if (typeof i[r] < "u") {
    t.pos = i[r];
    return;
  }
  if (t.level < c)
    for (n = 0; n < o && (t.level++, e = s[n](t, !0), t.level--, !e); n++)
      ;
  else
    t.pos = t.posMax;
  e || t.pos++, i[r] = t.pos;
};
Rn.prototype.tokenize = function(t) {
  for (var e, n, r = this.ruler.getRules(""), s = r.length, o = t.posMax, c = t.md.options.maxNesting; t.pos < o; ) {
    if (t.level < c)
      for (n = 0; n < s && (e = r[n](t, !1), !e); n++)
        ;
    if (e) {
      if (t.pos >= o)
        break;
      continue;
    }
    t.pending += t.src[t.pos++];
  }
  t.pending && t.pushPending();
};
Rn.prototype.parse = function(t, e, n, r) {
  var s, o, c, i = new this.State(t, e, n, r);
  for (this.tokenize(i), o = this.ruler2.getRules(""), c = o.length, s = 0; s < c; s++)
    o[s](i);
};
Rn.prototype.State = LV;
var OV = Rn, Kr, Ac;
function PV() {
  return Ac || (Ac = 1, Kr = function(t) {
    var e = {};
    e.src_Any = Wi().source, e.src_Cc = Ji().source, e.src_Z = Yi().source, e.src_P = Us.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
    var n = "[><｜]";
    return e.src_pseudo_letter = "(?:(?!" + n + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + n + "|" + e.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-]).|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]).|" + (t && t["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + e.src_ZCc + ").|;(?!" + e.src_ZCc + ").|\\!+(?!" + e.src_ZCc + "|[!]).|\\?(?!" + e.src_ZCc + "|[?]).)+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e;
  }), Kr;
}
function hs(t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.forEach(function(n) {
    n && Object.keys(n).forEach(function(r) {
      t[r] = n[r];
    });
  }), t;
}
function Ar(t) {
  return Object.prototype.toString.call(t);
}
function BV(t) {
  return Ar(t) === "[object String]";
}
function $V(t) {
  return Ar(t) === "[object Object]";
}
function zV(t) {
  return Ar(t) === "[object RegExp]";
}
function Sc(t) {
  return Ar(t) === "[object Function]";
}
function UV(t) {
  return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var sl = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function HV(t) {
  return Object.keys(t || {}).reduce(function(e, n) {
    return e || sl.hasOwnProperty(n);
  }, !1);
}
var jV = {
  "http:": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.http || (n.re.http = new RegExp(
        "^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path,
        "i"
      )), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.no_http || (n.re.no_http = new RegExp(
        "^" + n.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path,
        "i"
      )), n.re.no_http.test(r) ? e >= 3 && t[e - 3] === ":" || e >= 3 && t[e - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.mailto || (n.re.mailto = new RegExp(
        "^" + n.re.src_email_name + "@" + n.re.src_host_strict,
        "i"
      )), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
    }
  }
}, VV = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", GV = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function ZV(t) {
  t.__index__ = -1, t.__text_cache__ = "";
}
function KV(t) {
  return function(e, n) {
    var r = e.slice(n);
    return t.test(r) ? r.match(t)[0].length : 0;
  };
}
function Dc() {
  return function(t, e) {
    e.normalize(t);
  };
}
function sr(t) {
  var e = t.re = PV()(t.__opts__), n = t.__tlds__.slice();
  t.onCompile(), t.__tlds_replaced__ || n.push(VV), n.push(e.src_xn), e.src_tlds = n.join("|");
  function r(i) {
    return i.replace("%TLDS%", e.src_tlds);
  }
  e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i");
  var s = [];
  t.__compiled__ = {};
  function o(i, l) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + l);
  }
  Object.keys(t.__schemas__).forEach(function(i) {
    var l = t.__schemas__[i];
    if (l !== null) {
      var a = { validate: null, link: null };
      if (t.__compiled__[i] = a, $V(l)) {
        zV(l.validate) ? a.validate = KV(l.validate) : Sc(l.validate) ? a.validate = l.validate : o(i, l), Sc(l.normalize) ? a.normalize = l.normalize : l.normalize ? o(i, l) : a.normalize = Dc();
        return;
      }
      if (BV(l)) {
        s.push(i);
        return;
      }
      o(i, l);
    }
  }), s.forEach(function(i) {
    t.__compiled__[t.__schemas__[i]] && (t.__compiled__[i].validate = t.__compiled__[t.__schemas__[i]].validate, t.__compiled__[i].normalize = t.__compiled__[t.__schemas__[i]].normalize);
  }), t.__compiled__[""] = { validate: null, normalize: Dc() };
  var c = Object.keys(t.__compiled__).filter(function(i) {
    return i.length > 0 && t.__compiled__[i];
  }).map(UV).join("|");
  t.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + c + ")", "i"), t.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + c + ")", "ig"), t.re.pretest = RegExp(
    "(" + t.re.schema_test.source + ")|(" + t.re.host_fuzzy_test.source + ")|@",
    "i"
  ), ZV(t);
}
function WV(t, e) {
  var n = t.__index__, r = t.__last_index__, s = t.__text_cache__.slice(n, r);
  this.schema = t.__schema__.toLowerCase(), this.index = n + e, this.lastIndex = r + e, this.raw = s, this.text = s, this.url = s;
}
function Tc(t, e) {
  var n = new WV(t, e);
  return t.__compiled__[n.schema].normalize(n, t), n;
}
function Oe(t, e) {
  if (!(this instanceof Oe))
    return new Oe(t, e);
  e || HV(t) && (e = t, t = {}), this.__opts__ = hs({}, sl, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = hs({}, jV, t), this.__compiled__ = {}, this.__tlds__ = GV, this.__tlds_replaced__ = !1, this.re = {}, sr(this);
}
Oe.prototype.add = function(e, n) {
  return this.__schemas__[e] = n, sr(this), this;
};
Oe.prototype.set = function(e) {
  return this.__opts__ = hs(this.__opts__, e), this;
};
Oe.prototype.test = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return !1;
  var n, r, s, o, c, i, l, a, u;
  if (this.re.schema_test.test(e)) {
    for (l = this.re.schema_search, l.lastIndex = 0; (n = l.exec(e)) !== null; )
      if (o = this.testSchemaAt(e, n[2], l.lastIndex), o) {
        this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + o;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (a = e.search(this.re.host_fuzzy_test), a >= 0 && (this.__index__ < 0 || a < this.__index__) && (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (c = r.index + r[1].length, (this.__index__ < 0 || c < this.__index__) && (this.__schema__ = "", this.__index__ = c, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = e.indexOf("@"), u >= 0 && (s = e.match(this.re.email_fuzzy)) !== null && (c = s.index + s[1].length, i = s.index + s[0].length, (this.__index__ < 0 || c < this.__index__ || c === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = c, this.__last_index__ = i))), this.__index__ >= 0;
};
Oe.prototype.pretest = function(e) {
  return this.re.pretest.test(e);
};
Oe.prototype.testSchemaAt = function(e, n, r) {
  return this.__compiled__[n.toLowerCase()] ? this.__compiled__[n.toLowerCase()].validate(e, r, this) : 0;
};
Oe.prototype.match = function(e) {
  var n = 0, r = [];
  this.__index__ >= 0 && this.__text_cache__ === e && (r.push(Tc(this, n)), n = this.__last_index__);
  for (var s = n ? e.slice(n) : e; this.test(s); )
    r.push(Tc(this, n)), s = s.slice(this.__last_index__), n += this.__last_index__;
  return r.length ? r : null;
};
Oe.prototype.tlds = function(e, n) {
  return e = Array.isArray(e) ? e : [e], n ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(r, s, o) {
    return r !== o[s - 1];
  }).reverse(), sr(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, sr(this), this);
};
Oe.prototype.normalize = function(e) {
  e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url);
};
Oe.prototype.onCompile = function() {
};
var JV = Oe;
const Vt = 2147483647, Ke = 36, Ks = 1, An = 26, YV = 38, XV = 700, ol = 72, cl = 128, il = "-", QV = /^xn--/, e9 = /[^\0-\x7F]/, t9 = /[\x2E\u3002\uFF0E\uFF61]/g, n9 = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Wr = Ke - Ks, We = Math.floor, Jr = String.fromCharCode;
function it(t) {
  throw new RangeError(n9[t]);
}
function r9(t, e) {
  const n = [];
  let r = t.length;
  for (; r--; )
    n[r] = e(t[r]);
  return n;
}
function ll(t, e) {
  const n = t.split("@");
  let r = "";
  n.length > 1 && (r = n[0] + "@", t = n[1]), t = t.replace(t9, ".");
  const s = t.split("."), o = r9(s, e).join(".");
  return r + o;
}
function Ws(t) {
  const e = [];
  let n = 0;
  const r = t.length;
  for (; n < r; ) {
    const s = t.charCodeAt(n++);
    if (s >= 55296 && s <= 56319 && n < r) {
      const o = t.charCodeAt(n++);
      (o & 64512) == 56320 ? e.push(((s & 1023) << 10) + (o & 1023) + 65536) : (e.push(s), n--);
    } else
      e.push(s);
  }
  return e;
}
const al = (t) => String.fromCodePoint(...t), s9 = function(t) {
  return t >= 48 && t < 58 ? 26 + (t - 48) : t >= 65 && t < 91 ? t - 65 : t >= 97 && t < 123 ? t - 97 : Ke;
}, Rc = function(t, e) {
  return t + 22 + 75 * (t < 26) - ((e != 0) << 5);
}, ul = function(t, e, n) {
  let r = 0;
  for (t = n ? We(t / XV) : t >> 1, t += We(t / e); t > Wr * An >> 1; r += Ke)
    t = We(t / Wr);
  return We(r + (Wr + 1) * t / (t + YV));
}, Js = function(t) {
  const e = [], n = t.length;
  let r = 0, s = cl, o = ol, c = t.lastIndexOf(il);
  c < 0 && (c = 0);
  for (let i = 0; i < c; ++i)
    t.charCodeAt(i) >= 128 && it("not-basic"), e.push(t.charCodeAt(i));
  for (let i = c > 0 ? c + 1 : 0; i < n; ) {
    const l = r;
    for (let u = 1, f = Ke; ; f += Ke) {
      i >= n && it("invalid-input");
      const h = s9(t.charCodeAt(i++));
      h >= Ke && it("invalid-input"), h > We((Vt - r) / u) && it("overflow"), r += h * u;
      const d = f <= o ? Ks : f >= o + An ? An : f - o;
      if (h < d)
        break;
      const k = Ke - d;
      u > We(Vt / k) && it("overflow"), u *= k;
    }
    const a = e.length + 1;
    o = ul(r - l, a, l == 0), We(r / a) > Vt - s && it("overflow"), s += We(r / a), r %= a, e.splice(r++, 0, s);
  }
  return String.fromCodePoint(...e);
}, Ys = function(t) {
  const e = [];
  t = Ws(t);
  const n = t.length;
  let r = cl, s = 0, o = ol;
  for (const l of t)
    l < 128 && e.push(Jr(l));
  const c = e.length;
  let i = c;
  for (c && e.push(il); i < n; ) {
    let l = Vt;
    for (const u of t)
      u >= r && u < l && (l = u);
    const a = i + 1;
    l - r > We((Vt - s) / a) && it("overflow"), s += (l - r) * a, r = l;
    for (const u of t)
      if (u < r && ++s > Vt && it("overflow"), u === r) {
        let f = s;
        for (let h = Ke; ; h += Ke) {
          const d = h <= o ? Ks : h >= o + An ? An : h - o;
          if (f < d)
            break;
          const k = f - d, b = Ke - d;
          e.push(
            Jr(Rc(d + k % b, 0))
          ), f = We(k / b);
        }
        e.push(Jr(Rc(f, 0))), o = ul(s, a, i === c), s = 0, ++i;
      }
    ++s, ++r;
  }
  return e.join("");
}, fl = function(t) {
  return ll(t, function(e) {
    return QV.test(e) ? Js(e.slice(4).toLowerCase()) : e;
  });
}, hl = function(t) {
  return ll(t, function(e) {
    return e9.test(e) ? "xn--" + Ys(e) : e;
  });
}, o9 = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Ws,
    encode: al
  },
  decode: Js,
  encode: Ys,
  toASCII: hl,
  toUnicode: fl
}, c9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Js,
  default: o9,
  encode: Ys,
  toASCII: hl,
  toUnicode: fl,
  ucs2decode: Ws,
  ucs2encode: al
}, Symbol.toStringTag, { value: "Module" })), i9 = /* @__PURE__ */ ef(c9);
var l9 = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 100
    // Internal protection, recursion limit
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, a9 = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "text_collapse"
      ]
    }
  }
}, u9 = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "text_collapse"
      ]
    }
  }
}, _n = le, f9 = xr, h9 = u5, p9 = N5, d9 = fV, g9 = OV, m9 = JV, Ct = Qt, pl = i9, _9 = {
  default: l9,
  zero: a9,
  commonmark: u9
}, b9 = /^(vbscript|javascript|file|data):/, v9 = /^data:image\/(gif|png|jpeg|webp);/;
function x9(t) {
  var e = t.trim().toLowerCase();
  return b9.test(e) ? !!v9.test(e) : !0;
}
var dl = ["http:", "https:", "mailto:"];
function y9(t) {
  var e = Ct.parse(t, !0);
  if (e.hostname && (!e.protocol || dl.indexOf(e.protocol) >= 0))
    try {
      e.hostname = pl.toASCII(e.hostname);
    } catch {
    }
  return Ct.encode(Ct.format(e));
}
function k9(t) {
  var e = Ct.parse(t, !0);
  if (e.hostname && (!e.protocol || dl.indexOf(e.protocol) >= 0))
    try {
      e.hostname = pl.toUnicode(e.hostname);
    } catch {
    }
  return Ct.decode(Ct.format(e), Ct.decode.defaultChars + "%");
}
function Pe(t, e) {
  if (!(this instanceof Pe))
    return new Pe(t, e);
  e || _n.isString(t) || (e = t || {}, t = "default"), this.inline = new g9(), this.block = new d9(), this.core = new p9(), this.renderer = new h9(), this.linkify = new m9(), this.validateLink = x9, this.normalizeLink = y9, this.normalizeLinkText = k9, this.utils = _n, this.helpers = _n.assign({}, f9), this.options = {}, this.configure(t), e && this.set(e);
}
Pe.prototype.set = function(t) {
  return _n.assign(this.options, t), this;
};
Pe.prototype.configure = function(t) {
  var e = this, n;
  if (_n.isString(t) && (n = t, t = _9[n], !t))
    throw new Error('Wrong `markdown-it` preset "' + n + '", check name');
  if (!t)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return t.options && e.set(t.options), t.components && Object.keys(t.components).forEach(function(r) {
    t.components[r].rules && e[r].ruler.enableOnly(t.components[r].rules), t.components[r].rules2 && e[r].ruler2.enableOnly(t.components[r].rules2);
  }), this;
};
Pe.prototype.enable = function(t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    n = n.concat(this[s].ruler.enable(t, !0));
  }, this), n = n.concat(this.inline.ruler2.enable(t, !0));
  var r = t.filter(function(s) {
    return n.indexOf(s) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
Pe.prototype.disable = function(t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    n = n.concat(this[s].ruler.disable(t, !0));
  }, this), n = n.concat(this.inline.ruler2.disable(t, !0));
  var r = t.filter(function(s) {
    return n.indexOf(s) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
Pe.prototype.use = function(t) {
  var e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return t.apply(t, e), this;
};
Pe.prototype.parse = function(t, e) {
  if (typeof t != "string")
    throw new Error("Input data should be a String");
  var n = new this.core.State(t, this, e);
  return this.core.process(n), n.tokens;
};
Pe.prototype.render = function(t, e) {
  return e = e || {}, this.renderer.render(this.parse(t, e), this.options, e);
};
Pe.prototype.parseInline = function(t, e) {
  var n = new this.core.State(t, this, e);
  return n.inlineMode = !0, this.core.process(n), n.tokens;
};
Pe.prototype.renderInline = function(t, e) {
  return e = e || {}, this.renderer.render(this.parseInline(t, e), this.options, e);
};
var E9 = Pe, w9 = E9;
const C9 = /* @__PURE__ */ Ti(w9);
var A9 = Ue({
  name: "VueMarkdown",
  props: {
    source: {
      type: String,
      required: !0
    },
    options: {
      type: Object,
      required: !1
    }
  },
  data: function() {
    return {
      md: null
    };
  },
  computed: {
    content: function() {
      var t, e = this.source;
      return (t = this.md) === null || t === void 0 ? void 0 : t.render(e);
    }
  },
  created: function() {
    var t;
    this.md = new C9((t = this.options) !== null && t !== void 0 ? t : {});
  },
  render: function() {
    return Si("div", { innerHTML: this.content });
  }
});
const S9 = A9, ps = /* @__PURE__ */ Ue({
  __name: "Message",
  props: {
    message: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    const e = t, { message: n } = ha(e), r = Tt(() => n.value.text || "&lt;Empty response&gt;"), s = Tt(() => ({
      "chat-message-from-user": n.value.sender === "user",
      "chat-message-from-bot": n.value.sender === "bot"
    })), o = {
      highlight(c, i) {
        if (i && nr.getLanguage(i))
          try {
            return nr.highlight(c, { language: i }).value;
          } catch {
          }
        return "";
      }
    };
    return (c, i) => (oe(), be("div", {
      class: Sn(["chat-message", s.value])
    }, [
      pn(c.$slots, "default", {}, () => [
        pe(ge(S9), {
          class: "chat-message-markdown",
          source: r.value,
          options: o
        }, null, 8, ["source"])
      ])
    ], 2));
  }
}), D9 = /* @__PURE__ */ we("div", { class: "chat-message-typing-body" }, [
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" }),
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" }),
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" })
], -1), T9 = /* @__PURE__ */ Ue({
  __name: "MessageTyping",
  props: {
    animation: {
      type: String,
      default: "bouncing"
    }
  },
  setup(t) {
    const e = t, n = {
      id: "typing",
      text: "",
      sender: "bot",
      createdAt: ""
    }, r = Tt(() => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "chat-message-typing": !0,
      [`chat-message-typing-animation-${e.animation}`]: !0
    }));
    return (s, o) => (oe(), Se(ge(ps), {
      class: Sn(r.value),
      message: n
    }, {
      default: ft(() => [
        D9
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), R9 = { class: "chat-messages-list" }, q9 = /* @__PURE__ */ Ue({
  __name: "MessagesList",
  props: {
    messages: {
      type: Array,
      required: !0
    }
  },
  setup(t) {
    const e = $s(), { initialMessages: n, waitingForResponse: r } = e;
    return (s, o) => (oe(), be("div", R9, [
      (oe(!0), be(Re, null, uo(ge(n), (c) => (oe(), Se(ps, {
        key: c.id,
        message: c
      }, null, 8, ["message"]))), 128)),
      (oe(!0), be(Re, null, uo(t.messages, (c) => (oe(), Se(ps, {
        key: c.id,
        message: c
      }, null, 8, ["message"]))), 128)),
      ge(r) ? (oe(), Se(T9, { key: 0 })) : mn("", !0)
    ]));
  }
}), M9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, N9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "m2 21l21-9L2 3v7l15 2l-15 2z"
}, null, -1), I9 = [
  N9
];
function F9(t, e) {
  return oe(), be("svg", M9, [...I9]);
}
const L9 = { name: "mdi-send", render: F9 }, O9 = { class: "chat-input" }, P9 = ["placeholder", "onKeydown"], B9 = ["disabled"], $9 = /* @__PURE__ */ Ue({
  __name: "Input",
  setup(t) {
    const e = $s(), { waitingForResponse: n } = e, { t: r } = _r(), s = Ut(""), o = Tt(() => s.value === "" || n.value);
    async function c(l) {
      if (l.preventDefault(), o.value)
        return;
      const a = s.value;
      s.value = "", await e.sendMessage(a);
    }
    async function i(l) {
      l.shiftKey || await c(l);
    }
    return (l, a) => (oe(), be("div", O9, [
      li(we("textarea", {
        "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u),
        rows: "1",
        placeholder: ge(r)("inputPlaceholder"),
        onKeydown: Ku(i, ["enter"])
      }, null, 40, P9), [
        [Gu, s.value]
      ]),
      we("button", {
        disabled: o.value,
        class: "chat-input-send-button",
        onClick: c
      }, [
        pe(ge(L9), {
          height: "32",
          width: "32"
        })
      ], 8, B9)
    ]));
  }
}), gl = /* @__PURE__ */ Ue({
  __name: "Chat",
  setup(t) {
    const { t: e } = _r(), n = $s(), { messages: r, currentSessionId: s } = n, { options: o } = zs();
    async function c() {
      n.startNewSession(), Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    async function i() {
      await n.loadPreviousSession(), Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    return Dn(async () => {
      await i(), !o.showWelcomeScreen && !s.value && await c();
    }), (l, a) => (oe(), Se(uh, { class: "chat-wrapper" }, {
      header: ft(() => [
        we("h1", null, Zn(ge(e)("title")), 1),
        we("p", null, Zn(ge(e)("subtitle")), 1)
      ]),
      footer: ft(() => [
        ge(s) ? (oe(), Se($9, { key: 0 })) : (oe(), Se(kh, { key: 1 }))
      ]),
      default: ft(() => [
        !ge(s) && ge(o).showWelcomeScreen ? (oe(), Se(dh, {
          key: 0,
          "onClick:button": c
        })) : (oe(), Se(q9, {
          key: 1,
          messages: ge(r)
        }, null, 8, ["messages"]))
      ]),
      _: 1
    }));
  }
}), z9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, U9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"
}, null, -1), H9 = [
  U9
];
function j9(t, e) {
  return oe(), be("svg", z9, [...H9]);
}
const V9 = { name: "mdi-chat", render: j9 }, G9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, Z9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
}, null, -1), K9 = [
  Z9
];
function W9(t, e) {
  return oe(), be("svg", G9, [...K9]);
}
const J9 = { name: "mdi-chevron-down", render: W9 }, Y9 = { class: "chat-window-wrapper" }, X9 = { class: "chat-window" }, Q9 = /* @__PURE__ */ Ue({
  __name: "ChatWindow",
  setup(t) {
    const e = Ut(!1);
    function n() {
      e.value = !e.value, e.value && Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    return (r, s) => (oe(), be("div", Y9, [
      pe(er, { name: "chat-window-transition" }, {
        default: ft(() => [
          li(we("div", X9, [
            pe(gl)
          ], 512), [
            [Wu, e.value]
          ])
        ]),
        _: 1
      }),
      we("div", {
        class: "chat-window-toggle",
        onClick: n
      }, [
        pe(er, {
          name: "chat-window-toggle-transition",
          mode: "out-in"
        }, {
          default: ft(() => [
            e.value ? (oe(), Se(ge(J9), {
              key: 1,
              height: "32",
              width: "32"
            })) : (oe(), Se(ge(V9), {
              key: 0,
              height: "32",
              width: "32"
            }))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), eG = /* @__PURE__ */ Ue({
  __name: "App",
  props: {},
  setup(t) {
    const { options: e } = zs(), n = Tt(() => e.mode === "fullscreen");
    return Dn(() => {
      nr.registerLanguage("xml", Wf), nr.registerLanguage("javascript", eh);
    }), (r, s) => n.value ? (oe(), Se(ge(gl), {
      key: 0,
      class: "n8n-chat"
    })) : (oe(), Se(ge(Q9), {
      key: 1,
      class: "n8n-chat"
    }));
  }
});
var Un, tG = new Uint8Array(16);
function nG() {
  if (!Un && (Un = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Un))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Un(tG);
}
const rG = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function sG(t) {
  return typeof t == "string" && rG.test(t);
}
var ve = [];
for (var Yr = 0; Yr < 256; ++Yr)
  ve.push((Yr + 256).toString(16).substr(1));
function oG(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ve[t[e + 0]] + ve[t[e + 1]] + ve[t[e + 2]] + ve[t[e + 3]] + "-" + ve[t[e + 4]] + ve[t[e + 5]] + "-" + ve[t[e + 6]] + ve[t[e + 7]] + "-" + ve[t[e + 8]] + ve[t[e + 9]] + "-" + ve[t[e + 10]] + ve[t[e + 11]] + ve[t[e + 12]] + ve[t[e + 13]] + ve[t[e + 14]] + ve[t[e + 15]]).toLowerCase();
  if (!sG(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function an(t, e, n) {
  t = t || {};
  var r = t.random || (t.rng || nG)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    n = n || 0;
    for (var s = 0; s < 16; ++s)
      e[n + s] = r[s];
    return e;
  }
  return oG(r);
}
async function cG() {
  return "";
}
async function ml(...t) {
  var r;
  const e = await cG();
  return await (await fetch(t[0], {
    ...t[1],
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      ...e ? { authorization: `Bearer ${e}` } : {},
      ...(r = t[1]) == null ? void 0 : r.headers
    }
  })).json();
}
async function _l(t, e = {}, n = {}) {
  let r = t;
  return Object.keys(e).length > 0 && (r = `${r}?${new URLSearchParams(
    e
  ).toString()}`), await ml(r, { ...n, method: "GET" });
}
async function bl(t, e = {}, n = {}) {
  return await ml(t, {
    ...n,
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function iG(t, e) {
  var r, s;
  return await (((r = e.webhookConfig) == null ? void 0 : r.method) === "POST" ? bl : _l)(
    `${e.webhookUrl}`,
    {
      action: "loadPreviousSession",
      [e.chatSessionKey]: t,
      ...e.metadata ? { metadata: e.metadata } : {}
    },
    {
      headers: (s = e.webhookConfig) == null ? void 0 : s.headers
    }
  );
}
async function lG(t, e, n) {
  var s, o;
  return await (((s = n.webhookConfig) == null ? void 0 : s.method) === "POST" ? bl : _l)(
    `${n.webhookUrl}`,
    {
      action: "sendMessage",
      [n.chatSessionKey]: e,
      [n.chatInputKey]: t,
      ...n.metadata ? { metadata: n.metadata } : {}
    },
    {
      headers: (o = n.webhookConfig) == null ? void 0 : o.headers
    }
  );
}
const aG = {
  install(t, e) {
    t.provide(Zi, e);
    const n = Ut([]), r = Ut(null), s = Ut(!1), o = Tt(
      () => (e.initialMessages ?? []).map((u) => ({
        id: an(),
        text: u,
        sender: "bot",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }))
    );
    async function c(u) {
      const f = {
        id: an(),
        text: u,
        sender: "user",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      n.value.push(f), s.value = !0, Kt(() => {
        Rt.emit("scrollToBottom");
      });
      const h = await lG(
        u,
        r.value,
        e
      );
      let d = h.output ?? h.text ?? "";
      if (d === "" && Object.keys(h).length > 0)
        try {
          d = JSON.stringify(h, null, 2);
        } catch {
        }
      const k = {
        id: an(),
        text: d,
        sender: "bot",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      n.value.push(k), s.value = !1, Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    async function i() {
      if (!e.loadPreviousSession)
        return;
      const u = localStorage.getItem(Go) ?? an(), f = await iG(u, e), h = (/* @__PURE__ */ new Date()).toISOString();
      return n.value = ((f == null ? void 0 : f.data) || []).map((d, k) => ({
        id: `${k}`,
        text: d.kwargs.content,
        sender: d.id.includes("HumanMessage") ? "user" : "bot",
        createdAt: h
      })), n.value.length && (r.value = u), u;
    }
    async function l() {
      r.value = an(), localStorage.setItem(Go, r.value);
    }
    const a = {
      initialMessages: o,
      messages: n,
      currentSessionId: r,
      waitingForResponse: s,
      loadPreviousSession: i,
      startNewSession: l,
      sendMessage: c
    };
    t.provide(Gi, a), t.config.globalProperties.$chat = a;
  }
};
function uG(t) {
  var s, o;
  const e = {
    ...ln,
    ...t,
    webhookConfig: {
      ...ln.webhookConfig,
      ...t == null ? void 0 : t.webhookConfig
    },
    i18n: {
      ...ln.i18n,
      ...t == null ? void 0 : t.i18n,
      en: {
        ...(s = ln.i18n) == null ? void 0 : s.en,
        ...(o = t == null ? void 0 : t.i18n) == null ? void 0 : o.en
      }
    },
    theme: {
      ...ln.theme,
      ...t == null ? void 0 : t.theme
    }
  }, n = e.target ?? fh;
  typeof n == "string" && ch(n);
  const r = Xu(eG);
  return r.use(aG, e), r.mount(n), r;
}
export {
  uG as createChat
};
