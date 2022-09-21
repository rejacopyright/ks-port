import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextEditor } from '@components/form'
import { Button } from '@components/button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { addEditCarreer, detailCarreer } from '@api/news'
import toast from '@components/alert/toast'
import { CardLoader } from '@components/loader'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

const Index = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [saveLoading, setSaveLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      detailCarreer(id)
        .then(({ data }) => {
          if (data?.id) {
            setDetail(data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  const handleSubmit = (e) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    addEditCarreer(params, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          setDetail({})
          setReload(!reload)
          toast({ type: 'success', message: data?.message })
          navigate(-1)
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
        <CardLoader count={3} className='col-12 mb-4' />
      </div>
    )
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
                  <Button
                    type='button'
                    text='Back'
                    theme='white'
                    className='flex-center'
                    icon={false}
                    iconClass='fs-5'
                    dir='left'
                    loading={false}
                    disabled={false}
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    type='submit'
                    text='Save'
                    theme='primary'
                    className='text-white flex-center'
                    icon='check'
                    iconClass='fs-6'
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
