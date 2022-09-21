import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TextEditor } from '@components/form'
import { Button } from '@components/button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { detailAbout, updateAbout } from '@api/about'
import toast from '@components/alert/toast'
import { CardLoader } from '@components/loader'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

const Index = () => {
  const { scope } = useParams()
  const [saveLoading, setSaveLoading] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (scope) {
      setLoading(true)
      detailAbout(scope)
        .then(({ data }) => {
          setDetail(data)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [scope])

  const handleSubmit = (e) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    updateAbout(params, scope)
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
          initialValues={{ title: detail?.title || '', description: detail?.description || '' }}
          onSubmit={handleSubmit}
        >
          {({ errors, isValid, setFieldValue }) => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                <div className='col-12 col-md-6 mb-3'>
                  <div className='fs-8 fw-500 mb-1'>Title</div>
                  <Field
                    type='text'
                    className='form-control form-control-solid'
                    name='title'
                    placeholder='Enter Title'
                  />
                  {errors?.title && <div className='text-danger fs-9 mt-1'>{errors?.title}</div>}
                </div>
                <div className='col-12 mb-3'>
                  <div className='fs-8 fw-500 mb-1'>Description</div>
                  <TextEditor
                    id='editor'
                    placeholder='Enter Description Here'
                    onChange={(e) => {
                      setFieldValue('description', e)
                    }}
                  >
                    {detail?.description || ''}
                  </TextEditor>
                  {errors?.description && (
                    <div className='text-danger fs-9 mt-1'>{errors?.description}</div>
                  )}
                </div>

                {/* BUTTONS */}
                <div className='flex-end'>
                  <a
                    href={`/about/${scope}`}
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
