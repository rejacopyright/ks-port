import Tooltip from '@components/alert/tooltip'

export const Button = ({
  type = 'button',
  size = 'sm',
  text = 'Button',
  theme = 'light',
  className = '',
  icon = 'check',
  iconClass = '',
  circle = false,
  dir = 'left',
  onClick = () => '',
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn btn-flex btn-${size} btn-${theme} ${circle ? 'radius-50' : ''} ${
        dir !== 'right' ? 'ps-2 pe-3' : 'ps-3 pe-2'
      } ${className}`}
      onClick={onClick}
    >
      {loading ? (
        <span className='indicator-progress d-block'>
          Please wait...
          <span className='spinner-border spinner-border-sm align-middle ms-2' />
        </span>
      ) : (
        <>
          {dir !== 'right' && <i className={`las la-${icon} ${iconClass} ${icon ? 'me-1' : ''}`} />}
          {text}
          {dir === 'right' && <i className={`las la-${icon} ${iconClass} ${icon ? 'ms-2' : ''}`} />}
        </>
      )}
    </button>
  )
}

export const ButtonPill = ({
  type = 'button',
  onClick = () => '',
  title = 'Button',
  size = 'sm',
  icon = 'check',
  theme = 'primary',
  className = '',
  right = false,
}) => {
  let padding = 2
  let diameter = 20
  let fs = ''
  let border = ''
  if (size === 'md') {
    padding = 3
    diameter = 25
    fs = 4
  }
  if (size === 'lg') {
    padding = 4
    diameter = 35
    fs = 2
  }
  if (theme?.includes('light-')) {
    theme = 'light'
  }
  let isLight = !!theme?.match(/(light-?|white)/gi)
  isLight && (border = 'border border-dd')
  return (
    <div className={`d-inline ${className}`}>
      <button
        type={type}
        onClick={onClick}
        className={`btn btn-flex btn-${size} btn-light-${theme} radius-50 p-${padding} ${border}`}
      >
        {right && <span className='px-2'>{title}</span>}
        <span
          className={`btn btn-icon w-${diameter}px h-${diameter}px btn-${theme} rounded-circle ${border}`}
        >
          <i className={`las la-${icon} fs-${fs} text-${isLight ? 'dark' : 'white'}`} />
        </span>
        {!right && <span className='px-2'>{title}</span>}
      </button>
    </div>
  )
}

export const ButtonIcon = ({
  type = 'button',
  onClick = () => '',
  title = 'Title',
  size = 'sm',
  icon = 'check',
  theme = 'primary',
  className = '',
}) => {
  let diameter = 25
  let fs = 3
  let border = ''
  if (size === 'md') {
    diameter = 30
    fs = 2
  }
  if (size === 'lg') {
    diameter = 40
    fs = '2x'
  }
  return (
    <div className={`d-inline ${className}`}>
      <Tooltip title={title}>
        <button
          type={type}
          onClick={onClick}
          className={`btn btn-icon w-${diameter}px h-${diameter}px btn-${size} btn-${theme} radius-50 p-2 ${border}`}
        >
          <i className={`las la-${icon} fs-${fs}`} />
        </button>
      </Tooltip>
    </div>
  )
}
