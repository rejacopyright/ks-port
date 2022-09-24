import { useState } from 'react'
import { Modal as MODAL } from 'react-bootstrap'
import { Button } from '@components/button'

const Modal = ({
  show,
  setShow,
  title = '',
  body = 'Content',
  bodyClass = 'd-flex flex-center',
  children = '',
  buttonText = 'Save',
  buttonIcon = 'check-double',
  buttonSave = true,
  loading = false,
  disabled = false,
  onSubmit,
  header = true,
  footer = true,
  size = 'md',
  isFullScreen = false,
  onHide,
  backdrop = true, // boolean or string 'static'
  theme = 'primary',
  center = true,
}) => {
  const [fullscreen, setFullscreen] = useState(false)

  const onClose = () => {
    setShow(false)
    onHide && onHide()
    setTimeout(() => {
      setFullscreen(false)
    }, 1000)
  }

  return (
    <MODAL
      dialogClassName={`modal-${size}`}
      centered={center}
      fullscreen={fullscreen}
      scrollable
      backdrop={backdrop}
      show={show}
      onHide={onClose}
    >
      {header && (
        <MODAL.Header className='p-3 border-0'>
          <div className='row m-0 w-100 flex-center'>
            {title && <div className={`col fw-600 text-${theme} text-uppercase`}>{title}</div>}
            <div className='col-auto ms-auto me-n3'>
              {isFullScreen && (
                <div
                  className='btn btn-icon btn-light-success same-25px rounded-circle me-2'
                  onClick={() => setFullscreen(!fullscreen)}
                >
                  <i className={`las la-angle-double-${fullscreen ? 'down' : 'up'}`} />
                </div>
              )}
              <div
                className='btn btn-sm flex-center btn-light-danger same-25px radius-50'
                onClick={onClose}
              >
                <i className='las la-times' />
              </div>
            </div>
          </div>
        </MODAL.Header>
      )}
      <MODAL.Body className={bodyClass}>{children || body}</MODAL.Body>
      {footer && (
        <MODAL.Footer className='p-3 border-0'>
          <Button
            text='Cancel'
            theme='white'
            className='text-dark'
            icon={false}
            iconClass='fs-5'
            dir='left'
            disabled={loading}
            onClick={onClose}
          />
          {buttonSave && (
            <Button
              text={buttonText}
              theme={theme}
              className='text-white'
              icon={buttonIcon}
              iconClass=''
              dir='left'
              loading={loading}
              disabled={disabled}
              onClick={onSubmit}
            />
          )}
        </MODAL.Footer>
      )}
    </MODAL>
  )
}

export { Modal }
