import { useState, useEffect } from 'react'
import { Button } from '@components/button'
import { Formik, Form, Field } from 'formik'
import { getSocial, updateSocial } from '@api/settings'
import toast from '@components/alert/toast'
import { TextLoader } from '@components/loader'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'

const Index = () => {
  const [saveLoading, setSaveLoading] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSocial()
      .then(({ data }) => {
        setDetail(
          omit(
            mapValues(keyBy(data, 'name'), ({ url }) => url || ''),
            'whatsapp'
          )
        )
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    updateSocial(params)
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
    return (
      <div className='mt-4'>
        <TextLoader count={6} className='col-12 col-lg-6 mb-3' />
      </div>
    )
  }
  return (
    <div className='row mt-3'>
      <div className='col-12'>
        <Formik enableReinitialize initialValues={detail} onSubmit={handleSubmit}>
          {() => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                {/* Email */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Email</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/gmail.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='email'
                      placeholder='e.g john@gmail.com'
                    />
                  </div>
                </div>
                {/* Facebook */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Facebook</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/facebook.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='facebook'
                      placeholder='e.g https://www.facebook.com/john'
                    />
                  </div>
                </div>
                {/* Twitter */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Twitter</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/twitter.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='twitter'
                      placeholder='e.g https://www.twitter.com/john'
                    />
                  </div>
                </div>
                {/* Instagram */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Instagram</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/instagram.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='instagram'
                      placeholder='e.g https://www.instagram.com/john'
                    />
                  </div>
                </div>
                {/* Youtube */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Youtube</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/youtube.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='youtube'
                      placeholder='e.g https://www.youtube.com/john'
                    />
                  </div>
                </div>
                {/* Linked-In */}
                <div className='col-12 col-lg-6 mb-3'>
                  <div className='mb-1'>Linked-In</div>
                  <div className='input-group input-group-sm input-group-solid border rounded'>
                    <div className='fs-8 fw-500 input-group-text border-0'>
                      <div
                        className='position-relative same-15px'
                        style={{
                          background: `url(${
                            require('@images/brands/linkedin.svg').default
                          }) center / cover no-repeat`,
                        }}
                      />
                    </div>
                    <Field
                      type='text'
                      className='form-control form-control-solid border-0 fs-8 py-1'
                      name='linkedin'
                      placeholder='e.g https://www.linkedin.com/in/john'
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className='w-100 flex-end mt-4'>
                  <Button
                    type='submit'
                    text='Save'
                    theme='primary'
                    className='text-white flex-center'
                    icon='check'
                    iconClass='fs-7'
                    dir='left'
                    loading={saveLoading}
                    disabled={false}
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
