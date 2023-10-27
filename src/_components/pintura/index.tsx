import '@assets/plugins/pintura/style.scss'

import * as pin from '@assets/plugins/pintura'
import emot from '@components/pintura/emoji'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

async function Editor(props: any) {
  !props?.modal && props?.target && (props.target.innerHTML = '')
  const cropPresets = () => [
    [
      'Crop',
      [
        [undefined, 'Bebas'],
        [1, 'Sama'],
        [4 / 3, 'Lenskep'],
        [3 / 4, 'Potret'],
      ],
    ],
    [
      'Size',
      [
        [1200 / 600, 'Header'],
        [800 / 600, 'Komputer Jadul'],
        [16 / 9, 'Komputer Modern'],
      ],
    ],
  ]
  const stickerPresets = () => [
    ['Face', emot.face],
    ['Hand', emot.hand],
  ]
  const locale = {
    ...pin.getEditorDefaults().locale,
    cropLabelSelectPreset: 'Presets',
  }
  const config = {
    src: props?.file,
    layoutDirectionPreference: 'vertical',
    cropSelectPresetOptions: cropPresets(),
    cropImageSelectionCornerStyle: 'hook',
    cropEnableButtonFlipVertical: true,
    cropEnableButtonRotateRight: false,
    cropEnableButtonToggleCropLimit: false,
    cropEnableZoomTowardsWheelPosition: false,
    cropEnableZoomInput: true,
    imageCropAspectRatio: props?.ratio || 1,
    locale: locale,
    imageCropLimitToImage: true,
    previewUpscale: true,
    enableDropImage: true,
    utils: [
      'crop',
      'filter',
      'finetune',
      'annotate',
      'decorate',
      'resize',
      'sticker',
      'frame',
      'redact',
    ],
    stickers: stickerPresets(),
    imageWriter: pin.createDefaultImageWriter({
      // quality: 0.1,
      mimeType: 'image/jpeg',
      // renameFile: file => 'oke.jpg',
      targetSize: {
        height: 500,
        fit: 'contain',
        upscale: false,
      },
    }),
    handleEvent: (e: any, res: any) => {
      props?.event && props?.event({ ...res, event: e })
      if (
        e === 'loadstart' ||
        e === 'load' ||
        e === 'processstart' ||
        e === 'process' ||
        e === 'hide' ||
        e === 'show' ||
        e === 'close'
      ) {
        if (process.env.NODE_ENV === 'production') {
          // eslint-disable-next-line no-console
          process.env.NODE_ENV === 'production' && console.clear()
          const el = document.querySelector('a[href*="https://pqina.nl"]')
          el && el.remove()
        }
      }
      if (e === 'loadstart') {
        props?.input && (props.input.current.value = '')
        props?.browse?.current && (props.browse.current.style.display = 'none')
      }
      if (e === 'process') {
        props?.onFinish && props?.onFinish(res)
      }
      if (e === 'hide') {
        props?.onHide && props?.onHide(res)
      }
    },
    willRenderCanvas: (shapes: any, state: any) => {
      props?.event && props?.event({ shapes, state, event: 'willRenderCanvas' })
      props?.browse?.current && (props.browse.current.style.display = 'block')
      return shapes
    },
    willRenderToolbar: (toolbar: any, env: any) => {
      props?.event && props?.event({ toolbar, env, event: 'willRenderToolbar' })
      return toolbar
    },
  }
  const editor = (await props?.modal)
    ? pin.openDefaultEditor(config)
    : pin.appendDefaultEditor(props?.target, config)
  return editor
}
function download(props: any) {
  const link: any = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(props?.blob)
  link.download = props?.filename || 'download.jpg'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    URL.revokeObjectURL(link.href)
    link.parentNode.removeChild(link)
  }, 0)
}
function Index(props: any) {
  const picedit: any = useRef()
  const input: any = useRef()
  const uploadBtn: any = useRef()
  const [height, heightSet] = useState<any>()
  const [blob, blobSet] = useState<any>({})
  const [crop, cropSet] = useState<any>({})
  const [editorConfig, editorConfigSet] = useState<any>({
    target: null,
    file: props?.src,
    input: null,
    modal: props?.modal,
    browse: false,
    event: props?.event,
    ratio: props?.ratio || 1,
    onFinish: (r: any) => {
      props?.onFinish && props?.onFinish({ ...r, blob: URL.createObjectURL(r?.dest) })
      cropSet(r.imageState.crop)
      blobSet(r.dest)
      editorConfigSet((e: any) => {
        e.modal = false
        return e
      })
    },
    onHide: () => {
      props?.onClose && props?.onClose()
      editorConfigSet((e: any) => {
        e.modal = false
        return e
      })
    },
  })

  useMemo<any>(() => {
    const el = document.querySelector('a[href*="https://pqina.nl"]')
    el && el.remove()
  }, [])

  useEffect(() => {
    !props?.modal && heightSet(props?.height || Math.ceil(window?.innerHeight * 0.9))
    editorConfigSet((e: any) => {
      e.target = picedit.current
      e.file = props?.src
      e.input = input
      e.modal = props?.modal
      e.browse = props?.browse && uploadBtn
      return e
    })
  }, [props])

  useEffect(() => {
    if (props?.show && props?.src) {
      setTimeout(() => {
        Editor(editorConfig)
      }, 100)
    }
  }, [props?.show, props?.src, editorConfig])

  function inputChange(e: any) {
    blobSet({})
    const file = e.target.files[0]
    props?.onInputChange && props?.onInputChange(file)
    if (file) {
      editorConfigSet((e: any) => {
        e.file = file
        return e
      })
    }
  }

  return (
    <Fragment>
      <div className='' ref={uploadBtn} style={{ display: 'none' }}>
        <div className='absolute l-7 t-0 p-2 mt-1 mr-5 z-9 desktop'>
          <div
            className='btn-soft-light text-dark border border-gray oh radius-50 center pointer'
            style={{ width: 27, height: 27 }}
            onClick={() => input?.current?.click()}
          >
            <i className='uil uil-cloud-upload text-12' />
          </div>
        </div>
        <div className='absolute-center-h t-6 p-2 z-9 phone'>
          <div
            className='btn btn-xs btn-soft-primary border border-primary oh radius-5 py-0 center pointer'
            onClick={() => input?.current?.click()}
          >
            <i className='uil uil-cloud-upload text-9 mr-1' />
            <span className='text-7'>Browse</span>
          </div>
        </div>
      </div>
      <div ref={picedit} style={{ height: height + 'px' }} />
      <input type='file' ref={input} className='d-none' onChange={inputChange} />
      {props?.preview && blob.name && (
        <div className='fixed l-0 b-0 z-99 p-md-3 col-md-4 desktop' id='preview'>
          <div
            className='oh shadow-bold radius-10 bg-white relative center'
            style={{ height: crop.height > crop.width ? height / 1.5 + 'px' : 'auto' }}
          >
            <img
              className={crop.height > crop.width ? 'h-100' : 'w-100'}
              src={blob.name && URL.createObjectURL(blob)}
              alt=''
              id='preview-img'
            />
            <div className='absolute l-0 t-0 m-2'>
              <div
                className='btn btn-sm bg-dark pr-3 radius-50 shadow-bold pointer text-white'
                onClick={() => blob.name && download({ blob, filename: blob.name })}
              >
                <i className='uil uil-arrow-to-bottom mr-1 lh-1 text-8' />
                Download
              </div>
            </div>
            <div className='absolute r-0 t-0 m-1'>
              <div
                className='pointer bg-dark radius-50 shadow-bold same-30 center text-white'
                onClick={() => blobSet({})}
              >
                <i className='uil uil-multiply' />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Index
