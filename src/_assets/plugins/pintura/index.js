/*!
 * Pintura Image Editor Sandbox 8.31.1
 * (c) 2018-2022 PQINA Inc. - All Rights Reserved
 * This version of Pintura Image Editor is for use on pqina.nl only
 * License: https://pqina.nl/pintura/license/
 */
/* eslint-disable */

const e = {
  65505: 'exif',
  65504: 'jfif',
  65498: 'sos',
}
var t = (t) => {
  if (65496 !== t.getUint16(0)) return
  const o = Object.keys(e).map((e) => parseInt(e, 10)),
    i = t.byteLength
  let n,
    r = 2,
    a = void 0
  for (; r < i && 255 === t.getUint8(r); ) {
    if (((n = t.getUint16(r)), o.includes(n))) {
      const o = e[n]
      a || (a = {}),
        a[o] ||
          (a[o] = {
            offset: r,
            size: t.getUint16(r + 2),
          })
    }
    if (65498 === n) break
    r += 2 + t.getUint16(r + 2)
  }
  return a
}
var o = (e, o, i) => {
  if (!e) return
  const n = new DataView(e),
    r = t(n)
  if (!r || !r.exif) return
  const a = ((e, t) => {
    if (65505 !== e.getUint16(t)) return
    const o = e.getUint16(t + 2)
    if (((t += 4), 1165519206 !== e.getUint32(t))) return
    t += 6
    const i = e.getUint16(t)
    if (18761 !== i && 19789 !== i) return
    const n = 18761 === i
    if (((t += 2), 42 !== e.getUint16(t, n))) return
    t += e.getUint32(t + 2, n)
    const r = (i) => {
      const r = []
      let a = t
      const s = t + o - 16
      for (; a < s; a += 12) {
        const t = a
        e.getUint16(t, n) === i && r.push(t)
      }
      return r
    }
    return {
      read: (t) => {
        const o = r(t)
        if (o.length) return e.getUint16(o[0] + 8, n)
      },
      write: (t, o) => {
        const i = r(t)
        return !!i.length && (i.forEach((t) => e.setUint16(t + 8, o, n)), !0)
      },
    }
  })(n, r.exif.offset)
  return a ? (void 0 === i ? a.read(o) : a.write(o, i)) : void 0
}
var i = (e) => (window.__pqina_webapi__ ? window.__pqina_webapi__[e] : window[e]),
  n = (...e) => {}
const r = {
  ArrayBuffer: 'readAsArrayBuffer',
}
var a = async (e, t = [0, e.size], o) =>
    await ((e, t = n, o = {}) =>
      new Promise((n, a) => {
        const { dataFormat: s = r.ArrayBuffer } = o,
          l = new (i('FileReader'))()
        ;(l.onload = () => n(l.result)), (l.onerror = a), (l.onprogress = t), l[s](e)
      }))(e.slice(...t), o),
  s = async (e, t) => {
    const i = await a(e, [0, 131072], t)
    return o(i, 274) || 1
  }
let l = null
var c = () => (null === l && (l = 'undefined' != typeof window && void 0 !== window.document), l)
let d = null
var u = () =>
    new Promise((e) => {
      if (null === d) {
        const t =
          'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k='
        let o = c() ? new Image() : {}
        return (
          (o.onload = () => {
            ;(d = 1 === o.naturalWidth), (o = void 0), e(d)
          }),
          void (o.src = t)
        )
      }
      return e(d)
    }),
  h = (e) => e.getContext('2d').getImageData(0, 0, e.width, e.height),
  p = (e, t, o = []) => {
    const i = document.createElement(e),
      n = Object.getOwnPropertyDescriptors(i.__proto__)
    for (const e in t)
      'style' === e
        ? (i.style.cssText = t[e])
        : (n[e] && n[e].set) || /textContent|innerHTML/.test(e) || 'function' == typeof t[e]
        ? (i[e] = t[e])
        : i.setAttribute(e, t[e])
    return o.forEach((e) => i.appendChild(e)), i
  }
const m = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (e) => [-1, 0, 0, 1, e, 0],
  3: (e, t) => [-1, 0, 0, -1, e, t],
  4: (e, t) => [1, 0, 0, -1, 0, t],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (e, t) => [0, 1, -1, 0, t, 0],
  7: (e, t) => [0, -1, -1, 0, t, e],
  8: (e) => [0, -1, 1, 0, 0, e],
}
var g = (e) => {
    ;(e.width = 1), (e.height = 1)
    const t = e.getContext('2d')
    t && t.clearRect(0, 0, 1, 1)
  },
  f = (e) => 'data' in e,
  $ = async (e, t = 1) => {
    const [o, i] = (await u()) || t < 5 ? [e.width, e.height] : [e.height, e.width],
      n = p('canvas', {
        width: o,
        height: i,
      }),
      r = n.getContext('2d')
    if (f(e) && !(await u()) && t > 1) {
      const t = p('canvas', {
        width: e.width,
        height: e.height,
      })
      t.getContext('2d').putImageData(e, 0, 0), (e = t)
    }
    return (
      !(await u()) &&
        t > 1 &&
        r.transform.apply(
          r,
          ((e, t, o = -1) => (-1 === o && (o = 1), m[o](e, t)))(e.width, e.height, t)
        ),
      f(e) ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0),
      e instanceof HTMLCanvasElement && g(e),
      n
    )
  },
  y = async (e, t = 1) => (1 === t || (await u()) ? e : h(await $(e, t))),
  b = (e) => 'object' == typeof e
const x = (e) => (b(e) ? v(e) : e),
  v = (e) => {
    let t
    return (
      Array.isArray(e)
        ? ((t = []),
          e.forEach((e, o) => {
            t[o] = x(e)
          }))
        : ((t = {}),
          Object.keys(e).forEach((o) => {
            const i = e[o]
            t[o] = x(i)
          })),
      t
    )
  }
var w = (e) => 'string' == typeof e,
  S = (e) => 'function' == typeof e,
  k = (e, t) =>
    new Promise((o, i) => {
      const n = () =>
        o(
          ((e, { width: t, height: o, canvasMemoryLimit: i }) => {
            let n = t || e.naturalWidth,
              r = o || e.naturalHeight
            n || r || ((n = 300), (r = 150))
            const a = n * r
            if (i && a > i) {
              const e = Math.sqrt(i) / Math.sqrt(a)
              ;(n = Math.floor(n * e)), (r = Math.floor(r * e))
            }
            const s = p('canvas')
            return (s.width = n), (s.height = r), s.getContext('2d').drawImage(e, 0, 0, n, r), s
          })(e, t)
        )
      e.complete && e.width ? n() : ((e.onload = n), (e.onerror = i))
    }),
  M = () => 'createImageBitmap' in window,
  C = (e) => /svg/.test(e.type),
  T = () => Math.random().toString(36).substr(2, 9)
const P = new Map()
var I = (e, t, o) =>
    new Promise((i, n) => {
      const r = e.toString()
      let a = P.get(r)
      if (!a) {
        const t = ((e) =>
            `function () {self.onmessage = function (message) {(${e.toString()}).apply(null, message.data.content.concat([function (err, response) {\n    response = response || {};\n    const transfer = 'data' in response ? [response.data.buffer] : 'width' in response ? [response] : [];\n    return self.postMessage({ id: message.data.id, content: response, error: err }, transfer);\n}]))}}`)(
            e
          ),
          o = URL.createObjectURL(
            ((e) =>
              new Blob(['(', 'function' == typeof e ? e.toString() : e, ')()'], {
                type: 'application/javascript',
              }))(t)
          ),
          i = new Map(),
          n = new Worker(o)
        ;(a = {
          url: o,
          worker: n,
          messages: i,
          terminationTimeout: void 0,
          terminate: () => {
            clearTimeout(a.terminationTimeout),
              a.worker.terminate(),
              URL.revokeObjectURL(o),
              P.delete(r)
          },
        }),
          (n.onmessage = function (e) {
            const { id: t, content: o, error: n } = e.data
            if (
              (clearTimeout(a.terminationTimeout),
              (a.terminationTimeout = setTimeout(() => {
                i.size > 0 || a.terminate()
              }, 500)),
              !i.has(t))
            )
              return
            const r = i.get(t)
            i.delete(t), null != n ? r.reject(n) : r.resolve(o)
          }),
          P.set(r, a)
      }
      const s = T()
      a.messages.set(s, {
        resolve: i,
        reject: n,
      }),
        a.worker.postMessage(
          {
            id: s,
            content: t,
          },
          o
        )
    }),
  R = async (e, t) => {
    let o
    if (M() && !C(e) && 'OffscreenCanvas' in window)
      try {
        o = await I(
          (e, t, o) => {
            createImageBitmap(e)
              .then((e) => {
                let i = e.width,
                  n = e.height
                const r = i * n
                if (t && r > t) {
                  const e = Math.sqrt(t) / Math.sqrt(r)
                  ;(i = Math.floor(i * e)), (n = Math.floor(n * e))
                }
                const a = new OffscreenCanvas(i, n),
                  s = a.getContext('2d')
                s.drawImage(e, 0, 0, i, n)
                const l = s.getImageData(0, 0, a.width, a.height)
                o(null, l)
              })
              .catch((e) => {
                o(e)
              })
          },
          [e, t]
        )
      } catch (e) {}
    if (!o || !o.width) {
      const i = await (async (e, t) => {
        const o = p('img', {
            src: URL.createObjectURL(e),
          }),
          i = await k(o, {
            canvasMemoryLimit: t,
          })
        return URL.revokeObjectURL(o.src), i
      })(e, t)
      ;(o = h(i)), g(i)
    }
    return o
  },
  A = (e, t, o) =>
    new Promise((i, n) => {
      try {
        e.toBlob(
          (e) => {
            i(e)
          },
          t,
          o
        )
      } catch (e) {
        n(e)
      }
    }),
  E = async (e, t, o) => {
    const i = await $(e),
      n = await A(i, t, o)
    return g(i), n
  },
  L = (e) => (e.match(/\/([a-z]+)/) || [])[1],
  F = (e) => e.substr(0, e.lastIndexOf('.')) || e
const z = /avif|bmp|gif|jpg|jpeg|jpe|jif|jfif|png|svg|tiff|webp/
var B = (e) => {
    return (
      e &&
      ((t = ((o = e), o.split('.').pop()).toLowerCase()),
      z.test(t)
        ? 'image/' + (/jfif|jif|jpe|jpg/.test(t) ? 'jpeg' : 'svg' === t ? 'svg+xml' : t)
        : '')
    )
    var t, o
  },
  D = (e, t, o) => {
    const n = new Date().getTime(),
      r = e.type.length && !/null|text/.test(e.type),
      a = r ? e.type : o,
      s = ((e, t) => {
        const o = B(e)
        if (o === t) return e
        const i = L(t) || o
        return `${F(e)}.${i}`
      })(t, a)
    try {
      return new (i('File'))([e], s, {
        lastModified: n,
        type: r ? e.type : a,
      })
    } catch (t) {
      const o = r ? e.slice() : e.slice(0, e.size, a)
      return (o.lastModified = n), (o.name = s), o
    }
  },
  O = (e, t) => e / t,
  W = (e) => e
const V = Math.PI,
  _ = Math.PI / 2,
  Z = _ / 2
var j = (e) => {
  const t = Math.abs(e) % Math.PI
  return t > Z && t < Math.PI - Z
}
const N = {
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
    Top: H,
    Right: U,
    Bottom: X,
    Left: Y,
    TopLeft: G,
    TopRight: q,
    BottomRight: K,
    BottomLeft: J,
  } = N
var Q = {
    [H]: [0.5, 0],
    [U]: [1, 0.5],
    [X]: [0.5, 1],
    [Y]: [0, 0.5],
    [G]: [0, 0],
    [q]: [1, 0],
    [K]: [1, 1],
    [J]: [0, 1],
  },
  ee = (e, t = 12) => parseFloat(e.toFixed(t))
const te = (e, t, o) => o + (e - o) * t,
  oe = (e) => ({
    x: e.x + 0.5 * e.width,
    y: e.y + 0.5 * e.height,
    rx: 0.5 * e.width,
    ry: 0.5 * e.height,
  }),
  ie = () => ne(0, 0),
  ne = (e, t) => ({
    x: e,
    y: t,
  }),
  re = (e) => ne(e.x, e.y),
  ae = (e) => ne(e.pageX, e.pageY),
  se = (e) => ne(e.x, e.y),
  le = (e) => ((e.x = -e.x), (e.y = -e.y), e),
  ce = (e, t, o = ie()) => {
    const i = Math.cos(t),
      n = Math.sin(t),
      r = e.x - o.x,
      a = e.y - o.y
    return (e.x = o.x + i * r - n * a), (e.y = o.y + n * r + i * a), e
  },
  de = (e) => Math.sqrt(e.x * e.x + e.y * e.y),
  ue = (e) => {
    const t = Math.sqrt(e.x * e.x + e.y * e.y)
    return 0 === t ? ie() : ((e.x /= t), (e.y /= t), e)
  },
  he = (e, t) => Math.atan2(t.y - e.y, t.x - e.x),
  pe = (e, t) => e.x === t.x && e.y === t.y,
  me = (e, t) => ((e.x = t(e.x)), (e.y = t(e.y)), e),
  ge = (e, t) => ((e.x += t.x), (e.y += t.y), e),
  fe = (e, t) => ((e.x -= t.x), (e.y -= t.y), e),
  $e = (e, t) => ((e.x *= t), (e.y *= t), e),
  ye = (e, t) => e.x * t.x + e.y * t.y,
  be = (e, t = ie()) => {
    const o = e.x - t.x,
      i = e.y - t.y
    return o * o + i * i
  },
  xe = (e, t = ie()) => Math.sqrt(be(e, t)),
  ve = (e, t, o) => ((e.x = te(e.x, t, o.x)), (e.y = te(e.y, t, o.y)), e),
  we = (e) => {
    let t = 0,
      o = 0
    return (
      e.forEach((e) => {
        ;(t += e.x), (o += e.y)
      }),
      ne(t / e.length, o / e.length)
    )
  },
  Se = (e, t, o, i, n) => (
    e.forEach((e) => {
      ;(e.x = t ? i - (e.x - i) : e.x), (e.y = o ? n - (e.y - n) : e.y)
    }),
    e
  ),
  ke = (e, t, o, i) => {
    const n = Math.sin(t),
      r = Math.cos(t)
    return (
      e.forEach((e) => {
        ;(e.x -= o), (e.y -= i)
        const t = e.x * r - e.y * n,
          a = e.x * n + e.y * r
        ;(e.x = o + t), (e.y = i + a)
      }),
      e
    )
  },
  Me = (e, t) => ({
    width: e,
    height: t,
  }),
  Ce = (e) => Me(e.width, e.height),
  Te = (e) => Me(e.width, e.height),
  Pe = (e) => Me(e.width, e.height),
  Ie = (e) => Me(e[0], e[1]),
  Re = (e) => {
    return /img/i.test(e.nodeName) ? Me((t = e).naturalWidth, t.naturalHeight) : Te(e)
    var t
  },
  Ae = (e, t) => Me(e, t),
  Ee = (e, t, o = W) => o(e.width) === o(t.width) && o(e.height) === o(t.height),
  Le = (e, t) => ((e.width *= t), (e.height *= t), e),
  Fe = (e) => ne(0.5 * e.width, 0.5 * e.height),
  ze = (e, t) => {
    const o = Math.abs(t),
      i = Math.cos(o),
      n = Math.sin(o),
      r = i * e.width + n * e.height,
      a = n * e.width + i * e.height
    return (e.width = r), (e.height = a), e
  },
  Be = (e, t) => e.width >= t.width && e.height >= t.height,
  De = (e, t) => ((e.width = t(e.width)), (e.height = t(e.height)), e),
  Oe = (e, t) => ({
    start: e,
    end: t,
  }),
  We = (e) => Oe(se(e.start), se(e.end)),
  Ve = (e, t) => {
    if (0 === t) return e
    const o = ne(e.start.x - e.end.x, e.start.y - e.end.y),
      i = ue(o),
      n = $e(i, t)
    return (e.start.x += n.x), (e.start.y += n.y), (e.end.x -= n.x), (e.end.y -= n.y), e
  },
  _e = [ne(-1, -1), ne(-1, 1), ne(1, 1), ne(1, -1)],
  Ze = (e, t, o, i) => ({
    x: e,
    y: t,
    width: o,
    height: i,
  }),
  je = (e) => Ze(e.x, e.y, e.width, e.height),
  Ne = () => Ze(0, 0, 0, 0),
  He = (e) => Ze(0, 0, e.width, e.height),
  Ue = (e) => Ze(e.x || 0, e.y || 0, e.width || 0, e.height || 0),
  Xe = (e) => {
    let t = e[0].x,
      o = e[0].x,
      i = e[0].y,
      n = e[0].y
    return (
      e.forEach((e) => {
        ;(t = Math.min(t, e.x)),
          (o = Math.max(o, e.x)),
          (i = Math.min(i, e.y)),
          (n = Math.max(n, e.y))
      }),
      Ze(t, i, o - t, n - i)
    )
  },
  Ye = (e) => qe(e.x - e.rx, e.y - e.ry, 2 * e.rx, 2 * e.ry),
  Ge = (e, t) => Ze(e.x - 0.5 * t.width, e.y - 0.5 * t.height, t.width, t.height),
  qe = (e, t, o, i) => Ze(e, t, o, i),
  Ke = (e) => ne(e.x + 0.5 * e.width, e.y + 0.5 * e.height),
  Je = (e, t) => ((e.x += t.x), (e.y += t.y), e),
  Qe = (e, t, o) => (
    (o = o || Ke(e)),
    (e.x = t * (e.x - o.x) + o.x),
    (e.y = t * (e.y - o.y) + o.y),
    (e.width = t * e.width),
    (e.height = t * e.height),
    e
  ),
  et = (e, t, o, i) => {
    const n = (i.x - e.x) / e.width,
      r = (i.y - e.y) / e.height
    let a = Math.max(t.width, e.width),
      s = Math.max(t.height, e.height)
    return (
      (a = Math.min(o.width, a)),
      (s = Math.min(o.height, s)),
      (e.x = i.x - n * a),
      (e.y = i.y - r * s),
      (e.width = a),
      (e.height = s),
      e
    )
  },
  tt = (e, t) => {
    const [o, i] = Q[t],
      n = o * e.width,
      r = i * e.height
    return ne(e.x + n, e.y + r)
  },
  ot = (e, t) => ((e.x *= t), (e.y *= t), (e.width *= t), (e.height *= t), e),
  it = (e, t) => ((e.x /= t), (e.y /= t), (e.width /= t), (e.height /= t), e),
  nt = (e, t, o = W) =>
    o(e.x) === o(t.x) &&
    o(e.y) === o(t.y) &&
    o(e.width) === o(t.width) &&
    o(e.height) === o(t.height),
  rt = (e) => O(e.width, e.height),
  at = (e, t, o, i, n) => ((e.x = t), (e.y = o), (e.width = i), (e.height = n), e),
  st = (e, t) => ((e.x = t.x), (e.y = t.y), (e.width = t.width), (e.height = t.height), e),
  lt = (e, t, o) => (o || (o = Ke(e)), mt(e).map((e) => ce(e, t, o))),
  ct = (e, t) =>
    Ze(0.5 * e.width - 0.5 * t.width, 0.5 * e.height - 0.5 * t.height, t.width, t.height),
  dt = (e, t) => !(t.x < e.x) && !(t.y < e.y) && !(t.x > e.x + e.width) && !(t.y > e.y + e.height),
  ut = (e, t, o = ie()) => {
    if (0 === e.width || 0 === e.height) return Ne()
    const i = rt(e)
    t || (t = i)
    let n = e.width,
      r = e.height
    return (
      t > i ? (n = r * t) : (r = n / t),
      Ze(o.x + 0.5 * (e.width - n), o.y + 0.5 * (e.height - r), n, r)
    )
  },
  ht = (e, t = rt(e), o = ie()) => {
    if (0 === e.width || 0 === e.height) return Ne()
    let i = e.width,
      n = i / t
    return (
      n > e.height && ((n = e.height), (i = n * t)),
      Ze(o.x + 0.5 * (e.width - i), o.y + 0.5 * (e.height - n), i, n)
    )
  },
  pt = (e) => [
    Math.min(e.y, e.y + e.height),
    Math.max(e.x, e.x + e.width),
    Math.max(e.y, e.y + e.height),
    Math.min(e.x, e.x + e.width),
  ],
  mt = (e) => [
    ne(e.x, e.y),
    ne(e.x + e.width, e.y),
    ne(e.x + e.width, e.y + e.height),
    ne(e.x, e.y + e.height),
  ],
  gt = (e, t) => {
    if (e)
      return (e.x = t(e.x)), (e.y = t(e.y)), (e.width = t(e.width)), (e.height = t(e.height)), e
  },
  ft = (e, t, o = Ke(e)) =>
    mt(e).map((e, i) => {
      const n = _e[i]
      return ne(te(e.x, 1 + n.x * t.x, o.x), te(e.y, 1 + n.y * t.y, o.y))
    }),
  $t = (e) => ((e.x = 0), (e.y = 0), e),
  yt = (e) => {
    const t = e[0],
      o = e[e.length - 1]
    e = pe(t, o) ? e : [...e, t]
    const i = t.x,
      n = t.y
    let r,
      a,
      s,
      l = 0,
      c = 0,
      d = 0,
      u = 0
    const h = e.length
    for (; c < h; c++)
      (r = e[c]),
        (a = e[c + 1 > h - 1 ? 0 : c + 1]),
        (s = (r.y - n) * (a.x - i) - (a.y - n) * (r.x - i)),
        (l += s),
        (d += (r.x + a.x - 2 * i) * s),
        (u += (r.y + a.y - 2 * n) * s)
    return (s = 3 * l), ne(i + d / s, n + u / s)
  },
  bt = (e, t) => xt(e.start, e.end, t.start, t.end),
  xt = (e, t, o, i) => {
    const n = (i.y - o.y) * (t.x - e.x) - (i.x - o.x) * (t.y - e.y)
    if (0 === n) return
    const r = ((i.x - o.x) * (e.y - o.y) - (i.y - o.y) * (e.x - o.x)) / n,
      a = ((t.x - e.x) * (e.y - o.y) - (t.y - e.y) * (e.x - o.x)) / n
    return r < 0 || r > 1 || a < 0 || a > 1
      ? void 0
      : ne(e.x + r * (t.x - e.x), e.y + r * (t.y - e.y))
  },
  vt = (e, t) => {
    let o = 0,
      i = 0,
      n = !1
    const r = t.length
    for (o = 0, i = r - 1; o < r; i = o++)
      t[o].y > e.y != t[i].y > e.y &&
        e.x < ((t[i].x - t[o].x) * (e.y - t[o].y)) / (t[i].y - t[o].y) + t[o].x &&
        (n = !n)
    return n
  },
  wt = (e) => {
    const t = []
    for (let o = 0; o < e.length; o++) {
      let i = o + 1
      i === e.length && (i = 0), t.push(Oe(se(e[o]), se(e[i])))
    }
    return t
  },
  St = (e, t = 0) => wt(e).map((e) => Ve(e, t)),
  kt = (e, t, o, i = 0, n = !1, r = !1, a = 12) => {
    const s = []
    for (let i = 0; i < a; i++)
      s.push(
        ne(e.x + t * Math.cos((i * (2 * Math.PI)) / a), e.y + o * Math.sin((i * (2 * Math.PI)) / a))
      )
    return (n || r) && Se(s, n, r, e.x, e.y), i && ke(s, i, e.x, e.y), s
  }
var Mt = (e, t) => e instanceof HTMLElement && (!t || new RegExp(`^${t}$`, 'i').test(e.nodeName)),
  Ct = (e) => e instanceof File,
  Tt = (e) => e.split('/').pop().split(/\?|\#/).shift()
const Pt =
    c() && !!Node.prototype.replaceChildren
      ? (e, t) => e.replaceChildren(t)
      : (e, t) => {
          for (; e.lastChild; ) e.removeChild(e.lastChild)
          void 0 !== t && e.append(t)
        },
  It =
    c() &&
    p('div', {
      class: 'PinturaMeasure',
      style:
        'pointer-events:none;left:0;top:0;width:0;height:0;contain:strict;overflow:hidden;position:absolute;',
    })
let Rt
var At = (e) => (
  Pt(It, e),
  It.parentNode || document.body.append(It),
  clearTimeout(Rt),
  (Rt = setTimeout(() => {
    It.remove()
  }, 500)),
  e
)
let Et = null
var Lt = () => (
    null === Et &&
      (Et = c() && /^((?!chrome|android).)*(safari|iphone|ipad)/i.test(navigator.userAgent)),
    Et
  ),
  Ft = (e) =>
    new Promise((t, o) => {
      let i = !1
      !e.parentNode &&
        Lt() &&
        ((i = !0),
        (e.style.cssText =
          'position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:0;height:0;'),
        At(e))
      const n = () => {
        const o = e.naturalWidth,
          n = e.naturalHeight
        o &&
          n &&
          (i && e.remove(),
          clearInterval(r),
          t({
            width: o,
            height: n,
          }))
      }
      e.onerror = (e) => {
        clearInterval(r), o(e)
      }
      const r = setInterval(n, 1)
      n()
    }),
  zt = async (e) => {
    let t,
      o = e
    o.src || ((o = new Image()), (o.src = w(e) ? e : URL.createObjectURL(e)))
    try {
      t = await Ft(o)
    } finally {
      Ct(e) && URL.revokeObjectURL(o.src)
    }
    return t
  }
var Bt = async (e) => {
    try {
      const t = await zt(e),
        o = await ((e) =>
          new Promise((t, o) => {
            if (e.complete) return t(e)
            ;(e.onload = () => t(e)), (e.onerror = o)
          }))(e),
        i = document.createElement('canvas')
      ;(i.width = t.width), (i.height = t.height)
      i.getContext('2d').drawImage(o, 0, 0)
      const n = await A(i)
      return D(n, Tt(o.src))
    } catch (e) {
      throw e
    }
  },
  Dt = (e = 0, t = !0) =>
    new (i('ProgressEvent'))('progress', {
      loaded: 100 * e,
      total: 100,
      lengthComputable: t,
    }),
  Ot = (e) => /^image/.test(e.type),
  Wt = (e, t, o = (e) => e) =>
    e.getAllResponseHeaders().indexOf(t) >= 0 ? o(e.getResponseHeader(t)) : void 0,
  Vt = (e) => {
    if (!e) return null
    const t = e
      .split(/filename=|filename\*=.+''/)
      .splice(1)
      .map((e) => e.trim().replace(/^["']|[;"']{0,2}$/g, ''))
      .filter((e) => e.length)
    return t.length ? decodeURI(t[t.length - 1]) : null
  }
const _t = 'URL_REQUEST'
class Zt extends Error {
  constructor(e, t, o) {
    super(e), (this.name = 'EditorError'), (this.code = t), (this.metadata = o)
  }
}
var jt = (e, t, o) =>
    /^data:/.test(e)
      ? (async (e, t = 'data-uri', o = n) => {
          o(Dt(0))
          const i = await fetch(e)
          o(Dt(0.33))
          const r = await i.blob()
          let a
          Ot(r) || (a = 'image/' + (e.includes(',/9j/') ? 'jpeg' : 'png')), o(Dt(0.66))
          const s = D(r, t, a)
          return o(Dt(1)), s
        })(e, void 0, t)
      : ((e, t, o) =>
          new Promise((i, n) => {
            const r = () => n(new Zt('Error fetching image', _t, a)),
              a = new XMLHttpRequest()
            ;(a.onprogress = t),
              (a.onerror = r),
              (a.onload = () => {
                if (!a.response || a.status >= 300 || a.status < 200) return r()
                const t = Wt(a, 'Content-Type'),
                  o = Wt(a, 'Content-Disposition', Vt) || Tt(e)
                i(D(a.response, o, t || B(o)))
              })
            const { willRequest: s } = o
            Promise.resolve(
              s &&
                s(e, {
                  resourceType: 'image',
                })
            )
              .then((t) => {
                if (!1 === t) return n('Image load rejected')
                a.open('GET', e)
                const { headers: o = {}, credentials: i } = t || {}
                Object.entries(o).forEach(([e, t]) => a.setRequestHeader(e, t)),
                  i && (a.withCredentials = 'omit' !== i),
                  (a.responseType = 'blob'),
                  a.send()
              })
              .catch(console.error)
          }))(e, t, o),
  Nt = async (e, t, o) => {
    if (Ct(e) || ((i = e) instanceof Blob && !(i instanceof File))) return e
    if (w(e)) return await jt(e, t, o)
    if (Mt(e, 'canvas'))
      return await (async (e, t, o) => {
        const i = await A(e, t, o)
        return D(i, 'canvas')
      })(e)
    if (Mt(e, 'img')) return await Bt(e)
    throw new Zt('Invalid image source', 'invalid-image-source')
    var i
  }
let Ht = null
var Ut = () => (null === Ht && (Ht = c() && /^mac/i.test(navigator.platform)), Ht),
  Xt = (e) => (c() ? RegExp(e).test(window.navigator.userAgent) : void 0)
let Yt = null
var Gt = () => (
    null === Yt &&
      (Yt = c() && (Xt(/iPhone|iPad|iPod/) || (Ut() && navigator.maxTouchPoints >= 1))),
    Yt
  ),
  qt = async (e, t = 1) => ((await u()) || Gt() || t < 5 ? e : Ae(e.height, e.width)),
  Kt = (e) => /jpeg/.test(e.type),
  Jt = (e) => {
    return 'object' != typeof (t = e) || t.constructor != Object ? e : JSON.stringify(e)
    var t
  },
  Qt = (e, t = 0, o) => (
    0 === t || (e.translate(o.x, o.y), e.rotate(t), e.translate(-o.x, -o.y)), e
  ),
  eo = async (e, t = {}) => {
    const { flipX: o, flipY: i, rotation: n, crop: r } = t,
      a = Te(e),
      s = o || i,
      l = !!n,
      c = r && (r.x || r.y || r.width || r.height),
      d = c && nt(r, He(a)),
      u = c && !d
    if (!s && !l && !u) return e
    let h,
      m = p('canvas', {
        width: e.width,
        height: e.height,
      })
    if ((m.getContext('2d').putImageData(e, 0, 0), s)) {
      const e = p('canvas', {
        width: m.width,
        height: m.height,
      }).getContext('2d')
      ;((e, t, o) => {
        e.scale(t, o)
      })(e, o ? -1 : 1, i ? -1 : 1),
        e.drawImage(m, o ? -m.width : 0, i ? -m.height : 0),
        e.restore(),
        g(m),
        (m = e.canvas)
    }
    if (l) {
      const e = De(Pe(Xe(lt(Ue(m), n))), Math.floor),
        t = p('canvas', {
          width: r.width,
          height: r.height,
        }).getContext('2d')
      ;((e, t, o) => {
        e.translate(t, o)
      })(t, -r.x, -r.y),
        Qt(t, n, Fe(e)),
        t.drawImage(m, 0.5 * (e.width - m.width), 0.5 * (e.height - m.height)),
        t.restore(),
        g(m),
        (m = t.canvas)
    } else if (u) {
      return (h = m.getContext('2d').getImageData(r.x, r.y, r.width, r.height)), g(m), h
    }
    return (h = m.getContext('2d').getImageData(0, 0, m.width, m.height)), g(m), h
  },
  to = (e, t) => {
    const { imageData: o, width: i, height: n } = e,
      r = o.width,
      a = o.height,
      s = Math.round(i),
      l = Math.round(n),
      c = o.data,
      d = new Uint8ClampedArray(s * l * 4),
      u = r / s,
      h = a / l,
      p = Math.ceil(0.5 * u),
      m = Math.ceil(0.5 * h)
    for (let e = 0; e < l; e++)
      for (let t = 0; t < s; t++) {
        const o = 4 * (t + e * s)
        let i = 0,
          n = 0,
          a = 0,
          l = 0,
          g = 0,
          f = 0,
          $ = 0
        const y = (e + 0.5) * h
        for (let o = Math.floor(e * h); o < (e + 1) * h; o++) {
          const e = Math.abs(y - (o + 0.5)) / m,
            s = (t + 0.5) * u,
            d = e * e
          for (let e = Math.floor(t * u); e < (t + 1) * u; e++) {
            let t = Math.abs(s - (e + 0.5)) / p
            const u = Math.sqrt(d + t * t)
            if (u < -1 || u > 1) continue
            if (((i = 2 * u * u * u - 3 * u * u + 1), i <= 0)) continue
            t = 4 * (e + o * r)
            const h = c[t + 3]
            ;($ += i * h),
              (a += i),
              h < 255 && (i = (i * h) / 250),
              (l += i * c[t]),
              (g += i * c[t + 1]),
              (f += i * c[t + 2]),
              (n += i)
          }
        }
        ;(d[o] = l / n), (d[o + 1] = g / n), (d[o + 2] = f / n), (d[o + 3] = $ / a)
      }
    t(null, {
      data: d,
      width: s,
      height: l,
    })
  },
  oo = (e) => {
    if (e instanceof ImageData) return e
    let t
    try {
      t = new ImageData(e.width, e.height)
    } catch (o) {
      t = p('canvas').getContext('2d').createImageData(e.width, e.height)
    }
    return t.data.set(e.data), t
  },
  io = async (e, t = {}, o) => {
    const { width: i, height: n, fit: r, upscale: a } = t
    if (!i && !n) return e
    let s = i,
      l = n
    if ((i ? n || (l = i) : (s = n), 'force' !== r)) {
      const t = s / e.width,
        o = l / e.height
      let i = 1
      if (
        ('cover' === r ? (i = Math.max(t, o)) : 'contain' === r && (i = Math.min(t, o)),
        i > 1 && !1 === a)
      )
        return e
      ;(s = Math.round(e.width * i)), (l = Math.round(e.height * i))
    }
    return (
      (s = Math.max(s, 1)),
      (l = Math.max(l, 1)),
      e.width === s && e.height === l
        ? e
        : o
        ? o(e, s, l)
        : ((e = await I(
            to,
            [
              {
                imageData: e,
                width: s,
                height: l,
              },
            ],
            [e.data.buffer]
          )),
          oo(e))
    )
  },
  no = (e, t) => {
    const { imageData: o, matrix: i } = e
    if (!i) return t(null, o)
    const n = new Uint8ClampedArray(o.width * o.height * 4),
      r = o.data,
      a = r.length,
      s = i[0],
      l = i[1],
      c = i[2],
      d = i[3],
      u = i[4],
      h = i[5],
      p = i[6],
      m = i[7],
      g = i[8],
      f = i[9],
      $ = i[10],
      y = i[11],
      b = i[12],
      x = i[13],
      v = i[14],
      w = i[15],
      S = i[16],
      k = i[17],
      M = i[18],
      C = i[19]
    let T = 0,
      P = 0,
      I = 0,
      R = 0,
      A = 0,
      E = 0,
      L = 0,
      F = 0,
      z = 0,
      B = 0,
      D = 0,
      O = 0
    for (; T < a; T += 4)
      (P = r[T] / 255),
        (I = r[T + 1] / 255),
        (R = r[T + 2] / 255),
        (A = r[T + 3] / 255),
        (E = P * s + I * l + R * c + A * d + u),
        (L = P * h + I * p + R * m + A * g + f),
        (F = P * $ + I * y + R * b + A * x + v),
        (z = P * w + I * S + R * k + A * M + C),
        (B = Math.max(0, E * z) + (1 - z)),
        (D = Math.max(0, L * z) + (1 - z)),
        (O = Math.max(0, F * z) + (1 - z)),
        (n[T] = 255 * Math.max(0, Math.min(1, B))),
        (n[T + 1] = 255 * Math.max(0, Math.min(1, D))),
        (n[T + 2] = 255 * Math.max(0, Math.min(1, O))),
        (n[T + 3] = 255 * A)
    t(null, {
      data: n,
      width: o.width,
      height: o.height,
    })
  },
  ro = (e, t) => {
    const { imageData: o, matrix: i } = e
    if (!i) return t(null, o)
    let n = i.reduce((e, t) => e + t)
    n = n <= 0 ? 1 : n
    const r = o.width,
      a = o.height,
      s = o.data
    let l = 0,
      c = 0,
      d = 0
    const u = Math.round(Math.sqrt(i.length)),
      h = Math.floor(u / 2)
    let p = 0,
      m = 0,
      g = 0,
      f = 0,
      $ = 0,
      y = 0,
      b = 0,
      x = 0,
      v = 0,
      w = 0
    const S = new Uint8ClampedArray(r * a * 4)
    for (d = 0; d < a; d++)
      for (c = 0; c < r; c++) {
        for (p = 0, m = 0, g = 0, f = 0, y = 0; y < u; y++)
          for ($ = 0; $ < u; $++)
            (b = d + y - h),
              (x = c + $ - h),
              b < 0 && (b = a - 1),
              b >= a && (b = 0),
              x < 0 && (x = r - 1),
              x >= r && (x = 0),
              (v = 4 * (b * r + x)),
              (w = i[y * u + $]),
              (p += s[v] * w),
              (m += s[v + 1] * w),
              (g += s[v + 2] * w),
              (f += s[v + 3] * w)
        ;(S[l] = p / n), (S[l + 1] = m / n), (S[l + 2] = g / n), (S[l + 3] = f / n), (l += 4)
      }
    t(null, {
      data: S,
      width: r,
      height: a,
    })
  },
  ao = (e, t) => {
    let { imageData: o, strength: i } = e
    if (!i) return t(null, o)
    const n = new Uint8ClampedArray(o.width * o.height * 4),
      r = o.width,
      a = o.height,
      s = o.data,
      l = (e, t) => ((c = e - w), (d = t - S), Math.sqrt(c * c + d * d))
    let c,
      d,
      u,
      h,
      p,
      m,
      g,
      f,
      $,
      y,
      b,
      x = 0,
      v = 0,
      w = 0.5 * r,
      S = 0.5 * a,
      k = l(0, 0)
    for (
      i > 0 ? ((u = 0), (h = 0), (p = 0)) : ((i = Math.abs(i)), (u = 1), (h = 1), (p = 1)), v = 0;
      v < a;
      v++
    )
      for (x = 0; x < r; x++)
        (M = 4 * (x + v * r)),
          (C = s),
          (T = n),
          (P = (l(x, v) * i) / k),
          (m = C[M] / 255),
          (g = C[M + 1] / 255),
          (f = C[M + 2] / 255),
          ($ = C[M + 3] / 255),
          (y = 1 - P),
          (b = y * $ + P),
          (T[M] = ((y * $ * m + P * u) / b) * 255),
          (T[M + 1] = ((y * $ * g + P * h) / b) * 255),
          (T[M + 2] = ((y * $ * f + P * p) / b) * 255),
          (T[M + 3] = 255 * b)
    var M, C, T, P
    t(null, {
      data: n,
      width: o.width,
      height: o.height,
    })
  },
  so = (e, t) => {
    const { imageData: o, level: i, monochrome: n = !1 } = e
    if (!i) return t(null, o)
    const r = new Uint8ClampedArray(o.width * o.height * 4),
      a = o.data,
      s = a.length
    let l,
      c,
      d,
      u = 0
    const h = () => 255 * (2 * Math.random() - 1) * i,
      p = n
        ? () => {
            const e = h()
            return [e, e, e]
          }
        : () => [h(), h(), h()]
    for (; u < s; u += 4)
      ([l, c, d] = p()),
        (r[u] = a[u] + l),
        (r[u + 1] = a[u + 1] + c),
        (r[u + 2] = a[u + 2] + d),
        (r[u + 3] = a[u + 3])
    t(null, {
      data: r,
      width: o.width,
      height: o.height,
    })
  },
  lo = (e, t) => {
    const { imageData: o, level: i } = e
    if (!i) return t(null, o)
    const n = new Uint8ClampedArray(o.width * o.height * 4),
      r = o.data,
      a = r.length
    let s,
      l,
      c,
      d = 0
    for (; d < a; d += 4)
      (s = r[d] / 255),
        (l = r[d + 1] / 255),
        (c = r[d + 2] / 255),
        (n[d] = 255 * Math.pow(s, i)),
        (n[d + 1] = 255 * Math.pow(l, i)),
        (n[d + 2] = 255 * Math.pow(c, i)),
        (n[d + 3] = r[d + 3])
    t(null, {
      data: n,
      width: o.width,
      height: o.height,
    })
  },
  co = async (e, t = {}) => {
    const { colorMatrix: o, convolutionMatrix: i, gamma: n, noise: r, vignette: a } = t,
      s = []
    if (
      (i &&
        s.push([
          ro,
          {
            matrix: i.clarity,
          },
        ]),
      n > 0 &&
        s.push([
          lo,
          {
            level: 1 / n,
          },
        ]),
      o &&
        !((e) => {
          const t = e.length
          let o
          const i = t >= 20 ? 6 : t >= 16 ? 5 : 3
          for (let n = 0; n < t; n++) {
            if (((o = e[n]), 1 === o && n % i != 0)) return !1
            if (0 !== o && 1 !== o) return !1
          }
          return !0
        })(o) &&
        s.push([
          no,
          {
            matrix: o,
          },
        ]),
      (r > 0 || r < 0) &&
        s.push([
          so,
          {
            level: r,
          },
        ]),
      (a > 0 || a < 0) &&
        s.push([
          ao,
          {
            strength: a,
          },
        ]),
      !s.length)
    )
      return e
    const l = (e, t) =>
        `(err, imageData) => {\n            (${e[
          t
        ][0].toString()})(Object.assign({ imageData: imageData }, filterInstructions[${t}]), \n                ${
          e[t + 1] ? l(e, t + 1) : 'done'
        })\n        }`,
      c = `function (options, done) {\n        const filterInstructions = options.filterInstructions;\n        const imageData = options.imageData;\n        (${l(
        s,
        0
      )})(null, imageData)\n    }`
    return (
      (e = await I(
        c,
        [
          {
            imageData: e,
            filterInstructions: s.map((e) => e[1]),
          },
        ],
        [e.data.buffer]
      )),
      oo(e)
    )
  },
  uo = (e) => 'number' == typeof e,
  ho = (e) =>
    w(e) &&
    null !==
      e.match(
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      ),
  po = (e, t) => e.hasOwnProperty(t),
  mo = (e) => Array.isArray(e)
let go = 64,
  fo = 102,
  $o = 112,
  yo = !1
var bo = (e, t) => (
    !yo &&
      c() &&
      (/^win/i.test(navigator.platform) && (fo = 103),
      (Gt() || Ut()) && ((go = 63.5), (fo = 110), ($o = 123)),
      (yo = !0)),
    `<svg${
      t ? ` aria-label="${t}"` : ''
    } width="128" height="128" viewBox="0 0 128 128" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg"><text x="${go}" y="${fo}" alignment-baseline="text-top" dominant-baseline="text-top" text-anchor="middle" font-size="${$o}px">${e}</text></svg>`
  ),
  xo = (e) => e instanceof Blob,
  vo = (e, t) => (e / t) * 100 + '%',
  wo = (e) =>
    `rgba(${Math.round(255 * e[0])}, ${Math.round(255 * e[1])}, ${Math.round(255 * e[2])}, ${
      uo(e[3]) ? e[3] : 1
    })`,
  So = (e) => Object.values(e).join('_')
const ko = async (e, t = 0) => {
    const o = p('canvas', {
      width: 80,
      height: 80,
    }).getContext('2d')
    return (
      await ((e = 0) =>
        new Promise((t) => {
          setTimeout(t, e)
        }))(t),
      o.drawImage(e, 0, 0, 80, 80),
      !(
        ((e) =>
          !new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data.buffer).some(
            (e) => 0 !== e
          ))(o) && t <= 256
      ) || (await ko(e, t + 16))
    )
  },
  Mo = new Map()
var Co = (e) =>
    new Promise((t, o) => {
      const i = new FileReader()
      ;(i.onerror = o), (i.onload = () => t(i.result)), i.readAsDataURL(e)
    }),
  To = () => {
    let e = []
    return {
      sub: (t, o) => (
        e.push({
          event: t,
          callback: o,
        }),
        () => (e = e.filter((e) => e.event !== t || e.callback !== o))
      ),
      pub: (t, o) => {
        e.filter((e) => e.event === t).forEach((e) => e.callback(o))
      },
    }
  }
const Po = 32,
  Io = ({
    color: e = [0, 0, 0],
    fontSize: t = 16,
    fontFamily: o = 'sans-serif',
    fontVariant: i = 'normal',
    fontWeight: n = 'normal',
    fontStyle: r = 'normal',
    textAlign: a = 'left',
    lineHeight: s = 20,
  }) =>
    `font-size:${t}px;font-style:${r};font-weight:${n};font-family:${o};font-variant:${i};line-height:${s}px;text-align:${a};color:${wo(
      e
    )};`,
  Ro = (e) => {
    const { width: t, height: o } = e,
      i = !t,
      n = i ? 'normal' : 'break-word',
      r = i ? 'nowrap' : 'pre-line'
    return `max-width:none;min-width:auto;width:${i ? 'auto' : t + 'px'};height:${
      o ? o + 'px' : 'auto'
    };margin-top:0;margin-bottom:0;padding-top:${(({ fontSize: e = 16, lineHeight: t = 20 } = {}) =>
      0.5 * Math.max(0, e - t))(
      e
    )}px;word-break:${n};word-wrap:normal;white-space:${r};overflow:visible;`
  },
  Ao = new Map(),
  Eo = new Map(),
  Lo = (e = '', t) => {
    const { width: o = 0, height: i = 0 } = t
    if (o && i) return Ae(o, i)
    const {
        fontSize: n,
        fontFamily: r,
        lineHeight: a,
        fontWeight: s,
        fontStyle: l,
        fontVariant: c,
      } = t,
      d = So({
        text: e,
        fontFamily: r,
        fontWeight: s,
        fontStyle: l,
        fontVariant: c,
        fontSize: n,
        lineHeight: a,
        width: o,
      })
    let u = Eo.get(d)
    if (u) return u
    const h = At(
      p(
        'pre',
        {
          contenteditable: 'true',
          spellcheck: 'false',
          style: `pointer-events:none;visibility:hidden;position:absolute;${Io(t)};${Ro(t)}"`,
          innerHTML: e,
        },
        [p('span')]
      )
    ).getBoundingClientRect()
    return (u = Te(h)), (u.height += Math.max(0, n - a)), Eo.set(d, u), u
  },
  Fo = new Map(),
  zo = (e, t) =>
    new Promise((o, i) => {
      let n = Fo.get(e)
      void 0 === n &&
        ((n = ((e, t) => {
          const { sub: o, pub: i } = To()
          let n, r
          return (
            Promise.resolve(
              t(e, {
                resourceType: 'stylesheet',
              })
            ).then((t) => {
              if (!1 === t) return (r = 'requestPrevented'), i('error', r)
              const { headers: o, credentials: a } = t || {}
              fetch(e, {
                headers: o,
                credentials: a,
              })
                .then((e) => e.text())
                .then((e) => {
                  ;(n = e), i('load', n)
                })
                .catch((e) => {
                  ;(r = e), i('error', r)
                })
            }),
            {
              sub: (e, t) => ('load' === e && n ? t(n) : 'error' === e && r ? t(r) : void o(e, t)),
            }
          )
        })(e, t)),
        Fo.set(e, n)),
        n.sub('load', o),
        n.sub('error', i)
    }),
  Bo = async (e, t) => {
    let o
    try {
      o = await zo(e, t)
    } catch (e) {
      return []
    }
    const i = p('style', {
      innerHTML: o,
      id: T(),
    })
    document.head.append(i)
    const n = Array.from(document.styleSheets).find((e) => e.ownerNode.id === i.id)
    return i.remove(), Array.from(n.cssRules)
  },
  Do = new Map(),
  Oo = async (e, t) => {
    if (Do.has(e.href)) return Do.get(e.href)
    let o
    try {
      o = Array.from(e.cssRules)
      for (const e of ((e) => e.filter((e) => e instanceof CSSImportRule))(o)) {
        const i = e.href
        if (Do.has(i)) {
          const e = Do.get(i)
          o = [...o, ...e]
          continue
        }
        const n = await Bo(i, t)
        Do.set(i, n), (o = [...o, ...n])
      }
    } catch (i) {
      const n = e.href
      ;(o = await Bo(n, t)), Do.set(n, o)
    }
    return ((e) => e.filter((e) => e instanceof CSSFontFaceRule))(o)
  },
  Wo = (e, t) => e.style.getPropertyValue(t),
  Vo = (e, t) => {
    if (!e.style) return !1
    return Wo(e, 'font-family').replace(/^"|"$/g, '') == t
  },
  _o = async (e, t) => {
    const o = ((e, t) => {
      const o = []
      for (const i of e) Vo(i, t) && o.push(i)
      return o
    })(
      await (async (e) => {
        const t = Array.from(document.styleSheets).map((t) => Oo(t, e)),
          o = await Promise.all(t),
          i = []
        return o.forEach((e) => i.push(...e)), i
      })(t),
      e
    )
    return o.length
      ? o.map((e) => {
          const t = e.parentStyleSheet.href && new URL(e.parentStyleSheet.href),
            o = t ? t.origin + ((e) => e.pathname.split('/').slice(0, -1).join('/'))(t) + '/' : '',
            i = e.style.getPropertyValue('src').match(/url\("?(.*?)"?\)/)[1],
            n = Array.from(e.style)
              .filter((e) => 'src' != e)
              .reduce((t, o) => (t += o + ':' + Wo(e, o) + ';'), '')
          return [/^http/.test(i) ? i : o + i, n]
        })
      : []
  },
  Zo = new Map(),
  jo = new Map()
var No = async (e = '', t) => {
  if (!e.length) return
  const {
      imageWidth: o = 300,
      imageHeight: i = 150,
      paddingLeft: n = Po,
      paddingRight: r = Po,
      fontFamily: a,
      pixelRatio: s = 1,
      willRequest: l,
    } = t,
    c = (o + n + r) * s,
    d = i * s,
    u = Io(t),
    h = Ro(t),
    p = await (async (e, t) => {
      if (Zo.get(e)) return
      let o = jo.get(e)
      if (!o) {
        const n = await _o(e, t)
        if (!n.length) return void Zo.set(e, !0)
        const r = []
        for (const [e, t] of n) {
          const o = await fetch(e).then((e) => e.blob()),
            n =
              !(i = o.type) || /woff2/.test(i)
                ? 'woff2'
                : /woff/.test(i)
                ? 'woff'
                : /ttf|truetype/.test(i)
                ? 'truetype'
                : /otf|opentype/.test(i)
                ? 'opentype'
                : /svg/.test(i)
                ? 'svg'
                : 'woff2',
            a = await Co(o)
          r.push(`@font-face { src:url(${a}) format('${n}');${t};font-display:block; }`)
        }
        ;(o = r.join('')), jo.set(e, o)
      }
      var i
      return o
    })(a, l),
    m = e
      .replace(/&/g, '&amp;')
      .replace(/#/g, '%23')
      .replace(/<br>/g, '___BR___')
      .replace(/\n/g, '___BR___')
  return ((e, { safariCacheKey: t = '*' } = {}) =>
    new Promise((o, i) => {
      const n = new Image()
      ;(n.onerror = i),
        (n.onload = () => {
          if (!Lt() || !e.includes('@font-face') || Mo.has(t)) return o(n)
          ko(n).then(() => {
            Mo.set(t, !0), o(n)
          })
        }),
        (n.src = 'data:image/svg+xml,' + e)
    }))(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${c}" height="${d}" viewBox="0 0 ${c} ${d}"><foreignObject x="0" y="0" width="${c}" height="${d}"><div xmlns="http://www.w3.org/1999/xhtml" style="transform-origin:0 0;transform:scale(${s})">${
      p ? `<style>${p}</style>` : ''
    }<pre contenteditable="true" spellcheck="false" style="position:absolute;padding-right:${r}px;padding-left:${n}px;${u};${h}">${m
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/___BR___/g, '<br/>')}</pre></div></foreignObject></svg>`,
    {
      safariCacheKey: a,
    }
  )
}
const Ho = (e) => {
    const t = { ...e }
    return v(t)
  },
  Uo = (e, t = {}) => {
    const o = rt(e)
    let i, n
    const r = t.width || t.rx,
      a = t.height || t.ry
    if (r && a) return Ce(t)
    if (r || a) {
      ;(i = parseFloat(r || Number.MAX_SAFE_INTEGER)),
        (n = parseFloat(a || Number.MAX_SAFE_INTEGER))
      const e = Math.min(i, n)
      w(r) || w(a) ? ((i = e + '%'), (n = e * o + '%')) : ((i = e), (n = e))
    } else {
      const e = 10
      ;(i = e + '%'), (n = e * o + '%')
    }
    return {
      [(t.width ? 'width' : t.rx ? 'rx' : void 0) || 'width']: i,
      [(t.width ? 'height' : t.rx ? 'ry' : void 0) || 'height']: n,
    }
  },
  Xo = (e, t = {}) => {
    return {
      width: void 0,
      height: void 0,
      ...t,
      aspectRatio: 1,
      backgroundImage:
        ((o = bo(e)), 'data:image/svg+xml,' + o.replace('<', '%3C').replace('>', '%3E')),
    }
    var o
  },
  Yo = (e, t = {}) => ({
    backgroundColor: [0, 0, 0, 0],
    ...(oi(t)
      ? {}
      : {
          width: void 0,
          height: void 0,
          aspectRatio: void 0,
        }),
    ...t,
    backgroundImage: w(e) ? e : xo(e) ? URL.createObjectURL(e) : e,
  }),
  Go = (e, t) => {
    let o
    if (w(e) || xo(e)) {
      const i = { ...Uo(t), backgroundSize: 'contain' }
      o = ho(e) ? Xo(e, i) : Yo(e, i)
    } else if (e.src) {
      const i = Uo(t, e.shape || e),
        n = { ...e.shape, ...i }
      if (e.width && e.height && !po(n, 'aspectRatio')) {
        const e = Oi(i, 'width', t),
          o = Oi(i, 'height', t)
        n.aspectRatio = O(e, o)
      }
      n.backgroundSize || e.shape || (e.width && e.height) || (n.backgroundSize = 'contain'),
        (o = ho(e.src) ? Xo(e.src, n) : Yo(e.src, n))
    } else e.shape && (o = Ho(e.shape))
    return (
      po(o, 'backgroundImage') &&
        (po(o, 'backgroundColor') || (o.backgroundColor = [0, 0, 0, 0]),
        po(o, 'disableStyle') ||
          (o.disableStyle = ['cornerRadius', 'backgroundColor', 'strokeColor', 'strokeWidth'])),
      t ? Bi(o, t) : o
    )
  },
  qo = (e) => ne(e.x1, e.y1),
  Ko = (e) => ne(e.x2, e.y2),
  Jo = (e) => po(e, 'text'),
  Qo = (e) => Jo(e) && !(pi(e) || po(e, 'width')),
  ei = (e) => Jo(e) && (pi(e) || po(e, 'width')),
  ti = (e) => !Jo(e) && mi(e),
  oi = (e) => po(e, 'rx'),
  ii = (e) => po(e, 'x1') && !ni(e),
  ni = (e) => po(e, 'x3'),
  ri = (e) => po(e, 'points'),
  ai = (e) => Jo(e) && e.isEditing,
  si = (e) => !po(e, 'opacity') || e.opacity > 0,
  li = (e) => e.isSelected,
  ci = (e) => e.isEditing,
  di = (e) => e._isDraft,
  ui = (e) => po(e, 'width') && po(e, 'height'),
  hi = (e) => {
    const t = po(e, 'right'),
      o = po(e, 'bottom')
    return t || o
  },
  pi = (e) =>
    ((po(e, 'x') || po(e, 'left')) && po(e, 'right')) ||
    ((po(e, 'y') || po(e, 'top')) && po(e, 'bottom')),
  mi = (e) => ui(e) || pi(e),
  gi = (e) => ((e._isDraft = !0), e),
  fi = (e, t) =>
    !0 !== e.disableStyle && (!mo(e.disableStyle) || !t || !e.disableStyle.includes(t)),
  $i = (e) => !0 !== e.disableSelect && !ni(e),
  yi = (e) => !0 !== e.disableRemove,
  bi = (e) =>
    !e.disableFlip && !di(e) && !hi(e) && ((e) => po(e, 'backgroundImage') || po(e, 'text'))(e),
  xi = (e, t) =>
    !!Jo(e) &&
    !0 !== e.disableInput &&
    (S(e.disableInput) ? e.disableInput(null != t ? t : e.text) : t || !0),
  vi = (e, t) =>
    !0 !== e.disableTextLayout &&
    (!mo(e.disableTextLayout) || !t || !e.disableTextLayout.includes(t)),
  wi = (e) => !0 !== e.disableManipulate && !di(e) && !hi(e),
  Si = (e) => wi(e) && !0 !== e.disableMove,
  ki = (e) => (delete e.left, delete e.right, delete e.top, delete e.bottom, e),
  Mi = (e) => (delete e.rotation, e),
  Ci = (e) => (
    (e.strokeWidth = e.strokeWidth || 1), (e.strokeColor = e.strokeColor || [0, 0, 0]), e
  ),
  Ti = (e) => (
    (e.backgroundColor = e.backgroundColor
      ? e.backgroundColor
      : e.strokeWidth || e.backgroundImage
      ? void 0
      : [0, 0, 0]),
    e
  ),
  Pi = (e) => (delete e.textAlign, ki(e)),
  Ii = (e) => ((e.textAlign = e.textAlign || 'left'), e),
  Ri = (e) => (
    ((e) => {
      w(e.id) || (e.id = T()),
        po(e, 'rotation') || (e.rotation = 0),
        po(e, 'opacity') || (e.opacity = 1),
        po(e, 'disableErase') || (e.disableErase = !0)
    })(e),
    Jo(e)
      ? ((e) => {
          ;(e.fontSize = e.fontSize || '4%'),
            (e.fontFamily = e.fontFamily || 'sans-serif'),
            (e.fontWeight = e.fontWeight || 'normal'),
            (e.fontStyle = e.fontStyle || 'normal'),
            (e.fontVariant = e.fontVariant || 'normal'),
            (e.lineHeight = e.lineHeight || '120%'),
            (e.color = e.color || [0, 0, 0]),
            Qo(e) ? Pi(e) : Ii(e)
        })(e)
      : ti(e)
      ? ((e) => {
          ;(e.cornerRadius = e.cornerRadius || 0),
            (e.strokeWidth = e.strokeWidth || 0),
            (e.strokeColor = e.strokeColor || [0, 0, 0]),
            Ti(e)
        })(e)
      : ri(e)
      ? ((e) => {
          Ci(e), Mi(e), ki(e)
        })(e)
      : ii(e)
      ? ((e) => {
          Ci(e),
            (e.lineStart = e.lineStart || void 0),
            (e.lineEnd = e.lineEnd || void 0),
            Mi(e),
            ki(e)
        })(e)
      : oi(e)
      ? ((e) => {
          ;(e.strokeWidth = e.strokeWidth || 0), (e.strokeColor = e.strokeColor || [0, 0, 0]), Ti(e)
        })(e)
      : ni(e) &&
        ((e) => {
          ;(e.strokeWidth = e.strokeWidth || 0),
            (e.strokeColor = e.strokeColor || [0, 0, 0]),
            Ti(e),
            ki(e)
        })(e),
    e
  ),
  Ai = (e) =>
    Jo(e)
      ? 'text'
      : ti(e)
      ? 'rectangle'
      : ri(e)
      ? 'path'
      : ii(e)
      ? 'line'
      : oi(e)
      ? 'ellipse'
      : ni(e)
      ? 'triangle'
      : void 0,
  Ei = (e, t) => (parseFloat(e) / 100) * t,
  Li = new RegExp(/^x|left|right|^width|rx|fontSize|cornerRadius|strokeWidth/, 'i'),
  Fi = new RegExp(/^y|top|bottom|^height|ry/, 'i'),
  zi = (e, t) => {
    Object.entries(e).map(([o, i]) => {
      e[o] = ((e, t, { width: o, height: i }) => {
        if (Array.isArray(t))
          return t.map(
            (e) => (
              b(e) &&
                zi(e, {
                  width: o,
                  height: i,
                }),
              e
            )
          )
        if ('string' != typeof t) return t
        if (!t.endsWith('%')) return t
        const n = parseFloat(t) / 100
        return Li.test(e) ? ee(o * n, 6) : Fi.test(e) ? ee(i * n, 6) : t
      })(o, i, t)
    })
    const o = e.lineHeight
    w(o) && (e.lineHeight = Math.round(e.fontSize * (parseFloat(o) / 100)))
  },
  Bi = (e, t) => (zi(e, t), ji(e, t), e),
  Di = (e, t) => {
    let o
    return (
      /^x|width|rx|fontSize|strokeWidth|cornerRadius/.test(e)
        ? (o = t.width)
        : /^y|height|ry/.test(e) && (o = t.height),
      o
    )
  },
  Oi = (e, t, o) => (w(e[t]) ? Ei(e[t], Di(t, o)) : e[t]),
  Wi = (e, t, o) =>
    t.reduce((t, i) => {
      const n = Oi(e, i, o)
      return (t[i] = n), t
    }, {}),
  Vi = (e, t, o) => (
    Object.keys(t).forEach((i) =>
      ((e, t, o, i) => {
        if (!w(e[t])) return (e[t] = o), e
        const n = Di(t, i)
        return (e[t] = void 0 === n ? o : vo(o, n)), e
      })(e, i, t[i], o)
    ),
    e
  ),
  _i = (e, t) => {
    const o = e
      .filter((e) => e.x < 0 || e.y < 0 || e.x1 < 0 || e.y1 < 0)
      .reduce(
        (e, t) => {
          const [o, i, n, r] = ((e) => {
            const t = Ne(),
              o = e.strokeWidth || 0
            if (ti(e))
              (t.x = e.x - 0.5 * o),
                (t.y = e.y - 0.5 * o),
                (t.width = e.width + o),
                (t.height = e.height + o)
            else if (ii(e)) {
              const { x1: i, y1: n, x2: r, y2: a } = e,
                s = Math.abs(Math.min(i, r)),
                l = Math.abs(Math.max(i, r)),
                c = Math.abs(Math.min(n, a)),
                d = Math.abs(Math.min(n, a))
              ;(t.x = s + 0.5 * o),
                (t.y = l + 0.5 * o),
                (t.width = l - s + o),
                (t.height = d - c + o)
            } else
              oi(e) &&
                ((t.x = e.x - e.rx + 0.5 * o),
                (t.y = e.y - e.ry + 0.5 * o),
                (t.width = 2 * e.rx + o),
                (t.height = 2 * e.ry + o))
            return t && po(e, 'rotation') && lt(t, e.rotation), pt(t)
          })(t)
          return (
            (e.top = Math.min(o, e.top)),
            (e.left = Math.min(r, e.left)),
            (e.bottom = Math.max(n, e.bottom)),
            (e.right = Math.max(i, e.right)),
            e
          )
        },
        {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }
      )
    return o.right > 0 && (o.right -= t.width), o.bottom > 0 && (o.bottom -= t.height), o
  },
  Zi = (e, t, o) => {
    const i = Ho(e)
    return Bi(i, t), o(i)
  },
  ji = (e, t) => {
    if ((po(e, 'left') && (e.x = e.left), po(e, 'right') && !w(e.right))) {
      const o = t.width - e.right
      po(e, 'left')
        ? ((e.x = e.left), (e.width = Math.max(0, o - e.left)))
        : po(e, 'width') && (e.x = o - e.width)
    }
    if ((po(e, 'top') && (e.y = e.top), po(e, 'bottom') && !w(e.bottom))) {
      const o = t.height - e.bottom
      po(e, 'top')
        ? ((e.y = e.top), (e.height = Math.max(0, o - e.top)))
        : po(e, 'height') && (e.y = o - e.height)
    }
    return e
  },
  Ni = (e, t) => (
    ri(e) &&
      e.points
        .filter((e) => uo(e.x))
        .forEach((e) => {
          ;(e.x *= t), (e.y *= t)
        }),
    ni(e) &&
      uo(e.x1) &&
      ((e.x1 *= t), (e.y1 *= t), (e.x2 *= t), (e.y2 *= t), (e.x3 *= t), (e.y3 *= t)),
    ii(e) && uo(e.x1) && ((e.x1 *= t), (e.y1 *= t), (e.x2 *= t), (e.y2 *= t)),
    uo(e.x) && uo(e.y) && ((e.x *= t), (e.y *= t)),
    uo(e.width) && uo(e.height) && ((e.width *= t), (e.height *= t)),
    uo(e.rx) && uo(e.ry) && ((e.rx *= t), (e.ry *= t)),
    ((e) => uo(e.strokeWidth) && e.strokeWidth > 0)(e) && (e.strokeWidth *= t),
    Jo(e) &&
      ((e._scale = t),
      uo(e.fontSize) && (e.fontSize *= t),
      uo(e.lineHeight) && (e.lineHeight *= t),
      uo(e.width) && !uo(e.height) && (e.width *= t)),
    po(e, 'cornerRadius') && uo(e.cornerRadius) && (e.cornerRadius *= t),
    e
  )
var Hi = (e) => /canvas/i.test(e.nodeName),
  Ui = (e, t) =>
    new Promise((o, i) => {
      let n = e,
        r = !1
      const a = () => {
        r ||
          ((r = !0), S(t) && Promise.resolve().then(() => t(Ae(n.naturalWidth, n.naturalHeight))))
      }
      if (
        (n.src ||
          ((n = new Image()),
          w(e) &&
            new URL(e, location.href).origin !== location.origin &&
            (n.crossOrigin = 'anonymous'),
          (n.src = w(e) ? e : URL.createObjectURL(e))),
        n.complete)
      )
        return a(), o(n)
      S(t) && Ft(n).then(a).catch(i),
        (n.onload = () => {
          a(), o(n)
        }),
        (n.onerror = i)
    })
const Xi = new Map([]),
  Yi = (e, t = {}) =>
    new Promise((o, i) => {
      const { onMetadata: r = n, onLoad: a = o, onError: s = i, onComplete: l = n } = t
      let c = Xi.get(e)
      if (
        (c ||
          ((c = {
            loading: !1,
            complete: !1,
            error: !1,
            image: void 0,
            size: void 0,
            bus: To(),
          }),
          Xi.set(e, c)),
        c.bus.sub('meta', r),
        c.bus.sub('load', a),
        c.bus.sub('error', s),
        c.bus.sub('complete', l),
        Hi(e))
      ) {
        const t = e,
          o = t.cloneNode()
        ;(c.complete = !0), (c.image = o), (c.size = Re(t))
      }
      if (c.complete)
        return (
          c.bus.pub('meta', {
            size: c.size,
          }),
          c.error ? c.bus.pub('error', c.error) : c.bus.pub('load', c.image),
          c.bus.pub('complete'),
          void (c.bus = To())
        )
      c.loading ||
        ((c.loading = !0),
        Ui(e, (e) => {
          ;(c.size = e),
            c.bus.pub('meta', {
              size: e,
            })
        })
          .then((e) => {
            ;(c.image = e), c.bus.pub('load', e)
          })
          .catch((e) => {
            ;(c.error = e), c.bus.pub('error', e)
          })
          .finally(() => {
            ;(c.complete = !0), (c.loading = !1), c.bus.pub('complete'), (c.bus = To())
          }))
    }),
  Gi = (e, t, o, i) => e.drawImage(t, o.x, o.x, o.width, o.height, i.x, i.y, i.width, i.height)
var qi = async (e, t, o, i, n = Gi) => {
  e.save(), e.clip(), await n(e, t, o, i), e.restore()
}
const Ki = (e, t, o, i) => {
    let n = qe(0, 0, o.width, o.height)
    const r = je(e)
    if (i)
      (n = gt(Xe(i), ee)),
        (n.x *= o.width),
        (n.width *= o.width),
        (n.y *= o.height),
        (n.height *= o.height)
    else if ('contain' === t) {
      const t = ht(e, rt(n))
      ;(r.width = t.width), (r.height = t.height), (r.x += t.x), (r.y += t.y)
    } else 'cover' === t && (n = ht(qe(0, 0, n.width, n.height), rt(r)))
    return {
      srcRect: n,
      destRect: r,
    }
  },
  Ji = (e, t) => (
    t.cornerRadius > 0
      ? ((e, t, o, i, n, r) => {
          i < 2 * r && (r = i / 2),
            n < 2 * r && (r = n / 2),
            e.beginPath(),
            e.moveTo(t + r, o),
            e.arcTo(t + i, o, t + i, o + n, r),
            e.arcTo(t + i, o + n, t, o + n, r),
            e.arcTo(t, o + n, t, o, r),
            e.arcTo(t, o, t + i, o, r),
            e.closePath()
        })(e, t.x, t.y, t.width, t.height, t.cornerRadius)
      : e.rect(t.x, t.y, t.width, t.height),
    e
  ),
  Qi = (e, t) => (t.backgroundColor && e.fill(), e),
  en = (e, t) => (t.strokeWidth && e.stroke(), e)
var tn = async (e, t, o = {}) =>
    new Promise(async (i, n) => {
      const { drawImage: r } = o
      if (
        ((e.lineWidth = t.strokeWidth ? t.strokeWidth : 1),
        (e.strokeStyle = t.strokeColor ? wo(t.strokeColor) : 'none'),
        (e.fillStyle = t.backgroundColor ? wo(t.backgroundColor) : 'none'),
        (e.globalAlpha = t.opacity),
        t.backgroundImage)
      ) {
        let o
        try {
          o = Hi(t.backgroundImage) ? t.backgroundImage : await Yi(t.backgroundImage)
        } catch (e) {
          n(e)
        }
        Ji(e, t), Qi(e, t)
        const { srcRect: a, destRect: s } = Ki(t, t.backgroundSize, Re(o), t.backgroundCorners)
        await qi(e, o, a, s, r), en(e, t), i([])
      } else Ji(e, t), Qi(e, t), en(e, t), i([])
    }),
  on = async (e, t, o = {}) =>
    new Promise(async (i, n) => {
      const { drawImage: r } = o
      if (
        ((e.lineWidth = t.strokeWidth || 1),
        (e.strokeStyle = t.strokeColor ? wo(t.strokeColor) : 'none'),
        (e.fillStyle = t.backgroundColor ? wo(t.backgroundColor) : 'none'),
        (e.globalAlpha = t.opacity),
        e.ellipse(t.x, t.y, t.rx, t.ry, 0, 0, 2 * Math.PI),
        t.backgroundColor && e.fill(),
        t.backgroundImage)
      ) {
        let o
        try {
          o = await Yi(t.backgroundImage)
        } catch (e) {
          n(e)
        }
        const a = qe(t.x - t.rx, t.y - t.ry, 2 * t.rx, 2 * t.ry),
          { srcRect: s, destRect: l } = Ki(a, t.backgroundSize, Re(o))
        await qi(e, o, s, l, r), t.strokeWidth && e.stroke(), i([])
      } else t.strokeWidth && e.stroke(), i([])
    }),
  nn = async (e, t, o) => {
    const i = t.width && t.height ? Te(t) : Lo(t.text, t),
      n = {
        x: t.x,
        y: t.y,
        width: i.width,
        height: i.height,
      }
    if ((tn(e, { ...t, ...n, options: o }), !t.text.length)) return []
    const { willRequest: r } = o,
      a = await No(t.text, {
        ...t,
        ...n,
        imageWidth: n.width,
        imageHeight: n.height,
        willRequest: r,
      })
    return e.drawImage(a, t.x - Po, t.y, a.width, a.height), []
  },
  rn = async (e, t) =>
    new Promise(async (o) => {
      ;(e.lineWidth = t.strokeWidth || 1),
        (e.strokeStyle = t.strokeColor ? wo(t.strokeColor) : 'none'),
        (e.globalAlpha = t.opacity)
      let i = qo(t),
        n = Ko(t)
      e.moveTo(i.x, i.y), e.lineTo(n.x, n.y), t.strokeWidth && e.stroke(), o([])
    }),
  an = async (e, t) =>
    new Promise((o, i) => {
      ;(e.lineWidth = t.strokeWidth || 1),
        (e.strokeStyle = t.strokeColor ? wo(t.strokeColor) : 'none'),
        (e.fillStyle = t.backgroundColor ? wo(t.backgroundColor) : 'none'),
        (e.globalAlpha = t.opacity)
      const { points: n } = t
      t.pathClose && e.beginPath(), e.moveTo(n[0].x, n[0].y)
      const r = n.length
      for (let t = 1; t < r; t++) e.lineTo(n[t].x, n[t].y)
      t.pathClose && e.closePath(),
        t.strokeWidth && e.stroke(),
        t.backgroundColor && e.fill(),
        o([])
    })
const sn = async (e, t, o) => {
  const i = ((e) => {
    if (ti(e)) return ne(e.x + 0.5 * e.width, e.y + 0.5 * e.height)
    if (oi(e)) return ne(e.x, e.y)
    if (ei(e)) {
      const t = e.height || Lo(e.text, e).height
      return ne(e.x + 0.5 * e.width, e.y + 0.5 * t)
    }
    if (Qo(e)) {
      const t = Lo(e.text, e)
      return ne(e.x + 0.5 * t.width, e.y + 0.5 * t.height)
    }
    return ri(e) ? we(e.points) : ii(e) ? we([qo(e), Ko(e)]) : void 0
  })(t)
  let n
  return (
    Qt(e, t.rotation, i),
    ((e, t, o, i) => {
      ;(t || o) && (e.translate(i.x, i.y), e.scale(t ? -1 : 1, o ? -1 : 1), e.translate(-i.x, -i.y))
    })(e, t.flipX, t.flipY, i),
    ti(t) ? (n = tn) : oi(t) ? (n = on) : ii(t) ? (n = rn) : ri(t) ? (n = an) : Jo(t) && (n = nn),
    n ? [t, ...(await ln(e, await n(e, t, o), o))] : []
  )
}
var ln = async (e, t, o) => {
    let i = []
    for (const n of t) e.save(), e.beginPath(), (i = [...i, ...(await sn(e, n, o))]), e.restore()
    return i
  },
  cn = async (e, t = {}) => {
    const {
      shapes: o = [],
      contextBounds: i = e,
      transform: r = n,
      drawImage: a,
      willRequest: s,
      canvasMemoryLimit: l,
      computeShape: c = W,
      preprocessShape: d = W,
    } = t
    if (!o.length) return e
    const u = p('canvas')
    ;(u.width = i.width), (u.height = i.height)
    const h = u.getContext('2d')
    h.putImageData(e, i.x || 0, i.y || 0)
    const m = o.map(Ho).map(c).map(d).flat()
    r(h),
      await ln(h, m, {
        drawImage: a,
        canvasMemoryLimit: l,
        willRequest: s,
      })
    const f = h.getImageData(0, 0, u.width, u.height)
    return g(u), f
  },
  dn = async (e, t = {}) => {
    const { backgroundColor: o } = t
    if (!o || (o && 0 === o[3])) return e
    const i = p('canvas')
    ;(i.width = e.width), (i.height = e.height)
    const n = i.getContext('2d')
    n.putImageData(e, 0, 0),
      (n.globalCompositeOperation = 'destination-over'),
      (n.fillStyle = wo(o)),
      n.fillRect(0, 0, i.width, i.height)
    const r = n.getImageData(0, 0, i.width, i.height)
    return g(i), r
  },
  un = (e) =>
    e.length
      ? e.reduce(
          (e, t) =>
            ((e, t) => {
              const o = new Array(20)
              return (
                (o[0] = e[0] * t[0] + e[1] * t[5] + e[2] * t[10] + e[3] * t[15]),
                (o[1] = e[0] * t[1] + e[1] * t[6] + e[2] * t[11] + e[3] * t[16]),
                (o[2] = e[0] * t[2] + e[1] * t[7] + e[2] * t[12] + e[3] * t[17]),
                (o[3] = e[0] * t[3] + e[1] * t[8] + e[2] * t[13] + e[3] * t[18]),
                (o[4] = e[0] * t[4] + e[1] * t[9] + e[2] * t[14] + e[3] * t[19] + e[4]),
                (o[5] = e[5] * t[0] + e[6] * t[5] + e[7] * t[10] + e[8] * t[15]),
                (o[6] = e[5] * t[1] + e[6] * t[6] + e[7] * t[11] + e[8] * t[16]),
                (o[7] = e[5] * t[2] + e[6] * t[7] + e[7] * t[12] + e[8] * t[17]),
                (o[8] = e[5] * t[3] + e[6] * t[8] + e[7] * t[13] + e[8] * t[18]),
                (o[9] = e[5] * t[4] + e[6] * t[9] + e[7] * t[14] + e[8] * t[19] + e[9]),
                (o[10] = e[10] * t[0] + e[11] * t[5] + e[12] * t[10] + e[13] * t[15]),
                (o[11] = e[10] * t[1] + e[11] * t[6] + e[12] * t[11] + e[13] * t[16]),
                (o[12] = e[10] * t[2] + e[11] * t[7] + e[12] * t[12] + e[13] * t[17]),
                (o[13] = e[10] * t[3] + e[11] * t[8] + e[12] * t[13] + e[13] * t[18]),
                (o[14] = e[10] * t[4] + e[11] * t[9] + e[12] * t[14] + e[13] * t[19] + e[14]),
                (o[15] = e[15] * t[0] + e[16] * t[5] + e[17] * t[10] + e[18] * t[15]),
                (o[16] = e[15] * t[1] + e[16] * t[6] + e[17] * t[11] + e[18] * t[16]),
                (o[17] = e[15] * t[2] + e[16] * t[7] + e[17] * t[12] + e[18] * t[17]),
                (o[18] = e[15] * t[3] + e[16] * t[8] + e[17] * t[13] + e[18] * t[18]),
                (o[19] = e[15] * t[4] + e[16] * t[9] + e[17] * t[14] + e[18] * t[19] + e[19]),
                o
              )
            })([...e], t),
          e.shift()
        )
      : [],
  hn = (e, t) => {
    const o = e.width * e.height,
      i = t.reduce(
        (e, t) => (
          t.width > e.width && t.height > e.height && ((e.width = t.width), (e.height = t.height)),
          e
        ),
        {
          width: 0,
          height: 0,
        }
      ),
      n = i.width * i.height
    return ((e, t = 2) => Math.round(e * t) / t)(Math.max(0.5, 0.5 + (1 - n / o) / 2), 5)
  }

function pn() {}
const mn = (e) => e

function gn(e, t) {
  for (const o in t) e[o] = t[o]
  return e
}

function fn(e) {
  return e()
}

function $n() {
  return Object.create(null)
}

function yn(e) {
  e.forEach(fn)
}

function bn(e) {
  return 'function' == typeof e
}

function xn(e, t) {
  return e != e ? t == t : e !== t || (e && 'object' == typeof e) || 'function' == typeof e
}

function vn(e, ...t) {
  if (null == e) return pn
  const o = e.subscribe(...t)
  return o.unsubscribe ? () => o.unsubscribe() : o
}

function wn(e) {
  let t
  return vn(e, (e) => (t = e))(), t
}

function Sn(e, t, o) {
  e.$$.on_destroy.push(vn(t, o))
}

function kn(e, t, o, i) {
  if (e) {
    const n = Mn(e, t, o, i)
    return e[0](n)
  }
}

function Mn(e, t, o, i) {
  return e[1] && i ? gn(o.ctx.slice(), e[1](i(t))) : o.ctx
}

function Cn(e, t, o, i, n, r, a) {
  const s = (function (e, t, o, i) {
    if (e[2] && i) {
      const n = e[2](i(o))
      if (void 0 === t.dirty) return n
      if ('object' == typeof n) {
        const e = [],
          o = Math.max(t.dirty.length, n.length)
        for (let i = 0; i < o; i += 1) e[i] = t.dirty[i] | n[i]
        return e
      }
      return t.dirty | n
    }
    return t.dirty
  })(t, i, n, r)
  if (s) {
    const n = Mn(t, o, i, a)
    e.p(n, s)
  }
}

function Tn(e) {
  const t = {}
  for (const o in e) '$' !== o[0] && (t[o] = e[o])
  return t
}

function Pn(e, t) {
  const o = {}
  t = new Set(t)
  for (const i in e) t.has(i) || '$' === i[0] || (o[i] = e[i])
  return o
}

function In(e, t, o = t) {
  return e.set(o), t
}

function Rn(e) {
  return e && bn(e.destroy) ? e.destroy : pn
}
const An = 'undefined' != typeof window
let En = An ? () => window.performance.now() : () => Date.now(),
  Ln = An ? (e) => requestAnimationFrame(e) : pn
const Fn = new Set()

function zn(e) {
  Fn.forEach((t) => {
    t.c(e) || (Fn.delete(t), t.f())
  }),
    0 !== Fn.size && Ln(zn)
}

function Bn(e) {
  let t
  return (
    0 === Fn.size && Ln(zn),
    {
      promise: new Promise((o) => {
        Fn.add(
          (t = {
            c: e,
            f: o,
          })
        )
      }),
      abort() {
        Fn.delete(t)
      },
    }
  )
}

function Dn(e, t) {
  e.appendChild(t)
}

function On(e, t, o) {
  e.insertBefore(t, o || null)
}

function Wn(e) {
  e.parentNode.removeChild(e)
}

function Vn(e) {
  return document.createElement(e)
}

function _n(e) {
  return document.createElementNS('http://www.w3.org/2000/svg', e)
}

function Zn(e) {
  return document.createTextNode(e)
}

function jn() {
  return Zn(' ')
}

function Nn() {
  return Zn('')
}

function Hn(e, t, o, i) {
  return e.addEventListener(t, o, i), () => e.removeEventListener(t, o, i)
}

function Un(e) {
  return function (t) {
    return t.preventDefault(), e.call(this, t)
  }
}

function Xn(e) {
  return function (t) {
    return t.stopPropagation(), e.call(this, t)
  }
}

function Yn(e, t, o) {
  null == o ? e.removeAttribute(t) : e.getAttribute(t) !== o && e.setAttribute(t, o)
}

function Gn(e, t) {
  const o = Object.getOwnPropertyDescriptors(e.__proto__)
  for (const i in t)
    null == t[i]
      ? e.removeAttribute(i)
      : 'style' === i
      ? (e.style.cssText = t[i])
      : '__value' === i
      ? (e.value = e[i] = t[i])
      : o[i] && o[i].set
      ? (e[i] = t[i])
      : Yn(e, i, t[i])
}

function qn(e, t) {
  ;(t = '' + t), e.wholeText !== t && (e.data = t)
}

function Kn(e, t) {
  e.value = null == t ? '' : t
}

function Jn(e, t) {
  const o = document.createEvent('CustomEvent')
  return o.initCustomEvent(e, !1, !1, t), o
}
class Qn {
  constructor(e = null) {
    ;(this.a = e), (this.e = this.n = null)
  }
  m(e, t, o = null) {
    this.e || ((this.e = Vn(t.nodeName)), (this.t = t), this.h(e)), this.i(o)
  }
  h(e) {
    ;(this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes))
  }
  i(e) {
    for (let t = 0; t < this.n.length; t += 1) On(this.t, this.n[t], e)
  }
  p(e) {
    this.d(), this.h(e), this.i(this.a)
  }
  d() {
    this.n.forEach(Wn)
  }
}
const er = new Set()
let tr,
  or = 0

function ir(e, t, o, i, n, r, a, s = 0) {
  const l = 16.666 / i
  let c = '{\n'
  for (let e = 0; e <= 1; e += l) {
    const i = t + (o - t) * r(e)
    c += 100 * e + `%{${a(i, 1 - i)}}\n`
  }
  const d = c + `100% {${a(o, 1 - o)}}\n}`,
    u = `__svelte_${(function (e) {
      let t = 5381,
        o = e.length
      for (; o--; ) t = ((t << 5) - t) ^ e.charCodeAt(o)
      return t >>> 0
    })(d)}_${s}`,
    h = e.ownerDocument
  er.add(h)
  const p =
      h.__svelte_stylesheet || (h.__svelte_stylesheet = h.head.appendChild(Vn('style')).sheet),
    m = h.__svelte_rules || (h.__svelte_rules = {})
  m[u] || ((m[u] = !0), p.insertRule(`@keyframes ${u} ${d}`, p.cssRules.length))
  const g = e.style.animation || ''
  return (e.style.animation = `${g ? g + ', ' : ''}${u} ${i}ms linear ${n}ms 1 both`), (or += 1), u
}

function nr(e, t) {
  const o = (e.style.animation || '').split(', '),
    i = o.filter(t ? (e) => e.indexOf(t) < 0 : (e) => -1 === e.indexOf('__svelte')),
    n = o.length - i.length
  n &&
    ((e.style.animation = i.join(', ')),
    (or -= n),
    or ||
      Ln(() => {
        or ||
          (er.forEach((e) => {
            const t = e.__svelte_stylesheet
            let o = t.cssRules.length
            for (; o--; ) t.deleteRule(o)
            e.__svelte_rules = {}
          }),
          er.clear())
      }))
}

function rr(e) {
  tr = e
}

function ar() {
  if (!tr) throw new Error('Function called outside component initialization')
  return tr
}

function sr(e) {
  ar().$$.on_mount.push(e)
}

function lr(e) {
  ar().$$.after_update.push(e)
}

function cr(e) {
  ar().$$.on_destroy.push(e)
}

function dr() {
  const e = ar()
  return (t, o) => {
    const i = e.$$.callbacks[t]
    if (i) {
      const n = Jn(t, o)
      i.slice().forEach((t) => {
        t.call(e, n)
      })
    }
  }
}

function ur(e, t) {
  ar().$$.context.set(e, t)
}

function hr(e) {
  return ar().$$.context.get(e)
}

function pr(e, t) {
  const o = e.$$.callbacks[t.type]
  o && o.slice().forEach((e) => e(t))
}
const mr = [],
  gr = [],
  fr = [],
  $r = [],
  yr = Promise.resolve()
let br = !1

function xr() {
  br || ((br = !0), yr.then(Cr))
}

function vr() {
  return xr(), yr
}

function wr(e) {
  fr.push(e)
}

function Sr(e) {
  $r.push(e)
}
let kr = !1
const Mr = new Set()

function Cr() {
  if (!kr) {
    kr = !0
    do {
      for (let e = 0; e < mr.length; e += 1) {
        const t = mr[e]
        rr(t), Tr(t.$$)
      }
      for (rr(null), mr.length = 0; gr.length; ) gr.pop()()
      for (let e = 0; e < fr.length; e += 1) {
        const t = fr[e]
        Mr.has(t) || (Mr.add(t), t())
      }
      fr.length = 0
    } while (mr.length)
    for (; $r.length; ) $r.pop()()
    ;(br = !1), (kr = !1), Mr.clear()
  }
}

function Tr(e) {
  if (null !== e.fragment) {
    e.update(), yn(e.before_update)
    const t = e.dirty
    ;(e.dirty = [-1]), e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(wr)
  }
}
let Pr

function Ir(e, t, o) {
  e.dispatchEvent(Jn(`${t ? 'intro' : 'outro'}${o}`))
}
const Rr = new Set()
let Ar

function Er() {
  Ar = {
    r: 0,
    c: [],
    p: Ar,
  }
}

function Lr() {
  Ar.r || yn(Ar.c), (Ar = Ar.p)
}

function Fr(e, t) {
  e && e.i && (Rr.delete(e), e.i(t))
}

function zr(e, t, o, i) {
  if (e && e.o) {
    if (Rr.has(e)) return
    Rr.add(e),
      Ar.c.push(() => {
        Rr.delete(e), i && (o && e.d(1), i())
      }),
      e.o(t)
  }
}
const Br = {
  duration: 0,
}

function Dr(e, t, o, i) {
  let n = t(e, o),
    r = i ? 0 : 1,
    a = null,
    s = null,
    l = null

  function c() {
    l && nr(e, l)
  }

  function d(e, t) {
    const o = e.b - r
    return (
      (t *= Math.abs(o)),
      {
        a: r,
        b: e.b,
        d: o,
        duration: t,
        start: e.start,
        end: e.start + t,
        group: e.group,
      }
    )
  }

  function u(t) {
    const { delay: o = 0, duration: i = 300, easing: u = mn, tick: h = pn, css: p } = n || Br,
      m = {
        start: En() + o,
        b: t,
      }
    t || ((m.group = Ar), (Ar.r += 1)),
      a || s
        ? (s = m)
        : (p && (c(), (l = ir(e, r, t, i, o, u, p))),
          t && h(0, 1),
          (a = d(m, i)),
          wr(() => Ir(e, t, 'start')),
          Bn((t) => {
            if (
              (s &&
                t > s.start &&
                ((a = d(s, i)),
                (s = null),
                Ir(e, a.b, 'start'),
                p && (c(), (l = ir(e, r, a.b, a.duration, 0, u, n.css)))),
              a)
            )
              if (t >= a.end)
                h((r = a.b), 1 - r),
                  Ir(e, a.b, 'end'),
                  s || (a.b ? c() : --a.group.r || yn(a.group.c)),
                  (a = null)
              else if (t >= a.start) {
                const e = t - a.start
                ;(r = a.a + a.d * u(e / a.duration)), h(r, 1 - r)
              }
            return !(!a && !s)
          }))
  }
  return {
    run(e) {
      bn(n)
        ? (Pr ||
            ((Pr = Promise.resolve()),
            Pr.then(() => {
              Pr = null
            })),
          Pr).then(() => {
            ;(n = n()), u(e)
          })
        : u(e)
    },
    end() {
      c(), (a = s = null)
    },
  }
}
const Or =
  'undefined' != typeof window ? window : 'undefined' != typeof globalThis ? globalThis : global

function Wr(e, t) {
  e.d(1), t.delete(e.key)
}

function Vr(e, t) {
  zr(e, 1, 1, () => {
    t.delete(e.key)
  })
}

function _r(e, t, o, i, n, r, a, s, l, c, d, u) {
  let h = e.length,
    p = r.length,
    m = h
  const g = {}
  for (; m--; ) g[e[m].key] = m
  const f = [],
    $ = new Map(),
    y = new Map()
  for (m = p; m--; ) {
    const e = u(n, r, m),
      s = o(e)
    let l = a.get(s)
    l ? i && l.p(e, t) : ((l = c(s, e)), l.c()),
      $.set(s, (f[m] = l)),
      s in g && y.set(s, Math.abs(m - g[s]))
  }
  const b = new Set(),
    x = new Set()

  function v(e) {
    Fr(e, 1), e.m(s, d), a.set(e.key, e), (d = e.first), p--
  }
  for (; h && p; ) {
    const t = f[p - 1],
      o = e[h - 1],
      i = t.key,
      n = o.key
    t === o
      ? ((d = t.first), h--, p--)
      : $.has(n)
      ? !a.has(i) || b.has(i)
        ? v(t)
        : x.has(n)
        ? h--
        : y.get(i) > y.get(n)
        ? (x.add(i), v(t))
        : (b.add(n), h--)
      : (l(o, a), h--)
  }
  for (; h--; ) {
    const t = e[h]
    $.has(t.key) || l(t, a)
  }
  for (; p; ) v(f[p - 1])
  return f
}

function Zr(e, t) {
  const o = {},
    i = {},
    n = {
      $$scope: 1,
    }
  let r = e.length
  for (; r--; ) {
    const a = e[r],
      s = t[r]
    if (s) {
      for (const e in a) e in s || (i[e] = 1)
      for (const e in s) n[e] || ((o[e] = s[e]), (n[e] = 1))
      e[r] = s
    } else for (const e in a) n[e] = 1
  }
  for (const e in i) e in o || (o[e] = void 0)
  return o
}

function jr(e) {
  return 'object' == typeof e && null !== e ? e : {}
}

function Nr(e, t, o) {
  const i = e.$$.props[t]
  void 0 !== i && ((e.$$.bound[i] = o), o(e.$$.ctx[i]))
}

function Hr(e) {
  e && e.c()
}

function Ur(e, t, o, i) {
  const { fragment: n, on_mount: r, on_destroy: a, after_update: s } = e.$$
  n && n.m(t, o),
    i ||
      wr(() => {
        const t = r.map(fn).filter(bn)
        a ? a.push(...t) : yn(t), (e.$$.on_mount = [])
      }),
    s.forEach(wr)
}

function Xr(e, t) {
  const o = e.$$
  null !== o.fragment &&
    (yn(o.on_destroy),
    o.fragment && o.fragment.d(t),
    (o.on_destroy = o.fragment = null),
    (o.ctx = []))
}

function Yr(e, t, o, i, n, r, a = [-1]) {
  const s = tr
  rr(e)
  const l = (e.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: pn,
    not_equal: n,
    bound: $n(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(s ? s.$$.context : t.context || []),
    callbacks: $n(),
    dirty: a,
    skip_bound: !1,
  })
  let c = !1
  if (
    ((l.ctx = o
      ? o(e, t.props || {}, (t, o, ...i) => {
          const r = i.length ? i[0] : o
          return (
            l.ctx &&
              n(l.ctx[t], (l.ctx[t] = r)) &&
              (!l.skip_bound && l.bound[t] && l.bound[t](r),
              c &&
                (function (e, t) {
                  ;-1 === e.$$.dirty[0] && (mr.push(e), xr(), e.$$.dirty.fill(0)),
                    (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31)
                })(e, t)),
            o
          )
        })
      : []),
    l.update(),
    (c = !0),
    yn(l.before_update),
    (l.fragment = !!i && i(l.ctx)),
    t.target)
  ) {
    if (t.hydrate) {
      const e = (function (e) {
        return Array.from(e.childNodes)
      })(t.target)
      l.fragment && l.fragment.l(e), e.forEach(Wn)
    } else l.fragment && l.fragment.c()
    t.intro && Fr(e.$$.fragment), Ur(e, t.target, t.anchor, t.customElement), Cr()
  }
  rr(s)
}
class Gr {
  $destroy() {
    Xr(this, 1), (this.$destroy = pn)
  }
  $on(e, t) {
    const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = [])
    return (
      o.push(t),
      () => {
        const e = o.indexOf(t)
        ;-1 !== e && o.splice(e, 1)
      }
    )
  }
  $set(e) {
    var t
    this.$$set &&
      ((t = e), 0 !== Object.keys(t).length) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1))
  }
}
const qr = []

function Kr(e, t) {
  return {
    subscribe: Jr(e, t).subscribe,
  }
}

function Jr(e, t = pn) {
  let o
  const i = []

  function n(t) {
    if (xn(e, t) && ((e = t), o)) {
      const t = !qr.length
      for (let t = 0; t < i.length; t += 1) {
        const o = i[t]
        o[1](), qr.push(o, e)
      }
      if (t) {
        for (let e = 0; e < qr.length; e += 2) qr[e][0](qr[e + 1])
        qr.length = 0
      }
    }
  }
  return {
    set: n,
    update: function (t) {
      n(t(e))
    },
    subscribe: function (r, a = pn) {
      const s = [r, a]
      return (
        i.push(s),
        1 === i.length && (o = t(n) || pn),
        r(e),
        () => {
          const e = i.indexOf(s)
          ;-1 !== e && i.splice(e, 1), 0 === i.length && (o(), (o = null))
        }
      )
    },
  }
}

function Qr(e, t, o) {
  const i = !Array.isArray(e),
    n = i ? [e] : e,
    r = t.length < 2
  return Kr(o, (e) => {
    let o = !1
    const a = []
    let s = 0,
      l = pn
    const c = () => {
        if (s) return
        l()
        const o = t(i ? a[0] : a, e)
        r ? e(o) : (l = bn(o) ? o : pn)
      },
      d = n.map((e, t) =>
        vn(
          e,
          (e) => {
            ;(a[t] = e), (s &= ~(1 << t)), o && c()
          },
          () => {
            s |= 1 << t
          }
        )
      )
    return (
      (o = !0),
      c(),
      function () {
        yn(d), l()
      }
    )
  })
}
var ea = (e) => e.reduce((e, t) => Object.assign(e, t), {})
const ta = (e) => ({
    updateValue: e,
  }),
  oa = (e) => ({
    defaultValue: e,
  }),
  ia = (e) => ({
    store: (t, o) => Qr(...e(o)),
  }),
  na = (e) => ({
    store: (t, o) => {
      const [i, n, r = () => !1] = e(o)
      let a,
        s = !0
      return Qr(i, (e, t) => {
        n(e, (e) => {
          ;(!s && r(a, e)) || ((a = e), (s = !1), t(e))
        })
      })
    },
  }),
  ra = (e) => ({
    store: (t, o) => {
      const [i, n = {}, r] = e(o)
      let a = []
      const s = {},
        l = (e) => i(e, s),
        c = (e) => {
          ;(a.length || e.length) && ((a = e), d())
        },
        d = () => {
          const e = a.map(l)
          r && e.sort(r), (a = [...e]), h(e)
        }
      Object.entries(n).map(([e, t]) =>
        t.subscribe((t) => {
          ;(s[e] = t), t && d()
        })
      )
      const { subscribe: u, set: h } = Jr(t || [])
      return {
        set: c,
        update: (e) => c(e(a)),
        subscribe: u,
      }
    },
  })
var aa = (e) => {
    const t = {},
      o = {}
    return (
      e.forEach(([e, ...i]) => {
        const r = ea(i),
          a = (t[e] = ((e, t, o) => {
            const { store: i = (e) => Jr(e), defaultValue: r = n, updateValue: a } = o,
              s = i(r(), t, e),
              { subscribe: l, update: c = n } = s
            let d
            const u = (e) => {
                let t = !0
                d && d(),
                  (d = l((o) => {
                    if (t) return (t = !1)
                    e(o), d(), (d = void 0)
                  }))
              },
              h = a ? a(e) : W
            return (s.set = (e) => c((t) => h(e, t, u))), (s.defaultValue = r), s
          })(o, t, r)),
          s = {
            get: () => wn(a),
            set: a.set,
          }
        Object.defineProperty(o, e, s)
      }),
      {
        stores: t,
        accessors: o,
      }
    )
  },
  sa = [
    ['src'],
    ['imageReader'],
    ['imageWriter'],
    ['imageScrambler'],
    ['images', oa(() => [])],
    ['shapePreprocessor'],
    ['willRequestResource'],
    ['willRequest'],
  ],
  la = (e) => e.charAt(0).toUpperCase() + e.slice(1),
  ca = (e, t) => {
    Object.keys(t).forEach((o) => {
      const i = S(t[o])
        ? {
            value: t[o],
            writable: !1,
          }
        : t[o]
      Object.defineProperty(e, o, i)
    })
  }
const da = (e, t) => {
  let o, i, n, r, a, s, l, c, d, u
  const h = t.length
  for (o = 0; o < h; o++)
    if (
      ((i = t[o]),
      (n = t[o + 1 > h - 1 ? 0 : o + 1]),
      (r = i.x - e.x),
      (a = i.y - e.y),
      (s = n.x - e.x),
      (l = n.y - e.y),
      (c = r - s),
      (d = a - l),
      (u = c * a - d * r),
      u < -1e-5)
    )
      return !1
  return !0
}
var ua = (e, t) => {
    const o = wt(t),
      i = ie()
    mt(e).forEach((e) => {
      ge(e, i),
        da(e, t) ||
          o.forEach((t) => {
            const o = Math.atan2(t.start.y - t.end.y, t.start.x - t.end.x),
              n = 1e4 * Math.sin(Math.PI - o),
              r = 1e4 * Math.cos(Math.PI - o),
              a = ne(e.x + n, e.y + r),
              s = Ve(We(t), 1e4),
              l = bt(Oe(e, a), s)
            l && ge(i, fe(se(l), e))
          })
    })
    const n = je(e)
    ge(n, i)
    return !!mt(n).every((e) => da(e, t)) && (st(e, n), !0)
  },
  ha = (e, t) => {
    const o = mt(e),
      i = St(t, 5),
      n = Ke(e),
      r = []
    o.forEach((e) => {
      const t = ((e, t) => {
        if (0 === t) return e
        const o = ne(e.start.x - e.end.x, e.start.y - e.end.y),
          i = ue(o),
          n = $e(i, t)
        return (e.end.x += n.x), (e.end.y += n.y), e
      })(Oe(se(n), se(e)), 1e6)
      let o = !1
      i.map(We).forEach((e) => {
        const i = bt(t, e)
        i && !o && (r.push(i), (o = !0))
      })
    })
    const a = xe(r[0], r[2]) < xe(r[1], r[3]) ? [r[0], r[2]] : [r[1], r[3]],
      s = Xe(a)
    return s.width < e.width && (st(e, s), !0)
  },
  pa = (
    e,
    t,
    o = {
      x: 0,
      y: 0,
    }
  ) => {
    const i = He(e),
      n = Ke(i),
      r = ft(i, o, n).map((e) => ce(e, t, n)),
      a = Xe(r)
    return r.map((e) => fe(e, a))
  },
  ma = (e, t = 0, o = rt(e)) => {
    let i, n
    if (0 !== t) {
      const r = Math.atan2(1, o),
        a = Math.sign(t) * t,
        s = a % Math.PI,
        l = a % _
      let c
      c = s > Z && s < _ + Z ? (l > Z ? a : _ - l) : l > Z ? _ - l : a
      const d = Math.min(Math.abs(e.height / Math.sin(r + c)), Math.abs(e.width / Math.cos(r - c)))
      ;(i = Math.cos(r) * d), (n = i / o)
    } else (i = e.width), (n = i / o), n > e.height && ((n = e.height), (i = n * o))
    return Ae(i, n)
  },
  ga = (e, t, o, i, n, r, a, s) => {
    const l = Ce(a),
      c = Ce(s),
      d = ee(Math.max(t.width / c.width, t.height / c.height)),
      u = ee(Math.min(t.width / l.width, t.height / l.height)),
      h = je(t)
    if (u < 1 || d > 1) {
      const o = Ke(e),
        i = Ke(t),
        n = u < 1 ? u : d,
        r = (i.x + o.x) / 2,
        a = (i.y + o.y) / 2,
        s = h.width / n,
        l = h.height / n
      at(h, r - 0.5 * s, a - 0.5 * l, s, l)
    }
    return r
      ? (((e, t, o = 0, i = ie(), n) => {
          if ((uo(o) && 0 !== o) || i.x || i.y) {
            const n = rt(e),
              r = pa(t, o, i),
              a = ma(t, o, n)
            if (!(e.width < a.width && e.height < a.height)) {
              const t = 0.5 * e.width - 0.5 * a.width,
                o = 0.5 * e.height - 0.5 * a.height
              e.width > a.width && ((e.width = a.width), (e.x += t)),
                e.height > a.height && ((e.height = a.height), (e.y += o))
            }
            ua(e, r), ha(e, r) && ua(e, r)
          } else {
            const o = rt(e)
            ;(e.width = Math.min(e.width, t.width)),
              (e.height = Math.min(e.height, t.height)),
              (e.x = Math.max(e.x, 0)),
              e.x + e.width > t.width && (e.x -= e.x + e.width - t.width),
              (e.y = Math.max(e.y, 0)),
              e.y + e.height > t.height && (e.y -= e.y + e.height - t.height)
            const i = Ke(e),
              r = ht(e, o)
            ;(r.width = Math.max(n.width, r.width)),
              (r.height = Math.max(n.height, r.height)),
              (r.x = i.x - 0.5 * r.width),
              (r.y = i.y - 0.5 * r.height),
              st(e, r)
          }
        })(h, o, i, n, l),
        {
          crop: h,
        })
      : {
          crop: h,
        }
  },
  fa = (e, t, o) => {
    const i = He(e),
      n = Ke(i),
      r = lt(i, o, n),
      a = Ke($t(Xe(r))),
      s = Ke(t),
      l = ce(s, -o, a),
      c = fe(l, a),
      d = me(ge(n, c), ee)
    return qe(d.x - 0.5 * t.width, d.y - 0.5 * t.height, t.width, t.height)
  },
  $a = (e, t, o) => Math.max(t, Math.min(e, o))
const ya = [
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
    'redaction',
    'annotation',
    'decoration',
    'frame',
    'backgroundColor',
    'targetSize',
    'metadata',
  ],
  ba = (e) => (mo(e) ? e.map(ba) : b(e) ? { ...e } : e),
  xa = (e) =>
    e.map((e) => Object.entries(e).reduce((e, [t, o]) => (t.startsWith('_') || (e[t] = o), e), {}))
var va = (e, t) => {
  if (e.length !== t.length) return !1
  for (let o = 0; o < e.length; o++) if (e[o] !== t[o]) return !1
  return !0
}
const wa = (e, t, o) => {
    const i = me(Ke(e), (e) => ee(e, 8)),
      n = He(t),
      r = Ke(n),
      a = lt(n, o, r),
      s = me(Fe(Xe(a)), (e) => ee(e, 8)),
      l = Math.abs(s.x - i.x),
      c = Math.abs(s.y - i.y)
    return l < 1 && c < 1
  },
  Sa = (e, t, o, i, n) => {
    if (!n) return [-1 / 0, 1 / 0]
    const r = Math.max(o.width / i.width, o.height / i.height),
      a = Ae(i.width * r, i.height * r),
      s = ((l = a), Math.sqrt(l.width * l.width + l.height * l.height))
    var l
    if (s < Math.min(e.width, e.height)) return [-1 / 0, 1 / 0]
    const c = t ? e.height : e.width,
      d = t ? e.width : e.height,
      u = Math.acos(a.height / s),
      h = u - Math.acos(d / s),
      p = Math.asin(c / s) - u
    if (Number.isNaN(h) && Number.isNaN(p)) return [-1 / 0, 1 / 0]
    const m = Number.isNaN(h) ? p : Number.isNaN(p) ? h : Math.min(h, p)
    return [-m, m]
  },
  ka = (e, t) => {
    const { context: o, props: i } = t
    return (
      e._isFormatted || (((e = Ri(e))._isFormatted = !0), Object.assign(e, i)),
      e._isDraft ||
        !pi(e) ||
        (e._context && nt(o, e._context)) ||
        (ji(e, o), (e._context = { ...o })),
      e
    )
  }
var Ma = [
    ['file'],
    ['size'],
    ['loadState'],
    ['processState'],
    ['aspectRatio', ia(({ size: e }) => [e, (e) => (e ? rt(e) : void 0)])],
    ['perspectiveX', oa(() => 0)],
    ['perspectiveY', oa(() => 0)],
    [
      'perspective',
      ia(({ perspectiveX: e, perspectiveY: t }) => [
        [e, t],
        ([e, t]) => ({
          x: e,
          y: t,
        }),
      ]),
    ],
    [
      'rotation',
      oa(() => 0),
      ta((e) => (t, o, i) => {
        if (t === o) return t
        const {
          loadState: n,
          size: r,
          rotationRange: a,
          cropMinSize: s,
          cropMaxSize: l,
          crop: c,
          perspective: d,
          cropLimitToImage: u,
          cropOrigin: h,
        } = e
        if (!c || !n || !n.beforeComplete) return t
        const p = ((e, t, o) => {
            const i = ma(t, o, rt(e))
            return Ee(De(i, Math.round), De(Ce(e), Math.round))
          })(c, r, o),
          m = wa(c, r, o),
          g = ((e, t, o, i, n, r, a, s, l, c) => {
            const d = Ce(l),
              u = Ce(c)
            a && ((u.width = Math.min(c.width, n.width)), (u.height = Math.min(c.height, n.height)))
            let h = !1
            const p = (t, o) => {
                const l = fa(n, i, t),
                  c = He(n),
                  m = Ke(c),
                  g = ft(c, r, m),
                  f = fe(se(m), yt(g)),
                  $ = ce(Ke(l), o, m),
                  y = fe(se(m), $)
                g.forEach((e) => ce(e, o, m))
                const b = Xe(g),
                  x = yt(g),
                  v = ge(fe(fe(x, y), b), f),
                  w = qe(v.x - 0.5 * l.width, v.y - 0.5 * l.height, l.width, l.height)
                if ((s && Qe(w, s.width / w.width), a)) {
                  const e = pa(n, o, r)
                  ha(w, e)
                }
                const S = ee(Math.min(w.width / d.width, w.height / d.height), 8),
                  k = ee(Math.max(w.width / u.width, w.height / u.height), 8)
                return (S < 1 || k > 1) && ee(Math.abs(o - t)) === ee(Math.PI / 2) && !h
                  ? ((h = !0), p(e, e + Math.sign(o - t) * Math.PI))
                  : {
                      rotation: o,
                      crop: gt(w, (e) => ee(e, 8)),
                    }
              },
              m = Math.sign(t) * Math.round(Math.abs(t) / _) * _,
              g = $a(t, m + o[0], m + o[1])
            return p(e, g)
          })(o, t, a, c, r, d, u, h, s, l)
        if (p && m) {
          const e = ma(r, t, rt(g.crop))
          ;(g.crop.x += 0.5 * g.crop.width),
            (g.crop.y += 0.5 * g.crop.height),
            (g.crop.x -= 0.5 * e.width),
            (g.crop.y -= 0.5 * e.height),
            (g.crop.width = e.width),
            (g.crop.height = e.height)
        }
        return (
          i(() => {
            e.crop = gt(g.crop, (e) => ee(e, 8))
          }),
          g.rotation
        )
      }),
    ],
    ['flipX', oa(() => !1)],
    ['flipY', oa(() => !1)],
    [
      'flip',
      ia(({ flipX: e, flipY: t }) => [
        [e, t],
        ([e, t]) => ({
          x: e,
          y: t,
        }),
      ]),
    ],
    ['isRotatedSideways', na(({ rotation: e }) => [[e], ([e], t) => t(j(e)), (e, t) => e !== t])],
    [
      'crop',
      ta((e) => (t, o = t) => {
        const {
          loadState: i,
          size: n,
          cropMinSize: r,
          cropMaxSize: a,
          cropLimitToImage: s,
          cropAspectRatio: l,
          rotation: c,
          perspective: d,
        } = e
        if ((!t && !o) || !i || !i.beforeComplete) return t
        t || (t = He(ma(n, c, l || rt(n))))
        const u = ga(o, t, n, c, d, s, r, a),
          h = gt(u.crop, (e) => ee(e, 8))
        return nt(o, h) ? o : h
      }),
    ],
    [
      'cropAspectRatio',
      ta((e) => (t, o) => {
        const { loadState: i, crop: n, size: r, rotation: a, cropLimitToImage: s } = e,
          l = ((e) => {
            if (e) {
              if (/:/.test(e)) {
                const [t, o] = e.split(':')
                return t / o
              }
              return parseFloat(e)
            }
          })(t)
        if (!l) return
        if (!n || !i || !i.beforeComplete) return l
        const c = o ? Math.abs(t - o) : 1
        if (wa(n, r, a) && s && c >= 0.1) {
          const o = ((e, t) => {
            const o = e.width,
              i = e.height
            return j(t) && ((e.width = i), (e.height = o)), e
          })(Ce(r), a)
          e.crop = gt(ht(He(o), t), ee)
        } else {
          const t = {
              width: n.height * l,
              height: n.height,
            },
            o = 0.5 * (n.width - t.width),
            i = 0.5 * (n.height - t.height)
          e.crop = gt(qe(n.x + o, n.y + i, t.width, t.height), ee)
        }
        return l
      }),
    ],
    ['cropOrigin'],
    [
      'cropMinSize',
      oa(() => ({
        width: 1,
        height: 1,
      })),
    ],
    [
      'cropMaxSize',
      oa(() => ({
        width: 32768,
        height: 32768,
      })),
    ],
    [
      'cropLimitToImage',
      oa(() => !0),
      ta((e) => (t, o, i) => {
        const { crop: n } = e
        return n ? (!o && t && i(() => (e.crop = je(e.crop))), t) : t
      }),
    ],
    [
      'cropSize',
      na(({ crop: e }) => [
        [e],
        ([e], t) => {
          e && t(Ae(e.width, e.height))
        },
        (e, t) => Ee(e, t),
      ]),
    ],
    [
      'cropRectAspectRatio',
      ia(({ cropSize: e }) => [
        [e],
        ([e], t) => {
          e && t(ee(rt(e), 5))
        },
      ]),
    ],
    [
      'cropRange',
      na(
        ({
          size: e,
          rotation: t,
          cropRectAspectRatio: o,
          cropMinSize: i,
          cropMaxSize: n,
          cropLimitToImage: r,
        }) => [
          [e, t, o, i, n, r],
          ([e, t, o, i, n, r], a) => {
            if (!e) return
            a(
              ((e, t, o, i, n, r) => {
                const a = Ce(i),
                  s = Ce(n)
                return r ? [a, De(ma(e, t, o), Math.round)] : [a, s]
              })(e, t, o, i, n, r)
            )
          },
          (e, t) => va(e, t),
        ]
      ),
    ],
    [
      'rotationRange',
      na(({ size: e, isRotatedSideways: t, cropMinSize: o, cropSize: i, cropLimitToImage: n }) => [
        [e, t, o, i, n],
        ([e, t, o, i, n], r) => {
          if (!e || !i) return
          r(Sa(e, t, o, i, n))
        },
        (e, t) => va(e, t),
      ]),
    ],
    [
      'backgroundColor',
      ta(() => (e) => ((e = [0, 0, 0, 0], t = 1) => (4 === e.length ? e : [...e, t]))(e)),
    ],
    ['targetSize'],
    ['colorMatrix'],
    ['convolutionMatrix'],
    ['gamma'],
    ['noise'],
    ['vignette'],
    [
      'redaction',
      ra(({ size: e }) => [
        ka,
        {
          context: e,
        },
      ]),
    ],
    [
      'annotation',
      ra(({ size: e }) => [
        ka,
        {
          context: e,
        },
      ]),
    ],
    [
      'decoration',
      ra(({ crop: e }) => [
        ka,
        {
          context: e,
        },
      ]),
    ],
    [
      'frame',
      ta(() => (e) => {
        if (!e) return
        const t = {
          frameStyle: void 0,
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          disableStyle: ['backgroundColor', 'strokeColor', 'strokeWidth'],
        }
        return w(e) ? (t.frameStyle = e) : Object.assign(t, e), t
      }),
    ],
    ['metadata'],
    [
      'state',
      ((e) => ({
        store: e,
      }))((e, t, o) => {
        const i = ya.map((e) => t[e])
        let n = !1
        const r = Jr({}),
          { subscribe: a } = Qr([...i, r], (e, t) => {
            if (n) return
            const o = ya.reduce((t, o, i) => ((t[o] = ba(e[i])), t), {})
            o.crop && gt(o.crop, Math.round),
              (o.redaction = o.redaction && xa(o.redaction)),
              (o.annotation = o.annotation && xa(o.annotation)),
              (o.decoration = o.decoration && xa(o.decoration)),
              t(o)
          }),
          s = (e) => {
            e &&
              ((n = !0),
              (o.cropOrigin = void 0),
              ya
                .filter((t) => po(e, t))
                .forEach((t) => {
                  o[t] = ba(e[t])
                }),
              (n = !1),
              r.set({}))
          }
        return {
          set: s,
          update: (e) => s(e(null)),
          subscribe: a,
        }
      }),
    ],
  ],
  Ca = async (e, t, o = {}, i) => {
    const { ontaskstart: n, ontaskprogress: r, ontaskend: a, token: s } = i
    let l = !1
    s.cancel = () => {
      l = !0
    }
    for (const [i, s] of t.entries()) {
      if (l) return
      const [t, c] = s
      n(i, c)
      try {
        e = await t(e, { ...o }, (e) => r(i, c, e))
      } catch (e) {
        throw ((l = !0), e)
      }
      a(i, c)
    }
    return e
  }
const Ta = [
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
  Pa = [
    'flip',
    'cropOrigin',
    'isRotatedSideways',
    'perspective',
    'perspectiveX',
    'perspectiveY',
    'cropRange',
  ],
  Ia = ['images'],
  Ra = Ma.map(([e]) => e).filter((e) => !Pa.includes(e)),
  Aa = (e) => 'image' + la(e),
  Ea = (e) => po(e, 'crop')
var La = () => {
  const { stores: e, accessors: t } = aa(sa),
    { sub: o, pub: i } = To(),
    r = () => (t.images ? t.images[0] : {})
  let a = {}
  const s = {}
  Ra.forEach((e) => {
    Object.defineProperty(t, Aa(e), {
      get: () => {
        const t = r()
        if (t) return t.accessors[e]
      },
      set: (t) => {
        ;(a[Aa(e)] = t), (s[Aa(e)] = t)
        const o = r()
        o && (o.accessors[e] = t)
      },
    })
  })
  const l = () => t.images && t.images[0],
    c = e.src.subscribe((e) => {
      if (!e) return (t.images = [])
      t.imageReader && (t.images.length && (a = {}), u(e))
    }),
    d = e.imageReader.subscribe((e) => {
      e && (t.images.length || (t.src && u(t.src)))
    }),
    u = (e) => {
      Promise.resolve()
        .then(() => p(e, a))
        .catch(() => {})
    }
  let h
  const p = (e, o = {}) =>
    new Promise((r, c) => {
      let d = l()
      const u = !(
          !1 === o.cropLimitToImage ||
          !1 === o.imageCropLimitToImage ||
          !1 === s.imageCropLmitedToImage
        ),
        p = o.cropMinSize || o.imageCropMinSize || s.imageCropMinSize,
        m = u ? p : d && d.accessors.cropMinSize
      d && g(),
        (d = (({
          minSize: e = {
            width: 1,
            height: 1,
          },
        } = {}) => {
          const { stores: t, accessors: o } = aa(Ma),
            { pub: i, sub: r } = To(),
            a = (e, t) => {
              const n = () => o[e] || {},
                r = (t) => (o[e] = { ...n(), ...t, timeStamp: Date.now() }),
                a = () => n().error,
                s = (e) => {
                  a() ||
                    (r({
                      error: e,
                    }),
                    i(t + 'error', { ...n() }))
                }
              return {
                start() {
                  i(t + 'start')
                },
                onabort() {
                  r({
                    abort: !0,
                  }),
                    i(t + 'abort', { ...n() })
                },
                ontaskstart(e, o) {
                  a() ||
                    (r({
                      index: e,
                      task: o,
                      taskProgress: void 0,
                      taskLengthComputable: void 0,
                    }),
                    i(t + 'taskstart', { ...n() }))
                },
                ontaskprogress(e, o, s) {
                  a() ||
                    (r({
                      index: e,
                      task: o,
                      taskProgress: s.loaded / s.total,
                      taskLengthComputable: s.lengthComputable,
                    }),
                    i(t + 'taskprogress', { ...n() }),
                    i(t + 'progress', { ...n() }))
                },
                ontaskend(e, o) {
                  a() ||
                    (r({
                      index: e,
                      task: o,
                    }),
                    i(t + 'taskend', { ...n() }))
                },
                ontaskerror(e) {
                  s(e)
                },
                error(e) {
                  s(e)
                },
                beforeComplete(e) {
                  a() ||
                    (r({
                      beforeComplete: !0,
                    }),
                    i('before' + t, e))
                },
                complete(e) {
                  a() ||
                    (r({
                      complete: !0,
                    }),
                    i(t, e))
                },
              }
            }
          return (
            ca(o, {
              read: (t, { reader: i }, r = {}) => {
                if (!i) return
                Object.assign(o, {
                  file: void 0,
                  size: void 0,
                  loadState: void 0,
                })
                let s = {
                    cancel: n,
                  },
                  l = !1
                const c = a('loadState', 'load'),
                  d = {
                    token: s,
                    ...c,
                  },
                  u = {
                    src: t,
                    size: void 0,
                    dest: void 0,
                  }
                return (
                  Promise.resolve().then(async () => {
                    try {
                      if ((c.start(), l)) return c.onabort()
                      const t = await Ca(u, i, r, d)
                      if (l) return c.onabort()
                      const { size: n, dest: a } = t || {}
                      if (!n || !n.width || !n.height)
                        throw new Zt('Image size missing', 'IMAGE_SIZE_MISSING', t)
                      if (n.width < e.width || n.height < e.height)
                        throw new Zt('Image too small', 'IMAGE_TOO_SMALL', {
                          ...t,
                          minWidth: e.width,
                          minHeight: e.height,
                        })
                      Object.assign(o, {
                        size: n,
                        file: a,
                      }),
                        c.beforeComplete(t),
                        c.complete(t)
                    } catch (e) {
                      c.error(e)
                    } finally {
                      s = void 0
                    }
                  }),
                  () => {
                    ;(l = !0), s && s.cancel(), c.onabort()
                  }
                )
              },
              write: (e, t) => {
                if (!o.loadState.complete) return
                o.processState = void 0
                const i = a('processState', 'process'),
                  r = {
                    src: o.file,
                    imageState: o.state,
                    dest: void 0,
                  }
                if (!e) return i.start(), void i.complete(r)
                let s = {
                    cancel: n,
                  },
                  l = !1
                const c = t,
                  d = {
                    token: s,
                    ...i,
                  }
                return (
                  Promise.resolve().then(async () => {
                    try {
                      if ((i.start(), l)) return i.onabort()
                      const t = await Ca(r, e, c, d)
                      i.complete(t)
                    } catch (e) {
                      i.error(e)
                    } finally {
                      s = void 0
                    }
                  }),
                  () => {
                    ;(l = !0), s && s.cancel()
                  }
                )
              },
              on: r,
            }),
            {
              accessors: o,
              stores: t,
            }
          )
        })({
          minSize: m,
        })),
        Ta.map((e) => {
          return d.accessors.on(e, ((t = e), (e) => i(t, e)))
          var t
        })
      const f = () => {
          ;(a = {}), $.forEach((e) => e())
        },
        $ = []
      $.push(
        d.accessors.on('loaderror', (e) => {
          f(), c(e)
        })
      ),
        $.push(
          d.accessors.on('loadabort', () => {
            f(),
              c({
                name: 'AbortError',
              })
          })
        ),
        $.push(
          d.accessors.on('load', (e) => {
            ;(h = void 0), f(), r(e)
          })
        ),
        $.push(
          d.accessors.on('beforeload', () =>
            ((e, o) => {
              if (Ea(o)) return void (t.imageState = o)
              if (!o.imageCrop) {
                const t = e.accessors.size,
                  i = o.imageRotation || 0,
                  n = He(ze(Ce(t), i)),
                  r = o.imageCropAspectRatio || (o.imageCropLimitToImage ? rt(t) : rt(n)),
                  a = ht(n, r)
                o.imageCropLimitToImage ||
                  ((a.x = (t.width - a.width) / 2), (a.y = (t.height - a.height) / 2)),
                  (o.imageCrop = a)
              }
              const i = [
                'imageCropLimitToImage',
                'imageCrop',
                'imageCropAspectRatio',
                'imageRotation',
              ]
              i.filter((e) => po(o, e)).forEach((e) => {
                ;(t[e] = o[e]), delete o[e]
              })
              const n = Object.keys(o)
                .filter((e) => !i.includes(e))
                .reduce((e, t) => ((e[t] = o[t]), e), {})
              Object.assign(t, n)
            })(d, o)
          )
        ),
        (t.images = [d]),
        o.imageReader && (t.imageReader = o.imageReader),
        o.imageWriter && (t.imageWriter = o.imageWriter),
        (h = d.accessors.read(
          e,
          {
            reader: t.imageReader,
          },
          {
            willRequest: t.willRequest,
          }
        ))
    })
  let m
  const g = () => {
    const e = l()
    e && (h && h(), (e.accessors.loadState = void 0), (t.images = []))
  }
  return (
    Object.defineProperty(t, 'stores', {
      get: () => e,
    }),
    ca(t, {
      on: o,
      loadImage: p,
      abortLoadImage: () => {
        h && h(), (t.images = [])
      },
      editImage: (e, o) =>
        new Promise((i, n) => {
          p(e, o)
            .then(() => {
              const { images: e } = t,
                o = e[0],
                r = () => {
                  a(), s()
                },
                a = o.accessors.on('processerror', (e) => {
                  r(), n(e)
                }),
                s = o.accessors.on('process', (e) => {
                  r(), i(e)
                })
            })
            .catch(n)
        }),
      removeImage: g,
      processImage: (e, o) =>
        new Promise((i, n) => {
          try {
            const r = [],
              a = () => {
                ;(m = void 0), r.forEach((e) => e())
              }
            ;(async () => {
              ;((e) => w(e) || xo(e) || Mt(e))(e)
                ? await p(e, o)
                : e && (Ea(e) ? (t.imageState = e) : Object.assign(t, e))
              const s = l()
              if (!s) return n('no image')
              r.push(
                s.accessors.on('processerror', (e) => {
                  a(), n(e)
                })
              ),
                r.push(
                  s.accessors.on('processabort', () => {
                    a(),
                      n({
                        name: 'AbortError',
                      })
                  })
                ),
                r.push(
                  s.accessors.on('process', (e) => {
                    a(), i(e)
                  })
                ),
                (m = s.accessors.write(t.imageWriter, {
                  shapePreprocessor: t.shapePreprocessor || W,
                  imageScrambler: t.imageScrambler,
                  willRequest: t.willRequest,
                  willRequestResource: t.willRequestResource,
                }))
            })()
          } catch (e) {
            n(e)
          }
        }),
      abortProcessImage: () => {
        const e = l()
        e && (m && m(), (e.accessors.processState = void 0))
      },
      destroy: () => {
        c && c(), d && d()
      },
    }),
    t
  )
}
const Fa = (e, t) => {
  const { processImage: o } = La()
  return o(e, t)
}
var za = () => {
    if (!Lt()) return 1 / 0
    const e = /15_/.test(navigator.userAgent)
    return Gt() ? (e ? 14745600 : 16777216) : e ? 16777216 : 1 / 0
  },
  Ba = (e, t) =>
    Object.keys(e)
      .filter((e) => !t.includes(e))
      .reduce((t, o) => ((t[o] = e[o]), t), {})
const Da =
    ({ imageDataResizer: e, canvasMemoryLimit: t } = {}) =>
    async (o, i, n, r) => {
      ;(n.width = Math.max(n.width, 1)),
        (n.height = Math.max(n.height, 1)),
        (r.width = Math.max(r.width, 1)),
        (r.height = Math.max(r.height, 1))
      const { dest: a } = await Fa(i, {
        imageReader: cs(),
        imageWriter: ds({
          format: 'canvas',
          targetSize: { ...r, upscale: !0 },
          imageDataResizer: e,
          canvasMemoryLimit: t,
        }),
        imageCrop: n,
      })
      o.drawImage(a, r.x, r.y, r.width, r.height), g(a)
    },
  Oa =
    (e, t = (...e) => e, o) =>
    async (i, n, r) => {
      r(Dt(0, !1))
      let a = !1
      const s = await e(
        ...t(i, n, (e) => {
          ;(a = !0), r(e)
        })
      )
      return o && o(i, s), a || r(Dt(1, !1)), i
    },
  Wa = ({ srcProp: e = 'src', destProp: t = 'dest' } = {}) => [
    Oa(
      Nt,
      (t, o, i) => [t[e], i, o],
      (e, o) => (e[t] = o)
    ),
    'any-to-file',
  ],
  Va = ({ srcProp: e = 'src', destProp: t = 'size' } = {}) => [
    Oa(
      zt,
      (t) => [t[e]],
      (e, o) => (e[t] = o)
    ),
    'read-image-size',
  ],
  _a = ({ srcSize: e = 'size', srcOrientation: t = 'orientation', destSize: o = 'size' } = {}) => [
    Oa(
      qt,
      (o) => [o[e], o[t]],
      (e, t) => (e[o] = t)
    ),
    'image-size-match-orientation',
  ],
  Za = ({ srcProp: e = 'src', destProp: t = 'head' } = {}) => [
    Oa(
      (e, t) => (Kt(e) ? a(e, t) : void 0),
      (t) => [t[e], [0, 131072], onprogress],
      (e, o) => (e[t] = o)
    ),
    'read-image-head',
  ],
  ja = ({ srcProp: e = 'head', destProp: t = 'orientation' } = {}) => [
    Oa(
      o,
      (t) => [t[e], 274],
      (e, o = 1) => (e[t] = o)
    ),
    'read-exif-orientation-tag',
  ],
  Na = ({ srcProp: e = 'head' } = {}) => [
    Oa(o, (t) => [t[e], 274, 1]),
    'clear-exif-orientation-tag',
  ],
  Ha = ({
    srcImageSize: e = 'size',
    srcCanvasSize: t = 'imageData',
    srcImageState: o = 'imageState',
    destImageSize: i = 'size',
    destScalar: n = 'scalar',
  } = {}) => [
    Oa(
      (e, t) => [Math.min(t.width / e.width, t.height / e.height), Te(t)],
      (i) => [i[e], i[t], i[o]],
      (e, [t, o]) => {
        ;(e[n] = t), (e[i] = o)
      }
    ),
    'calculate-canvas-scalar',
  ],
  Ua = ({ srcProp: e = 'src', destProp: t = 'imageData', canvasMemoryLimit: o }) => [
    Oa(
      R,
      (t) => [t[e], o],
      (e, o) => (e[t] = o)
    ),
    'blob-to-image-data',
  ],
  Xa = ({ srcImageData: e = 'imageData', srcOrientation: t = 'orientation' } = {}) => [
    Oa(
      y,
      (o) => [o[e], o[t]],
      (e, t) => (e.imageData = t)
    ),
    'image-data-match-orientation',
  ],
  Ya = ({ srcImageData: e = 'imageData', srcImageState: t = 'imageState' } = {}) => [
    Oa(
      dn,
      (o) => [
        o[e],
        {
          backgroundColor: o[t].backgroundColor,
        },
      ],
      (e, t) => (e.imageData = t)
    ),
    'image-data-fill',
  ],
  Ga = ({
    srcImageData: e = 'imageData',
    srcImageState: t = 'imageState',
    destScalar: o = 'scalar',
  } = {}) => [
    Oa(
      eo,
      (i) => {
        const n = i[o]
        let { crop: r } = i[t]
        return (
          r && 1 !== n && (r = Qe(je(r), n, ie())),
          [
            i[e],
            {
              crop: r,
              rotation: i[t].rotation,
              flipX: i[t].flipX,
              flipY: i[t].flipY,
            },
          ]
        )
      },
      (e, t) => (e.imageData = t)
    ),
    'image-data-crop',
  ],
  qa = ({
    targetSize: e = {
      width: void 0,
      height: void 0,
      fit: void 0,
      upscale: void 0,
    },
    imageDataResizer: t,
    srcProp: o = 'imageData',
    srcImageState: i = 'imageState',
    destImageScaledSize: n = 'imageScaledSize',
  }) => [
    Oa(
      io,
      (n) => {
        const r = Math.min(
            e.width || Number.MAX_SAFE_INTEGER,
            (n[i].targetSize && n[i].targetSize.width) || Number.MAX_SAFE_INTEGER
          ),
          a = Math.min(
            e.height || Number.MAX_SAFE_INTEGER,
            (n[i].targetSize && n[i].targetSize.height) || Number.MAX_SAFE_INTEGER
          )
        return [
          n[o],
          {
            width: r,
            height: a,
            fit: e.fit || 'contain',
            upscale:
              ((s = n[i]),
              !!((s.targetSize && s.targetSize.width) || (s.targetSize && s.targetSize.height)) ||
                e.upscale ||
                !1),
          },
          t,
        ]
        var s
      },
      (e, t) => {
        Ee(e.imageData, t) || (e[n] = Te(t)), (e.imageData = t)
      }
    ),
    'image-data-resize',
  ],
  Ka = ({
    srcImageData: e = 'imageData',
    srcImageState: t = 'imageState',
    destImageData: o = 'imageData',
  } = {}) => [
    Oa(
      co,
      (o) => {
        const { colorMatrix: i } = o[t],
          n =
            i &&
            Object.keys(i)
              .map((e) => i[e])
              .filter(Boolean)
        return [
          o[e],
          {
            colorMatrix: n && un(n),
            convolutionMatrix: o[t].convolutionMatrix,
            gamma: o[t].gamma,
            noise: o[t].noise,
            vignette: o[t].vignette,
          },
        ]
      },
      (e, t) => (e[o] = t)
    ),
    'image-data-filter',
  ],
  Ja = ({
    srcImageData: e = 'imageData',
    srcImageState: t = 'imageState',
    destImageData: o = 'imageData',
    destScalar: i = 'scalar',
  } = {}) => [
    Oa(
      async (e, t, o, i, n) => {
        if (!t) return e
        let r
        try {
          const n = {
            dataSizeScalar: hn(e, i),
          }
          o && o[3] > 0 && (n.backgroundColor = [...o]), (r = await t(e, n))
        } catch (e) {}
        const a = p('canvas')
        ;(a.width = e.width), (a.height = e.height)
        const s = a.getContext('2d')
        s.putImageData(e, 0, 0)
        const l = new Path2D()
        i.forEach((e) => {
          const t = qe(e.x, e.y, e.width, e.height)
          ot(t, n)
          const o = lt(je(t), e.rotation),
            i = new Path2D()
          o.forEach((e, t) => {
            if (0 === t) return i.moveTo(e.x, e.y)
            i.lineTo(e.x, e.y)
          }),
            l.addPath(i)
        }),
          s.clip(l, 'nonzero'),
          (s.imageSmoothingEnabled = !1),
          s.drawImage(r, 0, 0, a.width, a.height),
          g(r)
        const c = s.getImageData(0, 0, a.width, a.height)
        return g(a), c
      },
      (o, { imageScrambler: n }) => [o[e], n, o[t].backgroundColor, o[t].redaction, o[i]],
      (e, t) => (e[o] = t)
    ),
    'image-data-redact',
  ],
  Qa = ({
    srcImageData: e = 'imageData',
    srcSize: t = 'size',
    srcImageState: o = 'imageState',
    destImageData: i = 'imageData',
    destImageScaledSize: n = 'imageScaledSize',
    destScalar: r = 'scalar',
    imageDataResizer: a,
    canvasMemoryLimit: s,
  } = {}) => [
    Oa(
      cn,
      (i, { shapePreprocessor: l, willRequestResource: c, willRequest: d }) => {
        const { annotation: u } = i[o]
        if (!u.length) return [i[e]]
        const h = i[r],
          { crop: p } = i[o],
          m = i[t]
        let g = h
        const f = i[n]
        f && (g = Math.min(f.width / p.width, f.height / p.height))
        const $ = {
          width: m.width / h,
          height: m.height / h,
        }
        return [
          i[e],
          {
            shapes: u,
            computeShape: (e) => (
              (e = Bi(e, $)), (e = Ba(e, ['left', 'right', 'top', 'bottom'])), (e = Ni(e, g))
            ),
            transform: (e) => {
              const a = i[t],
                { rotation: s = 0, flipX: l, flipY: c } = i[o],
                d = i[r],
                { crop: u = He(a) } = i[o],
                h = i[n],
                p = h ? Math.min(h.width / u.width, h.height / u.height) : 1,
                m = {
                  width: (a.width / d) * p,
                  height: (a.height / d) * p,
                },
                g = ((e, t) => {
                  const o = He(e),
                    i = Ke(o),
                    n = lt(o, t, i)
                  return $t(Xe(n))
                })(m, s),
                f = g.width,
                $ = g.height,
                y = 0.5 * m.width - 0.5 * f,
                b = 0.5 * m.height - 0.5 * $,
                x = Fe(m)
              e.translate(-y, -b),
                e.translate(-u.x * p, -u.y * p),
                e.translate(x.x, x.y),
                e.rotate(s),
                e.translate(-x.x, -x.y),
                e.scale(l ? -1 : 1, c ? -1 : 1),
                e.translate(l ? -m.width : 0, c ? -m.height : 0),
                e.rect(0, 0, m.width, m.height),
                e.clip()
            },
            drawImage: Da({
              imageDataResizer: a,
              canvasMemoryLimit: s,
            }),
            preprocessShape: (e) =>
              l(e, {
                isPreview: !1,
              }),
            canvasMemoryLimit: s,
            willRequest: d || c,
          },
        ]
      },
      (e, t) => (e[i] = t)
    ),
    'image-data-annotate',
  ],
  es = ({
    srcImageData: e = 'imageData',
    srcImageState: t = 'imageState',
    destImageData: o = 'imageData',
    destImageScaledSize: i = 'imageScaledSize',
    imageDataResizer: n,
    canvasMemoryLimit: r,
    destScalar: a = 'scalar',
  } = {}) => [
    Oa(
      cn,
      (o, { shapePreprocessor: s, willRequestResource: l, willRequest: c }) => {
        const { decoration: d } = o[t]
        if (!d.length) return [o[e]]
        let u = o[a]
        const { crop: h } = o[t],
          p = o[i]
        if (p) {
          const e = Math.min(p.width / h.width, p.height / h.height)
          u = e
        }
        return [
          o[e],
          {
            shapes: d,
            drawImage: Da({
              imageDataResizer: n,
              canvasMemoryLimit: r,
            }),
            computeShape: (e) => (
              (e = Bi(e, h)), (e = Ba(e, ['left', 'right', 'top', 'bottom'])), (e = Ni(e, u))
            ),
            preprocessShape: (e) =>
              s(e, {
                isPreview: !1,
              }),
            canvasMemoryLimit: r,
            willRequest: c || l,
          },
        ]
      },
      (e, t) => (e[o] = t)
    ),
    'image-data-decorate',
  ],
  ts = ({
    srcImageData: e = 'imageData',
    srcImageState: t = 'imageState',
    destImageData: o = 'imageData',
    destImageScaledSize: i = 'imageScaledSize',
    imageDataResizer: n,
    canvasMemoryLimit: r,
    destScalar: a = 'scalar',
  } = {}) => [
    Oa(
      cn,
      (o, { shapePreprocessor: s, willRequestResource: l, willRequest: c }) => {
        const d = o[t].frame
        if (!d) return [o[e]]
        const u = o[a]
        let { crop: h } = o[t]
        h && 1 !== u && (h = Qe(je(h), u, ie()))
        const p = { ...h },
          m = _i(Zi(d, p, s), p)
        ;(p.x = Math.abs(m.left)),
          (p.y = Math.abs(m.top)),
          (p.width += Math.abs(m.left) + Math.abs(m.right)),
          (p.height += Math.abs(m.top) + Math.abs(m.bottom))
        const g = o[i],
          f = g ? Math.min(g.width / h.width, g.height / h.height) : 1
        return (
          ot(p, f),
          (p.x = Math.floor(p.x)),
          (p.y = Math.floor(p.y)),
          (p.width = Math.floor(p.width)),
          (p.height = Math.floor(p.height)),
          [
            o[e],
            {
              shapes: [d],
              contextBounds: p,
              computeShape: (t) => Bi(t, o[e]),
              transform: (e) => {
                e.translate(p.x, p.y)
              },
              drawImage: Da({
                imageDataResizer: n,
                canvasMemoryLimit: r,
              }),
              preprocessShape: (e) =>
                s(e, {
                  isPreview: !1,
                }),
              canvasMemoryLimit: r,
              willRequest: c || l,
            },
          ]
        )
      },
      (e, t) => (e[o] = t)
    ),
    'image-data-frame',
  ],
  os = ({
    mimeType: e,
    quality: t,
    srcImageData: o = 'imageData',
    srcFile: i = 'src',
    destBlob: n = 'blob',
  } = {}) => [
    Oa(
      E,
      (n) => [n[o], e || B(n[i].name) || n[i].type, t],
      (e, t) => (e[n] = t)
    ),
    'image-data-to-blob',
  ],
  is = ({
    srcImageData: e = 'imageData',
    srcOrientation: t = 'orientation',
    destCanvas: o = 'dest',
  } = {}) => [
    Oa(
      $,
      (o) => [o[e], o[t]],
      (e, t) => (e[o] = t)
    ),
    'image-data-to-canvas',
  ],
  ns = async (e, o) => {
    if (!Kt(e) || !o) return e
    const i = new DataView(o),
      n = t(i)
    if (!n || !n.exif) return e
    const { exif: r } = n
    return ((e, t, o = [0, e.size]) =>
      t
        ? new Blob([t, e.slice(...o)], {
            type: e.type,
          })
        : e)(e, o.slice(0, r.offset + r.size + 2), [20])
  },
  rs = (e = 'blob', t = 'head', o = 'blob') => [
    Oa(
      ns,
      (o) => [o[e], o[t]],
      (e, t) => (e[o] = t)
    ),
    'blob-write-image-head',
  ],
  as = ({
    renameFile: e,
    srcBlob: t = 'blob',
    srcFile: o = 'src',
    destFile: i = 'dest',
    defaultFilename: n,
  } = {}) => [
    Oa(
      D,
      (i) => [i[t], e ? e(i[o]) : i[o].name || `${n}.${L(i[t].type)}`],
      (e, t) => (e[i] = t)
    ),
    'blob-to-file',
  ],
  ss = ({
    url: e = './',
    dataset: t = (e) => [
      ['dest', e.dest, e.dest.name],
      ['imageState', e.imageState],
    ],
    destStore: o = 'store',
  }) => [
    Oa(
      async (t, o) =>
        await ((e, t, o) =>
          new Promise((i, r) => {
            const { token: a = {}, beforeSend: s = n, onprogress: l = n } = o
            a.cancel = () => c.abort()
            const c = new XMLHttpRequest()
            ;(c.upload.onprogress = l),
              (c.onload = () => (c.status >= 200 && c.status < 300 ? i(c) : r(c))),
              (c.onerror = () => r(c)),
              (c.ontimeout = () => r(c)),
              c.open('POST', encodeURI(e)),
              s(c),
              c.send(
                t instanceof FormData
                  ? t
                  : t.reduce((e, t) => (e.append(...t.map(Jt)), e), new FormData())
              )
          }))(e, t, {
          onprogress: o,
        }),
      (e, o, i) => [t(e), i],
      (e, t) => (e[o] = t)
    ),
    'store',
  ],
  ls = (e) => [
    Oa((t) =>
      e && e.length
        ? (Object.keys(t).forEach((o) => {
            e.includes(o) || delete t[o]
          }),
          t)
        : t
    ),
    'prop-filter',
  ],
  cs = (e = {}) => {
    const {
      orientImage: t = !0,
      outputProps: o = ['src', 'dest', 'size'],
      preprocessImageFile: i,
    } = e
    return [
      Wa(),
      i && [
        Oa(
          i,
          (e, t, o) => [e.dest, t, o],
          (e, t) => (e.dest = t)
        ),
        'preprocess-image-file',
      ],
      Va({
        srcProp: 'dest',
      }),
      t &&
        Za({
          srcProp: 'dest',
        }),
      t && ja(),
      t && _a(),
      ls(o),
    ].filter(Boolean)
  },
  ds = (e = {}) => {
    const {
      canvasMemoryLimit: t = za(),
      orientImage: o = !0,
      copyImageHead: i = !0,
      mimeType: n,
      quality: r,
      renameFile: a,
      targetSize: s,
      imageDataResizer: l,
      store: c,
      format: d = 'file',
      outputProps: u = ['src', 'dest', 'imageState', 'store'],
      preprocessImageSource: h,
      preprocessImageState: p,
      postprocessImageData: m,
      postprocessImageBlob: g,
    } = e
    return [
      h && [
        Oa(
          h,
          (e, t, o) => [e.src, t, o, e.imageState],
          (e, t) => (e.src = t)
        ),
        'preprocess-image-source',
      ],
      (o || i) && Za(),
      o && ja(),
      Va(),
      p && [
        Oa(
          p,
          (e, t, o) => [e.imageState, t, o],
          (e, t) => (e.imageState = t)
        ),
        'preprocess-image-state',
      ],
      Ua({
        canvasMemoryLimit: t,
      }),
      o && _a(),
      o && Xa(),
      Ha(),
      Ja(),
      Ga(),
      qa({
        imageDataResizer: l,
        targetSize: s,
      }),
      Ka(),
      Ya(),
      Qa({
        imageDataResizer: l,
        canvasMemoryLimit: t,
      }),
      es({
        imageDataResizer: l,
        canvasMemoryLimit: t,
      }),
      ts({
        imageDataResizer: l,
        canvasMemoryLimit: t,
      }),
      m && [
        Oa(
          m,
          (e, t, o) => [e.imageData, t, o],
          (e, t) => (e.imageData = t)
        ),
        'postprocess-image-data',
      ],
      'file' === d
        ? os({
            mimeType: n,
            quality: r,
          })
        : 'canvas' === d
        ? is()
        : [(e) => ((e.dest = e.imageData), e)],
      'file' === d && o && Na(),
      'file' === d && i && rs(),
      g && [
        Oa(
          g,
          ({ blob: e, imageData: t, src: o }, i, n) => [
            {
              blob: e,
              imageData: t,
              src: o,
            },
            i,
            n,
          ],
          (e, t) => (e.blob = t)
        ),
        'postprocess-image-file',
      ],
      'file' === d &&
        as({
          defaultFilename: 'image',
          renameFile: a,
        }),
      'file' === d
        ? c &&
          (w(c)
            ? ss({
                url: c,
              })
            : S(c)
            ? [c, 'store']
            : ss(c))
        : S(c) && [c, 'store'],
      ls(u),
    ].filter(Boolean)
  }
var us = (e, t) => {
  const { imageData: o, amount: i = 1 } = e,
    n = Math.round(2 * Math.max(1, i)),
    r = Math.round(0.5 * n),
    a = o.width,
    s = o.height,
    l = new Uint8ClampedArray(a * s * 4),
    c = o.data
  let d,
    u,
    h,
    p,
    m,
    g = 0,
    f = 0,
    $ = 0
  const y = a * s * 4 - 4
  for (h = 0; h < s; h++)
    for (d = crypto.getRandomValues(new Uint8ClampedArray(s)), u = 0; u < a; u++)
      (p = d[h] / 255),
        (f = 0),
        ($ = 0),
        p < 0.5 && (f = 4 * (-r + Math.round(Math.random() * n))),
        p > 0.5 && ($ = (-r + Math.round(Math.random() * n)) * (4 * a)),
        (m = Math.min(Math.max(0, g + f + $), y)),
        (l[g] = c[m]),
        (l[g + 1] = c[m + 1]),
        (l[g + 2] = c[m + 2]),
        (l[g + 3] = c[m + 3]),
        (g += 4)
  t(null, {
    data: l,
    width: o.width,
    height: o.height,
  })
}
const hs = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625]

function ps(e) {
  return Math.sqrt(1 - --e * e)
}

function ms(e) {
  return '[object Date]' === Object.prototype.toString.call(e)
}

function gs(e, t) {
  if (e === t || e != e) return () => e
  const o = typeof e
  if (o !== typeof t || Array.isArray(e) !== Array.isArray(t))
    throw new Error('Cannot interpolate values of different type')
  if (Array.isArray(e)) {
    const o = t.map((t, o) => gs(e[o], t))
    return (e) => o.map((t) => t(e))
  }
  if ('object' === o) {
    if (!e || !t) throw new Error('Object cannot be null')
    if (ms(e) && ms(t)) {
      e = e.getTime()
      const o = (t = t.getTime()) - e
      return (t) => new Date(e + t * o)
    }
    const o = Object.keys(t),
      i = {}
    return (
      o.forEach((o) => {
        i[o] = gs(e[o], t[o])
      }),
      (e) => {
        const t = {}
        return (
          o.forEach((o) => {
            t[o] = i[o](e)
          }),
          t
        )
      }
    )
  }
  if ('number' === o) {
    const o = t - e
    return (t) => e + t * o
  }
  throw new Error(`Cannot interpolate ${o} values`)
}

function fs(e, t = {}) {
  const o = Jr(e)
  let i,
    n = e

  function r(r, a) {
    if (null == e) return o.set((e = r)), Promise.resolve()
    n = r
    let s = i,
      l = !1,
      { delay: c = 0, duration: d = 400, easing: u = mn, interpolate: h = gs } = gn(gn({}, t), a)
    if (0 === d) return s && (s.abort(), (s = null)), o.set((e = n)), Promise.resolve()
    const p = En() + c
    let m
    return (
      (i = Bn((t) => {
        if (t < p) return !0
        l || ((m = h(e, r)), 'function' == typeof d && (d = d(e, r)), (l = !0)),
          s && (s.abort(), (s = null))
        const i = t - p
        return i > d ? (o.set((e = r)), !1) : (o.set((e = m(u(i / d)))), !0)
      })),
      i.promise
    )
  }
  return {
    set: r,
    update: (t, o) => r(t(n, e), o),
    subscribe: o.subscribe,
  }
}

function $s(e, t, o, i) {
  if ('number' == typeof o) {
    const n = i - o,
      r = (o - t) / (e.dt || 1 / 60),
      a = (r + (e.opts.stiffness * n - e.opts.damping * r) * e.inv_mass) * e.dt
    return Math.abs(a) < e.opts.precision && Math.abs(n) < e.opts.precision
      ? i
      : ((e.settled = !1), o + a)
  }
  if (mo(o)) return o.map((n, r) => $s(e, t[r], o[r], i[r]))
  if ('object' == typeof o) {
    const n = {}
    for (const r in o) n[r] = $s(e, t[r], o[r], i[r])
    return n
  }
  throw new Error(`Cannot spring ${typeof o} values`)
}

function ys(e, t = {}) {
  const o = Jr(e),
    { stiffness: i = 0.15, damping: n = 0.8, precision: r = 0.01 } = t
  let a,
    s,
    l,
    c = e,
    d = e,
    u = 1,
    h = 0,
    p = !1

  function m(t, i = {}) {
    d = t
    const n = (l = {})
    if (null == e || i.hard || (g.stiffness >= 1 && g.damping >= 1))
      return (p = !0), (a = null), (c = t), o.set((e = d)), Promise.resolve()
    if (i.soft) {
      const e = !0 === i.soft ? 0.5 : +i.soft
      ;(h = 1 / (60 * e)), (u = 0)
    }
    if (!s) {
      ;(a = null), (p = !1)
      const t = {
        inv_mass: void 0,
        opts: g,
        settled: !0,
        dt: void 0,
      }
      s = Bn((i) => {
        if ((null === a && (a = i), p)) return (p = !1), (s = null), !1
        ;(u = Math.min(u + h, 1)),
          (t.inv_mass = u),
          (t.opts = g),
          (t.settled = !0),
          (t.dt = (60 * (i - a)) / 1e3)
        const n = $s(t, c, e, d)
        return (a = i), (c = e), o.set((e = n)), t.settled && (s = null), !t.settled
      })
    }
    return new Promise((e) => {
      s.promise.then(() => {
        n === l && e()
      })
    })
  }
  const g = {
    set: m,
    update: (t, o) => m(t(d, e), o),
    subscribe: o.subscribe,
    stiffness: i,
    damping: n,
    precision: r,
  }
  return g
}
var bs = Kr(!1, (e) => {
  const t = window.matchMedia('(prefers-reduced-motion:reduce)')
  e(t.matches), (t.onchange = () => e(t.matches))
})
const xs = Ne(),
  vs = (e, t, o, i, n) => {
    e.rect || (e.rect = Ne())
    const r = e.rect
    at(xs, t, o, i, n),
      nt(r, xs) ||
        (st(r, xs),
        e.dispatchEvent(
          new CustomEvent('measure', {
            detail: r,
          })
        ))
  },
  ws = Math.round,
  Ss = (e) => {
    const t = e.getBoundingClientRect()
    vs(e, ws(t.x), ws(t.y), ws(t.width), ws(t.height))
  },
  ks = (e) => vs(e, e.offsetLeft, e.offsetTop, e.offsetWidth, e.offsetHeight),
  Ms = []
let Cs,
  Ts = null

function Ps() {
  Ms.length ? (Ms.forEach((e) => e.measure(e)), (Ts = requestAnimationFrame(Ps))) : (Ts = null)
}
let Is = 0
var Rs = (e, t = {}) => {
    const { observePosition: o = !1, observeViewRect: i = !1, once: n = !1, disabled: r = !1 } = t
    if (!r)
      return !('ResizeObserver' in window) || o || i
        ? ((e.measure = i ? Ss : ks),
          Ms.push(e),
          Ts || (Ts = requestAnimationFrame(Ps)),
          e.measure(e),
          {
            destroy() {
              const t = Ms.indexOf(e)
              Ms.splice(t, 1), delete e.measure
            },
          })
        : (Cs ||
            (Cs = new ResizeObserver((e) => {
              e.forEach((e) => ks(e.target))
            })),
          Cs.observe(e),
          ks(e),
          n ? Cs.unobserve(e) : Is++,
          {
            destroy() {
              n || (Cs.unobserve(e), Is--, 0 === Is && (Cs.disconnect(), (Cs = void 0)))
            },
          })
  },
  As = (e) => {
    let t = !1
    const o = {
      pointerdown: () => {
        t = !1
      },
      keydown: () => {
        t = !0
      },
      keyup: () => {
        t = !1
      },
      focus: (e) => {
        t && (e.target.dataset.focusVisible = '')
      },
      blur: (e) => {
        delete e.target.dataset.focusVisible
      },
    }
    return (
      Object.keys(o).forEach((t) => e.addEventListener(t, o[t], !0)),
      {
        destroy() {
          Object.keys(o).forEach((t) => e.removeEventListener(t, o[t], !0))
        },
      }
    )
  }
const Es = async (e) =>
  new Promise((t) => {
    if ('file' === e.kind) return t(e.getAsFile())
    e.getAsString(t)
  })
var Ls = (e, t = {}) => {
  const o = (e) => {
      e.preventDefault()
    },
    i = async (o) => {
      o.preventDefault(), o.stopPropagation()
      try {
        const i = await ((e) =>
          new Promise((t, o) => {
            const { items: i } = e.dataTransfer
            if (!i) return t([])
            Promise.all(Array.from(i).map(Es))
              .then((e) => {
                t(e.filter((e) => (xo(e) && Ot(e)) || /^http/.test(e)))
              })
              .catch(o)
          }))(o)
        e.dispatchEvent(
          new CustomEvent('dropfiles', {
            detail: {
              event: o,
              resources: i,
            },
            ...t,
          })
        )
      } catch (e) {}
    }
  return (
    e.addEventListener('drop', i),
    e.addEventListener('dragover', o),
    {
      destroy() {
        e.removeEventListener('drop', i), e.removeEventListener('dragover', o)
      },
    }
  )
}
let Fs = null
var zs = () => {
    if (null === Fs)
      if ('WebGL2RenderingContext' in window) {
        let e
        try {
          ;(e = p('canvas')), (Fs = !!e.getContext('webgl2'))
        } catch (e) {
          Fs = !1
        }
        e && g(e), (e = void 0)
      } else Fs = !1
    return Fs
  },
  Bs = (e, t) =>
    zs()
      ? e.getContext('webgl2', t)
      : e.getContext('webgl', t) || e.getContext('experimental-webgl', t)
let Ds = null
var Os = () => {
    if (null === Ds)
      if (c()) {
        const e = p('canvas')
        ;(Ds = !Bs(e, {
          failIfMajorPerformanceCaveat: !0,
        })),
          g(e)
      } else Ds = !1
    return Ds
  },
  Ws = (e) => 0 == (e & (e - 1)),
  Vs = (e, t = {}, o = '', i = '') =>
    Object.keys(t)
      .filter((e) => !b(t[e]))
      .reduce((e, n) => e.replace(new RegExp(o + n + i), t[n]), e)
const _s = {
    head: '#version 300 es\n\nin vec4 aPosition;uniform mat4 uMatrix;',
    text: '\nin vec2 aTexCoord;out vec2 vTexCoord;',
    matrix: '\ngl_Position=uMatrix*vec4(aPosition.x,aPosition.y,0,1);',
  },
  Zs = {
    head: '#version 300 es\nprecision highp float;\n\nout vec4 fragColor;',
    mask: '\nuniform float uMaskFeather[8];uniform float uMaskBounds[4];uniform float uMaskOpacity;float mask(float x,float y,float bounds[4],float opacity){return 1.0-(1.0-(smoothstep(bounds[3],bounds[3]+1.0,x)*(1.0-smoothstep(bounds[1]-1.0,bounds[1],x))*(1.0-step(bounds[0],y))*step(bounds[2],y)))*(1.0-opacity);}',
    init: '\nfloat a=1.0;vec4 fillColor=uColor;vec4 textureColor=texture(uTexture,vTexCoord);textureColor*=(1.0-step(1.0,vTexCoord.y))*step(0.0,vTexCoord.y)*(1.0-step(1.0,vTexCoord.x))*step(0.0,vTexCoord.x);',
    colorize:
      '\nif(uTextureColor.a!=0.0&&textureColor.a>0.0){vec3 colorFlattened=textureColor.rgb/textureColor.a;if(colorFlattened.r>=.9999&&colorFlattened.g==0.0&&colorFlattened.b>=.9999){textureColor.rgb=uTextureColor.rgb*textureColor.a;}textureColor*=uTextureColor.a;}',
    maskapply: '\nfloat m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);',
    maskfeatherapply:
      '\nfloat leftFeatherOpacity=step(uMaskFeather[1],gl_FragCoord.x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],gl_FragCoord.x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],gl_FragCoord.x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],gl_FragCoord.x));a*=leftFeatherOpacity*rightFeatherOpacity;',
    edgeaa:
      '\nvec2 scaledPoint=vec2(vRectCoord.x*uSize.x,vRectCoord.y*uSize.y);a*=smoothstep(0.0,1.0,uSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);',
    cornerradius:
      '\nvec2 s=(uSize-2.0)*.5;vec2 r=(vRectCoord*uSize);vec2 p=r-(uSize*.5);float cornerRadius=uCornerRadius[0];bool left=r.x<s.x;bool top=r.y<s.x;if(!left&&top){cornerRadius=uCornerRadius[1];}if(!left&&!top){cornerRadius=uCornerRadius[3];}if(left&&!top){cornerRadius=uCornerRadius[2];}a*=1.0-clamp(length(max(abs(p)-(s-cornerRadius),0.0))-cornerRadius,0.0,1.0);',
    fragcolor:
      '\nif(m<=0.0)discard;fillColor.a*=a;fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);textureColor*=uTextureOpacity;textureColor.a*=a;textureColor.rgb*=m*a;textureColor.rgb+=(1.0-m)*(uCanvasColor.rgb*textureColor.a);fragColor=textureColor+(fillColor*(1.0-textureColor.a));',
  },
  js = (e, t, o) => {
    const i = e.createShader(o),
      n = ((e, t, o) => (
        (t = Vs(t, o === e.VERTEX_SHADER ? _s : Zs, '##').trim()),
        zs()
          ? t
          : ((t = (t = t.replace(/#version.+/gm, '').trim()).replace(/^\/\/\#/gm, '#')),
            o === e.VERTEX_SHADER &&
              (t = t.replace(/in /gm, 'attribute ').replace(/out /g, 'varying ')),
            o === e.FRAGMENT_SHADER &&
              (t = t
                .replace(/in /gm, 'varying ')
                .replace(/out.*?;/gm, '')
                .replace(/texture\(/g, 'texture2D(')
                .replace(/fragColor/g, 'gl_FragColor')),
            '' + t)
      ))(e, t, o)
    return (
      e.shaderSource(i, n),
      e.compileShader(i),
      e.getShaderParameter(i, e.COMPILE_STATUS) || console.error(e.getShaderInfoLog(i)),
      i
    )
  },
  Ns = (e, t, o, i, n) => {
    const r = js(e, t, e.VERTEX_SHADER),
      a = js(e, o, e.FRAGMENT_SHADER),
      s = e.createProgram()
    e.attachShader(s, r), e.attachShader(s, a), e.linkProgram(s)
    const l = {}
    return (
      i.forEach((t) => {
        l[t] = e.getAttribLocation(s, t)
      }),
      n.forEach((t) => {
        l[t] = e.getUniformLocation(s, t)
      }),
      {
        program: s,
        locations: l,
        destroy() {
          e.detachShader(s, r),
            e.detachShader(s, a),
            e.deleteShader(r),
            e.deleteShader(a),
            e.deleteProgram(s)
        },
      }
    )
  },
  Hs = (e) => !!zs() || (Ws(e.width) && Ws(e.height)),
  Us = (e, t, o, i) => (
    e.bindTexture(e.TEXTURE_2D, t),
    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, o),
    ((e, t, o) => {
      e.texParameteri(
        e.TEXTURE_2D,
        e.TEXTURE_MIN_FILTER,
        Hs(t) ? e.LINEAR_MIPMAP_LINEAR : e.LINEAR
      ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, o.filter),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        Hs(t) && e.generateMipmap(e.TEXTURE_2D)
    })(e, o, i),
    e.bindTexture(e.TEXTURE_2D, null),
    t
  ),
  Xs = (e, t = 1) => (e ? [e[0], e[1], e[2], uo(e[3]) ? t * e[3] : t] : [0, 0, 0, 0]),
  Ys = () => {
    const e = new Float32Array(16)
    return (e[0] = 1), (e[5] = 1), (e[10] = 1), (e[15] = 1), e
  },
  Gs = (e, t, o, i, n, r, a) => {
    const s = 1 / (t - o),
      l = 1 / (i - n),
      c = 1 / (r - a)
    ;(e[0] = -2 * s),
      (e[1] = 0),
      (e[2] = 0),
      (e[3] = 0),
      (e[4] = 0),
      (e[5] = -2 * l),
      (e[6] = 0),
      (e[7] = 0),
      (e[8] = 0),
      (e[9] = 0),
      (e[10] = 2 * c),
      (e[11] = 0),
      (e[12] = (t + o) * s),
      (e[13] = (n + i) * l),
      (e[14] = (a + r) * c),
      (e[15] = 1)
  },
  qs = (e, t, o, i) => {
    ;(e[12] = e[0] * t + e[4] * o + e[8] * i + e[12]),
      (e[13] = e[1] * t + e[5] * o + e[9] * i + e[13]),
      (e[14] = e[2] * t + e[6] * o + e[10] * i + e[14]),
      (e[15] = e[3] * t + e[7] * o + e[11] * i + e[15])
  },
  Ks = (e, t) => {
    ;(e[0] *= t),
      (e[1] *= t),
      (e[2] *= t),
      (e[3] *= t),
      (e[4] *= t),
      (e[5] *= t),
      (e[6] *= t),
      (e[7] *= t),
      (e[8] *= t),
      (e[9] *= t),
      (e[10] *= t),
      (e[11] *= t)
  },
  Js = (e, t) => {
    const o = Math.sin(t),
      i = Math.cos(t),
      n = e[4],
      r = e[5],
      a = e[6],
      s = e[7],
      l = e[8],
      c = e[9],
      d = e[10],
      u = e[11]
    ;(e[4] = n * i + l * o),
      (e[5] = r * i + c * o),
      (e[6] = a * i + d * o),
      (e[7] = s * i + u * o),
      (e[8] = l * i - n * o),
      (e[9] = c * i - r * o),
      (e[10] = d * i - a * o),
      (e[11] = u * i - s * o)
  },
  Qs = (e, t) => {
    const o = Math.sin(t),
      i = Math.cos(t),
      n = e[0],
      r = e[1],
      a = e[2],
      s = e[3],
      l = e[8],
      c = e[9],
      d = e[10],
      u = e[11]
    ;(e[0] = n * i - l * o),
      (e[1] = r * i - c * o),
      (e[2] = a * i - d * o),
      (e[3] = s * i - u * o),
      (e[8] = n * o + l * i),
      (e[9] = r * o + c * i),
      (e[10] = a * o + d * i),
      (e[11] = s * o + u * i)
  },
  el = (e, t) => {
    const o = Math.sin(t),
      i = Math.cos(t),
      n = e[0],
      r = e[1],
      a = e[2],
      s = e[3],
      l = e[4],
      c = e[5],
      d = e[6],
      u = e[7]
    ;(e[0] = n * i + l * o),
      (e[1] = r * i + c * o),
      (e[2] = a * i + d * o),
      (e[3] = s * i + u * o),
      (e[4] = l * i - n * o),
      (e[5] = c * i - r * o),
      (e[6] = d * i - a * o),
      (e[7] = u * i - s * o)
  }
var tl = (e) => (e * Math.PI) / 180
const ol = (e, t, o, i, n) => {
    const r = ue(ne(i.x - o.x, i.y - o.y)),
      a = ue(ne(n.x - i.x, n.y - i.y)),
      s = ue(ne(r.x + a.x, r.y + a.y)),
      l = ne(-s.y, s.x),
      c = ne(-r.y, r.x),
      d = Math.min(1 / ye(l, c), 5)
    ;(e[t] = i.x),
      (e[t + 1] = i.y),
      (e[t + 2] = l.x * d),
      (e[t + 3] = l.y * d),
      (e[t + 4] = -1),
      (e[t + 5] = i.x),
      (e[t + 6] = i.y),
      (e[t + 7] = l.x * d),
      (e[t + 8] = l.y * d),
      (e[t + 9] = 1)
  },
  il = (e) => {
    const t = new Float32Array(8)
    return (
      (t[0] = e[3].x),
      (t[1] = e[3].y),
      (t[2] = e[0].x),
      (t[3] = e[0].y),
      (t[4] = e[2].x),
      (t[5] = e[2].y),
      (t[6] = e[1].x),
      (t[7] = e[1].y),
      t
    )
  },
  nl = (e, t = 0, o, i) => {
    const n = mt(e),
      r = e.x + 0.5 * e.width,
      a = e.y + 0.5 * e.height
    return (o || i) && Se(n, o, i, r, a), 0 !== t && ke(n, t, r, a), n
  },
  rl = (e, t, o, i, n) => {
    const r = Math.min(20, Math.max(4, Math.round(i / 2)))
    let a = 0,
      s = 0,
      l = 0,
      c = 0,
      d = 0
    for (; d < r; d++)
      (a = d / r),
        (s = n * _ + a * _),
        (l = i * Math.cos(s)),
        (c = i * Math.sin(s)),
        e.push(ne(t + l, o + c))
  }
let al = null
var sl = () => {
  if (null !== al) return al
  let e = p('canvas')
  const t = Bs(e)
  return (al = t ? t.getParameter(t.MAX_TEXTURE_SIZE) : void 0), g(e), (e = void 0), al
}
let ll = null
const cl = new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]),
  dl = [0, 0, 0, 0, 1, 0, 0, 0, 0],
  ul = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  hl = [0, 0, 0, 0],
  pl = [0, 0, 0, 0],
  ml = (e, t, o, i, n) => {
    if (!o || !i) return cl
    const r = i.x / o.width,
      a = i.y / o.height
    let s = e / o.width / n,
      l = t / o.height / n
    ;(s -= r), (l -= a)
    return new Float32Array([-r, l, -r, -a, s, l, s, -a])
  }
var gl = (e) => {
  const t = {
      width: 0,
      height: 0,
    },
    o = {
      width: 0,
      height: 0,
    },
    i = sl() || 1024
  let n, r, a
  const s = Ys(),
    l = Ys()
  let c,
    d,
    u,
    h,
    p,
    m,
    f,
    $,
    y,
    b = 0,
    x = 0,
    v = 0
  const w = new Map([]),
    S = () => {
      C.stencilOp(C.KEEP, C.KEEP, C.KEEP), C.stencilFunc(C.ALWAYS, 1, 255), C.stencilMask(255)
    },
    k = tl(30),
    M = Math.tan(k / 2),
    C = Bs(e, {
      antialias: !1,
      alpha: !1,
      premultipliedAlpha: !0,
      stencil: !0,
    })
  if (!C) return
  C.getExtension('OES_standard_derivatives'),
    C.disable(C.DEPTH_TEST),
    C.enable(C.STENCIL_TEST),
    C.enable(C.BLEND),
    C.blendFunc(C.ONE, C.ONE_MINUS_SRC_ALPHA),
    C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, (null === ll && (ll = Xt(/Firefox/)), !ll)),
    S()
  const T = C.createTexture()
  C.bindTexture(C.TEXTURE_2D, T),
    C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, 1, 1, 0, C.RGBA, C.UNSIGNED_BYTE, new Uint8Array(hl)),
    w.set(0, T)
  const P = C.createTexture()
  w.set(2, P)
  const I = C.createFramebuffer(),
    R = C.createTexture()
  w.set(1, R)
  const A = C.createFramebuffer(),
    E = Ns(
      C,
      '\n##head\n##text\nvoid main(){vTexCoord=aTexCoord;gl_Position=uMatrix*aPosition;}',
      '\n##head\nin vec2 vTexCoord;uniform sampler2D uTexture;uniform sampler2D uTextureOverlay;uniform sampler2D uTextureBlend;uniform vec2 uTextureSize;uniform float uOpacity;uniform vec4 uFillColor;uniform vec4 uOverlayColor;uniform mat4 uColorMatrix;uniform vec4 uColorOffset;uniform float uClarityKernel[9];uniform float uClarityKernelWeight;uniform float uColorGamma;uniform float uColorVignette;uniform float uMaskClip;uniform float uMaskOpacity;uniform float uMaskBounds[4];uniform float uMaskCornerRadius[4];uniform float uMaskFeather[8];vec4 applyGamma(vec4 c,float g){c.r=pow(c.r,g);c.g=pow(c.g,g);c.b=pow(c.b,g);return c;}vec4 applyColorMatrix(vec4 c,mat4 m,vec4 o){vec4 cM=(c*m)+o;cM*=cM.a;return cM;}vec4 applyConvolutionMatrix(vec4 c,float k0,float k1,float k2,float k3,float k4,float k5,float k6,float k7,float k8,float w){vec2 pixel=vec2(1)/uTextureSize;vec4 colorSum=texture(uTexture,vTexCoord-pixel)*k0+texture(uTexture,vTexCoord+pixel*vec2(0.0,-1.0))*k1+texture(uTexture,vTexCoord+pixel*vec2(1.0,-1.0))*k2+texture(uTexture,vTexCoord+pixel*vec2(-1.0,0.0))*k3+texture(uTexture,vTexCoord)*k4+texture(uTexture,vTexCoord+pixel*vec2(1.0,0.0))*k5+texture(uTexture,vTexCoord+pixel*vec2(-1.0,1.0))*k6+texture(uTexture,vTexCoord+pixel*vec2(0.0,1.0))*k7+texture(uTexture,vTexCoord+pixel)*k8;vec4 color=vec4(clamp((colorSum/w),0.0,1.0).rgb,c.a);return color;}vec4 applyVignette(vec4 c,vec2 pos,vec2 center,float v){float d=distance(pos,center)/length(center);float f=1.0-(d*abs(v));if(v>0.0){c.rgb*=f;}else if(v<0.0){c.rgb+=(1.0-f)*(1.0-c.rgb);}return c;}vec4 blendPremultipliedAlpha(vec4 back,vec4 front){return front+(back*(1.0-front.a));}void main(){float x=gl_FragCoord.x;float y=gl_FragCoord.y;float a=1.0;float maskTop=uMaskBounds[0];float maskRight=uMaskBounds[1];float maskBottom=uMaskBounds[2];float maskLeft=uMaskBounds[3];float leftFeatherOpacity=step(uMaskFeather[1],x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],x));a*=leftFeatherOpacity*rightFeatherOpacity;float overlayColorAlpha=(smoothstep(maskLeft,maskLeft+1.0,x)*(1.0-smoothstep(maskRight-1.0,maskRight,x))*(1.0-step(maskTop,y))*step(maskBottom,y));if(uOverlayColor.a==0.0){a*=overlayColorAlpha;}vec2 offset=vec2(maskLeft,maskBottom);vec2 size=vec2(maskRight-maskLeft,maskTop-maskBottom)*.5;vec2 center=offset.xy+size.xy;int pixelX=int(step(center.x,x));int pixelY=int(step(y,center.y));float cornerRadius=0.0;if(pixelX==0&&pixelY==0)cornerRadius=uMaskCornerRadius[0];if(pixelX==1&&pixelY==0)cornerRadius=uMaskCornerRadius[1];if(pixelX==0&&pixelY==1)cornerRadius=uMaskCornerRadius[2];if(pixelX==1&&pixelY==1)cornerRadius=uMaskCornerRadius[3];float cornerOffset=sign(cornerRadius)*length(max(abs(gl_FragCoord.xy-size-offset)-size+cornerRadius,0.0))-cornerRadius;float cornerOpacity=1.0-smoothstep(0.0,1.0,cornerOffset);a*=cornerOpacity;vec2 scaledPoint=vec2(vTexCoord.x*uTextureSize.x,vTexCoord.y*uTextureSize.y);a*=smoothstep(0.0,1.0,uTextureSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uTextureSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);vec4 color=texture(uTexture,vTexCoord);if(uClarityKernelWeight!=-1.0){color=applyConvolutionMatrix(color,uClarityKernel[0],uClarityKernel[1],uClarityKernel[2],uClarityKernel[3],uClarityKernel[4],uClarityKernel[5],uClarityKernel[6],uClarityKernel[7],uClarityKernel[8],uClarityKernelWeight);}color=blendPremultipliedAlpha(color,texture(uTextureBlend,vTexCoord));color=applyGamma(color,uColorGamma);color=applyColorMatrix(color,uColorMatrix,uColorOffset);color=blendPremultipliedAlpha(uFillColor,color);color*=a;if(uColorVignette!=0.0){vec2 pos=gl_FragCoord.xy-offset;color=applyVignette(color,pos,center-offset,uColorVignette);}color=blendPremultipliedAlpha(color,texture(uTextureOverlay,vTexCoord));vec4 overlayColor=uOverlayColor*(1.0-overlayColorAlpha);overlayColor.rgb*=overlayColor.a;color=blendPremultipliedAlpha(color,overlayColor);if(uOverlayColor.a>0.0&&color.a<1.0&&uFillColor.a>0.0){color=blendPremultipliedAlpha(uFillColor,overlayColor);}color*=uOpacity;fragColor=color;}',
      ['aPosition', 'aTexCoord'],
      [
        'uMatrix',
        'uTexture',
        'uTextureBlend',
        'uTextureOverlay',
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
    ),
    L = C.createBuffer(),
    F = C.createBuffer()
  C.bindBuffer(C.ARRAY_BUFFER, F), C.bufferData(C.ARRAY_BUFFER, cl, C.STATIC_DRAW)
  const z = Ns(
      C,
      '#version 300 es\n\nin vec4 aPosition;in vec2 aNormal;in float aMiter;out vec2 vNormal;out float vMiter;out float vWidth;uniform float uWidth;uniform float uSharpness;uniform mat4 uMatrix;void main(){vMiter=aMiter;vNormal=aNormal;vWidth=(uWidth*.5)+uSharpness;gl_Position=uMatrix*vec4(aPosition.x+(aNormal.x*vWidth*aMiter),aPosition.y+(aNormal.y*vWidth*aMiter),0,1);}',
      '\n##head\n##mask\nin vec2 vNormal;in float vMiter;in float vWidth;uniform float uWidth;uniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;float m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);if(m<=0.0)discard;fillColor.a*=clamp(smoothstep(vWidth-.5,vWidth-1.0,abs(vMiter)*vWidth),0.0,1.0);fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}',
      ['aPosition', 'aNormal', 'aMiter'],
      ['uColor', 'uCanvasColor', 'uMatrix', 'uWidth', 'uSharpness', 'uMaskBounds', 'uMaskOpacity']
    ),
    B = C.createBuffer(),
    D = (e, t, o, i = !1) => {
      const { program: n, locations: r } = z
      C.useProgram(n),
        C.enableVertexAttribArray(r.aPosition),
        C.enableVertexAttribArray(r.aNormal),
        C.enableVertexAttribArray(r.aMiter)
      const s = ((e, t) => {
          let o,
            i,
            n,
            r = 0
          const a = e.length,
            s = new Float32Array(10 * (t ? a + 1 : a)),
            l = e[0],
            c = e[a - 1]
          for (r = 0; r < a; r++)
            (o = e[r - 1]),
              (i = e[r]),
              (n = e[r + 1]),
              o || (o = t ? c : ne(i.x + (i.x - n.x), i.y + (i.y - n.y))),
              n || (n = t ? l : ne(i.x + (i.x - o.x), i.y + (i.y - o.y))),
              ol(s, 10 * r, o, i, n)
          return t && ol(s, 10 * a, c, l, e[1]), s
        })(e, i),
        l = 5 * Float32Array.BYTES_PER_ELEMENT,
        d = 2 * Float32Array.BYTES_PER_ELEMENT,
        u = 4 * Float32Array.BYTES_PER_ELEMENT
      C.uniform1f(r.uWidth, t),
        C.uniform1f(r.uSharpness, a),
        C.uniform4fv(r.uColor, o),
        C.uniformMatrix4fv(r.uMatrix, !1, c),
        C.uniform4f(r.uCanvasColor, b, x, v, 1),
        C.uniform1fv(r.uMaskBounds, f),
        C.uniform1f(r.uMaskOpacity, m),
        C.bindBuffer(C.ARRAY_BUFFER, B),
        C.bufferData(C.ARRAY_BUFFER, s, C.STATIC_DRAW),
        C.vertexAttribPointer(r.aPosition, 2, C.FLOAT, !1, l, 0),
        C.vertexAttribPointer(r.aNormal, 2, C.FLOAT, !1, l, d),
        C.vertexAttribPointer(r.aMiter, 1, C.FLOAT, !1, l, u),
        C.drawArrays(C.TRIANGLE_STRIP, 0, s.length / 5),
        C.disableVertexAttribArray(r.aPosition),
        C.disableVertexAttribArray(r.aNormal),
        C.disableVertexAttribArray(r.aMiter)
    },
    W = Ns(
      C,
      '\n##head\nvoid main(){\n##matrix\n}',
      '\n##head\n##mask\nuniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;\n##maskapply\nfillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}',
      ['aPosition'],
      ['uColor', 'uCanvasColor', 'uMatrix', 'uMaskBounds', 'uMaskOpacity']
    ),
    V = C.createBuffer(),
    _ = Ns(
      C,
      '\n##head\n##text\nin vec2 aRectCoord;out vec2 vRectCoord;void main(){vTexCoord=aTexCoord;vRectCoord=aRectCoord;\n##matrix\n}',
      '\n##head\n##mask\nin vec2 vTexCoord;in vec2 vRectCoord;uniform sampler2D uTexture;uniform vec4 uTextureColor;uniform float uTextureOpacity;uniform vec4 uColor;uniform float uCornerRadius[4];uniform vec2 uSize;uniform vec2 uPosition;uniform vec4 uCanvasColor;uniform int uInverted;void main(){\n##init\n##colorize\n##edgeaa\n##cornerradius\n##maskfeatherapply\nif(uInverted==1)a=1.0-a;\n##maskapply\n##fragcolor\n}',
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
        'uInverted',
      ]
    ),
    Z = C.createBuffer(),
    j = C.createBuffer(),
    N = C.createBuffer(),
    H = Ns(
      C,
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
    U = C.createBuffer(),
    X = C.createBuffer(),
    Y = new Map(),
    G = {
      2: {
        width: 0,
        height: 0,
      },
      1: {
        width: 0,
        height: 0,
      },
    },
    q = (e, o, n, a = 1) => {
      const s = Math.min(Math.min(4096, i) / n.width, Math.min(4096, i) / n.height, a),
        d = Math.floor(s * n.width),
        u = Math.floor(s * n.height)
      Ee(n, G[e])
        ? C.bindFramebuffer(C.FRAMEBUFFER, o)
        : (C.bindTexture(C.TEXTURE_2D, w.get(e)),
          C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, d, u, 0, C.RGBA, C.UNSIGNED_BYTE, null),
          C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, C.LINEAR),
          C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_S, C.CLAMP_TO_EDGE),
          C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_T, C.CLAMP_TO_EDGE),
          C.bindFramebuffer(C.FRAMEBUFFER, o),
          C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, w.get(e), 0),
          (G[e] = n))
      const h = n.width * r,
        p = n.height * r
      var m, g
      Gs(l, 0, h, p, 0, -1, 1),
        qs(l, 0, p, 0),
        (g = 1),
        ((m = l)[0] *= g),
        (m[1] *= g),
        (m[2] *= g),
        (m[3] *= g),
        ((e, t) => {
          ;(e[4] *= t), (e[5] *= t), (e[6] *= t), (e[7] *= t)
        })(l, -1),
        (c = l),
        C.viewport(0, 0, d, u),
        C.colorMask(!0, !0, !0, !0),
        C.clearColor(0, 0, 0, 0),
        C.clear(C.COLOR_BUFFER_BIT),
        (y = [1, 0, 1, 0, 1, Math.max(t.width, n.width), 1, Math.max(t.width, n.width)])
    },
    K = (e, t = !1) => {
      const { src: o } = Y.get(e)
      o instanceof HTMLCanvasElement && (t || o.dataset.retain || g(o)),
        Y.delete(e),
        C.deleteTexture(e)
    }
  return {
    drawPath: (e, t, o, i, n) => {
      e.length < 2 ||
        D(
          e.map((e) => ({
            x: e.x * r,
            y: e.y * r,
          })),
          t * r,
          Xs(o, n),
          i
        )
    },
    drawTriangle: (e, t = 0, o = !1, i = !1, n, a) => {
      if (!n) return
      const s = e.map((e) => ({
          x: e.x * r,
          y: e.y * r,
        })),
        l = yt(s)
      ;(o || i) && Se(s, o, i, l.x, l.y), ke(s, t, l.x, l.y)
      ;((e, t) => {
        const { program: o, locations: i } = W
        C.useProgram(o),
          C.enableVertexAttribArray(i.aPosition),
          C.uniform4fv(i.uColor, t),
          C.uniformMatrix4fv(i.uMatrix, !1, c),
          C.uniform1fv(i.uMaskBounds, f),
          C.uniform1f(i.uMaskOpacity, m),
          C.uniform4f(i.uCanvasColor, b, x, v, 1),
          C.bindBuffer(C.ARRAY_BUFFER, V),
          C.bufferData(C.ARRAY_BUFFER, e, C.STATIC_DRAW),
          C.vertexAttribPointer(i.aPosition, 2, C.FLOAT, !1, 0, 0),
          C.drawArrays(C.TRIANGLE_STRIP, 0, e.length / 2),
          C.disableVertexAttribArray(i.aPosition)
      })(
        ((e) => {
          const t = new Float32Array(6)
          return (
            (t[0] = e[0].x),
            (t[1] = e[0].y),
            (t[2] = e[1].x),
            (t[3] = e[1].y),
            (t[4] = e[2].x),
            (t[5] = e[2].y),
            t
          )
        })(s),
        Xs(n, a)
      )
    },
    drawRect: (e, t = 0, o = !1, i = !1, n, a, s, l, d, u, h, p, g, $, w, S) => {
      const k = ot(je(e), r),
        M = n
          .map((t) =>
            ((e, t) => Math.floor($a(e, 0, Math.min(0.5 * (t.width - 1), 0.5 * (t.height - 1)))))(
              t || 0,
              e
            )
          )
          .map((e) => e * r)
      if (a || s) {
        const e = je(k)
        ;(e.x -= 0.5), (e.y -= 0.5), (e.width += 1), (e.height += 1)
        const n = nl(e, t, o, i),
          h = il(n)
        let p
        w && ((p = Xs(w)), 0 === p[3] && (p[3] = 0.001)),
          ((e, t, o, i, n, a = T, s = 1, l = hl, d = cl, u = y, h) => {
            const { program: p, locations: g } = _
            C.useProgram(p),
              C.enableVertexAttribArray(g.aPosition),
              C.enableVertexAttribArray(g.aTexCoord),
              C.enableVertexAttribArray(g.aRectCoord),
              C.uniform4fv(g.uColor, n),
              C.uniform2fv(g.uSize, [t, o]),
              C.uniform2fv(g.uPosition, [e[2], e[3]]),
              C.uniform1i(g.uInverted, h ? 1 : 0),
              C.uniform1fv(g.uCornerRadius, i),
              C.uniform4f(g.uCanvasColor, b, x, v, 1),
              C.uniform1fv(
                g.uMaskFeather,
                u.map((e, t) => (t % 2 == 0 ? e : e * r))
              ),
              C.uniform1fv(g.uMaskBounds, f),
              C.uniform1f(g.uMaskOpacity, m),
              C.uniformMatrix4fv(g.uMatrix, !1, c),
              C.uniform1i(g.uTexture, 4),
              C.uniform4fv(g.uTextureColor, l),
              C.uniform1f(g.uTextureOpacity, s),
              C.activeTexture(C.TEXTURE0 + 4),
              C.bindTexture(C.TEXTURE_2D, a),
              C.bindBuffer(C.ARRAY_BUFFER, j),
              C.bufferData(C.ARRAY_BUFFER, d, C.STATIC_DRAW),
              C.vertexAttribPointer(g.aTexCoord, 2, C.FLOAT, !1, 0, 0),
              C.bindBuffer(C.ARRAY_BUFFER, N),
              C.bufferData(C.ARRAY_BUFFER, cl, C.STATIC_DRAW),
              C.vertexAttribPointer(g.aRectCoord, 2, C.FLOAT, !1, 0, 0),
              C.bindBuffer(C.ARRAY_BUFFER, Z),
              C.bufferData(C.ARRAY_BUFFER, e, C.STATIC_DRAW),
              C.vertexAttribPointer(g.aPosition, 2, C.FLOAT, !1, 0, 0),
              C.drawArrays(C.TRIANGLE_STRIP, 0, e.length / 2),
              C.disableVertexAttribArray(g.aPosition),
              C.disableVertexAttribArray(g.aTexCoord),
              C.disableVertexAttribArray(g.aRectCoord)
          })(
            h,
            e.width,
            e.height,
            M,
            Xs(a, g),
            s,
            g,
            p,
            u ? new Float32Array(u) : ml(e.width, e.height, l, d, r),
            $,
            S
          )
      }
      h &&
        ((h = Math.min(h, k.width, k.height)),
        D(
          ((e, t, o, i, n, r, a, s) => {
            const l = []
            if (r.every((e) => 0 === e))
              l.push(ne(e, t), ne(e + o, t), ne(e + o, t + i), ne(e, t + i))
            else {
              const [n, a, s, c] = r,
                d = e,
                u = e + o,
                h = t,
                p = t + i
              l.push(ne(d + n, h)),
                rl(l, u - a, h + a, a, -1),
                l.push(ne(u, h + a)),
                rl(l, u - c, p - c, c, 0),
                l.push(ne(u - c, p)),
                rl(l, d + s, p - s, s, 1),
                l.push(ne(d, p - s)),
                rl(l, d + n, h + n, n, 2)
            }
            return (
              (a || s) && Se(l, a, s, e + 0.5 * o, t + 0.5 * i),
              n && ke(l, n, e + 0.5 * o, t + 0.5 * i),
              l
            )
          })(k.x, k.y, k.width, k.height, t, M, o, i),
          h * r,
          Xs(p, g),
          !0
        ))
    },
    drawEllipse: (e, t, o, i, n, a, s, l, d, u, h, p, g, $, y) => {
      const w = ot(qe(e.x - t, e.y - o, 2 * t, 2 * o), r)
      if (s || l) {
        const e = je(w)
        ;(e.x -= 0.5), (e.y -= 0.5), (e.width += 1), (e.height += 1)
        const t = nl(e, i, n, a)
        ;((e, t, o, i, n = T, r = cl, a = 1, s = !1) => {
          const { program: l, locations: d } = H
          C.useProgram(l),
            C.enableVertexAttribArray(d.aPosition),
            C.enableVertexAttribArray(d.aTexCoord),
            C.uniformMatrix4fv(d.uMatrix, !1, c),
            C.uniform2fv(d.uRadius, [0.5 * t, 0.5 * o]),
            C.uniform1i(d.uInverted, s ? 1 : 0),
            C.uniform4fv(d.uColor, i),
            C.uniform4f(d.uCanvasColor, b, x, v, 1),
            C.uniform1fv(d.uMaskBounds, f),
            C.uniform1f(d.uMaskOpacity, m),
            C.uniform1i(d.uTexture, 4),
            C.uniform1f(d.uTextureOpacity, a),
            C.activeTexture(C.TEXTURE0 + 4),
            C.bindTexture(C.TEXTURE_2D, n),
            C.bindBuffer(C.ARRAY_BUFFER, X),
            C.bufferData(C.ARRAY_BUFFER, r, C.STATIC_DRAW),
            C.vertexAttribPointer(d.aTexCoord, 2, C.FLOAT, !1, 0, 0),
            C.bindBuffer(C.ARRAY_BUFFER, U),
            C.bufferData(C.ARRAY_BUFFER, e, C.STATIC_DRAW),
            C.vertexAttribPointer(d.aPosition, 2, C.FLOAT, !1, 0, 0),
            C.drawArrays(C.TRIANGLE_STRIP, 0, e.length / 2),
            C.disableVertexAttribArray(d.aPosition),
            C.disableVertexAttribArray(d.aTexCoord)
        })(
          il(t),
          e.width,
          e.height,
          Xs(s, $),
          l,
          h ? new Float32Array(h) : ml(e.width, e.height, d, u, r),
          $,
          y
        )
      }
      p &&
        D(
          ((e, t, o, i, n, r, a) => {
            const s = 0.5 * Math.abs(o),
              l = 0.5 * Math.abs(i),
              c = Math.abs(o) + Math.abs(i),
              d = Math.max(20, Math.round(c / 6))
            return kt(ne(e + s, t + l), s, l, n, r, a, d)
          })(w.x, w.y, w.width, w.height, i, n, a),
          p * r,
          Xs(g, $),
          !0
        )
    },
    drawImage: (
      e,
      o,
      i,
      a,
      s,
      l,
      c,
      d,
      u,
      h,
      p = ul,
      g = 1,
      y,
      b = 1,
      x = 0,
      v = $,
      S = pl,
      T = hl,
      P = hl,
      I = !1,
      R = !1
    ) => {
      const A = o.width * r,
        z = o.height * r,
        B = -0.5 * A,
        D = 0.5 * z,
        O = 0.5 * A,
        W = -0.5 * z,
        V = new Float32Array([B, W, 0, B, D, 0, O, W, 0, O, D, 0])
      C.bindBuffer(C.ARRAY_BUFFER, L), C.bufferData(C.ARRAY_BUFFER, V, C.STATIC_DRAW)
      const _ = (o.height / 2 / M) * (t.height / o.height) * -1
      ;(s *= r), (l *= r), (i *= r), (a *= r)
      const { program: Z, locations: j } = E,
        N = Ys()
      ;((e, t, o, i, n) => {
        const r = 1 / Math.tan(t / 2),
          a = 1 / (i - n)
        ;(e[0] = r / o),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 0),
          (e[5] = r),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 0),
          (e[9] = 0),
          (e[10] = (n + i) * a),
          (e[11] = -1),
          (e[12] = 0),
          (e[13] = 0),
          (e[14] = 2 * n * i * a),
          (e[15] = 0)
      })(N, k, n, 1, 2 * -_),
        qs(N, s, -l, _),
        qs(N, i, -a, 0),
        el(N, -u),
        Ks(N, h),
        qs(N, -i, a, 0),
        Qs(N, d),
        Js(N, c),
        C.useProgram(Z),
        C.enableVertexAttribArray(j.aPosition),
        C.enableVertexAttribArray(j.aTexCoord),
        C.uniform1i(j.uTexture, 3),
        C.uniform2f(j.uTextureSize, o.width, o.height),
        C.activeTexture(C.TEXTURE0 + 3),
        C.bindTexture(C.TEXTURE_2D, e)
      const H = R ? 1 : 0,
        U = w.get(H)
      C.uniform1i(j.uTextureBlend, H),
        C.activeTexture(C.TEXTURE0 + H),
        C.bindTexture(C.TEXTURE_2D, U)
      const X = I ? 2 : 0,
        Y = w.get(X)
      let G
      C.uniform1i(j.uTextureOverlay, X),
        C.activeTexture(C.TEXTURE0 + X),
        C.bindTexture(C.TEXTURE_2D, Y),
        C.bindBuffer(C.ARRAY_BUFFER, L),
        C.vertexAttribPointer(j.aPosition, 3, C.FLOAT, !1, 0, 0),
        C.bindBuffer(C.ARRAY_BUFFER, F),
        C.vertexAttribPointer(j.aTexCoord, 2, C.FLOAT, !1, 0, 0),
        C.uniformMatrix4fv(j.uMatrix, !1, N),
        C.uniform4fv(j.uOverlayColor, P),
        C.uniform4fv(j.uFillColor, T),
        !y || va(y, dl)
          ? ((y = dl), (G = -1))
          : ((G = y.reduce((e, t) => e + t, 0)), (G = G <= 0 ? 1 : G)),
        C.uniform1fv(j.uClarityKernel, y),
        C.uniform1f(j.uClarityKernelWeight, G),
        C.uniform1f(j.uColorGamma, 1 / b),
        C.uniform1f(j.uColorVignette, x),
        C.uniform4f(j.uColorOffset, p[4], p[9], p[14], p[19]),
        C.uniformMatrix4fv(j.uColorMatrix, !1, [
          p[0],
          p[1],
          p[2],
          p[3],
          p[5],
          p[6],
          p[7],
          p[8],
          p[10],
          p[11],
          p[12],
          p[13],
          p[15],
          p[16],
          p[17],
          p[18],
        ]),
        C.uniform1f(j.uOpacity, g),
        C.uniform1f(j.uMaskOpacity, m),
        C.uniform1fv(j.uMaskBounds, f),
        C.uniform1fv(
          j.uMaskCornerRadius,
          S.map((e) => e * r)
        ),
        C.uniform1fv(
          j.uMaskFeather,
          v.map((e, t) => (t % 2 == 0 ? e : e * r))
        ),
        C.drawArrays(C.TRIANGLE_STRIP, 0, 4),
        C.disableVertexAttribArray(j.aPosition),
        C.disableVertexAttribArray(j.aTexCoord)
    },
    textureFilterNearest: C.NEAREST,
    textureFilterLinear: C.LINEAR,
    textureCreate: () => C.createTexture(),
    textureUpdate: (e, t, o) => (
      Y.set(e, {
        src: t,
        options: o,
      }),
      Us(C, e, t, o)
    ),
    textureGetSize: (e) => {
      const { src: t, options: o } = Y.get(e),
        i = Te(t)
      return o.scalar ? De(i, (e) => e / o.scalar) : i
    },
    textureDelete: K,
    enablePreviewStencil: () => {
      C.stencilOp(C.KEEP, C.KEEP, C.REPLACE), C.stencilFunc(C.ALWAYS, 1, 255), C.stencilMask(255)
    },
    applyPreviewStencil: () => {
      C.stencilFunc(C.EQUAL, 1, 255), C.stencilMask(0)
    },
    disablePreviewStencil: S,
    setCanvasColor(e) {
      ;(b = e[0]), (x = e[1]), (v = e[2]), C.clear(C.COLOR_BUFFER_BIT)
    },
    resetCanvasMatrix: () => {
      Gs(s, 0, t.width, t.height, 0, -1, 1)
    },
    updateCanvasMatrix(e, o, i, n, a) {
      const l = e.width,
        c = e.height,
        d = t.width * (0.5 / r),
        u = t.height * (0.5 / r),
        h = {
          x: d + (i.x + o.x),
          y: u + (i.y + o.y),
        },
        p = {
          x: h.x - o.x,
          y: h.y - o.y,
        },
        m = 0.5 * l,
        g = 0.5 * c
      ce(p, a.z, h), ve(p, n, h)
      qs(s, (p.x - m) * r, (p.y - g) * r, 0), qs(s, m * r, g * r, 0), el(s, a.z)
      const f = a.x > Math.PI / 2
      Js(s, f ? Math.PI : 0)
      const $ = a.y > Math.PI / 2
      Qs(s, $ ? Math.PI : 0), Ks(s, n), qs(s, -m * r, -g * r, 0)
    },
    drawToCanvas() {
      C.bindFramebuffer(C.FRAMEBUFFER, null),
        (c = s),
        C.viewport(0, 0, C.drawingBufferWidth, C.drawingBufferHeight),
        C.colorMask(!0, !0, !0, !1),
        C.clearColor(b, x, v, 1),
        C.clear(C.COLOR_BUFFER_BIT),
        (y = [1, 0, 1, 0, 1, t.width, 1, t.width])
    },
    drawToImageBlendBuffer(e, t) {
      q(1, A, e, t)
    },
    drawToImageOverlayBuffer(e, t) {
      q(2, I, e, t)
    },
    enableMask(e, o) {
      const i = e.x * r,
        n = e.y * r,
        a = e.width * r,
        s = e.height * r
      ;(p = i),
        (u = p + a),
        (d = t.height - n),
        (h = t.height - (n + s)),
        (m = 1 - o),
        (f = [d, u, h, p])
    },
    disableMask() {
      ;(p = 0), (u = t.width), (d = t.height), (h = 0), (m = 1), (f = [d, u, h, p])
    },
    resize: (i, l, c) => {
      ;(r = c),
        (a = 1 === r ? 0.75 : 1),
        (o.width = i),
        (o.height = l),
        (t.width = i * r),
        (t.height = l * r),
        (n = O(t.width, t.height)),
        (e.width = t.width),
        (e.height = t.height),
        Gs(s, 0, t.width, t.height, 0, -1, 1),
        ($ = [1, 0, 1, 0, 1, o.width, 1, o.width])
    },
    release() {
      Array.from(Y.keys()).forEach((e) => K(e, !0)),
        Y.clear(),
        w.forEach((e) => {
          C.deleteTexture(e)
        }),
        w.clear(),
        E.destroy(),
        z.destroy(),
        W.destroy(),
        _.destroy(),
        H.destroy(),
        (e.width = 1),
        (e.height = 1),
        (e = void 0)
    },
  }
}

function fl(e) {
  let t, o, i, n
  return {
    c() {
      ;(t = Vn('div')), (o = Vn('canvas')), Yn(t, 'class', 'PinturaCanvas')
    },
    m(r, a) {
      On(r, t, a),
        Dn(t, o),
        e[28](o),
        i || ((n = [Hn(o, 'measure', e[29]), Rn(Rs.call(null, o))]), (i = !0))
    },
    p: pn,
    i: pn,
    o: pn,
    d(o) {
      o && Wn(t), e[28](null), (i = !1), yn(n)
    },
  }
}

function $l(e, t, o) {
  let i, r, a, s, l, c, d
  const u = (e, t) => {
      const [o, i, n] = e,
        [r, a, s, l] = t
      return [r * l + o * (1 - l), a * l + i * (1 - l), s * l + n * (1 - l), 1]
    },
    h = dr()
  let m,
    { isAnimated: g } = t,
    { maskRect: $ } = t,
    { maskOpacity: y = 1 } = t,
    { maskFrameOpacity: b = 0.95 } = t,
    { pixelRatio: x = 1 } = t,
    { textPixelRatio: v = x } = t,
    { backgroundColor: S } = t,
    { willRender: k = W } = t,
    { didRender: M = W } = t,
    { willRequest: C } = t,
    { loadImageData: T = W } = t,
    { images: P = [] } = t,
    { interfaceImages: I = [] } = t,
    R = null,
    A = null,
    E = null
  const L = (e, t) =>
      e.set(t, {
        hard: !g,
      }),
    F = {
      precision: 1e-4 * 0.01,
    }
  let z = 0
  const B = fs(void 0, {
    duration: 0,
  })
  Sn(e, B, (e) => o(24, (a = e)))
  const D = ys(1, F)
  Sn(e, D, (e) => o(25, (s = e)))
  const V = ys(1, F)
  Sn(e, V, (e) => o(39, (d = e)))
  const _ = Jr()
  Sn(e, _, (e) => o(37, (l = e)))
  const Z = Jr()
  Sn(e, Z, (e) => o(38, (c = e)))
  const j = () =>
      requestAnimationFrame(() => {
        ;(Q = !0), r()
      }),
    N = new Map([]),
    H = new Map([]),
    U = (e, t) => {
      if (!N.has(e)) {
        N.set(e, e)
        const o = 'pixelated' === t ? R.textureFilterNearest : R.textureFilterLinear
        if (!w(e) && ('close' in e || f(e) || Hi(e))) {
          const t = R.textureCreate()
          R.textureUpdate(t, e, {
            filter: o,
          }),
            N.set(e, t)
        } else
          T(e)
            .then((t) => {
              if (!R || !t) return
              const i = R.textureCreate()
              R.textureUpdate(i, t, {
                filter: o,
              }),
                N.set(e, i),
                j()
            })
            .catch((e) => {
              console.error(e)
            })
      }
      return N.get(e)
    },
    X = (e) => {
      if (!e.text.length) return void H.delete(e.id)
      let {
        text: t,
        textAlign: o,
        fontFamily: i,
        fontSize: n,
        fontWeight: r,
        fontVariant: a,
        fontStyle: s,
        lineHeight: l,
        width: c,
        height: d,
      } = e
      const { lastCharPosition: u, textSize: h } = ((e = '', t) => {
          const {
              width: o = 0,
              height: i = 'auto',
              fontSize: n,
              fontFamily: r,
              lineHeight: a,
              fontWeight: s,
              fontStyle: l,
              fontVariant: c,
            } = t,
            d = So({
              text: e,
              fontFamily: r,
              fontWeight: s,
              fontStyle: l,
              fontVariant: c,
              fontSize: n,
              lineHeight: a,
              width: o,
              height: i,
            })
          let u = Ao.get(d)
          if (u) return u
          const h = p('span'),
            m = At(
              p(
                'pre',
                {
                  contenteditable: 'true',
                  spellcheck: 'false',
                  style: `pointer-events:none;visibility:hidden;position:absolute;left:0;top:0;${Io(
                    {
                      fontFamily: r,
                      fontWeight: s,
                      fontStyle: l,
                      fontVariant: c,
                      fontSize: n,
                      lineHeight: a,
                    }
                  )};${Ro(t)}"`,
                  innerHTML: e,
                },
                [h]
              )
            ),
            g = m.getBoundingClientRect(),
            f = h.getBoundingClientRect()
          return (
            (u = {
              textSize: Te(g),
              lastCharPosition: me(re(f), Math.round),
            }),
            Ao.set(d, u),
            m.remove(),
            u
          )
        })(t, e),
        m = So({
          text: t,
          textAlign: o,
          fontFamily: i,
          fontSize: n,
          fontWeight: r,
          fontVariant: a,
          fontStyle: s,
          lineHeight: l,
          height: d ? Math.min(u.y, Math.ceil(d / l) * l) : 'auto',
          xOffset: u.x,
          yOffset: u.y,
        })
      if (!N.has(m)) {
        N.set(m, t)
        const u = c && Math.round(c),
          p = d && Math.round(d),
          g = Math.ceil(h.width),
          f = Math.ceil(h.height / l) * l
        if (0 === g || 0 === f) return
        const $ = sl(),
          y = Math.min(1, ($ - Po * v * 2) / (g * v), $ / (f * v))
        No(t, {
          fontSize: n,
          fontFamily: i,
          fontWeight: r,
          fontVariant: a,
          fontStyle: s,
          textAlign: o,
          lineHeight: l,
          width: u,
          height: p,
          imageWidth: g,
          imageHeight: f,
          pixelRatio: v * y,
          willRequest: C,
          color: [1, 0, 1],
        })
          .then((t) => {
            if (!R) return
            const o = R.textureCreate()
            R.textureUpdate(o, t, {
              filter: R.textureFilterLinear,
              scalar: y,
            }),
              N.set(m, o),
              H.set(e.id, o),
              j()
          })
          .catch(console.error)
      }
      const g = N.get(m)
      return Y(g) ? g : H.get(e.id)
    },
    Y = (e) => e instanceof WebGLTexture,
    G = ({
      data: e,
      size: t,
      origin: o,
      translation: i,
      rotation: n,
      scale: r,
      colorMatrix: s,
      opacity: l,
      convolutionMatrix: c,
      gamma: d,
      vignette: h,
      maskFeather: p,
      maskCornerRadius: m,
      backgroundColor: g,
      overlayColor: f,
      enableOverlay: $,
      enableBlend: y,
    }) => {
      g && g[3] < 1 && g[3] > 0 && (g = u(a, g))
      const b = U(e)
      let v = 0,
        w = 0
      if (1 === x) {
        const e = Math.abs(1 - r) < Number.EPSILON
        ;(v = e && A % 2 != 0 ? 0.5 : 0), (w = e && E % 2 != 0 ? 0.5 : 0)
      }
      return (
        R.drawImage(
          b,
          t,
          o.x,
          o.y,
          i.x + v,
          i.y + w,
          n.x,
          n.y,
          n.z,
          r,
          s,
          $a(l, 0, 1),
          c,
          d,
          h,
          p,
          m,
          g,
          f,
          $,
          y
        ),
        b
      )
    },
    q = ([e, t, o, i]) => [i.x, i.y, e.x, e.y, o.x, o.y, t.x, t.y],
    K = ie(),
    J = (e = [], t) =>
      e
        .map((e) => {
          let t =
              !e._isLoading &&
              ((e) => {
                let t
                if (e.backgroundImage) t = U(e.backgroundImage, e.backgroundImageRendering)
                else if (w(e.text)) {
                  if ((e.width && e.width < 1) || (e.height && e.height < 1)) return
                  t = X(e)
                }
                return t
              })(e),
            o = Y(t) ? t : void 0
          const i = e._scale || 1,
            n = e._translate || K,
            r = e.strokeWidth && e.strokeWidth * i
          if (mo(e.points)) {
            const t = e.points.map((e) => ne(e.x * i + n.x, e.y * i + n.y))
            3 === t.length && e.backgroundColor
              ? R.drawTriangle(
                  t,
                  e.rotation,
                  e.flipX,
                  e.flipY,
                  e.backgroundColor,
                  r,
                  e.strokeColor,
                  e.opacity
                )
              : R.drawPath(t, r, e.strokeColor, e.pathClose, e.opacity)
          } else if (uo(e.rx) && uo(e.ry)) {
            let t = e.x,
              a = e.y
            ;(t *= i),
              (a *= i),
              (t += n.x),
              (a += n.y),
              R.drawEllipse(
                ne(t, a),
                e.rx * i,
                e.ry * i,
                e.rotation,
                e.flipX,
                e.flipY,
                e.backgroundColor,
                o,
                void 0,
                void 0,
                e.backgroundCorners && q(e.backgroundCorners),
                r,
                e.strokeColor,
                e.opacity,
                e.inverted
              )
          } else if ((w(e.text) && o) || e.width) {
            const t = o && R.textureGetSize(o)
            let a,
              s,
              l,
              c = void 0,
              d = e.backgroundColor,
              u = e.strokeColor,
              h = [e.cornerRadius, e.cornerRadius, e.cornerRadius, e.cornerRadius].map((e) => e * i)
            if (
              ((a = e.width
                ? Ue(e)
                : {
                    x: e.x,
                    y: e.y,
                    ...t,
                  }),
              i &&
                n &&
                ((a.x *= i),
                (a.y *= i),
                (a.x += n.x),
                (a.y += n.y),
                (a.width *= i),
                (a.height *= i)),
              t)
            )
              if (e.backgroundImage && e.backgroundSize) {
                const o = O(t.width, t.height)
                if ('contain' === e.backgroundSize) {
                  const e = ht(a, o, a)
                  ;(s = Pe(e)), (l = ne(0.5 * (a.width - s.width), 0.5 * (a.height - s.height)))
                } else if ('cover' === e.backgroundSize) {
                  const e = ut(a, o, a)
                  ;(s = Pe(e)),
                    (l = ne(e.x, e.y)),
                    (l = ne(0.5 * (a.width - s.width), 0.5 * (a.height - s.height)))
                } else (s = e.backgroundSize), (l = e.backgroundPosition)
              } else if (e.text) {
                const o = {
                  width: t.width / v,
                  height: t.height / v,
                }
                if (
                  ((l = ne(0, 0)),
                  (s = {
                    width: o.width * i,
                    height: o.height * i,
                  }),
                  e.backgroundColor || e.strokeColor)
                ) {
                  ;(d = void 0), (u = void 0)
                  let t = e.width || (o.width - 2 * Po) * i,
                    n = e.height || o.height * i
                  R.drawRect(
                    { ...a, width: t, height: n },
                    e.rotation,
                    e.flipX,
                    e.flipY,
                    h,
                    e.backgroundColor,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    r,
                    e.strokeColor,
                    e.opacity,
                    void 0,
                    void 0,
                    e.inverted
                  )
                }
                ;(a.x -= Po * i),
                  (c = e.color),
                  e.width
                    ? ((a.height = a.height || o.height * i),
                      (a.width += 2 * Po * i),
                      'center' === e.textAlign
                        ? (l.x = 0.5 * (a.width - s.width))
                        : 'right' === e.textAlign && (l.x = a.width - s.width))
                    : ((a.width = o.width * i), (a.height = o.height * i)),
                  e._prerender && (c[3] = 0)
              }
            R.drawRect(
              a,
              e.rotation,
              e.flipX,
              e.flipY,
              h,
              d,
              o,
              s,
              l,
              e.backgroundCorners && q(e.backgroundCorners),
              r,
              u,
              e.opacity,
              void 0,
              c,
              e.inverted
            )
          }
          return t
        })
        .filter(Boolean)
  let Q = !1,
    ee = !0,
    te = !1
  const oe = [],
    ae = [],
    se = [],
    le = () => {
      se.length = 0
      const e = P[0],
        {
          blendShapes: t,
          blendShapesDirty: o,
          annotationShapes: i,
          annotationShapesDirty: n,
          interfaceShapes: r,
          decorationShapes: h,
          frameShapes: p,
        } = k({
          opacity: e.opacity,
          rotation: e.rotation,
          scale: e.scale,
          images: P,
          size: Ae(A, E),
          backgroundColor: [...a],
          selectionRect: l,
        }),
        m = [...a],
        g = l,
        f = $a(s, 0, 1),
        $ = c,
        y = Math.abs((e.rotation.x / Math.PI) * 2 - 1),
        b = Math.abs((e.rotation.y / Math.PI) * 2 - 1),
        x = y < 0.99 || b < 0.99,
        w = e.size,
        S = e.backgroundColor,
        C = t.length > 0,
        T = i.length > 0,
        L = S[3] > 0
      if (f < 1 && L) {
        const e = m[0],
          t = m[1],
          o = m[2],
          i = 1 - f,
          n = S[0] * i,
          r = S[1] * i,
          a = S[2] * i,
          s = 1 - i
        ;(m[0] = n + e * s), (m[1] = r + t * s), (m[2] = a + o * s), (m[3] = 1)
      }
      R.setCanvasColor(m),
        C && o
          ? (R.disableMask(), R.drawToImageBlendBuffer(w), (oe.length = 0), oe.push(...J(t)))
          : C || (oe.length = 0),
        se.push(...oe),
        ee && (R.drawToImageOverlayBuffer(w, v), (ee = !1))
      if (
        (x
          ? ((T && (n || Q)) || !te
              ? (R.disableMask(),
                R.drawToImageOverlayBuffer(w, v),
                (ae.length = 0),
                ae.push(...J(i)))
              : T || (ae.length = 0),
            (te = !0))
          : (te = !1),
        R.drawToCanvas(),
        R.enableMask(g, f),
        L && R.drawRect(g, 0, !1, !1, [0, 0, 0, 0], u(a, S)),
        R.enablePreviewStencil(),
        se.push(
          ...[...P].reverse().map((e) =>
            G({
              ...e,
              enableOverlay: x && T,
              enableBlend: C,
              mask: g,
              maskOpacity: f,
              overlayColor: $,
            })
          )
        ),
        x ||
          (R.applyPreviewStencil(),
          R.resetCanvasMatrix(),
          R.updateCanvasMatrix(w, e.origin, e.translation, e.scale, e.rotation),
          (ae.length = 0),
          ae.push(...J(i)),
          R.disablePreviewStencil()),
        se.push(...ae),
        R.resetCanvasMatrix(),
        R.enableMask(g, 1),
        se.push(...J(h)),
        p.length)
      ) {
        const e = p.filter((e) => !e.expandsCanvas),
          t = p.filter((e) => e.expandsCanvas)
        e.length && se.push(...J(e)),
          t.length &&
            (R.enableMask(
              {
                x: g.x + 0.5,
                y: g.y + 0.5,
                width: g.width - 1,
                height: g.height - 1,
              },
              d
            ),
            se.push(...J(t)))
      }
      R.disableMask(),
        se.push(...J(r)),
        I.forEach((e) => {
          R.enableMask(e.mask, e.maskOpacity),
            e.backgroundColor &&
              R.drawRect(
                e.mask,
                0,
                !1,
                !1,
                e.maskCornerRadius,
                e.backgroundColor,
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                e.opacity,
                e.maskFeather
              ),
            G({
              ...e,
              translation: {
                x: e.translation.x + e.offset.x - 0.5 * A,
                y: e.translation.y + e.offset.y - 0.5 * E,
              },
            })
        }),
        R.disableMask(),
        ((e) => {
          N.forEach((t, o) => {
            !e.find((e) => e === t) &&
              Y(t) &&
              (Array.from(H.values()).includes(t) || (N.delete(o), R.textureDelete(t)))
          })
        })(se),
        M(),
        (Q = !1)
    }
  let ce = Date.now()
  const de = () => {
    const e = Date.now()
    e - ce < 48 || ((ce = e), le())
  }
  lr(() => r()),
    sr(() => o(22, (R = gl(m)))),
    cr(() => {
      R && (R.release(), o(22, (R = void 0)), o(0, (m = void 0)))
    })
  return (
    (e.$$set = (e) => {
      'isAnimated' in e && o(9, (g = e.isAnimated)),
        'maskRect' in e && o(10, ($ = e.maskRect)),
        'maskOpacity' in e && o(11, (y = e.maskOpacity)),
        'maskFrameOpacity' in e && o(12, (b = e.maskFrameOpacity)),
        'pixelRatio' in e && o(13, (x = e.pixelRatio)),
        'textPixelRatio' in e && o(14, (v = e.textPixelRatio)),
        'backgroundColor' in e && o(15, (S = e.backgroundColor)),
        'willRender' in e && o(16, (k = e.willRender)),
        'didRender' in e && o(17, (M = e.didRender)),
        'willRequest' in e && o(18, (C = e.willRequest)),
        'loadImageData' in e && o(19, (T = e.loadImageData)),
        'images' in e && o(20, (P = e.images)),
        'interfaceImages' in e && o(21, (I = e.interfaceImages))
    }),
    (e.$$.update = () => {
      if (1 & e.$$.dirty[0] && m) {
        const e = getComputedStyle(m).getPropertyValue('--color-transition-duration')
        o(
          23,
          (z = ((e) => {
            let t = parseFloat(e)
            return /^[0-9]+s$/.test(e) ? 1e3 * t : t
          })(e))
        )
      }
      8421888 & e.$$.dirty[0] &&
        S &&
        B.set(S, {
          duration: g ? z : 0,
        }),
        2048 & e.$$.dirty[0] && L(D, uo(y) ? y : 1),
        4096 & e.$$.dirty[0] && L(V, uo(b) ? b : 1),
        1024 & e.$$.dirty[0] && $ && _.set($),
        50331648 & e.$$.dirty[0] && a && Z.set([a[0], a[1], a[2], $a(s, 0, 1)]),
        5242886 & e.$$.dirty[0] && o(27, (i = !!(R && A && E && P.length))),
        4202502 & e.$$.dirty[0] && A && E && R && R.resize(A, E, x),
        134217728 & e.$$.dirty[0] && o(26, (r = i ? (Os() ? de : le) : n)),
        201326592 & e.$$.dirty[0] && i && r && r()
    }),
    [
      m,
      A,
      E,
      h,
      B,
      D,
      V,
      _,
      Z,
      g,
      $,
      y,
      b,
      x,
      v,
      S,
      k,
      M,
      C,
      T,
      P,
      I,
      R,
      z,
      a,
      s,
      r,
      i,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(m = e), o(0, m)
        })
      },
      (e) => {
        o(1, (A = e.detail.width)),
          o(2, (E = e.detail.height)),
          h('measure', {
            width: A,
            height: E,
          })
      },
    ]
  )
}
class yl extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        $l,
        fl,
        xn,
        {
          isAnimated: 9,
          maskRect: 10,
          maskOpacity: 11,
          maskFrameOpacity: 12,
          pixelRatio: 13,
          textPixelRatio: 14,
          backgroundColor: 15,
          willRender: 16,
          didRender: 17,
          willRequest: 18,
          loadImageData: 19,
          images: 20,
          interfaceImages: 21,
        },
        [-1, -1]
      )
  }
}
var bl = (e, t = Boolean, o = ' ') => e.filter(t).join(o)

function xl(e, t, o) {
  const i = e.slice()
  return (i[17] = t[o]), i
}
const vl = (e) => ({
    tab: 4 & e,
  }),
  wl = (e) => ({
    tab: e[17],
  })

function Sl(e) {
  let t,
    o,
    i,
    n = [],
    r = new Map(),
    a = e[2]
  const s = (e) => e[17].id
  for (let t = 0; t < a.length; t += 1) {
    let o = xl(e, a, t),
      i = s(o)
    r.set(i, (n[t] = kl(i, o)))
  }
  return {
    c() {
      t = Vn('ul')
      for (let e = 0; e < n.length; e += 1) n[e].c()
      Yn(t, 'class', (o = bl(['PinturaTabList', e[0]]))),
        Yn(t, 'role', 'tablist'),
        Yn(t, 'data-layout', e[1])
    },
    m(o, r) {
      On(o, t, r)
      for (let e = 0; e < n.length; e += 1) n[e].m(t, null)
      e[14](t), (i = !0)
    },
    p(e, l) {
      1124 & l && ((a = e[2]), Er(), (n = _r(n, l, s, 1, e, a, r, t, Vr, kl, null, xl)), Lr()),
        (!i || (1 & l && o !== (o = bl(['PinturaTabList', e[0]])))) && Yn(t, 'class', o),
        (!i || 2 & l) && Yn(t, 'data-layout', e[1])
    },
    i(e) {
      if (!i) {
        for (let e = 0; e < a.length; e += 1) Fr(n[e])
        i = !0
      }
    },
    o(e) {
      for (let e = 0; e < n.length; e += 1) zr(n[e])
      i = !1
    },
    d(o) {
      o && Wn(t)
      for (let e = 0; e < n.length; e += 1) n[e].d()
      e[14](null)
    },
  }
}

function kl(e, t) {
  let o, i, n, r, a, s, l, c, d, u
  const h = t[11].default,
    p = kn(h, t, t[10], wl)

  function m(...e) {
    return t[12](t[17], ...e)
  }

  function g(...e) {
    return t[13](t[17], ...e)
  }
  return {
    key: e,
    first: null,
    c() {
      ;(o = Vn('li')),
        (i = Vn('button')),
        p && p.c(),
        (r = jn()),
        (i.disabled = n = t[17].disabled),
        Yn(o, 'role', 'tab'),
        Yn(o, 'aria-controls', (a = t[17].href.substr(1))),
        Yn(o, 'id', (s = t[17].tabId)),
        Yn(o, 'aria-selected', (l = t[17].selected)),
        (this.first = o)
    },
    m(e, t) {
      On(e, o, t),
        Dn(o, i),
        p && p.m(i, null),
        Dn(o, r),
        (c = !0),
        d || ((u = [Hn(i, 'keydown', m), Hn(i, 'click', g)]), (d = !0))
    },
    p(e, r) {
      ;(t = e),
        p && p.p && 1028 & r && Cn(p, h, t, t[10], r, vl, wl),
        (!c || (4 & r && n !== (n = t[17].disabled))) && (i.disabled = n),
        (!c || (4 & r && a !== (a = t[17].href.substr(1)))) && Yn(o, 'aria-controls', a),
        (!c || (4 & r && s !== (s = t[17].tabId))) && Yn(o, 'id', s),
        (!c || (4 & r && l !== (l = t[17].selected))) && Yn(o, 'aria-selected', l)
    },
    i(e) {
      c || (Fr(p, e), (c = !0))
    },
    o(e) {
      zr(p, e), (c = !1)
    },
    d(e) {
      e && Wn(o), p && p.d(e), (d = !1), yn(u)
    },
  }
}

function Ml(e) {
  let t,
    o,
    i = e[4] && Sl(e)
  return {
    c() {
      i && i.c(), (t = Nn())
    },
    m(e, n) {
      i && i.m(e, n), On(e, t, n), (o = !0)
    },
    p(e, [o]) {
      e[4]
        ? i
          ? (i.p(e, o), 16 & o && Fr(i, 1))
          : ((i = Sl(e)), i.c(), Fr(i, 1), i.m(t.parentNode, t))
        : i &&
          (Er(),
          zr(i, 1, 1, () => {
            i = null
          }),
          Lr())
    },
    i(e) {
      o || (Fr(i), (o = !0))
    },
    o(e) {
      zr(i), (o = !1)
    },
    d(e) {
      i && i.d(e), e && Wn(t)
    },
  }
}

function Cl(e, t, o) {
  let i,
    n,
    r,
    { $$slots: a = {}, $$scope: s } = t,
    { class: l } = t,
    { name: c } = t,
    { selected: d } = t,
    { tabs: u = [] } = t,
    { layout: h } = t
  const p = dr(),
    m = (e) => {
      const t = r.querySelectorAll('[role="tab"] button')[e]
      t && t.focus()
    },
    g = (e, t) => {
      e.preventDefault(), e.stopPropagation(), p('select', t)
    },
    f = ({ key: e }, t) => {
      if (!/arrow/i.test(e)) return
      const o = u.findIndex((e) => e.id === t)
      return /right|down/i.test(e)
        ? m(o < u.length - 1 ? o + 1 : 0)
        : /left|up/i.test(e)
        ? m(o > 0 ? o - 1 : u.length - 1)
        : void 0
    }
  return (
    (e.$$set = (e) => {
      'class' in e && o(0, (l = e.class)),
        'name' in e && o(7, (c = e.name)),
        'selected' in e && o(8, (d = e.selected)),
        'tabs' in e && o(9, (u = e.tabs)),
        'layout' in e && o(1, (h = e.layout)),
        '$$scope' in e && o(10, (s = e.$$scope))
    }),
    (e.$$.update = () => {
      896 & e.$$.dirty &&
        o(
          2,
          (i = u.map((e) => {
            const t = e.id === d
            return { ...e, tabId: `tab-${c}-${e.id}`, href: `#panel-${c}-${e.id}`, selected: t }
          }))
        ),
        4 & e.$$.dirty && o(4, (n = i.length > 1))
    }),
    [
      l,
      h,
      i,
      r,
      n,
      g,
      f,
      c,
      d,
      u,
      s,
      a,
      (e, t) => f(t, e.id),
      (e, t) => g(t, e.id),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(r = e), o(3, r)
        })
      },
    ]
  )
}
class Tl extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Cl, Ml, xn, {
        class: 0,
        name: 7,
        selected: 8,
        tabs: 9,
        layout: 1,
      })
  }
}
const Pl = (e) => ({
    panel: 16 & e,
  }),
  Il = (e) => ({
    panel: e[4][0].id,
    panelIsActive: !0,
  })

function Rl(e, t, o) {
  const i = e.slice()
  return (
    (i[14] = t[o].id),
    (i[15] = t[o].shouldDraw),
    (i[16] = t[o].panelId),
    (i[17] = t[o].tabindex),
    (i[18] = t[o].labelledBy),
    (i[19] = t[o].isActive),
    (i[20] = t[o].hidden),
    (i[3] = t[o].visible),
    i
  )
}
const Al = (e) => ({
    panel: 16 & e,
    panelIsActive: 16 & e,
  }),
  El = (e) => ({
    panel: e[14],
    panelIsActive: e[19],
  })

function Ll(e) {
  let t, o, i, n, r, a
  const s = e[11].default,
    l = kn(s, e, e[10], Il)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        l && l.c(),
        Yn(o, 'class', (i = bl([e[1]]))),
        Yn(t, 'class', e[0]),
        Yn(t, 'style', e[2])
    },
    m(i, s) {
      On(i, t, s),
        Dn(t, o),
        l && l.m(o, null),
        (n = !0),
        r || ((a = [Hn(t, 'measure', e[13]), Rn(Rs.call(null, t))]), (r = !0))
    },
    p(e, r) {
      l && l.p && 1040 & r && Cn(l, s, e, e[10], r, Pl, Il),
        (!n || (2 & r && i !== (i = bl([e[1]])))) && Yn(o, 'class', i),
        (!n || 1 & r) && Yn(t, 'class', e[0]),
        (!n || 4 & r) && Yn(t, 'style', e[2])
    },
    i(e) {
      n || (Fr(l, e), (n = !0))
    },
    o(e) {
      zr(l, e), (n = !1)
    },
    d(e) {
      e && Wn(t), l && l.d(e), (r = !1), yn(a)
    },
  }
}

function Fl(e) {
  let t,
    o,
    i,
    n,
    r,
    a = [],
    s = new Map(),
    l = e[4]
  const c = (e) => e[14]
  for (let t = 0; t < l.length; t += 1) {
    let o = Rl(e, l, t),
      i = c(o)
    s.set(i, (a[t] = Bl(i, o)))
  }
  return {
    c() {
      t = Vn('div')
      for (let e = 0; e < a.length; e += 1) a[e].c()
      Yn(t, 'class', (o = bl(['PinturaTabPanels', e[0]]))), Yn(t, 'style', e[2])
    },
    m(o, s) {
      On(o, t, s)
      for (let e = 0; e < a.length; e += 1) a[e].m(t, null)
      ;(i = !0),
        n ||
          ((r = [
            Hn(t, 'measure', e[12]),
            Rn(
              Rs.call(null, t, {
                observePosition: !0,
              })
            ),
          ]),
          (n = !0))
    },
    p(e, n) {
      1042 & n && ((l = e[4]), Er(), (a = _r(a, n, c, 1, e, l, s, t, Vr, Bl, null, Rl)), Lr()),
        (!i || (1 & n && o !== (o = bl(['PinturaTabPanels', e[0]])))) && Yn(t, 'class', o),
        (!i || 4 & n) && Yn(t, 'style', e[2])
    },
    i(e) {
      if (!i) {
        for (let e = 0; e < l.length; e += 1) Fr(a[e])
        i = !0
      }
    },
    o(e) {
      for (let e = 0; e < a.length; e += 1) zr(a[e])
      i = !1
    },
    d(e) {
      e && Wn(t)
      for (let e = 0; e < a.length; e += 1) a[e].d()
      ;(n = !1), yn(r)
    },
  }
}

function zl(e) {
  let t
  const o = e[11].default,
    i = kn(o, e, e[10], El)
  return {
    c() {
      i && i.c()
    },
    m(e, o) {
      i && i.m(e, o), (t = !0)
    },
    p(e, t) {
      i && i.p && 1040 & t && Cn(i, o, e, e[10], t, Al, El)
    },
    i(e) {
      t || (Fr(i, e), (t = !0))
    },
    o(e) {
      zr(i, e), (t = !1)
    },
    d(e) {
      i && i.d(e)
    },
  }
}

function Bl(e, t) {
  let o,
    i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u = t[15] && zl(t)
  return {
    key: e,
    first: null,
    c() {
      ;(o = Vn('div')),
        u && u.c(),
        (i = jn()),
        Yn(o, 'class', (n = bl(['PinturaTabPanel', t[1]]))),
        (o.hidden = r = t[20]),
        Yn(o, 'id', (a = t[16])),
        Yn(o, 'tabindex', (s = t[17])),
        Yn(o, 'aria-labelledby', (l = t[18])),
        Yn(o, 'data-inert', (c = !t[3])),
        (this.first = o)
    },
    m(e, t) {
      On(e, o, t), u && u.m(o, null), Dn(o, i), (d = !0)
    },
    p(e, h) {
      ;(t = e)[15]
        ? u
          ? (u.p(t, h), 16 & h && Fr(u, 1))
          : ((u = zl(t)), u.c(), Fr(u, 1), u.m(o, i))
        : u &&
          (Er(),
          zr(u, 1, 1, () => {
            u = null
          }),
          Lr()),
        (!d || (2 & h && n !== (n = bl(['PinturaTabPanel', t[1]])))) && Yn(o, 'class', n),
        (!d || (16 & h && r !== (r = t[20]))) && (o.hidden = r),
        (!d || (16 & h && a !== (a = t[16]))) && Yn(o, 'id', a),
        (!d || (16 & h && s !== (s = t[17]))) && Yn(o, 'tabindex', s),
        (!d || (16 & h && l !== (l = t[18]))) && Yn(o, 'aria-labelledby', l),
        (!d || (16 & h && c !== (c = !t[3]))) && Yn(o, 'data-inert', c)
    },
    i(e) {
      d || (Fr(u), (d = !0))
    },
    o(e) {
      zr(u), (d = !1)
    },
    d(e) {
      e && Wn(o), u && u.d()
    },
  }
}

function Dl(e) {
  let t, o, i, n
  const r = [Fl, Ll],
    a = []

  function s(e, t) {
    return e[5] ? 0 : 1
  }
  return (
    (t = s(e)),
    (o = a[t] = r[t](e)),
    {
      c() {
        o.c(), (i = Nn())
      },
      m(e, o) {
        a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, [n]) {
        let l = t
        ;(t = s(e)),
          t === l
            ? a[t].p(e, n)
            : (Er(),
              zr(a[l], 1, 1, () => {
                a[l] = null
              }),
              Lr(),
              (o = a[t]),
              o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
              Fr(o, 1),
              o.m(i.parentNode, i))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        a[t].d(e), e && Wn(i)
      },
    }
  )
}

function Ol(e, t, o) {
  let i,
    n,
    { $$slots: r = {}, $$scope: a } = t,
    { class: s } = t,
    { name: l } = t,
    { selected: c } = t,
    { panelClass: d } = t,
    { panels: u = [] } = t,
    { visible: h } = t,
    { style: p } = t
  const m = {}
  return (
    (e.$$set = (e) => {
      'class' in e && o(0, (s = e.class)),
        'name' in e && o(6, (l = e.name)),
        'selected' in e && o(7, (c = e.selected)),
        'panelClass' in e && o(1, (d = e.panelClass)),
        'panels' in e && o(8, (u = e.panels)),
        'visible' in e && o(3, (h = e.visible)),
        'style' in e && o(2, (p = e.style)),
        '$$scope' in e && o(10, (a = e.$$scope))
    }),
    (e.$$.update = () => {
      968 & e.$$.dirty &&
        o(
          4,
          (i = u.map((e) => {
            const t = e === c
            t && o(9, (m[e] = !0), m)
            const i = h ? -1 !== h.indexOf(e) : t
            return {
              id: e,
              panelId: `panel-${l}-${e}`,
              labelledBy: `tab-${l}-${e}`,
              isActive: t,
              hidden: !t,
              visible: i,
              tabindex: t ? 0 : -1,
              shouldDraw: t || m[e],
            }
          }))
        ),
        16 & e.$$.dirty && o(5, (n = i.length > 1))
    }),
    [
      s,
      d,
      p,
      h,
      i,
      n,
      l,
      c,
      u,
      m,
      a,
      r,
      function (t) {
        pr(e, t)
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
class Wl extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Ol, Dl, xn, {
        class: 0,
        name: 6,
        selected: 7,
        panelClass: 1,
        panels: 8,
        visible: 3,
        style: 2,
      })
  }
}
var Vl = (e) => {
  const t = Object.getOwnPropertyDescriptors(e.prototype)
  return Object.keys(t).filter((e) => !!t[e].get)
}

function _l(e) {
  let t, o, i, n, r
  const a = [e[7]]

  function s(t) {
    e[20](t)
  }
  var l = e[12]

  function c(e) {
    let t = {}
    for (let e = 0; e < a.length; e += 1) t = gn(t, a[e])
    return (
      void 0 !== e[5] && (t.name = e[5]),
      {
        props: t,
      }
    )
  }
  return (
    l && ((o = new l(c(e))), gr.push(() => Nr(o, 'name', s)), e[21](o), o.$on('measure', e[22])),
    {
      c() {
        ;(t = Vn('div')),
          o && Hr(o.$$.fragment),
          Yn(t, 'data-util', e[5]),
          Yn(t, 'class', (n = bl(['PinturaUtilPanel', e[2]]))),
          Yn(t, 'style', e[6])
      },
      m(e, i) {
        On(e, t, i), o && Ur(o, t, null), (r = !0)
      },
      p(e, [d]) {
        const u = 128 & d ? Zr(a, [jr(e[7])]) : {}
        if ((!i && 32 & d && ((i = !0), (u.name = e[5]), Sr(() => (i = !1))), l !== (l = e[12]))) {
          if (o) {
            Er()
            const e = o
            zr(e.$$.fragment, 1, 0, () => {
              Xr(e, 1)
            }),
              Lr()
          }
          l
            ? ((o = new l(c(e))),
              gr.push(() => Nr(o, 'name', s)),
              e[21](o),
              o.$on('measure', e[22]),
              Hr(o.$$.fragment),
              Fr(o.$$.fragment, 1),
              Ur(o, t, null))
            : (o = null)
        } else l && o.$set(u)
        ;(!r || 32 & d) && Yn(t, 'data-util', e[5]),
          (!r || (4 & d && n !== (n = bl(['PinturaUtilPanel', e[2]])))) && Yn(t, 'class', n),
          (!r || 64 & d) && Yn(t, 'style', e[6])
      },
      i(e) {
        r || (o && Fr(o.$$.fragment, e), (r = !0))
      },
      o(e) {
        o && zr(o.$$.fragment, e), (r = !1)
      },
      d(i) {
        i && Wn(t), e[21](null), o && Xr(o)
      },
    }
  )
}

function Zl(e, t, o) {
  let i, n, r, a, s
  const l = dr()
  let { isActive: c = !0 } = t,
    { stores: d } = t,
    { content: u } = t,
    { component: h } = t,
    { locale: p } = t,
    { class: m } = t
  const g = hr('isAnimated')
  let f
  Sn(e, g, (e) => o(18, (r = e)))
  const $ = ys(0),
    y = Qr($, (e) => $a(e, 0, 1))
  Sn(e, y, (e) => o(19, (a = e)))
  let b = !c
  const x = Jr(c)
  Sn(e, x, (e) => o(23, (s = e)))
  const v = {
      isActive: Qr(x, async (e, t) => {
        if (!e) return t(e)
        await vr(), t(e)
      }),
      isActiveFraction: Qr(y, (e) => e),
      isVisible: Qr(y, (e) => e > 0),
    },
    w = u.view,
    S = Vl(w),
    k = Object.keys(u.props || {}).reduce(
      (e, t) => (S.includes(t) ? ((e[t] = u.props[t]), e) : e),
      {}
    ),
    M = Object.keys(v).reduce((e, t) => (S.includes(t) ? ((e[t] = v[t]), e) : e), {})
  let C,
    T = !1
  sr(() => {
    o(4, (T = !0))
  })
  return (
    (e.$$set = (e) => {
      'isActive' in e && o(1, (c = e.isActive)),
        'stores' in e && o(13, (d = e.stores)),
        'content' in e && o(14, (u = e.content)),
        'component' in e && o(0, (h = e.component)),
        'locale' in e && o(15, (p = e.locale)),
        'class' in e && o(2, (m = e.class))
    }),
    (e.$$.update = () => {
      11 & e.$$.dirty && f && c && h && l('measure', f),
        262146 & e.$$.dirty &&
          $.set(c ? 1 : 0, {
            hard: !1 === r,
          }),
        655360 & e.$$.dirty && (a <= 0 && !b ? o(17, (b = !0)) : a > 0 && b && o(17, (b = !1))),
        131088 & e.$$.dirty && T && l(b ? 'hide' : 'show'),
        524288 & e.$$.dirty && l('fade', a),
        524288 & e.$$.dirty && o(6, (i = a < 1 ? 'opacity: ' + a : void 0)),
        2 & e.$$.dirty && In(x, (s = c), s),
        40960 & e.$$.dirty && o(7, (n = { ...k, ...M, stores: d, locale: p }))
    }),
    [
      h,
      c,
      m,
      f,
      T,
      C,
      i,
      n,
      l,
      g,
      y,
      x,
      w,
      d,
      u,
      p,
      $,
      b,
      r,
      a,
      function (e) {
        ;(C = e), o(5, C)
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(h = e), o(0, h)
        })
      },
      (e) => {
        o(3, (f = { ...e.detail })), T && c && l('measure', { ...f })
      },
    ]
  )
}
class jl extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Zl, _l, xn, {
        isActive: 1,
        stores: 13,
        content: 14,
        component: 0,
        locale: 15,
        class: 2,
        opacity: 16,
      })
  }
  get opacity() {
    return this.$$.ctx[16]
  }
}

function Nl(e) {
  let t, o, i
  const n = e[5].default,
    r = kn(n, e, e[4], null)
  return {
    c() {
      ;(t = _n('svg')),
        r && r.c(),
        Yn(t, 'class', e[3]),
        Yn(t, 'style', e[2]),
        Yn(t, 'width', e[0]),
        Yn(t, 'height', e[1]),
        Yn(t, 'viewBox', (o = '0 0 ' + e[0] + '\n    ' + e[1])),
        Yn(t, 'xmlns', 'http://www.w3.org/2000/svg'),
        Yn(t, 'aria-hidden', 'true'),
        Yn(t, 'focusable', 'false'),
        Yn(t, 'stroke-linecap', 'round'),
        Yn(t, 'stroke-linejoin', 'round')
    },
    m(e, o) {
      On(e, t, o), r && r.m(t, null), (i = !0)
    },
    p(e, [a]) {
      r && r.p && 16 & a && Cn(r, n, e, e[4], a, null, null),
        (!i || 8 & a) && Yn(t, 'class', e[3]),
        (!i || 4 & a) && Yn(t, 'style', e[2]),
        (!i || 1 & a) && Yn(t, 'width', e[0]),
        (!i || 2 & a) && Yn(t, 'height', e[1]),
        (!i || (3 & a && o !== (o = '0 0 ' + e[0] + '\n    ' + e[1]))) && Yn(t, 'viewBox', o)
    },
    i(e) {
      i || (Fr(r, e), (i = !0))
    },
    o(e) {
      zr(r, e), (i = !1)
    },
    d(e) {
      e && Wn(t), r && r.d(e)
    },
  }
}

function Hl(e, t, o) {
  let { $$slots: i = {}, $$scope: n } = t,
    { width: r = 24 } = t,
    { height: a = 24 } = t,
    { style: s } = t,
    { class: l } = t
  return (
    (e.$$set = (e) => {
      'width' in e && o(0, (r = e.width)),
        'height' in e && o(1, (a = e.height)),
        'style' in e && o(2, (s = e.style)),
        'class' in e && o(3, (l = e.class)),
        '$$scope' in e && o(4, (n = e.$$scope))
    }),
    [r, a, s, l, n, i]
  )
}
class Ul extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Hl, Nl, xn, {
        width: 0,
        height: 1,
        style: 2,
        class: 3,
      })
  }
}
var Xl = (e, t) => t === e.target || t.contains(e.target)

function Yl(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        class: 'PinturaButtonIcon',
        $$slots: {
          default: [Gl],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        134217730 & o &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Gl(e) {
  let t
  return {
    c() {
      t = _n('g')
    },
    m(o, i) {
      On(o, t, i), (t.innerHTML = e[1])
    },
    p(e, o) {
      2 & o && (t.innerHTML = e[1])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function ql(e) {
  let t, o
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(e[0])), Yn(t, 'class', e[12])
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, i) {
      1 & i && qn(o, e[0]), 4096 & i && Yn(t, 'class', e[12])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Kl(e) {
  let t, o, i, n
  const r = e[25].default,
    a = kn(r, e, e[27], null),
    s =
      a ||
      (function (e) {
        let t,
          o,
          i,
          n = e[1] && Yl(e),
          r = e[0] && ql(e)
        return {
          c() {
            ;(t = Vn('span')), n && n.c(), (o = jn()), r && r.c(), Yn(t, 'class', e[10])
          },
          m(e, a) {
            On(e, t, a), n && n.m(t, null), Dn(t, o), r && r.m(t, null), (i = !0)
          },
          p(e, a) {
            e[1]
              ? n
                ? (n.p(e, a), 2 & a && Fr(n, 1))
                : ((n = Yl(e)), n.c(), Fr(n, 1), n.m(t, o))
              : n &&
                (Er(),
                zr(n, 1, 1, () => {
                  n = null
                }),
                Lr()),
              e[0]
                ? r
                  ? r.p(e, a)
                  : ((r = ql(e)), r.c(), r.m(t, null))
                : r && (r.d(1), (r = null)),
              (!i || 1024 & a) && Yn(t, 'class', e[10])
          },
          i(e) {
            i || (Fr(n), (i = !0))
          },
          o(e) {
            zr(n), (i = !1)
          },
          d(e) {
            e && Wn(t), n && n.d(), r && r.d()
          },
        }
      })(e)
  return {
    c() {
      ;(t = Vn('button')),
        s && s.c(),
        Yn(t, 'type', e[4]),
        Yn(t, 'style', e[2]),
        (t.disabled = e[3]),
        Yn(t, 'class', e[11]),
        Yn(t, 'title', e[0])
    },
    m(r, a) {
      On(r, t, a),
        s && s.m(t, null),
        e[26](t),
        (o = !0),
        i ||
          ((n = [
            Hn(t, 'keydown', function () {
              bn(e[6]) && e[6].apply(this, arguments)
            }),
            Hn(t, 'click', function () {
              bn(e[5]) && e[5].apply(this, arguments)
            }),
            Hn(t, 'pointerdown', function () {
              bn(e[9]) && e[9].apply(this, arguments)
            }),
            Rn(e[7].call(null, t)),
          ]),
          (i = !0))
    },
    p(i, [n]) {
      ;(e = i),
        a
          ? a.p && 134217728 & n && Cn(a, r, e, e[27], n, null, null)
          : s && s.p && 5123 & n && s.p(e, n),
        (!o || 16 & n) && Yn(t, 'type', e[4]),
        (!o || 4 & n) && Yn(t, 'style', e[2]),
        (!o || 8 & n) && (t.disabled = e[3]),
        (!o || 2048 & n) && Yn(t, 'class', e[11]),
        (!o || 1 & n) && Yn(t, 'title', e[0])
    },
    i(e) {
      o || (Fr(s, e), (o = !0))
    },
    o(e) {
      zr(s, e), (o = !1)
    },
    d(o) {
      o && Wn(t), s && s.d(o), e[26](null), (i = !1), yn(n)
    },
  }
}

function Jl(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    { $$slots: c = {}, $$scope: d } = t,
    { class: u } = t,
    { label: h } = t,
    { labelClass: p } = t,
    { innerClass: m } = t,
    { hideLabel: g = !1 } = t,
    { icon: f } = t,
    { style: $ } = t,
    { disabled: y } = t,
    { type: b = 'button' } = t,
    { onclick: x } = t,
    { onkeydown: v } = t,
    { onhold: w } = t,
    { action: S = () => {} } = t,
    { holdThreshold: k = 500 } = t,
    { holdSpeedUpFactor: M = 0.5 } = t,
    { holdSpeedMin: C = 20 } = t
  const T = (e) => {
    o(
      23,
      (l = setTimeout(() => {
        w(), T(Math.max(e * M, C))
      }, e))
    )
  }
  let P
  return (
    (e.$$set = (e) => {
      'class' in e && o(13, (u = e.class)),
        'label' in e && o(0, (h = e.label)),
        'labelClass' in e && o(14, (p = e.labelClass)),
        'innerClass' in e && o(15, (m = e.innerClass)),
        'hideLabel' in e && o(16, (g = e.hideLabel)),
        'icon' in e && o(1, (f = e.icon)),
        'style' in e && o(2, ($ = e.style)),
        'disabled' in e && o(3, (y = e.disabled)),
        'type' in e && o(4, (b = e.type)),
        'onclick' in e && o(5, (x = e.onclick)),
        'onkeydown' in e && o(6, (v = e.onkeydown)),
        'onhold' in e && o(17, (w = e.onhold)),
        'action' in e && o(7, (S = e.action)),
        'holdThreshold' in e && o(18, (k = e.holdThreshold)),
        'holdSpeedUpFactor' in e && o(19, (M = e.holdSpeedUpFactor)),
        'holdSpeedMin' in e && o(20, (C = e.holdSpeedMin)),
        '$$scope' in e && o(27, (d = e.$$scope))
    }),
    (e.$$.update = () => {
      25296896 & e.$$.dirty &&
        o(
          24,
          (n = w
            ? () => {
                l &&
                  (clearTimeout(l),
                  o(23, (l = void 0)),
                  document.documentElement.removeEventListener('pointerup', n))
              }
            : pn)
        ),
        17170432 & e.$$.dirty &&
          o(
            9,
            (i = w
              ? () => {
                  document.documentElement.addEventListener('pointerup', n), T(k)
                }
              : pn)
          ),
        32768 & e.$$.dirty && o(10, (r = bl(['PinturaButtonInner', m]))),
        73728 & e.$$.dirty && o(11, (a = bl(['PinturaButton', g && 'PinturaButtonIconOnly', u]))),
        81920 & e.$$.dirty && o(12, (s = bl([g ? 'implicit' : 'PinturaButtonLabel', p])))
    }),
    [
      h,
      f,
      $,
      y,
      b,
      x,
      v,
      S,
      P,
      i,
      r,
      a,
      s,
      u,
      p,
      m,
      g,
      w,
      k,
      M,
      C,
      (e) => Xl(e, P),
      () => P,
      l,
      n,
      c,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(P = e), o(8, P)
        })
      },
      d,
    ]
  )
}
class Ql extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Jl, Kl, xn, {
        class: 13,
        label: 0,
        labelClass: 14,
        innerClass: 15,
        hideLabel: 16,
        icon: 1,
        style: 2,
        disabled: 3,
        type: 4,
        onclick: 5,
        onkeydown: 6,
        onhold: 17,
        action: 7,
        holdThreshold: 18,
        holdSpeedUpFactor: 19,
        holdSpeedMin: 20,
        isEventTarget: 21,
        getElement: 22,
      })
  }
  get isEventTarget() {
    return this.$$.ctx[21]
  }
  get getElement() {
    return this.$$.ctx[22]
  }
}
var ec = (e, t) => {
  const o = e.findIndex(t)
  if (o >= 0) return e.splice(o, 1)
}
var tc = (e, t = {}) => {
    const {
      inertia: o = !1,
      shouldStartInteraction: i = () => !0,
      pinch: n = !1,
      multiTouch: r,
      getEventPosition: a = (e) => ne(e.clientX, e.clientY),
    } = t

    function s(t, o) {
      e.dispatchEvent(
        new CustomEvent(t, {
          detail: o,
        })
      )
    }

    function l() {
      x && x(), (x = void 0)
    }
    const c = [],
      d = (e) => (0 === e.timeStamp ? Date.now() : e.timeStamp),
      u = () => {
        const e = se(c[0].position)
        if (c[1]) {
          const t = 0.5 * (c[1].position.x - e.x),
            o = 0.5 * (c[1].position.y - e.y)
          ;(e.x += t), (e.y += o)
        }
        return e
      },
      h = (e) => {
        ;(e.origin.x = e.position.x),
          (e.origin.y = e.position.y),
          (e.translation.x = 0),
          (e.translation.y = 0)
      },
      p = (e) => {
        const t = ((e) => c.findIndex((t) => t.event.pointerId === e.pointerId))(e)
        if (!(t < 0)) return c[t]
      },
      m = () => 1 === c.length,
      g = () => 2 === c.length,
      f = (e) => {
        const t = we(e.map((e) => e.position))
        return {
          center: t,
          distance: ((e, t) => e.reduce((e, o) => e + xe(t, o.position), 0) / e.length)(e, t),
          velocity: we(e.map((e) => e.velocity)),
          translation: we(e.map((e) => e.translation)),
        }
      }
    let $,
      y,
      b,
      x,
      v,
      w,
      S,
      k,
      M = 0,
      C = void 0

    function T(t) {
      if (!g() && !((e) => uo(e.button) && 0 !== e.button)(t) && i(t, e))
        if (
          (l(),
          ((e) => {
            const t = d(e),
              o = {
                timeStamp: t,
                timeStampInitial: t,
                position: a(e),
                origin: a(e),
                velocity: ie(),
                velocityHistory: [],
                velocityAverage: ie(),
                translation: ie(),
                interactionState: void 0,
                event: e,
              }
            c.push(o), (o.interactionState = f(c))
          })(t),
          m())
        )
          document.documentElement.addEventListener('pointermove', I),
            document.documentElement.addEventListener('pointerup', R),
            document.documentElement.addEventListener('pointercancel', R),
            (k = !1),
            (S = 1),
            (w = ie()),
            (v = void 0),
            s('interactionstart', {
              origin: se(p(t).origin),
            })
        else if (n)
          (k = !0),
            (v = xe(c[0].position, c[1].position)),
            (w.x += c[0].translation.x),
            (w.y += c[0].translation.y),
            h(c[0])
        else if (!1 === r)
          return (
            (c.length = 0),
            document.documentElement.removeEventListener('pointermove', I),
            document.documentElement.removeEventListener('pointerup', R),
            document.documentElement.removeEventListener('pointercancel', R),
            s('interactioncancel')
          )
    }
    e.addEventListener('pointerdown', T)
    let P = Date.now()

    function I(e) {
      e.preventDefault(),
        ((e) => {
          const t = p(e)
          if (!t) return
          const o = d(e),
            i = a(e),
            n = Math.max(1, o - t.timeStamp)
          ;(t.velocity.x = (i.x - t.position.x) / n),
            (t.velocity.y = (i.y - t.position.y) / n),
            t.velocityHistory.push(se(t.velocity)),
            (t.velocityHistory = t.velocityHistory.slice(-3)),
            (t.velocityAverage = t.velocityHistory.reduce(
              (e, t, o, i) => ((e.x += t.x / i.length), (e.y += t.y / i.length), e),
              ie()
            )),
            (t.translation.x = i.x - t.origin.x),
            (t.translation.y = i.y - t.origin.y),
            (t.timeStamp = o),
            (t.position.x = i.x),
            (t.position.y = i.y),
            (t.event = e)
        })(e)
      const t = se(c[0].translation)
      let o = S
      if (n && g()) {
        ;(o *= xe(c[0].position, c[1].position) / v), ge(t, c[1].translation)
      }
      ;(t.x += w.x), (t.y += w.y)
      const i = Date.now()
      i - P < 16 ||
        ((P = i),
        s('interactionupdate', {
          position: u(),
          translation: t,
          scalar: n ? o : void 0,
          isMultiTouching: g(),
        }))
    }

    function R(e) {
      if (!p(e)) return
      const t = u(),
        i = ((e) => {
          const t = ec(c, (t) => t.event.pointerId === e.pointerId)
          if (t) return t[0]
        })(e)
      if (n && m()) {
        const e = xe(c[0].position, i.position)
        ;(S *= e / v),
          (w.x += c[0].translation.x + i.translation.x),
          (w.y += c[0].translation.y + i.translation.y),
          h(c[0])
      }
      let r = !1,
        a = !1
      if (!k && i) {
        const e = performance.now(),
          t = e - i.timeStampInitial,
          o = be(i.translation)
        ;(r = o < 64 && t < 300),
          (a = !!(C && r && e - M < 700 && be(C, i.position) < 128)),
          r && ((C = se(i.position)), (M = e))
      }
      if (c.length > 0) return
      document.documentElement.removeEventListener('pointermove', I),
        document.documentElement.removeEventListener('pointerup', R),
        document.documentElement.removeEventListener('pointercancel', R)
      const l = se(i.translation),
        d = se(i.velocityAverage)
      let g = !1
      s('interactionrelease', {
        isTap: r,
        isDoubleTap: a,
        position: t,
        translation: l,
        scalar: S,
        preventInertia: () => (g = !0),
      })
      const f = xe(d)
      if (g || !o || f < 0.25)
        return E(l, {
          isTap: r,
          isDoubleTap: a,
        })
      ;(y = se(t)),
        (b = se(l)),
        ($ = fs(se(l), {
          easing: ps,
          duration: 80 * f,
        })),
        $.set({
          x: l.x + 50 * d.x,
          y: l.y + 50 * d.y,
        }).then(() => {
          x &&
            E(wn($), {
              isTap: r,
              isDoubleTap: a,
            })
        }),
        (x = $.subscribe(A))
    }

    function A(e) {
      e &&
        s('interactionupdate', {
          position: ne(y.x + (e.x - b.x), y.y + (e.y - b.y)),
          translation: e,
          scalar: n ? S : void 0,
        })
    }

    function E(e, t) {
      l(), s('interactionend', { ...t, translation: e, scalar: n ? S : void 0 })
    }
    return {
      destroy() {
        l(), e.removeEventListener('pointerdown', T)
      },
    }
  },
  oc = (e, t = {}) => {
    const {
        direction: o,
        shiftMultiplier: i = 10,
        bubbles: n = !1,
        stopKeydownPropagation: r = !0,
      } = t,
      a = 'horizontal' === o,
      s = 'vertical' === o,
      l = (t) => {
        const { key: o } = t,
          l = t.shiftKey,
          c = /up|down/i.test(o),
          d = /left|right/i.test(o)
        if (!d && !c) return
        if (a && c) return
        if (s && d) return
        const u = l ? i : 1
        r && t.stopPropagation(),
          e.dispatchEvent(
            new CustomEvent('nudge', {
              bubbles: n,
              detail: ne(
                (/left/i.test(o) ? -1 : /right/i.test(o) ? 1 : 0) * u,
                (/up/i.test(o) ? -1 : /down/i.test(o) ? 1 : 0) * u
              ),
            })
          )
      }
    return (
      e.addEventListener('keydown', l),
      {
        destroy() {
          e.removeEventListener('keydown', l)
        },
      }
    )
  }

function ic(e, t) {
  return t ? t * Math.sign(e) * Math.log10(1 + Math.abs(e) / t) : e
}
const nc = (e, t, o) => {
  if (!t || !o) return je(e)
  const i = e.x + ic(t.x - e.x, o),
    n = e.x + e.width + ic(t.x + t.width - (e.x + e.width), o),
    r = e.y + ic(t.y - e.y, o)
  return {
    x: i,
    y: r,
    width: n - i,
    height: e.y + e.height + ic(t.y + t.height - (e.y + e.height), o) - r,
  }
}
var rc = (e, t) => {
    if (e) return /em/.test(e) ? 16 * parseInt(e, 10) : /px/.test(e) ? parseInt(e, 10) : void 0
  },
  ac = (e) => {
    let t = e.detail || 0
    const { deltaX: o, deltaY: i, wheelDelta: n, wheelDeltaX: r, wheelDeltaY: a } = e
    return (
      uo(r) && Math.abs(r) > Math.abs(a)
        ? (t = r / -120)
        : uo(o) && Math.abs(o) > Math.abs(i)
        ? (t = o / 20)
        : (n || a) && (t = (n || a) / -120),
      t || (t = i / 20),
      t
    )
  },
  sc = {
    Up: 38,
    Down: 40,
    Left: 37,
    Right: 39,
  }

function lc(e) {
  let t, o, i, n, r, a, s
  const l = e[37].default,
    c = kn(l, e, e[36], null)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        c && c.c(),
        Yn(o, 'style', e[6]),
        Yn(t, 'class', (i = bl(['PinturaScrollable', e[0]]))),
        Yn(t, 'style', e[4]),
        Yn(t, 'data-direction', e[1]),
        Yn(t, 'data-state', e[5])
    },
    m(i, l) {
      On(i, t, l),
        Dn(t, o),
        c && c.m(o, null),
        e[39](t),
        (r = !0),
        a ||
          ((s = [
            Hn(o, 'interactionstart', e[9]),
            Hn(o, 'interactionupdate', e[11]),
            Hn(o, 'interactionend', e[12]),
            Hn(o, 'interactionrelease', e[10]),
            Rn(
              tc.call(null, o, {
                inertia: !0,
              })
            ),
            Hn(o, 'measure', e[38]),
            Rn(Rs.call(null, o)),
            Hn(t, 'wheel', e[14], {
              passive: !1,
            }),
            Hn(t, 'scroll', e[16]),
            Hn(t, 'focusin', e[15]),
            Hn(t, 'nudge', e[17]),
            Hn(t, 'measure', e[13]),
            Rn(
              Rs.call(null, t, {
                observePosition: !0,
              })
            ),
            Rn(
              (n = oc.call(null, t, {
                direction: 'x' === e[1] ? 'horizontal' : 'vertical',
                stopKeydownPropagation: !1,
              }))
            ),
          ]),
          (a = !0))
    },
    p(e, a) {
      c && c.p && 32 & a[1] && Cn(c, l, e, e[36], a, null, null),
        (!r || 64 & a[0]) && Yn(o, 'style', e[6]),
        (!r || (1 & a[0] && i !== (i = bl(['PinturaScrollable', e[0]])))) && Yn(t, 'class', i),
        (!r || 16 & a[0]) && Yn(t, 'style', e[4]),
        (!r || 2 & a[0]) && Yn(t, 'data-direction', e[1]),
        (!r || 32 & a[0]) && Yn(t, 'data-state', e[5]),
        n &&
          bn(n.update) &&
          2 & a[0] &&
          n.update.call(null, {
            direction: 'x' === e[1] ? 'horizontal' : 'vertical',
            stopKeydownPropagation: !1,
          })
    },
    i(e) {
      r || (Fr(c, e), (r = !0))
    },
    o(e) {
      zr(c, e), (r = !1)
    },
    d(o) {
      o && Wn(t), c && c.d(o), e[39](null), (a = !1), yn(s)
    },
  }
}

function cc(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    { $$slots: p = {}, $$scope: m } = t
  const g = dr(),
    f = Object.values(sc),
    $ = hr('keysPressed')
  Sn(e, $, (e) => o(46, (h = e)))
  let y,
    b,
    x,
    v,
    w = 'idle',
    S = ys(0)
  Sn(e, S, (e) => o(34, (u = e)))
  let k,
    { class: M } = t,
    { scrollBlockInteractionDist: C = 5 } = t,
    { scrollStep: T = 10 } = t,
    { scrollFocusMargin: P = 64 } = t,
    { scrollDirection: I = 'x' } = t,
    { scrollAutoCancel: R = !1 } = t,
    { elasticity: A = 0 } = t,
    { onscroll: E = n } = t,
    { maskFeatherSize: L } = t,
    { maskFeatherStartOpacity: F } = t,
    { maskFeatherEndOpacity: z } = t,
    { scroll: B } = t,
    D = '',
    O = !0
  const W = S.subscribe((e) => {
      const t = ie()
      ;(t[I] = e), E(t)
    }),
    V = (e) => Math.max(Math.min(0, e), x[i] - b[i])
  let _, Z, j
  const N = (e, t = {}) => {
    const { elastic: i = !1, animate: n = !1 } = t
    Math.abs(e) > C && 'idle' === w && !v && o(28, (w = 'scrolling'))
    const r = V(e),
      a = i && A && !v ? r + ic(e - r, A) : r
    let s = !0
    n ? (s = !1) : O || (s = !v),
      (O = !1),
      S.set(a, {
        hard: s,
      }).then((e) => {
        v && (O = !0)
      })
  }
  cr(() => {
    W()
  })
  return (
    (e.$$set = (e) => {
      'class' in e && o(0, (M = e.class)),
        'scrollBlockInteractionDist' in e && o(21, (C = e.scrollBlockInteractionDist)),
        'scrollStep' in e && o(22, (T = e.scrollStep)),
        'scrollFocusMargin' in e && o(23, (P = e.scrollFocusMargin)),
        'scrollDirection' in e && o(1, (I = e.scrollDirection)),
        'scrollAutoCancel' in e && o(24, (R = e.scrollAutoCancel)),
        'elasticity' in e && o(25, (A = e.elasticity)),
        'onscroll' in e && o(26, (E = e.onscroll)),
        'maskFeatherSize' in e && o(20, (L = e.maskFeatherSize)),
        'maskFeatherStartOpacity' in e && o(18, (F = e.maskFeatherStartOpacity)),
        'maskFeatherEndOpacity' in e && o(19, (z = e.maskFeatherEndOpacity)),
        'scroll' in e && o(27, (B = e.scroll)),
        '$$scope' in e && o(36, (m = e.$$scope))
    }),
    (e.$$.update = () => {
      if (
        (2 & e.$$.dirty[0] && o(30, (i = 'x' === I ? 'width' : 'height')),
        2 & e.$$.dirty[0] && o(31, (r = I.toUpperCase())),
        8 & e.$$.dirty[0] && o(32, (a = k && getComputedStyle(k))),
        (8 & e.$$.dirty[0]) | (2 & e.$$.dirty[1]) &&
          o(33, (s = a && rc(a.getPropertyValue('--scrollable-feather-size')))),
        (1611399172 & e.$$.dirty[0]) | (12 & e.$$.dirty[1]) && null != u && x && null != s && b)
      ) {
        const e = (-1 * u) / s,
          t = -(x[i] - b[i] - u) / s
        o(18, (F = $a(1 - e, 0, 1))),
          o(19, (z = $a(1 - t, 0, 1))),
          o(20, (L = s)),
          o(
            4,
            (D = `--scrollable-feather-start-opacity: ${F};--scrollable-feather-end-opacity: ${z}`)
          )
      }
      134217736 & e.$$.dirty[0] && k && void 0 !== B && (uo(B) ? N(B) : N(B.scrollOffset, B)),
        1610612740 & e.$$.dirty[0] && o(35, (l = x && b ? b[i] > x[i] : void 0)),
        (268435456 & e.$$.dirty[0]) | (16 & e.$$.dirty[1]) &&
          o(5, (c = bl([w, l ? 'overflows' : void 0]))),
        25 & e.$$.dirty[1] && o(6, (d = l ? `transform: translate${r}(${u}px)` : void 0))
    }),
    [
      M,
      I,
      b,
      k,
      D,
      c,
      d,
      $,
      S,
      () => {
        l && ((Z = !1), (_ = !0), (j = ne(0, 0)), (v = !1), o(28, (w = 'idle')), (y = wn(S)))
      },
      ({ detail: e }) => {
        l && ((v = !0), o(28, (w = 'idle')))
      },
      ({ detail: e }) => {
        l &&
          (Z ||
            (_ && ((_ = !1), be(e.translation) < 0.1)) ||
            (!R ||
            'x' !== I ||
            ((e) => {
              const t = me(ne(e.x - j.x, e.y - j.y), Math.abs)
              j = se(e)
              const o = be(t),
                i = t.x - t.y
              return !(o > 1 && i < -0.5)
            })(e.translation)
              ? N(y + e.translation[I], {
                  elastic: !0,
                })
              : (Z = !0)))
      },
      ({ detail: e }) => {
        if (!l) return
        if (Z) return
        const t = y + e.translation[I],
          o = V(t)
        ;(O = !1),
          S.set(o).then((e) => {
            v && (O = !0)
          })
      },
      ({ detail: e }) => {
        o(29, (x = e)),
          g('measure', {
            x: e.x,
            y: e.y,
            width: e.width,
            height: e.height,
          })
      },
      (e) => {
        if (!l) return
        e.preventDefault(), e.stopPropagation()
        const t = ac(e),
          o = wn(S)
        N(o + t * T, {
          animate: !0,
        })
      },
      (e) => {
        if (!l) return
        if (!v) return
        if (h.some((e) => f.includes(e))) return
        let t = e.target
        e.target.classList.contains('implicit') && (t = t.parentNode)
        const o = t['x' === I ? 'offsetLeft' : 'offsetTop'],
          n = o + t['x' === I ? 'offsetWidth' : 'offsetHeight'],
          r = wn(S),
          a = P + L
        r + o < a
          ? N(-o + a)
          : r + n > x[i] - a &&
            N(x[i] - n - a, {
              animate: !0,
            })
      },
      () => {
        o(3, (k['x' === I ? 'scrollLeft' : 'scrollTop'] = 0), k)
      },
      ({ detail: e }) => {
        const t = -2 * e[I],
          o = wn(S)
        N(o + t * T, {
          animate: !0,
        })
      },
      F,
      z,
      L,
      C,
      T,
      P,
      R,
      A,
      E,
      B,
      w,
      x,
      i,
      r,
      a,
      s,
      u,
      l,
      m,
      p,
      (e) => o(2, (b = e.detail)),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(k = e), o(3, k)
        })
      },
    ]
  )
}
class dc extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        cc,
        lc,
        xn,
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

function uc(e, { delay: t = 0, duration: o = 400, easing: i = mn } = {}) {
  const n = +getComputedStyle(e).opacity
  return {
    delay: t,
    duration: o,
    easing: i,
    css: (e) => 'opacity: ' + e * n,
  }
}

function hc(e) {
  let t, o, i, n, r, a
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(e[0])), Yn(t, 'class', 'PinturaStatusMessage')
    },
    m(i, s) {
      On(i, t, s),
        Dn(t, o),
        (n = !0),
        r ||
          ((a = [
            Hn(t, 'measure', function () {
              bn(e[1]) && e[1].apply(this, arguments)
            }),
            Rn(Rs.call(null, t)),
          ]),
          (r = !0))
    },
    p(t, [i]) {
      ;(e = t), (!n || 1 & i) && qn(o, e[0])
    },
    i(e) {
      n ||
        (wr(() => {
          i || (i = Dr(t, uc, {}, !0)), i.run(1)
        }),
        (n = !0))
    },
    o(e) {
      i || (i = Dr(t, uc, {}, !1)), i.run(0), (n = !1)
    },
    d(e) {
      e && Wn(t), e && i && i.end(), (r = !1), yn(a)
    },
  }
}

function pc(e, t, o) {
  let { text: i } = t,
    { onmeasure: r = n } = t
  return (
    (e.$$set = (e) => {
      'text' in e && o(0, (i = e.text)), 'onmeasure' in e && o(1, (r = e.onmeasure))
    }),
    [i, r]
  )
}
class mc extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, pc, hc, xn, {
        text: 0,
        onmeasure: 1,
      })
  }
}

function gc(e) {
  let t, o, i, n, r, a, s, l
  return {
    c() {
      ;(t = Vn('span')),
        (o = _n('svg')),
        (i = _n('g')),
        (n = _n('circle')),
        (r = _n('circle')),
        (a = jn()),
        (s = Vn('span')),
        (l = Zn(e[0])),
        Yn(n, 'class', 'PinturaProgressIndicatorBar'),
        Yn(n, 'r', '8.5'),
        Yn(n, 'cx', '10'),
        Yn(n, 'cy', '10'),
        Yn(n, 'stroke-linecap', 'round'),
        Yn(n, 'opacity', '.25'),
        Yn(r, 'class', 'PinturaProgressIndicatorFill'),
        Yn(r, 'r', '8.5'),
        Yn(r, 'stroke-dasharray', e[1]),
        Yn(r, 'cx', '10'),
        Yn(r, 'cy', '10'),
        Yn(r, 'transform', 'rotate(-90) translate(-20)'),
        Yn(i, 'fill', 'none'),
        Yn(i, 'stroke', 'currentColor'),
        Yn(i, 'stroke-width', '2.5'),
        Yn(i, 'stroke-linecap', 'round'),
        Yn(i, 'opacity', e[2]),
        Yn(o, 'width', '20'),
        Yn(o, 'height', '20'),
        Yn(o, 'viewBox', '0 0 20 20'),
        Yn(o, 'xmlns', 'http://www.w3.org/2000/svg'),
        Yn(o, 'aria-hidden', 'true'),
        Yn(o, 'focusable', 'false'),
        Yn(s, 'class', 'implicit'),
        Yn(t, 'class', 'PinturaProgressIndicator'),
        Yn(t, 'data-status', e[3])
    },
    m(e, c) {
      On(e, t, c), Dn(t, o), Dn(o, i), Dn(i, n), Dn(i, r), Dn(t, a), Dn(t, s), Dn(s, l)
    },
    p(e, [o]) {
      2 & o && Yn(r, 'stroke-dasharray', e[1]),
        4 & o && Yn(i, 'opacity', e[2]),
        1 & o && qn(l, e[0]),
        8 & o && Yn(t, 'data-status', e[3])
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t)
    },
  }
}

function fc(e, t, o) {
  let i, n, r, a, s
  const l = dr()
  let { progress: c } = t,
    { min: d = 0 } = t,
    { max: u = 100 } = t,
    { labelBusy: h = 'Busy' } = t
  const p = ys(0, {
      precision: 0.01,
    }),
    m = Qr([p], (e) => $a(e, d, u))
  Sn(e, m, (e) => o(9, (s = e)))
  const g = m.subscribe((e) => {
    1 === c && Math.round(e) >= 100 && l('complete')
  })
  return (
    cr(() => {
      g()
    }),
    (e.$$set = (e) => {
      'progress' in e && o(5, (c = e.progress)),
        'min' in e && o(6, (d = e.min)),
        'max' in e && o(7, (u = e.max)),
        'labelBusy' in e && o(8, (h = e.labelBusy))
    }),
    (e.$$.update = () => {
      32 & e.$$.dirty && c && c !== 1 / 0 && p.set(100 * c),
        800 & e.$$.dirty && o(0, (i = c === 1 / 0 ? h : Math.round(s) + '%')),
        544 & e.$$.dirty && o(1, (n = c === 1 / 0 ? '26.5 53' : (s / 100) * 53 + ' 53')),
        544 & e.$$.dirty && o(2, (r = Math.min(1, c === 1 / 0 ? 1 : s / 10))),
        32 & e.$$.dirty && o(3, (a = c === 1 / 0 ? 'busy' : 'loading'))
    }),
    [i, n, r, a, m, c, d, u, h, s]
  )
}
class $c extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, fc, gc, xn, {
        progress: 5,
        min: 6,
        max: 7,
        labelBusy: 8,
      })
  }
}

function yc(e) {
  let t, o, i
  const n = e[5].default,
    r = kn(n, e, e[4], null)
  return {
    c() {
      ;(t = Vn('span')),
        r && r.c(),
        Yn(t, 'class', (o = 'PinturaStatusAside ' + e[0])),
        Yn(t, 'style', e[1])
    },
    m(e, o) {
      On(e, t, o), r && r.m(t, null), (i = !0)
    },
    p(e, [a]) {
      r && r.p && 16 & a && Cn(r, n, e, e[4], a, null, null),
        (!i || (1 & a && o !== (o = 'PinturaStatusAside ' + e[0]))) && Yn(t, 'class', o),
        (!i || 2 & a) && Yn(t, 'style', e[1])
    },
    i(e) {
      i || (Fr(r, e), (i = !0))
    },
    o(e) {
      zr(r, e), (i = !1)
    },
    d(e) {
      e && Wn(t), r && r.d(e)
    },
  }
}

function bc(e, t, o) {
  let i,
    { $$slots: n = {}, $$scope: r } = t,
    { offset: a = 0 } = t,
    { opacity: s = 0 } = t,
    { class: l } = t
  return (
    (e.$$set = (e) => {
      'offset' in e && o(2, (a = e.offset)),
        'opacity' in e && o(3, (s = e.opacity)),
        'class' in e && o(0, (l = e.class)),
        '$$scope' in e && o(4, (r = e.$$scope))
    }),
    (e.$$.update = () => {
      12 & e.$$.dirty && o(1, (i = `transform:translateX(${a}px);opacity:${s}`))
    }),
    [l, i, a, s, r, n]
  )
}
class xc extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, bc, yc, xn, {
        offset: 2,
        opacity: 3,
        class: 0,
      })
  }
}

function vc(e) {
  let t, o, i
  const n = e[3].default,
    r = kn(n, e, e[2], null)
  let a = [
      {
        for: (o = '_'),
      },
      e[1],
    ],
    s = {}
  for (let e = 0; e < a.length; e += 1) s = gn(s, a[e])
  return {
    c() {
      ;(t = Vn('label')), r && r.c(), Gn(t, s)
    },
    m(e, o) {
      On(e, t, o), r && r.m(t, null), (i = !0)
    },
    p(e, o) {
      r && r.p && 4 & o && Cn(r, n, e, e[2], o, null, null),
        Gn(
          t,
          (s = Zr(a, [
            {
              for: '_',
            },
            2 & o && e[1],
          ]))
        )
    },
    i(e) {
      i || (Fr(r, e), (i = !0))
    },
    o(e) {
      zr(r, e), (i = !1)
    },
    d(e) {
      e && Wn(t), r && r.d(e)
    },
  }
}

function wc(e) {
  let t, o
  const i = e[3].default,
    n = kn(i, e, e[2], null)
  let r = [e[1]],
    a = {}
  for (let e = 0; e < r.length; e += 1) a = gn(a, r[e])
  return {
    c() {
      ;(t = Vn('div')), n && n.c(), Gn(t, a)
    },
    m(e, i) {
      On(e, t, i), n && n.m(t, null), (o = !0)
    },
    p(e, o) {
      n && n.p && 4 & o && Cn(n, i, e, e[2], o, null, null), Gn(t, (a = Zr(r, [2 & o && e[1]])))
    },
    i(e) {
      o || (Fr(n, e), (o = !0))
    },
    o(e) {
      zr(n, e), (o = !1)
    },
    d(e) {
      e && Wn(t), n && n.d(e)
    },
  }
}

function Sc(e) {
  let t, o
  const i = e[3].default,
    n = kn(i, e, e[2], null)
  let r = [e[1]],
    a = {}
  for (let e = 0; e < r.length; e += 1) a = gn(a, r[e])
  return {
    c() {
      ;(t = Vn('div')), n && n.c(), Gn(t, a)
    },
    m(e, i) {
      On(e, t, i), n && n.m(t, null), (o = !0)
    },
    p(e, o) {
      n && n.p && 4 & o && Cn(n, i, e, e[2], o, null, null), Gn(t, (a = Zr(r, [2 & o && e[1]])))
    },
    i(e) {
      o || (Fr(n, e), (o = !0))
    },
    o(e) {
      zr(n, e), (o = !1)
    },
    d(e) {
      e && Wn(t), n && n.d(e)
    },
  }
}

function kc(e) {
  let t, o, i, n
  const r = [Sc, wc, vc],
    a = []

  function s(e, t) {
    return 'div' === e[0] ? 0 : 'span' === e[0] ? 1 : 'label' === e[0] ? 2 : -1
  }
  return (
    ~(t = s(e)) && (o = a[t] = r[t](e)),
    {
      c() {
        o && o.c(), (i = Nn())
      },
      m(e, o) {
        ~t && a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, [n]) {
        let l = t
        ;(t = s(e)),
          t === l
            ? ~t && a[t].p(e, n)
            : (o &&
                (Er(),
                zr(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Lr()),
              ~t
                ? ((o = a[t]),
                  o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
                  Fr(o, 1),
                  o.m(i.parentNode, i))
                : (o = null))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        ~t && a[t].d(e), e && Wn(i)
      },
    }
  )
}

function Mc(e, t, o) {
  let { $$slots: i = {}, $$scope: n } = t,
    { name: r = 'div' } = t,
    { attributes: a = {} } = t
  return (
    (e.$$set = (e) => {
      'name' in e && o(0, (r = e.name)),
        'attributes' in e && o(1, (a = e.attributes)),
        '$$scope' in e && o(2, (n = e.$$scope))
    }),
    [r, a, n, i]
  )
}
class Cc extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Mc, kc, xn, {
        name: 0,
        attributes: 1,
      })
  }
}
var Tc = () => (c() && window.devicePixelRatio) || 1
let Pc = null
var Ic = (e) => (null === Pc && (Pc = 1 === Tc() ? Math.round : (e) => e), Pc(e)),
  Rc = (e, t = {}) => {
    if (e) {
      if (t.preventScroll && Lt()) {
        const t = document.body.scrollTop
        return e.focus(), void (document.body.scrollTop = t)
      }
      e.focus(t)
    }
  }
const Ac = (e) => ({}),
  Ec = (e) => ({}),
  Lc = (e) => ({}),
  Fc = (e) => ({})

function zc(e) {
  let t, o
  const i = [e[10]]
  let n = {
    $$slots: {
      default: [Dc],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Ql({
      props: n,
    })),
    e[39](t),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n = 1024 & o[0] ? Zr(i, [jr(e[10])]) : {}
        2048 & o[1] &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(o) {
        e[39](null), Xr(t, o)
      },
    }
  )
}

function Bc(e) {
  let t, o
  const i = [e[10]]
  let n = {}
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Ql({
      props: n,
    })),
    e[38](t),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n = 1024 & o[0] ? Zr(i, [jr(e[10])]) : {}
        t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(o) {
        e[38](null), Xr(t, o)
      },
    }
  )
}

function Dc(e) {
  let t
  const o = e[37].label,
    i = kn(o, e, e[42], Fc)
  return {
    c() {
      i && i.c()
    },
    m(e, o) {
      i && i.m(e, o), (t = !0)
    },
    p(e, t) {
      i && i.p && 2048 & t[1] && Cn(i, o, e, e[42], t, Lc, Fc)
    },
    i(e) {
      t || (Fr(i, e), (t = !0))
    },
    o(e) {
      zr(i, e), (t = !1)
    },
    d(e) {
      i && i.d(e)
    },
  }
}

function Oc(e) {
  let t, o, i, n, r, a, s
  const l = e[37].details,
    c = kn(l, e, e[42], Ec)
  return {
    c() {
      ;(t = Vn('div')),
        c && c.c(),
        (o = jn()),
        (i = Vn('span')),
        Yn(i, 'class', 'PinturaPanelTip'),
        Yn(i, 'style', e[7]),
        Yn(t, 'class', (n = bl(['PinturaPanel', 'pintura-editor-panel', e[1]]))),
        Yn(t, 'tabindex', '-1'),
        Yn(t, 'style', e[6])
    },
    m(n, l) {
      On(n, t, l),
        c && c.m(t, null),
        Dn(t, o),
        Dn(t, i),
        e[40](t),
        (r = !0),
        a ||
          ((s = [Hn(t, 'keydown', e[17]), Hn(t, 'measure', e[41]), Rn(Rs.call(null, t))]), (a = !0))
    },
    p(e, o) {
      c && c.p && 2048 & o[1] && Cn(c, l, e, e[42], o, Ac, Ec),
        (!r || 128 & o[0]) && Yn(i, 'style', e[7]),
        (!r || (2 & o[0] && n !== (n = bl(['PinturaPanel', 'pintura-editor-panel', e[1]])))) &&
          Yn(t, 'class', n),
        (!r || 64 & o[0]) && Yn(t, 'style', e[6])
    },
    i(e) {
      r || (Fr(c, e), (r = !0))
    },
    o(e) {
      zr(c, e), (r = !1)
    },
    d(o) {
      o && Wn(t), c && c.d(o), e[40](null), (a = !1), yn(s)
    },
  }
}

function Wc(e) {
  let t, o, i, n, r, a, s, l, c
  const d = [Bc, zc],
    u = []

  function h(e, t) {
    return e[0] ? 0 : 1
  }
  ;(o = h(e)), (i = u[o] = d[o](e))
  let p = e[5] && Oc(e)
  return {
    c() {
      ;(t = jn()), i.c(), (n = jn()), p && p.c(), (r = jn()), (a = Nn())
    },
    m(i, d) {
      On(i, t, d),
        u[o].m(i, d),
        On(i, n, d),
        p && p.m(i, d),
        On(i, r, d),
        On(i, a, d),
        (s = !0),
        l ||
          ((c = [
            Hn(document.body, 'pointerdown', function () {
              bn(e[8]) && e[8].apply(this, arguments)
            }),
            Hn(document.body, 'pointerup', function () {
              bn(e[9]) && e[9].apply(this, arguments)
            }),
          ]),
          (l = !0))
    },
    p(t, a) {
      let s = o
      ;(o = h((e = t))),
        o === s
          ? u[o].p(e, a)
          : (Er(),
            zr(u[s], 1, 1, () => {
              u[s] = null
            }),
            Lr(),
            (i = u[o]),
            i ? i.p(e, a) : ((i = u[o] = d[o](e)), i.c()),
            Fr(i, 1),
            i.m(n.parentNode, n)),
        e[5]
          ? p
            ? (p.p(e, a), 32 & a[0] && Fr(p, 1))
            : ((p = Oc(e)), p.c(), Fr(p, 1), p.m(r.parentNode, r))
          : p &&
            (Er(),
            zr(p, 1, 1, () => {
              p = null
            }),
            Lr())
    },
    i(e) {
      s || (Fr(i), Fr(p), Fr(false), (s = !0))
    },
    o(e) {
      zr(i), zr(p), zr(false), (s = !1)
    },
    d(e) {
      e && Wn(t), u[o].d(e), e && Wn(n), p && p.d(e), e && Wn(r), e && Wn(a), (l = !1), yn(c)
    },
  }
}

function Vc(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    { $$slots: v = {}, $$scope: w } = t,
    { buttonClass: S } = t,
    { buttonLabel: k } = t,
    { panelClass: M } = t,
    { isActive: C = !1 } = t,
    {
      onshow: T = ({ panel: e }) =>
        Rc(e, {
          preventScroll: !0,
        }),
    } = t
  const P = hr('isAnimated')
  Sn(e, P, (e) => o(26, (g = e)))
  const I = hr('rootPortal')
  Sn(e, I, (e) => o(36, (x = e)))
  const R = hr('rootRect')
  let A, E, L
  Sn(e, R, (e) => o(29, ($ = e)))
  const F = () => o(21, (L = i && i.getBoundingClientRect()))
  let z = ie(),
    B = ys(0)
  Sn(e, B, (e) => o(31, (b = e)))
  let D = ie()
  const O = Jr({
    x: 0,
    y: 0,
  })
  Sn(e, O, (e) => o(30, (y = e)))
  const W = ys(-5, {
    stiffness: 0.1,
    damping: 0.35,
    precision: 0.001,
  })
  Sn(e, W, (e) => o(28, (f = e)))
  const V = (e) => Xl(e, x) || E.isEventTarget(e)
  let _,
    Z,
    j = !1
  const N = (e) => {
      C || F(), o(25, (Z = e)), o(18, (C = !C))
    },
    H = (e) => {
      ;/down/i.test(e.key) && (o(18, (C = !0)), o(25, (Z = e)))
    }
  cr(() => {
    if (!x) return
    if (!_) return
    const e = _
    vr().then(() => {
      e.parentNode && e.remove()
    })
  })
  return (
    (e.$$set = (e) => {
      'buttonClass' in e && o(19, (S = e.buttonClass)),
        'buttonLabel' in e && o(0, (k = e.buttonLabel)),
        'panelClass' in e && o(1, (M = e.panelClass)),
        'isActive' in e && o(18, (C = e.isActive)),
        'onshow' in e && o(20, (T = e.onshow)),
        '$$scope' in e && o(42, (w = e.$$scope))
    }),
    (e.$$.update = () => {
      if (
        (8 & e.$$.dirty[0] && (i = E && E.getElement()),
        17039360 & e.$$.dirty[0] &&
          o(
            9,
            (p = C
              ? (e) => {
                  j && (o(24, (j = !1)), V(e) || o(18, (C = !1)))
                }
              : void 0)
          ),
        67371008 & e.$$.dirty[0] &&
          B.set(C ? 1 : 0, {
            hard: !1 === g,
          }),
        67371008 & e.$$.dirty[0] &&
          W.set(C ? 0 : -5, {
            hard: !1 === g,
          }),
        268435456 & e.$$.dirty[0] && o(27, (n = 1 - f / -5)),
        537133056 & e.$$.dirty[0] && $ && C && F(),
        539230212 & e.$$.dirty[0] && $ && A && L && C)
      ) {
        let e = L.x - $.x + 0.5 * L.width - 0.5 * A.width,
          t = L.y - $.y + L.height
        const i = 12,
          n = 12,
          r = $.width - 12,
          a = $.height - 12,
          s = e,
          l = t,
          c = s + A.width,
          d = l + A.height
        if (
          (s < i && (o(23, (D.x = s - i), D), (e = i)),
          c > r && (o(23, (D.x = c - r), D), (e = r - A.width)),
          d > a)
        ) {
          o(22, (z.y = -1), z)
          n < t - A.height - L.height
            ? (o(23, (D.y = 0), D), (t -= A.height + L.height))
            : (o(23, (D.y = t - (d - a)), D), (t -= d - a))
        } else o(22, (z.y = 1), z)
        In(O, (y = me(ne(e, t), Ic)), y)
      }
      1 & e.$$.dirty[1] && o(5, (r = b > 0)),
        1 & e.$$.dirty[1] && o(32, (a = b < 1)),
        1346371584 & e.$$.dirty[0] &&
          o(
            33,
            (s = `translateX(${Math.round(y.x) + 12 * z.x}px) translateY(${
              Math.round(y.y) + 12 * z.y + z.y * f
            }px)`)
          ),
        7 & e.$$.dirty[1] &&
          o(
            6,
            (l = a
              ? `opacity: ${b}; pointer-events: ${b < 1 ? 'none' : 'all'}; transform: ${s};`
              : 'transform: ' + s)
          ),
        134217728 & e.$$.dirty[0] && o(34, (c = 0.5 + 0.5 * n)),
        134217728 & e.$$.dirty[0] && o(35, (d = n)),
        (1086324740 & e.$$.dirty[0]) | (24 & e.$$.dirty[1]) &&
          o(
            7,
            (u =
              y &&
              A &&
              `opacity:${d};transform:scaleX(${c})rotate(45deg);top:${
                z.y < 0 ? D.y + A.height : 0
              }px;left:${D.x + 0.5 * A.width}px`)
          ),
        262144 & e.$$.dirty[0] &&
          o(
            8,
            (h = C
              ? (e) => {
                  V(e) || o(24, (j = !0))
                }
              : void 0)
          ),
        (48 & e.$$.dirty[0]) | (32 & e.$$.dirty[1]) &&
          r &&
          x &&
          _ &&
          _.parentNode !== x &&
          x.append(_),
        262144 & e.$$.dirty[0] && (C || o(25, (Z = void 0))),
        34603056 & e.$$.dirty[0] &&
          r &&
          _ &&
          T({
            e: Z,
            panel: _,
          }),
        524289 & e.$$.dirty[0] &&
          o(
            10,
            (m = {
              label: k,
              class: bl(['PinturaPanelButton', S]),
              onkeydown: H,
              onclick: N,
            })
          )
    }),
    [
      k,
      M,
      A,
      E,
      _,
      r,
      l,
      u,
      h,
      p,
      m,
      P,
      I,
      R,
      B,
      O,
      W,
      (e) => {
        ;/esc/i.test(e.key) && (o(18, (C = !1)), i.focus())
      },
      C,
      S,
      T,
      L,
      z,
      D,
      j,
      Z,
      g,
      n,
      f,
      $,
      y,
      b,
      a,
      s,
      c,
      d,
      x,
      v,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(E = e), o(3, E)
        })
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(E = e), o(3, E)
        })
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(_ = e), o(4, _)
        })
      },
      (e) => o(2, (A = Te(e.detail))),
      w,
    ]
  )
}
class _c extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        Vc,
        Wc,
        xn,
        {
          buttonClass: 19,
          buttonLabel: 0,
          panelClass: 1,
          isActive: 18,
          onshow: 20,
        },
        [-1, -1]
      )
  }
}

function Zc(e) {
  let t, o, i, n, r, a, s, l
  const c = e[15].default,
    d = kn(c, e, e[14], null)
  return {
    c() {
      ;(t = Vn('li')),
        (o = Vn('input')),
        (i = jn()),
        (n = Vn('label')),
        d && d.c(),
        Yn(o, 'type', 'radio'),
        Yn(o, 'class', 'implicit'),
        Yn(o, 'id', e[7]),
        Yn(o, 'name', e[0]),
        (o.value = e[3]),
        (o.disabled = e[6]),
        (o.hidden = e[5]),
        (o.checked = e[4]),
        Yn(n, 'for', e[7]),
        Yn(n, 'title', e[2]),
        Yn(t, 'class', (r = bl(['PinturaRadioGroupOption', e[1]]))),
        Yn(t, 'data-hidden', e[5]),
        Yn(t, 'data-disabled', e[6]),
        Yn(t, 'data-selected', e[4])
    },
    m(r, c) {
      On(r, t, c),
        Dn(t, o),
        Dn(t, i),
        Dn(t, n),
        d && d.m(n, null),
        (a = !0),
        s ||
          ((l = [Hn(o, 'change', Xn(e[16])), Hn(o, 'keydown', e[9]), Hn(o, 'click', e[10])]),
          (s = !0))
    },
    p(e, [i]) {
      ;(!a || 128 & i) && Yn(o, 'id', e[7]),
        (!a || 1 & i) && Yn(o, 'name', e[0]),
        (!a || 8 & i) && (o.value = e[3]),
        (!a || 64 & i) && (o.disabled = e[6]),
        (!a || 32 & i) && (o.hidden = e[5]),
        (!a || 16 & i) && (o.checked = e[4]),
        d && d.p && 16384 & i && Cn(d, c, e, e[14], i, null, null),
        (!a || 128 & i) && Yn(n, 'for', e[7]),
        (!a || 4 & i) && Yn(n, 'title', e[2]),
        (!a || (2 & i && r !== (r = bl(['PinturaRadioGroupOption', e[1]])))) && Yn(t, 'class', r),
        (!a || 32 & i) && Yn(t, 'data-hidden', e[5]),
        (!a || 64 & i) && Yn(t, 'data-disabled', e[6]),
        (!a || 16 & i) && Yn(t, 'data-selected', e[4])
    },
    i(e) {
      a || (Fr(d, e), (a = !0))
    },
    o(e) {
      zr(d, e), (a = !1)
    },
    d(e) {
      e && Wn(t), d && d.d(e), (s = !1), yn(l)
    },
  }
}

function jc(e, t, o) {
  let i,
    n,
    { $$slots: r = {}, $$scope: a } = t,
    { name: s } = t,
    { class: l } = t,
    { label: c } = t,
    { id: d } = t,
    { value: u } = t,
    { checked: h } = t,
    { onkeydown: p } = t,
    { onclick: m } = t,
    { hidden: g = !1 } = t,
    { disabled: f = !1 } = t
  const $ = Object.values(sc),
    y = hr('keysPressed')
  Sn(e, y, (e) => o(17, (n = e)))
  return (
    (e.$$set = (e) => {
      'name' in e && o(0, (s = e.name)),
        'class' in e && o(1, (l = e.class)),
        'label' in e && o(2, (c = e.label)),
        'id' in e && o(11, (d = e.id)),
        'value' in e && o(3, (u = e.value)),
        'checked' in e && o(4, (h = e.checked)),
        'onkeydown' in e && o(12, (p = e.onkeydown)),
        'onclick' in e && o(13, (m = e.onclick)),
        'hidden' in e && o(5, (g = e.hidden)),
        'disabled' in e && o(6, (f = e.disabled)),
        '$$scope' in e && o(14, (a = e.$$scope))
    }),
    (e.$$.update = () => {
      2049 & e.$$.dirty && o(7, (i = `${s}-${d}`))
    }),
    [
      s,
      l,
      c,
      u,
      h,
      g,
      f,
      i,
      y,
      (e) => {
        p(e)
      },
      (e) => {
        n.some((e) => $.includes(e)) || m(e)
      },
      d,
      p,
      m,
      a,
      r,
      function (t) {
        pr(e, t)
      },
    ]
  )
}
class Nc extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, jc, Zc, xn, {
        name: 0,
        class: 1,
        label: 2,
        id: 11,
        value: 3,
        checked: 4,
        onkeydown: 12,
        onclick: 13,
        hidden: 5,
        disabled: 6,
      })
  }
}
var Hc = (e = []) =>
  e.reduce(
    (e, t) =>
      (mo(t) ? mo(t[1]) : !!t.options) ? e.concat(mo(t) ? t[1] : t.options) : (e.push(t), e),
    []
  )
const Uc = (e, t, o) => {
  let i
  return (
    mo(e)
      ? (i = {
          id: t,
          value: e[0],
          label: e[1],
          ...(e[2] || {}),
        })
      : ((i = e), (i.id = null != i.id ? i.id : t)),
    o ? o(i) : i
  )
}
var Xc = (e, t, o) => (S(e) ? e(t, o) : e)
const Yc = (e, t) =>
  e.map(([e, o, i]) => {
    if (mo(o)) return [Xc(e, t), Yc(o, t)]
    {
      const n = [e, Xc(o, t)]
      if (i) {
        let e = { ...i }
        i.icon && (e.icon = Xc(i.icon, t)), n.push(e)
      }
      return n
    }
  })
var Gc = (e, t) => Yc(e, t),
  qc = (e, t) => (Array.isArray(e) && Array.isArray(t) ? va(e, t) : e === t)

function Kc(e, t, o) {
  const i = e.slice()
  return (i[27] = t[o]), i
}
const Jc = (e) => ({
    option: 2048 & e[0],
  }),
  Qc = (e) => ({
    option: e[27],
  })

function ed(e, t, o) {
  const i = e.slice()
  return (i[27] = t[o]), i
}
const td = (e) => ({
    option: 2048 & e[0],
  }),
  od = (e) => ({
    option: e[27],
  }),
  id = (e) => ({
    option: 2048 & e[0],
  }),
  nd = (e) => ({
    option: e[27],
  })

function rd(e) {
  let t,
    o,
    i,
    n,
    r,
    a = [],
    s = new Map(),
    l = e[1] && ad(e),
    c = e[11]
  const d = (e) => e[27].id
  for (let t = 0; t < c.length; t += 1) {
    let o = Kc(e, c, t),
      i = d(o)
    s.set(i, (a[t] = yd(i, o)))
  }
  return {
    c() {
      ;(t = Vn('fieldset')), l && l.c(), (o = jn()), (i = Vn('ul'))
      for (let e = 0; e < a.length; e += 1) a[e].c()
      Yn(i, 'class', 'PinturaRadioGroupOptions'),
        Yn(t, 'class', (n = bl(['PinturaRadioGroup', e[3]]))),
        Yn(t, 'data-layout', e[5]),
        Yn(t, 'title', e[7])
    },
    m(e, n) {
      On(e, t, n), l && l.m(t, null), Dn(t, o), Dn(t, i)
      for (let e = 0; e < a.length; e += 1) a[e].m(i, null)
      r = !0
    },
    p(e, u) {
      e[1] ? (l ? l.p(e, u) : ((l = ad(e)), l.c(), l.m(t, o))) : l && (l.d(1), (l = null)),
        8420177 & u[0] &&
          ((c = e[11]), Er(), (a = _r(a, u, d, 1, e, c, s, i, Vr, yd, null, Kc)), Lr()),
        (!r || (8 & u[0] && n !== (n = bl(['PinturaRadioGroup', e[3]])))) && Yn(t, 'class', n),
        (!r || 32 & u[0]) && Yn(t, 'data-layout', e[5]),
        (!r || 128 & u[0]) && Yn(t, 'title', e[7])
    },
    i(e) {
      if (!r) {
        for (let e = 0; e < c.length; e += 1) Fr(a[e])
        r = !0
      }
    },
    o(e) {
      for (let e = 0; e < a.length; e += 1) zr(a[e])
      r = !1
    },
    d(e) {
      e && Wn(t), l && l.d()
      for (let e = 0; e < a.length; e += 1) a[e].d()
    },
  }
}

function ad(e) {
  let t, o, i
  return {
    c() {
      ;(t = Vn('legend')), (o = Zn(e[1])), Yn(t, 'class', (i = e[2] && 'implicit'))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, n) {
      2 & n[0] && qn(o, e[1]), 4 & n[0] && i !== (i = e[2] && 'implicit') && Yn(t, 'class', i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function sd(e) {
  let t, o
  return (
    (t = new Nc({
      props: {
        name: e[4],
        label: e[27].label,
        id: e[27].id,
        value: e[27].value,
        disabled: e[27].disabled,
        hidden: e[27].hidden,
        class: e[8],
        checked: e[12](e[27]) === e[0],
        onkeydown: e[13](e[27]),
        onclick: e[14](e[27]),
        $$slots: {
          default: [hd],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        16 & o[0] && (i.name = e[4]),
          2048 & o[0] && (i.label = e[27].label),
          2048 & o[0] && (i.id = e[27].id),
          2048 & o[0] && (i.value = e[27].value),
          2048 & o[0] && (i.disabled = e[27].disabled),
          2048 & o[0] && (i.hidden = e[27].hidden),
          256 & o[0] && (i.class = e[8]),
          2049 & o[0] && (i.checked = e[12](e[27]) === e[0]),
          2048 & o[0] && (i.onkeydown = e[13](e[27])),
          2048 & o[0] && (i.onclick = e[14](e[27])),
          8390720 & o[0] &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function ld(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s = [],
    l = new Map()
  const c = e[22].group,
    d = kn(c, e, e[23], nd),
    u =
      d ||
      (function (e) {
        let t,
          o,
          i = e[27].label + ''
        return {
          c() {
            ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'class', 'PinturaRadioGroupOptionGroupLabel')
          },
          m(e, i) {
            On(e, t, i), Dn(t, o)
          },
          p(e, t) {
            2048 & t[0] && i !== (i = e[27].label + '') && qn(o, i)
          },
          d(e) {
            e && Wn(t)
          },
        }
      })(e)
  let h = e[27].options
  const p = (e) => e[27].id
  for (let t = 0; t < h.length; t += 1) {
    let o = ed(e, h, t),
      i = p(o)
    l.set(i, (s[t] = $d(i, o)))
  }
  return {
    c() {
      ;(t = Vn('li')), u && u.c(), (o = jn()), (i = Vn('ul'))
      for (let e = 0; e < s.length; e += 1) s[e].c()
      ;(n = jn()),
        Yn(i, 'class', 'PinturaRadioGroupOptions'),
        Yn(t, 'class', (r = bl(['PinturaRadioGroupOptionGroup', e[9]])))
    },
    m(e, r) {
      On(e, t, r), u && u.m(t, null), Dn(t, o), Dn(t, i)
      for (let e = 0; e < s.length; e += 1) s[e].m(i, null)
      Dn(t, n), (a = !0)
    },
    p(e, o) {
      d
        ? d.p && 8390656 & o[0] && Cn(d, c, e, e[23], o, id, nd)
        : u && u.p && 2048 & o[0] && u.p(e, o),
        8419665 & o[0] &&
          ((h = e[27].options), Er(), (s = _r(s, o, p, 1, e, h, l, i, Vr, $d, null, ed)), Lr()),
        (!a || (512 & o[0] && r !== (r = bl(['PinturaRadioGroupOptionGroup', e[9]])))) &&
          Yn(t, 'class', r)
    },
    i(e) {
      if (!a) {
        Fr(u, e)
        for (let e = 0; e < h.length; e += 1) Fr(s[e])
        a = !0
      }
    },
    o(e) {
      zr(u, e)
      for (let e = 0; e < s.length; e += 1) zr(s[e])
      a = !1
    },
    d(e) {
      e && Wn(t), u && u.d(e)
      for (let e = 0; e < s.length; e += 1) s[e].d()
    },
  }
}

function cd(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [dd],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8390656 & o[0] &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function dd(e) {
  let t,
    o = e[27].icon + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      2048 & i[0] && o !== (o = e[27].icon + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function ud(e) {
  let t,
    o,
    i = e[27].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'class', e[6])
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, n) {
      2048 & n[0] && i !== (i = e[27].label + '') && qn(o, i), 64 & n[0] && Yn(t, 'class', e[6])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function hd(e) {
  let t
  const o = e[22].option,
    i = kn(o, e, e[23], Qc),
    n =
      i ||
      (function (e) {
        let t,
          o,
          i,
          n = e[27].icon && cd(e),
          r = !e[27].hideLabel && ud(e)
        return {
          c() {
            n && n.c(), (t = jn()), r && r.c(), (o = jn())
          },
          m(e, a) {
            n && n.m(e, a), On(e, t, a), r && r.m(e, a), On(e, o, a), (i = !0)
          },
          p(e, i) {
            e[27].icon
              ? n
                ? (n.p(e, i), 2048 & i[0] && Fr(n, 1))
                : ((n = cd(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
              : n &&
                (Er(),
                zr(n, 1, 1, () => {
                  n = null
                }),
                Lr()),
              e[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(e, i)
                : ((r = ud(e)), r.c(), r.m(o.parentNode, o))
          },
          i(e) {
            i || (Fr(n), (i = !0))
          },
          o(e) {
            zr(n), (i = !1)
          },
          d(e) {
            n && n.d(e), e && Wn(t), r && r.d(e), e && Wn(o)
          },
        }
      })(e)
  return {
    c() {
      n && n.c()
    },
    m(e, o) {
      n && n.m(e, o), (t = !0)
    },
    p(e, t) {
      i
        ? i.p && 8390656 & t[0] && Cn(i, o, e, e[23], t, Jc, Qc)
        : n && n.p && 2112 & t[0] && n.p(e, t)
    },
    i(e) {
      t || (Fr(n, e), (t = !0))
    },
    o(e) {
      zr(n, e), (t = !1)
    },
    d(e) {
      n && n.d(e)
    },
  }
}

function pd(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [md],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8390656 & o[0] &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function md(e) {
  let t,
    o = e[27].icon + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      2048 & i[0] && o !== (o = e[27].icon + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function gd(e) {
  let t,
    o,
    i = e[27].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'class', e[6])
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, n) {
      2048 & n[0] && i !== (i = e[27].label + '') && qn(o, i), 64 & n[0] && Yn(t, 'class', e[6])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function fd(e) {
  let t
  const o = e[22].option,
    i = kn(o, e, e[23], od),
    n =
      i ||
      (function (e) {
        let t,
          o,
          i,
          n = e[27].icon && pd(e),
          r = !e[27].hideLabel && gd(e)
        return {
          c() {
            n && n.c(), (t = jn()), r && r.c(), (o = jn())
          },
          m(e, a) {
            n && n.m(e, a), On(e, t, a), r && r.m(e, a), On(e, o, a), (i = !0)
          },
          p(e, i) {
            e[27].icon
              ? n
                ? (n.p(e, i), 2048 & i[0] && Fr(n, 1))
                : ((n = pd(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
              : n &&
                (Er(),
                zr(n, 1, 1, () => {
                  n = null
                }),
                Lr()),
              e[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(e, i)
                : ((r = gd(e)), r.c(), r.m(o.parentNode, o))
          },
          i(e) {
            i || (Fr(n), (i = !0))
          },
          o(e) {
            zr(n), (i = !1)
          },
          d(e) {
            n && n.d(e), e && Wn(t), r && r.d(e), e && Wn(o)
          },
        }
      })(e)
  return {
    c() {
      n && n.c()
    },
    m(e, o) {
      n && n.m(e, o), (t = !0)
    },
    p(e, t) {
      i
        ? i.p && 8390656 & t[0] && Cn(i, o, e, e[23], t, td, od)
        : n && n.p && 2112 & t[0] && n.p(e, t)
    },
    i(e) {
      t || (Fr(n, e), (t = !0))
    },
    o(e) {
      zr(n, e), (t = !1)
    },
    d(e) {
      n && n.d(e)
    },
  }
}

function $d(e, t) {
  let o, i, n
  return (
    (i = new Nc({
      props: {
        name: t[4],
        label: t[27].label,
        id: t[27].id,
        value: t[27].value,
        disabled: t[27].disabled,
        hidden: t[27].hidden,
        class: t[8],
        checked: t[12](t[27]) === t[0],
        onkeydown: t[13](t[27]),
        onclick: t[14](t[27]),
        $$slots: {
          default: [fd],
        },
        $$scope: {
          ctx: t,
        },
      },
    })),
    {
      key: e,
      first: null,
      c() {
        ;(o = Nn()), Hr(i.$$.fragment), (this.first = o)
      },
      m(e, t) {
        On(e, o, t), Ur(i, e, t), (n = !0)
      },
      p(e, o) {
        t = e
        const n = {}
        16 & o[0] && (n.name = t[4]),
          2048 & o[0] && (n.label = t[27].label),
          2048 & o[0] && (n.id = t[27].id),
          2048 & o[0] && (n.value = t[27].value),
          2048 & o[0] && (n.disabled = t[27].disabled),
          2048 & o[0] && (n.hidden = t[27].hidden),
          256 & o[0] && (n.class = t[8]),
          2049 & o[0] && (n.checked = t[12](t[27]) === t[0]),
          2048 & o[0] && (n.onkeydown = t[13](t[27])),
          2048 & o[0] && (n.onclick = t[14](t[27])),
          8390720 & o[0] &&
            (n.$$scope = {
              dirty: o,
              ctx: t,
            }),
          i.$set(n)
      },
      i(e) {
        n || (Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && Wn(o), Xr(i, e)
      },
    }
  )
}

function yd(e, t) {
  let o, i, n, r, a
  const s = [ld, sd],
    l = []

  function c(e, t) {
    return e[27].options ? 0 : 1
  }
  return (
    (i = c(t)),
    (n = l[i] = s[i](t)),
    {
      key: e,
      first: null,
      c() {
        ;(o = Nn()), n.c(), (r = Nn()), (this.first = o)
      },
      m(e, t) {
        On(e, o, t), l[i].m(e, t), On(e, r, t), (a = !0)
      },
      p(e, o) {
        let a = i
        ;(i = c((t = e))),
          i === a
            ? l[i].p(t, o)
            : (Er(),
              zr(l[a], 1, 1, () => {
                l[a] = null
              }),
              Lr(),
              (n = l[i]),
              n ? n.p(t, o) : ((n = l[i] = s[i](t)), n.c()),
              Fr(n, 1),
              n.m(r.parentNode, r))
      },
      i(e) {
        a || (Fr(n), (a = !0))
      },
      o(e) {
        zr(n), (a = !1)
      },
      d(e) {
        e && Wn(o), l[i].d(e), e && Wn(r)
      },
    }
  )
}

function bd(e) {
  let t,
    o,
    i,
    n = e[10].length && rd(e)
  return {
    c() {
      n && n.c(), (t = jn()), (o = Nn())
    },
    m(e, r) {
      n && n.m(e, r), On(e, t, r), On(e, o, r), (i = !0)
    },
    p(e, o) {
      e[10].length
        ? n
          ? (n.p(e, o), 1024 & o[0] && Fr(n, 1))
          : ((n = rd(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
        : n &&
          (Er(),
          zr(n, 1, 1, () => {
            n = null
          }),
          Lr())
    },
    i(e) {
      i || (Fr(n), Fr(false), (i = !0))
    },
    o(e) {
      zr(n), zr(false), (i = !1)
    },
    d(e) {
      n && n.d(e), e && Wn(t), e && Wn(o)
    },
  }
}

function xd(e, t, o) {
  let i,
    n,
    r,
    { $$slots: a = {}, $$scope: s } = t
  const l = dr()
  let { label: c } = t,
    { hideLabel: d = !0 } = t,
    { class: u } = t,
    { name: h = 'radio-group-' + T() } = t,
    { selectedIndex: p = -1 } = t,
    { options: m = [] } = t,
    { onchange: g } = t,
    { layout: f } = t,
    { optionMapper: $ } = t,
    { optionFilter: y } = t,
    { value: b } = t,
    { optionLabelClass: x } = t,
    { title: v } = t,
    { locale: w } = t,
    { optionClass: S } = t,
    { optionGroupClass: k } = t
  const M = (e) => r.findIndex((t) => t.id === e.id),
    C = (e, t) => {
      o(0, (p = M(e)))
      const i = {
        index: p,
        ...e,
      }
      ;((e, ...t) => {
        e && e(...t)
      })(g, i, t),
        l('change', i)
    }
  return (
    (e.$$set = (e) => {
      'label' in e && o(1, (c = e.label)),
        'hideLabel' in e && o(2, (d = e.hideLabel)),
        'class' in e && o(3, (u = e.class)),
        'name' in e && o(4, (h = e.name)),
        'selectedIndex' in e && o(0, (p = e.selectedIndex)),
        'options' in e && o(15, (m = e.options)),
        'onchange' in e && o(16, (g = e.onchange)),
        'layout' in e && o(5, (f = e.layout)),
        'optionMapper' in e && o(17, ($ = e.optionMapper)),
        'optionFilter' in e && o(18, (y = e.optionFilter)),
        'value' in e && o(19, (b = e.value)),
        'optionLabelClass' in e && o(6, (x = e.optionLabelClass)),
        'title' in e && o(7, (v = e.title)),
        'locale' in e && o(20, (w = e.locale)),
        'optionClass' in e && o(8, (S = e.optionClass)),
        'optionGroupClass' in e && o(9, (k = e.optionGroupClass)),
        '$$scope' in e && o(23, (s = e.$$scope))
    }),
    (e.$$.update = () => {
      1343488 & e.$$.dirty[0] && o(10, (i = Gc(y ? m.filter(y) : m, w))),
        132096 & e.$$.dirty[0] &&
          o(
            11,
            (n = ((e = [], t) => {
              let o = 0
              return e.map(
                (e) => (
                  o++,
                  mo(e)
                    ? mo(e[1])
                      ? {
                          id: o,
                          label: e[0],
                          options: e[1].map((e) => Uc(e, ++o, t)),
                        }
                      : Uc(e, o, t)
                    : e.options
                    ? {
                        id: e.id || o,
                        label: e.label,
                        options: e.options.map((e) => Uc(e, ++o, t)),
                      }
                    : Uc(e, o, t)
                )
              )
            })(i, $))
          ),
        2048 & e.$$.dirty[0] && o(21, (r = Hc(n))),
        2654209 & e.$$.dirty[0] &&
          p < 0 &&
          (o(0, (p = r.findIndex((e) => qc(e.value, b)))),
          p < 0 && o(0, (p = ((e) => e.findIndex((e) => void 0 === e[0]))(m))))
    }),
    [
      p,
      c,
      d,
      u,
      h,
      f,
      x,
      v,
      S,
      k,
      i,
      n,
      M,
      (e) => (t) => {
        var o
        ;((o = t.key), /enter| /i.test(o)) && C(e, t)
      },
      (e) => (t) => {
        C(e, t)
      },
      m,
      g,
      $,
      y,
      b,
      w,
      r,
      a,
      s,
    ]
  )
}
class vd extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        xd,
        bd,
        xn,
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
const wd = (e) => ({}),
  Sd = (e) => ({})

function kd(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        class: 'PinturaButtonIcon',
        $$slots: {
          default: [Md],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        268435520 & o &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Md(e) {
  let t
  return {
    c() {
      t = _n('g')
    },
    m(o, i) {
      On(o, t, i), (t.innerHTML = e[6])
    },
    p(e, o) {
      64 & o && (t.innerHTML = e[6])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Cd(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c = (e[2] || e[18]) + '',
    d = e[6] && kd(e)
  return {
    c() {
      ;(t = Vn('span')),
        d && d.c(),
        (o = jn()),
        (i = Vn('span')),
        (n = Zn(c)),
        Yn(i, 'class', (r = bl(['PinturaButtonLabel', e[3], e[5] && 'implicit']))),
        Yn(t, 'slot', 'label'),
        Yn(t, 'title', (a = Xc(e[1], e[15]))),
        Yn(t, 'class', (s = bl(['PinturaButtonInner', e[4]])))
    },
    m(e, r) {
      On(e, t, r), d && d.m(t, null), Dn(t, o), Dn(t, i), Dn(i, n), (l = !0)
    },
    p(e, u) {
      e[6]
        ? d
          ? (d.p(e, u), 64 & u && Fr(d, 1))
          : ((d = kd(e)), d.c(), Fr(d, 1), d.m(t, o))
        : d &&
          (Er(),
          zr(d, 1, 1, () => {
            d = null
          }),
          Lr()),
        (!l || 262148 & u) && c !== (c = (e[2] || e[18]) + '') && qn(n, c),
        (!l || (40 & u && r !== (r = bl(['PinturaButtonLabel', e[3], e[5] && 'implicit'])))) &&
          Yn(i, 'class', r),
        (!l || (32770 & u && a !== (a = Xc(e[1], e[15])))) && Yn(t, 'title', a),
        (!l || (16 & u && s !== (s = bl(['PinturaButtonInner', e[4]])))) && Yn(t, 'class', s)
    },
    i(e) {
      l || (Fr(d), (l = !0))
    },
    o(e) {
      zr(d), (l = !1)
    },
    d(e) {
      e && Wn(t), d && d.d()
    },
  }
}

function Td(e) {
  let t,
    o,
    i = e[30].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'slot', 'group')
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      1073741824 & t && i !== (i = e[30].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Pd(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        style: S(e[13]) ? e[13](e[30].value) : e[13],
        $$slots: {
          default: [Id],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        1073750016 & o && (i.style = S(e[13]) ? e[13](e[30].value) : e[13]),
          1342177280 & o &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Id(e) {
  let t,
    o = e[30].icon + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      1073741824 & i && o !== (o = e[30].icon + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Rd(e) {
  let t,
    o,
    i = e[30].sublabel + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'class', 'PinturaDropdownOptionSublabel')
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      1073741824 & t && i !== (i = e[30].sublabel + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Ad(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c = e[30].label + '',
    d = e[30].icon && Pd(e),
    u = e[30].sublabel && Rd(e)
  return {
    c() {
      ;(t = Vn('span')),
        d && d.c(),
        (o = jn()),
        (i = Vn('span')),
        (n = Zn(c)),
        (r = jn()),
        u && u.c(),
        Yn(i, 'style', (a = S(e[14]) ? e[14](e[30].value) : e[14])),
        Yn(i, 'class', (s = bl(['PinturaDropdownOptionLabel', e[10]]))),
        Yn(t, 'slot', 'option')
    },
    m(e, a) {
      On(e, t, a),
        d && d.m(t, null),
        Dn(t, o),
        Dn(t, i),
        Dn(i, n),
        Dn(i, r),
        u && u.m(i, null),
        (l = !0)
    },
    p(e, r) {
      e[30].icon
        ? d
          ? (d.p(e, r), 1073741824 & r && Fr(d, 1))
          : ((d = Pd(e)), d.c(), Fr(d, 1), d.m(t, o))
        : d &&
          (Er(),
          zr(d, 1, 1, () => {
            d = null
          }),
          Lr()),
        (!l || 1073741824 & r) && c !== (c = e[30].label + '') && qn(n, c),
        e[30].sublabel
          ? u
            ? u.p(e, r)
            : ((u = Rd(e)), u.c(), u.m(i, null))
          : u && (u.d(1), (u = null)),
        (!l || (1073758208 & r && a !== (a = S(e[14]) ? e[14](e[30].value) : e[14]))) &&
          Yn(i, 'style', a),
        (!l || (1024 & r && s !== (s = bl(['PinturaDropdownOptionLabel', e[10]])))) &&
          Yn(i, 'class', s)
    },
    i(e) {
      l || (Fr(d), (l = !0))
    },
    o(e) {
      zr(d), (l = !1)
    },
    d(e) {
      e && Wn(t), d && d.d(), u && u.d()
    },
  }
}

function Ed(e) {
  let t, o, i, n, r, a
  const s = e[26].controls,
    l = kn(s, e, e[28], Sd)
  return (
    (i = new vd({
      props: {
        class: 'PinturaOptionsList PinturaScrollableContent',
        name: e[7],
        value: e[9],
        selectedIndex: e[8],
        optionFilter: e[11],
        optionMapper: e[12],
        optionLabelClass: bl(['PinturaDropdownOptionLabel', e[10]]),
        optionGroupClass: 'PinturaListOptionGroup',
        optionClass: 'PinturaListOption',
        options: e[16],
        onchange: e[19],
        $$slots: {
          option: [
            Ad,
            ({ option: e }) => ({
              30: e,
            }),
            ({ option: e }) => (e ? 1073741824 : 0),
          ],
          group: [
            Td,
            ({ option: e }) => ({
              30: e,
            }),
            ({ option: e }) => (e ? 1073741824 : 0),
          ],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          l && l.c(),
          (o = jn()),
          Hr(i.$$.fragment),
          Yn(t, 'slot', 'details'),
          Yn(t, 'class', 'PinturaOptionsListWrapper')
      },
      m(s, c) {
        On(s, t, c),
          l && l.m(t, null),
          Dn(t, o),
          Ur(i, t, null),
          (n = !0),
          r || ((a = Hn(t, 'keydown', e[21])), (r = !0))
      },
      p(e, t) {
        l && l.p && 268435456 & t && Cn(l, s, e, e[28], t, wd, Sd)
        const o = {}
        128 & t && (o.name = e[7]),
          512 & t && (o.value = e[9]),
          256 & t && (o.selectedIndex = e[8]),
          2048 & t && (o.optionFilter = e[11]),
          4096 & t && (o.optionMapper = e[12]),
          1024 & t && (o.optionLabelClass = bl(['PinturaDropdownOptionLabel', e[10]])),
          65536 & t && (o.options = e[16]),
          1342202880 & t &&
            (o.$$scope = {
              dirty: t,
              ctx: e,
            }),
          i.$set(o)
      },
      i(e) {
        n || (Fr(l, e), Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(l, e), zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && Wn(t), l && l.d(e), Xr(i), (r = !1), a()
      },
    }
  )
}

function Ld(e) {
  let t, o, i

  function n(t) {
    e[27](t)
  }
  let r = {
    onshow: e[20],
    buttonClass: bl(['PinturaDropdownButton', e[0], e[5] && 'PinturaDropdownIconOnly']),
    $$slots: {
      details: [Ed],
      label: [Cd],
    },
    $$scope: {
      ctx: e,
    },
  }
  return (
    void 0 !== e[17] && (r.isActive = e[17]),
    (t = new _c({
      props: r,
    })),
    gr.push(() => Nr(t, 'isActive', n)),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, [i]) {
        const n = {}
        33 & i &&
          (n.buttonClass = bl(['PinturaDropdownButton', e[0], e[5] && 'PinturaDropdownIconOnly'])),
          268828670 & i &&
            (n.$$scope = {
              dirty: i,
              ctx: e,
            }),
          !o && 131072 & i && ((o = !0), (n.isActive = e[17]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Fd(e, t, o) {
  let i,
    r,
    { $$slots: a = {}, $$scope: s } = t,
    { class: l } = t,
    { title: c } = t,
    { label: d } = t,
    { labelClass: u } = t,
    { innerClass: h } = t,
    { hideLabel: p = !1 } = t,
    { icon: m } = t,
    { name: g } = t,
    { options: f = [] } = t,
    { selectedIndex: $ = -1 } = t,
    { value: y } = t,
    { optionLabelClass: b } = t,
    { optionFilter: x } = t,
    { optionMapper: v } = t,
    { optionIconStyle: w } = t,
    { optionLabelStyle: S } = t,
    { locale: k } = t,
    { onchange: M = n } = t,
    { onload: C = n } = t,
    { ondestroy: T = n } = t
  let P
  return (
    sr(() =>
      C({
        options: f,
      })
    ),
    cr(() =>
      T({
        options: f,
      })
    ),
    (e.$$set = (e) => {
      'class' in e && o(0, (l = e.class)),
        'title' in e && o(1, (c = e.title)),
        'label' in e && o(2, (d = e.label)),
        'labelClass' in e && o(3, (u = e.labelClass)),
        'innerClass' in e && o(4, (h = e.innerClass)),
        'hideLabel' in e && o(5, (p = e.hideLabel)),
        'icon' in e && o(6, (m = e.icon)),
        'name' in e && o(7, (g = e.name)),
        'options' in e && o(22, (f = e.options)),
        'selectedIndex' in e && o(8, ($ = e.selectedIndex)),
        'value' in e && o(9, (y = e.value)),
        'optionLabelClass' in e && o(10, (b = e.optionLabelClass)),
        'optionFilter' in e && o(11, (x = e.optionFilter)),
        'optionMapper' in e && o(12, (v = e.optionMapper)),
        'optionIconStyle' in e && o(13, (w = e.optionIconStyle)),
        'optionLabelStyle' in e && o(14, (S = e.optionLabelStyle)),
        'locale' in e && o(15, (k = e.locale)),
        'onchange' in e && o(23, (M = e.onchange)),
        'onload' in e && o(24, (C = e.onload)),
        'ondestroy' in e && o(25, (T = e.ondestroy)),
        '$$scope' in e && o(28, (s = e.$$scope))
    }),
    (e.$$.update = () => {
      4227072 & e.$$.dirty && o(16, (i = k ? Gc(f, k) : f)),
        66048 & e.$$.dirty &&
          o(
            18,
            (r =
              i.reduce(
                (e, t) => {
                  if (e) return e
                  const o = Array.isArray(t) ? t : [t, t],
                    [i, n] = o
                  return qc(i, y) ? n : void 0
                },
                void 0
              ) ||
              ((e) => {
                const t = e.find((e) => void 0 === e[0])
                if (t) return t[1]
              })(i) ||
              y)
          )
    }),
    [
      l,
      c,
      d,
      u,
      h,
      p,
      m,
      g,
      $,
      y,
      b,
      x,
      v,
      w,
      S,
      k,
      i,
      P,
      r,
      (e) => {
        o(18, (r = e.value)), M(e), o(17, (P = !1))
      },
      ({ e: e, panel: t }) => {
        if (e && e.key && /up|down/i.test(e.key))
          return Rc(t.querySelector('input:not([disabled])'))
        Rc(t.querySelector('fieldset'))
      },
      (e) => {
        ;/tab/i.test(e.key) && e.preventDefault()
      },
      f,
      M,
      C,
      T,
      a,
      function (e) {
        ;(P = e), o(17, P)
      },
      s,
    ]
  )
}
class zd extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Fd, Ld, xn, {
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

function Bd(e) {
  let t
  return {
    c() {
      ;(t = Vn('div')), Yn(t, 'slot', 'details')
    },
    m(o, i) {
      On(o, t, i), e[8](t)
    },
    p: pn,
    d(o) {
      o && Wn(t), e[8](null)
    },
  }
}

function Dd(e) {
  let t, o, i

  function n(t) {
    e[9](t)
  }
  let r = {
    buttonLabel: e[0],
    buttonClass: e[1],
    $$slots: {
      details: [Bd],
    },
    $$scope: {
      ctx: e,
    },
  }
  return (
    void 0 !== e[3] && (r.isActive = e[3]),
    (t = new _c({
      props: r,
    })),
    gr.push(() => Nr(t, 'isActive', n)),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, [i]) {
        const n = {}
        1 & i && (n.buttonLabel = e[0]),
          2 & i && (n.buttonClass = e[1]),
          1028 & i &&
            (n.$$scope = {
              dirty: i,
              ctx: e,
            }),
          !o && 8 & i && ((o = !0), (n.isActive = e[3]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Od(e, t, o) {
  let { buttonLabel: i } = t,
    { buttonClass: r } = t,
    { root: a } = t,
    { ondestroy: s = n } = t
  let l,
    c = !1
  return (
    cr(s),
    (e.$$set = (e) => {
      'buttonLabel' in e && o(0, (i = e.buttonLabel)),
        'buttonClass' in e && o(1, (r = e.buttonClass)),
        'root' in e && o(4, (a = e.root)),
        'ondestroy' in e && o(5, (s = e.ondestroy))
    }),
    (e.$$.update = () => {
      20 & e.$$.dirty &&
        l &&
        a &&
        l.firstChild !== a &&
        (l.hasChildNodes() ? l.replaceChild(a, l.firstChild) : l.append(a))
    }),
    [
      i,
      r,
      l,
      c,
      a,
      s,
      () => o(3, (c = !1)),
      () => o(3, (c = !0)),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(l = e), o(2, l)
        })
      },
      function (e) {
        ;(c = e), o(3, c)
      },
    ]
  )
}
class Wd extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Od, Dd, xn, {
        buttonLabel: 0,
        buttonClass: 1,
        root: 4,
        ondestroy: 5,
        hide: 6,
        show: 7,
      })
  }
  get hide() {
    return this.$$.ctx[6]
  }
  get show() {
    return this.$$.ctx[7]
  }
}
var Vd = (e, t, o) => (e - t) / (o - t)

function _d(e) {
  let t
  return {
    c() {
      ;(t = _n('path')), Yn(t, 'd', 'M8 12 h8 M12 8 v8')
    },
    m(e, o) {
      On(e, t, o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Zd(e) {
  let t
  return {
    c() {
      ;(t = _n('path')), Yn(t, 'd', 'M9 12 h6')
    },
    m(e, o) {
      On(e, t, o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function jd(e) {
  let t, o, i, n, r, a, s, l, c, d, u, h, p, m, g, f, $, y, b
  return (
    (h = new Ul({
      props: {
        $$slots: {
          default: [_d],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    (g = new Ul({
      props: {
        $$slots: {
          default: [Zd],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          (o = Vn('div')),
          (i = Vn('input')),
          (n = jn()),
          (r = Vn('div')),
          (a = jn()),
          (s = Vn('div')),
          (l = Vn('div')),
          (d = jn()),
          (u = Vn('button')),
          Hr(h.$$.fragment),
          (p = jn()),
          (m = Vn('button')),
          Hr(g.$$.fragment),
          Yn(i, 'type', 'range'),
          Yn(i, 'id', e[3]),
          Yn(i, 'min', e[0]),
          Yn(i, 'max', e[1]),
          Yn(i, 'step', e[2]),
          (i.value = e[8]),
          Yn(r, 'class', 'PinturaSliderTrack'),
          Yn(r, 'style', e[4]),
          Yn(l, 'class', 'PinturaSliderKnob'),
          Yn(l, 'style', e[5]),
          Yn(s, 'class', 'PinturaSliderKnobController'),
          Yn(s, 'style', e[11]),
          Yn(o, 'class', 'PinturaSliderControl'),
          Yn(o, 'style', (c = '--slider-position:' + Math.round(e[9]))),
          Yn(u, 'type', 'button'),
          Yn(u, 'aria-label', 'Increase'),
          Yn(m, 'type', 'button'),
          Yn(m, 'aria-label', 'Decrease'),
          Yn(t, 'class', (f = bl(['PinturaSlider', e[7]]))),
          Yn(t, 'data-direction', e[6])
      },
      m(c, f) {
        On(c, t, f),
          Dn(t, o),
          Dn(o, i),
          e[23](i),
          Dn(o, n),
          Dn(o, r),
          Dn(o, a),
          Dn(o, s),
          Dn(s, l),
          Dn(t, d),
          Dn(t, u),
          Ur(h, u, null),
          Dn(t, p),
          Dn(t, m),
          Ur(g, m, null),
          ($ = !0),
          y ||
            ((b = [
              Hn(i, 'input', e[12]),
              Hn(i, 'nudge', e[13]),
              Rn(oc.call(null, i)),
              Hn(o, 'pointerdown', e[14]),
              Hn(u, 'pointerdown', e[15](1)),
              Hn(m, 'pointerdown', e[15](-1)),
            ]),
            (y = !0))
      },
      p(e, n) {
        ;(!$ || 8 & n[0]) && Yn(i, 'id', e[3]),
          (!$ || 1 & n[0]) && Yn(i, 'min', e[0]),
          (!$ || 2 & n[0]) && Yn(i, 'max', e[1]),
          (!$ || 4 & n[0]) && Yn(i, 'step', e[2]),
          (!$ || 256 & n[0]) && (i.value = e[8]),
          (!$ || 16 & n[0]) && Yn(r, 'style', e[4]),
          (!$ || 32 & n[0]) && Yn(l, 'style', e[5]),
          (!$ || 2048 & n[0]) && Yn(s, 'style', e[11]),
          (!$ || (512 & n[0] && c !== (c = '--slider-position:' + Math.round(e[9])))) &&
            Yn(o, 'style', c)
        const a = {}
        2048 & n[1] &&
          (a.$$scope = {
            dirty: n,
            ctx: e,
          }),
          h.$set(a)
        const d = {}
        2048 & n[1] &&
          (d.$$scope = {
            dirty: n,
            ctx: e,
          }),
          g.$set(d),
          (!$ || (128 & n[0] && f !== (f = bl(['PinturaSlider', e[7]])))) && Yn(t, 'class', f),
          (!$ || 64 & n[0]) && Yn(t, 'data-direction', e[6])
      },
      i(e) {
        $ || (Fr(h.$$.fragment, e), Fr(g.$$.fragment, e), ($ = !0))
      },
      o(e) {
        zr(h.$$.fragment, e), zr(g.$$.fragment, e), ($ = !1)
      },
      d(o) {
        o && Wn(t), e[23](null), Xr(h), Xr(g), (y = !1), yn(b)
      },
    }
  )
}

function Nd(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    { min: $ = 0 } = t,
    { max: y = 100 } = t,
    { step: b = 1 } = t,
    { id: x } = t,
    { value: v = 0 } = t,
    { trackStyle: w } = t,
    { knobStyle: S } = t,
    { onchange: k } = t,
    { onrelease: M = pn } = t,
    { direction: C = 'x' } = t,
    { getValue: T = W } = t,
    { setValue: P = W } = t,
    { class: I } = t
  const R = (e) => P(((e, t) => ((t = 1 / t), Math.round(e * t) / t))($a(e, $, y), b)),
    A = (e, t, i = {}) => {
      const { released: r = !1 } = i
      o(16, (v = R($ + (e / t) * n))), v !== f && ((f = v), k(v), r && M(v))
    }
  let E
  const L = (e) => {
      const t = e[d] - g
      A(m + t, p)
    },
    F = (e) => {
      ;(p = void 0),
        document.documentElement.removeEventListener('pointermove', L),
        document.documentElement.removeEventListener('pointerup', F),
        k(v),
        M(v)
    },
    z = () => {
      o(16, (v = R(i + D * b))), k(v)
    }
  let B,
    D = 1,
    O = !1
  const V = (e) => {
    clearTimeout(B), O || z(), M(v), document.removeEventListener('pointerup', V)
  }
  return (
    (e.$$set = (e) => {
      'min' in e && o(0, ($ = e.min)),
        'max' in e && o(1, (y = e.max)),
        'step' in e && o(2, (b = e.step)),
        'id' in e && o(3, (x = e.id)),
        'value' in e && o(16, (v = e.value)),
        'trackStyle' in e && o(4, (w = e.trackStyle)),
        'knobStyle' in e && o(5, (S = e.knobStyle)),
        'onchange' in e && o(17, (k = e.onchange)),
        'onrelease' in e && o(18, (M = e.onrelease)),
        'direction' in e && o(6, (C = e.direction)),
        'getValue' in e && o(19, (T = e.getValue)),
        'setValue' in e && o(20, (P = e.setValue)),
        'class' in e && o(7, (I = e.class))
    }),
    (e.$$.update = () => {
      589824 & e.$$.dirty[0] && o(8, (i = void 0 !== v ? T(v) : 0)),
        3 & e.$$.dirty[0] && (n = y - $),
        259 & e.$$.dirty[0] && o(9, (r = 100 * Vd(i, $, y))),
        64 & e.$$.dirty[0] && o(21, (a = C.toUpperCase())),
        64 & e.$$.dirty[0] && o(22, (s = 'x' === C ? 'Width' : 'Height')),
        4194304 & e.$$.dirty[0] && (l = 'offset' + s),
        2097152 & e.$$.dirty[0] && (c = 'offset' + a),
        2097152 & e.$$.dirty[0] && (d = 'page' + a),
        2097664 & e.$$.dirty[0] && o(11, (u = `transform: translate${a}(${r}%)`))
    }),
    [
      $,
      y,
      b,
      x,
      w,
      S,
      C,
      I,
      i,
      r,
      h,
      u,
      (e) => {
        p || (o(16, (v = P(parseFloat(e.target.value)))), v !== f && ((f = v), k(v)))
      },
      (e) => {
        const t = h[l]
        A((i / n) * t + e.detail[C], t),
          clearTimeout(E),
          (E = setTimeout(() => {
            M(v)
          }, 250))
      },
      (e) => {
        e.stopPropagation(),
          clearTimeout(E),
          (p = h[l]),
          (m = e[c]),
          (g = e[d]),
          A(m, p),
          document.documentElement.addEventListener('pointermove', L),
          document.documentElement.addEventListener('pointerup', F)
      },
      (e) => (t) => {
        clearTimeout(E),
          (D = e),
          (O = !1),
          (B = setInterval(() => {
            ;(O = !0), z()
          }, 100)),
          document.addEventListener('pointercancel', V),
          document.addEventListener('pointerup', V)
      },
      v,
      k,
      M,
      T,
      P,
      a,
      s,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(h = e), o(10, h)
        })
      },
    ]
  )
}
class Hd extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        Nd,
        jd,
        xn,
        {
          min: 0,
          max: 1,
          step: 2,
          id: 3,
          value: 16,
          trackStyle: 4,
          knobStyle: 5,
          onchange: 17,
          onrelease: 18,
          direction: 6,
          getValue: 19,
          setValue: 20,
          class: 7,
        },
        [-1, -1]
      )
  }
}

function Ud(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        class: 'PinturaButtonIcon',
        $$slots: {
          default: [Xd],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        524292 & o &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Xd(e) {
  let t
  return {
    c() {
      t = _n('g')
    },
    m(o, i) {
      On(o, t, i), (t.innerHTML = e[2])
    },
    p(e, o) {
      4 & o && (t.innerHTML = e[2])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Yd(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c = e[2] && Ud(e)
  return {
    c() {
      ;(t = Vn('span')),
        c && c.c(),
        (o = jn()),
        (i = Vn('span')),
        (n = Zn(e[8])),
        Yn(i, 'class', (r = bl(['PinturaButtonLabel', e[3], e[5] && 'implicit']))),
        Yn(t, 'slot', 'label'),
        Yn(t, 'title', (a = Xc(e[1], e[6]))),
        Yn(t, 'class', (s = bl(['PinturaButtonInner', e[4]])))
    },
    m(e, r) {
      On(e, t, r), c && c.m(t, null), Dn(t, o), Dn(t, i), Dn(i, n), (l = !0)
    },
    p(e, d) {
      e[2]
        ? c
          ? (c.p(e, d), 4 & d && Fr(c, 1))
          : ((c = Ud(e)), c.c(), Fr(c, 1), c.m(t, o))
        : c &&
          (Er(),
          zr(c, 1, 1, () => {
            c = null
          }),
          Lr()),
        (!l || 256 & d) && qn(n, e[8]),
        (!l || (40 & d && r !== (r = bl(['PinturaButtonLabel', e[3], e[5] && 'implicit'])))) &&
          Yn(i, 'class', r),
        (!l || (66 & d && a !== (a = Xc(e[1], e[6])))) && Yn(t, 'title', a),
        (!l || (16 & d && s !== (s = bl(['PinturaButtonInner', e[4]])))) && Yn(t, 'class', s)
    },
    i(e) {
      l || (Fr(c), (l = !0))
    },
    o(e) {
      zr(c), (l = !1)
    },
    d(e) {
      e && Wn(t), c && c.d()
    },
  }
}

function Gd(e) {
  let t, o, i, n, r
  const a = [
    e[11],
    {
      value: e[7],
    },
    {
      onchange: e[10],
    },
  ]
  let s = {}
  for (let e = 0; e < a.length; e += 1) s = gn(s, a[e])
  return (
    (o = new Hd({
      props: s,
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'slot', 'details')
      },
      m(a, s) {
        On(a, t, s), Ur(o, t, null), (i = !0), n || ((r = Hn(t, 'keydown', e[9])), (n = !0))
      },
      p(e, t) {
        const i =
          3200 & t
            ? Zr(a, [
                2048 & t && jr(e[11]),
                128 & t && {
                  value: e[7],
                },
                1024 & t && {
                  onchange: e[10],
                },
              ])
            : {}
        o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), (n = !1), r()
      },
    }
  )
}

function qd(e) {
  let t, o
  return (
    (t = new _c({
      props: {
        panelClass: 'PinturaSliderPanel',
        buttonClass: bl(['PinturaSliderButton', e[0], e[5] && 'PinturaSliderIconOnly']),
        $$slots: {
          details: [Gd],
          label: [Yd],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, [o]) {
        const i = {}
        33 & o &&
          (i.buttonClass = bl(['PinturaSliderButton', e[0], e[5] && 'PinturaSliderIconOnly'])),
          526846 & o &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Kd(e, t, o) {
  const i = [
    'class',
    'title',
    'label',
    'icon',
    'labelClass',
    'innerClass',
    'hideLabel',
    'locale',
    'value',
    'onchange',
  ]
  let r = Pn(t, i),
    { class: a } = t,
    { title: s } = t,
    { label: l = Math.round } = t,
    { icon: c } = t,
    { labelClass: d } = t,
    { innerClass: u } = t,
    { hideLabel: h = !1 } = t,
    { locale: p } = t,
    { value: m } = t,
    { onchange: g = n } = t
  const { min: f, max: $, getValue: y = W } = r
  let b
  const x = (e) => o(8, (b = ((e) => (S(l) ? l(y(e), f, $) : l))(e)))
  return (
    (e.$$set = (e) => {
      ;(t = gn(gn({}, t), Tn(e))),
        o(11, (r = Pn(t, i))),
        'class' in e && o(0, (a = e.class)),
        'title' in e && o(1, (s = e.title)),
        'label' in e && o(12, (l = e.label)),
        'icon' in e && o(2, (c = e.icon)),
        'labelClass' in e && o(3, (d = e.labelClass)),
        'innerClass' in e && o(4, (u = e.innerClass)),
        'hideLabel' in e && o(5, (h = e.hideLabel)),
        'locale' in e && o(6, (p = e.locale)),
        'value' in e && o(7, (m = e.value)),
        'onchange' in e && o(13, (g = e.onchange))
    }),
    (e.$$.update = () => {
      128 & e.$$.dirty && x(m)
    }),
    [
      a,
      s,
      c,
      d,
      u,
      h,
      p,
      m,
      b,
      (e) => {
        ;/tab/i.test(e.key) && e.preventDefault()
      },
      (e) => {
        x(e), g(e)
      },
      r,
      l,
      g,
    ]
  )
}
class Jd extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Kd, qd, xn, {
        class: 0,
        title: 1,
        label: 12,
        icon: 2,
        labelClass: 3,
        innerClass: 4,
        hideLabel: 5,
        locale: 6,
        value: 7,
        onchange: 13,
      })
  }
}

function Qd(e, t, o) {
  const i = e.slice()
  return (i[7] = t[o][0]), (i[8] = t[o][1]), (i[9] = t[o][2]), (i[0] = t[o][3]), i
}

function eu(e) {
  let t, o, i
  const n = [e[9]]
  var r = e[1][e[7]] || e[7]

  function a(e) {
    let t = {}
    for (let e = 0; e < n.length; e += 1) t = gn(t, n[e])
    return {
      props: t,
    }
  }
  return (
    r && (t = new r(a())),
    {
      c() {
        t && Hr(t.$$.fragment), (o = Nn())
      },
      m(e, n) {
        t && Ur(t, e, n), On(e, o, n), (i = !0)
      },
      p(e, i) {
        const s = 1 & i ? Zr(n, [jr(e[9])]) : {}
        if (r !== (r = e[1][e[7]] || e[7])) {
          if (t) {
            Er()
            const e = t
            zr(e.$$.fragment, 1, 0, () => {
              Xr(e, 1)
            }),
              Lr()
          }
          r
            ? ((t = new r(a())), Hr(t.$$.fragment), Fr(t.$$.fragment, 1), Ur(t, o.parentNode, o))
            : (t = null)
        } else r && t.$set(s)
      },
      i(e) {
        i || (t && Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        t && zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(o), t && Xr(t, e)
      },
    }
  )
}

function tu(e) {
  let t, o
  return (
    (t = new Cc({
      props: {
        name: e[7],
        attributes: e[2](e[9]),
        $$slots: {
          default: [ru],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        1 & o && (i.name = e[7]),
          1 & o && (i.attributes = e[2](e[9])),
          4097 & o &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function ou(e) {
  let t,
    o,
    i = e[9].innerHTML + ''
  return {
    c() {
      ;(o = Nn()), (t = new Qn(o))
    },
    m(e, n) {
      t.m(i, e, n), On(e, o, n)
    },
    p(e, o) {
      1 & o && i !== (i = e[9].innerHTML + '') && t.p(i)
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(o), e && t.d()
    },
  }
}

function iu(e) {
  let t,
    o = e[9].textContent + ''
  return {
    c() {
      t = Zn(o)
    },
    m(e, o) {
      On(e, t, o)
    },
    p(e, i) {
      1 & i && o !== (o = e[9].textContent + '') && qn(t, o)
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t)
    },
  }
}

function nu(e) {
  let t, o
  return (
    (t = new cu({
      props: {
        items: e[0],
        discardEmptyItems: !0,
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        1 & o && (i.items = e[0]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function ru(e) {
  let t, o, i, n
  const r = [nu, iu, ou],
    a = []

  function s(e, t) {
    return e[0] && e[0].length ? 0 : e[9].textContent ? 1 : e[9].innerHTML ? 2 : -1
  }
  return (
    ~(t = s(e)) && (o = a[t] = r[t](e)),
    {
      c() {
        o && o.c(), (i = jn())
      },
      m(e, o) {
        ~t && a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, n) {
        let l = t
        ;(t = s(e)),
          t === l
            ? ~t && a[t].p(e, n)
            : (o &&
                (Er(),
                zr(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Lr()),
              ~t
                ? ((o = a[t]),
                  o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
                  Fr(o, 1),
                  o.m(i.parentNode, i))
                : (o = null))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        ~t && a[t].d(e), e && Wn(i)
      },
    }
  )
}

function au(e, t) {
  let o, i, n, r, a, s
  const l = [tu, eu],
    c = []

  function d(e, t) {
    return 1 & t && (i = !e[3](e[7])), i ? 0 : 1
  }
  return (
    (n = d(t, -1)),
    (r = c[n] = l[n](t)),
    {
      key: e,
      first: null,
      c() {
        ;(o = Nn()), r.c(), (a = Nn()), (this.first = o)
      },
      m(e, t) {
        On(e, o, t), c[n].m(e, t), On(e, a, t), (s = !0)
      },
      p(e, o) {
        let i = n
        ;(n = d((t = e), o)),
          n === i
            ? c[n].p(t, o)
            : (Er(),
              zr(c[i], 1, 1, () => {
                c[i] = null
              }),
              Lr(),
              (r = c[n]),
              r ? r.p(t, o) : ((r = c[n] = l[n](t)), r.c()),
              Fr(r, 1),
              r.m(a.parentNode, a))
      },
      i(e) {
        s || (Fr(r), (s = !0))
      },
      o(e) {
        zr(r), (s = !1)
      },
      d(e) {
        e && Wn(o), c[n].d(e), e && Wn(a)
      },
    }
  )
}

function su(e) {
  let t,
    o,
    i = [],
    n = new Map(),
    r = e[0]
  const a = (e) => e[8]
  for (let t = 0; t < r.length; t += 1) {
    let o = Qd(e, r, t),
      s = a(o)
    n.set(s, (i[t] = au(s, o)))
  }
  return {
    c() {
      for (let e = 0; e < i.length; e += 1) i[e].c()
      t = Nn()
    },
    m(e, n) {
      for (let t = 0; t < i.length; t += 1) i[t].m(e, n)
      On(e, t, n), (o = !0)
    },
    p(e, [o]) {
      15 & o && ((r = e[0]), Er(), (i = _r(i, o, a, 1, e, r, n, t.parentNode, Vr, au, t, Qd)), Lr())
    },
    i(e) {
      if (!o) {
        for (let e = 0; e < r.length; e += 1) Fr(i[e])
        o = !0
      }
    },
    o(e) {
      for (let e = 0; e < i.length; e += 1) zr(i[e])
      o = !1
    },
    d(e) {
      for (let t = 0; t < i.length; t += 1) i[t].d(e)
      e && Wn(t)
    },
  }
}

function lu(e, t, o) {
  let i,
    { items: n } = t,
    { discardEmptyItems: r = !0 } = t
  const a = {
      Button: Ql,
      Dropdown: zd,
      Panel: Wd,
      Slider: Jd,
    },
    s = (e) => !w(e) || !!a[e],
    l = (e) => {
      if (!e) return !1
      const [t, , o, i = []] = e
      return !!s(t) || i.some(l) || o.textContent || o.innerHTML
    }
  return (
    (e.$$set = (e) => {
      'items' in e && o(4, (n = e.items)),
        'discardEmptyItems' in e && o(5, (r = e.discardEmptyItems))
    }),
    (e.$$.update = () => {
      48 & e.$$.dirty && o(0, (i = (n && r ? n.filter(l) : n) || []))
    }),
    [
      i,
      a,
      (e = {}) => {
        const { textContent: t, innerHTML: o, ...i } = e
        return i
      },
      s,
      n,
      r,
    ]
  )
}
class cu extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, lu, su, xn, {
        items: 4,
        discardEmptyItems: 5,
      })
  }
}
const du = ['aspectRatio', 'isRotatedSideways', 'flip', 'cropSize'],
  uu = Ma.map(([e]) => e).filter((e) => !du.includes(e))
var hu = (e, t) =>
    new CustomEvent('ping', {
      detail: {
        type: e,
        data: t,
      },
      cancelable: !0,
      bubbles: !0,
    }),
  pu = (e) =>
    ((e) => /textarea/i.test(e.nodeName))(e) ||
    ((e) => /date|email|number|search|text|url/.test(e.type))(e) ||
    e.isContentEditable,
  mu = (e, t) =>
    (t ? Vs(e, t) : e)
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase(),
  gu = (e, t = W) => {
    const { subscribe: o, set: i } = Jr(void 0)
    return {
      subscribe: o,
      destroy: ((e, t) => {
        const o = matchMedia(e)
        return (
          o.addListener(t),
          t(o),
          {
            get matches() {
              return o.matches
            },
            destroy: () => o.removeListener(t),
          }
        )
      })(e, ({ matches: e }) => i(t(e))).destroy,
    }
  },
  fu = (e, t, o) =>
    new Promise((i, n) => {
      ;(async () => {
        const r = await t.read(e),
          a = (e) =>
            R(e, o)
              .then((e) => t.apply(e, r))
              .then(i)
              .catch(n)
        if (C(e) || !M() || Lt() || Gt()) return a(e)
        let s
        try {
          s = await I(
            (e, t) =>
              createImageBitmap(e)
                .then((e) => t(null, e))
                .catch(t),
            [e]
          )
        } catch (e) {}
        s && s.width
          ? (await u())
            ? c() && window.chrome && r > 1
              ? i(await (async (e) => h(await $(e)))(s))
              : i(s)
            : i(t.apply(s, r))
          : a(e)
      })()
    }),
  $u = (e, t) =>
    new Promise(async (o) => {
      if (e.width < t.width && e.height < t.height) return o(e)
      const i = Math.min(t.width / e.width, t.height / e.height),
        n = i * e.width,
        r = i * e.height,
        a = p('canvas', {
          width: n,
          height: r,
        }),
        s = a.getContext('2d'),
        l = f(e) ? await $(e) : e
      s.drawImage(l, 0, 0, n, r), o(h(a))
    }),
  yu = (e) => (
    (e = e.trim()),
    /^rgba/.test(e)
      ? e
          .substr(5)
          .split(',')
          .map(parseFloat)
          .map((e, t) => e / (3 === t ? 1 : 255))
      : /^rgb/.test(e)
      ? e
          .substr(4)
          .split(',')
          .map(parseFloat)
          .map((e) => e / 255)
      : /^#/.test(e)
      ? ((e) => {
          const [, t, o, i] = e.split('')
          e = 4 === e.length ? `#${t}${t}${o}${o}${i}${i}` : e
          const [, n, r, a] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
          return [n, r, a].map((e) => parseInt(e, 16) / 255)
        })(e)
      : /[0-9]{1,3}\s?,\s?[0-9]{1,3}\s?,\s?[0-9]{1,3}/.test(e)
      ? e
          .split(',')
          .map((e) => parseInt(e, 10))
          .map((e) => e / 255)
      : void 0
  )
let bu = null
var xu = () => {
  if (null === bu) {
    let e = p('canvas')
    ;(bu = !!Bs(e)), g(e), (e = void 0)
  }
  return bu
}
const vu = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  wu = {
    precision: 1e-4,
  },
  Su = {
    precision: 0.01 * wu.precision,
  }
var ku = () => {
    const e = [],
      t = [],
      o = [],
      i = () => {
        t.forEach((e) => e(o))
      },
      n = (t) => {
        ;(t.unsub = t.subscribe((n) =>
          ((t, n) => {
            const r = e.indexOf(t)
            r < 0 || ((o[r] = n), i())
          })(t, n)
        )),
          i()
      }
    return {
      get length() {
        return e.length
      },
      clear: () => {
        e.forEach((e) => e.unsub()), (e.length = 0), (o.length = 0)
      },
      unshift: (t) => {
        e.unshift(t), n(t)
      },
      get: (t) => e[t],
      push: (t) => {
        e.push(t), n(t)
      },
      remove: (t) => {
        t.unsub()
        const i = e.indexOf(t)
        e.splice(i, 1), o.splice(i, 1)
      },
      forEach: (t) => e.forEach(t),
      filter: (t) => e.filter(t),
      subscribe: (e) => (
        t.push(e),
        () => {
          t.splice(t.indexOf(e), 1)
        }
      ),
    }
  },
  Mu = (e) => e[0] < 0.25 && e[1] < 0.25 && e[2] < 0.25,
  Cu = (e = {}) =>
    new Promise((t) => {
      const { accept: o = 'image/*' } = e,
        i = p('input', {
          style: 'position:absolute;visibility:hidden;width:0;height:0;',
          type: 'file',
          accept: o,
        }),
        n = () => {
          const [e] = i.files
          i.parentNode && i.remove(), i.removeEventListener('change', n), t(e)
        }
      i.addEventListener('change', n), Gt() && document.body.append(i), i.click()
    }),
  Tu = (e) => {
    try {
      return e()
    } catch (e) {
      console.error(e)
    }
  }
const { window: Pu } = Or

function Iu(e) {
  let t,
    o,
    i,
    n = e[30] && Ru(e),
    r = e[31] && Wu(e)
  return {
    c() {
      n && n.c(), (t = jn()), r && r.c(), (o = Nn())
    },
    m(e, a) {
      n && n.m(e, a), On(e, t, a), r && r.m(e, a), On(e, o, a), (i = !0)
    },
    p(e, i) {
      e[30]
        ? n
          ? (n.p(e, i), 1073741824 & i[0] && Fr(n, 1))
          : ((n = Ru(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
        : n &&
          (Er(),
          zr(n, 1, 1, () => {
            n = null
          }),
          Lr()),
        e[31]
          ? r
            ? (r.p(e, i), 1 & i[1] && Fr(r, 1))
            : ((r = Wu(e)), r.c(), Fr(r, 1), r.m(o.parentNode, o))
          : r &&
            (Er(),
            zr(r, 1, 1, () => {
              r = null
            }),
            Lr())
    },
    i(e) {
      i || (Fr(n), Fr(r), (i = !0))
    },
    o(e) {
      zr(n), zr(r), (i = !1)
    },
    d(e) {
      n && n.d(e), e && Wn(t), r && r.d(e), e && Wn(o)
    },
  }
}

function Ru(e) {
  let t, o, i, n, r, a
  const s = [Eu, Au],
    l = []

  function c(e, t) {
    return e[27] ? 0 : e[14] ? 1 : -1
  }
  return (
    ~(i = c(e)) && (n = l[i] = s[i](e)),
    {
      c() {
        ;(t = Vn('div')),
          (o = Vn('p')),
          n && n.c(),
          Yn(o, 'style', e[51]),
          Yn(t, 'class', 'PinturaStatus'),
          Yn(t, 'style', (r = 'opacity: ' + e[29]))
      },
      m(e, n) {
        On(e, t, n), Dn(t, o), ~i && l[i].m(o, null), (a = !0)
      },
      p(e, d) {
        let u = i
        ;(i = c(e)),
          i === u
            ? ~i && l[i].p(e, d)
            : (n &&
                (Er(),
                zr(l[u], 1, 1, () => {
                  l[u] = null
                }),
                Lr()),
              ~i
                ? ((n = l[i]),
                  n ? n.p(e, d) : ((n = l[i] = s[i](e)), n.c()),
                  Fr(n, 1),
                  n.m(o, null))
                : (n = null)),
          (!a || 1048576 & d[1]) && Yn(o, 'style', e[51]),
          (!a || (536870912 & d[0] && r !== (r = 'opacity: ' + e[29]))) && Yn(t, 'style', r)
      },
      i(e) {
        a || (Fr(n), (a = !0))
      },
      o(e) {
        zr(n), (a = !1)
      },
      d(e) {
        e && Wn(t), ~i && l[i].d()
      },
    }
  )
}

function Au(e) {
  let t, o, i, n
  t = new mc({
    props: {
      text: e[14].text || '',
      onmeasure: e[142],
    },
  })
  let r = e[14].aside && Lu(e)
  return {
    c() {
      Hr(t.$$.fragment), (o = jn()), r && r.c(), (i = Nn())
    },
    m(e, a) {
      Ur(t, e, a), On(e, o, a), r && r.m(e, a), On(e, i, a), (n = !0)
    },
    p(e, o) {
      const n = {}
      16384 & o[0] && (n.text = e[14].text || ''),
        t.$set(n),
        e[14].aside
          ? r
            ? (r.p(e, o), 16384 & o[0] && Fr(r, 1))
            : ((r = Lu(e)), r.c(), Fr(r, 1), r.m(i.parentNode, i))
          : r &&
            (Er(),
            zr(r, 1, 1, () => {
              r = null
            }),
            Lr())
    },
    i(e) {
      n || (Fr(t.$$.fragment, e), Fr(r), (n = !0))
    },
    o(e) {
      zr(t.$$.fragment, e), zr(r), (n = !1)
    },
    d(e) {
      Xr(t, e), e && Wn(o), r && r.d(e), e && Wn(i)
    },
  }
}

function Eu(e) {
  let t, o, i, n
  return (
    (t = new mc({
      props: {
        text: e[27],
        onmeasure: e[142],
      },
    })),
    (i = new xc({
      props: {
        class: 'PinturaStatusIcon',
        offset: e[57],
        opacity: e[58],
        $$slots: {
          default: [Ou],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment), (o = jn()), Hr(i.$$.fragment)
      },
      m(e, r) {
        Ur(t, e, r), On(e, o, r), Ur(i, e, r), (n = !0)
      },
      p(e, o) {
        const n = {}
        134217728 & o[0] && (n.text = e[27]), t.$set(n)
        const r = {}
        67108864 & o[1] && (r.offset = e[57]),
          134217728 & o[1] && (r.opacity = e[58]),
          (4 & o[0]) | (262144 & o[13]) &&
            (r.$$scope = {
              dirty: o,
              ctx: e,
            }),
          i.$set(r)
      },
      i(e) {
        n || (Fr(t.$$.fragment, e), Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        Xr(t, e), e && Wn(o), Xr(i, e)
      },
    }
  )
}

function Lu(e) {
  let t, o
  return (
    (t = new xc({
      props: {
        class: 'PinturaStatusButton',
        offset: e[57],
        opacity: e[58],
        $$slots: {
          default: [Bu],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        67108864 & o[1] && (i.offset = e[57]),
          134217728 & o[1] && (i.opacity = e[58]),
          (16384 & o[0]) | (262144 & o[13]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Fu(e) {
  let t, o
  return (
    (t = new $c({
      props: {
        progress: e[14].progressIndicator.progress,
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        16384 & o[0] && (i.progress = e[14].progressIndicator.progress), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function zu(e) {
  let t, o
  const i = [
    e[14].closeButton,
    {
      hideLabel: !0,
    },
  ]
  let n = {}
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Ql({
      props: n,
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n = 16384 & o[0] ? Zr(i, [jr(e[14].closeButton), i[1]]) : {}
        t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Bu(e) {
  let t,
    o,
    i,
    n = e[14].progressIndicator.visible && Fu(e),
    r = e[14].closeButton && e[14].text && zu(e)
  return {
    c() {
      n && n.c(), (t = jn()), r && r.c(), (o = Nn())
    },
    m(e, a) {
      n && n.m(e, a), On(e, t, a), r && r.m(e, a), On(e, o, a), (i = !0)
    },
    p(e, i) {
      e[14].progressIndicator.visible
        ? n
          ? (n.p(e, i), 16384 & i[0] && Fr(n, 1))
          : ((n = Fu(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
        : n &&
          (Er(),
          zr(n, 1, 1, () => {
            n = null
          }),
          Lr()),
        e[14].closeButton && e[14].text
          ? r
            ? (r.p(e, i), 16384 & i[0] && Fr(r, 1))
            : ((r = zu(e)), r.c(), Fr(r, 1), r.m(o.parentNode, o))
          : r &&
            (Er(),
            zr(r, 1, 1, () => {
              r = null
            }),
            Lr())
    },
    i(e) {
      i || (Fr(n), Fr(r), (i = !0))
    },
    o(e) {
      zr(n), zr(r), (i = !1)
    },
    d(e) {
      n && n.d(e), e && Wn(t), r && r.d(e), e && Wn(o)
    },
  }
}

function Du(e) {
  let t,
    o = e[2].iconSupportError + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      4 & i[0] && o !== (o = e[2].iconSupportError + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Ou(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [Du],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(4 & o[0]) | (262144 & o[13]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Wu(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c,
    d = e[6] && Vu(e),
    u = e[19] && e[17] && _u(e)
  const h = [Uu, Hu],
    p = []

  function m(e, t) {
    return e[19] ? 0 : 1
  }
  return (
    (i = m(e)),
    (n = p[i] = h[i](e)),
    (a = new yl({
      props: {
        isAnimated: e[21],
        pixelRatio: e[60],
        textPixelRatio: e[7],
        backgroundColor: e[23],
        maskRect: e[22],
        maskOpacity: e[50] ? e[50].maskOpacity : 1,
        maskFrameOpacity: 0.95,
        images: e[26],
        interfaceImages: e[61],
        loadImageData: e[9],
        willRequest: e[41] || e[62],
        willRender: e[295],
        didRender: e[296],
      },
    })),
    {
      c() {
        d && d.c(),
          (t = jn()),
          u && u.c(),
          (o = jn()),
          n.c(),
          (r = jn()),
          Hr(a.$$.fragment),
          (s = jn()),
          (l = Vn('div')),
          Yn(l, 'class', 'PinturaRootPortal')
      },
      m(n, h) {
        d && d.m(n, h),
          On(n, t, h),
          u && u.m(n, h),
          On(n, o, h),
          p[i].m(n, h),
          On(n, r, h),
          Ur(a, n, h),
          On(n, s, h),
          On(n, l, h),
          e[297](l),
          (c = !0)
      },
      p(e, s) {
        e[6]
          ? d
            ? (d.p(e, s), 64 & s[0] && Fr(d, 1))
            : ((d = Vu(e)), d.c(), Fr(d, 1), d.m(t.parentNode, t))
          : d &&
            (Er(),
            zr(d, 1, 1, () => {
              d = null
            }),
            Lr()),
          e[19] && e[17]
            ? u
              ? (u.p(e, s), 655360 & s[0] && Fr(u, 1))
              : ((u = _u(e)), u.c(), Fr(u, 1), u.m(o.parentNode, o))
            : u &&
              (Er(),
              zr(u, 1, 1, () => {
                u = null
              }),
              Lr())
        let l = i
        ;(i = m(e)),
          i === l
            ? p[i].p(e, s)
            : (Er(),
              zr(p[l], 1, 1, () => {
                p[l] = null
              }),
              Lr(),
              (n = p[i]),
              n ? n.p(e, s) : ((n = p[i] = h[i](e)), n.c()),
              Fr(n, 1),
              n.m(r.parentNode, r))
        const c = {}
        2097152 & s[0] && (c.isAnimated = e[21]),
          536870912 & s[1] && (c.pixelRatio = e[60]),
          128 & s[0] && (c.textPixelRatio = e[7]),
          8388608 & s[0] && (c.backgroundColor = e[23]),
          4194304 & s[0] && (c.maskRect = e[22]),
          524288 & s[1] && (c.maskOpacity = e[50] ? e[50].maskOpacity : 1),
          67108864 & s[0] && (c.images = e[26]),
          1073741824 & s[1] && (c.interfaceImages = e[61]),
          512 & s[0] && (c.loadImageData = e[9]),
          (1024 & s[1]) | (1 & s[2]) && (c.willRequest = e[41] || e[62]),
          (32800 & s[0]) | (30 & s[1]) | (2 & s[2]) && (c.willRender = e[295]),
          960 & s[1] && (c.didRender = e[296]),
          a.$set(c)
      },
      i(e) {
        c || (Fr(d), Fr(u), Fr(n), Fr(a.$$.fragment, e), (c = !0))
      },
      o(e) {
        zr(d), zr(u), zr(n), zr(a.$$.fragment, e), (c = !1)
      },
      d(n) {
        d && d.d(n),
          n && Wn(t),
          u && u.d(n),
          n && Wn(o),
          p[i].d(n),
          n && Wn(r),
          Xr(a, n),
          n && Wn(s),
          n && Wn(l),
          e[297](null)
      },
    }
  )
}

function Vu(e) {
  let t, o, i, n, r
  return (
    (o = new cu({
      props: {
        items: e[54],
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'class', 'PinturaNav PinturaNavTools')
      },
      m(a, s) {
        On(a, t, s),
          Ur(o, t, null),
          (i = !0),
          n || ((r = [Hn(t, 'measure', e[280]), Rn(Rs.call(null, t))]), (n = !0))
      },
      p(e, t) {
        const i = {}
        8388608 & t[1] && (i.items = e[54]), o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), (n = !1), yn(r)
      },
    }
  )
}

function _u(e) {
  let t, o, i
  return (
    (o = new dc({
      props: {
        elasticity: e[4] * qu,
        scrollDirection: e[48] ? 'y' : 'x',
        $$slots: {
          default: [Nu],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'class', 'PinturaNav PinturaNavMain')
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, t) {
        const i = {}
        16 & t[0] && (i.elasticity = e[4] * qu),
          131072 & t[1] && (i.scrollDirection = e[48] ? 'y' : 'x'),
          (1048576 & t[0]) | (24576 & t[1]) | (262144 & t[13]) &&
            (i.$$scope = {
              dirty: t,
              ctx: e,
            }),
          o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function Zu(e) {
  let t,
    o = e[420].icon + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      131072 & i[13] && o !== (o = e[420].icon + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function ju(e) {
  let t,
    o,
    i,
    n,
    r,
    a = e[420].label + ''
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [Zu],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment), (o = jn()), (i = Vn('span')), (n = Zn(a))
      },
      m(e, a) {
        Ur(t, e, a), On(e, o, a), On(e, i, a), Dn(i, n), (r = !0)
      },
      p(e, o) {
        const i = {}
        393216 & o[13] &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i),
          (!r || 131072 & o[13]) && a !== (a = e[420].label + '') && qn(n, a)
      },
      i(e) {
        r || (Fr(t.$$.fragment, e), (r = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (r = !1)
      },
      d(e) {
        Xr(t, e), e && Wn(o), e && Wn(i)
      },
    }
  )
}

function Nu(e) {
  let t, o
  const i = [
    e[44],
    {
      tabs: e[45],
    },
  ]
  let n = {
    $$slots: {
      default: [
        ju,
        ({ tab: e }) => ({
          420: e,
        }),
        ({ tab: e }) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, e ? 131072 : 0],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Tl({
      props: n,
    })),
    t.$on('select', e[281]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n =
          24576 & o[1]
            ? Zr(i, [
                8192 & o[1] && jr(e[44]),
                16384 & o[1] && {
                  tabs: e[45],
                },
              ])
            : {}
        393216 & o[13] &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Hu(e) {
  let t, o, i

  function n(t) {
    e[290](t)
  }
  let r = {
    class: 'PinturaMain',
    content: { ...e[24].find(e[289]), props: e[8][e[20]] },
    locale: e[2],
    stores: e[132],
  }
  return (
    void 0 !== e[0][e[20]] && (r.component = e[0][e[20]]),
    (t = new jl({
      props: r,
    })),
    gr.push(() => Nr(t, 'component', n)),
    t.$on('measure', e[291]),
    t.$on('show', e[292]),
    t.$on('hide', e[293]),
    t.$on('fade', e[294]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, i) {
        const n = {}
        17826048 & i[0] && (n.content = { ...e[24].find(e[289]), props: e[8][e[20]] }),
          4 & i[0] && (n.locale = e[2]),
          !o && 1048577 & i[0] && ((o = !0), (n.component = e[0][e[20]]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Uu(e) {
  let t, o
  const i = [
    {
      class: 'PinturaMain',
    },
    {
      visible: e[36],
    },
    e[44],
    {
      panels: e[46],
    },
  ]
  let n = {
    $$slots: {
      default: [
        Xu,
        ({ panel: e, panelIsActive: t }) => ({
          418: e,
          419: t,
        }),
        ({ panel: e, panelIsActive: t }) => [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          (e ? 32768 : 0) | (t ? 65536 : 0),
        ],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Wl({
      props: n,
    })),
    t.$on('measure', e[288]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n =
          40992 & o[1]
            ? Zr(i, [
                i[0],
                32 & o[1] && {
                  visible: e[36],
                },
                8192 & o[1] && jr(e[44]),
                32768 & o[1] && {
                  panels: e[46],
                },
              ])
            : {}
        ;(50331909 & o[0]) | (2080 & o[1]) | (360448 & o[13]) &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Xu(e) {
  let t, o, i

  function n(...t) {
    return e[282](e[418], ...t)
  }

  function r(t) {
    e[283](t, e[418])
  }
  let a = {
    content: { ...e[24].find(n), props: e[8][e[418]] },
    locale: e[2],
    isActive: e[419],
    stores: e[132],
  }
  return (
    void 0 !== e[0][e[418]] && (a.component = e[0][e[418]]),
    (t = new jl({
      props: a,
    })),
    gr.push(() => Nr(t, 'component', r)),
    t.$on('measure', e[284]),
    t.$on('show', function () {
      return e[285](e[418])
    }),
    t.$on('hide', function () {
      return e[286](e[418])
    }),
    t.$on('fade', function (...t) {
      return e[287](e[418], ...t)
    }),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(i, r) {
        e = i
        const a = {}
        ;(16777472 & r[0]) | (32768 & r[13]) &&
          (a.content = { ...e[24].find(n), props: e[8][e[418]] }),
          4 & r[0] && (a.locale = e[2]),
          65536 & r[13] && (a.isActive = e[419]),
          !o &&
            (1 & r[0]) | (32768 & r[13]) &&
            ((o = !0), (a.component = e[0][e[418]]), Sr(() => (o = !1))),
          t.$set(a)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Yu(e) {
  let t, o
  return {
    c() {
      ;(t = Vn('span')),
        Yn(t, 'class', 'PinturaEditorOverlay'),
        Yn(t, 'style', (o = 'opacity:' + e[64]))
    },
    m(e, o) {
      On(e, t, o)
    },
    p(e, i) {
      4 & i[2] && o !== (o = 'opacity:' + e[64]) && Yn(t, 'style', o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Gu(e) {
  let t, o, i, r, a
  wr(e[279])
  let s = e[55] && Iu(e),
    l = e[64] > 0 && Yu(e)
  return {
    c() {
      ;(t = Vn('div')),
        s && s.c(),
        (o = jn()),
        l && l.c(),
        Yn(t, 'id', e[3]),
        Yn(t, 'class', e[47]),
        Yn(t, 'data-env', e[49])
    },
    m(c, d) {
      On(c, t, d),
        s && s.m(t, null),
        Dn(t, o),
        l && l.m(t, null),
        e[298](t),
        (i = !0),
        r ||
          ((a = [
            Hn(Pu, 'keydown', e[145]),
            Hn(Pu, 'keyup', e[146]),
            Hn(Pu, 'blur', e[147]),
            Hn(Pu, 'paste', e[151]),
            Hn(Pu, 'resize', e[279]),
            Hn(t, 'ping', function () {
              bn(e[56]) && e[56].apply(this, arguments)
            }),
            Hn(t, 'contextmenu', e[148]),
            Hn(t, 'touchstart', e[143], {
              passive: !1,
            }),
            Hn(t, 'touchmove', function () {
              bn(e[52]) && e[52].apply(this, arguments)
            }),
            Hn(t, 'pointermove', function () {
              bn(e[53]) && e[53].apply(this, arguments)
            }),
            Hn(t, 'transitionend', e[133]),
            Hn(t, 'dropfiles', e[149]),
            Hn(t, 'measure', e[299]),
            Hn(t, 'click', function () {
              bn(e[28] ? e[150] : n) && (e[28] ? e[150] : n).apply(this, arguments)
            }),
            Rn(
              Rs.call(null, t, {
                observeViewRect: !0,
              })
            ),
            Rn(As.call(null, t)),
            Rn(Ls.call(null, t)),
          ]),
          (r = !0))
    },
    p(n, r) {
      ;(e = n)[55]
        ? s
          ? (s.p(e, r), 16777216 & r[1] && Fr(s, 1))
          : ((s = Iu(e)), s.c(), Fr(s, 1), s.m(t, o))
        : s &&
          (Er(),
          zr(s, 1, 1, () => {
            s = null
          }),
          Lr()),
        e[64] > 0
          ? l
            ? l.p(e, r)
            : ((l = Yu(e)), l.c(), l.m(t, null))
          : l && (l.d(1), (l = null)),
        (!i || 8 & r[0]) && Yn(t, 'id', e[3]),
        (!i || 65536 & r[1]) && Yn(t, 'class', e[47]),
        (!i || 262144 & r[1]) && Yn(t, 'data-env', e[49])
    },
    i(e) {
      i || (Fr(s), (i = !0))
    },
    o(e) {
      zr(s), (i = !1)
    },
    d(o) {
      o && Wn(t), s && s.d(), l && l.d(), e[298](null), (r = !1), yn(a)
    },
  }
}
const qu = 10

function Ku(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    m,
    f,
    $,
    y,
    b,
    x,
    v,
    S,
    k,
    M,
    C,
    P,
    I,
    R,
    A,
    E,
    L,
    F,
    z,
    B,
    D,
    O,
    V,
    _,
    Z,
    j,
    N,
    H,
    U,
    X,
    Y,
    G,
    q,
    K,
    J,
    Q,
    te,
    oe,
    ae,
    ce,
    de,
    ue,
    he,
    pe,
    $e,
    ye,
    be,
    xe,
    ve,
    we,
    Se,
    ke,
    Me,
    Ce,
    Te,
    Pe,
    Ie,
    Re,
    Ee,
    Le,
    Fe,
    ze,
    Be,
    De,
    Oe,
    We,
    Ve,
    _e,
    Ze,
    Ue,
    Ye,
    Ge,
    et,
    tt,
    at,
    st,
    dt,
    ut,
    mt,
    ft,
    yt,
    bt,
    xt,
    vt,
    wt,
    St,
    kt,
    Ct,
    Tt,
    Pt,
    It,
    Rt,
    At,
    Et,
    Lt,
    Ft,
    zt,
    Bt,
    Dt,
    Ot,
    Wt,
    Vt,
    _t,
    Zt,
    jt,
    Nt,
    Ht,
    Ut,
    Xt,
    Yt,
    qt,
    Kt,
    Jt,
    Qt,
    eo,
    to,
    oo,
    io,
    no,
    ro,
    ao,
    so,
    lo,
    co,
    ho,
    po,
    mo,
    go,
    fo,
    $o,
    yo,
    bo,
    vo,
    wo,
    So,
    ko,
    Mo,
    Co,
    Po,
    Io,
    Ro,
    Ao,
    Eo,
    Lo,
    Fo,
    zo,
    Bo,
    Do = pn,
    Oo = pn
  Sn(e, bs, (e) => o(218, (Ut = e))),
    e.$$.on_destroy.push(() => Do()),
    e.$$.on_destroy.push(() => Oo())
  const Wo = To(),
    Vo = dr()
  let { class: _o } = t,
    { layout: Zo } = t,
    { stores: jo } = t,
    { locale: No } = t,
    { id: Uo } = t,
    { util: Xo } = t,
    { utils: Yo } = t,
    { animations: Go = 'auto' } = t,
    { disabled: qo = !1 } = t,
    { status: Ko } = t,
    { previewUpscale: ei = !1 } = t,
    { elasticityMultiplier: ti = 10 } = t,
    { willRevert: oi = () => Promise.resolve(!0) } = t,
    { willProcessImage: ri = () => Promise.resolve(!0) } = t,
    { willRenderCanvas: ai = W } = t,
    { willRenderToolbar: li = W } = t,
    { willSetHistoryInitialState: ci = W } = t,
    { enableButtonExport: di = !0 } = t,
    { enableButtonRevert: ui = !0 } = t,
    { enableNavigateHistory: hi = !0 } = t,
    { enableToolbar: pi = !0 } = t,
    { enableUtils: mi = !0 } = t,
    { enableButtonClose: gi = !1 } = t,
    { enableDropImage: fi = !1 } = t,
    { enablePasteImage: $i = !1 } = t,
    { enableBrowseImage: yi = !1 } = t,
    { previewImageDataMaxSize: bi } = t,
    { previewImageTextPixelRatio: xi } = t,
    { layoutDirectionPreference: vi = 'auto' } = t,
    { layoutHorizontalUtilsPreference: wi = 'left' } = t,
    { layoutVerticalUtilsPreference: Si = 'bottom' } = t,
    { imagePreviewSrc: ki } = t,
    {
      imageOrienter: Mi = {
        read: () => 1,
        apply: (e) => e,
      },
    } = t,
    { pluginComponents: Ci } = t,
    { pluginOptions: Ti = {} } = t
  const Pi = Wo.sub,
    Ii = {}
  let { root: Ri } = t
  const Ai = Jr()
  Sn(e, Ai, (e) => o(320, (wt = e)))
  const Ei = Jr()
  Sn(e, Ei, (e) => o(21, (Ft = e)))
  const Li = Jr({})
  Sn(e, Li, (e) => o(32, (fo = e))), ur('redrawTrigger', Li)
  const Fi = Jr(ti)
  Sn(e, Fi, (e) => o(310, (Ze = e))), ur('elasticityMultiplier', Fi)
  let zi = []
  const Di = ys()
  Sn(e, Di, (e) => o(64, (Bo = e)))
  const Oi = sl() || 1024,
    Wi = Ae(Oi, Oi),
    Vi = za(),
    ji = (e) =>
      Promise.resolve(
        Ue &&
          Ue(e, {
            resourceType: 'image',
          })
      ).then((t) => {
        if (!1 === t) return
        const { headers: o, credentials: i } = t || {}
        return fetch(e, {
          headers: o,
          credentials: i,
        })
          .then((e) => {
            if (200 !== e.status) throw `${e.status} (${e.statusText})`
            return e.blob()
          })
          .then((e) => fu(e, Mi, Vi))
          .then((e) => $u(e, a))
      })
  let {
    imageSourceToImageData: Ni = (e) =>
      w(e) ? ji(e) : Mt(e) ? new Promise((t) => t(h(e))) : fu(e, Mi, Vi).then((e) => $u(e, a)),
  } = t
  const Ui = (() => {
      let e, t
      const o = uu.reduce(
        (e, o) => (
          (e[o] = (function (e, t, o) {
            let i = []
            return {
              set: t,
              update: o,
              publish: (e) => {
                i.forEach((t) => t(e))
              },
              subscribe: (t) => (
                i.push(t),
                e(t),
                () => {
                  i = i.filter((e) => e !== t)
                }
              ),
            }
          })(
            (e) => {
              if (!t) return e()
              t.stores[o].subscribe(e)()
            },
            (e) => {
              t && t.stores[o].set(e)
            },
            (e) => {
              t && t.stores[o].update(e)
            }
          )),
          e
        ),
        {}
      )
      return {
        update: (i) => {
          if (((t = i), e && (e.forEach((e) => e()), (e = void 0)), !i))
            return o.file.publish(void 0), void o.loadState.publish(void 0)
          e = uu.map((e) =>
            i.stores[e].subscribe((t) => {
              o[e].publish(t)
            })
          )
        },
        stores: o,
        destroy: () => {
          e && e.forEach((e) => e())
        },
      }
    })(),
    {
      file: Xi,
      size: Yi,
      loadState: Gi,
      processState: qi,
      cropAspectRatio: Ki,
      cropLimitToImage: Ji,
      crop: Qi,
      cropMinSize: en,
      cropMaxSize: tn,
      cropRange: on,
      cropOrigin: nn,
      cropRectAspectRatio: rn,
      rotation: an,
      rotationRange: sn,
      targetSize: ln,
      flipX: cn,
      flipY: dn,
      backgroundColor: mn,
      colorMatrix: gn,
      convolutionMatrix: fn,
      gamma: $n,
      vignette: yn,
      noise: bn,
      decoration: xn,
      annotation: kn,
      redaction: Mn,
      frame: Cn,
      state: Tn,
    } = Ui.stores
  Sn(e, Xi, (e) => o(212, (jt = e))),
    Sn(e, Yi, (e) => o(200, (Rt = e))),
    Sn(e, Gi, (e) => o(194, (st = e))),
    Sn(e, qi, (e) => o(257, (lo = e))),
    Sn(e, Ki, (e) => o(313, (tt = e))),
    Sn(e, Qi, (e) => o(195, (dt = e))),
    Sn(e, mn, (e) => o(278, (vo = e))),
    Sn(e, xn, (e) => o(34, (Co = e))),
    Sn(e, kn, (e) => o(33, (Mo = e))),
    Sn(e, Mn, (e) => o(275, (yo = e))),
    Sn(e, Cn, (e) => o(35, (Po = e))),
    Sn(e, Tn, (e) => o(328, (Xt = e)))
  const {
    images: Pn,
    shapePreprocessor: Rn,
    imageScrambler: An,
    willRequest: En,
    willRequestResource: Ln,
  } = jo
  Sn(e, Pn, (e) => o(191, (Ye = e))),
    Sn(e, Rn, (e) => o(192, (Ge = e))),
    Sn(e, An, (e) => o(277, (bo = e))),
    Sn(e, En, (e) => o(41, (Ue = e))),
    Sn(e, Ln, (e) => o(62, (Fo = e)))
  const Fn = Tn.subscribe((e) => Wo.pub('update', e)),
    zn = Jr(),
    Bn = Jr([0, 0, 0])
  Sn(e, Bn, (e) => o(23, (Dt = e)))
  const Dn = Jr([1, 1, 1])
  Sn(e, Dn, (e) => o(330, (wo = e)))
  const On = ys([1, 1, 1])
  Sn(e, On, (e) => o(331, (So = e)))
  const Wn = Jr(),
    Vn = Jr()
  Sn(e, Vn, (e) => o(18, (et = e)))
  const _n = Jr()
  Sn(e, _n, (e) => o(193, (at = e)))
  const Zn = Jr(Ne())
  Sn(e, Zn, (e) => o(43, (Yt = e)))
  const jn = Jr(Ne())
  Sn(e, jn, (e) => o(59, (Ao = e)))
  const Nn = Jr()
  Sn(e, Nn, (e) => o(42, (It = e)))
  const Hn = gu('(pointer: fine)', (e) => (e ? 'pointer-fine' : 'pointer-coarse'))
  Sn(e, Hn, (e) => o(243, (to = e)))
  const Un = gu('(hover: hover)', (e) => (e ? 'pointer-hover' : 'pointer-no-hover'))
  Sn(e, Un, (e) => o(244, (oo = e)))
  const Xn = Jr(!1),
    Yn = Jr(!1)
  Sn(e, Yn, (e) => o(197, (vt = e)))
  const Gn = Kr(void 0, (e) => {
    const t = ys(0),
      o = [
        Yn.subscribe((e) => {
          t.set(e ? 1 : 0)
        }),
        t.subscribe(e),
      ]
    return () => o.forEach((e) => e())
  })
  Sn(e, Gn, (e) => o(332, (ko = e)))
  const qn = Jr(ei)
  Sn(e, qn, (e) => o(223, (Jt = e)))
  const Kn = Jr(!1)
  Sn(e, Kn, (e) => o(314, (ut = e))), ur('imageIsStatic', Kn)
  const Jn = Jr()
  Sn(e, Jn, (e) => o(316, (ft = e)))
  const Qn = Jr()
  Sn(e, Qn, (e) => o(315, (mt = e)))
  const er = Kr(void 0, (e) => {
      const t = Jr(void 0),
        o = [
          Qi.subscribe(() => {
            if (!dt) return
            if (ut) return t.set(je(dt))
            const e = nc(dt, mt, 5 * ti)
            t.set(e)
          }),
          t.subscribe(e),
        ]
      return () => o.forEach((e) => e())
    }),
    tr = Jr()
  Sn(e, tr, (e) => o(319, (xt = e)))
  const or = Jr()
  Sn(e, or, (e) => o(325, (Et = e)))
  const ir = Jr(void 0)
  Sn(e, ir, (e) => o(322, (Ct = e)))
  const nr = Jr(ie())
  Sn(e, nr, (e) => o(321, (St = e)))
  let rr = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
  const ar = Qr([Cn, tr], ([e, t], o) => {
      t || o(rr)
      const i = fr(t, e)
      ;(ee(rr.top, 4) === ee(i.top, 4) &&
        ee(rr.bottom, 4) === ee(i.bottom, 4) &&
        ee(rr.right, 4) === ee(i.right, 4) &&
        ee(rr.left, 4) === ee(i.left, 4)) ||
        ((rr = i), o(i))
    }),
    sr = Qr([ar], ([e], t) => {
      t(Object.values(e).some((e) => e > 0))
    }),
    lr = Qr([Nn, Zn, jn], ([e, t, o], n) => {
      if (!e) return n(void 0)
      let r = 0
      1 !== S.length || i || (r = o.y + o.height),
        n(qe(e.x + t.x, e.y + t.y + r, e.width, e.height))
    })
  Sn(e, lr, (e) => o(198, (kt = e)))
  const hr = Qr([Kn, Yi, an], ([e, t, o], i) => {
      if (!e || !t) return i(void 0)
      const n = He(t)
      i(lt(n, o))
    }),
    pr = Qr([hr], ([e], t) => {
      if (!e) return t(void 0)
      const o = Xe(e)
      t($t(o))
    })
  Sn(e, pr, (e) => o(199, (Pt = e)))
  const mr = Qr([lr, Qi, pr, qn], ([e, t, o, i], n) => {
    if (!e || !t || !(!ft && !mt)) return
    const { width: r, height: a } = o || t,
      s = Math.min(e.width / r, e.height / a)
    n(i ? s : Math.min(1, s))
  })
  Sn(e, mr, (e) => o(323, (Tt = e)))
  ur(
    'imageStaticVisualCorners',
    Qr([Kn, Yi, an, lr, Nn, mr], ([e, t, o, i, n, r], a) => {
      if (!(e && i && n && t)) return a(void 0)
      const s = He(t),
        l = $t(Qe(s, r)),
        c = ct(i, l)
      ;(l.x = c.x), (l.y = c.y)
      a(lt(l, o))
    })
  )
  const fr = (e, t) => {
      if (!t || !e)
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }
      const o = Zi(t, e, s),
        i = _i(o, e)
      return {
        top: Math.abs(i.top),
        right: Math.abs(i.right),
        bottom: Math.abs(i.bottom),
        left: Math.abs(i.left),
      }
    },
    $r = Jr(void 0),
    yr = Qr([Qi, lr], ([e, t]) => {
      if (t && e) return Math.min(t.width / e.width, t.height / e.height)
    }),
    br = Qr([$r, Qi, tr], ([e, t, o]) =>
      e && t && o ? Math.min(t.width / o.width, t.height / o.height) * e : 1
    )
  Sn(e, br, (e) => o(317, (yt = e)))
  const xr = Jr(ie())
  Sn(e, xr, (e) => o(318, (bt = e)))
  const vr = Jr({
      scalar: yt,
      translation: bt,
    }),
    wr = () => {
      vr.set({
        scalar: void 0,
        translation: ie(),
      })
    },
    Sr = Kr(void 0, (e) => {
      const t = ys(void 0, {
          precision: 1e-4,
        }),
        o = 1 === Tc() ? (e) => gt(e, Math.round) : W,
        i = () => {
          if (!xt) return
          const e = vt || !wt
          if (ut) {
            const o = je(xt)
            return (
              Je(o, St),
              Je(o, kt),
              t.set(o, {
                hard: e,
              })
            )
          }
          const i = nc(xt, Ct, 1 * ti)
          i.width < 0 && ((i.width = 0), (i.x = xt.x)),
            i.height < 0 && ((i.height = 0), (i.y = xt.y)),
            Je(i, kt),
            Je(i, bt),
            Qe(i, yt),
            !e && o(i),
            t.set(i, {
              hard: e,
            })
        },
        n = [
          lr.subscribe(i),
          tr.subscribe(i),
          br.subscribe(i),
          xr.subscribe(i),
          Cn.subscribe(i),
          t.subscribe(e),
        ]
      return () => n.forEach((e) => e())
    })
  Sn(e, Sr, (e) => o(22, (zt = e)))
  const kr = Jr(1)
  Sn(e, kr, (e) => o(326, (Lt = e)))
  const Mr = () => {
    if (!dt || !kt) return
    let e = ot(je(dt), Tt || 1)
    const t = ct(kt, ot(je(Pt), Tt))
    Je(e, t)
    const o = It.width / e.width,
      i = It.height / e.height,
      n = Math.min(1, o, i)
    kr.set(n),
      Qe(e, n),
      ((e, t) => {
        const [o, i, n, r] = pt(e)
        o < t.y && (e.y = Math.max(t.y, e.y)),
          i > t.width && (e.x = t.width - e.width),
          n > t.height && (e.y = t.height - e.height),
          r < t.x && (e.x = Math.max(t.x, e.x))
      })(e, { ...It, x: 0, y: 0 }),
      tr.set(e)
  }
  let Cr
  const Tr = (e) => {
    if (i && Cr && nt(Cr, e) && undefined === Tt) return
    if (ut) return Mr()
    Cr = e
    const t =
      dt.width <= e.width && dt.height <= e.height
        ? ct(e, ot(je(dt), Tt || 1))
        : ht(e, rt(dt || Rt))
    tr.set(t)
  }
  let Pr = !1
  const Ir = mr.subscribe((e) => {
      !Pr && void 0 !== e && dt && (Tr(kt), (Pr = !0))
    }),
    Rr = lr.subscribe((e) => {
      e && void 0 !== Tt && dt && Tr(e)
    })
  let Ar
  const Er = or.subscribe((e) => {
      if (!e) return (Ar = void 0), void In(Jn, (ft = void 0), ft)
      Ar = At
      const t = je(dt)
      Jn.set(t)
    }),
    Lr = tr.subscribe((e) => {
      if (!e || !Et) return
      const t =
        ((o = je(e)),
        (i = Et),
        (o.x -= i.x),
        (o.y -= i.y),
        (o.width -= i.width),
        (o.height -= i.height),
        o)
      var o, i
      it(t, Ar)
      const n = ((e, t) => (
        (e.x += t.x), (e.y += t.y), (e.width += t.width), (e.height += t.height), e
      ))(je(ft), t)
      Qi.set(n)
    }),
    Fr = Qi.subscribe((e) => {
      if (!e || !xt) return
      if (ut) return void (Et || Mr())
      if (vt || Et || mt) return
      const t = rt(xt),
        o = rt(e)
      if (ee(t, 6) === ee(o, 6)) return
      const { width: i, height: n } = Pt || dt,
        r = Math.min(kt.width / i, kt.height / n),
        a = Ae(e.width * r, e.height * r),
        s = 0.5 * (xt.width - a.width),
        l = 0.5 * (xt.height - a.height),
        c = qe(xt.x + s, xt.y + l, a.width, a.height)
      tr.set(c)
    }),
    zr = Qr([mr, Qi, tr, Kn], ([e, t, o, i], n) => {
      if (!e || !t || !o) return
      if (i) return n(Lt)
      const r = o.width / t.width,
        a = o.height / t.height
      n(Math.max(r, a) / e)
    }),
    Br = Qr([mr, zr], ([e, t], o) => {
      if (!t) return
      o(e * t)
    })
  Sn(e, Br, (e) => o(324, (At = e)))
  const Dr = ys(0.075, {
      stiffness: 0.03,
      damping: 0.4,
      precision: 0.001,
    }),
    Or = Qr([On, Bn, Dr, Sr, br, Cn, sr, ar], ([e, t, o, n, r, a, s, l], c) => {
      if (!n || i) return c([])
      let { x: d, y: u, width: h, height: p } = n
      ;(d += 0.5), (u += 0.5), (h -= 0.5), (p -= 0.5)
      const m = []
      if (s) {
        m.push({
          x: d,
          y: u,
          width: h - 0.5,
          height: p - 0.5,
          strokeWidth: 1,
          strokeColor: t,
          opacity: 0.85,
        }),
          o > 0.1 &&
            m.push({
              x: d,
              y: u,
              width: h - 0.5,
              height: p - 0.5,
              strokeWidth: 1,
              strokeColor: e,
              opacity: o,
            })
        let { left: i, right: n, top: a, bottom: s } = l
        return (
          (i *= r),
          (n *= r),
          (a *= r),
          (s *= r),
          void c([
            ...m,
            {
              x: d - i,
              y: u - n,
              width: h + i + n,
              height: p + a + s,
              strokeWidth: 1,
              strokeColor: e,
              opacity: 0.05,
            },
          ])
        )
      }
      const g = Mu(e),
        f = a && a.frameColor && Mu(a.frameColor)
      if ((g && f) || (!g && !g)) {
        const e = g ? [1, 1, 1, 0.3] : [0, 0, 0, 0.075]
        m.push({
          x: d,
          y: u,
          width: h,
          height: p,
          strokeWidth: 3.5,
          strokeColor: e,
          opacity: o,
        })
      }
      c([
        ...m,
        {
          x: d,
          y: u,
          width: h,
          height: p,
          strokeWidth: 1,
          strokeColor: e,
          opacity: o,
        },
      ])
    }),
    Wr = Jr([])
  Sn(e, Wr, (e) => o(211, (Zt = e)))
  const Vr = Qr([Or, Wr], ([e, t], o) => {
    o([...e, ...t])
  })
  Sn(e, Vr, (e) => o(63, (zo = e)))
  const _r = ys(0, {
    precision: 0.001,
  })
  Sn(e, _r, (e) => o(203, (Ot = e)))
  const Zr = ys()
  Sn(e, Zr, (e) => o(202, (Bt = e)))
  const jr = ys()
  Sn(e, jr, (e) => o(205, (Wt = e)))
  const Nr = ys()
  Sn(e, Nr, (e) => o(207, (Vt = e)))
  const Hr = ys()
  Sn(e, Hr, (e) => o(209, (_t = e)))
  const Ur = Jr(!1)
  Sn(e, Ur, (e) => o(254, (so = e)))
  const Xr = Jr()
  Sn(e, Xr, (e) => o(214, (Ht = e)))
  let Yr
  const Gr = Qr([Ur, Xr], ([e, t], i) => {
    if (e && t) {
      if ((Yr && (Yr.cancel(), o(185, (Yr = void 0))), Hi(t)))
        return i(
          ((e) => {
            const t = p('canvas', {
              width: e.width,
              height: e.height,
            })
            return t.getContext('2d').drawImage(e, 0, 0), t
          })(t)
        )
      var r, a
      o(
        185,
        (Yr = {
          cancel: n,
        })
      ),
        ((r = t),
        (a = Yr),
        new Promise((e, t) => {
          const o = ba.length ? 0 : Ft ? 250 : 0
          let i,
            n = !1
          a.cancel = () => (n = !0)
          const s = Date.now()
          Ni(r)
            .then((t) => {
              const r = Date.now() - s
              clearTimeout(i),
                (i = setTimeout(
                  () => {
                    n || e(t)
                  },
                  Math.max(0, o - r)
                ))
            })
            .catch(t)
        }))
          .then(i)
          .catch((e) => {
            In(Gi, (st.error = e), st)
          })
          .finally(() => {
            o(185, (Yr = void 0))
          })
    } else i(void 0)
  })
  Do(), (Do = vn(Gr, (e) => o(213, (Nt = e))))
  let { imagePreviewCurrent: qr } = t
  const ea = Jr({})
  Sn(e, ea, (e) => o(246, (no = e)))
  const ta = Jr([])
  Sn(e, ta, (e) => o(61, (Lo = e)))
  const oa = Qr(
    [lr, _n, Yi, er, tr, Br, an, cn, dn, br, xr, Xn],
    ([e, t, o, i, n, r, a, s, l, c, d, u], h) => {
      if (!e || !n) return
      const p = ((e, t, o, i, n, r, a, s, l, c, d) => {
        if (!(e && t && o && i && s)) return
        s *= r
        const u = $t(je(t)),
          h = Ke(u),
          p = Ke(e),
          m = He(o),
          g = Ke(m),
          f = fa(o, i, l),
          $ = Ke(f),
          y = fe(se(g), $),
          b = fe(se(p), h)
        ;(y.x += b.x), (y.y += b.y)
        const x = le(se(y))
        ;(x.x += b.x), (x.y += b.y)
        const v = Ke(Je(Je(je(n), a), e)),
          w = fe(v, p)
        return (
          ge(y, w),
          {
            origin: x,
            translation: y,
            rotation: {
              x: d ? Math.PI : 0,
              y: c ? Math.PI : 0,
              z: l,
            },
            scale: s,
          }
        )
      })(e, t, o, i, n, c, d, r, a, s, l)
      !u && f(p), h(p)
    }
  )
  Sn(e, oa, (e) => o(245, (io = e)))
  const ia = Qr([gn, fn, $n, yn, bn], ([e, t, o, i, n], r) => {
    const a =
      e &&
      Object.keys(e)
        .map((t) => e[t])
        .filter(Boolean)
    r({
      gamma: o || void 0,
      vignette: i || void 0,
      noise: n || void 0,
      convolutionMatrix: t || void 0,
      colorMatrix: a && a.length && un(a),
    })
  })
  let na, ra
  const aa = (() => {
      if (!Gt()) return !1
      const e = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/i) || [],
        [, t, o] = e.map((e) => parseInt(e, 10) || 0)
      return t > 13 || (13 === t && o >= 4)
    })(),
    sa = Jr({})
  Sn(e, sa, (e) => o(242, (eo = e)))
  const la = Tc(),
    ca = Kr(la, (e) => {
      const t = () => e(Tc()),
        o = matchMedia(`(resolution: ${la}dppx)`)
      return o.addListener(t), () => o.removeListener(t)
    })
  Sn(e, ca, (e) => o(60, (Eo = e))), ur('isAnimated', Ei)
  const da = ((e, t) => {
    const { sub: o, pub: i } = To(),
      n = [],
      r = Jr(0),
      a = [],
      s = () =>
        a.forEach((e) =>
          e({
            index: wn(r),
            length: n.length,
          })
        ),
      l = {
        get index() {
          return wn(r)
        },
        set index(e) {
          ;(e = Number.isInteger(e) ? e : 0),
            (e = $a(e, 0, n.length - 1)),
            r.set(e),
            t(n[l.index]),
            s()
        },
        get state() {
          return n[n.length - 1]
        },
        length: () => n.length,
        undo() {
          const e = l.index--
          return i('undo', e), e
        },
        redo() {
          const e = l.index++
          return i('redo', l.index), e
        },
        revert() {
          ;(n.length = 1), (l.index = 0), i('revert')
        },
        write(o) {
          o && t({ ...e(), ...o })
          const i = e(),
            a = n[n.length - 1]
          JSON.stringify(i) !== JSON.stringify(a) &&
            ((n.length = l.index + 1), n.push(i), r.set(n.length - 1), s())
        },
        set(e = {}) {
          ;(n.length = 0), (l.index = 0)
          const t = Array.isArray(e) ? e : [e]
          n.push(...t), (l.index = n.length - 1)
        },
        get: () => [...n],
        subscribe: (e) => (
          a.push(e),
          e({
            index: l.index,
            length: n.length,
          }),
          () => a.splice(a.indexOf(e), 1)
        ),
        on: o,
      }
    return l
  })(
    () => Xt,
    (e) => {
      In(Tn, (Xt = e), Xt), Zn.set(Yt)
    }
  )
  Oo(), (Oo = vn(da, (e) => o(220, (qt = e))))
  const ua = () => {
      const e = {
          x: 0,
          y: 0,
          ...Rt,
        },
        t = gt(ht(e, Xt.cropAspectRatio), Math.round),
        o = ci({ ...Xt, rotation: 0, crop: t }, Xt),
        i = [o]
      JSON.stringify(o) !== JSON.stringify(Xt) && i.push({ ...Xt }), da.set(i)
    },
    ha = Gi.subscribe((e) => {
      e && e.complete && ua()
    }),
    pa = () => oi().then((e) => e && da.revert()),
    ma = Jr(!1)
  Sn(e, ma, (e) => o(222, (Kt = e)))
  const ga = () => {
      In(ma, (Kt = !0), Kt),
        ri().then((e) => {
          if (!e) return void In(ma, (Kt = !1), Kt)
          let t
          t = La.subscribe((e) => {
            1 === e && (t && t(), Vo('processImage'))
          })
        })
    },
    ya = qi.subscribe((e) => {
      if (!e) return
      In(ma, (Kt = !0), Kt)
      const { complete: t, abort: o } = e
      ;(t || o) && In(ma, (Kt = !1), Kt)
    }),
    ba = ku()
  Sn(e, ba, (e) => o(26, (ao = e)))
  const xa = Kr(void 0, (e) =>
      ba.subscribe((t) => {
        const { origin: o, translation: i, rotation: n, scale: r } = t[0]
        e({
          origin: o,
          translation: i,
          rotation: n,
          scale: r,
        })
      })
    ),
    va = Jr()
  Sn(e, va, (e) => o(238, (Qt = e)))
  const wa = Jr(),
    Sa = {
      ...jo,
      imageFile: Xi,
      imageSize: Yi,
      imageBackgroundColor: mn,
      imageCropAspectRatio: Ki,
      imageCropMinSize: en,
      imageCropMaxSize: tn,
      imageCropLimitToImage: Ji,
      imageCropRect: Qi,
      imageCropRectOrigin: nn,
      imageCropRectSnapshot: Jn,
      imageCropRectAspectRatio: rn,
      imageCropRange: on,
      imageRotation: an,
      imageRotationRange: sn,
      imageFlipX: cn,
      imageFlipY: dn,
      imageOutputSize: ln,
      imageColorMatrix: gn,
      imageConvolutionMatrix: fn,
      imageGamma: $n,
      imageVignette: yn,
      imageNoise: bn,
      imageDecoration: xn,
      imageAnnotation: kn,
      imageRedaction: Mn,
      imageFrame: Cn,
      imagePreview: Gr,
      imagePreviewSource: Xr,
      imageTransforms: oa,
      imagePreviewModifiers: ea,
      history: da,
      animation: Ai,
      pixelRatio: ca,
      elasticityMultiplier: ti,
      scrollElasticity: qu,
      rangeInputElasticity: 5,
      pointerAccuracy: Hn,
      pointerHoverable: Un,
      env: sa,
      rootRect: _n,
      stageRect: lr,
      stageScalar: mr,
      framePadded: sr,
      presentationScalar: Br,
      imagePreviewUpscale: wa,
      utilRect: Nn,
      rootBackgroundColor: Bn,
      rootForegroundColor: Dn,
      rootLineColor: On,
      rootColorSecondary: Wn,
      imageOutlineOpacity: Dr,
      utilTools: va,
      imageSelectionPan: xr,
      imageSelectionZoom: $r,
      imageSelectionStageFitScalar: yr,
      imageSelectionStoredState: vr,
      imageOverlayMarkup: Wr,
      interfaceImages: ta,
      isInteracting: Yn,
      isTransformingImage: Xn,
      isInteractingFraction: Gn,
      imageCropRectIntent: Qn,
      imageCropRectPresentation: er,
      imageSelectionRect: tr,
      imageSelectionRectIntent: ir,
      imageSelectionRectPresentation: Sr,
      imageSelectionRectSnapshot: or,
      imageScalar: zr,
      imageTransformsInterpolated: xa,
    }
  delete Sa.image
  const ka = 'util-' + T()
  let Ma = [],
    Ca = Gt()
  const Ta = (e, t) => {
      const o = ((e) => {
        const t = K.getPropertyValue(e)
        return yu(t)
      })(e)
      o &&
        0 !== o[3] &&
        ((o.length = 3),
        t.set(o, {
          hard: !Ft,
        }))
    },
    Pa = () => {
      Ta('color', Dn),
        Ta('background-color', Bn),
        Ta('outline-color', On),
        Ta('--color-secondary', Wn)
    },
    Ia = Qr([oa, ia, mn], ([e, t, o]) => e && { ...e, ...t, backgroundColor: o })
  Sn(e, Ia, (e) => o(248, (ro = e)))
  const Ra = () => {
      const e = ba.length
          ? void 0
          : {
              resize: 1.05,
            },
        t = ((e, t, o = {}) => {
          const { resize: i = 1, opacity: n = 0 } = o,
            r = {
              opacity: [ys(n, { ...wu, stiffness: 0.1 }), W],
              resize: [ys(i, { ...wu, stiffness: 0.1 }), W],
              translation: [ys(void 0, wu), W],
              rotation: [ys(void 0, Su), W],
              origin: [ys(void 0, wu), W],
              scale: [ys(void 0, Su), W],
              gamma: [ys(void 0, Su), (e) => e || 1],
              vignette: [ys(void 0, Su), (e) => e || 0],
              colorMatrix: [ys([...vu], wu), (e) => e || [...vu]],
              convolutionMatrix: [Jr(void 0), (e) => (e && e.clarity) || void 0],
              backgroundColor: [ys(void 0, wu), W],
            },
            a = Object.entries(r).map(([e, t]) => [e, t[0]]),
            s = a.map(([, e]) => e),
            l = Object.entries(r).reduce((e, [t, o]) => {
              const [i, n] = o
              return (e[t] = (e, t) => i.set(n(e), t)), e
            }, {})
          let c
          const d = Qr(
            s,
            (o) => (
              (c = o.reduce((e, t, o) => ((e[a[o][0]] = t), e), {})),
              (c.data = e),
              (c.size = t),
              (c.scale *= o[1]),
              c
            )
          )
          return (
            (d.get = () => c),
            (d.set = (e, t) => {
              const o = {
                hard: !t,
              }
              Object.entries(e).forEach(([e, t]) => {
                l[e] && l[e](t, o)
              })
            }),
            d
          )
        })(Nt, Rt, e)
      ba.unshift(t), Aa(ro)
    },
    Aa = (e) => {
      ba.forEach((t, o) => {
        const i = 0 === o ? 1 : 0
        t.set({ ...e, opacity: i, resize: 1 }, wt)
      })
    }
  let Ea
  const La = fs(void 0, {
    duration: 500,
  })
  let Fa
  Sn(e, La, (e) => o(29, (ho = e)))
  const Ba = Jr(!1)
  let Da
  Sn(e, Ba, (e) => o(266, (co = e)))
  const Oa = ys(void 0, {
    stiffness: 0.1,
    damping: 0.7,
    precision: 0.25,
  })
  Sn(e, Oa, (e) => o(57, (Io = e)))
  const Wa = ys(0, {
    stiffness: 0.1,
    precision: 0.05,
  })
  Sn(e, Wa, (e) => o(58, (Ro = e)))
  const Va = ys(0, {
    stiffness: 0.02,
    damping: 0.5,
    precision: 0.25,
  })
  Sn(e, Va, (e) => o(270, (mo = e)))
  const _a = ys(void 0, {
    stiffness: 0.02,
    damping: 0.5,
    precision: 0.25,
  })
  Sn(e, _a, (e) => o(268, (po = e)))
  const Za = ys(void 0, {
    stiffness: 0.02,
    damping: 0.5,
    precision: 0.25,
  })
  let ja
  Sn(e, Za, (e) => o(271, (go = e)))
  const Na = () => {
      Vo('abortLoadImage')
    },
    Ha = () => {
      Vo('abortProcessImage'), In(ma, (Kt = !1), Kt)
    },
    Ua = (e) => e.preventDefault(),
    Xa = aa
      ? (e) => {
          const t = e.touches ? e.touches[0] : e
          ;(t.pageX > 10 && t.pageX < na - 10) || Ua(e)
        }
      : n,
    Ya = Jr([])
  Sn(e, Ya, (e) => o(329, ($o = e))), ur('keysPressed', Ya)
  const Ga = (e) => {
      !e ||
        (xo(e) && !((e) => /^image/.test(e.type) && !/svg/.test(e.type))(e)) ||
        (!xo(e) && !/^http/.test(e)) ||
        Vo('loadImage', e)
    },
    qa = (e) => {
      e && Ga(e)
    }
  let Ka = void 0
  let Ja,
    Qa = []
  const es = Jr()
  ur('rootPortal', es), ur('rootRect', _n)
  const ts = () => ({
      foregroundColor: [...wo],
      lineColor: [...So],
      utilVisibility: { ...I },
      isInteracting: vt,
      isInteractingFraction: ko,
      rootRect: je(at),
      stageRect: je(kt),
      annotationShapesDirty: ps,
      decorationShapesDirty: ms,
      frameShapesDirty: gs,
      blendShapesDirty: $s,
    }),
    os = (e, t, o) => Bi(e, Ae(t.width / o, t.height / o)),
    is = (e, t, o) => ((e._translate = re(t)), (e._scale = o), e),
    ns = (e) => {
      const t = []
      return e.forEach((e) => t.push(rs(e))), t.filter(Boolean)
    },
    rs = (e) =>
      ii(e)
        ? ((e.points = [ne(e.x1, e.y1), ne(e.x2, e.y2)]), e)
        : ni(e)
        ? ((e.points = [ne(e.x1, e.y1), ne(e.x2, e.y2), ne(e.x3, e.y3)]), e)
        : (!((e) => Jo(e) && !e.text.length)(e) ||
            (e.backgroundColor && 0 !== e.backgroundColor[3]) ||
            (Qo(e) && ((e.width = 5), (e.height = e.lineHeight)),
            (e.strokeWidth = 1),
            (e.strokeColor = [1, 1, 1, 0.5]),
            (e.backgroundColor = [0, 0, 0, 0.1])),
          e)
  let as,
    ss = [],
    ls = [],
    cs = [],
    ds = [],
    us = {}
  const hs = (e, t, o, i, n, r) => {
    const {
        annotationShapesDirty: a,
        decorationShapesDirty: l,
        frameShapesDirty: c,
        blendShapesDirty: d,
        selectionRect: u,
        scale: h,
      } = e,
      p = as !== h || !nt(us, u)
    p && ((as = h), (us = u)),
      (a || o !== Mo) &&
        (ss = ns(
          o
            .filter(si)
            .map(Ho)
            .sort((e, t) => (e.alwaysOnTop ? 1 : t.alwaysOnTop ? -1 : 0))
            .map((e) => Bi(e, Rt))
            .map(s)
            .flat()
        )),
      d && (ls = t.filter(si).map((e) => Bi(e, Rt))),
      (l || i !== Co || p) &&
        (cs = ns(
          i
            .filter(si)
            .map(Ho)
            .sort((e, t) => (e.alwaysOnTop ? 1 : t.alwaysOnTop ? -1 : 0))
            .map((e) => os(e, u, h))
            .map(s)
            .flat()
            .map((e) => is(e, u, h))
        )),
      (c || r !== Po || p) &&
        (ds = r
          ? ns(
              [r]
                .map(Ho)
                .map((e) => os(e, u, h))
                .map(s)
                .flat()
                .map((e) => is(e, u, h))
            )
          : [])
    const m = ns(n.filter(si))
    return {
      blendShapesDirty: d,
      blendShapes: ls,
      annotationShapesDirty: a,
      annotationShapes: ss,
      decorationShapesDirty: l,
      decorationShapes: cs,
      frameShapesDirty: c,
      frameShapes: ds,
      interfaceShapes: m,
    }
  }
  let ps = !0
  let ms = !0
  let gs = !0
  let $s = !0
  cr(() => {
    Fn(),
      Rr(),
      Ir(),
      Er(),
      Lr(),
      Fr(),
      ha(),
      ya(),
      Hn.destroy(),
      Un.destroy(),
      Ui.destroy(),
      ba.clear(),
      o(155, (qr = void 0)),
      o(186, (Ea = void 0)),
      (ss.length = 0),
      (ls.length = 0),
      (cs.length = 0),
      (ds.length = 0)
  })
  return (
    (e.$$set = (e) => {
      'class' in e && o(156, (_o = e.class)),
        'layout' in e && o(157, (Zo = e.layout)),
        'stores' in e && o(158, (jo = e.stores)),
        'locale' in e && o(2, (No = e.locale)),
        'id' in e && o(3, (Uo = e.id)),
        'util' in e && o(159, (Xo = e.util)),
        'utils' in e && o(160, (Yo = e.utils)),
        'animations' in e && o(161, (Go = e.animations)),
        'disabled' in e && o(162, (qo = e.disabled)),
        'status' in e && o(154, (Ko = e.status)),
        'previewUpscale' in e && o(163, (ei = e.previewUpscale)),
        'elasticityMultiplier' in e && o(4, (ti = e.elasticityMultiplier)),
        'willRevert' in e && o(164, (oi = e.willRevert)),
        'willProcessImage' in e && o(165, (ri = e.willProcessImage)),
        'willRenderCanvas' in e && o(5, (ai = e.willRenderCanvas)),
        'willRenderToolbar' in e && o(166, (li = e.willRenderToolbar)),
        'willSetHistoryInitialState' in e && o(167, (ci = e.willSetHistoryInitialState)),
        'enableButtonExport' in e && o(168, (di = e.enableButtonExport)),
        'enableButtonRevert' in e && o(169, (ui = e.enableButtonRevert)),
        'enableNavigateHistory' in e && o(170, (hi = e.enableNavigateHistory)),
        'enableToolbar' in e && o(6, (pi = e.enableToolbar)),
        'enableUtils' in e && o(171, (mi = e.enableUtils)),
        'enableButtonClose' in e && o(172, (gi = e.enableButtonClose)),
        'enableDropImage' in e && o(173, (fi = e.enableDropImage)),
        'enablePasteImage' in e && o(174, ($i = e.enablePasteImage)),
        'enableBrowseImage' in e && o(175, (yi = e.enableBrowseImage)),
        'previewImageDataMaxSize' in e && o(176, (bi = e.previewImageDataMaxSize)),
        'previewImageTextPixelRatio' in e && o(7, (xi = e.previewImageTextPixelRatio)),
        'layoutDirectionPreference' in e && o(177, (vi = e.layoutDirectionPreference)),
        'layoutHorizontalUtilsPreference' in e && o(178, (wi = e.layoutHorizontalUtilsPreference)),
        'layoutVerticalUtilsPreference' in e && o(179, (Si = e.layoutVerticalUtilsPreference)),
        'imagePreviewSrc' in e && o(180, (ki = e.imagePreviewSrc)),
        'imageOrienter' in e && o(181, (Mi = e.imageOrienter)),
        'pluginComponents' in e && o(182, (Ci = e.pluginComponents)),
        'pluginOptions' in e && o(8, (Ti = e.pluginOptions)),
        'root' in e && o(1, (Ri = e.root)),
        'imageSourceToImageData' in e && o(9, (Ni = e.imageSourceToImageData)),
        'imagePreviewCurrent' in e && o(155, (qr = e.imagePreviewCurrent))
    }),
    (e.$$.update = () => {
      if (
        (16 & e.$$.dirty[0] && In(Fi, (Ze = ti), Ze),
        4 & e.$$.dirty[5] && o(190, (i = 'overlay' === Zo)),
        (65536 & e.$$.dirty[5]) | (16 & e.$$.dirty[6]) && o(17, (r = mi && !i)),
        257 & e.$$.dirty[0] &&
          Ti &&
          Object.entries(Ti).forEach(([e, t]) => {
            Object.entries(t).forEach(([t, i]) => {
              Ii[e] && o(0, (Ii[e][t] = i), Ii)
            })
          }),
        (1 & e.$$.dirty[0]) | (134217728 & e.$$.dirty[5]))
      ) {
        let e = !1
        Ci.forEach(([t]) => {
          Ii[t] || (o(0, (Ii[t] = {}), Ii), (e = !0))
        }),
          e && o(184, (zi = [...Ci]))
      }
      var t, h, p, f
      if (
        (128 & e.$$.dirty[5] && Di.set(qo ? 1 : 0),
        2097152 & e.$$.dirty[5] &&
          (a = bi
            ? ((t = bi), (h = Wi), Ae(Math.min(t.width, h.width), Math.min(t.height, h.height)))
            : Wi),
        32 & e.$$.dirty[6] && Ui.update(Ye[0]),
        64 & e.$$.dirty[6] &&
          (s = Ge
            ? (e) =>
                Ge(e, {
                  isPreview: !0,
                })
            : W),
        262144 & e.$$.dirty[0] && et && _n.set(qe(et.x, et.y, et.width, et.height)),
        400 & e.$$.dirty[6] &&
          at &&
          i &&
          st &&
          st.complete &&
          (() => {
            const e = tt,
              t = rt(at)
            ;(e && e === t) || (Ki.set(rt(at)), ua())
          })(),
        (4 & e.$$.dirty[0]) | (536870944 & e.$$.dirty[5]) &&
          o(196, (S = No && zi.length ? Yo || zi.map(([e]) => e) : [])),
        1024 & e.$$.dirty[6] && o(19, (L = S.length > 1)),
        524288 & e.$$.dirty[0] && (L || Zn.set(Ne())),
        64 & e.$$.dirty[0] && (pi || jn.set(Ne())),
        (256 & e.$$.dirty[5]) | (16 & e.$$.dirty[6]) && qn.set(ei || i),
        512 & e.$$.dirty[6] && dt && wr(),
        8192 & e.$$.dirty[6] && Pt && Mr(),
        (536870912 & e.$$.dirty[5]) | (1024 & e.$$.dirty[6]) &&
          o(224, (k = zi.filter(([e]) => S.includes(e)))),
        128 & e.$$.dirty[7] && o(225, (M = k.length)),
        (16 & e.$$.dirty[5]) | (1024 & e.$$.dirty[6]) | (256 & e.$$.dirty[7]) &&
          o(20, (P = Xo && 'string' == typeof Xo && S.includes(Xo) ? Xo : M > 0 ? S[0] : void 0)),
        2 & e.$$.dirty[7] && o(217, (b = !Ut)),
        (64 & e.$$.dirty[5]) | (536870912 & e.$$.dirty[6]) | (1 & e.$$.dirty[7]) &&
          In(Ei, (Ft = 'always' === Go ? $ : 'never' !== Go && $ && b), Ft),
        3145728 & e.$$.dirty[0] &&
          P &&
          Dr.set(0.075, {
            hard: !Ft,
          }),
        (6291456 & e.$$.dirty[0]) | (4096 & e.$$.dirty[6]) && zt)
      ) {
        let e = zt.x - kt.x,
          t = kt.x + kt.width - (zt.x + zt.width),
          o = zt.y - kt.y,
          i = kt.y + kt.height - (zt.y + zt.height),
          n = Math.min(e, o, t, i)
        _r.set(n > 0 ? 0 : Math.min(0.85, Math.abs(n / 64)), {
          hard: !Ft,
        })
      }
      if (
        ((2097152 & e.$$.dirty[0]) | (4096 & e.$$.dirty[6]) &&
          kt &&
          Zr.set(
            {
              x: 0,
              y: kt.y,
              width: kt.x < 64 ? 0 : kt.x,
              height: kt.height,
            },
            {
              hard: !Ft,
            }
          ),
        (2097152 & e.$$.dirty[0]) | (4224 & e.$$.dirty[6]) &&
          kt &&
          jr.set(
            {
              x: 0,
              y: 0,
              width: at.width,
              height: kt.y,
            },
            {
              hard: !Ft,
            }
          ),
        (2097152 & e.$$.dirty[0]) | (4224 & e.$$.dirty[6]) && kt)
      ) {
        let e = kt.x + kt.width,
          t = at.width - (kt.x + kt.width)
        t < 64 && ((e += t), (t = 0)),
          Nr.set(
            {
              x: e,
              y: kt.y,
              width: t,
              height: kt.height,
            },
            {
              hard: !Ft,
            }
          )
      }
      if (
        ((2097152 & e.$$.dirty[0]) | (4224 & e.$$.dirty[6]) &&
          kt &&
          Hr.set(
            {
              x: 0,
              y: kt.y + kt.height,
              width: at.width,
              height: at.height - (kt.y + kt.height),
            },
            {
              hard: !Ft,
            }
          ),
        (8388608 & e.$$.dirty[0]) | (196608 & e.$$.dirty[6]) &&
          o(
            201,
            (l = Bt && {
              id: 'stage-overlay',
              backgroundColor: Dt,
              opacity: Ot,
              ...Bt,
            })
          ),
        (8388608 & e.$$.dirty[0]) | (655360 & e.$$.dirty[6]) &&
          o(
            204,
            (c = Wt && {
              id: 'stage-overlay',
              backgroundColor: Dt,
              opacity: Ot,
              ...Wt,
            })
          ),
        (8388608 & e.$$.dirty[0]) | (2228224 & e.$$.dirty[6]) &&
          o(
            206,
            (d = Vt && {
              id: 'stage-overlay',
              backgroundColor: Dt,
              opacity: Ot,
              ...Vt,
            })
          ),
        (8388608 & e.$$.dirty[0]) | (8519680 & e.$$.dirty[6]) &&
          o(
            208,
            (u = _t && {
              id: 'stage-overlay',
              backgroundColor: Dt,
              opacity: Ot,
              ..._t,
            })
          ),
        5537792 & e.$$.dirty[6] && o(210, (m = [c, d, u, l].filter(Boolean))),
        50331648 & e.$$.dirty[6] && m && Zt)
      ) {
        const e = Zt.filter((e) => 'stage-overlay' !== e.id)
        Wr.set([...e, ...m])
      }
      if (
        ((33554432 & e.$$.dirty[5]) | (67108864 & e.$$.dirty[6]) && Xr.set(ki || jt || void 0),
        (2 & e.$$.dirty[0]) | (1 & e.$$.dirty[5]) | (134217728 & e.$$.dirty[6]) &&
          (o(155, (qr = Nt)), Nt && Ri.dispatchEvent(hu('loadpreview', qr))),
        268435456 & e.$$.dirty[6] && Ht && (xr.set(ie()), $r.set(void 0), wr(), ta.set([])),
        536872960 & e.$$.dirty[6] && o(216, (y = !vt && $)),
        (64 & e.$$.dirty[5]) | (1073741824 & e.$$.dirty[6]) | (1 & e.$$.dirty[7]) &&
          In(Ai, (wt = 'always' === Go ? y : 'never' !== Go && y && b), wt),
        8 & e.$$.dirty[7] && o(219, (x = qt.index > 0)),
        8 & e.$$.dirty[7] && o(221, (v = qt.index < qt.length - 1)),
        64 & e.$$.dirty[7] && wa.set(Jt),
        (4 & e.$$.dirty[0]) | (1024 & e.$$.dirty[6]) | (128 & e.$$.dirty[7]) &&
          o(
            24,
            (C =
              S.map((e) => {
                const t = k.find(([t]) => e === t)
                if (t)
                  return {
                    id: e,
                    view: t[1],
                    tabIcon: No[e + 'Icon'],
                    tabLabel: No[e + 'Label'],
                  }
              }).filter(Boolean) || [])
          ),
        1048576 & e.$$.dirty[0] && zn.set(P),
        50331648 & e.$$.dirty[0] &&
          o(25, (I = C.reduce((e, t) => ((e[t.id] = (I && I[t.id]) || 0), e), {}))),
        1048576 & e.$$.dirty[0] &&
          o(
            44,
            (R = {
              name: ka,
              selected: P,
            })
          ),
        16777216 & e.$$.dirty[0] &&
          o(
            45,
            (A = C.map((e) => ({
              id: e.id,
              icon: e.tabIcon,
              label: e.tabLabel,
            })))
          ),
        16777216 & e.$$.dirty[0] && o(46, (E = C.map((e) => e.id))),
        2 & e.$$.dirty[5] && o(47, (F = bl(['PinturaRoot', 'PinturaRootComponent', _o]))),
        128 & e.$$.dirty[6] &&
          o(226, (z = at && (at.width > 1e3 ? 'wide' : at.width < 600 ? 'narrow' : void 0))),
        128 & e.$$.dirty[6] && o(227, (B = at && (at.width <= 320 || at.height <= 460))),
        128 & e.$$.dirty[6] &&
          o(228, (D = at && (at.height > 1e3 ? 'tall' : at.height < 600 ? 'short' : void 0))),
        2 & e.$$.dirty[0] &&
          o(229, (O = Ri && Ri.parentNode && Ri.parentNode.classList.contains('PinturaModal'))),
        (4096 & e.$$.dirty[0]) | (128 & e.$$.dirty[6]) | (4096 & e.$$.dirty[7]) &&
          o(230, (V = O && at && na > at.width)),
        (8192 & e.$$.dirty[0]) | (128 & e.$$.dirty[6]) | (4096 & e.$$.dirty[7]) &&
          o(231, (_ = O && at && ra > at.height)),
        24576 & e.$$.dirty[7] && o(232, (Z = V && _)),
        512 & e.$$.dirty[7] && o(233, (j = 'narrow' === z)),
        (4194304 & e.$$.dirty[5]) | (128 & e.$$.dirty[6]) &&
          o(
            234,
            ((p = at),
            (f = vi),
            (N = at
              ? 'auto' === f
                ? p.width > p.height
                  ? 'landscape'
                  : 'portrait'
                : 'horizontal' === f
                ? p.width < 500
                  ? 'portrait'
                  : 'landscape'
                : 'vertical' === f
                ? p.height < 400
                  ? 'landscape'
                  : 'portrait'
                : void 0
              : 'landscape'))
          ),
        131072 & e.$$.dirty[7] && o(48, (H = 'landscape' === N)),
        67584 & e.$$.dirty[7] && o(235, (U = j || 'short' === D)),
        (4096 & e.$$.dirty[0]) | (128 & e.$$.dirty[6]) &&
          o(236, (X = Ca && at && na === at.width && !aa)),
        2097152 & e.$$.dirty[7] && o(237, (Y = Qt && Qt.length)),
        8388608 & e.$$.dirty[5] && o(239, (G = 'has-navigation-preference-' + wi)),
        16777216 & e.$$.dirty[5] && o(240, (q = 'has-navigation-preference-' + Si)),
        2 & e.$$.dirty[0] && o(241, (K = Ri && getComputedStyle(Ri))),
        16777216 & e.$$.dirty[7] && K && Pa(),
        (2752576 & e.$$.dirty[0]) | (132 & e.$$.dirty[5]) | (248446464 & e.$$.dirty[7]) &&
          sa.set({
            ...eo,
            layoutMode: Zo,
            orientation: N,
            horizontalSpace: z,
            verticalSpace: D,
            navigationHorizontalPreference: G,
            navigationVerticalPreference: q,
            isModal: O,
            isDisabled: qo,
            isCentered: Z,
            isCenteredHorizontally: V,
            isCenteredVertically: _,
            isAnimated: Ft,
            pointerAccuracy: to,
            pointerHoverable: oo,
            isCompact: U,
            hasSwipeNavigation: X,
            hasLimitedSpace: B,
            hasToolbar: pi,
            hasNavigation: L && r,
            isIOS: Ca,
          }),
        33554432 & e.$$.dirty[7] &&
          o(
            49,
            (J = Object.entries(eo)
              .map(([e, t]) => (/^is|has/.test(e) ? (t ? mu(e) : void 0) : t))
              .filter(Boolean)
              .join(' '))
          ),
        1048576 & e.$$.dirty[0] && P && va.set([]),
        805306368 & e.$$.dirty[7] &&
          o(
            50,
            (Q =
              io &&
              Object.entries(no)
                .filter(([, e]) => null != e)
                .reduce((e, [, t]) => (e = { ...e, ...t }), {}))
          ),
        256 & e.$$.dirty[6] && o(247, (ce = st && 'any-to-file' === st.task)),
        1073741824 & e.$$.dirty[7] && ce && ba && ba.clear(),
        1 & e.$$.dirty[8] && o(249, (te = !!ro && !!ro.translation)),
        (134217729 & e.$$.dirty[6]) | (2 & e.$$.dirty[8]) &&
          te &&
          Nt &&
          Nt !== Ea &&
          (o(186, (Ea = Nt)), Ra()),
        3 & e.$$.dirty[8] && te && Aa(ro),
        67108864 & e.$$.dirty[0] && ao && ao.length > 1)
      ) {
        let e = []
        ba.forEach((t, o) => {
          0 !== o && t.get().opacity <= 0 && e.push(t)
        }),
          e.forEach((e) => ba.remove(e))
      }
      if (
        ((4 & e.$$.dirty[0]) | (4 & e.$$.dirty[8]) &&
          o(27, (ae = No && oe.length && No.labelSupportError(oe))),
        256 & e.$$.dirty[6] && o(251, (de = st && !!st.error)),
        256 & e.$$.dirty[6] && o(28, (ue = !st || (!st.complete && void 0 === st.task))),
        256 & e.$$.dirty[6] &&
          o(252, (he = st && (st.taskLengthComputable ? st.taskProgress : 1 / 0))),
        1073741824 & e.$$.dirty[7] && ce && In(Ur, (so = !1), so),
        (2097152 & e.$$.dirty[0]) | (258 & e.$$.dirty[6]) && st && st.complete)
      ) {
        const e = Ft ? 250 : 0
        clearTimeout(Fa),
          o(
            187,
            (Fa = setTimeout(() => {
              In(Ur, (so = !0), so)
            }, e))
          )
      }
      if (
        ((268435456 & e.$$.dirty[0]) | (256 & e.$$.dirty[6]) | (72 & e.$$.dirty[8]) &&
          o(253, (pe = st && !de && !ue && !so)),
        (1073741824 & e.$$.dirty[5]) | (402653184 & e.$$.dirty[6]) &&
          o(255, ($e = !(!Ht || (Nt && !Yr)))),
        (32 & e.$$.dirty[7]) | (512 & e.$$.dirty[8]) &&
          o(256, (ye = Kt || (lo && void 0 !== lo.progress && !lo.complete))),
        (268435456 & e.$$.dirty[0]) | (256 & e.$$.dirty[6]) &&
          o(258, (be = st && !(st.error || ue))),
        (4 & e.$$.dirty[0]) | (256 & e.$$.dirty[6]) &&
          o(
            259,
            (xe =
              No &&
              (st
                ? !st.complete || st.error
                  ? Vs(No.statusLabelLoadImage(st), st.error && st.error.metadata, '{', '}')
                  : No.statusLabelLoadImage({
                      progress: 1 / 0,
                      task: 'blob-to-bitmap',
                    })
                : No.statusLabelLoadImage(st)))
          ),
        (4 & e.$$.dirty[0]) | (512 & e.$$.dirty[8]) &&
          o(260, (ve = lo && No && No.statusLabelProcessImage(lo))),
        512 & e.$$.dirty[8] &&
          o(261, (we = lo && (lo.taskLengthComputable ? lo.taskProgress : 1 / 0))),
        512 & e.$$.dirty[8] && o(262, (Se = lo && !lo.error)),
        512 & e.$$.dirty[8] && o(263, (ke = lo && lo.error)),
        (268435460 & e.$$.dirty[0]) | (1073741824 & e.$$.dirty[4]) | (64952 & e.$$.dirty[8]))
      )
        if (Ko) {
          let e, t, i, n, r
          w(Ko) && (e = Ko),
            uo(Ko)
              ? (t = Ko)
              : Array.isArray(Ko) && (([e, t, r] = Ko), !1 === t && (n = !0), uo(t) && (i = !0)),
            o(
              14,
              (Da = (e || t) && {
                text: e,
                aside: n || i,
                progressIndicator: {
                  visible: i,
                  progress: t,
                },
                closeButton: n && {
                  label: No.statusLabelButtonClose,
                  icon: No.statusIconButtonClose,
                  onclick: r || (() => o(154, (Ko = void 0))),
                },
              })
            )
        } else
          o(
            14,
            (Da =
              (No && ue) || de || pe || $e
                ? {
                    text: xe,
                    aside: de || be,
                    progressIndicator: {
                      visible: be,
                      progress: he,
                    },
                    closeButton: de && {
                      label: No.statusLabelButtonClose,
                      icon: No.statusIconButtonClose,
                      onclick: Na,
                    },
                  }
                : No && ye && ve
                ? {
                    text: ve,
                    aside: ke || Se,
                    progressIndicator: {
                      visible: Se,
                      progress: we,
                    },
                    closeButton: ke && {
                      label: No.statusLabelButtonClose,
                      icon: No.statusIconButtonClose,
                      onclick: Ha,
                    },
                  }
                : void 0)
          )
      if (
        (1073741824 & e.$$.dirty[4] && o(264, (Me = void 0 !== Ko)),
        (2097152 & e.$$.dirty[0]) | (4096 & e.$$.dirty[7]) | (512 & e.$$.dirty[8]) &&
          O &&
          lo &&
          lo.complete &&
          (Ba.set(!0), setTimeout(() => Ba.set(!1), Ft ? 100 : 0)),
        (402653184 & e.$$.dirty[0]) | (328104 & e.$$.dirty[8]) &&
          o(265, (Ce = co || ae || ue || de || pe || $e || ye || Me)),
        131072 & e.$$.dirty[8] && In(La, (ho = Ce ? 1 : 0), ho),
        (2097152 & e.$$.dirty[0]) | (131072 & e.$$.dirty[8]) &&
          La.set(Ce ? 1 : 0, {
            duration: Ft ? 500 : 1,
          }),
        536870912 & e.$$.dirty[0] && o(30, (Te = ho > 0)),
        16384 & e.$$.dirty[0] && o(267, (Pe = !(!Da || !Da.aside))),
        (1075855360 & e.$$.dirty[0]) | (4 & e.$$.dirty[6]) | (1572864 & e.$$.dirty[8]) && Te && Da)
      ) {
        clearTimeout(ja)
        const e = {
          hard: !1 === Ft,
        }
        if (Pe) {
          const t = !!Da.error || !Ft
          Wa.set(1, e),
            Oa.set(po, {
              hard: t,
            }),
            o(
              188,
              (ja = setTimeout(() => {
                Va.set(16, e)
              }, 1))
            )
        } else
          Wa.set(0, e),
            o(
              188,
              (ja = setTimeout(() => {
                Va.set(0, e)
              }, 1))
            )
      }
      if (
        (1073741824 & e.$$.dirty[0] &&
          (Te ||
            (Za.set(void 0, {
              hard: !0,
            }),
            Oa.set(void 0, {
              hard: !0,
            }),
            Va.set(0, {
              hard: !0,
            }))),
        4194304 & e.$$.dirty[8] && o(269, (Ie = 0.5 * mo)),
        10485760 & e.$$.dirty[8] && o(51, (Re = `transform: translateX(${go - Ie}px)`)),
        (134217728 & e.$$.dirty[0]) | (134217728 & e.$$.dirty[6]) && o(31, (_e = Nt && !ae)),
        (1 & e.$$.dirty[1]) | (4096 & e.$$.dirty[7]) && o(272, (Ee = Gt() && (_e || O) ? Ua : n)),
        16777216 & e.$$.dirty[8] && o(52, (Le = Ee)),
        16777216 & e.$$.dirty[8] && o(53, (Fe = Ee)),
        (4 & e.$$.dirty[0]) |
          (2 & e.$$.dirty[1]) |
          (190464 & e.$$.dirty[5]) |
          (36765716 & e.$$.dirty[7]) &&
          o(
            54,
            (ze =
              No &&
              fo &&
              Tu(() =>
                li(
                  [
                    [
                      'div',
                      'alpha',
                      {
                        class: 'PinturaNavGroup',
                      },
                      [
                        [
                          'div',
                          'alpha-set',
                          {
                            class: 'PinturaNavSet',
                          },
                          [
                            gi && [
                              'Button',
                              'close',
                              {
                                label: No.labelClose,
                                icon: No.iconButtonClose,
                                onclick: () => Vo('close'),
                                hideLabel: !0,
                              },
                            ],
                            ui && [
                              'Button',
                              'revert',
                              {
                                label: No.labelButtonRevert,
                                icon: No.iconButtonRevert,
                                disabled: !x,
                                onclick: pa,
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
                      {
                        class: 'PinturaNavGroup PinturaNavGroupFloat',
                      },
                      [
                        hi && [
                          'div',
                          'history',
                          {
                            class: 'PinturaNavSet',
                          },
                          [
                            [
                              'Button',
                              'undo',
                              {
                                label: No.labelButtonUndo,
                                icon: No.iconButtonUndo,
                                disabled: !x,
                                onclick: da.undo,
                                hideLabel: !0,
                              },
                            ],
                            [
                              'Button',
                              'redo',
                              {
                                label: No.labelButtonRedo,
                                icon: No.iconButtonRedo,
                                disabled: !v,
                                onclick: da.redo,
                                hideLabel: !0,
                              },
                            ],
                          ],
                        ],
                        Y && [
                          'div',
                          'plugin-tools',
                          {
                            class: 'PinturaNavSet',
                          },
                          Qt.filter(Boolean).map(([e, t, o]) => [e, t, { ...o }]),
                        ],
                      ],
                    ],
                    [
                      'div',
                      'gamma',
                      {
                        class: 'PinturaNavGroup',
                      },
                      [
                        di && [
                          'Button',
                          'export',
                          {
                            label: No.labelButtonExport,
                            icon: j && No.iconButtonExport,
                            class: 'PinturaButtonExport',
                            onclick: ga,
                            hideLabel: j,
                          },
                        ],
                      ],
                    ],
                  ],
                  { ...eo },
                  () => Li.set({})
                )
              ))
          ),
        262144 & e.$$.dirty[0] && o(273, (Be = et && et.width > 0 && et.height > 0)),
        (4 & e.$$.dirty[0]) | (256 & e.$$.dirty[7]) | (33554432 & e.$$.dirty[8]) &&
          o(55, (De = Be && No && M)),
        134217728 & e.$$.dirty[8] && o(274, (Oe = yo && !!yo.length)),
        (16384 & e.$$.dirty[6]) | (201326592 & e.$$.dirty[8]) && o(276, (We = Oe && hn(Rt, yo))),
        (134217728 & e.$$.dirty[6]) | (1946157056 & e.$$.dirty[8]) &&
          Oe &&
          ((e, t, i, n) => {
            if (!t) return
            const r = {
              dataSizeScalar: i,
            }
            n && n[3] > 0 && (r.backgroundColor = [...n]),
              t(e, r).then((e) => {
                Ka && g(Ka), o(189, (Ka = e))
              })
          })(Nt, bo, We, vo),
        (16392 & e.$$.dirty[6]) | (134217728 & e.$$.dirty[8]) && yo && Ka && Rt)
      ) {
        const { width: e, height: t } = Rt
        o(
          15,
          (Qa = yo.map((o) => {
            const i = qe(o.x, o.y, o.width, o.height),
              n = lt(je(i), o.rotation).map((o) => ne(o.x / e, o.y / t))
            return {
              ...o,
              id: 'redaction',
              flipX: !1,
              flipY: !1,
              cornerRadius: 0,
              strokeWidth: 0,
              strokeColor: void 0,
              backgroundColor: [0, 0, 0],
              backgroundImage: Ka,
              backgroundImageRendering: 'pixelated',
              backgroundCorners: n,
            }
          }))
        )
      }
      65536 & e.$$.dirty[0] && Ja && es.set(Ja),
        (2 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) && _e && Ri.dispatchEvent(hu('ready')),
        4 & e.$$.dirty[1] && o(37, (ps = !0)),
        8 & e.$$.dirty[1] && o(38, (ms = !0)),
        16 & e.$$.dirty[1] && o(39, (gs = !0)),
        32768 & e.$$.dirty[0] && o(40, ($s = !0))
    }),
    o(215, ($ = !Os())),
    (f =
      1 === Tc()
        ? (e) => {
            e && (me(e.origin, Math.round), me(e.translation, Math.round))
          }
        : W),
    o(250, (oe = [!xu() && 'WebGL'].filter(Boolean))),
    o(
      56,
      (Ve = (
        (e, t = !0) =>
        (o) => {
          'ping' === o.type && (t && o.stopPropagation(), e(o.detail.type, o.detail.data))
        }
      )(Wo.pub))
    ),
    [
      Ii,
      Ri,
      No,
      Uo,
      ti,
      ai,
      pi,
      xi,
      Ti,
      Ni,
      Gr,
      da,
      na,
      ra,
      Da,
      Qa,
      Ja,
      r,
      et,
      L,
      P,
      Ft,
      zt,
      Dt,
      C,
      I,
      ao,
      ae,
      ue,
      ho,
      Te,
      _e,
      fo,
      Mo,
      Co,
      Po,
      Ma,
      ps,
      ms,
      gs,
      $s,
      Ue,
      It,
      Yt,
      R,
      A,
      E,
      F,
      H,
      J,
      Q,
      Re,
      Le,
      Fe,
      ze,
      De,
      Ve,
      Io,
      Ro,
      Ao,
      Eo,
      Lo,
      Fo,
      zo,
      Bo,
      Ai,
      Ei,
      Li,
      Fi,
      Di,
      Xi,
      Yi,
      Gi,
      qi,
      Ki,
      Qi,
      mn,
      xn,
      kn,
      Mn,
      Cn,
      Tn,
      Pn,
      Rn,
      An,
      En,
      Ln,
      Bn,
      Dn,
      On,
      Vn,
      _n,
      Zn,
      jn,
      Nn,
      Hn,
      Un,
      Yn,
      Gn,
      qn,
      Kn,
      Jn,
      Qn,
      tr,
      or,
      ir,
      nr,
      lr,
      pr,
      mr,
      br,
      xr,
      Sr,
      kr,
      Br,
      Wr,
      Vr,
      _r,
      Zr,
      jr,
      Nr,
      Hr,
      Ur,
      Xr,
      ea,
      ta,
      oa,
      sa,
      ca,
      ma,
      ba,
      va,
      Sa,
      ({ target: e, propertyName: t }) => {
        e === Ri && /background|outline/.test(t) && Pa()
      },
      Ia,
      La,
      Ba,
      Oa,
      Wa,
      Va,
      _a,
      Za,
      (e) => {
        const t = !(!Da || !Da.closeButton) || !Ft
        _a.set(e.detail.width, {
          hard: t,
        }),
          Za.set(Math.round(0.5 * -e.detail.width), {
            hard: t,
          })
      },
      Xa,
      Ya,
      (e) => {
        const { keyCode: t, metaKey: o, ctrlKey: i, shiftKey: n } = e
        if (9 === t && qo) return void e.preventDefault()
        if (
          (e.target && 32 === t && Ri.contains(e.target) && !pu(e.target) && e.preventDefault(),
          90 === t && (o || i))
        )
          return void (n && o ? da.redo() : da.undo())
        if (89 === t && i) return void da.redo()
        if (229 === t) return
        if (o || i) return
        const r = new Set([...$o, t])
        Ya.set(Array.from(r))
      },
      ({ keyCode: e }) => {
        Ya.set($o.filter((t) => t !== e))
      },
      () => {
        Ya.set([])
      },
      (e) => {
        pu(e.target) || e.preventDefault()
      },
      (e) => {
        fi && Ga(e.detail.resources[0])
      },
      () => {
        yi && Cu().then(qa)
      },
      (e) => {
        if (!$i) return
        const t = $a((na - Math.abs(at.x)) / at.width, 0, 1),
          o = $a((ra - Math.abs(at.y)) / at.height, 0, 1)
        ;(t < 0.75 && o < 0.75) || Ga((e.clipboardData || window.clipboardData).files[0])
      },
      ts,
      hs,
      Ko,
      qr,
      _o,
      Zo,
      jo,
      Xo,
      Yo,
      Go,
      qo,
      ei,
      oi,
      ri,
      li,
      ci,
      di,
      ui,
      hi,
      mi,
      gi,
      fi,
      $i,
      yi,
      bi,
      vi,
      wi,
      Si,
      ki,
      Mi,
      Ci,
      Pi,
      zi,
      Yr,
      Ea,
      Fa,
      ja,
      Ka,
      i,
      Ye,
      Ge,
      at,
      st,
      dt,
      S,
      vt,
      kt,
      Pt,
      Rt,
      l,
      Bt,
      Ot,
      c,
      Wt,
      d,
      Vt,
      u,
      _t,
      m,
      Zt,
      jt,
      Nt,
      Ht,
      $,
      y,
      b,
      Ut,
      x,
      qt,
      v,
      Kt,
      Jt,
      k,
      M,
      z,
      B,
      D,
      O,
      V,
      _,
      Z,
      j,
      N,
      U,
      X,
      Y,
      Qt,
      G,
      q,
      K,
      eo,
      to,
      oo,
      io,
      no,
      ce,
      ro,
      te,
      oe,
      de,
      he,
      pe,
      so,
      $e,
      ye,
      lo,
      be,
      xe,
      ve,
      we,
      Se,
      ke,
      Me,
      Ce,
      co,
      Pe,
      po,
      Ie,
      mo,
      go,
      Ee,
      Be,
      Oe,
      yo,
      We,
      bo,
      vo,
      function () {
        o(12, (na = Pu.innerWidth)), o(13, (ra = Pu.innerHeight))
      },
      (e) => In(jn, (Ao = e.detail), Ao),
      ({ detail: e }) => o(20, (P = e)),
      (e, t) => t.id === e,
      function (t, i) {
        e.$$.not_equal(Ii[i], t) && ((Ii[i] = t), o(0, Ii), o(8, Ti), o(182, Ci))
      },
      (e) => In(Nn, (It = e.detail), It),
      (e) => o(36, (Ma = Ma.concat(e))),
      (e) => o(36, (Ma = Ma.filter((t) => t !== e))),
      (e, { detail: t }) => o(25, (I[e] = t), I),
      (e) => In(Zn, (Yt = e.detail), Yt),
      (e) => e.id === P,
      function (t) {
        e.$$.not_equal(Ii[P], t) && ((Ii[P] = t), o(0, Ii), o(8, Ti), o(182, Ci))
      },
      (e) => In(Nn, (It = e.detail), It),
      () => o(36, (Ma = Ma.concat(P))),
      () => o(36, (Ma = Ma.filter((e) => e !== P))),
      ({ detail: e }) => o(25, (I[P] = e), I),
      (e) => {
        const t = { ...e, ...ts() },
          {
            annotationShapes: o,
            decorationShapes: i,
            interfaceShapes: n,
            frameShapes: r,
          } = ai(
            {
              annotationShapes: Mo,
              decorationShapes: Co,
              interfaceShapes: zo,
              frameShapes: Po,
            },
            t
          )
        return hs(t, Qa, o, i, n, r)
      },
      () => {
        o(37, (ps = !1)), o(38, (ms = !1)), o(39, (gs = !1)), o(40, ($s = !1))
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(Ja = e), o(16, Ja)
        })
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(Ri = e), o(1, Ri)
        })
      },
      (e) => In(Vn, (et = e.detail), et),
    ]
  )
}
class Ju extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        Ku,
        Gu,
        xn,
        {
          class: 156,
          layout: 157,
          stores: 158,
          locale: 2,
          id: 3,
          util: 159,
          utils: 160,
          animations: 161,
          disabled: 162,
          status: 154,
          previewUpscale: 163,
          elasticityMultiplier: 4,
          willRevert: 164,
          willProcessImage: 165,
          willRenderCanvas: 5,
          willRenderToolbar: 166,
          willSetHistoryInitialState: 167,
          enableButtonExport: 168,
          enableButtonRevert: 169,
          enableNavigateHistory: 170,
          enableToolbar: 6,
          enableUtils: 171,
          enableButtonClose: 172,
          enableDropImage: 173,
          enablePasteImage: 174,
          enableBrowseImage: 175,
          previewImageDataMaxSize: 176,
          previewImageTextPixelRatio: 7,
          layoutDirectionPreference: 177,
          layoutHorizontalUtilsPreference: 178,
          layoutVerticalUtilsPreference: 179,
          imagePreviewSrc: 180,
          imageOrienter: 181,
          pluginComponents: 182,
          pluginOptions: 8,
          sub: 183,
          pluginInterface: 0,
          root: 1,
          imageSourceToImageData: 9,
          imagePreview: 10,
          imagePreviewCurrent: 155,
          history: 11,
        },
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
      )
  }
  get class() {
    return this.$$.ctx[156]
  }
  set class(e) {
    this.$set({
      class: e,
    }),
      Cr()
  }
  get layout() {
    return this.$$.ctx[157]
  }
  set layout(e) {
    this.$set({
      layout: e,
    }),
      Cr()
  }
  get stores() {
    return this.$$.ctx[158]
  }
  set stores(e) {
    this.$set({
      stores: e,
    }),
      Cr()
  }
  get locale() {
    return this.$$.ctx[2]
  }
  set locale(e) {
    this.$set({
      locale: e,
    }),
      Cr()
  }
  get id() {
    return this.$$.ctx[3]
  }
  set id(e) {
    this.$set({
      id: e,
    }),
      Cr()
  }
  get util() {
    return this.$$.ctx[159]
  }
  set util(e) {
    this.$set({
      util: e,
    }),
      Cr()
  }
  get utils() {
    return this.$$.ctx[160]
  }
  set utils(e) {
    this.$set({
      utils: e,
    }),
      Cr()
  }
  get animations() {
    return this.$$.ctx[161]
  }
  set animations(e) {
    this.$set({
      animations: e,
    }),
      Cr()
  }
  get disabled() {
    return this.$$.ctx[162]
  }
  set disabled(e) {
    this.$set({
      disabled: e,
    }),
      Cr()
  }
  get status() {
    return this.$$.ctx[154]
  }
  set status(e) {
    this.$set({
      status: e,
    }),
      Cr()
  }
  get previewUpscale() {
    return this.$$.ctx[163]
  }
  set previewUpscale(e) {
    this.$set({
      previewUpscale: e,
    }),
      Cr()
  }
  get elasticityMultiplier() {
    return this.$$.ctx[4]
  }
  set elasticityMultiplier(e) {
    this.$set({
      elasticityMultiplier: e,
    }),
      Cr()
  }
  get willRevert() {
    return this.$$.ctx[164]
  }
  set willRevert(e) {
    this.$set({
      willRevert: e,
    }),
      Cr()
  }
  get willProcessImage() {
    return this.$$.ctx[165]
  }
  set willProcessImage(e) {
    this.$set({
      willProcessImage: e,
    }),
      Cr()
  }
  get willRenderCanvas() {
    return this.$$.ctx[5]
  }
  set willRenderCanvas(e) {
    this.$set({
      willRenderCanvas: e,
    }),
      Cr()
  }
  get willRenderToolbar() {
    return this.$$.ctx[166]
  }
  set willRenderToolbar(e) {
    this.$set({
      willRenderToolbar: e,
    }),
      Cr()
  }
  get willSetHistoryInitialState() {
    return this.$$.ctx[167]
  }
  set willSetHistoryInitialState(e) {
    this.$set({
      willSetHistoryInitialState: e,
    }),
      Cr()
  }
  get enableButtonExport() {
    return this.$$.ctx[168]
  }
  set enableButtonExport(e) {
    this.$set({
      enableButtonExport: e,
    }),
      Cr()
  }
  get enableButtonRevert() {
    return this.$$.ctx[169]
  }
  set enableButtonRevert(e) {
    this.$set({
      enableButtonRevert: e,
    }),
      Cr()
  }
  get enableNavigateHistory() {
    return this.$$.ctx[170]
  }
  set enableNavigateHistory(e) {
    this.$set({
      enableNavigateHistory: e,
    }),
      Cr()
  }
  get enableToolbar() {
    return this.$$.ctx[6]
  }
  set enableToolbar(e) {
    this.$set({
      enableToolbar: e,
    }),
      Cr()
  }
  get enableUtils() {
    return this.$$.ctx[171]
  }
  set enableUtils(e) {
    this.$set({
      enableUtils: e,
    }),
      Cr()
  }
  get enableButtonClose() {
    return this.$$.ctx[172]
  }
  set enableButtonClose(e) {
    this.$set({
      enableButtonClose: e,
    }),
      Cr()
  }
  get enableDropImage() {
    return this.$$.ctx[173]
  }
  set enableDropImage(e) {
    this.$set({
      enableDropImage: e,
    }),
      Cr()
  }
  get enablePasteImage() {
    return this.$$.ctx[174]
  }
  set enablePasteImage(e) {
    this.$set({
      enablePasteImage: e,
    }),
      Cr()
  }
  get enableBrowseImage() {
    return this.$$.ctx[175]
  }
  set enableBrowseImage(e) {
    this.$set({
      enableBrowseImage: e,
    }),
      Cr()
  }
  get previewImageDataMaxSize() {
    return this.$$.ctx[176]
  }
  set previewImageDataMaxSize(e) {
    this.$set({
      previewImageDataMaxSize: e,
    }),
      Cr()
  }
  get previewImageTextPixelRatio() {
    return this.$$.ctx[7]
  }
  set previewImageTextPixelRatio(e) {
    this.$set({
      previewImageTextPixelRatio: e,
    }),
      Cr()
  }
  get layoutDirectionPreference() {
    return this.$$.ctx[177]
  }
  set layoutDirectionPreference(e) {
    this.$set({
      layoutDirectionPreference: e,
    }),
      Cr()
  }
  get layoutHorizontalUtilsPreference() {
    return this.$$.ctx[178]
  }
  set layoutHorizontalUtilsPreference(e) {
    this.$set({
      layoutHorizontalUtilsPreference: e,
    }),
      Cr()
  }
  get layoutVerticalUtilsPreference() {
    return this.$$.ctx[179]
  }
  set layoutVerticalUtilsPreference(e) {
    this.$set({
      layoutVerticalUtilsPreference: e,
    }),
      Cr()
  }
  get imagePreviewSrc() {
    return this.$$.ctx[180]
  }
  set imagePreviewSrc(e) {
    this.$set({
      imagePreviewSrc: e,
    }),
      Cr()
  }
  get imageOrienter() {
    return this.$$.ctx[181]
  }
  set imageOrienter(e) {
    this.$set({
      imageOrienter: e,
    }),
      Cr()
  }
  get pluginComponents() {
    return this.$$.ctx[182]
  }
  set pluginComponents(e) {
    this.$set({
      pluginComponents: e,
    }),
      Cr()
  }
  get pluginOptions() {
    return this.$$.ctx[8]
  }
  set pluginOptions(e) {
    this.$set({
      pluginOptions: e,
    }),
      Cr()
  }
  get sub() {
    return this.$$.ctx[183]
  }
  get pluginInterface() {
    return this.$$.ctx[0]
  }
  get root() {
    return this.$$.ctx[1]
  }
  set root(e) {
    this.$set({
      root: e,
    }),
      Cr()
  }
  get imageSourceToImageData() {
    return this.$$.ctx[9]
  }
  set imageSourceToImageData(e) {
    this.$set({
      imageSourceToImageData: e,
    }),
      Cr()
  }
  get imagePreview() {
    return this.$$.ctx[10]
  }
  get imagePreviewCurrent() {
    return this.$$.ctx[155]
  }
  set imagePreviewCurrent(e) {
    this.$set({
      imagePreviewCurrent: e,
    }),
      Cr()
  }
  get history() {
    return this.$$.ctx[11]
  }
}
;((e) => {
  const [t, o, i, n, r, a, s] = [
    'UmVnRXhw',
    'dGVzdA==',
    'cHFpbmFcLm5sfGxvY2FsaG9zdA==',
    'bG9jYXRpb24=',
    'Y29uc29sZQ==',
    'bG9n',
    'VGhpcyB2ZXJzaW9uIG9mIFBpbnR1cmEgaXMgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS4gVmlzaXQgaHR0cHM6Ly9wcWluYS5ubC9waW50dXJhLyB0byBvYnRhaW4gYSBjb21tZXJjaWFsIGxpY2Vuc2Uu',
  ].map(e[[(!1 + '')[1], (!0 + '')[0], (1 + {})[2], (1 + {})[3]].join('')])
  new e[t](i)[o](e[n]) || e[r][a](s)
})(window)
const Qu = ['klass', 'stores', 'isVisible', 'isActive', 'isActiveFraction', 'locale'],
  eh = [
    'history',
    'klass',
    'stores',
    'navButtons',
    'pluginComponents',
    'pluginInterface',
    'pluginOptions',
    'sub',
    'imagePreviewSrc',
    'imagePreview',
    'imagePreviewCurrent',
  ],
  th = ['locale']
let oh
const ih = new Set([]),
  nh = {},
  rh = new Map(),
  ah = (...e) => {
    e.filter((e) => !!e.util).forEach((e) => {
      const [t, o] = e.util
      rh.has(t) ||
        (rh.set(t, o),
        Vl(o)
          .filter((e) => !Qu.includes(e))
          .forEach((e) => {
            ih.add(e), nh[e] ? nh[e].push(t) : (nh[e] = [t])
          }))
    })
  }
var sh = [
  ...Ta,
  'init',
  'undo',
  'redo',
  'update',
  'revert',
  'destroy',
  'show',
  'hide',
  'close',
  'ready',
  'loadpreview',
  'selectshape',
  'updateshape',
  'addshape',
  'removeshape',
  'selectstyle',
]
var lh = (e, t, o = {}) => {
    const { prefix: i = 'pintura:' } = o
    return sh.map((o) =>
      e.on(o, (e) =>
        Mt(t)
          ? ((e, t, o) =>
              e.dispatchEvent(
                new CustomEvent(t, {
                  detail: o,
                  bubbles: !0,
                  cancelable: !0,
                })
              ))(t, `${i}${o}`, e)
          : t(o, e)
      )
    )
  },
  ch = (e) => {
    if (void 0 === e || uo(e)) return e
    if (!w(e)) return !1
    const t = e
    if (!t.length) return
    const [o, i] = t
      .split(/\/|:/g)
      .map((e) => parseFloat(e.replace(/,/, '.')))
      .filter(Boolean)
    return !!o && (i ? Math.abs(o / i) : o)
  }
const dh = (e) => w(e[0]),
  uh = (e) => !dh(e),
  hh = (e) => e[1],
  ph = (e) => e[3] || []

function mh(e, t, o, i) {
  return Array.isArray(o) && ((i = o), (o = {})), [e, t, o || {}, i || []]
}
const gh = (e, t, o, i = (e) => e) => {
    const n = vh(t, o),
      r = n.findIndex((e) => hh(e) === t)
    var a, s, l
    ;(a = n), (s = i(r)), (l = e), a.splice(s, 0, l)
  },
  fh = (e, t, o) => gh(e, t, o),
  $h = (e, t, o) => gh(e, t, o, (e) => e + 1),
  yh = (e, t) => {
    if (uh(t)) return t.push(e)
    t[3] = [...ph(t), e]
  },
  bh = (e, t) => {
    const o = vh(e, t)
    return ec(o, (t) => hh(t) === e), o
  },
  xh = (e, t) => {
    if (t)
      return dh(t)
        ? hh(t) === e
          ? t
          : xh(e, ph(t))
        : Array.isArray(t)
        ? t.find((t) => xh(e, t))
        : void 0
  },
  vh = (e, t) =>
    uh(t) ? (t.find((t) => hh(t) === e) ? t : t.find((t) => vh(e, ph(t)))) : vh(e, ph(t))
var wh = () => {}
let Sh = null
var kh = () => (
    null === Sh &&
      (Sh =
        c() &&
        !('[object OperaMini]' === Object.prototype.toString.call(window.operamini)) &&
        'visibilityState' in document &&
        'Promise' in window &&
        'File' in window &&
        'URL' in window &&
        'createObjectURL' in window.URL &&
        'performance' in window),
    Sh
  ),
  Mh = (e) => Math.round(100 * e)
const Ch = {
    base: 0,
    min: -0.25,
    max: 0.25,
    getLabel: (e) => Mh(e / 0.25),
    getStore: ({ imageColorMatrix: e }) => e,
    getValue: (e) => {
      if (e.brightness) return e.brightness[4]
    },
    setValue: (e, t) =>
      e.update((e) => ({
        ...e,
        brightness: [1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0],
      })),
  },
  Th = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (e) => Mh(2 * (e - 0.5) - 1),
    getStore: ({ imageColorMatrix: e }) => e,
    getValue: (e) => {
      if (e.contrast) return e.contrast[0]
    },
    setValue: (e, t) =>
      e.update((e) => ({
        ...e,
        contrast: [
          t,
          0,
          0,
          0,
          0.5 * (1 - t),
          0,
          t,
          0,
          0,
          0.5 * (1 - t),
          0,
          0,
          t,
          0,
          0.5 * (1 - t),
          0,
          0,
          0,
          1,
          0,
        ],
      })),
  },
  Ph = {
    base: 1,
    min: 0,
    max: 2,
    getLabel: (e) => Mh(e - 1),
    getStore: ({ imageColorMatrix: e }) => e,
    getValue: (e) => {
      if (e.saturation) return (e.saturation[0] - 0.213) / 0.787
    },
    setValue: (e, t) =>
      e.update((e) => ({
        ...e,
        saturation: [
          0.213 + 0.787 * t,
          0.715 - 0.715 * t,
          0.072 - 0.072 * t,
          0,
          0,
          0.213 - 0.213 * t,
          0.715 + 0.285 * t,
          0.072 - 0.072 * t,
          0,
          0,
          0.213 - 0.213 * t,
          0.715 - 0.715 * t,
          0.072 + 0.928 * t,
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
  Ih = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (e) => Mh(2 * (e - 0.5) - 1),
    getStore: ({ imageColorMatrix: e }) => e,
    getValue: (e) => {
      if (e.exposure) return e.exposure[0]
    },
    setValue: (e, t) =>
      e.update((e) => ({
        ...e,
        exposure: [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0],
      })),
  },
  Rh = {
    base: 1,
    min: 0.15,
    max: 4,
    getLabel: (e) => Mh(e < 1 ? (e - 0.15) / 0.85 - 1 : (e - 1) / 3),
    getStore: ({ imageGamma: e }) => e,
  },
  Ah = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageVignette: e }) => e,
  },
  Eh = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageConvolutionMatrix: e }) => e,
    getValue: (e) => {
      if (e.clarity) return 0 === e.clarity[0] ? e.clarity[1] / -1 : e.clarity[1] / -2
    },
    setValue: (e, t) => {
      e.update((e) => ({
        ...e,
        clarity:
          t >= 0
            ? [0, -1 * t, 0, -1 * t, 1 + 4 * t, -1 * t, 0, -1 * t, 0]
            : [-1 * t, -2 * t, -1 * t, -2 * t, 1 + -3 * t, -2 * t, -1 * t, -2 * t, -1 * t],
      }))
    },
  },
  Lh = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageColorMatrix: e }) => e,
    getValue: (e) => {
      if (!e.temperature) return
      const t = e.temperature[0]
      return t >= 1 ? (t - 1) / 0.1 : (1 - t) / -0.15
    },
    setValue: (e, t) =>
      e.update((e) => ({
        ...e,
        temperature:
          t > 0
            ? [1 + 0.1 * t, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 + 0.1 * -t, 0, 0, 0, 0, 0, 1, 0]
            : [
                1 + 0.15 * t,
                0,
                0,
                0,
                0,
                0,
                1 + 0.05 * t,
                0,
                0,
                0,
                0,
                0,
                1 + 0.15 * -t,
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
var Fh = {
  finetuneControlConfiguration: {
    gamma: Rh,
    brightness: Ch,
    contrast: Th,
    saturation: Ph,
    exposure: Ih,
    temperature: Lh,
    clarity: Eh,
    vignette: Ah,
  },
  finetuneOptions: [
    ['brightness', (e) => e.finetuneLabelBrightness],
    ['contrast', (e) => e.finetuneLabelContrast],
    ['saturation', (e) => e.finetuneLabelSaturation],
    ['exposure', (e) => e.finetuneLabelExposure],
    ['temperature', (e) => e.finetuneLabelTemperature],
    ['gamma', (e) => e.finetuneLabelGamma],
    !Os() && ['clarity', (e) => e.finetuneLabelClarity],
    ['vignette', (e) => e.finetuneLabelVignette],
  ].filter(Boolean),
}
const zh = () => [
    0.75, 0.25, 0.25, 0, 0, 0.25, 0.75, 0.25, 0, 0, 0.25, 0.25, 0.75, 0, 0, 0, 0, 0, 1, 0,
  ],
  Bh = () => [
    1.398, -0.316, 0.065, -0.273, 0.201, -0.051, 1.278, -0.08, -0.273, 0.201, -0.051, 0.119, 1.151,
    -0.29, 0.215, 0, 0, 0, 1, 0,
  ],
  Dh = () => [
    1.073, -0.015, 0.092, -0.115, -0.017, 0.107, 0.859, 0.184, -0.115, -0.017, 0.015, 0.077, 1.104,
    -0.115, -0.017, 0, 0, 0, 1, 0,
  ],
  Oh = () => [1.06, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0.93, 0, 0, 0, 0, 0, 1, 0],
  Wh = () => [1.1, 0, 0, 0, -0.1, 0, 1.1, 0, 0, -0.1, 0, 0, 1.2, 0, -0.1, 0, 0, 0, 1, 0],
  Vh = () => [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0],
  _h = () => [
    0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0, 0, 0, 1, 0,
  ],
  Zh = () => [
    0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0, 0, 0,
    1, 0,
  ],
  jh = () => [
    0.163, 0.518, 0.084, -0.01, 0.208, 0.163, 0.529, 0.082, -0.02, 0.21, 0.171, 0.529, 0.084, 0,
    0.214, 0, 0, 0, 1, 0,
  ],
  Nh = () => [
    0.338, 0.991, 0.117, 0.093, -0.196, 0.302, 1.049, 0.096, 0.078, -0.196, 0.286, 1.016, 0.146,
    0.101, -0.196, 0, 0, 0, 1, 0,
  ],
  Hh = () => [
    0.393, 0.768, 0.188, 0, 0, 0.349, 0.685, 0.167, 0, 0, 0.272, 0.533, 0.13, 0, 0, 0, 0, 0, 1, 0,
  ],
  Uh = () => [
    0.289, 0.62, 0.185, 0, 0.077, 0.257, 0.566, 0.163, 0, 0.115, 0.2, 0.43, 0.128, 0, 0.188, 0, 0,
    0, 1, 0,
  ],
  Xh = () => [
    0.269, 0.764, 0.172, 0.05, 0.1, 0.239, 0.527, 0.152, 0, 0.176, 0.186, 0.4, 0.119, 0, 0.159, 0,
    0, 0, 1, 0,
  ],
  Yh = () => [
    0.547, 0.764, 0.134, 0, -0.147, 0.281, 0.925, 0.12, 0, -0.135, 0.225, 0.558, 0.33, 0, -0.113, 0,
    0, 0, 1, 0,
  ]
var Gh = {
  filterFunctions: {
    chrome: Bh,
    fade: Dh,
    pastel: zh,
    cold: Wh,
    warm: Oh,
    monoDefault: _h,
    monoWash: jh,
    monoNoir: Zh,
    monoStark: Nh,
    sepiaDefault: Hh,
    sepiaRust: Xh,
    sepiaBlues: Uh,
    sepiaColor: Yh,
  },
  filterOptions: [
    ['Default', [[void 0, (e) => e.labelDefault]]],
    [
      'Classic',
      [
        ['chrome', (e) => e.filterLabelChrome],
        ['fade', (e) => e.filterLabelFade],
        ['cold', (e) => e.filterLabelCold],
        ['warm', (e) => e.filterLabelWarm],
        ['pastel', (e) => e.filterLabelPastel],
      ],
    ],
    [
      'Monochrome',
      [
        ['monoDefault', (e) => e.filterLabelMonoDefault],
        ['monoNoir', (e) => e.filterLabelMonoNoir],
        ['monoStark', (e) => e.filterLabelMonoStark],
        ['monoWash', (e) => e.filterLabelMonoWash],
      ],
    ],
    [
      'Sepia',
      [
        ['sepiaDefault', (e) => e.filterLabelSepiaDefault],
        ['sepiaRust', (e) => e.filterLabelSepiaRust],
        ['sepiaBlues', (e) => e.filterLabelSepiaBlues],
        ['sepiaColor', (e) => e.filterLabelSepiaColor],
      ],
    ],
  ],
}
const qh = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'solid',
      frameSize: '2.5%',
    },
    thumb: '<rect stroke-width="5" x="0" y="0" width="100%" height="100%"/>',
  },
  Kh = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'solid',
      frameSize: '2.5%',
      frameRound: !0,
    },
    thumb: '<rect stroke-width="5" x="0" y="0" width="100%" height="100%" rx="12%"/>',
  },
  Jh = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'line',
      frameInset: '2.5%',
      frameSize: '.3125%',
      frameRadius: 0,
    },
    thumb:
      '<div style="top:.5em;left:.5em;right:.5em;bottom:.5em;box-shadow:inset 0 0 0 1px currentColor"></div>',
  },
  Qh = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'line',
      frameAmount: 2,
      frameInset: '2.5%',
      frameSize: '.3125%',
      frameOffset: '1.25%',
      frameRadius: 0,
    },
    thumb: '<div style="top:.75em;left:.75em;right:.75em;bottom:.75em; outline: 3px double"></div>',
  },
  ep = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'edge',
      frameInset: '2.5%',
      frameOffset: '5%',
      frameSize: '.3125%',
    },
    thumb:
      '<div style="top:.75em;left:.5em;bottom:.75em;border-left:1px solid"></div><div style="top:.75em;right:.5em;bottom:.75em;border-right:1px solid"></div><div style="top:.5em;left:.75em;right:.75em;border-top:1px solid"></div><div style="bottom:.5em;left:.75em;right:.75em;border-bottom:1px solid"></div>',
  },
  tp = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'edge',
      frameInset: '2.5%',
      frameSize: '.3125%',
    },
    thumb:
      '<div style="top:-.5em;left:.5em;right:.5em;bottom:-.5em; box-shadow: inset 0 0 0 1px currentColor"></div><div style="top:.5em;left:-.5em;right:-.5em;bottom:.5em;box-shadow:inset 0 0 0 1px currentColor"></div>',
  },
  op = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'edge',
      frameOffset: '1.5%',
      frameSize: '.3125%',
    },
    thumb:
      '<div style="top:.3125em;left:.5em;bottom:.3125em;border-left:1px solid"></div><div style="top:.3125em;right:.5em;bottom:.3125em;border-right:1px solid"></div><div style="top:.5em;left:.3125em;right:.3125em;border-top:1px solid"></div><div style="bottom:.5em;left:.3125em;right:.3125em;border-bottom:1px solid"></div>',
  },
  ip = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'hook',
      frameInset: '2.5%',
      frameSize: '.3125%',
      frameLength: '5%',
    },
    thumb:
      '<div style="top:.5em;left:.5em;width:.75em;height:.75em; border-left: 1px solid;border-top: 1px solid;"></div><div style="top:.5em;right:.5em;width:.75em;height:.75em; border-right: 1px solid;border-top: 1px solid;"></div><div style="bottom:.5em;left:.5em;width:.75em;height:.75em; border-left: 1px solid;border-bottom: 1px solid;"></div><div style="bottom:.5em;right:.5em;width:.75em;height:.75em; border-right: 1px solid;border-bottom: 1px solid;"></div>',
  },
  np = {
    shape: {
      frameColor: [1, 1, 1],
      frameStyle: 'polaroid',
    },
    thumb: '<rect stroke-width="20%" x="-5%" y="-5%" width="110%" height="96%"/>',
  }
var rp = {
    frameStyles: {
      solidSharp: qh,
      solidRound: Kh,
      lineSingle: Jh,
      lineMultiple: Qh,
      edgeSeparate: ep,
      edgeCross: tp,
      edgeOverlap: op,
      hook: ip,
      polaroid: np,
    },
    frameOptions: [
      [void 0, (e) => e.labelNone],
      ['solidSharp', (e) => e.frameLabelMatSharp],
      ['solidRound', (e) => e.frameLabelMatRound],
      ['lineSingle', (e) => e.frameLabelLineSingle],
      ['lineMultiple', (e) => e.frameLabelLineMultiple],
      ['edgeCross', (e) => e.frameLabelEdgeCross],
      ['edgeSeparate', (e) => e.frameLabelEdgeSeparate],
      ['edgeOverlap', (e) => e.frameLabelEdgeOverlap],
      ['hook', (e) => e.frameLabelCornerHooks],
      ['polaroid', (e) => e.frameLabelPolaroid],
    ],
  },
  ap = (e, t, o) => {
    let i, n, r
    const a = Math.floor(6 * e),
      s = 6 * e - a,
      l = o * (1 - t),
      c = o * (1 - s * t),
      d = o * (1 - (1 - s) * t)
    switch (a % 6) {
      case 0:
        ;(i = o), (n = d), (r = l)
        break
      case 1:
        ;(i = c), (n = o), (r = l)
        break
      case 2:
        ;(i = l), (n = o), (r = d)
        break
      case 3:
        ;(i = l), (n = c), (r = o)
        break
      case 4:
        ;(i = d), (n = l), (r = o)
        break
      case 5:
        ;(i = o), (n = l), (r = c)
    }
    return [i, n, r]
  }

function sp(e) {
  let t, o, i
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('span')),
        Yn(t, 'class', 'PinturaColorPreview'),
        Yn(t, 'title', e[0]),
        Yn(t, 'style', (i = '--color:' + e[1]))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, [o]) {
      1 & o && Yn(t, 'title', e[0]), 2 & o && i !== (i = '--color:' + e[1]) && Yn(t, 'style', i)
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t)
    },
  }
}

function lp(e, t, o) {
  let i,
    { color: n } = t,
    { title: r } = t
  return (
    (e.$$set = (e) => {
      'color' in e && o(2, (n = e.color)), 'title' in e && o(0, (r = e.title))
    }),
    (e.$$.update = () => {
      4 & e.$$.dirty && o(1, (i = n ? wo(n) : 'transparent'))
    }),
    [r, i, n]
  )
}
class cp extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, lp, sp, xn, {
        color: 2,
        title: 0,
      })
  }
}

function dp(e) {
  let t, o
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(e[0]))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      1 & t[0] && qn(o, e[0])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function up(e) {
  let t, o, i, n
  o = new cp({
    props: {
      color: e[4],
      title: Xc(e[8], e[10]),
    },
  })
  let r = !e[9] && dp(e)
  return {
    c() {
      ;(t = Vn('span')),
        Hr(o.$$.fragment),
        (i = jn()),
        r && r.c(),
        Yn(t, 'slot', 'label'),
        Yn(t, 'class', 'PinturaButtonLabel')
    },
    m(e, a) {
      On(e, t, a), Ur(o, t, null), Dn(t, i), r && r.m(t, null), (n = !0)
    },
    p(e, i) {
      const n = {}
      16 & i[0] && (n.color = e[4]),
        1280 & i[0] && (n.title = Xc(e[8], e[10])),
        o.$set(n),
        e[9] ? r && (r.d(1), (r = null)) : r ? r.p(e, i) : ((r = dp(e)), r.c(), r.m(t, null))
    },
    i(e) {
      n || (Fr(o.$$.fragment, e), (n = !0))
    },
    o(e) {
      zr(o.$$.fragment, e), (n = !1)
    },
    d(e) {
      e && Wn(t), Xr(o), r && r.d()
    },
  }
}

function hp(e) {
  let t, o, i, n, r, a, s, l, c, d, u, h, p
  c = new Hd({
    props: {
      class: 'PinturaHuePicker',
      knobStyle: 'background-color:' + e[19],
      onchange: e[24],
      value: e[14],
      min: 0,
      max: 1,
      step: 0.01,
    },
  })
  let m = e[11] && pp(e)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        (i = Vn('div')),
        (n = Vn('div')),
        (l = jn()),
        Hr(c.$$.fragment),
        (d = jn()),
        m && m.c(),
        Yn(n, 'role', 'button'),
        Yn(n, 'aria-label', 'Saturation slider'),
        Yn(n, 'class', 'PinturaPickerKnob'),
        Yn(n, 'tabindex', '0'),
        Yn(n, 'style', (r = `background-color:${e[18]};`)),
        Yn(i, 'class', 'PinturaPickerKnobController'),
        Yn(i, 'style', (a = `transform:translate(${e[21]}%,${e[22]}%)`)),
        Yn(o, 'class', 'PinturaSaturationPicker'),
        Yn(o, 'style', (s = 'background-color: ' + e[19])),
        Yn(t, 'class', 'PinturaPicker')
    },
    m(r, a) {
      On(r, t, a),
        Dn(t, o),
        Dn(o, i),
        Dn(i, n),
        e[31](o),
        Dn(t, l),
        Ur(c, t, null),
        Dn(t, d),
        m && m.m(t, null),
        (u = !0),
        h ||
          ((p = [Hn(n, 'nudge', e[27]), Rn(oc.call(null, n)), Hn(o, 'pointerdown', e[26])]),
          (h = !0))
    },
    p(e, l) {
      ;(!u || (262144 & l[0] && r !== (r = `background-color:${e[18]};`))) && Yn(n, 'style', r),
        (!u || (6291456 & l[0] && a !== (a = `transform:translate(${e[21]}%,${e[22]}%)`))) &&
          Yn(i, 'style', a),
        (!u || (524288 & l[0] && s !== (s = 'background-color: ' + e[19]))) && Yn(o, 'style', s)
      const d = {}
      524288 & l[0] && (d.knobStyle = 'background-color:' + e[19]),
        16384 & l[0] && (d.value = e[14]),
        c.$set(d),
        e[11]
          ? m
            ? (m.p(e, l), 2048 & l[0] && Fr(m, 1))
            : ((m = pp(e)), m.c(), Fr(m, 1), m.m(t, null))
          : m &&
            (Er(),
            zr(m, 1, 1, () => {
              m = null
            }),
            Lr())
    },
    i(e) {
      u || (Fr(c.$$.fragment, e), Fr(m), (u = !0))
    },
    o(e) {
      zr(c.$$.fragment, e), zr(m), (u = !1)
    },
    d(o) {
      o && Wn(t), e[31](null), Xr(c), m && m.d(), (h = !1), yn(p)
    },
  }
}

function pp(e) {
  let t, o
  return (
    (t = new Hd({
      props: {
        class: 'PinturaOpacityPicker',
        knobStyle: 'background-color:' + e[16],
        trackStyle: `background-image:linear-gradient(to right,${e[17]},${e[18]})`,
        onchange: e[25],
        value: e[15],
        min: 0,
        max: 1,
        step: 0.01,
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        65536 & o[0] && (i.knobStyle = 'background-color:' + e[16]),
          393216 & o[0] &&
            (i.trackStyle = `background-image:linear-gradient(to right,${e[17]},${e[18]})`),
          32768 & o[0] && (i.value = e[15]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function mp(e) {
  let t, o
  return (
    (t = new vd({
      props: {
        label: 'Presets',
        class: bl([
          'PinturaColorPresets',
          e[9] ? 'PinturaColorPresetsGrid' : 'PinturaColorPresetsList',
        ]),
        hideLabel: !1,
        name: e[1],
        value: e[4],
        optionGroupClass: 'PinturaListOptionGroup',
        optionClass: 'PinturaListOption',
        options: e[2].map(e[32]),
        selectedIndex: e[3],
        optionMapper: e[7],
        optionLabelClass: e[6],
        onchange: e[33],
        $$slots: {
          option: [
            $p,
            ({ option: e }) => ({
              44: e,
            }),
            ({ option: e }) => [0, e ? 8192 : 0],
          ],
          group: [
            gp,
            ({ option: e }) => ({
              44: e,
            }),
            ({ option: e }) => [0, e ? 8192 : 0],
          ],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        512 & o[0] &&
          (i.class = bl([
            'PinturaColorPresets',
            e[9] ? 'PinturaColorPresetsGrid' : 'PinturaColorPresetsList',
          ])),
          2 & o[0] && (i.name = e[1]),
          16 & o[0] && (i.value = e[4]),
          1028 & o[0] && (i.options = e[2].map(e[32])),
          8 & o[0] && (i.selectedIndex = e[3]),
          128 & o[0] && (i.optionMapper = e[7]),
          64 & o[0] && (i.optionLabelClass = e[6]),
          (512 & o[0]) | (24576 & o[1]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function gp(e) {
  let t,
    o,
    i = e[44].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'slot', 'group')
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      8192 & t[1] && i !== (i = e[44].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function fp(e) {
  let t,
    o,
    i = e[44].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i)), Yn(t, 'class', 'PinturaButtonLabel')
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      8192 & t[1] && i !== (i = e[44].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function $p(e) {
  let t, o, i, n
  o = new cp({
    props: {
      title: e[44].label,
      color: e[44].value,
    },
  })
  let r = !e[9] && fp(e)
  return {
    c() {
      ;(t = Vn('span')), Hr(o.$$.fragment), (i = jn()), r && r.c(), Yn(t, 'slot', 'option')
    },
    m(e, a) {
      On(e, t, a), Ur(o, t, null), Dn(t, i), r && r.m(t, null), (n = !0)
    },
    p(e, i) {
      const n = {}
      8192 & i[1] && (n.title = e[44].label),
        8192 & i[1] && (n.color = e[44].value),
        o.$set(n),
        e[9] ? r && (r.d(1), (r = null)) : r ? r.p(e, i) : ((r = fp(e)), r.c(), r.m(t, null))
    },
    i(e) {
      n || (Fr(o.$$.fragment, e), (n = !0))
    },
    o(e) {
      zr(o.$$.fragment, e), (n = !1)
    },
    d(e) {
      e && Wn(t), Xr(o), r && r.d()
    },
  }
}

function yp(e) {
  let t,
    o,
    i,
    n = e[13] && hp(e),
    r = e[12] && mp(e)
  return {
    c() {
      ;(t = Vn('div')),
        n && n.c(),
        (o = jn()),
        r && r.c(),
        Yn(t, 'slot', 'details'),
        Yn(t, 'class', 'PinturaColorPickerPanel')
    },
    m(e, a) {
      On(e, t, a), n && n.m(t, null), Dn(t, o), r && r.m(t, null), (i = !0)
    },
    p(e, i) {
      e[13]
        ? n
          ? (n.p(e, i), 8192 & i[0] && Fr(n, 1))
          : ((n = hp(e)), n.c(), Fr(n, 1), n.m(t, o))
        : n &&
          (Er(),
          zr(n, 1, 1, () => {
            n = null
          }),
          Lr()),
        e[12]
          ? r
            ? (r.p(e, i), 4096 & i[0] && Fr(r, 1))
            : ((r = mp(e)), r.c(), Fr(r, 1), r.m(t, null))
          : r &&
            (Er(),
            zr(r, 1, 1, () => {
              r = null
            }),
            Lr())
    },
    i(e) {
      i || (Fr(n), Fr(r), (i = !0))
    },
    o(e) {
      zr(n), zr(r), (i = !1)
    },
    d(e) {
      e && Wn(t), n && n.d(), r && r.d()
    },
  }
}

function bp(e) {
  let t, o
  return (
    (t = new _c({
      props: {
        buttonClass: bl(['PinturaColorPickerButton', e[5]]),
        $$slots: {
          details: [yp],
          label: [up],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        32 & o[0] && (i.buttonClass = bl(['PinturaColorPickerButton', e[5]])),
          (8388575 & o[0]) | (16384 & o[1]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function xp(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    { label: m } = t,
    { name: g } = t,
    { options: f = [] } = t,
    { selectedIndex: $ = -1 } = t,
    { value: y } = t,
    { buttonClass: b } = t,
    { optionLabelClass: x } = t,
    { optionMapper: v } = t,
    { onchange: w } = t,
    { title: k } = t,
    { hidePresetLabel: M = !0 } = t,
    { locale: C } = t,
    { enableOpacity: T = !0 } = t,
    { enablePresets: P = !0 } = t,
    { enablePicker: I = !0 } = t
  const R = (e, t) => {
    if (((c = [e[0], e[1], e[2]]), t)) {
      let t = ((e, t, o) => {
        let i = Math.max(e, t, o),
          n = i - Math.min(e, t, o),
          r = n && (i == e ? (t - o) / n : i == t ? 2 + (o - e) / n : 4 + (e - t) / n)
        return [(60 * (r < 0 ? r + 6 : r)) / 360, i && n / i, i]
      })(...c)
      o(14, (r = t[0])), o(29, (a = t[1])), o(30, (s = t[2])), o(15, (l = uo(e[3]) ? e[3] : 1))
    }
    o(16, (d = wo(e))),
      o(17, (u = wo([...c, 0]))),
      o(18, (h = wo([...c, 1]))),
      o(19, (p = wo(ap(r, 1, 1))))
  }
  y && R(y, !0)
  const A = () => {
      const e = [...ap(r, a, s), l]
      R(e), w(e)
    },
    E = (e) => {
      const t = 3 === e.length ? [...e, 1] : e
      R(t, !0), w(t)
    },
    L = (e, t) => {
      const i = $a(e.x / t.width, 0, 1),
        n = $a(e.y / t.height, 0, 1)
      var r
      ;(r = 1 - n), o(29, (a = i)), o(30, (s = r)), 0 === l && o(15, (l = 1)), A()
    }
  let F, z, B, D
  const O = (e) => {
      const t = fe(ae(e), D)
      L(ge(se(B), t), z)
    },
    W = (e) => {
      ;(z = void 0),
        document.documentElement.removeEventListener('pointermove', O),
        document.documentElement.removeEventListener('pointerup', W)
    }
  return (
    (e.$$set = (e) => {
      'label' in e && o(0, (m = e.label)),
        'name' in e && o(1, (g = e.name)),
        'options' in e && o(2, (f = e.options)),
        'selectedIndex' in e && o(3, ($ = e.selectedIndex)),
        'value' in e && o(4, (y = e.value)),
        'buttonClass' in e && o(5, (b = e.buttonClass)),
        'optionLabelClass' in e && o(6, (x = e.optionLabelClass)),
        'optionMapper' in e && o(7, (v = e.optionMapper)),
        'onchange' in e && o(28, (w = e.onchange)),
        'title' in e && o(8, (k = e.title)),
        'hidePresetLabel' in e && o(9, (M = e.hidePresetLabel)),
        'locale' in e && o(10, (C = e.locale)),
        'enableOpacity' in e && o(11, (T = e.enableOpacity)),
        'enablePresets' in e && o(12, (P = e.enablePresets)),
        'enablePicker' in e && o(13, (I = e.enablePicker))
    }),
    (e.$$.update = () => {
      536870912 & e.$$.dirty[0] && o(21, (i = 100 * a)),
        1073741824 & e.$$.dirty[0] && o(22, (n = 100 - 100 * s))
    }),
    [
      m,
      g,
      f,
      $,
      y,
      b,
      x,
      v,
      k,
      M,
      C,
      T,
      P,
      I,
      r,
      l,
      d,
      u,
      h,
      p,
      F,
      i,
      n,
      E,
      (e) => {
        o(14, (r = e)), 0 === l && o(15, (l = 1)), A()
      },
      (e) => {
        o(15, (l = e)), A()
      },
      (e) => {
        e.stopPropagation(),
          (z = Ae(F.offsetWidth, F.offsetHeight)),
          (B = ((e) => ne(e.offsetX, e.offsetY))(e)),
          (D = ae(e)),
          L(B, z),
          document.documentElement.addEventListener('pointermove', O),
          document.documentElement.addEventListener('pointerup', W)
      },
      (e) => {
        z = Ae(F.offsetWidth, F.offsetHeight)
        const t = (i / 100) * z.width,
          o = (n / 100) * z.height
        L(
          {
            x: t + e.detail.x,
            y: o + e.detail.y,
          },
          z
        )
      },
      w,
      a,
      s,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(F = e), o(20, F)
        })
      },
      ([e, t]) => [e, S(t) ? t(C) : t],
      (e) => E(e.value),
    ]
  )
}
class vp extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        xp,
        bp,
        xn,
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
var wp = (e) => e.charAt(0).toUpperCase() + e.slice(1)
let Sp = null
var kp = () => {
  if (null === Sp)
    if (c())
      try {
        Sp = !1 === document.fonts.check('16px TestNonExistingFont')
      } catch (e) {
        Sp = !1
      }
    else Sp = !1
  return Sp
}
const Mp = (e, t) => (o) => o[t ? `${t}${wp(e)}` : e],
  Cp = (e) => [e, '' + e],
  Tp = (e, t) => (o) => [e[o], Mp(o, t)],
  Pp = [1, 0.2549, 0.2118],
  Ip = [1, 1, 1, 0],
  Rp = {
    path: () => ({
      points: [],
      disableErase: !1,
    }),
    eraser: () => ({
      eraseRadius: 0,
    }),
    line: () => ({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      disableErase: !1,
    }),
    rectangle: () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }),
    ellipse: () => ({
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
    }),
    text: () => ({
      x: 0,
      y: 0,
      text: 'Text',
    }),
  },
  Ap = (
    e,
    t = {},
    o = {
      position: 'relative',
    }
  ) => {
    if (!Rp[e]) return
    return [{ ...Rp[e](), ...t }, o]
  },
  Ep = (e) => ({
    sharpie: Ap('path', {
      strokeWidth: '0.5%',
      strokeColor: [...Pp],
      disableMove: !0,
    }),
    eraser: Ap('eraser'),
    line: Ap('line', {
      strokeColor: [...Pp],
      strokeWidth: '0.5%',
    }),
    arrow: Ap('line', {
      lineStart: 'none',
      lineEnd: 'arrow-solid',
      strokeColor: [...Pp],
      strokeWidth: '0.5%',
    }),
    rectangle: Ap('rectangle', {
      strokeColor: [...Ip],
      backgroundColor: [...Pp],
    }),
    ellipse: Ap('ellipse', {
      strokeColor: [...Ip],
      backgroundColor: [...Pp],
    }),
    text: Ap('text', {
      color: [...Pp],
      fontSize: '2%',
    }),
    ...e,
  }),
  Lp = (e, t, o) => [
    e,
    t || Mp(e, 'shapeLabelTool'),
    {
      icon: Mp(e, 'shapeIconTool'),
      ...o,
    },
  ],
  Fp = (
    e = [
      'move',
      'view',
      'sharpie',
      'eraser',
      'line',
      'arrow',
      'rectangle',
      'ellipse',
      'text',
      'preset',
    ]
  ) =>
    e
      .map((e) =>
        w(e)
          ? Lp(e)
          : Array.isArray(e)
          ? b(e[1])
            ? Lp(e[0], void 0, e[1])
            : Lp(e[0], e[1], e[2])
          : void 0
      )
      .filter(Boolean),
  zp = () => ({
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
  Bp = () => [16, 18, 20, 24, 30, 36, 48, 64, 72, 96, 128, 144],
  Dp = Bp,
  Op = () => ({
    extraSmall: '2%',
    small: '4%',
    mediumSmall: '8%',
    medium: '10%',
    mediumLarge: '15%',
    large: '20%',
    extraLarge: '25%',
  }),
  Wp = () => ({
    extraSmall: '40%',
    small: '60%',
    mediumSmall: '100%',
    medium: '120%',
    mediumLarge: '140%',
    large: '180%',
    extraLarge: '220%',
  }),
  Vp = () => [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 48, 64],
  _p = () => ({
    extraSmall: '0.25%',
    small: '0.5%',
    mediumSmall: '1%',
    medium: '1.75%',
    mediumLarge: '2.5%',
    large: '3.5%',
    extraLarge: '5%',
  }),
  Zp = () => ['bar', 'arrow', 'arrowSolid', 'circle', 'circleSolid', 'square', 'squareSolid'],
  jp = () => [
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
  Np = () => ['left', 'center', 'right'],
  Hp = () => [
    ['normal', 'bold'],
    ['italic', 'normal'],
    ['italic', 'bold'],
  ],
  Up = (e) => Object.keys(e).map(Tp(e, 'shapeTitleColor')),
  Xp = (e) => e.map(Cp),
  Yp = (e) => Object.keys(e).map(Tp(e, 'labelSize')),
  Gp = (e) => e.map(Cp),
  qp = (e) => Object.keys(e).map(Tp(e, 'labelSize')),
  Kp = (e) => e.map(Cp),
  Jp = (e) => Object.keys(e).map(Tp(e, 'labelSize')),
  Qp = (e) => [...e],
  em = (e) =>
    e.map((e) => [
      e,
      (t) =>
        t[
          'shapeLabelFontStyle' +
            e
              .filter((e) => 'normal' !== e)
              .map(wp)
              .join('')
        ],
    ]),
  tm = (e) =>
    e.map((e) => [
      mu(e),
      (t) => t['shapeTitleLineDecoration' + wp(e)],
      {
        icon: (t) => t['shapeIconLineDecoration' + wp(e)],
      },
    ]),
  om = (e) =>
    e.map((e) => [
      e,
      (t) => t['shapeTitleTextAlign' + wp(e)],
      {
        hideLabel: !0,
        icon: (t) => t['shapeIconTextAlign' + wp(e)],
      },
    ]),
  im = (e, t) => {
    const { defaultKey: o, defaultValue: i, defaultOptions: n } = t || {},
      r = []
    return o && (r[0] = [i, (e) => e[o], { ...n }]), [...r, ...e]
  },
  nm = (e) =>
    e
      .split(',')
      .map((e) => e.trim())
      .some((e) => document.fonts.check('16px ' + e)),
  rm = (e, t = {}) => [
    vp,
    {
      title: (e) => e.labelColor,
      options: im(e),
      ...t,
    },
  ],
  am = (e = {}) => [Jd, { ...e }],
  sm = (
    e,
    t = {
      defaultKey: 'labelDefault',
    }
  ) => [
    zd,
    {
      title: (e) => e.shapeTitleFontFamily,
      onload: ({ options: e = [] }) => {
        kp() &&
          e
            .map(([e]) => e)
            .filter(Boolean)
            .filter((e) => !nm(e))
            .forEach((e) => {
              const t = 'PinturaFontTest-' + e.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
              document.getElementById(t) ||
                document.body.append(
                  p('span', {
                    textContent: ' ',
                    id: t,
                    class: 'PinturaFontTest',
                    style: `font-family:${e};font-size:0;color:transparent;`,
                  })
                )
            })
      },
      ondestroy: () => {
        if (!kp()) return
        document.querySelectorAll('.PinturaFontTest').forEach((e) => e.remove())
      },
      optionLabelStyle: (e) => 'font-family: ' + e,
      options: im(e, t),
      optionFilter: (e) => {
        if (!kp()) return !0
        const [t] = e
        if (!t) return !0
        return nm(t)
      },
    },
  ],
  lm = (e, t = {}) => [
    vp,
    {
      title: (e) => e.shapeTitleBackgroundColor,
      options: im(e),
      ...t,
    },
  ],
  cm = (e, t = {}) => [
    vp,
    {
      title: (e) => e.shapeTitleStrokeColor,
      options: im(e),
      buttonClass: 'PinturaColorPickerButtonStroke',
      onchange: (e, o) => {
        const i = o.strokeWidth
        ;(uo(i) || w(i) ? parseFloat(i) : 0) > 0 ||
          (o.strokeWidth = (t && t.defaultStrokeWidth) || '0.5%')
      },
      ...t,
    },
  ],
  dm = (e) => [
    zd,
    {
      title: (e) => e.shapeTitleStrokeWidth,
      options: (t) =>
        po(t, 'backgroundColor')
          ? im(e, {
              defaultKey: 'shapeLabelStrokeNone',
            })
          : im(e),
      onchange: (e, t) => {
        if (!e) return
        const o = t.strokeColor || []
        if (o[3]) return
        const i = [...o]
        ;(i[3] = 1), (t.strokeColor[3] = i)
      },
    },
  ],
  um = (e, t, o) => [
    zd,
    {
      title: (e) => e[t],
      options: im(e, {
        defaultKey: 'labelNone',
        defaultOptions: {
          icon: '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H14"/></g>',
        },
      }),
      optionIconStyle: o,
    },
  ],
  hm = (e) => um(e, 'shapeTitleLineStart', 'transform: scaleX(-1)'),
  pm = (e) => um(e, 'shapeTitleLineEnd'),
  mm = (e) => [
    vp,
    {
      title: (e) => e.shapeTitleTextColor,
      options: im(e),
    },
  ],
  gm = (e) => [
    zd,
    {
      title: (e) => e.shapeTitleFontStyle,
      optionLabelStyle: (e) => e && `font-style:${e[0]};font-weight:${e[1]}`,
      options: im(e, {
        defaultKey: 'shapeLabelFontStyleNormal',
      }),
    },
  ],
  fm = (e) => {
    let t
    return (
      e.find(([e]) => '4%' === e) ||
        (t = {
          defaultKey: 'labelAuto',
          defaultValue: '4%',
        }),
      [
        zd,
        {
          title: (e) => e.shapeTitleFontSize,
          options: im(e, t),
        },
      ]
    )
  },
  $m = (e) => [
    vd,
    {
      title: (e) => e.shapeTitleTextAlign,
      options: im(e),
    },
  ],
  ym = (e) => {
    let t
    return (
      e.find(([e]) => '120%' === e) ||
        (t = {
          defaultKey: 'labelAuto',
          defaultValue: '120%',
        }),
      [
        zd,
        {
          title: (e) => e.shapeTitleLineHeight,
          options: im(e, t),
        },
      ]
    )
  },
  bm = (e = {}) => {
    const {
      colorOptions: t = Up(zp()),
      lineEndStyleOptions: o = tm(Zp()),
      fontFamilyOptions: i = Qp(jp()),
      fontStyleOptions: n = em(Hp()),
      textAlignOptions: r = om(Np()),
    } = e
    let {
      strokeWidthOptions: a = Jp(_p()),
      fontSizeOptions: s = Yp(Op()),
      lineHeightOptions: l = qp(Wp()),
    } = e
    ;[s, l, a] = [s, l, a].map((e) => (Array.isArray(e) && e.every(uo) ? e.map(Cp) : e))
    const c = {
      defaultColor: t && rm(t),
      defaultNumber: am(),
      defaultPercentage: am({
        getValue: (e) => parseFloat(e),
        setValue: (e) => e + '%',
        step: 0.05,
        label: (e, t, o) => Math.round((e / o) * 100) + '%',
        labelClass: 'PinturaPercentageLabel',
      }),
      backgroundColor: t && lm(t),
      strokeColor: t && cm(t),
      strokeWidth: a && dm(a),
      lineStart: o && hm(o),
      lineEnd: o && pm(o),
      color: t && mm(t),
      fontFamily: i && sm(i),
      fontStyle_fontWeight: n && gm(n),
      fontSize: s && fm(s),
      lineHeight: l && ym(l),
      textAlign: r && $m(r),
      cornerRadius: [
        'defaultPercentage',
        {
          min: 0,
          max: 50,
          title: (e) => e.shapeTitleCornerRadius,
        },
      ],
      frameColor: ['defaultColor'],
      frameSize: [
        'defaultPercentage',
        {
          min: 0.2,
          max: 10,
          title: (e) => e.labelSize,
        },
      ],
      frameInset: [
        'defaultPercentage',
        {
          min: 0.5,
          max: 10,
          title: (e) => e.labelInset,
        },
      ],
      frameOffset: [
        'defaultPercentage',
        {
          min: 0.5,
          max: 10,
          title: (e) => e.labelOffset,
        },
      ],
      frameRadius: [
        'defaultPercentage',
        {
          min: 0.5,
          max: 10,
          title: (e) => e.labelRadius,
        },
      ],
      frameAmount: [
        'defaultNumber',
        {
          min: 1,
          max: 5,
          step: 1,
          title: (e) => e.labelAmount,
        },
      ],
    }
    return (
      Object.entries(e).forEach(([e, t]) => {
        c[e] || (c[e] = t)
      }),
      c
    )
  }

function xm(e) {
  let t, o, i, n
  const r = e[4].default,
    a = kn(r, e, e[3], null)
  return {
    c() {
      ;(t = Vn('div')), a && a.c(), Yn(t, 'class', e[0])
    },
    m(r, s) {
      On(r, t, s),
        a && a.m(t, null),
        (o = !0),
        i ||
          ((n = [
            Hn(t, 'measure', function () {
              bn(e[1] && e[2]) && (e[1] && e[2]).apply(this, arguments)
            }),
            Rn(Rs.call(null, t)),
          ]),
          (i = !0))
    },
    p(i, [n]) {
      ;(e = i),
        a && a.p && 8 & n && Cn(a, r, e, e[3], n, null, null),
        (!o || 1 & n) && Yn(t, 'class', e[0])
    },
    i(e) {
      o || (Fr(a, e), (o = !0))
    },
    o(e) {
      zr(a, e), (o = !1)
    },
    d(e) {
      e && Wn(t), a && a.d(e), (i = !1), yn(n)
    },
  }
}

function vm(e, t, o) {
  let { $$slots: i = {}, $$scope: n } = t
  const r = dr()
  let { class: a = null } = t,
    s = !1
  return (
    sr(() => o(1, (s = !0))),
    (e.$$set = (e) => {
      'class' in e && o(0, (a = e.class)), '$$scope' in e && o(3, (n = e.$$scope))
    }),
    [a, s, ({ detail: e }) => r('measure', e), n, i]
  )
}
class wm extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, vm, xm, xn, {
        class: 0,
      })
  }
}
const Sm = (e) => ({}),
  km = (e) => ({}),
  Mm = (e) => ({}),
  Cm = (e) => ({}),
  Tm = (e) => ({}),
  Pm = (e) => ({})

function Im(e) {
  let t, o
  const i = e[4].header,
    n = kn(i, e, e[3], Pm)
  return {
    c() {
      ;(t = Vn('div')), n && n.c(), Yn(t, 'class', 'PinturaUtilHeader')
    },
    m(e, i) {
      On(e, t, i), n && n.m(t, null), (o = !0)
    },
    p(e, t) {
      n && n.p && 8 & t && Cn(n, i, e, e[3], t, Tm, Pm)
    },
    i(e) {
      o || (Fr(n, e), (o = !0))
    },
    o(e) {
      zr(n, e), (o = !1)
    },
    d(e) {
      e && Wn(t), n && n.d(e)
    },
  }
}

function Rm(e) {
  let t, o
  const i = e[4].footer,
    n = kn(i, e, e[3], km)
  return {
    c() {
      ;(t = Vn('div')), n && n.c(), Yn(t, 'class', 'PinturaUtilFooter')
    },
    m(e, i) {
      On(e, t, i), n && n.m(t, null), (o = !0)
    },
    p(e, t) {
      n && n.p && 8 & t && Cn(n, i, e, e[3], t, Sm, km)
    },
    i(e) {
      o || (Fr(n, e), (o = !0))
    },
    o(e) {
      zr(n, e), (o = !1)
    },
    d(e) {
      e && Wn(t), n && n.d(e)
    },
  }
}

function Am(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s = e[1] && Im(e)
  const l = e[4].main,
    c = kn(l, e, e[3], Cm),
    d =
      c ||
      (function (e) {
        let t, o
        return (
          (t = new wm({
            props: {
              class: 'PinturaStage',
            },
          })),
          t.$on('measure', e[5]),
          {
            c() {
              Hr(t.$$.fragment)
            },
            m(e, i) {
              Ur(t, e, i), (o = !0)
            },
            p: pn,
            i(e) {
              o || (Fr(t.$$.fragment, e), (o = !0))
            },
            o(e) {
              zr(t.$$.fragment, e), (o = !1)
            },
            d(e) {
              Xr(t, e)
            },
          }
        )
      })(e)
  let u = e[2] && Rm(e)
  return {
    c() {
      s && s.c(),
        (t = jn()),
        (o = Vn('div')),
        d && d.c(),
        (i = jn()),
        u && u.c(),
        (n = jn()),
        (r = Nn()),
        Yn(o, 'class', 'PinturaUtilMain')
    },
    m(l, c) {
      s && s.m(l, c),
        On(l, t, c),
        On(l, o, c),
        d && d.m(o, null),
        e[6](o),
        On(l, i, c),
        u && u.m(l, c),
        On(l, n, c),
        On(l, r, c),
        (a = !0)
    },
    p(e, [o]) {
      e[1]
        ? s
          ? (s.p(e, o), 2 & o && Fr(s, 1))
          : ((s = Im(e)), s.c(), Fr(s, 1), s.m(t.parentNode, t))
        : s &&
          (Er(),
          zr(s, 1, 1, () => {
            s = null
          }),
          Lr()),
        c && c.p && 8 & o && Cn(c, l, e, e[3], o, Mm, Cm),
        e[2]
          ? u
            ? (u.p(e, o), 4 & o && Fr(u, 1))
            : ((u = Rm(e)), u.c(), Fr(u, 1), u.m(n.parentNode, n))
          : u &&
            (Er(),
            zr(u, 1, 1, () => {
              u = null
            }),
            Lr())
    },
    i(e) {
      a || (Fr(s), Fr(d, e), Fr(u), Fr(false), (a = !0))
    },
    o(e) {
      zr(s), zr(d, e), zr(u), zr(false), (a = !1)
    },
    d(a) {
      s && s.d(a),
        a && Wn(t),
        a && Wn(o),
        d && d.d(a),
        e[6](null),
        a && Wn(i),
        u && u.d(a),
        a && Wn(n),
        a && Wn(r)
    },
  }
}

function Em(e, t, o) {
  let { $$slots: i = {}, $$scope: n } = t,
    { hasHeader: r = !!t.$$slots.header } = t,
    { hasFooter: a = !!t.$$slots.footer } = t,
    { root: s } = t
  return (
    (e.$$set = (e) => {
      o(7, (t = gn(gn({}, t), Tn(e)))),
        'hasHeader' in e && o(1, (r = e.hasHeader)),
        'hasFooter' in e && o(2, (a = e.hasFooter)),
        'root' in e && o(0, (s = e.root)),
        '$$scope' in e && o(3, (n = e.$$scope))
    }),
    (t = Tn(t)),
    [
      s,
      r,
      a,
      n,
      i,
      function (t) {
        pr(e, t)
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(s = e), o(0, s)
        })
      },
    ]
  )
}
class Lm extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Em, Am, xn, {
        hasHeader: 1,
        hasFooter: 2,
        root: 0,
      })
  }
}

function Fm(e) {
  let t, o
  return {
    c() {
      ;(t = Vn('div')),
        Yn(t, 'class', 'PinturaRangeInputMeter'),
        Yn(
          t,
          'style',
          (o = `transform: translateX(${e[9].x - e[11].x}px) translateY(${e[9].y - e[11].y}px)`)
        )
    },
    m(o, i) {
      On(o, t, i), (t.innerHTML = e[7])
    },
    p(e, i) {
      128 & i[0] && (t.innerHTML = e[7]),
        512 & i[0] &&
          o !==
            (o = `transform: translateX(${e[9].x - e[11].x}px) translateY(${
              e[9].y - e[11].y
            }px)`) &&
          Yn(t, 'style', o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function zm(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p = e[9] && Fm(e)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('span')),
        (i = Zn(e[3])),
        (n = jn()),
        (r = Vn('button')),
        (a = Zn(e[1])),
        (l = jn()),
        (c = Vn('div')),
        p && p.c(),
        Yn(o, 'class', 'PinturaRangeInputValue'),
        Yn(r, 'class', 'PinturaRangeInputReset'),
        Yn(r, 'type', 'button'),
        (r.disabled = s = e[0] === e[2]),
        Yn(c, 'class', 'PinturaRangeInputInner'),
        Yn(c, 'style', e[8]),
        Yn(c, 'data-value-limited', e[5]),
        Yn(t, 'class', 'PinturaRangeInput'),
        Yn(t, 'tabindex', '0')
    },
    m(s, m) {
      On(s, t, m),
        Dn(t, o),
        Dn(o, i),
        Dn(t, n),
        Dn(t, r),
        Dn(r, a),
        Dn(t, l),
        Dn(t, c),
        p && p.m(c, null),
        u ||
          ((h = [
            Hn(r, 'click', e[16]),
            Hn(c, 'interactionstart', e[12]),
            Hn(c, 'interactionupdate', e[14]),
            Hn(c, 'interactionend', e[15]),
            Hn(c, 'interactionrelease', e[13]),
            Rn(
              (d = tc.call(null, c, {
                inertia: e[6],
              }))
            ),
            Hn(c, 'measure', e[34]),
            Rn(Rs.call(null, c)),
            Hn(t, 'wheel', e[18], {
              passive: !1,
            }),
            Hn(t, 'nudge', e[19]),
            Rn(
              oc.call(null, t, {
                direction: 'horizontal',
              })
            ),
          ]),
          (u = !0))
    },
    p(e, t) {
      8 & t[0] && qn(i, e[3]),
        2 & t[0] && qn(a, e[1]),
        5 & t[0] && s !== (s = e[0] === e[2]) && (r.disabled = s),
        e[9] ? (p ? p.p(e, t) : ((p = Fm(e)), p.c(), p.m(c, null))) : p && (p.d(1), (p = null)),
        256 & t[0] && Yn(c, 'style', e[8]),
        32 & t[0] && Yn(c, 'data-value-limited', e[5]),
        d &&
          bn(d.update) &&
          64 & t[0] &&
          d.update.call(null, {
            inertia: e[6],
          })
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t), p && p.d(), (u = !1), yn(h)
    },
  }
}

function Bm(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    { labelReset: p = 'Reset' } = t,
    { direction: m = 'x' } = t,
    { min: g = 0 } = t,
    { max: f = 1 } = t,
    { base: $ = g } = t,
    { value: y = 0 } = t,
    { valueLabel: b = 0 } = t,
    { valueMin: x } = t,
    { valueMax: v } = t,
    { oninputstart: w = n } = t,
    { oninputmove: S = n } = t,
    { oninputend: k = n } = t,
    { elasticity: M = 0 } = t
  const C = hr('isAnimated')
  Sn(e, C, (e) => o(6, (h = e)))
  const T = (e, t, o) => Math.ceil((e - o) / t) * t + o
  let P, I, R
  const A = {
      x: 2,
      y: 0,
    },
    E = (e, t, o) => `M ${e - o} ${t} a ${o} ${o} 0 1 0 0 -1`
  let L,
    F = void 0,
    z = !1,
    B = {
      snap: !1,
      elastic: !1,
    }
  const D = (e, t, o) => {
      const i = e[m] + t[m],
        n = $a(i, L[1][m], L[0][m]),
        r = M ? n + ic(i - n, M) : n,
        a = o.elastic ? r : n,
        s = ne(0, 0)
      return (
        (s[m] = a),
        O.set(s, {
          hard: o.snap,
        }),
        $a(V(s, m), g, f)
      )
    },
    O = ys()
  Sn(e, O, (e) => o(9, (u = e)))
  const W = (e, t) => {
      const o = 0.5 * (P[t] - s[t]) - (Vd(e, g, f) * s[t] - 0.5 * s[t])
      return {
        x: 'x' === t ? o : 0,
        y: 'y' === t ? o : 0,
      }
    },
    V = (e, t) => {
      const o = -(e[t] - 0.5 * P[t]) / s[t]
      return g + o * i
    },
    _ = O.subscribe((e) => {
      e && F && S($a(V(e, m), g, f))
    }),
    Z = (e) => {
      const t = [W(null != x ? x : g, m), W(null != v ? v : f, m)],
        o = {
          x: 'x' === m ? u.x + e : 0,
          y: 'y' === m ? u.y + e : 0,
        },
        i = $a(o[m], t[1][m], t[0][m]),
        n = { ...u, [m]: i }
      In(O, (u = n), u)
      const r = $a(V(n, m), g, f)
      w(), S(r), k(r)
    }
  cr(() => {
    _()
  })
  return (
    (e.$$set = (e) => {
      'labelReset' in e && o(1, (p = e.labelReset)),
        'direction' in e && o(20, (m = e.direction)),
        'min' in e && o(21, (g = e.min)),
        'max' in e && o(22, (f = e.max)),
        'base' in e && o(2, ($ = e.base)),
        'value' in e && o(0, (y = e.value)),
        'valueLabel' in e && o(3, (b = e.valueLabel)),
        'valueMin' in e && o(23, (x = e.valueMin)),
        'valueMax' in e && o(24, (v = e.valueMax)),
        'oninputstart' in e && o(25, (w = e.oninputstart)),
        'oninputmove' in e && o(26, (S = e.oninputmove)),
        'oninputend' in e && o(27, (k = e.oninputend)),
        'elasticity' in e && o(28, (M = e.elasticity))
    }),
    (e.$$.update = () => {
      if (
        (6291456 & e.$$.dirty[0] && o(30, (i = f - g)),
        10485760 & e.$$.dirty[0] && o(31, (r = null != x ? Math.max(x, g) : g)),
        20971520 & e.$$.dirty[0] && o(32, (a = null != v ? Math.min(v, f) : f)),
        6291460 & e.$$.dirty[0] && o(33, (l = Vd($, g, f))),
        (16 & e.$$.dirty[0]) | (4 & e.$$.dirty[1]) && P)
      ) {
        const e = 0.5 * P.y
        let t,
          i = 40 * l,
          n = '',
          r = P.y,
          a = ''
        for (let o = 0; o <= 40; o++) {
          const r = A.x + 10 * o,
            s = e
          ;(n += E(r, s, o % 5 == 0 ? 2 : 0.75) + ' '),
            (t = r + A.x),
            o === i && (a = `<path d="M${r} ${s - 4} l2 3 l-2 -1 l-2 1 z"/>`)
        }
        o(
          7,
          (I = `<svg width="${t}" height="${r}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${r}" aria-hidden="true" focusable="false">\n        ${a}\n        <rect rx="4" ry="4" y="${
            e - 4
          }"" height="8"/>\n        <path fill-rule="evenodd" d="${n.trim()}"/></svg>`)
        ),
          o(
            29,
            (R = {
              x: t - 2 * A.x,
              y: r,
            })
          )
      }
      536870928 & e.$$.dirty[0] && (s = P && R),
        (6291456 & e.$$.dirty[0]) | (3 & e.$$.dirty[1]) && o(5, (c = r !== g || a !== f)),
        (32 & e.$$.dirty[0]) | (3 & e.$$.dirty[1]) &&
          o(
            8,
            (d = c
              ? (function (e, t) {
                  const o = 1 / 40,
                    i = Vd(e, g, f),
                    n = Vd(t, g, f)
                  return `--range-mask-from:${100 * ee(T(i, o, 0) - 0.0125)}%;--range-mask-to:${
                    100 * ee(T(n, o, 0) - 0.0125)
                  }%`
                })(r, a)
              : '')
          ),
        1074790481 & e.$$.dirty[0] &&
          i &&
          P &&
          P.x &&
          P.y &&
          O.set(W(y, m), {
            hard: !1 === h,
          })
    }),
    [
      y,
      p,
      $,
      b,
      P,
      c,
      h,
      I,
      d,
      u,
      C,
      A,
      () => {
        ;(z = !1), (F = wn(O)), (L = [W(null != x ? x : g, m), W(null != v ? v : f, m)]), w()
      },
      () => {
        z = !0
      },
      ({ detail: e }) => {
        ;(B.snap = !z), (B.elastic = !z), D(F, e.translation, B)
      },
      ({ detail: e }) => {
        ;(B.snap = !1), (B.elastic = !1)
        const t = D(F, e.translation, B)
        if (((F = void 0), (L = void 0), Math.abs(t - $) < 0.01)) return k($)
        k(t)
      },
      () => {
        o(0, (y = $a($, r, a))), w(), k(y)
      },
      O,
      (e) => {
        e.preventDefault(), e.stopPropagation()
        const t = 8 * ac(e)
        Z(t)
      },
      ({ detail: e }) => {
        Z(8 * e[m])
      },
      m,
      g,
      f,
      x,
      v,
      w,
      S,
      k,
      M,
      R,
      i,
      r,
      a,
      l,
      (e) => o(4, (P = ((e) => ne(e.width, e.height))(e.detail))),
    ]
  )
}
class Dm extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        Bm,
        zm,
        xn,
        {
          labelReset: 1,
          direction: 20,
          min: 21,
          max: 22,
          base: 2,
          value: 0,
          valueLabel: 3,
          valueMin: 23,
          valueMax: 24,
          oninputstart: 25,
          oninputmove: 26,
          oninputend: 27,
          elasticity: 28,
        },
        [-1, -1]
      )
  }
}

function Om(e) {
  let t, o, i, n, r
  const a = e[7].default,
    s = kn(a, e, e[6], null)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        s && s.c(),
        Yn(o, 'class', 'PinturaToolbarInner'),
        Yn(t, 'class', 'PinturaToolbar'),
        Yn(t, 'data-layout', e[1]),
        Yn(t, 'data-overflow', e[0])
    },
    m(a, l) {
      On(a, t, l),
        Dn(t, o),
        s && s.m(o, null),
        (i = !0),
        n ||
          ((r = [
            Hn(o, 'measure', e[3]),
            Rn(Rs.call(null, o)),
            Hn(t, 'measure', e[2]),
            Rn(Rs.call(null, t)),
          ]),
          (n = !0))
    },
    p(e, [o]) {
      s && s.p && 64 & o && Cn(s, a, e, e[6], o, null, null),
        (!i || 2 & o) && Yn(t, 'data-layout', e[1]),
        (!i || 1 & o) && Yn(t, 'data-overflow', e[0])
    },
    i(e) {
      i || (Fr(s, e), (i = !0))
    },
    o(e) {
      zr(s, e), (i = !1)
    },
    d(e) {
      e && Wn(t), s && s.d(e), (n = !1), yn(r)
    },
  }
}

function Wm(e, t, o) {
  let i,
    n,
    { $$slots: r = {}, $$scope: a } = t,
    s = 0,
    l = 0,
    c = 0
  const d = () => {
    o(0, (n = 'compact' === i && s > c ? 'overflow' : void 0))
  }
  return (
    (e.$$set = (e) => {
      '$$scope' in e && o(6, (a = e.$$scope))
    }),
    (e.$$.update = () => {
      48 & e.$$.dirty && o(1, (i = l > c ? 'compact' : 'default'))
    }),
    [
      n,
      i,
      ({ detail: e }) => {
        const { width: t } = e
        o(5, (c = t)), d()
      },
      ({ detail: e }) => {
        const { width: t } = e
        t > l && o(4, (l = t)), (s = t), n || d()
      },
      l,
      c,
      a,
      r,
    ]
  )
}
class Vm extends Gr {
  constructor(e) {
    super(), Yr(this, e, Wm, Om, xn, {})
  }
}
var _m = {
  [H]: (e) => ({
    x: e.x,
    y: e.y,
  }),
  [q]: (e) => ({
    x: e.x + e.width,
    y: e.y,
  }),
  [U]: (e) => ({
    x: e.x + e.width,
    y: e.y,
  }),
  [K]: (e) => ({
    x: e.x + e.width,
    y: e.y + e.height,
  }),
  [X]: (e) => ({
    x: e.x,
    y: e.y + e.height,
  }),
  [J]: (e) => ({
    x: e.x,
    y: e.y + e.height,
  }),
  [Y]: (e) => ({
    x: e.x,
    y: e.y,
  }),
  [G]: (e) => ({
    x: e.x,
    y: e.y,
  }),
}

function Zm(e, t, o) {
  const i = e.slice()
  return (
    (i[14] = t[o].key),
    (i[15] = t[o].translate),
    (i[16] = t[o].scale),
    (i[17] = t[o].type),
    (i[18] = t[o].opacity),
    i
  )
}

function jm(e, t) {
  let o, i, n, r, a, s, l, c
  return {
    key: e,
    first: null,
    c() {
      ;(o = Vn('div')),
        Yn(o, 'role', 'button'),
        Yn(o, 'aria-label', (i = `Drag ${t[17]} ${t[14]}`)),
        Yn(o, 'tabindex', (n = 'edge' === t[17] ? -1 : 0)),
        Yn(o, 'class', 'PinturaRectManipulator'),
        Yn(o, 'data-direction', (r = t[14])),
        Yn(o, 'data-shape', (a = '' + ('edge' === t[17] ? 'edge' : '' + t[0]))),
        Yn(
          o,
          'style',
          (s = `transform: translate3d(${t[15].x}px, ${t[15].y}px, 0) scale(${t[16].x}, ${t[16].y}); opacity: ${t[18]}`)
        ),
        (this.first = o)
    },
    m(e, i) {
      On(e, o, i),
        l ||
          ((c = [
            Hn(o, 'nudge', function () {
              bn(t[6](t[14])) && t[6](t[14]).apply(this, arguments)
            }),
            Rn(oc.call(null, o)),
            Hn(o, 'interactionstart', function () {
              bn(t[5]('resizestart', t[14])) && t[5]('resizestart', t[14]).apply(this, arguments)
            }),
            Hn(o, 'interactionupdate', function () {
              bn(t[5]('resizemove', t[14])) && t[5]('resizemove', t[14]).apply(this, arguments)
            }),
            Hn(o, 'interactionend', function () {
              bn(t[5]('resizeend', t[14])) && t[5]('resizeend', t[14]).apply(this, arguments)
            }),
            Rn(tc.call(null, o)),
          ]),
          (l = !0))
    },
    p(e, l) {
      ;(t = e),
        2 & l && i !== (i = `Drag ${t[17]} ${t[14]}`) && Yn(o, 'aria-label', i),
        2 & l && n !== (n = 'edge' === t[17] ? -1 : 0) && Yn(o, 'tabindex', n),
        2 & l && r !== (r = t[14]) && Yn(o, 'data-direction', r),
        3 & l && a !== (a = '' + ('edge' === t[17] ? 'edge' : '' + t[0])) && Yn(o, 'data-shape', a),
        2 & l &&
          s !==
            (s = `transform: translate3d(${t[15].x}px, ${t[15].y}px, 0) scale(${t[16].x}, ${t[16].y}); opacity: ${t[18]}`) &&
          Yn(o, 'style', s)
    },
    d(e) {
      e && Wn(o), (l = !1), yn(c)
    },
  }
}

function Nm(e) {
  let t,
    o = [],
    i = new Map(),
    n = e[1]
  const r = (e) => e[14]
  for (let t = 0; t < n.length; t += 1) {
    let a = Zm(e, n, t),
      s = r(a)
    i.set(s, (o[t] = jm(s, a)))
  }
  return {
    c() {
      for (let e = 0; e < o.length; e += 1) o[e].c()
      t = Nn()
    },
    m(e, i) {
      for (let t = 0; t < o.length; t += 1) o[t].m(e, i)
      On(e, t, i)
    },
    p(e, [a]) {
      99 & a && ((n = e[1]), (o = _r(o, a, r, 1, e, n, i, t.parentNode, Wr, jm, t, Zm)))
    },
    i: pn,
    o: pn,
    d(e) {
      for (let t = 0; t < o.length; t += 1) o[t].d(e)
      e && Wn(t)
    },
  }
}

function Hm(e, t, o) {
  let i,
    n,
    r,
    a,
    { rect: s = null } = t,
    { visible: l = !1 } = t,
    { style: c } = t
  const d = hr('isAnimated')
  Sn(e, d, (e) => o(9, (n = e)))
  const u = ys(void 0, {
    precision: 1e-4,
    stiffness: 0.2,
    damping: 0.4,
  })
  Sn(e, u, (e) => o(10, (r = e)))
  const h = ys(0, {
    precision: 0.001,
  })
  let p
  Sn(e, h, (e) => o(11, (a = e)))
  const m = dr()
  return (
    (e.$$set = (e) => {
      'rect' in e && o(7, (s = e.rect)),
        'visible' in e && o(8, (l = e.visible)),
        'style' in e && o(0, (c = e.style))
    }),
    (e.$$.update = () => {
      768 & e.$$.dirty &&
        u.set(l ? 1 : 0.5, {
          hard: !1 === n,
        }),
        768 & e.$$.dirty &&
          h.set(l ? 1 : 0, {
            hard: !1 === n,
          }),
        3200 & e.$$.dirty &&
          o(
            1,
            (i = Object.keys(N).map((e, t) => {
              const o = N[e],
                i = _m[o](s),
                n = 1 === o.length ? 'edge' : 'corner',
                l = 'corner' === n
              return {
                key: o,
                type: n,
                scale: {
                  x: /^(t|b)$/.test(o) ? s.width : l ? $a(r, 0.5, 1.25) : 1,
                  y: /^(r|l)$/.test(o) ? s.height : l ? $a(r, 0.5, 1.25) : 1,
                },
                translate: {
                  x: i.x,
                  y: i.y,
                },
                opacity: a,
              }
            }))
          )
    }),
    [
      c,
      i,
      d,
      u,
      h,
      (e, t) =>
        ({ detail: o }) => {
          ;(p && t !== p) ||
            ('resizestart' !== e && void 0 === p) ||
            ('resizestart' === e && (p = t),
            'resizeend' === e && (p = void 0),
            m(e, {
              direction: t,
              translation: o && o.translation,
            }))
        },
      (e) =>
        ({ detail: t }) => {
          m('resizestart', {
            direction: e,
            translation: {
              x: 0,
              y: 0,
            },
          }),
            m('resizemove', {
              direction: e,
              translation: t,
            }),
            m('resizeend', {
              direction: e,
              translation: {
                x: 0,
                y: 0,
              },
            })
        },
      s,
      l,
      n,
      r,
      a,
    ]
  )
}
class Um extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Hm, Nm, xn, {
        rect: 7,
        visible: 8,
        style: 0,
      })
  }
}
var Xm = (e) => {
    function t(t, o) {
      e.dispatchEvent(
        new CustomEvent(t, {
          detail: o,
        })
      )
    }
    const o = (o) => {
        o.preventDefault(),
          e.addEventListener('gesturechange', i),
          e.addEventListener('gestureend', n),
          t('gesturedown')
      },
      i = (e) => {
        e.preventDefault(), t('gestureupdate', e.scale)
      },
      n = (e) => {
        t('gestureup', e.scale), e.preventDefault(), r()
      },
      r = () => {
        e.removeEventListener('gesturechange', i), e.removeEventListener('gestureend', n)
      }
    return (
      e.addEventListener('gesturestart', o),
      {
        destroy: () => {
          r(), e.removeEventListener('gesturestart', o)
        },
      }
    )
  },
  Ym = (e) => ne(e.clientX, e.clientY),
  Gm = (e, t, o) => {
    const i = Ym(e)
    return fe(fe(i, t), o)
  },
  qm = {
    [H]: X,
    [U]: Y,
    [X]: H,
    [Y]: U,
    [G]: K,
    [q]: J,
    [K]: G,
    [J]: q,
  },
  Km = (e) => {
    const t = e === Y || e === U,
      o = e === H || e === X
    return [
      e === U || e === q || e === K,
      e === Y || e === J || e === G,
      e === H || e === q || e === G,
      e === X || e === K || e === J,
      t,
      o,
      t || o,
    ]
  },
  Jm = (e, t, o, i = {}) => {
    const { target: n, translate: r } = t,
      { aspectRatio: a, minSize: s, maxSize: l } = i,
      c = Q[qm[n]],
      d = ge(ne(e.x, e.y), ne(c[0] * e.width, c[1] * e.height)),
      u = Q[n],
      h = ge(je(e), ne(u[0] * e.width, u[1] * e.height)),
      [p, m, g, f, $, y, b] = Km(n)
    let x = r.x,
      v = r.y
    $ ? (v = 0) : y && (x = 0)
    const w = Qm(d, n, o, {
      aspectRatio: a,
      minSize: s,
      maxSize: l,
    })
    let [S, k, M, C] = pt(e)
    if ((p ? (C = d.x) : m && (k = d.x), f ? (S = d.y) : g && (M = d.y), p)) {
      const e = w.inner.x + w.inner.width,
        t = w.outer.x + w.outer.width
      k = $a(h.x + x, e, t)
    } else if (m) {
      const e = w.outer.x,
        t = w.inner.x
      C = $a(h.x + x, e, t)
    }
    if (f) {
      const e = w.inner.y + w.inner.height,
        t = w.outer.y + w.outer.height
      M = $a(h.y + v, e, t)
    } else if (g) {
      const e = w.outer.y,
        t = w.inner.y
      S = $a(h.y + v, e, t)
    }
    if (a)
      if (b) {
        let e = k - C,
          t = M - S
        $
          ? ((t = e / a), (S = d.y - 0.5 * t), (M = d.y + 0.5 * t))
          : y && ((e = t * a), (C = d.x - 0.5 * e), (k = d.x + 0.5 * e))
      } else {
        const e = ne(h.x + x - d.x, h.y + v - d.y)
        n === q
          ? ((e.x = Math.max(0, e.x)), (e.y = Math.min(0, e.y)))
          : n === K
          ? ((e.x = Math.max(0, e.x)), (e.y = Math.max(0, e.y)))
          : n === J
          ? ((e.x = Math.min(0, e.x)), (e.y = Math.max(0, e.y)))
          : n === G && ((e.x = Math.min(0, e.x)), (e.y = Math.min(0, e.y)))
        const t = de(e),
          o = de(ne(w.inner.width, w.inner.height)),
          i = de(ne(w.outer.width, w.outer.height)),
          r = $a(t, o, i),
          s = ne(a, 1),
          l = $e(ue(s), r)
        n === q
          ? ((k = d.x + l.x), (S = d.y - l.y))
          : n === K
          ? ((k = d.x + l.x), (M = d.y + l.y))
          : n === J
          ? ((C = d.x - l.x), (M = d.y + l.y))
          : n === G && ((C = d.x - l.x), (S = d.y - l.y))
      }
    return qe(C, S, k - C, M - S)
  }
const Qm = (e, t, o, i) => {
  const { aspectRatio: n, minSize: r, maxSize: a } = i,
    s = t === U || t === q || t === K,
    l = t === Y || t === J || t === G,
    c = t === H || t === q || t === G,
    d = t === X || t === K || t === J,
    u = t === Y || t === U,
    h = t === H || t === X,
    p = je(o)
  s ? ((p.x = e.x), (p.width -= e.x)) : l && (p.width = e.x),
    d ? ((p.y = e.y), (p.height -= e.y)) : c && (p.height = e.y)
  const m = ((e, t) => Ze(0, 0, e, t))(Math.min(p.width, a.width), Math.min(p.height, a.height))
  if (n)
    if (u) {
      const t = Math.min(e.y, o.height - e.y)
      m.height = Math.min(2 * t, m.height)
    } else if (h) {
      const t = Math.min(e.x, o.width - e.x)
      m.width = Math.min(2 * t, m.width)
    }
  const g = n ? Pe(ht(m, n)) : m,
    f = n ? Pe(ut(He(r), n)) : r
  let $, y, b, x
  s ? ($ = e.x) : l && (y = e.x),
    d ? (b = e.y) : c && (x = e.y),
    s ? (y = $ + f.width) : l && ($ = y - f.width),
    d ? (x = b + f.height) : c && (b = x - f.height),
    u
      ? ((b = e.y - 0.5 * f.height), (x = e.y + 0.5 * f.height))
      : h && (($ = e.x - 0.5 * f.width), (y = e.x + 0.5 * f.width))
  const v = Xe([ne($, b), ne(y, x)])
  s ? (y = $ + g.width) : l && ($ = y - g.width),
    d ? (x = b + g.height) : c && (b = x - g.height),
    u
      ? ((b = e.y - 0.5 * g.height), (x = e.y + 0.5 * g.height))
      : h && (($ = e.x - 0.5 * g.width), (y = e.x + 0.5 * g.width))
  return {
    inner: v,
    outer: Xe([ne($, b), ne(y, x)]),
  }
}
var eg = (e, t, o = {}) => {
    const { target: i, translate: n } = t,
      { aspectRatio: r } = o,
      a = Q[qm[i]],
      s = ge(je(e), ne(a[0] * e.width, a[1] * e.height)),
      l = Q[i],
      c = ge(je(e), ne(l[0] * e.width, l[1] * e.height)),
      [d, u, h, p, m, g, f] = Km(i)
    let $ = n.x,
      y = n.y
    m ? (y = 0) : g && ($ = 0)
    let [b, x, v, w] = pt(e)
    if (
      (d ? (w = s.x) : u && (x = s.x),
      p ? (b = s.y) : h && (v = s.y),
      d ? (x = c.x + $) : u && (w = c.x + $),
      p ? (v = c.y + y) : h && (b = c.y + y),
      r)
    )
      if (f) {
        let e = x - w,
          t = v - b
        m
          ? ((t = e / r), (b = s.y - 0.5 * t), (v = s.y + 0.5 * t))
          : g && ((e = t * r), (w = s.x - 0.5 * e), (x = s.x + 0.5 * e))
      } else {
        const e = ne(c.x + $ - s.x, c.y + y - s.y)
        i === q
          ? ((e.x = Math.max(0, e.x)), (e.y = Math.min(0, e.y)))
          : i === K
          ? ((e.x = Math.max(0, e.x)), (e.y = Math.max(0, e.y)))
          : i === J
          ? ((e.x = Math.min(0, e.x)), (e.y = Math.max(0, e.y)))
          : i === G && ((e.x = Math.min(0, e.x)), (e.y = Math.min(0, e.y)))
        const t = de(e),
          o = ne(r, 1),
          n = $e(ue(o), t)
        i === q
          ? ((x = s.x + n.x), (b = s.y - n.y))
          : i === K
          ? ((x = s.x + n.x), (v = s.y + n.y))
          : i === J
          ? ((w = s.x - n.x), (v = s.y + n.y))
          : i === G && ((w = s.x - n.x), (b = s.y - n.y))
      }
    return qe(w, b, x - w, v - b)
  },
  tg = (e) => (180 * e) / Math.PI

function og(e) {
  let t, o, i
  return (
    (o = new Dm({
      props: {
        elasticity: e[5],
        min: e[7],
        max: e[8],
        value: e[12],
        valueMin: Math.max(e[7], e[0]),
        valueMax: Math.min(e[8], e[1]),
        labelReset: e[6],
        base: e[11],
        valueLabel: Math.round(tg(e[12])) + '°',
        oninputstart: e[2],
        oninputmove: e[17],
        oninputend: e[18],
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'class', 'PinturaImageRotator')
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, [t]) {
        const i = {}
        32 & t && (i.elasticity = e[5]),
          128 & t && (i.min = e[7]),
          256 & t && (i.max = e[8]),
          4096 & t && (i.value = e[12]),
          129 & t && (i.valueMin = Math.max(e[7], e[0])),
          258 & t && (i.valueMax = Math.min(e[8], e[1])),
          64 & t && (i.labelReset = e[6]),
          2048 & t && (i.base = e[11]),
          4096 & t && (i.valueLabel = Math.round(tg(e[12])) + '°'),
          4 & t && (i.oninputstart = e[2]),
          1544 & t && (i.oninputmove = e[17]),
          1552 & t && (i.oninputend = e[18]),
          o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function ig(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    { rotation: u } = t,
    { valueMin: h } = t,
    { valueMax: p } = t,
    { oninputstart: m = n } = t,
    { oninputmove: g = n } = t,
    { oninputend: f = n } = t,
    { elasticity: $ = 0 } = t,
    { labelReset: y } = t,
    { rotationMin: b } = t,
    { rotationMax: x } = t
  return (
    (e.$$set = (e) => {
      'rotation' in e && o(13, (u = e.rotation)),
        'valueMin' in e && o(0, (h = e.valueMin)),
        'valueMax' in e && o(1, (p = e.valueMax)),
        'oninputstart' in e && o(2, (m = e.oninputstart)),
        'oninputmove' in e && o(3, (g = e.oninputmove)),
        'oninputend' in e && o(4, (f = e.oninputend)),
        'elasticity' in e && o(5, ($ = e.elasticity)),
        'labelReset' in e && o(6, (y = e.labelReset)),
        'rotationMin' in e && o(14, (b = e.rotationMin)),
        'rotationMax' in e && o(15, (x = e.rotationMax))
    }),
    (e.$$.update = () => {
      16384 & e.$$.dirty && o(7, (i = b + 1e-9)),
        32768 & e.$$.dirty && o(8, (r = x - 1e-9)),
        384 & e.$$.dirty && o(11, (a = i + 0.5 * (r - i))),
        32768 & e.$$.dirty && o(16, (s = 2 * x)),
        8192 & e.$$.dirty && o(9, (l = Math.sign(u))),
        73728 & e.$$.dirty && o(10, (c = Math.round(Math.abs(u) / s) * s)),
        9728 & e.$$.dirty && o(12, (d = u - l * c))
    }),
    [h, p, m, g, f, $, y, i, r, l, c, a, d, u, b, x, s, (e) => g(l * c + e), (e) => f(l * c + e)]
  )
}
class ng extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, ig, og, xn, {
        rotation: 13,
        valueMin: 0,
        valueMax: 1,
        oninputstart: 2,
        oninputmove: 3,
        oninputend: 4,
        elasticity: 5,
        labelReset: 6,
        rotationMin: 14,
        rotationMax: 15,
      })
  }
}

function rg(e) {
  let t, o, i, n, r
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('p')),
        (i = Zn(e[0])),
        (n = Zn(' × ')),
        (r = Zn(e[1])),
        Yn(t, 'class', 'PinturaImageInfo')
    },
    m(e, a) {
      On(e, t, a), Dn(t, o), Dn(o, i), Dn(o, n), Dn(o, r)
    },
    p(e, [t]) {
      1 & t && qn(i, e[0]), 2 & t && qn(r, e[1])
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t)
    },
  }
}

function ag(e, t, o) {
  let { width: i } = t,
    { height: n } = t
  return (
    (e.$$set = (e) => {
      'width' in e && o(0, (i = e.width)), 'height' in e && o(1, (n = e.height))
    }),
    [i, n]
  )
}
class sg extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, ag, rg, xn, {
        width: 0,
        height: 1,
      })
  }
}

function lg(e) {
  let t, o
  return (
    (t = new vd({
      props: {
        class: 'PinturaPresetListFilter',
        layout: 'row',
        options: e[9],
        selectedIndex: e[7],
        onchange: e[10],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        512 & o && (i.options = e[9]), 128 & o && (i.selectedIndex = e[7]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function cg(e) {
  let t, o
  return (
    (t = new zd({
      props: {
        icon: e[0],
        label: e[1],
        labelClass: e[2],
        hideLabel: e[3],
        options: e[8],
        selectedIndex: e[4],
        onchange: e[5],
        optionMapper: e[6],
        $$slots: {
          controls: [lg],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, [o]) {
        const i = {}
        1 & o && (i.icon = e[0]),
          2 & o && (i.label = e[1]),
          4 & o && (i.labelClass = e[2]),
          8 & o && (i.hideLabel = e[3]),
          256 & o && (i.options = e[8]),
          16 & o && (i.selectedIndex = e[4]),
          32 & o && (i.onchange = e[5]),
          64 & o && (i.optionMapper = e[6]),
          262784 & o &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}
const dg = 'fill="none" stroke="currentColor"'

function ug(e, t, o) {
  let i,
    r,
    a,
    { icon: s } = t,
    { label: l } = t,
    { labelClass: c } = t,
    { hideLabel: d } = t,
    { options: u } = t,
    { selectedIndex: h } = t,
    { onchange: p } = t,
    { optionMapper: m } = t,
    { filter: g = 'landscape' } = t,
    { onfilterchange: f = n } = t
  const $ = (e, t, o, i, n) =>
      `\n    <rect ${dg} x="${e}" y="${t}" width="${o}" height="${i}" rx="${n}"/>`,
    y = (e, t) => `<path ${dg} d="M${e} ${t} l2 2 l3 -4"/>`
  return (
    (e.$$set = (e) => {
      'icon' in e && o(0, (s = e.icon)),
        'label' in e && o(1, (l = e.label)),
        'labelClass' in e && o(2, (c = e.labelClass)),
        'hideLabel' in e && o(3, (d = e.hideLabel)),
        'options' in e && o(12, (u = e.options)),
        'selectedIndex' in e && o(4, (h = e.selectedIndex)),
        'onchange' in e && o(5, (p = e.onchange)),
        'optionMapper' in e && o(6, (m = e.optionMapper)),
        'filter' in e && o(11, (g = e.filter)),
        'onfilterchange' in e && o(13, (f = e.onfilterchange))
    }),
    (e.$$.update = () => {
      6144 & e.$$.dirty &&
        o(
          8,
          (i = ((e, t) => (e || []).map((e) => (w(e[0]) ? ((e[1] = e[1].map(t)), e) : t(e))))(
            u,
            ((e) => (t) => {
              const [o, i, n = {}] = t
              return uo(o) && (n.hidden = 'landscape' === e ? o < 1 : o > 1), [o, i, n]
            })(g)
          ))
        ),
        2048 & e.$$.dirty && o(7, (r = 'landscape' === g ? 0 : 1)),
        128 & e.$$.dirty &&
          o(
            9,
            (a = [
              [
                'landscape',
                'Landscape',
                {
                  hideLabel: !0,
                  icon: $(2, 6, 19, 12, 2) + (0 === r ? y(9, 12) : ''),
                },
              ],
              [
                'portrait',
                'Portrait',
                {
                  hideLabel: !0,
                  icon: $(5, 3, 13, 18, 2) + (1 === r ? y(9, 12) : ''),
                },
              ],
            ])
          )
    }),
    [
      s,
      l,
      c,
      d,
      h,
      p,
      m,
      r,
      i,
      a,
      (e) => {
        o(11, (g = e.value)), f(e.value)
      },
      g,
      u,
      f,
    ]
  )
}
class hg extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, ug, cg, xn, {
        icon: 0,
        label: 1,
        labelClass: 2,
        hideLabel: 3,
        options: 12,
        selectedIndex: 4,
        onchange: 5,
        optionMapper: 6,
        filter: 11,
        onfilterchange: 13,
      })
  }
}
const pg = (e) => me(e, (e) => ee(e, 6)),
  mg = (e) => gt(e, (e) => ee(e, 6)),
  gg = (e, t, o = 1e-4) => Math.abs(e - t) < o
var fg = (e, t, o, i, n = {}) => {
  const { aspectRatio: r } = n
  ;(e = mg(e)), (i = i.map(pg))
  const a = tt(e, qm[o.target]),
    s = me(a, (e) => ee(e, 6)),
    l = r ? ut(n.minSize, r) : n.minSize,
    c = r ? ht(n.maxSize, r) : n.maxSize,
    d = tt(t, o.target)
  if (xe(d, a) < 1) {
    t = je(e)
    const o = Math.min(l.width / e.width, l.height / e.height)
    Qe(t, o, a)
  }
  t = et(je(t), l, c, a)
  let u = je(t)
  t = mg(t)
  const h = St(i, 1),
    p = mt(e),
    m = mt(t),
    g = p.findIndex((e) =>
      pe(
        me(e, (e) => ee(e, 6)),
        s
      )
    ),
    f = (e) =>
      h
        .map((t) => bt(t, e))
        .filter(Boolean)
        .pop()
  if (r) {
    const t = m
      .map((e, t) => {
        if (t === g) return
        const o = ne(a.x - e.x, a.y - e.y)
        ue(o), $e(o, 0.5)
        const i = ne(a.x - o.x, a.y - o.y),
          n = Oe(i, pg(e)),
          r = f(n)
        if (!r) return
        const s = p[t]
        return {
          intersection: r,
          cornerDist: xe(a, s),
          intersectionDist: xe(a, r),
        }
      })
      .filter(Boolean)
    if (t.length) {
      const o = t.reduce((e, t) => {
        const o = t.intersectionDist / t.cornerDist
        return o < e ? o : e
      }, Number.MAX_SAFE_INTEGER)
      ;(u = je(e)), Qe(u, o, a)
    }
  } else {
    const e = 1 === o.target.length,
      n = !(i[0].y === i[1].y || i[0].x === i[1].x),
      r = p
        .map((t, o) => {
          if (o === g) return
          const i = m[o],
            r = !gg(i.x, s.x) && !gg(i.y, s.y)
          if (!e && !n && r) return
          if (e && (gg(i.x, s.x) || gg(i.y, s.y))) return
          const l = se(e ? t : a),
            c = fe(se(l), i)
          ue(c), $e(c, 0.5), e ? ge(l, c) : fe(l, c)
          const d = Oe(l, i),
            u = f(d)
          return u || void 0
        })
        .filter(Boolean)
    if (r.length) {
      const [e, i, n, l] = Km(o.target)
      let [c, d, h, p] = pt(t)
      r.forEach(({ x: t, y: o }) => {
        const r = ee(t, 6),
          a = ee(o, 6)
        n && !gg(a, s.y) && (c = Math.max(c, o)),
          e && !gg(r, s.x) && (d = Math.min(d, t)),
          l && !gg(a, s.y) && (h = Math.min(h, o)),
          i && !gg(r, s.x) && (p = Math.max(p, t))
      }),
        (u = Ze(($ = [c, d, h, p])[3], $[0], $[1] - $[3], $[2] - $[0])),
        Qe(u, 0.9999, a)
    }
  }
  var $
  return et(u, l, c, a), u
}

function $g(e) {
  let t, o
  return (
    (t = new cu({
      props: {
        items: e[10],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        1024 & o[0] && (i.items = e[10]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function yg(e) {
  let t, o, i
  return (
    (o = new Vm({
      props: {
        $$slots: {
          default: [$g],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'slot', 'header')
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, t) {
        const i = {}
        ;(1024 & t[0]) | (67108864 & t[6]) &&
          (i.$$scope = {
            dirty: t,
            ctx: e,
          }),
          o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function bg(e) {
  let t, o
  return (
    (t = new Ql({
      props: {
        onclick: e[88],
        label: e[4].cropLabelButtonRecenter,
        icon: e[4].cropIconButtonRecenter,
        class: 'PinturaButtonCenter',
        disabled: !e[11],
        hideLabel: !0,
        style: `opacity: ${e[29]}; transform: translate3d(${e[30].x}px, ${e[30].y}px, 0)`,
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        16 & o[0] && (i.label = e[4].cropLabelButtonRecenter),
          16 & o[0] && (i.icon = e[4].cropIconButtonRecenter),
          2048 & o[0] && (i.disabled = !e[11]),
          1610612736 & o[0] &&
            (i.style = `opacity: ${e[29]}; transform: translate3d(${e[30].x}px, ${e[30].y}px, 0)`),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function xg(e) {
  let t, o
  return (
    (t = new Um({
      props: {
        rect: e[12],
        visible: e[7],
        style: e[1],
      },
    })),
    t.$on('resizestart', e[68]),
    t.$on('resizemove', e[69]),
    t.$on('resizeend', e[70]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        4096 & o[0] && (i.rect = e[12]),
          128 & o[0] && (i.visible = e[7]),
          2 & o[0] && (i.style = e[1]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function vg(e) {
  let t, o
  return (
    (t = new sg({
      props: {
        width: Math.round(e[8].width),
        height: Math.round(e[8].height),
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        256 & o[0] && (i.width = Math.round(e[8].width)),
          256 & o[0] && (i.height = Math.round(e[8].height)),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function wg(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c = e[19] && e[13] && bg(e),
    d = e[19] && xg(e),
    u = e[18] && vg(e)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        c && c.c(),
        (i = jn()),
        d && d.c(),
        (r = jn()),
        u && u.c(),
        Yn(o, 'class', 'PinturaStage'),
        Yn(t, 'slot', 'main')
    },
    m(h, p) {
      On(h, t, p),
        Dn(t, o),
        c && c.m(o, null),
        Dn(o, i),
        d && d.m(o, null),
        e[162](o),
        Dn(t, r),
        u && u.m(t, null),
        (a = !0),
        s ||
          ((l = [
            Hn(o, 'measure', e[160]),
            Rn(Rs.call(null, o)),
            Hn(
              o,
              'wheel',
              function () {
                bn(e[2] && e[87]) && (e[2] && e[87]).apply(this, arguments)
              },
              {
                passive: !1,
              }
            ),
            Hn(o, 'interactionstart', e[74]),
            Hn(o, 'interactionupdate', e[75]),
            Hn(o, 'interactionrelease', e[77]),
            Hn(o, 'interactionend', e[76]),
            Rn(
              (n = tc.call(null, o, {
                drag: !0,
                inertia: !0,
                pinch: e[2],
                shouldStartInteraction: Eg,
                getEventPosition: e[163],
              }))
            ),
            Hn(o, 'gesturedown', e[84]),
            Hn(o, 'gestureupdate', e[85]),
            Hn(o, 'gestureup', e[86]),
            Rn(Xm.call(null, o)),
          ]),
          (s = !0))
    },
    p(r, a) {
      ;(e = r)[19] && e[13]
        ? c
          ? (c.p(e, a), 532480 & a[0] && Fr(c, 1))
          : ((c = bg(e)), c.c(), Fr(c, 1), c.m(o, i))
        : c &&
          (Er(),
          zr(c, 1, 1, () => {
            c = null
          }),
          Lr()),
        e[19]
          ? d
            ? (d.p(e, a), 524288 & a[0] && Fr(d, 1))
            : ((d = xg(e)), d.c(), Fr(d, 1), d.m(o, null))
          : d &&
            (Er(),
            zr(d, 1, 1, () => {
              d = null
            }),
            Lr()),
        n &&
          bn(n.update) &&
          131076 & a[0] &&
          n.update.call(null, {
            drag: !0,
            inertia: !0,
            pinch: e[2],
            shouldStartInteraction: Eg,
            getEventPosition: e[163],
          }),
        e[18]
          ? u
            ? (u.p(e, a), 262144 & a[0] && Fr(u, 1))
            : ((u = vg(e)), u.c(), Fr(u, 1), u.m(t, null))
          : u &&
            (Er(),
            zr(u, 1, 1, () => {
              u = null
            }),
            Lr())
    },
    i(e) {
      a || (Fr(c), Fr(d), Fr(u), (a = !0))
    },
    o(e) {
      zr(c), zr(d), zr(u), (a = !1)
    },
    d(o) {
      o && Wn(t), c && c.d(), d && d.d(), e[162](null), u && u.d(), (s = !1), yn(l)
    },
  }
}

function Sg(e) {
  let t, o, i, n
  const r = [
    {
      class: 'PinturaControlList',
    },
    {
      tabs: e[14],
    },
    e[22],
  ]
  let a = {
    $$slots: {
      default: [
        kg,
        ({ tab: e }) => ({
          211: e,
        }),
        ({ tab: e }) => [0, 0, 0, 0, 0, 0, e ? 33554432 : 0],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < r.length; e += 1) a = gn(a, r[e])
  ;(t = new Tl({
    props: a,
  })),
    t.$on('select', e[161])
  const s = [
    {
      class: 'PinturaControlPanels',
    },
    {
      panelClass: 'PinturaControlPanel',
    },
    {
      panels: e[23],
    },
    e[22],
  ]
  let l = {
    $$slots: {
      default: [
        Tg,
        ({ panel: e }) => ({
          210: e,
        }),
        ({ panel: e }) => [0, 0, 0, 0, 0, 0, e ? 16777216 : 0],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < s.length; e += 1) l = gn(l, s[e])
  return (
    (i = new Wl({
      props: l,
    })),
    {
      c() {
        Hr(t.$$.fragment), (o = jn()), Hr(i.$$.fragment)
      },
      m(e, r) {
        Ur(t, e, r), On(e, o, r), Ur(i, e, r), (n = !0)
      },
      p(e, o) {
        const n =
          4210688 & o[0]
            ? Zr(r, [
                r[0],
                16384 & o[0] && {
                  tabs: e[14],
                },
                4194304 & o[0] && jr(e[22]),
              ])
            : {}
        100663296 & o[6] &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(n)
        const a =
          12582912 & o[0]
            ? Zr(s, [
                s[0],
                s[1],
                8388608 & o[0] && {
                  panels: e[23],
                },
                4194304 & o[0] && jr(e[22]),
              ])
            : {}
        ;(503382552 & o[0]) | (83886080 & o[6]) &&
          (a.$$scope = {
            dirty: o,
            ctx: e,
          }),
          i.$set(a)
      },
      i(e) {
        n || (Fr(t.$$.fragment, e), Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        Xr(t, e), e && Wn(o), Xr(i, e)
      },
    }
  )
}

function kg(e) {
  let t,
    o,
    i = e[211].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      33554432 & t[6] && i !== (i = e[211].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Mg(e) {
  let t, o
  return (
    (t = new Dm({
      props: {
        elasticity: e[25] * e[43],
        base: Ag,
        min: e[16],
        max: Rg,
        valueMin: e[27][0],
        valueMax: e[27][1],
        value: e[28],
        labelReset: e[4].labelReset,
        valueLabel: Math.round(100 * e[28]) + '%',
        oninputstart: e[81],
        oninputmove: e[82],
        oninputend: e[83],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        33554432 & o[0] && (i.elasticity = e[25] * e[43]),
          65536 & o[0] && (i.min = e[16]),
          134217728 & o[0] && (i.valueMin = e[27][0]),
          134217728 & o[0] && (i.valueMax = e[27][1]),
          268435456 & o[0] && (i.value = e[28]),
          16 & o[0] && (i.labelReset = e[4].labelReset),
          268435456 & o[0] && (i.valueLabel = Math.round(100 * e[28]) + '%'),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Cg(e) {
  let t, o
  return (
    (t = new ng({
      props: {
        elasticity: e[25] * e[43],
        rotation: e[9],
        labelReset: e[4].labelReset,
        valueMin: e[26][0],
        valueMax: e[26][1],
        rotationMin: -e[3],
        rotationMax: e[3],
        oninputstart: e[71],
        oninputmove: e[72],
        oninputend: e[73],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        33554432 & o[0] && (i.elasticity = e[25] * e[43]),
          512 & o[0] && (i.rotation = e[9]),
          16 & o[0] && (i.labelReset = e[4].labelReset),
          67108864 & o[0] && (i.valueMin = e[26][0]),
          67108864 & o[0] && (i.valueMax = e[26][1]),
          8 & o[0] && (i.rotationMin = -e[3]),
          8 & o[0] && (i.rotationMax = e[3]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Tg(e) {
  let t, o, i, n
  const r = [Cg, Mg],
    a = []

  function s(e, t) {
    return e[210] === e[93] + '-rotation' ? 0 : e[210] === e[93] + '-zoom' ? 1 : -1
  }
  return (
    ~(t = s(e)) && (o = a[t] = r[t](e)),
    {
      c() {
        o && o.c(), (i = Nn())
      },
      m(e, o) {
        ~t && a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, n) {
        let l = t
        ;(t = s(e)),
          t === l
            ? ~t && a[t].p(e, n)
            : (o &&
                (Er(),
                zr(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Lr()),
              ~t
                ? ((o = a[t]),
                  o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
                  Fr(o, 1),
                  o.m(i.parentNode, i))
                : (o = null))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        ~t && a[t].d(e), e && Wn(i)
      },
    }
  )
}

function Pg(e) {
  let t,
    o,
    i = e[21] && Sg(e)
  return {
    c() {
      ;(t = Vn('div')), i && i.c(), Yn(t, 'slot', 'footer'), Yn(t, 'style', e[24])
    },
    m(e, n) {
      On(e, t, n), i && i.m(t, null), (o = !0)
    },
    p(e, n) {
      e[21]
        ? i
          ? (i.p(e, n), 2097152 & n[0] && Fr(i, 1))
          : ((i = Sg(e)), i.c(), Fr(i, 1), i.m(t, null))
        : i &&
          (Er(),
          zr(i, 1, 1, () => {
            i = null
          }),
          Lr()),
        (!o || 16777216 & n[0]) && Yn(t, 'style', e[24])
    },
    i(e) {
      o || (Fr(i), (o = !0))
    },
    o(e) {
      zr(i), (o = !1)
    },
    d(e) {
      e && Wn(t), i && i.d()
    },
  }
}

function Ig(e) {
  let t, o, i

  function n(t) {
    e[164](t)
  }
  let r = {
    hasHeader: e[20],
    $$slots: {
      footer: [Pg],
      main: [wg],
      header: [yg],
    },
    $$scope: {
      ctx: e,
    },
  }
  return (
    void 0 !== e[15] && (r.root = e[15]),
    (t = new Lm({
      props: r,
    })),
    gr.push(() => Nr(t, 'root', n)),
    t.$on('measure', e[165]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, i) {
        const n = {}
        1048576 & i[0] && (n.hasHeader = e[20]),
          (2146402302 & i[0]) | (67108864 & i[6]) &&
            (n.$$scope = {
              dirty: i,
              ctx: e,
            }),
          !o && 32768 & i[0] && ((o = !0), (n.root = e[15]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}
const Rg = 1,
  Ag = 0,
  Eg = (e, t) => e.target === t

function Lg(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    v,
    w,
    S,
    k,
    M,
    C,
    P,
    I,
    R,
    A,
    E,
    L,
    F,
    z,
    B,
    D,
    V,
    N,
    H,
    U,
    X,
    Y,
    G,
    q,
    K,
    J,
    Q,
    te,
    oe,
    ie,
    re,
    ae,
    ce,
    ue,
    he,
    me,
    ye,
    be,
    xe,
    ve,
    we,
    Se,
    ke,
    Me,
    Te,
    Re,
    Ee,
    Oe,
    We,
    Ve,
    _e,
    Ze,
    Ne,
    Ue,
    Xe = pn,
    Ye = () => (Xe(), (Xe = vn(et, (e) => o(7, (A = e)))), et)
  e.$$.on_destroy.push(() => Xe())
  let { isActive: et } = t
  Ye()
  let { stores: tt } = t,
    { cropImageSelectionCornerStyle: at = 'circle' } = t,
    {
      cropWillRenderImageSelectionGuides: st = (e, t) => {
        const o = 'rotate' == e
        return {
          rows: o ? 5 : 3,
          cols: o ? 5 : 3,
          opacity: 0.25 * t,
        }
      },
    } = t,
    { cropAutoCenterImageSelectionTimeout: lt } = t,
    { cropEnableZoomMatchImageAspectRatio: mt = !0 } = t,
    { cropEnableRotateMatchImageAspectRatio: ft = 'never' } = t,
    { cropEnableRotationInput: $t = !0 } = t,
    { cropEnableZoom: yt = !0 } = t,
    { cropEnableZoomInput: bt = !0 } = t,
    { cropEnableZoomAutoHide: xt = !0 } = t,
    { cropEnableImageSelection: vt = !0 } = t,
    { cropEnableInfoIndicator: wt = !1 } = t,
    { cropEnableZoomTowardsWheelPosition: St = !0 } = t,
    { cropEnableLimitWheelInputToCropSelection: kt = !0 } = t,
    { cropEnableCenterImageSelection: Mt = !0 } = t,
    { cropEnableButtonRotateLeft: Ct = !0 } = t,
    { cropEnableButtonRotateRight: Tt = !1 } = t,
    { cropEnableButtonFlipHorizontal: Pt = !0 } = t,
    { cropEnableButtonFlipVertical: It = !1 } = t,
    { cropSelectPresetOptions: Rt } = t,
    { cropEnableSelectPreset: At = !0 } = t,
    { cropEnableFilterMatchAspectRatio: Et = !0 } = t,
    { cropSelectPresetFilter: Lt = !1 } = t,
    { cropEnableButtonToggleCropLimit: Ft = !1 } = t,
    { cropWillRenderTools: zt = W } = t,
    { cropActiveTransformTool: Bt = 'rotation' } = t,
    { cropMinimizeToolbar: Dt = 'auto' } = t,
    { cropInteractionFocus: Ot = 'image' } = t,
    { cropRotationRange: Wt = Z } = t,
    { locale: Vt = {} } = t
  const _t = hr('isAnimated')
  Sn(e, _t, (e) => o(152, (ke = e)))
  const Zt = hr('elasticityMultiplier')
  Sn(e, Zt, (e) => o(25, (We = e)))
  const jt = hr('redrawTrigger')
  Sn(e, jt, (e) => o(126, (D = e)))
  const Nt = hr('imageIsStatic')
  Sn(e, Nt, (e) => o(140, (ae = e)))
  const Ht = hr('imageStaticVisualCorners')
  Sn(e, Ht, (e) => o(180, (ue = e)))
  let Ut = 'idle'
  const Xt = Jr()
  Sn(e, Xt, (e) => o(124, (L = e)))
  const Yt = () => void 0 === E,
    Gt = (e) => 1 / e,
    qt = (e) => {
      Et && Lt !== e && (o(95, (Lt = e)), E && 1 !== E && Kt() && In(Eo, (E = Gt(E)), E))
    },
    Kt = () => {
      if (1 === E || !i) return !1
      const e = Gt(E)
      return !!Hc(L).find(([t]) => t === e)
    },
    Jt = (e, t, o) =>
      j(o)
        ? t.width === Math.round(e.height) || t.height === Math.round(e.width)
        : t.width === Math.round(e.width) || t.height === Math.round(e.height),
    Qt = () =>
      (Yt() || ('always' === ft && Kt())) &&
      ((e, t, o) => {
        const i = De(ze(Ce(t), o), (e) => Math.abs(Math.round(e))),
          n = Fe(i),
          r = Ke(e)
        return pe(n, r)
      })(F, z, B) &&
      Jt(F, z, B),
    eo = (e) => {
      if ('never' !== ft && Qt()) {
        In(bo, (B += e), B)
        const t = j(B),
          o = t ? z.height : z.width,
          i = t ? z.width : z.height
        In(Po, (F = qe(0, 0, o, i)), F), Yt() || In(Eo, (E = O(o, i)), E)
      } else In(bo, (B += e), B)
    },
    {
      history: to,
      env: oo,
      isInteracting: io,
      isInteractingFraction: no,
      isTransformingImage: ro,
      rootRect: ao,
      stageRect: so,
      utilRect: lo,
      rootLineColor: co,
      rangeInputElasticity: uo,
      presentationScalar: ho,
      utilTools: po,
      imagePreviewModifiers: go,
      imageOutlineOpacity: fo,
      imageFlipX: $o,
      imageFlipY: yo,
      imageRotation: bo,
      imageRotationRange: xo,
      imageOutputSize: vo,
      imageSelectionRect: wo,
      imageSelectionRectSnapshot: So,
      imageSelectionRectIntent: ko,
      imageSelectionRectPresentation: Mo,
      imageCropRectIntent: Co,
      imageCropRectOrigin: To,
      imageCropRect: Po,
      imageCropMinSize: Io,
      imageCropMaxSize: Ro,
      imageCropRange: Ao,
      imageCropAspectRatio: Eo,
      imageCropLimitToImage: Lo,
      imageSize: Fo,
      imageScalar: zo,
      imageOverlayMarkup: Bo,
      framePadded: Do,
    } = tt
  let Oo, Wo, Vo
  Sn(e, oo, (e) => o(134, (G = e))),
    Sn(e, io, (e) => o(136, (K = e))),
    Sn(e, ro, (e) => o(178, (ie = e))),
    Sn(e, ao, (e) => o(17, (be = e))),
    Sn(e, so, (e) => o(142, (xe = e))),
    Sn(e, lo, (e) => o(141, (ce = e))),
    Sn(e, ho, (e) => o(139, (te = e))),
    Sn(e, po, (e) => o(176, (q = e))),
    Sn(e, go, (e) => o(154, (Te = e))),
    Sn(e, $o, (e) => o(128, (N = e))),
    Sn(e, yo, (e) => o(127, (V = e))),
    Sn(e, bo, (e) => o(9, (B = e))),
    Sn(e, xo, (e) => o(26, (Ve = e))),
    Sn(e, vo, (e) => o(175, (U = e))),
    Sn(e, wo, (e) => o(138, (Q = e))),
    Sn(e, So, (e) => o(137, (J = e))),
    Sn(e, ko, (e) => o(179, (re = e))),
    Sn(e, Mo, (e) => o(145, (we = e))),
    Sn(e, Co, (e) => o(182, (me = e))),
    Sn(e, To, (e) => o(181, (he = e))),
    Sn(e, Po, (e) => o(8, (F = e))),
    Sn(e, Io, (e) => o(132, (X = e))),
    Sn(e, Ro, (e) => o(177, (oe = e))),
    Sn(e, Ao, (e) => o(183, (ye = e))),
    Sn(e, Eo, (e) => o(174, (E = e))),
    Sn(e, Lo, (e) => o(133, (Y = e))),
    Sn(e, Fo, (e) => o(125, (z = e))),
    Sn(e, zo, (e) => o(151, (Se = e))),
    Sn(e, Bo, (e) => o(185, (Re = e))),
    Sn(e, Do, (e) => o(153, (Me = e)))
  const _o = (e, t) => {
    const o = {
      target: e,
      translate: t,
    }
    let i,
      n = eg(J, o, {
        aspectRatio: E,
      })
    if (ae) {
      if (
        ((n = Jm(J, o, ce, {
          aspectRatio: E,
          minSize: Wo,
          maxSize: Vo,
        })),
        (n = ((e, t, o) => {
          const [i, n, r, a] = pt(e),
            s = { ...e }
          if (
            (i < t.y && ((e.height = e.height - (t.y - i)), (e.y = t.y)),
            n > t.x + t.width && (e.width = t.x + t.width - e.x),
            r > t.y + t.height && (e.height = t.y + t.height - e.y),
            a < t.x && ((e.width = e.width - (t.x - a)), (e.x = t.x)),
            o)
          ) {
            const t = Math.min(1, s.width / e.width, s.height / e.height)
            return ot(s, t)
          }
          return e
        })(n, { ...ce, x: 0, y: 0 }, E)),
        !Y)
      )
        return {
          boundsLimited: n,
          boundsIntent: n,
        }
      let e = fg(J, n, o, ue, {
        aspectRatio: E,
        minSize: Wo,
        maxSize: Vo,
      })
      return {
        boundsLimited: e,
        boundsIntent: e,
      }
    }
    const r = Pe(it(je(n), te))
    if (r.width < X.width || r.height < X.height) {
      const o = t.y < 0,
        n = t.x > 0,
        a = t.x < 0,
        s = t.y > 0,
        l =
          ('t' === e && o) ||
          ('r' === e && n) ||
          ('b' === e && s) ||
          ('l' === e && a) ||
          ('tr' === e && (n || o)) ||
          ('tl' === e && (a || o)) ||
          ('br' === e && (n || s)) ||
          ('bl' === e && (a || s)),
        c = rt(r),
        d = ma(z, B, c)
      if (l && (d.width < X.width || d.height < X.height)) {
        if (0 !== B) {
          const e = Math.sign(B),
            t = Math.round(Math.abs(B) / _) * _,
            o = B - e * t,
            i = (t / _) % 2 == 1,
            n = i ? z.height : z.width,
            a = i ? z.width : z.height,
            s = Math.abs(o),
            l = Math.sin(s),
            c = Math.cos(s)
          if (r.width < X.width) {
            r.width = X.width
            const e = n - (c * r.width + l * r.height),
              t = a - (l * r.width + c * r.height)
            e < t ? (r.height = (n - c * r.width) / l) : t < e && (r.height = (a - l * r.width) / c)
          }
          if (r.height < X.height) {
            r.height = X.height
            const e = n - (c * r.width + l * r.height),
              t = a - (l * r.width + c * r.height)
            e < t ? (r.width = (n - l * r.height) / c) : t < e && (r.width = (a - c * r.height) / l)
          }
        } else
          r.width < X.width && ((r.width = X.width), (r.height = z.height)),
            r.height < X.height && ((r.height = X.height), (r.width = z.width))
        i = rt(r)
      }
    }
    return (
      i &&
        (n = eg(J, o, {
          aspectRatio: i || E,
        })),
      {
        boundsLimited: Jm(J, o, ce, {
          aspectRatio: E || i,
          minSize: Wo,
          maxSize: Vo,
        }),
        boundsIntent: n,
      }
    )
  }
  let Zo = void 0,
    jo = void 0
  const No = ({ translation: e, scalar: t }) => {
      ae && ((t = 1), (e = le(se(e))))
      const o = Math.min(Q.width / F.width, Q.height / F.height),
        i = $e(se(e), 1 / o)
      let n
      if (jo) {
        const t = fe(se(jo), e)
        ;(jo = e), (n = Je(je(F), t))
      } else (n = Je(je(Zo), le(se(i)))), void 0 !== t && Qe(n, 1 / t)
      In(Co, (me = n), me), In(Po, (F = n), F)
    },
    Ho = Qr([Ao, Po], ([e, t], o) => {
      if (!t) return
      const [i, n] = e,
        r = rt(t)
      o([Pe(gt(ut(i, r), ee)), Pe(gt(ht(n, r), ee))])
    })
  Sn(e, Ho, (e) => o(184, (ve = e)))
  const Uo = Qr([Fo, Lo, Io, Ro, Ao, bo], ([e, t, o, i, n, r], a) => {
    if (!e) return
    const s = n[0],
      l = n[1]
    let c, d
    t
      ? ((c = ((e, t, o) =>
          j(o)
            ? 1 - 1 / Math.min(e.height / t.width, e.width / t.height)
            : 1 - 1 / Math.min(e.width / t.width, e.height / t.height))(e, l, r)),
        (d = Math.min(s.width / o.width, s.height / o.height)))
      : ((c = -1), (d = 1))
    a([c, d].map((e) => ee(e)))
  })
  Sn(e, Uo, (e) => o(27, (_e = e)))
  const Xo = Qr([Fo, Po, Ao, bo], ([e, t, o, i], n) => {
    if (!e || !t) return n(0)
    let r
    const a = o[0],
      s = o[1],
      l = t.width,
      c = t.height,
      d = rt(t),
      u = j(i) ? Ae(e.height, e.width) : e,
      h = ht(u, d)
    if (l <= h.width || c <= h.height) {
      const e = h.width - a.width,
        t = h.height - a.height
      r = 0 === e || 0 === t ? 1 : 1 - Math.min((l - a.width) / e, (c - a.height) / t)
    } else {
      const e = s.width - h.width,
        t = s.height - h.height,
        o = ht(
          {
            width: e,
            height: t,
          },
          d
        )
      r = -Math.min((l - h.width) / o.width, (c - h.height) / o.height)
    }
    n(r)
  })
  Sn(e, Xo, (e) => o(28, (Ze = e)))
  const Yo = (e) => {
    const t = rt(Zo)
    let o, i, n
    const r = j(B) ? Ae(z.height, z.width) : z,
      a = ht(r, t)
    if (e >= 0) {
      const r = a.width - ye[0].width,
        s = a.height - ye[0].height
      ;(o = a.width - r * e),
        (i = a.height - s * e),
        (n = ut(
          {
            width: o,
            height: i,
          },
          t
        ))
    } else {
      const r = ye[1].width - a.width,
        s = ye[1].height - a.height
      ;(o = a.width + r * -e),
        (i = a.height + s * -e),
        (n = ht(
          {
            width: o,
            height: i,
          },
          t
        ))
    }
    ;(o = n.width), (i = n.height)
    const s = Zo.x + 0.5 * Zo.width - 0.5 * o,
      l = Zo.y + 0.5 * Zo.height - 0.5 * i
    In(
      Po,
      (F = {
        x: s,
        y: l,
        width: o,
        height: i,
      }),
      F
    )
  }
  let Go
  const qo = (e) => {
    const t = Qe(je(Go), 1 / e)
    In(Co, (me = t), me), In(Po, (F = t), F)
  }
  let Ko
  const Jo = dr(),
    Qo = () => {
      Jo('measure', { ...ce })
    }
  let ei
  const ti = ys(0, {
    precision: 1e-4,
  })
  Sn(e, ti, (e) => o(29, (Ne = e)))
  const oi = ys()
  Sn(e, oi, (e) => o(30, (Ue = e)))
  const ii = Qr([Eo, vo, Xt], ([e, t, o], n) => {
    if (!i) return
    const r = Hc(o),
      a = [...r]
        .map((e) => e[0])
        .sort((e, t) => (mo(e[0]) && !mo(t[0]) ? 1 : -1))
        .find((o) => {
          if (mo(o) && t) {
            const [i, n] = o,
              r = t.width === i && t.height === n,
              a = e === O(i, n)
            return r && a
          }
          return o === e
        })
    n(r.map((e) => e[0]).findIndex((e) => (mo(e) ? va(e, a) : e === a)))
  })
  Sn(e, ii, (e) => o(130, (H = e)))
  const ni = (e, t) => {
      if (!i || -1 === e || void 0 === e) return
      const o = Hc(t)[e][0]
      return o ? (mo(o) ? O(o[0], o[1]) : o) : void 0
    },
    ri = Qr([co, Mo, no], ([e, t, o], i) => {
      const { rows: n, cols: r, opacity: a } = st(Ut, o)
      if (!t || a <= 0) return i([])
      const { x: s, y: l, width: c, height: d } = t,
        u = c / r,
        h = d / n,
        p = []
      for (let t = 1; t <= n - 1; t++) {
        const o = l + h * t
        p.push({
          id: 'image-selection-guide-row-' + t,
          points: [ne(s, o), ne(s + c, o)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: e,
        })
      }
      for (let t = 1; t <= r - 1; t++) {
        const o = s + u * t
        p.push({
          id: 'image-selection-guide-col-' + t,
          points: [ne(o, l), ne(o, l + d)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: e,
        })
      }
      i(p)
    })
  Sn(e, ri, (e) => o(155, (Ee = e)))
  const ai = 'crop-' + T()
  let si,
    li = ai + '-' + ($t ? Bt : 'zoom'),
    ci = li,
    di = void 0
  const ui = ys(ke ? 20 : 0)
  Sn(e, ui, (e) => o(159, (Oe = e)))
  return (
    (e.$$set = (e) => {
      'isActive' in e && Ye(o(0, (et = e.isActive))),
        'stores' in e && o(97, (tt = e.stores)),
        'cropImageSelectionCornerStyle' in e && o(1, (at = e.cropImageSelectionCornerStyle)),
        'cropWillRenderImageSelectionGuides' in e &&
          o(98, (st = e.cropWillRenderImageSelectionGuides)),
        'cropAutoCenterImageSelectionTimeout' in e &&
          o(99, (lt = e.cropAutoCenterImageSelectionTimeout)),
        'cropEnableZoomMatchImageAspectRatio' in e &&
          o(100, (mt = e.cropEnableZoomMatchImageAspectRatio)),
        'cropEnableRotateMatchImageAspectRatio' in e &&
          o(101, (ft = e.cropEnableRotateMatchImageAspectRatio)),
        'cropEnableRotationInput' in e && o(102, ($t = e.cropEnableRotationInput)),
        'cropEnableZoom' in e && o(2, (yt = e.cropEnableZoom)),
        'cropEnableZoomInput' in e && o(103, (bt = e.cropEnableZoomInput)),
        'cropEnableZoomAutoHide' in e && o(104, (xt = e.cropEnableZoomAutoHide)),
        'cropEnableImageSelection' in e && o(105, (vt = e.cropEnableImageSelection)),
        'cropEnableInfoIndicator' in e && o(106, (wt = e.cropEnableInfoIndicator)),
        'cropEnableZoomTowardsWheelPosition' in e &&
          o(107, (St = e.cropEnableZoomTowardsWheelPosition)),
        'cropEnableLimitWheelInputToCropSelection' in e &&
          o(108, (kt = e.cropEnableLimitWheelInputToCropSelection)),
        'cropEnableCenterImageSelection' in e && o(109, (Mt = e.cropEnableCenterImageSelection)),
        'cropEnableButtonRotateLeft' in e && o(110, (Ct = e.cropEnableButtonRotateLeft)),
        'cropEnableButtonRotateRight' in e && o(111, (Tt = e.cropEnableButtonRotateRight)),
        'cropEnableButtonFlipHorizontal' in e && o(112, (Pt = e.cropEnableButtonFlipHorizontal)),
        'cropEnableButtonFlipVertical' in e && o(113, (It = e.cropEnableButtonFlipVertical)),
        'cropSelectPresetOptions' in e && o(114, (Rt = e.cropSelectPresetOptions)),
        'cropEnableSelectPreset' in e && o(115, (At = e.cropEnableSelectPreset)),
        'cropEnableFilterMatchAspectRatio' in e &&
          o(116, (Et = e.cropEnableFilterMatchAspectRatio)),
        'cropSelectPresetFilter' in e && o(95, (Lt = e.cropSelectPresetFilter)),
        'cropEnableButtonToggleCropLimit' in e && o(117, (Ft = e.cropEnableButtonToggleCropLimit)),
        'cropWillRenderTools' in e && o(118, (zt = e.cropWillRenderTools)),
        'cropActiveTransformTool' in e && o(119, (Bt = e.cropActiveTransformTool)),
        'cropMinimizeToolbar' in e && o(120, (Dt = e.cropMinimizeToolbar)),
        'cropInteractionFocus' in e && o(121, (Ot = e.cropInteractionFocus)),
        'cropRotationRange' in e && o(3, (Wt = e.cropRotationRange)),
        'locale' in e && o(4, (Vt = e.locale))
    }),
    (e.$$.update = () => {
      ;(128 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[3]) && Nt.set('selection' === Ot && A),
        2097152 & e.$$.dirty[3] && o(123, (i = Rt && Array.isArray(Rt) && Rt.length)),
        1075838976 & e.$$.dirty[3] && Xt.set(i ? Rt : []),
        128 & e.$$.dirty[0] && A && fo.set(1),
        1024 & e.$$.dirty[4] && o(135, (p = 'overlay' === G.layoutMode)),
        (4194304 & e.$$.dirty[3]) | (2048 & e.$$.dirty[4]) && o(129, (v = At && !p)),
        147456 & e.$$.dirty[4] && o(146, (l = ce && Q && ct(ce, Q))),
        4210688 & e.$$.dirty[4] && o(147, (c = !(!Q || !l))),
        12599296 & e.$$.dirty[4] && o(131, (d = c && nt(Q, l, (e) => ee(e, 5)))),
        (528 & e.$$.dirty[0]) | (1126039556 & e.$$.dirty[3]) | (2047 & e.$$.dirty[4]) &&
          o(
            10,
            (n =
              D &&
              zt(
                [
                  Ct && [
                    'Button',
                    'rotate-left',
                    {
                      label: Vt.cropLabelButtonRotateLeft,
                      labelClass: 'PinturaToolbarContentWide',
                      icon: Vt.cropIconButtonRotateLeft,
                      onclick: () => {
                        eo(-Math.PI / 2), to.write()
                      },
                    },
                  ],
                  Tt && [
                    'Button',
                    'rotate-right',
                    {
                      label: Vt.cropLabelButtonRotateRight,
                      labelClass: 'PinturaToolbarContentWide',
                      icon: Vt.cropIconButtonRotateRight,
                      onclick: () => {
                        eo(Math.PI / 2), to.write()
                      },
                    },
                  ],
                  Pt && [
                    'Button',
                    'flip-horizontal',
                    {
                      label: Vt.cropLabelButtonFlipHorizontal,
                      labelClass: 'PinturaToolbarContentWide',
                      icon: Vt.cropIconButtonFlipHorizontal,
                      onclick: () => {
                        j(B) ? In(yo, (V = !V), V) : In($o, (N = !N), N), to.write()
                      },
                    },
                  ],
                  It && [
                    'Button',
                    'flip-vertical',
                    {
                      label: Vt.cropLabelButtonFlipVertical,
                      labelClass: 'PinturaToolbarContentWide',
                      icon: Vt.cropIconButtonFlipVertical,
                      onclick: () => {
                        j(B) ? In($o, (N = !N), N) : In(yo, (V = !V), V), to.write()
                      },
                    },
                  ],
                  v &&
                    i && [
                      !1 === Lt ? 'Dropdown' : hg,
                      'select-preset',
                      {
                        icon: Xc(Vt.cropIconSelectPreset, Vt, ni(H, L)),
                        label: Xc(Vt.cropLabelSelectPreset, Vt, ni(H, L)),
                        labelClass: 'PinturaToolbarContentWide',
                        options: L,
                        filter: Lt,
                        onfilterchange: qt,
                        selectedIndex: H,
                        onchange: ({ value: e }) => {
                          mo(e)
                            ? (In(Eo, (E = O(e[0], e[1])), E), In(vo, (U = Ie(e)), U))
                            : In(Eo, (E = e), E),
                            d && Qo(),
                            to.write()
                        },
                        optionMapper: (e) => {
                          let t = !1
                          const o = mo(e.value) ? e.value[0] / e.value[1] : e.value
                          if (o) {
                            const e = ma(z, B, o)
                            t = e.width < X.width || e.height < X.height
                          }
                          return (
                            (e.icon = ((e, t = {}) => {
                              const {
                                width: o = 24,
                                height: i = 24,
                                bounds: n = 16,
                                radius: r = 3,
                              } = t
                              let a,
                                s,
                                l,
                                c,
                                d = mo(e) ? O(e[0], e[1]) : e,
                                u = !!d
                              return (
                                (d = u ? d : 1),
                                (l = d > 1 ? n : d * n),
                                (c = l / d),
                                (a = Math.round(0.5 * (o - l))),
                                (s = Math.round(0.5 * (i - c))),
                                `<rect fill="${u ? 'currentColor' : 'none'}" stroke="${
                                  u ? 'none' : 'currentColor'
                                }" stroke-width="${o / 16}" stroke-dasharray="${[
                                  o / 12,
                                  o / 6,
                                ].join(
                                  ' '
                                )}" x="${a}" y="${s}" width="${l}" height="${c}" rx="${r}"/>`
                              )
                            })(e.value, {
                              bounds: 14,
                            })),
                            { ...e, disabled: t }
                          )
                        },
                      },
                    ],
                  Ft && [
                    'Dropdown',
                    'select-crop-limit',
                    {
                      icon: Xc(Vt.cropIconCropBoundary, Vt, Y),
                      label: Vt.cropLabelCropBoundary,
                      labelClass: 'PinturaToolbarContentWide',
                      onchange: ({ value: e }) => {
                        In(Lo, (Y = e), Y), to.write()
                      },
                      options: [
                        [
                          !0,
                          Vt.cropLabelCropBoundaryEdge,
                          {
                            icon: Xc(Vt.cropIconCropBoundary, Vt, !0),
                          },
                        ],
                        [
                          !1,
                          Vt.cropLabelCropBoundaryNone,
                          {
                            icon: Xc(Vt.cropIconCropBoundary, Vt, !1),
                          },
                        ],
                      ],
                    },
                  ],
                ].filter(Boolean),
                G,
                () => jt.set({})
              ).filter(Boolean))
          ),
        (1152 & e.$$.dirty[0]) | (134217728 & e.$$.dirty[3]) | (3072 & e.$$.dirty[4]) &&
          In(
            po,
            (q =
              A && ('always' === Dt || 'short' === G.verticalSpace || p)
                ? n.map(([e, t, o]) =>
                    Array.isArray(o) ? [e, t, o] : [e, t, { ...o, hideLabel: !0 }]
                  )
                : []),
            q
          ),
        512 & e.$$.dirty[4] && o(16, (r = Y ? 0 : -1)),
        393216 & e.$$.dirty[4] && o(143, (a = ce && ne(-(xe.x - ce.x), -(xe.y - ce.y)))),
        2621440 & e.$$.dirty[4] &&
          o(144, (s = we && ne(Ic(we.x + 0.5 * we.width + a.x), Ic(we.y + 0.5 * we.height + a.y)))),
        8192 & e.$$.dirty[4] && o(148, (u = null != J)),
        4325376 & e.$$.dirty[4] &&
          o(149, (h = ce && l && (l.height === ce.height || l.width === ce.width))),
        167804928 & e.$$.dirty[4] && o(150, (m = !h && te < 1 && Se < 1)),
        92274816 & e.$$.dirty[4] && o(11, (g = c && !u && (!d || m))),
        (256 & e.$$.dirty[0]) | (8192 & e.$$.dirty[3]) | (2048 & e.$$.dirty[4]) &&
          o(18, (f = wt && !!F && !p)),
        2621440 & e.$$.dirty[4] &&
          o(
            12,
            (b = we &&
              a && {
                x: we.x + a.x,
                y: we.y + a.y,
                width: we.width,
                height: we.height,
              })
          ),
        (4096 & e.$$.dirty[0]) | (4096 & e.$$.dirty[3]) | (2048 & e.$$.dirty[4]) &&
          o(19, ($ = vt && !!b && !p)),
        (65600 & e.$$.dirty[3]) | (1114112 & e.$$.dirty[4]) && o(13, (y = Mt && !!s && !lt && !ae)),
        (2048 & e.$$.dirty[0]) | (536870976 & e.$$.dirty[3]) | (4096 & e.$$.dirty[4]) &&
          g &&
          lt &&
          !K &&
          (clearTimeout(ei), o(122, (ei = setTimeout(Qo, lt)))),
        (536870912 & e.$$.dirty[3]) | (4096 & e.$$.dirty[4]) && K && clearTimeout(ei),
        (10240 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[4]) &&
          ti.set(y && g ? 1 : 0, {
            hard: !1 === ke,
          }),
        269484032 & e.$$.dirty[4] &&
          oi.set(s, {
            hard: !1 === ke,
          }),
        (128 & e.$$.dirty[0]) | (1610612736 & e.$$.dirty[4]) &&
          (A && !Me
            ? In(
                go,
                (Te.crop = {
                  maskOpacity: 0.85,
                  maskMarkupOpacity: 0.85,
                }),
                Te
              )
            : delete Te.crop),
        1 & e.$$.dirty[5] &&
          Ee &&
          (() => {
            const e = Re.filter((e) => !/^image\-selection\-guide/.test(e.id))
            In(Bo, (Re = A ? [...e, ...Ee] : e), Re)
          })(),
        1024 & e.$$.dirty[4] && o(156, (x = 'short' !== G.verticalSpace)),
        (134217728 & e.$$.dirty[3]) | (2048 & e.$$.dirty[4]) | (2 & e.$$.dirty[5]) &&
          o(20, (w = x && !p && 'always' !== Dt)),
        (4 & e.$$.dirty[0]) | (1024 & e.$$.dirty[3]) && o(157, (S = yt && bt)),
        (2048 & e.$$.dirty[3]) | (6 & e.$$.dirty[5]) && o(158, (k = xt ? x && S : S)),
        (512 & e.$$.dirty[3]) | (8 & e.$$.dirty[5]) && o(21, (M = $t || k)),
        8 & e.$$.dirty[5] && (k || o(5, (ci = li))),
        32 & e.$$.dirty[0] &&
          o(
            22,
            (C = {
              name: ai,
              selected: ci,
            })
          ),
        (16 & e.$$.dirty[0]) | (512 & e.$$.dirty[3]) | (8 & e.$$.dirty[5]) &&
          o(
            14,
            (P = [
              $t && {
                id: ai + '-rotation',
                label: Vt.cropLabelTabRotation,
              },
              k && {
                id: ai + '-zoom',
                label: Vt.cropLabelTabZoom,
              },
            ].filter(Boolean))
          ),
        16384 & e.$$.dirty[0] && o(23, (I = P.map((e) => e.id))),
        (64 & e.$$.dirty[0]) | (2048 & e.$$.dirty[4]) &&
          si &&
          !si.children.length &&
          p &&
          si.dispatchEvent(
            new CustomEvent('measure', {
              detail: si.rect,
            })
          ),
        (128 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[4]) && ke && ui.set(A ? 0 : 20),
        16 & e.$$.dirty[5] && o(24, (R = Oe ? `transform: translateY(${Oe}px)` : void 0))
    }),
    [
      et,
      at,
      yt,
      Wt,
      Vt,
      ci,
      si,
      A,
      F,
      B,
      n,
      g,
      b,
      y,
      P,
      di,
      r,
      be,
      f,
      $,
      w,
      M,
      C,
      I,
      R,
      We,
      Ve,
      _e,
      Ze,
      Ne,
      Ue,
      _t,
      Zt,
      jt,
      Nt,
      Ht,
      Xt,
      oo,
      io,
      ro,
      ao,
      so,
      lo,
      uo,
      ho,
      po,
      go,
      $o,
      yo,
      bo,
      xo,
      vo,
      wo,
      So,
      ko,
      Mo,
      Co,
      To,
      Po,
      Io,
      Ro,
      Ao,
      Eo,
      Lo,
      Fo,
      zo,
      Bo,
      Do,
      () => {
        ;(Ut = 'select'),
          In(io, (K = !0), K),
          In(So, (J = je(Q)), J),
          (Oo = te),
          (Wo = Le(Ce(X), Oo)),
          (Vo = Le(Ce(oe), Oo))
      },
      ({ detail: e }) => {
        const { boundsLimited: t, boundsIntent: o } = _o(e.direction, e.translation)
        In(ro, (ie = !0), ie), In(ko, (re = o), re), In(wo, (Q = t), Q)
      },
      ({ detail: e }) => {
        const { boundsLimited: t } = _o(e.direction, e.translation)
        In(ro, (ie = !1), ie),
          In(io, (K = !1), K),
          In(ko, (re = void 0), re),
          de(e.translation) && (In(wo, (Q = t), Q), to.write()),
          In(So, (J = void 0), J),
          (Ut = void 0)
      },
      () => {
        ;(Ut = 'rotate'), In(io, (K = !0), K), In(To, (he = je(F)), he)
      },
      (e) => {
        In(ro, (ie = !0), ie), In(bo, (B = e), B)
      },
      (e) => {
        In(ro, (ie = !1), ie),
          In(io, (K = !1), K),
          In(bo, (B = e), B),
          to.write(),
          In(To, (he = void 0), he)
      },
      () => {
        ;(Ut = 'pan'), (jo = void 0), In(io, (K = !0), K), (Zo = je(F))
      },
      ({ detail: e }) => {
        In(ro, (ie = !0), ie), No(e)
      },
      ({ detail: e }) => {
        In(ro, (ie = !1), ie),
          In(io, (K = !1), K),
          (de(e.translation) > 0 || 0 !== e.scalar) && (No(e), to.write()),
          In(Co, (me = void 0), me),
          (Zo = void 0)
      },
      ({ detail: { translation: e } }) => {
        ae && (e = le(se(e))), (jo = e), In(io, (K = !1), K)
      },
      Ho,
      Uo,
      Xo,
      () => {
        ;(Ut = 'zoom'), In(io, (K = !0), K), (Zo = je(F))
      },
      (e) => {
        In(ro, (ie = !1), ie), Yo(e)
      },
      (e) => {
        Yo(e), to.write(), In(ro, (ie = !1), ie), In(io, (K = !1), K), (Zo = void 0)
      },
      () => {
        ;(Ut = 'zoom'), Zo || ((Go = je(F)), In(io, (K = !0), K))
      },
      ({ detail: e }) => {
        Go && (In(ro, (ie = !0), ie), qo(e))
      },
      ({ detail: e }) => {
        Go &&
          (In(ro, (ie = !1), ie),
          In(io, (K = !1), K),
          qo(e),
          In(Co, (me = void 0), me),
          (Go = void 0),
          to.write())
      },
      (e) => {
        const t = Gm(e, be, xe)
        if (kt && !dt(Q, t)) return
        ;(Ut = 'zoom'),
          In(io, (K = !0), K),
          In(ro, (ie = !0), ie),
          e.preventDefault(),
          e.stopPropagation()
        const o = ac(e),
          i = 1 + o / 100,
          n = je(F),
          r = 1 === Math.min(F.width / X.width, F.height / X.height)
        if (mt && Y) {
          const e = Jt(F, z, B)
          if (Yt() && e && o > 0 && d) {
            In(io, (K = !1), K), In(ro, (ie = !1), ie)
            const e = j(B)
              ? He({
                  height: z.width,
                  width: z.height,
                })
              : He(z)
            if (nt(n, e)) return
            if ((clearTimeout(Ko), nt(to.state.crop, e))) return
            return In(Po, (F = e), F), void to.write()
          }
        }
        let a = Ke(F)
        if (St && 'selection' !== Ot && o < 0 && !r) {
          const e = fe(se(t), Q),
            o = Math.min(Q.width / F.width, Q.height / F.height),
            i = Qe(je(Q), 1.1)
          a = dt(i, t) ? ge(je(F), $e(e, 1 / o)) : a
        }
        let s = Qe(je(F), i, a)
        if (
          (Be(ve[1], s) || (s = Ge(Ke(s), ve[1])),
          Be(s, ve[0]) || (s = Ge(Ke(s), ve[0])),
          nt(n, s, ee))
        )
          return In(io, (K = !1), K), void In(ro, (ie = !1), ie)
        In(Po, (F = gt(s, (e) => ee(e, 5))), F),
          In(io, (K = !1), K),
          In(ro, (ie = !1), ie),
          clearTimeout(Ko),
          (Ko = setTimeout(() => {
            to.write()
          }, 500))
      },
      Qo,
      ti,
      oi,
      ii,
      ri,
      ai,
      ui,
      Lt,
      'crop',
      tt,
      st,
      lt,
      mt,
      ft,
      $t,
      bt,
      xt,
      vt,
      wt,
      St,
      kt,
      Mt,
      Ct,
      Tt,
      Pt,
      It,
      Rt,
      At,
      Et,
      Ft,
      zt,
      Bt,
      Dt,
      Ot,
      ei,
      i,
      L,
      z,
      D,
      V,
      N,
      v,
      H,
      d,
      X,
      Y,
      G,
      p,
      K,
      J,
      Q,
      te,
      ae,
      ce,
      xe,
      a,
      s,
      we,
      l,
      c,
      u,
      h,
      m,
      Se,
      ke,
      Me,
      Te,
      Ee,
      x,
      S,
      k,
      Oe,
      function (t) {
        pr(e, t)
      },
      ({ detail: e }) => o(5, (ci = e)),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(si = e), o(6, si)
        })
      },
      (e) => Ym(e),
      function (e) {
        ;(di = e), o(15, di)
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var Fg = {
  util: [
    'crop',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            Lg,
            Ig,
            xn,
            {
              name: 96,
              isActive: 0,
              stores: 97,
              cropImageSelectionCornerStyle: 1,
              cropWillRenderImageSelectionGuides: 98,
              cropAutoCenterImageSelectionTimeout: 99,
              cropEnableZoomMatchImageAspectRatio: 100,
              cropEnableRotateMatchImageAspectRatio: 101,
              cropEnableRotationInput: 102,
              cropEnableZoom: 2,
              cropEnableZoomInput: 103,
              cropEnableZoomAutoHide: 104,
              cropEnableImageSelection: 105,
              cropEnableInfoIndicator: 106,
              cropEnableZoomTowardsWheelPosition: 107,
              cropEnableLimitWheelInputToCropSelection: 108,
              cropEnableCenterImageSelection: 109,
              cropEnableButtonRotateLeft: 110,
              cropEnableButtonRotateRight: 111,
              cropEnableButtonFlipHorizontal: 112,
              cropEnableButtonFlipVertical: 113,
              cropSelectPresetOptions: 114,
              cropEnableSelectPreset: 115,
              cropEnableFilterMatchAspectRatio: 116,
              cropSelectPresetFilter: 95,
              cropEnableButtonToggleCropLimit: 117,
              cropWillRenderTools: 118,
              cropActiveTransformTool: 119,
              cropMinimizeToolbar: 120,
              cropInteractionFocus: 121,
              cropRotationRange: 3,
              locale: 4,
            },
            [-1, -1, -1, -1, -1, -1, -1]
          )
      }
      get name() {
        return this.$$.ctx[96]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[97]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get cropImageSelectionCornerStyle() {
        return this.$$.ctx[1]
      }
      set cropImageSelectionCornerStyle(e) {
        this.$set({
          cropImageSelectionCornerStyle: e,
        }),
          Cr()
      }
      get cropWillRenderImageSelectionGuides() {
        return this.$$.ctx[98]
      }
      set cropWillRenderImageSelectionGuides(e) {
        this.$set({
          cropWillRenderImageSelectionGuides: e,
        }),
          Cr()
      }
      get cropAutoCenterImageSelectionTimeout() {
        return this.$$.ctx[99]
      }
      set cropAutoCenterImageSelectionTimeout(e) {
        this.$set({
          cropAutoCenterImageSelectionTimeout: e,
        }),
          Cr()
      }
      get cropEnableZoomMatchImageAspectRatio() {
        return this.$$.ctx[100]
      }
      set cropEnableZoomMatchImageAspectRatio(e) {
        this.$set({
          cropEnableZoomMatchImageAspectRatio: e,
        }),
          Cr()
      }
      get cropEnableRotateMatchImageAspectRatio() {
        return this.$$.ctx[101]
      }
      set cropEnableRotateMatchImageAspectRatio(e) {
        this.$set({
          cropEnableRotateMatchImageAspectRatio: e,
        }),
          Cr()
      }
      get cropEnableRotationInput() {
        return this.$$.ctx[102]
      }
      set cropEnableRotationInput(e) {
        this.$set({
          cropEnableRotationInput: e,
        }),
          Cr()
      }
      get cropEnableZoom() {
        return this.$$.ctx[2]
      }
      set cropEnableZoom(e) {
        this.$set({
          cropEnableZoom: e,
        }),
          Cr()
      }
      get cropEnableZoomInput() {
        return this.$$.ctx[103]
      }
      set cropEnableZoomInput(e) {
        this.$set({
          cropEnableZoomInput: e,
        }),
          Cr()
      }
      get cropEnableZoomAutoHide() {
        return this.$$.ctx[104]
      }
      set cropEnableZoomAutoHide(e) {
        this.$set({
          cropEnableZoomAutoHide: e,
        }),
          Cr()
      }
      get cropEnableImageSelection() {
        return this.$$.ctx[105]
      }
      set cropEnableImageSelection(e) {
        this.$set({
          cropEnableImageSelection: e,
        }),
          Cr()
      }
      get cropEnableInfoIndicator() {
        return this.$$.ctx[106]
      }
      set cropEnableInfoIndicator(e) {
        this.$set({
          cropEnableInfoIndicator: e,
        }),
          Cr()
      }
      get cropEnableZoomTowardsWheelPosition() {
        return this.$$.ctx[107]
      }
      set cropEnableZoomTowardsWheelPosition(e) {
        this.$set({
          cropEnableZoomTowardsWheelPosition: e,
        }),
          Cr()
      }
      get cropEnableLimitWheelInputToCropSelection() {
        return this.$$.ctx[108]
      }
      set cropEnableLimitWheelInputToCropSelection(e) {
        this.$set({
          cropEnableLimitWheelInputToCropSelection: e,
        }),
          Cr()
      }
      get cropEnableCenterImageSelection() {
        return this.$$.ctx[109]
      }
      set cropEnableCenterImageSelection(e) {
        this.$set({
          cropEnableCenterImageSelection: e,
        }),
          Cr()
      }
      get cropEnableButtonRotateLeft() {
        return this.$$.ctx[110]
      }
      set cropEnableButtonRotateLeft(e) {
        this.$set({
          cropEnableButtonRotateLeft: e,
        }),
          Cr()
      }
      get cropEnableButtonRotateRight() {
        return this.$$.ctx[111]
      }
      set cropEnableButtonRotateRight(e) {
        this.$set({
          cropEnableButtonRotateRight: e,
        }),
          Cr()
      }
      get cropEnableButtonFlipHorizontal() {
        return this.$$.ctx[112]
      }
      set cropEnableButtonFlipHorizontal(e) {
        this.$set({
          cropEnableButtonFlipHorizontal: e,
        }),
          Cr()
      }
      get cropEnableButtonFlipVertical() {
        return this.$$.ctx[113]
      }
      set cropEnableButtonFlipVertical(e) {
        this.$set({
          cropEnableButtonFlipVertical: e,
        }),
          Cr()
      }
      get cropSelectPresetOptions() {
        return this.$$.ctx[114]
      }
      set cropSelectPresetOptions(e) {
        this.$set({
          cropSelectPresetOptions: e,
        }),
          Cr()
      }
      get cropEnableSelectPreset() {
        return this.$$.ctx[115]
      }
      set cropEnableSelectPreset(e) {
        this.$set({
          cropEnableSelectPreset: e,
        }),
          Cr()
      }
      get cropEnableFilterMatchAspectRatio() {
        return this.$$.ctx[116]
      }
      set cropEnableFilterMatchAspectRatio(e) {
        this.$set({
          cropEnableFilterMatchAspectRatio: e,
        }),
          Cr()
      }
      get cropSelectPresetFilter() {
        return this.$$.ctx[95]
      }
      set cropSelectPresetFilter(e) {
        this.$set({
          cropSelectPresetFilter: e,
        }),
          Cr()
      }
      get cropEnableButtonToggleCropLimit() {
        return this.$$.ctx[117]
      }
      set cropEnableButtonToggleCropLimit(e) {
        this.$set({
          cropEnableButtonToggleCropLimit: e,
        }),
          Cr()
      }
      get cropWillRenderTools() {
        return this.$$.ctx[118]
      }
      set cropWillRenderTools(e) {
        this.$set({
          cropWillRenderTools: e,
        }),
          Cr()
      }
      get cropActiveTransformTool() {
        return this.$$.ctx[119]
      }
      set cropActiveTransformTool(e) {
        this.$set({
          cropActiveTransformTool: e,
        }),
          Cr()
      }
      get cropMinimizeToolbar() {
        return this.$$.ctx[120]
      }
      set cropMinimizeToolbar(e) {
        this.$set({
          cropMinimizeToolbar: e,
        }),
          Cr()
      }
      get cropInteractionFocus() {
        return this.$$.ctx[121]
      }
      set cropInteractionFocus(e) {
        this.$set({
          cropInteractionFocus: e,
        }),
          Cr()
      }
      get cropRotationRange() {
        return this.$$.ctx[3]
      }
      set cropRotationRange(e) {
        this.$set({
          cropRotationRange: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[4]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
    },
  ],
}

function zg(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l = e[69],
    c = (S(e[69].label) ? e[69].label(e[2]) : e[69].label) + ''

  function d(...t) {
    return e[49](e[69], ...t)
  }
  const u = () => e[50](o, l),
    h = () => e[50](null, l)
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('div')),
        (i = jn()),
        (n = Vn('span')),
        (r = Zn(c)),
        Yn(o, 'class', Wg),
        Yn(t, 'slot', 'option'),
        Yn(t, 'class', 'PinturaFilterOption')
    },
    m(e, l) {
      On(e, t, l),
        Dn(t, o),
        u(),
        Dn(t, i),
        Dn(t, n),
        Dn(n, r),
        a || ((s = [Hn(o, 'measure', d), Rn(Rs.call(null, o))]), (a = !0))
    },
    p(t, o) {
      l !== (e = t)[69] && (h(), (l = e[69]), u()),
        (4 & o[0]) | (128 & o[2]) &&
          c !== (c = (S(e[69].label) ? e[69].label(e[2]) : e[69].label) + '') &&
          qn(r, c)
    },
    d(e) {
      e && Wn(t), h(), (a = !1), yn(s)
    },
  }
}

function Bg(e) {
  let t, o
  return (
    (t = new vd({
      props: {
        locale: e[2],
        layout: 'row',
        options: e[3],
        selectedIndex: e[10],
        onchange: e[30],
        $$slots: {
          option: [
            zg,
            ({ option: e }) => ({
              69: e,
            }),
            ({ option: e }) => [0, 0, e ? 128 : 0],
          ],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        4 & o[0] && (i.locale = e[2]),
          8 & o[0] && (i.options = e[3]),
          1024 & o[0] && (i.selectedIndex = e[10]),
          (516 & o[0]) | (384 & o[2]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Dg(e) {
  let t, o, i, n, r, a, s, l

  function c(t) {
    e[52](t)
  }

  function d(t) {
    e[53](t)
  }

  function u(t) {
    e[54](t)
  }
  let h = {
    elasticity: e[12] * e[17],
    onscroll: e[51],
    $$slots: {
      default: [Bg],
    },
    $$scope: {
      ctx: e,
    },
  }
  return (
    void 0 !== e[4] && (h.maskFeatherStartOpacity = e[4]),
    void 0 !== e[5] && (h.maskFeatherEndOpacity = e[5]),
    void 0 !== e[6] && (h.maskFeatherSize = e[6]),
    (o = new dc({
      props: h,
    })),
    gr.push(() => Nr(o, 'maskFeatherStartOpacity', c)),
    gr.push(() => Nr(o, 'maskFeatherEndOpacity', d)),
    gr.push(() => Nr(o, 'maskFeatherSize', u)),
    o.$on('measure', e[55]),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'slot', 'footer'), Yn(t, 'style', e[11])
      },
      m(i, n) {
        On(i, t, n), Ur(o, t, null), (a = !0), s || ((l = Hn(t, 'transitionend', e[28])), (s = !0))
      },
      p(e, s) {
        const l = {}
        4096 & s[0] && (l.elasticity = e[12] * e[17]),
          128 & s[0] && (l.onscroll = e[51]),
          (1548 & s[0]) | (256 & s[2]) &&
            (l.$$scope = {
              dirty: s,
              ctx: e,
            }),
          !i && 16 & s[0] && ((i = !0), (l.maskFeatherStartOpacity = e[4]), Sr(() => (i = !1))),
          !n && 32 & s[0] && ((n = !0), (l.maskFeatherEndOpacity = e[5]), Sr(() => (n = !1))),
          !r && 64 & s[0] && ((r = !0), (l.maskFeatherSize = e[6]), Sr(() => (r = !1))),
          o.$set(l),
          (!a || 2048 & s[0]) && Yn(t, 'style', e[11])
      },
      i(e) {
        a || (Fr(o.$$.fragment, e), (a = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (a = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), (s = !1), l()
      },
    }
  )
}

function Og(e) {
  let t, o
  return (
    (t = new Lm({
      props: {
        $$slots: {
          footer: [Dg],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    t.$on('measure', e[56]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(8188 & o[0]) | (256 & o[2]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}
let Wg = 'PinturaFilterPreview'

function Vg(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    v,
    w = pn,
    k = () => (w(), (w = vn(T, (e) => o(41, (u = e)))), T),
    M = pn,
    C = () => (M(), (M = vn(P, (e) => o(46, (y = e)))), P)
  e.$$.on_destroy.push(() => w()), e.$$.on_destroy.push(() => M())
  let { isActive: T } = t
  k()
  let { isActiveFraction: P } = t
  C()
  let { stores: I } = t,
    { locale: R } = t,
    { filterFunctions: A } = t,
    { filterOptions: E } = t
  const L = hr('elasticityMultiplier')
  Sn(e, L, (e) => o(12, (v = e)))
  const {
    history: F,
    interfaceImages: z,
    stageRect: B,
    utilRect: D,
    animation: O,
    scrollElasticity: W,
    imageSize: V,
    imagePreview: _,
    imageCropRect: Z,
    imageRotation: j,
    imageFlipX: N,
    imageFlipY: H,
    imageBackgroundColor: U,
    imageGamma: X,
    imageColorMatrix: Y,
  } = I
  Sn(e, B, (e) => o(43, (p = e))),
    Sn(e, D, (e) => o(42, (h = e))),
    Sn(e, O, (e) => o(40, (d = e))),
    Sn(e, V, (e) => o(58, (f = e))),
    Sn(e, _, (e) => o(45, (g = e))),
    Sn(e, U, (e) => o(59, ($ = e))),
    Sn(e, X, (e) => o(44, (m = e))),
    Sn(e, Y, (e) => o(37, (a = e)))
  const G = Jr({})
  Sn(e, G, (e) => o(38, (s = e)))
  const q = (e, t) => In(G, (s[e.value] = t), s),
    K = Qr(G, (e) => {
      if (!e[void 0]) return
      const t = e[void 0]
      return l && Ee(l, t) ? l : Ce(t)
    })
  Sn(e, K, (e) => o(57, (l = e)))
  const J = Qr([T, K, Z, V, j, N, H], ([e, t, o, i, n, r, a], s) => {
    if (!e || !t || !i) return c
    const l = He(i),
      d = Ke(l),
      u = fa(i, o, n),
      h = Ke(u),
      p = fe(se(d), h),
      m = le(se(p)),
      g = Math.max(t.width / o.width, t.height / o.height)
    s({
      origin: m,
      translation: p,
      rotation: {
        x: a ? Math.PI : 0,
        y: r ? Math.PI : 0,
        z: n,
      },
      scale: g,
    })
  })
  Sn(e, J, (e) => o(39, (c = e)))
  const Q = ys(d ? 20 : 0)
  let ee
  Sn(e, Q, (e) => o(47, (b = e)))
  const te = {}
  let oe,
    ie,
    re,
    ae,
    ce,
    de = {
      x: 0,
      y: 0,
    }
  const ue = Jr([])
  Sn(e, ue, (e) => o(48, (x = e)))
  const he = (e) => {
    const t = {
      ...e,
      data: g,
      size: f,
      offset: { ...e.offset },
      mask: { ...e.mask },
      backgroundColor: $,
    }
    return (t.opacity = y), (t.offset.y += b), (t.mask.y += b), t
  }
  cr(() => {
    z.set([])
  })
  return (
    (e.$$set = (e) => {
      'isActive' in e && k(o(0, (T = e.isActive))),
        'isActiveFraction' in e && C(o(1, (P = e.isActiveFraction))),
        'stores' in e && o(32, (I = e.stores)),
        'locale' in e && o(2, (R = e.locale)),
        'filterFunctions' in e && o(33, (A = e.filterFunctions)),
        'filterOptions' in e && o(3, (E = e.filterOptions))
    }),
    (e.$$.update = () => {
      if (
        (8 & e.$$.dirty[0] && o(36, (i = Hc(E))),
        96 & e.$$.dirty[1] &&
          o(
            10,
            (n = ((e, t) => {
              if (!e || !e.filter || !t) return 0
              const o = e.filter
              return t.findIndex(([e]) => {
                if (!A[e]) return !1
                const t = A[e]()
                return va(t, o)
              })
            })(a, i))
          ),
        1536 & e.$$.dirty[1] && d && Q.set(u ? 0 : 20),
        7168 & e.$$.dirty[1] && u && h && p)
      ) {
        const e = p.y + p.height + h.y
        o(
          35,
          (ce = {
            x: p.x - h.x,
            y: e,
          })
        )
      }
      if ((496 & e.$$.dirty[0]) | (8700 & e.$$.dirty[1]) && c && ce && de && ae && ee) {
        const e = ce.x + ae.x + de.x,
          t = ce.y,
          o = ae.x + ce.x,
          n = o + ae.width
        ue.set(
          i
            .map(([i], r) => {
              const l = s[i],
                d = de.x + l.x,
                u = d + l.width
              if (u < 0 || d > ae.width) return !1
              const h = e + l.x,
                p = t + l.y,
                g = ((e) => ({
                  origin: se(e.origin),
                  translation: se(e.translation),
                  rotation: { ...e.rotation },
                  scale: e.scale,
                }))(c)
              g.offset = ne(0.5 * l.width + h, 0.5 * l.height + p)
              ;(g.maskOpacity = 1),
                (g.mask = qe(h + 0, p, l.width + 0, l.height)),
                (g.maskFeather = [1, 0, 1, 0, 1, n, 1, n]),
                d < re &&
                  oe < 1 &&
                  ((g.maskFeather[0] = oe),
                  (g.maskFeather[1] = o),
                  (g.maskFeather[2] = 1),
                  (g.maskFeather[3] = o + re)),
                u > ae.width - re &&
                  ie < 1 &&
                  ((g.maskFeather[4] = ie),
                  (g.maskFeather[5] = n - re),
                  (g.maskFeather[6] = 1),
                  (g.maskFeather[7] = n)),
                (g.maskCornerRadius = ee[i])
              let f =
                (a &&
                  Object.keys(a)
                    .filter((e) => 'filter' != e)
                    .map((e) => a[e])) ||
                []
              return (
                S(A[i]) && f.push(A[i]()),
                (g.colorMatrix = f.length ? un(f) : void 0),
                (g.gamma = m),
                g
              )
            })
            .filter(Boolean)
        )
      }
      245760 & e.$$.dirty[1] && (y > 0 && x ? z.set(x.map(he)) : z.set([])),
        65536 & e.$$.dirty[1] && o(11, (r = b ? `transform: translateY(${b}px)` : void 0))
    }),
    [
      T,
      P,
      R,
      E,
      oe,
      ie,
      re,
      de,
      ae,
      te,
      n,
      r,
      v,
      L,
      B,
      D,
      O,
      W,
      V,
      _,
      U,
      X,
      Y,
      G,
      q,
      K,
      J,
      Q,
      (e) => {
        e.target.className === Wg &&
          o(
            34,
            (ee = Object.keys(te).reduce((e, t) => {
              const o = te[t],
                i = getComputedStyle(o),
                n = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                  .map((e) => i.getPropertyValue(`border-${e}-radius`))
                  .map(rc)
                  .map((e) => 1.25 * e)
              return (e[t] = n), e
            }, {}))
          )
      },
      ue,
      ({ value: e }) => {
        In(Y, (a = { ...a, filter: S(A[e]) ? A[e]() : void 0 }), a), F.write()
      },
      'filter',
      I,
      A,
      ee,
      ce,
      i,
      a,
      s,
      c,
      d,
      u,
      h,
      p,
      m,
      g,
      y,
      b,
      x,
      (e, t) => q(e, t.detail),
      function (e, t) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(te[t.value] = e), o(9, te)
        })
      },
      (e) => o(7, (de = e)),
      function (e) {
        ;(oe = e), o(4, oe)
      },
      function (e) {
        ;(ie = e), o(5, ie)
      },
      function (e) {
        ;(re = e), o(6, re)
      },
      (e) => o(8, (ae = e.detail)),
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var _g = {
  util: [
    'filter',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            Vg,
            Og,
            xn,
            {
              name: 31,
              isActive: 0,
              isActiveFraction: 1,
              stores: 32,
              locale: 2,
              filterFunctions: 33,
              filterOptions: 3,
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
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(e) {
        this.$set({
          isActiveFraction: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[32]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[2]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get filterFunctions() {
        return this.$$.ctx[33]
      }
      set filterFunctions(e) {
        this.$set({
          filterFunctions: e,
        }),
          Cr()
      }
      get filterOptions() {
        return this.$$.ctx[3]
      }
      set filterOptions(e) {
        this.$set({
          filterOptions: e,
        }),
          Cr()
      }
    },
  ],
}

function Zg(e) {
  let t,
    o,
    i = e[38].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      128 & t[1] && i !== (i = e[38].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function jg(e) {
  let t, o
  const i = [
    {
      class: 'PinturaControlList',
    },
    {
      tabs: e[1],
    },
    e[3],
  ]
  let n = {
    $$slots: {
      default: [
        Zg,
        ({ tab: e }) => ({
          38: e,
        }),
        ({ tab: e }) => [0, e ? 128 : 0],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Tl({
      props: n,
    })),
    t.$on('select', e[23]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n =
          10 & o[0]
            ? Zr(i, [
                i[0],
                2 & o[0] && {
                  tabs: e[1],
                },
                8 & o[0] && jr(e[3]),
              ])
            : {}
        384 & o[1] &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Ng(e) {
  let t, o
  const i = [e[5][e[37]]]
  let n = {}
  for (let e = 0; e < i.length; e += 1) n = gn(n, i[e])
  return (
    (t = new Dm({
      props: n,
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const n = (32 & o[0]) | (64 & o[1]) ? Zr(i, [jr(e[5][e[37]])]) : {}
        t.$set(n)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Hg(e) {
  let t, o, i, n, r
  o = new dc({
    props: {
      elasticity: e[6] * e[9],
      class: 'PinturaControlListScroller',
      $$slots: {
        default: [jg],
      },
      $$scope: {
        ctx: e,
      },
    },
  })
  const a = [
    {
      class: 'PinturaControlPanels',
    },
    {
      panelClass: 'PinturaControlPanel',
    },
    {
      panels: e[4],
    },
    e[3],
  ]
  let s = {
    $$slots: {
      default: [
        Ng,
        ({ panel: e }) => ({
          37: e,
        }),
        ({ panel: e }) => [0, e ? 64 : 0],
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < a.length; e += 1) s = gn(s, a[e])
  return (
    (n = new Wl({
      props: s,
    })),
    {
      c() {
        ;(t = Vn('div')),
          Hr(o.$$.fragment),
          (i = jn()),
          Hr(n.$$.fragment),
          Yn(t, 'slot', 'footer'),
          Yn(t, 'style', e[7])
      },
      m(e, a) {
        On(e, t, a), Ur(o, t, null), Dn(t, i), Ur(n, t, null), (r = !0)
      },
      p(e, i) {
        const s = {}
        64 & i[0] && (s.elasticity = e[6] * e[9]),
          (14 & i[0]) | (256 & i[1]) &&
            (s.$$scope = {
              dirty: i,
              ctx: e,
            }),
          o.$set(s)
        const l =
          24 & i[0]
            ? Zr(a, [
                a[0],
                a[1],
                16 & i[0] && {
                  panels: e[4],
                },
                8 & i[0] && jr(e[3]),
              ])
            : {}
        ;(32 & i[0]) | (320 & i[1]) &&
          (l.$$scope = {
            dirty: i,
            ctx: e,
          }),
          n.$set(l),
          (!r || 128 & i[0]) && Yn(t, 'style', e[7])
      },
      i(e) {
        r || (Fr(o.$$.fragment, e), Fr(n.$$.fragment, e), (r = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), zr(n.$$.fragment, e), (r = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), Xr(n)
      },
    }
  )
}

function Ug(e) {
  let t, o
  return (
    (t = new Lm({
      props: {
        $$slots: {
          footer: [Hg],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    t.$on('measure', e[24]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(254 & o[0]) | (256 & o[1]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Xg(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m = pn,
    g = () => (m(), (m = vn($, (e) => o(21, (h = e)))), $)
  e.$$.on_destroy.push(() => m())
  let { stores: f } = t,
    { isActive: $ } = t
  g()
  let { locale: y = {} } = t,
    { finetuneControlConfiguration: b } = t,
    { finetuneOptions: x } = t
  const {
    history: v,
    animation: w,
    scrollElasticity: k,
    rangeInputElasticity: M,
    imageColorMatrix: C,
    imageConvolutionMatrix: P,
    imageGamma: I,
    imageVignette: R,
    imageNoise: A,
  } = f
  Sn(e, w, (e) => o(20, (u = e)))
  const E = {
      imageColorMatrix: C,
      imageConvolutionMatrix: P,
      imageGamma: I,
      imageVignette: R,
      imageNoise: A,
    },
    L = hr('elasticityMultiplier')
  Sn(e, L, (e) => o(6, (d = e)))
  const F = 'finetune-' + T(),
    z = Jr({})
  Sn(e, z, (e) => o(19, (c = e)))
  const B = Jr({})
  Sn(e, B, (e) => o(5, (l = e)))
  let D = []
  const O = ys(u ? 20 : 0)
  Sn(e, O, (e) => o(22, (p = e)))
  return (
    (e.$$set = (e) => {
      'stores' in e && o(15, (f = e.stores)),
        'isActive' in e && g(o(0, ($ = e.isActive))),
        'locale' in e && o(16, (y = e.locale)),
        'finetuneControlConfiguration' in e && o(17, (b = e.finetuneControlConfiguration)),
        'finetuneOptions' in e && o(18, (x = e.finetuneOptions))
    }),
    (e.$$.update = () => {
      var t
      327680 & e.$$.dirty[0] &&
        o(
          1,
          (i = x
            ? x.map(([e, t]) => ({
                id: e,
                label: S(t) ? t(y) : t,
              }))
            : [])
        ),
        2 & e.$$.dirty[0] && o(2, (n = i.length && i[0].id)),
        4 & e.$$.dirty[0] &&
          o(
            3,
            (r = {
              name: F,
              selected: n,
            })
          ),
        2 & e.$$.dirty[0] && o(4, (a = i.map((e) => e.id))),
        131072 & e.$$.dirty[0] &&
          b &&
          ((t = b),
          D && D.forEach((e) => e()),
          (D = a.map((e) => {
            const { getStore: o, getValue: i = W } = t[e]
            return o(E).subscribe((t) => {
              const o = null != t ? i(t) : t
              In(z, (c = { ...c, [e]: o }), c)
            })
          }))),
        655360 & e.$$.dirty[0] &&
          b &&
          c &&
          In(
            B,
            (l = Object.keys(c).reduce((e, t) => {
              const {
                  base: o,
                  min: i,
                  max: n,
                  getLabel: r,
                  getStore: a,
                  setValue: s = (e, t) => e.set(t),
                } = b[t],
                l = a(E),
                u = null != c[t] ? c[t] : o
              return (
                (e[t] = {
                  base: o,
                  min: i,
                  max: n,
                  value: u,
                  valueLabel: r ? r(u, i, n, n - i) : Math.round(100 * u),
                  oninputmove: (e) => {
                    s(l, e)
                  },
                  oninputend: (e) => {
                    s(l, e), v.write()
                  },
                  elasticity: d * M,
                  labelReset: y.labelReset,
                }),
                e
              )
            }, {})),
            l
          ),
        3145728 & e.$$.dirty[0] && u && O.set(h ? 0 : 20),
        4194304 & e.$$.dirty[0] && o(7, (s = p ? `transform: translateY(${p}px)` : void 0))
    }),
    [
      $,
      i,
      n,
      r,
      a,
      l,
      d,
      s,
      w,
      k,
      L,
      z,
      B,
      O,
      'finetune',
      f,
      y,
      b,
      x,
      c,
      u,
      h,
      p,
      ({ detail: e }) => o(2, (n = e)),
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var Yg = {
  util: [
    'finetune',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            Xg,
            Ug,
            xn,
            {
              name: 14,
              stores: 15,
              isActive: 0,
              locale: 16,
              finetuneControlConfiguration: 17,
              finetuneOptions: 18,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[14]
      }
      get stores() {
        return this.$$.ctx[15]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[16]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get finetuneControlConfiguration() {
        return this.$$.ctx[17]
      }
      set finetuneControlConfiguration(e) {
        this.$set({
          finetuneControlConfiguration: e,
        }),
          Cr()
      }
      get finetuneOptions() {
        return this.$$.ctx[18]
      }
      set finetuneOptions(e) {
        this.$set({
          finetuneOptions: e,
        }),
          Cr()
      }
    },
  ],
}

function Gg(e, t, o) {
  const i = e.slice()
  return (
    (i[49] = t[o].key),
    (i[50] = t[o].index),
    (i[51] = t[o].translate),
    (i[52] = t[o].scale),
    (i[15] = t[o].rotate),
    (i[53] = t[o].dir),
    (i[54] = t[o].center),
    (i[55] = t[o].type),
    i
  )
}

function qg(e) {
  let t, o
  return {
    c() {
      ;(t = Vn('div')),
        Yn(t, 'class', 'PinturaShapeManipulator'),
        Yn(t, 'data-control', 'point'),
        Yn(
          t,
          'style',
          (o = `pointer-events:none;transform: translate3d(${e[54].x}px, ${e[54].y}px, 0) scale(${e[5]}, ${e[5]}); opacity: ${e[6]}`)
        )
    },
    m(e, o) {
      On(e, t, o)
    },
    p(e, i) {
      104 & i[0] &&
        o !==
          (o = `pointer-events:none;transform: translate3d(${e[54].x}px, ${e[54].y}px, 0) scale(${e[5]}, ${e[5]}); opacity: ${e[6]}`) &&
        Yn(t, 'style', o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function Kg(e, t) {
  let o, i, n, r, a, s, l, c, d

  function u(...e) {
    return t[20](t[50], ...e)
  }
  let h = 'edge' === t[55] && 'both' !== t[2] && qg(t)
  return {
    key: e,
    first: null,
    c() {
      ;(o = Vn('div')),
        (s = jn()),
        h && h.c(),
        (l = Nn()),
        Yn(o, 'role', 'button'),
        Yn(o, 'aria-label', (i = `Drag ${t[55]} ${t[49]}`)),
        Yn(o, 'tabindex', (n = 'edge' === t[55] ? -1 : 0)),
        Yn(o, 'class', 'PinturaShapeManipulator'),
        Yn(o, 'data-control', (r = t[55])),
        Yn(
          o,
          'style',
          (a = `cursor: ${t[53] ? t[53] + '-resize' : 'move'}; transform: translate3d(${
            t[51].x
          }px, ${t[51].y}px, 0)${'edge' === t[55] ? ` rotate(${t[15]}rad)` : ''} scale(${
            'point' === t[55] ? t[5] : t[52].x
          }, ${'point' === t[55] ? t[5] : t[52].y}); opacity: ${t[6]}`)
        ),
        (this.first = o)
    },
    m(e, i) {
      On(e, o, i),
        On(e, s, i),
        h && h.m(e, i),
        On(e, l, i),
        c ||
          ((d = [
            Hn(o, 'keydown', t[8]),
            Hn(o, 'keyup', t[9]),
            Hn(o, 'nudge', u),
            Rn(oc.call(null, o)),
            Hn(o, 'interactionstart', function () {
              bn(t[12]('start', t[50])) && t[12]('start', t[50]).apply(this, arguments)
            }),
            Hn(o, 'interactionupdate', function () {
              bn(t[12]('move', t[50])) && t[12]('move', t[50]).apply(this, arguments)
            }),
            Hn(o, 'interactionend', function () {
              bn(t[12]('end', t[50])) && t[12]('end', t[50]).apply(this, arguments)
            }),
            Rn(tc.call(null, o)),
          ]),
          (c = !0))
    },
    p(e, s) {
      ;(t = e),
        8 & s[0] && i !== (i = `Drag ${t[55]} ${t[49]}`) && Yn(o, 'aria-label', i),
        8 & s[0] && n !== (n = 'edge' === t[55] ? -1 : 0) && Yn(o, 'tabindex', n),
        8 & s[0] && r !== (r = t[55]) && Yn(o, 'data-control', r),
        104 & s[0] &&
          a !==
            (a = `cursor: ${t[53] ? t[53] + '-resize' : 'move'}; transform: translate3d(${
              t[51].x
            }px, ${t[51].y}px, 0)${'edge' === t[55] ? ` rotate(${t[15]}rad)` : ''} scale(${
              'point' === t[55] ? t[5] : t[52].x
            }, ${'point' === t[55] ? t[5] : t[52].y}); opacity: ${t[6]}`) &&
          Yn(o, 'style', a),
        'edge' === t[55] && 'both' !== t[2]
          ? h
            ? h.p(t, s)
            : ((h = qg(t)), h.c(), h.m(l.parentNode, l))
          : h && (h.d(1), (h = null))
    },
    d(e) {
      e && Wn(o), e && Wn(s), h && h.d(e), e && Wn(l), (c = !1), yn(d)
    },
  }
}

function Jg(e) {
  let t, o, i, n
  return {
    c() {
      ;(t = Vn('div')),
        Yn(t, 'role', 'button'),
        Yn(t, 'aria-label', 'Drag rotator'),
        Yn(t, 'tabindex', '0'),
        Yn(t, 'class', 'PinturaShapeManipulator'),
        Yn(t, 'data-control', 'rotate'),
        Yn(
          t,
          'style',
          (o = `transform: translate3d(${e[0].x}px, ${e[0].y}px, 0) scale(${e[5]}, ${e[5]}); opacity: ${e[6]}`)
        )
    },
    m(o, r) {
      On(o, t, r),
        i ||
          ((n = [
            Hn(t, 'keydown', e[8]),
            Hn(t, 'keyup', e[9]),
            Hn(t, 'nudge', e[14]),
            Rn(oc.call(null, t)),
            Hn(t, 'interactionstart', e[15]('start')),
            Hn(t, 'interactionupdate', e[15]('move')),
            Hn(t, 'interactionend', e[15]('end')),
            Rn(tc.call(null, t)),
          ]),
          (i = !0))
    },
    p(e, i) {
      97 & i[0] &&
        o !==
          (o = `transform: translate3d(${e[0].x}px, ${e[0].y}px, 0) scale(${e[5]}, ${e[5]}); opacity: ${e[6]}`) &&
        Yn(t, 'style', o)
    },
    d(e) {
      e && Wn(t), (i = !1), yn(n)
    },
  }
}

function Qg(e) {
  let t,
    o,
    i = [],
    n = new Map(),
    r = e[3]
  const a = (e) => e[49]
  for (let t = 0; t < r.length; t += 1) {
    let o = Gg(e, r, t),
      s = a(o)
    n.set(s, (i[t] = Kg(s, o)))
  }
  let s = e[1] && e[4] && Jg(e)
  return {
    c() {
      for (let e = 0; e < i.length; e += 1) i[e].c()
      ;(t = jn()), s && s.c(), (o = Nn())
    },
    m(e, n) {
      for (let t = 0; t < i.length; t += 1) i[t].m(e, n)
      On(e, t, n), s && s.m(e, n), On(e, o, n)
    },
    p(e, l) {
      13164 & l[0] && ((r = e[3]), (i = _r(i, l, a, 1, e, r, n, t.parentNode, Wr, Kg, t, Gg))),
        e[1] && e[4]
          ? s
            ? s.p(e, l)
            : ((s = Jg(e)), s.c(), s.m(o.parentNode, o))
          : s && (s.d(1), (s = null))
    },
    i: pn,
    o: pn,
    d(e) {
      for (let t = 0; t < i.length; t += 1) i[t].d(e)
      e && Wn(t), s && s.d(e), e && Wn(o)
    },
  }
}

function ef(e, t, o) {
  let i, n, r, a, s, l
  const c = dr(),
    d = 0.5 * Z,
    u = _ - d,
    h = _ + d,
    p = -_,
    m = p - d,
    g = p + d,
    f = V - d,
    $ = -V + d,
    y = d,
    b = -d,
    x = _ - Z,
    v = x - d,
    S = x + d,
    k = V - Z,
    M = k - d,
    C = k + d,
    T = p - Z,
    P = T + d,
    I = T - d,
    R = p + Z,
    A = R + d,
    E = R - d
  let { points: L = [] } = t,
    { rotatorPoint: F } = t,
    { visible: z = !1 } = t,
    { enableResizing: B = !0 } = t,
    { enableRotating: D = !0 } = t
  const O = hr('isAnimated')
  Sn(e, O, (e) => o(19, (a = e)))
  let W = !1
  const j = ys(0.5, {
    precision: 1e-4,
    stiffness: 0.3,
    damping: 0.7,
  })
  Sn(e, j, (e) => o(5, (s = e)))
  const N = ys(0, {
    precision: 0.001,
    stiffness: 0.3,
    damping: 0.7,
  })
  Sn(e, N, (e) => o(6, (l = e)))
  const H = (e) => {
      let t = ''
      return (
        ((e <= h && e >= u) || (e >= m && e <= g)) && (t = 'ns'),
        (e <= $ || e >= f || (e >= b && e <= y)) && (t = 'ew'),
        ((e >= M && e <= C) || (e <= A && e >= E)) && (t = 'nesw'),
        ((e >= v && e <= S) || (e <= P && e >= I)) && (t = 'nwse'),
        t
      )
    },
    U = (e, t) => {
      c('resizestart', {
        indexes: e,
        translation: ie(),
      }),
        c('resizemove', {
          indexes: e,
          translation: t,
        }),
        c('resizeend', {
          indexes: e,
          translation: ie(),
        })
    }
  return (
    (e.$$set = (e) => {
      'points' in e && o(16, (L = e.points)),
        'rotatorPoint' in e && o(0, (F = e.rotatorPoint)),
        'visible' in e && o(17, (z = e.visible)),
        'enableResizing' in e && o(18, (B = e.enableResizing)),
        'enableRotating' in e && o(1, (D = e.enableRotating))
    }),
    (e.$$.update = () => {
      655360 & e.$$.dirty[0] &&
        j.set(z ? 1 : 0.5, {
          hard: !1 === a,
        }),
        655360 & e.$$.dirty[0] &&
          N.set(z ? 1 : 0, {
            hard: !1 === a,
          }),
        262144 & e.$$.dirty[0] && o(2, (i = !!B && (w(B) ? B : 'both'))),
        65540 & e.$$.dirty[0] &&
          o(
            3,
            (n =
              (i &&
                ((e, t) => {
                  let o = 0
                  const i = we(e),
                    n = [],
                    r = e.length,
                    a = 2 === r,
                    s = 'both' !== t
                  for (; o < r; o++) {
                    const l = e[o - 1] || e[e.length - 1],
                      c = e[o],
                      d = e[o + 1] || e[0],
                      u = Math.atan2(d.y - c.y, d.x - c.x)
                    if (!s) {
                      const e = ue(ne(l.x - c.x, l.y - c.y)),
                        t = ue(ne(d.x - c.x, d.y - c.y)),
                        i = ne(e.x + t.x, e.y + t.y)
                      n.push({
                        index: [o],
                        key: 'point-' + o,
                        type: 'point',
                        scale: {
                          x: 1,
                          y: 1,
                        },
                        translate: {
                          x: c.x,
                          y: c.y,
                        },
                        angle: void 0,
                        rotate: a ? 0 : u,
                        center: c,
                        dir: a ? void 0 : H(Math.atan2(i.y, i.x)),
                      })
                    }
                    if (a) continue
                    const h = ne(c.x + 0.5 * (d.x - c.x), c.y + 0.5 * (d.y - c.y))
                    ;('horizontal' === t && o % 2 == 0) ||
                      ('vertical' === t && o % 2 != 0) ||
                      n.push({
                        index: [o, o + 1 === r ? 0 : o + 1],
                        key: 'edge-' + o,
                        type: 'edge',
                        scale: {
                          x: xe(c, d),
                          y: 1,
                        },
                        translate: {
                          x: c.x,
                          y: c.y,
                        },
                        angle: u,
                        rotate: u,
                        center: h,
                        dir: H(Math.atan2(i.y - h.y, i.x - h.x)),
                      })
                  }
                  return n
                })(L, i)) ||
              [])
          ),
        65536 & e.$$.dirty[0] && o(4, (r = L.length > 2))
    }),
    [
      F,
      D,
      i,
      n,
      r,
      s,
      l,
      O,
      (e) => (W = e.shiftKey),
      (e) => (W = !1),
      j,
      N,
      (e, t) =>
        ({ detail: o }) => {
          const i = o && o.translation ? o.translation : ne(0, 0)
          c('resize' + e, { ...o, indexes: t, translation: i, shiftKey: W })
        },
      U,
      ({ detail: e }) => {
        c('rotatestart', {
          translation: ie(),
        }),
          c('rotatemove', {
            translation: e,
          }),
          c('rotateend', {
            translation: ie(),
          })
      },
      (e) =>
        ({ detail: t }) => {
          const o = t && t.translation ? t.translation : ne(0, 0)
          c('rotate' + e, {
            translation: o,
            shiftKey: W,
          })
        },
      L,
      z,
      B,
      a,
      (e, { detail: t }) => U(e, t),
    ]
  )
}
class tf extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        ef,
        Qg,
        xn,
        {
          points: 16,
          rotatorPoint: 0,
          visible: 17,
          enableResizing: 18,
          enableRotating: 1,
        },
        [-1, -1]
      )
  }
}
var of = (e, t) => {
  const o = Ym(e)
  return fe(o, t)
}
let nf = null
let rf = null
var af = (e) => {
  if ((null === rf && (rf = c() && 'visualViewport' in window), !rf)) return !1
  const t = visualViewport.height,
    o = () => {
      e(visualViewport.height < t ? 'visible' : 'hidden')
    }
  return (
    visualViewport.addEventListener('resize', o),
    () => visualViewport.removeEventListener('resize', o)
  )
}

function sf(e) {
  let t, o, i, n, r, a, s, l, c, d
  i = new Ql({
    props: {
      onclick: e[1],
      label: e[5],
      icon: e[7],
      hideLabel: !e[6],
    },
  })
  const u = e[20].default,
    h = kn(u, e, e[19], null)
  return (
    (s = new Ql({
      props: {
        onclick: e[0],
        label: e[2],
        icon: e[4],
        hideLabel: !e[3],
        class: 'PinturaInputFormButtonConfirm',
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          (o = Vn('div')),
          Hr(i.$$.fragment),
          (n = jn()),
          (r = Vn('div')),
          h && h.c(),
          (a = jn()),
          Hr(s.$$.fragment),
          Yn(r, 'class', 'PinturaInputFormFields'),
          Yn(o, 'class', 'PinturaInputFormInner'),
          Yn(t, 'class', 'PinturaInputForm'),
          Yn(t, 'style', e[9])
      },
      m(u, p) {
        On(u, t, p),
          Dn(t, o),
          Ur(i, o, null),
          Dn(o, n),
          Dn(o, r),
          h && h.m(r, null),
          Dn(o, a),
          Ur(s, o, null),
          e[21](t),
          (l = !0),
          c ||
            ((d = [
              Hn(t, 'focusin', e[10]),
              Hn(t, 'focusout', e[11]),
              Hn(t, 'measure', e[12]),
              Rn(Rs.call(null, t)),
            ]),
            (c = !0))
      },
      p(e, o) {
        const n = {}
        2 & o[0] && (n.onclick = e[1]),
          32 & o[0] && (n.label = e[5]),
          128 & o[0] && (n.icon = e[7]),
          64 & o[0] && (n.hideLabel = !e[6]),
          i.$set(n),
          h && h.p && 524288 & o[0] && Cn(h, u, e, e[19], o, null, null)
        const r = {}
        1 & o[0] && (r.onclick = e[0]),
          4 & o[0] && (r.label = e[2]),
          16 & o[0] && (r.icon = e[4]),
          8 & o[0] && (r.hideLabel = !e[3]),
          s.$set(r),
          (!l || 512 & o[0]) && Yn(t, 'style', e[9])
      },
      i(e) {
        l || (Fr(i.$$.fragment, e), Fr(h, e), Fr(s.$$.fragment, e), (l = !0))
      },
      o(e) {
        zr(i.$$.fragment, e), zr(h, e), zr(s.$$.fragment, e), (l = !1)
      },
      d(o) {
        o && Wn(t), Xr(i), h && h.d(o), Xr(s), e[21](null), (c = !1), yn(d)
      },
    }
  )
}

function lf(e, t, o) {
  let i,
    n,
    r,
    a,
    { $$slots: s = {}, $$scope: l } = t,
    { onconfirm: c } = t,
    { oncancel: d } = t,
    { autoFocus: u = !0 } = t,
    { autoPositionCursor: h = !0 } = t,
    { labelConfirm: p } = t,
    { labelConfirmShow: m = !0 } = t,
    { iconConfirm: g } = t,
    { labelCancel: f } = t,
    { labelCancelShow: $ = !1 } = t,
    { iconCancel: y } = t,
    { panelOffset: b = ie() } = t,
    x = !1,
    v = void 0,
    w = void 0,
    S = '',
    k = 0
  const M = () => {
      const e = a.querySelector('input, textarea')
      e.focus(), k >= 1 || e.select()
    },
    C = () => {
      ;(x = !0),
        P ||
          (!Gt() && (null === nf && (nf = Xt(/Android/)), !nf)) ||
          o(16, (S = 'top:1em;bottom:auto;')),
        Gt() &&
          ((e) => {
            let t
            const o = (e) => (t = e.touches[0].screenY),
              i = (e) => {
                const o = e.touches[0].screenY,
                  i = e.target
                ;/textarea/i.test(i.nodeName)
                  ? (o > t
                      ? 0 == i.scrollTop && e.preventDefault()
                      : o < t
                      ? i.scrollTop + i.offsetHeight == i.scrollHeight && e.preventDefault()
                      : e.preventDefault(),
                    (t = o))
                  : e.preventDefault()
              }
            e.addEventListener('touchstart', o), e.addEventListener('touchmove', i)
          })(a),
        o(17, (k = 1))
    }
  let T
  const P = af((e) => {
    n
      ? 'hidden' !== e || x
        ? (clearTimeout(w),
          (w = void 0),
          o(16, (S = `top:${visualViewport.height - v - b.y}px`)),
          'visible' === e
            ? (o(8, (a.dataset.layout = 'stick'), a), M(), C())
            : ((x = !1), o(17, (k = 0))))
        : M()
      : o(16, (S = 'top: 4.5em; bottom: auto'))
  })
  return (
    sr(() => {
      u && M()
    }),
    cr(() => {
      P && P()
    }),
    (e.$$set = (e) => {
      'onconfirm' in e && o(0, (c = e.onconfirm)),
        'oncancel' in e && o(1, (d = e.oncancel)),
        'autoFocus' in e && o(13, (u = e.autoFocus)),
        'autoPositionCursor' in e && o(14, (h = e.autoPositionCursor)),
        'labelConfirm' in e && o(2, (p = e.labelConfirm)),
        'labelConfirmShow' in e && o(3, (m = e.labelConfirmShow)),
        'iconConfirm' in e && o(4, (g = e.iconConfirm)),
        'labelCancel' in e && o(5, (f = e.labelCancel)),
        'labelCancelShow' in e && o(6, ($ = e.labelCancelShow)),
        'iconCancel' in e && o(7, (y = e.iconCancel)),
        'panelOffset' in e && o(15, (b = e.panelOffset)),
        '$$scope' in e && o(19, (l = e.$$scope))
    }),
    (e.$$.update = () => {
      256 & e.$$.dirty[0] && o(18, (i = a && getComputedStyle(a))),
        262144 & e.$$.dirty[0] && (n = i && '1' === i.getPropertyValue('--editor-modal')),
        196608 & e.$$.dirty[0] && o(9, (r = `opacity:${k};${S}`))
    }),
    [
      c,
      d,
      p,
      m,
      g,
      f,
      $,
      y,
      a,
      r,
      (e) => {
        var t
        ;((e) => /textarea/i.test(e))(e.target) &&
          ((T = Date.now()),
          h && ((t = e.target).selectionStart = t.selectionEnd = t.value.length),
          clearTimeout(w),
          (w = setTimeout(C, 200)))
      },
      (e) => {
        Date.now() - T > 50 || (e.stopPropagation(), M())
      },
      ({ detail: e }) => {
        v = e.height
      },
      u,
      h,
      b,
      S,
      k,
      i,
      l,
      s,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(a = e), o(8, a)
        })
      },
    ]
  )
}
class cf extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        lf,
        sf,
        xn,
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
var df = (e) => document.createTextNode(e)

function uf(e) {
  let t, o, i, n
  return {
    c() {
      ;(t = Vn('pre')),
        Yn(t, 'class', 'PinturaContentEditable'),
        Yn(t, 'data-wrap-content', (o = e[3] ? 'wrap' : 'nowrap')),
        Yn(t, 'contenteditable', ''),
        Yn(t, 'spellcheck', e[0]),
        Yn(t, 'autocorrect', e[1]),
        Yn(t, 'autocapitalize', e[2]),
        Yn(t, 'style', e[4])
    },
    m(o, r) {
      On(o, t, r),
        e[21](t),
        i ||
          ((n = [
            Hn(t, 'input', e[10]),
            Hn(t, 'compositionend', e[9]),
            Hn(t, 'paste', e[11]),
            Hn(t, 'keydown', e[7]),
            Hn(t, 'keyup', e[8]),
            Hn(t, 'blur', e[6]),
          ]),
          (i = !0))
    },
    p(e, i) {
      8 & i[0] && o !== (o = e[3] ? 'wrap' : 'nowrap') && Yn(t, 'data-wrap-content', o),
        1 & i[0] && Yn(t, 'spellcheck', e[0]),
        2 & i[0] && Yn(t, 'autocorrect', e[1]),
        4 & i[0] && Yn(t, 'autocapitalize', e[2]),
        16 & i[0] && Yn(t, 'style', e[4])
    },
    i: pn,
    o: pn,
    d(o) {
      o && Wn(t), e[21](null), (i = !1), yn(n)
    },
  }
}

function hf(e, t, o) {
  let i,
    { spellcheck: r = 'false' } = t,
    { autocorrect: a = 'off' } = t,
    { autocapitalize: s = 'off' } = t,
    { wrapLines: l = !0 } = t,
    { textStyles: d = !1 } = t,
    { formatInput: u = W } = t,
    { formatPaste: h = W } = t,
    { style: m } = t,
    { innerHTML: g } = t,
    { oninput: f = n } = t
  const $ = () => {
      if (!b) return
      const e = document.createRange()
      e.selectNodeContents(b)
      const t = window.getSelection()
      t.removeAllRanges(), t.addRange(e)
    },
    y = dr()
  let b
  c() && document.execCommand('defaultParagraphSeparator', !1, 'br')
  const x = (e) => e.replace(/<\/?(?:i|b|em|strong)>/, ''),
    v = () => {
      o(12, (g = b.innerHTML)),
        y('input', g),
        f(g),
        requestAnimationFrame(() => b && b.scrollTo(0, 0))
    },
    w = () => {
      M(b)
      const e = d ? b.innerHTML : x(b.innerHTML)
      o(5, (b.innerHTML = u(e)), b), C(b), v()
    },
    S = (e) => {
      const t = p('span')
      return (t.dataset.bookmark = e), t
    },
    k = (e, t, o) => {
      const i = S(o)
      if (e.nodeType === Node.TEXT_NODE) {
        const n = e.textContent
        if ('start' === o) {
          const o = df(n.substr(0, t)),
            r = df(n.substr(t))
          e.replaceWith(o, i, r)
        } else {
          const o = df(n.substr(0, t)),
            r = df(n.substr(t))
          e.replaceWith(o, i, r)
        }
      } else e.nodeType === Node.ELEMENT_NODE && e.insertBefore(i, e.childNodes[t])
    },
    M = (e) => {
      const t = window.getSelection()
      if (!t.getRangeAt || !t.rangeCount) return
      const o = t.getRangeAt(0),
        { startOffset: i, endOffset: n, startContainer: r, endContainer: a } = o
      if (e.contains(o.startContainer) && e.contains(o.endContainer))
        if (r.nodeType === Node.TEXT_NODE && r === a) {
          const e = r.textContent,
            t = e.substr(0, i),
            o = S('start'),
            a = n - i > 0 ? e.substr(i, n) : '',
            s = S('end'),
            l = e.substr(n)
          r.replaceWith(t, o, a, s, l)
        } else k(r, i, 'start'), k(a, n + (r === a ? 1 : 0), 'end')
    },
    C = (e) => {
      const t = T(e, 'start'),
        o = T(e, 'end')
      if (!t || !o) return
      const i = document.createRange()
      i.setStart(t, 0), i.setEnd(o, 0)
      const n = window.getSelection()
      n.removeAllRanges(), n.addRange(i), t.remove(), o.remove()
    },
    T = (e, t) => {
      const o = e.children
      for (let e = 0; e < o.length; e++) {
        const i = o[e]
        if (i.dataset.bookmark === t) return i
        if (i.children.length) {
          const e = T(i, t)
          if (e) return e
        }
      }
    },
    P = (e) => {
      const t = window.getSelection().getRangeAt(0),
        o = t.cloneRange()
      return o.selectNodeContents(e), o.setEnd(t.endContainer, t.endOffset), o.toString().length
    }
  return (
    (e.$$set = (e) => {
      'spellcheck' in e && o(0, (r = e.spellcheck)),
        'autocorrect' in e && o(1, (a = e.autocorrect)),
        'autocapitalize' in e && o(2, (s = e.autocapitalize)),
        'wrapLines' in e && o(3, (l = e.wrapLines)),
        'textStyles' in e && o(13, (d = e.textStyles)),
        'formatInput' in e && o(14, (u = e.formatInput)),
        'formatPaste' in e && o(15, (h = e.formatPaste)),
        'style' in e && o(4, (m = e.style)),
        'innerHTML' in e && o(12, (g = e.innerHTML)),
        'oninput' in e && o(16, (f = e.oninput))
    }),
    (e.$$.update = () => {
      var t
      32 & e.$$.dirty[0] && o(20, (i = !!b)),
        1052672 & e.$$.dirty[0] &&
          i &&
          g &&
          (t = g) !== b.innerHTML &&
          (o(5, (b.innerHTML = t), b), b === document.activeElement && $())
    }),
    [
      r,
      a,
      s,
      l,
      m,
      b,
      () => {
        y('blur')
      },
      (e) => {
        if (/escape/i.test(e.code)) return e.stopPropagation(), void y('cancel')
        if (/enter/i.test(e.code) && (e.ctrlKey || e.metaKey)) return void y('confirm')
        if (13 !== e.keyCode) return
        const t = P(b) === b.textContent.length ? '<br><br>' : '<br>'
        l && document.execCommand('insertHTML', !1, t), e.preventDefault()
      },
      (e) => {},
      (e) => {
        '' !== e.data && w()
      },
      (e) => {
        const { inputType: t } = e
        'insertCompositionText' !== t && 'deleteCompositionText' !== t && w()
      },
      (e) => {
        e.preventDefault()
        const t = e.clipboardData.getData('text/plain'),
          o = d ? t : x(t),
          i = h(o)
        if (!i.length) return
        const n = window.getSelection().getRangeAt(0)
        n.deleteContents(), n.insertNode(document.createTextNode(i)), v()
      },
      g,
      d,
      u,
      h,
      f,
      () => w(),
      () => b && b.focus(),
      $,
      i,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(b = e), o(5, b)
        })
      },
    ]
  )
}
class pf extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        hf,
        uf,
        xn,
        {
          spellcheck: 0,
          autocorrect: 1,
          autocapitalize: 2,
          wrapLines: 3,
          textStyles: 13,
          formatInput: 14,
          formatPaste: 15,
          style: 4,
          innerHTML: 12,
          oninput: 16,
          confirm: 17,
          focus: 18,
          select: 19,
        },
        [-1, -1]
      )
  }
  get spellcheck() {
    return this.$$.ctx[0]
  }
  set spellcheck(e) {
    this.$set({
      spellcheck: e,
    }),
      Cr()
  }
  get autocorrect() {
    return this.$$.ctx[1]
  }
  set autocorrect(e) {
    this.$set({
      autocorrect: e,
    }),
      Cr()
  }
  get autocapitalize() {
    return this.$$.ctx[2]
  }
  set autocapitalize(e) {
    this.$set({
      autocapitalize: e,
    }),
      Cr()
  }
  get wrapLines() {
    return this.$$.ctx[3]
  }
  set wrapLines(e) {
    this.$set({
      wrapLines: e,
    }),
      Cr()
  }
  get textStyles() {
    return this.$$.ctx[13]
  }
  set textStyles(e) {
    this.$set({
      textStyles: e,
    }),
      Cr()
  }
  get formatInput() {
    return this.$$.ctx[14]
  }
  set formatInput(e) {
    this.$set({
      formatInput: e,
    }),
      Cr()
  }
  get formatPaste() {
    return this.$$.ctx[15]
  }
  set formatPaste(e) {
    this.$set({
      formatPaste: e,
    }),
      Cr()
  }
  get style() {
    return this.$$.ctx[4]
  }
  set style(e) {
    this.$set({
      style: e,
    }),
      Cr()
  }
  get innerHTML() {
    return this.$$.ctx[12]
  }
  set innerHTML(e) {
    this.$set({
      innerHTML: e,
    }),
      Cr()
  }
  get oninput() {
    return this.$$.ctx[16]
  }
  set oninput(e) {
    this.$set({
      oninput: e,
    }),
      Cr()
  }
  get confirm() {
    return this.$$.ctx[17]
  }
  get focus() {
    return this.$$.ctx[18]
  }
  get select() {
    return this.$$.ctx[19]
  }
}

function mf(e, t, o) {
  const i = e.slice()
  return (i[209] = t[o]), (i[211] = o), i
}

function gf(e, t) {
  let o,
    i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p = t[209].name + ''

  function m() {
    return t[140](t[211])
  }
  return (
    (n = new cp({
      props: {
        color: t[209].color,
      },
    })),
    {
      key: e,
      first: null,
      c() {
        ;(o = Vn('li')),
          (i = Vn('button')),
          Hr(n.$$.fragment),
          (r = jn()),
          (a = Vn('span')),
          (s = Zn(p)),
          (c = jn()),
          Yn(i, 'class', 'PinturaShapeListItem'),
          Yn(i, 'type', 'button'),
          Yn(i, 'aria-label', (l = 'Select shape ' + t[209].name)),
          (this.first = o)
      },
      m(e, t) {
        On(e, o, t),
          Dn(o, i),
          Ur(n, i, null),
          Dn(i, r),
          Dn(i, a),
          Dn(a, s),
          Dn(o, c),
          (d = !0),
          u || ((h = Hn(i, 'click', m)), (u = !0))
      },
      p(e, o) {
        t = e
        const r = {}
        16777216 & o[0] && (r.color = t[209].color),
          n.$set(r),
          (!d || 16777216 & o[0]) && p !== (p = t[209].name + '') && qn(s, p),
          (!d || (16777216 & o[0] && l !== (l = 'Select shape ' + t[209].name))) &&
            Yn(i, 'aria-label', l)
      },
      i(e) {
        d || (Fr(n.$$.fragment, e), (d = !0))
      },
      o(e) {
        zr(n.$$.fragment, e), (d = !1)
      },
      d(e) {
        e && Wn(o), Xr(n), (u = !1), h()
      },
    }
  )
}

function ff(e) {
  let t, o
  return (
    (t = new tf({
      props: {
        visible: !0,
        points: e[12],
        rotatorPoint: e[18],
        enableResizing: e[17],
        enableRotating: e[10],
      },
    })),
    t.$on('resizestart', e[32]),
    t.$on('resizemove', e[33]),
    t.$on('resizeend', e[34]),
    t.$on('rotatestart', e[35]),
    t.$on('rotatemove', e[36]),
    t.$on('rotateend', e[37]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        4096 & o[0] && (i.points = e[12]),
          262144 & o[0] && (i.rotatorPoint = e[18]),
          131072 & o[0] && (i.enableResizing = e[17]),
          1024 & o[0] && (i.enableRotating = e[10]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function $f(e) {
  let t, o, i, n
  const r = [bf, yf],
    a = []

  function s(e, t) {
    return 'modal' === e[4] ? 0 : 'inline' === e[4] ? 1 : -1
  }
  return (
    ~(t = s(e)) && (o = a[t] = r[t](e)),
    {
      c() {
        o && o.c(), (i = Nn())
      },
      m(e, o) {
        ~t && a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, n) {
        let l = t
        ;(t = s(e)),
          t === l
            ? ~t && a[t].p(e, n)
            : (o &&
                (Er(),
                zr(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Lr()),
              ~t
                ? ((o = a[t]),
                  o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
                  Fr(o, 1),
                  o.m(i.parentNode, i))
                : (o = null))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        ~t && a[t].d(e), e && Wn(i)
      },
    }
  )
}

function yf(e) {
  let t,
    o,
    i,
    n,
    r,
    a = {
      formatInput: e[39],
      wrapLines: !!e[9].width,
      style: e[20],
    }
  return (
    (o = new pf({
      props: a,
    })),
    e[143](o),
    o.$on('input', e[40]),
    o.$on('keyup', e[43]),
    o.$on('cancel', e[45]),
    o.$on('confirm', e[44]),
    {
      c() {
        ;(t = Vn('div')),
          Hr(o.$$.fragment),
          Yn(t, 'class', 'PinturaInlineInput'),
          Yn(t, 'style', e[21])
      },
      m(a, s) {
        On(a, t, s), Ur(o, t, null), (i = !0), n || ((r = Hn(t, 'focusout', e[144])), (n = !0))
      },
      p(e, n) {
        const r = {}
        512 & n[0] && (r.wrapLines = !!e[9].width),
          1048576 & n[0] && (r.style = e[20]),
          o.$set(r),
          (!i || 2097152 & n[0]) && Yn(t, 'style', e[21])
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(i) {
        i && Wn(t), e[143](null), Xr(o), (n = !1), r()
      },
    }
  )
}

function bf(e) {
  let t, o
  return (
    (t = new cf({
      props: {
        panelOffset: e[2],
        onconfirm: e[44],
        oncancel: e[45],
        labelCancel: e[5].shapeLabelInputCancel,
        iconCancel: e[5].shapeIconInputCancel,
        labelConfirm: e[5].shapeLabelInputConfirm,
        iconConfirm: e[5].shapeIconInputConfirm,
        $$slots: {
          default: [xf],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        4 & o[0] && (i.panelOffset = e[2]),
          32 & o[0] && (i.labelCancel = e[5].shapeLabelInputCancel),
          32 & o[0] && (i.iconCancel = e[5].shapeIconInputCancel),
          32 & o[0] && (i.labelConfirm = e[5].shapeLabelInputConfirm),
          32 & o[0] && (i.iconConfirm = e[5].shapeIconInputConfirm),
          (1572992 & o[0]) | (67108864 & o[6]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function xf(e) {
  let t, o, i
  return {
    c() {
      ;(t = Vn('textarea')),
        Yn(t, 'spellcheck', 'false'),
        Yn(t, 'autocorrect', 'off'),
        Yn(t, 'autocapitalize', 'off'),
        Yn(t, 'style', e[20])
    },
    m(n, r) {
      On(n, t, r),
        e[141](t),
        Kn(t, e[19]),
        o ||
          ((i = [
            Hn(t, 'keydown', e[42]),
            Hn(t, 'keypress', e[41]),
            Hn(t, 'keyup', e[43]),
            Hn(t, 'input', e[40]),
            Hn(t, 'input', e[142]),
          ]),
          (o = !0))
    },
    p(e, o) {
      1048576 & o[0] && Yn(t, 'style', e[20]), 524288 & o[0] && Kn(t, e[19])
    },
    d(n) {
      n && Wn(t), e[141](null), (o = !1), yn(i)
    },
  }
}

function vf(e) {
  let t, o, i, n, r
  return (
    (o = new cu({
      props: {
        items: e[23],
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          Hr(o.$$.fragment),
          Yn(t, 'class', 'PinturaShapeControls'),
          Yn(t, 'style', e[22])
      },
      m(a, s) {
        On(a, t, s),
          Ur(o, t, null),
          (i = !0),
          n || ((r = [Hn(t, 'measure', e[145]), Rn(Rs.call(null, t))]), (n = !0))
      },
      p(e, n) {
        const r = {}
        8388608 & n[0] && (r.items = e[23]),
          o.$set(r),
          (!i || 4194304 & n[0]) && Yn(t, 'style', e[22])
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), (n = !1), yn(r)
      },
    }
  )
}

function wf(e) {
  let t,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h = [],
    p = new Map(),
    m = e[24]
  const g = (e) => e[209].id
  for (let t = 0; t < m.length; t += 1) {
    let o = mf(e, m, t),
      i = g(o)
    p.set(i, (h[t] = gf(i, o)))
  }
  let f = e[11] && ff(e),
    $ = e[13] && $f(e),
    y = e[14] > 0 && vf(e)
  return {
    c() {
      ;(t = Vn('div')), (o = Vn('nav')), (i = Vn('ul'))
      for (let e = 0; e < h.length; e += 1) h[e].c()
      ;(r = jn()),
        f && f.c(),
        (a = jn()),
        $ && $.c(),
        (s = jn()),
        y && y.c(),
        Yn(o, 'class', 'PinturaShapeList'),
        Yn(o, 'data-visible', e[15]),
        Yn(t, 'class', 'PinturaShapeEditor'),
        Yn(t, 'tabindex', '0')
    },
    m(p, m) {
      On(p, t, m), Dn(t, o), Dn(o, i)
      for (let e = 0; e < h.length; e += 1) h[e].m(i, null)
      Dn(t, r),
        f && f.m(t, null),
        Dn(t, a),
        $ && $.m(t, null),
        Dn(t, s),
        y && y.m(t, null),
        e[146](t),
        (c = !0),
        d ||
          ((u = [
            Hn(o, 'focusin', e[48]),
            Hn(o, 'focusout', e[49]),
            Hn(t, 'keydown', function () {
              bn(e[1] ? n : e[38]) && (e[1] ? n : e[38]).apply(this, arguments)
            }),
            Hn(t, 'nudge', function () {
              bn(e[1] ? n : e[47]) && (e[1] ? n : e[47]).apply(this, arguments)
            }),
            Hn(t, 'measure', e[139]),
            Hn(t, 'pointermove', function () {
              bn(e[1] ? n : e[50]) && (e[1] ? n : e[50]).apply(this, arguments)
            }),
            Hn(t, 'interactionstart', function () {
              bn(e[1] ? n : e[27]) && (e[1] ? n : e[27]).apply(this, arguments)
            }),
            Hn(t, 'interactionupdate', function () {
              bn(e[1] ? n : e[29]) && (e[1] ? n : e[29]).apply(this, arguments)
            }),
            Hn(t, 'interactioncancel', function () {
              bn(e[1] ? n : e[28]) && (e[1] ? n : e[28]).apply(this, arguments)
            }),
            Hn(t, 'interactionrelease', function () {
              bn(e[1] ? n : e[30]) && (e[1] ? n : e[30]).apply(this, arguments)
            }),
            Hn(t, 'interactionend', function () {
              bn(e[1] ? n : e[31]) && (e[1] ? n : e[31]).apply(this, arguments)
            }),
            Rn(Rs.call(null, t)),
            Rn(oc.call(null, t)),
            Rn(
              (l = tc.call(null, t, {
                drag: !0,
                inertia: !0,
                multiTouch: !1,
                shouldStartInteraction: Sf,
                getEventPosition: e[147],
              }))
            ),
          ]),
          (d = !0))
    },
    p(n, r) {
      ;(e = n),
        16777281 & r[0] &&
          ((m = e[24]), Er(), (h = _r(h, r, g, 1, e, m, p, i, Vr, gf, null, mf)), Lr()),
        (!c || 32768 & r[0]) && Yn(o, 'data-visible', e[15]),
        e[11]
          ? f
            ? (f.p(e, r), 2048 & r[0] && Fr(f, 1))
            : ((f = ff(e)), f.c(), Fr(f, 1), f.m(t, a))
          : f &&
            (Er(),
            zr(f, 1, 1, () => {
              f = null
            }),
            Lr()),
        e[13]
          ? $
            ? ($.p(e, r), 8192 & r[0] && Fr($, 1))
            : (($ = $f(e)), $.c(), Fr($, 1), $.m(t, s))
          : $ &&
            (Er(),
            zr($, 1, 1, () => {
              $ = null
            }),
            Lr()),
        e[14] > 0
          ? y
            ? (y.p(e, r), 16384 & r[0] && Fr(y, 1))
            : ((y = vf(e)), y.c(), Fr(y, 1), y.m(t, null))
          : y &&
            (Er(),
            zr(y, 1, 1, () => {
              y = null
            }),
            Lr()),
        l &&
          bn(l.update) &&
          8 & r[0] &&
          l.update.call(null, {
            drag: !0,
            inertia: !0,
            multiTouch: !1,
            shouldStartInteraction: Sf,
            getEventPosition: e[147],
          })
    },
    i(e) {
      if (!c) {
        for (let e = 0; e < m.length; e += 1) Fr(h[e])
        Fr(f), Fr($), Fr(y), (c = !0)
      }
    },
    o(e) {
      for (let e = 0; e < h.length; e += 1) zr(h[e])
      zr(f), zr($), zr(y), (c = !1)
    },
    d(o) {
      o && Wn(t)
      for (let e = 0; e < h.length; e += 1) h[e].d()
      f && f.d(), $ && $.d(), y && y.d(), e[146](null), (d = !1), yn(u)
    },
  }
}
const Sf = (e, t) => e.target === t

function kf(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    v,
    S,
    k,
    M,
    C,
    P,
    I,
    R,
    A,
    E,
    L,
    F,
    z,
    B,
    D,
    O,
    V,
    _,
    Z,
    j,
    N,
    H,
    { uid: U = T() } = t,
    { ui: X } = t,
    { disabled: Y = !1 } = t,
    { markup: G } = t,
    { offset: q } = t,
    { contextRotation: K = 0 } = t,
    { contextFlipX: J = !1 } = t,
    { contextFlipY: Q = !1 } = t,
    { contextZoom: te = 1 } = t,
    { active: re = !1 } = t,
    { opacity: ae = 1 } = t,
    { parentRect: le } = t,
    { rootRect: de } = t,
    { utilRect: ve } = t,
    { hoverColor: Me } = t,
    { textInputMode: Ce = 'inline' } = t,
    { oninteractionstart: Pe = n } = t,
    { oninteractionupdate: Ie = n } = t,
    { oninteractionrelease: Re = n } = t,
    { oninteractionend: Ee = n } = t,
    { oninteractioncancel: Le = n } = t,
    { onaddshape: Fe = n } = t,
    { onupdateshape: ze = n } = t,
    { onselectshape: Be = n } = t,
    { onremoveshape: De = n } = t,
    { ontapshape: We = n } = t,
    { onhovershape: _e = n } = t,
    { onhovercanvas: Ze = n } = t,
    { beforeSelectShape: je = () => !0 } = t,
    { beforeDeselectShape: Ne = () => !0 } = t,
    { beforeRemoveShape: He = () => !0 } = t,
    { beforeUpdateShape: Ge = (e, t) => t } = t,
    { willRenderShapeControls: Je = W } = t,
    { willStartInteraction: Qe = (e, t) => !0 } = t,
    { mapEditorPointToImagePoint: et } = t,
    { mapImagePointToEditorPoint: tt } = t,
    { eraseRadius: ot } = t,
    { selectRadius: it } = t,
    { enableButtonFlipVertical: nt = !1 } = t,
    { enableTapToAddText: rt = !0 } = t,
    { locale: at } = t
  const st = hr('isAnimated')
  Sn(e, st, (e) => o(136, (N = e)))
  const ct = (e, t, o) => {
      let i = Ge({ ...e }, t, { ...o })
      Vi(e, i, o)
    },
    dt = (e, t, o, i) => {
      const n = ne(e.x - o.x, e.y - o.y),
        r = ne(i.x - o.x, i.y - o.y),
        a = ye(r, r)
      let s = ye(n, r) / a
      ;(s = s < 0 ? 0 : s), (s = s > 1 ? 1 : s)
      const l = ne(r.x * s + o.x - e.x, r.y * s + o.y - e.y)
      return ye(l, l) <= t * t
    },
    ut = (e, t, o) => {
      const i = o.length
      for (let n = 0; n < i - 1; n++) if (dt(e, t, o[n], o[n + 1])) return !0
      return !1
    },
    gt = (e, t, o) => !!vt(e, o) || !!ut(e, t, o) || dt(e, t, o[0], o[o.length - 1]),
    ft = (e, t, o, i, n) => gt(e, t, lt(o, i, n || Ke(o))),
    $t = hr('keysPressed')
  Sn(e, $t, (e) => o(158, (j = e)))
  const yt = (e, t, o) => (0 === e || (t && o) ? e : t || o ? -e : e),
    bt = (e, t) => {
      const o = tt(e)
      return et(ge(o, t))
    },
    wt = (e, t, o) => {
      if (ii(e)) {
        const i = bt(qo(t), o),
          n = bt(Ko(t), o)
        ct(
          e,
          {
            x1: i.x,
            y1: i.y,
            x2: n.x,
            y2: n.y,
          },
          le
        )
      } else if (ti(e) || Jo(e) || oi(e)) {
        const i = bt(t, o)
        ct(e, i, le)
      }
      Et()
    },
    St = {
      0: 1,
      1: 0,
      2: 3,
      3: 2,
    },
    Mt = {
      0: 3,
      1: 2,
      2: 1,
      3: 0,
    }
  let Ct
  const Tt = () => {
      if (G.length) return G.find(di)
    },
    Pt = () => {
      if (G.length) return G.findIndex(di)
    },
    It = (e, t = !0) => {
      if (!Tt()) return gi(e), Lt(e, t)
    },
    Rt = () => {
      const e = Tt()
      if (e) return (e._isDraft = !1), Et(), e
    },
    At = () => {
      Tt() && (G.splice(Pt(), 1), Et())
    },
    Et = () => o(0, G),
    Lt = (e, t = !0) => (G.push(e), t && Et(), e),
    Ft = (e, t = [], o = !0) => {
      t.forEach((t) => delete e[t]), o && Et()
    },
    zt = (e, t, o = !0) => {
      ;(e = Object.assign(e, t)), o && Et()
    },
    Bt = (e, t, o, i = !0) => {
      ;(e[t] = o), i && Et()
    },
    Dt = (e, t = !0) => {
      G.forEach((t) => zt(t, e, !1)), t && Et()
    },
    Ot = () => [...G].reverse().find(li),
    Wt = () => !!Ot(),
    Vt = (e) => {
      if (!He(e)) return !1
      o(0, (G = G.filter((t) => t !== e))), De(e)
    },
    _t = () => {
      const e = Ot()
      if (!e) return
      const t = G.filter((e) => yi(e) && $i(e)),
        o = t.findIndex((t) => t === e)
      if (!1 === Vt(e)) return
      if (((Zt = e), t.length - 1 <= 0)) return jt()
      const i = o - 1 < 0 ? t.length - 1 : o - 1
      Ht(t[i])
    }
  let Zt = void 0
  const jt = (e = {}) => {
      const { storePrevious: t = !0 } = e
      Object.keys(To).forEach((e) => (To[e] = {})),
        t && (Zt = Nt()),
        Dt({
          isSelected: !1,
          isEditing: !1,
          _prerender: !1,
        })
    },
    Nt = () => G.find(li),
    Ht = (e, t = !0) => {
      if (di(e)) return
      const o = Nt() || Zt,
        i = li(e)
      ;(Zt = void 0),
        je(o, e) &&
          (jt(),
          ((e) => {
            e.isSelected = !0
          })(e),
          !i && Be(e),
          t && Et())
    },
    Ut = (e) => {
      $o && e.isEditing && $o.confirm && $o.confirm(),
        zt(e, {
          isSelected: !1,
          isEditing: !1,
          _prerender: !1,
        })
    },
    Xt = (e) => {
      zt(e, {
        isSelected: !0,
        isEditing: !0,
        _prerender: 'inline' === Ce,
      })
    },
    Yt = (e) => {
      zt(e, {
        isSelected: !0,
        isEditing: !1,
        _prerender: !1,
      })
    },
    Gt = (e) => {
      if (!e.length) return []
      const t = e.filter(He)
      return o(0, (G = G.filter((e) => !t.includes(e)))), t
    },
    qt = (e) => {
      const t = Lo(e.text, e)
      return qe(
        e.x,
        e.y,
        e.width ? Math.min(e.width, t.width) : t.width,
        e.height ? Math.min(e.height, t.height) : t.height
      )
    },
    Kt = (e) => {
      if (ui(e)) return Ue(e)
      if (oi(e)) return Ye(e)
      const t = qt(e)
      return (t.width = Math.max(10, e.width || t.width)), t
    },
    Jt = (e, t = 0, o = () => !0) =>
      [...G]
        .reverse()
        .filter(o)
        .map((e) => ({
          shape: e,
          priority: 1,
        }))
        .filter((o) => {
          const { shape: i } = o,
            n = Bi(Ho(i), le),
            r = t + (n.strokeWidth || 0)
          if (ti(n)) return ft(e, r, n, i.rotation)
          if (Jo(n)) {
            const t = Kt(n),
              a = ft(e, r, t, i.rotation)
            let s = !1
            if (a && !li(i)) {
              const a = qt(n)
              'right' !== i.textAlign || i.flipX || (a.x = t.x + t.width - a.width),
                'center' === i.textAlign && (a.x = t.x + 0.5 * t.width - 0.5 * a.width),
                (s = ft(e, r, a, i.rotation, Ke(t))),
                s || (o.priority = -1)
            }
            return a
          }
          return oi(n)
            ? ((e, t, o, i, n, r) => {
                const a = kt(ne(o.x, o.y), o.rx, o.ry, i, n, r, 12)
                return gt(e, t, a)
              })(e, r, n, i.rotation, i.flipX, i.flipY)
            : ii(n)
            ? dt(e, Math.max(16, r), qo(n), Ko(n))
            : !!ri(n) && ut(e, Math.max(16, r), n.points)
        })
        .sort((e, t) => (e.priority < t.priority ? 1 : e.priority > t.priority ? -1 : 0))
        .map((e) => e.shape),
    Qt = (e, t, o, i = 0) => {
      const n = Math.abs(i),
        r = Oe(t, o),
        a = Ve(r, n),
        s = (({ start: e, end: t }, o) => {
          if (0 === o) return [ne(e.x, e.y), ne(e.x, e.y), ne(t.x, t.y), ne(t.x, t.y)]
          const i = Math.atan2(t.y - e.y, t.x - e.x),
            n = Math.sin(i) * o,
            r = Math.cos(i) * o
          return [
            ne(n + e.x, -r + e.y),
            ne(-n + e.x, r + e.y),
            ne(-n + t.x, r + t.y),
            ne(n + t.x, -r + t.y),
          ]
        })(a, n)
      return e.filter((e) => {
        const t = Bi(Ho(e), le)
        if (ii(t) || ri(t)) {
          const e = t.points ? [...t.points] : [qo(t), Ko(t)]
          return !!((e, t) => {
            const o = t.length,
              i = []
            for (let n = 0; n < o - 1; n++) {
              const o = xt(e.start, e.end, t[n], t[n + 1])
              o && i.push(o)
            }
            return i.length ? i : void 0
          })(a, e)
        }
        return ((e, t) => !!e.find((e) => vt(e, t)) || !!t.find((t) => vt(t, e)))(
          s,
          ((e, t = 12) => {
            if (ti(e)) return lt(e, e.rotation, Ke(e))
            if (Jo(e)) {
              const t = Kt(e)
              return lt(t, e.rotation, Ke(t))
            }
            return oi(e) ? kt(ne(e.x, e.y), e.rx, e.ry, e.rotation, e.flipX, e.flipY, t) : []
          })(t)
        )
      })
    }
  let eo = void 0,
    to = void 0,
    oo = void 0,
    io = void 0,
    no = void 0,
    ro = !1,
    ao = !1
  const so = () => {
      clearTimeout(eo), (eo = void 0), o(114, (ao = !1))
    },
    lo = (e) => {
      let t
      if (ti(e)) {
        if (e.width < 5 && e.height < 5) return
        const o = Ke(e)
        ;(t = mt(e)),
          (e.flipX || e.flipY) && Se(t, e.flipX, e.flipY, o.x, o.y),
          (t = ke(t, e.rotation, o.x, o.y))
      } else if (oi(e)) {
        const o = e
        ;(t = mt(Ye(e))),
          (e.flipX || e.flipY) && Se(t, e.flipX, e.flipY, o.x, o.y),
          (t = ke(t, e.rotation, o.x, o.y))
      } else if (ii(e)) t = [qo(e), Ko(e)]
      else if (ri(e)) t = [...e.points]
      else if (Jo(e)) {
        if (e.width < 5 && e.height < 5) return
        const o = Kt(e)
        o.width = Math.max(10, o.width)
        const i = Ke(o)
        ;(t = mt(o)),
          (e.flipX || e.flipY) && Se(t, e.flipX, e.flipY, i.x, i.y),
          (t = ke(t, e.rotation, i.x, i.y))
      }
      return t
    },
    co = (e) => {
      const t = lo(e)
      let o, i
      return (
        e.flipY
          ? ((o = we([t[0], t[1]])), (i = ue(ne(t[1].x - t[2].x, t[1].y - t[2].y))))
          : ((o = we([t[2], t[3]])), (i = ue(ne(t[2].x - t[1].x, t[2].y - t[1].y)))),
        $e(i, 20 / te),
        {
          origin: o,
          dir: i,
        }
      )
    },
    uo = () => {
      const e = X.filter((e) => 'markup-hover' !== e.id)
      e.length !== X.length && o(51, (X = e))
    }
  let ho
  const mo = 'markup-manipulator-segment-' + U,
    go = () => {
      o(51, (X = X.filter((e) => e.id !== mo)))
    },
    fo = (e) => e.isContentEditable || /input|textarea/i.test(e.nodeName)
  let $o
  const yo = (e) =>
      o(
        7,
        ($o.innerHTML = ((e) =>
          e
            .replace(/ {2,}/g, ' ')
            .replace(/&/g, '&amp;')
            .replace(/\u00a0/g, '&nbsp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .split('\n')
            .join('<br>'))(e)),
        $o
      ),
    bo = (e) => {
      let t
      t =
        void 0 === e.value
          ? e.innerHTML
              .split('<br>')
              .join('\n')
              .replace(/&nbsp;/g, String.fromCharCode(160))
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
          : e.value
      return Qo(i)
        ? ((e) => {
            const t = e.split(/[\n\r]/g)
            return t.length > 1
              ? t
                  .map((e) => e.trim())
                  .filter((e) => e.length)
                  .join(' ')
              : t[0]
          })(t)
        : t
    },
    xo = () => {
      const e = bo($o),
        t = xi(i, e),
        o = !0 === t ? e : t
      let n = v.x,
        r = v.y
      if (!i.height) {
        const e = lt({ ...k }, i.rotation),
          t = Lo(o, a),
          s = lt(
            {
              x: n,
              y: r,
              ...t,
            },
            i.rotation
          ),
          [l, , c] = e,
          [d, , u] = s
        let h = l,
          p = d
        i.flipX && ((h = c), (p = u))
        const m = fe(se(h), p)
        ;(n += m.x), (r += m.y)
      }
      zt(i, {
        x: w(x.x) ? vo(n, le.width) : n,
        y: w(x.y) ? vo(r, le.height) : r,
        text: o,
      })
    },
    So = () => {
      let e = di(i)
      di(i) && Rt(), $o && $o.confirm && $o.confirm(), xo(), Yt(i), e ? Fe(i) : ze(i)
    },
    ko = () => {
      di(i)
        ? At()
        : (zt(i, {
            text: x.text,
            x: x.x,
            y: x.y,
          }),
          Yt(i))
    },
    Mo = (e, t, { flipX: o, flipY: i, rotation: n }, r = 'top left') => {
      let a, s
      const [l, c, d, u] = lt(e, n),
        [h, p, m, g] = lt(t, n)
      if ('top center' === r) {
        ;(a = we(i ? [u, d] : [l, c])), (s = we(i ? [g, m] : [h, p]))
      } else
        ('top right' === r && !o) || ('top left' === r && o)
          ? ((a = i ? d : c), (s = i ? m : p))
          : ((a = i ? u : l), (s = i ? g : h))
      return fe(se(a), s)
    },
    Co = (e, t, o) =>
      ne(
        w(e.x) ? vo(t.x + o.x, le.width) : t.x + o.x,
        w(e.y) ? vo(t.y + o.y, le.height) : t.y + o.y
      ),
    To = {},
    Po = () => Xt(i),
    Io = () => {
      const e = Lo(i.text, a),
        t = po(i, 'height'),
        o = !t && po(i, 'width'),
        n = i.id
      let r = To[n]
      r || ((To[n] = {}), (r = To[n]))
      const s = (e) => {
          const { width: t, ...o } = a,
            n = Lo(i.text, o),
            r = Mo(
              qe(a.x, a.y, e.width, e.height),
              qe(a.x, a.y, n.width, n.height),
              a,
              'top ' + i.textAlign
            )
          Ft(i, ['width', 'height', 'textAlign']), zt(i, { ...Co(i, a, r) })
        },
        l = (t) => {
          const o = Ae(r.width || a.width || e.width, e.height),
            n = r.textAlign || 'left',
            s = Mo(qe(a.x, a.y, t.width, t.height), qe(a.x, a.y, o.width, o.height), a, 'top ' + n)
          Ft(i, ['height']),
            zt(i, {
              ...Co(i, a, s),
              width: w(i.width) ? vo(o.width, le.width) : o.width,
              textAlign: n,
            })
        },
        c = (t) => {
          const o = Ae(r.width || e.width, r.height || e.height),
            n = r.textAlign || 'left',
            s = Mo(qe(a.x, a.y, t.width, t.height), qe(a.x, a.y, o.width, o.height), a, 'top ' + n)
          zt(i, {
            ...Co(i, a, s),
            width: w(i.width) ? vo(o.width, le.width) : o.width,
            height: w(i.width) ? vo(o.height, le.height) : o.height,
            textAlign: n,
          })
        }
      if (t) {
        ;(r.textAlign = i.textAlign), (r.width = a.width), (r.height = a.height)
        const e = Ae(a.width, a.height)
        vi(i, 'auto-height') ? l(e) : vi(i, 'auto-width') && s(e)
      } else if (o) {
        ;(r.textAlign = i.textAlign), (r.width = a.width)
        const t = Ae(a.width, e.height)
        vi(i, 'auto-width') ? s(t) : vi(i, 'fixed-size') && c(t)
      } else {
        const t = Ae(e.width, e.height)
        vi(i, 'fixed-size') ? c(t) : vi(i, 'auto-height') && l(t)
      }
    },
    Ro = (e) => {
      e.stopPropagation()
      const t = i.flipX || !1
      Bt(i, 'flipX', !t), ze(i)
    },
    Ao = (e) => {
      e.stopPropagation()
      const t = i.flipY || !1
      Bt(i, 'flipY', !t), ze(i)
    },
    Eo = (e) => {
      Bt(i, 'opacity', e)
    },
    Fo = (e) => {
      Eo(e), ze(i)
    },
    zo = (e) => {
      e.stopPropagation(), e.target.blur(), _t()
    },
    Bo = (e) => {
      e.stopPropagation()
      G.findIndex((e) => e === i) !== G.length - 1 &&
        (o(0, (G = G.filter((e) => e !== i).concat([i]))), ze(i))
    },
    Do = (e) => {
      e.stopPropagation()
      const t = Ho(i)
      t.id = T()
      const o = ne(50, -50)
      if (ii(t)) {
        const e = Wi(t, ['x1', 'y1', 'x2', 'y2'], le)
        ;(e.x1 += o.x), (e.y1 += o.y), (e.x2 += o.x), (e.y2 += o.y), Vi(t, e, le)
      } else {
        const e = Wi(t, ['x', 'y'], le)
        ;(e.x += 50), (e.y -= 50), Vi(t, e, le)
      }
      G.push(t), Fe(t), Ht(t)
    },
    Oo = ys(0, {
      stiffness: 0.2,
      damping: 0.7,
    })
  let Wo
  Sn(e, Oo, (e) => o(14, (H = e)))
  const Vo = (e, t) => {
      const { disableTextLayout: o = [] } = t
      return 'height' in t
        ? o.includes('auto-height')
          ? e.shapeIconButtonTextLayoutAutoWidth
          : e.shapeIconButtonTextLayoutAutoHeight
        : 'width' in t
        ? o.includes('auto-width')
          ? e.shapeIconButtonTextLayoutFixedSize
          : e.shapeIconButtonTextLayoutAutoWidth
        : o.includes('fixed-size')
        ? e.shapeIconButtonTextLayoutAutoHeight
        : e.shapeIconButtonTextLayoutFixedSize
    },
    _o = (e, t) => {
      const { disableTextLayout: o = [] } = t
      return 'height' in t
        ? o.includes('auto-height')
          ? e.shapeTitleButtonTextLayoutAutoWidth
          : e.shapeTitleButtonTextLayoutAutoHeight
        : 'width' in t
        ? o.includes('auto-width')
          ? e.shapeTitleButtonTextLayoutFixedSize
          : e.shapeTitleButtonTextLayoutAutoWidth
        : o.includes('fixed-size')
        ? e.shapeTitleButtonTextLayoutAutoHeight
        : e.shapeTitleButtonTextLayoutFixedSize
    }
  let Zo = !1
  let jo = ie()
  const No = (e) => {
    _e(e), o(115, (ho = e))
  }
  let Uo
  cr(() => {
    go(), uo()
  })
  return (
    (e.$$set = (e) => {
      'uid' in e && o(52, (U = e.uid)),
        'ui' in e && o(51, (X = e.ui)),
        'disabled' in e && o(1, (Y = e.disabled)),
        'markup' in e && o(0, (G = e.markup)),
        'offset' in e && o(2, (q = e.offset)),
        'contextRotation' in e && o(53, (K = e.contextRotation)),
        'contextFlipX' in e && o(54, (J = e.contextFlipX)),
        'contextFlipY' in e && o(55, (Q = e.contextFlipY)),
        'contextZoom' in e && o(56, (te = e.contextZoom)),
        'active' in e && o(57, (re = e.active)),
        'opacity' in e && o(58, (ae = e.opacity)),
        'parentRect' in e && o(59, (le = e.parentRect)),
        'rootRect' in e && o(3, (de = e.rootRect)),
        'utilRect' in e && o(60, (ve = e.utilRect)),
        'hoverColor' in e && o(61, (Me = e.hoverColor)),
        'textInputMode' in e && o(4, (Ce = e.textInputMode)),
        'oninteractionstart' in e && o(62, (Pe = e.oninteractionstart)),
        'oninteractionupdate' in e && o(63, (Ie = e.oninteractionupdate)),
        'oninteractionrelease' in e && o(64, (Re = e.oninteractionrelease)),
        'oninteractionend' in e && o(65, (Ee = e.oninteractionend)),
        'oninteractioncancel' in e && o(66, (Le = e.oninteractioncancel)),
        'onaddshape' in e && o(67, (Fe = e.onaddshape)),
        'onupdateshape' in e && o(68, (ze = e.onupdateshape)),
        'onselectshape' in e && o(69, (Be = e.onselectshape)),
        'onremoveshape' in e && o(70, (De = e.onremoveshape)),
        'ontapshape' in e && o(71, (We = e.ontapshape)),
        'onhovershape' in e && o(72, (_e = e.onhovershape)),
        'onhovercanvas' in e && o(73, (Ze = e.onhovercanvas)),
        'beforeSelectShape' in e && o(74, (je = e.beforeSelectShape)),
        'beforeDeselectShape' in e && o(75, (Ne = e.beforeDeselectShape)),
        'beforeRemoveShape' in e && o(76, (He = e.beforeRemoveShape)),
        'beforeUpdateShape' in e && o(77, (Ge = e.beforeUpdateShape)),
        'willRenderShapeControls' in e && o(78, (Je = e.willRenderShapeControls)),
        'willStartInteraction' in e && o(79, (Qe = e.willStartInteraction)),
        'mapEditorPointToImagePoint' in e && o(80, (et = e.mapEditorPointToImagePoint)),
        'mapImagePointToEditorPoint' in e && o(81, (tt = e.mapImagePointToEditorPoint)),
        'eraseRadius' in e && o(82, (ot = e.eraseRadius)),
        'selectRadius' in e && o(83, (it = e.selectRadius)),
        'enableButtonFlipVertical' in e && o(84, (nt = e.enableButtonFlipVertical)),
        'enableTapToAddText' in e && o(85, (rt = e.enableTapToAddText)),
        'locale' in e && o(5, (at = e.locale))
    }),
    (e.$$.update = () => {
      var t, n
      if (
        (3 & e.$$.dirty[0] && o(116, (i = !Y && G && (Tt() || Ot()))),
        8388608 & e.$$.dirty[3] && o(117, (r = i && !di(i) ? i.id : void 0)),
        (8 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[1]) | (8388608 & e.$$.dirty[3]) &&
          o(9, (a = de && i && Bi(Ho(i), le))),
        8388608 & e.$$.dirty[3] && o(118, (s = !(!i || !di(i)))),
        (512 & e.$$.dirty[0]) | (134217728 & e.$$.dirty[1]) | (8388608 & e.$$.dirty[3]) &&
          o(119, (l = (i && ae && lo(a)) || [])),
        8388608 & e.$$.dirty[3] &&
          o(
            120,
            (c =
              i &&
              wi((t = i)) &&
              Si(t) &&
              !0 !== t.disableResize &&
              (ui(t) || ei(t) || oi(t) || ii(t)) &&
              !ai(i))
          ),
        8388608 & e.$$.dirty[3] &&
          o(
            10,
            (d =
              i &&
              ((e) => wi(e) && !0 !== e.disableRotate && (ui(e) || po(e, 'text') || oi(e)))(i) &&
              !ai(i))
          ),
        142606336 & e.$$.dirty[3] &&
          o(17, (u = c && po(i, 'text') && !i.height ? 'horizontal' : c)),
        75497472 & e.$$.dirty[3] && o(11, (h = i && l.length > 1)),
        (524288 & e.$$.dirty[2]) | (67108864 & e.$$.dirty[3]) && o(121, (p = l.map(tt))),
        (4 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[3]) &&
          o(12, (m = p.map((e) => ne(e.x - q.x, e.y - q.y)))),
        4096 & e.$$.dirty[0] && o(122, (g = m.length)),
        (524288 & e.$$.dirty[2]) | (4194304 & e.$$.dirty[3]) &&
          (ho && tt && !li(ho) && $i(ho)
            ? ((e) => {
                const t = lo(Bi(Ho(e), le))
                if (!t) return
                const i = t.map(tt),
                  n = !ri(e) && !ii(e),
                  r = {
                    id: 'markup-hover',
                    points: i.map((e) => ne(e.x + 1, e.y + 1)),
                    strokeColor: [0, 0, 0, 0.1],
                    strokeWidth: 2,
                    pathClose: n,
                  },
                  a = {
                    id: 'markup-hover',
                    points: i,
                    strokeColor: Me,
                    strokeWidth: 2,
                    pathClose: n,
                  },
                  s = X.filter((e) => 'markup-hover' !== e.id)
                o(51, (X = [...s, r, a]))
              })(ho)
            : uo()),
        (7680 & e.$$.dirty[0]) | (134217728 & e.$$.dirty[1]) &&
          o(
            123,
            (f =
              h &&
              d &&
              ae &&
              m &&
              ((e) => {
                const t = co(e),
                  o = tt({
                    x: t.origin.x + t.dir.x,
                    y: t.origin.y + t.dir.y,
                  })
                return {
                  origin: tt(t.origin),
                  position: o,
                }
              })(a))
          ),
        (4 & e.$$.dirty[0]) | (1073741824 & e.$$.dirty[3]) &&
          o(18, ($ = f && ne(f.position.x - q.x, f.position.y - q.y))),
        (134217728 & e.$$.dirty[1]) | (813694976 & e.$$.dirty[3]) && i && p && ae > 0)
      ) {
        const e = i && di(i) && ri(i)
        g > 2 && !e
          ? ((e, t) => {
              const i = [],
                n = 0.1 * e,
                r = e,
                a = [0, 0, 0],
                s = [1, 1, 1],
                l = !ri(t) && !ii(t)
              i.push({
                id: mo,
                points: p.map((e) => ne(e.x + 1, e.y + 1)),
                pathClose: l,
                strokeColor: a,
                strokeWidth: 2,
                opacity: n,
              }),
                f &&
                  i.push({
                    id: mo,
                    points: [
                      ne(f.origin.x + 1, f.origin.y + 1),
                      ne(f.position.x + 1, f.position.y + 1),
                    ],
                    strokeColor: a,
                    strokeWidth: 2,
                    opacity: n,
                  }),
                i.push({
                  id: mo,
                  points: p,
                  pathClose: l,
                  strokeColor: s,
                  strokeWidth: 1.5,
                  opacity: r,
                }),
                f &&
                  i.push({
                    id: mo,
                    points: [
                      {
                        x: f.origin.x,
                        y: f.origin.y,
                      },
                      {
                        x: f.position.x,
                        y: f.position.y,
                      },
                    ],
                    strokeColor: s,
                    strokeWidth: 1.5,
                    opacity: r,
                  }),
                o(51, (X = X.filter((e) => e.id !== mo).concat(i)))
            })(ae, i)
          : go()
      }
      8388608 & e.$$.dirty[3] && (i || go()),
        67108864 & e.$$.dirty[1] &&
          ((e) => {
            if (!e)
              return Dt({
                _prerender: !1,
              })
            const t = G.find((e) => e.isEditing)
            t &&
              zt(t, {
                _prerender: 'inline' === Ce,
              })
          })(re),
        144 & e.$$.dirty[0] && $o && 'inline' === Ce && $o.focus(),
        8388608 & e.$$.dirty[3] && o(124, (y = i && Jo(i))),
        (8388608 & e.$$.dirty[3]) | (1 & e.$$.dirty[4]) && o(13, (b = y && !1 !== xi(i) && ai(i))),
        8192 & e.$$.dirty[0] && o(125, (x = b ? { ...i } : void 0)),
        (268435456 & e.$$.dirty[1]) | (2 & e.$$.dirty[4]) && o(126, (v = x && Bi({ ...x }, le))),
        4 & e.$$.dirty[4] && o(127, (S = v && Lo(v.text, v))),
        12 & e.$$.dirty[4] && (k = v && qe(v.x, v.y, S.width, S.height)),
        (8192 & e.$$.dirty[0]) | (8388608 & e.$$.dirty[3]) && o(19, (M = b ? i.text : '')),
        8720 & e.$$.dirty[0] &&
          o(
            20,
            (C =
              b &&
              ((e, t) => {
                const {
                    textAlign: o = 'left',
                    fontFamily: i = 'sans-serif',
                    fontWeight: n = 'normal',
                    fontStyle: r = 'normal',
                  } = e,
                  a = e.fontSize,
                  s = '!important',
                  l = `text-align:${o}${s};font-family:${i}${s};font-weight:${n}${s};font-style:${r}${s};`
                if ('modal' === t) return l
                const c = wo(e.color),
                  d = e.lineHeight,
                  u = 0.5 * Math.max(0, a - d)
                return `--bottom-inset:${u}px;padding:${u}px 0 0${s};color:${c}${s};font-size:${a}px${s};line-height:${d}px${s};${l}`
              })(a, Ce))
          ),
        (8708 & e.$$.dirty[0]) | (37748736 & e.$$.dirty[1]) &&
          o(
            21,
            (P =
              b &&
              ((e, t, o, n) => {
                let r, s
                e.width && e.height
                  ? ((r = Ke(e)), (s = Te(e)))
                  : ((s = Lo(i.text, a)),
                    (s.width = a.width || s.width),
                    (r = ne(e.x + 0.5 * s.width, e.y + 0.5 * s.height)))
                const l = Math.max(0, e.fontSize - e.lineHeight) + e.lineHeight,
                  c = tt(r)
                let d = c.x - t.x - 0.5 * s.width,
                  u = c.y - t.y - 0.5 * s.height,
                  h = e.flipX,
                  p = e.flipY,
                  m = e.rotation
                J && Q
                  ? ((h = !h), (p = !p))
                  : J
                  ? ((h = !h), (m = -m))
                  : Q && ((p = !p), (m = -m)),
                  (m += n)
                const g = o * (h ? -1 : 1),
                  f = o * (p ? -1 : 1)
                return `--line-height:${l}px;width:${s.width}px;height:${s.height}px;transform:translate(${d}px,${u}px) rotate(${m}rad) scale(${g}, ${f})`
              })(a, q, te, K))
          ),
        8336 & e.$$.dirty[0] && b && $o && 'inline' === Ce && yo(M),
        (41943040 & e.$$.dirty[3]) | (16 & e.$$.dirty[4]) && o(128, (I = i && !s ? i : I)),
        16 & e.$$.dirty[4] && o(129, (R = I && bi(I))),
        16 & e.$$.dirty[4] && o(130, (A = I && vi(I))),
        16 & e.$$.dirty[4] && o(131, (E = I && ((e) => !0 !== e.disableDuplicate && Si(e))(I))),
        16 & e.$$.dirty[4] && o(132, (L = I && yi(I))),
        16 & e.$$.dirty[4] && o(133, (F = I && ((e) => !0 !== e.disableReorder)(I))),
        16 & e.$$.dirty[4] && o(134, (z = I && !1 !== xi(I))),
        16 & e.$$.dirty[4] && o(135, (B = I && po(I, 'backgroundImage') && fi(I, 'opacity'))),
        (8192 & e.$$.dirty[0]) | (44040192 & e.$$.dirty[3]) | (4096 & e.$$.dirty[4]) &&
          Oo.set(!i || s || ao || b ? 0 : 1, {
            hard: !1 === N,
          }),
        (4096 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[3]) | (8192 & e.$$.dirty[4]) &&
          o(
            137,
            (D = i && !s && m.length ? ((n = Xe(m)), me(ne(n.x + 0.5 * n.width, n.y), Ic)) : D)
          ),
        (256 & e.$$.dirty[0]) | (536870912 & e.$$.dirty[1]) | (8192 & e.$$.dirty[4]) &&
          o(
            138,
            (O =
              D &&
              Wo &&
              ve &&
              ((e) => {
                const t = ve.x,
                  o = ve.y,
                  i = t + ve.width
                let n = Math.max(e.x - 0.5 * Wo.width, t),
                  r = Math.max(e.y - Wo.height - 16, o)
                return n + Wo.width > i && (n = i - Wo.width), ne(n, r)
              })(D))
          ),
        (16384 & e.$$.dirty[0]) | (16384 & e.$$.dirty[4]) &&
          o(22, (V = O && `transform: translate(${O.x}px, ${O.y}px);opacity:${H}`)),
        (33 & e.$$.dirty[0]) |
          (4259840 & e.$$.dirty[2]) |
          (25165824 & e.$$.dirty[3]) |
          (4080 & e.$$.dirty[4]) &&
          o(
            23,
            (_ =
              r &&
              Je &&
              Tu(() =>
                Je(
                  [
                    B && [
                      'div',
                      'alpha',
                      {
                        class: 'PinturaShapeControlsGroup',
                      },
                      [
                        [
                          'Slider',
                          'adjust-opacity',
                          {
                            onrelease: Fo,
                            onchange: Eo,
                            step: 0.01,
                            value: po(i, 'opacity') ? i.opacity : 1,
                            label: (e, t, o) => Math.round((e / o) * 100) + '%',
                            min: 0,
                            max: 1,
                            direction: 'x',
                          },
                        ],
                      ],
                    ],
                    [
                      'div',
                      'beta',
                      {
                        class: 'PinturaShapeControlsGroup',
                      },
                      [
                        R && [
                          'Button',
                          'flip-horizontal',
                          {
                            onclick: Ro,
                            label: at.shapeTitleButtonFlipHorizontal,
                            icon: at.shapeIconButtonFlipHorizontal,
                            hideLabel: !0,
                          },
                        ],
                        R &&
                          nt && [
                            'Button',
                            'flip-vertical',
                            {
                              onclick: Ao,
                              label: at.shapeTitleButtonFlipVertical,
                              icon: at.shapeIconButtonFlipVertical,
                              hideLabel: !0,
                            },
                          ],
                        F && [
                          'Button',
                          'to-front',
                          {
                            onclick: Bo,
                            label: at.shapeTitleButtonMoveToFront,
                            icon: at.shapeIconButtonMoveToFront,
                            hideLabel: !0,
                            disabled: G[G.length - 1] === I,
                          },
                        ],
                        E && [
                          'Button',
                          'duplicate',
                          {
                            onclick: Do,
                            label: at.shapeTitleButtonDuplicate,
                            icon: at.shapeIconButtonDuplicate,
                            hideLabel: !0,
                          },
                        ],
                        L && [
                          'Button',
                          'remove',
                          {
                            onclick: zo,
                            label: at.shapeTitleButtonRemove,
                            icon: at.shapeIconButtonRemove,
                            hideLabel: !0,
                          },
                        ],
                      ].filter(Boolean),
                    ],
                    z &&
                      A && [
                        'div',
                        'gamma',
                        {
                          class: 'PinturaShapeControlsGroup',
                        },
                        [
                          [
                            'Button',
                            'text-layout',
                            {
                              onclick: Io,
                              label: Xc(_o, at, i),
                              icon: Xc(Vo, at, i),
                              hideLabel: !0,
                            },
                          ],
                        ],
                      ],
                    z && [
                      'div',
                      'delta',
                      {
                        class: 'PinturaShapeControlsGroup',
                      },
                      [
                        [
                          'Button',
                          'edit-text',
                          {
                            label: at.shapeLabelInputText,
                            onclick: Po,
                          },
                        ],
                      ],
                    ],
                  ].filter(Boolean),
                  r
                )
              ))
          ),
        33 & e.$$.dirty[0] &&
          o(
            24,
            (Z = G.filter($i)
              .filter((e) => !di(e))
              .map((e) => ({
                id: e.id,
                color: Jo(e) ? e.color : ii(e) ? e.strokeColor : e.backgroundColor,
                name: e.name || at['shapeLabelTool' + la(Ai(e))],
              })))
          )
    }),
    [
      G,
      Y,
      q,
      de,
      Ce,
      at,
      Ht,
      $o,
      Wo,
      a,
      d,
      h,
      m,
      b,
      H,
      Zo,
      Uo,
      u,
      $,
      M,
      C,
      P,
      V,
      _,
      Z,
      st,
      $t,
      (e) => {
        const { origin: t } = e.detail
        ;(oo = void 0),
          (io = void 0),
          (no = void 0),
          (ro = !1),
          (to = void 0),
          clearTimeout(eo),
          (eo = setTimeout(() => o(114, (ao = !0)), 250))
        Tt() && Rt()
        const n = et(se(t)),
          r = Jt(n, it, (e) => $i(e)),
          a = r.length && r.shift()
        if ((i && ai(i) && So(), !a && i && ai(i) && Ut(i), !Qe(t))) return
        if (a && li(a)) return (ro = !0), (oo = a), (io = Ho(oo)), void (no = Bi(Ho(oo), le))
        to = a
        !Pe(e) && a && (Ht(a), (oo = a), (io = Ho(oo)), (no = Bi(Ho(oo), le)))
      },
      (e) => {
        so(), Le(e)
      },
      (e) => {
        const { translation: t } = e.detail
        if (oo) {
          if (!Si(oo)) return
          if (ai(oo)) return
          return wt(oo, no, t)
        }
        Ie(e)
      },
      (e) => {
        so(),
          oo ? (ai(oo) ? ko() : e.detail.isTap && ro && Jo(oo) && !1 !== xi(oo) && Xt(oo)) : Re(e)
      },
      (e) => {
        const t = to && e.detail.isTap
        if (oo)
          return (
            We(oo),
            (o = oo),
            (i = io),
            JSON.stringify(o) !== JSON.stringify(i) && ze(oo),
            void (oo = void 0)
          )
        var o, i
        const n = Nt(),
          r = !n || Ne(n, to || void 0)
        r &&
          jt({
            storePrevious: !1,
          }),
          Ee(e),
          r && t && Ht(to)
      },
      (e) => {
        o(114, (ao = !0)), (oo = i), (no = a)
      },
      (e) => {
        if (!oo) return void o(114, (ao = !1))
        const { translation: t, indexes: i, shiftKey: n } = e.detail
        ;((e, t, o, i, n) => {
          if (ii(e)) {
            const [n] = o,
              r = j.includes(16)
                ? (e, t) => {
                    const o = xe(e, t),
                      i = he(e, t),
                      n = Math.PI / 4,
                      r = n * Math.round(i / n) - (K % n)
                    ;(t.x = e.x + o * Math.cos(r)), (t.y = e.y + o * Math.sin(r))
                  }
                : (e, t) => t
            if (0 === n) {
              const o = bt(qo(t), i)
              r(ne(t.x2, t.y2), o),
                ct(
                  e,
                  {
                    x1: o.x,
                    y1: o.y,
                  },
                  le
                )
            } else if (1 === n) {
              const o = bt(Ko(t), i)
              r(ne(t.x1, t.y1), o),
                ct(
                  e,
                  {
                    x2: o.x,
                    y2: o.y,
                  },
                  le
                )
            }
          } else if (ui(e) || oi(e) || ei(e)) {
            let r,
              a,
              s = !1
            if (oi(e)) r = Ye(t)
            else if (ui(e)) r = Ue(t)
            else {
              ;(s = !0), (r = Ue(t))
              const e = Lo(t.text, t)
              r.height = e.height
            }
            e.aspectRatio ? (a = e.aspectRatio) : n.shiftKey && !s && (a = r.width / r.height)
            const l = Ue(r),
              c = Ke(l),
              d = e.rotation,
              u = mt(l),
              h = lt(l, d)
            if (1 === o.length) {
              let t = o[0]
              e.flipX && (t = St[t]), e.flipY && (t = Mt[t])
              const [n, r, s, l] = u,
                p = tt(h[t])
              ge(p, i)
              const m = et(p),
                g = ne(m.x - h[t].x, m.y - h[t].y),
                f = ce(se(g), -d),
                $ = ne(u[t].x + f.x, u[t].y + f.y)
              let y
              0 === t && (y = s), 1 === t && (y = l), 2 === t && (y = n), 3 === t && (y = r)
              const b = Xe([y, $])
              if (a) {
                const { width: e, height: t } = ht(b, a),
                  [o, i, n, r] = pt(b)
                ;(b.width = e),
                  (b.height = t),
                  $.y < y.y && (b.y = n - t),
                  $.x < y.x && (b.x = i - e)
              }
              const x = lt(b, d, c),
                v = we(x),
                w = ce(x[0], -d, v),
                S = ce(x[2], -d, v),
                k = Xe([w, S])
              ct(e, oi(e) ? oe(k) : k, le)
            } else {
              o = o.map((t) => (e.flipX && (t = St[t]), e.flipY && (t = Mt[t]), t))
              const [t, n] = o.map((e) => h[e]),
                r = {
                  x: t.x + 0.5 * (n.x - t.x),
                  y: t.y + 0.5 * (n.y - t.y),
                },
                [l, p] = o.map((e) => u[e]),
                [m, g] = o.map((e) => {
                  const t = e + 2
                  return t < 4 ? u[t] : u[t - 4]
                }),
                f = {
                  x: m.x + 0.5 * (g.x - m.x),
                  y: m.y + 0.5 * (g.y - m.y),
                },
                $ = tt(r)
              ge($, i)
              const y = et($),
                b = ne(y.x - r.x, y.y - r.y),
                x = ce(se(b), -d),
                v = fe(se(l), p),
                w = me(v, (e) => 1 - Math.abs(Math.sign(e))),
                S = ne(x.x * w.x, x.y * w.y)
              ge(l, S), ge(p, S)
              const k = Xe(u)
              if (a) {
                let e = k.width,
                  t = k.height
                0 === w.y ? (t = e / a) : (e = t * a),
                  (k.width = e),
                  (k.height = t),
                  0 === w.y ? (k.y = f.y - 0.5 * t) : (k.x = f.x - 0.5 * e)
              }
              const M = lt(k, d, c),
                C = we(M),
                T = ce(M[0], -d, C),
                P = ce(M[2], -d, C),
                I = Xe([T, P])
              let R
              oi(e)
                ? (R = oe(I))
                : ui(e)
                ? (R = I)
                : s &&
                  (R = {
                    x: I.x,
                    y: I.y,
                    width: I.width,
                  }),
                ct(e, R, le)
            }
          }
          Et()
        })(oo, no, i, t, {
          shiftKey: n,
        })
      },
      (e) => {
        if (!oo) return void o(114, (ao = !1))
        Ht(oo)
        const { isTap: t } = e.detail
        t && We(oo), (oo = void 0), o(114, (ao = !1)), ze(i)
      },
      (e) => {
        ;(Ct = co(a).origin), o(114, (ao = !0)), (oo = i), (no = a)
      },
      (e) => {
        if (!oo) return void o(114, (ao = !1))
        const { translation: t, shiftKey: i } = e.detail
        ;((e, t, o, i) => {
          const n = Kt(Bi(Ho(e), le)),
            r = Ke(n),
            a = bt(Ct, o)
          let s = he(a, r) + Math.PI / 2
          if (i.shiftKey) {
            const e = Math.PI / 16
            s = e * Math.round(s / e) - (K % e)
          }
          ct(
            e,
            {
              rotation: s,
            },
            le
          ),
            Et()
        })(oo, 0, t, {
          shiftKey: i,
        })
      },
      () => {
        oo ? (Ht(oo), (oo = void 0), o(114, (ao = !1)), ze(i)) : o(114, (ao = !1))
      },
      (e) => {
        if (!Wt()) return
        const { key: t } = e
        if (/escape/i.test(t)) return e.preventDefault(), e.stopPropagation(), Ut(i)
        ;/backspace/i.test(t) && !fo(e.target) && (e.preventDefault(), _t())
      },
      (e) => {
        const t = xi(i, e)
        return !0 === t ? e : t
      },
      xo,
      (e) => {
        const { target: t, key: o } = e,
          n = t.value || t.innerText,
          r = t.selectionStart || 0,
          a = t.selectionEnd || n.length,
          s = n.substring(0, r) + o + n.substring(a)
        if (xi(i, s) !== s) return e.preventDefault()
      },
      (e) =>
        Qo(i) && /enter/i.test(e.code)
          ? e.preventDefault()
          : /arrow/i.test(e.code)
          ? e.stopPropagation()
          : /escape/i.test(e.key)
          ? ko()
          : void 0,
      (e) => {
        const { key: t, ctrlKey: o, altKey: i } = e
        if (/enter/i.test(t) && (o || i)) return So()
      },
      So,
      ko,
      Oo,
      (e) => {
        const t = Ot()
        t && (ai(t) || (Si(t) && ((oo = t), (no = Bi(Ho(oo), le)), wt(oo, no, e.detail))))
      },
      (e) => {
        o(15, (Zo = !0))
      },
      ({ relatedTarget: e }) => {
        ;(e && e.classList.contains('shape-selector__button')) || o(15, (Zo = !1))
      },
      (e) => {
        if (ao || eo) return No(void 0)
        const t = of(e, de),
          o = me(et(t), (e) => Math.round(e))
        if (pe(o, jo)) return
        ;(jo = se(o)), Ze(t, o)
        const [i] = Jt(o, 0, $i)
        ;(i && di(i)) || No(i)
      },
      X,
      U,
      K,
      J,
      Q,
      te,
      re,
      ae,
      le,
      ve,
      Me,
      Pe,
      Ie,
      Re,
      Ee,
      Le,
      Fe,
      ze,
      Be,
      De,
      We,
      _e,
      Ze,
      je,
      Ne,
      He,
      Ge,
      Je,
      Qe,
      et,
      tt,
      ot,
      it,
      nt,
      rt,
      (e, t = {}) => {
        let o,
          i,
          n,
          r = oi(e),
          a = Jo(e),
          s = 'relative' === t.position
        return ri(e)
          ? {
              start: (t) => {
                const { origin: r } = t.detail
                ;(i = 4), (o = se(r)), (n = se(r))
                const a = et(r)
                s && ((a.x = s ? vo(a.x, le.width) : a.x), (a.y = s ? vo(a.y, le.height) : a.y)),
                  It({ ...e, points: [a] })
              },
              update: (e) => {
                const t = Tt(),
                  { translation: r } = e.detail,
                  a = ne(o.x + r.x, o.y + r.y),
                  l = xe(n, a)
                if (ee(l, 5) <= i) return
                const c = he(a, n),
                  d = i - l
                ;(n.x += d * Math.cos(c)), (n.y += d * Math.sin(c))
                const u = et(n)
                u && ((u.x = s ? vo(u.x, le.width) : u.x), (u.y = s ? vo(u.y, le.height) : u.y)),
                  (t.points = t.points.concat(u)),
                  Et()
              },
              release: (e) => e.detail.preventInertia(),
              cancel: (e) => {
                At()
              },
              end: (e) => {
                if (e.detail.isTap) return At()
                const t = Rt()
                Fe(t)
              },
            }
          : r || a || ti(e)
          ? {
              start: (t) => {
                const { origin: i } = t.detail
                o = se(i)
                const n = et(o),
                  a = {
                    ...e,
                    rotation: -1 * yt(K, J, Q),
                    x: s ? vo(n.x, le.width) : n.x,
                    y: s ? vo(n.y, le.height) : n.y,
                  }
                ;(a.flipX = J),
                  (a.flipY = Q),
                  delete a.position,
                  (a.opacity = 0),
                  r
                    ? ((a.rx = s ? '0%' : 0), (a.ry = s ? '0%' : 0))
                    : ((a.width = s ? '0%' : 0), (a.height = s ? '0%' : 0)),
                  It(a)
              },
              update: (e) => {
                const t = Tt()
                t.opacity = 1
                const { aspectRatio: i } = t
                let { translation: n } = e.detail
                if (i) {
                  const e = Math.abs(n.x) * i
                  ;(n.x = n.x), (n.y = e * Math.sign(n.y))
                }
                const a = ne(o.x + n.x, o.y + n.y),
                  s = et(o),
                  l = et(a),
                  c = {
                    x: s.x + 0.5 * (l.x - s.x),
                    y: s.y + 0.5 * (l.y - s.y),
                  },
                  d = yt(K, J, Q)
                ce(s, d, c), ce(l, d, c)
                const u = Math.min(s.x, l.x),
                  h = Math.min(s.y, l.y)
                let p = Math.max(s.x, l.x) - u,
                  m = Math.max(s.y, l.y) - h,
                  g = {}
                r
                  ? ((g.x = u + 0.5 * p), (g.y = h + 0.5 * m), (g.rx = 0.5 * p), (g.ry = 0.5 * m))
                  : ((g.x = u), (g.y = h), (g.width = p), (g.height = m)),
                  ct(t, g, le),
                  Et()
              },
              release: (e) => {
                e.detail.preventInertia()
              },
              cancel: (e) => {
                At()
              },
              end: (e) => {
                const t = Tt()
                if (e.detail.isTap) {
                  if (!Jo(t) || !rt || to) return At()
                  delete t.width, delete t.height, delete t.textAlign
                  const e = Bi({ ...t }, le),
                    i = Lo(t.text, e)
                  ;(i.width *= te), (i.height *= te)
                  const n = et({
                      x: o.x,
                      y: o.y - 0.5 * i.height,
                    }),
                    r = et({
                      x: o.x + i.width,
                      y: o.y + 0.5 * i.height,
                    }),
                    a = {
                      x: n.x + 0.5 * (r.x - n.x),
                      y: n.y + 0.5 * (r.y - n.y),
                    },
                    s = yt(K, J, Q)
                  ce(n, s, a), ce(r, s, a)
                  const l = Math.min(n.x, r.x),
                    c = Math.min(n.y, r.y)
                  ;(t.x = w(t.x) ? vo(l, le.width) : l), (t.y = w(t.y) ? vo(c, le.height) : c)
                }
                if (((t.opacity = 1), !Jo(t))) {
                  const e = Rt()
                  Fe(e)
                }
                Ht(t), Jo(t) && Xt(t)
              },
            }
          : ii(e)
          ? {
              start: (t) => {
                const { origin: i } = t.detail,
                  n = et(i),
                  r = me(n, Ic)
                ;(o = se(i)),
                  It({
                    ...e,
                    x1: s ? vo(r.x, le.width) : r.x,
                    y1: s ? vo(r.y, le.height) : r.y,
                    x2: s ? vo(r.x, le.width) : r.x,
                    y2: s ? vo(r.y, le.height) : r.y,
                    opacity: 0,
                  })
              },
              update: (e) => {
                const t = Tt(),
                  { translation: i } = e.detail,
                  n = ge(se(o), i)
                if (j.includes(16)) {
                  const e = xe(o, n),
                    t = he(o, n),
                    i = Math.PI / 4,
                    r = i * Math.round(t / i)
                  ;(n.x = o.x + e * Math.cos(r)), (n.y = o.y + e * Math.sin(r))
                }
                const r = et(n)
                zt(t, {
                  x2: s ? vo(r.x, le.width) : r.x,
                  y2: s ? vo(r.y, le.height) : r.y,
                  opacity: 1,
                }),
                  Et()
              },
              release: (e) => e.detail.preventInertia(),
              cancel: (e) => {
                At()
              },
              end: (e) => {
                const t = Tt()
                if (e.detail.isTap) return At()
                t.opacity = 1
                const o = Rt()
                Fe(o), Ht(o)
              },
            }
          : void 0
      },
      () => {
        let e, t
        const o = ot * ot,
          i = (e, t, i = !1) => {
            const n = be(e, t)
            if (!i && n < 2) return !1
            const r = G.filter((e) => !e.disableErase)
            let a
            a = n < o ? Jt(et(t), ot) : Qt(r, et(e), et(t), ot)
            return Gt(a).forEach(De), !0
          }
        return {
          start: (o) => {
            ;(e = ne(Math.round(o.detail.origin.x), Math.round(o.detail.origin.y))),
              i(e, e, !0),
              (t = e)
          },
          update: (o) => {
            const { translation: n } = o.detail,
              r = ne(Math.round(e.x + n.x), Math.round(e.y + n.y))
            i(t, r) && (t = se(r))
          },
          release: (e) => e.detail.preventInertia(),
          end: () => {},
        }
      },
      Tt,
      Pt,
      It,
      Rt,
      At,
      (e = {}) => ({
        id: T(),
        ...e,
      }),
      Et,
      Lt,
      Ft,
      zt,
      Bt,
      (e, t, o = !0) => {
        G.forEach((o) => Bt(o, e, t, !1)), o && Et()
      },
      Dt,
      Ot,
      Wt,
      Vt,
      _t,
      jt,
      Ut,
      Xt,
      Yt,
      Gt,
      qt,
      Kt,
      Jt,
      Qt,
      ao,
      ho,
      i,
      r,
      s,
      l,
      c,
      p,
      g,
      f,
      y,
      x,
      v,
      S,
      I,
      R,
      A,
      E,
      L,
      F,
      z,
      B,
      N,
      D,
      O,
      function (t) {
        pr(e, t)
      },
      (e) => Ht(G[e]),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;($o = e), o(7, $o)
        })
      },
      function () {
        ;(M = this.value), o(19, M), o(13, b), o(116, i), o(124, y), o(1, Y), o(0, G)
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;($o = e), o(7, $o)
        })
      },
      () => {
        Uo && Uo.focus()
      },
      (e) => o(8, (Wo = e.detail)),
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(Uo = e), o(16, Uo)
        })
      },
      (e) => of(e, de),
    ]
  )
}
class Mf extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        kf,
        wf,
        xn,
        {
          uid: 52,
          ui: 51,
          disabled: 1,
          markup: 0,
          offset: 2,
          contextRotation: 53,
          contextFlipX: 54,
          contextFlipY: 55,
          contextZoom: 56,
          active: 57,
          opacity: 58,
          parentRect: 59,
          rootRect: 3,
          utilRect: 60,
          hoverColor: 61,
          textInputMode: 4,
          oninteractionstart: 62,
          oninteractionupdate: 63,
          oninteractionrelease: 64,
          oninteractionend: 65,
          oninteractioncancel: 66,
          onaddshape: 67,
          onupdateshape: 68,
          onselectshape: 69,
          onremoveshape: 70,
          ontapshape: 71,
          onhovershape: 72,
          onhovercanvas: 73,
          beforeSelectShape: 74,
          beforeDeselectShape: 75,
          beforeRemoveShape: 76,
          beforeUpdateShape: 77,
          willRenderShapeControls: 78,
          willStartInteraction: 79,
          mapEditorPointToImagePoint: 80,
          mapImagePointToEditorPoint: 81,
          eraseRadius: 82,
          selectRadius: 83,
          enableButtonFlipVertical: 84,
          enableTapToAddText: 85,
          locale: 5,
          createShape: 86,
          eraseShape: 87,
          getMarkupItemDraft: 88,
          getMarkupItemDraftIndex: 89,
          addMarkupItemDraft: 90,
          confirmMarkupItemDraft: 91,
          discardMarkupItemDraft: 92,
          createMarkupItem: 93,
          syncShapes: 94,
          addShape: 95,
          removeMarkupShapeProps: 96,
          updateMarkupShape: 97,
          updateMarkupShapeProperty: 98,
          updateMarkupItemsShapeProperty: 99,
          updateMarkupShapeItems: 100,
          getActiveMarkupItem: 101,
          hasActiveMarkupItem: 102,
          removeShape: 103,
          removeActiveMarkupItem: 104,
          blurShapes: 105,
          selectShape: 6,
          deselectMarkupItem: 106,
          editMarkupItem: 107,
          finishEditMarkupItem: 108,
          removeMarkupItems: 109,
          getTextShapeRect: 110,
          getMarkupShapeRect: 111,
          getShapesNearPosition: 112,
          getShapesBetweenPoints: 113,
        },
        [-1, -1, -1, -1, -1, -1, -1]
      )
  }
  get createShape() {
    return this.$$.ctx[86]
  }
  get eraseShape() {
    return this.$$.ctx[87]
  }
  get getMarkupItemDraft() {
    return this.$$.ctx[88]
  }
  get getMarkupItemDraftIndex() {
    return this.$$.ctx[89]
  }
  get addMarkupItemDraft() {
    return this.$$.ctx[90]
  }
  get confirmMarkupItemDraft() {
    return this.$$.ctx[91]
  }
  get discardMarkupItemDraft() {
    return this.$$.ctx[92]
  }
  get createMarkupItem() {
    return this.$$.ctx[93]
  }
  get syncShapes() {
    return this.$$.ctx[94]
  }
  get addShape() {
    return this.$$.ctx[95]
  }
  get removeMarkupShapeProps() {
    return this.$$.ctx[96]
  }
  get updateMarkupShape() {
    return this.$$.ctx[97]
  }
  get updateMarkupShapeProperty() {
    return this.$$.ctx[98]
  }
  get updateMarkupItemsShapeProperty() {
    return this.$$.ctx[99]
  }
  get updateMarkupShapeItems() {
    return this.$$.ctx[100]
  }
  get getActiveMarkupItem() {
    return this.$$.ctx[101]
  }
  get hasActiveMarkupItem() {
    return this.$$.ctx[102]
  }
  get removeShape() {
    return this.$$.ctx[103]
  }
  get removeActiveMarkupItem() {
    return this.$$.ctx[104]
  }
  get blurShapes() {
    return this.$$.ctx[105]
  }
  get selectShape() {
    return this.$$.ctx[6]
  }
  get deselectMarkupItem() {
    return this.$$.ctx[106]
  }
  get editMarkupItem() {
    return this.$$.ctx[107]
  }
  get finishEditMarkupItem() {
    return this.$$.ctx[108]
  }
  get removeMarkupItems() {
    return this.$$.ctx[109]
  }
  get getTextShapeRect() {
    return this.$$.ctx[110]
  }
  get getMarkupShapeRect() {
    return this.$$.ctx[111]
  }
  get getShapesNearPosition() {
    return this.$$.ctx[112]
  }
  get getShapesBetweenPoints() {
    return this.$$.ctx[113]
  }
}

function Cf(e, t, o) {
  const i = e.slice()
  return (i[9] = t[o]), i
}

function Tf(e, t) {
  let o,
    i,
    n,
    r,
    a,
    s,
    l,
    c = Xc(t[9].componentProps.title, t[1]) + ''
  const d = [t[9].componentProps]
  var u = t[9].component

  function h(e) {
    let t = {}
    for (let e = 0; e < d.length; e += 1) t = gn(t, d[e])
    return {
      props: t,
    }
  }
  return (
    u && (a = new u(h())),
    {
      key: e,
      first: null,
      c() {
        ;(o = Vn('li')),
          (i = Vn('span')),
          (n = Zn(c)),
          (r = jn()),
          a && Hr(a.$$.fragment),
          (s = jn()),
          Yn(i, 'class', 'PinturaShapeStyleLabel'),
          Yn(o, 'class', 'PinturaShapeStyle'),
          (this.first = o)
      },
      m(e, t) {
        On(e, o, t), Dn(o, i), Dn(i, n), Dn(o, r), a && Ur(a, o, null), Dn(o, s), (l = !0)
      },
      p(e, i) {
        ;(t = e), (!l || 3 & i) && c !== (c = Xc(t[9].componentProps.title, t[1]) + '') && qn(n, c)
        const r = 1 & i ? Zr(d, [jr(t[9].componentProps)]) : {}
        if (u !== (u = t[9].component)) {
          if (a) {
            Er()
            const e = a
            zr(e.$$.fragment, 1, 0, () => {
              Xr(e, 1)
            }),
              Lr()
          }
          u ? ((a = new u(h())), Hr(a.$$.fragment), Fr(a.$$.fragment, 1), Ur(a, o, s)) : (a = null)
        } else u && a.$set(r)
      },
      i(e) {
        l || (a && Fr(a.$$.fragment, e), (l = !0))
      },
      o(e) {
        a && zr(a.$$.fragment, e), (l = !1)
      },
      d(e) {
        e && Wn(o), a && Xr(a)
      },
    }
  )
}

function Pf(e) {
  let t,
    o,
    i = [],
    n = new Map(),
    r = e[0]
  const a = (e) => e[9].id
  for (let t = 0; t < r.length; t += 1) {
    let o = Cf(e, r, t),
      s = a(o)
    n.set(s, (i[t] = Tf(s, o)))
  }
  return {
    c() {
      t = Vn('ul')
      for (let e = 0; e < i.length; e += 1) i[e].c()
      Yn(t, 'class', 'PinturaShapeStyleList')
    },
    m(e, n) {
      On(e, t, n)
      for (let e = 0; e < i.length; e += 1) i[e].m(t, null)
      o = !0
    },
    p(e, o) {
      3 & o && ((r = e[0]), Er(), (i = _r(i, o, a, 1, e, r, n, t, Vr, Tf, null, Cf)), Lr())
    },
    i(e) {
      if (!o) {
        for (let e = 0; e < r.length; e += 1) Fr(i[e])
        o = !0
      }
    },
    o(e) {
      for (let e = 0; e < i.length; e += 1) zr(i[e])
      o = !1
    },
    d(e) {
      e && Wn(t)
      for (let e = 0; e < i.length; e += 1) i[e].d()
    },
  }
}

function If(e) {
  let t, o, i
  return (
    (o = new dc({
      props: {
        class: 'PinturaShapeStyles',
        elasticity: e[2],
        $$slots: {
          default: [Pf],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'style', e[3])
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, [n]) {
        const r = {}
        4 & n && (r.elasticity = e[2]),
          4099 & n &&
            (r.$$scope = {
              dirty: n,
              ctx: e,
            }),
          o.$set(r),
          (!i || 8 & n) && Yn(t, 'style', e[3])
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function Rf(e, t, o) {
  let i,
    n,
    r,
    { isActive: a = !1 } = t,
    { controls: s = [] } = t,
    { locale: l } = t,
    { scrollElasticity: c } = t
  const d = hr('isAnimated')
  Sn(e, d, (e) => o(7, (n = e)))
  const u = ys(0, {
    stiffness: 0.25,
    damping: 0.9,
  })
  return (
    Sn(e, u, (e) => o(8, (r = e))),
    (e.$$set = (e) => {
      'isActive' in e && o(6, (a = e.isActive)),
        'controls' in e && o(0, (s = e.controls)),
        'locale' in e && o(1, (l = e.locale)),
        'scrollElasticity' in e && o(2, (c = e.scrollElasticity))
    }),
    (e.$$.update = () => {
      192 & e.$$.dirty &&
        u.set(a ? 1 : 0, {
          hard: !1 === n,
        }),
        320 & e.$$.dirty &&
          o(
            3,
            (i = `opacity:${r};${a ? '' : 'pointer-events:none;'}${
              r <= 0 ? 'visibility:hidden' : ''
            }`)
          )
    }),
    [s, l, c, i, d, u, a, n, r]
  )
}
class Af extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Rf, If, xn, {
        isActive: 6,
        controls: 0,
        locale: 1,
        scrollElasticity: 2,
      })
  }
}

function Ef(e, t, o) {
  const i = e.slice()
  return (i[11] = t[o].key), (i[2] = t[o].controls), (i[12] = t[o].isActive), i
}

function Lf(e, t) {
  let o, i, n
  return (
    (i = new Af({
      props: {
        isActive: t[12],
        controls: t[2],
        locale: t[0],
        scrollElasticity: t[1],
      },
    })),
    {
      key: e,
      first: null,
      c() {
        ;(o = Nn()), Hr(i.$$.fragment), (this.first = o)
      },
      m(e, t) {
        On(e, o, t), Ur(i, e, t), (n = !0)
      },
      p(e, o) {
        t = e
        const n = {}
        8 & o && (n.isActive = t[12]),
          8 & o && (n.controls = t[2]),
          1 & o && (n.locale = t[0]),
          2 & o && (n.scrollElasticity = t[1]),
          i.$set(n)
      },
      i(e) {
        n || (Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && Wn(o), Xr(i, e)
      },
    }
  )
}

function Ff(e) {
  let t,
    o,
    i = [],
    n = new Map(),
    r = e[3]
  const a = (e) => e[11]
  for (let t = 0; t < r.length; t += 1) {
    let o = Ef(e, r, t),
      s = a(o)
    n.set(s, (i[t] = Lf(s, o)))
  }
  return {
    c() {
      t = Vn('div')
      for (let e = 0; e < i.length; e += 1) i[e].c()
      Yn(t, 'class', 'PinturaShapeStyleEditor')
    },
    m(e, n) {
      On(e, t, n)
      for (let e = 0; e < i.length; e += 1) i[e].m(t, null)
      o = !0
    },
    p(e, [o]) {
      11 & o && ((r = e[3]), Er(), (i = _r(i, o, a, 1, e, r, n, t, Vr, Lf, null, Ef)), Lr())
    },
    i(e) {
      if (!o) {
        for (let e = 0; e < r.length; e += 1) Fr(i[e])
        o = !0
      }
    },
    o(e) {
      for (let e = 0; e < i.length; e += 1) zr(i[e])
      o = !1
    },
    d(e) {
      e && Wn(t)
      for (let e = 0; e < i.length; e += 1) i[e].d()
    },
  }
}

function zf(e, t, o) {
  let i,
    n,
    r,
    { controls: a = {} } = t,
    { shape: s } = t,
    { onchange: l } = t,
    { locale: c } = t,
    { scrollElasticity: d } = t
  const u = []
  return (
    (e.$$set = (e) => {
      'controls' in e && o(2, (a = e.controls)),
        'shape' in e && o(4, (s = e.shape)),
        'onchange' in e && o(5, (l = e.onchange)),
        'locale' in e && o(0, (c = e.locale)),
        'scrollElasticity' in e && o(1, (d = e.scrollElasticity))
    }),
    (e.$$.update = () => {
      4 & e.$$.dirty && o(6, (i = Object.keys(a).filter((e) => a[e]))),
        80 & e.$$.dirty &&
          o(
            7,
            (n =
              s && Object.keys(s).length && i && fi(s)
                ? ((e) =>
                    i
                      .filter((t) => t.split('_').every((t) => po(e, t) && fi(e, t)))
                      .map((t) => {
                        const o = t.split('_'),
                          i = o.length > 1 ? o.map((t) => e[t]) : e[t]
                        let [n, r] = a[t]
                        if (w(n))
                          if (a[n]) {
                            const e = { ...r }
                            ;([n, r] = a[n]), (r = { ...r, ...e })
                          } else {
                            if ('Dropdown' !== n) return
                            n = zd
                          }
                        const s = S(r.options) ? r.options(e) : r.options
                        return {
                          id: t,
                          component: n,
                          componentProps: {
                            ...r,
                            options: s,
                            locale: c,
                            value: i,
                            optionLabelClass: 'PinturaButtonLabel',
                            onchange: (i) => {
                              const n = b(i) && !mo(i) ? i.value : i
                              r.onchange && r.onchange(n, e)
                              const a =
                                o.length > 1
                                  ? o.reduce(
                                      (e, t, o) => ({ ...e, [t]: Array.isArray(n) ? n[o] : n }),
                                      {}
                                    )
                                  : {
                                      [t]: n,
                                    }
                              l(a)
                            },
                          },
                        }
                      })
                      .filter(Boolean))(s)
                : [])
          ),
        144 & e.$$.dirty &&
          o(
            3,
            (r = ((e, t) => {
              let o = u.find((t) => t.key === e)
              return (
                o ||
                  ((o = {
                    key: e,
                    controls: t,
                  }),
                  u.push(o)),
                u.forEach((e) => (e.isActive = !1)),
                (o.controls = t),
                (o.isActive = !0),
                u
              )
            })(s && Object.keys(s).length ? Object.keys(s).join('_') : 'none', n || []))
          )
    }),
    [c, d, a, r, s, l, i, n]
  )
}
class Bf extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, zf, Ff, xn, {
        controls: 2,
        shape: 4,
        onchange: 5,
        locale: 0,
        scrollElasticity: 1,
      })
  }
}
const { document: Df } = Or

function Of(e) {
  let t, o, i, n
  return {
    c() {
      ;(t = jn()),
        (o = Vn('button')),
        Yn(o, 'class', 'PinturaDragButton'),
        Yn(o, 'title', e[1]),
        (o.disabled = e[2])
    },
    m(r, a) {
      On(r, t, a),
        On(r, o, a),
        (o.innerHTML = e[0]),
        e[11](o),
        i ||
          ((n = [
            Hn(Df.body, 'load', e[5], !0),
            Hn(Df.body, 'error', e[6], !0),
            Hn(o, 'pointerdown', e[4]),
          ]),
          (i = !0))
    },
    p(e, [t]) {
      1 & t && (o.innerHTML = e[0]), 2 & t && Yn(o, 'title', e[1]), 4 & t && (o.disabled = e[2])
    },
    i: pn,
    o: pn,
    d(r) {
      r && Wn(t), r && Wn(o), e[11](null), (i = !1), yn(n)
    },
  }
}

function Wf(e, t, o) {
  let i,
    { html: r } = t,
    { title: a } = t,
    { onclick: s } = t,
    { disabled: l = !1 } = t,
    { ongrab: c = n } = t,
    { ondrag: d = n } = t,
    { ondrop: u = n } = t
  const h = (e) => be(p, ne(e.pageX, e.pageY)) < 256
  let p
  const m = (e) => {
      document.documentElement.removeEventListener('pointermove', g),
        document.documentElement.removeEventListener('pointerup', m)
      const t = ne(e.pageX, e.pageY)
      if (be(p, t) < 32) return s(e)
      h(e) || u(e)
    },
    g = (e) => {
      h(e) || d(e)
    },
    f = (e) => i && i.contains(e) && 'IMG' === e.nodeName
  return (
    (e.$$set = (e) => {
      'html' in e && o(0, (r = e.html)),
        'title' in e && o(1, (a = e.title)),
        'onclick' in e && o(7, (s = e.onclick)),
        'disabled' in e && o(2, (l = e.disabled)),
        'ongrab' in e && o(8, (c = e.ongrab)),
        'ondrag' in e && o(9, (d = e.ondrag)),
        'ondrop' in e && o(10, (u = e.ondrop))
    }),
    (e.$$.update = () => {
      8 & e.$$.dirty && i && i.querySelector('img') && o(3, (i.dataset.loader = !0), i)
    }),
    [
      r,
      a,
      l,
      i,
      (e) => {
        ;(p = ne(e.pageX, e.pageY)),
          c(e),
          document.documentElement.addEventListener('pointermove', g),
          document.documentElement.addEventListener('pointerup', m)
      },
      ({ target: e }) => {
        f(e) && o(3, (i.dataset.load = !0), i)
      },
      ({ target: e }) => {
        f(e) && o(3, (i.dataset.error = !0), i)
      },
      s,
      c,
      d,
      u,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(i = e), o(3, i)
        })
      },
    ]
  )
}
class Vf extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Wf, Of, xn, {
        html: 0,
        title: 1,
        onclick: 7,
        disabled: 2,
        ongrab: 8,
        ondrag: 9,
        ondrop: 10,
      })
  }
}

function _f(e, t, o) {
  const i = e.slice()
  return (i[14] = t[o]), i
}

function Zf(e, t) {
  let o, i, n, r, a, s, l

  function c() {
    return t[10](t[14])
  }

  function d(...e) {
    return t[11](t[14], ...e)
  }

  function u(...e) {
    return t[12](t[14], ...e)
  }

  function h(...e) {
    return t[13](t[14], ...e)
  }
  return (
    (i = new Vf({
      props: {
        onclick: c,
        ongrab: d,
        ondrag: u,
        ondrop: h,
        disabled: t[1] || t[14].disabled,
        title: t[14].title,
        html: t[14].thumb,
      },
    })),
    {
      key: e,
      first: null,
      c() {
        ;(o = Vn('li')),
          Hr(i.$$.fragment),
          (n = jn()),
          Yn(o, 'class', 'PinturaShapePreset'),
          Yn(o, 'style', t[6]),
          (this.first = o)
      },
      m(e, c) {
        On(e, o, c),
          Ur(i, o, null),
          Dn(o, n),
          (a = !0),
          s || ((l = Rn((r = t[8].call(null, o, t[14])))), (s = !0))
      },
      p(e, n) {
        t = e
        const s = {}
        5 & n && (s.onclick = c),
          9 & n && (s.ongrab = d),
          17 & n && (s.ondrag = u),
          33 & n && (s.ondrop = h),
          3 & n && (s.disabled = t[1] || t[14].disabled),
          1 & n && (s.title = t[14].title),
          1 & n && (s.html = t[14].thumb),
          i.$set(s),
          (!a || 64 & n) && Yn(o, 'style', t[6]),
          r && bn(r.update) && 1 & n && r.update.call(null, t[14])
      },
      i(e) {
        a || (Fr(i.$$.fragment, e), (a = !0))
      },
      o(e) {
        zr(i.$$.fragment, e), (a = !1)
      },
      d(e) {
        e && Wn(o), Xr(i), (s = !1), l()
      },
    }
  )
}

function jf(e) {
  let t,
    o,
    i = [],
    n = new Map(),
    r = e[0]
  const a = (e) => e[14].id
  for (let t = 0; t < r.length; t += 1) {
    let o = _f(e, r, t),
      s = a(o)
    n.set(s, (i[t] = Zf(s, o)))
  }
  return {
    c() {
      t = Vn('ul')
      for (let e = 0; e < i.length; e += 1) i[e].c()
      Yn(t, 'class', 'PinturaShapePresetsList')
    },
    m(e, n) {
      On(e, t, n)
      for (let e = 0; e < i.length; e += 1) i[e].m(t, null)
      o = !0
    },
    p(e, [o]) {
      127 & o && ((r = e[0]), Er(), (i = _r(i, o, a, 1, e, r, n, t, Vr, Zf, null, _f)), Lr())
    },
    i(e) {
      if (!o) {
        for (let e = 0; e < r.length; e += 1) Fr(i[e])
        o = !0
      }
    },
    o(e) {
      for (let e = 0; e < i.length; e += 1) zr(i[e])
      o = !1
    },
    d(e) {
      e && Wn(t)
      for (let e = 0; e < i.length; e += 1) i[e].d()
    },
  }
}

function Nf(e, t, o) {
  let i,
    n,
    { presets: r } = t,
    { disabled: a } = t,
    { onclickpreset: s } = t,
    { ongrabpreset: l } = t,
    { ondragpreset: c } = t,
    { ondroppreset: d } = t
  const u = ys(0, {
    stiffness: 0.25,
    damping: 0.9,
  })
  Sn(e, u, (e) => o(9, (n = e)))
  sr(() => u.set(1))
  return (
    (e.$$set = (e) => {
      'presets' in e && o(0, (r = e.presets)),
        'disabled' in e && o(1, (a = e.disabled)),
        'onclickpreset' in e && o(2, (s = e.onclickpreset)),
        'ongrabpreset' in e && o(3, (l = e.ongrabpreset)),
        'ondragpreset' in e && o(4, (c = e.ondragpreset)),
        'ondroppreset' in e && o(5, (d = e.ondroppreset))
    }),
    (e.$$.update = () => {
      512 & e.$$.dirty && o(6, (i = 'opacity:' + n))
    }),
    [
      r,
      a,
      s,
      l,
      c,
      d,
      i,
      u,
      (e, t) => t.mount && t.mount(e.firstChild, t),
      n,
      (e) => s(e.id),
      (e, t) => l && l(e.id, t),
      (e, t) => c && c(e.id, t),
      (e, t) => d && d(e.id, t),
    ]
  )
}
class Hf extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Nf, jf, xn, {
        presets: 0,
        disabled: 1,
        onclickpreset: 2,
        ongrabpreset: 3,
        ondragpreset: 4,
        ondroppreset: 5,
      })
  }
}
var Uf = (e) => /<svg /.test(e)

function Xf(e) {
  let t, o
  return (
    (t = new cu({
      props: {
        items: e[13],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8192 & o && (i.items = e[13]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Yf(e) {
  let t, o, i, n
  const r = [qf, Gf],
    a = []

  function s(e, t) {
    return e[7] ? 0 : 1
  }
  return (
    (t = s(e)),
    (o = a[t] = r[t](e)),
    {
      c() {
        o.c(), (i = Nn())
      },
      m(e, o) {
        a[t].m(e, o), On(e, i, o), (n = !0)
      },
      p(e, n) {
        let l = t
        ;(t = s(e)),
          t === l
            ? a[t].p(e, n)
            : (Er(),
              zr(a[l], 1, 1, () => {
                a[l] = null
              }),
              Lr(),
              (o = a[t]),
              o ? o.p(e, n) : ((o = a[t] = r[t](e)), o.c()),
              Fr(o, 1),
              o.m(i.parentNode, i))
      },
      i(e) {
        n || (Fr(o), (n = !0))
      },
      o(e) {
        zr(o), (n = !1)
      },
      d(e) {
        a[t].d(e), e && Wn(i)
      },
    }
  )
}

function Gf(e) {
  let t,
    o,
    i,
    n,
    r = e[13] && Kf(e)
  return (
    (i = new dc({
      props: {
        scrollAutoCancel: e[6],
        elasticity: e[0],
        $$slots: {
          default: [Jf],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          r && r.c(),
          (o = jn()),
          Hr(i.$$.fragment),
          Yn(t, 'class', 'PinturaShapePresetsFlat')
      },
      m(e, a) {
        On(e, t, a), r && r.m(t, null), Dn(t, o), Ur(i, t, null), (n = !0)
      },
      p(e, n) {
        e[13]
          ? r
            ? (r.p(e, n), 8192 & n && Fr(r, 1))
            : ((r = Kf(e)), r.c(), Fr(r, 1), r.m(t, o))
          : r &&
            (Er(),
            zr(r, 1, 1, () => {
              r = null
            }),
            Lr())
        const a = {}
        64 & n && (a.scrollAutoCancel = e[6]),
          1 & n && (a.elasticity = e[0]),
          536870974 & n &&
            (a.$$scope = {
              dirty: n,
              ctx: e,
            }),
          i.$set(a)
      },
      i(e) {
        n || (Fr(r), Fr(i.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(r), zr(i.$$.fragment, e), (n = !1)
      },
      d(e) {
        e && Wn(t), r && r.d(), Xr(i)
      },
    }
  )
}

function qf(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l = e[13] && Qf(e)
  const c = [
    {
      class: 'PinturaControlList',
    },
    {
      tabs: e[8],
    },
    e[11],
    {
      layout: 'compact',
    },
  ]
  let d = {
    $$slots: {
      default: [
        i$,
        ({ tab: e }) => ({
          28: e,
        }),
        ({ tab: e }) => (e ? 268435456 : 0),
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < c.length; e += 1) d = gn(d, c[e])
  ;(n = new Tl({
    props: d,
  })),
    n.$on('select', e[18])
  const u = [
    {
      class: 'PinturaControlPanels',
    },
    {
      panelClass: 'PinturaControlPanel',
    },
    {
      panels: e[12],
    },
    e[11],
  ]
  let h = {
    $$slots: {
      default: [
        r$,
        ({ panel: e, panelIsActive: t }) => ({
          26: e,
          27: t,
        }),
        ({ panel: e, panelIsActive: t }) => (e ? 67108864 : 0) | (t ? 134217728 : 0),
      ],
    },
    $$scope: {
      ctx: e,
    },
  }
  for (let e = 0; e < u.length; e += 1) h = gn(h, u[e])
  return (
    (a = new Wl({
      props: h,
    })),
    {
      c() {
        ;(t = Vn('div')),
          (o = Vn('div')),
          l && l.c(),
          (i = jn()),
          Hr(n.$$.fragment),
          (r = jn()),
          Hr(a.$$.fragment),
          Yn(o, 'class', 'PinturaShapePresetsGroups'),
          Yn(t, 'class', 'PinturaShapePresetsGrouped')
      },
      m(e, c) {
        On(e, t, c),
          Dn(t, o),
          l && l.m(o, null),
          Dn(o, i),
          Ur(n, o, null),
          Dn(t, r),
          Ur(a, t, null),
          (s = !0)
      },
      p(e, t) {
        e[13]
          ? l
            ? (l.p(e, t), 8192 & t && Fr(l, 1))
            : ((l = Qf(e)), l.c(), Fr(l, 1), l.m(o, i))
          : l &&
            (Er(),
            zr(l, 1, 1, () => {
              l = null
            }),
            Lr())
        const r =
          2304 & t
            ? Zr(c, [
                c[0],
                256 & t && {
                  tabs: e[8],
                },
                2048 & t && jr(e[11]),
                c[3],
              ])
            : {}
        805306368 & t &&
          (r.$$scope = {
            dirty: t,
            ctx: e,
          }),
          n.$set(r)
        const s =
          6144 & t
            ? Zr(u, [
                u[0],
                u[1],
                4096 & t && {
                  panels: e[12],
                },
                2048 & t && jr(e[11]),
              ])
            : {}
        738198623 & t &&
          (s.$$scope = {
            dirty: t,
            ctx: e,
          }),
          a.$set(s)
      },
      i(e) {
        s || (Fr(l), Fr(n.$$.fragment, e), Fr(a.$$.fragment, e), (s = !0))
      },
      o(e) {
        zr(l), zr(n.$$.fragment, e), zr(a.$$.fragment, e), (s = !1)
      },
      d(e) {
        e && Wn(t), l && l.d(), Xr(n), Xr(a)
      },
    }
  )
}

function Kf(e) {
  let t, o
  return (
    (t = new cu({
      props: {
        items: e[13],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8192 & o && (i.items = e[13]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Jf(e) {
  let t, o
  return (
    (t = new Hf({
      props: {
        presets: e[5],
        onclickpreset: e[1],
        ongrabpreset: e[2],
        ondragpreset: e[3],
        ondroppreset: e[4],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        32 & o && (i.presets = e[5]),
          2 & o && (i.onclickpreset = e[1]),
          4 & o && (i.ongrabpreset = e[2]),
          8 & o && (i.ondragpreset = e[3]),
          16 & o && (i.ondroppreset = e[4]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function Qf(e) {
  let t, o
  return (
    (t = new cu({
      props: {
        items: e[13],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8192 & o && (i.items = e[13]), t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function e$(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [t$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        805306368 & o &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function t$(e) {
  let t,
    o = e[28].icon + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      268435456 & i && o !== (o = e[28].icon + '') && (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function o$(e) {
  let t,
    o,
    i = e[28].label + ''
  return {
    c() {
      ;(t = Vn('span')), (o = Zn(i))
    },
    m(e, i) {
      On(e, t, i), Dn(t, o)
    },
    p(e, t) {
      268435456 & t && i !== (i = e[28].label + '') && qn(o, i)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function i$(e) {
  let t,
    o,
    i,
    n = e[28].icon && e$(e),
    r = !e[28].hideLabel && o$(e)
  return {
    c() {
      n && n.c(), (t = jn()), r && r.c(), (o = Nn())
    },
    m(e, a) {
      n && n.m(e, a), On(e, t, a), r && r.m(e, a), On(e, o, a), (i = !0)
    },
    p(e, i) {
      e[28].icon
        ? n
          ? (n.p(e, i), 268435456 & i && Fr(n, 1))
          : ((n = e$(e)), n.c(), Fr(n, 1), n.m(t.parentNode, t))
        : n &&
          (Er(),
          zr(n, 1, 1, () => {
            n = null
          }),
          Lr()),
        e[28].hideLabel
          ? r && (r.d(1), (r = null))
          : r
          ? r.p(e, i)
          : ((r = o$(e)), r.c(), r.m(o.parentNode, o))
    },
    i(e) {
      i || (Fr(n), (i = !0))
    },
    o(e) {
      zr(n), (i = !1)
    },
    d(e) {
      n && n.d(e), e && Wn(t), r && r.d(e), e && Wn(o)
    },
  }
}

function n$(e) {
  let t, o
  return (
    (t = new Hf({
      props: {
        presets: e[10][e[26]].items,
        disabled: e[10][e[26]].disabled,
        onclickpreset: e[1],
        ongrabpreset: e[2],
        ondragpreset: e[3],
        ondroppreset: e[4],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        67109888 & o && (i.presets = e[10][e[26]].items),
          67109888 & o && (i.disabled = e[10][e[26]].disabled),
          2 & o && (i.onclickpreset = e[1]),
          4 & o && (i.ongrabpreset = e[2]),
          8 & o && (i.ondragpreset = e[3]),
          16 & o && (i.ondroppreset = e[4]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function r$(e) {
  let t, o
  return (
    (t = new dc({
      props: {
        scroll: e[27]
          ? {
              scrollOffset: 0,
              animate: !1,
            }
          : void 0,
        scrollAutoCancel: e[6],
        elasticity: e[0],
        $$slots: {
          default: [n$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        134217728 & o &&
          (i.scroll = e[27]
            ? {
                scrollOffset: 0,
                animate: !1,
              }
            : void 0),
          64 & o && (i.scrollAutoCancel = e[6]),
          1 & o && (i.elasticity = e[0]),
          603980830 & o &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function a$(e) {
  let t, o, i, n
  const r = [Yf, Xf],
    a = []

  function s(e, t) {
    return e[6] ? 0 : e[13] ? 1 : -1
  }
  return (
    ~(o = s(e)) && (i = a[o] = r[o](e)),
    {
      c() {
        ;(t = Vn('div')), i && i.c(), Yn(t, 'class', 'PinturaShapePresetsPalette')
      },
      m(e, i) {
        On(e, t, i), ~o && a[o].m(t, null), (n = !0)
      },
      p(e, [n]) {
        let l = o
        ;(o = s(e)),
          o === l
            ? ~o && a[o].p(e, n)
            : (i &&
                (Er(),
                zr(a[l], 1, 1, () => {
                  a[l] = null
                }),
                Lr()),
              ~o
                ? ((i = a[o]),
                  i ? i.p(e, n) : ((i = a[o] = r[o](e)), i.c()),
                  Fr(i, 1),
                  i.m(t, null))
                : (i = null))
      },
      i(e) {
        n || (Fr(i), (n = !0))
      },
      o(e) {
        zr(i), (n = !1)
      },
      d(e) {
        e && Wn(t), ~o && a[o].d()
      },
    }
  )
}

function s$(e, t, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    { locale: p } = t,
    { presets: m } = t,
    { scrollElasticity: g } = t,
    { enableSelectImage: f = !0 } = t,
    { willRenderPresetToolbar: $ = W } = t,
    { onaddpreset: y = n } = t,
    { ongrabpreset: b } = t,
    { ondragpreset: x } = t,
    { ondroppreset: v } = t
  const S = 'presets-' + T(),
    k = (e, t = '') => (Uf(e) ? e : ho(e) ? bo(e, t) : `<img src="${e}" alt="${t}"/>`),
    M = (e) => F(Tt(e)),
    C = ['src', 'alt', 'thumb', 'shape', 'id', 'mount', 'disabled'],
    P = (e) =>
      e.map((e) =>
        ((e) => mo(e) && w(e[0]) && mo(e[1]))(e)
          ? { ...e[2], id: `${S}-${e[0].toLowerCase()}`, label: e[0], items: P(e[1]) }
          : ((e) => {
              let t,
                o,
                i,
                n,
                r,
                a,
                s,
                l = e
              return (
                w(e)
                  ? ho(e)
                    ? ((t = e), (r = e), (n = k(t, r)))
                    : ((t = e), (r = M(t)), (n = k(t, r)))
                  : ((t = e.src),
                    (r = e.alt || (w(t) ? M(t) : w(e.thumb) ? M(e.thumb) : void 0)),
                    (n = k(e.thumb || t, r)),
                    (o = e.shape),
                    (a = e.mount),
                    (s = e.disabled),
                    (i = Object.keys(e).reduce((t, o) => (C.includes(o) || (t[o] = e[o]), t), {}))),
                {
                  id: l,
                  src: t,
                  thumb: n,
                  shape: o,
                  shapeProps: i,
                  alt: r,
                  title: r,
                  mount: a,
                  disabled: s,
                }
              )
            })(e)
      )
  return (
    (e.$$set = (e) => {
      'locale' in e && o(14, (p = e.locale)),
        'presets' in e && o(15, (m = e.presets)),
        'scrollElasticity' in e && o(0, (g = e.scrollElasticity)),
        'enableSelectImage' in e && o(16, (f = e.enableSelectImage)),
        'willRenderPresetToolbar' in e && o(17, ($ = e.willRenderPresetToolbar)),
        'onaddpreset' in e && o(1, (y = e.onaddpreset)),
        'ongrabpreset' in e && o(2, (b = e.ongrabpreset)),
        'ondragpreset' in e && o(3, (x = e.ondragpreset)),
        'ondroppreset' in e && o(4, (v = e.ondroppreset))
    }),
    (e.$$.update = () => {
      32768 & e.$$.dirty && o(5, (i = P(m))),
        32 & e.$$.dirty && o(6, (r = i.length)),
        96 & e.$$.dirty && o(7, (a = r && i.some((e) => !!e.items))),
        160 & e.$$.dirty && o(8, (s = a && i)),
        160 & e.$$.dirty && o(10, (l = a && i.reduce((e, t) => ((e[t.id] = t), e), {}))),
        768 & e.$$.dirty && o(9, (c = c || (s && (s.find((e) => !e.disabled) || {}).id))),
        512 & e.$$.dirty &&
          o(
            11,
            (d = {
              name: S,
              selected: c,
            })
          ),
        256 & e.$$.dirty && o(12, (u = s && s.map((e) => e.id))),
        212994 & e.$$.dirty &&
          o(
            13,
            (h =
              p &&
              $([
                f && [
                  'Button',
                  'browse',
                  {
                    label: p.shapeLabelButtonSelectSticker,
                    icon: p.shapeIconButtonSelectSticker,
                    onclick: () => {
                      Cu().then((e) => {
                        e && y(e)
                      })
                    },
                  },
                ],
              ]))
          )
    }),
    [g, y, b, x, v, i, r, a, s, c, l, d, u, h, p, m, f, $, ({ detail: e }) => o(9, (c = e))]
  )
}
class l$ extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, s$, a$, xn, {
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

function c$(e) {
  let t, o, i, n
  const r = [
    {
      locale: e[4],
    },
    {
      uid: e[14],
    },
    {
      parentRect: e[25],
    },
    {
      rootRect: e[34],
    },
    {
      utilRect: e[26],
    },
    {
      offset: e[36],
    },
    {
      disabled: !e[30] && e[29],
    },
    {
      contextRotation: e[17],
    },
    {
      contextFlipX: e[18],
    },
    {
      contextFlipY: e[19],
    },
    {
      contextZoom: e[22],
    },
    {
      active: e[23],
    },
    {
      opacity: e[48],
    },
    {
      hoverColor: e[49],
    },
    {
      eraseRadius: e[38],
    },
    {
      selectRadius: e[6],
    },
    {
      enableButtonFlipVertical: e[9],
    },
    {
      mapEditorPointToImagePoint: e[15],
    },
    {
      mapImagePointToEditorPoint: e[16],
    },
    {
      enableTapToAddText: e[12],
    },
    {
      textInputMode: e[7],
    },
    {
      willStartInteraction: e[69],
    },
    {
      oninteractionstart: e[72],
    },
    {
      oninteractionupdate: e[73],
    },
    {
      oninteractionrelease: e[74],
    },
    {
      oninteractionend: e[76],
    },
    {
      oninteractioncancel: e[75],
    },
    {
      onhovershape: e[78],
    },
    {
      onaddshape: e[144],
    },
    {
      onselectshape: e[145],
    },
    {
      ontapshape: e[146],
    },
    {
      onupdateshape: e[147],
    },
    {
      onremoveshape: e[148],
    },
    e[45],
  ]

  function a(t) {
    e[150](t)
  }

  function s(t) {
    e[151](t)
  }
  let l = {}
  for (let e = 0; e < r.length; e += 1) l = gn(l, r[e])
  return (
    void 0 !== e[27] && (l.markup = e[27]),
    void 0 !== e[47] && (l.ui = e[47]),
    (t = new Mf({
      props: l,
    })),
    e[149](t),
    gr.push(() => Nr(t, 'markup', a)),
    gr.push(() => Nr(t, 'ui', s)),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (n = !0)
      },
      p(e, n) {
        const a =
          (1724895952 & n[0]) | (409832 & n[1]) | (134315136 & n[2])
            ? Zr(r, [
                16 & n[0] && {
                  locale: e[4],
                },
                16384 & n[0] && {
                  uid: e[14],
                },
                33554432 & n[0] && {
                  parentRect: e[25],
                },
                8 & n[1] && {
                  rootRect: e[34],
                },
                67108864 & n[0] && {
                  utilRect: e[26],
                },
                32 & n[1] && {
                  offset: e[36],
                },
                1610612736 & n[0] && {
                  disabled: !e[30] && e[29],
                },
                131072 & n[0] && {
                  contextRotation: e[17],
                },
                262144 & n[0] && {
                  contextFlipX: e[18],
                },
                524288 & n[0] && {
                  contextFlipY: e[19],
                },
                4194304 & n[0] && {
                  contextZoom: e[22],
                },
                8388608 & n[0] && {
                  active: e[23],
                },
                131072 & n[1] && {
                  opacity: e[48],
                },
                262144 & n[1] && {
                  hoverColor: e[49],
                },
                128 & n[1] && {
                  eraseRadius: e[38],
                },
                64 & n[0] && {
                  selectRadius: e[6],
                },
                512 & n[0] && {
                  enableButtonFlipVertical: e[9],
                },
                32768 & n[0] && {
                  mapEditorPointToImagePoint: e[15],
                },
                65536 & n[0] && {
                  mapImagePointToEditorPoint: e[16],
                },
                4096 & n[0] && {
                  enableTapToAddText: e[12],
                },
                128 & n[0] && {
                  textInputMode: e[7],
                },
                128 & n[2] && {
                  willStartInteraction: e[69],
                },
                1024 & n[2] && {
                  oninteractionstart: e[72],
                },
                2048 & n[2] && {
                  oninteractionupdate: e[73],
                },
                4096 & n[2] && {
                  oninteractionrelease: e[74],
                },
                16384 & n[2] && {
                  oninteractionend: e[76],
                },
                8192 & n[2] && {
                  oninteractioncancel: e[75],
                },
                65536 & n[2] && {
                  onhovershape: e[78],
                },
                (64 & n[1]) | (134217728 & n[2]) && {
                  onaddshape: e[144],
                },
                64 & n[1] && {
                  onselectshape: e[145],
                },
                64 & n[1] && {
                  ontapshape: e[146],
                },
                (64 & n[1]) | (134217728 & n[2]) && {
                  onupdateshape: e[147],
                },
                (64 & n[1]) | (134217728 & n[2]) && {
                  onremoveshape: e[148],
                },
                16384 & n[1] && jr(e[45]),
              ])
            : {}
        !o && 134217728 & n[0] && ((o = !0), (a.markup = e[27]), Sr(() => (o = !1))),
          !i && 65536 & n[1] && ((i = !0), (a.ui = e[47]), Sr(() => (i = !1))),
          t.$set(a)
      },
      i(e) {
        n || (Fr(t.$$.fragment, e), (n = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (n = !1)
      },
      d(o) {
        e[149](null), Xr(t, o)
      },
    }
  )
}

function d$(e) {
  let t,
    o,
    i,
    r,
    a,
    s = e[35] && c$(e)
  return {
    c() {
      ;(t = Vn('div')), s && s.c(), Yn(t, 'slot', 'main'), Yn(t, 'style', (o = 'cursor: ' + e[39]))
    },
    m(o, l) {
      On(o, t, l),
        s && s.m(t, null),
        e[152](t),
        (i = !0),
        r ||
          ((a = [
            Rn(Ls.call(null, t)),
            Hn(t, 'dropfiles', function () {
              bn(e[11] ? e[83] : n) && (e[11] ? e[83] : n).apply(this, arguments)
            }),
            Rn(Rs.call(null, t)),
            Hn(t, 'measure', e[142]),
            Hn(
              t,
              'wheel',
              function () {
                bn(e[41] ? e[88] : n) && (e[41] ? e[88] : n).apply(this, arguments)
              },
              {
                passive: !1,
              }
            ),
            Hn(t, 'interactionstart', function () {
              bn(e[42] ? e[84] : n) && (e[42] ? e[84] : n).apply(this, arguments)
            }),
            Hn(t, 'interactionupdate', function () {
              bn(e[42] ? e[85] : n) && (e[42] ? e[85] : n).apply(this, arguments)
            }),
            Hn(t, 'interactionrelease', function () {
              bn(e[42] ? e[86] : n) && (e[42] ? e[86] : n).apply(this, arguments)
            }),
            Hn(t, 'interactionend', function () {
              bn(e[42] ? e[87] : n) && (e[42] ? e[87] : n).apply(this, arguments)
            }),
            Rn(
              tc.call(null, t, {
                drag: !0,
                pinch: !0,
                inertia: !0,
                shouldStartInteraction: e[153],
              })
            ),
          ]),
          (r = !0))
    },
    p(n, r) {
      ;(e = n)[35]
        ? s
          ? (s.p(e, r), 16 & r[1] && Fr(s, 1))
          : ((s = c$(e)), s.c(), Fr(s, 1), s.m(t, null))
        : s &&
          (Er(),
          zr(s, 1, 1, () => {
            s = null
          }),
          Lr()),
        (!i || (256 & r[1] && o !== (o = 'cursor: ' + e[39]))) && Yn(t, 'style', o)
    },
    i(e) {
      i || (Fr(s), (i = !0))
    },
    o(e) {
      zr(s), (i = !1)
    },
    d(o) {
      o && Wn(t), s && s.d(), e[152](null), (r = !1), yn(a)
    },
  }
}

function u$(e) {
  let t, o
  return (
    (t = new l$({
      props: {
        locale: e[4],
        presets: e[13],
        enableSelectImage: e[10],
        willRenderPresetToolbar: e[44],
        onaddpreset: e[82],
        ongrabpreset: e[79],
        ondragpreset: e[80],
        ondroppreset: e[81],
        scrollElasticity: e[43],
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        16 & o[0] && (i.locale = e[4]),
          8192 & o[0] && (i.presets = e[13]),
          1024 & o[0] && (i.enableSelectImage = e[10]),
          8192 & o[1] && (i.willRenderPresetToolbar = e[44]),
          4096 & o[1] && (i.scrollElasticity = e[43]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function h$(e) {
  let t, o, i, n, r, a
  const s = [m$, p$],
    l = []

  function c(e, t) {
    return e[40] ? 0 : 1
  }
  ;(o = c(e)), (i = l[o] = s[o](e))
  let d = e[32] && g$(e)
  return {
    c() {
      ;(t = Vn('div')),
        i.c(),
        (n = jn()),
        d && d.c(),
        (r = Nn()),
        Yn(t, 'class', 'PinturaControlPanels')
    },
    m(e, i) {
      On(e, t, i), l[o].m(t, null), On(e, n, i), d && d.m(e, i), On(e, r, i), (a = !0)
    },
    p(e, n) {
      let a = o
      ;(o = c(e)),
        o === a
          ? l[o].p(e, n)
          : (Er(),
            zr(l[a], 1, 1, () => {
              l[a] = null
            }),
            Lr(),
            (i = l[o]),
            i ? i.p(e, n) : ((i = l[o] = s[o](e)), i.c()),
            Fr(i, 1),
            i.m(t, null)),
        e[32]
          ? d
            ? (d.p(e, n), 2 & n[1] && Fr(d, 1))
            : ((d = g$(e)), d.c(), Fr(d, 1), d.m(r.parentNode, r))
          : d &&
            (Er(),
            zr(d, 1, 1, () => {
              d = null
            }),
            Lr())
    },
    i(e) {
      a || (Fr(i), Fr(d), (a = !0))
    },
    o(e) {
      zr(i), zr(d), (a = !1)
    },
    d(e) {
      e && Wn(t), l[o].d(), e && Wn(n), d && d.d(e), e && Wn(r)
    },
  }
}

function p$(e) {
  let t, o, i
  return (
    (o = new Bf({
      props: {
        locale: e[4],
        shape: e[28],
        onchange: e[77],
        controls: e[8],
        scrollElasticity: e[43],
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'class', 'PinturaControlPanel')
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, t) {
        const i = {}
        16 & t[0] && (i.locale = e[4]),
          268435456 & t[0] && (i.shape = e[28]),
          256 & t[0] && (i.controls = e[8]),
          4096 & t[1] && (i.scrollElasticity = e[43]),
          o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function m$(e) {
  let t, o, i
  return (
    (o = new l$({
      props: {
        locale: e[4],
        presets: e[13],
        enableSelectImage: e[10],
        willRenderPresetToolbar: e[44],
        onaddpreset: e[82],
        ongrabpreset: e[79],
        ondragpreset: e[80],
        ondroppreset: e[81],
        scrollElasticity: e[43],
      },
    })),
    {
      c() {
        ;(t = Vn('div')), Hr(o.$$.fragment), Yn(t, 'class', 'PinturaControlPanel')
      },
      m(e, n) {
        On(e, t, n), Ur(o, t, null), (i = !0)
      },
      p(e, t) {
        const i = {}
        16 & t[0] && (i.locale = e[4]),
          8192 & t[0] && (i.presets = e[13]),
          1024 & t[0] && (i.enableSelectImage = e[10]),
          8192 & t[1] && (i.willRenderPresetToolbar = e[44]),
          4096 & t[1] && (i.scrollElasticity = e[43]),
          o.$set(i)
      },
      i(e) {
        i || (Fr(o.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), (i = !1)
      },
      d(e) {
        e && Wn(t), Xr(o)
      },
    }
  )
}

function g$(e) {
  let t, o
  return (
    (t = new dc({
      props: {
        class: 'PinturaControlListScroller',
        elasticity: e[43],
        $$slots: {
          default: [b$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        4096 & o[1] && (i.elasticity = e[43]),
          (16777233 & o[0]) | (1024 & o[6]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function f$(e) {
  let t, o
  return (
    (t = new Ul({
      props: {
        $$slots: {
          default: [$$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(16 & o[0]) | (1536 & o[6]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function $$(e) {
  let t,
    o = (S(e[195].icon) ? e[195].icon(e[4]) : e[195].icon) + ''
  return {
    c() {
      t = _n('g')
    },
    m(e, i) {
      On(e, t, i), (t.innerHTML = o)
    },
    p(e, i) {
      ;(16 & i[0]) | (512 & i[6]) &&
        o !== (o = (S(e[195].icon) ? e[195].icon(e[4]) : e[195].icon) + '') &&
        (t.innerHTML = o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function y$(e) {
  let t,
    o,
    i,
    n,
    r,
    a = (S(e[195].label) ? e[195].label(e[4]) : e[195].label) + '',
    s = e[195].icon && f$(e)
  return {
    c() {
      ;(t = Vn('div')),
        s && s.c(),
        (o = jn()),
        (i = Vn('span')),
        (n = Zn(a)),
        Yn(t, 'slot', 'option')
    },
    m(e, a) {
      On(e, t, a), s && s.m(t, null), Dn(t, o), Dn(t, i), Dn(i, n), (r = !0)
    },
    p(e, i) {
      e[195].icon
        ? s
          ? (s.p(e, i), 512 & i[6] && Fr(s, 1))
          : ((s = f$(e)), s.c(), Fr(s, 1), s.m(t, o))
        : s &&
          (Er(),
          zr(s, 1, 1, () => {
            s = null
          }),
          Lr()),
        (!r || (16 & i[0]) | (512 & i[6])) &&
          a !== (a = (S(e[195].label) ? e[195].label(e[4]) : e[195].label) + '') &&
          qn(n, a)
    },
    i(e) {
      r || (Fr(s), (r = !0))
    },
    o(e) {
      zr(s), (r = !1)
    },
    d(e) {
      e && Wn(t), s && s.d()
    },
  }
}

function b$(e) {
  let t, o
  return (
    (t = new vd({
      props: {
        locale: e[4],
        class: 'PinturaControlList',
        optionClass: 'PinturaControlListOption',
        layout: 'row',
        options: e[24],
        selectedIndex: e[24].findIndex(e[143]),
        onchange: e[71],
        $$slots: {
          option: [
            y$,
            ({ option: e }) => ({
              195: e,
            }),
            ({ option: e }) => [0, 0, 0, 0, 0, 0, e ? 512 : 0],
          ],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        16 & o[0] && (i.locale = e[4]),
          16777216 & o[0] && (i.options = e[24]),
          16777217 & o[0] && (i.selectedIndex = e[24].findIndex(e[143])),
          (16 & o[0]) | (1536 & o[6]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function x$(e) {
  let t, o, i, n
  const r = [h$, u$],
    a = []

  function s(e, t) {
    return e[33] ? 0 : e[40] ? 1 : -1
  }
  return (
    ~(o = s(e)) && (i = a[o] = r[o](e)),
    {
      c() {
        ;(t = Vn('div')), i && i.c(), Yn(t, 'slot', 'footer'), Yn(t, 'style', e[46])
      },
      m(e, i) {
        On(e, t, i), ~o && a[o].m(t, null), (n = !0)
      },
      p(e, l) {
        let c = o
        ;(o = s(e)),
          o === c
            ? ~o && a[o].p(e, l)
            : (i &&
                (Er(),
                zr(a[c], 1, 1, () => {
                  a[c] = null
                }),
                Lr()),
              ~o
                ? ((i = a[o]),
                  i ? i.p(e, l) : ((i = a[o] = r[o](e)), i.c()),
                  Fr(i, 1),
                  i.m(t, null))
                : (i = null)),
          (!n || 32768 & l[1]) && Yn(t, 'style', e[46])
      },
      i(e) {
        n || (Fr(i), (n = !0))
      },
      o(e) {
        zr(i), (n = !1)
      },
      d(e) {
        e && Wn(t), ~o && a[o].d()
      },
    }
  )
}

function v$(e) {
  let t, o
  return (
    (t = new Lm({
      props: {
        $$slots: {
          footer: [x$],
          main: [d$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    t.$on('measure', e[154]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(2146435025 & o[0]) | (524287 & o[1]) | (1024 & o[6]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function w$(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    v,
    S,
    k,
    M,
    C,
    T,
    P,
    I,
    R,
    A,
    E,
    L,
    F,
    z,
    B,
    D,
    O,
    V,
    _,
    Z,
    j,
    N,
    H,
    U,
    X,
    Y,
    G,
    q,
    K,
    J,
    Q,
    ee,
    te,
    oe,
    re,
    ae,
    le,
    ce,
    ue,
    he,
    pe,
    me,
    ge,
    ye,
    be,
    ve = pn,
    we = () => (ve(), (ve = vn(Ae, (e) => o(23, (X = e)))), Ae),
    Se = pn,
    ke = () => (Se(), (Se = vn(yt, (e) => o(25, (K = e)))), yt),
    Me = pn,
    Ce = () => (Me(), (Me = vn(Le, (e) => o(130, (ee = e)))), Le),
    Te = pn,
    Pe = () => (Te(), (Te = vn(Be, (e) => o(27, (oe = e)))), Be),
    Ie = pn,
    Re = () => (Ie(), (Ie = vn(Ee, (e) => o(48, (ye = e)))), Ee)
  e.$$.on_destroy.push(() => ve()),
    e.$$.on_destroy.push(() => Se()),
    e.$$.on_destroy.push(() => Me()),
    e.$$.on_destroy.push(() => Te()),
    e.$$.on_destroy.push(() => Ie())
  let { isActive: Ae } = t
  we()
  let { isActiveFraction: Ee } = t
  Re()
  let { isVisible: Le } = t
  Ce()
  let { stores: Fe } = t,
    { locale: ze = {} } = t,
    { shapes: Be } = t
  Pe()
  let { toolbar: De = [] } = t,
    { toolShapes: Oe = [] } = t,
    { toolActive: We } = t,
    { toolSelectRadius: Ve } = t,
    { zoomOptions: _e = [0.25, 0.5, 1, 1.25, 1.5, 2, 3, 4, 6, 8, 16] } = t,
    { zoomAdjustStep: Ze = 0.25 } = t,
    { zoomAdjustFactor: Ne = 0.1 } = t,
    { textInputMode: He } = t,
    { interactionMode: Ue } = t,
    { shapeControls: Xe = {} } = t,
    { enableButtonFlipVertical: Ye = !1 } = t,
    { enablePresetSelectImage: Ge = !0 } = t,
    { enablePresetDropImage: qe = !0 } = t,
    { enableZoom: et = !0 } = t,
    { enablePan: tt = !0 } = t,
    { enableSelectToolToAddShape: ot = !1 } = t,
    { enableAutoSelectMoveTool: it = ['line', 'arrow', 'rectangle', 'ellipse', 'text'] } = t,
    { enableTapToAddText: nt = !1 } = t,
    { enableZoomControls: rt = !1 } = t,
    { enableMoveTool: at = !1 } = t,
    { enableViewTool: st = !1 } = t,
    { willRenderPresetToolbar: lt } = t,
    { willStartInteraction: ct } = t,
    { shapePresets: ut = [] } = t,
    { utilKey: ht } = t,
    { mapScreenPointToImagePoint: pt } = t,
    { mapImagePointToScreenPoint: mt } = t,
    { imageRotation: gt = 0 } = t,
    { imageFlipX: ft = !1 } = t,
    { imageFlipY: $t = !1 } = t,
    { parentRect: yt } = t
  ke()
  let { hooks: bt = {} } = t
  const xt = hr('isAnimated')
  Sn(e, xt, (e) => o(121, (q = e)))
  const vt = hr('elasticityMultiplier')
  Sn(e, vt, (e) => o(138, (ue = e)))
  const {
    env: wt,
    history: St,
    rootRect: kt,
    rootColorSecondary: Mt,
    stageRect: Ct,
    stageScalar: Tt,
    utilRect: Pt,
    utilTools: It,
    scrollElasticity: Rt,
    imageOverlayMarkup: At,
    imagePreviewModifiers: Et,
    imageCropRect: Lt,
    shapePreprocessor: Ft,
    imageSelectionRect: zt,
    imageSelectionZoom: Bt,
    imageSelectionPan: Dt,
    imageSelectionStageFitScalar: Ot,
    imageSelectionStoredState: Wt,
    imagePreviewUpscale: Vt,
    isInteracting: _t,
  } = Fe
  Sn(e, wt, (e) => o(140, (pe = e))),
    Sn(e, kt, (e) => o(34, (J = e))),
    Sn(e, Mt, (e) => o(49, (be = e))),
    Sn(e, Ct, (e) => o(114, (N = e))),
    Sn(e, Tt, (e) => o(113, (Z = e))),
    Sn(e, Pt, (e) => o(26, (te = e))),
    Sn(e, At, (e) => o(47, (ge = e))),
    Sn(e, Et, (e) => o(128, (Q = e))),
    Sn(e, Lt, (e) => o(172, (ae = e))),
    Sn(e, Ft, (e) => o(135, (re = e))),
    Sn(e, zt, (e) => o(167, (_ = e))),
    Sn(e, Bt, (e) => o(115, (H = e))),
    Sn(e, Dt, (e) => o(168, (j = e))),
    Sn(e, Ot, (e) => o(118, (G = e))),
    Sn(e, Wt, (e) => o(169, (U = e))),
    Sn(e, Vt, (e) => o(117, (Y = e))),
    Sn(e, _t, (e) => o(173, (ce = e)))
  const Zt = (e = {}) => {
      const { pan: t = j, zoom: o = H } = e
      In(
        Wt,
        (U = {
          translation: t,
          zoom: o,
        }),
        U
      )
    },
    jt = () => {
      In(Bt, (H = void 0), H),
        In(Dt, (j = ie()), j),
        Ht.set(void 0, {
          hard: !0,
        })
    },
    Nt = () => {
      jt(), Zt()
    },
    Ht = ys(void 0, {
      precision: 0.01,
    })
  Ht.subscribe((e) => {
    if (void 0 === e) return In(Bt, (H = void 0), H), void In(Dt, (j = ie()), j)
    const t = H
    e <= 1 ? In(Dt, (j = ie()), j) : e <= t && In(Dt, (j = $e(j, 0.8)), j), In(Bt, (H = e), H)
  })
  const Ut = (e) => {
      Ht.update((t) => {
        const o = e(t || G)
        return (
          Zt({
            zoom: o,
          }),
          o
        )
      })
    },
    Xt = hr('keysPressed')
  Sn(e, Xt, (e) => o(137, (le = e)))
  const Yt = (e) => {
      const [t, o] = Oe[e]
      let i,
        n,
        r = 'relative' === o.position
      const a = r ? '0%' : 0,
        s = r ? '0%' : 0
      ti(t) || Jo(t)
        ? ((n = r ? '20%' : 0.2 * K.width),
          (i = Ho(t)),
          (i.x = a),
          (i.y = s),
          Vi(
            i,
            {
              width: n,
              height: n,
            },
            K
          ))
        : oi(t)
        ? ((n = r ? '10%' : 0.1 * K.width),
          (i = Ho(t)),
          (i.x = a),
          (i.y = s),
          Vi(
            i,
            {
              rx: n,
              ry: n,
            },
            K
          ))
        : ii(t) &&
          ((n = r ? '10%' : 0.1 * K.width),
          (i = Ho(t)),
          (i.x1 = a),
          (i.y1 = s),
          (i.x2 = a),
          (i.y2 = s)),
        i &&
          Promise.resolve().then(() => {
            io(to(i, void 0, n))
          })
    },
    Gt = (e) => pt(of(e, J))
  let qt,
    Kt,
    Jt = {}
  let Qt, eo
  const to = (e, t, o) => {
      let i = !1
      t || ((i = !0), (t = I ? pt(Ke(N)) : Ke(ae))),
        (t.x -= K.x || 0),
        (t.y -= K.y || 0),
        (ft || $t) && ((e.flipX = ft), (e.flipY = $t))
      const n = qt.getShapesNearPosition(t)
      if (i && n.length) {
        const e = 0.1 * Math.min(ae.width, ae.height)
        ;(t.x += Math.round(-e + Math.random() * e * 2)),
          (t.y += Math.round(-e + Math.random() * e * 2))
      }
      if (
        (0 !== gt && (e.rotation = ft && $t ? -gt : ft || $t ? gt : -gt),
        po(e, 'width') && po(e, 'height'))
      ) {
        const { width: o, height: i } = Wi(e, ['width', 'height'], K)
        Vi(
          e,
          {
            x: t.x - 0.5 * o,
            y: t.y - 0.5 * i,
          },
          K
        )
      } else if (oi(e))
        Vi(
          e,
          {
            x: t.x,
            y: t.y,
          },
          K
        )
      else if (ii(e)) {
        const { x1: i, y1: n, x2: r, y2: a } = Wi(e, ['x1', 'y1', 'x2', 'y2'], K),
          s = xe(ne(i, n), ne(r, a)) || w(o) ? Ei(o, K.width) : o
        Vi(
          e,
          {
            x1: t.x - s,
            y1: t.y + s,
            x2: t.x + s,
            y2: t.y - s,
          },
          K
        )
      }
      return e
    },
    oo = (e, t) => {
      const o = to(Go(e, ae), t)
      return (
        e.shape && (po(e.shape, 'x') && (o.x = e.shape.x), po(e.shape, 'y') && (o.y = e.shape.y)),
        io(o)
      )
    },
    io = (e) => {
      const { beforeAddShape: t = () => !0 } = bt
      if (t(e)) return qt.addShape(e), qt.selectShape(e), St.write(), z('addshape', e), e
    }
  let no = !1
  let ro = !1,
    ao = void 0,
    so = void 0,
    lo = !1,
    co = void 0,
    ho = void 0
  let mo,
    go = Date.now(),
    fo = 0,
    $o = !1,
    yo = !1
  const bo = () => {
    St.write()
  }
  let xo
  const vo = hr('redrawTrigger')
  Sn(e, vo, (e) => o(139, (he = e)))
  const wo = ys(q ? 20 : 0)
  Sn(e, wo, (e) => o(141, (me = e)))
  return (
    (e.$$set = (e) => {
      'isActive' in e && we(o(1, (Ae = e.isActive))),
        'isActiveFraction' in e && Re(o(2, (Ee = e.isActiveFraction))),
        'isVisible' in e && Ce(o(3, (Le = e.isVisible))),
        'stores' in e && o(93, (Fe = e.stores)),
        'locale' in e && o(4, (ze = e.locale)),
        'shapes' in e && Pe(o(5, (Be = e.shapes))),
        'toolbar' in e && o(94, (De = e.toolbar)),
        'toolShapes' in e && o(95, (Oe = e.toolShapes)),
        'toolActive' in e && o(0, (We = e.toolActive)),
        'toolSelectRadius' in e && o(6, (Ve = e.toolSelectRadius)),
        'zoomOptions' in e && o(96, (_e = e.zoomOptions)),
        'zoomAdjustStep' in e && o(97, (Ze = e.zoomAdjustStep)),
        'zoomAdjustFactor' in e && o(98, (Ne = e.zoomAdjustFactor)),
        'textInputMode' in e && o(7, (He = e.textInputMode)),
        'interactionMode' in e && o(92, (Ue = e.interactionMode)),
        'shapeControls' in e && o(8, (Xe = e.shapeControls)),
        'enableButtonFlipVertical' in e && o(9, (Ye = e.enableButtonFlipVertical)),
        'enablePresetSelectImage' in e && o(10, (Ge = e.enablePresetSelectImage)),
        'enablePresetDropImage' in e && o(11, (qe = e.enablePresetDropImage)),
        'enableZoom' in e && o(99, (et = e.enableZoom)),
        'enablePan' in e && o(100, (tt = e.enablePan)),
        'enableSelectToolToAddShape' in e && o(101, (ot = e.enableSelectToolToAddShape)),
        'enableAutoSelectMoveTool' in e && o(102, (it = e.enableAutoSelectMoveTool)),
        'enableTapToAddText' in e && o(12, (nt = e.enableTapToAddText)),
        'enableZoomControls' in e && o(103, (rt = e.enableZoomControls)),
        'enableMoveTool' in e && o(104, (at = e.enableMoveTool)),
        'enableViewTool' in e && o(105, (st = e.enableViewTool)),
        'willRenderPresetToolbar' in e && o(106, (lt = e.willRenderPresetToolbar)),
        'willStartInteraction' in e && o(107, (ct = e.willStartInteraction)),
        'shapePresets' in e && o(13, (ut = e.shapePresets)),
        'utilKey' in e && o(14, (ht = e.utilKey)),
        'mapScreenPointToImagePoint' in e && o(15, (pt = e.mapScreenPointToImagePoint)),
        'mapImagePointToScreenPoint' in e && o(16, (mt = e.mapImagePointToScreenPoint)),
        'imageRotation' in e && o(17, (gt = e.imageRotation)),
        'imageFlipX' in e && o(18, (ft = e.imageFlipX)),
        'imageFlipY' in e && o(19, ($t = e.imageFlipY)),
        'parentRect' in e && ke(o(20, (yt = e.parentRect))),
        'hooks' in e && o(108, (bt = e.hooks))
    }),
    (e.$$.update = () => {
      var t, w, _
      8388608 & e.$$.dirty[0] &&
        (X
          ? (In(Bt, (H = et ? U.zoom : void 0), H),
            In(Dt, (j = tt ? se(U.translation) : ie()), j),
            Ht.set(H))
          : jt()),
        1048576 & e.$$.dirty[3] && (i = Z >= 1),
        (16 & e.$$.dirty[0]) | (51380232 & e.$$.dirty[3]) &&
          o(
            116,
            (n = [
              (Y || Z < 1) && [
                G,
                Mh(G) + '%',
                {
                  sublabel: ze.labelZoomFit,
                },
              ],
              ..._e.map((e) => [e, Mh(e) + '%']),
            ]
              .filter(Boolean)
              .map(
                (e) => (
                  1 === e[0] &&
                    (e[2] = {
                      sublabel: ze.labelZoomActual,
                    }),
                  e
                )
              )
              .sort((e, t) => {
                const o = e[0] || G,
                  i = t[0] || G
                return o < i ? -1 : i < o ? 1 : 0
              }))
          ),
        41943040 & e.$$.dirty[3] &&
          o(
            119,
            (r = Math.min(
              n.reduce((e, [t]) => (t < e ? t : e), Number.MAX_SAFE_INTEGER),
              G
            ))
          ),
        8388608 & e.$$.dirty[3] &&
          o(120, (a = n.reduce((e, [t]) => (t > e ? t : e), Number.MIN_SAFE_INTEGER))),
        55574528 & e.$$.dirty[3] && o(22, (l = H || (Y || Z < 1 ? G : 1))),
        (4194304 & e.$$.dirty[0]) | (8388608 & e.$$.dirty[3]) &&
          o(122, ((t = n.map(([e]) => e)), (w = l), (s = t.findIndex((e) => e === w)))),
        4194304 & e.$$.dirty[0] && o(123, (c = Mh(l) + '%')),
        (16 & e.$$.dirty[0]) | (1824523312 & e.$$.dirty[3]) &&
          o(
            124,
            (d = rt && [
              [
                'Button',
                'zoom-out',
                {
                  hideLabel: !0,
                  label: ze.labelZoomOut,
                  icon: ze.iconZoomOut,
                  disabled: H === r,
                  onclick: () => Ut((e) => Math.max(r, e - Ze)),
                  onhold: () => Ut((e) => Math.max(r, e * (1 - Ne))),
                },
              ],
              [
                'Dropdown',
                'zoom-level',
                {
                  label: c,
                  labelClass: 'PinturaFixedWidthCharacters',
                  options: n,
                  selectedIndex: s,
                  onchange: (e) => {
                    return (
                      (t = e.value)
                        ? Ht.set(t, {
                            hard: !1 === q,
                          })
                        : ((t = void 0),
                          Ht.set(void 0, {
                            hard: !0,
                          })),
                      In(Bt, (H = t), H),
                      void Zt({
                        zoom: t,
                      })
                    )
                    var t
                  },
                },
              ],
              [
                'Button',
                'zoom-in',
                {
                  hideLabel: !0,
                  label: ze.labelZoomIn,
                  icon: ze.iconZoomIn,
                  disabled: H === a,
                  onclick: () => Ut((e) => Math.min(a, e + Ze)),
                  onhold: () => Ut((e) => Math.min(a, e * (1 + Ne))),
                },
              ],
            ])
          ),
        (8388608 & e.$$.dirty[0]) | (1 & e.$$.dirty[4]) && X && d && It.set(d),
        (8192 & e.$$.dirty[0]) | (14338 & e.$$.dirty[3]) &&
          o(
            24,
            (u = ((
              e,
              { willRenderPresetToolbar: t, shapePresets: o, enableViewTool: i, enableMoveTool: n }
            ) => {
              let r = 0 !== o.length || t ? e : e.filter((e) => 'preset' !== e[0])
              return (
                (r = n ? r : r.filter((e) => 'move' !== e[0])),
                i ? r : r.filter((e) => 'view' !== e[0])
              )
            })(De, {
              willRenderPresetToolbar: lt,
              shapePresets: ut,
              enableMoveTool: at,
              enableViewTool: st,
            }))
          ),
        256 & e.$$.dirty[0] && o(125, (h = Object.keys(Xe).length)),
        16777216 & e.$$.dirty[0] && o(32, (p = u.length > 1)),
        16777216 & e.$$.dirty[0] && o(126, (m = !!u.length)),
        (16777217 & e.$$.dirty[0]) | (4 & e.$$.dirty[4]) &&
          m &&
          void 0 === We &&
          o(0, (We = u[0][0])),
        1 & e.$$.dirty[0] && o(127, (g = void 0 !== We)),
        1 & e.$$.dirty[0] && o(92, (Ue = 'view' === We ? 'pan' : 'auto')),
        14 & e.$$.dirty[4] && o(33, (f = (!g || m) && h)),
        (8404992 & e.$$.dirty[0]) | (16 & e.$$.dirty[4]) &&
          (X
            ? In(
                Et,
                (Q[ht] = {
                  maskMarkupOpacity: 0.85,
                }),
                Q
              )
            : delete Q[ht]),
        1 & e.$$.dirty[0] && We && qt && 'move' !== We && qt.blurShapes(),
        (8388608 & e.$$.dirty[0]) | (64 & e.$$.dirty[4]) && o(35, ($ = X && ee)),
        (67108864 & e.$$.dirty[0]) | (2097152 & e.$$.dirty[3]) &&
          o(36, (y = te && ne(N.x - te.x, N.y - te.y))),
        256 & e.$$.dirty[0] && o(131, (b = Object.keys(Xe))),
        134217728 & e.$$.dirty[0] && o(132, (x = oe.filter(li)[0])),
        134217728 & e.$$.dirty[0] && o(133, (v = oe.find((e) => ci(e)))),
        (8388609 & e.$$.dirty[0]) | (4 & e.$$.dirty[3]) &&
          o(134, (S = X && (Oe[We] ? Ri(Ho(Oe[We][0])) : {}))),
        (65536 & e.$$.dirty[3]) | (1152 & e.$$.dirty[4]) &&
          o(
            129,
            (k =
              S &&
              Object.keys(S).reduce((e, t) => {
                const o = 'disableStyle' === t,
                  i = b.find((e) => e.split('_').includes(t))
                return o || i ? (void 0 === S[t] || (e[t] = po(Jt, t) ? Jt[t] : S[t]), e) : e
              }, {}))
          ),
        288 & e.$$.dirty[4] && o(28, (M = x || k)),
        (268435456 & e.$$.dirty[0]) | (2048 & e.$$.dirty[4]) &&
          M &&
          M.lineEnd &&
          !re &&
          console.warn(
            'Set shapePreprocessor property to draw lineStart and lineEnd styles.\nhttps://pqina.nl/pintura/docs/v8/api/exports/#createshapepreprocessor'
          ),
        1056 & e.$$.dirty[4] && o(38, (C = S && uo(S.eraseRadius) ? (k || S).eraseRadius : void 0)),
        8192 & e.$$.dirty[4] && o(136, (R = le && 32 === le[0])),
        (1073741824 & e.$$.dirty[2]) | (262144 & e.$$.dirty[3]) | (4096 & e.$$.dirty[4]) &&
          o(29, (A = 'pan' === Ue || R || ro)),
        (536870913 & e.$$.dirty[0]) | (655360 & e.$$.dirty[3]) | (256 & e.$$.dirty[4]) &&
          o(
            39,
            (T = ((e, t, o, i, n) => {
              if (o) return i ? 'grabbing' : 'grab'
              if (!e) return 'move' === n ? 'default' : 'crosshair'
              let r = e || t
              return li(r)
                ? ci(r)
                  ? 'modal' === He
                    ? 'default'
                    : 'text'
                  : Si(r)
                  ? 'move'
                  : 'default'
                : 'default'
            })(eo, x, A, lo, We))
          ),
        (9217 & e.$$.dirty[0]) | (8192 & e.$$.dirty[3]) &&
          o(40, (P = 'preset' === We && (ut.length > 0 || Ge || lt))),
        33554432 & e.$$.dirty[0] && (I = !po(K, 'x') && !po(K, 'y')),
        512 & e.$$.dirty[4] && o(30, (E = !!v)),
        (1073741824 & e.$$.dirty[0]) | (64 & e.$$.dirty[3]) && o(41, (L = et && !E)),
        (1073741824 & e.$$.dirty[0]) | (128 & e.$$.dirty[3]) && o(42, (F = tt && !E)),
        2097152 & e.$$.dirty[0] &&
          o(
            37,
            (z =
              xo &&
              ((_ = xo),
              (e, t) => {
                _.dispatchEvent(hu(e, t))
              }))
          ),
        16384 & e.$$.dirty[4] && o(43, (B = ue * Rt)),
        (8192 & e.$$.dirty[3]) | (98304 & e.$$.dirty[4]) &&
          o(44, (D = he && lt ? (e) => Tu(() => lt(e, oo, { ...pe }, () => vo.set({}))) : W)),
        32768 & e.$$.dirty[3] &&
          o(
            45,
            (O = Object.keys(bt).reduce(
              (e, t) => ('beforeAddShape' === t || (e[t] = bt[t]), e),
              {}
            ))
          ),
        8388608 & e.$$.dirty[0] &&
          ((e) => {
            Be && Be.set(oe.map((t) => ((t._prerender = !!e && ci(t)), t)))
          })(X),
        (8388608 & e.$$.dirty[0]) | (268435456 & e.$$.dirty[3]) && q && wo.set(X ? 0 : 20),
        131072 & e.$$.dirty[4] && o(46, (V = me ? `transform: translateY(${me}px)` : void 0))
    }),
    [
      We,
      Ae,
      Ee,
      Le,
      ze,
      Be,
      Ve,
      He,
      Xe,
      Ye,
      Ge,
      qe,
      nt,
      ut,
      ht,
      pt,
      mt,
      gt,
      ft,
      $t,
      yt,
      xo,
      l,
      X,
      u,
      K,
      te,
      oe,
      M,
      A,
      E,
      qt,
      p,
      f,
      J,
      $,
      y,
      z,
      C,
      T,
      P,
      L,
      F,
      B,
      D,
      O,
      V,
      ge,
      ye,
      be,
      xt,
      vt,
      wt,
      kt,
      Mt,
      Ct,
      Tt,
      Pt,
      At,
      Et,
      Lt,
      Ft,
      zt,
      Bt,
      Dt,
      Ot,
      Wt,
      Vt,
      _t,
      (e) => {
        if (!ct) return !0
        const t = je(_)
        return Qe(t, 1 / Z), Je(t, j), Qe(t, l), ct(e, { ...t, x: t.x + N.x, y: t.y + N.y })
      },
      Xt,
      ({ value: e }, t) => {
        o(0, (We = e)), (ot || /enter/i.test(t.key)) && Yt(e)
      },
      (e) => {
        if ('eraser' === We) Kt = qt.eraseShape()
        else if (We && Oe[We]) {
          const [e, t] = Oe[We]
          Kt = qt.createShape({ ...e, ...k }, t)
        } else Kt = void 0
        return !!Kt && (Kt.start(e), !0)
      },
      (e) => !!Kt && (Kt.update(e), !0),
      (e) => !!Kt && (Kt.release(e), !0),
      (e) => !!Kt && (Kt.cancel(e), (Kt = void 0), !0),
      (e) =>
        !!Kt &&
        (Kt.end(e),
        (Kt = void 0),
        at && (!0 === it || (Array.isArray(it) && it.includes(We))) && o(0, (We = 'move')),
        !0),
      function (e) {
        Object.keys(e).forEach((t) => o(109, (Jt[t] = e[t]), Jt)),
          z('selectstyle', e),
          x &&
            (qt.updateMarkupShape(x, e),
            clearTimeout(Qt),
            (Qt = setTimeout(() => {
              bo()
            }, 200)))
      },
      (e) => o(110, (eo = e)),
      () => {
        no = !1
      },
      (e, t) => {
        if (no) return
        const { beforeAddShape: o = () => !0 } = bt,
          i = Gt(t),
          n = qt.getMarkupItemDraft(),
          r = dt(ae, {
            x: i.x + (K.x || 0),
            y: i.y + (K.y || 0),
          })
        if ((n && !r && qt.discardMarkupItemDraft(), r)) {
          if (!n) {
            const n = Go(e, ae),
              r = to(n, i)
            return o(r) ? (gi(r), void qt.addShape(r)) : ((no = !0), void t.preventDefault())
          }
          ti(n) && ((i.x -= 0.5 * n.width), (i.y -= 0.5 * n.height)),
            e.shape &&
              (po(e.shape, 'x') && (i.x = e.shape.x), po(e.shape, 'y') && (i.y = e.shape.y)),
            qt.updateMarkupShape(n, i)
        }
      },
      (e, t) => {
        if (no) return
        const o = Gt(t)
        if (
          !dt(ae, {
            x: o.x + (K.x || 0),
            y: o.y + (K.y || 0),
          })
        )
          return void qt.discardMarkupItemDraft()
        const i = qt.confirmMarkupItemDraft()
        qt.selectShape(i), z('addshape', i), St.write()
      },
      (e) => oo(e),
      (e) => {
        return (t = e.detail.resources), (o = Gt(e.detail.event)), t.forEach((e) => oo(e, o))
        var t, o
      },
      () => {
        In(_t, (ce = !0), ce), o(112, (lo = !0)), (co = !1), (ao = j), (so = i ? H || 1 : H || G)
      },
      (e) => {
        const { scalar: t = 1, translation: i, isMultiTouching: n } = e.detail
        if (!ao || (!n && !A)) return
        n && $e(i, 0.5), ro || o(111, (ro = n))
        ho = de(j)
        const s = ne(ao.x + i.x, ao.y + i.y),
          l = de(s)
        ;(co = l < ho), L && Bt.set($a(so * t, r, a)), Dt.set(s)
      },
      (e) => {
        if ((o(112, (lo = !1)), o(111, (ro = !1)), co && ho < 50))
          return (ao = void 0), (so = void 0), void Dt.set(ie())
      },
      (e) => {
        if (
          (o(112, (lo = !1)),
          o(111, (ro = !1)),
          (ao = void 0),
          (so = void 0),
          A && e.detail.isDoubleTap)
        )
          return Nt()
        In(_t, (ce = !1), ce), Zt()
      },
      (e) => {
        if ((e.preventDefault(), e.stopPropagation(), yo)) return
        clearTimeout(mo)
        const t = ie(),
          o = j,
          n = Date.now(),
          s = n - go
        go = n
        const l = s < 24
        fo = l ? fo + 1 : 0
        const c = -1 * ac(e),
          d = Y ? G : i ? 1 : G,
          u = Y ? H || G : i ? H || 1 : H || G,
          h = u * (1 + c / (l ? 50 : 100)),
          p = Math.abs(h - d),
          m = h < u,
          g = (u > d && m) || (u < d && h > u),
          f = fo >= 5
        if ((l || ($o = !1), fo > 0 && !$o && ($o = g), f && $o))
          return (
            Nt(),
            (yo = !0),
            void setTimeout(() => {
              yo = !1
            }, 100)
          )
        if (f) return
        !l &&
          g &&
          p <= 0.05 &&
          (mo = setTimeout(() => {
            Nt()
          }, 250)),
          In(Bt, (H = $a(h, r, a)), H)
        const $ = Gm(e, J, N),
          y = je(_)
        Qe(y, u), Je(y, o)
        const b = Ke(y),
          x = je(y)
        Qe(x, H - u + 1, $)
        const v = Ke(x),
          w = ((S = fe(v, b)), (k = u), (S.x /= k), (S.y /= k), S)
        var S, k
        ;((e, t, o) => {
          ;(e.x = t), (e.y = o)
        })(t, o.x + w.x, o.y + w.y),
          In(Dt, (j = m && l ? $e(j, 0.85) : t), j),
          Zt()
      },
      bo,
      vo,
      wo,
      Ue,
      Fe,
      De,
      Oe,
      _e,
      Ze,
      Ne,
      et,
      tt,
      ot,
      it,
      rt,
      at,
      st,
      lt,
      ct,
      bt,
      Jt,
      eo,
      ro,
      lo,
      Z,
      N,
      H,
      n,
      Y,
      G,
      r,
      a,
      q,
      s,
      c,
      d,
      h,
      m,
      g,
      Q,
      k,
      ee,
      b,
      x,
      v,
      S,
      re,
      R,
      le,
      ue,
      he,
      pe,
      me,
      function (t) {
        pr(e, t)
      },
      (e) => e[0] === We,
      (e) => {
        z('addshape', e), bo()
      },
      (e) => {
        z('selectshape', e)
      },
      (e) => {
        z('tapshape', e)
      },
      (e) => {
        z('updateshape', e), bo()
      },
      (e) => {
        z('removeshape', e), bo()
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(qt = e), o(31, qt)
        })
      },
      function (e) {
        ;(oe = e), Be.set(oe)
      },
      function (e) {
        ;(ge = e), At.set(ge)
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(xo = e), o(21, xo)
        })
      },
      (e) => !pu(e.target),
      function (t) {
        pr(e, t)
      },
    ]
  )
}
class S$ extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        w$,
        v$,
        xn,
        {
          isActive: 1,
          isActiveFraction: 2,
          isVisible: 3,
          stores: 93,
          locale: 4,
          shapes: 5,
          toolbar: 94,
          toolShapes: 95,
          toolActive: 0,
          toolSelectRadius: 6,
          zoomOptions: 96,
          zoomAdjustStep: 97,
          zoomAdjustFactor: 98,
          textInputMode: 7,
          interactionMode: 92,
          shapeControls: 8,
          enableButtonFlipVertical: 9,
          enablePresetSelectImage: 10,
          enablePresetDropImage: 11,
          enableZoom: 99,
          enablePan: 100,
          enableSelectToolToAddShape: 101,
          enableAutoSelectMoveTool: 102,
          enableTapToAddText: 12,
          enableZoomControls: 103,
          enableMoveTool: 104,
          enableViewTool: 105,
          willRenderPresetToolbar: 106,
          willStartInteraction: 107,
          shapePresets: 13,
          utilKey: 14,
          mapScreenPointToImagePoint: 15,
          mapImagePointToScreenPoint: 16,
          imageRotation: 17,
          imageFlipX: 18,
          imageFlipY: 19,
          parentRect: 20,
          hooks: 108,
        },
        [-1, -1, -1, -1, -1, -1, -1]
      )
  }
  get isActive() {
    return this.$$.ctx[1]
  }
  set isActive(e) {
    this.$set({
      isActive: e,
    }),
      Cr()
  }
  get isActiveFraction() {
    return this.$$.ctx[2]
  }
  set isActiveFraction(e) {
    this.$set({
      isActiveFraction: e,
    }),
      Cr()
  }
  get isVisible() {
    return this.$$.ctx[3]
  }
  set isVisible(e) {
    this.$set({
      isVisible: e,
    }),
      Cr()
  }
  get stores() {
    return this.$$.ctx[93]
  }
  set stores(e) {
    this.$set({
      stores: e,
    }),
      Cr()
  }
  get locale() {
    return this.$$.ctx[4]
  }
  set locale(e) {
    this.$set({
      locale: e,
    }),
      Cr()
  }
  get shapes() {
    return this.$$.ctx[5]
  }
  set shapes(e) {
    this.$set({
      shapes: e,
    }),
      Cr()
  }
  get toolbar() {
    return this.$$.ctx[94]
  }
  set toolbar(e) {
    this.$set({
      toolbar: e,
    }),
      Cr()
  }
  get toolShapes() {
    return this.$$.ctx[95]
  }
  set toolShapes(e) {
    this.$set({
      toolShapes: e,
    }),
      Cr()
  }
  get toolActive() {
    return this.$$.ctx[0]
  }
  set toolActive(e) {
    this.$set({
      toolActive: e,
    }),
      Cr()
  }
  get toolSelectRadius() {
    return this.$$.ctx[6]
  }
  set toolSelectRadius(e) {
    this.$set({
      toolSelectRadius: e,
    }),
      Cr()
  }
  get zoomOptions() {
    return this.$$.ctx[96]
  }
  set zoomOptions(e) {
    this.$set({
      zoomOptions: e,
    }),
      Cr()
  }
  get zoomAdjustStep() {
    return this.$$.ctx[97]
  }
  set zoomAdjustStep(e) {
    this.$set({
      zoomAdjustStep: e,
    }),
      Cr()
  }
  get zoomAdjustFactor() {
    return this.$$.ctx[98]
  }
  set zoomAdjustFactor(e) {
    this.$set({
      zoomAdjustFactor: e,
    }),
      Cr()
  }
  get textInputMode() {
    return this.$$.ctx[7]
  }
  set textInputMode(e) {
    this.$set({
      textInputMode: e,
    }),
      Cr()
  }
  get interactionMode() {
    return this.$$.ctx[92]
  }
  set interactionMode(e) {
    this.$set({
      interactionMode: e,
    }),
      Cr()
  }
  get shapeControls() {
    return this.$$.ctx[8]
  }
  set shapeControls(e) {
    this.$set({
      shapeControls: e,
    }),
      Cr()
  }
  get enableButtonFlipVertical() {
    return this.$$.ctx[9]
  }
  set enableButtonFlipVertical(e) {
    this.$set({
      enableButtonFlipVertical: e,
    }),
      Cr()
  }
  get enablePresetSelectImage() {
    return this.$$.ctx[10]
  }
  set enablePresetSelectImage(e) {
    this.$set({
      enablePresetSelectImage: e,
    }),
      Cr()
  }
  get enablePresetDropImage() {
    return this.$$.ctx[11]
  }
  set enablePresetDropImage(e) {
    this.$set({
      enablePresetDropImage: e,
    }),
      Cr()
  }
  get enableZoom() {
    return this.$$.ctx[99]
  }
  set enableZoom(e) {
    this.$set({
      enableZoom: e,
    }),
      Cr()
  }
  get enablePan() {
    return this.$$.ctx[100]
  }
  set enablePan(e) {
    this.$set({
      enablePan: e,
    }),
      Cr()
  }
  get enableSelectToolToAddShape() {
    return this.$$.ctx[101]
  }
  set enableSelectToolToAddShape(e) {
    this.$set({
      enableSelectToolToAddShape: e,
    }),
      Cr()
  }
  get enableAutoSelectMoveTool() {
    return this.$$.ctx[102]
  }
  set enableAutoSelectMoveTool(e) {
    this.$set({
      enableAutoSelectMoveTool: e,
    }),
      Cr()
  }
  get enableTapToAddText() {
    return this.$$.ctx[12]
  }
  set enableTapToAddText(e) {
    this.$set({
      enableTapToAddText: e,
    }),
      Cr()
  }
  get enableZoomControls() {
    return this.$$.ctx[103]
  }
  set enableZoomControls(e) {
    this.$set({
      enableZoomControls: e,
    }),
      Cr()
  }
  get enableMoveTool() {
    return this.$$.ctx[104]
  }
  set enableMoveTool(e) {
    this.$set({
      enableMoveTool: e,
    }),
      Cr()
  }
  get enableViewTool() {
    return this.$$.ctx[105]
  }
  set enableViewTool(e) {
    this.$set({
      enableViewTool: e,
    }),
      Cr()
  }
  get willRenderPresetToolbar() {
    return this.$$.ctx[106]
  }
  set willRenderPresetToolbar(e) {
    this.$set({
      willRenderPresetToolbar: e,
    }),
      Cr()
  }
  get willStartInteraction() {
    return this.$$.ctx[107]
  }
  set willStartInteraction(e) {
    this.$set({
      willStartInteraction: e,
    }),
      Cr()
  }
  get shapePresets() {
    return this.$$.ctx[13]
  }
  set shapePresets(e) {
    this.$set({
      shapePresets: e,
    }),
      Cr()
  }
  get utilKey() {
    return this.$$.ctx[14]
  }
  set utilKey(e) {
    this.$set({
      utilKey: e,
    }),
      Cr()
  }
  get mapScreenPointToImagePoint() {
    return this.$$.ctx[15]
  }
  set mapScreenPointToImagePoint(e) {
    this.$set({
      mapScreenPointToImagePoint: e,
    }),
      Cr()
  }
  get mapImagePointToScreenPoint() {
    return this.$$.ctx[16]
  }
  set mapImagePointToScreenPoint(e) {
    this.$set({
      mapImagePointToScreenPoint: e,
    }),
      Cr()
  }
  get imageRotation() {
    return this.$$.ctx[17]
  }
  set imageRotation(e) {
    this.$set({
      imageRotation: e,
    }),
      Cr()
  }
  get imageFlipX() {
    return this.$$.ctx[18]
  }
  set imageFlipX(e) {
    this.$set({
      imageFlipX: e,
    }),
      Cr()
  }
  get imageFlipY() {
    return this.$$.ctx[19]
  }
  set imageFlipY(e) {
    this.$set({
      imageFlipY: e,
    }),
      Cr()
  }
  get parentRect() {
    return this.$$.ctx[20]
  }
  set parentRect(e) {
    this.$set({
      parentRect: e,
    }),
      Cr()
  }
  get hooks() {
    return this.$$.ctx[108]
  }
  set hooks(e) {
    this.$set({
      hooks: e,
    }),
      Cr()
  }
}
var k$ = (e, t, o, i, n, r, a, s, l) => {
    const c = se(e),
      d = 0.5 * o.width,
      u = 0.5 * o.height,
      h = 0.5 * t.width,
      p = 0.5 * t.height,
      m = n.x + i.x,
      g = n.y + i.y
    s && (c.x = o.width - c.x), l && (c.y = o.height - c.y)
    const f = Math.cos(r),
      $ = Math.sin(r)
    ;(c.x -= d), (c.y -= u)
    const y = c.x * f - c.y * $,
      b = c.x * $ + c.y * f
    ;(c.x = d + y),
      (c.y = u + b),
      (c.x *= a),
      (c.y *= a),
      (c.x += h),
      (c.y += p),
      (c.x += m),
      (c.y += g),
      (c.x -= d * a),
      (c.y -= u * a)
    const x = (n.x - m) * a,
      v = (n.y - g) * a,
      w = x * f - v * $,
      S = x * $ + v * f
    return (c.x += w), (c.y += S), c
  },
  M$ = (e, t, o, i, n, r, a, s, l) => {
    const c = se(e),
      d = Fe(o),
      u = Fe(t),
      h = ne(n.x + i.x, n.y + i.y),
      p = Math.cos(r),
      m = Math.sin(r)
    ;(c.x -= u.x), (c.y -= u.y)
    const g = (n.x - h.x) * a,
      f = (n.y - h.y) * a,
      $ = g * p - f * m,
      y = g * m + f * p
    ;(c.x -= $), (c.y -= y), (c.x -= h.x), (c.y -= h.y), (c.x /= a), (c.y /= a)
    const b = c.x * p + c.y * m,
      x = c.x * m - c.y * p
    return (
      (c.x = b),
      (c.y = -x),
      (c.x += d.x),
      (c.y += d.y),
      s && (c.x = o.width - c.x),
      l && (c.y = o.height - c.y),
      c
    )
  }

function C$(e) {
  let t, o, i

  function n(t) {
    e[57](t)
  }
  let r = {
    stores: e[4],
    locale: e[5],
    isActive: e[1],
    isActiveFraction: e[2],
    isVisible: e[3],
    mapScreenPointToImagePoint: e[41],
    mapImagePointToScreenPoint: e[42],
    utilKey: 'annotate',
    imageRotation: e[43],
    imageFlipX: e[39],
    imageFlipY: e[40],
    shapes: e[45],
    toolbar: e[17] || e[6],
    toolShapes: e[18] || e[7],
    zoomOptions: e[12],
    zoomAdjustStep: e[13],
    zoomAdjustFactor: e[14],
    interactionMode: e[15],
    enableSelectToolToAddShape: e[29],
    enableTapToAddText: e[30],
    enableZoomControls: e[25],
    enableZoom: e[26],
    enablePan: e[27],
    enableViewTool: e[28],
    enableMoveTool: e[32],
    enableAutoSelectMoveTool: e[31],
    shapeControls: e[19] || e[8],
    shapePresets: e[23],
    enableButtonFlipVertical: e[20],
    parentRect: e[46],
    enablePresetDropImage: e[22],
    enablePresetSelectImage: e[21],
    toolSelectRadius: e[9],
    textInputMode: e[10],
    willStartInteraction: e[11],
    willRenderPresetToolbar: e[24] || e[16],
    hooks: {
      willRenderShapeControls: e[33],
      beforeAddShape: e[34],
      beforeRemoveShape: e[35],
      beforeDeselectShape: e[36],
      beforeSelectShape: e[37],
      beforeUpdateShape: e[38],
    },
  }
  return (
    void 0 !== e[0] && (r.toolActive = e[0]),
    (t = new S$({
      props: r,
    })),
    gr.push(() => Nr(t, 'toolActive', n)),
    t.$on('measure', e[58]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, i) {
        const n = {}
        16 & i[0] && (n.stores = e[4]),
          32 & i[0] && (n.locale = e[5]),
          2 & i[0] && (n.isActive = e[1]),
          4 & i[0] && (n.isActiveFraction = e[2]),
          8 & i[0] && (n.isVisible = e[3]),
          1024 & i[1] && (n.mapScreenPointToImagePoint = e[41]),
          2048 & i[1] && (n.mapImagePointToScreenPoint = e[42]),
          4096 & i[1] && (n.imageRotation = e[43]),
          256 & i[1] && (n.imageFlipX = e[39]),
          512 & i[1] && (n.imageFlipY = e[40]),
          131136 & i[0] && (n.toolbar = e[17] || e[6]),
          262272 & i[0] && (n.toolShapes = e[18] || e[7]),
          4096 & i[0] && (n.zoomOptions = e[12]),
          8192 & i[0] && (n.zoomAdjustStep = e[13]),
          16384 & i[0] && (n.zoomAdjustFactor = e[14]),
          32768 & i[0] && (n.interactionMode = e[15]),
          536870912 & i[0] && (n.enableSelectToolToAddShape = e[29]),
          1073741824 & i[0] && (n.enableTapToAddText = e[30]),
          33554432 & i[0] && (n.enableZoomControls = e[25]),
          67108864 & i[0] && (n.enableZoom = e[26]),
          134217728 & i[0] && (n.enablePan = e[27]),
          268435456 & i[0] && (n.enableViewTool = e[28]),
          2 & i[1] && (n.enableMoveTool = e[32]),
          1 & i[1] && (n.enableAutoSelectMoveTool = e[31]),
          524544 & i[0] && (n.shapeControls = e[19] || e[8]),
          8388608 & i[0] && (n.shapePresets = e[23]),
          1048576 & i[0] && (n.enableButtonFlipVertical = e[20]),
          4194304 & i[0] && (n.enablePresetDropImage = e[22]),
          2097152 & i[0] && (n.enablePresetSelectImage = e[21]),
          512 & i[0] && (n.toolSelectRadius = e[9]),
          1024 & i[0] && (n.textInputMode = e[10]),
          2048 & i[0] && (n.willStartInteraction = e[11]),
          16842752 & i[0] && (n.willRenderPresetToolbar = e[24] || e[16]),
          252 & i[1] &&
            (n.hooks = {
              willRenderShapeControls: e[33],
              beforeAddShape: e[34],
              beforeRemoveShape: e[35],
              beforeDeselectShape: e[36],
              beforeSelectShape: e[37],
              beforeUpdateShape: e[38],
            }),
          !o && 1 & i[0] && ((o = !0), (n.toolActive = e[0]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function T$(e, t, o) {
  let i, n, r, a, s, l, c, d, u
  let { isActive: h } = t,
    { isActiveFraction: p } = t,
    { isVisible: m } = t,
    { stores: g } = t,
    { locale: f = {} } = t,
    { markupEditorToolbar: $ } = t,
    { markupEditorToolStyles: y } = t,
    { markupEditorShapeStyleControls: b } = t,
    { markupEditorToolSelectRadius: x } = t,
    { markupEditorTextInputMode: v } = t,
    { markupEditorWillStartInteraction: w } = t,
    { markupEditorZoomLevels: S } = t,
    { markupEditorZoomAdjustStep: k } = t,
    { markupEditorZoomAdjustFactor: M } = t,
    { markupEditorInteractionMode: C } = t,
    { willRenderShapePresetToolbar: T } = t,
    { annotateTools: P } = t,
    { annotateToolShapes: I } = t,
    { annotateShapeControls: R } = t,
    { annotateActiveTool: A } = t,
    { annotateEnableButtonFlipVertical: E = !1 } = t,
    { annotateEnableSelectImagePreset: L = !1 } = t,
    { annotateEnableDropImagePreset: F = !0 } = t,
    { annotatePresets: z = [] } = t,
    { annotateWillRenderShapePresetToolbar: B } = t,
    { enableZoomControls: D = !0 } = t,
    { enableZoom: O = !0 } = t,
    { enablePan: W = !0 } = t,
    { enableViewTool: V } = t,
    { enableSelectToolToAddShape: _ } = t,
    { enableTapToAddText: Z } = t,
    { enableAutoSelectMoveTool: j } = t,
    { enableMoveTool: N } = t,
    { willRenderShapeControls: H } = t,
    { beforeAddShape: U } = t,
    { beforeRemoveShape: X } = t,
    { beforeDeselectShape: Y } = t,
    { beforeSelectShape: G } = t,
    { beforeUpdateShape: q } = t
  const {
    rootRect: K,
    imageAnnotation: J,
    imageSize: Q,
    imageRotation: ee,
    imageFlipX: te,
    imageFlipY: oe,
    imageTransforms: ie,
    imageTransformsInterpolated: ne,
  } = g
  return (
    Sn(e, K, (e) => o(53, (r = e))),
    Sn(e, Q, (e) => o(54, (a = e))),
    Sn(e, ee, (e) => o(43, (u = e))),
    Sn(e, te, (e) => o(39, (c = e))),
    Sn(e, oe, (e) => o(40, (d = e))),
    Sn(e, ie, (e) => o(56, (l = e))),
    Sn(e, ne, (e) => o(55, (s = e))),
    (e.$$set = (e) => {
      'isActive' in e && o(1, (h = e.isActive)),
        'isActiveFraction' in e && o(2, (p = e.isActiveFraction)),
        'isVisible' in e && o(3, (m = e.isVisible)),
        'stores' in e && o(4, (g = e.stores)),
        'locale' in e && o(5, (f = e.locale)),
        'markupEditorToolbar' in e && o(6, ($ = e.markupEditorToolbar)),
        'markupEditorToolStyles' in e && o(7, (y = e.markupEditorToolStyles)),
        'markupEditorShapeStyleControls' in e && o(8, (b = e.markupEditorShapeStyleControls)),
        'markupEditorToolSelectRadius' in e && o(9, (x = e.markupEditorToolSelectRadius)),
        'markupEditorTextInputMode' in e && o(10, (v = e.markupEditorTextInputMode)),
        'markupEditorWillStartInteraction' in e && o(11, (w = e.markupEditorWillStartInteraction)),
        'markupEditorZoomLevels' in e && o(12, (S = e.markupEditorZoomLevels)),
        'markupEditorZoomAdjustStep' in e && o(13, (k = e.markupEditorZoomAdjustStep)),
        'markupEditorZoomAdjustFactor' in e && o(14, (M = e.markupEditorZoomAdjustFactor)),
        'markupEditorInteractionMode' in e && o(15, (C = e.markupEditorInteractionMode)),
        'willRenderShapePresetToolbar' in e && o(16, (T = e.willRenderShapePresetToolbar)),
        'annotateTools' in e && o(17, (P = e.annotateTools)),
        'annotateToolShapes' in e && o(18, (I = e.annotateToolShapes)),
        'annotateShapeControls' in e && o(19, (R = e.annotateShapeControls)),
        'annotateActiveTool' in e && o(0, (A = e.annotateActiveTool)),
        'annotateEnableButtonFlipVertical' in e && o(20, (E = e.annotateEnableButtonFlipVertical)),
        'annotateEnableSelectImagePreset' in e && o(21, (L = e.annotateEnableSelectImagePreset)),
        'annotateEnableDropImagePreset' in e && o(22, (F = e.annotateEnableDropImagePreset)),
        'annotatePresets' in e && o(23, (z = e.annotatePresets)),
        'annotateWillRenderShapePresetToolbar' in e &&
          o(24, (B = e.annotateWillRenderShapePresetToolbar)),
        'enableZoomControls' in e && o(25, (D = e.enableZoomControls)),
        'enableZoom' in e && o(26, (O = e.enableZoom)),
        'enablePan' in e && o(27, (W = e.enablePan)),
        'enableViewTool' in e && o(28, (V = e.enableViewTool)),
        'enableSelectToolToAddShape' in e && o(29, (_ = e.enableSelectToolToAddShape)),
        'enableTapToAddText' in e && o(30, (Z = e.enableTapToAddText)),
        'enableAutoSelectMoveTool' in e && o(31, (j = e.enableAutoSelectMoveTool)),
        'enableMoveTool' in e && o(32, (N = e.enableMoveTool)),
        'willRenderShapeControls' in e && o(33, (H = e.willRenderShapeControls)),
        'beforeAddShape' in e && o(34, (U = e.beforeAddShape)),
        'beforeRemoveShape' in e && o(35, (X = e.beforeRemoveShape)),
        'beforeDeselectShape' in e && o(36, (Y = e.beforeDeselectShape)),
        'beforeSelectShape' in e && o(37, (G = e.beforeSelectShape)),
        'beforeUpdateShape' in e && o(38, (q = e.beforeUpdateShape))
    }),
    (e.$$.update = () => {
      62915328 & e.$$.dirty[1] &&
        o(41, (i = (e) => M$(e, r, a, s.origin, s.translation, l.rotation.z, s.scale, c, d))),
        62915328 & e.$$.dirty[1] &&
          o(42, (n = (e) => k$(e, r, a, s.origin, s.translation, l.rotation.z, s.scale, c, d)))
    }),
    [
      A,
      h,
      p,
      m,
      g,
      f,
      $,
      y,
      b,
      x,
      v,
      w,
      S,
      k,
      M,
      C,
      T,
      P,
      I,
      R,
      E,
      L,
      F,
      z,
      B,
      D,
      O,
      W,
      V,
      _,
      Z,
      j,
      N,
      H,
      U,
      X,
      Y,
      G,
      q,
      c,
      d,
      i,
      n,
      u,
      K,
      J,
      Q,
      ee,
      te,
      oe,
      ie,
      ne,
      'annotate',
      r,
      a,
      s,
      l,
      function (e) {
        ;(A = e), o(0, A)
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var P$ = {
  util: [
    'annotate',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            T$,
            C$,
            xn,
            {
              name: 52,
              isActive: 1,
              isActiveFraction: 2,
              isVisible: 3,
              stores: 4,
              locale: 5,
              markupEditorToolbar: 6,
              markupEditorToolStyles: 7,
              markupEditorShapeStyleControls: 8,
              markupEditorToolSelectRadius: 9,
              markupEditorTextInputMode: 10,
              markupEditorWillStartInteraction: 11,
              markupEditorZoomLevels: 12,
              markupEditorZoomAdjustStep: 13,
              markupEditorZoomAdjustFactor: 14,
              markupEditorInteractionMode: 15,
              willRenderShapePresetToolbar: 16,
              annotateTools: 17,
              annotateToolShapes: 18,
              annotateShapeControls: 19,
              annotateActiveTool: 0,
              annotateEnableButtonFlipVertical: 20,
              annotateEnableSelectImagePreset: 21,
              annotateEnableDropImagePreset: 22,
              annotatePresets: 23,
              annotateWillRenderShapePresetToolbar: 24,
              enableZoomControls: 25,
              enableZoom: 26,
              enablePan: 27,
              enableViewTool: 28,
              enableSelectToolToAddShape: 29,
              enableTapToAddText: 30,
              enableAutoSelectMoveTool: 31,
              enableMoveTool: 32,
              willRenderShapeControls: 33,
              beforeAddShape: 34,
              beforeRemoveShape: 35,
              beforeDeselectShape: 36,
              beforeSelectShape: 37,
              beforeUpdateShape: 38,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[52]
      }
      get isActive() {
        return this.$$.ctx[1]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get isActiveFraction() {
        return this.$$.ctx[2]
      }
      set isActiveFraction(e) {
        this.$set({
          isActiveFraction: e,
        }),
          Cr()
      }
      get isVisible() {
        return this.$$.ctx[3]
      }
      set isVisible(e) {
        this.$set({
          isVisible: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[4]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[5]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get markupEditorToolbar() {
        return this.$$.ctx[6]
      }
      set markupEditorToolbar(e) {
        this.$set({
          markupEditorToolbar: e,
        }),
          Cr()
      }
      get markupEditorToolStyles() {
        return this.$$.ctx[7]
      }
      set markupEditorToolStyles(e) {
        this.$set({
          markupEditorToolStyles: e,
        }),
          Cr()
      }
      get markupEditorShapeStyleControls() {
        return this.$$.ctx[8]
      }
      set markupEditorShapeStyleControls(e) {
        this.$set({
          markupEditorShapeStyleControls: e,
        }),
          Cr()
      }
      get markupEditorToolSelectRadius() {
        return this.$$.ctx[9]
      }
      set markupEditorToolSelectRadius(e) {
        this.$set({
          markupEditorToolSelectRadius: e,
        }),
          Cr()
      }
      get markupEditorTextInputMode() {
        return this.$$.ctx[10]
      }
      set markupEditorTextInputMode(e) {
        this.$set({
          markupEditorTextInputMode: e,
        }),
          Cr()
      }
      get markupEditorWillStartInteraction() {
        return this.$$.ctx[11]
      }
      set markupEditorWillStartInteraction(e) {
        this.$set({
          markupEditorWillStartInteraction: e,
        }),
          Cr()
      }
      get markupEditorZoomLevels() {
        return this.$$.ctx[12]
      }
      set markupEditorZoomLevels(e) {
        this.$set({
          markupEditorZoomLevels: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustStep() {
        return this.$$.ctx[13]
      }
      set markupEditorZoomAdjustStep(e) {
        this.$set({
          markupEditorZoomAdjustStep: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustFactor() {
        return this.$$.ctx[14]
      }
      set markupEditorZoomAdjustFactor(e) {
        this.$set({
          markupEditorZoomAdjustFactor: e,
        }),
          Cr()
      }
      get markupEditorInteractionMode() {
        return this.$$.ctx[15]
      }
      set markupEditorInteractionMode(e) {
        this.$set({
          markupEditorInteractionMode: e,
        }),
          Cr()
      }
      get willRenderShapePresetToolbar() {
        return this.$$.ctx[16]
      }
      set willRenderShapePresetToolbar(e) {
        this.$set({
          willRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get annotateTools() {
        return this.$$.ctx[17]
      }
      set annotateTools(e) {
        this.$set({
          annotateTools: e,
        }),
          Cr()
      }
      get annotateToolShapes() {
        return this.$$.ctx[18]
      }
      set annotateToolShapes(e) {
        this.$set({
          annotateToolShapes: e,
        }),
          Cr()
      }
      get annotateShapeControls() {
        return this.$$.ctx[19]
      }
      set annotateShapeControls(e) {
        this.$set({
          annotateShapeControls: e,
        }),
          Cr()
      }
      get annotateActiveTool() {
        return this.$$.ctx[0]
      }
      set annotateActiveTool(e) {
        this.$set({
          annotateActiveTool: e,
        }),
          Cr()
      }
      get annotateEnableButtonFlipVertical() {
        return this.$$.ctx[20]
      }
      set annotateEnableButtonFlipVertical(e) {
        this.$set({
          annotateEnableButtonFlipVertical: e,
        }),
          Cr()
      }
      get annotateEnableSelectImagePreset() {
        return this.$$.ctx[21]
      }
      set annotateEnableSelectImagePreset(e) {
        this.$set({
          annotateEnableSelectImagePreset: e,
        }),
          Cr()
      }
      get annotateEnableDropImagePreset() {
        return this.$$.ctx[22]
      }
      set annotateEnableDropImagePreset(e) {
        this.$set({
          annotateEnableDropImagePreset: e,
        }),
          Cr()
      }
      get annotatePresets() {
        return this.$$.ctx[23]
      }
      set annotatePresets(e) {
        this.$set({
          annotatePresets: e,
        }),
          Cr()
      }
      get annotateWillRenderShapePresetToolbar() {
        return this.$$.ctx[24]
      }
      set annotateWillRenderShapePresetToolbar(e) {
        this.$set({
          annotateWillRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get enableZoomControls() {
        return this.$$.ctx[25]
      }
      set enableZoomControls(e) {
        this.$set({
          enableZoomControls: e,
        }),
          Cr()
      }
      get enableZoom() {
        return this.$$.ctx[26]
      }
      set enableZoom(e) {
        this.$set({
          enableZoom: e,
        }),
          Cr()
      }
      get enablePan() {
        return this.$$.ctx[27]
      }
      set enablePan(e) {
        this.$set({
          enablePan: e,
        }),
          Cr()
      }
      get enableViewTool() {
        return this.$$.ctx[28]
      }
      set enableViewTool(e) {
        this.$set({
          enableViewTool: e,
        }),
          Cr()
      }
      get enableSelectToolToAddShape() {
        return this.$$.ctx[29]
      }
      set enableSelectToolToAddShape(e) {
        this.$set({
          enableSelectToolToAddShape: e,
        }),
          Cr()
      }
      get enableTapToAddText() {
        return this.$$.ctx[30]
      }
      set enableTapToAddText(e) {
        this.$set({
          enableTapToAddText: e,
        }),
          Cr()
      }
      get enableAutoSelectMoveTool() {
        return this.$$.ctx[31]
      }
      set enableAutoSelectMoveTool(e) {
        this.$set({
          enableAutoSelectMoveTool: e,
        }),
          Cr()
      }
      get enableMoveTool() {
        return this.$$.ctx[32]
      }
      set enableMoveTool(e) {
        this.$set({
          enableMoveTool: e,
        }),
          Cr()
      }
      get willRenderShapeControls() {
        return this.$$.ctx[33]
      }
      set willRenderShapeControls(e) {
        this.$set({
          willRenderShapeControls: e,
        }),
          Cr()
      }
      get beforeAddShape() {
        return this.$$.ctx[34]
      }
      set beforeAddShape(e) {
        this.$set({
          beforeAddShape: e,
        }),
          Cr()
      }
      get beforeRemoveShape() {
        return this.$$.ctx[35]
      }
      set beforeRemoveShape(e) {
        this.$set({
          beforeRemoveShape: e,
        }),
          Cr()
      }
      get beforeDeselectShape() {
        return this.$$.ctx[36]
      }
      set beforeDeselectShape(e) {
        this.$set({
          beforeDeselectShape: e,
        }),
          Cr()
      }
      get beforeSelectShape() {
        return this.$$.ctx[37]
      }
      set beforeSelectShape(e) {
        this.$set({
          beforeSelectShape: e,
        }),
          Cr()
      }
      get beforeUpdateShape() {
        return this.$$.ctx[38]
      }
      set beforeUpdateShape(e) {
        this.$set({
          beforeUpdateShape: e,
        }),
          Cr()
      }
    },
  ],
}

function I$(e) {
  let t, o, i

  function n(t) {
    e[49](t)
  }
  let r = {
    stores: e[4],
    locale: e[5],
    isActive: e[1],
    isActiveFraction: e[2],
    isVisible: e[3],
    mapScreenPointToImagePoint: e[39],
    mapImagePointToScreenPoint: e[40],
    utilKey: 'decorate',
    shapes: e[42],
    toolbar: e[17] || e[6],
    toolShapes: e[18] || e[7],
    shapeControls: e[19] || e[8],
    shapePresets: e[23],
    zoomOptions: e[12],
    zoomAdjustStep: e[13],
    zoomAdjustFactor: e[14],
    interactionMode: e[15],
    enableSelectToolToAddShape: e[25],
    enableTapToAddText: e[26],
    enableZoomControls: e[27],
    enableZoom: e[28],
    enablePan: e[29],
    enableViewTool: e[30],
    enableMoveTool: e[31],
    enableAutoSelectMoveTool: e[32],
    enablePresetSelectImage: e[21],
    enablePresetDropImage: e[22],
    enableButtonFlipVertical: e[20],
    parentRect: e[41],
    toolSelectRadius: e[9],
    textInputMode: e[10],
    willStartInteraction: e[11],
    willRenderPresetToolbar: e[24] || e[16],
    hooks: {
      willRenderShapeControls: e[33],
      beforeAddShape: e[34],
      beforeRemoveShape: e[35],
      beforeDeselectShape: e[36],
      beforeSelectShape: e[37],
      beforeUpdateShape: e[38],
    },
  }
  return (
    void 0 !== e[0] && (r.toolActive = e[0]),
    (t = new S$({
      props: r,
    })),
    gr.push(() => Nr(t, 'toolActive', n)),
    t.$on('measure', e[50]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, o) {
        Ur(t, e, o), (i = !0)
      },
      p(e, i) {
        const n = {}
        16 & i[0] && (n.stores = e[4]),
          32 & i[0] && (n.locale = e[5]),
          2 & i[0] && (n.isActive = e[1]),
          4 & i[0] && (n.isActiveFraction = e[2]),
          8 & i[0] && (n.isVisible = e[3]),
          256 & i[1] && (n.mapScreenPointToImagePoint = e[39]),
          512 & i[1] && (n.mapImagePointToScreenPoint = e[40]),
          131136 & i[0] && (n.toolbar = e[17] || e[6]),
          262272 & i[0] && (n.toolShapes = e[18] || e[7]),
          524544 & i[0] && (n.shapeControls = e[19] || e[8]),
          8388608 & i[0] && (n.shapePresets = e[23]),
          4096 & i[0] && (n.zoomOptions = e[12]),
          8192 & i[0] && (n.zoomAdjustStep = e[13]),
          16384 & i[0] && (n.zoomAdjustFactor = e[14]),
          32768 & i[0] && (n.interactionMode = e[15]),
          33554432 & i[0] && (n.enableSelectToolToAddShape = e[25]),
          67108864 & i[0] && (n.enableTapToAddText = e[26]),
          134217728 & i[0] && (n.enableZoomControls = e[27]),
          268435456 & i[0] && (n.enableZoom = e[28]),
          536870912 & i[0] && (n.enablePan = e[29]),
          1073741824 & i[0] && (n.enableViewTool = e[30]),
          1 & i[1] && (n.enableMoveTool = e[31]),
          2 & i[1] && (n.enableAutoSelectMoveTool = e[32]),
          2097152 & i[0] && (n.enablePresetSelectImage = e[21]),
          4194304 & i[0] && (n.enablePresetDropImage = e[22]),
          1048576 & i[0] && (n.enableButtonFlipVertical = e[20]),
          512 & i[0] && (n.toolSelectRadius = e[9]),
          1024 & i[0] && (n.textInputMode = e[10]),
          2048 & i[0] && (n.willStartInteraction = e[11]),
          16842752 & i[0] && (n.willRenderPresetToolbar = e[24] || e[16]),
          252 & i[1] &&
            (n.hooks = {
              willRenderShapeControls: e[33],
              beforeAddShape: e[34],
              beforeRemoveShape: e[35],
              beforeDeselectShape: e[36],
              beforeSelectShape: e[37],
              beforeUpdateShape: e[38],
            }),
          !o && 1 & i[0] && ((o = !0), (n.toolActive = e[0]), Sr(() => (o = !1))),
          t.$set(n)
      },
      i(e) {
        i || (Fr(t.$$.fragment, e), (i = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (i = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function R$(e, t, o) {
  let i, n, r, a, s
  let { isActive: l } = t,
    { isActiveFraction: c } = t,
    { isVisible: d } = t,
    { stores: u } = t,
    { locale: h = {} } = t,
    { markupEditorToolbar: p } = t,
    { markupEditorToolStyles: m } = t,
    { markupEditorShapeStyleControls: g } = t,
    { markupEditorToolSelectRadius: f } = t,
    { markupEditorTextInputMode: $ } = t,
    { markupEditorWillStartInteraction: y } = t,
    { markupEditorZoomLevels: b } = t,
    { markupEditorZoomAdjustStep: x } = t,
    { markupEditorZoomAdjustFactor: v } = t,
    { markupEditorInteractionMode: w } = t,
    { willRenderShapePresetToolbar: S } = t,
    { decorateTools: k } = t,
    { decorateToolShapes: M } = t,
    { decorateShapeControls: C } = t,
    { decorateActiveTool: T } = t,
    { decorateEnableButtonFlipVertical: P = !1 } = t,
    { decorateEnableSelectImagePreset: I = !1 } = t,
    { decorateEnableDropImagePreset: R = !0 } = t,
    { decoratePresets: A = [] } = t,
    { decorateWillRenderShapePresetToolbar: E } = t,
    { enableSelectToolToAddShape: L } = t,
    { enableTapToAddText: F } = t,
    { enableZoomControls: z = !0 } = t,
    { enableZoom: B = !0 } = t,
    { enablePan: D = !0 } = t,
    { enableViewTool: O } = t,
    { enableMoveTool: W } = t,
    { enableAutoSelectMoveTool: V } = t,
    { willRenderShapeControls: _ } = t,
    { beforeAddShape: Z } = t,
    { beforeRemoveShape: j } = t,
    { beforeDeselectShape: N } = t,
    { beforeSelectShape: H } = t,
    { beforeUpdateShape: U } = t
  const {
    imageCropRect: X,
    imageDecoration: Y,
    imageSelectionRectPresentation: G,
    imageTransformsInterpolated: q,
  } = u
  return (
    Sn(e, G, (e) => o(48, (s = e))),
    Sn(e, q, (e) => o(47, (a = e))),
    (e.$$set = (e) => {
      'isActive' in e && o(1, (l = e.isActive)),
        'isActiveFraction' in e && o(2, (c = e.isActiveFraction)),
        'isVisible' in e && o(3, (d = e.isVisible)),
        'stores' in e && o(4, (u = e.stores)),
        'locale' in e && o(5, (h = e.locale)),
        'markupEditorToolbar' in e && o(6, (p = e.markupEditorToolbar)),
        'markupEditorToolStyles' in e && o(7, (m = e.markupEditorToolStyles)),
        'markupEditorShapeStyleControls' in e && o(8, (g = e.markupEditorShapeStyleControls)),
        'markupEditorToolSelectRadius' in e && o(9, (f = e.markupEditorToolSelectRadius)),
        'markupEditorTextInputMode' in e && o(10, ($ = e.markupEditorTextInputMode)),
        'markupEditorWillStartInteraction' in e && o(11, (y = e.markupEditorWillStartInteraction)),
        'markupEditorZoomLevels' in e && o(12, (b = e.markupEditorZoomLevels)),
        'markupEditorZoomAdjustStep' in e && o(13, (x = e.markupEditorZoomAdjustStep)),
        'markupEditorZoomAdjustFactor' in e && o(14, (v = e.markupEditorZoomAdjustFactor)),
        'markupEditorInteractionMode' in e && o(15, (w = e.markupEditorInteractionMode)),
        'willRenderShapePresetToolbar' in e && o(16, (S = e.willRenderShapePresetToolbar)),
        'decorateTools' in e && o(17, (k = e.decorateTools)),
        'decorateToolShapes' in e && o(18, (M = e.decorateToolShapes)),
        'decorateShapeControls' in e && o(19, (C = e.decorateShapeControls)),
        'decorateActiveTool' in e && o(0, (T = e.decorateActiveTool)),
        'decorateEnableButtonFlipVertical' in e && o(20, (P = e.decorateEnableButtonFlipVertical)),
        'decorateEnableSelectImagePreset' in e && o(21, (I = e.decorateEnableSelectImagePreset)),
        'decorateEnableDropImagePreset' in e && o(22, (R = e.decorateEnableDropImagePreset)),
        'decoratePresets' in e && o(23, (A = e.decoratePresets)),
        'decorateWillRenderShapePresetToolbar' in e &&
          o(24, (E = e.decorateWillRenderShapePresetToolbar)),
        'enableSelectToolToAddShape' in e && o(25, (L = e.enableSelectToolToAddShape)),
        'enableTapToAddText' in e && o(26, (F = e.enableTapToAddText)),
        'enableZoomControls' in e && o(27, (z = e.enableZoomControls)),
        'enableZoom' in e && o(28, (B = e.enableZoom)),
        'enablePan' in e && o(29, (D = e.enablePan)),
        'enableViewTool' in e && o(30, (O = e.enableViewTool)),
        'enableMoveTool' in e && o(31, (W = e.enableMoveTool)),
        'enableAutoSelectMoveTool' in e && o(32, (V = e.enableAutoSelectMoveTool)),
        'willRenderShapeControls' in e && o(33, (_ = e.willRenderShapeControls)),
        'beforeAddShape' in e && o(34, (Z = e.beforeAddShape)),
        'beforeRemoveShape' in e && o(35, (j = e.beforeRemoveShape)),
        'beforeDeselectShape' in e && o(36, (N = e.beforeDeselectShape)),
        'beforeSelectShape' in e && o(37, (H = e.beforeSelectShape)),
        'beforeUpdateShape' in e && o(38, (U = e.beforeUpdateShape))
    }),
    (e.$$.update = () => {
      65536 & e.$$.dirty[1] && o(46, (i = a ? a.scale : 1)),
        163840 & e.$$.dirty[1] &&
          o(
            39,
            (n = (e) => {
              const t = se(e)
              return (t.x -= s.x), (t.y -= s.y), (t.x /= i), (t.y /= i), t
            })
          ),
        163840 & e.$$.dirty[1] &&
          o(
            40,
            (r = (e) => {
              const t = se(e)
              return (t.x *= i), (t.y *= i), (t.x += s.x), (t.y += s.y), t
            })
          )
    }),
    [
      T,
      l,
      c,
      d,
      u,
      h,
      p,
      m,
      g,
      f,
      $,
      y,
      b,
      x,
      v,
      w,
      S,
      k,
      M,
      C,
      P,
      I,
      R,
      A,
      E,
      L,
      F,
      z,
      B,
      D,
      O,
      W,
      V,
      _,
      Z,
      j,
      N,
      H,
      U,
      n,
      r,
      X,
      Y,
      G,
      q,
      'decorate',
      i,
      a,
      s,
      function (e) {
        ;(T = e), o(0, T)
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var A$ = {
  util: [
    'decorate',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            R$,
            I$,
            xn,
            {
              name: 45,
              isActive: 1,
              isActiveFraction: 2,
              isVisible: 3,
              stores: 4,
              locale: 5,
              markupEditorToolbar: 6,
              markupEditorToolStyles: 7,
              markupEditorShapeStyleControls: 8,
              markupEditorToolSelectRadius: 9,
              markupEditorTextInputMode: 10,
              markupEditorWillStartInteraction: 11,
              markupEditorZoomLevels: 12,
              markupEditorZoomAdjustStep: 13,
              markupEditorZoomAdjustFactor: 14,
              markupEditorInteractionMode: 15,
              willRenderShapePresetToolbar: 16,
              decorateTools: 17,
              decorateToolShapes: 18,
              decorateShapeControls: 19,
              decorateActiveTool: 0,
              decorateEnableButtonFlipVertical: 20,
              decorateEnableSelectImagePreset: 21,
              decorateEnableDropImagePreset: 22,
              decoratePresets: 23,
              decorateWillRenderShapePresetToolbar: 24,
              enableSelectToolToAddShape: 25,
              enableTapToAddText: 26,
              enableZoomControls: 27,
              enableZoom: 28,
              enablePan: 29,
              enableViewTool: 30,
              enableMoveTool: 31,
              enableAutoSelectMoveTool: 32,
              willRenderShapeControls: 33,
              beforeAddShape: 34,
              beforeRemoveShape: 35,
              beforeDeselectShape: 36,
              beforeSelectShape: 37,
              beforeUpdateShape: 38,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[45]
      }
      get isActive() {
        return this.$$.ctx[1]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get isActiveFraction() {
        return this.$$.ctx[2]
      }
      set isActiveFraction(e) {
        this.$set({
          isActiveFraction: e,
        }),
          Cr()
      }
      get isVisible() {
        return this.$$.ctx[3]
      }
      set isVisible(e) {
        this.$set({
          isVisible: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[4]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[5]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get markupEditorToolbar() {
        return this.$$.ctx[6]
      }
      set markupEditorToolbar(e) {
        this.$set({
          markupEditorToolbar: e,
        }),
          Cr()
      }
      get markupEditorToolStyles() {
        return this.$$.ctx[7]
      }
      set markupEditorToolStyles(e) {
        this.$set({
          markupEditorToolStyles: e,
        }),
          Cr()
      }
      get markupEditorShapeStyleControls() {
        return this.$$.ctx[8]
      }
      set markupEditorShapeStyleControls(e) {
        this.$set({
          markupEditorShapeStyleControls: e,
        }),
          Cr()
      }
      get markupEditorToolSelectRadius() {
        return this.$$.ctx[9]
      }
      set markupEditorToolSelectRadius(e) {
        this.$set({
          markupEditorToolSelectRadius: e,
        }),
          Cr()
      }
      get markupEditorTextInputMode() {
        return this.$$.ctx[10]
      }
      set markupEditorTextInputMode(e) {
        this.$set({
          markupEditorTextInputMode: e,
        }),
          Cr()
      }
      get markupEditorWillStartInteraction() {
        return this.$$.ctx[11]
      }
      set markupEditorWillStartInteraction(e) {
        this.$set({
          markupEditorWillStartInteraction: e,
        }),
          Cr()
      }
      get markupEditorZoomLevels() {
        return this.$$.ctx[12]
      }
      set markupEditorZoomLevels(e) {
        this.$set({
          markupEditorZoomLevels: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustStep() {
        return this.$$.ctx[13]
      }
      set markupEditorZoomAdjustStep(e) {
        this.$set({
          markupEditorZoomAdjustStep: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustFactor() {
        return this.$$.ctx[14]
      }
      set markupEditorZoomAdjustFactor(e) {
        this.$set({
          markupEditorZoomAdjustFactor: e,
        }),
          Cr()
      }
      get markupEditorInteractionMode() {
        return this.$$.ctx[15]
      }
      set markupEditorInteractionMode(e) {
        this.$set({
          markupEditorInteractionMode: e,
        }),
          Cr()
      }
      get willRenderShapePresetToolbar() {
        return this.$$.ctx[16]
      }
      set willRenderShapePresetToolbar(e) {
        this.$set({
          willRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get decorateTools() {
        return this.$$.ctx[17]
      }
      set decorateTools(e) {
        this.$set({
          decorateTools: e,
        }),
          Cr()
      }
      get decorateToolShapes() {
        return this.$$.ctx[18]
      }
      set decorateToolShapes(e) {
        this.$set({
          decorateToolShapes: e,
        }),
          Cr()
      }
      get decorateShapeControls() {
        return this.$$.ctx[19]
      }
      set decorateShapeControls(e) {
        this.$set({
          decorateShapeControls: e,
        }),
          Cr()
      }
      get decorateActiveTool() {
        return this.$$.ctx[0]
      }
      set decorateActiveTool(e) {
        this.$set({
          decorateActiveTool: e,
        }),
          Cr()
      }
      get decorateEnableButtonFlipVertical() {
        return this.$$.ctx[20]
      }
      set decorateEnableButtonFlipVertical(e) {
        this.$set({
          decorateEnableButtonFlipVertical: e,
        }),
          Cr()
      }
      get decorateEnableSelectImagePreset() {
        return this.$$.ctx[21]
      }
      set decorateEnableSelectImagePreset(e) {
        this.$set({
          decorateEnableSelectImagePreset: e,
        }),
          Cr()
      }
      get decorateEnableDropImagePreset() {
        return this.$$.ctx[22]
      }
      set decorateEnableDropImagePreset(e) {
        this.$set({
          decorateEnableDropImagePreset: e,
        }),
          Cr()
      }
      get decoratePresets() {
        return this.$$.ctx[23]
      }
      set decoratePresets(e) {
        this.$set({
          decoratePresets: e,
        }),
          Cr()
      }
      get decorateWillRenderShapePresetToolbar() {
        return this.$$.ctx[24]
      }
      set decorateWillRenderShapePresetToolbar(e) {
        this.$set({
          decorateWillRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get enableSelectToolToAddShape() {
        return this.$$.ctx[25]
      }
      set enableSelectToolToAddShape(e) {
        this.$set({
          enableSelectToolToAddShape: e,
        }),
          Cr()
      }
      get enableTapToAddText() {
        return this.$$.ctx[26]
      }
      set enableTapToAddText(e) {
        this.$set({
          enableTapToAddText: e,
        }),
          Cr()
      }
      get enableZoomControls() {
        return this.$$.ctx[27]
      }
      set enableZoomControls(e) {
        this.$set({
          enableZoomControls: e,
        }),
          Cr()
      }
      get enableZoom() {
        return this.$$.ctx[28]
      }
      set enableZoom(e) {
        this.$set({
          enableZoom: e,
        }),
          Cr()
      }
      get enablePan() {
        return this.$$.ctx[29]
      }
      set enablePan(e) {
        this.$set({
          enablePan: e,
        }),
          Cr()
      }
      get enableViewTool() {
        return this.$$.ctx[30]
      }
      set enableViewTool(e) {
        this.$set({
          enableViewTool: e,
        }),
          Cr()
      }
      get enableMoveTool() {
        return this.$$.ctx[31]
      }
      set enableMoveTool(e) {
        this.$set({
          enableMoveTool: e,
        }),
          Cr()
      }
      get enableAutoSelectMoveTool() {
        return this.$$.ctx[32]
      }
      set enableAutoSelectMoveTool(e) {
        this.$set({
          enableAutoSelectMoveTool: e,
        }),
          Cr()
      }
      get willRenderShapeControls() {
        return this.$$.ctx[33]
      }
      set willRenderShapeControls(e) {
        this.$set({
          willRenderShapeControls: e,
        }),
          Cr()
      }
      get beforeAddShape() {
        return this.$$.ctx[34]
      }
      set beforeAddShape(e) {
        this.$set({
          beforeAddShape: e,
        }),
          Cr()
      }
      get beforeRemoveShape() {
        return this.$$.ctx[35]
      }
      set beforeRemoveShape(e) {
        this.$set({
          beforeRemoveShape: e,
        }),
          Cr()
      }
      get beforeDeselectShape() {
        return this.$$.ctx[36]
      }
      set beforeDeselectShape(e) {
        this.$set({
          beforeDeselectShape: e,
        }),
          Cr()
      }
      get beforeSelectShape() {
        return this.$$.ctx[37]
      }
      set beforeSelectShape(e) {
        this.$set({
          beforeSelectShape: e,
        }),
          Cr()
      }
      get beforeUpdateShape() {
        return this.$$.ctx[38]
      }
      set beforeUpdateShape(e) {
        this.$set({
          beforeUpdateShape: e,
        }),
          Cr()
      }
    },
  ],
}

function E$(e) {
  let t, o
  return (
    (t = new S$({
      props: {
        stores: e[3],
        locale: e[4],
        isActive: e[0],
        isActiveFraction: e[1],
        isVisible: e[2],
        mapScreenPointToImagePoint: e[31],
        mapImagePointToScreenPoint: e[32],
        enableZoomControls: e[25],
        enableZoom: e[26],
        enablePan: e[27],
        zoomOptions: e[15],
        zoomAdjustStep: e[16],
        zoomAdjustFactor: e[17],
        interactionMode: e[18],
        utilKey: 'sticker',
        shapePresets: e[5],
        shapes: e[6] ? e[37] : e[38],
        toolActive: 'preset',
        imageFlipX: !!e[6] && e[28],
        imageFlipY: !!e[6] && e[29],
        imageRotation: e[6] ? e[33] : 0,
        parentRect: e[6] ? e[39] : e[35],
        enablePresetDropImage: e[7],
        enablePresetSelectImage: e[30],
        enableButtonFlipVertical: e[10] || e[8],
        toolSelectRadius: e[13],
        willStartInteraction: e[14],
        willRenderPresetToolbar: e[11] || e[9] || e[19],
        hooks: {
          willRenderShapeControls: e[12],
          beforeAddShape: e[20],
          beforeRemoveShape: e[21],
          beforeDeselectShape: e[22],
          beforeSelectShape: e[23],
          beforeUpdateShape: e[24],
        },
      },
    })),
    t.$on('measure', e[54]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8 & o[0] && (i.stores = e[3]),
          16 & o[0] && (i.locale = e[4]),
          1 & o[0] && (i.isActive = e[0]),
          2 & o[0] && (i.isActiveFraction = e[1]),
          4 & o[0] && (i.isVisible = e[2]),
          1 & o[1] && (i.mapScreenPointToImagePoint = e[31]),
          2 & o[1] && (i.mapImagePointToScreenPoint = e[32]),
          33554432 & o[0] && (i.enableZoomControls = e[25]),
          67108864 & o[0] && (i.enableZoom = e[26]),
          134217728 & o[0] && (i.enablePan = e[27]),
          32768 & o[0] && (i.zoomOptions = e[15]),
          65536 & o[0] && (i.zoomAdjustStep = e[16]),
          131072 & o[0] && (i.zoomAdjustFactor = e[17]),
          262144 & o[0] && (i.interactionMode = e[18]),
          32 & o[0] && (i.shapePresets = e[5]),
          64 & o[0] && (i.shapes = e[6] ? e[37] : e[38]),
          268435520 & o[0] && (i.imageFlipX = !!e[6] && e[28]),
          536870976 & o[0] && (i.imageFlipY = !!e[6] && e[29]),
          (64 & o[0]) | (4 & o[1]) && (i.imageRotation = e[6] ? e[33] : 0),
          64 & o[0] && (i.parentRect = e[6] ? e[39] : e[35]),
          128 & o[0] && (i.enablePresetDropImage = e[7]),
          1073741824 & o[0] && (i.enablePresetSelectImage = e[30]),
          1280 & o[0] && (i.enableButtonFlipVertical = e[10] || e[8]),
          8192 & o[0] && (i.toolSelectRadius = e[13]),
          16384 & o[0] && (i.willStartInteraction = e[14]),
          526848 & o[0] && (i.willRenderPresetToolbar = e[11] || e[9] || e[19]),
          32509952 & o[0] &&
            (i.hooks = {
              willRenderShapeControls: e[12],
              beforeAddShape: e[20],
              beforeRemoveShape: e[21],
              beforeDeselectShape: e[22],
              beforeSelectShape: e[23],
              beforeUpdateShape: e[24],
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function L$(e, t, o) {
  let i, n, r, a, s, l, c, d, u, h, p, m
  let { isActive: g } = t,
    { isActiveFraction: f } = t,
    { isVisible: $ } = t,
    { stores: y } = t,
    { locale: b = {} } = t,
    { stickers: x = [] } = t,
    { stickerStickToImage: v = !1 } = t,
    { stickerEnableSelectImagePreset: w = !0 } = t,
    { stickerEnableDropImagePreset: S = !0 } = t,
    { stickerEnableButtonFlipVertical: k = !1 } = t,
    { stickerWillRenderShapePresetToolbar: M } = t,
    { stickerEnableSelectImage: C = !0 } = t,
    { stickersEnableButtonFlipVertical: T = !1 } = t,
    { stickersWillRenderShapePresetToolbar: P } = t,
    { willRenderShapeControls: I } = t,
    { markupEditorToolSelectRadius: R } = t,
    { markupEditorWillStartInteraction: A } = t,
    { markupEditorZoomLevels: E } = t,
    { markupEditorZoomAdjustStep: L } = t,
    { markupEditorZoomAdjustFactor: F } = t,
    { markupEditorInteractionMode: z } = t,
    { willRenderShapePresetToolbar: B } = t,
    { beforeAddShape: D } = t,
    { beforeRemoveShape: O } = t,
    { beforeDeselectShape: W } = t,
    { beforeSelectShape: V } = t,
    { beforeUpdateShape: _ } = t,
    { enableZoomControls: Z = !0 } = t,
    { enableZoom: j = !0 } = t,
    { enablePan: N = !0 } = t
  const {
    rootRect: H,
    imageCropRect: U,
    imageSelectionRectPresentation: X,
    imageAnnotation: Y,
    imageDecoration: G,
    imageSize: q,
    imageTransforms: K,
    imageTransformsInterpolated: J,
    imageRotation: Q,
    imageFlipX: ee,
    imageFlipY: te,
  } = y
  return (
    Sn(e, H, (e) => o(50, (l = e))),
    Sn(e, X, (e) => o(53, (p = e))),
    Sn(e, q, (e) => o(51, (c = e))),
    Sn(e, K, (e) => o(52, (d = e))),
    Sn(e, J, (e) => o(49, (s = e))),
    Sn(e, Q, (e) => o(33, (m = e))),
    Sn(e, ee, (e) => o(28, (u = e))),
    Sn(e, te, (e) => o(29, (h = e))),
    (e.$$set = (e) => {
      'isActive' in e && o(0, (g = e.isActive)),
        'isActiveFraction' in e && o(1, (f = e.isActiveFraction)),
        'isVisible' in e && o(2, ($ = e.isVisible)),
        'stores' in e && o(3, (y = e.stores)),
        'locale' in e && o(4, (b = e.locale)),
        'stickers' in e && o(5, (x = e.stickers)),
        'stickerStickToImage' in e && o(6, (v = e.stickerStickToImage)),
        'stickerEnableSelectImagePreset' in e && o(46, (w = e.stickerEnableSelectImagePreset)),
        'stickerEnableDropImagePreset' in e && o(7, (S = e.stickerEnableDropImagePreset)),
        'stickerEnableButtonFlipVertical' in e && o(8, (k = e.stickerEnableButtonFlipVertical)),
        'stickerWillRenderShapePresetToolbar' in e &&
          o(9, (M = e.stickerWillRenderShapePresetToolbar)),
        'stickerEnableSelectImage' in e && o(47, (C = e.stickerEnableSelectImage)),
        'stickersEnableButtonFlipVertical' in e && o(10, (T = e.stickersEnableButtonFlipVertical)),
        'stickersWillRenderShapePresetToolbar' in e &&
          o(11, (P = e.stickersWillRenderShapePresetToolbar)),
        'willRenderShapeControls' in e && o(12, (I = e.willRenderShapeControls)),
        'markupEditorToolSelectRadius' in e && o(13, (R = e.markupEditorToolSelectRadius)),
        'markupEditorWillStartInteraction' in e && o(14, (A = e.markupEditorWillStartInteraction)),
        'markupEditorZoomLevels' in e && o(15, (E = e.markupEditorZoomLevels)),
        'markupEditorZoomAdjustStep' in e && o(16, (L = e.markupEditorZoomAdjustStep)),
        'markupEditorZoomAdjustFactor' in e && o(17, (F = e.markupEditorZoomAdjustFactor)),
        'markupEditorInteractionMode' in e && o(18, (z = e.markupEditorInteractionMode)),
        'willRenderShapePresetToolbar' in e && o(19, (B = e.willRenderShapePresetToolbar)),
        'beforeAddShape' in e && o(20, (D = e.beforeAddShape)),
        'beforeRemoveShape' in e && o(21, (O = e.beforeRemoveShape)),
        'beforeDeselectShape' in e && o(22, (W = e.beforeDeselectShape)),
        'beforeSelectShape' in e && o(23, (V = e.beforeSelectShape)),
        'beforeUpdateShape' in e && o(24, (_ = e.beforeUpdateShape)),
        'enableZoomControls' in e && o(25, (Z = e.enableZoomControls)),
        'enableZoom' in e && o(26, (j = e.enableZoom)),
        'enablePan' in e && o(27, (N = e.enablePan))
    }),
    (e.$$.update = () => {
      262144 & e.$$.dirty[1] && o(48, (i = s ? s.scale : 1)),
        98304 & e.$$.dirty[1] && o(30, (n = !1 !== w && C)),
        (805306432 & e.$$.dirty[0]) | (8257536 & e.$$.dirty[1]) &&
          o(
            31,
            (r = v
              ? (e) => M$(e, l, c, s.origin, s.translation, d.rotation.z, s.scale, u, h)
              : (e) => {
                  const t = se(e)
                  return (t.x -= p.x), (t.y -= p.y), (t.x /= i), (t.y /= i), t
                })
          ),
        (805306432 & e.$$.dirty[0]) | (8257536 & e.$$.dirty[1]) &&
          o(
            32,
            (a = v
              ? (e) => k$(e, l, c, s.origin, s.translation, d.rotation.z, s.scale, u, h)
              : (e) => {
                  const t = se(e)
                  return (t.x *= i), (t.y *= i), (t.x += p.x), (t.y += p.y), t
                })
          )
    }),
    [
      g,
      f,
      $,
      y,
      b,
      x,
      v,
      S,
      k,
      M,
      T,
      P,
      I,
      R,
      A,
      E,
      L,
      F,
      z,
      B,
      D,
      O,
      W,
      V,
      _,
      Z,
      j,
      N,
      u,
      h,
      n,
      r,
      a,
      m,
      H,
      U,
      X,
      Y,
      G,
      q,
      K,
      J,
      Q,
      ee,
      te,
      'sticker',
      w,
      C,
      i,
      s,
      l,
      c,
      d,
      p,
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var F$ = {
  util: [
    'sticker',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            L$,
            E$,
            xn,
            {
              name: 45,
              isActive: 0,
              isActiveFraction: 1,
              isVisible: 2,
              stores: 3,
              locale: 4,
              stickers: 5,
              stickerStickToImage: 6,
              stickerEnableSelectImagePreset: 46,
              stickerEnableDropImagePreset: 7,
              stickerEnableButtonFlipVertical: 8,
              stickerWillRenderShapePresetToolbar: 9,
              stickerEnableSelectImage: 47,
              stickersEnableButtonFlipVertical: 10,
              stickersWillRenderShapePresetToolbar: 11,
              willRenderShapeControls: 12,
              markupEditorToolSelectRadius: 13,
              markupEditorWillStartInteraction: 14,
              markupEditorZoomLevels: 15,
              markupEditorZoomAdjustStep: 16,
              markupEditorZoomAdjustFactor: 17,
              markupEditorInteractionMode: 18,
              willRenderShapePresetToolbar: 19,
              beforeAddShape: 20,
              beforeRemoveShape: 21,
              beforeDeselectShape: 22,
              beforeSelectShape: 23,
              beforeUpdateShape: 24,
              enableZoomControls: 25,
              enableZoom: 26,
              enablePan: 27,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[45]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(e) {
        this.$set({
          isActiveFraction: e,
        }),
          Cr()
      }
      get isVisible() {
        return this.$$.ctx[2]
      }
      set isVisible(e) {
        this.$set({
          isVisible: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[3]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[4]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get stickers() {
        return this.$$.ctx[5]
      }
      set stickers(e) {
        this.$set({
          stickers: e,
        }),
          Cr()
      }
      get stickerStickToImage() {
        return this.$$.ctx[6]
      }
      set stickerStickToImage(e) {
        this.$set({
          stickerStickToImage: e,
        }),
          Cr()
      }
      get stickerEnableSelectImagePreset() {
        return this.$$.ctx[46]
      }
      set stickerEnableSelectImagePreset(e) {
        this.$set({
          stickerEnableSelectImagePreset: e,
        }),
          Cr()
      }
      get stickerEnableDropImagePreset() {
        return this.$$.ctx[7]
      }
      set stickerEnableDropImagePreset(e) {
        this.$set({
          stickerEnableDropImagePreset: e,
        }),
          Cr()
      }
      get stickerEnableButtonFlipVertical() {
        return this.$$.ctx[8]
      }
      set stickerEnableButtonFlipVertical(e) {
        this.$set({
          stickerEnableButtonFlipVertical: e,
        }),
          Cr()
      }
      get stickerWillRenderShapePresetToolbar() {
        return this.$$.ctx[9]
      }
      set stickerWillRenderShapePresetToolbar(e) {
        this.$set({
          stickerWillRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get stickerEnableSelectImage() {
        return this.$$.ctx[47]
      }
      set stickerEnableSelectImage(e) {
        this.$set({
          stickerEnableSelectImage: e,
        }),
          Cr()
      }
      get stickersEnableButtonFlipVertical() {
        return this.$$.ctx[10]
      }
      set stickersEnableButtonFlipVertical(e) {
        this.$set({
          stickersEnableButtonFlipVertical: e,
        }),
          Cr()
      }
      get stickersWillRenderShapePresetToolbar() {
        return this.$$.ctx[11]
      }
      set stickersWillRenderShapePresetToolbar(e) {
        this.$set({
          stickersWillRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get willRenderShapeControls() {
        return this.$$.ctx[12]
      }
      set willRenderShapeControls(e) {
        this.$set({
          willRenderShapeControls: e,
        }),
          Cr()
      }
      get markupEditorToolSelectRadius() {
        return this.$$.ctx[13]
      }
      set markupEditorToolSelectRadius(e) {
        this.$set({
          markupEditorToolSelectRadius: e,
        }),
          Cr()
      }
      get markupEditorWillStartInteraction() {
        return this.$$.ctx[14]
      }
      set markupEditorWillStartInteraction(e) {
        this.$set({
          markupEditorWillStartInteraction: e,
        }),
          Cr()
      }
      get markupEditorZoomLevels() {
        return this.$$.ctx[15]
      }
      set markupEditorZoomLevels(e) {
        this.$set({
          markupEditorZoomLevels: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustStep() {
        return this.$$.ctx[16]
      }
      set markupEditorZoomAdjustStep(e) {
        this.$set({
          markupEditorZoomAdjustStep: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustFactor() {
        return this.$$.ctx[17]
      }
      set markupEditorZoomAdjustFactor(e) {
        this.$set({
          markupEditorZoomAdjustFactor: e,
        }),
          Cr()
      }
      get markupEditorInteractionMode() {
        return this.$$.ctx[18]
      }
      set markupEditorInteractionMode(e) {
        this.$set({
          markupEditorInteractionMode: e,
        }),
          Cr()
      }
      get willRenderShapePresetToolbar() {
        return this.$$.ctx[19]
      }
      set willRenderShapePresetToolbar(e) {
        this.$set({
          willRenderShapePresetToolbar: e,
        }),
          Cr()
      }
      get beforeAddShape() {
        return this.$$.ctx[20]
      }
      set beforeAddShape(e) {
        this.$set({
          beforeAddShape: e,
        }),
          Cr()
      }
      get beforeRemoveShape() {
        return this.$$.ctx[21]
      }
      set beforeRemoveShape(e) {
        this.$set({
          beforeRemoveShape: e,
        }),
          Cr()
      }
      get beforeDeselectShape() {
        return this.$$.ctx[22]
      }
      set beforeDeselectShape(e) {
        this.$set({
          beforeDeselectShape: e,
        }),
          Cr()
      }
      get beforeSelectShape() {
        return this.$$.ctx[23]
      }
      set beforeSelectShape(e) {
        this.$set({
          beforeSelectShape: e,
        }),
          Cr()
      }
      get beforeUpdateShape() {
        return this.$$.ctx[24]
      }
      set beforeUpdateShape(e) {
        this.$set({
          beforeUpdateShape: e,
        }),
          Cr()
      }
      get enableZoomControls() {
        return this.$$.ctx[25]
      }
      set enableZoomControls(e) {
        this.$set({
          enableZoomControls: e,
        }),
          Cr()
      }
      get enableZoom() {
        return this.$$.ctx[26]
      }
      set enableZoom(e) {
        this.$set({
          enableZoom: e,
        }),
          Cr()
      }
      get enablePan() {
        return this.$$.ctx[27]
      }
      set enablePan(e) {
        this.$set({
          enablePan: e,
        }),
          Cr()
      }
    },
  ],
}

function z$(e) {
  let t,
    o,
    i,
    n,
    r,
    a = (e[14](e[30].value) || '') + '',
    s = (S(e[30].label) ? e[30].label(e[1]) : e[30].label) + ''
  return {
    c() {
      ;(t = Vn('div')),
        (i = jn()),
        (n = Vn('span')),
        (r = Zn(s)),
        (o = new Qn(i)),
        Yn(t, 'slot', 'option')
    },
    m(e, s) {
      On(e, t, s), o.m(a, t), Dn(t, i), Dn(t, n), Dn(n, r)
    },
    p(e, t) {
      1073741824 & t[0] && a !== (a = (e[14](e[30].value) || '') + '') && o.p(a),
        1073741826 & t[0] &&
          s !== (s = (S(e[30].label) ? e[30].label(e[1]) : e[30].label) + '') &&
          qn(r, s)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function B$(e) {
  let t, o
  return (
    (t = new vd({
      props: {
        locale: e[1],
        layout: 'row',
        options: e[2],
        selectedIndex: e[11],
        onchange: e[12],
        $$slots: {
          option: [
            z$,
            ({ option: e }) => ({
              30: e,
            }),
            ({ option: e }) => [e ? 1073741824 : 0],
          ],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        2 & o[0] && (i.locale = e[1]),
          4 & o[0] && (i.options = e[2]),
          (1073741826 & o[0]) | (1 & o[1]) &&
            (i.$$scope = {
              dirty: o,
              ctx: e,
            }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function D$(e) {
  let t, o, i, n, r
  return (
    (o = new Bf({
      props: {
        locale: e[1],
        shape: e[5],
        onchange: e[13],
        controls: e[3],
        scrollElasticity: e[4],
      },
    })),
    (n = new dc({
      props: {
        elasticity: e[9],
        $$slots: {
          default: [B$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          Hr(o.$$.fragment),
          (i = jn()),
          Hr(n.$$.fragment),
          Yn(t, 'slot', 'footer'),
          Yn(t, 'style', e[6])
      },
      m(e, a) {
        On(e, t, a), Ur(o, t, null), Dn(t, i), Ur(n, t, null), (r = !0)
      },
      p(e, i) {
        const a = {}
        2 & i[0] && (a.locale = e[1]),
          32 & i[0] && (a.shape = e[5]),
          8 & i[0] && (a.controls = e[3]),
          16 & i[0] && (a.scrollElasticity = e[4]),
          o.$set(a)
        const s = {}
        ;(6 & i[0]) | (1 & i[1]) &&
          (s.$$scope = {
            dirty: i,
            ctx: e,
          }),
          n.$set(s),
          (!r || 64 & i[0]) && Yn(t, 'style', e[6])
      },
      i(e) {
        r || (Fr(o.$$.fragment, e), Fr(n.$$.fragment, e), (r = !0))
      },
      o(e) {
        zr(o.$$.fragment, e), zr(n.$$.fragment, e), (r = !1)
      },
      d(e) {
        e && Wn(t), Xr(o), Xr(n)
      },
    }
  )
}

function O$(e) {
  let t, o
  return (
    (t = new Lm({
      props: {
        $$slots: {
          footer: [D$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    t.$on('measure', e[23]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(126 & o[0]) | (1 & o[1]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function W$(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d = pn,
    u = () => (d(), (d = vn(h, (e) => o(21, (l = e)))), h)
  e.$$.on_destroy.push(() => d())
  let { isActive: h } = t
  u()
  let { stores: p } = t,
    { locale: m = {} } = t,
    { frameStyles: g = {} } = t,
    { frameOptions: f = [] } = t,
    { markupEditorShapeStyleControls: $ } = t
  const y = hr('elasticityMultiplier')
  Sn(e, y, (e) => o(19, (r = e)))
  const { history: b, animation: x, scrollElasticity: v, imageFrame: w } = p
  Sn(e, x, (e) => o(20, (s = e))), Sn(e, w, (e) => o(5, (a = e)))
  let S = a ? f.findIndex(([e]) => e === a.id) : 0,
    k = {}
  let M
  const C = ys(s ? 20 : 0)
  return (
    Sn(e, C, (e) => o(22, (c = e))),
    (e.$$set = (e) => {
      'isActive' in e && u(o(0, (h = e.isActive))),
        'stores' in e && o(17, (p = e.stores)),
        'locale' in e && o(1, (m = e.locale)),
        'frameStyles' in e && o(18, (g = e.frameStyles)),
        'frameOptions' in e && o(2, (f = e.frameOptions)),
        'markupEditorShapeStyleControls' in e && o(3, ($ = e.markupEditorShapeStyleControls))
    }),
    (e.$$.update = () => {
      524288 & e.$$.dirty[0] && o(4, (i = r * v)),
        3145728 & e.$$.dirty[0] && s && C.set(l ? 0 : 20),
        4194304 & e.$$.dirty[0] && o(6, (n = c ? `transform: translateY(${c}px)` : void 0))
    }),
    [
      h,
      m,
      f,
      $,
      i,
      a,
      n,
      y,
      x,
      v,
      w,
      S,
      ({ value: e }) => {
        const t = g[e]
        if (!t || !t.shape) return w.set(void 0), void b.write()
        const { shape: o } = t,
          i = {
            id: e,
            ...Ho(o),
            ...Object.keys(k).reduce((e, t) => (o[t] ? ((e[t] = k[t]), e) : e), {}),
          }
        w.set(i), b.write()
      },
      function (e) {
        po(e, 'frameColor') && (k.frameColor = e.frameColor),
          a &&
            (Vi(a, e),
            w.set(a),
            clearTimeout(M),
            (M = setTimeout(() => {
              b.write()
            }, 200)))
      },
      (e) => {
        const t = g[e]
        var o
        if (t && t.thumb)
          return (
            (o = t.thumb),
            /div/i.test(o) || Uf(o)
              ? o
              : /rect|path|circle|line|<g>/i.test(o)
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" stroke-width="1" stroke="currentColor" fill="none" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">${o}</svg>`
              : `<img src="${o}" alt=""/>`
          )
      },
      C,
      'frame',
      p,
      g,
      r,
      s,
      l,
      c,
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var V$ = {
  util: [
    'frame',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            W$,
            O$,
            xn,
            {
              name: 16,
              isActive: 0,
              stores: 17,
              locale: 1,
              frameStyles: 18,
              frameOptions: 2,
              markupEditorShapeStyleControls: 3,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[16]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[17]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[1]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get frameStyles() {
        return this.$$.ctx[18]
      }
      set frameStyles(e) {
        this.$set({
          frameStyles: e,
        }),
          Cr()
      }
      get frameOptions() {
        return this.$$.ctx[2]
      }
      set frameOptions(e) {
        this.$set({
          frameOptions: e,
        }),
          Cr()
      }
      get markupEditorShapeStyleControls() {
        return this.$$.ctx[3]
      }
      set markupEditorShapeStyleControls(e) {
        this.$set({
          markupEditorShapeStyleControls: e,
        }),
          Cr()
      }
    },
  ],
}

function _$(e) {
  let t, o, i, n, r, a, s, l
  return {
    c() {
      ;(t = Vn('div')),
        (o = Vn('input')),
        (n = jn()),
        (r = Vn('label')),
        (a = Zn(e[1])),
        Yn(o, 'id', e[0]),
        Yn(o, 'type', 'number'),
        Yn(o, 'min', '1'),
        Yn(o, 'inputmode', 'numeric'),
        Yn(o, 'pattern', '[0-9]*'),
        Yn(o, 'data-state', e[3]),
        Yn(o, 'autocomplete', 'off'),
        Yn(o, 'placeholder', e[4]),
        (o.value = i = void 0 === e[5] ? '' : e[7](e[5] + '')),
        Yn(r, 'for', e[0]),
        Yn(r, 'title', e[2]),
        Yn(r, 'aria-label', e[2]),
        Yn(t, 'class', 'PinturaInputDimension')
    },
    m(i, c) {
      On(i, t, c),
        Dn(t, o),
        Dn(t, n),
        Dn(t, r),
        Dn(r, a),
        s || ((l = Hn(o, 'input', e[8])), (s = !0))
    },
    p(e, [t]) {
      1 & t && Yn(o, 'id', e[0]),
        8 & t && Yn(o, 'data-state', e[3]),
        16 & t && Yn(o, 'placeholder', e[4]),
        160 & t && i !== (i = void 0 === e[5] ? '' : e[7](e[5] + '')) && (o.value = i),
        2 & t && qn(a, e[1]),
        1 & t && Yn(r, 'for', e[0]),
        4 & t && Yn(r, 'title', e[2]),
        4 & t && Yn(r, 'aria-label', e[2])
    },
    i: pn,
    o: pn,
    d(e) {
      e && Wn(t), (s = !1), l()
    },
  }
}

function Z$(e, t, o) {
  let { id: i } = t,
    { label: n } = t,
    { title: r } = t,
    { state: a } = t,
    { placeholder: s } = t,
    { value: l } = t,
    { onchange: c } = t,
    { format: d = (e) => e.replace(/\D/g, '') } = t
  return (
    (e.$$set = (e) => {
      'id' in e && o(0, (i = e.id)),
        'label' in e && o(1, (n = e.label)),
        'title' in e && o(2, (r = e.title)),
        'state' in e && o(3, (a = e.state)),
        'placeholder' in e && o(4, (s = e.placeholder)),
        'value' in e && o(5, (l = e.value)),
        'onchange' in e && o(6, (c = e.onchange)),
        'format' in e && o(7, (d = e.format))
    }),
    [i, n, r, a, s, l, c, d, (e) => c(d(e.currentTarget.value))]
  )
}
class j$ extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, Z$, _$, xn, {
        id: 0,
        label: 1,
        title: 2,
        state: 3,
        placeholder: 4,
        value: 5,
        onchange: 6,
        format: 7,
      })
  }
}

function N$(e) {
  let t
  return {
    c() {
      t = _n('g')
    },
    m(o, i) {
      On(o, t, i), (t.innerHTML = e[2])
    },
    p(e, o) {
      4 & o && (t.innerHTML = e[2])
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function H$(e) {
  let t, o, i, n, r, a, s, l
  return (
    (r = new Ul({
      props: {
        $$slots: {
          default: [N$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('div')),
          (o = Vn('input')),
          (i = jn()),
          (n = Vn('label')),
          Hr(r.$$.fragment),
          Yn(o, 'id', e[0]),
          Yn(o, 'class', 'implicit'),
          Yn(o, 'type', 'checkbox'),
          (o.checked = e[1]),
          Yn(n, 'for', e[0]),
          Yn(n, 'title', e[3])
      },
      m(c, d) {
        On(c, t, d),
          Dn(t, o),
          Dn(t, i),
          Dn(t, n),
          Ur(r, n, null),
          (a = !0),
          s || ((l = Hn(o, 'change', e[5])), (s = !0))
      },
      p(e, [t]) {
        ;(!a || 1 & t) && Yn(o, 'id', e[0]), (!a || 2 & t) && (o.checked = e[1])
        const i = {}
        68 & t &&
          (i.$$scope = {
            dirty: t,
            ctx: e,
          }),
          r.$set(i),
          (!a || 1 & t) && Yn(n, 'for', e[0]),
          (!a || 8 & t) && Yn(n, 'title', e[3])
      },
      i(e) {
        a || (Fr(r.$$.fragment, e), (a = !0))
      },
      o(e) {
        zr(r.$$.fragment, e), (a = !1)
      },
      d(e) {
        e && Wn(t), Xr(r), (s = !1), l()
      },
    }
  )
}

function U$(e, t, o) {
  let { id: i } = t,
    { locked: n } = t,
    { icon: r } = t,
    { title: a } = t,
    { onchange: s } = t
  return (
    (e.$$set = (e) => {
      'id' in e && o(0, (i = e.id)),
        'locked' in e && o(1, (n = e.locked)),
        'icon' in e && o(2, (r = e.icon)),
        'title' in e && o(3, (a = e.title)),
        'onchange' in e && o(4, (s = e.onchange))
    }),
    [i, n, r, a, s, (e) => s(e.currentTarget.checked)]
  )
}
class X$ extends Gr {
  constructor(e) {
    super(),
      Yr(this, e, U$, H$, xn, {
        id: 0,
        locked: 1,
        icon: 2,
        title: 3,
        onchange: 4,
      })
  }
}

function Y$(e) {
  let t
  return {
    c() {
      t = Zn('Save')
    },
    m(e, o) {
      On(e, t, o)
    },
    d(e) {
      e && Wn(t)
    },
  }
}

function G$(e) {
  let t,
    o,
    i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m = e[1].resizeLabelFormCaption + ''
  return (
    (l = new cu({
      props: {
        items: e[3],
      },
    })),
    (d = new Ql({
      props: {
        type: 'submit',
        class: 'implicit',
        $$slots: {
          default: [Y$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    {
      c() {
        ;(t = Vn('form')),
          (o = Vn('div')),
          (i = Vn('fieldset')),
          (n = Vn('legend')),
          (r = Zn(m)),
          (a = jn()),
          (s = Vn('div')),
          Hr(l.$$.fragment),
          (c = jn()),
          Hr(d.$$.fragment),
          Yn(n, 'class', 'implicit'),
          Yn(s, 'class', 'PinturaFieldsetInner'),
          Yn(o, 'class', 'PinturaFormInner'),
          Yn(t, 'slot', 'footer'),
          Yn(t, 'style', e[4])
      },
      m(m, g) {
        On(m, t, g),
          Dn(t, o),
          Dn(o, i),
          Dn(i, n),
          Dn(n, r),
          Dn(i, a),
          Dn(i, s),
          Ur(l, s, null),
          e[63](s),
          Dn(o, c),
          Ur(d, o, null),
          (u = !0),
          h ||
            ((p = [Hn(s, 'focusin', e[14]), Hn(s, 'focusout', e[15]), Hn(t, 'submit', Un(e[16]))]),
            (h = !0))
      },
      p(e, o) {
        ;(!u || 2 & o[0]) && m !== (m = e[1].resizeLabelFormCaption + '') && qn(r, m)
        const i = {}
        8 & o[0] && (i.items = e[3]), l.$set(i)
        const n = {}
        33554432 & o[2] &&
          (n.$$scope = {
            dirty: o,
            ctx: e,
          }),
          d.$set(n),
          (!u || 16 & o[0]) && Yn(t, 'style', e[4])
      },
      i(e) {
        u || (Fr(l.$$.fragment, e), Fr(d.$$.fragment, e), (u = !0))
      },
      o(e) {
        zr(l.$$.fragment, e), zr(d.$$.fragment, e), (u = !1)
      },
      d(o) {
        o && Wn(t), Xr(l), e[63](null), Xr(d), (h = !1), yn(p)
      },
    }
  )
}

function q$(e) {
  let t, o
  return (
    (t = new Lm({
      props: {
        $$slots: {
          footer: [G$],
        },
        $$scope: {
          ctx: e,
        },
      },
    })),
    t.$on('measure', e[64]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        ;(30 & o[0]) | (33554432 & o[2]) &&
          (i.$$scope = {
            dirty: o,
            ctx: e,
          }),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function K$(e, t, o) {
  let i,
    n,
    r,
    a,
    s,
    l,
    c,
    d,
    u,
    h,
    p,
    m,
    g,
    f,
    $,
    y,
    b,
    x,
    v,
    S,
    k,
    M,
    C,
    P,
    I,
    R,
    A,
    E,
    L,
    F = pn,
    z = () => (F(), (F = vn(D, (e) => o(40, (m = e)))), D)
  e.$$.on_destroy.push(() => F())
  const B = (e, t = 0, o = 9999) => {
    if (w(e) && !(e = e.replace(/\D/g, '')).length) return
    const i = Math.round(e)
    return Number.isNaN(i) ? void 0 : $a(i, t, o)
  }
  let { isActive: D } = t
  z()
  let { stores: V } = t,
    { locale: _ = {} } = t,
    { resizeMinSize: Z = Ae(1, 1) } = t,
    { resizeMaxSize: j = Ae(9999, 9999) } = t,
    { resizeSizePresetOptions: N } = t,
    { resizeWidthPresetOptions: H } = t,
    { resizeHeightPresetOptions: U } = t,
    { resizeWillRenderFooter: X = W } = t
  const Y = ys(0, {
    stiffness: 0.15,
    damping: 0.3,
  })
  Sn(e, Y, (e) => o(59, (R = e)))
  const {
    animation: G,
    imageSize: q,
    imageCropRect: K,
    imageCropRectAspectRatio: J,
    imageCropAspectRatio: Q,
    imageOutputSize: ee,
    imageSelectionZoom: te,
    history: oe,
    env: ie,
  } = V
  Sn(e, G, (e) => o(61, (E = e))),
    Sn(e, q, (e) => o(70, (y = e))),
    Sn(e, K, (e) => o(39, (h = e))),
    Sn(e, J, (e) => o(42, (f = e))),
    Sn(e, Q, (e) => o(69, ($ = e))),
    Sn(e, ee, (e) => o(41, (g = e))),
    Sn(e, te, (e) => o(68, (p = e))),
    Sn(e, ie, (e) => o(60, (A = e)))
  const ne = T()
  let re,
    ae,
    se,
    le,
    ce,
    de = !1
  const ue = (e, t, o, i, n) =>
      null != e && o !== t ? (e >= i[t] && e <= n[t] ? 'valid' : 'invalid') : 'undetermined',
    he = (e, t, o) => Math.round(null != e ? e / t : o.height),
    pe = () => {
      de &&
        ae &&
        se &&
        ('width' === le
          ? o(37, (se = Math.round(ae / f)))
          : 'height' === le
          ? o(36, (ae = Math.round(se * f)))
          : ('width' === ce
              ? o(37, (se = Math.round(ae / f)))
              : 'height' === ce && o(36, (ae = Math.round(se * f))),
            me()))
    },
    me = (e) => {
      let t = B(ae),
        i = B(se),
        n = t,
        r = i,
        a = n && r,
        s = e || f
      if (!n && !r) return
      n && !r ? (r = Math.round(n / s)) : r && !n && (n = Math.round(r * s)),
        (s = e || a ? O(n, r) : f)
      let l = Ae(n, r)
      Be(j, l) || (l = ht(j, s)),
        Be(l, Z) || (l = ut(Z, s)),
        o(36, (ae = null != t ? Math.round(l.width) : void 0)),
        o(37, (se = null != i ? Math.round(l.height) : void 0))
    },
    ge = () => {
      me()
      const { width: e, height: t } = g || {}
      ;(e === ae && t === se) ||
        (ae || se
          ? (ae && se && In(Q, ($ = ae / se), $), In(ee, (g = Ae(ae, se)), g))
          : (In(Q, ($ = y.width / y.height), $), In(Q, ($ = void 0), $), In(ee, (g = void 0), g)),
        oe.write())
    },
    fe = ee.subscribe((e) => {
      if (!e) return o(36, (ae = void 0)), void o(37, (se = void 0))
      o(36, (ae = e.width)), o(37, (se = e.height)), me()
    }),
    $e = Q.subscribe((e) => {
      ;(ae || se) && e && (ae && se && O(ae, se) !== e ? (o(37, (se = ae / e)), me(e)) : me())
    }),
    ye = (e) => (w(e[0]) ? ((e[1] = e[1].map(ye)), e) : uo(e) ? [e, '' + e] : e),
    be = (e) => {
      if (w(e[0])) return (e[1] = e[1].map(be)), e
      let [t, o] = e
      if (uo(t) && uo(o)) {
        const [e, i] = [t, o]
        ;(o = `${e} × ${i}`), (t = [e, i])
      }
      return [t, o]
    },
    xe = Jr()
  Sn(e, xe, (e) => o(43, (b = e)))
  const ve = Jr()
  Sn(e, ve, (e) => o(44, (x = e)))
  const we = Jr()
  Sn(e, we, (e) => o(45, (v = e)))
  const Se = Jr()
  Sn(e, Se, (e) => o(46, (S = e)))
  const ke = Jr()
  Sn(e, ke, (e) => o(47, (k = e)))
  const Me = Jr()
  Sn(e, Me, (e) => o(48, (M = e)))
  const Ce = Qr([ee, ve], ([e, t], o) => {
    if (!t) return o(-1)
    const i = t.findIndex(([t]) => {
      if (!t && !e) return !0
      if (!t) return !1
      const [o, i] = t
      return e.width === o && e.height === i
    })
    o(i < 0 ? 0 : i)
  })
  Sn(e, Ce, (e) => o(50, (C = e)))
  const Te = Qr([ee, Se], ([e, t], o) => {
    if (!t) return o(-1)
    const i = t.findIndex(([t]) => (!t && !e) || (!!t && e.width === t))
    o(i < 0 ? 0 : i)
  })
  Sn(e, Te, (e) => o(52, (P = e)))
  const Pe = Qr([ee, Me], ([e, t], o) => {
    if (!t) return o(-1)
    const i = t.findIndex(([t]) => (!t && !e) || (!!t && e.height === t))
    o(i < 0 ? 0 : i)
  })
  Sn(e, Pe, (e) => o(54, (I = e)))
  let Re = void 0,
    Ee = void 0
  const Le = hr('redrawTrigger'),
    Fe = ys(E ? 20 : 0)
  return (
    Sn(e, Fe, (e) => o(62, (L = e))),
    cr(() => {
      fe(), $e()
    }),
    (e.$$set = (e) => {
      'isActive' in e && z(o(0, (D = e.isActive))),
        'stores' in e && o(28, (V = e.stores)),
        'locale' in e && o(1, (_ = e.locale)),
        'resizeMinSize' in e && o(29, (Z = e.resizeMinSize)),
        'resizeMaxSize' in e && o(30, (j = e.resizeMaxSize)),
        'resizeSizePresetOptions' in e && o(31, (N = e.resizeSizePresetOptions)),
        'resizeWidthPresetOptions' in e && o(32, (H = e.resizeWidthPresetOptions)),
        'resizeHeightPresetOptions' in e && o(33, (U = e.resizeHeightPresetOptions)),
        'resizeWillRenderFooter' in e && o(34, (X = e.resizeWillRenderFooter))
    }),
    (e.$$.update = () => {
      var t
      4097 & e.$$.dirty[1] && N && (In(xe, (b = N.map(be)), b), In(ve, (x = Hc(b)), x)),
        4096 & e.$$.dirty[1] && o(55, (a = !!b)),
        532480 & e.$$.dirty[1] && o(49, (i = C > -1 && x[C][1])),
        16386 & e.$$.dirty[1] && H && (In(we, (v = H.map(ye)), v), In(Se, (S = Hc(v)), S)),
        16793600 & e.$$.dirty[1] && o(56, (s = !a && v)),
        2129920 & e.$$.dirty[1] && o(51, (n = P > -1 && S[P][1])),
        65540 & e.$$.dirty[1] && U && (In(ke, (k = U.map(ye)), k), In(Me, (M = Hc(k)), M)),
        16842752 & e.$$.dirty[1] && o(57, (l = !a && k)),
        8519680 & e.$$.dirty[1] && o(53, (r = I > -1 && M[I][1])),
        117440512 & e.$$.dirty[1] && o(58, (c = !a && !s && !l)),
        (1610612738 & e.$$.dirty[0]) | (1073568248 & e.$$.dirty[1]) &&
          o(
            3,
            (d =
              Le &&
              Tu(() => {
                return X(
                  [
                    a && [
                      'Dropdown',
                      'size-presets',
                      {
                        label: i,
                        options: b,
                        onchange: (e) => {
                          return (
                            (t = e.value) && !Re && ((Re = { ...h }), (Ee = $)),
                            t
                              ? (In(Q, ($ = O(t[0], t[1])), $), In(ee, (g = Ie(t)), g))
                              : (In(K, (h = Re), h),
                                In(Q, ($ = Ee), $),
                                In(ee, (g = void 0), g),
                                (Re = void 0),
                                (Ee = void 0)),
                            void oe.write()
                          )
                          var t
                        },
                        selectedIndex: C,
                      },
                    ],
                    s && [
                      'Dropdown',
                      'width-presets',
                      {
                        label: n,
                        options: v,
                        onchange: (e) => {
                          o(36, (ae = e.value)), ge()
                        },
                        selectedIndex: P,
                      },
                    ],
                    s &&
                      l && [
                        'span',
                        'times',
                        {
                          class: 'PinturaResizeLabel',
                          innerHTML: '&times;',
                        },
                      ],
                    l && [
                      'Dropdown',
                      'height-presets',
                      {
                        label: r,
                        options: k,
                        onchange: (e) => {
                          o(37, (se = e.value)), ge()
                        },
                        selectedIndex: I,
                      },
                    ],
                    c && [
                      j$,
                      'width-input',
                      {
                        id: 'width-' + ne,
                        title: _.resizeTitleInputWidth,
                        label: _.resizeLabelInputWidth,
                        placeholder:
                          ((e = B(se)), (t = f), (d = h), Math.round(null != e ? e * t : d.width)),
                        value: ae,
                        state: ue(B(ae), 'width', le, Z, j),
                        onchange: (e) => {
                          o(36, (ae = e)), pe()
                        },
                      },
                    ],
                    c && [
                      X$,
                      'aspect-ratio-lock',
                      {
                        id: 'aspect-ratio-lock-' + ne,
                        title: _.resizeTitleButtonMaintainAspectRatio,
                        icon: w(_.resizeIconButtonMaintainAspectRatio)
                          ? _.resizeIconButtonMaintainAspectRatio
                          : _.resizeIconButtonMaintainAspectRatio(de, R),
                        locked: de,
                        onchange: (e) => {
                          o(35, (de = e)), pe()
                        },
                      },
                    ],
                    c && [
                      j$,
                      'height-input',
                      {
                        id: 'height-' + ne,
                        title: _.resizeTitleInputHeight,
                        label: _.resizeLabelInputHeight,
                        placeholder: he(B(ae), f, h),
                        value: se,
                        state: ue(B(se), 'height', le, Z, j),
                        onchange: (e) => {
                          o(37, (se = e)), pe()
                        },
                      },
                    ],
                  ].filter(Boolean),
                  { ...A },
                  () => Le.set({})
                )
                var e, t, d
              }).filter(Boolean))
          ),
        16 & e.$$.dirty[1] && Y.set(de ? 1 : 0),
        128 & e.$$.dirty[1] && le && (ce = le),
        1536 & e.$$.dirty[1] &&
          (m
            ? In(te, (p = (t = g) && h ? t.width / h.width || t.height / h.height : 1), p)
            : In(te, (p = void 0), p)),
        1073742336 & e.$$.dirty[1] && E && Fe.set(m ? 0 : 20),
        1 & e.$$.dirty[2] && o(4, (u = L ? `transform: translateY(${L}px)` : void 0))
    }),
    [
      D,
      _,
      re,
      d,
      u,
      Y,
      G,
      q,
      K,
      J,
      Q,
      ee,
      te,
      ie,
      (e) => {
        const t = e.target.id
        ;/width/.test(t)
          ? o(38, (le = 'width'))
          : /height/.test(t)
          ? o(38, (le = 'height'))
          : /aspectRatio/i.test(t)
          ? o(38, (le = 'lock'))
          : o(38, (le = void 0))
      },
      (e) => {
        re.contains(e.relatedTarget) || ge(), o(38, (le = void 0))
      },
      ge,
      xe,
      ve,
      we,
      Se,
      ke,
      Me,
      Ce,
      Te,
      Pe,
      Fe,
      'resize',
      V,
      Z,
      j,
      N,
      H,
      U,
      X,
      de,
      ae,
      se,
      le,
      h,
      m,
      g,
      f,
      b,
      x,
      v,
      S,
      k,
      M,
      i,
      C,
      n,
      P,
      r,
      I,
      a,
      s,
      l,
      c,
      R,
      A,
      E,
      L,
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(re = e), o(2, re)
        })
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var J$ = {
  util: [
    'resize',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            K$,
            q$,
            xn,
            {
              name: 27,
              isActive: 0,
              stores: 28,
              locale: 1,
              resizeMinSize: 29,
              resizeMaxSize: 30,
              resizeSizePresetOptions: 31,
              resizeWidthPresetOptions: 32,
              resizeHeightPresetOptions: 33,
              resizeWillRenderFooter: 34,
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
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[28]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[1]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get resizeMinSize() {
        return this.$$.ctx[29]
      }
      set resizeMinSize(e) {
        this.$set({
          resizeMinSize: e,
        }),
          Cr()
      }
      get resizeMaxSize() {
        return this.$$.ctx[30]
      }
      set resizeMaxSize(e) {
        this.$set({
          resizeMaxSize: e,
        }),
          Cr()
      }
      get resizeSizePresetOptions() {
        return this.$$.ctx[31]
      }
      set resizeSizePresetOptions(e) {
        this.$set({
          resizeSizePresetOptions: e,
        }),
          Cr()
      }
      get resizeWidthPresetOptions() {
        return this.$$.ctx[32]
      }
      set resizeWidthPresetOptions(e) {
        this.$set({
          resizeWidthPresetOptions: e,
        }),
          Cr()
      }
      get resizeHeightPresetOptions() {
        return this.$$.ctx[33]
      }
      set resizeHeightPresetOptions(e) {
        this.$set({
          resizeHeightPresetOptions: e,
        }),
          Cr()
      }
      get resizeWillRenderFooter() {
        return this.$$.ctx[34]
      }
      set resizeWillRenderFooter(e) {
        this.$set({
          resizeWillRenderFooter: e,
        }),
          Cr()
      }
    },
  ],
}

function Q$(e) {
  let t, o
  return (
    (t = new S$({
      props: {
        stores: e[3],
        locale: e[4],
        isActive: e[0],
        isActiveFraction: e[1],
        isVisible: e[2],
        mapScreenPointToImagePoint: e[15],
        mapImagePointToScreenPoint: e[16],
        enableZoomControls: e[5],
        enableZoom: e[6],
        enablePan: e[7],
        zoomOptions: e[9],
        zoomAdjustStep: e[10],
        zoomAdjustFactor: e[11],
        interactionMode: e[12],
        utilKey: 'redact',
        imageRotation: e[17],
        imageFlipX: e[13],
        imageFlipY: e[14],
        shapes: e[18],
        toolbar: ['rect'],
        toolShapes: {
          rectangle: [
            {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          ],
        },
        toolActive: 'rectangle',
        parentRect: e[20],
        enablePresetDropImage: !1,
        enablePresetSelectImage: !1,
        willStartInteraction: e[8],
        hooks: {
          willRenderShapeControls: e[31],
        },
      },
    })),
    t.$on('measure', e[32]),
    {
      c() {
        Hr(t.$$.fragment)
      },
      m(e, i) {
        Ur(t, e, i), (o = !0)
      },
      p(e, o) {
        const i = {}
        8 & o[0] && (i.stores = e[3]),
          16 & o[0] && (i.locale = e[4]),
          1 & o[0] && (i.isActive = e[0]),
          2 & o[0] && (i.isActiveFraction = e[1]),
          4 & o[0] && (i.isVisible = e[2]),
          32768 & o[0] && (i.mapScreenPointToImagePoint = e[15]),
          65536 & o[0] && (i.mapImagePointToScreenPoint = e[16]),
          32 & o[0] && (i.enableZoomControls = e[5]),
          64 & o[0] && (i.enableZoom = e[6]),
          128 & o[0] && (i.enablePan = e[7]),
          512 & o[0] && (i.zoomOptions = e[9]),
          1024 & o[0] && (i.zoomAdjustStep = e[10]),
          2048 & o[0] && (i.zoomAdjustFactor = e[11]),
          4096 & o[0] && (i.interactionMode = e[12]),
          131072 & o[0] && (i.imageRotation = e[17]),
          8192 & o[0] && (i.imageFlipX = e[13]),
          16384 & o[0] && (i.imageFlipY = e[14]),
          256 & o[0] && (i.willStartInteraction = e[8]),
          t.$set(i)
      },
      i(e) {
        o || (Fr(t.$$.fragment, e), (o = !0))
      },
      o(e) {
        zr(t.$$.fragment, e), (o = !1)
      },
      d(e) {
        Xr(t, e)
      },
    }
  )
}

function ey(e, t, o) {
  let i, n, r, a, s, l, c, d, u
  let { isActive: h } = t,
    { isActiveFraction: p } = t,
    { isVisible: m } = t,
    { stores: g } = t,
    { locale: f = {} } = t,
    { enableZoomControls: $ = !0 } = t,
    { enableZoom: y = !0 } = t,
    { enablePan: b = !0 } = t,
    { markupEditorWillStartInteraction: x } = t,
    { markupEditorZoomLevels: v } = t,
    { markupEditorZoomAdjustStep: w } = t,
    { markupEditorZoomAdjustFactor: S } = t,
    { markupEditorInteractionMode: k } = t
  const {
    imageRedaction: M,
    rootRect: C,
    imageSize: T,
    imageRotation: P,
    imageFlipX: I,
    imageFlipY: R,
    imageTransforms: A,
    imageTransformsInterpolated: E,
  } = g
  Sn(e, C, (e) => o(27, (r = e))),
    Sn(e, T, (e) => o(28, (a = e))),
    Sn(e, P, (e) => o(17, (u = e))),
    Sn(e, I, (e) => o(13, (c = e))),
    Sn(e, R, (e) => o(14, (d = e))),
    Sn(e, A, (e) => o(30, (l = e))),
    Sn(e, E, (e) => o(29, (s = e)))
  return (
    (e.$$set = (e) => {
      'isActive' in e && o(0, (h = e.isActive)),
        'isActiveFraction' in e && o(1, (p = e.isActiveFraction)),
        'isVisible' in e && o(2, (m = e.isVisible)),
        'stores' in e && o(3, (g = e.stores)),
        'locale' in e && o(4, (f = e.locale)),
        'enableZoomControls' in e && o(5, ($ = e.enableZoomControls)),
        'enableZoom' in e && o(6, (y = e.enableZoom)),
        'enablePan' in e && o(7, (b = e.enablePan)),
        'markupEditorWillStartInteraction' in e && o(8, (x = e.markupEditorWillStartInteraction)),
        'markupEditorZoomLevels' in e && o(9, (v = e.markupEditorZoomLevels)),
        'markupEditorZoomAdjustStep' in e && o(10, (w = e.markupEditorZoomAdjustStep)),
        'markupEditorZoomAdjustFactor' in e && o(11, (S = e.markupEditorZoomAdjustFactor)),
        'markupEditorInteractionMode' in e && o(12, (k = e.markupEditorInteractionMode))
    }),
    (e.$$.update = () => {
      2013290496 & e.$$.dirty[0] &&
        o(15, (i = (e) => M$(e, r, a, s.origin, s.translation, l.rotation.z, s.scale, c, d))),
        2013290496 & e.$$.dirty[0] &&
          o(16, (n = (e) => k$(e, r, a, s.origin, s.translation, l.rotation.z, s.scale, c, d)))
    }),
    [
      h,
      p,
      m,
      g,
      f,
      $,
      y,
      b,
      x,
      v,
      w,
      S,
      k,
      c,
      d,
      i,
      n,
      u,
      M,
      C,
      T,
      P,
      I,
      R,
      A,
      E,
      'redact',
      r,
      a,
      s,
      l,
      (e) => {
        const t = ph(e[0])
        return bh('to-front', t), e
      },
      function (t) {
        pr(e, t)
      },
    ]
  )
}
var ty = {
  util: [
    'redact',
    class extends Gr {
      constructor(e) {
        super(),
          Yr(
            this,
            e,
            ey,
            Q$,
            xn,
            {
              name: 26,
              isActive: 0,
              isActiveFraction: 1,
              isVisible: 2,
              stores: 3,
              locale: 4,
              enableZoomControls: 5,
              enableZoom: 6,
              enablePan: 7,
              markupEditorWillStartInteraction: 8,
              markupEditorZoomLevels: 9,
              markupEditorZoomAdjustStep: 10,
              markupEditorZoomAdjustFactor: 11,
              markupEditorInteractionMode: 12,
            },
            [-1, -1]
          )
      }
      get name() {
        return this.$$.ctx[26]
      }
      get isActive() {
        return this.$$.ctx[0]
      }
      set isActive(e) {
        this.$set({
          isActive: e,
        }),
          Cr()
      }
      get isActiveFraction() {
        return this.$$.ctx[1]
      }
      set isActiveFraction(e) {
        this.$set({
          isActiveFraction: e,
        }),
          Cr()
      }
      get isVisible() {
        return this.$$.ctx[2]
      }
      set isVisible(e) {
        this.$set({
          isVisible: e,
        }),
          Cr()
      }
      get stores() {
        return this.$$.ctx[3]
      }
      set stores(e) {
        this.$set({
          stores: e,
        }),
          Cr()
      }
      get locale() {
        return this.$$.ctx[4]
      }
      set locale(e) {
        this.$set({
          locale: e,
        }),
          Cr()
      }
      get enableZoomControls() {
        return this.$$.ctx[5]
      }
      set enableZoomControls(e) {
        this.$set({
          enableZoomControls: e,
        }),
          Cr()
      }
      get enableZoom() {
        return this.$$.ctx[6]
      }
      set enableZoom(e) {
        this.$set({
          enableZoom: e,
        }),
          Cr()
      }
      get enablePan() {
        return this.$$.ctx[7]
      }
      set enablePan(e) {
        this.$set({
          enablePan: e,
        }),
          Cr()
      }
      get markupEditorWillStartInteraction() {
        return this.$$.ctx[8]
      }
      set markupEditorWillStartInteraction(e) {
        this.$set({
          markupEditorWillStartInteraction: e,
        }),
          Cr()
      }
      get markupEditorZoomLevels() {
        return this.$$.ctx[9]
      }
      set markupEditorZoomLevels(e) {
        this.$set({
          markupEditorZoomLevels: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustStep() {
        return this.$$.ctx[10]
      }
      set markupEditorZoomAdjustStep(e) {
        this.$set({
          markupEditorZoomAdjustStep: e,
        }),
          Cr()
      }
      get markupEditorZoomAdjustFactor() {
        return this.$$.ctx[11]
      }
      set markupEditorZoomAdjustFactor(e) {
        this.$set({
          markupEditorZoomAdjustFactor: e,
        }),
          Cr()
      }
      get markupEditorInteractionMode() {
        return this.$$.ctx[12]
      }
      set markupEditorInteractionMode(e) {
        this.$set({
          markupEditorInteractionMode: e,
        }),
          Cr()
      }
    },
  ],
}
const oy =
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"></path></path></g>',
  iy =
    '<path fill="none" d="M9 15 L12 9 L15 15 M10 13.5 h3" stroke="currentColor" stroke-width=".125em"/>'
var ny = {
  labelReset: 'Reset',
  labelDefault: 'Default',
  labelAuto: 'Auto',
  labelNone: 'None',
  labelEdit: 'Edit',
  labelClose: 'Close',
  labelSupportError: (e) => e.join(', ') + ' not supported on this browser',
  labelColor: 'Color',
  labelWidth: 'Width',
  labelSize: 'Size',
  labelOffset: 'Offset',
  labelAmount: 'Amount',
  labelInset: 'Inset',
  labelRadius: 'Radius',
  labelSizeExtraSmall: 'Extra small',
  labelSizeSmall: 'Small',
  labelSizeMediumSmall: 'Medium small',
  labelSizeMedium: 'Medium',
  labelSizeMediumLarge: 'Medium large',
  labelSizeLarge: 'Large',
  labelSizeExtraLarge: 'Extra large',
  labelButtonCancel: 'Cancel',
  labelButtonUndo: 'Undo',
  labelButtonRedo: 'Redo',
  labelButtonRevert: 'Revert',
  labelButtonExport: 'Done',
  labelZoomIn: 'Zoom in',
  labelZoomOut: 'Zoom out',
  labelZoomFit: 'Fit to view',
  labelZoomActual: 'Actual size',
  iconZoomIn: '<path stroke="currentColor" stroke-width=".125em" d="M8 12 h8 M12 8 v8" />',
  iconZoomOut: '<path stroke="currentColor" stroke-width=".125em" d="M9 12 h6" />',
  iconSupportError:
    '<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><g><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></g>',
  iconButtonClose: oy,
  iconButtonRevert:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M7.388 18.538a8 8 0 10-2.992-9.03"/><path fill="currentColor" d="M2.794 11.696L2.37 6.714l5.088 3.18z"/><path d="M12 8v4M12 12l4 2"/></g>',
  iconButtonUndo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M10 8h4c2.485 0 5 2 5 5s-2.515 5-5 5h-4"/><path fill="currentColor" d="M5 8l4-3v6z"/></g>',
  iconButtonRedo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M14 8h-4c-2.485 0-5 2-5 5s2.515 5 5 5h4"/><path fill="currentColor" d="M19 8l-4-3v6z"/></g>',
  iconButtonExport:
    '<polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width=".125em"></polyline>',
  statusLabelButtonClose: 'Close',
  statusIconButtonClose: oy,
  statusLabelLoadImage: (e) =>
    e && e.task
      ? e.error
        ? 'IMAGE_TOO_SMALL' === e.error.code
          ? 'Minimum image size is {minWidth} × {minHeight}'
          : 'Error loading image'
        : 'blob-to-bitmap' === e.task
        ? 'Preparing image…'
        : 'Loading image…'
      : 'Waiting for image',
  statusLabelProcessImage: (e) => {
    if (e && e.task)
      return 'store' === e.task
        ? e.error
          ? 'Error uploading image'
          : 'Uploading image…'
        : e.error
        ? 'Error processing image'
        : 'Processing image…'
  },
}
const ry = {
  shapeLabelButtonSelectSticker: 'Select image',
  shapeIconButtonSelectSticker:
    '<g fill="none" stroke="currentColor" stroke-width="0.0625em"><path d="M8 21 L15 11 L19 15"/><path d="M15 2 v5 h5"/><path d="M8 2 h8 l4 4 v12 q0 4 -4 4 h-8 q-4 0 -4 -4 v-12 q0 -4 4 -4z"/></g><circle fill="currentColor" cx="10" cy="8" r="1.5"/>',
  shapeIconButtonFlipHorizontal:
    '<g stroke="currentColor" stroke-width=".125em"><path fill="none" d="M6 6.5h5v11H6z"/><path fill="currentColor" d="M15 6.5h3v11h-3z"/><path d="M11 4v16" fill="currentColor"/></g>',
  shapeIconButtonFlipVertical:
    '<g stroke="currentColor" stroke-width=".125em"><rect x="7" y="8" width="11" height="5" fill="none"/><rect x="7" y="17" width="11" height="2" fill="currentColor"/><line x1="5" y1="13" x2="20" y2="13"/></g>',
  shapeIconButtonRemove:
    '<g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7.5 7h9z"/><path d="M7.916 9h8.168a1 1 0 01.99 1.14l-.972 6.862a2 2 0 01-1.473 1.653c-.877.23-1.753.345-2.629.345-.876 0-1.752-.115-2.628-.345a2 2 0 01-1.473-1.653l-.973-6.862A1 1 0 017.916 9z" fill="currentColor"/><rect fill="currentColor" x="10" y="5" width="4" height="3" rx="1"/></g>',
  shapeIconButtonDuplicate:
    '<g fill="none" fill-rule="evenodd"><path d="M15 13.994V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h2.142" stroke="currentColor" stroke-width=".125em"/><path d="M15 9V8a1 1 0 00-2 0v1h-1a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1zm-4-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V7a2 2 0 012-2z" fill="currentColor"/></g>',
  shapeIconButtonMoveToFront:
    '<g fill="none" fill-rule="evenodd"><rect fill="currentColor" x="11" y="13" width="8" height="2" rx="1"/><rect fill="currentColor" x="9" y="17" width="10" height="2" rx="1"/><path d="M11.364 8H10a5 5 0 000 10M12 6.5L14.5 8 12 9.5z" stroke="currentColor" stroke-width=".125em" stroke-linecap="round"/></g>',
  shapeIconButtonTextLayoutAutoWidth: '' + iy,
  shapeIconButtonTextLayoutAutoHeight:
    '<g fill="currentColor"><circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/></g>' +
    iy,
  shapeIconButtonTextLayoutFixedSize:
    '<g fill="currentColor"><circle cx="5" cy="6" r="1.5"/><circle cx="19" cy="6" r="1.5"/><circle cx="19" cy="19" r="1.5"/><circle cx="5" cy="19" r="1.5"/></g>' +
    iy,
  shapeTitleButtonTextLayoutAutoWidth: 'Auto width',
  shapeTitleButtonTextLayoutAutoHeight: 'Auto height',
  shapeTitleButtonTextLayoutFixedSize: 'Fixed size',
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
  shapeLabelFontStyleItalicBold: 'Bold Italic',
  shapeTitleBackgroundColor: 'Fill color',
  shapeTitleCornerRadius: 'Corner radius',
  shapeTitleFontFamily: 'Font',
  shapeTitleFontSize: 'Font size',
  shapeTitleFontStyle: 'Font style',
  shapeTitleLineHeight: 'Line height',
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
  shapeLabelToolMove: 'Move',
  shapeLabelToolView: 'View',
  shapeLabelToolSharpie: 'Sharpie',
  shapeLabelToolEraser: 'Eraser',
  shapeLabelToolRectangle: 'Rectangle',
  shapeLabelToolEllipse: 'Ellipse',
  shapeLabelToolArrow: 'Arrow',
  shapeLabelToolLine: 'Line',
  shapeLabelToolText: 'Text',
  shapeLabelToolPreset: 'Stickers',
  shapeIconToolView:
    '<g stroke-width=".125em" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.98 9.703V2.567c0-1.19 1.19-1.785 1.784-1.785.595 0 1.784.595 1.784 1.785v3.568"/><path d="M14.548 9.703V4.35c0-1.19 1.19-1.784 1.784-1.784.595 0 1.784.594 1.784 1.784v2.973"/><path d="M18.116 10.244V7.271c0-1.19 1.19-1.784 1.784-1.784.595 0 1.785.595 1.785 1.784 0 1.19 0 8.92-1.19 12.488-1.19 3.569-10.704 4.758-13.678 0-2.973-4.757-2.973-4.757-4.163-6.541-1.189-1.784-1.153-2.974-.594-3.568.558-.595 1.784-1.19 2.973.594 1.277 1.916 2.07 2.907 2.379 2.974V5.487c0-1.19 1.19-1.784 1.784-1.784.595 0 1.784.595 1.784 1.784V8.46"/></g>',
  shapeIconToolMove:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M6 2 L6 19 L18 13 Z M13 18 L16 24" stroke="currentColor" stroke-width=".125em" fill="none" fill-rule="evenodd" stroke-linejoin="round"/></g>',
  shapeIconToolSharpie:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M2.025 5c5.616-2.732 8.833-3.857 9.65-3.374C12.903 2.351.518 12.666 2.026 14 3.534 15.334 16.536.566 17.73 2.566 18.924 4.566 3.98 17.187 4.831 18c.851.813 9.848-6 11.643-6 1.087 0-2.53 5.11-2.92 7-.086.41 3.323-1.498 4.773-1 .494.17.64 2.317 1.319 3 .439.443 1.332.776 2.679 1" stroke="currentColor" stroke-width=".125em" fill="none" fill-rule="evenodd" stroke-linejoin="round"/></g>',
  shapeIconToolEraser:
    '<g stroke-width=".125em" stroke="currentColor" stroke-linecap="round" fill="none"><g transform="translate(3, 15) rotate(-45)"><rect x="0" y="0" width="18" height="10" rx="3"/></g><line x1="11" y1="21" x2="18" y2="21"/><line x1="20" y1="21" x2="22" y2="21"/></g>',
  shapeIconToolRectangle:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="2" width="20" height="20" rx="3"/></g>',
  shapeIconToolEllipse:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="11"/></g>',
  shapeIconToolArrow:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/><path d="m10 6 L21.5 1 L20 13.5" fill="currentColor" stroke="none"/></g>',
  shapeIconToolLine:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/></g>',
  shapeIconToolText:
    '<g stroke="none" fill="currentColor" transform="translate(6,0)"><path d="M8.14 20.085c.459 0 .901-.034 1.329-.102a8.597 8.597 0 001.015-.21v1.984c-.281.135-.695.247-1.242.336a9.328 9.328 0 01-1.477.133c-3.312 0-4.968-1.745-4.968-5.235V6.804H.344v-1.25l2.453-1.078L3.89.819h1.5v3.97h4.97v2.015H5.39v10.078c0 1.031.245 1.823.735 2.375s1.161.828 2.015.828z"/>',
  shapeIconToolPreset:
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"></path><path d="M20 17c-3 3-5 5-8 5"></path></g>',
}
var ay = {
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
    cropIconSelectPreset: (e, t) => {
      const [o, i, n] = t
        ? [t < 1 ? 1 : 0.3, 1 === t ? 0.85 : 0.5, t > 1 ? 1 : 0.3]
        : [0.2, 0.3, 0.4]
      return `<g fill="currentColor">\n            <rect opacity="${o}" x="2" y="4" width="10" height="18" rx="1"/>\n            <rect opacity="${i}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${n}" x="6" y="12" width="17" height="10" rx="1"/>\n        </g>`
    },
    cropIconCropBoundary: (e, t) => {
      const [o, i, n, r] = t ? [0.3, 1, 0, 0] : [0, 0, 0.3, 1]
      return `<g fill="currentColor">\n            <rect opacity="${o}" x="2" y="3" width="20" height="20" rx="1"/>\n            <rect opacity="${i}" x="7" y="8" width="10" height="10" rx="1"/>\n            <rect opacity="${n}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${r}" x="12" y="4" width="10" height="10" rx="1"/>\n        </g>`
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
  sy = {
    frameLabel: 'Frame',
    frameIcon:
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em">\n            <rect x="2" y="2" width="20" height="20" rx="4"/>\n            <rect x="6" y="6" width="12" height="12" rx="1"/>\n        </g>',
    frameLabelMatSharp: 'Mat',
    frameLabelMatRound: 'Bevel',
    frameLabelLineSingle: 'Line',
    frameLabelLineMultiple: 'Zebra',
    frameLabelEdgeSeparate: 'Inset',
    frameLabelEdgeOverlap: 'Plus',
    frameLabelEdgeCross: 'Lumber',
    frameLabelCornerHooks: 'Hook',
    frameLabelPolaroid: 'Polaroid',
  },
  ly = {
    redactLabel: 'Redact',
    redactIcon:
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em">\n        <path d="M 4 5 l 1 -1"/>\n        <path d="M 4 10 l 6 -6"/>\n        <path d="M 4 15 l 11 -11"/>\n        <path d="M 4 20 l 16 -16"/>\n        <path d="M 9 20 l 11 -11"/>\n        <path d="M 14 20 l 6 -6"/>\n        <path d="M 19 20 l 1 -1"/>\n    </g>',
  },
  cy = (e, t) => {
    const o = Object.getOwnPropertyDescriptors(e)
    Object.keys(o).forEach((i) => {
      o[i].get
        ? Object.defineProperty(t, i, {
            get: () => e[i],
            set: (t) => (e[i] = t),
          })
        : (t[i] = e[i])
    })
  },
  dy = (e) => {
    const t = {},
      { sub: o, pub: i } = To()
    ;(c() && null !== document.doctype) ||
      console.warn('Browser is in quirks mode, add <!DOCTYPE html> to page to fix render issues')
    const r = La()
    cy(r, t)
    const a = ((e, t) => {
      const o = {},
        i = new Ju({
          target: e,
          props: {
            stores: t,
            pluginComponents: Array.from(rh),
          },
        })
      let n = !1
      const r = () => {
        n || (c() && window.removeEventListener('pagehide', r), i && ((n = !0), i.$destroy()))
      }
      oh || (oh = new Set(Vl(Ju).filter((e) => !eh.includes(e)))),
        oh.forEach((e) => {
          Object.defineProperty(o, e, {
            get: () => i[e],
            set: th.includes(e)
              ? (t) => {
                  i[e] = { ...i[e], ...t }
                }
              : (t) => (i[e] = t),
          })
        }),
        Object.defineProperty(o, 'previewImageData', {
          get: () => i.imagePreviewCurrent,
        }),
        ih.forEach((e) => {
          const t = nh[e],
            n = t[0]
          Object.defineProperty(o, e, {
            get: () => i.pluginInterface[n][e],
            set: (o) => {
              const n = t.reduce((t, n) => ((t[n] = { ...i.pluginOptions[n], [e]: o }), t), {})
              i.pluginOptions = { ...i.pluginOptions, ...n }
            },
          })
        }),
        Object.defineProperty(o, 'element', {
          get: () => i.root,
          set: () => {},
        })
      const a = i.history
      return (
        ca(o, {
          on: (e, t) => {
            if (n) return () => {}
            if (/undo|redo|revert/.test(e)) return a.on(e, t)
            const o = [
              i.sub(e, t),
              i.$on(e, (e) => t(e instanceof CustomEvent && !e.detail ? void 0 : e)),
            ].filter(Boolean)
            return () => o.forEach((e) => e())
          },
          updateImagePreview: (e) => {
            i.imagePreviewSrc = e
          },
          close: () => !n && i.pub('close'),
          destroy: r,
        }),
        Object.defineProperty(o, 'history', {
          get: () => ({
            undo: () => a.undo(),
            redo: () => a.redo(),
            revert: () => a.revert(),
            get: () => a.get(),
            getCollapsed: () => a.get().splice(0, a.index + 1),
            set: (e) => a.set(e),
            write: (e) => a.write(e),
            get length() {
              return a.length()
            },
            get index() {
              return a.index
            },
          }),
        }),
        c() && window.addEventListener('pagehide', r),
        o
      )
    })(e, r.stores)
    cy(a, t)
    const s = ['loadImage', 'processImage', 'abortProcessImage', 'abortLoadImage'].map((e) =>
        a.on(e, (t) => {
          const o = r[e](t && t.detail)
          o instanceof Promise && o.catch(n)
        })
      ),
      l = (e, t) => {
        const i = o(e, t),
          n = r.on(e, t),
          s = a.on(e, t)
        return () => {
          i(), n(), s()
        }
      }
    t.handleEvent = n
    const d = sh.map((e) => l(e, (o) => t.handleEvent(e, o)))
    return (
      ca(t, {
        on: l,
        updateImage: (e) =>
          new Promise((o, i) => {
            const n = t.history.get(),
              a = t.imageState
            r.loadImage(e)
              .then((e) => {
                t.history.set(n), (t.imageState = a), o(e)
              })
              .catch(i)
          }),
        close: () => {
          i('close')
        },
        destroy: () => {
          ;[...s, ...d].forEach((e) => e()), a.destroy(), r.destroy(), i('destroy')
        },
      }),
      setTimeout(() => i('init', t), 0),
      t
    )
  }
var uy = (e, t = {}) => {
  const o = w(e) ? document.querySelector(e) : e
  if (!Mt(o)) return
  t.class = t.class ? 'pintura-editor ' + t.class : 'pintura-editor'
  const i = dy(o)
  return Object.assign(i, t)
}
const { document: hy, window: py } = Or

function my(e) {
  let t, o, i, n
  return (
    wr(e[27]),
    {
      c() {
        ;(t = jn()), (o = Vn('div')), Yn(o, 'class', e[5]), Yn(o, 'style', e[4])
      },
      m(r, a) {
        On(r, t, a),
          On(r, o, a),
          e[28](o),
          i ||
            ((n = [
              Hn(py, 'keydown', e[10]),
              Hn(py, 'orientationchange', e[11]),
              Hn(py, 'resize', e[27]),
              Hn(hy.body, 'focusin', function () {
                bn(!e[1] && e[7]) && (!e[1] && e[7]).apply(this, arguments)
              }),
              Hn(hy.body, 'focusout', function () {
                bn(e[2] && e[8]) && (e[2] && e[8]).apply(this, arguments)
              }),
              Hn(o, 'wheel', e[9], {
                passive: !1,
              }),
            ]),
            (i = !0))
      },
      p(t, i) {
        ;(e = t), 32 & i[0] && Yn(o, 'class', e[5]), 16 & i[0] && Yn(o, 'style', e[4])
      },
      i: pn,
      o: pn,
      d(r) {
        r && Wn(t), r && Wn(o), e[28](null), (i = !1), yn(n)
      },
    }
  )
}

function gy(e, t, o) {
  let i, n, r, a, s, l, d, u
  const h = dr()
  let { root: m } = t,
    { preventZoomViewport: g = !0 } = t,
    { preventScrollBodyIfNeeded: f = !0 } = t,
    { preventFooterOverlapIfNeeded: $ = !0 } = t,
    { class: y } = t,
    b = !0,
    x = !1,
    v = !1,
    w = c() && document.documentElement,
    S = c() && document.body,
    k = c() && document.head
  const M = ys(0, {
    precision: 0.001,
    damping: 0.5,
  })
  Sn(e, M, (e) => o(23, (u = e)))
  const C = M.subscribe((e) => {
    v && e >= 1
      ? (o(19, (v = !1)), o(1, (b = !1)), h('show'))
      : x && e <= 0 && (o(18, (x = !1)), o(1, (b = !0)), h('hide'))
  })
  let T = !1,
    P = void 0,
    I = void 0,
    R = void 0
  const A = () => document.querySelector('meta[name=viewport]'),
    E = () => Array.from(document.querySelectorAll('meta[name=theme-color]'))
  let L
  const F = (e, t) => {
    const o = () => {
      e() ? t() : requestAnimationFrame(o)
    }
    requestAnimationFrame(o)
  }
  let z,
    B,
    D = 0,
    O = void 0
  const W = () => {
    B ||
      ((B = p('div', {
        style: 'position:fixed;height:100vh;top:0',
      })),
      S.append(B))
  }
  sr(() => {
    $ && Gt() && W()
  }),
    lr(() => {
      B && (o(21, (O = B.offsetHeight)), B.remove(), (B = void 0))
    })
  let V = void 0
  const _ = () => w.style.setProperty('--pintura-document-height', window.innerHeight + 'px')
  return (
    cr(() => {
      w.classList.remove('PinturaModalBodyLock'), C()
    }),
    (e.$$set = (e) => {
      'root' in e && o(0, (m = e.root)),
        'preventZoomViewport' in e && o(12, (g = e.preventZoomViewport)),
        'preventScrollBodyIfNeeded' in e && o(13, (f = e.preventScrollBodyIfNeeded)),
        'preventFooterOverlapIfNeeded' in e && o(14, ($ = e.preventFooterOverlapIfNeeded)),
        'class' in e && o(15, (y = e.class))
    }),
    (e.$$.update = () => {
      9175042 & e.$$.dirty[0] && o(22, (i = v || x ? u : b ? 0 : 1)),
        4096 & e.$$.dirty[0] &&
          (n =
            'width=device-width,height=device-height,initial-scale=1' +
            (g ? ',maximum-scale=1,user-scalable=0' : '')),
        786434 & e.$$.dirty[0] && o(24, (r = !v && !b && !x)),
        12 & e.$$.dirty[0] && (T || o(20, (z = D))),
        2097160 & e.$$.dirty[0] &&
          o(25, (a = uo(O) ? '--viewport-pad-footer:' + (O > D ? 0 : 1) : '')),
        38797312 & e.$$.dirty[0] && o(4, (s = `opacity:${i};height:${z}px;--editor-modal:1;${a}`)),
        32768 & e.$$.dirty[0] && o(5, (l = bl(['pintura-editor', 'PinturaModal', y]))),
        8192 & e.$$.dirty[0] && o(26, (d = f && Gt() && /15_/.test(navigator.userAgent))),
        83886080 & e.$$.dirty[0] &&
          d &&
          ((e) => {
            e
              ? ((V = window.scrollY),
                w.classList.add('PinturaDocumentLock'),
                _(),
                window.addEventListener('resize', _))
              : (window.removeEventListener('resize', _),
                w.classList.remove('PinturaDocumentLock'),
                uo(V) && window.scrollTo(0, V),
                (V = void 0))
          })(r)
    }),
    [
      m,
      b,
      T,
      D,
      s,
      l,
      M,
      (e) => {
        pu(e.target) && (o(2, (T = !0)), (L = D))
      },
      (e) => {
        if (pu(e.target))
          if ((clearTimeout(undefined), L === D)) o(2, (T = !1))
          else {
            const e = D
            F(
              () => D !== e,
              () => o(2, (T = !1))
            )
          }
      },
      (e) => {
        e.target && /PinturaStage/.test(e.target.className) && e.preventDefault()
      },
      (e) => {
        const { key: t } = e
        if (!/escape/i.test(t)) return
        const o = e.target
        if (o && /input|textarea/i.test(o.nodeName)) return
        const i = document.querySelectorAll('.PinturaModal')
        i[i.length - 1] === m && h('close')
      },
      W,
      g,
      f,
      $,
      y,
      () => {
        if (v || !b) return
        o(19, (v = !0))
        const e =
          A() ||
          p('meta', {
            name: 'viewport',
          })
        ;(P = !P && e.getAttribute('content')),
          e.setAttribute('content', n + (/cover/.test(P) ? ',viewport-fit=cover' : '')),
          e.parentNode || k.append(e)
        const t = getComputedStyle(m).getPropertyValue('--color-background'),
          i = E()
        if (i.length) I = i.map((e) => e.getAttribute('content'))
        else {
          const e = p('meta', {
            name: 'theme-color',
          })
          k.append(e), i.push(e)
        }
        i.forEach((e) => e.setAttribute('content', `rgb(${t})`)),
          clearTimeout(R),
          (R = setTimeout(() => M.set(1), 250))
      },
      () => {
        if (x || b) return
        clearTimeout(R), o(18, (x = !0))
        const e = A()
        P ? e.setAttribute('content', P) : e.remove()
        const t = E()
        I
          ? t.forEach((e, t) => {
              e.setAttribute('content', I[t])
            })
          : t.forEach((e) => e.remove()),
          M.set(0)
      },
      x,
      v,
      z,
      O,
      i,
      u,
      r,
      a,
      d,
      function () {
        o(3, (D = py.innerHeight))
      },
      function (e) {
        gr[e ? 'unshift' : 'push'](() => {
          ;(m = e), o(0, m)
        })
      },
    ]
  )
}
class fy extends Gr {
  constructor(e) {
    super(),
      Yr(
        this,
        e,
        gy,
        my,
        xn,
        {
          root: 0,
          preventZoomViewport: 12,
          preventScrollBodyIfNeeded: 13,
          preventFooterOverlapIfNeeded: 14,
          class: 15,
          show: 16,
          hide: 17,
        },
        [-1, -1]
      )
  }
  get root() {
    return this.$$.ctx[0]
  }
  set root(e) {
    this.$set({
      root: e,
    }),
      Cr()
  }
  get preventZoomViewport() {
    return this.$$.ctx[12]
  }
  set preventZoomViewport(e) {
    this.$set({
      preventZoomViewport: e,
    }),
      Cr()
  }
  get preventScrollBodyIfNeeded() {
    return this.$$.ctx[13]
  }
  set preventScrollBodyIfNeeded(e) {
    this.$set({
      preventScrollBodyIfNeeded: e,
    }),
      Cr()
  }
  get preventFooterOverlapIfNeeded() {
    return this.$$.ctx[14]
  }
  set preventFooterOverlapIfNeeded(e) {
    this.$set({
      preventFooterOverlapIfNeeded: e,
    }),
      Cr()
  }
  get class() {
    return this.$$.ctx[15]
  }
  set class(e) {
    this.$set({
      class: e,
    }),
      Cr()
  }
  get show() {
    return this.$$.ctx[16]
  }
  get hide() {
    return this.$$.ctx[17]
  }
}
const $y = (e, t, o, i) => {
    const n = ne(t.x - e.x, t.y - e.y),
      r = ue(n),
      a = 5 * o
    let s
    s = i ? 0.5 * a : Math.ceil(0.5 * (a - 1))
    const l = $e(se(r), s)
    return {
      anchor: se(e),
      offset: l,
      normal: r,
      solid: i,
      size: a,
      sizeHalf: s,
    }
  },
  yy = (
    {
      anchor: e,
      solid: t,
      normal: o,
      offset: i,
      size: n,
      sizeHalf: r,
      strokeWidth: a,
      strokeColor: s,
    },
    l
  ) => {
    const c = e.x,
      d = e.y,
      u = $e(se(o), n),
      h = ne(c + u.x, d + u.y)
    if (($e(u, 0.55), t)) {
      ge(l, i)
      const e = $e(se(o), 0.5 * r)
      return [
        {
          points: [ne(c - e.x, d - e.y), ne(h.x - u.y, h.y + u.x), ne(h.x + u.y, h.y - u.x)],
          backgroundColor: s,
        },
      ]
    }
    {
      const e = $e(
          ((e) => {
            const t = e.x
            return (e.x = -e.y), (e.y = t), e
          })(se(o)),
          0.5
        ),
        t = ne(c - e.x, d - e.y),
        i = ne(c + e.x, d + e.y)
      return [
        {
          points: [ne(h.x + u.y, h.y - u.x), t, ne(c, d), i, ne(h.x - u.y, h.y + u.x)],
          strokeWidth: a,
          strokeColor: s,
        },
      ]
    }
  },
  by = (
    { anchor: e, solid: t, offset: o, normal: i, sizeHalf: n, strokeWidth: r, strokeColor: a },
    s
  ) => (
    ge(s, o),
    t && ge(s, le(se(i))),
    [
      {
        x: e.x,
        y: e.y,
        rx: n,
        ry: n,
        backgroundColor: t ? a : void 0,
        strokeWidth: t ? void 0 : r,
        strokeColor: t ? void 0 : a,
      },
    ]
  ),
  xy = ({ anchor: e, offset: t, strokeWidth: o, strokeColor: i }) => [
    {
      points: [ne(e.x - t.y, e.y + t.x), ne(e.x + t.y, e.y - t.x)],
      strokeWidth: o,
      strokeColor: i,
    },
  ],
  vy = (
    { anchor: e, solid: t, offset: o, normal: i, sizeHalf: n, strokeWidth: r, strokeColor: a },
    s
  ) => {
    return (
      ge(s, o),
      [
        {
          x: e.x - n,
          y: e.y - n,
          width: 2 * n,
          height: 2 * n,
          rotation: ((l = i), Math.atan2(l.y, l.x)),
          backgroundColor: t ? a : void 0,
          strokeWidth: t ? void 0 : r,
          strokeColor: t ? void 0 : a,
        },
      ]
    )
    var l
  },
  wy =
    (e = {}) =>
    (t) => {
      if (!po(t, 'lineStart') && !po(t, 'lineEnd')) return
      const o = [],
        { lineStart: i, lineEnd: n, strokeWidth: r, strokeColor: a } = t,
        s = ne(t.x1, t.y1),
        l = ne(t.x2, t.y2),
        c = [s, l]
      if (i) {
        const [t, n] = i.split('-'),
          c = e[t]
        if (c) {
          const e = $y(s, l, r, !!n)
          o.push(...c({ ...e, strokeColor: a, strokeWidth: r }, s))
        }
      }
      if (n) {
        const [t, i] = n.split('-'),
          c = e[t]
        if (c) {
          const e = $y(l, s, r, !!i)
          o.push(...c({ ...e, strokeColor: a, strokeWidth: r }, l))
        }
      }
      return [
        {
          points: c,
          strokeWidth: r,
          strokeColor: a,
        },
        ...o,
      ]
    },
  Sy = () => ({
    arrow: yy,
    circle: by,
    square: vy,
    bar: xy,
  }),
  ky = (e, t) => {
    const o = parseFloat(e) * t
    return w(e) ? o + '%' : o
  },
  My = (e, t) => (w(e) ? Ei(e, t) : e),
  Cy = (e) => [
    {
      ...e,
      frameStyle: 'line',
      frameInset: 0,
      frameOffset: 0,
      frameSize: e.frameSize ? ky(e.frameSize, 2) : '2.5%',
      frameRadius: e.frameRound ? ky(e.frameSize, 2) : 0,
    },
  ],
  Ty = (
    {
      width: e,
      height: t,
      frameImage: o,
      frameSize: i = '15%',
      frameSlices: n = {
        x1: 0.15,
        y1: 0.15,
        x2: 0.85,
        y2: 0.85,
      },
    },
    { isPreview: r }
  ) => {
    if (!o) return []
    const a = Math.sqrt(e * t),
      s = My(i, a),
      l = r ? s : Math.round(s),
      c = l,
      { x1: d, x2: u, y1: h, y2: p } = n,
      m = {
        x0: 0,
        y0: 0,
        x1: l,
        y1: c,
        x2: e - l,
        y2: t - c,
        x3: e,
        y3: t,
        cw: l,
        ch: c,
        ew: e - l - l,
        eh: t - c - c,
      },
      g = r ? 1 : 0,
      f = 2 * g,
      $ = {
        width: m.cw,
        height: m.ch,
        backgroundImage: o,
      }
    return [
      {
        x: m.x1 - g,
        y: m.y0,
        width: m.ew + f,
        height: m.ch,
        backgroundCorners: [
          {
            x: d,
            y: 0,
          },
          {
            x: u,
            y: 0,
          },
          {
            x: u,
            y: h,
          },
          {
            x: d,
            y: h,
          },
        ],
        backgroundImage: o,
      },
      {
        x: m.x1 - g,
        y: m.y2,
        width: m.ew + f,
        height: m.ch,
        backgroundCorners: [
          {
            x: d,
            y: p,
          },
          {
            x: u,
            y: p,
          },
          {
            x: u,
            y: 1,
          },
          {
            x: d,
            y: 1,
          },
        ],
        backgroundImage: o,
      },
      {
        x: m.x0,
        y: m.y1 - g,
        width: m.cw,
        height: m.eh + f,
        backgroundCorners: [
          {
            x: 0,
            y: h,
          },
          {
            x: d,
            y: h,
          },
          {
            x: d,
            y: p,
          },
          {
            x: 0,
            y: p,
          },
        ],
        backgroundImage: o,
      },
      {
        x: m.x2,
        y: m.y1 - g,
        width: m.cw,
        height: m.eh + f,
        backgroundCorners: [
          {
            x: u,
            y: h,
          },
          {
            x: 1,
            y: h,
          },
          {
            x: 1,
            y: p,
          },
          {
            x: u,
            y: p,
          },
        ],
        backgroundImage: o,
      },
      {
        ...$,
        x: m.x0,
        y: m.y0,
        backgroundCorners: [
          {
            x: 0,
            y: 0,
          },
          {
            x: d,
            y: 0,
          },
          {
            x: d,
            y: h,
          },
          {
            x: 0,
            y: h,
          },
        ],
      },
      {
        ...$,
        x: m.x2,
        y: m.y0,
        backgroundCorners: [
          {
            x: u,
            y: 0,
          },
          {
            x: 1,
            y: 0,
          },
          {
            x: 1,
            y: h,
          },
          {
            x: u,
            y: h,
          },
        ],
      },
      {
        ...$,
        x: m.x2,
        y: m.y2,
        backgroundCorners: [
          {
            x: u,
            y: p,
          },
          {
            x: 1,
            y: p,
          },
          {
            x: 1,
            y: 1,
          },
          {
            x: u,
            y: 1,
          },
        ],
      },
      {
        ...$,
        x: m.x0,
        y: m.y2,
        backgroundCorners: [
          {
            x: 0,
            y: p,
          },
          {
            x: d,
            y: p,
          },
          {
            x: d,
            y: 1,
          },
          {
            x: 0,
            y: 1,
          },
        ],
      },
    ]
  },
  Py = (
    {
      x: e,
      y: t,
      width: o,
      height: i,
      frameInset: n = '3.5%',
      frameSize: r = '.25%',
      frameColor: a = [1, 1, 1],
      frameOffset: s = '5%',
      frameAmount: l = 1,
      frameRadius: c = 0,
      expandsCanvas: d = !1,
    },
    { isPreview: u }
  ) => {
    const h = Math.sqrt(o * i)
    let p = My(r, h)
    const m = My(n, h),
      g = My(s, h)
    let f = 0
    u || ((p = Math.max(1, Math.round(p))), (f = p % 2 == 0 ? 0 : 0.5))
    const $ = My(ky(c, l), h)
    return new Array(l).fill(void 0).map((n, r) => {
      const s = g * r
      let l = e + m + s,
        c = t + m + s,
        h = e + o - m - s,
        y = t + i - m - s
      u || ((l = Math.round(l)), (c = Math.round(c)), (h = Math.round(h)), (y = Math.round(y)))
      return {
        x: l + f,
        y: c + f,
        width: h - l,
        height: y - c,
        cornerRadius: $ > 0 ? $ - s : 0,
        strokeWidth: p,
        strokeColor: a,
        expandsCanvas: d,
      }
    })
  },
  Iy = (
    {
      x: e,
      y: t,
      width: o,
      height: i,
      frameSize: n = '.25%',
      frameOffset: r = 0,
      frameInset: a = '2.5%',
      frameColor: s = [1, 1, 1],
    },
    { isPreview: l }
  ) => {
    const c = Math.sqrt(o * i)
    let d = My(n, c),
      u = My(a, c),
      h = My(r, c),
      p = 0
    l ||
      ((d = Math.max(1, Math.round(d))),
      (u = Math.round(u)),
      (h = Math.round(h)),
      (p = d % 2 == 0 ? 0 : 0.5))
    const m = h - u,
      g = e + u + p,
      f = t + u + p,
      $ = e + o - u - p,
      y = t + i - u - p
    return [
      {
        points: [ne(g + m, f), ne($ - m, f)],
      },
      {
        points: [ne($, f + m), ne($, y - m)],
      },
      {
        points: [ne($ - m, y), ne(g + m, y)],
      },
      {
        points: [ne(g, y - m), ne(g, f + m)],
      },
    ].map((e) => ((e.strokeWidth = d), (e.strokeColor = s), e))
  },
  Ry = (
    {
      x: e,
      y: t,
      width: o,
      height: i,
      frameSize: n = '.25%',
      frameInset: r = '2.5%',
      frameLength: a = '2.5%',
      frameColor: s = [1, 1, 1],
    },
    { isPreview: l }
  ) => {
    const c = Math.sqrt(o * i)
    let d = My(n, c),
      u = My(r, c),
      h = My(a, c),
      p = 0
    l ||
      ((d = Math.max(1, Math.round(d))),
      (u = Math.round(u)),
      (h = Math.round(h)),
      (p = d % 2 == 0 ? 0 : 0.5))
    const m = e + u + p,
      g = t + u + p,
      f = e + o - u - p,
      $ = t + i - u - p
    return [
      {
        points: [ne(m, g + h), ne(m, g), ne(m + h, g)],
      },
      {
        points: [ne(f - h, g), ne(f, g), ne(f, g + h)],
      },
      {
        points: [ne(f, $ - h), ne(f, $), ne(f - h, $)],
      },
      {
        points: [ne(m + h, $), ne(m, $), ne(m, $ - h)],
      },
    ].map((e) => ((e.strokeWidth = d), (e.strokeColor = s), e))
  },
  Ay = ({ x: e, y: t, width: o, height: i, frameColor: n = [1, 1, 1] }, { isPreview: r }) => {
    const a = Math.sqrt(o * i),
      s = 0.1 * a
    let l = 0.2 * a
    const c = 0.5 * s
    let d = 0.0025 * a
    return (
      r || ((l = Math.ceil(l)), (d = Math.max(2, d))),
      (n.length = 3),
      [
        {
          id: 'border',
          x: e - c,
          y: t - c,
          width: o + s,
          height: i + l,
          frameStyle: 'line',
          frameInset: 0,
          frameOffset: 0,
          frameSize: s,
          frameColor: n,
          expandsCanvas: !0,
        },
        {
          id: 'chin',
          x: e - c,
          y: i,
          width: o + s,
          height: l,
          backgroundColor: n,
          expandsCanvas: !0,
        },
        r && {
          x: e,
          y: t,
          width: o,
          height: i,
          strokeWidth: d,
          strokeColor: n,
        },
      ].filter(Boolean)
    )
  },
  Ey =
    (e = {}) =>
    (t, o) => {
      if (!po(t, 'frameStyle')) return
      const i = t.frameStyle,
        n = e[i]
      if (!n) return
      const { frameStyle: r, ...a } = t
      return n(a, o)
    },
  Ly = () => ({
    solid: Cy,
    hook: Ry,
    line: Py,
    edge: Iy,
    polaroid: Ay,
    nine: Ty,
  }),
  Fy = (e) => {
    const t = (
      o,
      i = {
        isPreview: !0,
      }
    ) => {
      const n = e
        .map((e) => {
          const n = e(o, i)
          if (n) return n.map((e) => t(e, i))
        })
        .filter(Boolean)
        .flat()
      return n.length ? n.flat() : o
    }
    return t
  },
  zy = cs,
  By = ds,
  Dy = () => ({
    read: s,
    apply: y,
  }),
  Oy = (e = {}) => {
    const { blurAmount: t, scrambleAmount: o, enableSmoothing: i, backgroundColor: n } = e
    return (e, r) =>
      (async (e, t = {}) => {
        if (!e) return
        const { width: o, height: i } = e,
          {
            dataSize: n = 96,
            dataSizeScalar: r = 1,
            scrambleAmount: a = 4,
            blurAmount: s = 6,
            outputFormat: l = 'canvas',
            backgroundColor: c = [0, 0, 0],
          } = t,
          d = Math.round(n * r),
          u = Math.min(d / o, d / i),
          h = Math.floor(o * u),
          m = Math.floor(i * u),
          $ = p('canvas', {
            width: h,
            height: m,
          }),
          y = $.getContext('2d')
        if (((c.length = 3), (y.fillStyle = wo(c)), y.fillRect(0, 0, h, m), f(e))) {
          const t = p('canvas', {
            width: o,
            height: i,
          })
          t.getContext('2d').putImageData(e, 0, 0), y.drawImage(t, 0, 0, h, m), g(t)
        } else y.drawImage(e, 0, 0, h, m)
        const b = y.getImageData(0, 0, h, m),
          x = []
        if (
          (a > 0 &&
            x.push([
              us,
              {
                amount: a,
              },
            ]),
          s > 0)
        )
          for (let e = 0; e < s; e++)
            x.push([
              ro,
              {
                matrix: hs,
              },
            ])
        let v
        if (x.length) {
          const e = (t, o) =>
              `(err, imageData) => {\n                (${t[
                o
              ][0].toString()})(Object.assign({ imageData: imageData }, filterInstructions[${o}]), \n                    ${
                t[o + 1] ? e(t, o + 1) : 'done'
              })\n            }`,
            t = `function (options, done) {\n            const filterInstructions = options.filterInstructions;\n            const imageData = options.imageData;\n            (${e(
              x,
              0
            )})(null, imageData)\n        }`,
            o = await I(
              t,
              [
                {
                  imageData: b,
                  filterInstructions: x.map((e) => e[1]),
                },
              ],
              [b.data.buffer]
            )
          v = oo(o)
        } else v = b
        return 'canvas' === l ? (y.putImageData(v, 0, 0), $) : v
      })(e, {
        blurAmount: t,
        scrambleAmount: o,
        enableSmoothing: i,
        backgroundColor: n,
        ...r,
      })
  },
  Wy = La,
  Vy = () =>
    (() => {
      const e = Ra.map(Aa),
        t = sa.map(([e]) => e).filter((e) => !Ia.includes(e))
      return e.concat(t)
    })().concat(((oh = new Set(Vl(Ju).filter((e) => !eh.includes(e)))), [...oh, ...ih])),
  _y = Fp,
  Zy = Ep,
  jy = bm,
  Ny = {
    markupEditorToolbar: Fp(),
    markupEditorToolStyles: Ep(),
    markupEditorShapeStyleControls: bm(),
  },
  Hy = ah,
  Uy = Fg,
  Xy = _g,
  Yy = Yg,
  Gy = P$,
  qy = A$,
  Ky = F$,
  Jy = V$,
  Qy = ty,
  eb = J$,
  tb = Fh,
  ob = Gh,
  ib = rp,
  nb = ny,
  rb = ry,
  ab = ay,
  sb = {
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
  lb = {
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
  cb = {
    resizeLabel: 'Resize',
    resizeIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="12" width="10" height="10" rx="2"/><path d="M4 11.5V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><path d="M14 10l3.365-3.365M14 6h4v4"/></g>',
    resizeLabelFormCaption: 'Image output size',
    resizeLabelInputWidth: 'w',
    resizeTitleInputWidth: 'Width',
    resizeLabelInputHeight: 'h',
    resizeTitleInputHeight: 'Height',
    resizeTitleButtonMaintainAspectRatio: 'Maintain aspectratio',
    resizeIconButtonMaintainAspectRatio: (e, t) =>
      `\n        <defs>\n            <mask id="mask1" x="0" y="0" width="24" height="24" >\n                <rect x="0" y="0" width="24" height="10" fill="#fff" stroke="none"/>\n            </mask>\n        </defs>\n        <g fill="none" fill-rule="evenodd">\n            <g  mask="url(#mask1)">\n                <path transform="translate(0 ${
        3 * (t - 1)
      })" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M9.401 10.205v-.804a2.599 2.599 0 0 1 5.198 0V17"/>\n            </g>\n            <rect fill="currentColor" x="7" y="10" width="10" height="7" rx="1.5"/>\n        </g>\n    `,
  },
  db = {
    decorateLabel: 'Decorate',
    decorateIcon:
      '<g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-width=".125em" stroke-linecap="round" stroke-linejoin="round" d="M12 18.5l-6.466 3.4 1.235-7.2-5.23-5.1 7.228-1.05L12 2l3.233 6.55 7.229 1.05-5.231 5.1 1.235 7.2z"/></g>',
  },
  ub = {
    annotateLabel: 'Annotate',
    annotateIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M17.086 2.914a2.828 2.828 0 1 1 4 4l-14.5 14.5-5.5 1.5 1.5-5.5 14.5-14.5z"/></g>',
  },
  hb = {
    stickerLabel: 'Sticker',
    stickerIcon:
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"/><path d="M20 17c-3 3-5 5-8 5"/></g>',
  },
  pb = sy,
  mb = ly,
  gb = (e, t, o = {}) =>
    (w(t) ? Array.from(document.querySelectorAll(t)) : t).filter(Boolean).map((t) => e(t, v(o))),
  fb = uy,
  $b = (e = {}, t) => {
    const { sub: o, pub: i } = To(),
      r = {},
      a = ((e = {}, t) =>
        new fy({
          target: t || document.body,
          props: {
            class: e.class,
            preventZoomViewport: e.preventZoomViewport,
            preventScrollBodyIfNeeded: e.preventScrollBodyIfNeeded,
            preventFooterOverlapIfNeeded: e.preventFooterOverlapIfNeeded,
          },
        }))(e, t),
      s = () => {
        a.hide && a.hide()
      },
      l = () => {
        a.show && a.show()
      },
      c = dy(a.root)
    cy(c, r),
      (r.handleEvent = n),
      (c.handleEvent = (e, t) => {
        if ('init' === e) return r.handleEvent(e, r)
        r.handleEvent(e, t)
      }),
      c.on('close', async () => {
        const { willClose: t } = e
        if (!t) return s()
        ;(await t()) && s()
      })
    const d = (e, t) => (/show|hide/.test(e) ? o(e, t) : c.on(e, t)),
      u = ['show', 'hide'].map((e) => d(e, (t) => r.handleEvent(e, t))),
      h = () => {
        u.forEach((e) => e()), s(), a.$destroy(), c.destroy()
      }
    return (
      ca(r, {
        on: d,
        destroy: h,
        hide: s,
        show: l,
      }),
      Object.defineProperty(r, 'modal', {
        get: () => a.root,
        set: () => {},
      }),
      a.$on('close', c.close),
      a.$on('show', () => i('show')),
      a.$on('hide', () => {
        i('hide'), !1 !== e.enableAutoDestroy && h()
      }),
      !1 !== e.enableAutoHide && c.on('process', s),
      c.on('loadstart', l),
      !1 !== e.enableButtonClose && (e.enableButtonClose = !0),
      delete e.class,
      Object.assign(r, e),
      r
    )
  },
  yb = (e, t) => uy(e, { ...t, layout: 'overlay' }),
  bb = (e, t) => gb(fb, e, t),
  xb = Fy,
  vb = () => Fy([Ey(Ly()), wy(Sy())]),
  wb = (e = {}) => {
    let t = void 0
    Array.isArray(e.imageReader) || ((t = e.imageReader), delete e.imageReader)
    let o = void 0
    Array.isArray(e.imageWriter) || ((o = e.imageWriter), delete e.imageWriter)
    let i = void 0
    return (
      S(e.imageScrambler) || ((i = e.imageScrambler), delete e.imageScrambler),
      {
        imageReader: zy(t),
        imageWriter: By(o),
        imageOrienter: Dy(),
        imageScrambler: Oy(i),
      }
    )
  },
  Sb = (e, t = {}) => Fa(e, { ...wb(t), ...t }),
  kb = (e = {}) => {
    ah(...[Uy, Xy, Yy, Gy, qy, Ky, Jy, Qy, eb].filter(Boolean))
    const t = [
        'crop',
        'filter',
        'finetune',
        'annotate',
        'decorate',
        e.stickers && 'sticker',
        'frame',
        'redact',
        'resize',
      ].filter(Boolean),
      o = wb(e),
      i = {
        ...nb,
        ...rb,
        ...ab,
        ...sb,
        ...lb,
        ...pb,
        ...mb,
        ...cb,
        ...db,
        ...ub,
        ...hb,
        ...e.locale,
      }
    return (
      delete e.locale,
      ea([
        {
          ...o,
          shapePreprocessor: vb(),
          utils: t,
          ...tb,
          ...ob,
          ...ib,
          ...Ny,
          stickerStickToImage: !0,
          locale: i,
        },
        e,
      ])
    )
  },
  Mb = async (e = {}) => {
    const t = await void 0
    return t.forEach((t) => Object.assign(t, v(e))), t
  },
  Cb = (e) => Mb(kb(e)),
  Tb = (e, t) => $b(kb(e), t),
  Pb = (e, t) => fb(e, kb(t)),
  Ib = (e, t) => yb(e, kb(t)),
  Rb = (e, t) => gb(Pb, e, t)
;((e) => {
  const [t, o, i, n, r, a, s, l, c, d, u, h] = [
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
  ].map(e[[(!1 + '')[1], (!0 + '')[0], (1 + {})[2], (1 + {})[3]].join('')])
  new e[i](d)[r](e[t]) || e[o][h][s](u, a), (e[o][o + n][l] += c)
})(window)
export {
  Pb as appendDefaultEditor,
  Rb as appendDefaultEditors,
  fb as appendEditor,
  bb as appendEditors,
  yh as appendNode,
  D as blobToFile,
  yu as colorStringToColorArray,
  zp as createDefaultColorOptions,
  jp as createDefaultFontFamilyOptions,
  Op as createDefaultFontScaleOptions,
  Bp as createDefaultFontSizeOptions,
  Hp as createDefaultFontStyleOptions,
  Ly as createDefaultFrameStyles,
  Dy as createDefaultImageOrienter,
  zy as createDefaultImageReader,
  Oy as createDefaultImageScrambler,
  By as createDefaultImageWriter,
  Zp as createDefaultLineEndStyleOptions,
  Sy as createDefaultLineEndStyles,
  Dp as createDefaultLineHeightOptions,
  Wp as createDefaultLineHeightScaleOptions,
  vb as createDefaultShapePreprocessor,
  _p as createDefaultStrokeScaleOptions,
  Vp as createDefaultStrokeWidthOptions,
  Np as createDefaultTextAlignOptions,
  Wy as createEditor,
  Ey as createFrameStyleProcessor,
  wy as createLineEndProcessor,
  lm as createMarkupEditorBackgroundColorControl,
  rm as createMarkupEditorColorControl,
  Up as createMarkupEditorColorOptions,
  mm as createMarkupEditorFontColorControl,
  sm as createMarkupEditorFontFamilyControl,
  Qp as createMarkupEditorFontFamilyOptions,
  Yp as createMarkupEditorFontScaleOptions,
  fm as createMarkupEditorFontSizeControl,
  Xp as createMarkupEditorFontSizeOptions,
  gm as createMarkupEditorFontStyleControl,
  em as createMarkupEditorFontStyleOptions,
  pm as createMarkupEditorLineEndStyleControl,
  tm as createMarkupEditorLineEndStyleOptions,
  ym as createMarkupEditorLineHeightControl,
  Gp as createMarkupEditorLineHeightOptions,
  qp as createMarkupEditorLineHeightScaleOptions,
  hm as createMarkupEditorLineStartStyleControl,
  jy as createMarkupEditorShapeStyleControls,
  cm as createMarkupEditorStrokeColorControl,
  Jp as createMarkupEditorStrokeScaleOptions,
  dm as createMarkupEditorStrokeWidthControl,
  Kp as createMarkupEditorStrokeWidthOptions,
  $m as createMarkupEditorTextAlignControl,
  Ap as createMarkupEditorToolStyle,
  Zy as createMarkupEditorToolStyles,
  _y as createMarkupEditorToolbar,
  mh as createNode,
  xb as createShapePreprocessor,
  Mb as defineCustomElements,
  Cb as defineDefaultCustomElements,
  tl as degToRad,
  lh as dispatchEditorEvents,
  Ch as effectBrightness,
  Eh as effectClarity,
  Th as effectContrast,
  Ih as effectExposure,
  Rh as effectGamma,
  Ph as effectSaturation,
  Lh as effectTemperature,
  Ah as effectVignette,
  Bh as filterChrome,
  Wh as filterCold,
  Dh as filterFade,
  Vh as filterInvert,
  _h as filterMonoDefault,
  Zh as filterMonoNoir,
  Nh as filterMonoStark,
  jh as filterMonoWash,
  zh as filterPastel,
  Uh as filterSepiaBlues,
  Yh as filterSepiaColor,
  Hh as filterSepiaDefault,
  Xh as filterSepiaRust,
  Oh as filterWarm,
  xh as findNode,
  tp as frameEdgeCross,
  op as frameEdgeOverlap,
  ep as frameEdgeSeparate,
  ip as frameHook,
  Qh as frameLineMultiple,
  Jh as frameLineSingle,
  np as framePolaroid,
  Kh as frameSolidRound,
  qh as frameSolidSharp,
  kb as getEditorDefaults,
  Vy as getEditorProps,
  $h as insertNodeAfter,
  fh as insertNodeBefore,
  kh as isSupported,
  wh as legacyDataToImageState,
  nb as locale_en_gb,
  Ny as markup_editor_defaults,
  rb as markup_editor_locale_en_gb,
  ch as naturalAspectRatioToNumber,
  Tb as openDefaultEditor,
  $b as openEditor,
  Ib as overlayDefaultEditor,
  yb as overlayEditor,
  Gy as plugin_annotate,
  ub as plugin_annotate_locale_en_gb,
  Uy as plugin_crop,
  ab as plugin_crop_locale_en_gb,
  qy as plugin_decorate,
  db as plugin_decorate_locale_en_gb,
  Xy as plugin_filter,
  ob as plugin_filter_defaults,
  sb as plugin_filter_locale_en_gb,
  Yy as plugin_finetune,
  tb as plugin_finetune_defaults,
  lb as plugin_finetune_locale_en_gb,
  Jy as plugin_frame,
  ib as plugin_frame_defaults,
  pb as plugin_frame_locale_en_gb,
  Qy as plugin_redact,
  mb as plugin_redact_locale_en_gb,
  eb as plugin_resize,
  cb as plugin_resize_locale_en_gb,
  Ky as plugin_sticker,
  hb as plugin_sticker_locale_en_gb,
  Sb as processDefaultImage,
  Fa as processImage,
  bh as removeNode,
  Hy as setPlugins,
  xu as supportsWebGL,
}
