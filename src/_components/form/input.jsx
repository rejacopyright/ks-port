import { useState } from 'react'

export const InputIcon = ({ type = 'icon', left = 'check', right = false }) => {
  const [focus, setFocus] = useState(false)
  return (
    <div
      className={`input-group input-group-sm input-solid border rounded overflow-hidden ${
        focus ? 'border-da' : 'border-ea'
      }`}
    >
      {left && (
        <div className='input-group-text bg-fa border-0 pe-0'>
          {type === 'text' ? (
            <span>{left}</span>
          ) : (
            <i className={`las la-${left} fs-6 text-${focus ? 'dark' : '77'}`} />
          )}
        </div>
      )}
      <input
        type='text'
        className='form-control form-control-sm bg-fa fw-400 border-0'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {right && (
        <div className='input-group-text bg-fa border-0 ps-0'>
          {type === 'text' ? (
            <span>{right}</span>
          ) : (
            <i className={`las la-${right} fs-6 text-${focus ? 'dark' : '77'}`} />
          )}
        </div>
      )}
    </div>
  )
}
