declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any
      input: any
      button: any
      select: any
      label: any
      option: any
      a: any
    }
  }
}

declare module 'js-cookie'
declare module 'react-slick'
declare module 'redux-persist-cookie-storage'
declare module 'react-auto-translate'
declare function require(name: string)
declare module '*.jpg'
declare module '*.png'
declare module '*.svg'
