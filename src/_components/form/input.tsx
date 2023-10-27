import debounce from 'lodash/debounce'
import { FC, useMemo, useState } from 'react'

export const InputIcon: FC<any> = ({
  type = 'icon',
  left = 'check',
  right = false,
  onChange = () => '',
}) => {
  const [focus, setFocus] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)
  const handleChange: any = useMemo(
    () =>
      debounce(
        (val: any) => {
          setLoading(false)
          onChange(val)
        },
        1000,
        { leading: false, trailing: true }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
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
        onChange={({ target: { value } }: any) => {
          setLoading(true)
          const isEmpty: any = !value?.trim()?.length
          if (!isEmpty) {
            handleChange(value)
          } else {
            setLoading(false)
            onChange(value)
          }
        }}
      />
      {right && !loading && (
        <div className='input-group-text bg-fa border-0 ps-0'>
          {type === 'text' ? (
            <span>{right}</span>
          ) : (
            <i className={`las la-${right} fs-6 text-${focus ? 'dark' : '77'}`} />
          )}
        </div>
      )}
      {loading && (
        <div className='input-group-text bg-fa border-0'>
          <div className='spinner-border border-2 text-primary same-15px'></div>
        </div>
      )}
    </div>
  )
}
