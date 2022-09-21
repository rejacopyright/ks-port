import { useState, useEffect } from 'react'
import { TextEditor } from '@components/form'
import { Button } from '@components/button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { getContact, updateContact } from '@api/settings'
import toast from '@components/alert/toast'
import { CardLoader } from '@components/loader'

const validationSchema = Yup.object().shape({
  contact: Yup.string().required('Contact is required'),
  map: Yup.string().required('Map is required'),
})

const Index = () => {
  const [saveLoading, setSaveLoading] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [map, setMap] = useState('')

  useEffect(() => {
    setLoading(true)
    getContact()
      .then(({ data }) => {
        setDetail(data)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    updateContact(params)
      .then(({ data }) => {
        if (data?.status === 200) {
          toast({ type: 'success', message: data?.message })
        } else {
          toast({ type: 'error', message: "something wen't wrong. Please try again." })
        }
        setSaveLoading(false)
      })
      .catch(() => {
        toast({ type: 'error', message: "something wen't wrong. Please try again." })
        setSaveLoading(false)
      })
  }
  if (loading) {
    return <CardLoader count={2} className='col-12 mb-4' />
  }
  return (
    <div className='row'>
      <div className='col-12'>
        <Formik
          enableReinitialize
          validateOnMount
          validationSchema={validationSchema}
          initialValues={{
            whatsapp: detail?.whatsapp || '',
            contact: detail?.contact || '',
            map: detail?.map || '',
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, isValid, setFieldValue, values }) => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                <div className='col-12 mt-3'>
                  <div className='fs-8 fw-600 mb-1'>
                    <i className='lab la-whatsapp fs-6 me-1' />
                    Whatsapp No.
                  </div>
                  <div className='input-group input-group-solid border rounded'>
                    <div className='input-group-text fs-8 border-0 pointer fw-500'>+62</div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0'
                      name='whatsapp'
                      placeholder='85766666393'
                    />
                  </div>
                  {errors?.map && <div className='text-danger fs-9 mt-1'>{errors?.map}</div>}
                </div>
                <div className='col-12 mt-3'>
                  <div className='fs-8 fw-600 mb-1'>
                    <i className='las la-home fs-7 me-1' />
                    Contact
                  </div>
                  <TextEditor
                    id='editor'
                    placeholder='Enter Contact Here'
                    onChange={(e) => {
                      setFieldValue('contact', e)
                    }}
                  >
                    {detail?.contact || ''}
                  </TextEditor>
                  {errors?.contact && (
                    <div className='text-danger fs-9 mt-1'>{errors?.contact}</div>
                  )}
                </div>
                <div className='col-12 mt-3'>
                  <div className='fs-8 fw-600 mb-1'>
                    <i className='las la-map-marker fs-6' />
                    Address Map
                  </div>
                  <div className='input-group input-group-solid border rounded'>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0'
                      name='map'
                      placeholder='Enter Address Map'
                    />
                    <div
                      className='input-group-text fs-8 border-0 pointer fw-500'
                      onClick={() => setMap(values?.map)}
                    >
                      Check on map
                    </div>
                  </div>
                  {errors?.map && <div className='text-danger fs-9 mt-1'>{errors?.map}</div>}
                </div>
                {(!!map || !!detail?.map) && (
                  <div className='col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-4'>
                    <div className='radius-10 overflow-hidden shadow'>
                      <div className='row'>
                        <iframe
                          title='company'
                          className='w-100'
                          width='600'
                          height='175'
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(
                            map || detail?.map
                          )}&t=&z=13&output=embed`}
                          frameBorder='0'
                          scrolling='no'
                          marginHeight='0'
                          marginWidth='0'
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* BUTTONS */}
                <div className='flex-end mt-4'>
                  <a
                    href={`/contact`}
                    target='_blank'
                    className='btn btn-sm btn-light-primary px-3 fs-8 text-nowrap me-2'
                    rel='noreferrer'
                  >
                    View
                    <i className='las la-external-link-alt fs-6 ms-1' />
                  </a>
                  <Button
                    type='submit'
                    text='Save'
                    theme='primary'
                    className='text-white flex-center'
                    icon='check'
                    iconClass='fs-7'
                    dir='left'
                    loading={saveLoading}
                    disabled={!isValid}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Index
