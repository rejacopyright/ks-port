import { editHowToOrder, howToOrderServices } from '@api/services'
import toast from '@components/alert/toast'
import { Button } from '@components/button'
import { TextEditor } from '@components/form'
import { CardLoader } from '@components/loader'
import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Index: FC<any> = () => {
  const navigate = useNavigate()
  const [saveLoading, setSaveLoading] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    setLoading(true)
    howToOrderServices()
      .then(({ data }) => {
        setDetail(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e: any) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    editHowToOrder(params)
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
          initialValues={{ description: detail?.description || '' }}
          onSubmit={handleSubmit}
        >
          {({ isValid, setFieldValue }: any) => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                <div className='col-12 mb-3'>
                  <TextEditor
                    id='editor'
                    minHeight={500}
                    maxHeight={600}
                    placeholder='Enter Description Here'
                    onChange={(e: any) => {
                      setFieldValue('description', e)
                    }}
                  >
                    {detail?.description || ''}
                  </TextEditor>
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
