/* eslint-disable */

const t = { 65505: 'exif', 65504: 'jfif', 65498: 'sos' }
var e = (e) => {
  if (65496 !== e.getUint16(0)) return
  const n = Object.keys(t).map((t) => parseInt(t, 10)),
    o = e.byteLength
  let i,
    r = 2,
    a = void 0
  for (; r < o && 255 === e.getUint8(r); ) {
    if (((i = e.getUint16(r)), n.includes(i))) {
      const n = t[i]
      a || (a = {}), a[n] || (a[n] = { offset: r, size: e.getUint16(r + 2) })
    }
    if (65498 === i) break
    r += 2 + e.getUint16(r + 2)
  }
  return a
}
var n = (t, n, o) => {
  if (!t) return
  const i = new DataView(t),
    r = e(i)
  if (!r || !r.exif) return
  const a = ((t, e) => {
    if (65505 !== t.getUint16(e)) return
    const n = t.getUint16(e + 2)
    if (((e += 4), 1165519206 !== t.getUint32(e))) return
    e += 6
    let o = t.getUint16(e)
    if (18761 !== o && 19789 !== o) return
    const i = 18761 === o
    if (((e += 2), 42 !== t.getUint16(e, i))) return
    e += t.getUint32(e + 2, i)
    const r = (o) => {
      let r = []
      for (let a = e; a < e + n; a += 12) {
        let e = a
        t.getUint16(e, i) === o && r.push(e)
      }
      return r
    }
    return {
      read: (e) => {
        const n = r(e)
        if (n.length) return t.getUint16(n[0] + 8, i)
      },
      write: (e, n) => {
        const o = r(e)
        return !!o.length && (o.forEach((e) => t.setUint16(e + 8, n, i)), !0)
      },
    }
  })(i, r.exif.offset)
  return a ? (void 0 === o ? a.read(n) : a.write(n, o)) : void 0
}
var o = (t) => (window.__pqina_webapi__ ? window.__pqina_webapi__[t] : window[t]),
  i = (...t) => {}
const r = { ArrayBuffer: 'readAsArrayBuffer' }
var a = async (t, e = [0, t.size], n) =>
    await ((t, e = i, n = {}) =>
      new Promise((i, a) => {
        const { dataFormat: s = r.ArrayBuffer } = n,
          l = new (o('FileReader'))()
        ;(l.onload = () => i(l.result)), (l.onerror = a), (l.onprogress = e), l[s](t)
      }))(t.slice(...e), n),
  s = async (t, e) => {
    const o = await a(t, [0, 65536], e)
    return n(o, 274) || 1
  }
let l = null
var c = () => (null === l && (l = 'undefined' != typeof window && void 0 !== window.document), l)
let u = null
var d = () =>
    new Promise((t) => {
      if (null === u) {
        const e =
          'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k='
        let n = c() ? new Image() : {}
        return (
          (n.onload = () => {
            ;(u = 1 === n.naturalWidth), (n = void 0), t(u)
          }),
          void (n.src = e)
        )
      }
      return t(u)
    }),
  p = (t) => t.getContext('2d').getImageData(0, 0, t.width, t.height),
  h = (t, e, n = []) => {
    const o = document.createElement(t),
      i = Object.getOwnPropertyDescriptors(o.__proto__)
    for (const t in e)
      'style' === t
        ? (o.style.cssText = e[t])
        : (i[t] && i[t].set) || /textContent|innerHTML/.test(t) || 'function' == typeof e[t]
        ? (o[t] = e[t])
        : o.setAttribute(t, e[t])
    return n.forEach((t) => o.appendChild(t)), o
  }
const g = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (t) => [-1, 0, 0, 1, t, 0],
  3: (t, e) => [-1, 0, 0, -1, t, e],
  4: (t, e) => [1, 0, 0, -1, 0, e],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (t, e) => [0, 1, -1, 0, e, 0],
  7: (t, e) => [0, -1, -1, 0, e, t],
  8: (t) => [0, -1, 1, 0, 0, t],
}
var m = (t) => {
    ;(t.width = 1), (t.height = 1)
    const e = t.getContext('2d')
    e && e.clearRect(0, 0, 1, 1)
  },
  f = (t) => 'data' in t,
  $ = async (t, e = 1) => {
    const [n, o] = (await d()) || e < 5 ? [t.width, t.height] : [t.height, t.width],
      i = h('canvas', { width: n, height: o }),
      r = i.getContext('2d')
    if (f(t) && !(await d()) && e > 1) {
      const e = h('canvas', { width: t.width, height: t.height })
      e.getContext('2d').putImageData(t, 0, 0), (t = e)
    }
    return (
      !(await d()) &&
        e > 1 &&
        r.transform.apply(
          r,
          ((t, e, n = -1) => (-1 === n && (n = 1), g[n](t, e)))(t.width, t.height, e)
        ),
      f(t) ? r.putImageData(t, 0, 0) : r.drawImage(t, 0, 0),
      t instanceof HTMLCanvasElement && m(t),
      i
    )
  },
  y = async (t, e = 1) => (1 === e || (await d()) ? t : p(await $(t, e))),
  x = (t) => 'object' == typeof t
const b = (t) => (x(t) ? v(t) : t),
  v = (t) => {
    let e
    return (
      Array.isArray(t)
        ? ((e = []),
          t.forEach((t, n) => {
            e[n] = b(t)
          }))
        : ((e = {}),
          Object.keys(t).forEach((n) => {
            const o = t[n]
            e[n] = b(o)
          })),
      e
    )
  }
var w = (t) => 'string' == typeof t,
  S = (t, e) =>
    new Promise((n, o) => {
      const i = () =>
        n(
          ((t, e) => {
            let n = t.naturalWidth,
              o = t.naturalHeight
            const i = n * o
            if (e && i > e) {
              const t = Math.sqrt(e) / Math.sqrt(i)
              ;(n = Math.floor(n * t)), (o = Math.floor(o * t))
            }
            const r = h('canvas')
            return (r.width = n), (r.height = o), r.getContext('2d').drawImage(t, 0, 0, n, o), r
          })(t, e)
        )
      t.complete && t.width ? i() : ((t.onload = i), (t.onerror = o))
    }),
  k = () => 'createImageBitmap' in window,
  C = (t) => /svg/.test(t.type),
  M = () => Math.random().toString(36).substr(2, 9)
const R = new Map()
var T = (t, e, n) =>
    new Promise((o, i) => {
      let r = t.toString(),
        a = R.get(r)
      if (!a) {
        const e = ((t) =>
            `function () {self.onmessage = function (message) {(${t.toString()}).apply(null, message.data.content.concat([function (err, response) {\n    response = response || {};\n    const transfer = 'data' in response ? [response.data.buffer] : 'width' in response ? [response] : [];\n    return self.postMessage({ id: message.data.id, content: response, error: err }, transfer);\n}]))}}`)(
            t
          ),
          n = URL.createObjectURL(
            ((t) =>
              new Blob(['(', 'function' == typeof t ? t.toString() : t, ')()'], {
                type: 'application/javascript',
              }))(e)
          ),
          o = new Map(),
          i = new Worker(n)
        ;(a = {
          url: n,
          worker: i,
          messages: o,
          terminate: () => {
            a.worker.terminate(), URL.revokeObjectURL(n)
          },
        }),
          (i.onmessage = function (t) {
            const { id: e, content: n, error: i } = t.data
            if (!o.has(e)) return
            const r = o.get(e)
            o.delete(e), null != i ? r.reject(i) : r.resolve(n)
          }),
          R.set(r, a)
      }
      const s = M()
      a.messages.set(s, { resolve: o, reject: i }), a.worker.postMessage({ id: s, content: e }, n)
    }),
  P = async (t, e) => {
    let n
    if (k() && !C(t) && 'OffscreenCanvas' in window)
      try {
        n = await T(
          (t, e, n) => {
            createImageBitmap(t)
              .then((t) => {
                let o = t.width,
                  i = t.height
                const r = o * i
                if (e && r > e) {
                  const t = Math.sqrt(e) / Math.sqrt(r)
                  ;(o = Math.floor(o * t)), (i = Math.floor(i * t))
                }
                const a = new OffscreenCanvas(o, i),
                  s = a.getContext('2d')
                s.drawImage(t, 0, 0, o, i)
                const l = s.getImageData(0, 0, a.width, a.height)
                n(null, l)
              })
              .catch((t) => {
                n(t)
              })
          },
          [t, e]
        )
      } catch (t) {}
    if (!n || !n.width) {
      const o = await (async (t, e) => {
        const n = h('img', { src: URL.createObjectURL(t) }),
          o = await S(n, e)
        return URL.revokeObjectURL(n.src), o
      })(t, e)
      ;(n = p(o)), m(o)
    }
    return n
  },
  E = (t, e, n) =>
    new Promise((o, i) => {
      try {
        t.toBlob(
          (t) => {
            o(t)
          },
          e,
          n
        )
      } catch (t) {
        i(t)
      }
    }),
  A = async (t, e, n) => {
    try {
      const o = await $(t),
        i = await E(o, e, n)
      return m(o), i
    } catch (t) {
      throw t
    }
  },
  I = (t) => (t.match(/\/([a-z]+)/) || [])[1],
  L = (t) => t.substr(0, t.lastIndexOf('.')) || t
const F = /avif|bmp|gif|jpg|jpeg|jpe|jif|jfif|png|svg|tiff|webp/
var B = (t) => {
    return (
      t &&
      ((e = ((n = t), n.split('.').pop()).toLowerCase()),
      F.test(e)
        ? 'image/' + (/jfif|jif|jpe|jpg/.test(e) ? 'jpeg' : 'svg' === e ? 'svg+xml' : e)
        : '')
    )
    var e, n
  },
  z = (t, e, n) => {
    const i = new Date().getTime(),
      r = t.type.length && !/null|text/.test(t.type),
      a = r ? t.type : n,
      s = ((t, e) => {
        const n = B(t)
        if (n === e) return t
        const o = I(e) || n
        return `${L(t)}.${o}`
      })(e, a)
    try {
      return new (o('File'))([t], s, { lastModified: i, type: r ? t.type : a })
    } catch (e) {
      const n = r ? t.slice() : t.slice(0, t.size, a)
      return (n.lastModified = i), (n.name = s), n
    }
  },
  D = (t, e) => t / e,
  O = (t) => t
const _ = Math.PI,
  W = Math.PI / 2,
  V = W / 2
var N = (t) => {
  const e = Math.abs(t) % Math.PI
  return e > V && e < Math.PI - V
}
const U = (t, e, n) => n + (t - n) * e,
  H = (t) => ({
    x: t.x + 0.5 * t.width,
    y: t.y + 0.5 * t.height,
    rx: 0.5 * t.width,
    ry: 0.5 * t.height,
  }),
  X = () => j(0, 0),
  j = (t, e) => ({ x: t, y: e }),
  Y = (t) => j(t.pageX, t.pageY),
  G = (t) => j(t.x, t.y),
  Z = (t) => ((t.x = -t.x), (t.y = -t.y), t),
  q = (t, e, n = X()) => {
    const o = Math.cos(e),
      i = Math.sin(e),
      r = t.x - n.x,
      a = t.y - n.y
    return (t.x = n.x + o * r - i * a), (t.y = n.y + i * r + o * a), t
  },
  K = (t) => Math.sqrt(t.x * t.x + t.y * t.y),
  Q = (t) => {
    const e = Math.sqrt(t.x * t.x + t.y * t.y)
    return 0 === e ? X() : ((t.x /= e), (t.y /= e), t)
  },
  J = (t, e) => Math.atan2(e.y - t.y, e.x - t.x),
  tt = (t, e) => ((t.x = e(t.x)), (t.y = e(t.y)), t),
  et = (t, e) => ((t.x += e.x), (t.y += e.y), t),
  nt = (t, e) => ((t.x -= e.x), (t.y -= e.y), t),
  ot = (t, e) => ((t.x *= e), (t.y *= e), t),
  it = (t, e) => t.x * e.x + t.y * e.y,
  rt = (t, e = X()) => {
    const n = t.x - e.x,
      o = t.y - e.y
    return n * n + o * o
  },
  at = (t, e = X()) => Math.sqrt(rt(t, e)),
  st = (t) => {
    let e = 0,
      n = 0
    return (
      t.forEach((t) => {
        ;(e += t.x), (n += t.y)
      }),
      j(e / t.length, n / t.length)
    )
  },
  lt = (t, e, n, o, i) => (
    t.forEach((t) => {
      ;(t.x = e ? o - (t.x - o) : t.x), (t.y = n ? i - (t.y - i) : t.y)
    }),
    t
  ),
  ct = (t, e, n, o) => {
    const i = Math.sin(e),
      r = Math.cos(e)
    return (
      t.forEach((t) => {
        ;(t.x -= n), (t.y -= o)
        const e = t.x * r - t.y * i,
          a = t.x * i + t.y * r
        ;(t.x = n + e), (t.y = o + a)
      }),
      t
    )
  },
  ut = (t, e) => ({ width: t, height: e }),
  dt = (t) => ut(t.width, t.height),
  pt = (t) => ut(t.width, t.height),
  ht = (t) => ut(t.width, t.height),
  gt = (t) => ut(t.naturalWidth, t.naturalHeight),
  mt = (t, e) => ut(t, e),
  ft = (t, e, n = O) => n(t.width) === n(e.width) && n(t.height) === n(e.height),
  $t = (t, e) => ((t.width *= e), (t.height *= e), t),
  yt = (t) => j(0.5 * t.width, 0.5 * t.height),
  xt = (t, e) => {
    const n = Math.cos(e),
      o = Math.sin(e),
      i = n * t.width + o * t.height,
      r = o * t.width + n * t.height
    return (t.width = i), (t.height = r), t
  },
  bt = (t, e) => t.width >= e.width && t.height >= e.height,
  vt = (t, e) => ((t.width = e(t.width)), (t.height = e(t.height)), t),
  wt = (t, e) => ({ start: t, end: e }),
  St = (t) => wt(G(t.start), G(t.end)),
  kt = (t, e) => {
    if (0 === e) return t
    const n = j(t.start.x - t.end.x, t.start.y - t.end.y),
      o = Q(n),
      i = ot(o, e)
    return (t.start.x += i.x), (t.start.y += i.y), (t.end.x -= i.x), (t.end.y -= i.y), t
  },
  Ct = [j(-1, -1), j(-1, 1), j(1, 1), j(1, -1)],
  Mt = (t, e, n, o) => ({ x: t, y: e, width: n, height: o }),
  Rt = (t) => Mt(t.x, t.y, t.width, t.height),
  Tt = () => Mt(0, 0, 0, 0),
  Pt = (t) => Mt(0, 0, t.width, t.height),
  Et = (t) => Mt(t.x || 0, t.y || 0, t.width || 0, t.height || 0),
  At = (...t) => {
    const e = Array.isArray(t[0]) ? t[0] : t
    let n = e[0].x,
      o = e[0].x,
      i = e[0].y,
      r = e[0].y
    return (
      e.forEach((t) => {
        ;(n = Math.min(n, t.x)),
          (o = Math.max(o, t.x)),
          (i = Math.min(i, t.y)),
          (r = Math.max(r, t.y))
      }),
      Mt(n, i, o - n, r - i)
    )
  },
  It = (t) => Ft(t.x - t.rx, t.y - t.ry, 2 * t.rx, 2 * t.ry),
  Lt = (t, e) => Mt(t.x - 0.5 * e.width, t.y - 0.5 * e.height, e.width, e.height),
  Ft = (t, e, n, o) => Mt(t, e, n, o),
  Bt = (t) => j(t.x + 0.5 * t.width, t.y + 0.5 * t.height),
  zt = (t, e) => ((t.x += e.x), (t.y += e.y), t),
  Dt = (t, e, n) => (
    (n = n || Bt(t)),
    (t.x = e * (t.x - n.x) + n.x),
    (t.y = e * (t.y - n.y) + n.y),
    (t.width = e * t.width),
    (t.height = e * t.height),
    t
  ),
  Ot = (t, e) => ((t.x *= e), (t.y *= e), (t.width *= e), (t.height *= e), t),
  _t = (t, e) => ((t.x /= e), (t.y /= e), (t.width /= e), (t.height /= e), t),
  Wt = (t, e, n = O) =>
    n(t.x) === n(e.x) &&
    n(t.y) === n(e.y) &&
    n(t.width) === n(e.width) &&
    n(t.height) === n(e.height),
  Vt = (t) => D(t.width, t.height),
  Nt = (t, e, n, o, i) => ((t.x = e), (t.y = n), (t.width = o), (t.height = i), t),
  Ut = (t, e) => ((t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height), t),
  Ht = (t, e, n) => (n || (n = Bt(t)), qt(t).map((t) => q(t, e, n))),
  Xt = (t, e) =>
    Mt(0.5 * t.width - 0.5 * e.width, 0.5 * t.height - 0.5 * e.height, e.width, e.height),
  jt = (t, e) => !(e.x < t.x) && !(e.y < t.y) && !(e.x > t.x + t.width) && !(e.y > t.y + t.height),
  Yt = (t, e, n = X()) => {
    if (0 === t.width || 0 === t.height) return Tt()
    const o = Vt(t)
    e || (e = o)
    let i = t.width,
      r = t.height
    return (
      e > o ? (i = r * e) : (r = i / e),
      Mt(n.x + 0.5 * (t.width - i), n.y + 0.5 * (t.height - r), i, r)
    )
  },
  Gt = (t, e = Vt(t), n = X()) => {
    if (0 === t.width || 0 === t.height) return Tt()
    let o = t.width,
      i = o / e
    return (
      i > t.height && ((i = t.height), (o = i * e)),
      Mt(n.x + 0.5 * (t.width - o), n.y + 0.5 * (t.height - i), o, i)
    )
  },
  Zt = (t) => [
    Math.min(t.y, t.y + t.height),
    Math.max(t.x, t.x + t.width),
    Math.max(t.y, t.y + t.height),
    Math.min(t.x, t.x + t.width),
  ],
  qt = (t) => [
    j(t.x, t.y),
    j(t.x + t.width, t.y),
    j(t.x + t.width, t.y + t.height),
    j(t.x, t.y + t.height),
  ],
  Kt = (t, e) => {
    if (t)
      return (t.x = e(t.x)), (t.y = e(t.y)), (t.width = e(t.width)), (t.height = e(t.height)), t
  },
  Qt = (t, e, n = Bt(t)) =>
    qt(t).map((t, o) => {
      const i = Ct[o]
      return j(U(t.x, 1 + i.x * e.x, n.x), U(t.y, 1 + i.y * e.y, n.y))
    }),
  Jt = (t) => ((t.x = 0), (t.y = 0), t),
  te = (t) => {
    const e = t.map(G),
      n = e[0],
      o = e[e.length - 1]
    ;(n.x == o.x && n.y == o.y) || e.push(n)
    let i,
      r,
      a,
      s = 0,
      l = 0,
      c = 0,
      u = e.length
    for (let t = 0, o = u - 1; t < u; o = t++)
      (i = e[t]),
        (r = e[o]),
        (a = (i.y - n.y) * (r.x - n.x) - (r.y - n.y) * (i.x - n.x)),
        (s += a),
        (l += (i.x + r.x - 2 * n.x) * a),
        (c += (i.y + r.y - 2 * n.y) * a)
    return (a = 3 * s), j(l / a + n.x, c / a + n.y)
  },
  ee = (t, e) => ne(t.start, t.end, e.start, e.end),
  ne = (t, e, n, o) => {
    const i =
        ((o.x - n.x) * (t.y - n.y) - (o.y - n.y) * (t.x - n.x)) /
        ((o.y - n.y) * (e.x - t.x) - (o.x - n.x) * (e.y - t.y)),
      r =
        ((e.x - t.x) * (t.y - n.y) - (e.y - t.y) * (t.x - n.x)) /
        ((o.y - n.y) * (e.x - t.x) - (o.x - n.x) * (e.y - t.y))
    if (i >= 0 && i <= 1 && r >= 0 && r <= 1) return j(t.x + i * (e.x - t.x), t.y + i * (e.y - t.y))
  },
  oe = (t, e) => {
    let n, o, i, r, a, s, l, c, u, d
    const p = e.length
    for (n = 0; n < p; n++)
      if (
        ((o = e[n]),
        (i = e[n + 1 > p - 1 ? 0 : n + 1]),
        (r = o.x - t.x),
        (a = o.y - t.y),
        (s = i.x - t.x),
        (l = i.y - t.y),
        (c = r - s),
        (u = a - l),
        (d = c * a - u * r),
        d < -1e-5)
      )
        return !1
    return !0
  },
  ie = (t) => {
    const e = []
    for (let n = 0; n < t.length; n++) {
      let o = n + 1
      o === t.length && (o = 0), e.push(wt(G(t[n]), G(t[o])))
    }
    return e
  },
  re = (t, e, n, o = 0, i = !1, r = !1, a = 12) => {
    const s = []
    for (let o = 0; o < a; o++)
      s.push(
        j(t.x + e * Math.cos((o * (2 * Math.PI)) / a), t.y + n * Math.sin((o * (2 * Math.PI)) / a))
      )
    return (i || r) && lt(s, i, r, t.x, t.y), o && ct(s, o, t.x, t.y), s
  }
var ae = (t, e) => t instanceof HTMLElement && (!e || new RegExp(`^${e}$`, 'i').test(t.nodeName)),
  se = (t) => t instanceof File,
  le = (t) => t.split('/').pop().split(/\?|\#/).shift()
let ce = null
var ue = (t) =>
    new Promise((e, n) => {
      let o = !1
      !t.parentNode &&
        (null === ce && (ce = ce = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
        ce) &&
        ((o = !0),
        (t.style.cssText =
          'position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:0;height:0;'),
        document.body.appendChild(t))
      const i = () => {
        const n = t.naturalWidth,
          i = t.naturalHeight
        n && i && (o && t.parentNode.removeChild(t), clearInterval(r), e({ width: n, height: i }))
      }
      t.onerror = (t) => {
        clearInterval(r), n(t)
      }
      const r = setInterval(i, 1)
      i()
    }),
  de = async (t) => {
    let e,
      n = t
    n.src || ((n = new Image()), (n.src = w(t) ? t : URL.createObjectURL(t)))
    try {
      e = await ue(n)
    } catch (t) {
      throw t
    } finally {
      se(t) && URL.revokeObjectURL(n.src)
    }
    return e
  }
var pe = async (t) => {
    try {
      const e = await de(t),
        n = await ((t) =>
          new Promise((e, n) => {
            if (t.complete) return e(t)
            ;(t.onload = () => e(t)), (t.onerror = n)
          }))(t),
        o = document.createElement('canvas')
      ;(o.width = e.width), (o.height = e.height)
      o.getContext('2d').drawImage(n, 0, 0)
      const i = await E(o)
      return z(i, le(n.src))
    } catch (t) {
      throw t
    }
  },
  he = (t = 0, e = !0) =>
    new (o('ProgressEvent'))('progress', { loaded: 100 * t, total: 100, lengthComputable: e }),
  ge = (t) => /^image/.test(t.type),
  me = (t, e, n = (t) => t) =>
    t.getAllResponseHeaders().indexOf(e) >= 0 ? n(t.getResponseHeader(e)) : void 0,
  fe = (t) => {
    if (!t) return null
    const e = t
      .split(/filename=|filename\*=.+''/)
      .splice(1)
      .map((t) => t.trim().replace(/^["']|[;"']{0,2}$/g, ''))
      .filter((t) => t.length)
    return e.length ? decodeURI(e[e.length - 1]) : null
  }
const $e = 'URL_REQUEST'
class ye extends Error {
  constructor(t, e, n) {
    super(t), (this.name = 'EditorError'), (this.code = e), (this.metadata = n)
  }
}
var xe = (t, e) =>
    /^data:/.test(t)
      ? (async (t, e = 'data-uri', n = i) => {
          let o
          n(he(0))
          const r = await fetch(t)
          let a
          n(he(0.33)),
            (o = await r.blob()),
            ge(o) || (a = 'image/' + (t.includes(',/9j/') ? 'jpeg' : 'png')),
            n(he(0.66))
          const s = z(o, e, a)
          return n(he(1)), s
        })(t, void 0, e)
      : ((t, e) =>
          new Promise((n, o) => {
            const i = () => o(new ye('Error fetching image', $e, r)),
              r = new XMLHttpRequest()
            ;(r.onprogress = e),
              (r.onerror = i),
              (r.onload = () => {
                if (!r.response || r.status >= 300 || r.status < 200) return i()
                const e = me(r, 'Content-Type'),
                  o = me(r, 'Content-Disposition', fe) || le(t)
                n(z(r.response, o, e || B(o)))
              }),
              r.open('GET', t),
              (r.responseType = 'blob'),
              r.send()
          }))(t, e),
  be = async (t, e) => {
    if (se(t) || ((n = t) instanceof Blob && !(n instanceof File))) return t
    if (w(t)) return await xe(t, e)
    if (ae(t, 'canvas'))
      return await (async (t, e, n) => {
        const o = await E(t, e, n)
        return z(o, 'canvas')
      })(t)
    if (ae(t, 'img')) return await pe(t)
    throw new ye('Invalid image source', 'invalid-image-source')
    var n
  }
let ve = null
var we = () => (null === ve && (ve = c() && /^mac/i.test(navigator.platform)), ve),
  Se = (t) => (c() ? RegExp(t).test(window.navigator.userAgent) : void 0)
let ke = null
var Ce = () => (
    null === ke &&
      (ke = c() && (Se(/iPhone|iPad|iPod/) || (we() && navigator.maxTouchPoints >= 1))),
    ke
  ),
  Me = async (t, e = 1) => ((await d()) || Ce() || e < 5 ? t : mt(t.height, t.width)),
  Re = (t) => /jpeg/.test(t.type),
  Te = (t) => {
    return 'object' != typeof (e = t) || e.constructor != Object ? t : JSON.stringify(t)
    var e
  },
  Pe = (t, e = 0, n) => (
    0 === e || (t.translate(n.x, n.y), t.rotate(e), t.translate(-n.x, -n.y)), t
  ),
  Ee = async (t, e = {}) => {
    const { flipX: n, flipY: o, rotation: i, crop: r } = e,
      a = pt(t),
      s = n || o,
      l = !!i,
      c = r && (r.x || r.y || r.width || r.height),
      u = c && Wt(r, Pt(a)),
      d = c && !u
    if (!s && !l && !d) return t
    let p,
      g = h('canvas', { width: t.width, height: t.height })
    if ((g.getContext('2d').putImageData(t, 0, 0), s)) {
      const t = h('canvas', { width: g.width, height: g.height }).getContext('2d')
      ;((t, e, n) => {
        t.scale(e, n)
      })(t, n ? -1 : 1, o ? -1 : 1),
        t.drawImage(g, n ? -g.width : 0, o ? -g.height : 0),
        t.restore(),
        m(g),
        (g = t.canvas)
    }
    if (l) {
      const t = vt(ht(At(Ht(Et(g), i))), Math.floor),
        e = h('canvas', { width: r.width, height: r.height }).getContext('2d')
      ;((t, e, n) => {
        t.translate(e, n)
      })(e, -r.x, -r.y),
        Pe(e, i, yt(t)),
        e.drawImage(g, 0.5 * (t.width - g.width), 0.5 * (t.height - g.height)),
        e.restore(),
        m(g),
        (g = e.canvas)
    } else if (d) {
      return (p = g.getContext('2d').getImageData(r.x, r.y, r.width, r.height)), m(g), p
    }
    return (p = g.getContext('2d').getImageData(0, 0, g.width, g.height)), m(g), p
  },
  Ae = (t, e) => {
    const { imageData: n, width: o, height: i } = t,
      r = n.width,
      a = n.height,
      s = Math.round(o),
      l = Math.round(i),
      c = n.data,
      u = new Uint8ClampedArray(s * l * 4),
      d = r / s,
      p = a / l,
      h = Math.ceil(0.5 * d),
      g = Math.ceil(0.5 * p)
    for (let t = 0; t < l; t++)
      for (let e = 0; e < s; e++) {
        const n = 4 * (e + t * s)
        let o = 0,
          i = 0,
          a = 0,
          l = 0,
          m = 0,
          f = 0,
          $ = 0
        const y = (t + 0.5) * p
        for (let n = Math.floor(t * p); n < (t + 1) * p; n++) {
          const t = Math.abs(y - (n + 0.5)) / g,
            s = (e + 0.5) * d,
            u = t * t
          for (let t = Math.floor(e * d); t < (e + 1) * d; t++) {
            let e = Math.abs(s - (t + 0.5)) / h
            const d = Math.sqrt(u + e * e)
            if (d >= -1 && d <= 1 && ((o = 2 * d * d * d - 3 * d * d + 1), o > 0)) {
              e = 4 * (t + n * r)
              const s = c[e + 3]
              ;($ += o * s),
                (a += o),
                s < 255 && (o = (o * s) / 250),
                (l += o * c[e]),
                (m += o * c[e + 1]),
                (f += o * c[e + 2]),
                (i += o)
            }
          }
        }
        ;(u[n] = l / i), (u[n + 1] = m / i), (u[n + 2] = f / i), (u[n + 3] = $ / a)
      }
    e(null, { data: u, width: s, height: l })
  },
  Ie = (t) => {
    if (t instanceof ImageData) return t
    let e
    try {
      e = new ImageData(t.width, t.height)
    } catch (n) {
      e = h('canvas').getContext('2d').createImageData(t.width, t.height)
    }
    return e.data.set(t.data), e
  },
  Le = async (t, e = {}) => {
    const { width: n, height: o, fit: i, upscale: r } = e
    if (!n && !o) return t
    let a = n,
      s = o
    if ((n ? o || (s = n) : (a = o), 'force' !== i)) {
      let e = a / t.width,
        n = s / t.height,
        o = 1
      if (
        ('cover' === i ? (o = Math.max(e, n)) : 'contain' === i && (o = Math.min(e, n)),
        o > 1 && !1 === r)
      )
        return t
      ;(a = Math.round(t.width * o)), (s = Math.round(t.height * o))
    }
    return t.width === a && t.height === s
      ? t
      : ((t = await T(Ae, [{ imageData: t, width: a, height: s }], [t.data.buffer])), Ie(t))
  },
  Fe = (t, e) => {
    const { imageData: n, matrix: o } = t
    if (!o) return e(null, n)
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.data,
      a = r.length,
      s = o[0],
      l = o[1],
      c = o[2],
      u = o[3],
      d = o[4],
      p = o[5],
      h = o[6],
      g = o[7],
      m = o[8],
      f = o[9],
      $ = o[10],
      y = o[11],
      x = o[12],
      b = o[13],
      v = o[14],
      w = o[15],
      S = o[16],
      k = o[17],
      C = o[18],
      M = o[19]
    let R = 0,
      T = 0,
      P = 0,
      E = 0,
      A = 0,
      I = 0,
      L = 0,
      F = 0,
      B = 0,
      z = 0,
      D = 0,
      O = 0
    for (; R < a; R += 4)
      (T = r[R] / 255),
        (P = r[R + 1] / 255),
        (E = r[R + 2] / 255),
        (A = r[R + 3] / 255),
        (I = T * s + P * l + E * c + A * u + d),
        (L = T * p + P * h + E * g + A * m + f),
        (F = T * $ + P * y + E * x + A * b + v),
        (B = T * w + P * S + E * k + A * C + M),
        (z = Math.max(0, I * B) + (1 - B)),
        (D = Math.max(0, L * B) + (1 - B)),
        (O = Math.max(0, F * B) + (1 - B)),
        (i[R] = 255 * Math.max(0, Math.min(1, z))),
        (i[R + 1] = 255 * Math.max(0, Math.min(1, D))),
        (i[R + 2] = 255 * Math.max(0, Math.min(1, O))),
        (i[R + 3] = 255 * A)
    e(null, { data: i, width: n.width, height: n.height })
  },
  Be = (t, e) => {
    const { imageData: n, matrix: o } = t
    if (!o) return e(null, n)
    let i = o.reduce((t, e) => t + e)
    const r = n.width,
      a = n.height,
      s = n.data
    let l = 0,
      c = 0,
      u = 0
    const d = Math.round(Math.sqrt(o.length)),
      p = Math.floor(d / 2)
    let h = 0,
      g = 0,
      m = 0,
      f = 0,
      $ = 0,
      y = 0,
      x = 0,
      b = 0,
      v = 0,
      w = 0
    const S = new Uint8ClampedArray(r * a * 4)
    for (u = 0; u < a; u++)
      for (c = 0; c < r; c++) {
        for (h = 0, g = 0, m = 0, f = 0, y = 0; y < d; y++)
          for ($ = 0; $ < d; $++)
            (x = u + y - p),
              (b = c + $ - p),
              x < 0 ||
                x >= a ||
                b < 0 ||
                b >= r ||
                ((v = 4 * (x * r + b)),
                (w = o[y * d + $]),
                (h += s[v] * w),
                (g += s[v + 1] * w),
                (m += s[v + 2] * w),
                (f += s[v + 3] * w))
        ;(S[l] = h / i), (S[l + 1] = g / i), (S[l + 2] = m / i), (S[l + 3] = f / i), (l += 4)
      }
    e(null, { data: S, width: r, height: a })
  },
  ze = (t, e) => {
    let { imageData: n, strength: o } = t
    if (!o) return e(null, n)
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.width,
      a = n.height,
      s = n.data,
      l = (t, e) => ((c = t - w), (u = e - S), Math.sqrt(c * c + u * u))
    let c,
      u,
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      y,
      x,
      b = 0,
      v = 0,
      w = 0.5 * r,
      S = 0.5 * a,
      k = l(0, 0)
    for (
      o > 0 ? ((d = 0), (p = 0), (h = 0)) : ((o = Math.abs(o)), (d = 1), (p = 1), (h = 1)), v = 0;
      v < a;
      v++
    )
      for (b = 0; b < r; b++)
        (C = 4 * (b + v * r)),
          (M = s),
          (R = i),
          (T = (l(b, v) * o) / k),
          (g = M[C] / 255),
          (m = M[C + 1] / 255),
          (f = M[C + 2] / 255),
          ($ = M[C + 3] / 255),
          (y = 1 - T),
          (x = y * $ + T),
          (R[C] = ((y * $ * g + T * d) / x) * 255),
          (R[C + 1] = ((y * $ * m + T * p) / x) * 255),
          (R[C + 2] = ((y * $ * f + T * h) / x) * 255),
          (R[C + 3] = 255 * x)
    var C, M, R, T
    e(null, { data: i, width: n.width, height: n.height })
  },
  De = (t, e) => {
    const { imageData: n, level: o, monochrome: i = !1 } = t
    if (!o) return e(null, n)
    const r = new Uint8ClampedArray(n.width * n.height * 4),
      a = n.data,
      s = a.length
    let l,
      c,
      u,
      d = 0
    const p = () => 255 * (2 * Math.random() - 1) * o,
      h = i
        ? () => {
            const t = p()
            return [t, t, t]
          }
        : () => [p(), p(), p()]
    for (; d < s; d += 4)
      ([l, c, u] = h()),
        (r[d] = a[d] + l),
        (r[d + 1] = a[d + 1] + c),
        (r[d + 2] = a[d + 2] + u),
        (r[d + 3] = a[d + 3])
    e(null, { data: r, width: n.width, height: n.height })
  },
  Oe = (t, e) => {
    const { imageData: n, level: o } = t
    if (!o) return e(null, n)
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.data,
      a = r.length
    let s,
      l,
      c,
      u = 0
    for (; u < a; u += 4)
      (s = r[u] / 255),
        (l = r[u + 1] / 255),
        (c = r[u + 2] / 255),
        (i[u] = 255 * Math.pow(s, o)),
        (i[u + 1] = 255 * Math.pow(l, o)),
        (i[u + 2] = 255 * Math.pow(c, o)),
        (i[u + 3] = r[u + 3])
    e(null, { data: i, width: n.width, height: n.height })
  },
  _e = async (t, e = {}) => {
    const { colorMatrix: n, convolutionMatrix: o, gamma: i, noise: r, vignette: a } = e,
      s = []
    if (
      (o && s.push([Be, { matrix: o.clarity }]),
      i > 0 && s.push([Oe, { level: 1 / i }]),
      n &&
        !((t) => {
          const e = t.length
          let n,
            o = e >= 20 ? 6 : e >= 16 ? 5 : 3
          for (let i = 0; i < e; i++) {
            if (((n = t[i]), 1 === n && i % o != 0)) return !1
            if (0 !== n && 1 !== n) return !1
          }
          return !0
        })(n) &&
        s.push([Fe, { matrix: n }]),
      (r > 0 || r < 0) && s.push([De, { level: r }]),
      (a > 0 || a < 0) && s.push([ze, { strength: a }]),
      !s.length)
    )
      return t
    const l = (t, e) =>
        `(err, imageData) => {\n            (${t[
          e
        ][0].toString()})(Object.assign({ imageData: imageData }, filterInstructions[${e}]), \n                ${
          t[e + 1] ? l(t, e + 1) : 'done'
        })\n        }`,
      c = `function (options, done) {\n        const filterInstructions = options.filterInstructions;\n        const imageData = options.imageData;\n        (${l(
        s,
        0
      )})(null, imageData)\n    }`
    return (
      (t = await T(c, [{ imageData: t, filterInstructions: s.map((t) => t[1]) }], [t.data.buffer])),
      Ie(t)
    )
  },
  We = (t) => 'number' == typeof t,
  Ve = (t) =>
    w(t) &&
    null !==
      t.match(
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      ),
  Ne = (t, e) => t.hasOwnProperty(e),
  Ue = (t) => 'function' == typeof t,
  He = (t) => Array.isArray(t)
let Xe = 64,
  je = 102,
  Ye = 112,
  Ge = !1
var Ze = (t, e) => (
    !Ge &&
      c() &&
      (/^win/i.test(navigator.platform) && (je = 103),
      (Ce() || we()) && ((Xe = 63.5), (je = 110), (Ye = 123)),
      (Ge = !0)),
    `<svg${
      e ? ` aria-label="${e}"` : ''
    } width="128" height="128" viewBox="0 0 128 128" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg"><text x="${Xe}" y="${je}" alignment-baseline="text-top" dominant-baseline="text-top" text-anchor="middle" font-size="${Ye}px">${t}</text></svg>`
  ),
  qe = (t, e) => (t / e) * 100 + '%',
  Ke = (t, e) =>
    new Promise((n, o) => {
      let i = t,
        r = !1
      const a = () => {
        r ||
          ((r = !0), Ue(e) && Promise.resolve().then(() => e(mt(i.naturalWidth, i.naturalHeight))))
      }
      if (
        (i.src ||
          ((i = new Image()),
          w(t) &&
            new URL(t, location.href).origin !== location.origin &&
            (i.crossOrigin = 'anonymous'),
          (i.src = w(t) ? t : URL.createObjectURL(t))),
        i.complete)
      )
        return a(), n(i)
      Ue(e) && ue(i).then(a).catch(o),
        (i.onload = () => {
          a(), n(i)
        }),
        (i.onerror = o)
    }),
  Qe = (t) =>
    `rgba(${Math.round(255 * t[0])}, ${Math.round(255 * t[1])}, ${Math.round(255 * t[2])}, ${
      We(t[3]) ? t[3] : 1
    })`
let Je = void 0
const tn = (t = 1, e = 1) => {
    const n = h('canvas').getContext('2d')
    return (n.canvas.width = t), (n.canvas.height = e), n
  },
  en = (t, e) => {
    const {
      fontSize: n = 16,
      fontFamily: o = 'sans-serif',
      fontWeight: i = 'normal',
      fontVariant: r = 'normal',
      fontStyle: a = 'normal',
      textAlign: s = 'left',
      color: l = '#000',
    } = e
    ;(t.font = `${a} ${r} ${i} ${n}px ${o}`),
      (t.textBaseline = 'top'),
      (t.textAlign = s),
      (t.fillStyle = Array.isArray(l) ? Qe(l) : l)
  },
  nn = (t, e) => (Ue(e) ? e(t) : e),
  on = (t, e, n) => {
    const o = t.textAlign
    t.textAlign = 'left'
    const i = e.split('\n'),
      r = i.reduce((e, n) => {
        const o =
          ((i = t.measureText(n)),
          Math.abs(i.actualBoundingBoxLeft) + Math.abs(i.actualBoundingBoxRight))
        var i
        return o > e && (e = o), e
      }, 1)
    t.textAlign = o
    const a = n * i.length
    return mt(Math.ceil(r), Math.ceil(a))
  },
  rn = new Map(),
  an = (t, e) => {
    const n = ((t) => {
      const e = tn()
      return en(e, t), e
    })(e)
    e.width && (t = sn(n, t, e.width))
    const o = ((
      t,
      { fontSize: e, fontFamily: n, lineHeight: o, fontWeight: i, fontStyle: r, fontVariant: a }
    ) => `${[t, e, i, r, a, n].join('_')}_${Ue(o) ? o(e) : o}`)(t, e)
    let i = rn.get(o)
    return i || ((i = on(n, t, nn(e.fontSize, e.lineHeight))), rn.set(o, i)), { ...i }
  },
  sn = (t, e, n) => {
    if (0 === e.length) return ''
    const o = []
    let i,
      r = '',
      a = 0
    const s = e.split('\n\n'),
      l = () => {
        r.length && (o[a] || (o[a] = []), o[a].push(r), (r = ''))
      },
      c = (e) => {
        const o = r + e
        ;(i = t.measureText(o).width),
          i < n ? (r = o) : (r.length ? (l(), (r = e)) : ((r = o), l()), a++)
      },
      u = (e) => {
        const o = r.length ? r + ' ' + e : e
        ;(i = t.measureText(o).width),
          i < n ? (r = o) : r.length ? (l(), a++, u(e)) : e.split('').forEach(c)
      }
    return (
      s.forEach((t) => {
        t.split('\n').forEach((t) => {
          t.split(' ').forEach(u), r.length && l(), a++
        }),
          a++
      }),
      o.map((t) => t.join(' ')).join('\n')
    )
  },
  ln = (t, e = '', n = {}) => {
    if (0 === e.length) return t
    const { x: o = 0, y: i = 0, lineWidth: r = 0, textAlign: a, fontSize: s, lineHeight: l } = n,
      c = et(
        ((t) => {
          if (!Je) {
            const t = 32,
              e = tn(t, t)
            en(e, { fontSize: 100, color: '#fff' }), e.fillText('F', 0, 0)
            const n = e.getImageData(0, 0, t, t).data
            let o = 0,
              i = 4,
              r = n.length,
              a = r - 4 * t
            for (o = a; o < r && !n[o]; o += i);
            const s = (o - a) / i
            for (a = 4 * (t - 1), i = 4 * t, o = a; o < r && !n[o]; o += i);
            ;(Je = j(s, (o - a) / i)), m(e.canvas)
          }
          return j(-Je.x * t * 0.01, -Je.y * t * 0.01)
        })(s),
        j(s / 12, s / 3.75)
      ),
      u = o + c.x,
      d = i + c.y,
      p = Ue(l) ? l(s) : l
    let h = 'right' === a ? r : 'center' === a ? 0.5 * r : 0
    return (
      e.split('\n').forEach((e, n) => {
        t.fillText(e, u + h, d + n * p)
      }),
      t
    )
  },
  cn = (t, e) => {
    if (Sn(t)) return t
    const n = t.width / t.height,
      o = Gt(e, n)
    return (
      (t.width > o.width || t.height > o.height) && ((t.width = o.width), (t.height = o.height)), t
    )
  },
  un = (t, e) =>
    Sn(t)
      ? ((t.x = e.x), (t.y = e.y), t)
      : ((t.x = e.x - 0.5 * t.width), (t.y = e.y - 0.5 * t.height), t),
  dn = (t) => {
    const e = { ...t }
    e.backgroundImageElement = void 0
    const n = v(e)
    return t.backgroundImageElement && (n.backgroundImageElement = t.backgroundImageElement), n
  },
  pn = (t, e = {}) => {
    const n = Vt(t)
    let o, i
    const r = e.width || e.rx,
      a = e.height || e.ry
    if (r && a) return dt(e)
    if (r || a) {
      ;(o = parseFloat(r || Number.MAX_SAFE_INTEGER)),
        (i = parseFloat(a || Number.MAX_SAFE_INTEGER))
      const t = Math.min(o, i)
      w(r) || w(a) ? ((o = t + '%'), (i = t * n + '%')) : ((o = t), (i = t))
    } else {
      const t = 10
      ;(o = t + '%'), (i = t * n + '%')
    }
    return {
      [e.width ? 'width' : e.rx ? 'rx' : void 0]: o,
      [e.width ? 'height' : e.rx ? 'ry' : void 0]: i,
    }
  },
  hn = (t, e = {}) => {
    return {
      width: void 0,
      height: void 0,
      ...e,
      aspectRatio: 1,
      backgroundImage:
        ((n = Ze(t)), 'data:image/svg+xml,' + n.replace('<', '%3C').replace('>', '%3E')),
    }
    var n
  },
  gn = (t, e, n = {}) => {
    const o = {
      backgroundColor: [0, 0, 0, 0],
      ...(Sn(n) ? {} : { width: void 0, height: void 0, aspectRatio: void 0 }),
      ...n,
      backgroundImage: w(t) ? t : URL.createObjectURL(t),
    }
    return mn(o, e)
  },
  mn = (t, e = i) => {
    if (t.backgroundImage) {
      if (/canvas/.test(t.backgroundImage.nodeName))
        return (t.isComplete = !0), (t.isError = !1), (t.isLoading = !1), e(t.isError, t), t
      if (t.isComplete) return e(t.isError, t), t
      if (t.isLoading) return t
      ;(t.isComplete = !1), (t.isError = !1), (t.isLoading = !0)
      const n = (e) => {
        if (t.backgroundSize || Sn(t)) return
        const n = e.width / e.height,
          o = t.width || e.width,
          i = o / n
        ;(t.width = o), (t.height = i), (t.aspectRatio = e.width / e.height)
      }
      Ke(t.backgroundImage, n)
        .then((e) => {
          t.backgroundImageElement = e
        })
        .catch((e) => {
          t.isError = e
        })
        .finally(() => {
          ;(t.isLoading = !1), (t.isComplete = !0), e(t.isError, t)
        })
    }
    return t
  },
  fn = (t, e, n) => {
    let o
    if (w(t) || t instanceof Blob)
      Ve(t) ? ((o = hn(t, pn(e))), setTimeout(() => n(void 0, o), 0)) : (o = gn(t, n, { ...pn(e) }))
    else if (t.src) {
      const i = { ...t.shape, ...pn(e, t.shape || t) }
      Ve(t.src) ? ((o = hn(t.src, i)), setTimeout(() => n(void 0, o), 0)) : (o = gn(t.src, n, i))
    } else t.shape && (o = dn(t.shape))
    return (
      Ne(o, 'backgroundImage') &&
        (Ne(o, 'backgroundColor') || (o.backgroundColor = [0, 0, 0, 0]),
        Ne(o, 'disableStyle') || (o.disableStyle = !0),
        Ne(o, 'disableFlip') || (o.disableFlip = !0)),
      e ? Jn(o, e) : o
    )
  },
  $n = (t) => j(t.x1, t.y1),
  yn = (t) => j(t.x2, t.y2),
  xn = (t) => Ne(t, 'text'),
  bn = (t) => xn(t) && !(Ln(t) || Ne(t, 'width')),
  vn = (t) => xn(t) && (Ln(t) || Ne(t, 'width')),
  wn = (t) => !xn(t) && Fn(t),
  Sn = (t) => Ne(t, 'rx'),
  kn = (t) => Ne(t, 'x1') && !Cn(t),
  Cn = (t) => Ne(t, 'x3'),
  Mn = (t) => Ne(t, 'points'),
  Rn = (t) => xn(t) && t.isEditing,
  Tn = (t) => !Ne(t, 'opacity') || t.opacity > 0,
  Pn = (t) => t.isSelected,
  En = (t) => t.isDraft,
  An = (t) => Ne(t, 'width') && Ne(t, 'height'),
  In = (t) => {
    const e = Ne(t, 'right'),
      n = Ne(t, 'bottom')
    return e || n
  },
  Ln = (t) =>
    ((Ne(t, 'x') || Ne(t, 'left')) && Ne(t, 'right')) ||
    ((Ne(t, 'y') || Ne(t, 'top')) && Ne(t, 'bottom')),
  Fn = (t) => An(t) || Ln(t),
  Bn = (t, e) => !0 !== t.disableStyle && (!He(t.disableStyle) || !t.disableStyle.includes(e)),
  zn = (t) => !0 !== t.disableErase,
  Dn = (t) => !0 !== t.disableSelect && !Mn(t) && !Cn(t),
  On = (t) => !0 !== t.disableRemove,
  _n = (t) =>
    !t.disableFlip && !En(t) && !In(t) && ((t) => Ne(t, 'backgroundImage') || Ne(t, 'text'))(t),
  Wn = (t, e) =>
    !!xn(t) &&
    !0 !== t.disableInput &&
    (Ue(t.disableInput) ? t.disableInput(null != e ? e : t.text) : e || !0),
  Vn = (t) => !0 !== t.disableMove && !En(t) && !Mn(t) && !In(t),
  Nn = (t) => (delete t.left, delete t.right, delete t.top, delete t.bottom, t),
  Un = (t) => (delete t.rotation, t),
  Hn = (t) => (
    (t.strokeWidth = t.strokeWidth || 1), (t.strokeColor = t.strokeColor || [0, 0, 0]), t
  ),
  Xn = (t) => (
    (t.backgroundColor = t.backgroundColor
      ? t.backgroundColor
      : t.strokeWidth || t.backgroundImage
      ? void 0
      : [0, 0, 0]),
    t
  ),
  jn = (t) => 1.2 * t,
  Yn = (t) => (delete t.textAlign, Nn(t)),
  Gn = (t) => ((t.textAlign = t.textAlign || 'left'), t),
  Zn = (t) => (
    ((t) => {
      w(t.id) || (t.id = M()),
        Ne(t, 'rotation') || (t.rotation = 0),
        Ne(t, 'opacity') || (t.opacity = 1),
        Ne(t, 'disableErase') || (t.disableErase = !0)
    })(t),
    xn(t)
      ? ((t) => {
          ;(t.fontSize = t.fontSize || 16),
            (t.fontFamily = t.fontFamily || 'sans-serif'),
            (t.fontWeight = t.fontWeight || 'normal'),
            (t.fontStyle = t.fontStyle || 'normal'),
            (t.fontVariant = t.fontVariant || 'normal'),
            (t.lineHeight = We(t.lineHeight) ? t.lineHeight : jn),
            (t.color = t.color || [0, 0, 0]),
            bn(t) ? Yn(t) : Gn(t)
        })(t)
      : wn(t)
      ? ((t) => {
          ;(t.cornerRadius = t.cornerRadius || 0),
            (t.strokeWidth = t.strokeWidth || 0),
            (t.strokeColor = t.strokeColor || [0, 0, 0]),
            Xn(t)
        })(t)
      : Mn(t)
      ? ((t) => {
          Hn(t), Un(t), Nn(t)
        })(t)
      : kn(t)
      ? ((t) => {
          Hn(t),
            (t.lineStart = t.lineStart || void 0),
            (t.lineEnd = t.lineEnd || void 0),
            Un(t),
            Nn(t)
        })(t)
      : Sn(t)
      ? ((t) => {
          ;(t.strokeWidth = t.strokeWidth || 0), (t.strokeColor = t.strokeColor || [0, 0, 0]), Xn(t)
        })(t)
      : Cn(t) &&
        ((t) => {
          ;(t.strokeWidth = t.strokeWidth || 0),
            (t.strokeColor = t.strokeColor || [0, 0, 0]),
            Xn(t),
            Nn(t)
        })(t),
    mn(t),
    t
  ),
  qn = (t) =>
    xn(t)
      ? 'text'
      : wn(t)
      ? 'rectangle'
      : Mn(t)
      ? 'path'
      : kn(t)
      ? 'line'
      : Sn(t)
      ? 'ellipse'
      : Cn(t)
      ? 'triangle'
      : void 0,
  Kn = (t, e) => (parseFloat(t) / 100) * e,
  Qn = [
    'width',
    'height',
    'left',
    'top',
    'right',
    'bottom',
    'x',
    'y',
    'rx',
    'ry',
    'points',
    'fontSize',
    'strokeWidth',
    'lineHeight',
    'x1',
    'y1',
    'x2',
    'y2',
    'x3',
    'y3',
  ],
  Jn = (t, e) => (
    Qn.forEach((n) =>
      ((t, e, { width: n, height: o }) => {
        if (!Ne(t, e)) return
        let i = t[e]
        if (/points/.test(e)) {
          const i = t[e]
          if (!w(i[0].x)) return
          t[e] = i.map((t) => j(Kn(t.x, n), Kn(t.y, o)))
        } else if (w(i)) {
          const r = parseFloat(i) / 100
          ;/^x|left|width|rx|fontSize|cornerRadius|strokeWidth/.test(e)
            ? (t[e] = n * r)
            : /^right/.test(e)
            ? (t[e] = n - n * r)
            : /^y|top|height|ry/.test(e)
            ? (t[e] = o * r)
            : /^bottom/.test(e) && (t[e] = o - o * r)
        }
      })(t, n, e)
    ),
    oo(t, e),
    t
  ),
  to = (t, e) => {
    let n
    return (
      /^x|width|rx|fontSize|strokeWidth|cornerRadius/.test(t)
        ? (n = e.width)
        : /^y|height|ry/.test(t) && (n = e.height),
      n
    )
  },
  eo = (t, e, n) =>
    e.reduce((e, o) => {
      const i = ((t, e, n) => (w(t[e]) ? Kn(t[e], to(e, n)) : t[e]))(t, o, n)
      return (e[o] = i), e
    }, {}),
  no = (t, e, n) => (
    Object.keys(e).forEach((o) =>
      ((t, e, n, o) => {
        if (!w(t[e])) return (t[e] = n)
        let i = to(e, o)
        return (t[e] = qe(n, i)), t
      })(t, o, e[o], n)
    ),
    t
  ),
  oo = (t, e) => {
    if ((Ne(t, 'left') && (t.x = t.left), Ne(t, 'right'))) {
      const n = e.width - t.right
      Ne(t, 'left')
        ? ((t.x = t.left), (t.width = Math.max(0, n - t.left)))
        : Ne(t, 'width') && (t.x = n - t.width)
    }
    if ((Ne(t, 'top') && (t.y = t.top), Ne(t, 'bottom'))) {
      const n = e.height - t.bottom
      Ne(t, 'top')
        ? ((t.y = t.top), (t.height = Math.max(0, n - t.top)))
        : Ne(t, 'height') && (t.y = n - t.height)
    }
    return t
  },
  io = (t, e, n) => (
    Mn(t) &&
      t.points
        .filter((t) => We(t.x))
        .forEach((t) => {
          ;(t.x *= n), (t.y *= n), (t.x += e.x), (t.y += e.y)
        }),
    Cn(t) &&
      We(t.x1) &&
      ((t.x1 *= n),
      (t.y1 *= n),
      (t.x2 *= n),
      (t.y2 *= n),
      (t.x3 *= n),
      (t.y3 *= n),
      (t.x1 += e.x),
      (t.y1 += e.y),
      (t.x2 += e.x),
      (t.y2 += e.y),
      (t.x3 += e.x),
      (t.y3 += e.y)),
    kn(t) &&
      We(t.x1) &&
      ((t.x1 *= n),
      (t.y1 *= n),
      (t.x2 *= n),
      (t.y2 *= n),
      (t.x1 += e.x),
      (t.y1 += e.y),
      (t.x2 += e.x),
      (t.y2 += e.y)),
    We(t.x) && We(t.y) && ((t.x *= n), (t.y *= n), (t.x += e.x), (t.y += e.y)),
    We(t.width) && We(t.height) && ((t.width *= n), (t.height *= n)),
    We(t.rx) && We(t.ry) && ((t.rx *= n), (t.ry *= n)),
    ((t) => We(t.strokeWidth) && t.strokeWidth > 0)(t) && (t.strokeWidth *= n),
    xn(t) && We(t.fontSize) && ((t.fontSize *= n), We(t.width) && !We(t.width) && (t.width *= n)),
    Ne(t, 'cornerRadius') && We(t.cornerRadius) && (t.cornerRadius *= n),
    t
  ),
  ro = (t, e, n, o, i) => {
    let r = {}
    const a = /solid/.test(o),
      s = 5 * e,
      l = a ? s : s - 1,
      c = a ? 0.5 * l : Math.ceil(0.5 * l),
      u = Q(i),
      d = ot(G(u), c),
      p = G(t),
      h = G(t)
    if (/arrow/.test(o)) {
      let o = t.x,
        i = t.y
      const l = ot(G(u), s),
        p = j(o + l.x, i + l.y)
      if ((ot(l, 0.55), a)) {
        const t = ot(G(u), 0.5 * c)
        ;(o -= t.x),
          (i -= t.y),
          (r = {
            points: [j(o, i), j(p.x - l.y, p.y + l.x), j(p.x + l.y, p.y - l.x)],
            backgroundColor: n,
          }),
          (h.x += d.x),
          (h.y += d.y)
      } else {
        const t = ot(
            ((t) => {
              const e = t.x
              return (t.x = -t.y), (t.y = e), t
            })(G(u)),
            0.5
          ),
          a = j(o - t.x, i - t.y),
          s = j(o + t.x, i + t.y)
        r = {
          points: [j(p.x + l.y, p.y - l.x), a, j(o, i), s, j(p.x - l.y, p.y + l.x)],
          strokeWidth: e,
          strokeColor: n,
        }
      }
    } else
      /circle/.test(o)
        ? ((h.x += d.x),
          (h.y += d.y),
          (r = {
            x: p.x,
            y: p.y,
            rx: c,
            ry: c,
            backgroundColor: a ? n : void 0,
            strokeWidth: a ? void 0 : e,
            strokeColor: a ? void 0 : n,
          }))
        : /square/.test(o)
        ? ((h.x += d.x),
          (h.y += d.y),
          (r = {
            x: p.x - c,
            y: p.y - c,
            width: 2 * c,
            height: 2 * c,
            rotation: ((g = u), Math.atan2(g.y, g.x)),
            backgroundColor: a ? n : void 0,
            strokeWidth: a ? void 0 : e,
            strokeColor: a ? void 0 : n,
          }))
        : 'bar' === o &&
          (r = {
            points: [j(p.x - d.y, p.y + d.x), j(p.x + d.y, p.y - d.x)],
            strokeWidth: e,
            strokeColor: n,
          })
    var g
    return { position: h, shape: r }
  }
const ao = (t, e, n, o) => t.drawImage(e, n.x, n.x, n.width, n.height, o.x, o.y, o.width, o.height)
var so = async (t, e, n, o, i = ao) => {
  t.save(), t.clip(), await i(t, e, n, o), t.restore()
}
const lo = (t, e, n) => {
    let o = Ft(0, 0, n.width, n.height)
    const i = Rt(t)
    if ('contain' === e) {
      const e = Gt(t, Vt(o))
      ;(i.width = e.width), (i.height = e.height), (i.x += e.x), (i.y += e.y)
    } else 'cover' === e && (o = Gt(Ft(0, 0, o.width, o.height), Vt(i)))
    return { srcRect: o, destRect: i }
  },
  co = (t, e) => (
    e.cornerRadius > 0
      ? ((t, e, n, o, i, r) => {
          o < 2 * r && (r = o / 2),
            i < 2 * r && (r = i / 2),
            t.beginPath(),
            t.moveTo(e + r, n),
            t.arcTo(e + o, n, e + o, n + i, r),
            t.arcTo(e + o, n + i, e, n + i, r),
            t.arcTo(e, n + i, e, n, r),
            t.arcTo(e, n, e + o, n, r),
            t.closePath()
        })(t, e.x, e.y, e.width, e.height, e.cornerRadius)
      : t.rect(e.x, e.y, e.width, e.height),
    t
  ),
  uo = (t, e) => (e.backgroundColor && t.fill(), t),
  po = (t, e) => (e.strokeWidth && t.stroke(), t)
var ho = async (t, e, n = {}) =>
    new Promise((o, i) => {
      const { drawImage: r } = n
      ;(t.lineWidth = e.strokeWidth ? e.strokeWidth : 1),
        (t.strokeStyle = e.strokeColor ? Qe(e.strokeColor) : 'none'),
        (t.fillStyle = e.backgroundColor ? Qe(e.backgroundColor) : 'none'),
        (t.globalAlpha = e.opacity),
        e.backgroundImage
          ? mn(e, async (e, n) => {
              if (e) return i(e)
              const { srcRect: a, destRect: s } = lo(
                n,
                n.backgroundSize,
                gt(n.backgroundImageElement)
              )
              co(t, n), uo(t, n), await so(t, n.backgroundImageElement, a, s, r), po(t, n), o([])
            })
          : (co(t, e), uo(t, e), po(t, e), o([]))
    }),
  go = async (t, e, n = {}) =>
    new Promise((o, i) => {
      const { drawImage: r } = n
      ;(t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? Qe(e.strokeColor) : 'none'),
        (t.fillStyle = e.backgroundColor ? Qe(e.backgroundColor) : 'none'),
        (t.globalAlpha = e.opacity),
        t.ellipse(e.x, e.y, e.rx, e.ry, 0, 0, 2 * Math.PI),
        e.backgroundColor && t.fill(),
        e.backgroundImage
          ? mn(e, async (n, a) => {
              if (n) return i(n)
              const s = Ft(e.x - e.rx, e.y - e.ry, 2 * e.rx, 2 * e.ry),
                { srcRect: l, destRect: c } = lo(s, e.backgroundSize, gt(e.backgroundImageElement))
              await so(t, a.backgroundImageElement, l, c, r), e.strokeWidth && t.stroke(), o([])
            })
          : (e.strokeWidth && t.stroke(), o([]))
    }),
  mo = async (t, e, n) => {
    const o = e.width && e.height ? pt(e) : an(e.text, e),
      i = { x: e.x, y: e.y, width: e.width || o.width, height: o.height }
    ho(t, { ...e, ...i, options: n }), en(t, e)
    let r = 0
    return (
      'center' == e.textAlign ? (r = -10) : 'right' === e.textAlign && (r = -20),
      t.rect(e.x + r, e.y, e.width + 40, e.height),
      t.save(),
      t.clip(),
      ln(t, e.width ? sn(t, e.text, e.width) : e.text, {
        x: e.x,
        y: e.y,
        fontSize: e.fontSize,
        textAlign: e.textAlign,
        lineHeight: e.lineHeight,
        lineWidth: e.width,
      }),
      t.restore(),
      []
    )
  }
const fo = (t) => {
  if (t && 'none' !== t) return t
}
var $o = async (t, e) =>
    new Promise(async (n, o) => {
      ;(t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? Qe(e.strokeColor) : 'none'),
        (t.globalAlpha = e.opacity)
      let i = fo(e.lineStart),
        r = fo(e.lineEnd),
        a = $n(e),
        s = yn(e)
      const l = i && ro(a, e.strokeWidth, e.strokeColor, i, j(s.x - a.x, s.y - a.y)),
        c = r && ro(s, e.strokeWidth, e.strokeColor, r, j(a.x - s.x, a.y - s.y))
      ;(a = l ? l.position : a),
        (s = c ? c.position : s),
        t.moveTo(a.x, a.y),
        t.lineTo(s.x, s.y),
        e.strokeWidth && t.stroke(),
        n([l && l.shape, c && c.shape].filter(Boolean))
    }),
  yo = async (t, e) =>
    new Promise((n, o) => {
      ;(t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? Qe(e.strokeColor) : 'none'),
        (t.fillStyle = e.backgroundColor ? Qe(e.backgroundColor) : 'none'),
        (t.globalAlpha = e.opacity)
      const { points: i } = e
      t.moveTo(i[0].x, i[0].y)
      const r = i.length
      for (let e = 1; e < r; e++) t.lineTo(i[e].x, i[e].y)
      e.strokeWidth && t.stroke(), e.backgroundColor && t.fill(), n([])
    })
const xo = async (t, e, n) => {
  const o = ((t) => {
    if (wn(t)) return j(t.x + 0.5 * t.width, t.y + 0.5 * t.height)
    if (Sn(t)) return j(t.x, t.y)
    if (vn(t)) {
      const e = t.height || an(t.text, t).height
      return j(t.x + 0.5 * t.width, t.y + 0.5 * e)
    }
    if (bn(t)) {
      const e = an(t.text, t)
      return j(t.x + 0.5 * e.width, t.y + 0.5 * e.height)
    }
    return Mn(t) ? st(t.points) : kn(t) ? st([$n(t), yn(t)]) : void 0
  })(e)
  let i
  return (
    Pe(t, e.rotation, o),
    ((t, e, n, o) => {
      ;(e || n) && (t.translate(o.x, o.y), t.scale(e ? -1 : 1, n ? -1 : 1), t.translate(-o.x, -o.y))
    })(t, e.flipX, e.flipY, o),
    wn(e) ? (i = ho) : Sn(e) ? (i = go) : kn(e) ? (i = $o) : Mn(e) ? (i = yo) : xn(e) && (i = mo),
    i ? [e, ...(await bo(t, await i(t, e, n), n))] : []
  )
}
var bo = async (t, e, n) => {
    let o = []
    for (const i of e) t.save(), t.beginPath(), (o = [...o, ...(await xo(t, i, n))]), t.restore()
    return o
  },
  vo = async (t, e = {}) => {
    const { shapes: n = [], context: o = t, transform: r = i, drawImage: a } = e
    if (!n.length) return t
    let s
    const l = h('canvas')
    ;(l.width = t.width), (l.height = t.height)
    const c = l.getContext('2d')
    c.putImageData(t, 0, 0)
    const u = n.map(dn).map((t) => Jn(t, { x: 0, y: 0, width: o.width, height: o.height }))
    return (
      r(c), await bo(c, u, { drawImage: a }), (s = c.getImageData(0, 0, l.width, l.height)), m(l), s
    )
  },
  wo = async (t, e = {}) => {
    const { backgroundColor: n } = e
    if (!n || (n && 0 === n[3])) return t
    let o,
      i = h('canvas')
    ;(i.width = t.width), (i.height = t.height)
    const r = i.getContext('2d')
    return (
      r.putImageData(t, 0, 0),
      (r.globalCompositeOperation = 'destination-over'),
      (r.fillStyle = Qe(n)),
      r.fillRect(0, 0, i.width, i.height),
      (o = r.getImageData(0, 0, i.width, i.height)),
      m(i),
      o
    )
  },
  So = (t) =>
    t.length
      ? t.reduce(
          (t, e) =>
            ((t, e) => {
              const n = new Array(20)
              return (
                (n[0] = t[0] * e[0] + t[1] * e[5] + t[2] * e[10] + t[3] * e[15]),
                (n[1] = t[0] * e[1] + t[1] * e[6] + t[2] * e[11] + t[3] * e[16]),
                (n[2] = t[0] * e[2] + t[1] * e[7] + t[2] * e[12] + t[3] * e[17]),
                (n[3] = t[0] * e[3] + t[1] * e[8] + t[2] * e[13] + t[3] * e[18]),
                (n[4] = t[0] * e[4] + t[1] * e[9] + t[2] * e[14] + t[3] * e[19] + t[4]),
                (n[5] = t[5] * e[0] + t[6] * e[5] + t[7] * e[10] + t[8] * e[15]),
                (n[6] = t[5] * e[1] + t[6] * e[6] + t[7] * e[11] + t[8] * e[16]),
                (n[7] = t[5] * e[2] + t[6] * e[7] + t[7] * e[12] + t[8] * e[17]),
                (n[8] = t[5] * e[3] + t[6] * e[8] + t[7] * e[13] + t[8] * e[18]),
                (n[9] = t[5] * e[4] + t[6] * e[9] + t[7] * e[14] + t[8] * e[19] + t[9]),
                (n[10] = t[10] * e[0] + t[11] * e[5] + t[12] * e[10] + t[13] * e[15]),
                (n[11] = t[10] * e[1] + t[11] * e[6] + t[12] * e[11] + t[13] * e[16]),
                (n[12] = t[10] * e[2] + t[11] * e[7] + t[12] * e[12] + t[13] * e[17]),
                (n[13] = t[10] * e[3] + t[11] * e[8] + t[12] * e[13] + t[13] * e[18]),
                (n[14] = t[10] * e[4] + t[11] * e[9] + t[12] * e[14] + t[13] * e[19] + t[14]),
                (n[15] = t[15] * e[0] + t[16] * e[5] + t[17] * e[10] + t[18] * e[15]),
                (n[16] = t[15] * e[1] + t[16] * e[6] + t[17] * e[11] + t[18] * e[16]),
                (n[17] = t[15] * e[2] + t[16] * e[7] + t[17] * e[12] + t[18] * e[17]),
                (n[18] = t[15] * e[3] + t[16] * e[8] + t[17] * e[13] + t[18] * e[18]),
                (n[19] = t[15] * e[4] + t[16] * e[9] + t[17] * e[14] + t[18] * e[19] + t[19]),
                n
              )
            })([...t], e),
          t.shift()
        )
      : []
function ko() {}
const Co = (t) => t
function Mo(t, e) {
  for (const n in e) t[n] = e[n]
  return t
}
function Ro(t) {
  return t()
}
function To() {
  return Object.create(null)
}
function Po(t) {
  t.forEach(Ro)
}
function Eo(t) {
  return 'function' == typeof t
}
function Ao(t, e) {
  return t != t ? e == e : t !== e || (t && 'object' == typeof t) || 'function' == typeof t
}
function Io(t, ...e) {
  if (null == t) return ko
  const n = t.subscribe(...e)
  return n.unsubscribe ? () => n.unsubscribe() : n
}
function Lo(t) {
  let e
  return Io(t, (t) => (e = t))(), e
}
function Fo(t, e, n) {
  t.$$.on_destroy.push(Io(e, n))
}
function Bo(t, e, n, o) {
  if (t) {
    const i = zo(t, e, n, o)
    return t[0](i)
  }
}
function zo(t, e, n, o) {
  return t[1] && o ? Mo(n.ctx.slice(), t[1](o(e))) : n.ctx
}
function Do(t, e, n, o, i, r, a) {
  const s = (function (t, e, n, o) {
    if (t[2] && o) {
      const i = t[2](o(n))
      if (void 0 === e.dirty) return i
      if ('object' == typeof i) {
        const t = [],
          n = Math.max(e.dirty.length, i.length)
        for (let o = 0; o < n; o += 1) t[o] = e.dirty[o] | i[o]
        return t
      }
      return e.dirty | i
    }
    return e.dirty
  })(e, o, i, r)
  if (s) {
    const i = zo(e, n, o, a)
    t.p(i, s)
  }
}
function Oo(t) {
  const e = {}
  for (const n in t) '$' !== n[0] && (e[n] = t[n])
  return e
}
function _o(t, e, n = e) {
  return t.set(n), e
}
function Wo(t) {
  return t && Eo(t.destroy) ? t.destroy : ko
}
const Vo = 'undefined' != typeof window
let No = Vo ? () => window.performance.now() : () => Date.now(),
  Uo = Vo ? (t) => requestAnimationFrame(t) : ko
const Ho = new Set()
function Xo(t) {
  Ho.forEach((e) => {
    e.c(t) || (Ho.delete(e), e.f())
  }),
    0 !== Ho.size && Uo(Xo)
}
function jo(t) {
  let e
  return (
    0 === Ho.size && Uo(Xo),
    {
      promise: new Promise((n) => {
        Ho.add((e = { c: t, f: n }))
      }),
      abort() {
        Ho.delete(e)
      },
    }
  )
}
function Yo(t, e) {
  t.appendChild(e)
}
function Go(t, e, n) {
  t.insertBefore(e, n || null)
}
function Zo(t) {
  t.parentNode.removeChild(t)
}
function qo(t) {
  return document.createElement(t)
}
function Ko(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t)
}
function Qo(t) {
  return document.createTextNode(t)
}
function Jo() {
  return Qo(' ')
}
function ti() {
  return Qo('')
}
function ei(t, e, n, o) {
  return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o)
}
function ni(t) {
  return function (e) {
    return e.preventDefault(), t.call(this, e)
  }
}
function oi(t) {
  return function (e) {
    return e.stopPropagation(), t.call(this, e)
  }
}
function ii(t, e, n) {
  null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
}
function ri(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__)
  for (const o in e)
    null == e[o]
      ? t.removeAttribute(o)
      : 'style' === o
      ? (t.style.cssText = e[o])
      : '__value' === o
      ? (t.value = t[o] = e[o])
      : n[o] && n[o].set
      ? (t[o] = e[o])
      : ii(t, o, e[o])
}
function ai(t, e) {
  ;(e = '' + e), t.wholeText !== e && (t.data = e)
}
function si(t, e) {
  t.value = null == e ? '' : e
}
function li(t, e) {
  const n = document.createEvent('CustomEvent')
  return n.initCustomEvent(t, !1, !1, e), n
}
const ci = new Set()
let ui,
  di = 0
function pi(t, e, n, o, i, r, a, s = 0) {
  const l = 16.666 / o
  let c = '{\n'
  for (let t = 0; t <= 1; t += l) {
    const o = e + (n - e) * r(t)
    c += 100 * t + `%{${a(o, 1 - o)}}\n`
  }
  const u = c + `100% {${a(n, 1 - n)}}\n}`,
    d = `__svelte_${(function (t) {
      let e = 5381,
        n = t.length
      for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n)
      return e >>> 0
    })(u)}_${s}`,
    p = t.ownerDocument
  ci.add(p)
  const h =
      p.__svelte_stylesheet || (p.__svelte_stylesheet = p.head.appendChild(qo('style')).sheet),
    g = p.__svelte_rules || (p.__svelte_rules = {})
  g[d] || ((g[d] = !0), h.insertRule(`@keyframes ${d} ${u}`, h.cssRules.length))
  const m = t.style.animation || ''
  return (t.style.animation = `${m ? m + ', ' : ''}${d} ${o}ms linear ${i}ms 1 both`), (di += 1), d
}
function hi(t, e) {
  const n = (t.style.animation || '').split(', '),
    o = n.filter(e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf('__svelte')),
    i = n.length - o.length
  i &&
    ((t.style.animation = o.join(', ')),
    (di -= i),
    di ||
      Uo(() => {
        di ||
          (ci.forEach((t) => {
            const e = t.__svelte_stylesheet
            let n = e.cssRules.length
            for (; n--; ) e.deleteRule(n)
            t.__svelte_rules = {}
          }),
          ci.clear())
      }))
}
function gi(t) {
  ui = t
}
function mi() {
  if (!ui) throw new Error('Function called outside component initialization')
  return ui
}
function fi(t) {
  mi().$$.on_mount.push(t)
}
function $i(t) {
  mi().$$.after_update.push(t)
}
function yi(t) {
  mi().$$.on_destroy.push(t)
}
function xi() {
  const t = mi()
  return (e, n) => {
    const o = t.$$.callbacks[e]
    if (o) {
      const i = li(e, n)
      o.slice().forEach((e) => {
        e.call(t, i)
      })
    }
  }
}
function bi(t, e) {
  mi().$$.context.set(t, e)
}
function vi(t) {
  return mi().$$.context.get(t)
}
function wi(t, e) {
  const n = t.$$.callbacks[e.type]
  n && n.slice().forEach((t) => t(e))
}
const Si = [],
  ki = [],
  Ci = [],
  Mi = [],
  Ri = Promise.resolve()
let Ti = !1
function Pi(t) {
  Ci.push(t)
}
function Ei(t) {
  Mi.push(t)
}
let Ai = !1
const Ii = new Set()
function Li() {
  if (!Ai) {
    Ai = !0
    do {
      for (let t = 0; t < Si.length; t += 1) {
        const e = Si[t]
        gi(e), Fi(e.$$)
      }
      for (gi(null), Si.length = 0; ki.length; ) ki.pop()()
      for (let t = 0; t < Ci.length; t += 1) {
        const e = Ci[t]
        Ii.has(e) || (Ii.add(e), e())
      }
      Ci.length = 0
    } while (Si.length)
    for (; Mi.length; ) Mi.pop()()
    ;(Ti = !1), (Ai = !1), Ii.clear()
  }
}
function Fi(t) {
  if (null !== t.fragment) {
    t.update(), Po(t.before_update)
    const e = t.dirty
    ;(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Pi)
  }
}
let Bi
function zi(t, e, n) {
  t.dispatchEvent(li(`${e ? 'intro' : 'outro'}${n}`))
}
const Di = new Set()
let Oi
function _i() {
  Oi = { r: 0, c: [], p: Oi }
}
function Wi() {
  Oi.r || Po(Oi.c), (Oi = Oi.p)
}
function Vi(t, e) {
  t && t.i && (Di.delete(t), t.i(e))
}
function Ni(t, e, n, o) {
  if (t && t.o) {
    if (Di.has(t)) return
    Di.add(t),
      Oi.c.push(() => {
        Di.delete(t), o && (n && t.d(1), o())
      }),
      t.o(e)
  }
}
const Ui = { duration: 0 }
function Hi(t, e, n, o) {
  let i = e(t, n),
    r = o ? 0 : 1,
    a = null,
    s = null,
    l = null
  function c() {
    l && hi(t, l)
  }
  function u(t, e) {
    const n = t.b - r
    return (
      (e *= Math.abs(n)),
      { a: r, b: t.b, d: n, duration: e, start: t.start, end: t.start + e, group: t.group }
    )
  }
  function d(e) {
    const { delay: n = 0, duration: o = 300, easing: d = Co, tick: p = ko, css: h } = i || Ui,
      g = { start: No() + n, b: e }
    e || ((g.group = Oi), (Oi.r += 1)),
      a || s
        ? (s = g)
        : (h && (c(), (l = pi(t, r, e, o, n, d, h))),
          e && p(0, 1),
          (a = u(g, o)),
          Pi(() => zi(t, e, 'start')),
          jo((e) => {
            if (
              (s &&
                e > s.start &&
                ((a = u(s, o)),
                (s = null),
                zi(t, a.b, 'start'),
                h && (c(), (l = pi(t, r, a.b, a.duration, 0, d, i.css)))),
              a)
            )
              if (e >= a.end)
                p((r = a.b), 1 - r),
                  zi(t, a.b, 'end'),
                  s || (a.b ? c() : --a.group.r || Po(a.group.c)),
                  (a = null)
              else if (e >= a.start) {
                const t = e - a.start
                ;(r = a.a + a.d * d(t / a.duration)), p(r, 1 - r)
              }
            return !(!a && !s)
          }))
  }
  return {
    run(t) {
      Eo(i)
        ? (Bi ||
            ((Bi = Promise.resolve()),
            Bi.then(() => {
              Bi = null
            })),
          Bi).then(() => {
            ;(i = i()), d(t)
          })
        : d(t)
    },
    end() {
      c(), (a = s = null)
    },
  }
}
const Xi =
  'undefined' != typeof window ? window : 'undefined' != typeof globalThis ? globalThis : global
function ji(t, e) {
  t.d(1), e.delete(t.key)
}
function Yi(t, e) {
  Ni(t, 1, 1, () => {
    e.delete(t.key)
  })
}
function Gi(t, e, n, o, i, r, a, s, l, c, u, d) {
  let p = t.length,
    h = r.length,
    g = p
  const m = {}
  for (; g--; ) m[t[g].key] = g
  const f = [],
    $ = new Map(),
    y = new Map()
  for (g = h; g--; ) {
    const t = d(i, r, g),
      s = n(t)
    let l = a.get(s)
    l ? o && l.p(t, e) : ((l = c(s, t)), l.c()),
      $.set(s, (f[g] = l)),
      s in m && y.set(s, Math.abs(g - m[s]))
  }
  const x = new Set(),
    b = new Set()
  function v(t) {
    Vi(t, 1), t.m(s, u), a.set(t.key, t), (u = t.first), h--
  }
  for (; p && h; ) {
    const e = f[h - 1],
      n = t[p - 1],
      o = e.key,
      i = n.key
    e === n
      ? ((u = e.first), p--, h--)
      : $.has(i)
      ? !a.has(o) || x.has(o)
        ? v(e)
        : b.has(i)
        ? p--
        : y.get(o) > y.get(i)
        ? (b.add(o), v(e))
        : (x.add(i), p--)
      : (l(n, a), p--)
  }
  for (; p--; ) {
    const e = t[p]
    $.has(e.key) || l(e, a)
  }
  for (; h; ) v(f[h - 1])
  return f
}
function Zi(t, e) {
  const n = {},
    o = {},
    i = { $$scope: 1 }
  let r = t.length
  for (; r--; ) {
    const a = t[r],
      s = e[r]
    if (s) {
      for (const t in a) t in s || (o[t] = 1)
      for (const t in s) i[t] || ((n[t] = s[t]), (i[t] = 1))
      t[r] = s
    } else for (const t in a) i[t] = 1
  }
  for (const t in o) t in n || (n[t] = void 0)
  return n
}
function qi(t) {
  return 'object' == typeof t && null !== t ? t : {}
}
function Ki(t, e, n) {
  const o = t.$$.props[e]
  void 0 !== o && ((t.$$.bound[o] = n), n(t.$$.ctx[o]))
}
function Qi(t) {
  t && t.c()
}
function Ji(t, e, n, o) {
  const { fragment: i, on_mount: r, on_destroy: a, after_update: s } = t.$$
  i && i.m(e, n),
    o ||
      Pi(() => {
        const e = r.map(Ro).filter(Eo)
        a ? a.push(...e) : Po(e), (t.$$.on_mount = [])
      }),
    s.forEach(Pi)
}
function tr(t, e) {
  const n = t.$$
  null !== n.fragment &&
    (Po(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []))
}
function er(t, e) {
  ;-1 === t.$$.dirty[0] && (Si.push(t), Ti || ((Ti = !0), Ri.then(Li)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31)
}
function nr(t, e, n, o, i, r, a = [-1]) {
  const s = ui
  gi(t)
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: ko,
    not_equal: i,
    bound: To(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(s ? s.$$.context : e.context || []),
    callbacks: To(),
    dirty: a,
    skip_bound: !1,
  })
  let c = !1
  if (
    ((l.ctx = n
      ? n(t, e.props || {}, (e, n, ...o) => {
          const r = o.length ? o[0] : n
          return (
            l.ctx &&
              i(l.ctx[e], (l.ctx[e] = r)) &&
              (!l.skip_bound && l.bound[e] && l.bound[e](r), c && er(t, e)),
            n
          )
        })
      : []),
    l.update(),
    (c = !0),
    Po(l.before_update),
    (l.fragment = !!o && o(l.ctx)),
    e.target)
  ) {
    if (e.hydrate) {
      const t = (function (t) {
        return Array.from(t.childNodes)
      })(e.target)
      l.fragment && l.fragment.l(t), t.forEach(Zo)
    } else l.fragment && l.fragment.c()
    e.intro && Vi(t.$$.fragment), Ji(t, e.target, e.anchor, e.customElement), Li()
  }
  gi(s)
}
class or {
  $destroy() {
    tr(this, 1), (this.$destroy = ko)
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = [])
    return (
      n.push(e),
      () => {
        const t = n.indexOf(e)
        ;-1 !== t && n.splice(t, 1)
      }
    )
  }
  $set(t) {
    var e
    this.$$set &&
      ((e = t), 0 !== Object.keys(e).length) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1))
  }
}
const ir = []
function rr(t, e) {
  return { subscribe: ar(t, e).subscribe }
}
function ar(t, e = ko) {
  let n
  const o = []
  function i(e) {
    if (Ao(t, e) && ((t = e), n)) {
      const e = !ir.length
      for (let e = 0; e < o.length; e += 1) {
        const n = o[e]
        n[1](), ir.push(n, t)
      }
      if (e) {
        for (let t = 0; t < ir.length; t += 2) ir[t][0](ir[t + 1])
        ir.length = 0
      }
    }
  }
  return {
    set: i,
    update: function (e) {
      i(e(t))
    },
    subscribe: function (r, a = ko) {
      const s = [r, a]
      return (
        o.push(s),
        1 === o.length && (n = e(i) || ko),
        r(t),
        () => {
          const t = o.indexOf(s)
          ;-1 !== t && o.splice(t, 1), 0 === o.length && (n(), (n = null))
        }
      )
    },
  }
}
function sr(t, e, n) {
  const o = !Array.isArray(t),
    i = o ? [t] : t,
    r = e.length < 2
  return rr(n, (t) => {
    let n = !1
    const a = []
    let s = 0,
      l = ko
    const c = () => {
        if (s) return
        l()
        const n = e(o ? a[0] : a, t)
        r ? t(n) : (l = Eo(n) ? n : ko)
      },
      u = i.map((t, e) =>
        Io(
          t,
          (t) => {
            ;(a[e] = t), (s &= ~(1 << e)), n && c()
          },
          () => {
            s |= 1 << e
          }
        )
      )
    return (
      (n = !0),
      c(),
      function () {
        Po(u), l()
      }
    )
  })
}
var lr = (t) => t.reduce((t, e) => Object.assign(t, e), {})
const cr = (t) => ({ updateValue: t }),
  ur = (t) => ({ defaultValue: t }),
  dr = (t) => ({ store: (e, n) => sr(...t(n)) }),
  pr = (t) => ({
    store: (e, n) => {
      const [o, i, r = () => !1] = t(n)
      let a,
        s = !0
      return sr(o, (t, e) => {
        i(t, (t) => {
          ;(!s && r(a, t)) || ((a = t), (s = !1), e(t))
        })
      })
    },
  }),
  hr = (t) => ({
    store: (e, n) => {
      const [o, i = {}] = t(n)
      let r = [],
        a = {}
      const s = (t) => o(t, a),
        l = (t) => {
          ;(r.length || t.length) && ((r = t), c())
        },
        c = () => {
          const t = r.map(s)
          ;(r = t), d(t)
        }
      Object.keys(i).forEach((t) => {
        i[t].subscribe((e) => {
          ;(a[t] = e), e && c()
        })
      })
      const { subscribe: u, set: d } = ar(e)
      return { set: l, update: (t) => l(t(null)), subscribe: u }
    },
  })
var gr = (t) => {
    const e = {},
      n = {}
    return (
      t.forEach(([t, ...o]) => {
        const r = lr(o),
          a = (e[t] = ((t, e, n) => {
            const { store: o = (t) => ar(t), defaultValue: r = i, updateValue: a } = n,
              s = o(r(), e, t),
              { subscribe: l, update: c = i } = s
            let u
            const d = (t) => {
                let e = !0
                u && u(),
                  (u = l((n) => {
                    if (e) return (e = !1)
                    t(n), u(), (u = void 0)
                  }))
              },
              p = a ? a(t) : O
            return (s.set = (t) => c((e) => p(t, e, d))), (s.defaultValue = r), s
          })(n, e, r)),
          s = { get: () => Lo(a), set: a.set }
        Object.defineProperty(n, t, s)
      }),
      { stores: e, accessors: n }
    )
  },
  mr = [['src'], ['imageReader'], ['imageWriter'], ['images', ur(() => [])]],
  fr = () => {
    let t = []
    return {
      sub: (e, n) => (
        t.push({ event: e, callback: n }),
        () => (t = t.filter((t) => t.event !== e || t.callback !== n))
      ),
      pub: (e, n) => {
        t.filter((t) => t.event === e).forEach((t) => t.callback(n))
      },
    }
  },
  $r = (t) => t.charAt(0).toUpperCase() + t.slice(1),
  yr = (t, e) => {
    Object.keys(e).forEach((n) => {
      const o = Ue(e[n]) ? { value: e[n], writable: !1 } : e[n]
      Object.defineProperty(t, n, o)
    })
  },
  xr = (t, e = 12) => parseFloat(t.toFixed(e))
var br = (t, e) => {
    const n = ie(e),
      o = X()
    qt(t).forEach((t) => {
      et(t, o),
        oe(t, e) ||
          n.forEach((e) => {
            const n = Math.atan2(e.start.y - e.end.y, e.start.x - e.end.x),
              i = 1e4 * Math.sin(Math.PI - n),
              r = 1e4 * Math.cos(Math.PI - n),
              a = j(t.x + i, t.y + r),
              s = kt(St(e), 1e4),
              l = ee(wt(t, a), s)
            l && et(o, nt(G(l), t))
          })
    })
    const i = Rt(t)
    et(i, o)
    return !!qt(i).every((t) => oe(t, e)) && (Ut(t, i), !0)
  },
  vr = (t, e) => {
    const n = qt(t),
      o = ie(e).map((t) => kt(t, 5)),
      i = Bt(t),
      r = []
    n.forEach((t) => {
      const e = ((t, e) => {
        if (0 === e) return t
        const n = j(t.start.x - t.end.x, t.start.y - t.end.y),
          o = Q(n),
          i = ot(o, e)
        return (t.end.x += i.x), (t.end.y += i.y), t
      })(wt(G(i), G(t)), 1e6)
      let n = !1
      o.map(St).forEach((t) => {
        const o = ee(e, t)
        o && !n && (r.push(o), (n = !0))
      })
    })
    const a = at(r[0], r[2]) < at(r[1], r[3]) ? [r[0], r[2]] : [r[1], r[3]],
      s = At(a)
    return s.width < t.width && (Ut(t, s), !0)
  },
  wr = (t, e, n = { x: 0, y: 0 }) => {
    const o = Pt(t),
      i = Bt(o),
      r = Qt(o, n, i).map((t) => q(t, e, i)),
      a = At(r)
    return r.map((t) => nt(t, a))
  },
  Sr = (t, e = 0, n = Vt(t)) => {
    let o, i
    if (0 !== e) {
      const r = Math.atan2(1, n),
        a = Math.sign(e) * e,
        s = a % Math.PI,
        l = a % W
      let c, u
      ;(u = s > V && s < W + V ? (l > V ? a : W - l) : l > V ? W - l : a),
        (c = Math.min(Math.abs(t.height / Math.sin(r + u)), Math.abs(t.width / Math.cos(r - u)))),
        (o = Math.cos(r) * c),
        (i = o / n)
    } else (o = t.width), (i = o / n), i > t.height && ((i = t.height), (o = i * n))
    return mt(o, i)
  },
  kr = (t, e, n, o, i, r, a, s) => {
    const l = dt(a),
      c = dt(s),
      u = xr(Math.max(e.width / c.width, e.height / c.height)),
      d = xr(Math.min(e.width / l.width, e.height / l.height)),
      p = Rt(e)
    if (d < 1 || u > 1) {
      const n = Bt(t),
        o = Bt(e),
        i = d < 1 ? d : u,
        r = (o.x + n.x) / 2,
        a = (o.y + n.y) / 2,
        s = p.width / i,
        l = p.height / i
      Nt(p, r - 0.5 * s, a - 0.5 * l, s, l)
    }
    return r
      ? (((t, e, n = 0, o = X(), i) => {
          if ((We(n) && 0 !== n) || o.x || o.y) {
            const i = Vt(t),
              r = wr(e, n, o),
              a = Sr(e, n, i)
            if (!(t.width < a.width && t.height < a.height)) {
              const e = 0.5 * t.width - 0.5 * a.width,
                n = 0.5 * t.height - 0.5 * a.height
              t.width > a.width && ((t.width = a.width), (t.x += e)),
                t.height > a.height && ((t.height = a.height), (t.y += n))
            }
            br(t, r), vr(t, r) && br(t, r)
          } else {
            let n = Vt(t)
            ;(t.width = Math.min(t.width, e.width)),
              (t.height = Math.min(t.height, e.height)),
              (t.x = Math.max(t.x, 0)),
              t.x + t.width > e.width && (t.x -= t.x + t.width - e.width),
              (t.y = Math.max(t.y, 0)),
              t.y + t.height > e.height && (t.y -= t.y + t.height - e.height)
            const o = Bt(t),
              r = Gt(t, n)
            ;(r.width = Math.max(i.width, r.width)),
              (r.height = Math.max(i.height, r.height)),
              (r.x = o.x - 0.5 * r.width),
              (r.y = o.y - 0.5 * r.height),
              Ut(t, r)
          }
        })(p, n, o, i, l),
        { crop: p })
      : { crop: p }
  },
  Cr = (t, e, n, o = { x: 0, y: 0 }) => {
    const i = Pt(t),
      r = Bt(i),
      a = Ht(i, n, r),
      s = Bt(Jt(At(a))),
      l = Bt(e),
      c = q(l, -n, s),
      u = nt(c, s),
      d = tt(et(r, u), xr)
    return Ft(d.x - 0.5 * e.width, d.y - 0.5 * e.height, e.width, e.height)
  },
  Mr = (t, e, n) => Math.max(e, Math.min(t, n))
const Rr = [
    'cropLimitToImage',
    'cropMinSize',
    'cropMaxSize',
    'cropAspectRatio',
    'flipX',
    'flipY',
    'rotation',
    'crop',
    'colorMatrix',
    'convolutionMatrix',
    'gamma',
    'vignette',
    'annotation',
    'decoration',
    'backgroundColor',
    'targetSize',
  ],
  Tr = (t) => (He(t) ? t.map(Tr) : x(t) ? { ...t } : t),
  Pr = ['isDraft', 'isFormatted', 'isComplete', 'isError', 'isLoading', 'isEditing', 'isSelected'],
  Er = (t) =>
    t.map((t) =>
      Object.keys(t).reduce((e, n) => {
        return Pr.includes(n) || ((o = t[n]), ae(o)) || (e[n] = t[n]), e
        var o
      }, {})
    )
var Ar = (t, e) => {
  if (t.length !== e.length) return !1
  for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1
  return !0
}
let Ir = null
var Lr = () => (null === Ir && (Ir = Se(/Android/)), Ir)
let Fr = null
let Br = null
let zr = null
let Dr
var Or = () =>
  Dr ||
  ((Dr = Ce()
    ? 'ios'
    : Lr()
    ? 'android'
    : (null === Fr && (Fr = Se(/Firefox/)),
      Fr
        ? 'firefox'
        : (null === Br && (Br = Se(/MSIE|Trident/)),
          Br ? 'ie' : (null === zr && (zr = Se(/Edge/)), zr ? 'edge' : 'chrome')))),
  Dr)
let _r
const Wr = -V,
  Vr = V,
  Nr = (t, e, n) => {
    const o = tt(Bt(t), (t) => xr(t, 8)),
      i = Pt(e),
      r = Bt(i),
      a = Ht(i, n, r),
      s = tt(yt(At(a)), (t) => xr(t, 8)),
      l = Math.abs(s.x - o.x),
      c = Math.abs(s.y - o.y)
    return l < 1 && c < 1
  },
  Ur = (t, e, n, o) => {
    const i = Math.max(n.width / o.width, n.height / o.height),
      r = mt(o.width * i, o.height * i),
      a = ((t) => Math.sqrt(t.width * t.width + t.height * t.height))(r)
    if (a < Math.min(t.width, t.height)) return [Wr, Vr]
    const s = e ? t.height : t.width,
      l = e ? t.width : t.height,
      c = Math.acos(r.height / a),
      u = c - Math.acos(l / a),
      d = Math.asin(s / a) - c
    if (Number.isNaN(u) && Number.isNaN(d)) return [Wr, Vr]
    const p = Number.isNaN(u) ? d : Number.isNaN(d) ? u : Math.min(u, d)
    return [Math.max(-p, Wr), Math.min(p, Vr)]
  },
  Hr = (t, e) => (
    t.isFormatted || ((t = Zn(t)).isFormatted = !0),
    t.isDraft ||
      !Ln(t) ||
      (t.context && Wt(e.context, t.context)) ||
      ((t = oo(t, e.context)).context = { ...e.context }),
    t
  )
var Xr = [
    ['file'],
    ['size'],
    ['loadState'],
    ['processState'],
    ['aspectRatio', dr(({ size: t }) => [t, (t) => (t ? Vt(t) : void 0)])],
    ['perspectiveX', ur(() => 0)],
    ['perspectiveY', ur(() => 0)],
    [
      'perspective',
      dr(({ perspectiveX: t, perspectiveY: e }) => [[t, e], ([t, e]) => ({ x: t, y: e })]),
    ],
    [
      'rotation',
      ur(() => 0),
      cr((t) => (e, n, o) => {
        if (e === n) return e
        const {
          loadState: i,
          size: r,
          rotationRange: a,
          cropMinSize: s,
          cropMaxSize: l,
          crop: c,
          perspective: u,
          cropLimitToImage: d,
          cropOrigin: p,
        } = t
        if (!i || !i.beforeComplete) return e
        const h = ((t, e, n) => {
            const o = Sr(e, n, Vt(t))
            return ft(vt(o, Math.round), vt(dt(t), Math.round))
          })(c, r, n),
          g = Nr(c, r, n),
          m = ((t, e, n, o, i, r, a, s, l, c) => {
            const u = dt(l)
            let d = dt(c)
            a && ((d.width = Math.min(c.width, i.width)), (d.height = Math.min(c.height, i.height)))
            let p = !1
            const h = (e, n) => {
                const l = Cr(i, o, e, null),
                  c = Pt(i),
                  g = Bt(c),
                  m = Qt(c, r, g),
                  f = nt(G(g), te(m)),
                  $ = q(Bt(l), n, g),
                  y = nt(G(g), $)
                m.forEach((t) => q(t, n, g))
                const x = At(m),
                  b = te(m),
                  v = et(nt(nt(b, y), x), f),
                  w = Ft(v.x - 0.5 * l.width, v.y - 0.5 * l.height, l.width, l.height)
                if ((s && Dt(w, s.width / w.width), a)) {
                  const t = wr(i, n, r)
                  vr(w, t)
                }
                const S = xr(Math.min(w.width / u.width, w.height / u.height), 8),
                  k = xr(Math.max(w.width / d.width, w.height / d.height), 8)
                return (S < 1 || k > 1) && xr(Math.abs(n - e)) === xr(Math.PI / 2) && !p
                  ? ((p = !0), h(t, t + Math.sign(n - e) * Math.PI))
                  : { rotation: n, crop: Kt(w, (t) => xr(t, 8)) }
              },
              g = Math.sign(e) * Math.round(Math.abs(e) / W) * W,
              m = Mr(e, g + n[0], g + n[1])
            return h(t, m)
          })(n, e, a, c, r, u, d, p, s, l)
        if (h && g) {
          const t = Sr(r, e, Vt(m.crop))
          ;(m.crop.x += 0.5 * m.crop.width),
            (m.crop.y += 0.5 * m.crop.height),
            (m.crop.x -= 0.5 * t.width),
            (m.crop.y -= 0.5 * t.height),
            (m.crop.width = t.width),
            (m.crop.height = t.height)
        }
        return (
          o(() => {
            t.crop = Kt(m.crop, (t) => xr(t, 8))
          }),
          m.rotation
        )
      }),
    ],
    ['flipX', ur(() => !1)],
    ['flipY', ur(() => !1)],
    ['flip', dr(({ flipX: t, flipY: e }) => [[t, e], ([t, e]) => ({ x: t, y: e })])],
    ['isRotatedSideways', pr(({ rotation: t }) => [[t], ([t], e) => e(N(t)), (t, e) => t !== e])],
    [
      'crop',
      cr((t) => (e, n = e) => {
        const {
          loadState: o,
          size: i,
          cropMinSize: r,
          cropMaxSize: a,
          cropLimitToImage: s,
          cropAspectRatio: l,
          rotation: c,
          perspective: u,
        } = t
        if ((!e && !n) || !o || !o.beforeComplete) return e
        e || (e = { x: 0, y: 0, ...Sr(i, c, l || Vt(i)) })
        const d = kr(n, e, i, c, u, s, r, a)
        return Kt(d.crop, (t) => xr(t, 8))
      }),
    ],
    [
      'cropAspectRatio',
      cr((t) => (e) => {
        const { loadState: n, crop: o, size: i, rotation: r } = t,
          a = ((t) => {
            if (t) {
              if (/:/.test(t)) {
                const [e, n] = t.split(':')
                return e / n
              }
              return parseFloat(t)
            }
          })(e)
        if (a) {
          if (!n || !n.beforeComplete) return a
          if (Nr(o, i, r)) {
            const n = ((t, e) => {
              const n = t.width,
                o = t.height
              return N(e) && ((t.width = o), (t.height = n)), t
            })(dt(i), r)
            t.crop = Kt(Gt(Pt(n), e), xr)
          } else {
            const e = { width: o.height * a, height: o.height },
              n = 0.5 * (o.width - e.width),
              i = 0.5 * (o.height - e.height)
            t.crop = Kt(Ft(o.x + n, o.y + i, e.width, e.height), xr)
          }
          return a
        }
      }),
    ],
    ['cropOrigin'],
    ['cropMinSize', ur(() => ({ width: 1, height: 1 }))],
    [
      'cropMaxSize',
      ur(() =>
        dt(
          (() => {
            if (!_r) {
              const t = {
                android: [14188, 14188],
                ios: [4096, 4096],
                chrome: [16384, 16384],
                firefox: [11180, 11180],
                edge: [16384, 16384],
                ie: [16384, 16384],
              }
              _r = t[Or()] || t.chrome
            }
            const [t, e] = _r
            return { width: t, height: e }
          })()
        )
      ),
    ],
    [
      'cropLimitToImage',
      ur(() => !0),
      cr((t) => (e, n, o) => (!n && e && o(() => (t.crop = Rt(t.crop))), e)),
    ],
    [
      'cropSize',
      pr(({ crop: t }) => [
        [t],
        ([t], e) => {
          t && e(mt(t.width, t.height))
        },
        (t, e) => ft(t, e),
      ]),
    ],
    [
      'cropRectAspectRatio',
      dr(({ cropSize: t }) => [
        [t],
        ([t], e) => {
          t && e(xr(Vt(t), 5))
        },
      ]),
    ],
    [
      'cropRange',
      pr(
        ({
          size: t,
          rotation: e,
          cropRectAspectRatio: n,
          cropMinSize: o,
          cropMaxSize: i,
          cropLimitToImage: r,
        }) => [
          [t, e, n, o, i, r],
          ([t, e, n, o, i, r], a) => {
            if (!t) return
            a(
              ((t, e, n, o, i, r) => {
                let a = dt(o),
                  s = dt(i)
                return r ? [a, vt(Sr(t, e, n), Math.round)] : [a, s]
              })(t, e, n, o, i, r)
            )
          },
          (t, e) => Ar(t, e),
        ]
      ),
    ],
    [
      'rotationRange',
      pr(({ size: t, isRotatedSideways: e, cropMinSize: n, cropSize: o }) => [
        [t, e, n, o],
        ([t, e, n, o], i) => {
          if (!t || !o) return
          i(Ur(t, e, n, o))
        },
        (t, e) => Ar(t, e),
      ]),
    ],
    [
      'backgroundColor',
      cr(() => (t) => ((t = [0, 0, 0, 0], e = 1) => (4 === t.length ? t : [...t, e]))(t)),
    ],
    ['targetSize'],
    ['colorMatrix'],
    ['convolutionMatrix'],
    ['gamma'],
    ['noise'],
    ['vignette'],
    ['annotation', hr(({ size: t }) => [Hr, { context: t }]), ur(() => [])],
    ['decoration', hr(({ crop: t }) => [Hr, { context: t }]), ur(() => [])],
    [
      'state',
      ((t) => ({ store: t }))((t, e, n) => {
        const o = Rr.map((t) => e[t]),
          { subscribe: i } = sr(o, (t, e) => {
            const n = Rr.reduce((e, n, o) => ((e[n] = Tr(t[o])), e), {})
            n.crop && Kt(n.crop, Math.round),
              (n.annotation = n.annotation && Er(n.annotation)),
              (n.decoration = n.decoration && Er(n.decoration)),
              e(n)
          }),
          r = (t) => {
            t &&
              ((n.cropOrigin = void 0),
              Rr.filter((e) => t.hasOwnProperty(e)).forEach((e) => {
                n[e] = Tr(t[e])
              }))
          }
        return { set: r, update: (t) => r(t(null)), subscribe: i }
      }),
    ],
  ],
  jr = async (t, e, n = {}, o) => {
    const { ontaskstart: i, ontaskprogress: r, ontaskend: a, token: s } = o
    let l = !1
    s.cancel = () => {
      l = !0
    }
    for (const [o, s] of e.entries()) {
      if (l) return
      const [e, c] = s
      i(o, c)
      try {
        t = await e(t, { ...n }, (t) => r(o, c, t))
      } catch (t) {
        throw ((l = !0), t)
      }
      a(o, c)
    }
    return t
  }
const Yr = [
    'loadstart',
    'loadabort',
    'loaderror',
    'loadprogress',
    'load',
    'processstart',
    'processabort',
    'processerror',
    'processprogress',
    'process',
  ],
  Gr = [
    'flip',
    'cropOrigin',
    'isRotatedSideways',
    'perspective',
    'perspectiveX',
    'perspectiveY',
    'cropRange',
  ],
  Zr = ['images'],
  qr = (t) => 'image' + $r(t),
  Kr = (t) => t.map(([t]) => t).filter((t) => !Gr.includes(t))
var Qr = () => {
  const { stores: t, accessors: e } = gr(mr),
    { sub: n, pub: o } = fr(),
    r = () => (e.images ? e.images[0] : {})
  let a = {}
  Kr(Xr).forEach((t) => {
    Object.defineProperty(e, qr(t), {
      get: () => {
        const e = r()
        if (e) return e.accessors[t]
      },
      set: (e) => {
        const n = r()
        n ? (n.accessors[t] = e) : (a[t] = e)
      },
    })
  })
  const s = t.src.subscribe((t) =>
      t
        ? e.imageReader
          ? e.images.length
            ? void p(t).catch(() => {})
            : c(t)
          : void 0
        : (e.images = [])
    ),
    l = t.imageReader.subscribe((t) => {
      t && (e.images.length || (e.src && c(e.src)))
    }),
    c = (t) => {
      Promise.resolve()
        .then(() => p(t, a))
        .catch(() => {})
    },
    u = () => e.images && e.images[0]
  let d
  const p = (t, n = {}) =>
    new Promise((r, s) => {
      let l = u()
      const c = n.cropMinSize || (l && l.accessors.cropMinSize)
      l && g(),
        (l = (({ minSize: t = { width: 1, height: 1 } } = {}) => {
          const { stores: e, accessors: n } = gr(Xr),
            { pub: o, sub: r } = fr(),
            a = (t, e) => {
              const i = () => n[t] || {},
                r = (e) => (n[t] = { ...i(), ...e, timeStamp: Date.now() }),
                a = () => i().error,
                s = (t) => {
                  a() || (r({ error: t }), o(e + 'error', { ...i() }))
                }
              return {
                start() {
                  o(e + 'start')
                },
                onabort() {
                  o(e + 'abort', { ...i() })
                },
                ontaskstart(t, n) {
                  a() ||
                    (r({ index: t, task: n, taskProgress: void 0, taskLengthComputable: void 0 }),
                    o(e + 'taskstart', { ...i() }))
                },
                ontaskprogress(t, n, s) {
                  a() ||
                    (r({
                      index: t,
                      task: n,
                      taskProgress: s.loaded / s.total,
                      taskLengthComputable: s.lengthComputable,
                    }),
                    o(e + 'taskprogress', { ...i() }),
                    o(e + 'progress', { ...i() }))
                },
                ontaskend(t, n) {
                  a() || (r({ index: t, task: n }), o(e + 'taskend', { ...i() }))
                },
                ontaskerror(t) {
                  s(t)
                },
                error(t) {
                  s(t)
                },
                beforeComplete(t) {
                  a() || (r({ beforeComplete: !0 }), o('before' + e, t))
                },
                complete(t) {
                  a() || (r({ complete: !0 }), o(e, t))
                },
              }
            }
          return (
            yr(n, {
              read: (e, { reader: o }) => {
                if (!o) return
                Object.assign(n, { file: void 0, size: void 0, loadState: void 0 })
                let r = { cancel: i },
                  s = !1
                const l = a('loadState', 'load'),
                  c = { token: r, ...l },
                  u = { src: e, size: void 0, dest: void 0 },
                  d = {}
                return (
                  (async () => {
                    try {
                      l.start()
                      const e = await jr(u, o, d, c)
                      if (s) return l.onabort()
                      const { size: i, dest: a } = e || {}
                      if (!i || !i.width || !i.height)
                        throw new ye('Image size missing', 'IMAGE_SIZE_MISSING', e)
                      if (i.width < t.width || i.height < t.height)
                        throw new ye('Image too small', 'IMAGE_TOO_SMALL', {
                          ...e,
                          minWidth: t.width,
                          minHeight: t.height,
                        })
                      Object.assign(n, { size: i, file: a }),
                        n.crop || (n.crop = Gt(Pt(i), n.cropAspectRatio)),
                        (n.state = n.state),
                        l.beforeComplete(e),
                        l.complete(e)
                    } catch (t) {
                      l.error(t)
                    } finally {
                      r = void 0
                    }
                  })(),
                  () => {
                    ;(s = !0), r && r.cancel(), l.onabort()
                  }
                )
              },
              write: (t) => {
                if (!n.loadState.complete) return
                n.processState = void 0
                const e = a('processState', 'process'),
                  o = { src: n.file, imageState: n.state, dest: void 0 }
                if (!t) return e.start(), void e.complete(o)
                let r = { cancel: i }
                const s = {},
                  l = { token: r, ...e }
                return (
                  (async () => {
                    e.start()
                    try {
                      const n = await jr(o, t, s, l)
                      e.complete(n)
                    } catch (t) {
                      e.error(t)
                    } finally {
                      r = void 0
                    }
                  })(),
                  () => r && r.cancel()
                )
              },
              on: r,
            }),
            { accessors: n, stores: e }
          )
        })({ minSize: c })),
        Yr.map((t) => {
          return l.accessors.on(t, ((e = t), (t) => o(e, t)))
          var e
        })
      const p = () => {
          ;(a = {}), h(), m()
        },
        h = l.accessors.on('loaderror', (t) => {
          p(), s(t)
        })
      l.accessors.on('beforeload', () => {
        const t = Kr(Xr).reduce((t, e) => {
          if (e in n) return (t[e] = n[e]), t
          {
            const o = qr(e)
            o in n && (t[e] = n[o])
          }
          return t
        }, {})
        ;['cropLimitToImage', 'crop', 'cropAspectRatio', 'rotation'].forEach((e) => {
          e in t && ((l.accessors[e] = t[e]), delete t[e])
        }),
          Object.assign(l.accessors, t),
          (l.accessors.state = l.accessors.state)
      })
      const m = l.accessors.on('load', (t) => {
        ;(d = void 0), p(), r(t)
      })
      ;(e.images = [l]),
        n.imageReader && (e.imageReader = n.imageReader),
        n.imageWriter && (e.imageWriter = n.imageWriter),
        (d = l.accessors.read(t, { reader: e.imageReader }))
    })
  let h
  const g = () => {
    const t = u()
    t && (d && d(), (t.accessors.loadState = void 0), (e.images = []))
  }
  return (
    Object.defineProperty(e, 'stores', { get: () => t }),
    yr(e, {
      on: n,
      loadImage: p,
      abortLoadImage: () => {
        d(), (e.images = [])
      },
      editImage: (t, n) =>
        new Promise((o, i) => {
          p(t, n)
            .then(() => {
              const { images: t } = e,
                n = t[0],
                r = () => {
                  a(), s()
                },
                a = n.accessors.on('processerror', (t) => {
                  r(), i(t)
                }),
                s = n.accessors.on('process', (t) => {
                  r(), o(t)
                })
            })
            .catch(i)
        }),
      removeImage: g,
      processImage: (t, n) =>
        new Promise(async (o, i) => {
          t && (await p(t, n))
          const r = u()
          if (!r) return i('no image')
          const a = () => {
              ;(h = void 0), s(), l()
            },
            s = r.accessors.on('processerror', (t) => {
              a(), i(t)
            }),
            l = r.accessors.on('process', (t) => {
              a(), o(t)
            })
          h = r.accessors.write(e.imageWriter)
        }),
      abortProcessImage: () => {
        const t = u()
        t && (h && h(), (t.accessors.processState = void 0))
      },
      destroy: () => {
        s(), l()
      },
    }),
    e
  )
}
const Jr = (t, e) => {
    const { processImage: n } = Qr()
    return n(t, e)
  },
  ta = async (t, e, n, o) => {
    const { dest: i } = await Jr(e, {
      imageReader: ka(),
      imageWriter: Ca({ format: 'canvas', targetSize: { ...o, upscale: !0 } }),
      imageCrop: n,
    })
    t.drawImage(i, o.x, o.y), m(i)
  },
  ea =
    (t, e = (...t) => t, n) =>
    async (o, i, r) => {
      let a
      r(he(0, !1))
      let s = !1
      try {
        a = await t(
          ...e(o, i, (t) => {
            ;(s = !0), r(t)
          })
        )
      } catch (t) {
        throw t
      }
      return n && n(o, a), s || r(he(1, !1)), o
    },
  na = ({ srcProp: t = 'src', destProp: e = 'dest' } = {}) => [
    ea(
      be,
      (e, n, o) => [e[t], o],
      (t, n) => (t[e] = n)
    ),
    'any-to-file',
  ],
  oa = ({ srcProp: t = 'src', destProp: e = 'size' } = {}) => [
    ea(
      de,
      (e, n) => [e[t]],
      (t, n) => (t[e] = n)
    ),
    'read-image-size',
  ],
  ia = ({ srcSize: t = 'size', srcOrientation: e = 'orientation', destSize: n = 'size' } = {}) => [
    ea(
      Me,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    'image-size-match-orientation',
  ],
  ra = ({ srcProp: t = 'src', destProp: e = 'head' } = {}) => [
    ea(
      (t, e) => (Re(t) ? a(t, e) : void 0),
      (e) => [e[t], [0, 65536], onprogress],
      (t, n) => (t[e] = n)
    ),
    'read-image-head',
  ],
  aa = ({ srcProp: t = 'head', destProp: e = 'orientation' } = {}) => [
    ea(
      n,
      (e) => [e[t], 274],
      (t, n = 1) => (t[e] = n)
    ),
    'read-exif-orientation-tag',
  ],
  sa = ({ srcProp: t = 'head' } = {}) => [
    ea(n, (e) => [e[t], 274, 1]),
    'clear-exif-orientation-tag',
  ],
  la = ({
    srcImageSize: t = 'size',
    srcCanvasSize: e = 'imageData',
    srcImageState: n = 'imageState',
    destImageSize: o = 'size',
    destScalar: i = 'scalar',
  } = {}) => [
    ea(
      (t, e, n) => {
        const o = Math.min(e.width / t.width, e.height / t.height)
        if (1 !== o) {
          const { crop: t, annotation: e, decoration: i } = n,
            r = X()
          t && (n.crop = Dt(t, o, r))
          const a = X()
          ;(n.annotation = e.map((t) => io(t, a, o))), (n.decoration = i.map((t) => io(t, a, o)))
        }
        return [o, pt(e)]
      },
      (o) => [o[t], o[e], o[n]],
      (t, [e, n]) => {
        ;(t[i] = e), (t[o] = n)
      }
    ),
    'calculate-canvas-scalar',
  ],
  ca = ({ srcProp: t = 'src', destProp: e = 'imageData', canvasMemoryLimit: n }) => [
    ea(
      P,
      (e) => [e[t], n],
      (t, n) => (t[e] = n)
    ),
    'blob-to-image-data',
  ],
  ua = ({ srcImageData: t = 'imageData', srcOrientation: e = 'orientation' } = {}) => [
    ea(
      y,
      (n) => [n[t], n[e]],
      (t, e) => (t.imageData = e)
    ),
    'image-data-match-orientation',
  ],
  da = ({ srcImageData: t = 'imageData', srcImageState: e = 'imageState' } = {}) => [
    ea(
      wo,
      (n) => [n[t], { backgroundColor: n[e].backgroundColor }],
      (t, e) => (t.imageData = e)
    ),
    'image-data-fill',
  ],
  pa = ({ srcImageData: t = 'imageData', srcImageState: e = 'imageState' } = {}) => [
    ea(
      Ee,
      (n) => [
        n[t],
        { crop: n[e].crop, rotation: n[e].rotation, flipX: n[e].flipX, flipY: n[e].flipY },
      ],
      (t, e) => (t.imageData = e)
    ),
    'image-data-crop',
  ],
  ha = ({
    resize: t = { width: void 0, height: void 0, fit: void 0, upscale: void 0 },
    srcProp: e = 'imageData',
    srcImageState: n = 'imageState',
    destImageScaledSize: o = 'imageScaledSize',
  }) => [
    ea(
      Le,
      (o) => {
        return [
          o[e],
          {
            width: Math.min(
              t.width || Number.MAX_SAFE_INTEGER,
              (o[n].targetSize && o[n].targetSize.width) || Number.MAX_SAFE_INTEGER
            ),
            height: Math.min(
              t.height || Number.MAX_SAFE_INTEGER,
              (o[n].targetSize && o[n].targetSize.height) || Number.MAX_SAFE_INTEGER
            ),
            fit: t.fit || 'contain',
            upscale:
              ((i = o[n]),
              !!((i.targetSize && i.targetSize.width) || (i.targetSize && i.targetSize.height)) ||
                t.upscale ||
                !1),
          },
        ]
        var i
      },
      (t, e) => {
        ft(t.imageData, e) || (t[o] = pt(e)), (t.imageData = e)
      }
    ),
    'image-data-resize',
  ],
  ga = ({
    srcImageData: t = 'imageData',
    srcImageState: e = 'imageState',
    destImageData: n = 'imageData',
  } = {}) => [
    ea(
      _e,
      (n) => {
        const { colorMatrix: o } = n[e],
          i =
            o &&
            Object.keys(o)
              .map((t) => o[t])
              .filter(Boolean)
        return [
          n[t],
          {
            colorMatrix: i && So(i),
            convolutionMatrix: n[e].convolutionMatrix,
            gamma: n[e].gamma,
            noise: n[e].noise,
            vignette: n[e].vignette,
          },
        ]
      },
      (t, e) => (t[n] = e)
    ),
    'image-data-filter',
  ],
  ma = ({
    srcImageData: t = 'imageData',
    srcSize: e = 'size',
    srcImageState: n = 'imageState',
    destImageData: o = 'imageData',
    destImageScaledSize: i = 'imageScaledSize',
  } = {}) => [
    ea(
      vo,
      (o) => [
        o[t],
        {
          shapes: o[n].annotation,
          context: o[e],
          transform: (t) => {
            const r = o[e],
              { crop: a = Pt(r), rotation: s = 0, flipX: l, flipY: c } = o[n],
              u = ((t, e) => {
                const n = Pt(t),
                  o = Bt(n),
                  i = Ht(n, e, o)
                return Jt(At(i))
              })(r, s),
              d = u.width,
              p = u.height,
              h = o[i],
              g = h ? Math.min(h.width / a.width, h.height / a.height) : 1,
              m = 0.5 * r.width - 0.5 * d,
              f = 0.5 * r.height - 0.5 * p,
              $ = yt(r)
            t.scale(g, g),
              t.translate(-m, -f),
              t.translate(-a.x, -a.y),
              t.translate($.x, $.y),
              t.rotate(s),
              t.translate(-$.x, -$.y),
              t.scale(l ? -1 : 1, c ? -1 : 1),
              t.translate(l ? -r.width : 0, c ? -r.height : 0),
              t.rect(0, 0, r.width, r.height),
              t.clip()
          },
          drawImage: ta,
        },
      ],
      (t, e) => (t[o] = e)
    ),
    'image-data-annotate',
  ],
  fa = ({
    srcImageData: t = 'imageData',
    srcImageState: e = 'imageState',
    destImageData: n = 'imageData',
    destImageScaledSize: o = 'imageScaledSize',
  } = {}) => [
    ea(
      vo,
      (n) => [
        n[t],
        {
          shapes: n[e].decoration,
          context: n[e].crop,
          transform: (t) => {
            const { crop: e } = n.imageState,
              i = n[o],
              r = i ? Math.min(i.width / e.width, i.height / e.height) : 1
            t.scale(r, r)
          },
          drawImage: ta,
        },
      ],
      (t, e) => (t[n] = e)
    ),
    'image-data-decorate',
  ],
  $a = ({
    mimeType: t,
    quality: e,
    srcImageData: n = 'imageData',
    srcFile: o = 'src',
    destBlob: i = 'blob',
  } = {}) => [
    ea(
      A,
      (i) => [i[n], t || B(i[o].name) || i[o].type, e],
      (t, e) => (t[i] = e)
    ),
    'image-data-to-blob',
  ],
  ya = ({
    srcImageData: t = 'imageData',
    srcOrientation: e = 'orientation',
    destCanvas: n = 'dest',
  } = {}) => [
    ea(
      $,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    'image-data-to-canvas',
  ],
  xa = async (t, n) => {
    if (!Re(t) || !n) return t
    const o = new DataView(n),
      i = e(o)
    if (!i || !i.exif) return t
    const { exif: r } = i
    return ((t, e, n = [0, t.size]) => (e ? new Blob([e, t.slice(...n)], { type: t.type }) : t))(
      t,
      n.slice(0, r.offset + r.size + 2),
      [20]
    )
  },
  ba = (t = 'blob', e = 'head', n = 'blob') => [
    ea(
      xa,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    'blob-write-image-head',
  ],
  va = ({
    renameFile: t,
    srcBlob: e = 'blob',
    srcFile: n = 'src',
    destFile: o = 'dest',
    defaultFilename: i,
  } = {}) => [
    ea(
      z,
      (o) => [o[e], t ? t(o[n]) : o[n].name || `${i}.${I(o[e].type)}`],
      (t, e) => (t[o] = e)
    ),
    'blob-to-file',
  ],
  wa = ({
    url: t = './',
    dataset: e = (t) => [
      ['dest', t.dest, t.dest.name],
      ['imageState', t.imageState],
    ],
    destStore: n = 'store',
  }) => [
    ea(
      async (e, n) => {
        try {
          return await ((t, e, n) =>
            new Promise((o, r) => {
              const { token: a = {}, beforeSend: s = i, onprogress: l = i } = n
              a.cancel = () => c.abort()
              const c = new XMLHttpRequest()
              ;(c.upload.onprogress = l),
                (c.onload = () => (c.status >= 200 && c.status < 300 ? o(c) : r(c))),
                (c.onerror = () => r(c)),
                (c.ontimeout = () => r(c)),
                c.open('POST', encodeURI(t)),
                s(c),
                c.send(e.reduce((t, e) => (t.append(...e.map(Te)), t), new FormData()))
            }))(t, e, { onprogress: n })
        } catch (t) {
          throw t
        }
      },
      (t, n, o) => [e(t), o],
      (t, e) => (t[n] = e)
    ),
    'store',
  ],
  Sa = (t) => [
    ea((e) =>
      t && t.length
        ? (Object.keys(e).forEach((n) => {
            t.includes(n) || delete e[n]
          }),
          e)
        : e
    ),
    'prop-filter',
  ],
  ka = (t = {}) => {
    const {
      orientImage: e = !0,
      outputProps: n = ['src', 'dest', 'size'],
      preprocessImageFile: o,
    } = t
    return [
      na(),
      o && [
        ea(
          o,
          (t, e, n) => [t.dest, e, n],
          (t, e) => (t.dest = e)
        ),
        'preprocess-image-file',
      ],
      oa({ srcProp: 'dest' }),
      e && ra({ srcProp: 'dest' }),
      e && aa(),
      e && ia(),
      Sa(n),
    ].filter(Boolean)
  },
  Ca = (t = {}) => {
    let {
      canvasMemoryLimit: e = Ce() ? 16777216 : 1 / 0,
      orientImage: n = !0,
      copyImageHead: o = !0,
      mimeType: i,
      quality: r,
      renameFile: a,
      targetSize: s,
      store: l,
      format: c = 'file',
      outputProps: u = ['src', 'dest', 'imageState', 'store'],
      preprocessImageState: d,
      postprocessImageData: p,
    } = t
    return [
      (n || o) && ra(),
      n && aa(),
      oa(),
      d && [
        ea(
          d,
          (t, e, n) => [t.imageState, e, n],
          (t, e) => (t.imageState = e)
        ),
        'preprocess-image-state',
      ],
      ca({ canvasMemoryLimit: e }),
      n && ia(),
      n && ua(),
      la(),
      pa(),
      ha({ resize: s }),
      ga(),
      da(),
      ma(),
      fa(),
      p && [
        ea(
          p,
          (t, e, n) => [t.imageData, e, n],
          (t, e) => (t.imageData = e)
        ),
        'postprocess-image-data',
      ],
      'file' === c
        ? $a({ mimeType: i, quality: r })
        : 'canvas' === c
        ? ya()
        : [(t) => ((t.dest = t.imageData), t)],
      'file' === c && n && sa(),
      'file' === c && o && ba(),
      'file' === c && va({ defaultFilename: 'image', renameFile: a }),
      'file' === c
        ? l && (w(l) ? wa({ url: l }) : Ue(l) ? [l, 'store'] : wa(l))
        : Ue(l) && [l, 'store'],
      Sa(u),
    ].filter(Boolean)
  }
var Ma = (t) => {
  const e = Object.getOwnPropertyDescriptors(t.prototype)
  return Object.keys(e).filter((t) => !!e[t].get)
}
function Ra(t) {
  return Math.sqrt(1 - --t * t)
}
function Ta(t) {
  return '[object Date]' === Object.prototype.toString.call(t)
}
function Pa(t, e) {
  if (t === e || t != t) return () => t
  const n = typeof t
  if (n !== typeof e || Array.isArray(t) !== Array.isArray(e))
    throw new Error('Cannot interpolate values of different type')
  if (Array.isArray(t)) {
    const n = e.map((e, n) => Pa(t[n], e))
    return (t) => n.map((e) => e(t))
  }
  if ('object' === n) {
    if (!t || !e) throw new Error('Object cannot be null')
    if (Ta(t) && Ta(e)) {
      t = t.getTime()
      const n = (e = e.getTime()) - t
      return (e) => new Date(t + e * n)
    }
    const n = Object.keys(e),
      o = {}
    return (
      n.forEach((n) => {
        o[n] = Pa(t[n], e[n])
      }),
      (t) => {
        const e = {}
        return (
          n.forEach((n) => {
            e[n] = o[n](t)
          }),
          e
        )
      }
    )
  }
  if ('number' === n) {
    const n = e - t
    return (e) => t + e * n
  }
  throw new Error(`Cannot interpolate ${n} values`)
}
function Ea(t, e = {}) {
  const n = ar(t)
  let o,
    i = t
  function r(r, a) {
    if (null == t) return n.set((t = r)), Promise.resolve()
    i = r
    let s = o,
      l = !1,
      { delay: c = 0, duration: u = 400, easing: d = Co, interpolate: p = Pa } = Mo(Mo({}, e), a)
    if (0 === u) return s && (s.abort(), (s = null)), n.set((t = i)), Promise.resolve()
    const h = No() + c
    let g
    return (
      (o = jo((e) => {
        if (e < h) return !0
        l || ((g = p(t, r)), 'function' == typeof u && (u = u(t, r)), (l = !0)),
          s && (s.abort(), (s = null))
        const o = e - h
        return o > u ? (n.set((t = r)), !1) : (n.set((t = g(d(o / u)))), !0)
      })),
      o.promise
    )
  }
  return { set: r, update: (e, n) => r(e(i, t), n), subscribe: n.subscribe }
}
function Aa(t, e, n, o) {
  if ('number' == typeof n) {
    const i = o - n,
      r = (n - e) / (t.dt || 1 / 60),
      a = (r + (t.opts.stiffness * i - t.opts.damping * r) * t.inv_mass) * t.dt
    return Math.abs(a) < t.opts.precision && Math.abs(i) < t.opts.precision
      ? o
      : ((t.settled = !1), n + a)
  }
  if (He(n)) return n.map((i, r) => Aa(t, e[r], n[r], o[r]))
  if ('object' == typeof n) {
    const i = {}
    for (const r in n) i[r] = Aa(t, e[r], n[r], o[r])
    return i
  }
  throw new Error(`Cannot spring ${typeof n} values`)
}
function Ia(t, e = {}) {
  const n = ar(t),
    { stiffness: o = 0.15, damping: i = 0.8, precision: r = 0.01 } = e
  let a,
    s,
    l,
    c = t,
    u = t,
    d = 1,
    p = 0,
    h = !1
  function g(e, o = {}) {
    u = e
    const i = (l = {})
    if (null == t || o.hard || (m.stiffness >= 1 && m.damping >= 1))
      return (h = !0), (a = null), (c = e), n.set((t = u)), Promise.resolve()
    if (o.soft) {
      const t = !0 === o.soft ? 0.5 : +o.soft
      ;(p = 1 / (60 * t)), (d = 0)
    }
    if (!s) {
      ;(a = null), (h = !1)
      const e = { inv_mass: void 0, opts: m, settled: !0, dt: void 0 }
      s = jo((o) => {
        if ((null === a && (a = o), h)) return (h = !1), (s = null), !1
        ;(d = Math.min(d + p, 1)),
          (e.inv_mass = d),
          (e.opts = m),
          (e.settled = !0),
          (e.dt = (60 * (o - a)) / 1e3)
        const i = Aa(e, c, t, u)
        return (a = o), (c = t), n.set((t = i)), e.settled && (s = null), !e.settled
      })
    }
    return new Promise((t) => {
      s.promise.then(() => {
        i === l && t()
      })
    })
  }
  const m = {
    set: g,
    update: (e, n) => g(e(u, t), n),
    subscribe: n.subscribe,
    stiffness: o,
    damping: i,
    precision: r,
  }
  return m
}
var La = rr(!1, (t) => {
  const e = window.matchMedia('(prefers-reduced-motion:reduce)')
  t(e.matches), (e.onchange = () => t(e.matches))
})
const Fa = Tt(),
  Ba = (t, e, n, o, i) => {
    t.rect || (t.rect = Tt())
    const r = t.rect
    Nt(Fa, e, n, o, i),
      Wt(r, Fa) || (Ut(r, Fa), t.dispatchEvent(new CustomEvent('measure', { detail: r })))
  },
  za = Math.round,
  Da = (t) => {
    const e = t.getBoundingClientRect()
    Ba(t, za(e.x), za(e.y), za(e.width), za(e.height))
  },
  Oa = (t) => Ba(t, t.offsetLeft, t.offsetTop, t.offsetWidth, t.offsetHeight),
  _a = []
let Wa,
  Va = null
function Na() {
  _a.length ? (_a.forEach((t) => t.measure(t)), (Va = requestAnimationFrame(Na))) : (Va = null)
}
var Ua = (t, e = {}) => {
    const { observePosition: n = !1, observeViewRect: o = !1, once: i = !1, disabled: r = !1 } = e
    if (!r)
      return !('ResizeObserver' in window) || n || o
        ? ((t.measure = o ? Da : Oa),
          _a.push(t),
          Va || (Va = requestAnimationFrame(Na)),
          t.measure(t),
          {
            destroy() {
              const e = _a.indexOf(t)
              _a.splice(e, 1)
            },
          })
        : (Wa ||
            (Wa = new ResizeObserver((t) => {
              t.forEach((t) => Oa(t.target))
            })),
          Wa.observe(t),
          Oa(t),
          i && Wa.unobserve(t),
          {
            destroy() {
              i || Wa.unobserve(t)
            },
          })
  },
  Ha = (t) => {
    let e = !1
    const n = {
      pointerdown: () => {
        e = !1
      },
      keydown: () => {
        e = !0
      },
      keyup: () => {
        e = !1
      },
      focus: (t) => {
        e && (t.target.dataset.focusVisible = '')
      },
      blur: (t) => {
        delete t.target.dataset.focusVisible
      },
    }
    return (
      Object.keys(n).forEach((e) => t.addEventListener(e, n[e], !0)),
      {
        destroy() {
          Object.keys(n).forEach((e) => t.removeEventListener(e, n[e], !0))
        },
      }
    )
  }
const Xa = (t) => {
  const { items: e, files: n } = t.dataTransfer
  return e
    ? Array.from(e)
        .filter((t) => 'file' === t.kind)
        .map((t) => t.getAsFile())
    : Array.from(n) || []
}
var ja = (t, e = {}) => {
  const n = (t) => {
      t.preventDefault()
    },
    o = (n) => {
      n.preventDefault(),
        n.stopPropagation(),
        t.dispatchEvent(
          new CustomEvent('dropfiles', {
            detail: { event: n, files: Xa(n).filter((t) => ge(t)) },
            ...e,
          })
        )
    }
  return (
    t.addEventListener('drop', o),
    t.addEventListener('dragover', n),
    {
      destroy() {
        t.removeEventListener('drop', o), t.removeEventListener('dragover', n)
      },
    }
  )
}
let Ya = null
var Ga = () => {
    if (null === Ya)
      if ('WebGL2RenderingContext' in window) {
        let t
        try {
          ;(t = h('canvas')), (Ya = !!t.getContext('webgl2'))
        } catch (t) {
          Ya = !1
        }
        t && m(t)
      } else Ya = !1
    return Ya
  },
  Za = (t, e) =>
    Ga()
      ? t.getContext('webgl2', e)
      : t.getContext('webgl', e) || t.getContext('experimental-webgl', e)
let qa = null
var Ka = () => {
    if (null === qa)
      if (c()) {
        const t = h('canvas')
        ;(qa = !Za(t, { failIfMajorPerformanceCaveat: !0 })), m(t)
      } else qa = !1
    return qa
  },
  Qa = (t) => 0 == (t & (t - 1)),
  Ja = (t, e = {}, n = '', o = '') =>
    Object.keys(e)
      .filter((t) => !x(e[t]))
      .reduce((t, i) => t.replace(new RegExp(n + i + o), e[i]), t)
const ts = {
    head: '#version 300 es\n\nin vec4 aPosition;uniform mat4 uMatrix;',
    text: '\nin vec2 aTexCoord;out vec2 vTexCoord;',
    matrix: '\ngl_Position=uMatrix*vec4(aPosition.x,aPosition.y,0,1);',
  },
  es = {
    head: '#version 300 es\nprecision highp float;\n\nout vec4 fragColor;',
    mask: '\nuniform float uMaskFeather[8];uniform float uMaskBounds[4];uniform float uMaskOpacity;float mask(float x,float y,float bounds[4],float opacity){return 1.0-(1.0-(smoothstep(bounds[3],bounds[3]+1.0,x)*(1.0-smoothstep(bounds[1]-1.0,bounds[1],x))*(1.0-step(bounds[0],y))*step(bounds[2],y)))*(1.0-opacity);}',
    init: '\nfloat a=1.0;vec4 fillColor=uColor;vec4 textureColor=texture(uTexture,vTexCoord);textureColor*=(1.0-step(1.0,vTexCoord.y))*step(0.0,vTexCoord.y)*(1.0-step(1.0,vTexCoord.x))*step(0.0,vTexCoord.x);',
    colorize:
      '\nif(uTextureColor.a!=0.0&&textureColor.a>0.0){vec3 colorFlattened=textureColor.rgb/textureColor.a;if(colorFlattened.r>.999999&&colorFlattened.g==0.0&&colorFlattened.b>.999999){textureColor.rgb=uTextureColor.rgb*textureColor.a;}textureColor*=uTextureColor.a;}',
    maskapply: '\nfloat m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);',
    maskfeatherapply:
      '\nfloat leftFeatherOpacity=step(uMaskFeather[1],gl_FragCoord.x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],gl_FragCoord.x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],gl_FragCoord.x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],gl_FragCoord.x));a*=leftFeatherOpacity*rightFeatherOpacity;',
    edgeaa:
      '\nvec2 scaledPoint=vec2(vRectCoord.x*uSize.x,vRectCoord.y*uSize.y);a*=smoothstep(0.0,1.0,uSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);',
    cornerradius:
      '\nvec2 s=(uSize-2.0)*.5;vec2 r=(vRectCoord*uSize);vec2 p=r-(uSize*.5);float cornerRadius=uCornerRadius[0];bool left=r.x<s.x;bool top=r.y<s.x;if(!left&&top){cornerRadius=uCornerRadius[1];}if(!left&&!top){cornerRadius=uCornerRadius[3];}if(left&&!top){cornerRadius=uCornerRadius[2];}a*=1.0-clamp(length(max(abs(p)-(s-cornerRadius),0.0))-cornerRadius,0.0,1.0);',
    fragcolor:
      '\nfillColor.a*=a;fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);textureColor*=uTextureOpacity;textureColor.a*=a;textureColor.rgb*=m*a;textureColor.rgb+=(1.0-m)*(uCanvasColor.rgb*textureColor.a);fragColor=textureColor+(fillColor*(1.0-textureColor.a));',
  },
  ns = (t, e, n) => {
    const o = t.createShader(n),
      i = ((t, e, n) => (
        (e = Ja(e, n === t.VERTEX_SHADER ? ts : es, '##').trim()),
        Ga()
          ? e
          : ((e = (e = e.replace(/#version.+/gm, '').trim()).replace(/^\/\/\#/gm, '#')),
            n === t.VERTEX_SHADER &&
              (e = e.replace(/in /gm, 'attribute ').replace(/out /g, 'varying ')),
            n === t.FRAGMENT_SHADER &&
              (e = e
                .replace(/in /gm, 'varying ')
                .replace(/out.*?;/gm, '')
                .replace(/texture\(/g, 'texture2D(')
                .replace(/fragColor/g, 'gl_FragColor')),
            '' + e)
      ))(t, e, n)
    return (
      t.shaderSource(o, i),
      t.compileShader(o),
      t.getShaderParameter(o, t.COMPILE_STATUS) || console.error(t.getShaderInfoLog(o)),
      o
    )
  },
  os = (t, e, n, o, i) => {
    const r = t.createProgram()
    t.attachShader(r, ns(t, e, t.VERTEX_SHADER)),
      t.attachShader(r, ns(t, n, t.FRAGMENT_SHADER)),
      t.linkProgram(r)
    const a = {}
    return (
      o.forEach((e) => {
        a[e] = t.getAttribLocation(r, e)
      }),
      i.forEach((e) => {
        a[e] = t.getUniformLocation(r, e)
      }),
      { program: r, locations: a }
    )
  },
  is = (t) => !!Ga() || (Qa(t.width) && Qa(t.height)),
  rs = (t, e, n) => (
    t.bindTexture(t.TEXTURE_2D, e),
    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n),
    ((t, e) => {
      t.texParameteri(
        t.TEXTURE_2D,
        t.TEXTURE_MIN_FILTER,
        is(e) ? t.LINEAR_MIPMAP_LINEAR : t.LINEAR
      ),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        is(e) && t.generateMipmap(t.TEXTURE_2D)
    })(t, n),
    t.bindTexture(t.TEXTURE_2D, null),
    e
  ),
  as = (t, e = 1) => (t ? [t[0], t[1], t[2], We(t[3]) ? e * t[3] : e] : [0, 0, 0, 0]),
  ss = () => {
    const t = new Float32Array(16)
    return (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t
  },
  ls = (t, e, n, o, i, r, a) => {
    const s = 1 / (e - n),
      l = 1 / (o - i),
      c = 1 / (r - a)
    ;(t[0] = -2 * s),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = -2 * l),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 2 * c),
      (t[11] = 0),
      (t[12] = (e + n) * s),
      (t[13] = (i + o) * l),
      (t[14] = (a + r) * c),
      (t[15] = 1)
  },
  cs = (t, e, n, o) => {
    ;(t[12] = t[0] * e + t[4] * n + t[8] * o + t[12]),
      (t[13] = t[1] * e + t[5] * n + t[9] * o + t[13]),
      (t[14] = t[2] * e + t[6] * n + t[10] * o + t[14]),
      (t[15] = t[3] * e + t[7] * n + t[11] * o + t[15])
  }
var us = (t) => (t * Math.PI) / 180
const ds = (t, e, n, o, i) => {
    let r, a
    ;(r = Q(j(o.x - n.x, o.y - n.y))), (a = Q(j(i.x - o.x, i.y - o.y)))
    const s = Q(j(r.x + a.x, r.y + a.y)),
      l = j(-s.y, s.x),
      c = j(-r.y, r.x),
      u = 1 / it(l, c)
    ;(t[e] = o.x),
      (t[e + 1] = o.y),
      (t[e + 2] = l.x),
      (t[e + 3] = l.y),
      (t[e + 4] = -u),
      (t[e + 5] = o.x),
      (t[e + 6] = o.y),
      (t[e + 7] = l.x),
      (t[e + 8] = l.y),
      (t[e + 9] = u)
  },
  ps = (t) => {
    const e = new Float32Array(8)
    return (
      (e[0] = t[3].x),
      (e[1] = t[3].y),
      (e[2] = t[0].x),
      (e[3] = t[0].y),
      (e[4] = t[2].x),
      (e[5] = t[2].y),
      (e[6] = t[1].x),
      (e[7] = t[1].y),
      e
    )
  },
  hs = (t, e = 0, n, o) => {
    const i = qt(t),
      r = t.x + 0.5 * t.width,
      a = t.y + 0.5 * t.height
    return (n || o) && lt(i, n, o, r, a), 0 !== e && ct(i, e, r, a), i
  },
  gs = (t, e, n, o, i) => {
    const r = Math.min(20, Math.max(4, Math.round(o / 2)))
    let a = 0,
      s = 0,
      l = 0,
      c = 0,
      u = 0
    for (; u < r; u++)
      (a = u / r),
        (s = i * W + a * W),
        (l = o * Math.cos(s)),
        (c = o * Math.sin(s)),
        t.push(j(e + l, n + c))
  },
  ms = new Float32Array([0, 1, 0, 0, 1, 1, 1, 0])
var fs = (t, e, n, o) => {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    f,
    $ = { width: 0, height: 0 },
    y = { width: 0, height: 0 },
    x = o,
    b = [0, 0, 0]
  const v = new Map([]),
    w = us(30),
    S = Math.tan(w / 2),
    k = Za(t, { antialias: !1, alpha: !1, premultipliedAlpha: !0 })
  if (!k) return
  k.getExtension('OES_standard_derivatives'),
    k.disable(k.DEPTH_TEST),
    k.enable(k.BLEND),
    k.blendFunc(k.ONE, k.ONE_MINUS_SRC_ALPHA),
    k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0)
  const C = k.createTexture()
  k.bindTexture(k.TEXTURE_2D, C),
    k.texImage2D(
      k.TEXTURE_2D,
      0,
      k.RGBA,
      1,
      1,
      0,
      k.RGBA,
      k.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    ),
    v.set(0, C)
  const M = k.createTexture()
  v.set(1, M)
  const R = k.createFramebuffer(),
    T = ((t, e) => rs(t, t.createTexture(), e))(k, e)
  v.set(2, T)
  const P = k.createBuffer(),
    E = k.createBuffer()
  k.bindBuffer(k.ARRAY_BUFFER, E), k.bufferData(k.ARRAY_BUFFER, ms, k.STATIC_DRAW)
  const A = os(
    k,
    '\n##head\n##text\nvoid main(){vTexCoord=aTexCoord;gl_Position=uMatrix*aPosition;}',
    '\n##head\nin vec2 vTexCoord;uniform sampler2D uTexture;uniform sampler2D uTextureMarkup;uniform vec2 uTextureSize;uniform float uOpacity;uniform vec4 uFillColor;uniform vec4 uOverlayColor;uniform mat4 uColorMatrix;uniform vec4 uColorOffset;uniform float uClarityKernel[9];uniform float uClarityKernelWeight;uniform float uColorGamma;uniform float uColorVignette;uniform float uMaskClip;uniform float uMaskOpacity;uniform float uMaskBounds[4];uniform float uMaskCornerRadius[4];uniform float uMaskFeather[8];vec4 applyGamma(vec4 c,float g){c.r=pow(c.r,g);c.g=pow(c.g,g);c.b=pow(c.b,g);return c;}vec4 applyColorMatrix(vec4 c,mat4 m,vec4 o){vec4 cM=(c*m)+o;cM*=cM.a;return cM;}vec4 applyConvolutionMatrix(vec4 c,float k0,float k1,float k2,float k3,float k4,float k5,float k6,float k7,float k8,float w){vec2 pixel=vec2(1)/uTextureSize;vec4 colorSum=texture(uTexture,vTexCoord-pixel)*k0+texture(uTexture,vTexCoord+pixel*vec2(0.0,-1.0))*k1+texture(uTexture,vTexCoord+pixel*vec2(1.0,-1.0))*k2+texture(uTexture,vTexCoord+pixel*vec2(-1.0,0.0))*k3+texture(uTexture,vTexCoord)*k4+texture(uTexture,vTexCoord+pixel*vec2(1.0,0.0))*k5+texture(uTexture,vTexCoord+pixel*vec2(-1.0,1.0))*k6+texture(uTexture,vTexCoord+pixel*vec2(0.0,1.0))*k7+texture(uTexture,vTexCoord+pixel)*k8;vec4 color=vec4((colorSum/w).rgb,c.a);color.rgb=clamp(color.rgb,0.0,1.0);return color;}vec4 applyVignette(vec4 c,vec2 pos,vec2 center,float v){float d=distance(pos,center)/length(center);float f=1.0-(d*abs(v));if(v>0.0){c.rgb*=f;}else if(v<0.0){c.rgb+=(1.0-f)*(1.0-c.rgb);}return c;}vec4 blendPremultipliedAlpha(vec4 back,vec4 front){return front+(back*(1.0-front.a));}void main(){float x=gl_FragCoord.x;float y=gl_FragCoord.y;float a=1.0;float maskTop=uMaskBounds[0];float maskRight=uMaskBounds[1];float maskBottom=uMaskBounds[2];float maskLeft=uMaskBounds[3];float leftFeatherOpacity=step(uMaskFeather[1],x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],x));a*=leftFeatherOpacity*rightFeatherOpacity;float overlayColorAlpha=(smoothstep(maskLeft,maskLeft+1.0,x)*(1.0-smoothstep(maskRight-1.0,maskRight,x))*(1.0-step(maskTop,y))*step(maskBottom,y));if(uOverlayColor.a==0.0){a*=overlayColorAlpha;}vec2 offset=vec2(maskLeft,maskBottom);vec2 size=vec2(maskRight-maskLeft,maskTop-maskBottom)*.5;vec2 center=offset.xy+size.xy;int pixelX=int(step(center.x,x));int pixelY=int(step(y,center.y));float cornerRadius=0.0;if(pixelX==0&&pixelY==0)cornerRadius=uMaskCornerRadius[0];if(pixelX==1&&pixelY==0)cornerRadius=uMaskCornerRadius[1];if(pixelX==0&&pixelY==1)cornerRadius=uMaskCornerRadius[2];if(pixelX==1&&pixelY==1)cornerRadius=uMaskCornerRadius[3];float cornerOffset=sign(cornerRadius)*length(max(abs(gl_FragCoord.xy-size-offset)-size+cornerRadius,0.0))-cornerRadius;float cornerOpacity=1.0-smoothstep(0.0,1.0,cornerOffset);a*=cornerOpacity;vec2 scaledPoint=vec2(vTexCoord.x*uTextureSize.x,vTexCoord.y*uTextureSize.y);a*=smoothstep(0.0,1.0,uTextureSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uTextureSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);vec4 color=texture(uTexture,vTexCoord);if(uClarityKernelWeight!=-1.0){color=applyConvolutionMatrix(color,uClarityKernel[0],uClarityKernel[1],uClarityKernel[2],uClarityKernel[3],uClarityKernel[4],uClarityKernel[5],uClarityKernel[6],uClarityKernel[7],uClarityKernel[8],uClarityKernelWeight);}color=applyGamma(color,uColorGamma);color=applyColorMatrix(color,uColorMatrix,uColorOffset);color=blendPremultipliedAlpha(uFillColor,color);color*=a;if(uColorVignette!=0.0){vec2 pos=gl_FragCoord.xy-offset;color=applyVignette(color,pos,center-offset,uColorVignette);}color=blendPremultipliedAlpha(color,texture(uTextureMarkup,vTexCoord));vec4 overlayColor=uOverlayColor*(1.0-overlayColorAlpha);overlayColor.rgb*=overlayColor.a;color=blendPremultipliedAlpha(color,overlayColor);if(uOverlayColor.a>0.0&&color.a<1.0&&uFillColor.a>0.0){color=blendPremultipliedAlpha(uFillColor,overlayColor);}color*=uOpacity;fragColor=color;}',
    ['aPosition', 'aTexCoord'],
    [
      'uMatrix',
      'uTexture',
      'uTextureMarkup',
      'uTextureSize',
      'uColorGamma',
      'uColorVignette',
      'uColorOffset',
      'uColorMatrix',
      'uClarityKernel',
      'uClarityKernelWeight',
      'uOpacity',
      'uMaskOpacity',
      'uMaskBounds',
      'uMaskCornerRadius',
      'uMaskFeather',
      'uFillColor',
      'uOverlayColor',
    ]
  )
  let I
  k.useProgram(A.program)
  const L = [0, 0, 0, 0, 1, 0, 0, 0, 0],
    F = os(
      k,
      '#version 300 es\n\nin vec4 aPosition;in vec2 aNormal;in float aMiter;out vec2 vNormal;out float vMiter;uniform float uWidth;uniform mat4 uMatrix;void main(){vMiter=aMiter;vNormal=aNormal;float w=uWidth;gl_Position=uMatrix*vec4(aPosition.x+(aNormal.x*w*.5*aMiter),aPosition.y+(aNormal.y*w*.5*aMiter),0,1);}',
      '\n##head\n##mask\nin vec2 vNormal;in float vMiter;uniform float uWidth;uniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;float w=(uWidth-1.0)*.5;float d=1.0-abs(vMiter);float m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);fillColor.a*=clamp(smoothstep(0.25,1.0,d*w),0.0,1.0);fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}',
      ['aPosition', 'aNormal', 'aMiter'],
      ['uColor', 'uCanvasColor', 'uMatrix', 'uWidth', 'uMaskBounds', 'uMaskOpacity']
    ),
    B = k.createBuffer(),
    z = (t, e, n, o) => {
      const { program: i, locations: r } = F
      k.useProgram(i),
        k.enableVertexAttribArray(r.aPosition),
        k.enableVertexAttribArray(r.aNormal),
        k.enableVertexAttribArray(r.aMiter)
      const a = ((t, e) => {
          let n,
            o,
            i,
            r = 0
          const a = t.length,
            s = new Float32Array(10 * (e ? a + 1 : a)),
            l = t[0],
            c = t[a - 1]
          for (r = 0; r < a; r++)
            (n = t[r - 1]),
              (o = t[r]),
              (i = t[r + 1]),
              n || (n = e ? c : j(o.x + (o.x - i.x), o.y + (o.y - i.y))),
              i || (i = e ? l : j(o.x + (o.x - n.x), o.y + (o.y - n.y))),
              ds(s, 10 * r, n, o, i)
          return e && ds(s, 10 * a, c, l, t[1]), s
        })(t, o),
        s = 5 * Float32Array.BYTES_PER_ELEMENT,
        c = 2 * Float32Array.BYTES_PER_ELEMENT,
        u = 4 * Float32Array.BYTES_PER_ELEMENT
      k.uniform1f(r.uWidth, e + 2),
        k.uniform4fv(r.uColor, n),
        k.uniformMatrix4fv(r.uMatrix, !1, l),
        k.uniform4f(r.uCanvasColor, b[0], b[1], b[2], 1),
        k.uniform1fv(r.uMaskBounds, f),
        k.uniform1f(r.uMaskOpacity, g),
        k.bindBuffer(k.ARRAY_BUFFER, B),
        k.bufferData(k.ARRAY_BUFFER, a, k.STATIC_DRAW),
        k.vertexAttribPointer(r.aPosition, 2, k.FLOAT, !1, s, 0),
        k.vertexAttribPointer(r.aNormal, 2, k.FLOAT, !1, s, c),
        k.vertexAttribPointer(r.aMiter, 1, k.FLOAT, !1, s, u),
        k.drawArrays(k.TRIANGLE_STRIP, 0, a.length / 5),
        k.disableVertexAttribArray(r.aPosition),
        k.disableVertexAttribArray(r.aNormal),
        k.disableVertexAttribArray(r.aMiter)
    },
    O = os(
      k,
      '\n##head\nvoid main(){\n##matrix\n}',
      '\n##head\n##mask\nuniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;\n##maskapply\nfillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}',
      ['aPosition'],
      ['uColor', 'uCanvasColor', 'uMatrix', 'uMaskBounds', 'uMaskOpacity']
    ),
    _ = k.createBuffer(),
    W = os(
      k,
      '\n##head\n##text\nin vec2 aRectCoord;out vec2 vRectCoord;void main(){vTexCoord=aTexCoord;vRectCoord=aRectCoord;\n##matrix\n}',
      '\n##head\n##mask\nin vec2 vTexCoord;in vec2 vRectCoord;uniform sampler2D uTexture;uniform vec4 uTextureColor;uniform float uTextureOpacity;uniform vec4 uColor;uniform float uCornerRadius[4];uniform vec2 uSize;uniform vec2 uPosition;uniform vec4 uCanvasColor;void main(){\n##init\n##colorize\n##edgeaa\n##cornerradius\n##maskfeatherapply\n##maskapply\n##fragcolor\n}',
      ['aPosition', 'aTexCoord', 'aRectCoord'],
      [
        'uTexture',
        'uColor',
        'uMatrix',
        'uCanvasColor',
        'uTextureColor',
        'uTextureOpacity',
        'uPosition',
        'uSize',
        'uMaskBounds',
        'uMaskOpacity',
        'uMaskFeather',
        'uCornerRadius',
      ]
    ),
    V = k.createBuffer(),
    N = k.createBuffer(),
    U = k.createBuffer(),
    H = [0, 0, 0, 0],
    X = os(
      k,
      '\n##head\n##text\nout vec2 vTexCoordDouble;void main(){vTexCoordDouble=vec2(aTexCoord.x*2.0-1.0,aTexCoord.y*2.0-1.0);vTexCoord=aTexCoord;\n##matrix\n}',
      '\n##head\n##mask\nin vec2 vTexCoord;in vec2 vTexCoordDouble;uniform sampler2D uTexture;uniform float uTextureOpacity;uniform vec2 uRadius;uniform vec4 uColor;uniform int uInverted;uniform vec4 uCanvasColor;void main(){\n##init\nfloat ar=uRadius.x/uRadius.y;vec2 rAA=vec2(uRadius.x-1.0,uRadius.y-(1.0/ar));vec2 scaledPointSq=vec2((vTexCoordDouble.x*uRadius.x)*(vTexCoordDouble.x*uRadius.x),(vTexCoordDouble.y*uRadius.y)*(vTexCoordDouble.y*uRadius.y));float p=(scaledPointSq.x/(uRadius.x*uRadius.x))+(scaledPointSq.y/(uRadius.y*uRadius.y));float pAA=(scaledPointSq.x/(rAA.x*rAA.x))+(scaledPointSq.y/(rAA.y*rAA.y));a=smoothstep(1.0,p/pAA,p);if(uInverted==1)a=1.0-a;\n##maskapply\n##fragcolor\n}',
      ['aPosition', 'aTexCoord'],
      [
        'uTexture',
        'uTextureOpacity',
        'uColor',
        'uCanvasColor',
        'uMatrix',
        'uRadius',
        'uInverted',
        'uMaskBounds',
        'uMaskOpacity',
      ]
    ),
    Y = k.createBuffer(),
    G = k.createBuffer(),
    Z = (t, e, n, o) => {
      if (!n || !o) return ms
      let i = o.x / n.width,
        r = o.y / n.height,
        a = t / n.width / x,
        s = e / n.height / x
      ;(a -= i), (s -= r)
      return new Float32Array([-i, s, -i, -r, a, s, a, -r])
    },
    q = new Map()
  return {
    textureCreate: () => k.createTexture(),
    textureUpdate: (t, e) => (q.set(t, e), rs(k, t, e)),
    textureSize: (t) => pt(q.get(t)),
    textureDelete: (t) => {
      const e = q.get(t)
      e instanceof HTMLCanvasElement && m(e), q.delete(t), k.deleteTexture(t)
    },
    drawPath: (t, e, n, o) => {
      t.length < 2 ||
        z(
          t.map((t) => ({ x: t.x * x, y: t.y * x })),
          e * x,
          as(n, o),
          !1
        )
    },
    drawTriangle: (t, e = 0, n = !1, o = !1, i, r) => {
      if (!i) return
      const a = t.map((t) => ({ x: t.x * x, y: t.y * x })),
        s = te(a)
      ;(n || o) && lt(a, n, o, s.x, s.y), ct(a, e, s.x, s.y)
      ;((t, e) => {
        const { program: n, locations: o } = O
        k.useProgram(n),
          k.enableVertexAttribArray(o.aPosition),
          k.uniform4fv(o.uColor, e),
          k.uniformMatrix4fv(o.uMatrix, !1, l),
          k.uniform1fv(o.uMaskBounds, f),
          k.uniform1f(o.uMaskOpacity, g),
          k.uniform4f(o.uCanvasColor, b[0], b[1], b[2], 1),
          k.bindBuffer(k.ARRAY_BUFFER, _),
          k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
          k.vertexAttribPointer(o.aPosition, 2, k.FLOAT, !1, 0, 0),
          k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
          k.disableVertexAttribArray(o.aPosition)
      })(
        ((t) => {
          const e = new Float32Array(6)
          return (
            (e[0] = t[0].x),
            (e[1] = t[0].y),
            (e[2] = t[1].x),
            (e[3] = t[1].y),
            (e[4] = t[2].x),
            (e[5] = t[2].y),
            e
          )
        })(a),
        as(i, r)
      )
    },
    drawRect: (t, n = 0, o = !1, i = !1, r, a, s, c, u, d, p, h, m, y) => {
      let v = Ot(Rt(t), x)
      const w = r
        .map((e) =>
          ((t, e) => Math.floor(Mr(t, 0, Math.min(0.5 * (e.width - 1), 0.5 * (e.height - 1)))))(
            e || 0,
            t
          )
        )
        .map((t) => t * x)
      if (a || s) {
        const t = Rt(v)
        ;(t.x -= 0.5), (t.y -= 0.5), (t.width += 1), (t.height += 1)
        const r = hs(t, n, o, i),
          d = ps(r)
        let p
        y && ((p = as(y)), 0 === p[3] && (p[3] = 0.001)),
          ((
            t,
            n,
            o,
            i,
            r,
            a = C,
            s = 1,
            c = H,
            u = ms,
            d = [1, 0, 1, 0, 1, Math.max($.width, e.width), 1, Math.max($.width, e.width)]
          ) => {
            const { program: p, locations: h } = W
            k.useProgram(p),
              k.enableVertexAttribArray(h.aPosition),
              k.enableVertexAttribArray(h.aTexCoord),
              k.enableVertexAttribArray(h.aRectCoord),
              k.uniform4fv(h.uColor, r),
              k.uniform2fv(h.uSize, [n, o]),
              k.uniform2fv(h.uPosition, [t[2], t[3]]),
              k.uniform1fv(h.uCornerRadius, i),
              k.uniform4f(h.uCanvasColor, b[0], b[1], b[2], 1),
              k.uniform1fv(
                h.uMaskFeather,
                d.map((t, e) => (e % 2 == 0 ? t : t * x))
              ),
              k.uniform1fv(h.uMaskBounds, f),
              k.uniform1f(h.uMaskOpacity, g),
              k.uniformMatrix4fv(h.uMatrix, !1, l),
              k.uniform1i(h.uTexture, 3),
              k.uniform4fv(h.uTextureColor, c),
              k.uniform1f(h.uTextureOpacity, s),
              k.activeTexture(k.TEXTURE0 + 3),
              k.bindTexture(k.TEXTURE_2D, a),
              k.bindBuffer(k.ARRAY_BUFFER, N),
              k.bufferData(k.ARRAY_BUFFER, u, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aTexCoord, 2, k.FLOAT, !1, 0, 0),
              k.bindBuffer(k.ARRAY_BUFFER, U),
              k.bufferData(k.ARRAY_BUFFER, ms, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aRectCoord, 2, k.FLOAT, !1, 0, 0),
              k.bindBuffer(k.ARRAY_BUFFER, V),
              k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aPosition, 2, k.FLOAT, !1, 0, 0),
              k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
              k.disableVertexAttribArray(h.aPosition),
              k.disableVertexAttribArray(h.aTexCoord),
              k.disableVertexAttribArray(h.aRectCoord)
          })(d, t.width, t.height, w, as(a, h), s, h, p, Z(t.width, t.height, c, u), m)
      }
      d &&
        ((d = Math.min(d, v.width, v.height)),
        z(
          ((t, e, n, o, i, r, a, s) => {
            const l = []
            if (r.every((t) => 0 === t)) l.push(j(t, e), j(t + n, e), j(t + n, e + o), j(t, e + o))
            else {
              const [i, a, s, c] = r,
                u = t,
                d = t + n,
                p = e,
                h = e + o
              l.push(j(u + i, p)),
                gs(l, d - a, p + a, a, -1),
                l.push(j(d, p + a)),
                gs(l, d - c, h - c, c, 0),
                l.push(j(d - c, h)),
                gs(l, u + s, h - s, s, 1),
                l.push(j(u, h - s)),
                gs(l, u + i, p + i, i, 2)
            }
            return (
              (a || s) && lt(l, a, s, t + 0.5 * n, e + 0.5 * o),
              i && ct(l, i, t + 0.5 * n, e + 0.5 * o),
              l
            )
          })(v.x, v.y, v.width, v.height, n, w, o, i),
          d * x,
          as(p, h),
          !0
        ))
    },
    drawEllipse: (t, e, n, o, i, r, a, s, c, u, d, p, h, m) => {
      let $ = Ot(Ft(t.x - e, t.y - n, 2 * e, 2 * n), x)
      if (a || s) {
        const t = Rt($)
        ;(t.x -= 0.5), (t.y -= 0.5), (t.width += 1), (t.height += 1)
        const e = hs(t, o, i, r)
        ;((t, e, n, o, i = C, r = ms, a = 1, s = !1) => {
          const { program: c, locations: u } = X
          k.useProgram(c),
            k.enableVertexAttribArray(u.aPosition),
            k.enableVertexAttribArray(u.aTexCoord),
            k.uniformMatrix4fv(u.uMatrix, !1, l),
            k.uniform2fv(u.uRadius, [0.5 * e, 0.5 * n]),
            k.uniform1i(u.uInverted, s ? 1 : 0),
            k.uniform4fv(u.uColor, o),
            k.uniform4f(u.uCanvasColor, b[0], b[1], b[2], 1),
            k.uniform1fv(u.uMaskBounds, f),
            k.uniform1f(u.uMaskOpacity, g),
            k.uniform1i(u.uTexture, 3),
            k.uniform1f(u.uTextureOpacity, a),
            k.activeTexture(k.TEXTURE0 + 3),
            k.bindTexture(k.TEXTURE_2D, i),
            k.bindBuffer(k.ARRAY_BUFFER, G),
            k.bufferData(k.ARRAY_BUFFER, r, k.STATIC_DRAW),
            k.vertexAttribPointer(u.aTexCoord, 2, k.FLOAT, !1, 0, 0),
            k.bindBuffer(k.ARRAY_BUFFER, Y),
            k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
            k.vertexAttribPointer(u.aPosition, 2, k.FLOAT, !1, 0, 0),
            k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
            k.disableVertexAttribArray(u.aPosition),
            k.disableVertexAttribArray(u.aTexCoord)
        })(ps(e), t.width, t.height, as(a, h), s, Z(t.width, t.height, c, u), h, m)
      }
      d &&
        z(
          ((t, e, n, o, i, r, a) => {
            const s = 0.5 * Math.abs(n),
              l = 0.5 * Math.abs(o),
              c = Math.abs(n) + Math.abs(o),
              u = Math.max(20, Math.round(c / 6))
            return re(j(t + s, e + l), s, l, i, r, a, u)
          })($.x, $.y, $.width, $.height, o, i, r),
          d * x,
          as(p, h),
          !0
        )
    },
    drawPreviewImage: (
      t,
      n,
      o,
      a,
      s,
      l,
      c,
      u,
      d,
      p = 1,
      h,
      m = 1,
      $ = 0,
      b = [1, 0, 1, 0, 1, y.width, 1, y.width],
      S = [0, 0, 0, 0],
      C = [0, 0, 0, 0],
      M = [0, 0, 0, 0],
      R = !0
    ) => {
      const { program: T, locations: F } = A
      var B, z
      ;(o *= x),
        (a *= x),
        (t *= x),
        (n *= x),
        (I = ss()),
        ((t, e, n, o, i) => {
          const r = 1 / Math.tan(e / 2),
            a = 1 / (o - i)
          ;(t[0] = r / n),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = r),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = (i + o) * a),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 2 * i * o * a),
            (t[15] = 0)
        })(I, w, i, 1, 2 * -r),
        cs(I, o, -a, r),
        cs(I, t, -n, 0),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[0],
            r = t[1],
            a = t[2],
            s = t[3],
            l = t[4],
            c = t[5],
            u = t[6],
            d = t[7]
          ;(t[0] = i * o + l * n),
            (t[1] = r * o + c * n),
            (t[2] = a * o + u * n),
            (t[3] = s * o + d * n),
            (t[4] = l * o - i * n),
            (t[5] = c * o - r * n),
            (t[6] = u * o - a * n),
            (t[7] = d * o - s * n)
        })(I, -c),
        (z = u),
        ((B = I)[0] = B[0] * z),
        (B[1] = B[1] * z),
        (B[2] = B[2] * z),
        (B[3] = B[3] * z),
        (B[4] = B[4] * z),
        (B[5] = B[5] * z),
        (B[6] = B[6] * z),
        (B[7] = B[7] * z),
        (B[8] = B[8] * z),
        (B[9] = B[9] * z),
        (B[10] = B[10] * z),
        (B[11] = B[11] * z),
        cs(I, -t, n, 0),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[0],
            r = t[1],
            a = t[2],
            s = t[3],
            l = t[8],
            c = t[9],
            u = t[10],
            d = t[11]
          ;(t[0] = i * o - l * n),
            (t[1] = r * o - c * n),
            (t[2] = a * o - u * n),
            (t[3] = s * o - d * n),
            (t[8] = i * n + l * o),
            (t[9] = r * n + c * o),
            (t[10] = a * n + u * o),
            (t[11] = s * n + d * o)
        })(I, l),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[4],
            r = t[5],
            a = t[6],
            s = t[7],
            l = t[8],
            c = t[9],
            u = t[10],
            d = t[11]
          ;(t[4] = i * o + l * n),
            (t[5] = r * o + c * n),
            (t[6] = a * o + u * n),
            (t[7] = s * o + d * n),
            (t[8] = l * o - i * n),
            (t[9] = c * o - r * n),
            (t[10] = u * o - a * n),
            (t[11] = d * o - s * n)
        })(I, s),
        k.useProgram(T),
        k.enableVertexAttribArray(F.aPosition),
        k.enableVertexAttribArray(F.aTexCoord),
        k.uniform1i(F.uTexture, 2),
        k.uniform2f(F.uTextureSize, e.width, e.height),
        k.activeTexture(k.TEXTURE0 + 2),
        k.bindTexture(k.TEXTURE_2D, v.get(2))
      const D = R ? 1 : 0,
        O = v.get(D)
      let _
      k.uniform1i(F.uTextureMarkup, D),
        k.activeTexture(k.TEXTURE0 + D),
        k.bindTexture(k.TEXTURE_2D, O),
        k.bindBuffer(k.ARRAY_BUFFER, P),
        k.vertexAttribPointer(F.aPosition, 3, k.FLOAT, !1, 0, 0),
        k.bindBuffer(k.ARRAY_BUFFER, E),
        k.vertexAttribPointer(F.aTexCoord, 2, k.FLOAT, !1, 0, 0),
        k.uniformMatrix4fv(F.uMatrix, !1, I),
        k.uniform4fv(F.uOverlayColor, M),
        k.uniform4fv(F.uFillColor, C),
        !h || Ar(h, L)
          ? ((h = L), (_ = -1))
          : ((_ = h.reduce((t, e) => t + e, 0)), (_ = _ <= 0 ? 1 : _)),
        k.uniform1fv(F.uClarityKernel, h),
        k.uniform1f(F.uClarityKernelWeight, _),
        k.uniform1f(F.uColorGamma, 1 / m),
        k.uniform1f(F.uColorVignette, $),
        k.uniform4f(F.uColorOffset, d[4], d[9], d[14], d[19]),
        k.uniformMatrix4fv(F.uColorMatrix, !1, [
          d[0],
          d[1],
          d[2],
          d[3],
          d[5],
          d[6],
          d[7],
          d[8],
          d[10],
          d[11],
          d[12],
          d[13],
          d[15],
          d[16],
          d[17],
          d[18],
        ]),
        k.uniform1f(F.uOpacity, p),
        k.uniform1f(F.uMaskOpacity, g),
        k.uniform1fv(F.uMaskBounds, f),
        k.uniform1fv(
          F.uMaskCornerRadius,
          S.map((t) => t * x)
        ),
        k.uniform1fv(
          F.uMaskFeather,
          b.map((t, e) => (e % 2 == 0 ? t : t * x))
        ),
        k.drawArrays(k.TRIANGLE_STRIP, 0, 4),
        k.disableVertexAttribArray(F.aPosition),
        k.disableVertexAttribArray(F.aTexCoord)
    },
    setCanvasColor(t) {
      b = t
    },
    drawToCanvas() {
      k.bindFramebuffer(k.FRAMEBUFFER, null),
        (l = a),
        k.viewport(0, 0, k.drawingBufferWidth, k.drawingBufferHeight),
        k.colorMask(!0, !0, !0, !1),
        k.clearColor(b[0], b[1], b[2], 1),
        k.clear(k.COLOR_BUFFER_BIT)
    },
    drawToFramebuffer() {
      k.bindFramebuffer(k.FRAMEBUFFER, R),
        (l = s),
        k.viewport(0, 0, e.width, e.height),
        k.colorMask(!0, !0, !0, !0),
        k.clearColor(0, 0, 0, 0),
        k.clear(k.COLOR_BUFFER_BIT)
    },
    enableMask(t, e) {
      const n = t.x * x,
        o = t.y * x,
        i = t.width * x,
        r = t.height * x
      ;(h = n),
        (d = h + i),
        (u = $.height - o),
        (p = $.height - (o + r)),
        (g = 1 - e),
        (f = [u, d, p, h])
    },
    disableMask() {
      ;(h = 0), (d = $.width), (u = $.height), (p = 0), (g = 1), (f = [u, d, p, h])
    },
    resize: (o, l, u) => {
      ;(x = u),
        (y.width = o),
        (y.height = l),
        ($.width = o * x),
        ($.height = l * x),
        (i = D($.width, $.height)),
        (t.width = $.width),
        (t.height = $.height),
        (a = ss()),
        ls(a, 0, $.width, $.height, 0, -1, 1),
        (s = ss())
      const d = n.width * x,
        p = n.height * x
      var h, g
      ls(s, 0, d, p, 0, -1, 1),
        cs(s, 0, p, 0),
        (g = 1),
        ((h = s)[0] = h[0] * g),
        (h[1] = h[1] * g),
        (h[2] = h[2] * g),
        (h[3] = h[3] * g),
        ((t, e) => {
          ;(t[4] = t[4] * e), (t[5] = t[5] * e), (t[6] = t[6] * e), (t[7] = t[7] * e)
        })(s, -1),
        k.bindTexture(k.TEXTURE_2D, v.get(1)),
        k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, e.width, e.height, 0, k.RGBA, k.UNSIGNED_BYTE, null),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.LINEAR),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE),
        k.bindFramebuffer(k.FRAMEBUFFER, R),
        k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, k.TEXTURE_2D, v.get(1), 0)
      const m = n.width * x,
        f = n.height * x,
        b = -0.5 * m,
        w = 0.5 * f,
        C = 0.5 * m,
        M = -0.5 * f
      ;(c = new Float32Array([b, M, 0, b, w, 0, C, M, 0, C, w, 0])),
        k.bindBuffer(k.ARRAY_BUFFER, P),
        k.bufferData(k.ARRAY_BUFFER, c, k.STATIC_DRAW),
        (r = (n.height / 2 / S) * ($.height / n.height) * -1)
    },
    release() {
      ;(t.width = 1), (t.height = 1)
    },
  }
}
function $s(t) {
  let e, n, o, i
  return {
    c() {
      ;(e = qo('div')), (n = qo('canvas')), ii(e, 'class', 'PinturaCanvas')
    },
    m(r, a) {
      Go(r, e, a),
        Yo(e, n),
        t[20](n),
        o || ((i = [ei(n, 'measure', t[4]), Wo(Ua.call(null, n))]), (o = !0))
    },
    p: ko,
    i: ko,
    o: ko,
    d(n) {
      n && Zo(e), t[20](null), (o = !1), Po(i)
    },
  }
}
function ys(t, e, n) {
  let o, r, a, s, l, c
  const u = xi(),
    d = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
  let { animate: p } = e,
    { imageData: h } = e,
    { imageSize: g } = e,
    { imageProps: f } = e,
    { imagePreviews: $ = [] } = e,
    { maskRect: y } = e,
    { pixelRatio: x = 1 } = e,
    { willRender: b = O } = e,
    { loadImageData: v = O } = e,
    { backgroundColor: S } = e
  const k = (t, e) => t.set(e, { hard: !p }),
    C = (t, e) => {
      const [n, o, i] = t,
        [r, a, s, l] = e
      return [r * l + n * (1 - l), a * l + o * (1 - l), s * l + i * (1 - l), 1]
    },
    M = { precision: 1e-4 },
    R = { precision: 0.01 * M.precision },
    T = Ea(void 0, { duration: 250 })
  Fo(t, T, (t) => n(23, (l = t)))
  const P = Ia(void 0, M),
    E = Ia(void 0, R),
    A = Ia(void 0, M),
    I = Ia(void 0, R),
    L = Ia(void 0, R),
    F = Ia(void 0, R),
    B = Ia(void 0, R),
    z = Ia([...d], M),
    _ = ar(void 0),
    W = Ia(0, R),
    V = Ia(1, R),
    N = ar()
  Fo(t, N, (t) => n(25, (c = t)))
  const U = ar(),
    H = sr(
      [A, P, I, E, L, W, z, N, V, _, F, B, U, T],
      ([t, e, n, o, i, r, a, s, l, c, u, d, p, h], g) => {
        if (!f || !h) return g(void 0)
        const m = Mr(l, 0, 1)
        g({
          origin: t,
          translation: e,
          perspective: n,
          rotation: o,
          scale: i,
          colorMatrix: a,
          opacity: Mr(r, 0, 1),
          clarity: c,
          gamma: u,
          vignette: d,
          mask: s,
          maskOpacity: m,
          overlayColor: [h[0], h[1], h[2], m],
          backgroundColor: p,
        })
      }
    )
  let X
  Fo(t, H, (t) => n(19, (s = t)))
  let Y = null,
    G = null,
    Z = null
  const q = ({
      origin: t,
      translation: e,
      rotation: n,
      scale: o,
      colorMatrix: i,
      opacity: r,
      clarity: a,
      gamma: s,
      vignette: c,
      offset: u,
      maskFeather: p,
      maskCornerRadius: h,
      backgroundColor: g,
      overlayColor: m,
      enableShapes: f,
    }) => {
      let $ = e.x,
        y = e.y
      u && (($ += u.x - 0.5 * G), (y += u.y - 0.5 * Z)),
        g[3] < 1 && g[3] > 0 && (g = C(l, g)),
        Y.drawPreviewImage(t.x, t.y, $, y, n.x, n.y, n.z, o, i || d, r, a, s, c, p, h, g, m, f)
    },
    K = new Map([]),
    Q = tn(),
    J = (t) => {
      let {
        text: e,
        textAlign: n,
        fontFamily: o,
        fontSize: i,
        fontWeight: r,
        fontVariant: a,
        fontStyle: s,
        lineHeight: l,
        width: c,
      } = t
      en(Q, {
        fontSize: i,
        fontFamily: o,
        fontWeight: r,
        fontVariant: a,
        fontStyle: s,
        textAlign: n,
      })
      const u = c ? sn(Q, e, c) : e,
        d = (({
          text: t,
          textAlign: e,
          fontSize: n,
          fontFamily: o,
          lineHeight: i,
          fontWeight: r,
          fontStyle: a,
          fontVariant: s,
        }) => `${[t, e, n, r, a, s, o].join('_')}_${Ue(i) ? i(n) : i}`)({ ...t, text: u })
      if (!K.has(d)) {
        const t = tn()
        en(t, {
          fontSize: i,
          fontFamily: o,
          fontWeight: r,
          fontVariant: a,
          fontStyle: s,
          textAlign: n,
        }),
          ((t, e, n) => {
            const { width: o, height: i } = on(t, e, nn(n.fontSize, n.lineHeight))
            ;(t.canvas.width = Math.ceil(o)), (t.canvas.height = Math.ceil(i))
          })(t, u, {
            fontSize: i,
            fontFamily: o,
            fontWeight: r,
            fontVariant: a,
            fontStyle: s,
            textAlign: n,
            lineHeight: l,
          })
        const e = t.canvas.width
        ;(t.canvas.width += 20),
          en(t, {
            fontSize: i,
            fontFamily: o,
            fontWeight: r,
            fontVariant: a,
            fontStyle: s,
            textAlign: n,
            color: [1, 0, 1],
          }),
          ln(t, u, { fontSize: i, textAlign: n, lineHeight: l, lineWidth: e }),
          K.set(d, Y.textureUpdate(Y.textureCreate(), t.canvas))
      }
      return K.get(d)
    },
    tt = (t) => {
      let e
      if (t.backgroundImage)
        e = (({ backgroundImage: t }) => {
          if (!K.has(t)) {
            const e = Y.textureCreate()
            K.set(t, void 0),
              v(t)
                .then((n) => {
                  K.set(t, e), Y.textureUpdate(e, n), requestAnimationFrame(a)
                })
                .catch((t) => {
                  console.error(t)
                })
          }
          return K.get(t)
        })(t)
      else if (w(t.text)) {
        if ((t.width && t.width < 1) || (t.height && t.height < 1)) return
        e = J(t)
      }
      return e
    },
    et = (t = []) =>
      t
        .map((t) => {
          let e = tt(t)
          if (He(t.points))
            3 === t.points.length && t.backgroundColor
              ? Y.drawTriangle(
                  t.points,
                  t.rotation,
                  t.flipX,
                  t.flipY,
                  t.backgroundColor,
                  t.strokeWidth,
                  t.strokeColor,
                  t.opacity
                )
              : Y.drawPath(t.points, t.strokeWidth, t.strokeColor, t.opacity)
          else if (We(t.rx)) {
            let n, o
            Y.drawEllipse(
              t,
              t.rx,
              t.ry,
              t.rotation,
              t.flipX,
              t.flipY,
              t.backgroundColor,
              e,
              n,
              o,
              t.strokeWidth,
              t.strokeColor,
              t.opacity,
              t.inverted
            )
          } else if ((w(t.text) && e) || t.width) {
            const n = e && Y.textureSize(e)
            let o,
              i,
              r,
              a = void 0,
              s = [t.cornerRadius, t.cornerRadius, t.cornerRadius, t.cornerRadius]
            if (((o = t.width ? t : { x: t.x, y: t.y, ...n }), n)) {
              if (t.backgroundImage && t.backgroundSize) {
                const e = D(n.width, n.height)
                if ('contain' === t.backgroundSize) {
                  const n = Gt(t, e, o)
                  ;(i = ht(n)), (r = j(0.5 * (t.width - i.width), 0.5 * (t.height - i.height)))
                } else if ('cover' === t.backgroundSize) {
                  const n = Yt(t, e, o)
                  ;(i = ht(n)),
                    (r = j(n.x, n.y)),
                    (r = j(0.5 * (t.width - i.width), 0.5 * (t.height - i.height)))
                }
              } else
                t.text && t.width
                  ? ((i = n),
                    (r = j(0, 0)),
                    t.height || (t.height = n.height),
                    (t.x -= 20),
                    (t.width += 40),
                    'left' === t.textAlign && (r.x = 20),
                    'center' === t.textAlign && (r.x = 10 + 0.5 * (t.width - n.width)),
                    'right' === t.textAlign && (r.x = t.width - n.width))
                  : t.text &&
                    ((r = j(0, 0)), (i = { width: o.width, height: o.height }), (o.width -= 20))
              t.text && (a = t.color)
            }
            Y.drawRect(
              o,
              t.rotation,
              t.flipX,
              t.flipY,
              s,
              t.backgroundColor,
              e,
              i,
              r,
              t.strokeWidth,
              t.strokeColor,
              t.opacity,
              void 0,
              a
            )
          }
          return e
        })
        .filter(Boolean),
    nt = () => {
      const t = b({
        opacity: s.opacity,
        rotation: s.rotation,
        scale: s.scale,
        size: o,
        backgroundColor: [...l],
      })
      ;(t.backgroundColor = [...l]),
        (t.image = s),
        (t.imageMask = s.mask),
        (t.imageMaskOpacity = s.maskOpacity),
        (t.imagePreviews = $)
      const e = t.annotationShapes.length > 0,
        n = s.backgroundColor[3] > 0,
        i = s.maskOpacity < 1,
        r = []
      if (i && n) {
        const e = t.backgroundColor[0],
          n = t.backgroundColor[1],
          o = t.backgroundColor[2],
          i = 1 - s.maskOpacity,
          r = s.backgroundColor[0] * i,
          a = s.backgroundColor[1] * i,
          l = s.backgroundColor[2] * i,
          c = 1 - i
        t.backgroundColor = [r + e * c, a + n * c, l + o * c, 1]
      }
      Y.setCanvasColor(t.backgroundColor),
        e && (Y.disableMask(), Y.drawToFramebuffer(), r.push(...et(t.annotationShapes))),
        Y.drawToCanvas(),
        Y.enableMask(t.imageMask, t.imageMaskOpacity),
        n && Y.drawRect(c, 0, !1, !1, [0, 0, 0, 0], C(l, s.backgroundColor)),
        (t.image.enableShapes = e),
        q(t.image),
        r.push(...et(t.decorationShapes)),
        Y.disableMask(),
        r.push(...et(t.interfaceShapes)),
        t.imagePreviews.forEach((t) => {
          Y.enableMask(t.mask, t.maskOpacity),
            n &&
              Y.drawRect(
                t.mask,
                0,
                !1,
                !1,
                t.maskCornerRadius,
                s.backgroundColor,
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                t.opacity,
                t.maskFeather
              ),
            q({
              ...t,
              backgroundColor: s.backgroundColor,
              overlayColor: [0, 0, 0, 0],
              enableShapes: !1,
            })
        }),
        Y.disableMask(),
        K.forEach((t, e) => {
          !!r.find((e) => e === t) || (K.delete(e), Y.textureDelete(t))
        })
    }
  let ot = Date.now()
  const it = () => {
    const t = Date.now()
    t - ot < 48 || ((ot = t), nt())
  }
  return (
    $i(() => a()),
    fi(() => n(15, (Y = fs(X, h, g, x)))),
    yi(() => {
      Y && (Y.release(), m(Q.canvas))
    }),
    (t.$$set = (t) => {
      'animate' in t && n(5, (p = t.animate)),
        'imageData' in t && n(6, (h = t.imageData)),
        'imageSize' in t && n(7, (g = t.imageSize)),
        'imageProps' in t && n(8, (f = t.imageProps)),
        'imagePreviews' in t && n(9, ($ = t.imagePreviews)),
        'maskRect' in t && n(10, (y = t.maskRect)),
        'pixelRatio' in t && n(11, (x = t.pixelRatio)),
        'willRender' in t && n(12, (b = t.willRender)),
        'loadImageData' in t && n(13, (v = t.loadImageData)),
        'backgroundColor' in t && n(14, (S = t.backgroundColor))
    }),
    (t.$$.update = () => {
      16384 & t.$$.dirty[0] && S && k(T, S),
        256 & t.$$.dirty[0] && f && k(A, f.origin),
        256 & t.$$.dirty[0] && f && k(P, f.translation),
        256 & t.$$.dirty[0] && f && k(I, f.perspective),
        256 & t.$$.dirty[0] && f && k(E, f.rotation),
        256 & t.$$.dirty[0] && f && k(L, f.scale),
        256 & t.$$.dirty[0] && f && k(z, f.colorMatrix || [...d]),
        256 & t.$$.dirty[0] && f && k(B, f.vignette || 0),
        256 & t.$$.dirty[0] && f && k(F, f.gamma || 1),
        256 & t.$$.dirty[0] &&
          f &&
          _.set((f.convolutionMatrix && f.convolutionMatrix.clarity) || void 0),
        256 & t.$$.dirty[0] && f && k(W, 1),
        256 & t.$$.dirty[0] && f && k(V, We(f.maskOpacity) ? f.maskOpacity : 1),
        1024 & t.$$.dirty[0] && y && N.set(y),
        256 & t.$$.dirty[0] && f && U.set(f.backgroundColor),
        196608 & t.$$.dirty[0] && (o = { width: G, height: Z }),
        753664 & t.$$.dirty[0] && n(18, (r = Y && G && Z && s)),
        231424 & t.$$.dirty[0] && G && Z && Y && Y.resize(G, Z, x),
        262144 & t.$$.dirty[0] && (a = r ? (Ka() ? it : nt) : i)
    }),
    [
      X,
      T,
      N,
      H,
      (t) => {
        n(16, (G = t.detail.width)),
          n(17, (Z = t.detail.height)),
          u('measure', { width: G, height: Z })
      },
      p,
      h,
      g,
      f,
      $,
      y,
      x,
      b,
      v,
      S,
      Y,
      G,
      Z,
      r,
      s,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(X = t), n(0, X)
        })
      },
    ]
  )
}
class xs extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        ys,
        $s,
        Ao,
        {
          animate: 5,
          imageData: 6,
          imageSize: 7,
          imageProps: 8,
          imagePreviews: 9,
          maskRect: 10,
          pixelRatio: 11,
          willRender: 12,
          loadImageData: 13,
          backgroundColor: 14,
        },
        [-1, -1]
      )
  }
}
var bs = (t, e = Boolean, n = ' ') => t.filter(e).join(n)
function vs(t, e, n) {
  const o = t.slice()
  return (o[17] = e[n]), o
}
const ws = (t) => ({ tab: 4 & t }),
  Ss = (t) => ({ tab: t[17] })
function ks(t) {
  let e,
    n,
    o,
    i = [],
    r = new Map(),
    a = t[2]
  const s = (t) => t[17].id
  for (let e = 0; e < a.length; e += 1) {
    let n = vs(t, a, e),
      o = s(n)
    r.set(o, (i[e] = Cs(o, n)))
  }
  return {
    c() {
      e = qo('ul')
      for (let t = 0; t < i.length; t += 1) i[t].c()
      ii(e, 'class', (n = bs(['PinturaTabList', t[0]]))),
        ii(e, 'role', 'tablist'),
        ii(e, 'data-layout', t[1])
    },
    m(n, r) {
      Go(n, e, r)
      for (let t = 0; t < i.length; t += 1) i[t].m(e, null)
      t[14](e), (o = !0)
    },
    p(t, l) {
      1124 & l && ((a = t[2]), _i(), (i = Gi(i, l, s, 1, t, a, r, e, Yi, Cs, null, vs)), Wi()),
        (!o || (1 & l && n !== (n = bs(['PinturaTabList', t[0]])))) && ii(e, 'class', n),
        (!o || 2 & l) && ii(e, 'data-layout', t[1])
    },
    i(t) {
      if (!o) {
        for (let t = 0; t < a.length; t += 1) Vi(i[t])
        o = !0
      }
    },
    o(t) {
      for (let t = 0; t < i.length; t += 1) Ni(i[t])
      o = !1
    },
    d(n) {
      n && Zo(e)
      for (let t = 0; t < i.length; t += 1) i[t].d()
      t[14](null)
    },
  }
}
function Cs(t, e) {
  let n, o, i, r, a, s, l, c, u, d
  const p = e[11].default,
    h = Bo(p, e, e[10], Ss)
  function g(...t) {
    return e[12](e[17], ...t)
  }
  function m(...t) {
    return e[13](e[17], ...t)
  }
  return {
    key: t,
    first: null,
    c() {
      ;(n = qo('li')),
        (o = qo('button')),
        h && h.c(),
        (r = Jo()),
        (o.disabled = i = e[17].disabled),
        ii(n, 'role', 'tab'),
        ii(n, 'aria-controls', (a = e[17].href.substr(1))),
        ii(n, 'id', (s = e[17].tabId)),
        ii(n, 'aria-selected', (l = e[17].selected)),
        (this.first = n)
    },
    m(t, e) {
      Go(t, n, e),
        Yo(n, o),
        h && h.m(o, null),
        Yo(n, r),
        (c = !0),
        u || ((d = [ei(o, 'keydown', g), ei(o, 'click', m)]), (u = !0))
    },
    p(t, r) {
      ;(e = t),
        h && h.p && 1028 & r && Do(h, p, e, e[10], r, ws, Ss),
        (!c || (4 & r && i !== (i = e[17].disabled))) && (o.disabled = i),
        (!c || (4 & r && a !== (a = e[17].href.substr(1)))) && ii(n, 'aria-controls', a),
        (!c || (4 & r && s !== (s = e[17].tabId))) && ii(n, 'id', s),
        (!c || (4 & r && l !== (l = e[17].selected))) && ii(n, 'aria-selected', l)
    },
    i(t) {
      c || (Vi(h, t), (c = !0))
    },
    o(t) {
      Ni(h, t), (c = !1)
    },
    d(t) {
      t && Zo(n), h && h.d(t), (u = !1), Po(d)
    },
  }
}
function Ms(t) {
  let e,
    n,
    o = t[4] && ks(t)
  return {
    c() {
      o && o.c(), (e = ti())
    },
    m(t, i) {
      o && o.m(t, i), Go(t, e, i), (n = !0)
    },
    p(t, [n]) {
      t[4]
        ? o
          ? (o.p(t, n), 16 & n && Vi(o, 1))
          : ((o = ks(t)), o.c(), Vi(o, 1), o.m(e.parentNode, e))
        : o &&
          (_i(),
          Ni(o, 1, 1, () => {
            o = null
          }),
          Wi())
    },
    i(t) {
      n || (Vi(o), (n = !0))
    },
    o(t) {
      Ni(o), (n = !1)
    },
    d(t) {
      o && o.d(t), t && Zo(e)
    },
  }
}
function Rs(t, e, n) {
  let o,
    i,
    r,
    { $$slots: a = {}, $$scope: s } = e,
    { class: l } = e,
    { name: c } = e,
    { selected: u } = e,
    { tabs: d = [] } = e,
    { layout: p } = e
  const h = xi(),
    g = (t) => {
      const e = r.querySelectorAll('[role="tab"] button')[t]
      e && e.focus()
    },
    m = (t, e) => {
      t.preventDefault(), t.stopPropagation(), h('select', e)
    },
    f = ({ key: t }, e) => {
      if (!/arrow/i.test(t)) return
      const n = d.findIndex((t) => t.id === e)
      return /right|down/i.test(t)
        ? g(n < d.length - 1 ? n + 1 : 0)
        : /left|up/i.test(t)
        ? g(n > 0 ? n - 1 : d.length - 1)
        : void 0
    }
  return (
    (t.$$set = (t) => {
      'class' in t && n(0, (l = t.class)),
        'name' in t && n(7, (c = t.name)),
        'selected' in t && n(8, (u = t.selected)),
        'tabs' in t && n(9, (d = t.tabs)),
        'layout' in t && n(1, (p = t.layout)),
        '$$scope' in t && n(10, (s = t.$$scope))
    }),
    (t.$$.update = () => {
      896 & t.$$.dirty &&
        n(
          2,
          (o = d.map((t) => {
            const e = t.id === u
            return { ...t, tabId: `tab-${c}-${t.id}`, href: `#panel-${c}-${t.id}`, selected: e }
          }))
        ),
        4 & t.$$.dirty && n(4, (i = o.length > 1))
    }),
    [
      l,
      p,
      o,
      r,
      i,
      m,
      f,
      c,
      u,
      d,
      s,
      a,
      (t, e) => f(e, t.id),
      (t, e) => m(e, t.id),
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(r = t), n(3, r)
        })
      },
    ]
  )
}
class Ts extends or {
  constructor(t) {
    super(), nr(this, t, Rs, Ms, Ao, { class: 0, name: 7, selected: 8, tabs: 9, layout: 1 })
  }
}
const Ps = (t) => ({ panel: 16 & t }),
  Es = (t) => ({ panel: t[4][0].id, panelIsActive: !0 })
function As(t, e, n) {
  const o = t.slice()
  return (
    (o[14] = e[n].id),
    (o[15] = e[n].draw),
    (o[16] = e[n].panelId),
    (o[17] = e[n].tabindex),
    (o[18] = e[n].labelledBy),
    (o[19] = e[n].hidden),
    (o[3] = e[n].visible),
    o
  )
}
const Is = (t) => ({ panel: 16 & t, panelIsActive: 16 & t }),
  Ls = (t) => ({ panel: t[14], panelIsActive: !t[19] })
function Fs(t) {
  let e, n, o, i, r, a
  const s = t[11].default,
    l = Bo(s, t, t[10], Es)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        l && l.c(),
        ii(n, 'class', (o = bs([t[1]]))),
        ii(e, 'class', t[0]),
        ii(e, 'style', t[2])
    },
    m(o, s) {
      Go(o, e, s),
        Yo(e, n),
        l && l.m(n, null),
        (i = !0),
        r || ((a = [ei(e, 'measure', t[13]), Wo(Ua.call(null, e))]), (r = !0))
    },
    p(t, r) {
      l && l.p && 1040 & r && Do(l, s, t, t[10], r, Ps, Es),
        (!i || (2 & r && o !== (o = bs([t[1]])))) && ii(n, 'class', o),
        (!i || 1 & r) && ii(e, 'class', t[0]),
        (!i || 4 & r) && ii(e, 'style', t[2])
    },
    i(t) {
      i || (Vi(l, t), (i = !0))
    },
    o(t) {
      Ni(l, t), (i = !1)
    },
    d(t) {
      t && Zo(e), l && l.d(t), (r = !1), Po(a)
    },
  }
}
function Bs(t) {
  let e,
    n,
    o,
    i,
    r,
    a = [],
    s = new Map(),
    l = t[4]
  const c = (t) => t[14]
  for (let e = 0; e < l.length; e += 1) {
    let n = As(t, l, e),
      o = c(n)
    s.set(o, (a[e] = Ds(o, n)))
  }
  return {
    c() {
      e = qo('div')
      for (let t = 0; t < a.length; t += 1) a[t].c()
      ii(e, 'class', (n = bs(['PinturaTabPanels', t[0]]))), ii(e, 'style', t[2])
    },
    m(n, s) {
      Go(n, e, s)
      for (let t = 0; t < a.length; t += 1) a[t].m(e, null)
      ;(o = !0), i || ((r = [ei(e, 'measure', t[12]), Wo(Ua.call(null, e))]), (i = !0))
    },
    p(t, i) {
      1042 & i && ((l = t[4]), _i(), (a = Gi(a, i, c, 1, t, l, s, e, Yi, Ds, null, As)), Wi()),
        (!o || (1 & i && n !== (n = bs(['PinturaTabPanels', t[0]])))) && ii(e, 'class', n),
        (!o || 4 & i) && ii(e, 'style', t[2])
    },
    i(t) {
      if (!o) {
        for (let t = 0; t < l.length; t += 1) Vi(a[t])
        o = !0
      }
    },
    o(t) {
      for (let t = 0; t < a.length; t += 1) Ni(a[t])
      o = !1
    },
    d(t) {
      t && Zo(e)
      for (let t = 0; t < a.length; t += 1) a[t].d()
      ;(i = !1), Po(r)
    },
  }
}
function zs(t) {
  let e
  const n = t[11].default,
    o = Bo(n, t, t[10], Ls)
  return {
    c() {
      o && o.c()
    },
    m(t, n) {
      o && o.m(t, n), (e = !0)
    },
    p(t, e) {
      o && o.p && 1040 & e && Do(o, n, t, t[10], e, Is, Ls)
    },
    i(t) {
      e || (Vi(o, t), (e = !0))
    },
    o(t) {
      Ni(o, t), (e = !1)
    },
    d(t) {
      o && o.d(t)
    },
  }
}
function Ds(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d = e[15] && zs(e)
  return {
    key: t,
    first: null,
    c() {
      ;(n = qo('div')),
        d && d.c(),
        (o = Jo()),
        ii(n, 'class', (i = bs(['PinturaTabPanel', e[1]]))),
        (n.hidden = r = e[19]),
        ii(n, 'id', (a = e[16])),
        ii(n, 'tabindex', (s = e[17])),
        ii(n, 'aria-labelledby', (l = e[18])),
        ii(n, 'data-inert', (c = !e[3])),
        (this.first = n)
    },
    m(t, e) {
      Go(t, n, e), d && d.m(n, null), Yo(n, o), (u = !0)
    },
    p(t, p) {
      ;(e = t)[15]
        ? d
          ? (d.p(e, p), 16 & p && Vi(d, 1))
          : ((d = zs(e)), d.c(), Vi(d, 1), d.m(n, o))
        : d &&
          (_i(),
          Ni(d, 1, 1, () => {
            d = null
          }),
          Wi()),
        (!u || (2 & p && i !== (i = bs(['PinturaTabPanel', e[1]])))) && ii(n, 'class', i),
        (!u || (16 & p && r !== (r = e[19]))) && (n.hidden = r),
        (!u || (16 & p && a !== (a = e[16]))) && ii(n, 'id', a),
        (!u || (16 & p && s !== (s = e[17]))) && ii(n, 'tabindex', s),
        (!u || (16 & p && l !== (l = e[18]))) && ii(n, 'aria-labelledby', l),
        (!u || (16 & p && c !== (c = !e[3]))) && ii(n, 'data-inert', c)
    },
    i(t) {
      u || (Vi(d), (u = !0))
    },
    o(t) {
      Ni(d), (u = !1)
    },
    d(t) {
      t && Zo(n), d && d.d()
    },
  }
}
function Os(t) {
  let e, n, o, i
  const r = [Bs, Fs],
    a = []
  function s(t, e) {
    return t[5] ? 0 : 1
  }
  return (
    (e = s(t)),
    (n = a[e] = r[e](t)),
    {
      c() {
        n.c(), (o = ti())
      },
      m(t, n) {
        a[e].m(t, n), Go(t, o, n), (i = !0)
      },
      p(t, [i]) {
        let l = e
        ;(e = s(t)),
          e === l
            ? a[e].p(t, i)
            : (_i(),
              Ni(a[l], 1, 1, () => {
                a[l] = null
              }),
              Wi(),
              (n = a[e]),
              n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
              Vi(n, 1),
              n.m(o.parentNode, o))
      },
      i(t) {
        i || (Vi(n), (i = !0))
      },
      o(t) {
        Ni(n), (i = !1)
      },
      d(t) {
        a[e].d(t), t && Zo(o)
      },
    }
  )
}
function _s(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    { class: s } = e,
    { name: l } = e,
    { selected: c } = e,
    { visible: u } = e,
    { panelClass: d } = e,
    { panels: p = [] } = e,
    { style: h } = e
  const g = {}
  return (
    (t.$$set = (t) => {
      'class' in t && n(0, (s = t.class)),
        'name' in t && n(6, (l = t.name)),
        'selected' in t && n(7, (c = t.selected)),
        'visible' in t && n(3, (u = t.visible)),
        'panelClass' in t && n(1, (d = t.panelClass)),
        'panels' in t && n(8, (p = t.panels)),
        'style' in t && n(2, (h = t.style)),
        '$$scope' in t && n(10, (a = t.$$scope))
    }),
    (t.$$.update = () => {
      968 & t.$$.dirty &&
        n(
          4,
          (o = p.map((t) => {
            const e = t === c,
              o = !u || -1 !== u.indexOf(t)
            return (
              e && n(9, (g[t] = !0), g),
              {
                id: t,
                panelId: `panel-${l}-${t}`,
                labelledBy: `tab-${l}-${t}`,
                hidden: !e,
                visible: o,
                tabindex: e ? 0 : -1,
                draw: e || g[t],
              }
            )
          }))
        ),
        16 & t.$$.dirty && n(5, (i = o.length > 1))
    }),
    [
      s,
      d,
      h,
      u,
      o,
      i,
      l,
      c,
      p,
      g,
      a,
      r,
      function (e) {
        wi(t, e)
      },
      function (e) {
        wi(t, e)
      },
    ]
  )
}
class Ws extends or {
  constructor(t) {
    super(),
      nr(this, t, _s, Os, Ao, {
        class: 0,
        name: 6,
        selected: 7,
        visible: 3,
        panelClass: 1,
        panels: 8,
        style: 2,
      })
  }
}
function Vs(t) {
  let e, n, o, i, r
  const a = [t[6]]
  function s(e) {
    t[19](e)
  }
  var l = t[10]
  function c(t) {
    let e = {}
    for (let t = 0; t < a.length; t += 1) e = Mo(e, a[t])
    return void 0 !== t[4] && (e.name = t[4]), { props: e }
  }
  return (
    l && ((n = new l(c(t))), ki.push(() => Ki(n, 'name', s)), t[20](n), n.$on('measure', t[21])),
    {
      c() {
        ;(e = qo('div')),
          n && Qi(n.$$.fragment),
          ii(e, 'data-util', t[4]),
          ii(e, 'class', (i = bs(['PinturaPanel', t[1]]))),
          ii(e, 'style', t[5])
      },
      m(t, o) {
        Go(t, e, o), n && Ji(n, e, null), (r = !0)
      },
      p(t, [u]) {
        const d = 64 & u ? Zi(a, [qi(t[6])]) : {}
        if ((!o && 16 & u && ((o = !0), (d.name = t[4]), Ei(() => (o = !1))), l !== (l = t[10]))) {
          if (n) {
            _i()
            const t = n
            Ni(t.$$.fragment, 1, 0, () => {
              tr(t, 1)
            }),
              Wi()
          }
          l
            ? ((n = new l(c(t))),
              ki.push(() => Ki(n, 'name', s)),
              t[20](n),
              n.$on('measure', t[21]),
              Qi(n.$$.fragment),
              Vi(n.$$.fragment, 1),
              Ji(n, e, null))
            : (n = null)
        } else l && n.$set(d)
        ;(!r || 16 & u) && ii(e, 'data-util', t[4]),
          (!r || (2 & u && i !== (i = bs(['PinturaPanel', t[1]])))) && ii(e, 'class', i),
          (!r || 32 & u) && ii(e, 'style', t[5])
      },
      i(t) {
        r || (n && Vi(n.$$.fragment, t), (r = !0))
      },
      o(t) {
        n && Ni(n.$$.fragment, t), (r = !1)
      },
      d(o) {
        o && Zo(e), t[20](null), n && tr(n)
      },
    }
  )
}
function Ns(t, e, n) {
  let o, i, r, a
  const s = xi()
  let l,
    { isActive: c = !0 } = e,
    { isAnimated: u = !0 } = e,
    { stores: d } = e,
    { content: p } = e,
    { component: h } = e,
    { locale: g } = e,
    { class: m } = e
  const f = Ia(0),
    $ = sr(f, (t) => Mr(t, 0, 1))
  Fo(t, $, (t) => n(18, (r = t)))
  let y = !c
  const x = ar(c)
  Fo(t, x, (t) => n(22, (a = t)))
  const b = {
      isActive: sr(x, (t) => t),
      isActiveFraction: sr($, (t) => t),
      isVisible: sr($, (t) => t > 0),
    },
    v = p.view,
    w = Ma(v),
    S = Object.keys(p.props || {}).reduce(
      (t, e) => (w.includes(e) ? ((t[e] = p.props[e]), t) : t),
      {}
    ),
    k = Object.keys(b).reduce((t, e) => (w.includes(e) ? ((t[e] = b[e]), t) : t), {})
  let C,
    M = !1
  fi(() => {
    n(3, (M = !0))
  })
  return (
    (t.$$set = (t) => {
      'isActive' in t && n(11, (c = t.isActive)),
        'isAnimated' in t && n(12, (u = t.isAnimated)),
        'stores' in t && n(13, (d = t.stores)),
        'content' in t && n(14, (p = t.content)),
        'component' in t && n(0, (h = t.component)),
        'locale' in t && n(15, (g = t.locale)),
        'class' in t && n(1, (m = t.class))
    }),
    (t.$$.update = () => {
      2053 & t.$$.dirty && l && c && h && s('measure', l),
        6144 & t.$$.dirty && f.set(c ? 1 : 0, { hard: !u }),
        393216 & t.$$.dirty && (r <= 0 && !y ? n(17, (y = !0)) : r > 0 && y && n(17, (y = !1))),
        131080 & t.$$.dirty && M && s(y ? 'hide' : 'show'),
        262144 & t.$$.dirty && s('fade', r),
        262144 & t.$$.dirty && n(5, (o = r < 1 ? 'opacity: ' + r : void 0)),
        2048 & t.$$.dirty && _o(x, (a = c), a),
        40960 & t.$$.dirty && n(6, (i = { ...S, ...k, stores: d, locale: g }))
    }),
    [
      h,
      m,
      l,
      M,
      C,
      o,
      i,
      s,
      $,
      x,
      v,
      c,
      u,
      d,
      p,
      g,
      f,
      y,
      r,
      function (t) {
        ;(C = t), n(4, C)
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(h = t), n(0, h)
        })
      },
      (t) => {
        M && (n(2, (l = t.detail)), s('measure', { ...l }))
      },
    ]
  )
}
class Us extends or {
  constructor(t) {
    super(),
      nr(this, t, Ns, Vs, Ao, {
        isActive: 11,
        isAnimated: 12,
        stores: 13,
        content: 14,
        component: 0,
        locale: 15,
        class: 1,
        opacity: 16,
      })
  }
  get opacity() {
    return this.$$.ctx[16]
  }
}
function Hs(t) {
  let e, n, o
  const i = t[5].default,
    r = Bo(i, t, t[4], null)
  return {
    c() {
      ;(e = Ko('svg')),
        r && r.c(),
        ii(e, 'class', t[3]),
        ii(e, 'style', t[2]),
        ii(e, 'width', t[0]),
        ii(e, 'height', t[1]),
        ii(e, 'viewBox', (n = '0 0 ' + t[0] + '\n    ' + t[1])),
        ii(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        ii(e, 'aria-hidden', 'true'),
        ii(e, 'focusable', 'false'),
        ii(e, 'stroke-linecap', 'round'),
        ii(e, 'stroke-linejoin', 'round')
    },
    m(t, n) {
      Go(t, e, n), r && r.m(e, null), (o = !0)
    },
    p(t, [a]) {
      r && r.p && 16 & a && Do(r, i, t, t[4], a, null, null),
        (!o || 8 & a) && ii(e, 'class', t[3]),
        (!o || 4 & a) && ii(e, 'style', t[2]),
        (!o || 1 & a) && ii(e, 'width', t[0]),
        (!o || 2 & a) && ii(e, 'height', t[1]),
        (!o || (3 & a && n !== (n = '0 0 ' + t[0] + '\n    ' + t[1]))) && ii(e, 'viewBox', n)
    },
    i(t) {
      o || (Vi(r, t), (o = !0))
    },
    o(t) {
      Ni(r, t), (o = !1)
    },
    d(t) {
      t && Zo(e), r && r.d(t)
    },
  }
}
function Xs(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e,
    { width: r = 24 } = e,
    { height: a = 24 } = e,
    { style: s } = e,
    { class: l } = e
  return (
    (t.$$set = (t) => {
      'width' in t && n(0, (r = t.width)),
        'height' in t && n(1, (a = t.height)),
        'style' in t && n(2, (s = t.style)),
        'class' in t && n(3, (l = t.class)),
        '$$scope' in t && n(4, (i = t.$$scope))
    }),
    [r, a, s, l, i, o]
  )
}
class js extends or {
  constructor(t) {
    super(), nr(this, t, Xs, Hs, Ao, { width: 0, height: 1, style: 2, class: 3 })
  }
}
var Ys = (t, e) => e === t.target || e.contains(t.target)
function Gs(t) {
  let e, n
  return (
    (e = new js({
      props: { class: 'PinturaButtonIcon', $$slots: { default: [Zs] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        1048578 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Zs(t) {
  let e
  return {
    c() {
      e = Ko('g')
    },
    m(n, o) {
      Go(n, e, o), (e.innerHTML = t[1])
    },
    p(t, n) {
      2 & n && (e.innerHTML = t[1])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function qs(t) {
  let e, n
  return {
    c() {
      ;(e = qo('span')), (n = Qo(t[0])), ii(e, 'class', t[11])
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, o) {
      1 & o && ai(n, t[0]), 2048 & o && ii(e, 'class', t[11])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Ks(t) {
  let e, n, o, i
  const r = t[18].default,
    a = Bo(r, t, t[20], null),
    s =
      a ||
      (function (t) {
        let e,
          n,
          o,
          i = t[1] && Gs(t),
          r = t[0] && qs(t)
        return {
          c() {
            ;(e = qo('span')), i && i.c(), (n = Jo()), r && r.c(), ii(e, 'class', t[9])
          },
          m(t, a) {
            Go(t, e, a), i && i.m(e, null), Yo(e, n), r && r.m(e, null), (o = !0)
          },
          p(t, a) {
            t[1]
              ? i
                ? (i.p(t, a), 2 & a && Vi(i, 1))
                : ((i = Gs(t)), i.c(), Vi(i, 1), i.m(e, n))
              : i &&
                (_i(),
                Ni(i, 1, 1, () => {
                  i = null
                }),
                Wi()),
              t[0]
                ? r
                  ? r.p(t, a)
                  : ((r = qs(t)), r.c(), r.m(e, null))
                : r && (r.d(1), (r = null)),
              (!o || 512 & a) && ii(e, 'class', t[9])
          },
          i(t) {
            o || (Vi(i), (o = !0))
          },
          o(t) {
            Ni(i), (o = !1)
          },
          d(t) {
            t && Zo(e), i && i.d(), r && r.d()
          },
        }
      })(t)
  return {
    c() {
      ;(e = qo('button')),
        s && s.c(),
        ii(e, 'type', t[4]),
        ii(e, 'style', t[2]),
        (e.disabled = t[3]),
        ii(e, 'class', t[10]),
        ii(e, 'title', t[0])
    },
    m(r, a) {
      Go(r, e, a),
        s && s.m(e, null),
        t[19](e),
        (n = !0),
        o ||
          ((i = [
            ei(e, 'keydown', function () {
              Eo(t[6]) && t[6].apply(this, arguments)
            }),
            ei(e, 'click', function () {
              Eo(t[5]) && t[5].apply(this, arguments)
            }),
            Wo(t[7].call(null, e)),
          ]),
          (o = !0))
    },
    p(o, [i]) {
      ;(t = o),
        a
          ? a.p && 1048576 & i && Do(a, r, t, t[20], i, null, null)
          : s && s.p && 2563 & i && s.p(t, i),
        (!n || 16 & i) && ii(e, 'type', t[4]),
        (!n || 4 & i) && ii(e, 'style', t[2]),
        (!n || 8 & i) && (e.disabled = t[3]),
        (!n || 1024 & i) && ii(e, 'class', t[10]),
        (!n || 1 & i) && ii(e, 'title', t[0])
    },
    i(t) {
      n || (Vi(s, t), (n = !0))
    },
    o(t) {
      Ni(s, t), (n = !1)
    },
    d(n) {
      n && Zo(e), s && s.d(n), t[19](null), (o = !1), Po(i)
    },
  }
}
function Qs(t, e, n) {
  let o,
    i,
    r,
    a,
    { $$slots: s = {}, $$scope: l } = e,
    { class: c } = e,
    { label: u } = e,
    { labelClass: d } = e,
    { innerClass: p } = e,
    { hideLabel: h = !1 } = e,
    { icon: g } = e,
    { style: m } = e,
    { disabled: f } = e,
    { type: $ = 'button' } = e,
    { onclick: y } = e,
    { onkeydown: x } = e,
    { action: b = () => {} } = e
  return (
    (t.$$set = (t) => {
      'class' in t && n(12, (c = t.class)),
        'label' in t && n(0, (u = t.label)),
        'labelClass' in t && n(13, (d = t.labelClass)),
        'innerClass' in t && n(14, (p = t.innerClass)),
        'hideLabel' in t && n(15, (h = t.hideLabel)),
        'icon' in t && n(1, (g = t.icon)),
        'style' in t && n(2, (m = t.style)),
        'disabled' in t && n(3, (f = t.disabled)),
        'type' in t && n(4, ($ = t.type)),
        'onclick' in t && n(5, (y = t.onclick)),
        'onkeydown' in t && n(6, (x = t.onkeydown)),
        'action' in t && n(7, (b = t.action)),
        '$$scope' in t && n(20, (l = t.$$scope))
    }),
    (t.$$.update = () => {
      16384 & t.$$.dirty && n(9, (o = bs(['PinturaButtonInner', p]))),
        36864 & t.$$.dirty && n(10, (i = bs(['PinturaButton', h && 'PinturaButtonIconOnly', c]))),
        40960 & t.$$.dirty && n(11, (r = bs([h ? 'implicit' : 'PinturaButtonLabel', d])))
    }),
    [
      u,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      a,
      o,
      i,
      r,
      c,
      d,
      p,
      h,
      (t) => Ys(t, a),
      () => a,
      s,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(a = t), n(8, a)
        })
      },
      l,
    ]
  )
}
class Js extends or {
  constructor(t) {
    super(),
      nr(this, t, Qs, Ks, Ao, {
        class: 12,
        label: 0,
        labelClass: 13,
        innerClass: 14,
        hideLabel: 15,
        icon: 1,
        style: 2,
        disabled: 3,
        type: 4,
        onclick: 5,
        onkeydown: 6,
        action: 7,
        isEventTarget: 16,
        getElement: 17,
      })
  }
  get isEventTarget() {
    return this.$$.ctx[16]
  }
  get getElement() {
    return this.$$.ctx[17]
  }
}
var tl = (t, e) => {
  const n = t.findIndex(e)
  if (n >= 0) return t.splice(n, 1)
}
const el = (t, e) => (e - t) / t
var nl = (t, e = {}) => {
    const {
      inertia: n = !1,
      matchTarget: o = !1,
      pinch: i = !1,
      getEventPosition: r = (t) => j(t.clientX, t.clientY),
    } = e
    function a(e, n) {
      t.dispatchEvent(new CustomEvent(e, { detail: n }))
    }
    function s() {
      m && m(), (m = void 0)
    }
    const l = [],
      c = (t) => {
        ;(t.origin.x = t.position.x),
          (t.origin.y = t.position.y),
          (t.translation.x = 0),
          (t.translation.y = 0)
      },
      u = (t) => {
        const e = ((t) => l.findIndex((e) => e.event.pointerId === t.pointerId))(t)
        if (!(e < 0)) return l[e]
      },
      d = () => 1 === l.length,
      p = () => 2 === l.length,
      h = (t) => {
        const e = st(t.map((t) => t.position))
        return {
          center: e,
          distance: ((t, e) => t.reduce((t, n) => t + at(e, n.position), 0) / t.length)(t, e),
          velocity: st(t.map((t) => t.velocity)),
          translation: st(t.map((t) => t.translation)),
        }
      }
    let g,
      m,
      f,
      $,
      y,
      x,
      b = 0,
      v = void 0
    function w(e) {
      p() ||
        ((t) => We(t.button) && 0 !== t.button)(e) ||
        (o && e.target !== t) ||
        (s(),
        ((t) => {
          const e = {
            timeStamp: t.timeStamp,
            timeStampInitial: t.timeStamp,
            position: r(t),
            origin: r(t),
            velocity: X(),
            translation: X(),
            interactionState: void 0,
            event: t,
          }
          l.push(e), (e.interactionState = h(l))
        })(e),
        d()
          ? (document.documentElement.addEventListener('pointermove', k),
            document.documentElement.addEventListener('pointerup', C),
            document.documentElement.addEventListener('pointercancel', C),
            (x = !1),
            (y = 0),
            ($ = X()),
            (f = void 0),
            a('interactionstart', { origin: G(u(e).origin) }))
          : i &&
            ((x = !0),
            (f = at(l[0].position, l[1].position)),
            ($.x += l[0].translation.x),
            ($.y += l[0].translation.y),
            c(l[0])))
    }
    t.addEventListener('pointerdown', w)
    let S = Date.now()
    function k(t) {
      t.preventDefault(),
        ((t) => {
          const e = u(t)
          if (!e) return
          const { timeStamp: n } = t,
            o = r(t),
            i = Math.max(1, n - e.timeStamp)
          ;(e.velocity.x = (o.x - e.position.x) / i),
            (e.velocity.y = (o.y - e.position.y) / i),
            (e.translation.x = o.x - e.origin.x),
            (e.translation.y = o.y - e.origin.y),
            (e.timeStamp = n),
            (e.position.x = o.x),
            (e.position.y = o.y),
            (e.event = t)
        })(t)
      let e = y,
        n = G(l[0].translation)
      if (i && p()) {
        ;(n.x += l[1].translation.x), (n.y += l[1].translation.y)
        const t = at(l[0].position, l[1].position)
        e += el(f, t)
      }
      ;(n.x += $.x), (n.y += $.y)
      const o = Date.now()
      o - S < 16 || ((S = o), a('interactionupdate', { translation: n, scalar: i ? e : void 0 }))
    }
    function C(t) {
      const e = ((t) => {
        const e = tl(l, (e) => e.event.pointerId === t.pointerId)
        if (e) return e[0]
      })(t)
      if (i && d()) {
        const t = at(l[0].position, e.position)
        ;(y = (y || 0) + el(f, t)),
          ($.x += l[0].translation.x + e.translation.x),
          ($.y += l[0].translation.y + e.translation.y),
          c(l[0])
      }
      let o = !1,
        r = !1
      if (!x && e) {
        const t = performance.now(),
          n = t - e.timeStampInitial,
          i = rt(e.translation)
        ;(o = i < 64 && n < 300),
          (r = !!(v && o && t - b < 700 && rt(v, e.position) < 128)),
          o && ((v = G(e.position)), (b = t))
      }
      if (l.length > 0) return
      document.documentElement.removeEventListener('pointermove', k),
        document.documentElement.removeEventListener('pointerup', C),
        document.documentElement.removeEventListener('pointercancel', C)
      const s = G(e.translation),
        u = G(e.velocity)
      let p = !1
      a('interactionrelease', {
        isTap: o,
        isDoubleTap: r,
        translation: s,
        scalar: y,
        preventInertia: () => (p = !0),
      })
      const h = at(u)
      if (p || !n || h < 0.25) return R(s, { isTap: o, isDoubleTap: r })
      ;(g = Ea(G(s), { easing: Ra, duration: 80 * h })),
        g.set({ x: s.x + 50 * u.x, y: s.y + 50 * u.y }).then(() => {
          m && R(Lo(g), { isTap: o, isDoubleTap: r })
        }),
        (m = g.subscribe(M))
    }
    function M(t) {
      t && a('interactionupdate', { translation: t, scalar: i ? y : void 0 })
    }
    function R(t, e) {
      s(), a('interactionend', { ...e, translation: t, scalar: i ? y : void 0 })
    }
    return {
      destroy() {
        s(), t.removeEventListener('pointerdown', w)
      },
    }
  },
  ol = (t, e = {}) => {
    const {
        direction: n,
        shiftMultiplier: o = 10,
        bubbles: i = !1,
        stopKeydownPropagation: r = !0,
      } = e,
      a = 'horizontal' === n,
      s = 'vertical' === n,
      l = (e) => {
        const { key: n } = e,
          l = e.shiftKey,
          c = /up|down/i.test(n),
          u = /left|right/i.test(n)
        if (!c && !u) return
        if (a && u) return
        if (s && c) return
        const d = l ? o : 1
        r && e.stopPropagation(),
          t.dispatchEvent(
            new CustomEvent('nudge', {
              bubbles: i,
              detail: j(
                (/left/i.test(n) ? -1 : /right/i.test(n) ? 1 : 0) * d,
                (/up/i.test(n) ? -1 : /down/i.test(n) ? 1 : 0) * d
              ),
            })
          )
      }
    return (
      t.addEventListener('keydown', l),
      {
        destroy() {
          t.removeEventListener('keydown', l)
        },
      }
    )
  }
function il(t, e) {
  return e * Math.sign(t) * Math.log10(1 + Math.abs(t) / e)
}
const rl = (t, e, n) => {
  if (!e) return Rt(t)
  const o = t.x + il(e.x - t.x, n),
    i = t.x + t.width + il(e.x + e.width - (t.x + t.width), n),
    r = t.y + il(e.y - t.y, n)
  return {
    x: o,
    y: r,
    width: i - o,
    height: t.y + t.height + il(e.y + e.height - (t.y + t.height), n) - r,
  }
}
var al = (t, e) => {
    if (t) return /em/.test(t) ? 16 * parseInt(t, 10) : /px/.test(t) ? parseInt(t, 10) : void 0
  },
  sl = (t) => {
    let e = t.detail || 0
    const { deltaX: n, deltaY: o, wheelDelta: i, wheelDeltaX: r, wheelDeltaY: a } = t
    return (
      We(r) && Math.abs(r) > Math.abs(a)
        ? (e = r / -120)
        : We(n) && Math.abs(n) > Math.abs(o)
        ? (e = n / 20)
        : (i || a) && (e = (i || a) / -120),
      e || (e = o / 20),
      e
    )
  }
function ll(t) {
  let e, n, o, i, r, a, s
  const l = t[37].default,
    c = Bo(l, t, t[36], null)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        c && c.c(),
        ii(n, 'style', t[6]),
        ii(e, 'class', (o = bs(['PinturaScrollable', t[0]]))),
        ii(e, 'style', t[4]),
        ii(e, 'data-direction', t[1]),
        ii(e, 'data-state', t[5])
    },
    m(o, l) {
      Go(o, e, l),
        Yo(e, n),
        c && c.m(n, null),
        t[39](e),
        (r = !0),
        a ||
          ((s = [
            ei(n, 'interactionstart', t[9]),
            ei(n, 'interactionupdate', t[11]),
            ei(n, 'interactionend', t[12]),
            ei(n, 'interactionrelease', t[10]),
            Wo(nl.call(null, n, { inertia: !0 })),
            ei(n, 'measure', t[38]),
            Wo(Ua.call(null, n)),
            ei(e, 'wheel', t[14], { passive: !1 }),
            ei(e, 'scroll', t[16]),
            ei(e, 'focusin', t[15]),
            ei(e, 'nudge', t[17]),
            ei(e, 'measure', t[13]),
            Wo(Ua.call(null, e, { observePosition: !0 })),
            Wo(
              (i = ol.call(null, e, {
                direction: 'x' === t[1] ? 'horizontal' : 'vertical',
                stopKeydownPropagation: !1,
              }))
            ),
          ]),
          (a = !0))
    },
    p(t, a) {
      c && c.p && 32 & a[1] && Do(c, l, t, t[36], a, null, null),
        (!r || 64 & a[0]) && ii(n, 'style', t[6]),
        (!r || (1 & a[0] && o !== (o = bs(['PinturaScrollable', t[0]])))) && ii(e, 'class', o),
        (!r || 16 & a[0]) && ii(e, 'style', t[4]),
        (!r || 2 & a[0]) && ii(e, 'data-direction', t[1]),
        (!r || 32 & a[0]) && ii(e, 'data-state', t[5]),
        i &&
          Eo(i.update) &&
          2 & a[0] &&
          i.update.call(null, {
            direction: 'x' === t[1] ? 'horizontal' : 'vertical',
            stopKeydownPropagation: !1,
          })
    },
    i(t) {
      r || (Vi(c, t), (r = !0))
    },
    o(t) {
      Ni(c, t), (r = !1)
    },
    d(n) {
      n && Zo(e), c && c.d(n), t[39](null), (a = !1), Po(s)
    },
  }
}
function cl(t, e, n) {
  let o,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    { $$slots: h = {}, $$scope: g } = e
  const m = xi(),
    f = vi('keysPressed')
  Fo(t, f, (t) => n(46, (p = t)))
  let $,
    y,
    x,
    b,
    v = 'idle',
    w = Ia(0)
  Fo(t, w, (t) => n(34, (d = t)))
  let S,
    { class: k } = e,
    { scrollBlockInteractionDist: C = 5 } = e,
    { scrollStep: M = 10 } = e,
    { scrollFocusMargin: R = 64 } = e,
    { scrollDirection: T = 'x' } = e,
    { scrollAutoCancel: P = !1 } = e,
    { elasticity: E = 0 } = e,
    { onscroll: A = i } = e,
    { maskFeatherSize: I } = e,
    { maskFeatherStartOpacity: L } = e,
    { maskFeatherEndOpacity: F } = e,
    { scroll: B } = e,
    z = '',
    D = !0
  w.subscribe((t) => {
    const e = X()
    ;(e[T] = t), A(e)
  })
  const O = (t) => Math.max(Math.min(0, t), x[o] - y[o])
  let _, W, V
  const N = (t, e = {}) => {
    const { elastic: o = !1, animate: i = !1 } = e
    Math.abs(t) > C && 'idle' === v && !b && n(28, (v = 'scrolling'))
    const r = O(t),
      a = o && E && !b ? r + il(t - r, E) : r
    let s = !0
    i ? (s = !1) : D || (s = !b),
      (D = !1),
      w.set(a, { hard: s }).then((t) => {
        b && (D = !0)
      })
  }
  return (
    (t.$$set = (t) => {
      'class' in t && n(0, (k = t.class)),
        'scrollBlockInteractionDist' in t && n(21, (C = t.scrollBlockInteractionDist)),
        'scrollStep' in t && n(22, (M = t.scrollStep)),
        'scrollFocusMargin' in t && n(23, (R = t.scrollFocusMargin)),
        'scrollDirection' in t && n(1, (T = t.scrollDirection)),
        'scrollAutoCancel' in t && n(24, (P = t.scrollAutoCancel)),
        'elasticity' in t && n(25, (E = t.elasticity)),
        'onscroll' in t && n(26, (A = t.onscroll)),
        'maskFeatherSize' in t && n(20, (I = t.maskFeatherSize)),
        'maskFeatherStartOpacity' in t && n(18, (L = t.maskFeatherStartOpacity)),
        'maskFeatherEndOpacity' in t && n(19, (F = t.maskFeatherEndOpacity)),
        'scroll' in t && n(27, (B = t.scroll)),
        '$$scope' in t && n(36, (g = t.$$scope))
    }),
    (t.$$.update = () => {
      if (
        (2 & t.$$.dirty[0] && n(30, (o = 'x' === T ? 'width' : 'height')),
        2 & t.$$.dirty[0] && n(31, (r = T.toUpperCase())),
        8 & t.$$.dirty[0] && n(32, (a = S && getComputedStyle(S))),
        (8 & t.$$.dirty[0]) | (2 & t.$$.dirty[1]) &&
          n(33, (s = a && al(a.getPropertyValue('--scrollable-feather-size')))),
        (1611399172 & t.$$.dirty[0]) | (12 & t.$$.dirty[1]) && null != d && x && null != s && y)
      ) {
        const t = -d / s,
          e = -(x[o] - y[o] - d) / s
        n(18, (L = Mr(1 - t, 0, 1))),
          n(19, (F = Mr(1 - e, 0, 1))),
          n(20, (I = s)),
          n(
            4,
            (z = `--scrollable-feather-start-opacity: ${L};--scrollable-feather-end-opacity: ${F}`)
          )
      }
      134217736 & t.$$.dirty[0] && S && void 0 !== B && (We(B) ? N(B) : N(B.scrollOffset, B)),
        1610612740 & t.$$.dirty[0] && n(35, (l = x && y ? y[o] > x[o] : void 0)),
        (268435456 & t.$$.dirty[0]) | (16 & t.$$.dirty[1]) &&
          n(5, (c = bs([v, l ? 'overflows' : void 0]))),
        25 & t.$$.dirty[1] && n(6, (u = l ? `transform: translate${r}(${d}px)` : void 0))
    }),
    [
      k,
      T,
      y,
      S,
      z,
      c,
      u,
      f,
      w,
      () => {
        l && ((W = !1), (_ = !0), (V = j(0, 0)), (b = !1), n(28, (v = 'idle')), ($ = Lo(w)))
      },
      ({ detail: t }) => {
        l && ((b = !0), n(28, (v = 'idle')))
      },
      ({ detail: t }) => {
        l &&
          (W ||
            (_ && ((_ = !1), rt(t.translation) < 0.1)) ||
            (!P ||
            'x' !== T ||
            ((t) => {
              const e = tt(j(t.x - V.x, t.y - V.y), Math.abs)
              V = G(t)
              const n = rt(e),
                o = e.x - e.y
              return !(n > 1 && o < -0.5)
            })(t.translation)
              ? N($ + t.translation[T], { elastic: !0 })
              : (W = !0)))
      },
      ({ detail: t }) => {
        if (!l) return
        if (W) return
        const e = $ + t.translation[T],
          n = O(e)
        ;(D = !1),
          w.set(n).then((t) => {
            b && (D = !0)
          })
      },
      ({ detail: t }) => {
        n(29, (x = t)), m('measure', { x: t.x, y: t.y, width: t.width, height: t.height })
      },
      (t) => {
        if (!l) return
        t.preventDefault(), t.stopPropagation()
        const e = sl(t),
          n = Lo(w)
        N(n + e * M, { animate: !0 })
      },
      (t) => {
        if (!l) return
        if (!b && !p.length) return
        let e = t.target
        t.target.classList.contains('implicit') && (e = e.parentNode)
        const n = e['x' === T ? 'offsetLeft' : 'offsetTop'],
          i = n + e['x' === T ? 'offsetWidth' : 'offsetHeight'],
          r = Lo(w),
          a = R + I
        r + n < a ? N(-n + a) : r + i > x[o] - a && N(x[o] - i - a, { animate: !0 })
      },
      () => {
        n(3, (S['x' === T ? 'scrollLeft' : 'scrollTop'] = 0), S)
      },
      ({ detail: t }) => {
        const e = -2 * t[T],
          n = Lo(w)
        N(n + e * M, { animate: !0 })
      },
      L,
      F,
      I,
      C,
      M,
      R,
      P,
      E,
      A,
      B,
      v,
      x,
      o,
      r,
      a,
      s,
      d,
      l,
      g,
      h,
      (t) => n(2, (y = t.detail)),
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(S = t), n(3, S)
        })
      },
    ]
  )
}
class ul extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        cl,
        ll,
        Ao,
        {
          class: 0,
          scrollBlockInteractionDist: 21,
          scrollStep: 22,
          scrollFocusMargin: 23,
          scrollDirection: 1,
          scrollAutoCancel: 24,
          elasticity: 25,
          onscroll: 26,
          maskFeatherSize: 20,
          maskFeatherStartOpacity: 18,
          maskFeatherEndOpacity: 19,
          scroll: 27,
        },
        [-1, -1]
      )
  }
}
function dl(t, { delay: e = 0, duration: n = 400, easing: o = Co } = {}) {
  const i = +getComputedStyle(t).opacity
  return { delay: e, duration: n, easing: o, css: (t) => 'opacity: ' + t * i }
}
function pl(t) {
  let e, n, o, i, r, a
  return {
    c() {
      ;(e = qo('span')), (n = Qo(t[0])), ii(e, 'class', 'PinturaStatusMessage')
    },
    m(o, s) {
      Go(o, e, s),
        Yo(e, n),
        (i = !0),
        r ||
          ((a = [
            ei(e, 'measure', function () {
              Eo(t[1]) && t[1].apply(this, arguments)
            }),
            Wo(Ua.call(null, e)),
          ]),
          (r = !0))
    },
    p(e, [o]) {
      ;(t = e), (!i || 1 & o) && ai(n, t[0])
    },
    i(t) {
      i ||
        (Pi(() => {
          o || (o = Hi(e, dl, {}, !0)), o.run(1)
        }),
        (i = !0))
    },
    o(t) {
      o || (o = Hi(e, dl, {}, !1)), o.run(0), (i = !1)
    },
    d(t) {
      t && Zo(e), t && o && o.end(), (r = !1), Po(a)
    },
  }
}
function hl(t, e, n) {
  let { text: o } = e,
    { onmeasure: r = i } = e
  return (
    (t.$$set = (t) => {
      'text' in t && n(0, (o = t.text)), 'onmeasure' in t && n(1, (r = t.onmeasure))
    }),
    [o, r]
  )
}
class gl extends or {
  constructor(t) {
    super(), nr(this, t, hl, pl, Ao, { text: 0, onmeasure: 1 })
  }
}
function ml(t) {
  let e, n, o, i, r, a, s, l
  return {
    c() {
      ;(e = qo('span')),
        (n = Ko('svg')),
        (o = Ko('g')),
        (i = Ko('circle')),
        (r = Ko('circle')),
        (a = Jo()),
        (s = qo('span')),
        (l = Qo(t[0])),
        ii(i, 'class', 'PinturaProgressIndicatorBar'),
        ii(i, 'r', '8.5'),
        ii(i, 'cx', '10'),
        ii(i, 'cy', '10'),
        ii(i, 'stroke-linecap', 'round'),
        ii(i, 'opacity', '.25'),
        ii(r, 'class', 'PinturaProgressIndicatorFill'),
        ii(r, 'r', '8.5'),
        ii(r, 'stroke-dasharray', t[1]),
        ii(r, 'cx', '10'),
        ii(r, 'cy', '10'),
        ii(r, 'transform', 'rotate(-90) translate(-20)'),
        ii(o, 'fill', 'none'),
        ii(o, 'stroke', 'currentColor'),
        ii(o, 'stroke-width', '2.5'),
        ii(o, 'stroke-linecap', 'round'),
        ii(o, 'opacity', t[2]),
        ii(n, 'width', '20'),
        ii(n, 'height', '20'),
        ii(n, 'viewBox', '0 0 20 20'),
        ii(n, 'xmlns', 'http://www.w3.org/2000/svg'),
        ii(n, 'aria-hidden', 'true'),
        ii(n, 'focusable', 'false'),
        ii(s, 'class', 'implicit'),
        ii(e, 'class', 'PinturaProgressIndicator'),
        ii(e, 'data-status', t[3])
    },
    m(t, c) {
      Go(t, e, c), Yo(e, n), Yo(n, o), Yo(o, i), Yo(o, r), Yo(e, a), Yo(e, s), Yo(s, l)
    },
    p(t, [n]) {
      2 & n && ii(r, 'stroke-dasharray', t[1]),
        4 & n && ii(o, 'opacity', t[2]),
        1 & n && ai(l, t[0]),
        8 & n && ii(e, 'data-status', t[3])
    },
    i: ko,
    o: ko,
    d(t) {
      t && Zo(e)
    },
  }
}
function fl(t, e, n) {
  let o, i, r, a, s
  const l = xi()
  let { progress: c } = e,
    { min: u = 0 } = e,
    { max: d = 100 } = e,
    { labelBusy: p = 'Busy' } = e
  const h = Ia(0, { precision: 0.01 }),
    g = sr([h], (t) => Mr(t, u, d))
  return (
    Fo(t, g, (t) => n(9, (s = t))),
    g.subscribe((t) => {
      1 === c && Math.round(t) >= 100 && l('complete')
    }),
    (t.$$set = (t) => {
      'progress' in t && n(5, (c = t.progress)),
        'min' in t && n(6, (u = t.min)),
        'max' in t && n(7, (d = t.max)),
        'labelBusy' in t && n(8, (p = t.labelBusy))
    }),
    (t.$$.update = () => {
      32 & t.$$.dirty && c && c !== 1 / 0 && h.set(100 * c),
        800 & t.$$.dirty && n(0, (o = c === 1 / 0 ? p : Math.round(s) + '%')),
        544 & t.$$.dirty && n(1, (i = c === 1 / 0 ? '26.5 53' : (s / 100) * 53 + ' 53')),
        544 & t.$$.dirty && n(2, (r = Math.min(1, c === 1 / 0 ? 1 : s / 10))),
        32 & t.$$.dirty && n(3, (a = c === 1 / 0 ? 'busy' : 'loading'))
    }),
    [o, i, r, a, g, c, u, d, p, s]
  )
}
class $l extends or {
  constructor(t) {
    super(), nr(this, t, fl, ml, Ao, { progress: 5, min: 6, max: 7, labelBusy: 8 })
  }
}
function yl(t) {
  let e, n, o
  return (
    (n = new $l({ props: { progress: t[0] } })),
    n.$on('complete', function () {
      Eo(t[1]) && t[1].apply(this, arguments)
    }),
    {
      c() {
        ;(e = qo('span')),
          Qi(n.$$.fragment),
          ii(e, 'class', 'PinturaStatusProgress'),
          ii(e, 'style', t[2])
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(i, [r]) {
        t = i
        const a = {}
        1 & r && (a.progress = t[0]), n.$set(a), (!o || 4 & r) && ii(e, 'style', t[2])
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function xl(t, e, n) {
  let o,
    { offset: r = 0 } = e,
    { visible: a = !0 } = e,
    { progress: s } = e,
    { oncomplete: l = i } = e
  return (
    (t.$$set = (t) => {
      'offset' in t && n(3, (r = t.offset)),
        'visible' in t && n(4, (a = t.visible)),
        'progress' in t && n(0, (s = t.progress)),
        'oncomplete' in t && n(1, (l = t.oncomplete))
    }),
    (t.$$.update = () => {
      24 & t.$$.dirty && n(2, (o = `transform: translateX(${r}px); opacity: ${a ? 1 : 0}`))
    }),
    [s, l, o, r, a]
  )
}
class bl extends or {
  constructor(t) {
    super(), nr(this, t, xl, yl, Ao, { offset: 3, visible: 4, progress: 0, oncomplete: 1 })
  }
}
var vl = () => (c() && window.devicePixelRatio) || 1
let wl = null
var Sl = (t) => (null === wl && (wl = 1 === vl() ? (t) => Math.round(t) : (t) => t), wl(t))
const kl = (t) => ({}),
  Cl = (t) => ({}),
  Ml = (t) => ({}),
  Rl = (t) => ({})
function Tl(t) {
  let e
  const n = t[30].label,
    o = Bo(n, t, t[34], Rl)
  return {
    c() {
      o && o.c()
    },
    m(t, n) {
      o && o.m(t, n), (e = !0)
    },
    p(t, e) {
      o && o.p && 8 & e[1] && Do(o, n, t, t[34], e, Ml, Rl)
    },
    i(t) {
      e || (Vi(o, t), (e = !0))
    },
    o(t) {
      Ni(o, t), (e = !1)
    },
    d(t) {
      o && o.d(t)
    },
  }
}
function Pl(t) {
  let e, n, o, i, r
  const a = t[30].details,
    s = Bo(a, t, t[34], Cl)
  return {
    c() {
      ;(e = qo('div')),
        s && s.c(),
        ii(e, 'class', (n = bs(['PinturaDetailsPanel', t[1]]))),
        ii(e, 'tabindex', '-1'),
        ii(e, 'style', t[6])
    },
    m(n, a) {
      Go(n, e, a),
        s && s.m(e, null),
        t[32](e),
        (o = !0),
        i ||
          ((r = [ei(e, 'keydown', t[16]), ei(e, 'measure', t[33]), Wo(Ua.call(null, e))]), (i = !0))
    },
    p(t, i) {
      s && s.p && 8 & i[1] && Do(s, a, t, t[34], i, kl, Cl),
        (!o || (2 & i[0] && n !== (n = bs(['PinturaDetailsPanel', t[1]])))) && ii(e, 'class', n),
        (!o || 64 & i[0]) && ii(e, 'style', t[6])
    },
    i(t) {
      o || (Vi(s, t), (o = !0))
    },
    o(t) {
      Ni(s, t), (o = !1)
    },
    d(n) {
      n && Zo(e), s && s.d(n), t[32](null), (i = !1), Po(r)
    },
  }
}
function El(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = {
      class: bs(['PinturaDetailsButton', t[0]]),
      onkeydown: t[15],
      onclick: t[14],
      $$slots: { default: [Tl] },
      $$scope: { ctx: t },
    }
  ;(n = new Js({ props: c })), t[31](n)
  let u = t[5] && Pl(t)
  return {
    c() {
      ;(e = Jo()), Qi(n.$$.fragment), (o = Jo()), u && u.c(), (i = Jo()), (r = ti())
    },
    m(c, d) {
      Go(c, e, d),
        Ji(n, c, d),
        Go(c, o, d),
        u && u.m(c, d),
        Go(c, i, d),
        Go(c, r, d),
        (a = !0),
        s ||
          ((l = [
            ei(document.body, 'pointerdown', function () {
              Eo(t[7]) && t[7].apply(this, arguments)
            }),
            ei(document.body, 'pointerup', function () {
              Eo(t[8]) && t[8].apply(this, arguments)
            }),
          ]),
          (s = !0))
    },
    p(e, o) {
      t = e
      const r = {}
      1 & o[0] && (r.class = bs(['PinturaDetailsButton', t[0]])),
        8 & o[1] && (r.$$scope = { dirty: o, ctx: t }),
        n.$set(r),
        t[5]
          ? u
            ? (u.p(t, o), 32 & o[0] && Vi(u, 1))
            : ((u = Pl(t)), u.c(), Vi(u, 1), u.m(i.parentNode, i))
          : u &&
            (_i(),
            Ni(u, 1, 1, () => {
              u = null
            }),
            Wi())
    },
    i(t) {
      a || (Vi(n.$$.fragment, t), Vi(u), Vi(false), (a = !0))
    },
    o(t) {
      Ni(n.$$.fragment, t), Ni(u), Ni(false), (a = !1)
    },
    d(a) {
      a && Zo(e),
        t[31](null),
        tr(n, a),
        a && Zo(o),
        u && u.d(a),
        a && Zo(i),
        a && Zo(r),
        (s = !1),
        Po(l)
    },
  }
}
function Al(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    { $$slots: m = {}, $$scope: f } = e,
    { buttonClass: $ } = e,
    { panelClass: y } = e,
    { isActive: x = !1 } = e,
    { onshow: b = ({ panel: t }) => t.focus() } = e
  const v = vi('rootPortal')
  Fo(t, v, (t) => n(29, (g = t)))
  const w = vi('rootRect')
  let S, k, C
  Fo(t, w, (t) => n(23, (u = t)))
  let M = X(),
    R = Ia(0)
  Fo(t, R, (t) => n(25, (p = t)))
  const T = ar({ x: 0, y: 0 })
  Fo(t, T, (t) => n(24, (d = t)))
  const P = Ia(-5)
  Fo(t, P, (t) => n(28, (h = t)))
  const E = (t) => Ys(t, g) || k.isEventTarget(t)
  let A,
    I,
    L = !1
  yi(() => {
    g && A && g.removeChild(A)
  })
  return (
    (t.$$set = (t) => {
      'buttonClass' in t && n(0, ($ = t.buttonClass)),
        'panelClass' in t && n(1, (y = t.panelClass)),
        'isActive' in t && n(17, (x = t.isActive)),
        'onshow' in t && n(18, (b = t.onshow)),
        '$$scope' in t && n(34, (f = t.$$scope))
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && (o = k && k.getElement()),
        2228224 & t.$$.dirty[0] &&
          n(
            8,
            (c = x
              ? (t) => {
                  L && (n(21, (L = !1)), E(t) || n(17, (x = !1)))
                }
              : void 0)
          ),
        131072 & t.$$.dirty[0] && R.set(x ? 1 : 0),
        131072 & t.$$.dirty[0] && P.set(x ? 0 : -5),
        8912900 & t.$$.dirty[0] && u && S && C)
      ) {
        let t = C.x - u.x + 0.5 * C.width - 0.5 * S.width,
          e = C.y - u.y + C.height
        const o = 12,
          i = 12,
          r = u.width - 12,
          a = u.height - 12,
          s = t,
          l = e,
          c = s + S.width,
          p = l + S.height
        if ((s < o && (t = o), c > r && (t = r - S.width), p > a)) {
          n(20, (M.y = -1), M)
          e -= i < e - S.height - C.height ? S.height + C.height : p - a
        } else n(20, (M.y = 1), M)
        _o(T, (d = tt(j(t, e), Sl)), d)
      }
      33554432 & t.$$.dirty[0] && n(5, (i = p > 0)),
        33554432 & t.$$.dirty[0] && n(26, (r = p < 1)),
        286261248 & t.$$.dirty[0] &&
          n(27, (a = `translateX(${d.x + 12 * M.x}px) translateY(${d.y + 12 * M.y + M.y * h}px)`)),
        234881024 & t.$$.dirty[0] &&
          n(
            6,
            (s = r
              ? `opacity: ${p}; pointer-events: ${p < 1 ? 'none' : 'all'}; transform: ${a};`
              : 'transform: ' + a)
          ),
        131072 & t.$$.dirty[0] &&
          n(
            7,
            (l = x
              ? (t) => {
                  E(t) || n(21, (L = !0))
                }
              : void 0)
          ),
        536870960 & t.$$.dirty[0] && i && g && A && A.parentNode !== g && g.appendChild(A),
        131072 & t.$$.dirty[0] && (x || n(22, (I = void 0))),
        4456496 & t.$$.dirty[0] && i && A && b({ e: I, panel: A })
    }),
    [
      $,
      y,
      S,
      k,
      A,
      i,
      s,
      l,
      c,
      v,
      w,
      R,
      T,
      P,
      (t) => {
        x || n(19, (C = o.getBoundingClientRect())), n(22, (I = t)), n(17, (x = !x))
      },
      (t) => {
        ;/down/i.test(t.key) && (n(17, (x = !0)), n(22, (I = t)))
      },
      (t) => {
        ;/esc/i.test(t.key) && (n(17, (x = !1)), o.focus())
      },
      x,
      b,
      C,
      M,
      L,
      I,
      u,
      d,
      p,
      r,
      a,
      h,
      g,
      m,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(k = t), n(3, k)
        })
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(A = t), n(4, A)
        })
      },
      (t) => n(2, (S = pt(t.detail))),
      f,
    ]
  )
}
class Il extends or {
  constructor(t) {
    super(),
      nr(this, t, Al, El, Ao, { buttonClass: 0, panelClass: 1, isActive: 17, onshow: 18 }, [-1, -1])
  }
}
function Ll(t) {
  let e, n, o, i, r, a, s, l
  const c = t[14].default,
    u = Bo(c, t, t[13], null)
  return {
    c() {
      ;(e = qo('li')),
        (n = qo('input')),
        (o = Jo()),
        (i = qo('label')),
        u && u.c(),
        ii(n, 'type', 'radio'),
        ii(n, 'class', 'implicit'),
        ii(n, 'id', t[6]),
        ii(n, 'name', t[0]),
        (n.value = t[3]),
        (n.disabled = t[5]),
        (n.checked = t[4]),
        ii(i, 'for', t[6]),
        ii(i, 'title', t[2]),
        ii(e, 'class', (r = bs(['PinturaRadioGroupOption', t[1]]))),
        ii(e, 'data-disabled', t[5]),
        ii(e, 'data-selected', t[4])
    },
    m(r, c) {
      Go(r, e, c),
        Yo(e, n),
        Yo(e, o),
        Yo(e, i),
        u && u.m(i, null),
        (a = !0),
        s ||
          ((l = [ei(n, 'change', oi(t[15])), ei(n, 'keydown', t[8]), ei(n, 'click', t[9])]),
          (s = !0))
    },
    p(t, [o]) {
      ;(!a || 64 & o) && ii(n, 'id', t[6]),
        (!a || 1 & o) && ii(n, 'name', t[0]),
        (!a || 8 & o) && (n.value = t[3]),
        (!a || 32 & o) && (n.disabled = t[5]),
        (!a || 16 & o) && (n.checked = t[4]),
        u && u.p && 8192 & o && Do(u, c, t, t[13], o, null, null),
        (!a || 64 & o) && ii(i, 'for', t[6]),
        (!a || 4 & o) && ii(i, 'title', t[2]),
        (!a || (2 & o && r !== (r = bs(['PinturaRadioGroupOption', t[1]])))) && ii(e, 'class', r),
        (!a || 32 & o) && ii(e, 'data-disabled', t[5]),
        (!a || 16 & o) && ii(e, 'data-selected', t[4])
    },
    i(t) {
      a || (Vi(u, t), (a = !0))
    },
    o(t) {
      Ni(u, t), (a = !1)
    },
    d(t) {
      t && Zo(e), u && u.d(t), (s = !1), Po(l)
    },
  }
}
function Fl(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    { name: s } = e,
    { class: l } = e,
    { label: c } = e,
    { id: u } = e,
    { value: d } = e,
    { checked: p } = e,
    { onkeydown: h } = e,
    { onclick: g } = e,
    { disabled: m = !1 } = e
  const f = vi('keysPressed')
  Fo(t, f, (t) => n(16, (i = t)))
  return (
    (t.$$set = (t) => {
      'name' in t && n(0, (s = t.name)),
        'class' in t && n(1, (l = t.class)),
        'label' in t && n(2, (c = t.label)),
        'id' in t && n(10, (u = t.id)),
        'value' in t && n(3, (d = t.value)),
        'checked' in t && n(4, (p = t.checked)),
        'onkeydown' in t && n(11, (h = t.onkeydown)),
        'onclick' in t && n(12, (g = t.onclick)),
        'disabled' in t && n(5, (m = t.disabled)),
        '$$scope' in t && n(13, (a = t.$$scope))
    }),
    (t.$$.update = () => {
      1025 & t.$$.dirty && n(6, (o = `${s}-${u}`))
    }),
    [
      s,
      l,
      c,
      d,
      p,
      m,
      o,
      f,
      (t) => {
        h(t)
      },
      (t) => {
        i.length || g(t)
      },
      u,
      h,
      g,
      a,
      r,
      function (e) {
        wi(t, e)
      },
    ]
  )
}
class Bl extends or {
  constructor(t) {
    super(),
      nr(this, t, Fl, Ll, Ao, {
        name: 0,
        class: 1,
        label: 2,
        id: 10,
        value: 3,
        checked: 4,
        onkeydown: 11,
        onclick: 12,
        disabled: 5,
      })
  }
}
var zl = (t = []) =>
  t.reduce(
    (t, e) =>
      (He(e) ? He(e[1]) : !!e.options) ? t.concat(He(e) ? e[1] : e.options) : (t.push(e), t),
    []
  )
const Dl = (t, e, n) => {
  let o
  return (
    He(t)
      ? (o = { id: e, value: t[0], label: t[1], ...(t[2] || {}) })
      : ((o = t), (o.id = null != o.id ? o.id : e)),
    n ? n(o) : o
  )
}
var Ol = (t, e, n) => (Ue(t) ? t(e, n) : t)
const _l = (t, e) =>
  t.map(([t, n, o]) => {
    if (He(n)) return [Ol(t, e), _l(n, e)]
    {
      const i = [t, Ol(n, e)]
      if (o) {
        let t = { ...o }
        o.icon && (t.icon = Ol(o.icon, e)), i.push(t)
      }
      return i
    }
  })
var Wl = (t, e) => _l(t, e)
function Vl(t, e, n) {
  const o = t.slice()
  return (o[27] = e[n]), o
}
const Nl = (t) => ({ option: 2048 & t[0] }),
  Ul = (t) => ({ option: t[27] })
function Hl(t, e, n) {
  const o = t.slice()
  return (o[27] = e[n]), o
}
const Xl = (t) => ({ option: 2048 & t[0] }),
  jl = (t) => ({ option: t[27] }),
  Yl = (t) => ({ option: 2048 & t[0] }),
  Gl = (t) => ({ option: t[27] })
function Zl(t) {
  let e,
    n,
    o,
    i,
    r,
    a = [],
    s = new Map(),
    l = t[1] && ql(t),
    c = t[11]
  const u = (t) => t[27].id
  for (let e = 0; e < c.length; e += 1) {
    let n = Vl(t, c, e),
      o = u(n)
    s.set(o, (a[e] = lc(o, n)))
  }
  return {
    c() {
      ;(e = qo('fieldset')), l && l.c(), (n = Jo()), (o = qo('ul'))
      for (let t = 0; t < a.length; t += 1) a[t].c()
      ii(o, 'class', 'PinturaRadioGroupOptions'),
        ii(e, 'class', (i = bs(['PinturaRadioGroup', t[3]]))),
        ii(e, 'data-layout', t[5]),
        ii(e, 'title', t[7])
    },
    m(t, i) {
      Go(t, e, i), l && l.m(e, null), Yo(e, n), Yo(e, o)
      for (let t = 0; t < a.length; t += 1) a[t].m(o, null)
      r = !0
    },
    p(t, d) {
      t[1] ? (l ? l.p(t, d) : ((l = ql(t)), l.c(), l.m(e, n))) : l && (l.d(1), (l = null)),
        8420177 & d[0] &&
          ((c = t[11]), _i(), (a = Gi(a, d, u, 1, t, c, s, o, Yi, lc, null, Vl)), Wi()),
        (!r || (8 & d[0] && i !== (i = bs(['PinturaRadioGroup', t[3]])))) && ii(e, 'class', i),
        (!r || 32 & d[0]) && ii(e, 'data-layout', t[5]),
        (!r || 128 & d[0]) && ii(e, 'title', t[7])
    },
    i(t) {
      if (!r) {
        for (let t = 0; t < c.length; t += 1) Vi(a[t])
        r = !0
      }
    },
    o(t) {
      for (let t = 0; t < a.length; t += 1) Ni(a[t])
      r = !1
    },
    d(t) {
      t && Zo(e), l && l.d()
      for (let t = 0; t < a.length; t += 1) a[t].d()
    },
  }
}
function ql(t) {
  let e, n, o
  return {
    c() {
      ;(e = qo('legend')), (n = Qo(t[1])), ii(e, 'class', (o = t[2] && 'implicit'))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, i) {
      2 & i[0] && ai(n, t[1]), 4 & i[0] && o !== (o = t[2] && 'implicit') && ii(e, 'class', o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Kl(t) {
  let e, n
  return (
    (e = new Bl({
      props: {
        name: t[4],
        label: t[27].label,
        id: t[27].id,
        value: t[27].value,
        disabled: t[27].disabled,
        class: t[8],
        checked: t[12](t[27]) === t[0],
        onkeydown: t[13](t[27]),
        onclick: t[14](t[27]),
        $$slots: { default: [nc] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        16 & n[0] && (o.name = t[4]),
          2048 & n[0] && (o.label = t[27].label),
          2048 & n[0] && (o.id = t[27].id),
          2048 & n[0] && (o.value = t[27].value),
          2048 & n[0] && (o.disabled = t[27].disabled),
          256 & n[0] && (o.class = t[8]),
          2049 & n[0] && (o.checked = t[12](t[27]) === t[0]),
          2048 & n[0] && (o.onkeydown = t[13](t[27])),
          2048 & n[0] && (o.onclick = t[14](t[27])),
          8390720 & n[0] && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Ql(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s = [],
    l = new Map()
  const c = t[22].group,
    u = Bo(c, t, t[23], Gl),
    d =
      u ||
      (function (t) {
        let e,
          n,
          o = t[27].label + ''
        return {
          c() {
            ;(e = qo('span')), (n = Qo(o)), ii(e, 'class', 'PinturaRadioGroupOptionGroupLabel')
          },
          m(t, o) {
            Go(t, e, o), Yo(e, n)
          },
          p(t, e) {
            2048 & e[0] && o !== (o = t[27].label + '') && ai(n, o)
          },
          d(t) {
            t && Zo(e)
          },
        }
      })(t)
  let p = t[27].options
  const h = (t) => t[27].id
  for (let e = 0; e < p.length; e += 1) {
    let n = Hl(t, p, e),
      o = h(n)
    l.set(o, (s[e] = sc(o, n)))
  }
  return {
    c() {
      ;(e = qo('li')), d && d.c(), (n = Jo()), (o = qo('ul'))
      for (let t = 0; t < s.length; t += 1) s[t].c()
      ;(i = Jo()),
        ii(o, 'class', 'PinturaRadioGroupOptions'),
        ii(e, 'class', (r = bs(['PinturaRadioGroupOptionGroup', t[9]])))
    },
    m(t, r) {
      Go(t, e, r), d && d.m(e, null), Yo(e, n), Yo(e, o)
      for (let t = 0; t < s.length; t += 1) s[t].m(o, null)
      Yo(e, i), (a = !0)
    },
    p(t, n) {
      u
        ? u.p && 8390656 & n[0] && Do(u, c, t, t[23], n, Yl, Gl)
        : d && d.p && 2048 & n[0] && d.p(t, n),
        8419665 & n[0] &&
          ((p = t[27].options), _i(), (s = Gi(s, n, h, 1, t, p, l, o, Yi, sc, null, Hl)), Wi()),
        (!a || (512 & n[0] && r !== (r = bs(['PinturaRadioGroupOptionGroup', t[9]])))) &&
          ii(e, 'class', r)
    },
    i(t) {
      if (!a) {
        Vi(d, t)
        for (let t = 0; t < p.length; t += 1) Vi(s[t])
        a = !0
      }
    },
    o(t) {
      Ni(d, t)
      for (let t = 0; t < s.length; t += 1) Ni(s[t])
      a = !1
    },
    d(t) {
      t && Zo(e), d && d.d(t)
      for (let t = 0; t < s.length; t += 1) s[t].d()
    },
  }
}
function Jl(t) {
  let e, n
  return (
    (e = new js({ props: { $$slots: { default: [tc] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8390656 & n[0] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function tc(t) {
  let e,
    n = t[27].icon + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      2048 & o[0] && n !== (n = t[27].icon + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function ec(t) {
  let e,
    n,
    o = t[27].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o)), ii(e, 'class', t[6])
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, i) {
      2048 & i[0] && o !== (o = t[27].label + '') && ai(n, o), 64 & i[0] && ii(e, 'class', t[6])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function nc(t) {
  let e
  const n = t[22].option,
    o = Bo(n, t, t[23], Ul),
    i =
      o ||
      (function (t) {
        let e,
          n,
          o,
          i = t[27].icon && Jl(t),
          r = !t[27].hideLabel && ec(t)
        return {
          c() {
            i && i.c(), (e = Jo()), r && r.c(), (n = Jo())
          },
          m(t, a) {
            i && i.m(t, a), Go(t, e, a), r && r.m(t, a), Go(t, n, a), (o = !0)
          },
          p(t, o) {
            t[27].icon
              ? i
                ? (i.p(t, o), 2048 & o[0] && Vi(i, 1))
                : ((i = Jl(t)), i.c(), Vi(i, 1), i.m(e.parentNode, e))
              : i &&
                (_i(),
                Ni(i, 1, 1, () => {
                  i = null
                }),
                Wi()),
              t[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(t, o)
                : ((r = ec(t)), r.c(), r.m(n.parentNode, n))
          },
          i(t) {
            o || (Vi(i), (o = !0))
          },
          o(t) {
            Ni(i), (o = !1)
          },
          d(t) {
            i && i.d(t), t && Zo(e), r && r.d(t), t && Zo(n)
          },
        }
      })(t)
  return {
    c() {
      i && i.c()
    },
    m(t, n) {
      i && i.m(t, n), (e = !0)
    },
    p(t, e) {
      o
        ? o.p && 8390656 & e[0] && Do(o, n, t, t[23], e, Nl, Ul)
        : i && i.p && 2112 & e[0] && i.p(t, e)
    },
    i(t) {
      e || (Vi(i, t), (e = !0))
    },
    o(t) {
      Ni(i, t), (e = !1)
    },
    d(t) {
      i && i.d(t)
    },
  }
}
function oc(t) {
  let e, n
  return (
    (e = new js({ props: { $$slots: { default: [ic] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8390656 & n[0] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function ic(t) {
  let e,
    n = t[27].icon + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      2048 & o[0] && n !== (n = t[27].icon + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function rc(t) {
  let e,
    n,
    o = t[27].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o)), ii(e, 'class', t[6])
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, i) {
      2048 & i[0] && o !== (o = t[27].label + '') && ai(n, o), 64 & i[0] && ii(e, 'class', t[6])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function ac(t) {
  let e
  const n = t[22].option,
    o = Bo(n, t, t[23], jl),
    i =
      o ||
      (function (t) {
        let e,
          n,
          o,
          i = t[27].icon && oc(t),
          r = !t[27].hideLabel && rc(t)
        return {
          c() {
            i && i.c(), (e = Jo()), r && r.c(), (n = Jo())
          },
          m(t, a) {
            i && i.m(t, a), Go(t, e, a), r && r.m(t, a), Go(t, n, a), (o = !0)
          },
          p(t, o) {
            t[27].icon
              ? i
                ? (i.p(t, o), 2048 & o[0] && Vi(i, 1))
                : ((i = oc(t)), i.c(), Vi(i, 1), i.m(e.parentNode, e))
              : i &&
                (_i(),
                Ni(i, 1, 1, () => {
                  i = null
                }),
                Wi()),
              t[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(t, o)
                : ((r = rc(t)), r.c(), r.m(n.parentNode, n))
          },
          i(t) {
            o || (Vi(i), (o = !0))
          },
          o(t) {
            Ni(i), (o = !1)
          },
          d(t) {
            i && i.d(t), t && Zo(e), r && r.d(t), t && Zo(n)
          },
        }
      })(t)
  return {
    c() {
      i && i.c()
    },
    m(t, n) {
      i && i.m(t, n), (e = !0)
    },
    p(t, e) {
      o
        ? o.p && 8390656 & e[0] && Do(o, n, t, t[23], e, Xl, jl)
        : i && i.p && 2112 & e[0] && i.p(t, e)
    },
    i(t) {
      e || (Vi(i, t), (e = !0))
    },
    o(t) {
      Ni(i, t), (e = !1)
    },
    d(t) {
      i && i.d(t)
    },
  }
}
function sc(t, e) {
  let n, o, i
  return (
    (o = new Bl({
      props: {
        name: e[4],
        label: e[27].label,
        id: e[27].id,
        value: e[27].value,
        disabled: e[27].disabled,
        class: e[8],
        checked: e[12](e[27]) === e[0],
        onkeydown: e[13](e[27]),
        onclick: e[14](e[27]),
        $$slots: { default: [ac] },
        $$scope: { ctx: e },
      },
    })),
    {
      key: t,
      first: null,
      c() {
        ;(n = ti()), Qi(o.$$.fragment), (this.first = n)
      },
      m(t, e) {
        Go(t, n, e), Ji(o, t, e), (i = !0)
      },
      p(t, n) {
        e = t
        const i = {}
        16 & n[0] && (i.name = e[4]),
          2048 & n[0] && (i.label = e[27].label),
          2048 & n[0] && (i.id = e[27].id),
          2048 & n[0] && (i.value = e[27].value),
          2048 & n[0] && (i.disabled = e[27].disabled),
          256 & n[0] && (i.class = e[8]),
          2049 & n[0] && (i.checked = e[12](e[27]) === e[0]),
          2048 & n[0] && (i.onkeydown = e[13](e[27])),
          2048 & n[0] && (i.onclick = e[14](e[27])),
          8390720 & n[0] && (i.$$scope = { dirty: n, ctx: e }),
          o.$set(i)
      },
      i(t) {
        i || (Vi(o.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(o.$$.fragment, t), (i = !1)
      },
      d(t) {
        t && Zo(n), tr(o, t)
      },
    }
  )
}
function lc(t, e) {
  let n, o, i, r, a
  const s = [Ql, Kl],
    l = []
  function c(t, e) {
    return t[27].options ? 0 : 1
  }
  return (
    (o = c(e)),
    (i = l[o] = s[o](e)),
    {
      key: t,
      first: null,
      c() {
        ;(n = ti()), i.c(), (r = ti()), (this.first = n)
      },
      m(t, e) {
        Go(t, n, e), l[o].m(t, e), Go(t, r, e), (a = !0)
      },
      p(t, n) {
        let a = o
        ;(o = c((e = t))),
          o === a
            ? l[o].p(e, n)
            : (_i(),
              Ni(l[a], 1, 1, () => {
                l[a] = null
              }),
              Wi(),
              (i = l[o]),
              i ? i.p(e, n) : ((i = l[o] = s[o](e)), i.c()),
              Vi(i, 1),
              i.m(r.parentNode, r))
      },
      i(t) {
        a || (Vi(i), (a = !0))
      },
      o(t) {
        Ni(i), (a = !1)
      },
      d(t) {
        t && Zo(n), l[o].d(t), t && Zo(r)
      },
    }
  )
}
function cc(t) {
  let e,
    n,
    o,
    i = t[10].length && Zl(t)
  return {
    c() {
      i && i.c(), (e = Jo()), (n = ti())
    },
    m(t, r) {
      i && i.m(t, r), Go(t, e, r), Go(t, n, r), (o = !0)
    },
    p(t, n) {
      t[10].length
        ? i
          ? (i.p(t, n), 1024 & n[0] && Vi(i, 1))
          : ((i = Zl(t)), i.c(), Vi(i, 1), i.m(e.parentNode, e))
        : i &&
          (_i(),
          Ni(i, 1, 1, () => {
            i = null
          }),
          Wi())
    },
    i(t) {
      o || (Vi(i), Vi(false), (o = !0))
    },
    o(t) {
      Ni(i), Ni(false), (o = !1)
    },
    d(t) {
      i && i.d(t), t && Zo(e), t && Zo(n)
    },
  }
}
function uc(t, e, n) {
  let o,
    i,
    r,
    { $$slots: a = {}, $$scope: s } = e
  const l = xi()
  let { label: c } = e,
    { hideLabel: u = !0 } = e,
    { class: d } = e,
    { name: p = 'radio-group-' + M() } = e,
    { selectedIndex: h = -1 } = e,
    { options: g = [] } = e,
    { onchange: m } = e,
    { layout: f } = e,
    { optionMapper: $ } = e,
    { optionFilter: y } = e,
    { value: x } = e,
    { optionLabelClass: b } = e,
    { title: v } = e,
    { locale: w } = e,
    { optionClass: S } = e,
    { optionGroupClass: k } = e
  const C = (t) => r.findIndex((e) => e.id === t.id),
    R = (t) => {
      n(0, (h = C(t)))
      const e = { index: h, ...t }
      ;((t, ...e) => {
        t && t(...e)
      })(m, e),
        l('change', e)
    }
  return (
    (t.$$set = (t) => {
      'label' in t && n(1, (c = t.label)),
        'hideLabel' in t && n(2, (u = t.hideLabel)),
        'class' in t && n(3, (d = t.class)),
        'name' in t && n(4, (p = t.name)),
        'selectedIndex' in t && n(0, (h = t.selectedIndex)),
        'options' in t && n(15, (g = t.options)),
        'onchange' in t && n(16, (m = t.onchange)),
        'layout' in t && n(5, (f = t.layout)),
        'optionMapper' in t && n(17, ($ = t.optionMapper)),
        'optionFilter' in t && n(18, (y = t.optionFilter)),
        'value' in t && n(19, (x = t.value)),
        'optionLabelClass' in t && n(6, (b = t.optionLabelClass)),
        'title' in t && n(7, (v = t.title)),
        'locale' in t && n(20, (w = t.locale)),
        'optionClass' in t && n(8, (S = t.optionClass)),
        'optionGroupClass' in t && n(9, (k = t.optionGroupClass)),
        '$$scope' in t && n(23, (s = t.$$scope))
    }),
    (t.$$.update = () => {
      1343488 & t.$$.dirty[0] && n(10, (o = Wl(y ? g.filter(y) : g, w))),
        132096 & t.$$.dirty[0] &&
          n(
            11,
            (i = ((t = [], e) => {
              let n = 0
              return t.map(
                (t) => (
                  n++,
                  He(t)
                    ? He(t[1])
                      ? { id: n, label: t[0], options: t[1].map((t) => Dl(t, ++n, e)) }
                      : Dl(t, n, e)
                    : t.options
                    ? {
                        id: t.id || n,
                        label: t.label,
                        options: t.options.map((t) => Dl(t, ++n, e)),
                      }
                    : Dl(t, n, e)
                )
              )
            })(o, $))
          ),
        2048 & t.$$.dirty[0] && n(21, (r = zl(i))),
        2621441 & t.$$.dirty[0] && x && h < 0 && n(0, (h = r.findIndex((t) => t.value === x)))
    }),
    [
      h,
      c,
      u,
      d,
      p,
      f,
      b,
      v,
      S,
      k,
      o,
      i,
      C,
      (t) => (e) => {
        var n
        ;((n = e.key), /enter| /i.test(n)) && R(t)
      },
      (t) => (e) => {
        R(t)
      },
      g,
      m,
      $,
      y,
      x,
      w,
      r,
      a,
      s,
    ]
  )
}
class dc extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        uc,
        cc,
        Ao,
        {
          label: 1,
          hideLabel: 2,
          class: 3,
          name: 4,
          selectedIndex: 0,
          options: 15,
          onchange: 16,
          layout: 5,
          optionMapper: 17,
          optionFilter: 18,
          value: 19,
          optionLabelClass: 6,
          title: 7,
          locale: 20,
          optionClass: 8,
          optionGroupClass: 9,
        },
        [-1, -1]
      )
  }
}
function pc(t) {
  let e, n
  return (
    (e = new js({
      props: { class: 'PinturaButtonIcon', $$slots: { default: [hc] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        536870976 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function hc(t) {
  let e
  return {
    c() {
      e = Ko('g')
    },
    m(n, o) {
      Go(n, e, o), (e.innerHTML = t[6])
    },
    p(t, n) {
      64 & n && (e.innerHTML = t[6])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function gc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = (t[2] || t[18]) + '',
    u = t[6] && pc(t)
  return {
    c() {
      ;(e = qo('span')),
        u && u.c(),
        (n = Jo()),
        (o = qo('span')),
        (i = Qo(c)),
        ii(o, 'class', (r = bs(['PinturaButtonLabel', t[3], t[5] && 'implicit']))),
        ii(e, 'slot', 'label'),
        ii(e, 'title', (a = Ol(t[1], t[15]))),
        ii(e, 'class', (s = bs(['PinturaButtonInner', t[4]])))
    },
    m(t, r) {
      Go(t, e, r), u && u.m(e, null), Yo(e, n), Yo(e, o), Yo(o, i), (l = !0)
    },
    p(t, d) {
      t[6]
        ? u
          ? (u.p(t, d), 64 & d && Vi(u, 1))
          : ((u = pc(t)), u.c(), Vi(u, 1), u.m(e, n))
        : u &&
          (_i(),
          Ni(u, 1, 1, () => {
            u = null
          }),
          Wi()),
        (!l || 262148 & d) && c !== (c = (t[2] || t[18]) + '') && ai(i, c),
        (!l || (40 & d && r !== (r = bs(['PinturaButtonLabel', t[3], t[5] && 'implicit'])))) &&
          ii(o, 'class', r),
        (!l || (32770 & d && a !== (a = Ol(t[1], t[15])))) && ii(e, 'title', a),
        (!l || (16 & d && s !== (s = bs(['PinturaButtonInner', t[4]])))) && ii(e, 'class', s)
    },
    i(t) {
      l || (Vi(u), (l = !0))
    },
    o(t) {
      Ni(u), (l = !1)
    },
    d(t) {
      t && Zo(e), u && u.d()
    },
  }
}
function mc(t) {
  let e,
    n,
    o = t[28].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o)), ii(e, 'slot', 'group')
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      268435456 & e && o !== (o = t[28].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function fc(t) {
  let e, n
  return (
    (e = new js({
      props: {
        style: Ue(t[13]) ? t[13](t[28].value) : t[13],
        $$slots: { default: [$c] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        268443648 & n && (o.style = Ue(t[13]) ? t[13](t[28].value) : t[13]),
          805306368 & n && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function $c(t) {
  let e,
    n = t[28].icon + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      268435456 & o && n !== (n = t[28].icon + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function yc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[28].label + '',
    c = t[28].icon && fc(t)
  return {
    c() {
      ;(e = qo('span')),
        c && c.c(),
        (n = Jo()),
        (o = qo('span')),
        (i = Qo(l)),
        ii(o, 'style', (r = Ue(t[14]) ? t[14](t[28].value) : t[14])),
        ii(o, 'class', (a = bs(['PinturaDropdownOptionLabel', t[10]]))),
        ii(e, 'slot', 'option')
    },
    m(t, r) {
      Go(t, e, r), c && c.m(e, null), Yo(e, n), Yo(e, o), Yo(o, i), (s = !0)
    },
    p(t, u) {
      t[28].icon
        ? c
          ? (c.p(t, u), 268435456 & u && Vi(c, 1))
          : ((c = fc(t)), c.c(), Vi(c, 1), c.m(e, n))
        : c &&
          (_i(),
          Ni(c, 1, 1, () => {
            c = null
          }),
          Wi()),
        (!s || 268435456 & u) && l !== (l = t[28].label + '') && ai(i, l),
        (!s || (268451840 & u && r !== (r = Ue(t[14]) ? t[14](t[28].value) : t[14]))) &&
          ii(o, 'style', r),
        (!s || (1024 & u && a !== (a = bs(['PinturaDropdownOptionLabel', t[10]])))) &&
          ii(o, 'class', a)
    },
    i(t) {
      s || (Vi(c), (s = !0))
    },
    o(t) {
      Ni(c), (s = !1)
    },
    d(t) {
      t && Zo(e), c && c.d()
    },
  }
}
function xc(t) {
  let e, n, o, i, r
  return (
    (n = new dc({
      props: {
        name: t[7],
        value: t[9],
        selectedIndex: t[8],
        optionFilter: t[11],
        optionMapper: t[12],
        optionLabelClass: bs(['PinturaDropdownOptionLabel', t[10]]),
        optionGroupClass: 'PinturaDropdownOptionGroup',
        optionClass: 'PinturaDropdownOption',
        options: t[16],
        onchange: t[19],
        $$slots: {
          option: [yc, ({ option: t }) => ({ 28: t }), ({ option: t }) => (t ? 268435456 : 0)],
          group: [mc, ({ option: t }) => ({ 28: t }), ({ option: t }) => (t ? 268435456 : 0)],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        ;(e = qo('div')),
          Qi(n.$$.fragment),
          ii(e, 'class', 'PinturaDropdownPanel'),
          ii(e, 'slot', 'details')
      },
      m(a, s) {
        Go(a, e, s), Ji(n, e, null), (o = !0), i || ((r = ei(e, 'keydown', t[21])), (i = !0))
      },
      p(t, e) {
        const o = {}
        128 & e && (o.name = t[7]),
          512 & e && (o.value = t[9]),
          256 & e && (o.selectedIndex = t[8]),
          2048 & e && (o.optionFilter = t[11]),
          4096 & e && (o.optionMapper = t[12]),
          1024 & e && (o.optionLabelClass = bs(['PinturaDropdownOptionLabel', t[10]])),
          65536 & e && (o.options = t[16]),
          805331968 & e && (o.$$scope = { dirty: e, ctx: t }),
          n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n), (i = !1), r()
      },
    }
  )
}
function bc(t) {
  let e, n, o
  function i(e) {
    t[26](e)
  }
  let r = {
    onshow: t[20],
    buttonClass: bs(['PinturaDropdownButton', t[0], t[5] && 'PinturaDropdownIconOnly']),
    $$slots: { details: [xc], label: [gc] },
    $$scope: { ctx: t },
  }
  return (
    void 0 !== t[17] && (r.isActive = t[17]),
    (e = new Il({ props: r })),
    ki.push(() => Ki(e, 'isActive', i)),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, n) {
        Ji(e, t, n), (o = !0)
      },
      p(t, [o]) {
        const i = {}
        33 & o &&
          (i.buttonClass = bs(['PinturaDropdownButton', t[0], t[5] && 'PinturaDropdownIconOnly'])),
          537264126 & o && (i.$$scope = { dirty: o, ctx: t }),
          !n && 131072 & o && ((n = !0), (i.isActive = t[17]), Ei(() => (n = !1))),
          e.$set(i)
      },
      i(t) {
        o || (Vi(e.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (o = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function vc(t, e, n) {
  let o,
    r,
    { class: a } = e,
    { title: s } = e,
    { label: l } = e,
    { labelClass: c } = e,
    { innerClass: u } = e,
    { hideLabel: d = !1 } = e,
    { icon: p } = e,
    { name: h } = e,
    { options: g = [] } = e,
    { selectedIndex: m = -1 } = e,
    { value: f } = e,
    { optionLabelClass: $ } = e,
    { optionFilter: y } = e,
    { optionMapper: x } = e,
    { optionIconStyle: b } = e,
    { optionLabelStyle: v } = e,
    { locale: w } = e,
    { onchange: S } = e,
    { onload: k = i } = e,
    { ondestroy: C = i } = e
  let M
  return (
    fi(() => k({ options: g })),
    yi(() => C({ options: g })),
    (t.$$set = (t) => {
      'class' in t && n(0, (a = t.class)),
        'title' in t && n(1, (s = t.title)),
        'label' in t && n(2, (l = t.label)),
        'labelClass' in t && n(3, (c = t.labelClass)),
        'innerClass' in t && n(4, (u = t.innerClass)),
        'hideLabel' in t && n(5, (d = t.hideLabel)),
        'icon' in t && n(6, (p = t.icon)),
        'name' in t && n(7, (h = t.name)),
        'options' in t && n(22, (g = t.options)),
        'selectedIndex' in t && n(8, (m = t.selectedIndex)),
        'value' in t && n(9, (f = t.value)),
        'optionLabelClass' in t && n(10, ($ = t.optionLabelClass)),
        'optionFilter' in t && n(11, (y = t.optionFilter)),
        'optionMapper' in t && n(12, (x = t.optionMapper)),
        'optionIconStyle' in t && n(13, (b = t.optionIconStyle)),
        'optionLabelStyle' in t && n(14, (v = t.optionLabelStyle)),
        'locale' in t && n(15, (w = t.locale)),
        'onchange' in t && n(23, (S = t.onchange)),
        'onload' in t && n(24, (k = t.onload)),
        'ondestroy' in t && n(25, (C = t.ondestroy))
    }),
    (t.$$.update = () => {
      4227072 & t.$$.dirty && n(16, (o = Wl(g, w))),
        66048 & t.$$.dirty &&
          n(
            18,
            (r =
              o.reduce(
                (t, e) => {
                  if (t) return t
                  const [n, o] = e
                  return (
                    (i = n),
                    (r = f),
                    (Array.isArray(i) && Array.isArray(r) ? Ar(i, r) : i === r) ? o : void 0
                  )
                  var i, r
                },
                void 0
              ) ||
              ((t) => {
                const e = o.find((t) => void 0 === t[0])
                if (e) return e[1]
              })())
          )
    }),
    [
      a,
      s,
      l,
      c,
      u,
      d,
      p,
      h,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      o,
      M,
      r,
      (t) => {
        n(18, (r = t.value)), S(t), n(17, (M = !1))
      },
      ({ e: t, panel: e }) => {
        if (t && t.key && /up|down/i.test(t.key))
          return e.querySelector('input:not([disabled])').focus()
        e.querySelector('fieldset').focus()
      },
      (t) => {
        ;/tab/i.test(t.key) && t.preventDefault()
      },
      g,
      S,
      k,
      C,
      function (t) {
        ;(M = t), n(17, M)
      },
    ]
  )
}
class wc extends or {
  constructor(t) {
    super(),
      nr(this, t, vc, bc, Ao, {
        class: 0,
        title: 1,
        label: 2,
        labelClass: 3,
        innerClass: 4,
        hideLabel: 5,
        icon: 6,
        name: 7,
        options: 22,
        selectedIndex: 8,
        value: 9,
        optionLabelClass: 10,
        optionFilter: 11,
        optionMapper: 12,
        optionIconStyle: 13,
        optionLabelStyle: 14,
        locale: 15,
        onchange: 23,
        onload: 24,
        ondestroy: 25,
      })
  }
}
function Sc(t, e, n) {
  const o = t.slice()
  return (o[6] = e[n][0]), (o[7] = e[n][1]), (o[8] = e[n][2]), (o[0] = e[n][3]), o
}
function kc(t) {
  let e, n, o
  const i = [t[8]]
  var r = t[1][t[6]] || t[6]
  function a(t) {
    let e = {}
    for (let t = 0; t < i.length; t += 1) e = Mo(e, i[t])
    return { props: e }
  }
  return (
    r && (e = new r(a())),
    {
      c() {
        e && Qi(e.$$.fragment), (n = ti())
      },
      m(t, i) {
        e && Ji(e, t, i), Go(t, n, i), (o = !0)
      },
      p(t, o) {
        const s = 1 & o ? Zi(i, [qi(t[8])]) : {}
        if (r !== (r = t[1][t[6]] || t[6])) {
          if (e) {
            _i()
            const t = e
            Ni(t.$$.fragment, 1, 0, () => {
              tr(t, 1)
            }),
              Wi()
          }
          r
            ? ((e = new r(a())), Qi(e.$$.fragment), Vi(e.$$.fragment, 1), Ji(e, n.parentNode, n))
            : (e = null)
        } else r && e.$set(s)
      },
      i(t) {
        o || (e && Vi(e.$$.fragment, t), (o = !0))
      },
      o(t) {
        e && Ni(e.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(n), e && tr(e, t)
      },
    }
  )
}
function Cc(t) {
  let e, n, o
  n = new Pc({ props: { items: t[0], discardEmptyItems: !0 } })
  let i = [t[8]],
    r = {}
  for (let t = 0; t < i.length; t += 1) r = Mo(r, i[t])
  return {
    c() {
      ;(e = qo('div')), Qi(n.$$.fragment), ri(e, r)
    },
    m(t, i) {
      Go(t, e, i), Ji(n, e, null), (o = !0)
    },
    p(t, o) {
      const a = {}
      1 & o && (a.items = t[0]), n.$set(a), ri(e, (r = Zi(i, [1 & o && t[8]])))
    },
    i(t) {
      o || (Vi(n.$$.fragment, t), (o = !0))
    },
    o(t) {
      Ni(n.$$.fragment, t), (o = !1)
    },
    d(t) {
      t && Zo(e), tr(n)
    },
  }
}
function Mc(t, e) {
  let n, o, i, r, a, s
  const l = [Cc, kc],
    c = []
  function u(t, e) {
    return 1 & e && (o = !t[2](t[6])), o ? 0 : 1
  }
  return (
    (i = u(e, -1)),
    (r = c[i] = l[i](e)),
    {
      key: t,
      first: null,
      c() {
        ;(n = ti()), r.c(), (a = ti()), (this.first = n)
      },
      m(t, e) {
        Go(t, n, e), c[i].m(t, e), Go(t, a, e), (s = !0)
      },
      p(t, n) {
        let o = i
        ;(i = u((e = t), n)),
          i === o
            ? c[i].p(e, n)
            : (_i(),
              Ni(c[o], 1, 1, () => {
                c[o] = null
              }),
              Wi(),
              (r = c[i]),
              r ? r.p(e, n) : ((r = c[i] = l[i](e)), r.c()),
              Vi(r, 1),
              r.m(a.parentNode, a))
      },
      i(t) {
        s || (Vi(r), (s = !0))
      },
      o(t) {
        Ni(r), (s = !1)
      },
      d(t) {
        t && Zo(n), c[i].d(t), t && Zo(a)
      },
    }
  )
}
function Rc(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0]
  const a = (t) => t[7]
  for (let e = 0; e < r.length; e += 1) {
    let n = Sc(t, r, e),
      s = a(n)
    i.set(s, (o[e] = Mc(s, n)))
  }
  return {
    c() {
      for (let t = 0; t < o.length; t += 1) o[t].c()
      e = ti()
    },
    m(t, i) {
      for (let e = 0; e < o.length; e += 1) o[e].m(t, i)
      Go(t, e, i), (n = !0)
    },
    p(t, [n]) {
      7 & n && ((r = t[0]), _i(), (o = Gi(o, n, a, 1, t, r, i, e.parentNode, Yi, Mc, e, Sc)), Wi())
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Vi(o[t])
        n = !0
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Ni(o[t])
      n = !1
    },
    d(t) {
      for (let e = 0; e < o.length; e += 1) o[e].d(t)
      t && Zo(e)
    },
  }
}
function Tc(t, e, n) {
  let o,
    { items: i } = e,
    { discardEmptyItems: r = !0 } = e
  const a = { Button: Js, Dropdown: wc },
    s = (t) => !w(t) || !!a[t],
    l = (t) => {
      if (!t) return !1
      const [e, , , n] = t
      return !!s(e) || n.some(l)
    }
  return (
    (t.$$set = (t) => {
      'items' in t && n(3, (i = t.items)),
        'discardEmptyItems' in t && n(4, (r = t.discardEmptyItems))
    }),
    (t.$$.update = () => {
      24 & t.$$.dirty && n(0, (o = (i && r ? i.filter(l) : i) || []))
    }),
    [o, a, s, i, r]
  )
}
class Pc extends or {
  constructor(t) {
    super(), nr(this, t, Tc, Rc, Ao, { items: 3, discardEmptyItems: 4 })
  }
}
const Ec = [
  'file',
  'size',
  'loadState',
  'processState',
  'cropAspectRatio',
  'cropLimitToImage',
  'crop',
  'cropMinSize',
  'cropMaxSize',
  'cropRange',
  'cropOrigin',
  'cropRectAspectRatio',
  'rotation',
  'rotationRange',
  'targetSize',
  'flipX',
  'flipY',
  'perspectiveX',
  'perspectiveY',
  'perspective',
  'colorMatrix',
  'convolutionMatrix',
  'gamma',
  'vignette',
  'noise',
  'decoration',
  'annotation',
  'backgroundColor',
  'state',
]
var Ac = (t, e) =>
    (e ? Ja(t, e) : t)
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase(),
  Ic = (t, e = O) => {
    const { subscribe: n, set: o } = ar(void 0)
    return {
      subscribe: n,
      unsubscribe: ((t, e) => {
        const n = matchMedia(t)
        return (
          n.addListener(e),
          e(n),
          {
            get matches() {
              return n.matches
            },
            destroy: () => n.removeListener(e),
          }
        )
      })(t, ({ matches: t }) => o(e(t))).destroy,
    }
  },
  Lc = (t, e, n) =>
    new Promise(async (o, i) => {
      const r = await e.read(t),
        a = (t) =>
          P(t, n)
            .then((t) => e.apply(t, r))
            .then(o)
            .catch(i)
      if (!k() || C(t)) return a(t)
      let s
      try {
        s = await T(
          (t, e) =>
            createImageBitmap(t)
              .then((t) => e(null, t))
              .catch(e),
          [t]
        )
      } catch (t) {}
      return s && s.width
        ? (await d())
          ? c() && window.chrome && r > 1
            ? o(await (async (t) => p(await $(t)))(s))
            : void o(s)
          : o(e.apply(s, r))
        : a(t)
    }),
  Fc = (t, e) =>
    new Promise(async (n) => {
      if (t.width < e.width && t.height < e.height) return n(t)
      const o = Math.min(e.width / t.width, e.height / t.height),
        i = o * t.width,
        r = o * t.height,
        a = h('canvas', { width: i, height: r }),
        s = a.getContext('2d'),
        l = f(t) ? await $(t) : t
      s.drawImage(l, 0, 0, i, r), n(p(a))
    })
let Bc = null
var zc = (t) => (
  (t = t.trim()),
  /^rgba/.test(t)
    ? t
        .substr(5)
        .split(',')
        .map(parseFloat)
        .map((t, e) => t / (3 === e ? 1 : 255))
    : /^rgb/.test(t)
    ? t
        .substr(4)
        .split(',')
        .map(parseFloat)
        .map((t) => t / 255)
    : /^#/.test(t)
    ? ((t) => {
        const [, e, n, o] = t.split('')
        t = 4 === t.length ? `#${e}${e}${n}${n}${o}${o}` : t
        const [, i, r, a] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t)
        return [i, r, a].map((t) => parseInt(t, 16) / 255)
      })(t)
    : /[0-9]{1,3}\s?,\s?[0-9]{1,3}\s?,\s?[0-9]{1,3}/.test(t)
    ? t
        .split(',')
        .map((t) => parseInt(t, 10))
        .map((t) => t / 255)
    : void 0
)
let Dc = null
var Oc = () => {
  if (null === Dc) {
    const t = h('canvas')
    ;(Dc = !!Za(t)), m(t)
  }
  return Dc
}
function _c(t) {
  let e,
    n,
    o,
    i = t[46] && Wc(t),
    r = t[25] && !t[20] && Yc(t)
  return {
    c() {
      i && i.c(), (e = Jo()), r && r.c(), (n = ti())
    },
    m(t, a) {
      i && i.m(t, a), Go(t, e, a), r && r.m(t, a), Go(t, n, a), (o = !0)
    },
    p(t, o) {
      t[46]
        ? i
          ? (i.p(t, o), 32768 & o[1] && Vi(i, 1))
          : ((i = Wc(t)), i.c(), Vi(i, 1), i.m(e.parentNode, e))
        : i &&
          (_i(),
          Ni(i, 1, 1, () => {
            i = null
          }),
          Wi()),
        t[25] && !t[20]
          ? r
            ? (r.p(t, o), 34603008 & o[0] && Vi(r, 1))
            : ((r = Yc(t)), r.c(), Vi(r, 1), r.m(n.parentNode, n))
          : r &&
            (_i(),
            Ni(r, 1, 1, () => {
              r = null
            }),
            Wi())
    },
    i(t) {
      o || (Vi(i), Vi(r), (o = !0))
    },
    o(t) {
      Ni(i), Ni(r), (o = !1)
    },
    d(t) {
      i && i.d(t), t && Zo(e), r && r.d(t), t && Zo(n)
    },
  }
}
function Wc(t) {
  let e, n, o, i, r, a, s
  const l = [Uc, Nc, Vc],
    c = []
  function u(t, e) {
    return t[20] ? 0 : t[22] || t[21] || t[23] || t[24] ? 1 : t[26] && t[42] ? 2 : -1
  }
  return (
    ~(o = u(t)) && (i = c[o] = l[o](t)),
    {
      c() {
        ;(e = qo('div')),
          (n = qo('p')),
          i && i.c(),
          ii(n, 'style', (r = `transform: translateX(${t[47]}px)`)),
          ii(e, 'class', 'PinturaStatus'),
          ii(e, 'style', (a = 'opacity: ' + t[27]))
      },
      m(t, i) {
        Go(t, e, i), Yo(e, n), ~o && c[o].m(n, null), (s = !0)
      },
      p(t, d) {
        let p = o
        ;(o = u(t)),
          o === p
            ? ~o && c[o].p(t, d)
            : (i &&
                (_i(),
                Ni(c[p], 1, 1, () => {
                  c[p] = null
                }),
                Wi()),
              ~o
                ? ((i = c[o]),
                  i ? i.p(t, d) : ((i = c[o] = l[o](t)), i.c()),
                  Vi(i, 1),
                  i.m(n, null))
                : (i = null)),
          (!s || (65536 & d[1] && r !== (r = `transform: translateX(${t[47]}px)`))) &&
            ii(n, 'style', r),
          (!s || (134217728 & d[0] && a !== (a = 'opacity: ' + t[27]))) && ii(e, 'style', a)
      },
      i(t) {
        s || (Vi(i), (s = !0))
      },
      o(t) {
        Ni(i), (s = !1)
      },
      d(t) {
        t && Zo(e), ~o && c[o].d()
      },
    }
  )
}
function Vc(t) {
  let e, n, o, i, r, a
  ;(e = new gl({ props: { text: t[42], onmeasure: t[110] } })),
    (o = new bl({ props: { offset: t[48], visible: t[44], progress: t[43] } }))
  let s = t[45] && Hc(t)
  return {
    c() {
      Qi(e.$$.fragment), (n = Jo()), Qi(o.$$.fragment), (i = Jo()), s && s.c(), (r = ti())
    },
    m(t, l) {
      Ji(e, t, l), Go(t, n, l), Ji(o, t, l), Go(t, i, l), s && s.m(t, l), Go(t, r, l), (a = !0)
    },
    p(t, n) {
      const i = {}
      2048 & n[1] && (i.text = t[42]), e.$set(i)
      const a = {}
      131072 & n[1] && (a.offset = t[48]),
        8192 & n[1] && (a.visible = t[44]),
        4096 & n[1] && (a.progress = t[43]),
        o.$set(a),
        t[45]
          ? s
            ? (s.p(t, n), 16384 & n[1] && Vi(s, 1))
            : ((s = Hc(t)), s.c(), Vi(s, 1), s.m(r.parentNode, r))
          : s &&
            (_i(),
            Ni(s, 1, 1, () => {
              s = null
            }),
            Wi())
    },
    i(t) {
      a || (Vi(e.$$.fragment, t), Vi(o.$$.fragment, t), Vi(s), (a = !0))
    },
    o(t) {
      Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), Ni(s), (a = !1)
    },
    d(t) {
      tr(e, t), t && Zo(n), tr(o, t), t && Zo(i), s && s.d(t), t && Zo(r)
    },
  }
}
function Nc(t) {
  let e, n, o, i, r, a
  ;(e = new gl({ props: { text: t[41], onmeasure: t[110] } })),
    (o = new bl({ props: { offset: t[48], visible: t[40], progress: t[39] } }))
  let s = t[21] && Xc(t)
  return {
    c() {
      Qi(e.$$.fragment), (n = Jo()), Qi(o.$$.fragment), (i = Jo()), s && s.c(), (r = ti())
    },
    m(t, l) {
      Ji(e, t, l), Go(t, n, l), Ji(o, t, l), Go(t, i, l), s && s.m(t, l), Go(t, r, l), (a = !0)
    },
    p(t, n) {
      const i = {}
      1024 & n[1] && (i.text = t[41]), e.$set(i)
      const a = {}
      131072 & n[1] && (a.offset = t[48]),
        512 & n[1] && (a.visible = t[40]),
        256 & n[1] && (a.progress = t[39]),
        o.$set(a),
        t[21]
          ? s
            ? (s.p(t, n), 2097152 & n[0] && Vi(s, 1))
            : ((s = Xc(t)), s.c(), Vi(s, 1), s.m(r.parentNode, r))
          : s &&
            (_i(),
            Ni(s, 1, 1, () => {
              s = null
            }),
            Wi())
    },
    i(t) {
      a || (Vi(e.$$.fragment, t), Vi(o.$$.fragment, t), Vi(s), (a = !0))
    },
    o(t) {
      Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), Ni(s), (a = !1)
    },
    d(t) {
      tr(e, t), t && Zo(n), tr(o, t), t && Zo(i), s && s.d(t), t && Zo(r)
    },
  }
}
function Uc(t) {
  let e, n, o, i, r, a
  return (
    (e = new gl({ props: { text: t[20], onmeasure: t[110] } })),
    (i = new js({ props: { $$slots: { default: [jc] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment),
          (n = Jo()),
          (o = qo('span')),
          Qi(i.$$.fragment),
          ii(o, 'class', 'PinturaStatusIcon'),
          ii(o, 'style', (r = `transform: translateX(${t[48]}px)`))
      },
      m(t, r) {
        Ji(e, t, r), Go(t, n, r), Go(t, o, r), Ji(i, o, null), (a = !0)
      },
      p(t, n) {
        const s = {}
        1048576 & n[0] && (s.text = t[20]), e.$set(s)
        const l = {}
        ;(4 & n[0]) | (16777216 & n[8]) && (l.$$scope = { dirty: n, ctx: t }),
          i.$set(l),
          (!a || (131072 & n[1] && r !== (r = `transform: translateX(${t[48]}px)`))) &&
            ii(o, 'style', r)
      },
      i(t) {
        a || (Vi(e.$$.fragment, t), Vi(i.$$.fragment, t), (a = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), Ni(i.$$.fragment, t), (a = !1)
      },
      d(t) {
        tr(e, t), t && Zo(n), t && Zo(o), tr(i)
      },
    }
  )
}
function Hc(t) {
  let e, n, o, i
  return (
    (n = new Js({
      props: {
        onclick: t[112],
        label: t[2].statusLabelButtonClose,
        icon: t[2].statusIconButtonClose,
        hideLabel: !0,
      },
    })),
    {
      c() {
        ;(e = qo('span')),
          Qi(n.$$.fragment),
          ii(e, 'class', 'PinturaStatusButton'),
          ii(e, 'style', (o = `transform: translateX(${t[48]}px)`))
      },
      m(t, o) {
        Go(t, e, o), Ji(n, e, null), (i = !0)
      },
      p(t, r) {
        const a = {}
        4 & r[0] && (a.label = t[2].statusLabelButtonClose),
          4 & r[0] && (a.icon = t[2].statusIconButtonClose),
          n.$set(a),
          (!i || (131072 & r[1] && o !== (o = `transform: translateX(${t[48]}px)`))) &&
            ii(e, 'style', o)
      },
      i(t) {
        i || (Vi(n.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (i = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function Xc(t) {
  let e, n, o, i
  return (
    (n = new Js({
      props: {
        onclick: t[111],
        label: t[2].statusLabelButtonClose,
        icon: t[2].statusIconButtonClose,
        hideLabel: !0,
      },
    })),
    {
      c() {
        ;(e = qo('span')),
          Qi(n.$$.fragment),
          ii(e, 'class', 'PinturaStatusButton'),
          ii(e, 'style', (o = `transform: translateX(${t[48]}px)`))
      },
      m(t, o) {
        Go(t, e, o), Ji(n, e, null), (i = !0)
      },
      p(t, r) {
        const a = {}
        4 & r[0] && (a.label = t[2].statusLabelButtonClose),
          4 & r[0] && (a.icon = t[2].statusIconButtonClose),
          n.$set(a),
          (!i || (131072 & r[1] && o !== (o = `transform: translateX(${t[48]}px)`))) &&
            ii(e, 'style', o)
      },
      i(t) {
        i || (Vi(n.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (i = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function jc(t) {
  let e,
    n = t[2].iconSupportError + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      4 & o[0] && n !== (n = t[2].iconSupportError + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Yc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u = t[6] && Gc(t),
    d = t[15] && t[13] && Zc(t)
  const p = [tu, Jc],
    h = []
  function g(t, e) {
    return t[15] ? 0 : 1
  }
  return (
    (o = g(t)),
    (i = h[o] = p[o](t)),
    (a = new xs({
      props: {
        animate: t[16],
        pixelRatio: t[55],
        backgroundColor: t[56],
        maskRect: t[38],
        imageSize: t[29],
        imageData: t[25],
        imageProps: t[37],
        imagePreviews: t[57],
        loadImageData: t[8],
        willRender: t[201],
      },
    })),
    {
      c() {
        u && u.c(),
          (e = Jo()),
          d && d.c(),
          (n = Jo()),
          i.c(),
          (r = Jo()),
          Qi(a.$$.fragment),
          (s = Jo()),
          (l = qo('div')),
          ii(l, 'class', 'PinturaRootPortal')
      },
      m(i, p) {
        u && u.m(i, p),
          Go(i, e, p),
          d && d.m(i, p),
          Go(i, n, p),
          h[o].m(i, p),
          Go(i, r, p),
          Ji(a, i, p),
          Go(i, s, p),
          Go(i, l, p),
          t[202](l),
          (c = !0)
      },
      p(t, s) {
        t[6]
          ? u
            ? (u.p(t, s), 64 & s[0] && Vi(u, 1))
            : ((u = Gc(t)), u.c(), Vi(u, 1), u.m(e.parentNode, e))
          : u &&
            (_i(),
            Ni(u, 1, 1, () => {
              u = null
            }),
            Wi()),
          t[15] && t[13]
            ? d
              ? (d.p(t, s), 40960 & s[0] && Vi(d, 1))
              : ((d = Zc(t)), d.c(), Vi(d, 1), d.m(n.parentNode, n))
            : d &&
              (_i(),
              Ni(d, 1, 1, () => {
                d = null
              }),
              Wi())
        let l = o
        ;(o = g(t)),
          o === l
            ? h[o].p(t, s)
            : (_i(),
              Ni(h[l], 1, 1, () => {
                h[l] = null
              }),
              Wi(),
              (i = h[o]),
              i ? i.p(t, s) : ((i = h[o] = p[o](t)), i.c()),
              Vi(i, 1),
              i.m(r.parentNode, r))
        const c = {}
        65536 & s[0] && (c.animate = t[16]),
          16777216 & s[1] && (c.pixelRatio = t[55]),
          33554432 & s[1] && (c.backgroundColor = t[56]),
          128 & s[1] && (c.maskRect = t[38]),
          536870912 & s[0] && (c.imageSize = t[29]),
          33554432 & s[0] && (c.imageData = t[25]),
          64 & s[1] && (c.imageProps = t[37]),
          67108864 & s[1] && (c.imagePreviews = t[57]),
          256 & s[0] && (c.loadImageData = t[8]),
          (32 & s[0]) | (939524096 & s[1]) && (c.willRender = t[201]),
          a.$set(c)
      },
      i(t) {
        c || (Vi(u), Vi(d), Vi(i), Vi(a.$$.fragment, t), (c = !0))
      },
      o(t) {
        Ni(u), Ni(d), Ni(i), Ni(a.$$.fragment, t), (c = !1)
      },
      d(i) {
        u && u.d(i),
          i && Zo(e),
          d && d.d(i),
          i && Zo(n),
          h[o].d(i),
          i && Zo(r),
          tr(a, i),
          i && Zo(s),
          i && Zo(l),
          t[202](null)
      },
    }
  )
}
function Gc(t) {
  let e, n, o, i, r
  return (
    (n = new Pc({ props: { items: t[50] } })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'class', 'PinturaNav PinturaNavTools')
      },
      m(a, s) {
        Go(a, e, s),
          Ji(n, e, null),
          (o = !0),
          i || ((r = [ei(e, 'measure', t[186]), Wo(Ua.call(null, e))]), (i = !0))
      },
      p(t, e) {
        const o = {}
        524288 & e[1] && (o.items = t[50]), n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n), (i = !1), Po(r)
      },
    }
  )
}
function Zc(t) {
  let e, n, o
  return (
    (n = new ul({
      props: {
        elasticity: t[4] * ou,
        scrollDirection: t[35] ? 'y' : 'x',
        $$slots: { default: [Qc] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'class', 'PinturaNav PinturaNavMain')
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, e) {
        const o = {}
        16 & e[0] && (o.elasticity = t[4] * ou),
          16 & e[1] && (o.scrollDirection = t[35] ? 'y' : 'x'),
          (131072 & e[0]) | (3 & e[1]) | (16777216 & e[8]) && (o.$$scope = { dirty: e, ctx: t }),
          n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function qc(t) {
  let e,
    n = t[271].icon + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      8388608 & o[8] && n !== (n = t[271].icon + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Kc(t) {
  let e,
    n,
    o,
    i,
    r,
    a = t[271].label + ''
  return (
    (e = new js({ props: { $$slots: { default: [qc] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment), (n = Jo()), (o = qo('span')), (i = Qo(a))
      },
      m(t, a) {
        Ji(e, t, a), Go(t, n, a), Go(t, o, a), Yo(o, i), (r = !0)
      },
      p(t, n) {
        const o = {}
        25165824 & n[8] && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o),
          (!r || 8388608 & n[8]) && a !== (a = t[271].label + '') && ai(i, a)
      },
      i(t) {
        r || (Vi(e.$$.fragment, t), (r = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (r = !1)
      },
      d(t) {
        tr(e, t), t && Zo(n), t && Zo(o)
      },
    }
  )
}
function Qc(t) {
  let e, n
  const o = [t[31], { tabs: t[32] }]
  let i = {
    $$slots: {
      default: [
        Kc,
        ({ tab: t }) => ({ 271: t }),
        ({ tab: t }) => [0, 0, 0, 0, 0, 0, 0, 0, t ? 8388608 : 0],
      ],
    },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < o.length; t += 1) i = Mo(i, o[t])
  return (
    (e = new Ts({ props: i })),
    e.$on('select', t[187]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const i = 3 & n[1] ? Zi(o, [1 & n[1] && qi(t[31]), 2 & n[1] && { tabs: t[32] }]) : {}
        25165824 & n[8] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Jc(t) {
  let e, n, o
  function i(e) {
    t[196](e)
  }
  let r = {
    class: 'PinturaMain',
    content: { ...t[18].find(t[195]), props: t[7][t[17]] },
    locale: t[2],
    isAnimated: t[16],
    stores: t[105],
  }
  return (
    void 0 !== t[0][t[17]] && (r.component = t[0][t[17]]),
    (e = new Us({ props: r })),
    ki.push(() => Ki(e, 'component', i)),
    e.$on('measure', t[197]),
    e.$on('show', t[198]),
    e.$on('hide', t[199]),
    e.$on('fade', t[200]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, n) {
        Ji(e, t, n), (o = !0)
      },
      p(t, o) {
        const i = {}
        393344 & o[0] && (i.content = { ...t[18].find(t[195]), props: t[7][t[17]] }),
          4 & o[0] && (i.locale = t[2]),
          65536 & o[0] && (i.isAnimated = t[16]),
          !n && 131073 & o[0] && ((n = !0), (i.component = t[0][t[17]]), Ei(() => (n = !1))),
          e.$set(i)
      },
      i(t) {
        o || (Vi(e.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (o = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function tu(t) {
  let e, n
  const o = [{ class: 'PinturaMain' }, { visible: t[28] }, t[31], { panels: t[33] }]
  let i = {
    $$slots: {
      default: [
        eu,
        ({ panel: t }) => ({ 270: t }),
        ({ panel: t }) => [0, 0, 0, 0, 0, 0, 0, 0, t ? 4194304 : 0],
      ],
    },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < o.length; t += 1) i = Mo(i, o[t])
  return (
    (e = new Ws({ props: i })),
    e.$on('measure', t[194]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const i =
          (268435456 & n[0]) | (5 & n[1])
            ? Zi(o, [
                o[0],
                268435456 & n[0] && { visible: t[28] },
                1 & n[1] && qi(t[31]),
                4 & n[1] && { panels: t[33] },
              ])
            : {}
        ;(269418629 & n[0]) | (8388608 & n[1]) | (20971520 & n[8]) &&
          (i.$$scope = { dirty: n, ctx: t }),
          e.$set(i)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function eu(t) {
  let e, n, o
  function i(...e) {
    return t[188](t[270], ...e)
  }
  function r(e) {
    t[189](e, t[270])
  }
  let a = {
    content: { ...t[18].find(i), props: t[7][t[270]] },
    locale: t[2],
    isActive: t[270] === t[17],
    isAnimated: t[16],
    stores: t[105],
  }
  return (
    void 0 !== t[0][t[270]] && (a.component = t[0][t[270]]),
    (e = new Us({ props: a })),
    ki.push(() => Ki(e, 'component', r)),
    e.$on('measure', t[190]),
    e.$on('show', function () {
      return t[191](t[270])
    }),
    e.$on('hide', function () {
      return t[192](t[270])
    }),
    e.$on('fade', function (...e) {
      return t[193](t[270], ...e)
    }),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, n) {
        Ji(e, t, n), (o = !0)
      },
      p(o, r) {
        t = o
        const a = {}
        ;(262272 & r[0]) | (4194304 & r[8]) &&
          (a.content = { ...t[18].find(i), props: t[7][t[270]] }),
          4 & r[0] && (a.locale = t[2]),
          (131072 & r[0]) | (4194304 & r[8]) && (a.isActive = t[270] === t[17]),
          65536 & r[0] && (a.isAnimated = t[16]),
          !n &&
            (1 & r[0]) | (4194304 & r[8]) &&
            ((n = !0), (a.component = t[0][t[270]]), Ei(() => (n = !1))),
          e.$set(a)
      },
      i(t) {
        o || (Vi(e.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (o = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function nu(t) {
  let e, n, o, i
  Pi(t[185])
  let r = t[51] && _c(t)
  return {
    c() {
      ;(e = qo('div')),
        r && r.c(),
        ii(e, 'id', t[3]),
        ii(e, 'class', t[34]),
        ii(e, 'data-env', t[36])
    },
    m(a, s) {
      Go(a, e, s),
        r && r.m(e, null),
        t[203](e),
        (n = !0),
        o ||
          ((i = [
            ei(window, 'keydown', t[114]),
            ei(window, 'keyup', t[115]),
            ei(window, 'blur', t[116]),
            ei(window, 'resize', t[185]),
            ei(e, 'ping', function () {
              Eo(t[52]) && t[52].apply(this, arguments)
            }),
            ei(e, 'contextmenu', t[117]),
            ei(
              e,
              'touchstart',
              function () {
                Eo(t[49]) && t[49].apply(this, arguments)
              },
              { passive: !1 }
            ),
            ei(e, 'transitionend', t[106]),
            ei(e, 'dropfiles', t[118]),
            ei(e, 'measure', t[204]),
            Wo(Ua.call(null, e, { observeViewRect: !0 })),
            Wo(Ha.call(null, e)),
            Wo(ja.call(null, e)),
          ]),
          (o = !0))
    },
    p(o, i) {
      ;(t = o)[51]
        ? r
          ? (r.p(t, i), 1048576 & i[1] && Vi(r, 1))
          : ((r = _c(t)), r.c(), Vi(r, 1), r.m(e, null))
        : r &&
          (_i(),
          Ni(r, 1, 1, () => {
            r = null
          }),
          Wi()),
        (!n || 8 & i[0]) && ii(e, 'id', t[3]),
        (!n || 8 & i[1]) && ii(e, 'class', t[34]),
        (!n || 32 & i[1]) && ii(e, 'data-env', t[36])
    },
    i(t) {
      n || (Vi(r), (n = !0))
    },
    o(t) {
      Ni(r), (n = !1)
    },
    d(n) {
      n && Zo(e), r && r.d(), t[203](null), (o = !1), Po(i)
    },
  }
}
const ou = 10
function iu(t, e, n) {
  let o,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    g,
    f,
    $,
    y,
    x,
    b,
    v,
    S,
    k,
    C,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    z,
    D,
    _,
    W,
    V,
    N,
    U,
    H,
    X,
    Y,
    q,
    K,
    Q,
    J,
    tt,
    ot,
    it,
    rt,
    at,
    st,
    lt,
    ct,
    ut,
    dt,
    pt,
    gt,
    ft,
    $t,
    yt,
    xt,
    bt,
    vt,
    wt,
    St,
    kt,
    Ct,
    Mt,
    Et,
    At,
    It,
    Lt,
    Wt,
    Nt,
    Ut,
    Ht,
    jt,
    Yt,
    Zt,
    qt,
    Kt,
    Qt,
    te,
    ee,
    ne,
    oe,
    ie,
    re,
    se,
    le,
    ce,
    ue,
    de,
    pe,
    he,
    ge,
    me,
    fe,
    $e,
    ye,
    xe,
    be,
    ve,
    we,
    Se,
    ke,
    Me,
    Re,
    Te,
    Pe = ko
  Fo(t, La, (t) => n(153, (qt = t))), t.$$.on_destroy.push(() => Pe())
  const Ee = fr(),
    Ae = xi()
  let { class: Ie } = e,
    { layout: Le } = e,
    { stores: Fe } = e,
    { locale: Be } = e,
    { id: ze } = e,
    { util: De } = e,
    { utils: Oe } = e,
    { animations: _e = 'auto' } = e,
    { previewUpscale: We = !1 } = e,
    { elasticityMultiplier: Ve = 10 } = e,
    { willRevert: Ne = () => Promise.resolve(!0) } = e,
    { willRenderCanvas: He = O } = e,
    { willRenderToolbar: Xe = O } = e,
    { enableButtonExport: je = !0 } = e,
    { enableButtonRevert: Ye = !0 } = e,
    { enableNavigateHistory: Ge = !0 } = e,
    { enableToolbar: Ze = !0 } = e,
    { enableUtils: qe = !0 } = e,
    { enableButtonClose: Ke = !1 } = e,
    { enableDropImage: Qe = !1 } = e,
    { previewImageDataMaxSize: Je } = e,
    { layoutDirectionPreference: tn = 'auto' } = e,
    { imageOrienter: en = { read: () => 1, apply: (t) => t } } = e,
    { pluginComponents: nn } = e,
    { pluginOptions: on = {} } = e
  const rn = Ee.sub,
    an = {}
  let { root: sn } = e,
    ln = []
  const cn =
      (() => {
        if (null !== Bc) return Bc
        const t = h('canvas'),
          e = Za(t)
        return (Bc = e ? e.getParameter(e.MAX_TEXTURE_SIZE) : void 0), m(t), Bc
      })() || 1024,
    un = mt(cn, cn),
    pn = Ce() ? 16777216 : 1 / 0
  let {
    imageSourceToImageData: hn = (t) =>
      w(t)
        ? fetch(t)
            .then((t) => t.blob())
            .then((t) => Lc(t, en, pn))
            .then((t) => Fc(t, a))
        : ae(t)
        ? new Promise((e) => e(p(t)))
        : Lc(t, en, pn).then((t) => Fc(t, a)),
  } = e
  const gn = (() => {
      let t, e
      const n = Ec.reduce(
        (t, n) => (
          (t[n] = (function (t, e, n) {
            let o = []
            return {
              set: e,
              update: n,
              publish: (t) => {
                o.forEach((e) => e(t))
              },
              subscribe: (e) => (
                o.push(e),
                t(e),
                () => {
                  o = o.filter((t) => t !== e)
                }
              ),
            }
          })(
            (t) => {
              if (!e) return t()
              e.stores[n].subscribe(t)()
            },
            (t) => {
              e && e.stores[n].set(t)
            },
            (t) => {
              e && e.stores[n].update(t)
            }
          )),
          t
        ),
        {}
      )
      return {
        update: (o) => {
          if (((e = o), t && (t.forEach((t) => t()), (t = void 0)), !o))
            return n.file.publish(void 0), void n.loadState.publish(void 0)
          t = Ec.map((t) =>
            o.stores[t].subscribe((e) => {
              n[t].publish(e)
            })
          )
        },
        stores: n,
      }
    })(),
    {
      file: mn,
      size: fn,
      loadState: $n,
      processState: yn,
      cropAspectRatio: vn,
      cropLimitToImage: wn,
      crop: Sn,
      cropMinSize: Mn,
      cropMaxSize: Rn,
      cropRange: Pn,
      cropOrigin: En,
      cropRectAspectRatio: An,
      rotation: In,
      rotationRange: Ln,
      targetSize: Fn,
      flipX: Bn,
      flipY: zn,
      backgroundColor: Dn,
      colorMatrix: On,
      convolutionMatrix: _n,
      gamma: Wn,
      vignette: Vn,
      noise: Nn,
      decoration: Un,
      annotation: Hn,
      state: Xn,
    } = gn.stores
  Fo(t, mn, (t) => n(150, (Zt = t))),
    Fo(t, fn, (t) => n(29, (Ht = t))),
    Fo(t, $n, (t) => n(146, (wt = t))),
    Fo(t, yn, (t) => n(183, (pe = t))),
    Fo(t, Sn, (t) => n(148, (Mt = t))),
    Fo(t, Fn, (t) => n(215, (Nt = t))),
    Fo(t, Dn, (t) => n(180, (le = t))),
    Fo(t, Un, (t) => n(58, (Me = t))),
    Fo(t, Hn, (t) => n(59, (Re = t))),
    Fo(t, Xn, (t) => n(208, (vt = t)))
  const { images: jn, imageReader: Yn } = Fe
  Fo(t, jn, (t) => n(144, (yt = t)))
  const Gn = ar([0, 0, 0])
  Fo(t, Gn, (t) => n(56, (Se = t)))
  const Zn = ar([1, 1, 1])
  Fo(t, Zn, (t) => n(220, ($e = t)))
  const qn = Ia()
  Fo(t, qn, (t) => n(221, (ye = t)))
  const Kn = ar()
  Fo(t, Kn, (t) => n(14, (xt = t)))
  const Qn = ar()
  Fo(t, Qn, (t) => n(145, (bt = t)))
  const to = ar(Tt())
  Fo(t, to, (t) => n(30, (Kt = t)))
  const eo = ar(Tt())
  Fo(t, eo, (t) => n(53, (be = t)))
  const no = ar()
  Fo(t, no, (t) => n(54, (ve = t)))
  const oo = sr([no, to, eo], ([t, e, n], i) => {
    if (!t) return i(void 0)
    let r = 0
    1 !== d.length || o || (r = n.y + n.height), i(Ft(t.x + e.x, t.y + e.y + r, t.width, t.height))
  })
  Fo(t, oo, (t) => n(214, (Wt = t)))
  const ao = Ic('(pointer: fine)', (t) => (t ? 'pointer-fine' : 'pointer-coarse'))
  Fo(t, ao, (t) => n(175, (ne = t)))
  const so = Ic('(hover: hover)', (t) => (t ? 'pointer-hover' : 'pointer-no-hover'))
  Fo(t, so, (t) => n(176, (oe = t)))
  const lo = ar(!1)
  Fo(t, lo, (t) => n(149, (Et = t)))
  const co = rr(void 0, (t) => {
    const e = Ia(0),
      n = [
        lo.subscribe((t) => {
          e.set(t ? 1 : 0)
        }),
        e.subscribe(t),
      ]
    return () => n.forEach((t) => t())
  })
  Fo(t, co, (t) => n(222, (xe = t)))
  const uo = ar(We)
  Fo(t, uo, (t) => n(211, (Ct = t)))
  const po = sr([oo, Sn], ([t, e], n) => {
    if (!t || !e || !(!St && !kt)) return
    const o = Math.min(t.width / e.width, t.height / e.height)
    n(Ct ? o : Math.min(1, o))
  })
  Fo(t, po, (t) => n(216, (Ut = t)))
  const ho = ar()
  Fo(t, ho, (t) => n(209, (St = t)))
  const go = ar()
  Fo(t, go, (t) => n(210, (kt = t)))
  const mo = rr(void 0, (t) => {
      const e = Ia(void 0, { precision: 1e-4 }),
        n = [
          Sn.subscribe(() => {
            if (!Mt) return
            const t = void 0 === kt || Et,
              n = rl(Mt, kt, 5 * Ve)
            e.set(n, { hard: t })
          }),
          e.subscribe(t),
        ]
      return () => n.forEach((t) => t())
    }),
    fo = ar()
  Fo(t, fo, (t) => n(212, (At = t)))
  const $o = ar()
  Fo(t, $o, (t) => n(218, (Yt = t)))
  const yo = ar(void 0)
  Fo(t, yo, (t) => n(213, (Lt = t)))
  const xo = rr(void 0, (t) => {
    const e = Ia(void 0, { precision: 1e-4 }),
      n = () => {
        if (!At) return
        const t = Et || !It,
          n = rl(At, Lt, 1 * Ve)
        if (
          (n.width < 0 && ((n.width = 0), (n.x = At.x)),
          n.height < 0 && ((n.height = 0), (n.y = At.y)),
          zt(n, Wt),
          'resize' === y && Mt)
        ) {
          const t = Nt || Mt
          Dt(n, t.width / At.width || t.height / At.height)
        }
        e.set(n, { hard: t })
      },
      o = [oo.subscribe(n), fo.subscribe(n), Fn.subscribe(n), e.subscribe(t)]
    return () => o.forEach((t) => t())
  })
  let bo
  Fo(t, xo, (t) => n(38, (ce = t))),
    oo.subscribe(() => {
      if (!Wt || !Mt) return
      const t =
        Mt.width <= Wt.width && Mt.height <= Wt.height
          ? Xt(Wt, Ot(Rt(Mt), Ut || 1))
          : Gt(Wt, Vt(Mt || Ht))
      fo.set(t)
    }),
    $o.subscribe((t) => {
      if (!t) return (bo = void 0), void _o(ho, (St = void 0), St)
      bo = jt
      const e = Rt(Mt)
      ho.set(e)
    }),
    fo.subscribe((t) => {
      if (!t || !Yt) return
      const e =
        ((n = Rt(t)),
        (o = Yt),
        (n.x -= o.x),
        (n.y -= o.y),
        (n.width -= o.width),
        (n.height -= o.height),
        n)
      var n, o
      _t(e, bo)
      const i = ((t, e) => (
        (t.x += e.x), (t.y += e.y), (t.width += e.width), (t.height += e.height), t
      ))(Rt(St), e)
      Sn.set(i)
    }),
    Sn.subscribe((t) => {
      if (Et || Yt || kt) return
      if (!t || !At) return
      const e = Vt(At),
        n = Vt(t)
      if (xr(e, 6) === xr(n, 6)) return
      const o = Math.min(Wt.width / Mt.width, Wt.height / Mt.height),
        i = mt(t.width * o, t.height * o),
        r = 0.5 * (At.width - i.width),
        a = 0.5 * (At.height - i.height),
        s = Ft(At.x + r, At.y + a, i.width, i.height)
      fo.set(s)
    })
  const vo = sr([po, Sn, fo], ([t, e, n], o) => {
      if (!t || !e || !n) return
      const i = n.width / e.width,
        r = n.height / e.height
      o(Math.max(i, r) / t)
    }),
    wo = sr([po, vo], ([t, e], n) => {
      if (!e) return
      n(t * e)
    })
  Fo(t, wo, (t) => n(217, (jt = t)))
  const Co = sr([qn, xo], ([t, e], n) => {
      if (!e || o) return n([])
      const { x: i, y: r, width: a, height: s } = e
      n([
        {
          points: [j(i, r), j(i + a, r), j(i + a, r + s), j(i, r + s), j(i, r)],
          strokeWidth: 1,
          strokeColor: t,
        },
      ])
    }),
    Mo = ar([]),
    Ro = sr([Co, Mo], ([t, e], n) => {
      n([...t, ...e])
    })
  Fo(t, Ro, (t) => n(60, (Te = t)))
  const To = ar(!1)
  let Po
  Fo(t, To, (t) => n(182, (ue = t)))
  const Eo = sr([To, mn], ([t, e], n) => {
    if ((Po && Po.cancel(), !t || !e)) return n(void 0)
    var o, r
    ;(Po = { cancel: i }),
      ((o = e),
      (r = Po),
      new Promise((t, e) => {
        let n,
          i = !1
        r.cancel = () => (i = !0)
        const a = Date.now()
        hn(o)
          .then((e) => {
            const o = Date.now() - a
            clearTimeout(n),
              (n = setTimeout(
                () => {
                  i || t(e)
                },
                Math.max(0, 1e3 - o)
              ))
          })
          .catch(e)
      }))
        .then(n)
        .catch((t) => _o($n, (wt.error = t), wt))
  })
  Fo(t, Eo, (t) => n(25, (de = t)))
  const Ao = ar({})
  Fo(t, Ao, (t) => n(178, (re = t)))
  const Bo = ar([])
  Fo(t, Bo, (t) => n(57, (ke = t)))
  const zo = sr([oo, Qn, fn, mo, fo, wo, In, Bn, zn, Fn], ([t, e, n, o, i, r, a, s, l, c], u) => {
    if (t && 'resize' === y) {
      const t = c || o
      r = t.width / o.width || t.height / o.height
    }
    u(
      ((t, e, n, o, i, r, a, s, l, c, u) => {
        if (!(t && e && n && o && r)) return
        const d = Jt(Rt(e)),
          p = Bt(d),
          h = Bt(t),
          g = Pt(n),
          m = Bt(g),
          f = j(a, s),
          $ = Cr(n, o, l, f),
          y = Bt($),
          x = nt(G(m), y),
          b = nt(G(h), p)
        ;(x.x += b.x), (x.y += b.y)
        const v = Z(G(x))
        ;(v.x += b.x), (v.y += b.y)
        const w = Bt(zt(Rt(i), t)),
          S = nt(w, h)
        return (
          et(x, S),
          {
            origin: v,
            translation: x,
            rotation: { x: u ? Math.PI : 0, y: c ? Math.PI : 0, z: l },
            perspective: f,
            scale: r,
          }
        )
      })(t, e, n, o, i, r, 0, 0, a, s, l)
    )
  })
  Fo(t, zo, (t) => n(177, (ie = t)))
  const Do = sr([On, _n, Wn, Vn, Nn], ([t, e, n, o, i], r) => {
    const a =
      t &&
      Object.keys(t)
        .map((e) => t[e])
        .filter(Boolean)
    r({
      gamma: n || void 0,
      vignette: o || void 0,
      noise: i || void 0,
      convolutionMatrix: e || void 0,
      colorMatrix: a && a.length && So(a),
    })
  })
  let Oo, Wo
  Fo(t, Do, (t) => n(179, (se = t)))
  const Vo = (() => {
      if (!Ce()) return !1
      const t = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/i) || [],
        [, e, n] = t.map((t) => parseInt(t, 10) || 0)
      return e > 13 || (13 === e && n >= 4)
    })(),
    No = ar({})
  Fo(t, No, (t) => n(174, (ee = t)))
  const Uo = vl(),
    Ho = rr(Uo, (t) => {
      const e = () => t(vl()),
        n = matchMedia(`(resolution: ${Uo}dppx)`)
      return n.addListener(e), () => n.removeListener(e)
    })
  Fo(t, Ho, (t) => n(55, (we = t)))
  const Xo = ar()
  Fo(t, Xo, (t) => n(16, (It = t)))
  const jo = ((t, e) => {
    const { sub: n, pub: o } = fr()
    let i
    const r = [],
      a = ar(-1),
      s = [],
      l = () => s.forEach((t) => t({ index: Lo(a), length: r.length })),
      c = {
        get index() {
          return Lo(a)
        },
        set index(t) {
          ;(t = Number.isInteger(t) ? t : -1),
            (t = Mr(t, -1, r.length - 1)),
            a.set(t),
            e(r[c.index] || i),
            l()
        },
        get state() {
          return r[r.length - 1] || i
        },
        length: () => r.length,
        undo() {
          const t = c.index--
          return o('undo', t), t
        },
        redo() {
          const t = c.index++
          return o('redo', c.index), t
        },
        revert() {
          ;(r.length = 0), (c.index = -1), o('revert')
        },
        write(n) {
          n && e({ ...t(), ...n }), (r.length = c.index + 1), r.push(t()), a.set(r.length - 1), l()
        },
        set(t = {}) {
          Array.isArray(t) ? ((r.length = 0), r.push(...t), (c.index = r.length - 1)) : (i = t)
        },
        get: () => [...r],
        subscribe: (t) => (
          s.push(t), t({ index: c.index, length: r.length }), () => s.splice(s.indexOf(t), 1)
        ),
        on: n,
      }
    return c
  })(
    () => vt,
    (t) => {
      _o(Xn, (vt = t), vt), to.set(Kt)
    }
  )
  Pe(),
    (Pe = Io(jo, (t) => n(155, (Qt = t)))),
    $n.subscribe((t) => {
      t && t.complete && jo.set(vt)
    })
  const Yo = () => Ne().then((t) => t && jo.revert()),
    Go = ar(!1)
  Fo(t, Go, (t) => n(157, (te = t)))
  const Zo = () => {
    _o(Go, (te = !0), te)
    const t = ri.subscribe((e) => {
      1 === e && (t(), Ae('processImage'))
    })
  }
  yn.subscribe((t) => {
    if (!t) return
    _o(Go, (te = !0), te)
    const { complete: e } = t
    e && _o(Go, (te = !1), te)
  })
  const qo = {
    ...Fe,
    imageFile: mn,
    imageSize: fn,
    imageCropAspectRatio: vn,
    imageCropMinSize: Mn,
    imageCropMaxSize: Rn,
    imageCropLimitToImage: wn,
    imageCropRect: Sn,
    imageCropRectOrigin: En,
    imageCropRectSnapshot: ho,
    imageCropRectAspectRatio: An,
    imageCropRange: Pn,
    imageRotation: In,
    imageRotationRange: Ln,
    imageFlipX: Bn,
    imageFlipY: zn,
    imageOutputSize: Fn,
    imageColorMatrix: On,
    imageConvolutionMatrix: _n,
    imageGamma: Wn,
    imageVignette: Vn,
    imageNoise: Nn,
    imageDecoration: Un,
    imageAnnotation: Hn,
    imagePreview: Eo,
    imageTransforms: zo,
    imagePreviewModifiers: Ao,
    history: jo,
    animation: Xo,
    pixelRatio: Ho,
    elasticityMultiplier: Ve,
    scrollElasticity: ou,
    rangeInputElasticity: 5,
    pointerAccuracy: ao,
    pointerHoverable: so,
    env: No,
    rootRect: Qn,
    stageRect: oo,
    stageScalar: po,
    utilRect: no,
    presentationScalar: wo,
    rootBackgroundColor: Gn,
    rootForegroundColor: Zn,
    rootLineColor: qn,
    imageOverlayMarkup: Mo,
    imagePreviews: Bo,
    isInteracting: lo,
    isInteractingFraction: co,
    imageCropRectIntent: go,
    imageCropRectPresentation: mo,
    imageSelectionRect: fo,
    imageSelectionRectIntent: yo,
    imageSelectionRectPresentation: xo,
    imageSelectionRectSnapshot: $o,
    imageScalar: vo,
  }
  delete qo.image
  const Ko = 'util-' + M()
  let Qo = [],
    Jo = Ce()
  const ti = (t) => {
      const e = N.getPropertyValue(t)
      return zc(e)
    },
    ei = (t, e) => {
      const n = ti(t)
      n && 0 !== n[3] && ((n.length = 3), e.set(n))
    },
    ni = () => {
      ei('color', Zn),
        ei('background-color', Gn),
        ei('outline-color', qn),
        (() => {
          const t = ti('--preview-border-color')
          t && qn.set(t)
        })()
    },
    oi = (t) => {
      const e = []
      return t.forEach((t) => e.push(...ii(t))), e.filter(Boolean)
    },
    ii = (t) => {
      const e = [t]
      if (kn(t)) {
        let n = j(t.x1, t.y1),
          o = j(t.x2, t.y2)
        if (t.lineStart) {
          const i = ro(n, t.strokeWidth, t.strokeColor, t.lineStart, j(o.x - n.x, o.y - n.y))
          ;(n = i.position || n), e.push(i.shape)
        }
        if (t.lineEnd) {
          const i = ro(o, t.strokeWidth, t.strokeColor, t.lineEnd, j(n.x - o.x, n.y - o.y))
          ;(o = i.position || n), e.push(i.shape)
        }
        t.points = [n, o]
      } else
        Cn(t)
          ? (t.points = [j(t.x1, t.y1), j(t.x2, t.y2), j(t.x3, t.y3)])
          : ((t) => xn(t) && !t.text.length)(t)
          ? (bn(t) &&
              ((t.width = 5),
              (t.height = Ue(t.lineHeight) ? t.lineHeight(t.fontSize) : t.lineHeight)),
            (t.strokeWidth = 1),
            (t.strokeColor = [1, 1, 1, 0.5]),
            (t.backgroundColor = [0, 0, 0, 0.1]))
          : xn(t) &&
            ((t.fontFamily = t.fontFamily || 'sans-serif'), (t.fontSize = t.fontSize || 16))
      return e
    },
    ri = Ea(void 0, { duration: 500 })
  let ai
  Fo(t, ri, (t) => n(27, (he = t)))
  const si = Ia(void 0, { stiffness: 0.02, damping: 0.5, precision: 0.25 })
  Fo(t, si, (t) => n(47, (ge = t)))
  const li = Ia(void 0, { stiffness: 0.03, damping: 0.4, precision: 0.25 })
  Fo(t, li, (t) => n(48, (me = t)))
  const ci = ar([])
  Fo(t, ci, (t) => n(219, (fe = t))), bi('keysPressed', ci)
  const ui = () => ({
      foregroundColor: [...$e],
      lineColor: [...ye],
      utilVisibility: { ...b },
      isInteracting: Et,
      isInteractingFraction: xe,
      rootRect: Rt(bt),
      stageRect: Rt(Wt),
      selectionRect: Rt(ce),
    }),
    di = (t, e, n, o) => ({
      annotationShapes: oi(
        e
          .filter(Tn)
          .map(dn)
          .map((t) => Jn(t, Ht))
      ),
      decorationShapes: oi(
        n
          .filter(Tn)
          .map(dn)
          .map((e) =>
            ((t, e) =>
              Jn(t, {
                x: ce.x / e.scale,
                y: ce.y / e.scale,
                width: ce.width / e.scale,
                height: ce.height / e.scale,
              }))(e, t)
          )
          .map((e) => ((t, e) => (io(t, ce, e.scale, e.size), t))(e, t))
      ),
      interfaceShapes: oi(o.filter(Tn)),
    })
  let pi
  const hi = ar()
  bi('rootPortal', hi), bi('rootRect', Qn)
  return (
    (t.$$set = (t) => {
      'class' in t && n(121, (Ie = t.class)),
        'layout' in t && n(122, (Le = t.layout)),
        'stores' in t && n(123, (Fe = t.stores)),
        'locale' in t && n(2, (Be = t.locale)),
        'id' in t && n(3, (ze = t.id)),
        'util' in t && n(124, (De = t.util)),
        'utils' in t && n(125, (Oe = t.utils)),
        'animations' in t && n(126, (_e = t.animations)),
        'previewUpscale' in t && n(127, (We = t.previewUpscale)),
        'elasticityMultiplier' in t && n(4, (Ve = t.elasticityMultiplier)),
        'willRevert' in t && n(128, (Ne = t.willRevert)),
        'willRenderCanvas' in t && n(5, (He = t.willRenderCanvas)),
        'willRenderToolbar' in t && n(129, (Xe = t.willRenderToolbar)),
        'enableButtonExport' in t && n(130, (je = t.enableButtonExport)),
        'enableButtonRevert' in t && n(131, (Ye = t.enableButtonRevert)),
        'enableNavigateHistory' in t && n(132, (Ge = t.enableNavigateHistory)),
        'enableToolbar' in t && n(6, (Ze = t.enableToolbar)),
        'enableUtils' in t && n(133, (qe = t.enableUtils)),
        'enableButtonClose' in t && n(134, (Ke = t.enableButtonClose)),
        'enableDropImage' in t && n(135, (Qe = t.enableDropImage)),
        'previewImageDataMaxSize' in t && n(136, (Je = t.previewImageDataMaxSize)),
        'layoutDirectionPreference' in t && n(137, (tn = t.layoutDirectionPreference)),
        'imageOrienter' in t && n(138, (en = t.imageOrienter)),
        'pluginComponents' in t && n(139, (nn = t.pluginComponents)),
        'pluginOptions' in t && n(7, (on = t.pluginOptions)),
        'root' in t && n(1, (sn = t.root)),
        'imageSourceToImageData' in t && n(8, (hn = t.imageSourceToImageData))
    }),
    (t.$$.update = () => {
      if (
        (536870912 & t.$$.dirty[3] && n(143, (o = 'overlay' === Le)),
        524800 & t.$$.dirty[4] && n(13, (r = qe && !o)),
        129 & t.$$.dirty[0] &&
          on &&
          Object.keys(on).forEach((t) => {
            Object.keys(on[t]).forEach((e) => {
              an[t] && n(0, (an[t][e] = on[t][e]), an)
            })
          }),
        (1 & t.$$.dirty[0]) | (32768 & t.$$.dirty[4]))
      ) {
        let t = !1
        nn.forEach(([e]) => {
          an[e] || (n(0, (an[e] = {}), an), (t = !0))
        }),
          t && n(141, (ln = [...nn]))
      }
      var e, i, p, h
      4096 & t.$$.dirty[4] &&
        (a = Je
          ? ((e = Je), (i = un), mt(Math.min(e.width, i.width), Math.min(e.height, i.height)))
          : un),
        1048576 & t.$$.dirty[4] && gn.update(yt[0]),
        16384 & t.$$.dirty[0] && xt && Qn.set(Ft(xt.x, xt.y, xt.width, xt.height)),
        6815744 & t.$$.dirty[4] && bt && o && wt && wt.complete && (vn.set(Vt(bt)), jo.set(vt)),
        (4 & t.$$.dirty[0]) | (131074 & t.$$.dirty[4]) &&
          n(147, (d = Be && ln.length ? Oe || ln.map(([t]) => t) : [])),
        8388608 & t.$$.dirty[4] && n(15, (C = d.length > 1)),
        32768 & t.$$.dirty[0] && (C || to.set(Tt())),
        64 & t.$$.dirty[0] && (Ze || eo.set(Tt())),
        524296 & t.$$.dirty[4] && uo.set(We || o),
        67108864 & t.$$.dirty[4] && Zt && Bo.set([]),
        33554432 & t.$$.dirty[4] && n(151, (s = !Et && !Ka())),
        536870912 & t.$$.dirty[4] && n(152, (l = !qt)),
        402653188 & t.$$.dirty[4] &&
          _o(Xo, (It = 'always' === _e ? s : 'never' !== _e && s && l), It),
        1 & t.$$.dirty[5] && n(154, (c = Qt.index > -1)),
        1 & t.$$.dirty[5] && n(156, (u = Qt.index < Qt.length - 1)),
        8519680 & t.$$.dirty[4] && n(158, (g = ln.filter(([t]) => d.includes(t)))),
        8 & t.$$.dirty[5] && n(159, (f = g.length)),
        (4 & t.$$.dirty[0]) | (8388608 & t.$$.dirty[4]) | (8 & t.$$.dirty[5]) &&
          n(
            18,
            ($ =
              d
                .map((t) => {
                  const e = g.find(([e]) => t === e)
                  if (e)
                    return { id: t, view: e[1], tabIcon: Be[t + 'Icon'], tabLabel: Be[t + 'Label'] }
                })
                .filter(Boolean) || [])
          ),
        (8388609 & t.$$.dirty[4]) | (16 & t.$$.dirty[5]) &&
          n(17, (y = De && 'string' == typeof De && d.includes(De) ? De : f > 0 ? d[0] : void 0)),
        131073 & t.$$.dirty[0] && n(160, (x = (y && an[y].tools) || [])),
        786432 & t.$$.dirty[0] &&
          n(19, (b = $.reduce((t, e) => ((t[e.id] = (b && b[e.id]) || 0), t), {}))),
        131072 & t.$$.dirty[0] && n(31, (v = { name: Ko, selected: y })),
        262144 & t.$$.dirty[0] &&
          n(32, (S = $.map((t) => ({ id: t.id, icon: t.tabIcon, label: t.tabLabel })))),
        262144 & t.$$.dirty[0] && n(33, (k = $.map((t) => t.id))),
        268435456 & t.$$.dirty[3] && n(34, (R = bs(['PinturaRoot', 'PinturaRootComponent', Ie]))),
        2097152 & t.$$.dirty[4] &&
          n(161, (T = bt && (bt.width > 1e3 ? 'wide' : bt.width < 600 ? 'narrow' : void 0))),
        2097152 & t.$$.dirty[4] && n(162, (P = bt && (bt.width <= 320 || bt.height <= 460))),
        2097152 & t.$$.dirty[4] &&
          n(163, (E = bt && (bt.height > 1e3 ? 'tall' : bt.height < 600 ? 'short' : void 0))),
        2 & t.$$.dirty[0] &&
          n(164, (A = sn && sn.parentNode && sn.parentNode.classList.contains('PinturaModal'))),
        (1024 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) | (512 & t.$$.dirty[5]) &&
          n(165, (I = A && bt && Oo > bt.width)),
        (2048 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) | (512 & t.$$.dirty[5]) &&
          n(166, (L = A && bt && Wo > bt.height)),
        3072 & t.$$.dirty[5] && n(167, (F = I && L)),
        64 & t.$$.dirty[5] && n(168, (B = 'narrow' === T)),
        2105344 & t.$$.dirty[4] &&
          n(
            169,
            ((p = bt),
            (h = tn),
            (z = bt
              ? 'auto' === h
                ? p.width > p.height
                  ? 'landscape'
                  : 'portrait'
                : 'horizontal' === h
                ? p.width < 500
                  ? 'portrait'
                  : 'landscape'
                : 'vertical' === h
                ? p.height < 400
                  ? 'landscape'
                  : 'portrait'
                : void 0
              : 'landscape'))
          ),
        16384 & t.$$.dirty[5] && n(35, (D = 'landscape' === z)),
        8448 & t.$$.dirty[5] && n(170, (_ = B || 'short' === E)),
        (1024 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) &&
          n(171, (W = Jo && bt && Oo === bt.width && !Vo)),
        288 & t.$$.dirty[5] && n(172, (V = x.length && 'short' === E)),
        2 & t.$$.dirty[0] && n(173, (N = sn && getComputedStyle(sn))),
        262144 & t.$$.dirty[5] && N && ni(),
        (106560 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[3]) | (3792832 & t.$$.dirty[5]) &&
          No.set({
            ...ee,
            layoutMode: Le,
            orientation: z,
            horizontalSpace: T,
            verticalSpace: E,
            isModal: A,
            isCentered: F,
            isCenteredHorizontally: I,
            isCenteredVertically: L,
            isAnimated: It,
            pointerAccuracy: ne,
            pointerHoverable: oe,
            isCompact: _,
            hasSwipeNavigation: W,
            hasLimitedSpace: P,
            hasToolbar: Ze,
            hasNavigation: C && r,
            isIOS: Jo,
          }),
        524288 & t.$$.dirty[5] &&
          n(
            36,
            (U = Object.keys(ee)
              .map((t) => (/^is|has/.test(t) ? (ee[t] ? Ac(t) : void 0) : ee[t]))
              .filter(Boolean)
              .join(' '))
          ),
        (16777216 & t.$$.dirty[4]) | (62914560 & t.$$.dirty[5]) &&
          n(
            37,
            (H = ie
              ? {
                  ...Object.keys(re)
                    .filter((t) => null != re[t])
                    .reduce((t, e) => (t = { ...t, ...re[e] }), {}),
                  ...ie,
                  ...se,
                  backgroundColor: le,
                  size: ht(Mt),
                }
              : void 0)
          ),
        (4 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[5]) &&
          n(20, (Y = Be && X.length && Be.labelSupportError(X))),
        4194304 & t.$$.dirty[4] && n(21, (q = wt && !!wt.error)),
        4194304 & t.$$.dirty[4] && n(22, (K = !wt || (!wt.complete && void 0 === wt.task))),
        4194304 & t.$$.dirty[4] &&
          n(39, (Q = wt && (wt.taskLengthComputable ? wt.taskProgress : 1 / 0))),
        4456448 & t.$$.dirty[4] &&
          (wt && wt.complete
            ? (clearTimeout(ai),
              n(
                142,
                (ai = setTimeout(() => {
                  _o(To, (ue = !0), ue)
                }, 500))
              ))
            : wt || _o(To, (ue = !1), ue)),
        (6291456 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) | (134217728 & t.$$.dirty[5]) &&
          n(23, (J = wt && !q && !K && !ue)),
        (33554432 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[4]) && n(24, (tt = !(!Zt || de))),
        268435460 & t.$$.dirty[5] &&
          n(26, (ot = te || (pe && void 0 !== pe.progress && !pe.complete))),
        (4194304 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) &&
          n(40, (it = wt && !(wt.error || K))),
        (4 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) &&
          n(
            41,
            (rt =
              Be &&
              (wt
                ? wt.complete
                  ? Be.statusLabelLoadImage({ progress: 1 / 0, task: 'blob-to-bitmap' })
                  : Ja(Be.statusLabelLoadImage(wt), wt.error && wt.error.metadata, '{', '}')
                : Be.statusLabelLoadImage(wt)))
          ),
        (4 & t.$$.dirty[0]) | (268435456 & t.$$.dirty[5]) &&
          n(42, (at = pe && Be && Be.statusLabelProcessImage(pe))),
        268435456 & t.$$.dirty[5] &&
          n(43, (st = pe && (pe.taskLengthComputable ? pe.taskProgress : 1 / 0))),
        268435456 & t.$$.dirty[5] && n(44, (lt = pe && !pe.error)),
        268435456 & t.$$.dirty[5] && n(45, (ct = pe && pe.error)),
        99614720 & t.$$.dirty[0] && _o(ri, (he = Y || K || q || J || tt || ot ? 1 : 0), he),
        134217728 & t.$$.dirty[0] && n(46, (ut = he > 0)),
        134217728 & t.$$.dirty[0] &&
          he <= 0 &&
          (si.set(void 0, { hard: !0 }), li.set(void 0, { hard: !0 })),
        1024 & t.$$.dirty[0] &&
          n(
            49,
            (dt =
              Vo &&
              ((t) => {
                const e = t.touches ? t.touches[0] : t
                ;(e.pageX > 10 && e.pageX < Oo - 10) || t.preventDefault()
              }))
          ),
        (4 & t.$$.dirty[0]) | (1073743328 & t.$$.dirty[4]) | (663586 & t.$$.dirty[5]) &&
          n(
            50,
            (pt =
              Be &&
              Xe(
                [
                  [
                    'div',
                    'alpha',
                    { class: 'PinturaNavGroup' },
                    [
                      [
                        'div',
                        'alpha-set',
                        { class: 'PinturaNavSet' },
                        [
                          Ke && [
                            'Button',
                            'close',
                            {
                              label: Be.labelClose,
                              icon: Be.iconButtonClose,
                              onclick: () => Ae('close'),
                              hideLabel: !0,
                            },
                          ],
                          Ye && [
                            'Button',
                            'revert',
                            {
                              label: Be.labelButtonRevert,
                              icon: Be.iconButtonRevert,
                              disabled: !c,
                              onclick: Yo,
                              hideLabel: !0,
                            },
                          ],
                        ],
                      ],
                    ],
                  ],
                  [
                    'div',
                    'beta',
                    { class: 'PinturaNavGroup PinturaNavGroupFloat' },
                    [
                      Ge && [
                        'div',
                        'history',
                        { class: 'PinturaNavSet' },
                        [
                          [
                            'Button',
                            'undo',
                            {
                              label: Be.labelButtonUndo,
                              icon: Be.iconButtonUndo,
                              disabled: !c,
                              onclick: jo.undo,
                              hideLabel: !0,
                            },
                          ],
                          [
                            'Button',
                            'redo',
                            {
                              label: Be.labelButtonRedo,
                              icon: Be.iconButtonRedo,
                              disabled: !u,
                              onclick: jo.redo,
                              hideLabel: !0,
                            },
                          ],
                        ],
                      ],
                      V && [
                        'div',
                        'plugin-tools',
                        { class: 'PinturaNavSet' },
                        x.filter(Boolean).map(([t, e, n]) => [t, e, { ...n, hideLabel: !0 }]),
                      ],
                    ],
                  ],
                  [
                    'div',
                    'gamma',
                    { class: 'PinturaNavGroup' },
                    [
                      je && [
                        'Button',
                        'export',
                        {
                          label: Be.labelButtonExport,
                          icon: B && Be.iconButtonExport,
                          class: 'PinturaButtonExport',
                          onclick: Zo,
                          hideLabel: B,
                        },
                      ],
                    ],
                  ],
                ],
                { ...ee }
              ))
          ),
        16384 & t.$$.dirty[0] && n(184, (gt = xt && xt.width > 0 && xt.height > 0)),
        (4 & t.$$.dirty[0]) | (536870928 & t.$$.dirty[5]) && n(51, (ft = gt && Be && f)),
        4096 & t.$$.dirty[0] && pi && hi.set(pi)
    }),
    n(181, (X = [!Oc() && 'WebGL'].filter(Boolean))),
    n(
      52,
      ($t = (
        (t, e = !0) =>
        (n) => {
          'ping' === n.type && (e && n.stopPropagation(), t(n.detail.type, n.detail.data))
        }
      )(Ee.pub))
    ),
    [
      an,
      sn,
      Be,
      ze,
      Ve,
      He,
      Ze,
      on,
      hn,
      jo,
      Oo,
      Wo,
      pi,
      r,
      xt,
      C,
      It,
      y,
      $,
      b,
      Y,
      q,
      K,
      J,
      tt,
      de,
      ot,
      he,
      Qo,
      Ht,
      Kt,
      v,
      S,
      k,
      R,
      D,
      U,
      H,
      ce,
      Q,
      it,
      rt,
      at,
      st,
      lt,
      ct,
      ut,
      ge,
      me,
      dt,
      pt,
      ft,
      $t,
      be,
      ve,
      we,
      Se,
      ke,
      Me,
      Re,
      Te,
      mn,
      fn,
      $n,
      yn,
      Sn,
      Fn,
      Dn,
      Un,
      Hn,
      Xn,
      jn,
      Gn,
      Zn,
      qn,
      Kn,
      Qn,
      to,
      eo,
      no,
      oo,
      ao,
      so,
      lo,
      co,
      uo,
      po,
      ho,
      go,
      fo,
      $o,
      yo,
      xo,
      wo,
      Ro,
      To,
      Eo,
      Ao,
      Bo,
      zo,
      Do,
      No,
      Ho,
      Xo,
      Go,
      qo,
      ({ target: t, propertyName: e }) => {
        t === sn && /background|outline/.test(e) && ni()
      },
      ri,
      si,
      li,
      (t) => {
        _o(si, (ge = Math.round(0.5 * -t.detail.width) - 16), ge), _o(li, (me = t.detail.width), me)
      },
      () => {
        Ae('abortLoadImage')
      },
      () => {
        Ae('abortProcessImage'), _o(Go, (te = !1), te)
      },
      ci,
      (t) => {
        const { keyCode: e } = t
        if (229 === e) return
        const n = new Set([...fe, e])
        ci.set(Array.from(n))
      },
      ({ keyCode: t }) => {
        ci.set(fe.filter((e) => e !== t))
      },
      () => {
        ci.set([])
      },
      (t) => {
        var e
        ;((t) => /textarea/i.test(t.nodeName))((e = t.target)) ||
          ((t) => /date|email|number|search|text|url/.test(t.type))(e) ||
          t.preventDefault()
      },
      (t) => {
        Qe && t.detail.files.length && Ae('loadImage', t.detail.files[0])
      },
      ui,
      di,
      Ie,
      Le,
      Fe,
      De,
      Oe,
      _e,
      We,
      Ne,
      Xe,
      je,
      Ye,
      Ge,
      qe,
      Ke,
      Qe,
      Je,
      tn,
      en,
      nn,
      rn,
      ln,
      ai,
      o,
      yt,
      bt,
      wt,
      d,
      Mt,
      Et,
      Zt,
      s,
      l,
      qt,
      c,
      Qt,
      u,
      te,
      g,
      f,
      x,
      T,
      P,
      E,
      A,
      I,
      L,
      F,
      B,
      z,
      _,
      W,
      V,
      N,
      ee,
      ne,
      oe,
      ie,
      re,
      se,
      le,
      X,
      ue,
      pe,
      gt,
      function () {
        n(10, (Oo = window.innerWidth)), n(11, (Wo = window.innerHeight))
      },
      (t) => _o(eo, (be = t.detail), be),
      ({ detail: t }) => n(17, (y = t)),
      (t, e) => e.id === t,
      function (e, o) {
        t.$$.not_equal(an[o], e) && ((an[o] = e), n(0, an), n(7, on), n(139, nn))
      },
      (t) => _o(no, (ve = t.detail), ve),
      (t) => n(28, (Qo = Qo.concat(t))),
      (t) => n(28, (Qo = Qo.filter((e) => e !== t))),
      (t, { detail: e }) => n(19, (b[t] = e), b),
      (t) => _o(to, (Kt = t.detail), Kt),
      (t) => t.id === y,
      function (e) {
        t.$$.not_equal(an[y], e) && ((an[y] = e), n(0, an), n(7, on), n(139, nn))
      },
      (t) => _o(no, (ve = t.detail), ve),
      () => n(28, (Qo = Qo.concat(y))),
      () => n(28, (Qo = Qo.filter((t) => t !== y))),
      ({ detail: t }) => n(19, (b[y] = t), b),
      (t) => {
        const e = { ...t, ...ui() },
          {
            annotationShapes: n,
            decorationShapes: o,
            interfaceShapes: i,
          } = He({ decorationShapes: Me, annotationShapes: Re, interfaceShapes: Te }, e)
        return di(e, n, o, i)
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(pi = t), n(12, pi)
        })
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(sn = t), n(1, sn)
        })
      },
      (t) => _o(Kn, (xt = t.detail), xt),
    ]
  )
}
class ru extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        iu,
        nu,
        Ao,
        {
          class: 121,
          layout: 122,
          stores: 123,
          locale: 2,
          id: 3,
          util: 124,
          utils: 125,
          animations: 126,
          previewUpscale: 127,
          elasticityMultiplier: 4,
          willRevert: 128,
          willRenderCanvas: 5,
          willRenderToolbar: 129,
          enableButtonExport: 130,
          enableButtonRevert: 131,
          enableNavigateHistory: 132,
          enableToolbar: 6,
          enableUtils: 133,
          enableButtonClose: 134,
          enableDropImage: 135,
          previewImageDataMaxSize: 136,
          layoutDirectionPreference: 137,
          imageOrienter: 138,
          pluginComponents: 139,
          pluginOptions: 7,
          sub: 140,
          pluginInterface: 0,
          root: 1,
          imageSourceToImageData: 8,
          history: 9,
        },
        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
      )
  }
  get class() {
    return this.$$.ctx[121]
  }
  set class(t) {
    this.$set({ class: t }), Li()
  }
  get layout() {
    return this.$$.ctx[122]
  }
  set layout(t) {
    this.$set({ layout: t }), Li()
  }
  get stores() {
    return this.$$.ctx[123]
  }
  set stores(t) {
    this.$set({ stores: t }), Li()
  }
  get locale() {
    return this.$$.ctx[2]
  }
  set locale(t) {
    this.$set({ locale: t }), Li()
  }
  get id() {
    return this.$$.ctx[3]
  }
  set id(t) {
    this.$set({ id: t }), Li()
  }
  get util() {
    return this.$$.ctx[124]
  }
  set util(t) {
    this.$set({ util: t }), Li()
  }
  get utils() {
    return this.$$.ctx[125]
  }
  set utils(t) {
    this.$set({ utils: t }), Li()
  }
  get animations() {
    return this.$$.ctx[126]
  }
  set animations(t) {
    this.$set({ animations: t }), Li()
  }
  get previewUpscale() {
    return this.$$.ctx[127]
  }
  set previewUpscale(t) {
    this.$set({ previewUpscale: t }), Li()
  }
  get elasticityMultiplier() {
    return this.$$.ctx[4]
  }
  set elasticityMultiplier(t) {
    this.$set({ elasticityMultiplier: t }), Li()
  }
  get willRevert() {
    return this.$$.ctx[128]
  }
  set willRevert(t) {
    this.$set({ willRevert: t }), Li()
  }
  get willRenderCanvas() {
    return this.$$.ctx[5]
  }
  set willRenderCanvas(t) {
    this.$set({ willRenderCanvas: t }), Li()
  }
  get willRenderToolbar() {
    return this.$$.ctx[129]
  }
  set willRenderToolbar(t) {
    this.$set({ willRenderToolbar: t }), Li()
  }
  get enableButtonExport() {
    return this.$$.ctx[130]
  }
  set enableButtonExport(t) {
    this.$set({ enableButtonExport: t }), Li()
  }
  get enableButtonRevert() {
    return this.$$.ctx[131]
  }
  set enableButtonRevert(t) {
    this.$set({ enableButtonRevert: t }), Li()
  }
  get enableNavigateHistory() {
    return this.$$.ctx[132]
  }
  set enableNavigateHistory(t) {
    this.$set({ enableNavigateHistory: t }), Li()
  }
  get enableToolbar() {
    return this.$$.ctx[6]
  }
  set enableToolbar(t) {
    this.$set({ enableToolbar: t }), Li()
  }
  get enableUtils() {
    return this.$$.ctx[133]
  }
  set enableUtils(t) {
    this.$set({ enableUtils: t }), Li()
  }
  get enableButtonClose() {
    return this.$$.ctx[134]
  }
  set enableButtonClose(t) {
    this.$set({ enableButtonClose: t }), Li()
  }
  get enableDropImage() {
    return this.$$.ctx[135]
  }
  set enableDropImage(t) {
    this.$set({ enableDropImage: t }), Li()
  }
  get previewImageDataMaxSize() {
    return this.$$.ctx[136]
  }
  set previewImageDataMaxSize(t) {
    this.$set({ previewImageDataMaxSize: t }), Li()
  }
  get layoutDirectionPreference() {
    return this.$$.ctx[137]
  }
  set layoutDirectionPreference(t) {
    this.$set({ layoutDirectionPreference: t }), Li()
  }
  get imageOrienter() {
    return this.$$.ctx[138]
  }
  set imageOrienter(t) {
    this.$set({ imageOrienter: t }), Li()
  }
  get pluginComponents() {
    return this.$$.ctx[139]
  }
  set pluginComponents(t) {
    this.$set({ pluginComponents: t }), Li()
  }
  get pluginOptions() {
    return this.$$.ctx[7]
  }
  set pluginOptions(t) {
    this.$set({ pluginOptions: t }), Li()
  }
  get sub() {
    return this.$$.ctx[140]
  }
  get pluginInterface() {
    return this.$$.ctx[0]
  }
  get root() {
    return this.$$.ctx[1]
  }
  set root(t) {
    this.$set({ root: t }), Li()
  }
  get imageSourceToImageData() {
    return this.$$.ctx[8]
  }
  set imageSourceToImageData(t) {
    this.$set({ imageSourceToImageData: t }), Li()
  }
  get history() {
    return this.$$.ctx[9]
  }
}
;((t) => {
  const [e, n, o, i, r, a, s] = [
    'UmVnRXhw',
    'dGVzdA==',
    'cHFpbmFcLm5sfGxvY2FsaG9zdA==',
    'bG9jYXRpb24=',
    'Y29uc29sZQ==',
    'bG9n',
    'VGhpcyB2ZXJzaW9uIG9mIFBpbnR1cmEgaXMgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS4gVmlzaXQgaHR0cHM6Ly9wcWluYS5ubC9waW50dXJhLyB0byBvYnRhaW4gYSBjb21tZXJjaWFsIGxpY2Vuc2Uu',
  ].map(t[[(!1 + '')[1], (!0 + '')[0], (1 + {})[2], (1 + {})[3]].join('')])
  new t[e](o)[n](t[i]) || t[r][a](s)
})(window)
const au = ['klass', 'stores', 'isVisible', 'isActive', 'isActiveFraction', 'locale'],
  su = [
    'history',
    'klass',
    'stores',
    'navButtons',
    'pluginComponents',
    'pluginInterface',
    'pluginOptions',
    'sub',
  ]
let lu
const cu = new Set([]),
  uu = {},
  du = new Map(),
  pu = (...t) => {
    t.filter((t) => !!t.util).forEach((t) => {
      const [e, n] = t.util
      du.has(e) ||
        (du.set(e, n),
        Ma(n)
          .filter((t) => !au.includes(t))
          .forEach((t) => {
            cu.add(t), uu[t] ? uu[t].push(e) : (uu[t] = [e])
          }))
    })
  }
var hu = () => {}
const gu = (t) => w(t[0]),
  mu = (t) => !gu(t),
  fu = (t) => t[1],
  $u = (t) => t[3] || [],
  yu = (t, e, n = {}, o = []) => [t, e, n, o],
  xu = (t, e, n, o = (t) => t) => {
    const i = Cu(e, n),
      r = i.findIndex((t) => fu(t) === e)
    var a, s, l
    ;(a = i), (s = o(r)), (l = t), a.splice(s, 0, l)
  },
  bu = (t, e, n) => xu(t, e, n),
  vu = (t, e, n) => xu(t, e, n, (t) => t + 1),
  wu = (t, e) => {
    if (mu(e)) return e.push(t)
    e[3] = [...$u(e), t]
  },
  Su = (t, e) => {
    const n = Cu(t, e)
    return tl(n, (e) => fu(e) === t), n
  },
  ku = (t, e) => (gu(e) ? (fu(e) === t ? e : ku(t, $u(e))) : e.find((e) => ku(t, e))),
  Cu = (t, e) =>
    mu(e) ? (e.find((e) => fu(e) === t) ? e : e.find((e) => Cu(t, $u(e)))) : Cu(t, $u(e))
let Mu = null
var Ru = () => (
    null === Mu &&
      (Mu =
        c() &&
        !('[object OperaMini]' === Object.prototype.toString.call(window.operamini)) &&
        'visibilityState' in document &&
        'Promise' in window &&
        'File' in window &&
        'URL' in window &&
        'createObjectURL' in window.URL &&
        'performance' in window),
    Mu
  ),
  Tu = (t) => Math.round(100 * t)
const Pu = {
    base: 0,
    min: -0.25,
    max: 0.25,
    getLabel: (t) => Tu(t / 0.25),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.brightness) return t.brightness[4]
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        brightness: [1, 0, 0, 0, e, 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0],
      })),
  },
  Eu = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (t) => Tu(2 * (t - 0.5) - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.contrast) return t.contrast[0]
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        contrast: [
          e,
          0,
          0,
          0,
          0.5 * (1 - e),
          0,
          e,
          0,
          0,
          0.5 * (1 - e),
          0,
          0,
          e,
          0,
          0.5 * (1 - e),
          0,
          0,
          0,
          1,
          0,
        ],
      })),
  },
  Au = {
    base: 1,
    min: 0,
    max: 2,
    getLabel: (t) => Tu(t - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.saturation) return (t.saturation[0] - 0.213) / 0.787
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        saturation: [
          0.213 + 0.787 * e,
          0.715 - 0.715 * e,
          0.072 - 0.072 * e,
          0,
          0,
          0.213 - 0.213 * e,
          0.715 + 0.285 * e,
          0.072 - 0.072 * e,
          0,
          0,
          0.213 - 0.213 * e,
          0.715 - 0.715 * e,
          0.072 + 0.928 * e,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
        ],
      })),
  },
  Iu = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (t) => Tu(2 * (t - 0.5) - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.exposure) return t.exposure[0]
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        exposure: [e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 1, 0],
      })),
  },
  Lu = {
    base: 1,
    min: 0.15,
    max: 4,
    getLabel: (t) => Tu(t < 1 ? (t - 0.15) / 0.85 - 1 : (t - 1) / 3),
    getStore: ({ imageGamma: t }) => t,
  },
  Fu = { base: 0, min: -1, max: 1, getStore: ({ imageVignette: t }) => t },
  Bu = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageConvolutionMatrix: t }) => t,
    getValue: (t) => {
      if (t.clarity) return 0 === t.clarity[0] ? t.clarity[1] / -1 : t.clarity[1] / -2
    },
    setValue: (t, e) => {
      t.update((t) => ({
        ...t,
        clarity:
          e >= 0
            ? [0, -1 * e, 0, -1 * e, 1 + 4 * e, -1 * e, 0, -1 * e, 0]
            : [-1 * e, -2 * e, -1 * e, -2 * e, 1 + -3 * e, -2 * e, -1 * e, -2 * e, -1 * e],
      }))
    },
  },
  zu = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (!t.temperature) return
      const e = t.temperature[0]
      return e >= 1 ? (e - 1) / 0.1 : (1 - e) / -0.15
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        temperature:
          e > 0
            ? [1 + 0.1 * e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 + 0.1 * -e, 0, 0, 0, 0, 0, 1, 0]
            : [
                1 + 0.15 * e,
                0,
                0,
                0,
                0,
                0,
                1 + 0.05 * e,
                0,
                0,
                0,
                0,
                0,
                1 + 0.15 * -e,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
              ],
      })),
  }
var Du = {
  finetuneControlConfiguration: {
    gamma: Lu,
    brightness: Pu,
    contrast: Eu,
    saturation: Au,
    exposure: Iu,
    temperature: zu,
    clarity: Bu,
    vignette: Fu,
  },
  finetuneOptions: [
    ['brightness', (t) => t.finetuneLabelBrightness],
    ['contrast', (t) => t.finetuneLabelContrast],
    ['saturation', (t) => t.finetuneLabelSaturation],
    ['exposure', (t) => t.finetuneLabelExposure],
    ['temperature', (t) => t.finetuneLabelTemperature],
    ['gamma', (t) => t.finetuneLabelGamma],
    !Ka() && ['clarity', (t) => t.finetuneLabelClarity],
    ['vignette', (t) => t.finetuneLabelVignette],
  ].filter(Boolean),
}
const Ou = () => [
    0.75, 0.25, 0.25, 0, 0, 0.25, 0.75, 0.25, 0, 0, 0.25, 0.25, 0.75, 0, 0, 0, 0, 0, 1, 0,
  ],
  _u = () => [
    1.398, -0.316, 0.065, -0.273, 0.201, -0.051, 1.278, -0.08, -0.273, 0.201, -0.051, 0.119, 1.151,
    -0.29, 0.215, 0, 0, 0, 1, 0,
  ],
  Wu = () => [
    1.073, -0.015, 0.092, -0.115, -0.017, 0.107, 0.859, 0.184, -0.115, -0.017, 0.015, 0.077, 1.104,
    -0.115, -0.017, 0, 0, 0, 1, 0,
  ],
  Vu = () => [1.06, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0.93, 0, 0, 0, 0, 0, 1, 0],
  Nu = () => [1.1, 0, 0, 0, -0.1, 0, 1.1, 0, 0, -0.1, 0, 0, 1.2, 0, -0.1, 0, 0, 0, 1, 0],
  Uu = () => [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0],
  Hu = () => [
    0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0, 0, 0, 1, 0,
  ],
  Xu = () => [
    0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0, 0, 0,
    1, 0,
  ],
  ju = () => [
    0.163, 0.518, 0.084, -0.01, 0.208, 0.163, 0.529, 0.082, -0.02, 0.21, 0.171, 0.529, 0.084, 0,
    0.214, 0, 0, 0, 1, 0,
  ],
  Yu = () => [
    0.338, 0.991, 0.117, 0.093, -0.196, 0.302, 1.049, 0.096, 0.078, -0.196, 0.286, 1.016, 0.146,
    0.101, -0.196, 0, 0, 0, 1, 0,
  ],
  Gu = () => [
    0.393, 0.768, 0.188, 0, 0, 0.349, 0.685, 0.167, 0, 0, 0.272, 0.533, 0.13, 0, 0, 0, 0, 0, 1, 0,
  ],
  Zu = () => [
    0.289, 0.62, 0.185, 0, 0.077, 0.257, 0.566, 0.163, 0, 0.115, 0.2, 0.43, 0.128, 0, 0.188, 0, 0,
    0, 1, 0,
  ],
  qu = () => [
    0.269, 0.764, 0.172, 0.05, 0.1, 0.239, 0.527, 0.152, 0, 0.176, 0.186, 0.4, 0.119, 0, 0.159, 0,
    0, 0, 1, 0,
  ],
  Ku = () => [
    0.547, 0.764, 0.134, 0, -0.147, 0.281, 0.925, 0.12, 0, -0.135, 0.225, 0.558, 0.33, 0, -0.113, 0,
    0, 0, 1, 0,
  ]
var Qu = {
  filterFunctions: {
    chrome: _u,
    fade: Wu,
    pastel: Ou,
    cold: Nu,
    warm: Vu,
    monoDefault: Hu,
    monoWash: ju,
    monoNoir: Xu,
    monoStark: Yu,
    sepiaDefault: Gu,
    sepiaRust: qu,
    sepiaBlues: Zu,
    sepiaColor: Ku,
  },
  filterOptions: [
    ['Default', [[void 0, (t) => t.labelDefault]]],
    [
      'Classic',
      [
        ['chrome', (t) => t.filterLabelChrome],
        ['fade', (t) => t.filterLabelFade],
        ['cold', (t) => t.filterLabelCold],
        ['warm', (t) => t.filterLabelWarm],
        ['pastel', (t) => t.filterLabelPastel],
      ],
    ],
    [
      'Monochrome',
      [
        ['monoDefault', (t) => t.filterLabelMonoDefault],
        ['monoNoir', (t) => t.filterLabelMonoNoir],
        ['monoStark', (t) => t.filterLabelMonoStark],
        ['monoWash', (t) => t.filterLabelMonoWash],
      ],
    ],
    [
      'Sepia',
      [
        ['sepiaDefault', (t) => t.filterLabelSepiaDefault],
        ['sepiaRust', (t) => t.filterLabelSepiaRust],
        ['sepiaBlues', (t) => t.filterLabelSepiaBlues],
        ['sepiaColor', (t) => t.filterLabelSepiaColor],
      ],
    ],
  ],
}
function Ju(t) {
  let e, n, o, i, r, a, s, l, c, u, d
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('input')),
        (o = Jo()),
        (i = qo('div')),
        (r = Jo()),
        (a = qo('div')),
        (s = qo('div')),
        ii(n, 'type', 'range'),
        ii(n, 'id', t[4]),
        ii(n, 'min', t[1]),
        ii(n, 'max', t[2]),
        ii(n, 'step', t[3]),
        (n.value = t[0]),
        ii(i, 'class', 'PinturaSliderTrack'),
        ii(i, 'style', t[5]),
        ii(s, 'class', 'PinturaSliderKnob'),
        ii(s, 'style', t[6]),
        ii(a, 'class', 'PinturaSliderKnobController'),
        ii(a, 'style', (l = `transform: translateX(${t[9]}%)`)),
        ii(e, 'class', (c = bs(['PinturaSlider', t[7]])))
    },
    m(l, c) {
      Go(l, e, c),
        Yo(e, n),
        t[15](n),
        Yo(e, o),
        Yo(e, i),
        Yo(e, r),
        Yo(e, a),
        Yo(a, s),
        u ||
          ((d = [
            ei(n, 'pointerdown', t[12]),
            ei(n, 'input', t[10]),
            ei(n, 'nudge', t[11]),
            Wo(ol.call(null, n)),
          ]),
          (u = !0))
    },
    p(t, [o]) {
      16 & o && ii(n, 'id', t[4]),
        2 & o && ii(n, 'min', t[1]),
        4 & o && ii(n, 'max', t[2]),
        8 & o && ii(n, 'step', t[3]),
        1 & o && (n.value = t[0]),
        32 & o && ii(i, 'style', t[5]),
        64 & o && ii(s, 'style', t[6]),
        512 & o && l !== (l = `transform: translateX(${t[9]}%)`) && ii(a, 'style', l),
        128 & o && c !== (c = bs(['PinturaSlider', t[7]])) && ii(e, 'class', c)
    },
    i: ko,
    o: ko,
    d(n) {
      n && Zo(e), t[15](null), (u = !1), Po(d)
    },
  }
}
function td(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    { min: c = 0 } = e,
    { max: u = 100 } = e,
    { step: d = 1 } = e,
    { id: p } = e,
    { value: h = 0 } = e,
    { trackStyle: g } = e,
    { knobStyle: m } = e,
    { onchange: f } = e,
    { class: $ } = e
  const y = (t, e) => {
      n(0, (h = Mr(c + (t / e) * o, c, u))), f(h)
    },
    x = (t) => {
      const e = t.pageX - l
      y(s + e, a)
    },
    b = (t) => {
      ;(a = void 0),
        document.documentElement.removeEventListener('pointermove', x),
        document.documentElement.removeEventListener('pointerup', b),
        f(h)
    }
  return (
    (t.$$set = (t) => {
      'min' in t && n(1, (c = t.min)),
        'max' in t && n(2, (u = t.max)),
        'step' in t && n(3, (d = t.step)),
        'id' in t && n(4, (p = t.id)),
        'value' in t && n(0, (h = t.value)),
        'trackStyle' in t && n(5, (g = t.trackStyle)),
        'knobStyle' in t && n(6, (m = t.knobStyle)),
        'onchange' in t && n(13, (f = t.onchange)),
        'class' in t && n(7, ($ = t.class))
    }),
    (t.$$.update = () => {
      6 & t.$$.dirty && n(14, (o = u - c)), 16385 & t.$$.dirty && n(9, (i = (h / o) * 100))
    }),
    [
      h,
      c,
      u,
      d,
      p,
      g,
      m,
      $,
      r,
      i,
      (t) => {
        a || (n(0, (h = parseFloat(t.target.value))), f(h))
      },
      (t) => {
        const e = r.offsetWidth
        y((h / o) * e + t.detail.x, e)
      },
      (t) => {
        t.stopPropagation(),
          (a = r.offsetWidth),
          (s = t.offsetX),
          (l = t.pageX),
          y(s, a),
          document.documentElement.addEventListener('pointermove', x),
          document.documentElement.addEventListener('pointerup', b)
      },
      f,
      o,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(r = t), n(8, r)
        })
      },
    ]
  )
}
class ed extends or {
  constructor(t) {
    super(),
      nr(this, t, td, Ju, Ao, {
        min: 1,
        max: 2,
        step: 3,
        id: 4,
        value: 0,
        trackStyle: 5,
        knobStyle: 6,
        onchange: 13,
        class: 7,
      })
  }
}
var nd = (t, e, n) => {
  let o, i, r
  const a = Math.floor(6 * t),
    s = 6 * t - a,
    l = n * (1 - e),
    c = n * (1 - s * e),
    u = n * (1 - (1 - s) * e)
  switch (a % 6) {
    case 0:
      ;(o = n), (i = u), (r = l)
      break
    case 1:
      ;(o = c), (i = n), (r = l)
      break
    case 2:
      ;(o = l), (i = n), (r = u)
      break
    case 3:
      ;(o = l), (i = c), (r = n)
      break
    case 4:
      ;(o = u), (i = l), (r = n)
      break
    case 5:
      ;(o = n), (i = l), (r = c)
  }
  return [o, i, r]
}
function od(t) {
  let e, n, o
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('span')),
        ii(e, 'class', 'PinturaColorPreview'),
        ii(e, 'title', t[0]),
        ii(e, 'style', (o = '--color:' + t[1]))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, [n]) {
      1 & n && ii(e, 'title', t[0]), 2 & n && o !== (o = '--color:' + t[1]) && ii(e, 'style', o)
    },
    i: ko,
    o: ko,
    d(t) {
      t && Zo(e)
    },
  }
}
function id(t, e, n) {
  let o,
    { color: i } = e,
    { title: r } = e
  return (
    (t.$$set = (t) => {
      'color' in t && n(2, (i = t.color)), 'title' in t && n(0, (r = t.title))
    }),
    (t.$$.update = () => {
      4 & t.$$.dirty && n(1, (o = i ? Qe(i) : 'transparent'))
    }),
    [r, o, i]
  )
}
class rd extends or {
  constructor(t) {
    super(), nr(this, t, id, od, Ao, { color: 2, title: 0 })
  }
}
function ad(t) {
  let e, n
  return {
    c() {
      ;(e = qo('span')), (n = Qo(t[0]))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      1 & e[0] && ai(n, t[0])
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function sd(t) {
  let e, n, o, i
  n = new rd({ props: { color: t[4], title: Ol(t[8], t[10]) } })
  let r = !t[9] && ad(t)
  return {
    c() {
      ;(e = qo('span')),
        Qi(n.$$.fragment),
        (o = Jo()),
        r && r.c(),
        ii(e, 'slot', 'label'),
        ii(e, 'class', 'PinturaButtonLabel')
    },
    m(t, a) {
      Go(t, e, a), Ji(n, e, null), Yo(e, o), r && r.m(e, null), (i = !0)
    },
    p(t, o) {
      const i = {}
      16 & o[0] && (i.color = t[4]),
        1280 & o[0] && (i.title = Ol(t[8], t[10])),
        n.$set(i),
        t[9] ? r && (r.d(1), (r = null)) : r ? r.p(t, o) : ((r = ad(t)), r.c(), r.m(e, null))
    },
    i(t) {
      i || (Vi(n.$$.fragment, t), (i = !0))
    },
    o(t) {
      Ni(n.$$.fragment, t), (i = !1)
    },
    d(t) {
      t && Zo(e), tr(n), r && r.d()
    },
  }
}
function ld(t) {
  let e, n, o, i, r, a, s, l, c, u, d, p, h
  c = new ed({
    props: {
      class: 'PinturaHuePicker',
      knobStyle: 'background-color:' + t[19],
      onchange: t[24],
      value: t[14],
      min: 0,
      max: 1,
      step: 0.001,
    },
  })
  let g = t[11] && cd(t)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        (o = qo('div')),
        (i = qo('div')),
        (l = Jo()),
        Qi(c.$$.fragment),
        (u = Jo()),
        g && g.c(),
        ii(i, 'role', 'button'),
        ii(i, 'aria-label', 'Saturation slider'),
        ii(i, 'class', 'PinturaPickerKnob'),
        ii(i, 'tabindex', '0'),
        ii(i, 'style', (r = `background-color:${t[18]};`)),
        ii(o, 'class', 'PinturaPickerKnobController'),
        ii(o, 'style', (a = `transform:translate(${t[21]}%,${t[22]}%)`)),
        ii(n, 'class', 'PinturaSaturationPicker'),
        ii(n, 'style', (s = 'background-color: ' + t[19])),
        ii(e, 'class', 'PinturaPicker')
    },
    m(r, a) {
      Go(r, e, a),
        Yo(e, n),
        Yo(n, o),
        Yo(o, i),
        t[31](n),
        Yo(e, l),
        Ji(c, e, null),
        Yo(e, u),
        g && g.m(e, null),
        (d = !0),
        p ||
          ((h = [ei(i, 'nudge', t[27]), Wo(ol.call(null, i)), ei(n, 'pointerdown', t[26])]),
          (p = !0))
    },
    p(t, l) {
      ;(!d || (262144 & l[0] && r !== (r = `background-color:${t[18]};`))) && ii(i, 'style', r),
        (!d || (6291456 & l[0] && a !== (a = `transform:translate(${t[21]}%,${t[22]}%)`))) &&
          ii(o, 'style', a),
        (!d || (524288 & l[0] && s !== (s = 'background-color: ' + t[19]))) && ii(n, 'style', s)
      const u = {}
      524288 & l[0] && (u.knobStyle = 'background-color:' + t[19]),
        16384 & l[0] && (u.value = t[14]),
        c.$set(u),
        t[11]
          ? g
            ? (g.p(t, l), 2048 & l[0] && Vi(g, 1))
            : ((g = cd(t)), g.c(), Vi(g, 1), g.m(e, null))
          : g &&
            (_i(),
            Ni(g, 1, 1, () => {
              g = null
            }),
            Wi())
    },
    i(t) {
      d || (Vi(c.$$.fragment, t), Vi(g), (d = !0))
    },
    o(t) {
      Ni(c.$$.fragment, t), Ni(g), (d = !1)
    },
    d(n) {
      n && Zo(e), t[31](null), tr(c), g && g.d(), (p = !1), Po(h)
    },
  }
}
function cd(t) {
  let e, n
  return (
    (e = new ed({
      props: {
        class: 'PinturaOpacityPicker',
        knobStyle: 'background-color: ' + t[16],
        trackStyle: `background-image: linear-gradient(to right, ${t[17]}, ${t[18]})`,
        onchange: t[25],
        value: t[15],
        min: 0,
        max: 1,
        step: 0.001,
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        65536 & n[0] && (o.knobStyle = 'background-color: ' + t[16]),
          393216 & n[0] &&
            (o.trackStyle = `background-image: linear-gradient(to right, ${t[17]}, ${t[18]})`),
          32768 & n[0] && (o.value = t[15]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function ud(t) {
  let e, n
  return (
    (e = new dc({
      props: {
        label: 'Presets',
        class: bs([
          'PinturaColorPresets',
          t[9] ? 'PinturaColorPresetsGrid' : 'PinturaColorPresetsList',
        ]),
        hideLabel: !1,
        name: t[1],
        value: t[4],
        optionGroupClass: 'PinturaDropdownOptionGroup',
        optionClass: 'PinturaDropdownOption',
        options: t[2].map(t[32]),
        selectedIndex: t[3],
        optionMapper: t[7],
        optionLabelClass: t[6],
        onchange: t[33],
        $$slots: {
          option: [hd, ({ option: t }) => ({ 44: t }), ({ option: t }) => [0, t ? 8192 : 0]],
          group: [dd, ({ option: t }) => ({ 44: t }), ({ option: t }) => [0, t ? 8192 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        512 & n[0] &&
          (o.class = bs([
            'PinturaColorPresets',
            t[9] ? 'PinturaColorPresetsGrid' : 'PinturaColorPresetsList',
          ])),
          2 & n[0] && (o.name = t[1]),
          16 & n[0] && (o.value = t[4]),
          1028 & n[0] && (o.options = t[2].map(t[32])),
          8 & n[0] && (o.selectedIndex = t[3]),
          128 & n[0] && (o.optionMapper = t[7]),
          64 & n[0] && (o.optionLabelClass = t[6]),
          (512 & n[0]) | (24576 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function dd(t) {
  let e,
    n,
    o = t[44].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o)), ii(e, 'slot', 'group')
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      8192 & e[1] && o !== (o = t[44].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function pd(t) {
  let e,
    n,
    o = t[44].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o)), ii(e, 'class', 'PinturaButtonLabel')
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      8192 & e[1] && o !== (o = t[44].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function hd(t) {
  let e, n, o, i
  n = new rd({ props: { title: t[44].label, color: t[44].value } })
  let r = !t[9] && pd(t)
  return {
    c() {
      ;(e = qo('span')), Qi(n.$$.fragment), (o = Jo()), r && r.c(), ii(e, 'slot', 'option')
    },
    m(t, a) {
      Go(t, e, a), Ji(n, e, null), Yo(e, o), r && r.m(e, null), (i = !0)
    },
    p(t, o) {
      const i = {}
      8192 & o[1] && (i.title = t[44].label),
        8192 & o[1] && (i.color = t[44].value),
        n.$set(i),
        t[9] ? r && (r.d(1), (r = null)) : r ? r.p(t, o) : ((r = pd(t)), r.c(), r.m(e, null))
    },
    i(t) {
      i || (Vi(n.$$.fragment, t), (i = !0))
    },
    o(t) {
      Ni(n.$$.fragment, t), (i = !1)
    },
    d(t) {
      t && Zo(e), tr(n), r && r.d()
    },
  }
}
function gd(t) {
  let e,
    n,
    o,
    i = t[13] && ld(t),
    r = t[12] && ud(t)
  return {
    c() {
      ;(e = qo('div')),
        i && i.c(),
        (n = Jo()),
        r && r.c(),
        ii(e, 'slot', 'details'),
        ii(e, 'class', 'PinturaColorPickerPanel')
    },
    m(t, a) {
      Go(t, e, a), i && i.m(e, null), Yo(e, n), r && r.m(e, null), (o = !0)
    },
    p(t, o) {
      t[13]
        ? i
          ? (i.p(t, o), 8192 & o[0] && Vi(i, 1))
          : ((i = ld(t)), i.c(), Vi(i, 1), i.m(e, n))
        : i &&
          (_i(),
          Ni(i, 1, 1, () => {
            i = null
          }),
          Wi()),
        t[12]
          ? r
            ? (r.p(t, o), 4096 & o[0] && Vi(r, 1))
            : ((r = ud(t)), r.c(), Vi(r, 1), r.m(e, null))
          : r &&
            (_i(),
            Ni(r, 1, 1, () => {
              r = null
            }),
            Wi())
    },
    i(t) {
      o || (Vi(i), Vi(r), (o = !0))
    },
    o(t) {
      Ni(i), Ni(r), (o = !1)
    },
    d(t) {
      t && Zo(e), i && i.d(), r && r.d()
    },
  }
}
function md(t) {
  let e, n
  return (
    (e = new Il({
      props: {
        buttonClass: bs(['PinturaColorPickerButton', t[5]]),
        $$slots: { details: [gd], label: [sd] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        32 & n[0] && (o.buttonClass = bs(['PinturaColorPickerButton', t[5]])),
          (8388575 & n[0]) | (16384 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function fd(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    { label: g } = e,
    { name: m } = e,
    { options: f = [] } = e,
    { selectedIndex: $ = -1 } = e,
    { value: y } = e,
    { buttonClass: x } = e,
    { optionLabelClass: b } = e,
    { optionMapper: v } = e,
    { onchange: w } = e,
    { title: S } = e,
    { hidePresetLabel: k = !0 } = e,
    { locale: C } = e,
    { enableOpacity: M = !0 } = e,
    { enablePresets: R = !0 } = e,
    { enablePicker: T = !0 } = e
  const P = (t, e) => {
    if (((c = [t[0], t[1], t[2]]), e)) {
      let e = ((t, e, n) => {
        let o = Math.max(t, e, n),
          i = o - Math.min(t, e, n),
          r = i && (o == t ? (e - n) / i : o == e ? 2 + (n - t) / i : 4 + (t - e) / i)
        return [(60 * (r < 0 ? r + 6 : r)) / 360, o && i / o, o]
      })(...c)
      n(14, (r = e[0])), n(29, (a = e[1])), n(30, (s = e[2])), n(15, (l = We(t[3]) ? t[3] : 1))
    }
    n(16, (u = Qe(t))),
      n(17, (d = Qe([...c, 0]))),
      n(18, (p = Qe([...c, 1]))),
      n(19, (h = Qe(nd(r, 1, 1))))
  }
  y && P(y, !0)
  const E = () => {
      const t = [...nd(r, a, s), l]
      P(t), w(t)
    },
    A = (t) => {
      const e = 3 === t.length ? [...t, 1] : t
      P(e, !0), w(e)
    },
    I = (t, e) => {
      const o = Mr(t.x / e.width, 0, 1),
        i = Mr(t.y / e.height, 0, 1)
      var r
      ;(r = 1 - i), n(29, (a = o)), n(30, (s = r)), 0 === l && n(15, (l = 1)), E()
    }
  let L, F, B, z
  const D = (t) => {
      const e = nt(Y(t), z)
      I(et(G(B), e), F)
    },
    O = (t) => {
      ;(F = void 0),
        document.documentElement.removeEventListener('pointermove', D),
        document.documentElement.removeEventListener('pointerup', O)
    }
  return (
    (t.$$set = (t) => {
      'label' in t && n(0, (g = t.label)),
        'name' in t && n(1, (m = t.name)),
        'options' in t && n(2, (f = t.options)),
        'selectedIndex' in t && n(3, ($ = t.selectedIndex)),
        'value' in t && n(4, (y = t.value)),
        'buttonClass' in t && n(5, (x = t.buttonClass)),
        'optionLabelClass' in t && n(6, (b = t.optionLabelClass)),
        'optionMapper' in t && n(7, (v = t.optionMapper)),
        'onchange' in t && n(28, (w = t.onchange)),
        'title' in t && n(8, (S = t.title)),
        'hidePresetLabel' in t && n(9, (k = t.hidePresetLabel)),
        'locale' in t && n(10, (C = t.locale)),
        'enableOpacity' in t && n(11, (M = t.enableOpacity)),
        'enablePresets' in t && n(12, (R = t.enablePresets)),
        'enablePicker' in t && n(13, (T = t.enablePicker))
    }),
    (t.$$.update = () => {
      536870912 & t.$$.dirty[0] && n(21, (o = 100 * a)),
        1073741824 & t.$$.dirty[0] && n(22, (i = 100 - 100 * s))
    }),
    [
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      S,
      k,
      C,
      M,
      R,
      T,
      r,
      l,
      u,
      d,
      p,
      h,
      L,
      o,
      i,
      A,
      (t) => {
        n(14, (r = t)), 0 === l && n(15, (l = 1)), E()
      },
      (t) => {
        n(15, (l = t)), E()
      },
      (t) => {
        t.stopPropagation(),
          (F = mt(L.offsetWidth, L.offsetHeight)),
          (B = ((t) => j(t.offsetX, t.offsetY))(t)),
          (z = Y(t)),
          I(B, F),
          document.documentElement.addEventListener('pointermove', D),
          document.documentElement.addEventListener('pointerup', O)
      },
      (t) => {
        F = mt(L.offsetWidth, L.offsetHeight)
        const e = (o / 100) * F.width,
          n = (i / 100) * F.height
        I({ x: e + t.detail.x, y: n + t.detail.y }, F)
      },
      w,
      a,
      s,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(L = t), n(20, L)
        })
      },
      ([t, e]) => [t, Ue(e) ? e(C) : e],
      (t) => A(t.value),
    ]
  )
}
class $d extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        fd,
        md,
        Ao,
        {
          label: 0,
          name: 1,
          options: 2,
          selectedIndex: 3,
          value: 4,
          buttonClass: 5,
          optionLabelClass: 6,
          optionMapper: 7,
          onchange: 28,
          title: 8,
          hidePresetLabel: 9,
          locale: 10,
          enableOpacity: 11,
          enablePresets: 12,
          enablePicker: 13,
        },
        [-1, -1]
      )
  }
}
var yd = (t) => t.charAt(0).toUpperCase() + t.slice(1)
let xd = null
var bd = () => {
  if (null === xd)
    if (c())
      try {
        xd = !1 === document.fonts.check('16px TestNonExistingFont')
      } catch (t) {
        xd = !1
      }
    else xd = !1
  return xd
}
const vd = (t, e) => (n) => n[e ? `${e}${yd(t)}` : t],
  wd = (t) => [t, '' + t],
  Sd = (t, e) => (n) => [t[n], vd(n, e)],
  kd = [1, 0.2549, 0.2118],
  Cd = [1, 1, 1, 0],
  Md = {
    path: () => ({ points: [], disableErase: !1 }),
    eraser: () => ({ eraseRadius: 0 }),
    line: () => ({ x1: 0, y1: 0, x2: 0, y2: 0, disableErase: !1 }),
    rectangle: () => ({ x: 0, y: 0, width: 0, height: 0 }),
    ellipse: () => ({ x: 0, y: 0, rx: 0, ry: 0 }),
    text: () => ({ x: 0, y: 0, text: 'Text' }),
  },
  Rd = (t, e = {}, n = { position: 'relative' }) => {
    if (!Md[t]) return
    return [{ ...Md[t](), ...e }, n]
  },
  Td = (t) => ({
    sharpie: Rd('path', { strokeWidth: '0.5%', strokeColor: [...kd] }),
    eraser: Rd('eraser'),
    line: Rd('line', { strokeColor: [...kd], strokeWidth: '0.5%' }),
    arrow: Rd('line', {
      lineStart: 'none',
      lineEnd: 'arrow-solid',
      strokeColor: [...kd],
      strokeWidth: '0.5%',
    }),
    rectangle: Rd('rectangle', { strokeColor: [...Cd], backgroundColor: [...kd] }),
    ellipse: Rd('ellipse', { strokeColor: [...Cd], backgroundColor: [...kd] }),
    text: Rd('text', { color: [...kd], fontSize: '2%' }),
    ...t,
  }),
  Pd = (t, e, n) => [t, e || vd(t, 'shapeLabelTool'), { icon: vd(t, 'shapeIconTool'), ...n }],
  Ed = (t = ['sharpie', 'eraser', 'line', 'arrow', 'rectangle', 'ellipse', 'text', 'preset']) =>
    t
      .map((t) =>
        w(t)
          ? Pd(t)
          : Array.isArray(t)
          ? x(t[1])
            ? Pd(t[0], void 0, t[1])
            : Pd(t[0], t[1], t[2])
          : void 0
      )
      .filter(Boolean),
  Ad = () => ({
    transparent: [1, 1, 1, 0],
    white: [1, 1, 1],
    silver: [0.8667, 0.8667, 0.8667],
    gray: [0.6667, 0.6667, 0.6667],
    black: [0, 0, 0],
    navy: [0, 0.1216, 0.2471],
    blue: [0, 0.4549, 0.851],
    aqua: [0.498, 0.8588, 1],
    teal: [0.2235, 0.8, 0.8],
    olive: [0.2392, 0.6, 0.4392],
    green: [0.1804, 0.8, 0.251],
    yellow: [1, 0.8627, 0],
    orange: [1, 0.5216, 0.1059],
    red: [1, 0.2549, 0.2118],
    maroon: [0.5216, 0.0784, 0.2941],
    fuchsia: [0.9412, 0.0706, 0.7451],
    purple: [0.6941, 0.051, 0.7882],
  }),
  Id = () => [16, 18, 20, 24, 30, 36, 48, 64, 72, 96, 144],
  Ld = () => ({
    extraSmall: '2%',
    small: '4%',
    mediumSmall: '8%',
    medium: '10%',
    mediumLarge: '15%',
    large: '20%',
    extraLarge: '25%',
  }),
  Fd = () => [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 48],
  Bd = () => ({
    extraSmall: '0.25%',
    small: '0.5%',
    mediumSmall: '1%',
    medium: '1.75%',
    mediumLarge: '2.5%',
    large: '3.5%',
    extraLarge: '5%',
  }),
  zd = () => ['bar', 'arrow', 'arrowSolid', 'circle', 'circleSolid', 'square', 'squareSolid'],
  Dd = () => [
    ["Helvetica, Arial, Verdana, 'Droid Sans', sans-serif", 'Sans Serif'],
    ["'Arial Black', 'Avenir-Black', 'Arial Bold'", 'Black'],
    ["'Arial Narrow', 'Futura-CondensedMedium'", 'Narrow'],
    ["'Trebuchet MS'", 'Humanist'],
    ["Georgia, 'Avenir-Black', 'Times New Roman', 'Droid Serif', serif", 'Serif'],
    ['Palatino', 'Old-Style'],
    ["'Times New Roman', 'TimesNewRomanPSMT'", 'Transitional'],
    ["Menlo, Monaco, 'Lucida Console', monospace", 'Monospaced'],
    ["'Courier New', monospace", 'Slab Serif'],
  ],
  Od = () => ['left', 'center', 'right'],
  _d = () => [
    ['normal', 'bold'],
    ['italic', 'normal'],
    ['italic', 'bold'],
  ],
  Wd = (t) => Object.keys(t).map(Sd(t, 'shapeTitleColor')),
  Vd = (t) => t.map(wd),
  Nd = (t) => Object.keys(t).map(Sd(t, 'labelSize')),
  Ud = (t) => t.map(wd),
  Hd = (t) => Object.keys(t).map(Sd(t, 'labelSize')),
  Xd = (t) => [...t],
  jd = (t) =>
    t.map((t) => [
      t,
      (e) =>
        e[
          'shapeLabelFontStyle' +
            t
              .filter((t) => 'normal' !== t)
              .map(yd)
              .join('')
        ],
    ]),
  Yd = (t) =>
    t.map((t) => [
      Ac(t),
      (e) => e['shapeTitleLineDecoration' + yd(t)],
      { icon: (e) => e['shapeIconLineDecoration' + yd(t)] },
    ]),
  Gd = (t) =>
    t.map((t) => [
      t,
      (e) => e['shapeTitleTextAlign' + yd(t)],
      { hideLabel: !0, icon: (e) => e['shapeIconTextAlign' + yd(t)] },
    ]),
  Zd = (t, e) => {
    const { defaultKey: n, defaultOptions: o } = e || {}
    let i = []
    return n && (i[0] = [void 0, (t) => t[n], { ...o }]), [...i, ...t]
  },
  qd = (t) =>
    t
      .split(',')
      .map((t) => t.trim())
      .some((t) => document.fonts.check('16px ' + t)),
  Kd = (t) => [
    wc,
    {
      title: (t) => t.shapeTitleFontFamily,
      onload: ({ options: t = [] }) => {
        bd() &&
          t
            .map(([t]) => t)
            .filter(Boolean)
            .filter((t) => !qd(t))
            .forEach((t) => {
              const e = 'PinturaFontTest-' + t.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
              document.getElementById(e) ||
                document.body.appendChild(
                  h('span', {
                    textContent: ' ',
                    id: e,
                    style: `font-family:${t};font-size:0;color:transparent;`,
                  })
                )
            })
      },
      ondestroy: () => {
        if (!bd()) return
        document.querySelectorAll('.PinturaFontTest').forEach((t) => t.remove())
      },
      optionLabelStyle: (t) => 'font-family: ' + t,
      options: Zd(t, { defaultKey: 'labelDefault' }),
      optionFilter: (t) => {
        if (!bd()) return !0
        const [e] = t
        if (!e) return !0
        return qd(e)
      },
    },
  ],
  Qd = (t) => [$d, { title: (t) => t.shapeTitleBackgroundColor, options: Zd(t) }],
  Jd = (t, e = {}) => [
    $d,
    {
      title: (t) => t.shapeTitleStrokeColor,
      options: Zd(t),
      buttonClass: 'PinturaColorPickerButtonStroke',
      onchange: (t, n) => {
        let o = n.strokeWidth
        ;(We(o) || w(o) ? parseFloat(o) : 0) > 0 ||
          (n.strokeWidth = (e && e.defaultStrokeWidth) || '0.5%')
      },
    },
  ],
  tp = (t) => [
    wc,
    {
      title: (t) => t.shapeTitleStrokeWidth,
      options: (e) =>
        Ne(e, 'backgroundColor') ? Zd(t, { defaultKey: 'shapeLabelStrokeNone' }) : Zd(t),
    },
  ],
  ep = (t, e, n) => [
    wc,
    {
      title: (t) => t[e],
      options: Zd(t, {
        defaultKey: 'labelNone',
        defaultOptions: {
          icon: '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H14"/></g>',
        },
      }),
      optionIconStyle: n,
    },
  ],
  np = (t) => ep(t, 'shapeTitleLineStart', 'transform: scaleX(-1)'),
  op = (t) => ep(t, 'shapeTitleLineEnd'),
  ip = (t) => [$d, { title: (t) => t.shapeTitleTextColor, options: Zd(t) }],
  rp = (t) => [
    wc,
    {
      title: (t) => t.shapeTitleFontStyle,
      optionLabelStyle: (t) => t && `font-style:${t[0]};font-weight:${t[1]}`,
      options: Zd(t, { defaultKey: 'shapeLabelFontStyleNormal' }),
    },
  ],
  ap = (t) => [
    wc,
    { title: (t) => t.shapeTitleFontSize, options: Zd(t, { defaultKey: 'labelDefault' }) },
  ],
  sp = (t) => [dc, { title: (t) => t.shapeTitleTextAlign, options: Zd(t) }],
  lp = (t) => [
    wc,
    { title: (t) => t.shapeTitleLineHeight, options: Zd(t, { defaultKey: 'labelAuto' }) },
  ],
  cp = (t = {}) => {
    const {
      colorOptions: e = Wd(Ad()),
      strokeWidthOptions: n = Hd(Bd()),
      lineEndStyleOptions: o = Yd(zd()),
      fontFamilyOptions: i = Xd(Dd()),
      fontStyleOptions: r = jd(_d()),
      fontSizeOptions: a = Nd(Ld()),
      textAlignOptions: s = Gd(Od()),
    } = t
    return {
      backgroundColor: e && Qd(e),
      strokeColor: e && Jd(e),
      strokeWidth: n && tp(n),
      lineStart: o && np(o),
      lineEnd: o && op(o),
      color: e && ip(e),
      fontFamily: i && Kd(i),
      fontStyle_fontWeight: r && rp(r),
      fontSize: a && ap(a),
      textAlign: s && sp(s),
    }
  }
function up(t) {
  let e, n, o, i
  const r = t[3].default,
    a = Bo(r, t, t[2], null)
  return {
    c() {
      ;(e = qo('div')), a && a.c(), ii(e, 'class', t[0])
    },
    m(r, s) {
      Go(r, e, s),
        a && a.m(e, null),
        (n = !0),
        o || ((i = [ei(e, 'measure', t[1]), Wo(Ua.call(null, e))]), (o = !0))
    },
    p(t, [o]) {
      a && a.p && 4 & o && Do(a, r, t, t[2], o, null, null), (!n || 1 & o) && ii(e, 'class', t[0])
    },
    i(t) {
      n || (Vi(a, t), (n = !0))
    },
    o(t) {
      Ni(a, t), (n = !1)
    },
    d(t) {
      t && Zo(e), a && a.d(t), (o = !1), Po(i)
    },
  }
}
function dp(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e
  const r = xi()
  let { class: a = null } = e
  return (
    (t.$$set = (t) => {
      'class' in t && n(0, (a = t.class)), '$$scope' in t && n(2, (i = t.$$scope))
    }),
    [a, ({ detail: t }) => r('measure', t), i, o]
  )
}
class pp extends or {
  constructor(t) {
    super(), nr(this, t, dp, up, Ao, { class: 0 })
  }
}
const hp = (t) => ({}),
  gp = (t) => ({}),
  mp = (t) => ({}),
  fp = (t) => ({}),
  $p = (t) => ({}),
  yp = (t) => ({})
function xp(t) {
  let e, n
  const o = t[4].header,
    i = Bo(o, t, t[3], yp)
  return {
    c() {
      ;(e = qo('div')), i && i.c(), ii(e, 'class', 'PinturaUtilHeader')
    },
    m(t, o) {
      Go(t, e, o), i && i.m(e, null), (n = !0)
    },
    p(t, e) {
      i && i.p && 8 & e && Do(i, o, t, t[3], e, $p, yp)
    },
    i(t) {
      n || (Vi(i, t), (n = !0))
    },
    o(t) {
      Ni(i, t), (n = !1)
    },
    d(t) {
      t && Zo(e), i && i.d(t)
    },
  }
}
function bp(t) {
  let e, n
  const o = t[4].footer,
    i = Bo(o, t, t[3], gp)
  return {
    c() {
      ;(e = qo('div')), i && i.c(), ii(e, 'class', 'PinturaUtilFooter')
    },
    m(t, o) {
      Go(t, e, o), i && i.m(e, null), (n = !0)
    },
    p(t, e) {
      i && i.p && 8 & e && Do(i, o, t, t[3], e, hp, gp)
    },
    i(t) {
      n || (Vi(i, t), (n = !0))
    },
    o(t) {
      Ni(i, t), (n = !1)
    },
    d(t) {
      t && Zo(e), i && i.d(t)
    },
  }
}
function vp(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s = t[1] && xp(t)
  const l = t[4].main,
    c = Bo(l, t, t[3], fp),
    u =
      c ||
      (function (t) {
        let e, n
        return (
          (e = new pp({ props: { class: 'PinturaStage' } })),
          e.$on('measure', t[5]),
          {
            c() {
              Qi(e.$$.fragment)
            },
            m(t, o) {
              Ji(e, t, o), (n = !0)
            },
            p: ko,
            i(t) {
              n || (Vi(e.$$.fragment, t), (n = !0))
            },
            o(t) {
              Ni(e.$$.fragment, t), (n = !1)
            },
            d(t) {
              tr(e, t)
            },
          }
        )
      })(t)
  let d = t[2] && bp(t)
  return {
    c() {
      s && s.c(),
        (e = Jo()),
        (n = qo('div')),
        u && u.c(),
        (o = Jo()),
        d && d.c(),
        (i = Jo()),
        (r = ti()),
        ii(n, 'class', 'PinturaUtilMain')
    },
    m(l, c) {
      s && s.m(l, c),
        Go(l, e, c),
        Go(l, n, c),
        u && u.m(n, null),
        t[6](n),
        Go(l, o, c),
        d && d.m(l, c),
        Go(l, i, c),
        Go(l, r, c),
        (a = !0)
    },
    p(t, [n]) {
      t[1]
        ? s
          ? (s.p(t, n), 2 & n && Vi(s, 1))
          : ((s = xp(t)), s.c(), Vi(s, 1), s.m(e.parentNode, e))
        : s &&
          (_i(),
          Ni(s, 1, 1, () => {
            s = null
          }),
          Wi()),
        c && c.p && 8 & n && Do(c, l, t, t[3], n, mp, fp),
        t[2]
          ? d
            ? (d.p(t, n), 4 & n && Vi(d, 1))
            : ((d = bp(t)), d.c(), Vi(d, 1), d.m(i.parentNode, i))
          : d &&
            (_i(),
            Ni(d, 1, 1, () => {
              d = null
            }),
            Wi())
    },
    i(t) {
      a || (Vi(s), Vi(u, t), Vi(d), Vi(false), (a = !0))
    },
    o(t) {
      Ni(s), Ni(u, t), Ni(d), Ni(false), (a = !1)
    },
    d(a) {
      s && s.d(a),
        a && Zo(e),
        a && Zo(n),
        u && u.d(a),
        t[6](null),
        a && Zo(o),
        d && d.d(a),
        a && Zo(i),
        a && Zo(r)
    },
  }
}
function wp(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e,
    { hasHeader: r = !!e.$$slots.header } = e,
    { hasFooter: a = !!e.$$slots.footer } = e,
    { root: s } = e
  return (
    (t.$$set = (t) => {
      n(7, (e = Mo(Mo({}, e), Oo(t)))),
        'hasHeader' in t && n(1, (r = t.hasHeader)),
        'hasFooter' in t && n(2, (a = t.hasFooter)),
        'root' in t && n(0, (s = t.root)),
        '$$scope' in t && n(3, (i = t.$$scope))
    }),
    (e = Oo(e)),
    [
      s,
      r,
      a,
      i,
      o,
      function (e) {
        wi(t, e)
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(s = t), n(0, s)
        })
      },
    ]
  )
}
class Sp extends or {
  constructor(t) {
    super(), nr(this, t, wp, vp, Ao, { hasHeader: 1, hasFooter: 2, root: 0 })
  }
}
var kp = (t, e, n) => (t - e) / (n - e)
function Cp(t) {
  let e, n
  return {
    c() {
      ;(e = qo('div')),
        ii(e, 'class', 'PinturaRangeInputMeter'),
        ii(
          e,
          'style',
          (n = `transform: translateX(${t[9].x - t[10].x}px) translateY(${t[9].y - t[10].y}px)`)
        )
    },
    m(n, o) {
      Go(n, e, o), (e.innerHTML = t[7])
    },
    p(t, o) {
      128 & o[0] && (e.innerHTML = t[7]),
        512 & o[0] &&
          n !==
            (n = `transform: translateX(${t[9].x - t[10].x}px) translateY(${
              t[9].y - t[10].y
            }px)`) &&
          ii(e, 'style', n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Mp(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = t[9] && Cp(t)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('span')),
        (o = Qo(t[4])),
        (i = Jo()),
        (r = qo('button')),
        (a = Qo(t[1])),
        (l = Jo()),
        (c = qo('div')),
        h && h.c(),
        ii(n, 'class', 'PinturaRangeInputValue'),
        ii(r, 'class', 'PinturaRangeInputReset'),
        ii(r, 'type', 'button'),
        (r.disabled = s = t[0] === t[3]),
        ii(c, 'class', 'PinturaRangeInputInner'),
        ii(c, 'style', t[8]),
        ii(c, 'data-value-limited', t[6]),
        ii(e, 'class', 'PinturaRangeInput'),
        ii(e, 'tabindex', '0')
    },
    m(s, g) {
      Go(s, e, g),
        Yo(e, n),
        Yo(n, o),
        Yo(e, i),
        Yo(e, r),
        Yo(r, a),
        Yo(e, l),
        Yo(e, c),
        h && h.m(c, null),
        d ||
          ((p = [
            ei(r, 'click', t[15]),
            ei(c, 'interactionstart', t[11]),
            ei(c, 'interactionupdate', t[13]),
            ei(c, 'interactionend', t[14]),
            ei(c, 'interactionrelease', t[12]),
            Wo(nl.call(null, c, { inertia: !0 })),
            ei(c, 'measure', t[32]),
            Wo(Ua.call(null, c)),
            ei(e, 'wheel', t[17], { passive: !1 }),
            ei(e, 'nudge', t[18]),
            Wo((u = ol.call(null, e, (t[2] = 'horizontal')))),
          ]),
          (d = !0))
    },
    p(t, e) {
      16 & e[0] && ai(o, t[4]),
        2 & e[0] && ai(a, t[1]),
        9 & e[0] && s !== (s = t[0] === t[3]) && (r.disabled = s),
        t[9] ? (h ? h.p(t, e) : ((h = Cp(t)), h.c(), h.m(c, null))) : h && (h.d(1), (h = null)),
        256 & e[0] && ii(c, 'style', t[8]),
        64 & e[0] && ii(c, 'data-value-limited', t[6]),
        u && Eo(u.update) && 4 & e[0] && u.update.call(null, (t[2] = 'horizontal'))
    },
    i: ko,
    o: ko,
    d(t) {
      t && Zo(e), h && h.d(), (d = !1), Po(p)
    },
  }
}
function Rp(t, e, n) {
  let o,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    { labelReset: p = 'Reset' } = e,
    { direction: h = 'x' } = e,
    { min: g = 0 } = e,
    { max: m = 1 } = e,
    { base: f = g } = e,
    { value: $ = 0 } = e,
    { valueLabel: y = 0 } = e,
    { valueMin: x } = e,
    { valueMax: b } = e,
    { oninputstart: v = i } = e,
    { oninputmove: w = i } = e,
    { oninputend: S = i } = e,
    { elasticity: k = 0 } = e
  const C = (t, e, n) => Math.ceil((t - n) / e) * e + n
  let M, R, T
  const P = { x: 2, y: 0 },
    E = (t, e, n) => `M ${t - n} ${e} a ${n} ${n} 0 1 0 0 -1`
  let A,
    I = void 0,
    L = !1,
    F = { snap: !1, elastic: !1 }
  const B = (t, e, n) => {
      const o = t[h] + e[h],
        i = Mr(o, A[1][h], A[0][h]),
        r = k ? i + il(o - i, k) : i,
        a = n.elastic ? r : i,
        s = j(0, 0)
      return (s[h] = a), z.set(s, { hard: n.snap }), Mr(O(s, h), g, m)
    },
    z = Ia()
  Fo(t, z, (t) => n(9, (d = t)))
  const D = (t, e) => {
      const n = 0.5 * (M[e] - s[e]) - (kp(t, g, m) * s[e] - 0.5 * s[e])
      return { x: 'x' === e ? n : 0, y: 'y' === e ? n : 0 }
    },
    O = (t, e) => {
      const n = -(t[e] - 0.5 * M[e]) / s[e]
      return g + n * o
    }
  z.subscribe((t) => {
    t && I && w(Mr(O(t, h), g, m))
  })
  const _ = (t) => {
    const e = [D(null != x ? x : g, h), D(null != b ? b : m, h)],
      n = { x: 'x' === h ? d.x + t : 0, y: 'y' === h ? d.y + t : 0 },
      o = Mr(n[h], e[1][h], e[0][h]),
      i = { ...d, [h]: o }
    _o(z, (d = i), d)
    const r = Mr(O(i, h), g, m)
    v(), w(r), S(r)
  }
  return (
    (t.$$set = (t) => {
      'labelReset' in t && n(1, (p = t.labelReset)),
        'direction' in t && n(2, (h = t.direction)),
        'min' in t && n(19, (g = t.min)),
        'max' in t && n(20, (m = t.max)),
        'base' in t && n(3, (f = t.base)),
        'value' in t && n(0, ($ = t.value)),
        'valueLabel' in t && n(4, (y = t.valueLabel)),
        'valueMin' in t && n(21, (x = t.valueMin)),
        'valueMax' in t && n(22, (b = t.valueMax)),
        'oninputstart' in t && n(23, (v = t.oninputstart)),
        'oninputmove' in t && n(24, (w = t.oninputmove)),
        'oninputend' in t && n(25, (S = t.oninputend)),
        'elasticity' in t && n(26, (k = t.elasticity))
    }),
    (t.$$.update = () => {
      if (
        (1572864 & t.$$.dirty[0] && n(28, (o = m - g)),
        2621440 & t.$$.dirty[0] && n(29, (r = null != x ? Math.max(x, g) : g)),
        5242880 & t.$$.dirty[0] && n(30, (a = null != b ? Math.min(b, m) : m)),
        1572872 & t.$$.dirty[0] && n(31, (l = kp(f, g, m))),
        (32 & t.$$.dirty[0]) | (1 & t.$$.dirty[1]) && M)
      ) {
        const t = 0.5 * M.y
        let e,
          o = 40 * l,
          i = '',
          r = M.y,
          a = ''
        for (let n = 0; n <= 40; n++) {
          const r = P.x + 10 * n,
            s = t
          ;(i += E(r, s, n % 5 == 0 ? 2 : 0.75) + ' '),
            (e = r + P.x),
            n === o && (a = `<path d="M${r} ${s - 4} l2 3 l-2 -1 l-2 1 z"/>`)
        }
        n(
          7,
          (R = `<svg width="${e}" height="${r}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${r}" aria-hidden="true" focusable="false">\n        ${a}\n        <rect rx="4" ry="4" y="${
            t - 4
          }"" height="8"/>\n        <path fill-rule="evenodd" d="${i.trim()}"/></svg>`)
        ),
          n(27, (T = { x: e - 2 * P.x, y: r }))
      }
      134217760 & t.$$.dirty[0] && (s = M && T),
        1612185600 & t.$$.dirty[0] && n(6, (c = r !== g || a !== m)),
        1610612800 & t.$$.dirty[0] &&
          n(
            8,
            (u = c
              ? (function (t, e) {
                  const n = 1 / 40,
                    o = kp(t, g, m),
                    i = kp(e, g, m)
                  return `--range-mask-from:${100 * xr(C(o, n, 0) - 0.0125)}%;--range-mask-to:${
                    100 * xr(C(i, n, 0) - 0.0125)
                  }%`
                })(r, a)
              : '')
          ),
        268435493 & t.$$.dirty[0] && o && M && M.x && M.y && z.set(D($, h))
    }),
    [
      $,
      p,
      h,
      f,
      y,
      M,
      c,
      R,
      u,
      d,
      P,
      () => {
        ;(L = !1), (I = Lo(z)), (A = [D(null != x ? x : g, h), D(null != b ? b : m, h)]), v()
      },
      () => {
        L = !0
      },
      ({ detail: t }) => {
        ;(F.snap = !L), (F.elastic = !L), B(I, t.translation, F)
      },
      ({ detail: t }) => {
        ;(F.snap = !1), (F.elastic = !1)
        const e = B(I, t.translation, F)
        if (((I = void 0), (A = void 0), Math.abs(e - f) < 0.01)) return S(f)
        S(e)
      },
      () => {
        n(0, ($ = Mr(f, r, a))), v(), S($)
      },
      z,
      (t) => {
        t.preventDefault(), t.stopPropagation()
        const e = 8 * sl(t)
        _(e)
      },
      ({ detail: t }) => {
        _(8 * t[h])
      },
      g,
      m,
      x,
      b,
      v,
      w,
      S,
      k,
      T,
      o,
      r,
      a,
      l,
      (t) => n(5, (M = ((t) => j(t.width, t.height))(t.detail))),
    ]
  )
}
class Tp extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        Rp,
        Mp,
        Ao,
        {
          labelReset: 1,
          direction: 2,
          min: 19,
          max: 20,
          base: 3,
          value: 0,
          valueLabel: 4,
          valueMin: 21,
          valueMax: 22,
          oninputstart: 23,
          oninputmove: 24,
          oninputend: 25,
          elasticity: 26,
        },
        [-1, -1]
      )
  }
}
function Pp(t) {
  let e, n, o, i, r
  const a = t[7].default,
    s = Bo(a, t, t[6], null)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        s && s.c(),
        ii(n, 'class', 'PinturaToolbarInner'),
        ii(e, 'class', 'PinturaToolbar'),
        ii(e, 'data-layout', t[1]),
        ii(e, 'data-overflow', t[0])
    },
    m(a, l) {
      Go(a, e, l),
        Yo(e, n),
        s && s.m(n, null),
        (o = !0),
        i ||
          ((r = [
            ei(n, 'measure', t[3]),
            Wo(Ua.call(null, n)),
            ei(e, 'measure', t[2]),
            Wo(Ua.call(null, e)),
          ]),
          (i = !0))
    },
    p(t, [n]) {
      s && s.p && 64 & n && Do(s, a, t, t[6], n, null, null),
        (!o || 2 & n) && ii(e, 'data-layout', t[1]),
        (!o || 1 & n) && ii(e, 'data-overflow', t[0])
    },
    i(t) {
      o || (Vi(s, t), (o = !0))
    },
    o(t) {
      Ni(s, t), (o = !1)
    },
    d(t) {
      t && Zo(e), s && s.d(t), (i = !1), Po(r)
    },
  }
}
function Ep(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    s = 0,
    l = 0,
    c = 0
  const u = () => {
    n(0, (i = 'compact' === o && s > c ? 'overflow' : void 0))
  }
  return (
    (t.$$set = (t) => {
      '$$scope' in t && n(6, (a = t.$$scope))
    }),
    (t.$$.update = () => {
      48 & t.$$.dirty && n(1, (o = l > c ? 'compact' : 'default'))
    }),
    [
      i,
      o,
      ({ detail: t }) => {
        const { width: e } = t
        n(5, (c = e)), u()
      },
      ({ detail: t }) => {
        const { width: e } = t
        e > l && n(4, (l = e)), (s = e), i || u()
      },
      l,
      c,
      a,
      r,
    ]
  )
}
class Ap extends or {
  constructor(t) {
    super(), nr(this, t, Ep, Pp, Ao, {})
  }
}
const Ip = {
    Top: 't',
    Right: 'r',
    Bottom: 'b',
    Left: 'l',
    TopLeft: 'tl',
    TopRight: 'tr',
    BottomRight: 'br',
    BottomLeft: 'bl',
  },
  {
    Top: Lp,
    Right: Fp,
    Bottom: Bp,
    Left: zp,
    TopLeft: Dp,
    TopRight: Op,
    BottomRight: _p,
    BottomLeft: Wp,
  } = Ip
var Vp = {
  [Lp]: (t) => ({ x: t.x, y: t.y }),
  [Op]: (t) => ({ x: t.x + t.width, y: t.y }),
  [Fp]: (t) => ({ x: t.x + t.width, y: t.y }),
  [_p]: (t) => ({ x: t.x + t.width, y: t.y + t.height }),
  [Bp]: (t) => ({ x: t.x, y: t.y + t.height }),
  [Wp]: (t) => ({ x: t.x, y: t.y + t.height }),
  [zp]: (t) => ({ x: t.x, y: t.y }),
  [Dp]: (t) => ({ x: t.x, y: t.y }),
}
function Np(t, e, n) {
  const o = t.slice()
  return (
    (o[11] = e[n].key),
    (o[12] = e[n].translate),
    (o[13] = e[n].scale),
    (o[14] = e[n].type),
    (o[15] = e[n].opacity),
    o
  )
}
function Up(t, e) {
  let n, o, i, r, a, s, l, c
  return {
    key: t,
    first: null,
    c() {
      ;(n = qo('div')),
        ii(n, 'role', 'button'),
        ii(n, 'aria-label', (o = `Drag ${e[14]} ${e[11]}`)),
        ii(n, 'tabindex', (i = 'edge' === e[14] ? -1 : 0)),
        ii(n, 'class', 'PinturaRectManipulator'),
        ii(n, 'data-direction', (r = e[11])),
        ii(n, 'data-shape', (a = '' + ('edge' === e[14] ? 'edge' : '' + e[0]))),
        ii(
          n,
          'style',
          (s = `transform: translate3d(${e[12].x}px, ${e[12].y}px, 0) scale(${e[13].x}, ${e[13].y}); opacity: ${e[15]}`)
        ),
        (this.first = n)
    },
    m(t, o) {
      Go(t, n, o),
        l ||
          ((c = [
            ei(n, 'nudge', function () {
              Eo(e[5](e[11])) && e[5](e[11]).apply(this, arguments)
            }),
            Wo(ol.call(null, n)),
            ei(n, 'interactionstart', function () {
              Eo(e[4]('resizestart', e[11])) && e[4]('resizestart', e[11]).apply(this, arguments)
            }),
            ei(n, 'interactionupdate', function () {
              Eo(e[4]('resizemove', e[11])) && e[4]('resizemove', e[11]).apply(this, arguments)
            }),
            ei(n, 'interactionend', function () {
              Eo(e[4]('resizeend', e[11])) && e[4]('resizeend', e[11]).apply(this, arguments)
            }),
            Wo(nl.call(null, n)),
          ]),
          (l = !0))
    },
    p(t, l) {
      ;(e = t),
        2 & l && o !== (o = `Drag ${e[14]} ${e[11]}`) && ii(n, 'aria-label', o),
        2 & l && i !== (i = 'edge' === e[14] ? -1 : 0) && ii(n, 'tabindex', i),
        2 & l && r !== (r = e[11]) && ii(n, 'data-direction', r),
        3 & l && a !== (a = '' + ('edge' === e[14] ? 'edge' : '' + e[0])) && ii(n, 'data-shape', a),
        2 & l &&
          s !==
            (s = `transform: translate3d(${e[12].x}px, ${e[12].y}px, 0) scale(${e[13].x}, ${e[13].y}); opacity: ${e[15]}`) &&
          ii(n, 'style', s)
    },
    d(t) {
      t && Zo(n), (l = !1), Po(c)
    },
  }
}
function Hp(t) {
  let e,
    n = [],
    o = new Map(),
    i = t[1]
  const r = (t) => t[11]
  for (let e = 0; e < i.length; e += 1) {
    let a = Np(t, i, e),
      s = r(a)
    o.set(s, (n[e] = Up(s, a)))
  }
  return {
    c() {
      for (let t = 0; t < n.length; t += 1) n[t].c()
      e = ti()
    },
    m(t, o) {
      for (let e = 0; e < n.length; e += 1) n[e].m(t, o)
      Go(t, e, o)
    },
    p(t, [a]) {
      51 & a && ((i = t[1]), (n = Gi(n, a, r, 1, t, i, o, e.parentNode, ji, Up, e, Np)))
    },
    i: ko,
    o: ko,
    d(t) {
      for (let e = 0; e < n.length; e += 1) n[e].d(t)
      t && Zo(e)
    },
  }
}
function Xp(t, e, n) {
  let o,
    i,
    r,
    { rect: a = null } = e,
    { visible: s = !1 } = e,
    { style: l } = e
  const c = Ia(void 0, { precision: 1e-4, stiffness: 0.2, damping: 0.4 })
  Fo(t, c, (t) => n(8, (i = t)))
  const u = Ia(0, { precision: 0.001 })
  Fo(t, u, (t) => n(9, (r = t)))
  const d = xi()
  return (
    (t.$$set = (t) => {
      'rect' in t && n(6, (a = t.rect)),
        'visible' in t && n(7, (s = t.visible)),
        'style' in t && n(0, (l = t.style))
    }),
    (t.$$.update = () => {
      128 & t.$$.dirty && c.set(s ? 1 : 0.5),
        128 & t.$$.dirty && u.set(s ? 1 : 0),
        832 & t.$$.dirty &&
          n(
            1,
            (o = Object.keys(Ip).map((t, e) => {
              const n = Ip[t],
                o = Vp[n](a),
                s = 1 === n.length ? 'edge' : 'corner',
                l = 'corner' === s
              return {
                key: n,
                type: s,
                scale: {
                  x: /^(t|b)$/.test(n) ? a.width : l ? Mr(i, 0.5, 1.25) : 1,
                  y: /^(r|l)$/.test(n) ? a.height : l ? Mr(i, 0.5, 1.25) : 1,
                },
                translate: { x: o.x, y: o.y },
                opacity: r,
              }
            }))
          )
    }),
    [
      l,
      o,
      c,
      u,
      (t, e) =>
        ({ detail: n }) =>
          d(t, { direction: e, translation: n && n.translation }),
      (t) =>
        ({ detail: e }) => {
          d('resizestart', { direction: t, translation: { x: 0, y: 0 } }),
            d('resizemove', { direction: t, translation: e }),
            d('resizeend', { direction: t, translation: { x: 0, y: 0 } })
        },
      a,
      s,
      i,
      r,
    ]
  )
}
class jp extends or {
  constructor(t) {
    super(), nr(this, t, Xp, Hp, Ao, { rect: 6, visible: 7, style: 0 })
  }
}
var Yp = (t) => {
    function e(e, n) {
      t.dispatchEvent(new CustomEvent(e, { detail: n }))
    }
    const n = (n) => {
        n.preventDefault(),
          t.addEventListener('gesturechange', o),
          t.addEventListener('gestureend', i),
          e('gesturedown')
      },
      o = (t) => {
        t.preventDefault(), e('gestureupdate', t.scale)
      },
      i = (t) => {
        e('gestureup', t.scale), t.preventDefault(), r()
      },
      r = () => {
        t.removeEventListener('gesturechange', o), t.removeEventListener('gestureend', i)
      }
    return (
      t.addEventListener('gesturestart', n),
      {
        destroy: () => {
          r(), t.removeEventListener('gesturestart', n)
        },
      }
    )
  },
  Gp = (t) => j(t.clientX, t.clientY),
  Zp = { [Lp]: Bp, [Fp]: zp, [Bp]: Lp, [zp]: Fp, [Dp]: _p, [Op]: Wp, [_p]: Dp, [Wp]: Op },
  qp = {
    [Lp]: [0.5, 0],
    [Fp]: [1, 0.5],
    [Bp]: [0.5, 1],
    [zp]: [0, 0.5],
    [Dp]: [0, 0],
    [Op]: [1, 0],
    [_p]: [1, 1],
    [Wp]: [0, 1],
  },
  Kp = (t) => {
    const e = t === zp || t === Fp,
      n = t === Lp || t === Bp
    return [
      t === Fp || t === Op || t === _p,
      t === zp || t === Wp || t === Dp,
      t === Lp || t === Op || t === Dp,
      t === Bp || t === _p || t === Wp,
      e,
      n,
      e || n,
    ]
  }
const Qp = (t, e, n, o) => {
  const { aspectRatio: i, minSize: r, maxSize: a } = o,
    s = e === Fp || e === Op || e === _p,
    l = e === zp || e === Wp || e === Dp,
    c = e === Lp || e === Op || e === Dp,
    u = e === Bp || e === _p || e === Wp,
    d = e === zp || e === Fp,
    p = e === Lp || e === Bp,
    h = Rt(n)
  s ? ((h.x = t.x), (h.width -= t.x)) : l && (h.width = t.x),
    u ? ((h.y = t.y), (h.height -= t.y)) : c && (h.height = t.y)
  const g = ((m = Math.min(h.width, a.width)), (f = Math.min(h.height, a.height)), Mt(0, 0, m, f))
  var m, f
  if (i)
    if (d) {
      const e = Math.min(t.y, n.height - t.y)
      g.height = Math.min(2 * e, g.height)
    } else if (p) {
      const e = Math.min(t.x, n.width - t.x)
      g.width = Math.min(2 * e, g.width)
    }
  const $ = i ? ht(Gt(g, i)) : g,
    y = i ? ht(Yt(Pt(r), i)) : r
  let x, b, v, w
  s ? (x = t.x) : l && (b = t.x),
    u ? (v = t.y) : c && (w = t.y),
    s ? (b = x + y.width) : l && (x = b - y.width),
    u ? (w = v + y.height) : c && (v = w - y.height),
    d
      ? ((v = t.y - 0.5 * y.height), (w = t.y + 0.5 * y.height))
      : p && ((x = t.x - 0.5 * y.width), (b = t.x + 0.5 * y.width))
  const S = At(j(x, v), j(b, w))
  s ? (b = x + $.width) : l && (x = b - $.width),
    u ? (w = v + $.height) : c && (v = w - $.height),
    d
      ? ((v = t.y - 0.5 * $.height), (w = t.y + 0.5 * $.height))
      : p && ((x = t.x - 0.5 * $.width), (b = t.x + 0.5 * $.width))
  return { inner: S, outer: At(j(x, v), j(b, w)) }
}
var Jp = (t, e, n = {}) => {
    const { target: o, translate: i } = e,
      { aspectRatio: r } = n,
      a = qp[Zp[o]],
      s = et(Rt(t), j(a[0] * t.width, a[1] * t.height)),
      l = qp[o],
      c = et(Rt(t), j(l[0] * t.width, l[1] * t.height)),
      [u, d, p, h, g, m, f] = Kp(o)
    let $ = i.x,
      y = i.y
    g ? (y = 0) : m && ($ = 0)
    let [x, b, v, w] = Zt(t)
    if (
      (u ? (w = s.x) : d && (b = s.x),
      h ? (x = s.y) : p && (v = s.y),
      u ? (b = c.x + $) : d && (w = c.x + $),
      h ? (v = c.y + y) : p && (x = c.y + y),
      r)
    )
      if (f) {
        let t = b - w,
          e = v - x
        g
          ? ((e = t / r), (x = s.y - 0.5 * e), (v = s.y + 0.5 * e))
          : m && ((t = e * r), (w = s.x - 0.5 * t), (b = s.x + 0.5 * t))
      } else {
        const t = j(c.x + $ - s.x, c.y + y - s.y)
        o === Op
          ? ((t.x = Math.max(0, t.x)), (t.y = Math.min(0, t.y)))
          : o === _p
          ? ((t.x = Math.max(0, t.x)), (t.y = Math.max(0, t.y)))
          : o === Wp
          ? ((t.x = Math.min(0, t.x)), (t.y = Math.max(0, t.y)))
          : o === Dp && ((t.x = Math.min(0, t.x)), (t.y = Math.min(0, t.y)))
        const e = K(t),
          n = j(r, 1),
          i = ot(Q(n), e)
        o === Op
          ? ((b = s.x + i.x), (x = s.y - i.y))
          : o === _p
          ? ((b = s.x + i.x), (v = s.y + i.y))
          : o === Wp
          ? ((w = s.x - i.x), (v = s.y + i.y))
          : o === Dp && ((w = s.x - i.x), (x = s.y - i.y))
      }
    return Ft(w, x, b - w, v - x)
  },
  th = (t) => (180 * t) / Math.PI
function eh(t) {
  let e, n, o
  return (
    (n = new Tp({
      props: {
        elasticity: t[5],
        min: t[7],
        max: t[8],
        value: t[12],
        valueMin: t[0],
        valueMax: t[1],
        labelReset: t[6],
        base: t[11],
        valueLabel: Math.round(th(t[12])) + '°',
        oninputstart: t[2],
        oninputmove: t[14],
        oninputend: t[15],
      },
    })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'class', 'PinturaImageRotator')
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, [e]) {
        const o = {}
        32 & e && (o.elasticity = t[5]),
          128 & e && (o.min = t[7]),
          256 & e && (o.max = t[8]),
          4096 & e && (o.value = t[12]),
          1 & e && (o.valueMin = t[0]),
          2 & e && (o.valueMax = t[1]),
          64 & e && (o.labelReset = t[6]),
          2048 & e && (o.base = t[11]),
          4096 & e && (o.valueLabel = Math.round(th(t[12])) + '°'),
          4 & e && (o.oninputstart = t[2]),
          1544 & e && (o.oninputmove = t[14]),
          1552 & e && (o.oninputend = t[15]),
          n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function nh(t, e, n) {
  let o, r, a, s, l, c
  const u = Math.PI / 2,
    d = Math.PI / 4
  let { rotation: p } = e,
    { valueMin: h } = e,
    { valueMax: g } = e,
    { oninputstart: m = i } = e,
    { oninputmove: f = i } = e,
    { oninputend: $ = i } = e,
    { elasticity: y = 0 } = e,
    { labelReset: x } = e
  return (
    (t.$$set = (t) => {
      'rotation' in t && n(13, (p = t.rotation)),
        'valueMin' in t && n(0, (h = t.valueMin)),
        'valueMax' in t && n(1, (g = t.valueMax)),
        'oninputstart' in t && n(2, (m = t.oninputstart)),
        'oninputmove' in t && n(3, (f = t.oninputmove)),
        'oninputend' in t && n(4, ($ = t.oninputend)),
        'elasticity' in t && n(5, (y = t.elasticity)),
        'labelReset' in t && n(6, (x = t.labelReset))
    }),
    (t.$$.update = () => {
      384 & t.$$.dirty && n(11, (a = o + 0.5 * (r - o))),
        8192 & t.$$.dirty && n(9, (s = Math.sign(p))),
        8192 & t.$$.dirty && n(10, (l = Math.round(Math.abs(p) / u) * u)),
        9728 & t.$$.dirty && n(12, (c = p - s * l))
    }),
    n(7, (o = 1e-9 - d)),
    n(8, (r = d - 1e-9)),
    [h, g, m, f, $, y, x, o, r, s, l, a, c, p, (t) => f(s * l + t), (t) => $(s * l + t)]
  )
}
class oh extends or {
  constructor(t) {
    super(),
      nr(this, t, nh, eh, Ao, {
        rotation: 13,
        valueMin: 0,
        valueMax: 1,
        oninputstart: 2,
        oninputmove: 3,
        oninputend: 4,
        elasticity: 5,
        labelReset: 6,
      })
  }
}
function ih(t) {
  let e, n, o, i, r
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('p')),
        (o = Qo(t[0])),
        (i = Qo(' × ')),
        (r = Qo(t[1])),
        ii(e, 'class', 'PinturaImageInfo')
    },
    m(t, a) {
      Go(t, e, a), Yo(e, n), Yo(n, o), Yo(n, i), Yo(n, r)
    },
    p(t, [e]) {
      1 & e && ai(o, t[0]), 2 & e && ai(r, t[1])
    },
    i: ko,
    o: ko,
    d(t) {
      t && Zo(e)
    },
  }
}
function rh(t, e, n) {
  let { width: o } = e,
    { height: i } = e
  return (
    (t.$$set = (t) => {
      'width' in t && n(0, (o = t.width)), 'height' in t && n(1, (i = t.height))
    }),
    [o, i]
  )
}
class ah extends or {
  constructor(t) {
    super(), nr(this, t, rh, ih, Ao, { width: 0, height: 1 })
  }
}
function sh(t) {
  let e, n
  return (
    (e = new Pc({ props: { items: t[0] } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        1 & n[0] && (o.items = t[0]), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function lh(t) {
  let e, n, o
  return (
    (n = new Ap({ props: { $$slots: { default: [sh] }, $$scope: { ctx: t } } })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'slot', 'header')
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, e) {
        const o = {}
        ;(1 & e[0]) | (1073741824 & e[5]) && (o.$$scope = { dirty: e, ctx: t }), n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function ch(t) {
  let e, n
  return (
    (e = new Js({
      props: {
        onclick: t[79],
        label: t[4].cropLabelButtonRecenter,
        icon: t[4].cropIconButtonRecenter,
        class: 'PinturaButtonCenter',
        disabled: !t[9],
        hideLabel: !0,
        style: `opacity: ${t[27]}; transform: translate3d(${t[28].x}px, ${t[28].y}px, 0)`,
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        16 & n[0] && (o.label = t[4].cropLabelButtonRecenter),
          16 & n[0] && (o.icon = t[4].cropIconButtonRecenter),
          512 & n[0] && (o.disabled = !t[9]),
          402653184 & n[0] &&
            (o.style = `opacity: ${t[27]}; transform: translate3d(${t[28].x}px, ${t[28].y}px, 0)`),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function uh(t) {
  let e, n
  return (
    (e = new jp({ props: { rect: t[10], visible: t[11], style: t[2] } })),
    e.$on('resizestart', t[59]),
    e.$on('resizemove', t[60]),
    e.$on('resizeend', t[61]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        1024 & n[0] && (o.rect = t[10]),
          2048 & n[0] && (o.visible = t[11]),
          4 & n[0] && (o.style = t[2]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function dh(t) {
  let e, n
  return (
    (e = new ah({ props: { width: Math.round(t[7].width), height: Math.round(t[7].height) } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        128 & n[0] && (o.width = Math.round(t[7].width)),
          128 & n[0] && (o.height = Math.round(t[7].height)),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function ph(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = t[17] && t[18] && ch(t),
    u = t[17] && uh(t),
    d = t[16] && dh(t)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        c && c.c(),
        (o = Jo()),
        u && u.c(),
        (r = Jo()),
        d && d.c(),
        ii(n, 'class', 'PinturaStage'),
        ii(e, 'slot', 'main')
    },
    m(p, h) {
      Go(p, e, h),
        Yo(e, n),
        c && c.m(n, null),
        Yo(n, o),
        u && u.m(n, null),
        t[139](n),
        Yo(e, r),
        d && d.m(e, null),
        (a = !0),
        s ||
          ((l = [
            ei(n, 'measure', t[137]),
            Wo(Ua.call(null, n)),
            ei(
              n,
              'wheel',
              function () {
                Eo(t[3] && t[78]) && (t[3] && t[78]).apply(this, arguments)
              },
              { passive: !1 }
            ),
            ei(n, 'interactionstart', t[65]),
            ei(n, 'interactionupdate', t[66]),
            ei(n, 'interactionrelease', t[68]),
            ei(n, 'interactionend', t[67]),
            Wo(
              (i = nl.call(null, n, {
                drag: !0,
                pinch: t[3],
                inertia: !0,
                matchTarget: !0,
                getEventPosition: t[140],
              }))
            ),
            ei(n, 'gesturedown', t[75]),
            ei(n, 'gestureupdate', t[76]),
            ei(n, 'gestureup', t[77]),
            Wo(Yp.call(null, n)),
          ]),
          (s = !0))
    },
    p(r, a) {
      ;(t = r)[17] && t[18]
        ? c
          ? (c.p(t, a), 393216 & a[0] && Vi(c, 1))
          : ((c = ch(t)), c.c(), Vi(c, 1), c.m(n, o))
        : c &&
          (_i(),
          Ni(c, 1, 1, () => {
            c = null
          }),
          Wi()),
        t[17]
          ? u
            ? (u.p(t, a), 131072 & a[0] && Vi(u, 1))
            : ((u = uh(t)), u.c(), Vi(u, 1), u.m(n, null))
          : u &&
            (_i(),
            Ni(u, 1, 1, () => {
              u = null
            }),
            Wi()),
        i &&
          Eo(i.update) &&
          32776 & a[0] &&
          i.update.call(null, {
            drag: !0,
            pinch: t[3],
            inertia: !0,
            matchTarget: !0,
            getEventPosition: t[140],
          }),
        t[16]
          ? d
            ? (d.p(t, a), 65536 & a[0] && Vi(d, 1))
            : ((d = dh(t)), d.c(), Vi(d, 1), d.m(e, null))
          : d &&
            (_i(),
            Ni(d, 1, 1, () => {
              d = null
            }),
            Wi())
    },
    i(t) {
      a || (Vi(c), Vi(u), Vi(d), (a = !0))
    },
    o(t) {
      Ni(c), Ni(u), Ni(d), (a = !1)
    },
    d(n) {
      n && Zo(e), c && c.d(), u && u.d(), t[139](null), d && d.d(), (s = !1), Po(l)
    },
  }
}
function hh(t) {
  let e, n, o, i
  const r = [{ class: 'PinturaControlList' }, { tabs: t[12] }, t[21]]
  let a = {
    $$slots: {
      default: [
        gh,
        ({ tab: t }) => ({ 184: t }),
        ({ tab: t }) => [0, 0, 0, 0, 0, t ? 536870912 : 0],
      ],
    },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < r.length; t += 1) a = Mo(a, r[t])
  ;(e = new Ts({ props: a })), e.$on('select', t[138])
  const s = [
    { class: 'PinturaControlPanels' },
    { panelClass: 'PinturaControlPanel' },
    { panels: t[22] },
    t[21],
  ]
  let l = {
    $$slots: {
      default: [
        $h,
        ({ panel: t }) => ({ 183: t }),
        ({ panel: t }) => [0, 0, 0, 0, 0, t ? 268435456 : 0],
      ],
    },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < s.length; t += 1) l = Mo(l, s[t])
  return (
    (o = new Ws({ props: l })),
    {
      c() {
        Qi(e.$$.fragment), (n = Jo()), Qi(o.$$.fragment)
      },
      m(t, r) {
        Ji(e, t, r), Go(t, n, r), Ji(o, t, r), (i = !0)
      },
      p(t, n) {
        const i =
          2101248 & n[0]
            ? Zi(r, [r[0], 4096 & n[0] && { tabs: t[12] }, 2097152 & n[0] && qi(t[21])])
            : {}
        1610612736 & n[5] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i)
        const a =
          6291456 & n[0]
            ? Zi(s, [s[0], s[1], 4194304 & n[0] && { panels: t[22] }, 2097152 & n[0] && qi(t[21])])
            : {}
        ;(117461264 & n[0]) | (1342177280 & n[5]) && (a.$$scope = { dirty: n, ctx: t }), o.$set(a)
      },
      i(t) {
        i || (Vi(e.$$.fragment, t), Vi(o.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), (i = !1)
      },
      d(t) {
        tr(e, t), t && Zo(n), tr(o, t)
      },
    }
  )
}
function gh(t) {
  let e,
    n,
    o = t[184].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      536870912 & e[5] && o !== (o = t[184].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function mh(t) {
  let e, n
  return (
    (e = new Tp({
      props: {
        elasticity: t[35] * t[36],
        base: vh,
        min: t[14],
        max: bh,
        valueMin: t[25][0],
        valueMax: t[25][1],
        value: t[26],
        labelReset: t[4].labelReset,
        valueLabel: Math.round(100 * t[26]) + '%',
        oninputstart: t[72],
        oninputmove: t[73],
        oninputend: t[74],
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        16384 & n[0] && (o.min = t[14]),
          33554432 & n[0] && (o.valueMin = t[25][0]),
          33554432 & n[0] && (o.valueMax = t[25][1]),
          67108864 & n[0] && (o.value = t[26]),
          16 & n[0] && (o.labelReset = t[4].labelReset),
          67108864 & n[0] && (o.valueLabel = Math.round(100 * t[26]) + '%'),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function fh(t) {
  let e, n
  return (
    (e = new oh({
      props: {
        elasticity: t[35] * t[36],
        rotation: t[8],
        labelReset: t[4].labelReset,
        valueMin: t[24][0],
        valueMax: t[24][1],
        oninputstart: t[62],
        oninputmove: t[63],
        oninputend: t[64],
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        256 & n[0] && (o.rotation = t[8]),
          16 & n[0] && (o.labelReset = t[4].labelReset),
          16777216 & n[0] && (o.valueMin = t[24][0]),
          16777216 & n[0] && (o.valueMax = t[24][1]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function $h(t) {
  let e, n, o, i
  const r = [fh, mh],
    a = []
  function s(t, e) {
    return t[183] === t[12][0].id ? 0 : t[183] === t[12][1].id ? 1 : -1
  }
  return (
    ~(e = s(t)) && (n = a[e] = r[e](t)),
    {
      c() {
        n && n.c(), (o = ti())
      },
      m(t, n) {
        ~e && a[e].m(t, n), Go(t, o, n), (i = !0)
      },
      p(t, i) {
        let l = e
        ;(e = s(t)),
          e === l
            ? ~e && a[e].p(t, i)
            : (n &&
                (_i(),
                Ni(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Wi()),
              ~e
                ? ((n = a[e]),
                  n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
                  Vi(n, 1),
                  n.m(o.parentNode, o))
                : (n = null))
      },
      i(t) {
        i || (Vi(n), (i = !0))
      },
      o(t) {
        Ni(n), (i = !1)
      },
      d(t) {
        ~e && a[e].d(t), t && Zo(o)
      },
    }
  )
}
function yh(t) {
  let e,
    n,
    o = t[20] && hh(t)
  return {
    c() {
      ;(e = qo('div')), o && o.c(), ii(e, 'slot', 'footer'), ii(e, 'style', t[23])
    },
    m(t, i) {
      Go(t, e, i), o && o.m(e, null), (n = !0)
    },
    p(t, i) {
      t[20]
        ? o
          ? (o.p(t, i), 1048576 & i[0] && Vi(o, 1))
          : ((o = hh(t)), o.c(), Vi(o, 1), o.m(e, null))
        : o &&
          (_i(),
          Ni(o, 1, 1, () => {
            o = null
          }),
          Wi()),
        (!n || 8388608 & i[0]) && ii(e, 'style', t[23])
    },
    i(t) {
      n || (Vi(o), (n = !0))
    },
    o(t) {
      Ni(o), (n = !1)
    },
    d(t) {
      t && Zo(e), o && o.d()
    },
  }
}
function xh(t) {
  let e, n, o
  function i(e) {
    t[141](e)
  }
  let r = {
    hasHeader: t[19],
    $$slots: { footer: [yh], main: [ph], header: [lh] },
    $$scope: { ctx: t },
  }
  return (
    void 0 !== t[13] && (r.root = t[13]),
    (e = new Sp({ props: r })),
    ki.push(() => Ki(e, 'root', i)),
    e.$on('measure', t[142]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, n) {
        Ji(e, t, n), (o = !0)
      },
      p(t, o) {
        const i = {}
        524288 & o[0] && (i.hasHeader = t[19]),
          (536338429 & o[0]) | (1073741824 & o[5]) && (i.$$scope = { dirty: o, ctx: t }),
          !n && 8192 & o[0] && ((n = !0), (i.root = t[13]), Ei(() => (n = !1))),
          e.$set(i)
      },
      i(t) {
        o || (Vi(e.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (o = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
const bh = 1,
  vh = 0
function wh(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    z,
    O,
    _,
    V,
    U,
    H,
    X,
    Y,
    q,
    J,
    tt,
    it,
    rt,
    at,
    st,
    lt,
    ct,
    pt,
    gt,
    ft,
    wt,
    St,
    kt,
    Ct,
    Mt,
    Tt,
    Et,
    At,
    It,
    Ot = ko,
    Nt = () => (Ot(), (Ot = Io(Ut, (t) => n(11, (gt = t)))), Ut)
  t.$$.on_destroy.push(() => Ot())
  let { isActive: Ut } = e
  Nt()
  let { stores: Ht } = e,
    { cropImageSelectionCornerStyle: qt = 'circle' } = e,
    {
      cropWillRenderImageSelectionGuides: Qt = (t, e) => {
        const n = 'rotate' == t
        return { rows: n ? 5 : 3, cols: n ? 5 : 3, opacity: 0.25 * e }
      },
    } = e,
    { cropAutoCenterImageSelectionTimeout: Jt } = e,
    { cropEnableZoomMatchImageAspectRatio: ee = !0 } = e,
    { cropEnableRotateMatchImageAspectRatio: ne = 'never' } = e,
    { cropEnableRotationInput: oe = !0 } = e,
    { cropEnableZoom: ie = !0 } = e,
    { cropEnableZoomInput: re = !0 } = e,
    { cropEnableImageSelection: ae = !0 } = e,
    { cropEnableInfoIndicator: se = !1 } = e,
    { cropEnableZoomTowardsWheelPosition: le = !0 } = e,
    { cropEnableLimitWheelInputToCropSelection: ce = !0 } = e,
    { cropEnableCenterImageSelection: ue = !0 } = e,
    { cropEnableButtonRotateLeft: de = !0 } = e,
    { cropEnableButtonRotateRight: pe = !1 } = e,
    { cropEnableButtonFlipHorizontal: he = !0 } = e,
    { cropEnableButtonFlipVertical: ge = !1 } = e,
    { cropSelectPresetOptions: me } = e,
    { cropEnableSelectPreset: fe = !0 } = e,
    { cropEnableButtonToggleCropLimit: $e = !1 } = e,
    { locale: ye = {} } = e,
    { tools: xe = [] } = e,
    be = 'idle'
  const ve = () => void 0 === T,
    we = (t, e, n) =>
      N(n)
        ? e.width === Math.round(t.height) || e.height === Math.round(t.width)
        : e.width === Math.round(t.width) || e.height === Math.round(t.height),
    Se = () =>
      (ve() ||
        ('always' === ne &&
          (() => {
            if (1 === T) return !1
            const t = 1 / T
            return !!me && !!zl(me).find(([e]) => e === t)
          })())) &&
      ((t, e, n) => {
        const o = vt(xt(dt(e), n), (t) => Math.abs(Math.round(t))),
          i = yt(o),
          r = Bt(t)
        return (s = r), (a = i).x === s.x && a.y === s.y
        var a, s
      })(P, E, A) &&
      we(P, E, A),
    ke = (t) => {
      if ('never' !== ne && Se()) {
        _o(We, (A += t), A)
        const e = N(A),
          n = e ? E.height : E.width,
          o = e ? E.width : E.height
        _o(qe, (P = Ft(0, 0, n, o)), P), ve() || _o(tn, (T = D(n, o)), T)
      } else _o(We, (A += t), A)
    },
    {
      history: Ce,
      env: Me,
      isInteracting: Re,
      isInteractingFraction: Te,
      rootRect: Pe,
      stageRect: Ee,
      utilRect: Ae,
      rootLineColor: Ie,
      animation: Le,
      elasticityMultiplier: Fe,
      rangeInputElasticity: Be,
      presentationScalar: ze,
      imagePreviewModifiers: De,
      imageFlipX: Oe,
      imageFlipY: _e,
      imageRotation: We,
      imageRotationRange: Ve,
      imageOutputSize: Ne,
      imageSelectionRect: Ue,
      imageSelectionRectSnapshot: Xe,
      imageSelectionRectIntent: je,
      imageSelectionRectPresentation: Ye,
      imageCropRectIntent: Ge,
      imageCropRectOrigin: Ze,
      imageCropRect: qe,
      imageCropMinSize: Ke,
      imageCropMaxSize: Qe,
      imageCropRange: Je,
      imageCropAspectRatio: tn,
      imageCropRectAspectRatio: en,
      imageCropLimitToImage: nn,
      imageSize: on,
      imageScalar: rn,
      imageOverlayMarkup: an,
    } = Ht
  let sn, ln, cn
  Fo(t, Me, (t) => n(128, (ct = t))),
    Fo(t, Re, (t) => n(114, (_ = t))),
    Fo(t, Pe, (t) => n(15, (rt = t))),
    Fo(t, Ee, (t) => n(119, (at = t))),
    Fo(t, Ae, (t) => n(118, (q = t))),
    Fo(t, Le, (t) => n(135, (kt = t))),
    Fo(t, ze, (t) => n(117, (H = t))),
    Fo(t, De, (t) => n(131, (ft = t))),
    Fo(t, Oe, (t) => n(108, (L = t))),
    Fo(t, _e, (t) => n(107, (I = t))),
    Fo(t, We, (t) => n(8, (A = t))),
    Fo(t, Ve, (t) => n(24, (Mt = t))),
    Fo(t, Ne, (t) => n(152, (B = t))),
    Fo(t, Ue, (t) => n(116, (U = t))),
    Fo(t, Xe, (t) => n(115, (V = t))),
    Fo(t, je, (t) => n(154, (Y = t))),
    Fo(t, Ye, (t) => n(122, (lt = t))),
    Fo(t, Ge, (t) => n(156, (tt = t))),
    Fo(t, Ze, (t) => n(155, (J = t))),
    Fo(t, qe, (t) => n(7, (P = t))),
    Fo(t, Ke, (t) => n(112, (z = t))),
    Fo(t, Qe, (t) => n(153, (X = t))),
    Fo(t, Je, (t) => n(157, (it = t))),
    Fo(t, tn, (t) => n(151, (T = t))),
    Fo(t, nn, (t) => n(113, (O = t))),
    Fo(t, on, (t) => n(106, (E = t))),
    Fo(t, rn, (t) => n(130, (pt = t))),
    Fo(t, an, (t) => n(159, (wt = t)))
  const un = (t, e) => {
    const n = { target: t, translate: e }
    let o,
      i = Jp(V, n, { aspectRatio: T })
    const r = ht(_t(Rt(i), H)),
      a = wr(E, A)
    if ((te(a), r.width < z.width || r.height < z.height)) {
      const n = e.y < 0,
        i = e.x > 0,
        a = e.x < 0,
        s = e.y > 0,
        l =
          ('t' === t && n) ||
          ('r' === t && i) ||
          ('b' === t && s) ||
          ('l' === t && a) ||
          ('tr' === t && (i || n)) ||
          ('tl' === t && (a || n)) ||
          ('br' === t && (i || s)) ||
          ('bl' === t && (a || s)),
        c = Vt(r),
        u = Sr(E, A, c)
      if (l && (u.width < z.width || u.height < z.height)) {
        if (0 !== A) {
          const t = Math.sign(A),
            e = Math.round(Math.abs(A) / W) * W,
            n = A - t * e,
            o = (e / W) % 2 == 1,
            i = o ? E.height : E.width,
            a = o ? E.width : E.height,
            s = Math.abs(n),
            l = Math.sin(s),
            c = Math.cos(s)
          if (r.width < z.width) {
            r.width = z.width
            const t = i - (c * r.width + l * r.height),
              e = a - (l * r.width + c * r.height)
            t < e ? (r.height = (i - c * r.width) / l) : e < t && (r.height = (a - l * r.width) / c)
          }
          if (r.height < z.height) {
            r.height = z.height
            const t = i - (c * r.width + l * r.height),
              e = a - (l * r.width + c * r.height)
            t < e ? (r.width = (i - l * r.height) / c) : e < t && (r.width = (a - c * r.height) / l)
          }
        } else
          r.width < z.width && ((r.width = z.width), (r.height = E.height)),
            r.height < z.height && ((r.height = z.height), (r.width = E.width))
        o = Vt(r)
      }
    }
    return (
      o && (i = Jp(V, n, { aspectRatio: o || T })),
      {
        boundsLimited: ((t, e, n, o = {}) => {
          const { target: i, translate: r } = e,
            { aspectRatio: a, minSize: s, maxSize: l } = o,
            c = qp[Zp[i]],
            u = et(j(t.x, t.y), j(c[0] * t.width, c[1] * t.height)),
            d = qp[i],
            p = et(Rt(t), j(d[0] * t.width, d[1] * t.height)),
            [h, g, m, f, $, y, x] = Kp(i)
          let b = r.x,
            v = r.y
          $ ? (v = 0) : y && (b = 0)
          const w = Qp(u, i, n, { aspectRatio: a, minSize: s, maxSize: l })
          let [S, k, C, M] = Zt(t)
          if ((h ? (M = u.x) : g && (k = u.x), f ? (S = u.y) : m && (C = u.y), h)) {
            const t = w.inner.x + w.inner.width,
              e = w.outer.x + w.outer.width
            k = Mr(p.x + b, t, e)
          } else if (g) {
            const t = w.outer.x,
              e = w.inner.x
            M = Mr(p.x + b, t, e)
          }
          if (f) {
            const t = w.inner.y + w.inner.height,
              e = w.outer.y + w.outer.height
            C = Mr(p.y + v, t, e)
          } else if (m) {
            const t = w.outer.y,
              e = w.inner.y
            S = Mr(p.y + v, t, e)
          }
          if (a)
            if (x) {
              let t = k - M,
                e = C - S
              $
                ? ((e = t / a), (S = u.y - 0.5 * e), (C = u.y + 0.5 * e))
                : y && ((t = e * a), (M = u.x - 0.5 * t), (k = u.x + 0.5 * t))
            } else {
              const t = j(p.x + b - u.x, p.y + v - u.y)
              i === Op
                ? ((t.x = Math.max(0, t.x)), (t.y = Math.min(0, t.y)))
                : i === _p
                ? ((t.x = Math.max(0, t.x)), (t.y = Math.max(0, t.y)))
                : i === Wp
                ? ((t.x = Math.min(0, t.x)), (t.y = Math.max(0, t.y)))
                : i === Dp && ((t.x = Math.min(0, t.x)), (t.y = Math.min(0, t.y)))
              const e = K(t),
                n = K(j(w.inner.width, w.inner.height)),
                o = K(j(w.outer.width, w.outer.height)),
                r = Mr(e, n, o),
                s = j(a, 1),
                l = ot(Q(s), r)
              i === Op
                ? ((k = u.x + l.x), (S = u.y - l.y))
                : i === _p
                ? ((k = u.x + l.x), (C = u.y + l.y))
                : i === Wp
                ? ((M = u.x - l.x), (C = u.y + l.y))
                : i === Dp && ((M = u.x - l.x), (S = u.y - l.y))
            }
          return Ft(M, S, k - M, C - S)
        })(V, n, q, { aspectRatio: T || o, minSize: ln, maxSize: cn }),
        boundsIntent: i,
      }
    )
  }
  let dn = void 0,
    pn = void 0
  const hn = ({ translation: t, scalar: e }) => {
      const n = Math.min(U.width / P.width, U.height / P.height),
        o = ot(G(t), 1 / n)
      let i
      if (pn) {
        const e = nt(G(pn), t)
        ;(pn = t), (i = zt(Rt(P), e))
      } else (i = zt(Rt(dn), Z(G(o)))), void 0 !== e && Dt(i, 1 - e)
      _o(Ge, (tt = i), tt), _o(qe, (P = i), P)
    },
    gn = sr([Je, qe], ([t, e], n) => {
      if (!e) return
      const [o, i] = t,
        r = Vt(e)
      n([ht(Kt(Yt(o, r), xr)), ht(Kt(Gt(i, r), xr))])
    })
  Fo(t, gn, (t) => n(158, (st = t)))
  const mn = sr([on, nn, Ke, Qe, Je, We], ([t, e, n, o, i, r], a) => {
    if (!t) return
    const s = i[0],
      l = i[1]
    let c, u
    e
      ? ((c = ((t, e, n) =>
          N(n)
            ? 1 - 1 / Math.min(t.height / e.width, t.width / e.height)
            : 1 - 1 / Math.min(t.width / e.width, t.height / e.height))(t, l, r)),
        (u = Math.min(s.width / n.width, s.height / n.height)))
      : ((u = 1), (c = -1))
    a([xr(c), xr(u)])
  })
  Fo(t, mn, (t) => n(25, (Tt = t)))
  const fn = sr([on, qe, Je, We], ([t, e, n, o], i) => {
    if (!t || !e) return i(0)
    let r
    const a = n[0],
      s = n[1],
      l = e.width,
      c = e.height,
      u = Vt(e),
      d = N(o) ? mt(t.height, t.width) : t,
      p = Gt(d, u)
    if (l <= p.width || c <= p.height) {
      const t = p.width - a.width,
        e = p.height - a.height
      r = 0 === t || 0 === e ? 1 : 1 - Math.min((l - a.width) / t, (c - a.height) / e)
    } else {
      const t = s.width - p.width,
        e = s.height - p.height,
        n = Gt({ width: t, height: e }, u)
      r = -Math.min((l - p.width) / n.width, (c - p.height) / n.height)
    }
    i(r)
  })
  Fo(t, fn, (t) => n(26, (Et = t)))
  const $n = (t) => {
    const e = Vt(dn)
    let n, o, i
    const r = N(A) ? mt(E.height, E.width) : E,
      a = Gt(r, e)
    if (t >= 0) {
      const r = a.width - it[0].width,
        s = a.height - it[0].height
      ;(n = a.width - r * t), (o = a.height - s * t), (i = Yt({ width: n, height: o }, e))
    } else {
      const r = it[1].width - a.width,
        s = it[1].height - a.height
      ;(n = a.width + r * -t), (o = a.height + s * -t), (i = Gt({ width: n, height: o }, e))
    }
    ;(n = i.width), (o = i.height)
    const s = dn.x + 0.5 * dn.width - 0.5 * n,
      l = dn.y + 0.5 * dn.height - 0.5 * o
    _o(qe, (P = { x: s, y: l, width: n, height: o }), P)
  }
  let yn
  const xn = (t) => {
    const e = Dt(Rt(yn), 1 / t)
    _o(Ge, (tt = e), tt), _o(qe, (P = e), P)
  }
  let bn
  const vn = xi(),
    wn = () => {
      vn('measure', Rt(q))
    }
  let Sn
  const kn = Ia(0, { precision: 1e-4 })
  Fo(t, kn, (t) => n(27, (At = t)))
  const Cn = Ia()
  Fo(t, Cn, (t) => n(28, (It = t)))
  const Mn = sr([tn, Ne], ([t, e], n) => {
    if (!me) return
    const o = zl(me),
      i = [...o]
        .map((t) => t[0])
        .sort((t, e) => (He(t[0]) && !He(e[0]) ? 1 : -1))
        .find((n) => {
          if (He(n) && e) {
            const [o, i] = n,
              r = e.width === o && e.height === i,
              a = t === D(o, i)
            return r && a
          }
          return n === t
        })
    n(o.map((t) => t[0]).findIndex((t) => (He(t) ? Ar(t, i) : t === i)))
  })
  Fo(t, Mn, (t) => n(110, (F = t)))
  const Rn = (t) => {
      if (!me) return
      const e = zl(me)[t][0]
      return e ? (He(e) ? D(e[0], e[1]) : e) : void 0
    },
    Tn = sr([Ie, Ye, Te], ([t, e, n], o) => {
      const { rows: i, cols: r, opacity: a } = Qt(be, n)
      if (!e || a <= 0) return o([])
      const { x: s, y: l, width: c, height: u } = e,
        d = c / r,
        p = u / i,
        h = []
      for (let e = 1; e <= i - 1; e++) {
        const n = l + p * e
        h.push({
          id: 'image-selection-guide-row-' + e,
          points: [j(s, n), j(s + c, n)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: t,
        })
      }
      for (let e = 1; e <= r - 1; e++) {
        const n = s + d * e
        h.push({
          id: 'image-selection-guide-col-' + e,
          points: [j(n, l), j(n, l + u)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: t,
        })
      }
      o(h)
    })
  Fo(t, Tn, (t) => n(132, (St = t)))
  const Pn = 'crop-' + M()
  let En,
    An = Pn + '-' + (oe ? 'rotation' : 'zoom'),
    In = An,
    Ln = void 0
  const Fn = Ia(kt ? 20 : 0)
  Fo(t, Fn, (t) => n(136, (Ct = t)))
  return (
    (t.$$set = (t) => {
      'isActive' in t && Nt(n(1, (Ut = t.isActive))),
        'stores' in t && n(86, (Ht = t.stores)),
        'cropImageSelectionCornerStyle' in t && n(2, (qt = t.cropImageSelectionCornerStyle)),
        'cropWillRenderImageSelectionGuides' in t &&
          n(87, (Qt = t.cropWillRenderImageSelectionGuides)),
        'cropAutoCenterImageSelectionTimeout' in t &&
          n(88, (Jt = t.cropAutoCenterImageSelectionTimeout)),
        'cropEnableZoomMatchImageAspectRatio' in t &&
          n(89, (ee = t.cropEnableZoomMatchImageAspectRatio)),
        'cropEnableRotateMatchImageAspectRatio' in t &&
          n(90, (ne = t.cropEnableRotateMatchImageAspectRatio)),
        'cropEnableRotationInput' in t && n(91, (oe = t.cropEnableRotationInput)),
        'cropEnableZoom' in t && n(3, (ie = t.cropEnableZoom)),
        'cropEnableZoomInput' in t && n(92, (re = t.cropEnableZoomInput)),
        'cropEnableImageSelection' in t && n(93, (ae = t.cropEnableImageSelection)),
        'cropEnableInfoIndicator' in t && n(94, (se = t.cropEnableInfoIndicator)),
        'cropEnableZoomTowardsWheelPosition' in t &&
          n(95, (le = t.cropEnableZoomTowardsWheelPosition)),
        'cropEnableLimitWheelInputToCropSelection' in t &&
          n(96, (ce = t.cropEnableLimitWheelInputToCropSelection)),
        'cropEnableCenterImageSelection' in t && n(97, (ue = t.cropEnableCenterImageSelection)),
        'cropEnableButtonRotateLeft' in t && n(98, (de = t.cropEnableButtonRotateLeft)),
        'cropEnableButtonRotateRight' in t && n(99, (pe = t.cropEnableButtonRotateRight)),
        'cropEnableButtonFlipHorizontal' in t && n(100, (he = t.cropEnableButtonFlipHorizontal)),
        'cropEnableButtonFlipVertical' in t && n(101, (ge = t.cropEnableButtonFlipVertical)),
        'cropSelectPresetOptions' in t && n(102, (me = t.cropSelectPresetOptions)),
        'cropEnableSelectPreset' in t && n(103, (fe = t.cropEnableSelectPreset)),
        'cropEnableButtonToggleCropLimit' in t && n(104, ($e = t.cropEnableButtonToggleCropLimit)),
        'locale' in t && n(4, (ye = t.locale)),
        'tools' in t && n(0, (xe = t.tools))
    }),
    (t.$$.update = () => {
      16 & t.$$.dirty[4] && n(127, (d = 'overlay' === ct.layoutMode)),
        (1024 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) && n(109, (y = fe && !d)),
        41943040 & t.$$.dirty[3] && n(123, (a = q && U && Xt(q, U))),
        1082130432 & t.$$.dirty[3] && n(124, (s = !(!U || !a))),
        (1082130432 & t.$$.dirty[3]) | (1 & t.$$.dirty[4]) &&
          n(111, (l = s && Wt(U, a, (t) => xr(t, 5)))),
        (272 & t.$$.dirty[0]) | (2092e3 & t.$$.dirty[3]) &&
          n(
            0,
            (xe = [
              de && [
                'Button',
                'rotate-left',
                {
                  label: ye.cropLabelButtonRotateLeft,
                  labelClass: 'PinturaToolbarContentWide',
                  icon: ye.cropIconButtonRotateLeft,
                  onclick: () => {
                    ke(-Math.PI / 2), Ce.write()
                  },
                },
              ],
              pe && [
                'Button',
                'rotate-right',
                {
                  label: ye.cropLabelButtonRotateRight,
                  labelClass: 'PinturaToolbarContentWide',
                  icon: ye.cropIconButtonRotateRight,
                  onclick: () => {
                    ke(Math.PI / 2), Ce.write()
                  },
                },
              ],
              he && [
                'Button',
                'flip-horizontal',
                {
                  label: ye.cropLabelButtonFlipHorizontal,
                  labelClass: 'PinturaToolbarContentWide',
                  icon: ye.cropIconButtonFlipHorizontal,
                  onclick: () => {
                    N(A) ? _o(_e, (I = !I), I) : _o(Oe, (L = !L), L), Ce.write()
                  },
                },
              ],
              ge && [
                'Button',
                'flip-vertical',
                {
                  label: ye.cropLabelButtonFlipVertical,
                  labelClass: 'PinturaToolbarContentWide',
                  icon: ye.cropIconButtonFlipVertical,
                  onclick: () => {
                    N(A) ? _o(Oe, (L = !L), L) : _o(_e, (I = !I), I), Ce.write()
                  },
                },
              ],
              y &&
                me && [
                  'Dropdown',
                  'select-preset',
                  {
                    icon: Ol(ye.cropIconSelectPreset, ye, Rn(F)),
                    label: ye.cropLabelSelectPreset,
                    labelClass: 'PinturaToolbarContentWide',
                    options: me,
                    selectedIndex: F,
                    onchange: ({ value: t }) => {
                      var e
                      He(t)
                        ? (_o(tn, (T = D(t[0], t[1])), T), _o(Ne, (B = ut((e = t)[0], e[1])), B))
                        : _o(tn, (T = t), T),
                        l && wn(),
                        Ce.write()
                    },
                    optionMapper: (t) => {
                      let e = !1
                      const n = He(t.value) ? t.value[0] / t.value[1] : t.value
                      if (n) {
                        const t = Sr(E, A, n)
                        e = t.width < z.width || t.height < z.height
                      }
                      return (
                        (t.icon = ((t, e = {}) => {
                          const { width: n = 24, height: o = 24, bounds: i = 16, radius: r = 3 } = e
                          let a,
                            s,
                            l,
                            c,
                            u = He(t) ? D(t[0], t[1]) : t,
                            d = !!u
                          return (
                            (u = d ? u : 1),
                            (l = u > 1 ? i : u * i),
                            (c = l / u),
                            (a = Math.round(0.5 * (n - l))),
                            (s = Math.round(0.5 * (o - c))),
                            `<rect fill="${d ? 'currentColor' : 'none'}" stroke="${
                              d ? 'none' : 'currentColor'
                            }" stroke-width="${n / 16}" stroke-dasharray="${[n / 12, n / 6].join(
                              ' '
                            )}" x="${a}" y="${s}" width="${l}" height="${c}" rx="${r}"/>`
                          )
                        })(t.value, { bounds: 14 })),
                        { ...t, disabled: e }
                      )
                    },
                  },
                ],
              $e && [
                'Dropdown',
                'select-crop-limit',
                {
                  icon: Ol(ye.cropIconCropBoundary, ye, O),
                  label: ye.cropLabelCropBoundary,
                  labelClass: 'PinturaToolbarContentWide',
                  onchange: ({ value: t }) => {
                    _o(nn, (O = t), O), Ce.write()
                  },
                  options: [
                    [
                      !0,
                      ye.cropLabelCropBoundaryEdge,
                      { icon: Ol(ye.cropIconCropBoundary, ye, !0) },
                    ],
                    [
                      !1,
                      ye.cropLabelCropBoundaryNone,
                      { icon: Ol(ye.cropIconCropBoundary, ye, !1) },
                    ],
                  ],
                },
              ],
            ])
          ),
        1048576 & t.$$.dirty[3] && n(14, (o = O ? 0 : -1)),
        100663296 & t.$$.dirty[3] && n(120, (i = q && j(-(at.x - q.x), -(at.y - q.y)))),
        671088640 & t.$$.dirty[3] &&
          n(121, (r = lt && j(Sl(lt.x + 0.5 * lt.width + i.x), Sl(lt.y + 0.5 * lt.height + i.y)))),
        4194304 & t.$$.dirty[3] && n(125, (c = null != V)),
        1107296256 & t.$$.dirty[3] &&
          n(126, (u = q && a && (a.height === q.height || a.width === q.width))),
        (16777216 & t.$$.dirty[3]) | (68 & t.$$.dirty[4]) && n(129, (p = !u && H < 1 && pt < 1)),
        (262144 & t.$$.dirty[3]) | (35 & t.$$.dirty[4]) && n(9, (h = s && !c && (!l || p))),
        (128 & t.$$.dirty[0]) | (2 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) &&
          n(16, (g = se && !!P && !d)),
        671088640 & t.$$.dirty[3] &&
          n(
            10,
            ($ = lt && i && { x: lt.x + i.x, y: lt.y + i.y, width: lt.width, height: lt.height })
          ),
        (1024 & t.$$.dirty[0]) | (1 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) &&
          n(17, (m = ae && !!$ && !d)),
        (67108864 & t.$$.dirty[2]) | (268435472 & t.$$.dirty[3]) && n(18, (f = ue && !!r && !Jt)),
        (512 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[2]) | (2101248 & t.$$.dirty[3]) &&
          h &&
          Jt &&
          !_ &&
          (clearTimeout(Sn), n(105, (Sn = setTimeout(wn, Jt)))),
        2101248 & t.$$.dirty[3] && _ && clearTimeout(Sn),
        512 & t.$$.dirty[0] && kn.set(h ? 1 : 0),
        268435456 & t.$$.dirty[3] && Cn.set(r),
        (2048 & t.$$.dirty[0]) | (128 & t.$$.dirty[4]) &&
          (gt
            ? _o(De, (ft.crop = { maskOpacity: 0.85, maskMarkupOpacity: 0.85 }), ft)
            : delete ft.crop),
        256 & t.$$.dirty[4] &&
          St &&
          (() => {
            const t = wt.filter((t) => !/^image\-selection\-guide/.test(t.id))
            _o(an, (wt = gt ? [...t, ...St] : t), wt)
          })(),
        24 & t.$$.dirty[4] && n(133, (x = !d && 'short' !== ct.verticalSpace)),
        512 & t.$$.dirty[4] && n(19, (b = x)),
        (8 & t.$$.dirty[0]) | (1073741824 & t.$$.dirty[2]) | (512 & t.$$.dirty[4]) &&
          n(134, (v = ie && re && x)),
        (536870912 & t.$$.dirty[2]) | (1024 & t.$$.dirty[4]) && n(20, (w = oe || v)),
        1024 & t.$$.dirty[4] && (v || n(5, (In = An))),
        32 & t.$$.dirty[0] && n(21, (S = { name: Pn, selected: In })),
        (16 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[2]) | (1024 & t.$$.dirty[4]) &&
          n(
            12,
            (k = [
              oe && { id: Pn + '-rotation', label: ye.cropLabelTabRotation },
              v && { id: Pn + '-zoom', label: ye.cropLabelTabZoom },
            ].filter(Boolean))
          ),
        4096 & t.$$.dirty[0] && n(22, (C = k.map((t) => t.id))),
        (64 & t.$$.dirty[0]) | (8 & t.$$.dirty[4]) &&
          En &&
          !En.children.length &&
          d &&
          En.dispatchEvent(new CustomEvent('measure', { detail: En.rect })),
        (2048 & t.$$.dirty[0]) | (2048 & t.$$.dirty[4]) && kt && Fn.set(gt ? 0 : 20),
        4096 & t.$$.dirty[4] && n(23, (R = Ct ? `transform: translateY(${Ct}px)` : void 0))
    }),
    [
      xe,
      Ut,
      qt,
      ie,
      ye,
      In,
      En,
      P,
      A,
      h,
      $,
      gt,
      k,
      Ln,
      o,
      rt,
      g,
      m,
      f,
      b,
      w,
      S,
      C,
      R,
      Mt,
      Tt,
      Et,
      At,
      It,
      Me,
      Re,
      Pe,
      Ee,
      Ae,
      Le,
      Fe,
      Be,
      ze,
      De,
      Oe,
      _e,
      We,
      Ve,
      Ne,
      Ue,
      Xe,
      je,
      Ye,
      Ge,
      Ze,
      qe,
      Ke,
      Qe,
      Je,
      tn,
      nn,
      on,
      rn,
      an,
      () => {
        ;(be = 'select'),
          _o(Re, (_ = !0), _),
          _o(Xe, (V = Rt(U)), V),
          (sn = H),
          (ln = $t(dt(z), sn)),
          (cn = $t(dt(X), sn))
      },
      ({ detail: t }) => {
        const { boundsLimited: e, boundsIntent: n } = un(t.direction, t.translation)
        _o(je, (Y = n), Y), _o(Ue, (U = e), U)
      },
      ({ detail: t }) => {
        const { boundsLimited: e } = un(t.direction, t.translation)
        _o(Re, (_ = !1), _),
          _o(je, (Y = void 0), Y),
          K(t.translation) && (_o(Ue, (U = e), U), Ce.write()),
          _o(Xe, (V = void 0), V)
      },
      () => {
        ;(be = 'rotate'), _o(Re, (_ = !0), _), _o(Ze, (J = Rt(P)), J)
      },
      (t) => {
        _o(We, (A = t), A)
      },
      (t) => {
        _o(Re, (_ = !1), _), _o(We, (A = t), A), Ce.write(), _o(Ze, (J = void 0), J)
      },
      () => {
        ;(be = 'pan'), (pn = void 0), _o(Re, (_ = !0), _), (dn = Rt(P))
      },
      ({ detail: t }) => hn(t),
      ({ detail: t }) => {
        _o(Re, (_ = !1), _),
          (K(t.translation) > 0 || 0 !== t.scalar) && (hn(t), Ce.write()),
          _o(Ge, (tt = void 0), tt),
          (dn = void 0)
      },
      ({ detail: t }) => {
        ;(pn = t.translation), _o(Re, (_ = !1), _)
      },
      gn,
      mn,
      fn,
      () => {
        ;(be = 'zoom'), _o(Re, (_ = !0), _), (dn = Rt(P))
      },
      (t) => {
        $n(t)
      },
      (t) => {
        $n(t), Ce.write(), _o(Re, (_ = !1), _), (dn = void 0)
      },
      () => {
        ;(be = 'zoom'), dn || ((yn = Rt(P)), _o(Re, (_ = !0), _))
      },
      ({ detail: t }) => {
        yn && xn(t)
      },
      ({ detail: t }) => {
        yn && (_o(Re, (_ = !1), _), xn(t), _o(Ge, (tt = void 0), tt), (yn = void 0), Ce.write())
      },
      (t) => {
        const e = ((t, e, n) => {
          const o = Gp(t)
          return nt(nt(o, e), n)
        })(t, rt, at)
        if (ce && !jt(U, e)) return
        ;(be = 'zoom'), _o(Re, (_ = !0), _), t.preventDefault(), t.stopPropagation()
        const n = sl(t),
          o = 1 + n / 100,
          i = Rt(P),
          r = 1 === Math.min(P.width / z.width, P.height / z.height)
        if (ee && O) {
          const t = we(P, E, A)
          if (ve() && t && n > 0 && l) {
            _o(Re, (_ = !1), _)
            const t = N(A) ? Pt({ height: E.width, width: E.height }) : Pt(E)
            if (Wt(i, t)) return
            if ((clearTimeout(bn), Wt(Ce.state.crop, t))) return
            return _o(qe, (P = t), P), void Ce.write()
          }
        }
        let a = Bt(P)
        if (le && n < 0 && !r) {
          const t = nt(G(e), U),
            n = Math.min(U.width / P.width, U.height / P.height),
            o = Dt(Rt(U), 1.1)
          a = jt(o, e) ? et(Rt(P), ot(t, 1 / n)) : a
        }
        let s = Dt(Rt(P), o, a)
        bt(st[1], s) || (s = Lt(Bt(s), st[1])),
          bt(s, st[0]) || (s = Lt(Bt(s), st[0])),
          Wt(i, s, xr)
            ? _o(Re, (_ = !1), _)
            : (_o(qe, (P = Kt(s, (t) => xr(t, 5))), P),
              _o(Re, (_ = !1), _),
              clearTimeout(bn),
              (bn = setTimeout(() => {
                Ce.write()
              }, 500)))
      },
      wn,
      kn,
      Cn,
      Mn,
      Tn,
      Fn,
      'crop',
      Ht,
      Qt,
      Jt,
      ee,
      ne,
      oe,
      re,
      ae,
      se,
      le,
      ce,
      ue,
      de,
      pe,
      he,
      ge,
      me,
      fe,
      $e,
      Sn,
      E,
      I,
      L,
      y,
      F,
      l,
      z,
      O,
      _,
      V,
      U,
      H,
      q,
      at,
      i,
      r,
      lt,
      a,
      s,
      c,
      u,
      d,
      ct,
      p,
      pt,
      ft,
      St,
      x,
      v,
      kt,
      Ct,
      function (e) {
        wi(t, e)
      },
      ({ detail: t }) => n(5, (In = t)),
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(En = t), n(6, En)
        })
      },
      (t) => Gp(t),
      function (t) {
        ;(Ln = t), n(13, Ln)
      },
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var Sh = {
  util: [
    'crop',
    class extends or {
      constructor(t) {
        super(),
          nr(
            this,
            t,
            wh,
            xh,
            Ao,
            {
              name: 85,
              isActive: 1,
              stores: 86,
              cropImageSelectionCornerStyle: 2,
              cropWillRenderImageSelectionGuides: 87,
              cropAutoCenterImageSelectionTimeout: 88,
              cropEnableZoomMatchImageAspectRatio: 89,
              cropEnableRotateMatchImageAspectRatio: 90,
              cropEnableRotationInput: 91,
              cropEnableZoom: 3,
              cropEnableZoomInput: 92,
              cropEnableImageSelection: 93,
              cropEnableInfoIndicator: 94,
              cropEnableZoomTowardsWheelPosition: 95,
              cropEnableLimitWheelInputToCropSelection: 96,
              cropEnableCenterImageSelection: 97,
              cropEnableButtonRotateLeft: 98,
              cropEnableButtonRotateRight: 99,
              cropEnableButtonFlipHorizontal: 100,
              cropEnableButtonFlipVertical: 101,
              cropSelectPresetOptions: 102,
              cropEnableSelectPreset: 103,
              cropEnableButtonToggleCropLimit: 104,
              locale: 4,
              tools: 0,
            },
            [-1, -1, -1, -1, -1, -1]
          )
      }
      get name() {
        return this.$$.ctx[85]
      }
      get isActive() {
        return this.$$.ctx[1]
      }
      set isActive(t) {
        this.$set({ isActive: t }), Li()
      }
      get stores() {
        return this.$$.ctx[86]
      }
      set stores(t) {
        this.$set({ stores: t }), Li()
      }
      get cropImageSelectionCornerStyle() {
        return this.$$.ctx[2]
      }
      set cropImageSelectionCornerStyle(t) {
        this.$set({ cropImageSelectionCornerStyle: t }), Li()
      }
      get cropWillRenderImageSelectionGuides() {
        return this.$$.ctx[87]
      }
      set cropWillRenderImageSelectionGuides(t) {
        this.$set({ cropWillRenderImageSelectionGuides: t }), Li()
      }
      get cropAutoCenterImageSelectionTimeout() {
        return this.$$.ctx[88]
      }
      set cropAutoCenterImageSelectionTimeout(t) {
        this.$set({ cropAutoCenterImageSelectionTimeout: t }), Li()
      }
      get cropEnableZoomMatchImageAspectRatio() {
        return this.$$.ctx[89]
      }
      set cropEnableZoomMatchImageAspectRatio(t) {
        this.$set({ cropEnableZoomMatchImageAspectRatio: t }), Li()
      }
      get cropEnableRotateMatchImageAspectRatio() {
        return this.$$.ctx[90]
      }
      set cropEnableRotateMatchImageAspectRatio(t) {
        this.$set({ cropEnableRotateMatchImageAspectRatio: t }), Li()
      }
      get cropEnableRotationInput() {
        return this.$$.ctx[91]
      }
      set cropEnableRotationInput(t) {
        this.$set({ cropEnableRotationInput: t }), Li()
      }
      get cropEnableZoom() {
        return this.$$.ctx[3]
      }
      set cropEnableZoom(t) {
        this.$set({ cropEnableZoom: t }), Li()
      }
      get cropEnableZoomInput() {
        return this.$$.ctx[92]
      }
      set cropEnableZoomInput(t) {
        this.$set({ cropEnableZoomInput: t }), Li()
      }
      get cropEnableImageSelection() {
        return this.$$.ctx[93]
      }
      set cropEnableImageSelection(t) {
        this.$set({ cropEnableImageSelection: t }), Li()
      }
      get cropEnableInfoIndicator() {
        return this.$$.ctx[94]
      }
      set cropEnableInfoIndicator(t) {
        this.$set({ cropEnableInfoIndicator: t }), Li()
      }
      get cropEnableZoomTowardsWheelPosition() {
        return this.$$.ctx[95]
      }
      set cropEnableZoomTowardsWheelPosition(t) {
        this.$set({ cropEnableZoomTowardsWheelPosition: t }), Li()
      }
      get cropEnableLimitWheelInputToCropSelection() {
        return this.$$.ctx[96]
      }
      set cropEnableLimitWheelInputToCropSelection(t) {
        this.$set({ cropEnableLimitWheelInputToCropSelection: t }), Li()
      }
      get cropEnableCenterImageSelection() {
        return this.$$.ctx[97]
      }
      set cropEnableCenterImageSelection(t) {
        this.$set({ cropEnableCenterImageSelection: t }), Li()
      }
      get cropEnableButtonRotateLeft() {
        return this.$$.ctx[98]
      }
      set cropEnableButtonRotateLeft(t) {
        this.$set({ cropEnableButtonRotateLeft: t }), Li()
      }
      get cropEnableButtonRotateRight() {
        return this.$$.ctx[99]
      }
      set cropEnableButtonRotateRight(t) {
        this.$set({ cropEnableButtonRotateRight: t }), Li()
      }
      get cropEnableButtonFlipHorizontal() {
        return this.$$.ctx[100]
      }
      set cropEnableButtonFlipHorizontal(t) {
        this.$set({ cropEnableButtonFlipHorizontal: t }), Li()
      }
      get cropEnableButtonFlipVertical() {
        return this.$$.ctx[101]
      }
      set cropEnableButtonFlipVertical(t) {
        this.$set({ cropEnableButtonFlipVertical: t }), Li()
      }
      get cropSelectPresetOptions() {
        return this.$$.ctx[102]
      }
      set cropSelectPresetOptions(t) {
        this.$set({ cropSelectPresetOptions: t }), Li()
      }
      get cropEnableSelectPreset() {
        return this.$$.ctx[103]
      }
      set cropEnableSelectPreset(t) {
        this.$set({ cropEnableSelectPreset: t }), Li()
      }
      get cropEnableButtonToggleCropLimit() {
        return this.$$.ctx[104]
      }
      set cropEnableButtonToggleCropLimit(t) {
        this.$set({ cropEnableButtonToggleCropLimit: t }), Li()
      }
      get locale() {
        return this.$$.ctx[4]
      }
      set locale(t) {
        this.$set({ locale: t }), Li()
      }
      get tools() {
        return this.$$.ctx[0]
      }
      set tools(t) {
        this.$set({ tools: t }), Li()
      }
    },
  ],
}
function kh(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[63],
    c = (Ue(t[63].label) ? t[63].label(t[2]) : t[63].label) + ''
  function u(...e) {
    return t[44](t[63], ...e)
  }
  const d = () => t[45](n, l),
    p = () => t[45](null, l)
  return {
    c() {
      ;(e = qo('div')),
        (n = qo('div')),
        (o = Jo()),
        (i = qo('span')),
        (r = Qo(c)),
        ii(n, 'class', Th),
        ii(e, 'slot', 'option'),
        ii(e, 'class', 'PinturaFilterOption')
    },
    m(t, l) {
      Go(t, e, l),
        Yo(e, n),
        d(),
        Yo(e, o),
        Yo(e, i),
        Yo(i, r),
        a || ((s = [ei(n, 'measure', u), Wo(Ua.call(null, n))]), (a = !0))
    },
    p(e, n) {
      l !== (t = e)[63] && (p(), (l = t[63]), d()),
        (4 & n[0]) | (2 & n[2]) &&
          c !== (c = (Ue(t[63].label) ? t[63].label(t[2]) : t[63].label) + '') &&
          ai(r, c)
    },
    d(t) {
      t && Zo(e), p(), (a = !1), Po(s)
    },
  }
}
function Ch(t) {
  let e, n
  return (
    (e = new dc({
      props: {
        locale: t[2],
        layout: 'row',
        options: t[3],
        selectedIndex: t[10],
        onchange: t[26],
        $$slots: {
          option: [kh, ({ option: t }) => ({ 63: t }), ({ option: t }) => [0, 0, t ? 2 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        4 & n[0] && (o.locale = t[2]),
          8 & n[0] && (o.options = t[3]),
          1024 & n[0] && (o.selectedIndex = t[10]),
          (516 & n[0]) | (6 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Mh(t) {
  let e, n, o, i, r, a, s, l
  function c(e) {
    t[47](e)
  }
  function u(e) {
    t[48](e)
  }
  function d(e) {
    t[49](e)
  }
  let p = {
    elasticity: t[15] * t[16],
    onscroll: t[46],
    $$slots: { default: [Ch] },
    $$scope: { ctx: t },
  }
  return (
    void 0 !== t[4] && (p.maskFeatherStartOpacity = t[4]),
    void 0 !== t[5] && (p.maskFeatherEndOpacity = t[5]),
    void 0 !== t[6] && (p.maskFeatherSize = t[6]),
    (n = new ul({ props: p })),
    ki.push(() => Ki(n, 'maskFeatherStartOpacity', c)),
    ki.push(() => Ki(n, 'maskFeatherEndOpacity', u)),
    ki.push(() => Ki(n, 'maskFeatherSize', d)),
    n.$on('measure', t[50]),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'slot', 'footer'), ii(e, 'style', t[11])
      },
      m(o, i) {
        Go(o, e, i), Ji(n, e, null), (a = !0), s || ((l = ei(e, 'transitionend', t[24])), (s = !0))
      },
      p(t, s) {
        const l = {}
        128 & s[0] && (l.onscroll = t[46]),
          (1548 & s[0]) | (4 & s[2]) && (l.$$scope = { dirty: s, ctx: t }),
          !o && 16 & s[0] && ((o = !0), (l.maskFeatherStartOpacity = t[4]), Ei(() => (o = !1))),
          !i && 32 & s[0] && ((i = !0), (l.maskFeatherEndOpacity = t[5]), Ei(() => (i = !1))),
          !r && 64 & s[0] && ((r = !0), (l.maskFeatherSize = t[6]), Ei(() => (r = !1))),
          n.$set(l),
          (!a || 2048 & s[0]) && ii(e, 'style', t[11])
      },
      i(t) {
        a || (Vi(n.$$.fragment, t), (a = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (a = !1)
      },
      d(t) {
        t && Zo(e), tr(n), (s = !1), l()
      },
    }
  )
}
function Rh(t) {
  let e, n
  return (
    (e = new Sp({ props: { $$slots: { footer: [Mh] }, $$scope: { ctx: t } } })),
    e.$on('measure', t[51]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        ;(4092 & n[0]) | (4 & n[2]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
let Th = 'PinturaFilterPreview'
function Ph(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y = ko,
    x = () => (y(), (y = Io(w, (t) => n(37, (d = t)))), w),
    b = ko,
    v = () => (b(), (b = Io(S, (t) => n(41, (m = t)))), S)
  t.$$.on_destroy.push(() => y()), t.$$.on_destroy.push(() => b())
  let { isActive: w } = e
  x()
  let { isActiveFraction: S } = e
  v()
  let { stores: k } = e,
    { locale: C } = e,
    { filterFunctions: M } = e,
    { filterOptions: R } = e
  const {
    history: T,
    imagePreviews: P,
    stageRect: E,
    utilRect: A,
    animation: I,
    elasticityMultiplier: L,
    scrollElasticity: F,
    imageCropRect: B,
    imageSize: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
    imageGamma: W,
    imageColorMatrix: V,
  } = k
  Fo(t, E, (t) => n(39, (h = t))),
    Fo(t, A, (t) => n(38, (p = t))),
    Fo(t, I, (t) => n(36, (u = t))),
    Fo(t, W, (t) => n(40, (g = t))),
    Fo(t, V, (t) => n(33, (a = t)))
  const N = ar({})
  Fo(t, N, (t) => n(34, (s = t)))
  const U = (t, e) => _o(N, (s[t.value] = e), s),
    H = sr(N, (t) => {
      if (!t[void 0]) return
      const e = t[void 0]
      return l && ft(l, e) ? l : dt(e)
    })
  Fo(t, H, (t) => n(52, (l = t)))
  const Y = sr([w, H, B, z, D, O, _], ([t, e, n, o, i, r, a], s) => {
    if (!t || !e || !o) return c
    const l = Pt(o),
      u = Bt(l),
      d = Cr(o, n, i),
      p = Bt(d),
      h = nt(G(u), p),
      g = Z(G(h)),
      m = Math.max(e.width / n.width, e.height / n.height)
    s({
      origin: g,
      translation: h,
      rotation: { x: a ? Math.PI : 0, y: r ? Math.PI : 0, z: i },
      perspective: X(),
      scale: m,
    })
  })
  Fo(t, Y, (t) => n(35, (c = t)))
  const q = Ia(u ? 20 : 0)
  let K
  Fo(t, q, (t) => n(42, (f = t)))
  const Q = {}
  let J,
    tt,
    et,
    ot,
    it,
    rt = { x: 0, y: 0 }
  const at = ar([])
  Fo(t, at, (t) => n(43, ($ = t)))
  const st = (t) => {
    const e = { ...t, offset: { ...t.offset }, mask: { ...t.mask } }
    return (e.opacity = m), (e.offset.y += f), (e.mask.y += f), e
  }
  yi(() => {
    P.set([])
  })
  return (
    (t.$$set = (t) => {
      'isActive' in t && x(n(0, (w = t.isActive))),
        'isActiveFraction' in t && v(n(1, (S = t.isActiveFraction))),
        'stores' in t && n(28, (k = t.stores)),
        'locale' in t && n(2, (C = t.locale)),
        'filterFunctions' in t && n(29, (M = t.filterFunctions)),
        'filterOptions' in t && n(3, (R = t.filterOptions))
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && n(32, (o = zl(R))),
        6 & t.$$.dirty[1] &&
          n(
            10,
            (i = ((t, e) => {
              if (!t || !t.filter || !e) return 0
              const n = t.filter
              return e.findIndex(([t]) => {
                if (!M[t]) return !1
                const e = M[t]()
                return Ar(e, n)
              })
            })(a, o))
          ),
        96 & t.$$.dirty[1] && u && q.set(d ? 0 : 20),
        448 & t.$$.dirty[1] && d && p && h)
      ) {
        const t = h.y + h.height + p.y
        n(31, (it = { x: h.x - p.x, y: t }))
      }
      if ((1610613232 & t.$$.dirty[0]) | (543 & t.$$.dirty[1]) && c && it && rt && ot && K) {
        const t = it.x + ot.x + rt.x,
          e = it.y,
          n = ot.x + it.x,
          i = n + ot.width
        at.set(
          o
            .map(([o], r) => {
              const l = s[o],
                u = rt.x + l.x,
                d = u + l.width
              if (d < 0 || u > ot.width) return !1
              const p = t + l.x,
                h = e + l.y,
                m = ((t) => ({
                  origin: G(t.origin),
                  translation: G(t.translation),
                  rotation: { ...t.rotation },
                  perspective: G(t.perspective),
                  scale: t.scale,
                }))(c)
              m.offset = j(0.5 * l.width + p, 0.5 * l.height + h)
              ;(m.maskOpacity = 1),
                (m.mask = Ft(p + 0, h, l.width + 0, l.height)),
                (m.maskFeather = [1, 0, 1, 0, 1, i, 1, i]),
                u < et &&
                  J < 1 &&
                  ((m.maskFeather[0] = J),
                  (m.maskFeather[1] = n),
                  (m.maskFeather[2] = 1),
                  (m.maskFeather[3] = n + et)),
                d > ot.width - et &&
                  tt < 1 &&
                  ((m.maskFeather[4] = tt),
                  (m.maskFeather[5] = i - et),
                  (m.maskFeather[6] = 1),
                  (m.maskFeather[7] = i)),
                (m.maskCornerRadius = K[o])
              let f =
                (a &&
                  Object.keys(a)
                    .filter((t) => 'filter' != t)
                    .map((t) => a[t])) ||
                []
              return (
                Ue(M[o]) && f.push(M[o]()),
                (m.colorMatrix = f.length ? So(f) : void 0),
                (m.gamma = g),
                m
              )
            })
            .filter(Boolean)
        )
      }
      7168 & t.$$.dirty[1] && (m > 0 && $ ? P.set($.map(st)) : P.set([])),
        2048 & t.$$.dirty[1] && n(11, (r = f ? `transform: translateY(${f}px)` : void 0))
    }),
    [
      w,
      S,
      C,
      R,
      J,
      tt,
      et,
      rt,
      ot,
      Q,
      i,
      r,
      E,
      A,
      I,
      L,
      F,
      W,
      V,
      N,
      U,
      H,
      Y,
      q,
      (t) => {
        t.target.className === Th &&
          n(
            30,
            (K = Object.keys(Q).reduce((t, e) => {
              const n = Q[e],
                o = getComputedStyle(n),
                i = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                  .map((t) => o.getPropertyValue(`border-${t}-radius`))
                  .map(al)
                  .map((t) => 1.25 * t)
              return (t[e] = i), t
            }, {}))
          )
      },
      at,
      ({ value: t }) => {
        _o(V, (a = { ...a, filter: Ue(M[t]) ? M[t]() : void 0 }), a), T.write()
      },
      'filter',
      k,
      M,
      K,
      it,
      o,
      a,
      s,
      c,
      u,
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      (t, e) => U(t, e.detail),
      function (t, e) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(Q[e.value] = t), n(9, Q)
        })
      },
      (t) => n(7, (rt = t)),
      function (t) {
        ;(J = t), n(4, J)
      },
      function (t) {
        ;(tt = t), n(5, tt)
      },
      function (t) {
        ;(et = t), n(6, et)
      },
      (t) => n(8, (ot = t.detail)),
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var Eh = {
  util: [
    'filter',
    class extends or {
      constructor(t) {
        super(),
          nr(
            this,
            t,
            Ph,
            Rh,
            Ao,
            {
              name: 27,
              isActive: 0,
              isActiveFraction: 1,
              stores: 28,
              locale: 2,
              filterFunctions: 29,
              filterOptions: 3,
            },
            [-1, -1, -1]
          )
      }
      get name() {
        return this.$$.ctx[27]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(t) {
        this.$set({ isActive: t }), Li()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Li()
      }
      get stores() {
        return this.$$.ctx[28]
      }
      set stores(t) {
        this.$set({ stores: t }), Li()
      }
      get locale() {
        return this.$$.ctx[2]
      }
      set locale(t) {
        this.$set({ locale: t }), Li()
      }
      get filterFunctions() {
        return this.$$.ctx[29]
      }
      set filterFunctions(t) {
        this.$set({ filterFunctions: t }), Li()
      }
      get filterOptions() {
        return this.$$.ctx[3]
      }
      set filterOptions(t) {
        this.$set({ filterOptions: t }), Li()
      }
    },
  ],
}
function Ah(t) {
  let e,
    n,
    o = t[37].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      64 & e[1] && o !== (o = t[37].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Ih(t) {
  let e, n
  const o = [{ class: 'PinturaControlList' }, { tabs: t[1] }, t[3]]
  let i = {
    $$slots: { default: [Ah, ({ tab: t }) => ({ 37: t }), ({ tab: t }) => [0, t ? 64 : 0]] },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < o.length; t += 1) i = Mo(i, o[t])
  return (
    (e = new Ts({ props: i })),
    e.$on('select', t[22]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const i = 10 & n[0] ? Zi(o, [o[0], 2 & n[0] && { tabs: t[1] }, 8 & n[0] && qi(t[3])]) : {}
        192 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Lh(t) {
  let e, n
  const o = [t[5][t[36]]]
  let i = {}
  for (let t = 0; t < o.length; t += 1) i = Mo(i, o[t])
  return (
    (e = new Tp({ props: i })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const i = (32 & n[0]) | (32 & n[1]) ? Zi(o, [qi(t[5][t[36]])]) : {}
        e.$set(i)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Fh(t) {
  let e, n, o, i, r
  n = new ul({
    props: {
      elasticity: t[9] * t[8],
      class: 'PinturaControlListScroller',
      $$slots: { default: [Ih] },
      $$scope: { ctx: t },
    },
  })
  const a = [
    { class: 'PinturaControlPanels' },
    { panelClass: 'PinturaControlPanel' },
    { panels: t[4] },
    t[3],
  ]
  let s = {
    $$slots: { default: [Lh, ({ panel: t }) => ({ 36: t }), ({ panel: t }) => [0, t ? 32 : 0]] },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < a.length; t += 1) s = Mo(s, a[t])
  return (
    (i = new Ws({ props: s })),
    {
      c() {
        ;(e = qo('div')),
          Qi(n.$$.fragment),
          (o = Jo()),
          Qi(i.$$.fragment),
          ii(e, 'slot', 'footer'),
          ii(e, 'style', t[6])
      },
      m(t, a) {
        Go(t, e, a), Ji(n, e, null), Yo(e, o), Ji(i, e, null), (r = !0)
      },
      p(t, o) {
        const s = {}
        ;(14 & o[0]) | (128 & o[1]) && (s.$$scope = { dirty: o, ctx: t }), n.$set(s)
        const l =
          24 & o[0] ? Zi(a, [a[0], a[1], 16 & o[0] && { panels: t[4] }, 8 & o[0] && qi(t[3])]) : {}
        ;(32 & o[0]) | (160 & o[1]) && (l.$$scope = { dirty: o, ctx: t }),
          i.$set(l),
          (!r || 64 & o[0]) && ii(e, 'style', t[6])
      },
      i(t) {
        r || (Vi(n.$$.fragment, t), Vi(i.$$.fragment, t), (r = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), Ni(i.$$.fragment, t), (r = !1)
      },
      d(t) {
        t && Zo(e), tr(n), tr(i)
      },
    }
  )
}
function Bh(t) {
  let e, n
  return (
    (e = new Sp({ props: { $$slots: { footer: [Fh] }, $$scope: { ctx: t } } })),
    e.$on('measure', t[23]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        ;(126 & n[0]) | (128 & n[1]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function zh(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = ko,
    g = () => (h(), (h = Io(f, (t) => n(20, (d = t)))), f)
  t.$$.on_destroy.push(() => h())
  let { stores: m } = e,
    { isActive: f } = e
  g()
  let { locale: $ = {} } = e,
    { finetuneControlConfiguration: y } = e,
    { finetuneOptions: x } = e
  const {
    history: b,
    animation: v,
    scrollElasticity: w,
    elasticityMultiplier: S,
    rangeInputElasticity: k,
    imageColorMatrix: C,
    imageConvolutionMatrix: R,
    imageGamma: T,
    imageVignette: P,
    imageNoise: E,
  } = m
  Fo(t, v, (t) => n(19, (u = t)))
  const A = {
      imageColorMatrix: C,
      imageConvolutionMatrix: R,
      imageGamma: T,
      imageVignette: P,
      imageNoise: E,
    },
    I = 'finetune-' + M(),
    L = ar({})
  Fo(t, L, (t) => n(18, (c = t)))
  const F = ar({})
  Fo(t, F, (t) => n(5, (l = t)))
  let B = []
  const z = Ia(u ? 20 : 0)
  Fo(t, z, (t) => n(21, (p = t)))
  return (
    (t.$$set = (t) => {
      'stores' in t && n(14, (m = t.stores)),
        'isActive' in t && g(n(0, (f = t.isActive))),
        'locale' in t && n(15, ($ = t.locale)),
        'finetuneControlConfiguration' in t && n(16, (y = t.finetuneControlConfiguration)),
        'finetuneOptions' in t && n(17, (x = t.finetuneOptions))
    }),
    (t.$$.update = () => {
      var e
      163840 & t.$$.dirty[0] &&
        n(1, (o = x ? x.map(([t, e]) => ({ id: t, label: Ue(e) ? e($) : e })) : [])),
        2 & t.$$.dirty[0] && n(2, (i = o.length && o[0].id)),
        4 & t.$$.dirty[0] && n(3, (r = { name: I, selected: i })),
        2 & t.$$.dirty[0] && n(4, (a = o.map((t) => t.id))),
        65536 & t.$$.dirty[0] &&
          y &&
          ((e = y),
          B && B.forEach((t) => t()),
          (B = a.map((t) => {
            const { getStore: n, getValue: o = O } = e[t]
            return n(A).subscribe((e) => {
              const n = null != e ? o(e) : e
              _o(L, (c = { ...c, [t]: n }), c)
            })
          }))),
        327680 & t.$$.dirty[0] &&
          y &&
          c &&
          _o(
            F,
            (l = Object.keys(c).reduce((t, e) => {
              const {
                  base: n,
                  min: o,
                  max: i,
                  getLabel: r,
                  getStore: a,
                  setValue: s = (t, e) => t.set(e),
                } = y[e],
                l = a(A),
                u = null != c[e] ? c[e] : n
              return (
                (t[e] = {
                  base: n,
                  min: o,
                  max: i,
                  value: u,
                  valueLabel: r ? r(u, o, i, i - o) : Math.round(100 * u),
                  oninputmove: (t) => {
                    s(l, t)
                  },
                  oninputend: (t) => {
                    s(l, t), b.write()
                  },
                  elasticity: S * k,
                  labelReset: $.labelReset,
                }),
                t
              )
            }, {})),
            l
          ),
        1572864 & t.$$.dirty[0] && u && z.set(d ? 0 : 20),
        2097152 & t.$$.dirty[0] && n(6, (s = p ? `transform: translateY(${p}px)` : void 0))
    }),
    [
      f,
      o,
      i,
      r,
      a,
      l,
      s,
      v,
      w,
      S,
      L,
      F,
      z,
      'finetune',
      m,
      $,
      y,
      x,
      c,
      u,
      d,
      p,
      ({ detail: t }) => n(2, (i = t)),
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var Dh = {
  util: [
    'finetune',
    class extends or {
      constructor(t) {
        super(),
          nr(
            this,
            t,
            zh,
            Bh,
            Ao,
            {
              name: 13,
              stores: 14,
              isActive: 0,
              locale: 15,
              finetuneControlConfiguration: 16,
              finetuneOptions: 17,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[13]
      }
      get stores() {
        return this.$$.ctx[14]
      }
      set stores(t) {
        this.$set({ stores: t }), Li()
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(t) {
        this.$set({ isActive: t }), Li()
      }
      get locale() {
        return this.$$.ctx[15]
      }
      set locale(t) {
        this.$set({ locale: t }), Li()
      }
      get finetuneControlConfiguration() {
        return this.$$.ctx[16]
      }
      set finetuneControlConfiguration(t) {
        this.$set({ finetuneControlConfiguration: t }), Li()
      }
      get finetuneOptions() {
        return this.$$.ctx[17]
      }
      set finetuneOptions(t) {
        this.$set({ finetuneOptions: t }), Li()
      }
    },
  ],
}
function Oh(t, e, n) {
  const o = t.slice()
  return (
    (o[47] = e[n].key),
    (o[48] = e[n].index),
    (o[49] = e[n].translate),
    (o[50] = e[n].scale),
    (o[14] = e[n].rotate),
    (o[51] = e[n].dir),
    (o[52] = e[n].center),
    (o[53] = e[n].type),
    o
  )
}
function _h(t) {
  let e, n
  return {
    c() {
      ;(e = qo('div')),
        ii(e, 'class', 'PinturaShapeManipulator'),
        ii(e, 'data-control', 'point'),
        ii(
          e,
          'style',
          (n = `pointer-events:none;transform: translate3d(${t[52].x}px, ${t[52].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`)
        )
    },
    m(t, n) {
      Go(t, e, n)
    },
    p(t, o) {
      104 & o[0] &&
        n !==
          (n = `pointer-events:none;transform: translate3d(${t[52].x}px, ${t[52].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`) &&
        ii(e, 'style', n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Wh(t, e) {
  let n, o, i, r, a, s, l, c, u
  function d(...t) {
    return e[18](e[48], ...t)
  }
  let p = 'edge' === e[53] && 'both' !== e[2] && _h(e)
  return {
    key: t,
    first: null,
    c() {
      ;(n = qo('div')),
        (s = Jo()),
        p && p.c(),
        (l = ti()),
        ii(n, 'role', 'button'),
        ii(n, 'aria-label', (o = `Drag ${e[53]} ${e[47]}`)),
        ii(n, 'tabindex', (i = 'edge' === e[53] ? -1 : 0)),
        ii(n, 'class', 'PinturaShapeManipulator'),
        ii(n, 'data-control', (r = e[53])),
        ii(
          n,
          'style',
          (a = `cursor: ${e[51] ? e[51] + '-resize' : 'move'}; transform: translate3d(${
            e[49].x
          }px, ${e[49].y}px, 0) rotate(${e[14]}rad) scale(${'point' === e[53] ? e[5] : e[50].x}, ${
            'point' === e[53] ? e[5] : e[50].y
          }); opacity: ${e[6]}`)
        ),
        (this.first = n)
    },
    m(t, o) {
      Go(t, n, o),
        Go(t, s, o),
        p && p.m(t, o),
        Go(t, l, o),
        c ||
          ((u = [
            ei(n, 'keydown', e[7]),
            ei(n, 'keyup', e[8]),
            ei(n, 'nudge', d),
            Wo(ol.call(null, n)),
            ei(n, 'interactionstart', function () {
              Eo(e[11]('start', e[48])) && e[11]('start', e[48]).apply(this, arguments)
            }),
            ei(n, 'interactionupdate', function () {
              Eo(e[11]('move', e[48])) && e[11]('move', e[48]).apply(this, arguments)
            }),
            ei(n, 'interactionend', function () {
              Eo(e[11]('end', e[48])) && e[11]('end', e[48]).apply(this, arguments)
            }),
            Wo(nl.call(null, n)),
          ]),
          (c = !0))
    },
    p(t, s) {
      ;(e = t),
        8 & s[0] && o !== (o = `Drag ${e[53]} ${e[47]}`) && ii(n, 'aria-label', o),
        8 & s[0] && i !== (i = 'edge' === e[53] ? -1 : 0) && ii(n, 'tabindex', i),
        8 & s[0] && r !== (r = e[53]) && ii(n, 'data-control', r),
        104 & s[0] &&
          a !==
            (a = `cursor: ${e[51] ? e[51] + '-resize' : 'move'}; transform: translate3d(${
              e[49].x
            }px, ${e[49].y}px, 0) rotate(${e[14]}rad) scale(${
              'point' === e[53] ? e[5] : e[50].x
            }, ${'point' === e[53] ? e[5] : e[50].y}); opacity: ${e[6]}`) &&
          ii(n, 'style', a),
        'edge' === e[53] && 'both' !== e[2]
          ? p
            ? p.p(e, s)
            : ((p = _h(e)), p.c(), p.m(l.parentNode, l))
          : p && (p.d(1), (p = null))
    },
    d(t) {
      t && Zo(n), t && Zo(s), p && p.d(t), t && Zo(l), (c = !1), Po(u)
    },
  }
}
function Vh(t) {
  let e, n, o, i
  return {
    c() {
      ;(e = qo('div')),
        ii(e, 'role', 'button'),
        ii(e, 'aria-label', 'Drag rotator'),
        ii(e, 'tabindex', '0'),
        ii(e, 'class', 'PinturaShapeManipulator'),
        ii(e, 'data-control', 'rotate'),
        ii(
          e,
          'style',
          (n = `transform: translate3d(${t[0].x}px, ${t[0].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`)
        )
    },
    m(n, r) {
      Go(n, e, r),
        o ||
          ((i = [
            ei(e, 'keydown', t[7]),
            ei(e, 'keyup', t[8]),
            ei(e, 'nudge', t[13]),
            Wo(ol.call(null, e)),
            ei(e, 'interactionstart', t[14]('start')),
            ei(e, 'interactionupdate', t[14]('move')),
            ei(e, 'interactionend', t[14]('end')),
            Wo(nl.call(null, e)),
          ]),
          (o = !0))
    },
    p(t, o) {
      97 & o[0] &&
        n !==
          (n = `transform: translate3d(${t[0].x}px, ${t[0].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`) &&
        ii(e, 'style', n)
    },
    d(t) {
      t && Zo(e), (o = !1), Po(i)
    },
  }
}
function Nh(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[3]
  const a = (t) => t[47]
  for (let e = 0; e < r.length; e += 1) {
    let n = Oh(t, r, e),
      s = a(n)
    i.set(s, (o[e] = Wh(s, n)))
  }
  let s = t[1] && t[4] && Vh(t)
  return {
    c() {
      for (let t = 0; t < o.length; t += 1) o[t].c()
      ;(e = Jo()), s && s.c(), (n = ti())
    },
    m(t, i) {
      for (let e = 0; e < o.length; e += 1) o[e].m(t, i)
      Go(t, e, i), s && s.m(t, i), Go(t, n, i)
    },
    p(t, l) {
      6636 & l[0] && ((r = t[3]), (o = Gi(o, l, a, 1, t, r, i, e.parentNode, ji, Wh, e, Oh))),
        t[1] && t[4]
          ? s
            ? s.p(t, l)
            : ((s = Vh(t)), s.c(), s.m(n.parentNode, n))
          : s && (s.d(1), (s = null))
    },
    i: ko,
    o: ko,
    d(t) {
      for (let e = 0; e < o.length; e += 1) o[e].d(t)
      t && Zo(e), s && s.d(t), t && Zo(n)
    },
  }
}
function Uh(t, e, n) {
  let o, i, r, a, s
  const l = xi(),
    c = 0.5 * V,
    u = W - c,
    d = W + c,
    p = -W,
    h = p - c,
    g = p + c,
    m = _ - c,
    f = -_ + c,
    $ = c,
    y = -c,
    x = W - V,
    b = x - c,
    v = x + c,
    S = _ - V,
    k = S - c,
    C = S + c,
    M = p - V,
    R = M + c,
    T = M - c,
    P = p + V,
    E = P + c,
    A = P - c
  let { points: I = [] } = e,
    { rotatorPoint: L } = e,
    { visible: F = !1 } = e,
    { enableResizing: B = !0 } = e,
    { enableRotating: z = !0 } = e,
    D = !1
  const O = Ia(0.5, { precision: 1e-4, stiffness: 0.3, damping: 0.7 })
  Fo(t, O, (t) => n(5, (a = t)))
  const N = Ia(0, { precision: 0.001 })
  Fo(t, N, (t) => n(6, (s = t)))
  const U = (t) => {
      let e = ''
      return (
        ((t <= d && t >= u) || (t >= h && t <= g)) && (e = 'ns'),
        (t <= f || t >= m || (t >= y && t <= $)) && (e = 'ew'),
        ((t >= k && t <= C) || (t <= E && t >= A)) && (e = 'nesw'),
        ((t >= b && t <= v) || (t <= R && t >= T)) && (e = 'nwse'),
        e
      )
    },
    H = (t, e) => {
      l('resizestart', { indexes: t, translation: X() }),
        l('resizemove', { indexes: t, translation: e }),
        l('resizeend', { indexes: t, translation: X() })
    }
  return (
    (t.$$set = (t) => {
      'points' in t && n(15, (I = t.points)),
        'rotatorPoint' in t && n(0, (L = t.rotatorPoint)),
        'visible' in t && n(16, (F = t.visible)),
        'enableResizing' in t && n(17, (B = t.enableResizing)),
        'enableRotating' in t && n(1, (z = t.enableRotating))
    }),
    (t.$$.update = () => {
      65536 & t.$$.dirty[0] && O.set(F ? 1 : 0.5),
        65536 & t.$$.dirty[0] && N.set(F ? 1 : 0),
        131072 & t.$$.dirty[0] && n(2, (o = !!B && (w(B) ? B : 'both'))),
        32772 & t.$$.dirty[0] &&
          n(
            3,
            (i =
              (o &&
                ((t, e) => {
                  let n = 0
                  const o = st(t),
                    i = [],
                    r = t.length,
                    a = 2 === r,
                    s = 'both' !== e
                  for (; n < r; n++) {
                    const l = t[n - 1] || t[t.length - 1],
                      c = t[n],
                      u = t[n + 1] || t[0],
                      d = Math.atan2(u.y - c.y, u.x - c.x)
                    if (!s) {
                      const t = Q(j(l.x - c.x, l.y - c.y)),
                        e = Q(j(u.x - c.x, u.y - c.y)),
                        o = j(t.x + e.x, t.y + e.y)
                      i.push({
                        index: [n],
                        key: 'point-' + n,
                        type: 'point',
                        scale: { x: 1, y: 1 },
                        translate: { x: c.x, y: c.y },
                        angle: void 0,
                        rotate: a ? 0 : d,
                        center: c,
                        dir: a ? void 0 : U(Math.atan2(o.y, o.x)),
                      })
                    }
                    if (a) continue
                    const p = j(c.x + 0.5 * (u.x - c.x), c.y + 0.5 * (u.y - c.y))
                    ;('horizontal' === e && n % 2 == 0) ||
                      ('vertical' === e && n % 2 != 0) ||
                      i.push({
                        index: [n, n + 1 === r ? 0 : n + 1],
                        key: 'edge-' + n,
                        type: 'edge',
                        scale: { x: at(c, u), y: 1 },
                        translate: { x: c.x, y: c.y },
                        angle: d,
                        rotate: d,
                        center: p,
                        dir: U(Math.atan2(o.y - p.y, o.x - p.x)),
                      })
                  }
                  return i
                })(I, o)) ||
              [])
          ),
        32768 & t.$$.dirty[0] && n(4, (r = I.length > 2))
    }),
    [
      L,
      z,
      o,
      i,
      r,
      a,
      s,
      (t) => (D = t.shiftKey),
      (t) => (D = !1),
      O,
      N,
      (t, e) =>
        ({ detail: n }) => {
          const o = n && n.translation ? n.translation : j(0, 0)
          l('resize' + t, { indexes: e, translation: o, shiftKey: D })
        },
      H,
      ({ detail: t }) => {
        l('rotatestart', { translation: X() }),
          l('rotatemove', { translation: t }),
          l('rotateend', { translation: X() })
      },
      (t) =>
        ({ detail: e }) => {
          const n = e && e.translation ? e.translation : j(0, 0)
          l('rotate' + t, { translation: n, shiftKey: D })
        },
      I,
      F,
      B,
      (t, { detail: e }) => H(t, e),
    ]
  )
}
class Hh extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        Uh,
        Nh,
        Ao,
        { points: 15, rotatorPoint: 0, visible: 16, enableResizing: 17, enableRotating: 1 },
        [-1, -1]
      )
  }
}
var Xh = (t, e) => {
  const n = Gp(t)
  return nt(n, e)
}
let jh = null
var Yh = (t) => {
  if ((null === jh && (jh = c() && 'visualViewport' in window), !jh)) return !1
  const e = visualViewport.height,
    n = () => {
      t(visualViewport.height < e ? 'visible' : 'hidden')
    }
  return (
    visualViewport.addEventListener('resize', n),
    () => visualViewport.removeEventListener('resize', n)
  )
}
function Gh(t) {
  let e, n, o, i, r, a, s, l, c, u
  o = new Js({ props: { onclick: t[1], label: t[5], icon: t[7], hideLabel: !t[6] } })
  const d = t[20].default,
    p = Bo(d, t, t[19], null)
  return (
    (s = new Js({
      props: {
        onclick: t[0],
        label: t[2],
        icon: t[4],
        hideLabel: !t[3],
        class: 'PinturaInputFormButtonConfirm',
      },
    })),
    {
      c() {
        ;(e = qo('div')),
          (n = qo('div')),
          Qi(o.$$.fragment),
          (i = Jo()),
          (r = qo('div')),
          p && p.c(),
          (a = Jo()),
          Qi(s.$$.fragment),
          ii(r, 'class', 'PinturaInputFormFields'),
          ii(n, 'class', 'PinturaInputFormInner'),
          ii(e, 'class', 'PinturaInputForm'),
          ii(e, 'style', t[9])
      },
      m(d, h) {
        Go(d, e, h),
          Yo(e, n),
          Ji(o, n, null),
          Yo(n, i),
          Yo(n, r),
          p && p.m(r, null),
          Yo(n, a),
          Ji(s, n, null),
          t[21](e),
          (l = !0),
          c ||
            ((u = [
              ei(e, 'focusin', t[10]),
              ei(e, 'focusout', t[11]),
              ei(e, 'measure', t[12]),
              Wo(Ua.call(null, e)),
            ]),
            (c = !0))
      },
      p(t, n) {
        const i = {}
        2 & n[0] && (i.onclick = t[1]),
          32 & n[0] && (i.label = t[5]),
          128 & n[0] && (i.icon = t[7]),
          64 & n[0] && (i.hideLabel = !t[6]),
          o.$set(i),
          p && p.p && 524288 & n[0] && Do(p, d, t, t[19], n, null, null)
        const r = {}
        1 & n[0] && (r.onclick = t[0]),
          4 & n[0] && (r.label = t[2]),
          16 & n[0] && (r.icon = t[4]),
          8 & n[0] && (r.hideLabel = !t[3]),
          s.$set(r),
          (!l || 512 & n[0]) && ii(e, 'style', t[9])
      },
      i(t) {
        l || (Vi(o.$$.fragment, t), Vi(p, t), Vi(s.$$.fragment, t), (l = !0))
      },
      o(t) {
        Ni(o.$$.fragment, t), Ni(p, t), Ni(s.$$.fragment, t), (l = !1)
      },
      d(n) {
        n && Zo(e), tr(o), p && p.d(n), tr(s), t[21](null), (c = !1), Po(u)
      },
    }
  )
}
function Zh(t, e, n) {
  let o,
    i,
    r,
    a,
    { $$slots: s = {}, $$scope: l } = e,
    { onconfirm: c } = e,
    { oncancel: u } = e,
    { autoFocus: d = !0 } = e,
    { autoPositionCursor: p = !0 } = e,
    { labelConfirm: h } = e,
    { labelConfirmShow: g = !0 } = e,
    { iconConfirm: m } = e,
    { labelCancel: f } = e,
    { labelCancelShow: $ = !1 } = e,
    { iconCancel: y } = e,
    { panelOffset: x = X() } = e,
    b = !1,
    v = void 0,
    w = void 0,
    S = '',
    k = 0
  const C = () => {
      a.querySelector('input, textarea').focus()
    },
    M = () => {
      ;(b = !0),
        T || (!Ce() && !Lr()) || n(16, (S = 'top:1em;bottom:auto;')),
        Ce() &&
          ((t) => {
            let e
            const n = (t) => (e = t.touches[0].screenY),
              o = (t) => {
                const n = t.touches[0].screenY,
                  o = t.target
                ;/textarea/i.test(o.nodeName)
                  ? (n > e
                      ? 0 == o.scrollTop && t.preventDefault()
                      : n < e
                      ? o.scrollTop + o.offsetHeight == o.scrollHeight && t.preventDefault()
                      : t.preventDefault(),
                    (e = n))
                  : t.preventDefault()
              }
            t.addEventListener('touchstart', n), t.addEventListener('touchmove', o)
          })(a),
        n(17, (k = 1))
    }
  let R
  const T = Yh((t) => {
    i &&
      ('hidden' !== t || b
        ? (clearTimeout(w),
          (w = void 0),
          n(16, (S = `top:${visualViewport.height - v - x.y}px`)),
          'visible' === t
            ? (n(8, (a.dataset.layout = 'stick'), a), C(), M())
            : ((b = !1), n(17, (k = 0))))
        : C())
  })
  return (
    fi(() => {
      d && C()
    }),
    yi(() => {
      T && T()
    }),
    (t.$$set = (t) => {
      'onconfirm' in t && n(0, (c = t.onconfirm)),
        'oncancel' in t && n(1, (u = t.oncancel)),
        'autoFocus' in t && n(13, (d = t.autoFocus)),
        'autoPositionCursor' in t && n(14, (p = t.autoPositionCursor)),
        'labelConfirm' in t && n(2, (h = t.labelConfirm)),
        'labelConfirmShow' in t && n(3, (g = t.labelConfirmShow)),
        'iconConfirm' in t && n(4, (m = t.iconConfirm)),
        'labelCancel' in t && n(5, (f = t.labelCancel)),
        'labelCancelShow' in t && n(6, ($ = t.labelCancelShow)),
        'iconCancel' in t && n(7, (y = t.iconCancel)),
        'panelOffset' in t && n(15, (x = t.panelOffset)),
        '$$scope' in t && n(19, (l = t.$$scope))
    }),
    (t.$$.update = () => {
      256 & t.$$.dirty[0] && n(18, (o = a && getComputedStyle(a))),
        262144 & t.$$.dirty[0] && (i = o && '1' === o.getPropertyValue('--editor-modal')),
        196608 & t.$$.dirty[0] && n(9, (r = `opacity:${k};${S}`))
    }),
    [
      c,
      u,
      h,
      g,
      m,
      f,
      $,
      y,
      a,
      r,
      (t) => {
        var e
        ;((t) => /textarea/i.test(t))(t.target) &&
          ((R = Date.now()),
          p && ((e = t.target).selectionStart = e.selectionEnd = e.value.length),
          clearTimeout(w),
          (w = setTimeout(M, 200)))
      },
      (t) => {
        Date.now() - R > 50 || (t.stopPropagation(), C())
      },
      ({ detail: t }) => {
        v = t.height
      },
      d,
      p,
      x,
      S,
      k,
      o,
      l,
      s,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(a = t), n(8, a)
        })
      },
    ]
  )
}
class qh extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        Zh,
        Gh,
        Ao,
        {
          onconfirm: 0,
          oncancel: 1,
          autoFocus: 13,
          autoPositionCursor: 14,
          labelConfirm: 2,
          labelConfirmShow: 3,
          iconConfirm: 4,
          labelCancel: 5,
          labelCancelShow: 6,
          iconCancel: 7,
          panelOffset: 15,
        },
        [-1, -1]
      )
  }
}
function Kh(t, e, n) {
  const o = t.slice()
  return (o[157] = e[n]), (o[159] = n), o
}
function Qh(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = e[157].name + ''
  function g(...t) {
    return e[118](e[159], ...t)
  }
  return (
    (i = new rd({ props: { color: e[157].color } })),
    {
      key: t,
      first: null,
      c() {
        ;(n = qo('li')),
          (o = qo('button')),
          Qi(i.$$.fragment),
          (r = Jo()),
          (a = qo('span')),
          (s = Qo(h)),
          (c = Jo()),
          ii(o, 'class', 'PinturaShapeListItem'),
          ii(o, 'type', 'button'),
          ii(o, 'aria-label', (l = 'Select shape ' + e[157].name)),
          (this.first = n)
      },
      m(t, e) {
        Go(t, n, e),
          Yo(n, o),
          Ji(i, o, null),
          Yo(o, r),
          Yo(o, a),
          Yo(a, s),
          Yo(n, c),
          (u = !0),
          d || ((p = ei(o, 'click', g)), (d = !0))
      },
      p(t, n) {
        e = t
        const r = {}
        524288 & n[0] && (r.color = e[157].color),
          i.$set(r),
          (!u || 524288 & n[0]) && h !== (h = e[157].name + '') && ai(s, h),
          (!u || (524288 & n[0] && l !== (l = 'Select shape ' + e[157].name))) &&
            ii(o, 'aria-label', l)
      },
      i(t) {
        u || (Vi(i.$$.fragment, t), (u = !0))
      },
      o(t) {
        Ni(i.$$.fragment, t), (u = !1)
      },
      d(t) {
        t && Zo(n), tr(i), (d = !1), p()
      },
    }
  )
}
function Jh(t) {
  let e, n
  return (
    (e = new Hh({
      props: {
        visible: !0,
        points: t[8],
        rotatorPoint: t[14],
        enableResizing: t[13],
        enableRotating: t[6],
      },
    })),
    e.$on('resizestart', t[25]),
    e.$on('resizemove', t[26]),
    e.$on('resizeend', t[27]),
    e.$on('rotatestart', t[28]),
    e.$on('rotatemove', t[29]),
    e.$on('rotateend', t[30]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        256 & n[0] && (o.points = t[8]),
          16384 & n[0] && (o.rotatorPoint = t[14]),
          8192 & n[0] && (o.enableResizing = t[13]),
          64 & n[0] && (o.enableRotating = t[6]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function tg(t) {
  let e, n
  return (
    (e = new qh({
      props: {
        panelOffset: t[1],
        onconfirm: t[36],
        oncancel: t[37],
        labelCancel: t[3].shapeLabelInputCancel,
        iconCancel: t[3].shapeIconInputCancel,
        labelConfirm: t[3].shapeLabelInputConfirm,
        iconConfirm: t[3].shapeIconInputConfirm,
        $$slots: { default: [eg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        2 & n[0] && (o.panelOffset = t[1]),
          8 & n[0] && (o.labelCancel = t[3].shapeLabelInputCancel),
          8 & n[0] && (o.iconCancel = t[3].shapeIconInputCancel),
          8 & n[0] && (o.labelConfirm = t[3].shapeLabelInputConfirm),
          8 & n[0] && (o.iconConfirm = t[3].shapeIconInputConfirm),
          (100352 & n[0]) | (32 & n[5]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function eg(t) {
  let e, n, o
  return {
    c() {
      ;(e = qo('textarea')),
        ii(e, 'style', t[16]),
        ii(e, 'spellcheck', 'false'),
        ii(e, 'autocorrect', 'off'),
        ii(e, 'autocapitalize', 'off'),
        (e.value = t[15])
    },
    m(i, r) {
      Go(i, e, r),
        t[119](e),
        n ||
          ((o = [
            ei(e, 'keydown', t[34]),
            ei(e, 'keypress', t[33]),
            ei(e, 'keyup', t[35]),
            ei(e, 'input', t[32]),
          ]),
          (n = !0))
    },
    p(t, n) {
      65536 & n[0] && ii(e, 'style', t[16]), 32768 & n[0] && (e.value = t[15])
    },
    d(i) {
      i && Zo(e), t[119](null), (n = !1), Po(o)
    },
  }
}
function ng(t) {
  let e, n, o, i, r
  return (
    (n = new Pc({ props: { items: t[18] } })),
    {
      c() {
        ;(e = qo('div')),
          Qi(n.$$.fragment),
          ii(e, 'class', 'PinturaShapeControls'),
          ii(e, 'style', t[17])
      },
      m(a, s) {
        Go(a, e, s),
          Ji(n, e, null),
          (o = !0),
          i || ((r = [ei(e, 'measure', t[120]), Wo(Ua.call(null, e))]), (i = !0))
      },
      p(t, i) {
        const r = {}
        262144 & i[0] && (r.items = t[18]),
          n.$set(r),
          (!o || 131072 & i[0]) && ii(e, 'style', t[17])
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n), (i = !1), Po(r)
      },
    }
  )
}
function og(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d = [],
    p = new Map(),
    h = t[19]
  const g = (t) => t[157].id
  for (let e = 0; e < h.length; e += 1) {
    let n = Kh(t, h, e),
      o = g(n)
    p.set(o, (d[e] = Qh(o, n)))
  }
  let m = t[7] && Jh(t),
    f = t[9] && tg(t),
    $ = t[10] > 0 && ng(t)
  return {
    c() {
      ;(e = qo('div')), (n = qo('nav')), (o = qo('ul'))
      for (let t = 0; t < d.length; t += 1) d[t].c()
      ;(i = Jo()),
        m && m.c(),
        (r = Jo()),
        f && f.c(),
        (a = Jo()),
        $ && $.c(),
        ii(n, 'class', 'PinturaShapeList'),
        ii(n, 'data-visible', t[12]),
        ii(e, 'class', 'PinturaShapeEditor'),
        ii(e, 'tabindex', '0')
    },
    m(p, h) {
      Go(p, e, h), Yo(e, n), Yo(n, o)
      for (let t = 0; t < d.length; t += 1) d[t].m(o, null)
      Yo(e, i),
        m && m.m(e, null),
        Yo(e, r),
        f && f.m(e, null),
        Yo(e, a),
        $ && $.m(e, null),
        (l = !0),
        c ||
          ((u = [
            ei(n, 'focusin', t[40]),
            ei(n, 'focusout', t[41]),
            ei(e, 'keydown', t[31]),
            ei(e, 'nudge', t[39]),
            ei(e, 'measure', t[117]),
            Wo(Ua.call(null, e)),
            Wo(ol.call(null, e)),
            ei(e, 'interactionstart', t[21]),
            ei(e, 'interactionupdate', t[22]),
            ei(e, 'interactionrelease', t[23]),
            ei(e, 'interactionend', t[24]),
            Wo(
              (s = nl.call(null, e, {
                drag: !0,
                pinch: !0,
                inertia: !0,
                matchTarget: !0,
                getEventPosition: t[121],
              }))
            ),
          ]),
          (c = !0))
    },
    p(t, i) {
      524305 & i[0] &&
        ((h = t[19]), _i(), (d = Gi(d, i, g, 1, t, h, p, o, Yi, Qh, null, Kh)), Wi()),
        (!l || 4096 & i[0]) && ii(n, 'data-visible', t[12]),
        t[7]
          ? m
            ? (m.p(t, i), 128 & i[0] && Vi(m, 1))
            : ((m = Jh(t)), m.c(), Vi(m, 1), m.m(e, r))
          : m &&
            (_i(),
            Ni(m, 1, 1, () => {
              m = null
            }),
            Wi()),
        t[9]
          ? f
            ? (f.p(t, i), 512 & i[0] && Vi(f, 1))
            : ((f = tg(t)), f.c(), Vi(f, 1), f.m(e, a))
          : f &&
            (_i(),
            Ni(f, 1, 1, () => {
              f = null
            }),
            Wi()),
        t[10] > 0
          ? $
            ? ($.p(t, i), 1024 & i[0] && Vi($, 1))
            : (($ = ng(t)), $.c(), Vi($, 1), $.m(e, null))
          : $ &&
            (_i(),
            Ni($, 1, 1, () => {
              $ = null
            }),
            Wi()),
        s &&
          Eo(s.update) &&
          4 & i[0] &&
          s.update.call(null, {
            drag: !0,
            pinch: !0,
            inertia: !0,
            matchTarget: !0,
            getEventPosition: t[121],
          })
    },
    i(t) {
      if (!l) {
        for (let t = 0; t < h.length; t += 1) Vi(d[t])
        Vi(m), Vi(f), Vi($), (l = !0)
      }
    },
    o(t) {
      for (let t = 0; t < d.length; t += 1) Ni(d[t])
      Ni(m), Ni(f), Ni($), (l = !1)
    },
    d(t) {
      t && Zo(e)
      for (let t = 0; t < d.length; t += 1) d[t].d()
      m && m.d(), f && f.d(), $ && $.d(), (c = !1), Po(u)
    },
  }
}
function ig(t, e, n) {
  let o,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    z,
    D,
    _,
    W,
    { markup: V } = e,
    { offset: N } = e,
    { contextRotation: U = 0 } = e,
    { contextFlipX: X = !1 } = e,
    { contextFlipY: Y = !1 } = e,
    { scale: Z } = e,
    { ui: K } = e,
    { opacity: rt = 1 } = e,
    { parentRect: ut } = e,
    { rootRect: dt } = e,
    { utilRect: pt } = e,
    { oninteractionstart: ht = i } = e,
    { oninteractionupdate: gt = i } = e,
    { oninteractionrelease: mt = i } = e,
    { oninteractionend: ft = i } = e,
    { onaddshape: $t = i } = e,
    { onupdateshape: yt = i } = e,
    { onselectshape: xt = i } = e,
    { onremoveshape: bt = i } = e,
    { beforeSelectShape: vt = () => !0 } = e,
    { beforeDeselectShape: St = () => !0 } = e,
    { beforeRemoveShape: Ct = () => !0 } = e,
    { beforeUpdateShape: Mt = (t, e) => e } = e,
    { willRenderShapeControls: Rt = O } = e,
    { mapEditorPointToImagePoint: Tt } = e,
    { mapImagePointToEditorPoint: Pt } = e,
    { eraseRadius: Lt } = e,
    { selectRadius: zt } = e,
    { enableButtonFlipVertical: Dt = !1 } = e,
    { locale: Ot } = e
  const _t = (t, e, n) => {
      let o = Mt({ ...t }, e, { ...n })
      no(t, o, n)
    },
    Wt = (t, e, n, o) => {
      const i = j(t.x - n.x, t.y - n.y),
        r = j(o.x - n.x, o.y - n.y),
        a = it(r, r)
      let s = it(i, r) / a
      ;(s = s < 0 ? 0 : s), (s = s > 1 ? 1 : s)
      const l = j(r.x * s + n.x - t.x, r.y * s + n.y - t.y)
      return it(l, l) <= e * e
    },
    Vt = (t, e, n) => {
      if (oe(t, n)) return !0
      const o = n.length
      for (let i = 0; i < o - 1; i++) if (Wt(t, e, n[i], n[i + 1])) return !0
      return Wt(t, e, n[0], n[o - 1])
    },
    Nt = (t, e, n, o, i) => Vt(t, e, Ht(n, o, i || Bt(n))),
    Ut = vi('keysPressed')
  Fo(t, Ut, (t) => n(128, (_ = t)))
  const Xt = (t, e) => {
      const n = Pt(t)
      return Tt(et(n, e))
    },
    jt = (t, e, n) => {
      if (kn(t)) {
        const o = Xt($n(e), n),
          i = Xt(yn(e), n)
        _t(t, { x1: o.x, y1: o.y, x2: i.x, y2: i.y }, ut)
      } else if (wn(t) || xn(t) || Sn(t)) {
        const o = Xt(e, n)
        _t(t, o, ut)
      }
      ee()
    }
  let Yt
  const Kt = () => {
      if (!V.length) return
      const t = V[V.length - 1]
      return t.isDraft ? t : void 0
    },
    Qt = (t, e = !0) => {
      if (!Kt()) return (t = Object.assign(t, { isDraft: !0 })), ie(t, e)
    },
    Jt = () => {
      const t = Kt()
      if (t) return se(t, 'isDraft', !1), t
    },
    te = () => {
      Kt() && n(0, (V = V.slice(0, -1)))
    },
    ee = () => n(0, V),
    ie = (t, e = !0) => (V.push(t), e && ee(), t),
    ae = (t, e, n = !0) => {
      ;(t = Object.assign(t, e)), n && ee()
    },
    se = (t, e, n, o = !0) => {
      ;(t[e] = n), o && ee()
    },
    le = (t, e = !0) => {
      V.forEach((e) => ae(e, t, !1)), e && ee()
    },
    ce = () => [...V].reverse().find(Pn),
    ue = () => !!ce(),
    de = (t, e = !0) => {
      if (!Ct(t)) return !1
      const o = V.filter((e) => e !== t)
      bt(t), e && n(0, (V = o))
    },
    pe = () => {
      const t = ce()
      if (!t) return
      const e = V.filter((t) => On(t) && Dn(t)),
        n = e.findIndex((e) => e === t)
      if (!1 === de(t)) return
      if (((he = t), e.length - 1 == 0)) return ge()
      const o = n - 1 < 0 ? e.length - 1 : n - 1
      fe(e[o])
    }
  let he = void 0
  const ge = () => {
      ;(he = me()), le({ isSelected: !1, isEditing: !1 })
    },
    me = () => V.find(Pn),
    fe = (t, e = !0) => {
      if (t.isDraft) return
      const n = me() || he
      ;(he = void 0),
        vt(n, t) &&
          (ge(),
          ((t) => {
            t.isSelected = !0
          })(t),
          xt(t),
          e && ee())
    },
    $e = (t) => {
      ae(t, { isSelected: !1, isEditing: !1 })
    },
    ye = (t) => {
      ae(t, { isSelected: !0, isEditing: !0 })
    },
    xe = (t) => {
      ae(t, { isSelected: !0, isEditing: !1 })
    },
    be = (t) => {
      const e = t.filter(Ct)
      return n(0, (V = V.filter((t) => !e.includes(t)))), e
    },
    ve = (t) => {
      const e = an(t.text, t)
      return Ft(
        t.x,
        t.y,
        t.width ? Math.min(t.width, e.width) : e.width,
        t.height ? Math.min(t.height, e.height) : e.height
      )
    },
    we = (t) => {
      if (An(t)) return Et(t)
      if (Sn(t)) return It(t)
      const e = ve(t)
      return (e.width = Math.max(10, t.width || e.width)), e
    },
    Se = (t, e = 0) =>
      [...V]
        .reverse()
        .map((t) => ({ shape: t, priority: 1 }))
        .filter((t) => Dn(t.shape))
        .filter((n) => {
          const { shape: o } = n,
            i = Jn(dn(o), ut),
            r = e + (i.strokeWidth || 0)
          if (wn(i)) return Nt(t, r, i, o.rotation)
          if (xn(i)) {
            const e = we(i),
              a = Nt(t, r, e, o.rotation)
            let s = !1
            if (a && !Pn(o)) {
              const a = ve(i)
              'right' !== o.textAlign || o.flipX || (a.x = e.x + e.width - a.width),
                'center' === o.textAlign && (a.x = e.x + 0.5 * e.width - 0.5 * a.width),
                (s = Nt(t, r, a, o.rotation, Bt(e))),
                s || (n.priority = -1)
            }
            return a
          }
          return Sn(i)
            ? ((t, e, n, o, i, r) => {
                const a = re(j(n.x, n.y), n.rx, n.ry, o, i, r, 12)
                return Vt(t, e, a)
              })(t, r, i, o.rotation, o.flipX, o.flipY)
            : !!kn(i) && Wt(t, Math.max(16, r), $n(i), yn(i))
        })
        .sort((t, e) => (t.priority < e.priority ? 1 : t.priority > e.priority ? -1 : 0)),
    ke = (t, e, n = 0) => {
      let o = Math.abs(n)
      const i = kt(wt(t, e), o),
        r = (({ start: t, end: e }, n) => {
          if (0 === n) return [j(t.x, t.y), j(t.x, t.y), j(e.x, e.y), j(e.x, e.y)]
          const o = Math.atan2(e.y - t.y, e.x - t.x),
            i = Math.sin(o) * n,
            r = Math.cos(o) * n
          return [
            j(i + t.x, -r + t.y),
            j(-i + t.x, r + t.y),
            j(-i + e.x, r + e.y),
            j(i + e.x, -r + e.y),
          ]
        })(i, o)
      return V.filter(zn).filter((t) => {
        const e = Jn(dn(t), ut)
        return kn(e) || Mn(e)
          ? !!((t, e) => {
              const n = [...e, e[0]],
                o = n.length,
                i = []
              for (let e = 0; e < o - 1; e++) {
                const o = ne(t.start, t.end, j(n[e].x, n[e].y), j(n[e + 1].x, n[e + 1].y))
                o && i.push(o)
              }
              return i.length ? i : void 0
            })(i, Ee(e))
          : ((t, e) => {
              const n = [t, e],
                o = t.length,
                i = e.length
              let r, a, s, l, c, u, d, p, h
              for (let g = 0; g < n.length; g++) {
                const m = n[g],
                  f = m.length
                for (h = 0; h < f; h++) {
                  for (
                    p = (h + 1) % f, d = j(m[p].y - m[h].y, m[h].x - m[p].x), r = a = null, u = 0;
                    u < o;
                    u++
                  )
                    (s = d.x * t[u].x + d.y * t[u].y),
                      (null === r || s < r) && (r = s),
                      (null === a || s > a) && (a = s)
                  for (l = c = null, u = 0; u < i; u++)
                    (s = d.x * e[u].x + d.y * e[u].y),
                      (null === l || s < l) && (l = s),
                      (null === c || s > c) && (c = s)
                  if (a < l || c < r) return !1
                }
              }
              return !0
            })(
              r,
              ((t, e = 12) =>
                wn(t)
                  ? Ht(t, t.rotation, Bt(t))
                  : xn(t)
                  ? Ht(we(t), t.rotation, Bt(t))
                  : Sn(t)
                  ? re(j(t.x, t.y), t.rx, t.ry, t.rotation, t.flipX, t.flipY, e)
                  : [])(e)
            )
      })
    }
  let Ce = void 0,
    Me = void 0,
    Re = void 0,
    Te = void 0,
    Pe = !1
  const Ee = (t) => {
      let e, n
      if (wn(t))
        (e = Bt(t)),
          (n = qt(t)),
          (t.flipX || t.flipY) && lt(n, t.flipX, t.flipY, e.x, e.y),
          (n = ct(n, t.rotation, e.x, e.y))
      else if (Sn(t))
        (e = t),
          (n = qt(It(t))),
          (t.flipX || t.flipY) && lt(n, t.flipX, t.flipY, e.x, e.y),
          (n = ct(n, t.rotation, e.x, e.y))
      else if (kn(t)) (n = [$n(t), yn(t)]), (e = st(n))
      else if (Mn(t)) (n = [...t.points]), (e = st(n))
      else if (xn(t)) {
        const o = we(t)
        ;(o.width = Math.max(10, o.width)),
          (e = Bt(o)),
          (n = qt(o)),
          (t.flipX || t.flipY) && lt(n, t.flipX, t.flipY, e.x, e.y),
          (n = ct(n, t.rotation, e.x, e.y))
      }
      return n
    },
    Ae = (t) => {
      const e = Ee(t)
      let n, o
      return (
        t.flipY
          ? ((n = st([e[0], e[1]])), (o = Q(j(e[1].x - e[2].x, e[1].y - e[2].y))))
          : ((n = st([e[2], e[3]])), (o = Q(j(e[2].x - e[1].x, e[2].y - e[1].y)))),
        ot(o, 20 / Z),
        { origin: n, dir: o }
      )
    }
  let Ie = 'markup-manipulator-segment'
  yi(() => {
    n(42, (K = K.filter((t) => t.id !== Ie)))
  })
  let Le
  const Fe = () => {
      const t = bn(o) ? ze(Le.value) : Le.value,
        e = Wn(o, t),
        n = !0 === e ? t : e
      let i = v.x,
        r = v.y
      if (!o.height && 0 !== o.rotation) {
        const t = an(n, o),
          e = Ft(v.x, v.y, t.width, t.height),
          [a] = Ht(e, v.rotation),
          [s] = Ht(S, v.rotation)
        ;(i += s.x - a.x), (r += s.y - a.y)
      }
      ae(o, { x: i, y: r, text: n })
    },
    Be = () => ye(o),
    ze = (t) =>
      t
        .split(/[\n\r]/g)
        .map((t) => t.trim())
        .filter((t) => t.length)
        .join(' '),
    De = () => {
      let t = o.isDraft
      o.isDraft && Jt(), Fe(), xe(o), t ? $t(o) : yt(o)
    },
    Oe = () => {
      o.isDraft ? te() : (ae(o, { text: v.text, x: v.x, y: v.y }), xe(o))
    },
    _e = (t) => {
      t.stopPropagation()
      const e = o.flipX || !1
      se(o, 'flipX', !e), yt(o)
    },
    We = (t) => {
      t.stopPropagation()
      const e = o.flipY || !1
      se(o, 'flipY', !e), yt(o)
    },
    Ve = (t) => {
      t.stopPropagation(), t.target.blur(), pe()
    },
    Ue = (t) => {
      t.stopPropagation()
      V.findIndex((t) => t === o) !== V.length - 1 &&
        (n(0, (V = V.filter((t) => t !== o).concat([o]))), yt(o))
    },
    He = (t) => {
      t.stopPropagation()
      const e = dn(o)
      e.id = M()
      const n = j(50, -50)
      if (kn(e)) {
        const t = eo(e, ['x1', 'y1', 'x2', 'y2'], ut)
        ;(t.x1 += n.x), (t.y1 += n.y), (t.x2 += n.x), (t.y2 += n.y), no(e, t, ut)
      } else {
        const t = eo(e, ['x', 'y'], ut)
        ;(t.x += 50), (t.y -= 50), no(e, t, ut)
      }
      V.push(e), $t(e), fe(e)
    },
    Xe = Ia(0, { stiffness: 0.2, damping: 0.7 })
  let je
  Fo(t, Xe, (t) => n(10, (W = t)))
  let Ye = !1
  return (
    (t.$$set = (t) => {
      'markup' in t && n(0, (V = t.markup)),
        'offset' in t && n(1, (N = t.offset)),
        'contextRotation' in t && n(43, (U = t.contextRotation)),
        'contextFlipX' in t && n(44, (X = t.contextFlipX)),
        'contextFlipY' in t && n(45, (Y = t.contextFlipY)),
        'scale' in t && n(46, (Z = t.scale)),
        'ui' in t && n(42, (K = t.ui)),
        'opacity' in t && n(47, (rt = t.opacity)),
        'parentRect' in t && n(48, (ut = t.parentRect)),
        'rootRect' in t && n(2, (dt = t.rootRect)),
        'utilRect' in t && n(49, (pt = t.utilRect)),
        'oninteractionstart' in t && n(50, (ht = t.oninteractionstart)),
        'oninteractionupdate' in t && n(51, (gt = t.oninteractionupdate)),
        'oninteractionrelease' in t && n(52, (mt = t.oninteractionrelease)),
        'oninteractionend' in t && n(53, (ft = t.oninteractionend)),
        'onaddshape' in t && n(54, ($t = t.onaddshape)),
        'onupdateshape' in t && n(55, (yt = t.onupdateshape)),
        'onselectshape' in t && n(56, (xt = t.onselectshape)),
        'onremoveshape' in t && n(57, (bt = t.onremoveshape)),
        'beforeSelectShape' in t && n(58, (vt = t.beforeSelectShape)),
        'beforeDeselectShape' in t && n(59, (St = t.beforeDeselectShape)),
        'beforeRemoveShape' in t && n(60, (Ct = t.beforeRemoveShape)),
        'beforeUpdateShape' in t && n(61, (Mt = t.beforeUpdateShape)),
        'willRenderShapeControls' in t && n(62, (Rt = t.willRenderShapeControls)),
        'mapEditorPointToImagePoint' in t && n(63, (Tt = t.mapEditorPointToImagePoint)),
        'mapImagePointToEditorPoint' in t && n(64, (Pt = t.mapImagePointToEditorPoint)),
        'eraseRadius' in t && n(65, (Lt = t.eraseRadius)),
        'selectRadius' in t && n(66, (zt = t.selectRadius)),
        'enableButtonFlipVertical' in t && n(67, (Dt = t.enableButtonFlipVertical)),
        'locale' in t && n(3, (Ot = t.locale))
    }),
    (t.$$.update = () => {
      var e, i
      if (
        (1 & t.$$.dirty[0] && n(96, (o = V && (Kt() || ce()))),
        8 & t.$$.dirty[3] && n(97, (r = o && !En(o) ? o.id : void 0)),
        (131072 & t.$$.dirty[1]) | (8 & t.$$.dirty[3]) && n(98, (a = o && Jn(dn(o), ut))),
        8 & t.$$.dirty[3] && n(99, (s = !(!o || !En(o)))),
        8 & t.$$.dirty[3] && n(100, (l = o || void 0)),
        40 & t.$$.dirty[3] && n(101, (c = (o && !Mn(a) && Ee(a)) || [])),
        8 & t.$$.dirty[3] &&
          n(
            102,
            (u =
              o &&
              !0 !== (e = o).disableResize &&
              !En(e) &&
              (An(e) || vn(e) || Sn(e) || kn(e)) &&
              !In(e) &&
              Vn(e) &&
              !Rn(o))
          ),
        8 & t.$$.dirty[3] &&
          n(
            6,
            (d =
              o &&
              ((t) =>
                !0 !== t.disableRotate && !En(t) && (An(t) || Ne(t, 'text') || Sn(t)) && !In(t))(
                o
              ) &&
              !Rn(o))
          ),
        520 & t.$$.dirty[3] && n(13, (p = u && Ne(o, 'text') && !o.height ? 'horizontal' : u)),
        264 & t.$$.dirty[3] && n(7, (h = o && c.length > 1)),
        (4 & t.$$.dirty[2]) | (256 & t.$$.dirty[3]) && n(103, (g = c.map(Pt))),
        (2 & t.$$.dirty[0]) | (1024 & t.$$.dirty[3]) &&
          n(8, (m = g.map((t) => j(t.x - N.x, t.y - N.y)))),
        (192 & t.$$.dirty[0]) | (32 & t.$$.dirty[3]) &&
          n(
            104,
            (f =
              h &&
              d &&
              ((t) => {
                const e = Ae(t),
                  n = Pt({ x: e.origin.x + e.dir.x, y: e.origin.y + e.dir.y })
                return { origin: Pt(e.origin), position: n }
              })(a))
          ),
        (2 & t.$$.dirty[0]) | (2048 & t.$$.dirty[3]) &&
          n(14, ($ = f && j(f.position.x - N.x, f.position.y - N.y))),
        65536 & t.$$.dirty[1] && n(105, (y = rt)),
        (256 & t.$$.dirty[0]) | (67584 & t.$$.dirty[1]) | (7168 & t.$$.dirty[3]))
      )
        if (rt > 0 && m.length > 2) {
          const t = [...g, g[0]],
            e = t.length,
            o = [],
            i = [0, 0, 0, 0.1 * y],
            r = [1, 1, 1, y],
            a = 1.5
          for (let n = 0; n < e - 1; n++) {
            const e = t[n],
              r = t[n + 1]
            o.push({
              id: Ie,
              opacity: 1,
              points: [j(e.x + 1, e.y + 1), j(r.x + 1, r.y + 1)],
              strokeColor: i,
              strokeWidth: 2,
            })
          }
          f &&
            o.push({
              id: Ie,
              opacity: 1,
              points: [j(f.origin.x + 1, f.origin.y + 1), j(f.position.x + 1, f.position.y + 1)],
              strokeColor: i,
              strokeWidth: 2,
            })
          for (let n = 0; n < e - 1; n++)
            o.push({ id: Ie, points: [t[n], t[n + 1]], opacity: 1, strokeColor: r, strokeWidth: a })
          f &&
            o.push({
              id: Ie,
              opacity: 1,
              points: [
                { x: f.origin.x, y: f.origin.y },
                { x: f.position.x, y: f.position.y },
              ],
              strokeColor: r,
              strokeWidth: a,
            }),
            n(42, (K = [...K.filter((t) => t.id !== Ie), ...o]))
        } else n(42, (K = K.filter((t) => t.id !== Ie)))
      8 & t.$$.dirty[3] && n(106, (x = o && xn(o))),
        8200 & t.$$.dirty[3] && n(9, (b = x && !1 !== Wn(o) && o.isEditing)),
        512 & t.$$.dirty[0] && n(107, (v = b ? { ...o } : void 0)),
        16384 & t.$$.dirty[3] && n(108, (w = v && an(v.text, v))),
        49152 & t.$$.dirty[3] && (S = v && Ft(v.x, v.y, w.width, w.height)),
        (512 & t.$$.dirty[0]) | (8 & t.$$.dirty[3]) && n(15, (k = b ? o.text : '')),
        (512 & t.$$.dirty[0]) | (128 & t.$$.dirty[3]) &&
          n(
            16,
            (C =
              b &&
              `\n    text-align: ${l.textAlign || 'left'};\n    font-family: ${
                l.fontFamily || 'sans-serif'
              };\n`)
          ),
        65608 & t.$$.dirty[3] && n(109, (R = o && !s ? o : R)),
        65536 & t.$$.dirty[3] && n(110, (T = R && _n(R))),
        65536 & t.$$.dirty[3] && n(111, (P = R && ((t) => !0 !== t.disableDuplicate && Vn(t))(R))),
        65536 & t.$$.dirty[3] && n(112, (E = R && On(R))),
        65536 & t.$$.dirty[3] && n(113, (A = R && ((t) => !0 !== t.disableReorder)(R))),
        65536 & t.$$.dirty[3] && n(114, (I = R && !1 !== Wn(R))),
        (512 & t.$$.dirty[0]) | (76 & t.$$.dirty[3]) && Xe.set(!o || s || Pe || b ? 0 : 1),
        (256 & t.$$.dirty[0]) | (4194376 & t.$$.dirty[3]) &&
          n(115, (L = o && !s ? ((i = At(m)), tt(j(i.x + 0.5 * i.width, i.y), Sl)) : L)),
        (32 & t.$$.dirty[0]) | (262144 & t.$$.dirty[1]) | (4194304 & t.$$.dirty[3]) &&
          n(
            116,
            (F =
              L &&
              je &&
              pt &&
              ((t) => {
                const e = pt.x,
                  n = pt.y,
                  o = e + pt.width
                let i = Math.max(t.x - 0.5 * je.width, e),
                  r = Math.max(t.y - je.height - 16, n)
                return i + je.width > o && (i = o - je.width), j(i, r)
              })(L))
          ),
        (1024 & t.$$.dirty[0]) | (8388608 & t.$$.dirty[3]) &&
          n(17, (B = F && `transform: translate(${F.x}px, ${F.y}px);opacity:${W}`)),
        (8 & t.$$.dirty[0]) | (33 & t.$$.dirty[2]) | (4063248 & t.$$.dirty[3]) &&
          n(
            18,
            (z =
              r &&
              Rt(
                [
                  [
                    'div',
                    'alpha',
                    { class: 'PinturaShapeControlsGroup' },
                    [
                      T && [
                        Js,
                        'flip-horizontal',
                        {
                          onclick: _e,
                          label: Ot.shapeTitleButtonFlipHorizontal,
                          icon: Ot.shapeIconButtonFlipHorizontal,
                          hideLabel: !0,
                        },
                      ],
                      T &&
                        Dt && [
                          Js,
                          'flip-vertical',
                          {
                            onclick: We,
                            label: Ot.shapeTitleButtonFlipVertical,
                            icon: Ot.shapeIconButtonFlipVertical,
                            hideLabel: !0,
                          },
                        ],
                      A && [
                        Js,
                        'to-front',
                        {
                          onclick: Ue,
                          label: Ot.shapeTitleButtonMoveToFront,
                          icon: Ot.shapeIconButtonMoveToFront,
                          hideLabel: !0,
                        },
                      ],
                      P && [
                        Js,
                        'duplicate',
                        {
                          onclick: He,
                          label: Ot.shapeTitleButtonDuplicate,
                          icon: Ot.shapeIconButtonDuplicate,
                          hideLabel: !0,
                        },
                      ],
                      E && [
                        Js,
                        'remove',
                        {
                          onclick: Ve,
                          label: Ot.shapeTitleButtonRemove,
                          icon: Ot.shapeIconButtonRemove,
                          hideLabel: !0,
                        },
                      ],
                    ],
                  ],
                  I && [
                    'div',
                    'beta',
                    { class: 'PinturaShapeControlsGroup' },
                    [[Js, 'edit-text', { label: Ot.shapeLabelInputText, onclick: Be }]],
                  ],
                ],
                r
              ))
          ),
        4 & t.$$.dirty[0] && dt && (x || ge()),
        9 & t.$$.dirty[0] &&
          n(
            19,
            (D = V.filter(Dn)
              .filter((t) => !En(t))
              .map((t) => ({
                id: t.id,
                color: xn(t) ? t.color : kn(t) ? t.strokeColor : t.backgroundColor,
                name: t.name || Ot['shapeLabelTool' + $r(qn(t))],
              })))
          )
    }),
    [
      V,
      N,
      dt,
      Ot,
      fe,
      je,
      d,
      h,
      m,
      b,
      W,
      Le,
      Ye,
      p,
      $,
      k,
      C,
      B,
      z,
      D,
      Ut,
      (t) => {
        const { origin: e } = t.detail
        ;(Re = void 0),
          (Te = void 0),
          (Me = void 0),
          clearTimeout(Ce),
          (Ce = setTimeout(() => n(95, (Pe = !0)), 250))
        Kt() && Jt()
        const o = Tt(G(e)),
          i = Se(o, zt),
          r = i.length && i.shift().shape
        if (r && Pn(r)) return (Re = r), void (Te = Jn(dn(Re), ut))
        ;(Me = r), ht(t)
      },
      (t) => {
        if (Re) {
          if (!Vn(Re)) return
          if (Rn(Re)) return
          return jt(Re, Te, t.detail.translation)
        }
        gt(t)
      },
      (t) => {
        clearTimeout(Ce),
          n(95, (Pe = !1)),
          Re
            ? Re.isEditing
              ? Oe()
              : t.detail.isDoubleTap && xn(Re) && !1 !== Wn(Re) && ye(Re)
            : mt(t)
      },
      (t) => {
        if (Re) return yt(Re), void (Re = void 0)
        const e = me(),
          n = Me && t.detail.isTap,
          o = !e || St(e, Me)
        o && ge(), ft(t), o && n && fe(Me)
      },
      (t) => {
        n(95, (Pe = !0)), (Re = o), (Te = a)
      },
      (t) => {
        const { translation: e, indexes: n, shiftKey: o } = t.detail
        ;((t, e, n, o, i) => {
          if (kn(t)) {
            const [i] = n,
              r = _.includes(16)
                ? (t, e) => {
                    const n = at(t, e),
                      o = J(t, e),
                      i = Math.PI / 4,
                      r = i * Math.round(o / i) - (U % i)
                    ;(e.x = t.x + n * Math.cos(r)), (e.y = t.y + n * Math.sin(r))
                  }
                : (t, e) => e
            if (0 === i) {
              const n = Xt($n(e), o)
              r(j(e.x2, e.y2), n), _t(t, { x1: n.x, y1: n.y }, ut)
            } else if (1 === i) {
              const n = Xt(yn(e), o)
              r(j(e.x1, e.y1), n), _t(t, { x2: n.x, y2: n.y }, ut)
            }
          } else if (An(t) || Sn(t) || vn(t)) {
            let r,
              a,
              s = !1
            if (Sn(t)) r = It(e)
            else if (An(t)) r = Et(e)
            else {
              ;(s = !0), (r = Et(e))
              const t = an(e.text, e)
              r.height = t.height
            }
            t.aspectRatio ? (a = t.aspectRatio) : i.shiftKey && !s && (a = r.width / r.height)
            const l = Et(r),
              c = Bt(l),
              u = t.rotation,
              d = qt(l),
              p = Ht(l, u)
            if (1 === n.length) {
              let e = n[0]
              const [i, r, s, l] = d,
                h = Pt(p[e])
              et(h, o)
              const g = Tt(h),
                m = j(g.x - p[e].x, g.y - p[e].y)
              t.flipX && (m.x = -m.x), t.flipY && (m.y = -m.y)
              const f = q(G(m), -u),
                $ = j(d[e].x + f.x, d[e].y + f.y)
              let y
              0 === e && (y = s), 1 === e && (y = l), 2 === e && (y = i), 3 === e && (y = r)
              const x = At(y, $)
              if (a) {
                const { width: t, height: e } = Gt(x, a),
                  [n, o, i, r] = Zt(x)
                ;(x.width = t),
                  (x.height = e),
                  $.y < y.y && (x.y = i - e),
                  $.x < y.x && (x.x = o - t)
              }
              const b = Ht(x, u, c),
                v = st(b),
                w = q(b[0], -u, v),
                S = q(b[2], -u, v)
              ;(t.flipX || t.flipY) && lt([w, S], t.flipX, t.flipY, c.x, c.y)
              const k = At(w, S)
              _t(t, Sn(t) ? H(k) : k, ut)
            } else {
              const [e, i] = n.map((t) => p[t]),
                r = { x: e.x + 0.5 * (i.x - e.x), y: e.y + 0.5 * (i.y - e.y) },
                [l, h] = n.map((t) => d[t]),
                [g, m] = n.map((t) => {
                  const e = t + 2
                  return e < 4 ? d[e] : d[e - 4]
                })
              l.x, h.x, l.x, l.y, h.y, l.y
              const f = { x: g.x + 0.5 * (m.x - g.x), y: g.y + 0.5 * (m.y - g.y) },
                $ = Pt(r)
              et($, o)
              const y = Tt($),
                x = j(y.x - r.x, y.y - r.y)
              t.flipX && (x.x = -x.x), t.flipY && (x.y = -x.y)
              const b = q(G(x), -u),
                v = nt(G(l), h),
                w = tt(v, (t) => 1 - Math.abs(Math.sign(t))),
                S = j(b.x * w.x, b.y * w.y)
              et(l, S), et(h, S)
              const k = At(d)
              if (a) {
                let t = k.width,
                  e = k.height
                0 === w.y ? (e = t / a) : (t = e * a),
                  (k.width = t),
                  (k.height = e),
                  0 === w.y ? (k.y = f.y - 0.5 * e) : (k.x = f.x - 0.5 * t)
              }
              const C = Ht(k, u, c),
                M = st(C),
                R = q(C[0], -u, M),
                T = q(C[2], -u, M)
              ;(t.flipX || t.flipY) && lt([R, T], t.flipX, t.flipY, c.x, c.y)
              const P = At(R, T)
              let E
              Sn(t) ? (E = H(P)) : An(t) ? (E = P) : s && (E = { x: P.x, y: P.y, width: P.width }),
                _t(t, E, ut)
            }
          }
          ee()
        })(Re, Te, n, e, { shiftKey: o })
      },
      (t) => {
        fe(Re), (Re = void 0), n(95, (Pe = !1)), yt(o)
      },
      (t) => {
        ;(Yt = Ae(a).origin), n(95, (Pe = !0)), (Re = o), (Te = a)
      },
      (t) => {
        const { translation: e, shiftKey: n } = t.detail
        ;((t, e, n, o) => {
          const i = we(Jn(dn(t), ut)),
            r = Bt(i),
            a = Xt(Yt, n)
          let s = J(a, r) + Math.PI / 2
          if (o.shiftKey) {
            const t = Math.PI / 16
            s = t * Math.round(s / t) - (U % t)
          }
          _t(t, { rotation: s }, ut), ee()
        })(Re, 0, e, { shiftKey: n })
      },
      () => {
        fe(Re), (Re = void 0), n(95, (Pe = !1)), yt(o)
      },
      (t) => {
        if (!ue()) return
        const { key: e } = t
        if (/escape/i.test(e)) return $e(o)
        ;/backspace/i.test(e) &&
          !/input|textarea/i.test(t.target.nodeName) &&
          (t.preventDefault(), pe())
      },
      Fe,
      (t) => {
        const e = t.target.value,
          n = t.target.selectionStart,
          i = t.target.selectionEnd,
          r = e.substring(0, n),
          a = e.substring(i),
          s = r + t.key + a
        if (Wn(o, s) !== s) return t.preventDefault()
      },
      (t) =>
        bn(o) && /enter/i.test(t.code)
          ? t.preventDefault()
          : /arrow/i.test(t.code)
          ? t.stopPropagation()
          : /escape/i.test(t.key)
          ? Oe()
          : void 0,
      (t) => {
        const { key: e, ctrlKey: n, altKey: o } = t
        if (/enter/i.test(e) && n | o) return De()
      },
      De,
      Oe,
      Xe,
      (t) => {
        const e = ce()
        e && Vn(e) && ((Re = e), (Te = Jn(dn(Re), ut)), jt(Re, Te, t.detail))
      },
      (t) => {
        n(12, (Ye = !0))
      },
      ({ relatedTarget: t }) => {
        t.classList.contains('shape-selector__button') || n(12, (Ye = !1))
      },
      K,
      U,
      X,
      Y,
      Z,
      rt,
      ut,
      pt,
      ht,
      gt,
      mt,
      ft,
      $t,
      yt,
      xt,
      bt,
      vt,
      St,
      Ct,
      Mt,
      Rt,
      Tt,
      Pt,
      Lt,
      zt,
      Dt,
      (t, e = {}) => {
        let n,
          o,
          i,
          r = Sn(t),
          a = xn(t),
          s = 'relative' === e.position
        const l = (t, e, n) => (0 === t || (e && n) ? t : e || n ? -t : t)
        return Mn(t)
          ? {
              start: (e) => {
                const { origin: r } = e.detail
                ;(o = 4), (n = G(r)), (i = G(r))
                const a = Tt(r)
                s && ((a.x = s ? qe(a.x, ut.width) : a.x), (a.y = s ? qe(a.y, ut.height) : a.y)),
                  Qt({ ...t, points: [a] })
              },
              update: (t) => {
                const e = Kt(),
                  { translation: r } = t.detail,
                  a = j(n.x + r.x, n.y + r.y),
                  l = at(i, a)
                if (xr(l, 5) <= o) return
                const c = J(a, i),
                  u = o - l
                ;(i.x += u * Math.cos(c)), (i.y += u * Math.sin(c))
                const d = Tt(i)
                d && ((d.x = s ? qe(d.x, ut.width) : d.x), (d.y = s ? qe(d.y, ut.height) : d.y)),
                  (e.points = e.points.concat(d)),
                  ee()
              },
              release: (t) => t.detail.preventInertia(),
              end: (t) => {
                if (t.detail.isTap) return te()
                const e = Jt()
                $t(e)
              },
            }
          : r || a || wn(t)
          ? {
              start: (e) => {
                const { origin: o } = e.detail
                n = G(o)
                const i = Tt(n),
                  a = {
                    ...t,
                    rotation: -1 * l(U, X, Y),
                    x: s ? qe(i.x, ut.width) : i.x,
                    y: s ? qe(i.y, ut.height) : i.y,
                  }
                delete a.position,
                  (a.opacity = 0),
                  r
                    ? ((a.rx = s ? qe(0) : 0), (a.ry = s ? qe(0) : 0))
                    : ((a.width = s ? qe(0) : 0), (a.height = s ? qe(0) : 0)),
                  Qt(a)
              },
              update: (t) => {
                const e = Kt()
                e.opacity = 1
                const { aspectRatio: o } = e
                let { translation: i } = t.detail
                if (o) {
                  const t = Math.abs(i.x) * o
                  ;(i.x = i.x), (i.y = t * Math.sign(i.y))
                }
                const a = j(n.x + i.x, n.y + i.y),
                  s = Tt(n),
                  c = Tt(a),
                  u = { x: s.x + 0.5 * (c.x - s.x), y: s.y + 0.5 * (c.y - s.y) },
                  d = l(U, X, Y)
                q(s, d, u), q(c, d, u)
                const p = Math.min(s.x, c.x),
                  h = Math.min(s.y, c.y)
                let g = Math.max(s.x, c.x) - p,
                  m = Math.max(s.y, c.y) - h,
                  f = {}
                r
                  ? ((f.x = p + 0.5 * g), (f.y = h + 0.5 * m), (f.rx = 0.5 * g), (f.ry = 0.5 * m))
                  : ((f.x = p), (f.y = h), (f.width = g), (f.height = m)),
                  _t(e, f, ut),
                  ee()
              },
              release: (t) => {
                t.detail.preventInertia()
              },
              end: (t) => {
                const e = Kt()
                if (t.detail.isTap) {
                  if (!xn(e) || Me) return te()
                  delete e.width, delete e.height, delete e.textAlign
                }
                if (((e.opacity = 1), !xn(e))) {
                  const t = Jt()
                  $t(t)
                }
                fe(e), xn(e) && ye(e)
              },
            }
          : kn(t)
          ? {
              start: (e) => {
                const { origin: o } = e.detail,
                  i = Tt(o),
                  r = tt(i, Sl)
                ;(n = G(o)),
                  Qt({
                    ...t,
                    x1: s ? qe(r.x, ut.width) : r.x,
                    y1: s ? qe(r.y, ut.height) : r.y,
                    x2: s ? qe(r.x, ut.width) : r.x,
                    y2: s ? qe(r.y, ut.height) : r.y,
                    opacity: 0,
                  })
              },
              update: (t) => {
                const e = Kt(),
                  { translation: o } = t.detail,
                  i = et(G(n), o)
                if (_.includes(16)) {
                  const t = at(n, i),
                    e = J(n, i),
                    o = Math.PI / 4,
                    r = o * Math.round(e / o)
                  ;(i.x = n.x + t * Math.cos(r)), (i.y = n.y + t * Math.sin(r))
                }
                const r = Tt(i)
                ae(e, {
                  x2: s ? qe(r.x, ut.width) : r.x,
                  y2: s ? qe(r.y, ut.height) : r.y,
                  opacity: 1,
                }),
                  ee()
              },
              release: (t) => t.detail.preventInertia(),
              end: (t) => {
                const e = Kt()
                if (t.detail.isTap) return te()
                e.opacity = 1
                const n = Jt()
                $t(n), fe(n)
              },
            }
          : void 0
      },
      () => {
        let t, e
        return {
          start: (n) => {
            ;(t = n.detail.origin), (e = t)
          },
          update: (n) => {
            const { translation: o } = n.detail,
              i = j(t.x + o.x, t.y + o.y),
              r = ke(Tt(e), Tt(i), Lt)
            be(r).forEach(bt), (e = G(i))
          },
          release: (t) => t.detail.preventInertia(),
          end: () => {},
        }
      },
      Kt,
      Qt,
      Jt,
      te,
      (t = {}) => ({ id: M(), ...t }),
      ee,
      ie,
      (t, e = [], n = !0) => {
        e.forEach((e) => delete t[e]), n && ee()
      },
      ae,
      se,
      (t, e, n = !0) => {
        V.forEach((n) => se(n, t, e, !1)), n && ee()
      },
      le,
      ce,
      ue,
      de,
      pe,
      ge,
      $e,
      ye,
      xe,
      be,
      ve,
      we,
      Se,
      ke,
      Pe,
      o,
      r,
      a,
      s,
      l,
      c,
      u,
      g,
      f,
      y,
      x,
      v,
      w,
      R,
      T,
      P,
      E,
      A,
      I,
      L,
      F,
      function (e) {
        wi(t, e)
      },
      (t, e) => fe(V[t]),
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(Le = t), n(11, Le)
        })
      },
      (t) => n(5, (je = t.detail)),
      (t) => Xh(t, dt),
    ]
  )
}
class rg extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        ig,
        og,
        Ao,
        {
          markup: 0,
          offset: 1,
          contextRotation: 43,
          contextFlipX: 44,
          contextFlipY: 45,
          scale: 46,
          ui: 42,
          opacity: 47,
          parentRect: 48,
          rootRect: 2,
          utilRect: 49,
          oninteractionstart: 50,
          oninteractionupdate: 51,
          oninteractionrelease: 52,
          oninteractionend: 53,
          onaddshape: 54,
          onupdateshape: 55,
          onselectshape: 56,
          onremoveshape: 57,
          beforeSelectShape: 58,
          beforeDeselectShape: 59,
          beforeRemoveShape: 60,
          beforeUpdateShape: 61,
          willRenderShapeControls: 62,
          mapEditorPointToImagePoint: 63,
          mapImagePointToEditorPoint: 64,
          eraseRadius: 65,
          selectRadius: 66,
          enableButtonFlipVertical: 67,
          locale: 3,
          createShape: 68,
          eraseShape: 69,
          getMarkupItemDraft: 70,
          addMarkupItemDraft: 71,
          confirmMarkupItemDraft: 72,
          discardMarkupItemDraft: 73,
          createMarkupItem: 74,
          syncShapes: 75,
          addShape: 76,
          removeMarkupShapeProps: 77,
          updateMarkupShape: 78,
          updateMarkupShapeProperty: 79,
          updateMarkupItemsShapeProperty: 80,
          updateMarkupShapeItems: 81,
          getActiveMarkupItem: 82,
          hasActiveMarkupItem: 83,
          removeShape: 84,
          removeActiveMarkupItem: 85,
          blurShapes: 86,
          selectShape: 4,
          deselectMarkupItem: 87,
          editMarkupItem: 88,
          finishEditMarkupItem: 89,
          removeMarkupItems: 90,
          getTextShapeRect: 91,
          getMarkupShapeRect: 92,
          getShapesNearPosition: 93,
          getMarkupBetweenPoints: 94,
        },
        [-1, -1, -1, -1, -1, -1]
      )
  }
  get createShape() {
    return this.$$.ctx[68]
  }
  get eraseShape() {
    return this.$$.ctx[69]
  }
  get getMarkupItemDraft() {
    return this.$$.ctx[70]
  }
  get addMarkupItemDraft() {
    return this.$$.ctx[71]
  }
  get confirmMarkupItemDraft() {
    return this.$$.ctx[72]
  }
  get discardMarkupItemDraft() {
    return this.$$.ctx[73]
  }
  get createMarkupItem() {
    return this.$$.ctx[74]
  }
  get syncShapes() {
    return this.$$.ctx[75]
  }
  get addShape() {
    return this.$$.ctx[76]
  }
  get removeMarkupShapeProps() {
    return this.$$.ctx[77]
  }
  get updateMarkupShape() {
    return this.$$.ctx[78]
  }
  get updateMarkupShapeProperty() {
    return this.$$.ctx[79]
  }
  get updateMarkupItemsShapeProperty() {
    return this.$$.ctx[80]
  }
  get updateMarkupShapeItems() {
    return this.$$.ctx[81]
  }
  get getActiveMarkupItem() {
    return this.$$.ctx[82]
  }
  get hasActiveMarkupItem() {
    return this.$$.ctx[83]
  }
  get removeShape() {
    return this.$$.ctx[84]
  }
  get removeActiveMarkupItem() {
    return this.$$.ctx[85]
  }
  get blurShapes() {
    return this.$$.ctx[86]
  }
  get selectShape() {
    return this.$$.ctx[4]
  }
  get deselectMarkupItem() {
    return this.$$.ctx[87]
  }
  get editMarkupItem() {
    return this.$$.ctx[88]
  }
  get finishEditMarkupItem() {
    return this.$$.ctx[89]
  }
  get removeMarkupItems() {
    return this.$$.ctx[90]
  }
  get getTextShapeRect() {
    return this.$$.ctx[91]
  }
  get getMarkupShapeRect() {
    return this.$$.ctx[92]
  }
  get getShapesNearPosition() {
    return this.$$.ctx[93]
  }
  get getMarkupBetweenPoints() {
    return this.$$.ctx[94]
  }
}
function ag(t, e, n) {
  const o = t.slice()
  return (o[7] = e[n]), o
}
function sg(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = Ol(e[7].componentProps.title, e[1]) + ''
  const u = [e[7].componentProps]
  var d = e[7].component
  function p(t) {
    let e = {}
    for (let t = 0; t < u.length; t += 1) e = Mo(e, u[t])
    return { props: e }
  }
  return (
    d && (a = new d(p())),
    {
      key: t,
      first: null,
      c() {
        ;(n = qo('li')),
          (o = qo('span')),
          (i = Qo(c)),
          (r = Jo()),
          a && Qi(a.$$.fragment),
          (s = Jo()),
          ii(o, 'class', 'PinturaShapeStyleLabel'),
          ii(n, 'class', 'PinturaShapeStyle'),
          (this.first = n)
      },
      m(t, e) {
        Go(t, n, e), Yo(n, o), Yo(o, i), Yo(n, r), a && Ji(a, n, null), Yo(n, s), (l = !0)
      },
      p(t, o) {
        ;(e = t), (!l || 3 & o) && c !== (c = Ol(e[7].componentProps.title, e[1]) + '') && ai(i, c)
        const r = 1 & o ? Zi(u, [qi(e[7].componentProps)]) : {}
        if (d !== (d = e[7].component)) {
          if (a) {
            _i()
            const t = a
            Ni(t.$$.fragment, 1, 0, () => {
              tr(t, 1)
            }),
              Wi()
          }
          d ? ((a = new d(p())), Qi(a.$$.fragment), Vi(a.$$.fragment, 1), Ji(a, n, s)) : (a = null)
        } else d && a.$set(r)
      },
      i(t) {
        l || (a && Vi(a.$$.fragment, t), (l = !0))
      },
      o(t) {
        a && Ni(a.$$.fragment, t), (l = !1)
      },
      d(t) {
        t && Zo(n), a && tr(a)
      },
    }
  )
}
function lg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0]
  const a = (t) => t[7].id
  for (let e = 0; e < r.length; e += 1) {
    let n = ag(t, r, e),
      s = a(n)
    i.set(s, (o[e] = sg(s, n)))
  }
  return {
    c() {
      e = qo('ul')
      for (let t = 0; t < o.length; t += 1) o[t].c()
      ii(e, 'class', 'PinturaShapeStyleList')
    },
    m(t, i) {
      Go(t, e, i)
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null)
      n = !0
    },
    p(t, n) {
      3 & n && ((r = t[0]), _i(), (o = Gi(o, n, a, 1, t, r, i, e, Yi, sg, null, ag)), Wi())
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Vi(o[t])
        n = !0
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Ni(o[t])
      n = !1
    },
    d(t) {
      t && Zo(e)
      for (let t = 0; t < o.length; t += 1) o[t].d()
    },
  }
}
function cg(t) {
  let e, n, o
  return (
    (n = new ul({
      props: {
        class: 'PinturaShapeStyles',
        elasticity: t[2],
        $$slots: { default: [lg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'style', t[3])
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, [i]) {
        const r = {}
        4 & i && (r.elasticity = t[2]),
          1027 & i && (r.$$scope = { dirty: i, ctx: t }),
          n.$set(r),
          (!o || 8 & i) && ii(e, 'style', t[3])
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function ug(t, e, n) {
  let o,
    i,
    { isActive: r = !1 } = e,
    { controls: a = [] } = e,
    { locale: s } = e,
    { scrollElasticity: l } = e
  const c = Ia(0)
  return (
    Fo(t, c, (t) => n(6, (i = t))),
    (t.$$set = (t) => {
      'isActive' in t && n(5, (r = t.isActive)),
        'controls' in t && n(0, (a = t.controls)),
        'locale' in t && n(1, (s = t.locale)),
        'scrollElasticity' in t && n(2, (l = t.scrollElasticity))
    }),
    (t.$$.update = () => {
      32 & t.$$.dirty && c.set(r ? 1 : 0),
        96 & t.$$.dirty &&
          n(3, (o = `opacity:${i};${!r && 'pointer-events:none;'}${i <= 0 && 'visibility:hidden'}`))
    }),
    [a, s, l, o, c, r, i]
  )
}
class dg extends or {
  constructor(t) {
    super(), nr(this, t, ug, cg, Ao, { isActive: 5, controls: 0, locale: 1, scrollElasticity: 2 })
  }
}
function pg(t, e, n) {
  const o = t.slice()
  return (o[11] = e[n].key), (o[2] = e[n].controls), (o[12] = e[n].isActive), o
}
function hg(t, e) {
  let n, o, i
  return (
    (o = new dg({
      props: { isActive: e[12], controls: e[2], locale: e[0], scrollElasticity: e[1] },
    })),
    {
      key: t,
      first: null,
      c() {
        ;(n = ti()), Qi(o.$$.fragment), (this.first = n)
      },
      m(t, e) {
        Go(t, n, e), Ji(o, t, e), (i = !0)
      },
      p(t, n) {
        e = t
        const i = {}
        8 & n && (i.isActive = e[12]),
          8 & n && (i.controls = e[2]),
          1 & n && (i.locale = e[0]),
          2 & n && (i.scrollElasticity = e[1]),
          o.$set(i)
      },
      i(t) {
        i || (Vi(o.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(o.$$.fragment, t), (i = !1)
      },
      d(t) {
        t && Zo(n), tr(o, t)
      },
    }
  )
}
function gg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[3]
  const a = (t) => t[11]
  for (let e = 0; e < r.length; e += 1) {
    let n = pg(t, r, e),
      s = a(n)
    i.set(s, (o[e] = hg(s, n)))
  }
  return {
    c() {
      e = qo('div')
      for (let t = 0; t < o.length; t += 1) o[t].c()
      ii(e, 'class', 'PinturaShapeStyleEditor')
    },
    m(t, i) {
      Go(t, e, i)
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null)
      n = !0
    },
    p(t, [n]) {
      11 & n && ((r = t[3]), _i(), (o = Gi(o, n, a, 1, t, r, i, e, Yi, hg, null, pg)), Wi())
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Vi(o[t])
        n = !0
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Ni(o[t])
      n = !1
    },
    d(t) {
      t && Zo(e)
      for (let t = 0; t < o.length; t += 1) o[t].d()
    },
  }
}
function mg(t, e, n) {
  let o,
    i,
    r,
    { controls: a = {} } = e,
    { shape: s } = e,
    { onchange: l } = e,
    { locale: c } = e,
    { scrollElasticity: u } = e
  const d = []
  return (
    (t.$$set = (t) => {
      'controls' in t && n(2, (a = t.controls)),
        'shape' in t && n(4, (s = t.shape)),
        'onchange' in t && n(5, (l = t.onchange)),
        'locale' in t && n(0, (c = t.locale)),
        'scrollElasticity' in t && n(1, (u = t.scrollElasticity))
    }),
    (t.$$.update = () => {
      4 & t.$$.dirty && n(6, (o = Object.keys(a).filter((t) => a[t]))),
        80 & t.$$.dirty &&
          n(
            7,
            (i =
              s && o && Bn(s)
                ? ((t) => {
                    const e = t.id || 'tool'
                    return o
                      .filter((e) => e.split('_').every((e) => t.hasOwnProperty(e) && Bn(t, e)))
                      .map((n) => {
                        const o = n.split('_'),
                          i = o.length > 1 ? o.map((e) => t[e]) : t[n],
                          [r, s] = a[n],
                          u = Ue(s.options) ? s.options(t) : s.options
                        return {
                          id: `${e}_${n}`,
                          component: r,
                          componentProps: {
                            ...s,
                            options: u,
                            locale: c,
                            value: i,
                            optionLabelClass: 'PinturaButtonLabel',
                            onchange: (e) => {
                              const i = x(e) && !He(e) ? e.value : e
                              s.onchange && s.onchange(i, t)
                              const r =
                                o.length > 1
                                  ? o.reduce(
                                      (t, e, n) => ({ ...t, [e]: Array.isArray(i) ? i[n] : i }),
                                      {}
                                    )
                                  : { [n]: i }
                              l(r)
                            },
                          },
                        }
                      })
                  })(s)
                : [])
          ),
        144 & t.$$.dirty &&
          n(
            3,
            (r = ((t, e) => {
              let n = d.find((e) => e.key === t)
              return (
                n || ((n = { key: t, controls: e }), d.push(n)),
                d.forEach((t) => (t.isActive = !1)),
                (n.controls = e),
                (n.isActive = !0),
                d
              )
            })(Object.keys(s).join('_'), i))
          )
    }),
    [c, u, a, r, s, l, o, i]
  )
}
class fg extends or {
  constructor(t) {
    super(),
      nr(this, t, mg, gg, Ao, {
        controls: 2,
        shape: 4,
        onchange: 5,
        locale: 0,
        scrollElasticity: 1,
      })
  }
}
function $g(t) {
  let e, n, o
  return {
    c() {
      ;(e = qo('button')),
        ii(e, 'class', 'PinturaDragButton'),
        ii(e, 'title', t[1]),
        (e.disabled = t[2])
    },
    m(i, r) {
      Go(i, e, r), (e.innerHTML = t[0]), t[9](e), n || ((o = ei(e, 'pointerdown', t[4])), (n = !0))
    },
    p(t, [n]) {
      1 & n && (e.innerHTML = t[0]), 2 & n && ii(e, 'title', t[1]), 4 & n && (e.disabled = t[2])
    },
    i: ko,
    o: ko,
    d(i) {
      i && Zo(e), t[9](null), (n = !1), o()
    },
  }
}
function yg(t, e, n) {
  let o,
    { html: r } = e,
    { title: a } = e,
    { onclick: s } = e,
    { disabled: l = !1 } = e,
    { ongrab: c = i } = e,
    { ondrag: u = i } = e,
    { ondrop: d = i } = e
  const p = (t) => rt(h, j(t.pageX, t.pageY)) < 256
  let h
  const g = (t) => {
      document.documentElement.removeEventListener('pointermove', m),
        document.documentElement.removeEventListener('pointerup', g)
      const e = j(t.pageX, t.pageY)
      if (rt(h, e) < 32) return s(t)
      p(t) || d(t)
    },
    m = (t) => {
      p(t) || u(t)
    }
  return (
    (t.$$set = (t) => {
      'html' in t && n(0, (r = t.html)),
        'title' in t && n(1, (a = t.title)),
        'onclick' in t && n(5, (s = t.onclick)),
        'disabled' in t && n(2, (l = t.disabled)),
        'ongrab' in t && n(6, (c = t.ongrab)),
        'ondrag' in t && n(7, (u = t.ondrag)),
        'ondrop' in t && n(8, (d = t.ondrop))
    }),
    [
      r,
      a,
      l,
      o,
      (t) => {
        ;(h = j(t.pageX, t.pageY)),
          c(t),
          document.documentElement.addEventListener('pointermove', m),
          document.documentElement.addEventListener('pointerup', g)
      },
      s,
      c,
      u,
      d,
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(o = t), n(3, o)
        })
      },
    ]
  )
}
class xg extends or {
  constructor(t) {
    super(),
      nr(this, t, yg, $g, Ao, {
        html: 0,
        title: 1,
        onclick: 5,
        disabled: 2,
        ongrab: 6,
        ondrag: 7,
        ondrop: 8,
      })
  }
}
function bg(t, e, n) {
  const o = t.slice()
  return (o[14] = e[n]), o
}
function vg(t, e) {
  let n, o, i, r, a, s, l
  function c() {
    return e[10](e[14])
  }
  function u(...t) {
    return e[11](e[14], ...t)
  }
  function d(...t) {
    return e[12](e[14], ...t)
  }
  function p(...t) {
    return e[13](e[14], ...t)
  }
  return (
    (o = new xg({
      props: {
        onclick: c,
        ongrab: u,
        ondrag: d,
        ondrop: p,
        disabled: e[1] || e[14].disabled,
        title: e[14].title,
        html: e[14].thumb,
      },
    })),
    {
      key: t,
      first: null,
      c() {
        ;(n = qo('li')),
          Qi(o.$$.fragment),
          (i = Jo()),
          ii(n, 'class', 'PinturaShapePreset'),
          ii(n, 'style', e[6]),
          (this.first = n)
      },
      m(t, c) {
        Go(t, n, c),
          Ji(o, n, null),
          Yo(n, i),
          (a = !0),
          s || ((l = Wo((r = e[8].call(null, n, e[14])))), (s = !0))
      },
      p(t, i) {
        e = t
        const s = {}
        5 & i && (s.onclick = c),
          9 & i && (s.ongrab = u),
          17 & i && (s.ondrag = d),
          33 & i && (s.ondrop = p),
          3 & i && (s.disabled = e[1] || e[14].disabled),
          1 & i && (s.title = e[14].title),
          1 & i && (s.html = e[14].thumb),
          o.$set(s),
          (!a || 64 & i) && ii(n, 'style', e[6]),
          r && Eo(r.update) && 1 & i && r.update.call(null, e[14])
      },
      i(t) {
        a || (Vi(o.$$.fragment, t), (a = !0))
      },
      o(t) {
        Ni(o.$$.fragment, t), (a = !1)
      },
      d(t) {
        t && Zo(n), tr(o), (s = !1), l()
      },
    }
  )
}
function wg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0]
  const a = (t) => t[14].id
  for (let e = 0; e < r.length; e += 1) {
    let n = bg(t, r, e),
      s = a(n)
    i.set(s, (o[e] = vg(s, n)))
  }
  return {
    c() {
      e = qo('ul')
      for (let t = 0; t < o.length; t += 1) o[t].c()
      ii(e, 'class', 'PinturaShapePresetsList')
    },
    m(t, i) {
      Go(t, e, i)
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null)
      n = !0
    },
    p(t, [n]) {
      127 & n && ((r = t[0]), _i(), (o = Gi(o, n, a, 1, t, r, i, e, Yi, vg, null, bg)), Wi())
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Vi(o[t])
        n = !0
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Ni(o[t])
      n = !1
    },
    d(t) {
      t && Zo(e)
      for (let t = 0; t < o.length; t += 1) o[t].d()
    },
  }
}
function Sg(t, e, n) {
  let o,
    i,
    { presets: r } = e,
    { disabled: a } = e,
    { onclickpreset: s } = e,
    { ongrabpreset: l } = e,
    { ondragpreset: c } = e,
    { ondroppreset: u } = e
  const d = Ea(0, { duration: 300 })
  Fo(t, d, (t) => n(9, (i = t)))
  fi(() => d.set(1))
  return (
    (t.$$set = (t) => {
      'presets' in t && n(0, (r = t.presets)),
        'disabled' in t && n(1, (a = t.disabled)),
        'onclickpreset' in t && n(2, (s = t.onclickpreset)),
        'ongrabpreset' in t && n(3, (l = t.ongrabpreset)),
        'ondragpreset' in t && n(4, (c = t.ondragpreset)),
        'ondroppreset' in t && n(5, (u = t.ondroppreset))
    }),
    (t.$$.update = () => {
      512 & t.$$.dirty && n(6, (o = 'opacity:' + i))
    }),
    [
      r,
      a,
      s,
      l,
      c,
      u,
      o,
      d,
      (t, e) => e.mount && e.mount(t.firstChild, e),
      i,
      (t) => s(t.id),
      (t, e) => l(t.id, e),
      (t, e) => c(t.id, e),
      (t, e) => u(t.id, e),
    ]
  )
}
class kg extends or {
  constructor(t) {
    super(),
      nr(this, t, Sg, wg, Ao, {
        presets: 0,
        disabled: 1,
        onclickpreset: 2,
        ongrabpreset: 3,
        ondragpreset: 4,
        ondroppreset: 5,
      })
  }
}
function Cg(t) {
  let e, n
  return (
    (e = new Pc({ props: { items: t[13] } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8192 & n && (o.items = t[13]), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Mg(t) {
  let e, n, o, i
  const r = [Tg, Rg],
    a = []
  function s(t, e) {
    return t[7] ? 0 : 1
  }
  return (
    (e = s(t)),
    (n = a[e] = r[e](t)),
    {
      c() {
        n.c(), (o = ti())
      },
      m(t, n) {
        a[e].m(t, n), Go(t, o, n), (i = !0)
      },
      p(t, i) {
        let l = e
        ;(e = s(t)),
          e === l
            ? a[e].p(t, i)
            : (_i(),
              Ni(a[l], 1, 1, () => {
                a[l] = null
              }),
              Wi(),
              (n = a[e]),
              n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
              Vi(n, 1),
              n.m(o.parentNode, o))
      },
      i(t) {
        i || (Vi(n), (i = !0))
      },
      o(t) {
        Ni(n), (i = !1)
      },
      d(t) {
        a[e].d(t), t && Zo(o)
      },
    }
  )
}
function Rg(t) {
  let e,
    n,
    o,
    i,
    r = t[13] && Pg(t)
  return (
    (o = new ul({
      props: {
        scrollAutoCancel: t[6],
        elasticity: t[0],
        $$slots: { default: [Eg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        ;(e = qo('div')),
          r && r.c(),
          (n = Jo()),
          Qi(o.$$.fragment),
          ii(e, 'class', 'PinturaShapePresetsFlat')
      },
      m(t, a) {
        Go(t, e, a), r && r.m(e, null), Yo(e, n), Ji(o, e, null), (i = !0)
      },
      p(t, i) {
        t[13]
          ? r
            ? (r.p(t, i), 8192 & i && Vi(r, 1))
            : ((r = Pg(t)), r.c(), Vi(r, 1), r.m(e, n))
          : r &&
            (_i(),
            Ni(r, 1, 1, () => {
              r = null
            }),
            Wi())
        const a = {}
        64 & i && (a.scrollAutoCancel = t[6]),
          1 & i && (a.elasticity = t[0]),
          536870974 & i && (a.$$scope = { dirty: i, ctx: t }),
          o.$set(a)
      },
      i(t) {
        i || (Vi(r), Vi(o.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(r), Ni(o.$$.fragment, t), (i = !1)
      },
      d(t) {
        t && Zo(e), r && r.d(), tr(o)
      },
    }
  )
}
function Tg(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[13] && Ag(t)
  const c = [{ class: 'PinturaControlList' }, { tabs: t[8] }, t[11], { layout: 'compact' }]
  let u = {
    $$slots: { default: [Bg, ({ tab: t }) => ({ 28: t }), ({ tab: t }) => (t ? 268435456 : 0)] },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < c.length; t += 1) u = Mo(u, c[t])
  ;(i = new Ts({ props: u })), i.$on('select', t[18])
  const d = [
    { class: 'PinturaControlPanels' },
    { panelClass: 'PinturaControlPanel' },
    { panels: t[12] },
    t[11],
  ]
  let p = {
    $$slots: {
      default: [
        Dg,
        ({ panel: t, panelIsActive: e }) => ({ 26: t, 27: e }),
        ({ panel: t, panelIsActive: e }) => (t ? 67108864 : 0) | (e ? 134217728 : 0),
      ],
    },
    $$scope: { ctx: t },
  }
  for (let t = 0; t < d.length; t += 1) p = Mo(p, d[t])
  return (
    (a = new Ws({ props: p })),
    {
      c() {
        ;(e = qo('div')),
          (n = qo('div')),
          l && l.c(),
          (o = Jo()),
          Qi(i.$$.fragment),
          (r = Jo()),
          Qi(a.$$.fragment),
          ii(n, 'class', 'PinturaShapePresetsGroups'),
          ii(e, 'class', 'PinturaShapePresetsGrouped')
      },
      m(t, c) {
        Go(t, e, c),
          Yo(e, n),
          l && l.m(n, null),
          Yo(n, o),
          Ji(i, n, null),
          Yo(e, r),
          Ji(a, e, null),
          (s = !0)
      },
      p(t, e) {
        t[13]
          ? l
            ? (l.p(t, e), 8192 & e && Vi(l, 1))
            : ((l = Ag(t)), l.c(), Vi(l, 1), l.m(n, o))
          : l &&
            (_i(),
            Ni(l, 1, 1, () => {
              l = null
            }),
            Wi())
        const r =
          2304 & e ? Zi(c, [c[0], 256 & e && { tabs: t[8] }, 2048 & e && qi(t[11]), c[3]]) : {}
        805306368 & e && (r.$$scope = { dirty: e, ctx: t }), i.$set(r)
        const s =
          6144 & e ? Zi(d, [d[0], d[1], 4096 & e && { panels: t[12] }, 2048 & e && qi(t[11])]) : {}
        738198623 & e && (s.$$scope = { dirty: e, ctx: t }), a.$set(s)
      },
      i(t) {
        s || (Vi(l), Vi(i.$$.fragment, t), Vi(a.$$.fragment, t), (s = !0))
      },
      o(t) {
        Ni(l), Ni(i.$$.fragment, t), Ni(a.$$.fragment, t), (s = !1)
      },
      d(t) {
        t && Zo(e), l && l.d(), tr(i), tr(a)
      },
    }
  )
}
function Pg(t) {
  let e, n
  return (
    (e = new Pc({ props: { items: t[13] } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8192 & n && (o.items = t[13]), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Eg(t) {
  let e, n
  return (
    (e = new kg({
      props: {
        presets: t[5],
        onclickpreset: t[1],
        ongrabpreset: t[2],
        ondragpreset: t[3],
        ondroppreset: t[4],
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        32 & n && (o.presets = t[5]),
          2 & n && (o.onclickpreset = t[1]),
          4 & n && (o.ongrabpreset = t[2]),
          8 & n && (o.ondragpreset = t[3]),
          16 & n && (o.ondroppreset = t[4]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Ag(t) {
  let e, n
  return (
    (e = new Pc({ props: { items: t[13] } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8192 & n && (o.items = t[13]), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Ig(t) {
  let e, n
  return (
    (e = new js({ props: { $$slots: { default: [Lg] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        805306368 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Lg(t) {
  let e,
    n = t[28].icon + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      268435456 & o && n !== (n = t[28].icon + '') && (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Fg(t) {
  let e,
    n,
    o = t[28].label + ''
  return {
    c() {
      ;(e = qo('span')), (n = Qo(o))
    },
    m(t, o) {
      Go(t, e, o), Yo(e, n)
    },
    p(t, e) {
      268435456 & e && o !== (o = t[28].label + '') && ai(n, o)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Bg(t) {
  let e,
    n,
    o,
    i = t[28].icon && Ig(t),
    r = !t[28].hideLabel && Fg(t)
  return {
    c() {
      i && i.c(), (e = Jo()), r && r.c(), (n = ti())
    },
    m(t, a) {
      i && i.m(t, a), Go(t, e, a), r && r.m(t, a), Go(t, n, a), (o = !0)
    },
    p(t, o) {
      t[28].icon
        ? i
          ? (i.p(t, o), 268435456 & o && Vi(i, 1))
          : ((i = Ig(t)), i.c(), Vi(i, 1), i.m(e.parentNode, e))
        : i &&
          (_i(),
          Ni(i, 1, 1, () => {
            i = null
          }),
          Wi()),
        t[28].hideLabel
          ? r && (r.d(1), (r = null))
          : r
          ? r.p(t, o)
          : ((r = Fg(t)), r.c(), r.m(n.parentNode, n))
    },
    i(t) {
      o || (Vi(i), (o = !0))
    },
    o(t) {
      Ni(i), (o = !1)
    },
    d(t) {
      i && i.d(t), t && Zo(e), r && r.d(t), t && Zo(n)
    },
  }
}
function zg(t) {
  let e, n
  return (
    (e = new kg({
      props: {
        presets: t[10][t[26]].items,
        disabled: t[10][t[26]].disabled,
        onclickpreset: t[1],
        ongrabpreset: t[2],
        ondragpreset: t[3],
        ondroppreset: t[4],
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        67109888 & n && (o.presets = t[10][t[26]].items),
          67109888 & n && (o.disabled = t[10][t[26]].disabled),
          2 & n && (o.onclickpreset = t[1]),
          4 & n && (o.ongrabpreset = t[2]),
          8 & n && (o.ondragpreset = t[3]),
          16 & n && (o.ondroppreset = t[4]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Dg(t) {
  let e, n
  return (
    (e = new ul({
      props: {
        scroll: t[27] ? { scrollOffset: 0, animate: !1 } : void 0,
        scrollAutoCancel: t[6],
        elasticity: t[0],
        $$slots: { default: [zg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        134217728 & n && (o.scroll = t[27] ? { scrollOffset: 0, animate: !1 } : void 0),
          64 & n && (o.scrollAutoCancel = t[6]),
          1 & n && (o.elasticity = t[0]),
          603980830 & n && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Og(t) {
  let e, n, o, i
  const r = [Mg, Cg],
    a = []
  function s(t, e) {
    return t[6] ? 0 : t[13] ? 1 : -1
  }
  return (
    ~(n = s(t)) && (o = a[n] = r[n](t)),
    {
      c() {
        ;(e = qo('div')), o && o.c(), ii(e, 'class', 'PinturaShapePresetsPalette')
      },
      m(t, o) {
        Go(t, e, o), ~n && a[n].m(e, null), (i = !0)
      },
      p(t, [i]) {
        let l = n
        ;(n = s(t)),
          n === l
            ? ~n && a[n].p(t, i)
            : (o &&
                (_i(),
                Ni(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Wi()),
              ~n
                ? ((o = a[n]),
                  o ? o.p(t, i) : ((o = a[n] = r[n](t)), o.c()),
                  Vi(o, 1),
                  o.m(e, null))
                : (o = null))
      },
      i(t) {
        i || (Vi(o), (i = !0))
      },
      o(t) {
        Ni(o), (i = !1)
      },
      d(t) {
        t && Zo(e), ~n && a[n].d()
      },
    }
  )
}
function _g(t, e, n) {
  let o,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    { locale: g } = e,
    { presets: m } = e,
    { scrollElasticity: f } = e,
    { enableSelectImage: $ = !0 } = e,
    { willRenderPresetToolbar: y = O } = e,
    { onaddpreset: x = i } = e,
    { ongrabpreset: b = i } = e,
    { ondragpreset: v = i } = e,
    { ondroppreset: S = i } = e
  const k = 'presets-' + M(),
    C = (t, e = '') => (/<svg /.test(t) ? t : Ve(t) ? Ze(t, e) : `<img src="${t}" alt="${e}"/>`),
    R = (t) => L(le(t)),
    T = ['src', 'alt', 'thumb', 'shape', 'id', 'mount', 'disabled'],
    P = (t) =>
      t.map((t) =>
        ((t) => He(t) && w(t[0]) && He(t[1]))(t)
          ? { ...t[2], id: `${k}-${t[0].toLowerCase()}`, label: t[0], items: P(t[1]) }
          : ((t) => {
              let e,
                n,
                o,
                i,
                r,
                a,
                s,
                l = t
              return (
                w(t)
                  ? Ve(t)
                    ? ((e = t), (r = t), (i = C(e, r)))
                    : ((e = t), (r = R(e)), (i = C(e, r)))
                  : ((e = t.src),
                    (r = t.alt || (w(e) ? R(e) : w(t.thumb) ? R(t.thumb) : void 0)),
                    (i = C(t.thumb || e, r)),
                    (n = t.shape),
                    (a = t.mount),
                    (s = t.disabled),
                    (o = Object.keys(t).reduce((e, n) => (T.includes(n) || (e[n] = t[n]), e), {}))),
                {
                  id: l,
                  src: e,
                  thumb: i,
                  shape: n,
                  shapeProps: o,
                  alt: r,
                  title: r,
                  mount: a,
                  disabled: s,
                }
              )
            })(t)
      )
  return (
    (t.$$set = (t) => {
      'locale' in t && n(14, (g = t.locale)),
        'presets' in t && n(15, (m = t.presets)),
        'scrollElasticity' in t && n(0, (f = t.scrollElasticity)),
        'enableSelectImage' in t && n(16, ($ = t.enableSelectImage)),
        'willRenderPresetToolbar' in t && n(17, (y = t.willRenderPresetToolbar)),
        'onaddpreset' in t && n(1, (x = t.onaddpreset)),
        'ongrabpreset' in t && n(2, (b = t.ongrabpreset)),
        'ondragpreset' in t && n(3, (v = t.ondragpreset)),
        'ondroppreset' in t && n(4, (S = t.ondroppreset))
    }),
    (t.$$.update = () => {
      32768 & t.$$.dirty && n(5, (o = P(m))),
        32 & t.$$.dirty && n(6, (r = o.length)),
        96 & t.$$.dirty && n(7, (a = r && o.some((t) => !!t.items))),
        160 & t.$$.dirty && n(8, (s = a && o)),
        160 & t.$$.dirty && n(10, (l = a && o.reduce((t, e) => ((t[e.id] = e), t), {}))),
        768 & t.$$.dirty && n(9, (c = c || (s && (s.find((t) => !t.disabled) || {}).id))),
        512 & t.$$.dirty && n(11, (u = { name: k, selected: c })),
        256 & t.$$.dirty && n(12, (d = s && s.map((t) => t.id))),
        212994 & t.$$.dirty &&
          n(
            13,
            (p =
              g &&
              y([
                $ && [
                  'Button',
                  'browse',
                  {
                    label: g.shapeLabelButtonSelectSticker,
                    icon: g.shapeIconButtonSelectSticker,
                    onclick: () => {
                      const t = h('input', {
                        type: 'file',
                        accept: 'image/*',
                        onchange: () => {
                          const [e] = t.files
                          e && x(e)
                        },
                      })
                      t.click()
                    },
                  },
                ],
              ]))
          )
    }),
    [f, x, b, v, S, o, r, a, s, c, l, u, d, p, g, m, $, y, ({ detail: t }) => n(9, (c = t))]
  )
}
class Wg extends or {
  constructor(t) {
    super(),
      nr(this, t, _g, Og, Ao, {
        locale: 14,
        presets: 15,
        scrollElasticity: 0,
        enableSelectImage: 16,
        willRenderPresetToolbar: 17,
        onaddpreset: 1,
        ongrabpreset: 2,
        ondragpreset: 3,
        ondroppreset: 4,
      })
  }
}
function Vg(t) {
  let e, n, o, i
  const r = [
    { locale: t[4] },
    { parentRect: t[29] },
    { rootRect: t[23] },
    { utilRect: t[19] },
    { offset: t[25] },
    { scale: t[36] },
    { contextRotation: t[13] },
    { contextFlipX: t[14] },
    { contextFlipY: t[15] },
    { opacity: t[21] },
    { eraseRadius: t[27] },
    { selectRadius: t[6] },
    { enableButtonFlipVertical: t[8] },
    { mapEditorPointToImagePoint: t[11] },
    { mapImagePointToEditorPoint: t[12] },
    { oninteractionstart: t[47] },
    { oninteractionupdate: t[48] },
    { oninteractionrelease: t[49] },
    { oninteractionend: t[50] },
    { onaddshape: t[78] },
    { onselectshape: t[79] },
    { onupdateshape: t[80] },
    { onremoveshape: t[81] },
    t[33],
  ]
  function a(e) {
    t[83](e)
  }
  function s(e) {
    t[84](e)
  }
  let l = {}
  for (let t = 0; t < r.length; t += 1) l = Mo(l, r[t])
  return (
    void 0 !== t[20] && (l.markup = t[20]),
    void 0 !== t[35] && (l.ui = t[35]),
    (e = new rg({ props: l })),
    t[82](e),
    ki.push(() => Ki(e, 'markup', a)),
    ki.push(() => Ki(e, 'ui', s)),
    e.$on('measure', t[85]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, n) {
        Ji(e, t, n), (i = !0)
      },
      p(t, i) {
        const a =
          (1789458768 & i[0]) | (68091940 & i[1])
            ? Zi(r, [
                16 & i[0] && { locale: t[4] },
                536870912 & i[0] && { parentRect: t[29] },
                8388608 & i[0] && { rootRect: t[23] },
                524288 & i[0] && { utilRect: t[19] },
                33554432 & i[0] && { offset: t[25] },
                32 & i[1] && { scale: t[36] },
                8192 & i[0] && { contextRotation: t[13] },
                16384 & i[0] && { contextFlipX: t[14] },
                32768 & i[0] && { contextFlipY: t[15] },
                2097152 & i[0] && { opacity: t[21] },
                134217728 & i[0] && { eraseRadius: t[27] },
                64 & i[0] && { selectRadius: t[6] },
                256 & i[0] && { enableButtonFlipVertical: t[8] },
                2048 & i[0] && { mapEditorPointToImagePoint: t[11] },
                4096 & i[0] && { mapImagePointToEditorPoint: t[12] },
                65536 & i[1] && { oninteractionstart: t[47] },
                131072 & i[1] && { oninteractionupdate: t[48] },
                262144 & i[1] && { oninteractionrelease: t[49] },
                524288 & i[1] && { oninteractionend: t[50] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onaddshape: t[78] },
                1073741824 & i[0] && { onselectshape: t[79] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onupdateshape: t[80] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onremoveshape: t[81] },
                4 & i[1] && qi(t[33]),
              ])
            : {}
        !n && 1048576 & i[0] && ((n = !0), (a.markup = t[20]), Ei(() => (n = !1))),
          !o && 16 & i[1] && ((o = !0), (a.ui = t[35]), Ei(() => (o = !1))),
          e.$set(a)
      },
      i(t) {
        i || (Vi(e.$$.fragment, t), (i = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (i = !1)
      },
      d(n) {
        t[82](null), tr(e, n)
      },
    }
  )
}
function Ng(t) {
  let e,
    n,
    o,
    i,
    r = t[24] && Vg(t)
  return {
    c() {
      var t, n, o
      ;(e = qo('div')),
        r && r.c(),
        ii(e, 'slot', 'main'),
        (t = 'cursor'),
        (n = 'crosshair'),
        e.style.setProperty(t, n, o ? 'important' : '')
    },
    m(a, s) {
      Go(a, e, s),
        r && r.m(e, null),
        t[86](e),
        (n = !0),
        o || ((i = [Wo(ja.call(null, e)), ei(e, 'dropfiles', t[56])]), (o = !0))
    },
    p(t, n) {
      t[24]
        ? r
          ? (r.p(t, n), 16777216 & n[0] && Vi(r, 1))
          : ((r = Vg(t)), r.c(), Vi(r, 1), r.m(e, null))
        : r &&
          (_i(),
          Ni(r, 1, 1, () => {
            r = null
          }),
          Wi())
    },
    i(t) {
      n || (Vi(r), (n = !0))
    },
    o(t) {
      Ni(r), (n = !1)
    },
    d(n) {
      n && Zo(e), r && r.d(), t[86](null), (o = !1), Po(i)
    },
  }
}
function Ug(t) {
  let e, n
  return (
    (e = new Wg({
      props: {
        locale: t[4],
        presets: t[10],
        enableSelectImage: t[9],
        willRenderPresetToolbar: t[32],
        onaddpreset: t[55],
        ongrabpreset: t[52],
        ondragpreset: t[53],
        ondroppreset: t[54],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        16 & n[0] && (o.locale = t[4]),
          1024 & n[0] && (o.presets = t[10]),
          512 & n[0] && (o.enableSelectImage = t[9]),
          2 & n[1] && (o.willRenderPresetToolbar = t[32]),
          1 & n[1] && (o.scrollElasticity = t[31]),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Hg(t) {
  let e, n, o, i, r, a
  const s = [jg, Xg],
    l = []
  function c(t, e) {
    return t[28] ? 0 : 1
  }
  return (
    (n = c(t)),
    (o = l[n] = s[n](t)),
    (r = new ul({
      props: {
        class: 'PinturaControlListScroller',
        elasticity: t[31],
        $$slots: { default: [qg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        ;(e = qo('div')),
          o.c(),
          (i = Jo()),
          Qi(r.$$.fragment),
          ii(e, 'class', 'PinturaControlPanels')
      },
      m(t, o) {
        Go(t, e, o), l[n].m(e, null), Go(t, i, o), Ji(r, t, o), (a = !0)
      },
      p(t, i) {
        let a = n
        ;(n = c(t)),
          n === a
            ? l[n].p(t, i)
            : (_i(),
              Ni(l[a], 1, 1, () => {
                l[a] = null
              }),
              Wi(),
              (o = l[n]),
              o ? o.p(t, i) : ((o = l[n] = s[n](t)), o.c()),
              Vi(o, 1),
              o.m(e, null))
        const u = {}
        1 & i[1] && (u.elasticity = t[31]),
          (4194321 & i[0]) | (128 & i[3]) && (u.$$scope = { dirty: i, ctx: t }),
          r.$set(u)
      },
      i(t) {
        a || (Vi(o), Vi(r.$$.fragment, t), (a = !0))
      },
      o(t) {
        Ni(o), Ni(r.$$.fragment, t), (a = !1)
      },
      d(t) {
        t && Zo(e), l[n].d(), t && Zo(i), tr(r, t)
      },
    }
  )
}
function Xg(t) {
  let e, n, o
  return (
    (n = new fg({
      props: {
        locale: t[4],
        shape: t[26],
        onchange: t[51],
        controls: t[7],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'class', 'PinturaControlPanel')
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, e) {
        const o = {}
        16 & e[0] && (o.locale = t[4]),
          67108864 & e[0] && (o.shape = t[26]),
          128 & e[0] && (o.controls = t[7]),
          1 & e[1] && (o.scrollElasticity = t[31]),
          n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function jg(t) {
  let e, n, o
  return (
    (n = new Wg({
      props: {
        locale: t[4],
        presets: t[10],
        enableSelectImage: t[9],
        willRenderPresetToolbar: t[32],
        onaddpreset: t[55],
        ongrabpreset: t[52],
        ondragpreset: t[53],
        ondroppreset: t[54],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        ;(e = qo('div')), Qi(n.$$.fragment), ii(e, 'class', 'PinturaControlPanel')
      },
      m(t, i) {
        Go(t, e, i), Ji(n, e, null), (o = !0)
      },
      p(t, e) {
        const o = {}
        16 & e[0] && (o.locale = t[4]),
          1024 & e[0] && (o.presets = t[10]),
          512 & e[0] && (o.enableSelectImage = t[9]),
          2 & e[1] && (o.willRenderPresetToolbar = t[32]),
          1 & e[1] && (o.scrollElasticity = t[31]),
          n.$set(o)
      },
      i(t) {
        o || (Vi(n.$$.fragment, t), (o = !0))
      },
      o(t) {
        Ni(n.$$.fragment, t), (o = !1)
      },
      d(t) {
        t && Zo(e), tr(n)
      },
    }
  )
}
function Yg(t) {
  let e, n
  return (
    (e = new js({ props: { $$slots: { default: [Gg] }, $$scope: { ctx: t } } })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        ;(16 & n[0]) | (192 & n[3]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Gg(t) {
  let e,
    n = (Ue(t[99].icon) ? t[99].icon(t[4]) : t[99].icon) + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      ;(16 & o[0]) | (64 & o[3]) &&
        n !== (n = (Ue(t[99].icon) ? t[99].icon(t[4]) : t[99].icon) + '') &&
        (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function Zg(t) {
  let e,
    n,
    o,
    i,
    r,
    a = (Ue(t[99].label) ? t[99].label(t[4]) : t[99].label) + '',
    s = t[99].icon && Yg(t)
  return {
    c() {
      ;(e = qo('div')),
        s && s.c(),
        (n = Jo()),
        (o = qo('span')),
        (i = Qo(a)),
        ii(e, 'slot', 'option')
    },
    m(t, a) {
      Go(t, e, a), s && s.m(e, null), Yo(e, n), Yo(e, o), Yo(o, i), (r = !0)
    },
    p(t, o) {
      t[99].icon
        ? s
          ? (s.p(t, o), 64 & o[3] && Vi(s, 1))
          : ((s = Yg(t)), s.c(), Vi(s, 1), s.m(e, n))
        : s &&
          (_i(),
          Ni(s, 1, 1, () => {
            s = null
          }),
          Wi()),
        (!r || (16 & o[0]) | (64 & o[3])) &&
          a !== (a = (Ue(t[99].label) ? t[99].label(t[4]) : t[99].label) + '') &&
          ai(i, a)
    },
    i(t) {
      r || (Vi(s), (r = !0))
    },
    o(t) {
      Ni(s), (r = !1)
    },
    d(t) {
      t && Zo(e), s && s.d()
    },
  }
}
function qg(t) {
  let e, n
  return (
    (e = new dc({
      props: {
        locale: t[4],
        class: 'PinturaControlList',
        optionClass: 'PinturaControlListOption',
        layout: 'row',
        options: t[22],
        selectedIndex: t[22].findIndex(t[77]),
        onchange: t[46],
        $$slots: {
          option: [Zg, ({ option: t }) => ({ 99: t }), ({ option: t }) => [0, 0, 0, t ? 64 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        16 & n[0] && (o.locale = t[4]),
          4194304 & n[0] && (o.options = t[22]),
          4194305 & n[0] && (o.selectedIndex = t[22].findIndex(t[77])),
          (16 & n[0]) | (192 & n[3]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Kg(t) {
  let e, n, o, i
  const r = [Hg, Ug],
    a = []
  function s(t, e) {
    return t[22].length ? 0 : t[28] ? 1 : -1
  }
  return (
    ~(n = s(t)) && (o = a[n] = r[n](t)),
    {
      c() {
        ;(e = qo('div')), o && o.c(), ii(e, 'slot', 'footer'), ii(e, 'style', t[34])
      },
      m(t, o) {
        Go(t, e, o), ~n && a[n].m(e, null), (i = !0)
      },
      p(t, l) {
        let c = n
        ;(n = s(t)),
          n === c
            ? ~n && a[n].p(t, l)
            : (o &&
                (_i(),
                Ni(a[c], 1, 1, () => {
                  a[c] = null
                }),
                Wi()),
              ~n
                ? ((o = a[n]),
                  o ? o.p(t, l) : ((o = a[n] = r[n](t)), o.c()),
                  Vi(o, 1),
                  o.m(e, null))
                : (o = null)),
          (!i || 8 & l[1]) && ii(e, 'style', t[34])
      },
      i(t) {
        i || (Vi(o), (i = !0))
      },
      o(t) {
        Ni(o), (i = !1)
      },
      d(t) {
        t && Zo(e), ~n && a[n].d()
      },
    }
  )
}
function Qg(t) {
  let e, n
  return (
    (e = new Sp({ props: { $$slots: { footer: [Kg], main: [Ng] }, $$scope: { ctx: t } } })),
    e.$on('measure', t[87]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        ;(2147418065 & n[0]) | (63 & n[1]) | (128 & n[3]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function Jg(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L = ko,
    F = () => (L(), (L = Io(H, (t) => n(66, (x = t)))), H),
    B = ko,
    z = () => (B(), (B = Io(Y, (t) => n(69, (v = t)))), Y),
    D = ko,
    _ = () => (D(), (D = Io(q, (t) => n(20, (k = t)))), q),
    W = ko,
    V = () => (W(), (W = Io(X, (t) => n(21, (C = t)))), X),
    N = ko,
    U = () => (N(), (N = Io(pt, (t) => n(29, (R = t)))), pt)
  t.$$.on_destroy.push(() => L()),
    t.$$.on_destroy.push(() => B()),
    t.$$.on_destroy.push(() => D()),
    t.$$.on_destroy.push(() => W()),
    t.$$.on_destroy.push(() => N())
  let { isActive: H } = e
  F()
  let { isActiveFraction: X } = e
  V()
  let { isVisible: Y } = e
  z()
  let { stores: G } = e,
    { locale: Z = {} } = e,
    { shapes: q = [] } = e
  _()
  let { tools: K = [] } = e,
    { toolShapes: Q = [] } = e,
    { toolActive: J = 'sharpie' } = e,
    { toolSelectRadius: tt } = e,
    { shapeControls: et = [] } = e,
    { enableButtonFlipVertical: nt = !1 } = e,
    { enablePresetSelectImage: ot = !0 } = e,
    { willRenderPresetToolbar: it } = e,
    { shapePresets: rt = [] } = e,
    { utilKey: at } = e,
    { mapScreenPointToImagePoint: st } = e,
    { mapImagePointToScreenPoint: lt } = e,
    { imageRotation: ct = 0 } = e,
    { imageFlipX: ut = !1 } = e,
    { imageFlipY: dt = !1 } = e,
    { parentRect: pt } = e
  U()
  let { hooks: ht = {} } = e
  const {
    env: gt,
    animation: mt,
    history: ft,
    rootRect: $t,
    stageRect: yt,
    utilRect: bt,
    elasticityMultiplier: vt,
    scrollElasticity: wt,
    imageOverlayMarkup: St,
    imagePreviewModifiers: kt,
    imageCropRect: Ct,
    presentationScalar: Mt,
  } = G
  Fo(t, gt, (t) => n(74, (T = t))),
    Fo(t, mt, (t) => n(75, (P = t))),
    Fo(t, $t, (t) => n(23, (y = t))),
    Fo(t, yt, (t) => n(70, (S = t))),
    Fo(t, bt, (t) => n(19, (w = t))),
    Fo(t, St, (t) => n(35, (A = t))),
    Fo(t, kt, (t) => n(67, (b = t))),
    Fo(t, Ct, (t) => n(90, (M = t))),
    Fo(t, Mt, (t) => n(36, (I = t)))
  const Rt = (t) => st(Xh(t, y))
  let Tt,
    Pt,
    Et = {}
  const At = (t, e) => {
      let n = !1
      if ((e || ((n = !0), (e = Bt(M))), (e.x -= R.x || 0), (e.y -= R.y || 0), 0 !== ct)) {
        const t = { width: R.width, height: R.height }
        xt(t, ct)
        const n = 0.5 * (R.width - Math.abs(t.width)),
          o = 0.5 * (R.height - Math.abs(t.height))
        ;(e.x += n), (e.y += o)
      }
      const o = fn(t, M, (t, n) => {
        if (k.find((t) => t.id === n.id)) {
          if (t) return Tt.removeShape(n), console.error(t)
          cn(n, M), un(n, e), k[k.length - 1] === n && Tt.selectShape(n)
        }
      })
      ;(o.flipX = ut), (o.flipY = dt), (o.rotation = 0 !== ct ? -ct : 0)
      const i = Tt.getShapesNearPosition(e),
        r = M.width,
        a = M.height
      if (n && i.length && o.width && o.height && o.width < r && o.height < a) {
        const t = 0.1 * Math.min(r, a)
        ;(e.x += Math.round(-t + Math.random() * t * 2)),
          (e.y += Math.round(-t + Math.random() * t * 2))
      }
      return cn(o, M), un(o, e), o
    },
    It = (t, e) => {
      const n = At(t, e)
      return Lt(n)
    },
    Lt = (t) => {
      const { beforeAddShape: e = () => !0 } = ht
      if (e(t)) return Tt.addShape(t), ft.write(), t
    }
  let Ft = !1
  const zt = () => ft.write()
  let Dt
  const Ot = Ia(P ? 20 : 0)
  Fo(t, Ot, (t) => n(76, (E = t)))
  return (
    (t.$$set = (t) => {
      'isActive' in t && F(n(1, (H = t.isActive))),
        'isActiveFraction' in t && V(n(2, (X = t.isActiveFraction))),
        'isVisible' in t && z(n(3, (Y = t.isVisible))),
        'stores' in t && n(59, (G = t.stores)),
        'locale' in t && n(4, (Z = t.locale)),
        'shapes' in t && _(n(5, (q = t.shapes))),
        'tools' in t && n(60, (K = t.tools)),
        'toolShapes' in t && n(61, (Q = t.toolShapes)),
        'toolActive' in t && n(0, (J = t.toolActive)),
        'toolSelectRadius' in t && n(6, (tt = t.toolSelectRadius)),
        'shapeControls' in t && n(7, (et = t.shapeControls)),
        'enableButtonFlipVertical' in t && n(8, (nt = t.enableButtonFlipVertical)),
        'enablePresetSelectImage' in t && n(9, (ot = t.enablePresetSelectImage)),
        'willRenderPresetToolbar' in t && n(62, (it = t.willRenderPresetToolbar)),
        'shapePresets' in t && n(10, (rt = t.shapePresets)),
        'utilKey' in t && n(63, (at = t.utilKey)),
        'mapScreenPointToImagePoint' in t && n(11, (st = t.mapScreenPointToImagePoint)),
        'mapImagePointToScreenPoint' in t && n(12, (lt = t.mapImagePointToScreenPoint)),
        'imageRotation' in t && n(13, (ct = t.imageRotation)),
        'imageFlipX' in t && n(14, (ut = t.imageFlipX)),
        'imageFlipY' in t && n(15, (dt = t.imageFlipY)),
        'parentRect' in t && U(n(16, (pt = t.parentRect))),
        'hooks' in t && n(64, (ht = t.hooks))
    }),
    (t.$$.update = () => {
      var e
      ;(1024 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[1]) &&
        n(22, (o = 0 === rt.length ? K.filter((t) => 'preset' !== t[0]) : K)),
        50 & t.$$.dirty[2] && (x ? _o(kt, (b[at] = { maskMarkupOpacity: 0.85 }), b) : delete b[at]),
        128 & t.$$.dirty[2] && n(24, (i = v)),
        (524288 & t.$$.dirty[0]) | (256 & t.$$.dirty[2]) &&
          n(25, (r = w && j(S.x - w.x, S.y - w.y))),
        131073 & t.$$.dirty[0] && J && Tt && Tt.blurShapes(),
        128 & t.$$.dirty[0] && n(71, (a = Object.keys(et))),
        1048576 & t.$$.dirty[0] && n(72, (s = (k.filter(Pn) || [])[0])),
        (1 & t.$$.dirty[0]) | (1073741824 & t.$$.dirty[1]) | (16 & t.$$.dirty[2]) &&
          n(73, (l = x && (Q[J] ? Zn(dn(Q[J][0])) : {}))),
        2568 & t.$$.dirty[2] &&
          n(
            68,
            (c =
              l &&
              Object.keys(l).reduce((t, e) => {
                const n = 'disableStyle' === e,
                  o = a.find((t) => t.split('_').includes(e))
                return n || o ? (void 0 === l[e] || (t[e] = Et[e] || l[e]), t) : t
              }, {}))
          ),
        1088 & t.$$.dirty[2] && n(26, (u = s || c)),
        2048 & t.$$.dirty[2] && n(27, (d = l && We(l.eraseRadius) ? l.eraseRadius : void 0)),
        2098689 & t.$$.dirty[0] && n(28, (p = C > 0 && 'preset' === J && (rt.length > 0 || ot))),
        262144 & t.$$.dirty[0] &&
          n(
            30,
            (h =
              Dt &&
              ((e = Dt),
              (t, n) => {
                e.dispatchEvent(
                  new CustomEvent('ping', {
                    detail: { type: t, data: n },
                    cancelable: !0,
                    bubbles: !0,
                  })
                )
              }))
          ),
        4097 & t.$$.dirty[2] && n(32, (m = it ? (t) => it(t, It, { ...T }) : O)),
        4 & t.$$.dirty[2] &&
          n(
            33,
            (f = Object.keys(ht).reduce(
              (t, e) => ('beforeAddShape' === e || (t[e] = ht[e]), t),
              {}
            ))
          ),
        8208 & t.$$.dirty[2] && P && Ot.set(x ? 0 : 20),
        16384 & t.$$.dirty[2] && n(34, ($ = E ? `transform: translateY(${E}px)` : void 0))
    }),
    n(31, (g = vt * wt)),
    [
      J,
      H,
      X,
      Y,
      Z,
      q,
      tt,
      et,
      nt,
      ot,
      rt,
      st,
      lt,
      ct,
      ut,
      dt,
      pt,
      Tt,
      Dt,
      w,
      k,
      C,
      o,
      y,
      i,
      r,
      u,
      d,
      p,
      R,
      h,
      g,
      m,
      f,
      $,
      A,
      I,
      gt,
      mt,
      $t,
      yt,
      bt,
      St,
      kt,
      Ct,
      Mt,
      ({ value: t }) => n(0, (J = t)),
      (t) => {
        if ('eraser' === J) Pt = Tt.eraseShape()
        else if (Q[J]) {
          const [t, e] = Q[J]
          Pt = Tt.createShape({ ...t, ...c }, e)
        } else Pt = void 0
        Pt && Pt.start(t)
      },
      (t) => {
        Pt && Pt.update(t)
      },
      (t) => {
        Pt && Pt.release(t)
      },
      (t) => {
        Pt && (Pt.end(t), (Pt = void 0))
      },
      function (t) {
        Object.keys(t).forEach((e) => n(65, (Et[e] = t[e]), Et)),
          s && (Tt.updateMarkupShape(s, t), zt())
      },
      (t, e) => {
        Ft = !1
      },
      (t, e) => {
        if (Ft) return
        const { beforeAddShape: n = () => !0 } = ht,
          o = Rt(e),
          i = Tt.getMarkupItemDraft(),
          r = jt(M, { x: o.x + (R.x || 0), y: o.y + (R.y || 0) })
        if ((i && !r && Tt.discardMarkupItemDraft(), r)) {
          if (!i) {
            const i = At(t, o)
            return n(i)
              ? (((t) => {
                  t.isDraft = !0
                })(i),
                void Tt.addShape(i))
              : ((Ft = !0), void e.preventDefault())
          }
          Tt.updateMarkupShape(i, { x: o.x - 0.5 * i.width, y: o.y - 0.5 * i.height })
        }
      },
      (t, e) => {
        if (Ft) return
        const n = Rt(e)
        if (jt(M, { x: n.x + (R.x || 0), y: n.y + (R.y || 0) })) {
          const t = Tt.confirmMarkupItemDraft()
          Tt.selectShape(t), ft.write()
        } else Tt.discardMarkupItemDraft()
      },
      (t) => It(t),
      (t) => {
        return (e = t.detail.files), (n = Rt(t.detail.event)), e.forEach((t) => It(t, n))
        var e, n
      },
      zt,
      Ot,
      G,
      K,
      Q,
      it,
      at,
      ht,
      Et,
      x,
      b,
      c,
      v,
      S,
      a,
      s,
      l,
      T,
      P,
      E,
      (t) => t[0] === J,
      (t) => {
        h('addshape', t), zt()
      },
      (t) => {
        h('selectshape', t)
      },
      (t) => {
        h('updateshape', t), zt()
      },
      (t) => {
        h('removeshape', t), zt()
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(Tt = t), n(17, Tt)
        })
      },
      function (t) {
        ;(k = t), q.set(k)
      },
      function (t) {
        ;(A = t), St.set(A)
      },
      function (e) {
        wi(t, e)
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(Dt = t), n(18, Dt)
        })
      },
      function (e) {
        wi(t, e)
      },
    ]
  )
}
class tm extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        Jg,
        Qg,
        Ao,
        {
          isActive: 1,
          isActiveFraction: 2,
          isVisible: 3,
          stores: 59,
          locale: 4,
          shapes: 5,
          tools: 60,
          toolShapes: 61,
          toolActive: 0,
          toolSelectRadius: 6,
          shapeControls: 7,
          enableButtonFlipVertical: 8,
          enablePresetSelectImage: 9,
          willRenderPresetToolbar: 62,
          shapePresets: 10,
          utilKey: 63,
          mapScreenPointToImagePoint: 11,
          mapImagePointToScreenPoint: 12,
          imageRotation: 13,
          imageFlipX: 14,
          imageFlipY: 15,
          parentRect: 16,
          hooks: 64,
        },
        [-1, -1, -1, -1]
      )
  }
  get isActive() {
    return this.$$.ctx[1]
  }
  set isActive(t) {
    this.$set({ isActive: t }), Li()
  }
  get isActiveFraction() {
    return this.$$.ctx[2]
  }
  set isActiveFraction(t) {
    this.$set({ isActiveFraction: t }), Li()
  }
  get isVisible() {
    return this.$$.ctx[3]
  }
  set isVisible(t) {
    this.$set({ isVisible: t }), Li()
  }
  get stores() {
    return this.$$.ctx[59]
  }
  set stores(t) {
    this.$set({ stores: t }), Li()
  }
  get locale() {
    return this.$$.ctx[4]
  }
  set locale(t) {
    this.$set({ locale: t }), Li()
  }
  get shapes() {
    return this.$$.ctx[5]
  }
  set shapes(t) {
    this.$set({ shapes: t }), Li()
  }
  get tools() {
    return this.$$.ctx[60]
  }
  set tools(t) {
    this.$set({ tools: t }), Li()
  }
  get toolShapes() {
    return this.$$.ctx[61]
  }
  set toolShapes(t) {
    this.$set({ toolShapes: t }), Li()
  }
  get toolActive() {
    return this.$$.ctx[0]
  }
  set toolActive(t) {
    this.$set({ toolActive: t }), Li()
  }
  get toolSelectRadius() {
    return this.$$.ctx[6]
  }
  set toolSelectRadius(t) {
    this.$set({ toolSelectRadius: t }), Li()
  }
  get shapeControls() {
    return this.$$.ctx[7]
  }
  set shapeControls(t) {
    this.$set({ shapeControls: t }), Li()
  }
  get enableButtonFlipVertical() {
    return this.$$.ctx[8]
  }
  set enableButtonFlipVertical(t) {
    this.$set({ enableButtonFlipVertical: t }), Li()
  }
  get enablePresetSelectImage() {
    return this.$$.ctx[9]
  }
  set enablePresetSelectImage(t) {
    this.$set({ enablePresetSelectImage: t }), Li()
  }
  get willRenderPresetToolbar() {
    return this.$$.ctx[62]
  }
  set willRenderPresetToolbar(t) {
    this.$set({ willRenderPresetToolbar: t }), Li()
  }
  get shapePresets() {
    return this.$$.ctx[10]
  }
  set shapePresets(t) {
    this.$set({ shapePresets: t }), Li()
  }
  get utilKey() {
    return this.$$.ctx[63]
  }
  set utilKey(t) {
    this.$set({ utilKey: t }), Li()
  }
  get mapScreenPointToImagePoint() {
    return this.$$.ctx[11]
  }
  set mapScreenPointToImagePoint(t) {
    this.$set({ mapScreenPointToImagePoint: t }), Li()
  }
  get mapImagePointToScreenPoint() {
    return this.$$.ctx[12]
  }
  set mapImagePointToScreenPoint(t) {
    this.$set({ mapImagePointToScreenPoint: t }), Li()
  }
  get imageRotation() {
    return this.$$.ctx[13]
  }
  set imageRotation(t) {
    this.$set({ imageRotation: t }), Li()
  }
  get imageFlipX() {
    return this.$$.ctx[14]
  }
  set imageFlipX(t) {
    this.$set({ imageFlipX: t }), Li()
  }
  get imageFlipY() {
    return this.$$.ctx[15]
  }
  set imageFlipY(t) {
    this.$set({ imageFlipY: t }), Li()
  }
  get parentRect() {
    return this.$$.ctx[16]
  }
  set parentRect(t) {
    this.$set({ parentRect: t }), Li()
  }
  get hooks() {
    return this.$$.ctx[64]
  }
  set hooks(t) {
    this.$set({ hooks: t }), Li()
  }
}
var em = (t, e, n, o, i, r, a, s, l) => {
    const c = G(t),
      u = 0.5 * n.width,
      d = 0.5 * n.height,
      p = 0.5 * e.width,
      h = 0.5 * e.height,
      g = i.x + o.x,
      m = i.y + o.y
    s && (c.x = n.width - c.x), l && (c.y = n.height - c.y)
    const f = Math.cos(r),
      $ = Math.sin(r)
    ;(c.x -= u), (c.y -= d)
    const y = c.x * f - c.y * $,
      x = c.x * $ + c.y * f
    ;(c.x = u + y),
      (c.y = d + x),
      (c.x *= a),
      (c.y *= a),
      (c.x += p),
      (c.y += h),
      (c.x += g),
      (c.y += m),
      (c.x -= u * a),
      (c.y -= d * a)
    const b = (i.x - g) * a,
      v = (i.y - m) * a,
      w = b * f - v * $,
      S = b * $ + v * f
    return (c.x += w), (c.y += S), c
  },
  nm = (t, e, n, o, i, r, a, s, l) => {
    const c = G(t),
      u = yt(n),
      d = yt(e),
      p = j(i.x + o.x, i.y + o.y),
      h = Math.cos(r),
      g = Math.sin(r)
    ;(c.x -= d.x), (c.y -= d.y)
    const m = (i.x - p.x) * a,
      f = (i.y - p.y) * a,
      $ = m * h - f * g,
      y = m * g + f * h
    ;(c.x -= $), (c.y -= y), (c.x -= p.x), (c.y -= p.y), (c.x /= a), (c.y /= a)
    const x = c.x * h + c.y * g,
      b = c.x * g - c.y * h
    return (
      (c.x = x),
      (c.y = -b),
      (c.x += u.x),
      (c.y += u.y),
      s && (c.x = n.width - c.x),
      l && (c.y = n.height - c.y),
      c
    )
  }
function om(t) {
  let e, n
  return (
    (e = new tm({
      props: {
        stores: t[3],
        locale: t[4],
        isActive: t[0],
        isActiveFraction: t[1],
        isVisible: t[2],
        mapScreenPointToImagePoint: t[34],
        mapImagePointToScreenPoint: t[35],
        utilKey: 'annotate',
        imageRotation: t[26],
        imageFlipX: t[24],
        imageFlipY: t[25],
        shapes: t[28],
        tools: t[10] || t[5],
        toolShapes: t[11] || t[6],
        toolActive: t[13],
        shapeControls: t[12] || t[7],
        shapePresets: t[16],
        enableButtonFlipVertical: t[14],
        parentRect: t[29],
        enablePresetSelectImage: t[15],
        toolSelectRadius: t[8],
        willRenderPresetToolbar: t[17] || t[9],
        hooks: {
          willRenderShapeControls: t[18],
          beforeAddShape: t[19],
          beforeRemoveShape: t[20],
          beforeDeselectShape: t[21],
          beforeSelectShape: t[22],
          beforeUpdateShape: t[23],
        },
      },
    })),
    e.$on('measure', t[37]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8 & n[0] && (o.stores = t[3]),
          16 & n[0] && (o.locale = t[4]),
          1 & n[0] && (o.isActive = t[0]),
          2 & n[0] && (o.isActiveFraction = t[1]),
          4 & n[0] && (o.isVisible = t[2]),
          67108864 & n[0] && (o.imageRotation = t[26]),
          16777216 & n[0] && (o.imageFlipX = t[24]),
          33554432 & n[0] && (o.imageFlipY = t[25]),
          1056 & n[0] && (o.tools = t[10] || t[5]),
          2112 & n[0] && (o.toolShapes = t[11] || t[6]),
          8192 & n[0] && (o.toolActive = t[13]),
          4224 & n[0] && (o.shapeControls = t[12] || t[7]),
          65536 & n[0] && (o.shapePresets = t[16]),
          16384 & n[0] && (o.enableButtonFlipVertical = t[14]),
          32768 & n[0] && (o.enablePresetSelectImage = t[15]),
          256 & n[0] && (o.toolSelectRadius = t[8]),
          131584 & n[0] && (o.willRenderPresetToolbar = t[17] || t[9]),
          16515072 & n[0] &&
            (o.hooks = {
              willRenderShapeControls: t[18],
              beforeAddShape: t[19],
              beforeRemoveShape: t[20],
              beforeDeselectShape: t[21],
              beforeSelectShape: t[22],
              beforeUpdateShape: t[23],
            }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function im(t, e, n) {
  let o, i, r, a, s, l
  let { isActive: c } = e,
    { isActiveFraction: u } = e,
    { isVisible: d } = e,
    { stores: p } = e,
    { locale: h = {} } = e,
    { markupEditorToolbar: g } = e,
    { markupEditorToolStyles: m } = e,
    { markupEditorShapeStyleControls: f } = e,
    { markupEditorToolSelectRadius: $ } = e,
    { willRenderShapePresetToolbar: y } = e,
    { annotateTools: x } = e,
    { annotateToolShapes: b } = e,
    { annotateShapeControls: v } = e,
    { annotateActiveTool: w = 'sharpie' } = e,
    { annotateEnableButtonFlipVertical: S = !1 } = e,
    { annotateEnableSelectImagePreset: k = !1 } = e,
    { annotatePresets: C = [] } = e,
    { annotateWillRenderShapePresetToolbar: M } = e,
    { willRenderShapeControls: R } = e,
    { beforeAddShape: T } = e,
    { beforeRemoveShape: P } = e,
    { beforeDeselectShape: E } = e,
    { beforeSelectShape: A } = e,
    { beforeUpdateShape: I } = e
  const {
    rootRect: L,
    imageAnnotation: F,
    imageSize: B,
    imageTransforms: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
  } = p
  Fo(t, L, (t) => n(38, (o = t))),
    Fo(t, B, (t) => n(39, (i = t))),
    Fo(t, z, (t) => n(40, (r = t))),
    Fo(t, D, (t) => n(26, (l = t))),
    Fo(t, O, (t) => n(24, (a = t))),
    Fo(t, _, (t) => n(25, (s = t)))
  return (
    (t.$$set = (t) => {
      'isActive' in t && n(0, (c = t.isActive)),
        'isActiveFraction' in t && n(1, (u = t.isActiveFraction)),
        'isVisible' in t && n(2, (d = t.isVisible)),
        'stores' in t && n(3, (p = t.stores)),
        'locale' in t && n(4, (h = t.locale)),
        'markupEditorToolbar' in t && n(5, (g = t.markupEditorToolbar)),
        'markupEditorToolStyles' in t && n(6, (m = t.markupEditorToolStyles)),
        'markupEditorShapeStyleControls' in t && n(7, (f = t.markupEditorShapeStyleControls)),
        'markupEditorToolSelectRadius' in t && n(8, ($ = t.markupEditorToolSelectRadius)),
        'willRenderShapePresetToolbar' in t && n(9, (y = t.willRenderShapePresetToolbar)),
        'annotateTools' in t && n(10, (x = t.annotateTools)),
        'annotateToolShapes' in t && n(11, (b = t.annotateToolShapes)),
        'annotateShapeControls' in t && n(12, (v = t.annotateShapeControls)),
        'annotateActiveTool' in t && n(13, (w = t.annotateActiveTool)),
        'annotateEnableButtonFlipVertical' in t && n(14, (S = t.annotateEnableButtonFlipVertical)),
        'annotateEnableSelectImagePreset' in t && n(15, (k = t.annotateEnableSelectImagePreset)),
        'annotatePresets' in t && n(16, (C = t.annotatePresets)),
        'annotateWillRenderShapePresetToolbar' in t &&
          n(17, (M = t.annotateWillRenderShapePresetToolbar)),
        'willRenderShapeControls' in t && n(18, (R = t.willRenderShapeControls)),
        'beforeAddShape' in t && n(19, (T = t.beforeAddShape)),
        'beforeRemoveShape' in t && n(20, (P = t.beforeRemoveShape)),
        'beforeDeselectShape' in t && n(21, (E = t.beforeDeselectShape)),
        'beforeSelectShape' in t && n(22, (A = t.beforeSelectShape)),
        'beforeUpdateShape' in t && n(23, (I = t.beforeUpdateShape))
    }),
    [
      c,
      u,
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      S,
      k,
      C,
      M,
      R,
      T,
      P,
      E,
      A,
      I,
      a,
      s,
      l,
      L,
      F,
      B,
      z,
      D,
      O,
      _,
      (t) => nm(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s),
      (t) => em(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s),
      'annotate',
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var rm = {
  util: [
    'annotate',
    class extends or {
      constructor(t) {
        super(),
          nr(
            this,
            t,
            im,
            om,
            Ao,
            {
              name: 36,
              isActive: 0,
              isActiveFraction: 1,
              isVisible: 2,
              stores: 3,
              locale: 4,
              markupEditorToolbar: 5,
              markupEditorToolStyles: 6,
              markupEditorShapeStyleControls: 7,
              markupEditorToolSelectRadius: 8,
              willRenderShapePresetToolbar: 9,
              annotateTools: 10,
              annotateToolShapes: 11,
              annotateShapeControls: 12,
              annotateActiveTool: 13,
              annotateEnableButtonFlipVertical: 14,
              annotateEnableSelectImagePreset: 15,
              annotatePresets: 16,
              annotateWillRenderShapePresetToolbar: 17,
              willRenderShapeControls: 18,
              beforeAddShape: 19,
              beforeRemoveShape: 20,
              beforeDeselectShape: 21,
              beforeSelectShape: 22,
              beforeUpdateShape: 23,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[36]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(t) {
        this.$set({ isActive: t }), Li()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Li()
      }
      get isVisible() {
        return this.$$.ctx[2]
      }
      set isVisible(t) {
        this.$set({ isVisible: t }), Li()
      }
      get stores() {
        return this.$$.ctx[3]
      }
      set stores(t) {
        this.$set({ stores: t }), Li()
      }
      get locale() {
        return this.$$.ctx[4]
      }
      set locale(t) {
        this.$set({ locale: t }), Li()
      }
      get markupEditorToolbar() {
        return this.$$.ctx[5]
      }
      set markupEditorToolbar(t) {
        this.$set({ markupEditorToolbar: t }), Li()
      }
      get markupEditorToolStyles() {
        return this.$$.ctx[6]
      }
      set markupEditorToolStyles(t) {
        this.$set({ markupEditorToolStyles: t }), Li()
      }
      get markupEditorShapeStyleControls() {
        return this.$$.ctx[7]
      }
      set markupEditorShapeStyleControls(t) {
        this.$set({ markupEditorShapeStyleControls: t }), Li()
      }
      get markupEditorToolSelectRadius() {
        return this.$$.ctx[8]
      }
      set markupEditorToolSelectRadius(t) {
        this.$set({ markupEditorToolSelectRadius: t }), Li()
      }
      get willRenderShapePresetToolbar() {
        return this.$$.ctx[9]
      }
      set willRenderShapePresetToolbar(t) {
        this.$set({ willRenderShapePresetToolbar: t }), Li()
      }
      get annotateTools() {
        return this.$$.ctx[10]
      }
      set annotateTools(t) {
        this.$set({ annotateTools: t }), Li()
      }
      get annotateToolShapes() {
        return this.$$.ctx[11]
      }
      set annotateToolShapes(t) {
        this.$set({ annotateToolShapes: t }), Li()
      }
      get annotateShapeControls() {
        return this.$$.ctx[12]
      }
      set annotateShapeControls(t) {
        this.$set({ annotateShapeControls: t }), Li()
      }
      get annotateActiveTool() {
        return this.$$.ctx[13]
      }
      set annotateActiveTool(t) {
        this.$set({ annotateActiveTool: t }), Li()
      }
      get annotateEnableButtonFlipVertical() {
        return this.$$.ctx[14]
      }
      set annotateEnableButtonFlipVertical(t) {
        this.$set({ annotateEnableButtonFlipVertical: t }), Li()
      }
      get annotateEnableSelectImagePreset() {
        return this.$$.ctx[15]
      }
      set annotateEnableSelectImagePreset(t) {
        this.$set({ annotateEnableSelectImagePreset: t }), Li()
      }
      get annotatePresets() {
        return this.$$.ctx[16]
      }
      set annotatePresets(t) {
        this.$set({ annotatePresets: t }), Li()
      }
      get annotateWillRenderShapePresetToolbar() {
        return this.$$.ctx[17]
      }
      set annotateWillRenderShapePresetToolbar(t) {
        this.$set({ annotateWillRenderShapePresetToolbar: t }), Li()
      }
      get willRenderShapeControls() {
        return this.$$.ctx[18]
      }
      set willRenderShapeControls(t) {
        this.$set({ willRenderShapeControls: t }), Li()
      }
      get beforeAddShape() {
        return this.$$.ctx[19]
      }
      set beforeAddShape(t) {
        this.$set({ beforeAddShape: t }), Li()
      }
      get beforeRemoveShape() {
        return this.$$.ctx[20]
      }
      set beforeRemoveShape(t) {
        this.$set({ beforeRemoveShape: t }), Li()
      }
      get beforeDeselectShape() {
        return this.$$.ctx[21]
      }
      set beforeDeselectShape(t) {
        this.$set({ beforeDeselectShape: t }), Li()
      }
      get beforeSelectShape() {
        return this.$$.ctx[22]
      }
      set beforeSelectShape(t) {
        this.$set({ beforeSelectShape: t }), Li()
      }
      get beforeUpdateShape() {
        return this.$$.ctx[23]
      }
      set beforeUpdateShape(t) {
        this.$set({ beforeUpdateShape: t }), Li()
      }
    },
  ],
}
function am(t) {
  let e, n
  return (
    (e = new tm({
      props: {
        stores: t[3],
        locale: t[4],
        isActive: t[0],
        isActiveFraction: t[1],
        isVisible: t[2],
        mapScreenPointToImagePoint: t[32],
        mapImagePointToScreenPoint: t[33],
        utilKey: 'sticker',
        shapePresets: t[5],
        shapes: t[6] ? t[25] : t[26],
        toolActive: 'preset',
        imageFlipX: !!t[6] && t[18],
        imageFlipY: !!t[6] && t[19],
        imageRotation: t[6] ? t[20] : 0,
        parentRect: t[6] ? t[27] : t[23],
        enablePresetSelectImage: t[7],
        enableButtonFlipVertical: t[8],
        toolSelectRadius: t[11],
        willRenderPresetToolbar: t[9] || t[12],
        hooks: {
          willRenderShapeControls: t[10],
          beforeAddShape: t[13],
          beforeRemoveShape: t[14],
          beforeDeselectShape: t[15],
          beforeSelectShape: t[16],
          beforeUpdateShape: t[17],
        },
      },
    })),
    e.$on('measure', t[35]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        8 & n[0] && (o.stores = t[3]),
          16 & n[0] && (o.locale = t[4]),
          1 & n[0] && (o.isActive = t[0]),
          2 & n[0] && (o.isActiveFraction = t[1]),
          4 & n[0] && (o.isVisible = t[2]),
          32 & n[0] && (o.shapePresets = t[5]),
          64 & n[0] && (o.shapes = t[6] ? t[25] : t[26]),
          262208 & n[0] && (o.imageFlipX = !!t[6] && t[18]),
          524352 & n[0] && (o.imageFlipY = !!t[6] && t[19]),
          1048640 & n[0] && (o.imageRotation = t[6] ? t[20] : 0),
          64 & n[0] && (o.parentRect = t[6] ? t[27] : t[23]),
          128 & n[0] && (o.enablePresetSelectImage = t[7]),
          256 & n[0] && (o.enableButtonFlipVertical = t[8]),
          2048 & n[0] && (o.toolSelectRadius = t[11]),
          4608 & n[0] && (o.willRenderPresetToolbar = t[9] || t[12]),
          254976 & n[0] &&
            (o.hooks = {
              willRenderShapeControls: t[10],
              beforeAddShape: t[13],
              beforeRemoveShape: t[14],
              beforeDeselectShape: t[15],
              beforeSelectShape: t[16],
              beforeUpdateShape: t[17],
            }),
          e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
function sm(t, e, n) {
  let o, i, r, a, s, l, c, u
  let { isActive: d } = e,
    { isActiveFraction: p } = e,
    { isVisible: h } = e,
    { stores: g } = e,
    { locale: m = {} } = e,
    { stickers: f = [] } = e,
    { stickerStickToImage: $ = !1 } = e,
    { stickerEnableSelectImage: y = !0 } = e,
    { stickersEnableButtonFlipVertical: x = !1 } = e,
    { stickersWillRenderShapePresetToolbar: b } = e,
    { willRenderShapeControls: v } = e,
    { markupEditorToolSelectRadius: w } = e,
    { willRenderShapePresetToolbar: S } = e,
    { beforeAddShape: k } = e,
    { beforeRemoveShape: C } = e,
    { beforeDeselectShape: M } = e,
    { beforeSelectShape: R } = e,
    { beforeUpdateShape: T } = e
  const {
    presentationScalar: P,
    rootRect: E,
    imageCropRect: A,
    imageSelectionRectPresentation: I,
    imageAnnotation: L,
    imageDecoration: F,
    imageSize: B,
    imageTransforms: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
  } = g
  Fo(t, P, (t) => n(40, (c = t))),
    Fo(t, E, (t) => n(36, (o = t))),
    Fo(t, I, (t) => n(39, (l = t))),
    Fo(t, B, (t) => n(37, (i = t))),
    Fo(t, z, (t) => n(38, (r = t))),
    Fo(t, D, (t) => n(20, (u = t))),
    Fo(t, O, (t) => n(18, (a = t))),
    Fo(t, _, (t) => n(19, (s = t)))
  const W = $
      ? (t) => nm(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s)
      : (t) => {
          const e = G(t)
          return (e.x -= l.x), (e.y -= l.y), (e.x /= c), (e.y /= c), e
        },
    V = $
      ? (t) => em(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s)
      : (t) => {
          const e = G(t)
          return (e.x *= c), (e.y *= c), (e.x += l.x), (e.y += l.y), e
        }
  return (
    (t.$$set = (t) => {
      'isActive' in t && n(0, (d = t.isActive)),
        'isActiveFraction' in t && n(1, (p = t.isActiveFraction)),
        'isVisible' in t && n(2, (h = t.isVisible)),
        'stores' in t && n(3, (g = t.stores)),
        'locale' in t && n(4, (m = t.locale)),
        'stickers' in t && n(5, (f = t.stickers)),
        'stickerStickToImage' in t && n(6, ($ = t.stickerStickToImage)),
        'stickerEnableSelectImage' in t && n(7, (y = t.stickerEnableSelectImage)),
        'stickersEnableButtonFlipVertical' in t && n(8, (x = t.stickersEnableButtonFlipVertical)),
        'stickersWillRenderShapePresetToolbar' in t &&
          n(9, (b = t.stickersWillRenderShapePresetToolbar)),
        'willRenderShapeControls' in t && n(10, (v = t.willRenderShapeControls)),
        'markupEditorToolSelectRadius' in t && n(11, (w = t.markupEditorToolSelectRadius)),
        'willRenderShapePresetToolbar' in t && n(12, (S = t.willRenderShapePresetToolbar)),
        'beforeAddShape' in t && n(13, (k = t.beforeAddShape)),
        'beforeRemoveShape' in t && n(14, (C = t.beforeRemoveShape)),
        'beforeDeselectShape' in t && n(15, (M = t.beforeDeselectShape)),
        'beforeSelectShape' in t && n(16, (R = t.beforeSelectShape)),
        'beforeUpdateShape' in t && n(17, (T = t.beforeUpdateShape))
    }),
    [
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      S,
      k,
      C,
      M,
      R,
      T,
      a,
      s,
      u,
      P,
      E,
      A,
      I,
      L,
      F,
      B,
      z,
      D,
      O,
      _,
      W,
      V,
      'sticker',
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var lm = {
    util: [
      'sticker',
      class extends or {
        constructor(t) {
          super(),
            nr(
              this,
              t,
              sm,
              am,
              Ao,
              {
                name: 34,
                isActive: 0,
                isActiveFraction: 1,
                isVisible: 2,
                stores: 3,
                locale: 4,
                stickers: 5,
                stickerStickToImage: 6,
                stickerEnableSelectImage: 7,
                stickersEnableButtonFlipVertical: 8,
                stickersWillRenderShapePresetToolbar: 9,
                willRenderShapeControls: 10,
                markupEditorToolSelectRadius: 11,
                willRenderShapePresetToolbar: 12,
                beforeAddShape: 13,
                beforeRemoveShape: 14,
                beforeDeselectShape: 15,
                beforeSelectShape: 16,
                beforeUpdateShape: 17,
              },
              [-1, -1]
            )
        }
        get name() {
          return this.$$.ctx[34]
        }
        get isActive() {
          return this.$$.ctx[0]
        }
        set isActive(t) {
          this.$set({ isActive: t }), Li()
        }
        get isActiveFraction() {
          return this.$$.ctx[1]
        }
        set isActiveFraction(t) {
          this.$set({ isActiveFraction: t }), Li()
        }
        get isVisible() {
          return this.$$.ctx[2]
        }
        set isVisible(t) {
          this.$set({ isVisible: t }), Li()
        }
        get stores() {
          return this.$$.ctx[3]
        }
        set stores(t) {
          this.$set({ stores: t }), Li()
        }
        get locale() {
          return this.$$.ctx[4]
        }
        set locale(t) {
          this.$set({ locale: t }), Li()
        }
        get stickers() {
          return this.$$.ctx[5]
        }
        set stickers(t) {
          this.$set({ stickers: t }), Li()
        }
        get stickerStickToImage() {
          return this.$$.ctx[6]
        }
        set stickerStickToImage(t) {
          this.$set({ stickerStickToImage: t }), Li()
        }
        get stickerEnableSelectImage() {
          return this.$$.ctx[7]
        }
        set stickerEnableSelectImage(t) {
          this.$set({ stickerEnableSelectImage: t }), Li()
        }
        get stickersEnableButtonFlipVertical() {
          return this.$$.ctx[8]
        }
        set stickersEnableButtonFlipVertical(t) {
          this.$set({ stickersEnableButtonFlipVertical: t }), Li()
        }
        get stickersWillRenderShapePresetToolbar() {
          return this.$$.ctx[9]
        }
        set stickersWillRenderShapePresetToolbar(t) {
          this.$set({ stickersWillRenderShapePresetToolbar: t }), Li()
        }
        get willRenderShapeControls() {
          return this.$$.ctx[10]
        }
        set willRenderShapeControls(t) {
          this.$set({ willRenderShapeControls: t }), Li()
        }
        get markupEditorToolSelectRadius() {
          return this.$$.ctx[11]
        }
        set markupEditorToolSelectRadius(t) {
          this.$set({ markupEditorToolSelectRadius: t }), Li()
        }
        get willRenderShapePresetToolbar() {
          return this.$$.ctx[12]
        }
        set willRenderShapePresetToolbar(t) {
          this.$set({ willRenderShapePresetToolbar: t }), Li()
        }
        get beforeAddShape() {
          return this.$$.ctx[13]
        }
        set beforeAddShape(t) {
          this.$set({ beforeAddShape: t }), Li()
        }
        get beforeRemoveShape() {
          return this.$$.ctx[14]
        }
        set beforeRemoveShape(t) {
          this.$set({ beforeRemoveShape: t }), Li()
        }
        get beforeDeselectShape() {
          return this.$$.ctx[15]
        }
        set beforeDeselectShape(t) {
          this.$set({ beforeDeselectShape: t }), Li()
        }
        get beforeSelectShape() {
          return this.$$.ctx[16]
        }
        set beforeSelectShape(t) {
          this.$set({ beforeSelectShape: t }), Li()
        }
        get beforeUpdateShape() {
          return this.$$.ctx[17]
        }
        set beforeUpdateShape(t) {
          this.$set({ beforeUpdateShape: t }), Li()
        }
      },
    ],
  },
  cm = (t, e, n, o = (t) => t * t * (3 - 2 * t)) => o(Math.max(0, Math.min(1, (n - t) / (e - t))))
function um(t) {
  let e,
    n =
      (w(t[2].resizeIconButtonMaintainAspectRatio)
        ? t[2].resizeIconButtonMaintainAspectRatio
        : t[2].resizeIconButtonMaintainAspectRatio(t[3], t[12])) + ''
  return {
    c() {
      e = Ko('g')
    },
    m(t, o) {
      Go(t, e, o), (e.innerHTML = n)
    },
    p(t, o) {
      4108 & o[0] &&
        n !==
          (n =
            (w(t[2].resizeIconButtonMaintainAspectRatio)
              ? t[2].resizeIconButtonMaintainAspectRatio
              : t[2].resizeIconButtonMaintainAspectRatio(t[3], t[12])) + '') &&
        (e.innerHTML = n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function dm(t) {
  let e
  return {
    c() {
      e = Qo('Save')
    },
    m(t, n) {
      Go(t, e, n)
    },
    d(t) {
      t && Zo(e)
    },
  }
}
function pm(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B = t[2].resizeLabelFormCaption + '',
    z = t[2].resizeLabelInputWidth + '',
    D = t[2].resizeLabelInputHeight + ''
  return (
    (b = new js({ props: { $$slots: { default: [um] }, $$scope: { ctx: t } } })),
    (A = new Js({
      props: { type: 'submit', class: 'implicit', $$slots: { default: [dm] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        ;(e = qo('form')),
          (n = qo('div')),
          (o = qo('fieldset')),
          (i = qo('legend')),
          (r = Qo(B)),
          (a = Jo()),
          (s = qo('div')),
          (l = qo('div')),
          (c = qo('label')),
          (u = Qo(z)),
          (h = Jo()),
          (g = qo('input')),
          (m = Jo()),
          (f = qo('div')),
          ($ = qo('input')),
          (y = Jo()),
          (x = qo('label')),
          Qi(b.$$.fragment),
          (w = Jo()),
          (S = qo('div')),
          (k = qo('label')),
          (C = Qo(D)),
          (T = Jo()),
          (P = qo('input')),
          (E = Jo()),
          Qi(A.$$.fragment),
          ii(i, 'class', 'implicit'),
          ii(c, 'for', 'width-' + t[24]),
          ii(c, 'title', (d = t[2].resizeTitleInputWidth)),
          ii(c, 'aria-label', (p = t[2].resizeTitleInputWidth)),
          ii(g, 'id', 'width-' + t[24]),
          ii(g, 'type', 'text'),
          ii(g, 'inputmode', 'numeric'),
          ii(g, 'pattern', '[0-9]*'),
          ii(g, 'data-state', t[9]),
          ii(g, 'autocomplete', 'off'),
          ii(g, 'placeholder', t[7]),
          ii(l, 'class', 'PinturaInputDimension'),
          ii($, 'class', 'implicit'),
          ii($, 'id', 'maintainAspectRatio-' + t[24]),
          ii($, 'type', 'checkbox'),
          ii(x, 'for', 'maintainAspectRatio-' + t[24]),
          ii(x, 'title', (v = t[2].resizeTitleButtonMaintainAspectRatio)),
          ii(k, 'for', 'height-' + t[24]),
          ii(k, 'title', (M = t[2].resizeTitleInputHeight)),
          ii(k, 'aria-label', (R = t[2].resizeTitleInputHeight)),
          ii(P, 'id', 'height-' + t[24]),
          ii(P, 'type', 'text'),
          ii(P, 'inputmode', 'numeric'),
          ii(P, 'pattern', '[0-9]*'),
          ii(P, 'autocomplete', 'off'),
          ii(P, 'data-state', t[10]),
          ii(P, 'placeholder', t[8]),
          ii(S, 'class', 'PinturaInputDimension'),
          ii(s, 'class', 'PinturaFieldsetInner'),
          ii(n, 'class', 'PinturaFormInner'),
          ii(e, 'slot', 'footer'),
          ii(e, 'style', t[11])
      },
      m(d, p) {
        Go(d, e, p),
          Yo(e, n),
          Yo(n, o),
          Yo(o, i),
          Yo(i, r),
          Yo(o, a),
          Yo(o, s),
          Yo(s, l),
          Yo(l, c),
          Yo(c, u),
          Yo(l, h),
          Yo(l, g),
          si(g, t[4]),
          Yo(s, m),
          Yo(s, f),
          Yo(f, $),
          ($.checked = t[3]),
          Yo(f, y),
          Yo(f, x),
          Ji(b, x, null),
          Yo(s, w),
          Yo(s, S),
          Yo(S, k),
          Yo(k, C),
          Yo(S, T),
          Yo(S, P),
          si(P, t[5]),
          t[63](s),
          Yo(n, E),
          Ji(A, n, null),
          (I = !0),
          L ||
            ((F = [
              ei(g, 'input', t[60]),
              ei($, 'change', t[61]),
              ei(P, 'input', t[62]),
              ei(s, 'focusin', t[25]),
              ei(s, 'focusout', t[26]),
              ei(e, 'submit', ni(t[27])),
            ]),
            (L = !0))
      },
      p(t, n) {
        ;(!I || 4 & n[0]) && B !== (B = t[2].resizeLabelFormCaption + '') && ai(r, B),
          (!I || 4 & n[0]) && z !== (z = t[2].resizeLabelInputWidth + '') && ai(u, z),
          (!I || (4 & n[0] && d !== (d = t[2].resizeTitleInputWidth))) && ii(c, 'title', d),
          (!I || (4 & n[0] && p !== (p = t[2].resizeTitleInputWidth))) && ii(c, 'aria-label', p),
          (!I || 512 & n[0]) && ii(g, 'data-state', t[9]),
          (!I || 128 & n[0]) && ii(g, 'placeholder', t[7]),
          16 & n[0] && g.value !== t[4] && si(g, t[4]),
          8 & n[0] && ($.checked = t[3])
        const o = {}
        ;(4108 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
          b.$set(o),
          (!I || (4 & n[0] && v !== (v = t[2].resizeTitleButtonMaintainAspectRatio))) &&
            ii(x, 'title', v),
          (!I || 4 & n[0]) && D !== (D = t[2].resizeLabelInputHeight + '') && ai(C, D),
          (!I || (4 & n[0] && M !== (M = t[2].resizeTitleInputHeight))) && ii(k, 'title', M),
          (!I || (4 & n[0] && R !== (R = t[2].resizeTitleInputHeight))) && ii(k, 'aria-label', R),
          (!I || 1024 & n[0]) && ii(P, 'data-state', t[10]),
          (!I || 256 & n[0]) && ii(P, 'placeholder', t[8]),
          32 & n[0] && P.value !== t[5] && si(P, t[5])
        const i = {}
        4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }),
          A.$set(i),
          (!I || 2048 & n[0]) && ii(e, 'style', t[11])
      },
      i(t) {
        I || (Vi(b.$$.fragment, t), Vi(A.$$.fragment, t), (I = !0))
      },
      o(t) {
        Ni(b.$$.fragment, t), Ni(A.$$.fragment, t), (I = !1)
      },
      d(n) {
        n && Zo(e), tr(b), t[63](null), tr(A), (L = !1), Po(F)
      },
    }
  )
}
function hm(t) {
  let e, n
  return (
    (e = new Sp({ props: { $$slots: { footer: [pm] }, $$scope: { ctx: t } } })),
    e.$on('measure', t[64]),
    {
      c() {
        Qi(e.$$.fragment)
      },
      m(t, o) {
        Ji(e, t, o), (n = !0)
      },
      p(t, n) {
        const o = {}
        ;(8188 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o)
      },
      i(t) {
        n || (Vi(e.$$.fragment, t), (n = !0))
      },
      o(t) {
        Ni(e.$$.fragment, t), (n = !1)
      },
      d(t) {
        tr(e, t)
      },
    }
  )
}
const gm = 'resize-overlay'
function mm(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    S,
    k,
    C,
    R,
    T,
    P,
    E,
    A,
    I = ko,
    L = () => (I(), (I = Io(O, (t) => n(42, (x = t)))), O),
    F = ko,
    B = () => (F(), (F = Io(_, (t) => n(50, (k = t)))), _)
  t.$$.on_destroy.push(() => I()), t.$$.on_destroy.push(() => F())
  const z = (t, e = 0, n = 9999) => {
    if (w(t) && !(t = t.replace(/\D/g, '')).length) return
    const o = Math.round(t)
    return Number.isNaN(o) ? void 0 : Mr(o, e, n)
  }
  let { isActive: O } = e
  L()
  let { isActiveFraction: _ } = e
  B()
  let { stores: W } = e,
    { locale: V = {} } = e,
    { resizeMinSize: N = mt(1, 1) } = e,
    { resizeMaxSize: U = mt(9999, 9999) } = e
  const H = Ia(0, { stiffness: 0.15, damping: 0.3 })
  Fo(t, H, (t) => n(12, (A = t)))
  const {
    animation: X,
    utilRect: j,
    rootRect: Y,
    rootBackgroundColor: G,
    imageSize: Z,
    imageCropRect: q,
    imageCropRectAspectRatio: K,
    imageCropAspectRatio: Q,
    imageOutputSize: J,
    imageOverlayMarkup: tt,
    history: et,
  } = W
  Fo(t, X, (t) => n(58, (P = t))),
    Fo(t, j, (t) => n(47, (v = t))),
    Fo(t, Y, (t) => n(49, (S = t))),
    Fo(t, G, (t) => n(43, (b = t))),
    Fo(t, Z, (t) => n(67, (y = t))),
    Fo(t, q, (t) => n(40, (m = t))),
    Fo(t, K, (t) => n(39, (g = t))),
    Fo(t, Q, (t) => n(66, ($ = t))),
    Fo(t, J, (t) => n(41, (f = t))),
    Fo(t, tt, (t) => n(57, (T = t)))
  const nt = M()
  let ot,
    it,
    rt,
    at,
    st,
    lt,
    ct,
    ut,
    dt,
    pt = !1
  const ht = (t) => {
      let e = z(it),
        o = z(rt),
        i = e,
        r = o,
        a = i && r,
        s = t || g
      if (!i && !r) return
      i && !r ? (r = Math.round(i / s)) : r && !i && (i = Math.round(r * s)),
        (s = t || a ? D(i, r) : g)
      let l = mt(i, r)
      bt(U, l) || (l = Gt(U, s)),
        bt(l, N) || (l = Yt(N, s)),
        n(4, (it = null != e ? Math.round(l.width) : void 0)),
        n(5, (rt = null != o ? Math.round(l.height) : void 0))
    },
    gt = () => {
      ht()
      const { width: t, height: e } = f || {}
      ;(t === it && e === rt) ||
        (it || rt
          ? (it && rt && _o(Q, ($ = it / rt), $), _o(J, (f = mt(it, rt)), f))
          : (_o(Q, ($ = y.width / y.height), $), _o(Q, ($ = void 0), $), _o(J, (f = void 0), f)),
        et.write())
    }
  J.subscribe((t) => {
    if (!t) return n(4, (it = void 0)), void n(5, (rt = void 0))
    n(4, (it = t.width)), n(5, (rt = t.height)), ht()
  }),
    Q.subscribe((t) => {
      ;(it || rt) && t && (it && rt && D(it, rt) !== t ? (n(5, (rt = it / t)), ht(t)) : ht())
    })
  const ft = (t, e, n) => {
      const o = document.createElement('canvas').getContext('2d')
      ;(o.canvas.width = Math.max(1, t)), (o.canvas.height = Math.max(1, e))
      const i = o.createLinearGradient(0, 0, t, e)
      return (
        [
          [0, 0],
          [0.013, 0.081],
          [0.049, 0.155],
          [0.104, 0.225],
          [0.175, 0.29],
          [0.259, 0.353],
          [0.352, 0.412],
          [0.45, 0.471],
          [0.55, 0.529],
          [0.648, 0.588],
          [0.741, 0.647],
          [0.825, 0.71],
          [0.896, 0.775],
          [0.951, 0.845],
          [0.987, 0.919],
          [1, 1],
        ].forEach(([t, e]) =>
          i.addColorStop(e, `rgba(${255 * n[0]}, ${255 * n[1]}, ${255 * n[2]}, ${t})`)
        ),
        (o.fillStyle = i),
        o.fillRect(0, 0, o.canvas.width, o.canvas.height),
        document.body.appendChild(o.canvas),
        o.canvas
      )
    },
    $t = Ia(0)
  Fo(t, $t, (t) => n(54, (R = t)))
  const yt = Ia(0)
  let xt
  Fo(t, yt, (t) => n(51, (C = t)))
  const wt = Ia(P ? 20 : 0)
  return (
    Fo(t, wt, (t) => n(59, (E = t))),
    (t.$$set = (t) => {
      'isActive' in t && L(n(0, (O = t.isActive))),
        'isActiveFraction' in t && B(n(1, (_ = t.isActiveFraction))),
        'stores' in t && n(32, (W = t.stores)),
        'locale' in t && n(2, (V = t.locale)),
        'resizeMinSize' in t && n(33, (N = t.resizeMinSize)),
        'resizeMaxSize' in t && n(34, (U = t.resizeMaxSize))
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && H.set(pt ? 1 : 0),
        64 & t.$$.dirty[1] && ut && (dt = ut),
        16 & t.$$.dirty[0] && n(35, (at = z(it))),
        32 & t.$$.dirty[0] && n(36, (st = z(rt))),
        92 & t.$$.dirty[1] &&
          n(
            9,
            (o =
              null != at && 'width' !== ut
                ? at >= N.width && at <= U.width
                  ? 'valid'
                  : 'invalid'
                : 'undetermined')
          ),
        108 & t.$$.dirty[1] &&
          n(
            10,
            (i =
              null != st && 'height' !== ut
                ? st >= N.height && st <= U.height
                  ? 'valid'
                  : 'invalid'
                : 'undetermined')
          ),
        800 & t.$$.dirty[1] && n(7, (lt = Math.round(null != st ? st * g : m.width))),
        784 & t.$$.dirty[1] && n(8, (ct = Math.round(null != at ? at / g : m.height))),
        56 & t.$$.dirty[0] &&
          pt &&
          it &&
          rt &&
          ('width' === ut
            ? n(5, (rt = Math.round(it / g)))
            : 'height' === ut
            ? n(4, (it = Math.round(rt * g)))
            : ('width' === dt
                ? n(5, (rt = Math.round(it / g)))
                : 'height' === dt && n(4, (it = Math.round(rt * g))),
              ht())),
        6272 & t.$$.dirty[1] && (!x || !b || (xt && Ar(xt, b)) || n(38, (xt = b))),
        128 & t.$$.dirty[1] && n(44, (r = xt && ft(16, 0, xt))),
        128 & t.$$.dirty[1] && n(45, (a = xt && ft(0, 16, xt))),
        1536 & t.$$.dirty[1] &&
          n(
            46,
            (s = ((t, e) => {
              let { width: n, height: o } = t
              const i = Vt(e)
              return n && o
                ? t
                : (n && !o && (o = n / i),
                  o && !n && (n = o * i),
                  n || o || ((n = e.width), (o = e.height)),
                  vt(mt(n, o), Math.round))
            })(f || {}, m))
          ),
        98304 & t.$$.dirty[1] && v && $t.set(cm(v.width, v.width + 40, s.width)),
        98304 & t.$$.dirty[1] && v && yt.set(cm(v.height, v.height + 40, s.height)),
        1851392 & t.$$.dirty[1] &&
          n(
            48,
            (l = {
              id: gm,
              x: 0,
              y: -0,
              width: S.width,
              height: 180,
              rotation: Math.PI,
              opacity: 0.85 * k * C,
              backgroundImage: a,
            })
          ),
        1851392 & t.$$.dirty[1] &&
          n(
            52,
            (c = {
              id: gm,
              x: 0,
              y: S.height - 180 + 0,
              width: S.width,
              height: 180,
              opacity: 0.85 * k * C,
              backgroundImage: a,
            })
          ),
        9183232 & t.$$.dirty[1] &&
          n(
            53,
            (u = {
              id: gm,
              x: -0,
              y: 0,
              height: S.height,
              width: 180,
              rotation: Math.PI,
              opacity: 0.85 * k * R,
              backgroundImage: r,
            })
          ),
        9183232 & t.$$.dirty[1] &&
          n(
            55,
            (d = {
              id: gm,
              x: S.width - 180 + 0,
              y: 0,
              height: S.height,
              width: 180,
              opacity: 0.85 * k * R,
              backgroundImage: r,
            })
          ),
        23199744 & t.$$.dirty[1] && n(56, (p = [l, d, c, u])),
        101318656 & t.$$.dirty[1] && l)
      ) {
        const t = T.filter((t) => t.id !== gm)
        _o(tt, (T = k > 0 ? [...t, ...p] : t), T)
      }
      134219776 & t.$$.dirty[1] && P && wt.set(x ? 0 : 20),
        268435456 & t.$$.dirty[1] && n(11, (h = E ? `transform: translateY(${E}px)` : void 0))
    }),
    [
      O,
      _,
      V,
      pt,
      it,
      rt,
      ot,
      lt,
      ct,
      o,
      i,
      h,
      A,
      H,
      X,
      j,
      Y,
      G,
      Z,
      q,
      K,
      Q,
      J,
      tt,
      nt,
      (t) => {
        const e = t.target.id
        ;/width/.test(e)
          ? n(37, (ut = 'width'))
          : /height/.test(e)
          ? n(37, (ut = 'height'))
          : /aspectRatio/i.test(e)
          ? n(37, (ut = 'lock'))
          : n(37, (ut = void 0))
      },
      (t) => {
        ot.contains(t.relatedTarget) || gt(), n(37, (ut = void 0))
      },
      gt,
      $t,
      yt,
      wt,
      'resize',
      W,
      N,
      U,
      at,
      st,
      ut,
      xt,
      g,
      m,
      f,
      x,
      b,
      r,
      a,
      s,
      v,
      l,
      S,
      k,
      C,
      c,
      u,
      R,
      d,
      p,
      T,
      P,
      E,
      function () {
        ;(it = this.value), n(4, it)
      },
      function () {
        ;(pt = this.checked), n(3, pt)
      },
      function () {
        ;(rt = this.value), n(5, rt)
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(ot = t), n(6, ot)
        })
      },
      function (e) {
        wi(t, e)
      },
    ]
  )
}
var fm = {
  util: [
    'resize',
    class extends or {
      constructor(t) {
        super(),
          nr(
            this,
            t,
            mm,
            hm,
            Ao,
            {
              name: 31,
              isActive: 0,
              isActiveFraction: 1,
              stores: 32,
              locale: 2,
              resizeMinSize: 33,
              resizeMaxSize: 34,
            },
            [-1, -1, -1]
          )
      }
      get name() {
        return this.$$.ctx[31]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(t) {
        this.$set({ isActive: t }), Li()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Li()
      }
      get stores() {
        return this.$$.ctx[32]
      }
      set stores(t) {
        this.$set({ stores: t }), Li()
      }
      get locale() {
        return this.$$.ctx[2]
      }
      set locale(t) {
        this.$set({ locale: t }), Li()
      }
      get resizeMinSize() {
        return this.$$.ctx[33]
      }
      set resizeMinSize(t) {
        this.$set({ resizeMinSize: t }), Li()
      }
      get resizeMaxSize() {
        return this.$$.ctx[34]
      }
      set resizeMaxSize(t) {
        this.$set({ resizeMaxSize: t }), Li()
      }
    },
  ],
}
const $m =
  '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"></path></path></g>'
var ym = {
  labelReset: 'Reset',
  labelDefault: 'Default',
  labelAuto: 'Auto',
  labelNone: 'None',
  labelEdit: 'Edit',
  labelClose: 'Close',
  labelSupportError: (t) => t.join(', ') + ' not supported on this browser',
  labelSizeExtraSmall: 'Extra small',
  labelSizeSmall: 'Small',
  labelSizeMediumSmall: 'Medium small',
  labelSizeMedium: 'Medium',
  labelSizeMediumLarge: 'Medium large',
  labelSizeLarge: 'Large',
  labelSizeExtraLarge: 'Extra large',
  labelButtonRevert: 'Revert',
  labelButtonCancel: 'Cancel',
  labelButtonUndo: 'Undo',
  labelButtonRedo: 'Redo',
  labelButtonExport: 'Done',
  iconSupportError:
    '<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><g><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></g>',
  iconButtonClose: $m,
  iconButtonRevert:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M7.388 18.538a8 8 0 10-2.992-9.03"/><path fill="currentColor" d="M2.794 11.696L2.37 6.714l5.088 3.18z"/><path d="M12 8v4M12 12l4 2"/></g>',
  iconButtonUndo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M10 8h4c2.485 0 5 2 5 5s-2.515 5-5 5h-4"/><path fill="currentColor" d="M5 8l4-3v6z"/></g>',
  iconButtonRedo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M14 8h-4c-2.485 0-5 2-5 5s2.515 5 5 5h4"/><path fill="currentColor" d="M19 8l-4-3v6z"/></g>',
  iconButtonExport:
    '<polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width=".125em"></polyline>',
  statusLabelButtonClose: 'Close',
  statusIconButtonClose: $m,
  statusLabelLoadImage: (t) =>
    t && t.task
      ? t.error
        ? 'IMAGE_TOO_SMALL' === t.error.code
          ? 'Minimum image size is {minWidth} × {minHeight}'
          : 'Error loading image'
        : 'blob-to-bitmap' === t.task
        ? 'Creating preview…'
        : 'Loading image…'
      : 'Waiting for image',
  statusLabelProcessImage: (t) => {
    if (t && t.task)
      return 'store' === t.task
        ? t.error
          ? 'Error uploading image'
          : 'Uploading image…'
        : t.error
        ? 'Error processing image'
        : 'Processing image…'
  },
}
const xm = {
  shapeLabelButtonSelectSticker: 'Select image',
  shapeIconButtonSelectSticker:
    '<g fill="none" stroke="currentColor" stroke-width="0.0625em"><path d="M8 21 L15 11 L19 15"/><path d="M15 2 v5 h5"/><path d="M8 2 h8 l4 4 v12 q0 4 -4 4 h-8 q-4 0 -4 -4 v-12 q0 -4 4 -4z"/></g><circle fill="currentColor" cx="10" cy="8" r="1.5"/>',
  shapeIconButtonFlipHorizontal:
    '<g stroke="currentColor" stroke-width=".125em"><path d="M6 6.5h5v11H6z"/><path fill="#FFF" d="M15 6.5h3v11h-3z"/><path d="M11 4v16" fill="#fff"/></g>',
  shapeIconButtonFlipVertical:
    '<g stroke="currentColor" stroke-width=".125em">\n        <rect x="7" y="8" width="11" height="5" fill="none"/>\n        <rect x="7" y="17" width="11" height="2" fill="currentColor"/>\n        <line x1="5" y1="13" x2="20" y2="13"/></g>',
  shapeIconButtonRemove:
    '<g fill="none" fill-rule="evenodd"><path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7.5 7h9z"/><path d="M7.916 9h8.168a1 1 0 01.99 1.14l-.972 6.862a2 2 0 01-1.473 1.653c-.877.23-1.753.345-2.629.345-.876 0-1.752-.115-2.628-.345a2 2 0 01-1.473-1.653l-.973-6.862A1 1 0 017.916 9z" fill="#FFF"/><rect fill="#FFF" x="10" y="5" width="4" height="3" rx="1"/></g>',
  shapeIconButtonDuplicate:
    '<g fill="none" fill-rule="evenodd"><path d="M15 13.994V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h2.142" stroke="currentColor" stroke-width=".125em"/><path d="M15 9V8a1 1 0 00-2 0v1h-1a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1zm-4-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V7a2 2 0 012-2z" fill="currentColor"/></g>',
  shapeIconButtonMoveToFront:
    '<g fill="none" fill-rule="evenodd"><rect fill="currentColor" x="11" y="13" width="8" height="2" rx="1"/><rect fill="currentColor" x="9" y="17" width="10" height="2" rx="1"/><path d="M11.364 8H10a5 5 0 000 10M12 6.5L14.5 8 12 9.5z" stroke="currentColor" stroke-width=".125em" stroke-linecap="round"/></g>',
  shapeTitleButtonFlipHorizontal: 'Flip Horizontal',
  shapeTitleButtonFlipVertical: 'Flip Vertical',
  shapeTitleButtonRemove: 'Remove',
  shapeTitleButtonDuplicate: 'Duplicate',
  shapeTitleButtonMoveToFront: 'Move to front',
  shapeLabelInputText: 'Edit text',
  shapeIconInputCancel:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"/></g>',
  shapeIconInputConfirm:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><polyline points="20 6 9 17 4 12"/></g>',
  shapeLabelInputCancel: 'Cancel',
  shapeLabelInputConfirm: 'Confirm',
  shapeLabelStrokeNone: 'No outline',
  shapeLabelFontStyleNormal: 'Normal',
  shapeLabelFontStyleBold: 'Bold',
  shapeLabelFontStyleItalic: 'Italic',
  shapeLabelFontStyleItalicBold: 'Italic Bold',
  shapeTitleBackgroundColor: 'Fill color',
  shapeTitleFontFamily: 'Font',
  shapeTitleFontSize: 'Font size',
  shapeTitleFontStyle: 'Font style',
  shapeTitleLineHeight: 'Leading',
  shapeTitleLineStart: 'Start',
  shapeTitleLineEnd: 'End',
  shapeTitleStrokeWidth: 'Line width',
  shapeTitleStrokeColor: 'Line color',
  shapeTitleLineDecorationBar: 'Bar',
  shapeTitleLineDecorationCircle: 'Circle',
  shapeTitleLineDecorationSquare: 'Square',
  shapeTitleLineDecorationArrow: 'Arrow',
  shapeTitleLineDecorationCircleSolid: 'Circle solid',
  shapeTitleLineDecorationSquareSolid: 'Square solid',
  shapeTitleLineDecorationArrowSolid: 'Arrow solid',
  shapeIconLineDecorationBar:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M16,8 V16"/></g>',
  shapeIconLineDecorationCircle:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="none" stroke-width=".125em" cx="16" cy="12" r="4"/></g>',
  shapeIconLineDecorationSquare:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><rect fill="none" stroke-width=".125em" x="12" y="8" width="8" height="8"/></g>',
  shapeIconLineDecorationArrow:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16 M13,7 l6,5 l-6,5" fill="none"/></g>',
  shapeIconLineDecorationCircleSolid:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="currentColor" cx="16" cy="12" r="4"/></g>',
  shapeIconLineDecorationSquareSolid:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><rect fill="currentColor" x="12" y="8" width="8" height="8"/></g>',
  shapeIconLineDecorationArrowSolid:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M13,7 l6,5 l-6,5z" fill="currentColor"/></g>',
  shapeTitleColorTransparent: 'Transparent',
  shapeTitleColorWhite: 'White',
  shapeTitleColorSilver: 'Silver',
  shapeTitleColorGray: 'Gray',
  shapeTitleColorBlack: 'Black',
  shapeTitleColorNavy: 'Navy',
  shapeTitleColorBlue: 'Blue',
  shapeTitleColorAqua: 'Aqua',
  shapeTitleColorTeal: 'Teal',
  shapeTitleColorOlive: 'Olive',
  shapeTitleColorGreen: 'Green',
  shapeTitleColorYellow: 'Yellow',
  shapeTitleColorOrange: 'Orange',
  shapeTitleColorRed: 'Red',
  shapeTitleColorMaroon: 'Maroon',
  shapeTitleColorFuchsia: 'Fuchsia',
  shapeTitleColorPurple: 'Purple',
  shapeTitleTextColor: 'Font color',
  shapeTitleTextAlign: 'Text align',
  shapeTitleTextAlignLeft: 'Left align text',
  shapeTitleTextAlignCenter: 'Center align text',
  shapeTitleTextAlignRight: 'Right align text',
  shapeIconTextAlignLeft:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="5" y1="8" x2="15" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="16" x2="14" y2="16"/></g>',
  shapeIconTextAlignCenter:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="7" y1="8" x2="17" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></g>',
  shapeIconTextAlignRight:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="9" y1="8" x2="19" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="11" y1="16" x2="19" y2="16"/></g>',
  shapeLabelToolSharpie: 'Sharpie',
  shapeLabelToolEraser: 'Eraser',
  shapeLabelToolRectangle: 'Rectangle',
  shapeLabelToolEllipse: 'Ellipse',
  shapeLabelToolArrow: 'Arrow',
  shapeLabelToolLine: 'Line',
  shapeLabelToolText: 'Text',
  shapeLabelToolPreset: 'Stickers',
  shapeIconToolSharpie:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M2.025 5c5.616-2.732 8.833-3.857 9.65-3.374C12.903 2.351.518 12.666 2.026 14 3.534 15.334 16.536.566 17.73 2.566 18.924 4.566 3.98 17.187 4.831 18c.851.813 9.848-6 11.643-6 1.087 0-2.53 5.11-2.92 7-.086.41 3.323-1.498 4.773-1 .494.17.64 2.317 1.319 3 .439.443 1.332.776 2.679 1" stroke="currentColor" stroke-width=".125em" fill="none" fill-rule="evenodd" stroke-linejoin="round"/></g>',
  shapeIconToolEraser:
    '<g stroke-width=".125em" stroke="currentColor" stroke-linecap="round" fill="none"><g transform="translate(3, 15) rotate(-45)"><rect x="0" y="0" width="18" height="10" rx="3"/></g><line x1="11" y1="21" x2="18" y2="21"/><line x1="20" y1="21" x2="22" y2="21"/></g>',
  shapeIconToolRectangle:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="2" width="20" height="20" rx="3"/></g>',
  shapeIconToolEllipse:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="11"/></g>',
  shapeIconToolArrow:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/><path d="m10 5 L22 1 L21 13" fill="currentColor" stroke="none"/></g>',
  shapeIconToolLine:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/></g>',
  shapeIconToolText:
    '<g stroke="none" fill="currentColor" transform="translate(6,0)"><path d="M8.14 20.085c.459 0 .901-.034 1.329-.102a8.597 8.597 0 001.015-.21v1.984c-.281.135-.695.247-1.242.336a9.328 9.328 0 01-1.477.133c-3.312 0-4.968-1.745-4.968-5.235V6.804H.344v-1.25l2.453-1.078L3.89.819h1.5v3.97h4.97v2.015H5.39v10.078c0 1.031.245 1.823.735 2.375s1.161.828 2.015.828z"/>',
  shapeIconToolPreset:
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"></path><path d="M20 17c-3 3-5 5-8 5"></path></g>',
}
var bm = {
    cropLabel: 'Crop',
    cropIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M23 17H9a2 2 0 0 1-2-2v-5m0-3V1 M1 7h14a2 2 0 0 1 2 2v7m0 4v3"/></g>',
    cropIconButtonRecenter:
      '<path stroke="currentColor" fill="none" stroke-width="2" stroke-linejoin="bevel" d="M1.5 7.5v-6h6M1.5 16.5v6h6M22.5 16.5v6h-6M22.5 7.5v-6h-6"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>',
    cropIconButtonRotateLeft:
      '<g stroke="none" fill="currentColor"><path fill="none" d="M-1-1h582v402H-1z"/><rect x="3" rx="1" height="12" width="12" y="9"/><path d="M15 5h-1a5 5 0 015 5 1 1 0 002 0 7 7 0 00-7-7h-1.374l.747-.747A1 1 0 0011.958.84L9.603 3.194a1 1 0 000 1.415l2.355 2.355a1 1 0 001.415-1.414l-.55-.55H15z"/></g>',
    cropIconButtonRotateRight:
      '<g stroke="none" fill="currentColor"><path fill="none" d="M-1-1h582v402H-1z"/><path d="M11.177 5H10a5 5 0 00-5 5 1 1 0 01-2 0 7 7 0 017-7h1.374l-.747-.747A1 1 0 0112.042.84l2.355 2.355a1 1 0 010 1.415l-2.355 2.354a1 1 0 01-1.415-1.414l.55-.55z"/><rect rx="1" height="12" width="12" y="9" x="9"/></g>',
    cropIconButtonFlipVertical:
      '<g stroke="none" fill="currentColor"><path d="M19.993 12.143H7a1 1 0 0 1-1-1V5.994a1 1 0 0 1 1.368-.93l12.993 5.15a1 1 0 0 1-.368 1.93z"/><path d="M19.993 14a1 1 0 0 1 .368 1.93L7.368 21.078A1 1 0 0 1 6 20.148V15a1 1 0 0 1 1-1h12.993z" opacity=".6"/></g>',
    cropIconButtonFlipHorizontal:
      '<g stroke="none" fill="currentColor"><path d="M11.93 7.007V20a1 1 0 0 1-1 1H5.78a1 1 0 0 1-.93-1.368l5.15-12.993a1 1 0 0 1 1.929.368z"/><path d="M14 7.007V20a1 1 0 0 0 1 1h5.149a1 1 0 0 0 .93-1.368l-5.15-12.993A1 1 0 0 0 14 7.007z" opacity=".6"/></g>',
    cropIconSelectPreset: (t, e) => {
      const [n, o, i] = e
        ? [e < 1 ? 1 : 0.3, 1 === e ? 0.85 : 0.5, e > 1 ? 1 : 0.3]
        : [0.2, 0.3, 0.4]
      return `<g fill="currentColor">\n            <rect opacity="${n}" x="2" y="4" width="10" height="18" rx="1"/>\n            <rect opacity="${o}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${i}" x="6" y="12" width="17" height="10" rx="1"/>\n        </g>`
    },
    cropIconCropBoundary: (t, e) => {
      const [n, o, i, r] = e ? [0.3, 1, 0, 0] : [0, 0, 0.3, 1]
      return `<g fill="currentColor">\n            <rect opacity="${n}" x="2" y="3" width="20" height="20" rx="1"/>\n            <rect opacity="${o}" x="7" y="8" width="10" height="10" rx="1"/>\n            <rect opacity="${i}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${r}" x="12" y="4" width="10" height="10" rx="1"/>\n        </g>`
    },
    cropLabelButtonRecenter: 'Recenter',
    cropLabelButtonRotateLeft: 'Rotate left',
    cropLabelButtonRotateRight: 'Rotate right',
    cropLabelButtonFlipHorizontal: 'Flip horizontal',
    cropLabelButtonFlipVertical: 'Flip vertical',
    cropLabelSelectPreset: 'Crop shape',
    cropLabelCropBoundary: 'Crop boundary',
    cropLabelCropBoundaryEdge: 'Edge of image',
    cropLabelCropBoundaryNone: 'None',
    cropLabelTabRotation: 'Rotation',
    cropLabelTabZoom: 'Zoom',
  },
  vm = (t, e) => {
    const n = Object.getOwnPropertyDescriptors(t)
    Object.keys(n).forEach((o) => {
      n[o].get
        ? Object.defineProperty(e, o, { get: () => t[o], set: (e) => (t[o] = e) })
        : (e[o] = t[o])
    })
  },
  wm = [
    ...Yr,
    'undo',
    'redo',
    'revert',
    'destroy',
    'show',
    'hide',
    'close',
    'selectshape',
    'updateshape',
    'addshape',
    'removeshape',
  ],
  Sm = (t) => {
    const e = {},
      { sub: n, pub: o } = fr()
    ;(c() && null !== document.doctype) ||
      console.warn('Browser is in quirks mode, add <!DOCTYPE html> to page to fix render issues')
    const r = Qr()
    vm(r, e)
    const a = ((t, e) => {
      const n = {},
        o = new ru({ target: t, props: { stores: e, pluginComponents: Array.from(du) } })
      let i = !1
      const r = () => {
        i || (c() && window.removeEventListener('pagehide', r), o && ((i = !0), o.$destroy()))
      }
      lu || (lu = new Set(Ma(ru).filter((t) => !su.includes(t)))),
        lu.forEach((t) => {
          Object.defineProperty(n, t, { get: () => o[t], set: (e) => (o[t] = e) })
        }),
        cu.forEach((t) => {
          const e = uu[t],
            i = e[0]
          Object.defineProperty(n, t, {
            get: () => o.pluginInterface[i][t],
            set: (n) => {
              const i = e.reduce((e, i) => ((e[i] = { ...o.pluginOptions[i], [t]: n }), e), {})
              o.pluginOptions = { ...o.pluginOptions, ...i }
            },
          })
        }),
        Object.defineProperty(n, 'element', { get: () => o.root, set: () => {} })
      const a = o.history
      return (
        yr(n, {
          on: (t, e) => {
            if (i) return () => {}
            if (/undo|redo|revert/.test(t)) return a.on(t, e)
            const n = [
              o.sub(t, e),
              o.$on(t, (t) => e(t instanceof CustomEvent && !t.detail ? void 0 : t)),
            ].filter(Boolean)
            return () => n.forEach((t) => t())
          },
          close: () => !i && o.pub('close'),
          destroy: r,
          undo: () => a.undo(),
          redo: () => a.redo(),
          revert: () => a.revert(),
        }),
        Object.defineProperty(n, 'history', {
          get: () => ({
            undo: () => a.undo(),
            redo: () => a.redo(),
            revert: () => a.revert(),
            get: () => a.get(),
            set: (t) => a.set(t),
            write: (t) => a.write(t),
            get length() {
              return a.length()
            },
            get index() {
              return a.index
            },
          }),
        }),
        c() && window.addEventListener('pagehide', r),
        n
      )
    })(t, r.stores)
    vm(a, e)
    const s = ['loadImage', 'processImage', 'abortProcessImage', 'abortLoadImage'].map((t) =>
        a.on(t, (e) => r[t](e && e.detail))
      ),
      l = (t, e) => {
        const o = n(t, e),
          i = r.on(t, e),
          s = a.on(t, e)
        return () => {
          o(), i(), s()
        }
      }
    e.handleEvent = i
    const u = wm.map((t) => l(t, (n) => e.handleEvent(t, n)))
    return (
      yr(e, {
        on: l,
        close: () => {
          o('close')
        },
        destroy: () => {
          ;[...s, ...u].forEach((t) => t()), a.destroy(), r.destroy(), o('destroy')
        },
      }),
      e
    )
  }
var km = (t, e = {}) => {
  const n = w(t) ? document.querySelector(t) : t
  if (!ae(n)) return
  e.class = e.class ? 'pintura-editor ' + e.class : 'pintura-editor'
  const o = Sm(n)
  return Object.assign(o, e)
}
const { document: Cm } = Xi
function Mm(t) {
  let e, n, o, i
  return (
    Pi(t[20]),
    {
      c() {
        ;(e = Jo()), (n = qo('div')), ii(n, 'class', t[5]), ii(n, 'style', t[4])
      },
      m(r, a) {
        Go(r, e, a),
          Go(r, n, a),
          t[21](n),
          o ||
            ((i = [
              ei(window, 'keydown', t[10]),
              ei(window, 'orientationchange', t[11]),
              ei(window, 'resize', t[20]),
              ei(Cm.body, 'focusin', function () {
                Eo(!t[3] && t[7]) && (!t[3] && t[7]).apply(this, arguments)
              }),
              ei(Cm.body, 'focusout', function () {
                Eo(t[1] && t[8]) && (t[1] && t[8]).apply(this, arguments)
              }),
              ei(n, 'wheel', t[9], { passive: !1 }),
            ]),
            (o = !0))
      },
      p(e, o) {
        ;(t = e), 32 & o[0] && ii(n, 'class', t[5]), 16 & o[0] && ii(n, 'style', t[4])
      },
      i: ko,
      o: ko,
      d(r) {
        r && Zo(e), r && Zo(n), t[21](null), (o = !1), Po(i)
      },
    }
  )
}
function Rm(t, e, n) {
  let o, i, r, a, s
  const l = xi()
  let { root: c } = e,
    { preventZoomViewport: u = !0 } = e,
    { class: d } = e,
    p = !0,
    g = !1,
    m = !1
  const f = Ia(0, { precision: 0.001, damping: 0.5 })
  Fo(t, f, (t) => n(18, (s = t)))
  const $ = f.subscribe((t) => {
    m && t >= 1
      ? ((m = !1), n(3, (p = !1)), l('show'))
      : g && t <= 0 && ((g = !1), n(3, (p = !0)), l('hide'))
  })
  yi(() => $())
  let y = !1,
    x = void 0,
    b = void 0
  const v = () => document.querySelector('meta[name=viewport]')
  let w
  const S = (t, e) => {
    const n = () => {
      t() ? e() : requestAnimationFrame(n)
    }
    requestAnimationFrame(n)
  }
  let k,
    C,
    M = 0,
    R = void 0
  const T = () => {
    C ||
      ((C = h('div', { style: 'position:fixed;height:100vh;top:0' })), document.body.appendChild(C))
  }
  return (
    fi(() => {
      Ce() && T()
    }),
    $i(() => {
      C && (n(17, (R = C.offsetHeight)), C.parentNode.removeChild(C), (C = void 0))
    }),
    (t.$$set = (t) => {
      'root' in t && n(0, (c = t.root)),
        'preventZoomViewport' in t && n(12, (u = t.preventZoomViewport)),
        'class' in t && n(13, (d = t.class))
    }),
    (t.$$.update = () => {
      4096 & t.$$.dirty[0] &&
        (o =
          'width=device-width,height=device-height,initial-scale=1' +
          (u ? ',maximum-scale=1,user-scalable=0' : '')),
        6 & t.$$.dirty[0] && (y || n(16, (k = M))),
        131076 & t.$$.dirty[0] &&
          n(19, (i = Ce() ? '--viewport-pad-footer:' + (R > M ? 0 : 1) : '')),
        851968 & t.$$.dirty[0] && n(4, (r = `height:${k}px;opacity:${s};--editor-modal:1;${i}`)),
        8192 & t.$$.dirty[0] && n(5, (a = bs(['pintura-editor', 'PinturaModal', d])))
    }),
    [
      c,
      y,
      M,
      p,
      r,
      a,
      f,
      (t) => {
        ;/textarea/i.test(t.target) && (n(1, (y = !0)), (w = M))
      },
      (t) => {
        if (/textarea/i.test(t.target))
          if ((clearTimeout(undefined), w === M)) n(1, (y = !1))
          else {
            const t = M
            S(
              () => M !== t,
              () => n(1, (y = !1))
            )
          }
      },
      (t) => t.preventDefault(),
      (t) => {
        const { key: e } = t
        if (!/escape/i.test(e)) return
        const n = t.target
        if (n && /input|textarea/i.test(n.nodeName)) return
        const o = document.querySelectorAll('.PinturaModal')
        o[o.length - 1] === c && l('close')
      },
      T,
      u,
      d,
      () => {
        if (m || !p) return
        m = !0
        const t = v() || h('meta', { name: 'viewport' })
        ;(x = !x && t.getAttribute('content')),
          t.setAttribute('content', o + (/cover/.test(x) ? ',viewport-fit=cover' : '')),
          t.parentNode || document.head.appendChild(t),
          clearTimeout(b),
          (b = setTimeout(() => _o(f, (s = 1), s), 250))
      },
      () => {
        if (g || p) return
        clearTimeout(b), (g = !0)
        const t = v()
        x ? t.setAttribute('content', x) : document.head.removeChild(t), _o(f, (s = 0), s)
      },
      k,
      R,
      s,
      i,
      function () {
        n(2, (M = window.innerHeight))
      },
      function (t) {
        ki[t ? 'unshift' : 'push'](() => {
          ;(c = t), n(0, c)
        })
      },
    ]
  )
}
class Tm extends or {
  constructor(t) {
    super(),
      nr(
        this,
        t,
        Rm,
        Mm,
        Ao,
        { root: 0, preventZoomViewport: 12, class: 13, show: 14, hide: 15 },
        [-1, -1]
      )
  }
  get root() {
    return this.$$.ctx[0]
  }
  set root(t) {
    this.$set({ root: t }), Li()
  }
  get preventZoomViewport() {
    return this.$$.ctx[12]
  }
  set preventZoomViewport(t) {
    this.$set({ preventZoomViewport: t }), Li()
  }
  get class() {
    return this.$$.ctx[13]
  }
  set class(t) {
    this.$set({ class: t }), Li()
  }
  get show() {
    return this.$$.ctx[14]
  }
  get hide() {
    return this.$$.ctx[15]
  }
}
const Pm = ka,
  Em = Ca,
  Am = () => ({ read: s, apply: y }),
  Im = Qr,
  Lm = () =>
    (() => {
      const t = Kr(Xr).map(qr),
        e = mr.map(([t]) => t).filter((t) => !Zr.includes(t))
      return t.concat(e)
    })().concat(((lu = new Set(Ma(ru).filter((t) => !su.includes(t)))), [...lu, ...cu])),
  Fm = Ed,
  Bm = Td,
  zm = cp,
  Dm = {
    markupEditorToolbar: Ed(),
    markupEditorToolStyles: Td(),
    markupEditorShapeStyleControls: cp(),
  },
  Om = pu,
  _m = Sh,
  Wm = Eh,
  Vm = Dh,
  Nm = rm,
  Um = hu,
  Hm = lm,
  Xm = fm,
  jm = Du,
  Ym = Qu,
  Gm = ym,
  Zm = xm,
  qm = bm,
  Km = {
    filterLabel: 'Filter',
    filterIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M18.347 9.907a6.5 6.5 0 1 0-1.872 3.306M3.26 11.574a6.5 6.5 0 1 0 2.815-1.417 M10.15 17.897A6.503 6.503 0 0 0 16.5 23a6.5 6.5 0 1 0-6.183-8.51"/></g>',
    filterLabelChrome: 'Chrome',
    filterLabelFade: 'Fade',
    filterLabelCold: 'Cold',
    filterLabelWarm: 'Warm',
    filterLabelPastel: 'Pastel',
    filterLabelMonoDefault: 'Mono',
    filterLabelMonoNoir: 'Noir',
    filterLabelMonoWash: 'Wash',
    filterLabelMonoStark: 'Stark',
    filterLabelSepiaDefault: 'Sepia',
    filterLabelSepiaBlues: 'Blues',
    filterLabelSepiaRust: 'Rust',
    filterLabelSepiaColor: 'Color',
  },
  Qm = {
    finetuneLabel: 'Finetune',
    finetuneIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M4 1v5.5m0 3.503V23M12 1v10.5m0 3.5v8M20 1v15.5m0 3.5v3M2 7h4M10 12h4M18 17h4"/></g>',
    finetuneLabelBrightness: 'Brightness',
    finetuneLabelContrast: 'Contrast',
    finetuneLabelSaturation: 'Saturation',
    finetuneLabelExposure: 'Exposure',
    finetuneLabelTemperature: 'Temperature',
    finetuneLabelGamma: 'Gamma',
    finetuneLabelClarity: 'Clarity',
    finetuneLabelVignette: 'Vignette',
  },
  Jm = {
    resizeLabel: 'Resize',
    resizeIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="12" width="10" height="10" rx="2"/><path d="M4 11.5V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><path d="M14 10l3.365-3.365M14 6h4v4"/></g>',
    resizeLabelFormCaption: 'Image output size',
    resizeLabelInputWidth: 'w',
    resizeTitleInputWidth: 'Width',
    resizeLabelInputHeight: 'h',
    resizeTitleInputHeight: 'Height',
    resizeTitleButtonMaintainAspectRatio: 'Maintain aspectratio',
    resizeIconButtonMaintainAspectRatio: (t, e) =>
      `\n        <defs>\n            <mask id="mask1" x="0" y="0" width="24" height="24" >\n                <rect x="0" y="0" width="24" height="10" fill="#fff" stroke="none"/>\n            </mask>\n        </defs>\n        <g fill="none" fill-rule="evenodd">\n            <g  mask="url(#mask1)">\n                <path transform="translate(0 ${
        3 * (e - 1)
      })" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M9.401 10.205v-.804a2.599 2.599 0 0 1 5.198 0V17"/>\n            </g>\n            <rect fill="currentColor" x="7" y="10" width="10" height="7" rx="1.5"/>\n        </g>\n    `,
  },
  tf = hu,
  ef = {
    annotateLabel: 'Annotate',
    annotateIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M17.086 2.914a2.828 2.828 0 1 1 4 4l-14.5 14.5-5.5 1.5 1.5-5.5 14.5-14.5z"/></g>',
  },
  nf = {
    stickerLabel: 'Sticker',
    stickerIcon:
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"/><path d="M20 17c-3 3-5 5-8 5"/></g>',
  },
  of = (t, e, n = {}) =>
    (w(e) ? Array.from(document.querySelectorAll(e)) : e).filter(Boolean).map((e) => t(e, v(n))),
  rf = km,
  af = (t = {}, e) => {
    const { sub: n, pub: o } = fr(),
      r = {},
      a = ((t = {}, e) =>
        new Tm({
          target: e || document.body,
          props: { class: t.class, preventZoomViewport: t.preventZoomViewport },
        }))(t, e),
      s = () => {
        a.hide && a.hide()
      },
      l = () => {
        a.show && a.show()
      },
      c = Sm(a.root)
    vm(c, r), (r.handleEvent = i), (c.handleEvent = (t, e) => r.handleEvent(t, e)), c.on('close', s)
    const u = (t, e) => (/show|hide/.test(t) ? n(t, e) : c.on(t, e)),
      d = ['show', 'hide'].map((t) => u(t, (e) => r.handleEvent(t, e))),
      p = () => {
        d.forEach((t) => t()), s(), a.$destroy(), c.destroy()
      }
    return (
      yr(r, { on: u, destroy: p, hide: s, show: l }),
      Object.defineProperty(r, 'modal', { get: () => a.root, set: () => {} }),
      a.$on('close', c.close),
      a.$on('show', () => o('show')),
      a.$on('hide', () => {
        o('hide'), p()
      }),
      c.on('process', s),
      c.on('loadstart', l),
      !1 !== t.enableButtonClose && (t.enableButtonClose = !0),
      delete t.class,
      Object.assign(r, t),
      r
    )
  },
  sf = (t, e) => km(t, { ...e, layout: 'overlay' }),
  lf = (t, e) => of(rf, t, e),
  cf = (t = {}) => {
    pu(...[_m, Wm, Vm, Nm, Um, Hm, Xm].filter(Boolean))
    const e = [
      'crop',
      'filter',
      'finetune',
      'annotate',
      'decorate',
      t.stickers && 'sticker',
      'resize',
    ].filter(Boolean)
    let n = void 0
    Array.isArray(t.imageWriter) || ((n = t.imageWriter), delete t.imageReader)
    let o = void 0
    return (
      Array.isArray(t.imageWriter) || ((o = t.imageWriter), delete t.imageWriter),
      lr([
        {
          imageReader: Pm(n),
          imageWriter: Em(o),
          imageOrienter: Am(),
          utils: e,
          ...jm,
          ...Ym,
          ...Dm,
          stickerStickToImage: !0,
          locale: { ...Gm, ...Zm, ...qm, ...Km, ...Qm, ...Jm, ...tf, ...ef, ...nf },
        },
        t,
      ])
    )
  },
  uf = async (t = {}) => {
    const e = await void 0
    return e.forEach((e) => Object.assign(e, v(t))), e
  },
  df = (t) => uf(cf(t)),
  pf = (t) => af(cf(t)),
  hf = (t, e) => rf(t, cf(e)),
  gf = (t, e) => sf(t, cf(e)),
  mf = (t, e) => of(hf, t, e)
;((t) => {
  const [e, n, o, i, r, a, s, l, c, u, d, p] = [
    'bG9jYXRpb24=',
    'ZG9jdW1lbnQ=',
    'UmVnRXhw',
    'RWxlbWVudA==',
    'dGVzdA==',
    'PGEgaHJlZj0iaHR0cHM6Ly9wcWluYS5ubC8/dW5saWNlbnNlZCI+Zm9yIHVzZSBvbiBwcWluYS5ubCBvbmx5PC9hPg==',
    'aW5zZXJ0QWRqYWNlbnRIVE1M',
    'Y2xhc3NOYW1l',
    'IHBpbnR1cmEtZWRpdG9yLXZhbGlkYXRlZA==',
    'KD86WzAtOV17MSwzfVwuKXszfXxjc2JcLmFwcHxwcWluYVwubmx8bG9jYWxob3N0',
    'YmVmb3JlZW5k',
    'Ym9keQ==',
  ].map(t[[(!1 + '')[1], (!0 + '')[0], (1 + {})[2], (1 + {})[3]].join('')])
  new t[o](u)[r](t[e]) || t[n][p][s](d, a), (t[n][n + i][l] += c)
})(window)
export {
  hf as appendDefaultEditor,
  mf as appendDefaultEditors,
  rf as appendEditor,
  lf as appendEditors,
  wu as appendNode,
  z as blobToFile,
  zc as colorStringToColorArray,
  Ad as createDefaultColorOptions,
  Dd as createDefaultFontFamilyOptions,
  Ld as createDefaultFontScaleOptions,
  Id as createDefaultFontSizeOptions,
  _d as createDefaultFontStyleOptions,
  Am as createDefaultImageOrienter,
  Pm as createDefaultImageReader,
  Em as createDefaultImageWriter,
  zd as createDefaultLineEndStyleOptions,
  Bd as createDefaultStrokeScaleOptions,
  Fd as createDefaultStrokeWidthOptions,
  Od as createDefaultTextAlignOptions,
  Im as createEditor,
  Qd as createMarkupEditorBackgroundColorControl,
  Wd as createMarkupEditorColorOptions,
  ip as createMarkupEditorFontColorControl,
  Kd as createMarkupEditorFontFamilyControl,
  Xd as createMarkupEditorFontFamilyOptions,
  Nd as createMarkupEditorFontScaleOptions,
  ap as createMarkupEditorFontSizeControl,
  Vd as createMarkupEditorFontSizeOptions,
  rp as createMarkupEditorFontStyleControl,
  jd as createMarkupEditorFontStyleOptions,
  op as createMarkupEditorLineEndStyleControl,
  Yd as createMarkupEditorLineEndStyleOptions,
  lp as createMarkupEditorLineHeightControl,
  np as createMarkupEditorLineStartStyleControl,
  zm as createMarkupEditorShapeStyleControls,
  Jd as createMarkupEditorStrokeColorControl,
  Hd as createMarkupEditorStrokeScaleOptions,
  tp as createMarkupEditorStrokeWidthControl,
  Ud as createMarkupEditorStrokeWidthOptions,
  sp as createMarkupEditorTextAlignControl,
  Rd as createMarkupEditorToolStyle,
  Bm as createMarkupEditorToolStyles,
  Fm as createMarkupEditorToolbar,
  yu as createNode,
  uf as defineCustomElements,
  df as defineDefaultCustomElements,
  us as degToRad,
  hu as dispatchEditorEvents,
  Pu as effectBrightness,
  Bu as effectClarity,
  Eu as effectContrast,
  Iu as effectExposure,
  Lu as effectGamma,
  Au as effectSaturation,
  zu as effectTemperature,
  Fu as effectVignette,
  _u as filterChrome,
  Nu as filterCold,
  Wu as filterFade,
  Uu as filterInvert,
  Hu as filterMonoDefault,
  Xu as filterMonoNoir,
  Yu as filterMonoStark,
  ju as filterMonoWash,
  Ou as filterPastel,
  Zu as filterSepiaBlues,
  Ku as filterSepiaColor,
  Gu as filterSepiaDefault,
  qu as filterSepiaRust,
  Vu as filterWarm,
  ku as findNode,
  cf as getEditorDefaults,
  Lm as getEditorProps,
  vu as insertNodeAfter,
  bu as insertNodeBefore,
  Ru as isSupported,
  hu as legacyDataToImageState,
  Gm as locale_en_gb,
  Dm as markup_editor_defaults,
  Zm as markup_editor_locale_en_gb,
  pf as openDefaultEditor,
  af as openEditor,
  gf as overlayDefaultEditor,
  sf as overlayEditor,
  Nm as plugin_annotate,
  ef as plugin_annotate_locale_en_gb,
  _m as plugin_crop,
  qm as plugin_crop_locale_en_gb,
  Um as plugin_decorate,
  tf as plugin_decorate_locale_en_gb,
  Wm as plugin_filter,
  Ym as plugin_filter_defaults,
  Km as plugin_filter_locale_en_gb,
  Vm as plugin_finetune,
  jm as plugin_finetune_defaults,
  Qm as plugin_finetune_locale_en_gb,
  Xm as plugin_resize,
  Jm as plugin_resize_locale_en_gb,
  Hm as plugin_sticker,
  nf as plugin_sticker_locale_en_gb,
  Jr as processImage,
  Su as removeNode,
  Om as setPlugins,
  Oc as supportsWebGL,
}
