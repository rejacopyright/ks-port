import { forwardRef, memo } from 'react'
import 'froala-editor/css/froala_style.min.css'
import '@styles/_froala.scss'
import 'froala-editor/js/plugins.pkgd.min.js'

import FroalaEditor from 'react-froala-wysiwyg'
// import 'froala-editor/js/third_party/image_tui.min.js'
// import 'froala-editor/js/languages/id.js'

const removeWatermark = () => {
  const el = document.querySelector('a[href*="froala"]')
  el && el.parentElement.remove()
  const sec = document.querySelector('#fr-logo')
  sec && sec.remove()
  const ph = document.querySelector('.fr-placeholder')
  ph && (ph.style.marginTop = 0)
}

const Editor = (
  {
    offsetTop,
    onChange,
    onBlur,
    onFocus,
    children,
    placeholder,
    simple,
    inline = false,
    minHeight = 200,
    maxHeight = 300,
  },
  ref
) => {
  const toolbarButtons = {
    moreText: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'inlineClass',
        'inlineStyle',
        'clearFormatting',
      ],
    },
    moreParagraph: {
      buttons: [
        'alignLeft',
        'alignCenter',
        'formatOLSimple',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
    },
    moreRich: {
      buttons: [
        'insertLink',
        'insertImage',
        'insertVideo',
        'insertTable',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'embedly',
        'insertHR',
      ],
      buttonsVisible: 7,
    },
    moreMisc: {
      buttons: [
        'undo',
        'redo',
        'fullscreen',
        // 'print',
        // 'getPDF',
        // 'spellChecker',
        'selectAll',
        // 'html',
        // 'help',
      ],
      align: 'right',
      buttonsVisible: 2,
    },
  }
  const toolbarSimple = {
    moreText: {
      buttons: ['bold', 'italic', 'clearFormatting'],
      buttonsVisible: 3,
    },
    moreParagraph: {
      buttons: ['formatOLSimple', 'formatUL', 'paragraphFormat'],
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable', 'insertHR'],
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ['undo', 'redo'],
      align: 'right',
      buttonsVisible: 2,
    },
  }
  const state = {
    config: {
      placeholderText: placeholder || '',
      attribution: false,
      heightMin: minHeight,
      heightMax: maxHeight,
      toolbarSticky: true,
      toolbarStickyOffset: offsetTop,
      tooltips: false,
      zIndex: 1,
      charCounterCount: false,
      quickInsertEnabled: false,
      imageInsertButtons: ['imageUpload', 'imageByURL'],
      videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
      imageManager: false,
      imagePaste: true,
      imageUpload: true,
      imageAllowDragAndDrop: true,
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      events: {
        initialized: removeWatermark,
        'html.beforeGet': removeWatermark,
        blur: () => {
          onBlur && onBlur()
          removeWatermark()
        },
        focus: () => {
          onFocus && onFocus()
        },
        'image.beforeUpload': function (files) {
          const editor = this
          if (files.length) {
            const reader = new FileReader()
            reader.onload = (e) => {
              const result = e.target.result
              editor.image.insert(result, null, null, editor.image.get())
            }
            reader.readAsDataURL(files[0])
          }
          editor.popups.hideAll()
          return false
        },
      },
      // imageUploadURL: 'http://localhost',
      quickInsertButtons: false,
      // toolbarButtonsMD: toolbarSimple,
      // toolbarButtonsSM: toolbarSimple,
      // toolbarButtonsXS: toolbarSimple,
      toolbarButtons: simple ? toolbarSimple : toolbarButtons,
      toolbarInline: inline,
    },
  }
  function onModelChange(e) {
    const el = document.createElement('div')
    el.innerHTML = e
    el?.querySelector('a[href*="froala"]')?.parentElement?.remove()
    onChange && onChange(el?.innerHTML || '')
  }
  return (
    <FroalaEditor
      model={children}
      ref={ref}
      tag='textarea'
      config={state?.config}
      onModelChange={onModelChange}
    />
  )
}

export const TextEditor = memo(
  forwardRef(Editor),
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)
