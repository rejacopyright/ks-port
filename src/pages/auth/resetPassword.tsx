import { resetPassword } from '@api/auth'
import { CardLoader } from '@components/loader'
import { getJWTPayload } from '@helpers'
import PageNotFound from '@pages/pageNotFound'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import qs from 'qs'
import { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Require at least 1 special character')
    .matches(/[A-Z]/, 'Require at least 1 uppercase letter')
    .matches(/[0-9]/, 'Require at least 1 number')
    .when('id', {
      is: (val: any) => !val,
      then: () => Yup.string().required('Password is required'),
    }),
  password_confirmation: Yup.string().when('password', {
    is: (val: any) => (val && val.length > 0 ? true : false),
    then: () =>
      Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], "Password and Repeat Password didn't match"),
  }),
})

const Index: FC<any> = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { token } = qs.parse(search, { ignoreQueryPrefix: true })
  const [error, setError] = useState<any>(undefined)
  const [loadingBtn, setLoadingBtn] = useState<any>(false)
  const [diff, setDiff] = useState<any>(undefined)
  const [isActive, setIsActive] = useState<any>(true)
  const [loading, setLoading] = useState<any>(true)
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('bg-fa')
      setLoading(false)
    }, 1200)
  }, [])
  useEffect(() => {
    const payload = getJWTPayload(token)
    let interval: any
    if (payload?.exp) {
      const exp: any = moment.unix(payload?.exp)
      interval = setInterval(() => {
        if (moment().add(1, 's').isBefore(exp)) {
          setIsActive(true)
          setDiff(moment.duration(exp.diff()))
        } else {
          setIsActive(false)
          document.body.classList.remove('bg-fa')
          clearInterval(interval)
        }
      }, 1000)
    } else {
      setIsActive(false)
    }

    return () => {
      clearInterval(interval)
    }
  }, [token])
  const handleSubmit = (values: any) => {
    setLoadingBtn(true)
    const { password, password_confirmation } = values || {}
    resetPassword({
      password,
      password_confirmation,
      token,
    })
      .then(async ({ data }) => {
        if (data?.success) {
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              navigate(`/success-password?token=${token}`)
            }
          }, 100)
        }
        setError(undefined)
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message
            ?.toString()
            ?.replace(/the token has been blacklisted/i, 'Token sudah pernah digunakan')
        )
      })
      .finally(() => {
        setLoadingBtn(false)
      })
  }
  if (loading) {
    return (
      <div className='row flex-center vh-100'>
        <CardLoader count={1} height={250} className='col-12 col-md-6 col-lg-4 mx-auto' />
      </div>
    )
  }
  if (!token) {
    return <PageNotFound />
  }
  if (!isActive) {
    return (
      <div className='flex-center w-100 vh-80'>
        <div className='p-4 text-center'>
          <div className='mb-3'>
            <img width={300} src={require('@images/stock/20.png')} alt='img' />
          </div>
          <div className='fw-300 fs-5 mb-5'>
            Token tidak valid atau masa berlaku token sudah habis
          </div>
          <div className=''>
            <Link to='/' className='btn btn-primary text-white fs-7'>
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='container-fluid vh-90 flex-center w-100'>
      <Formik
        enableReinitialize
        // validateOnMount
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{ password: '', password_confirmation: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }: any) => (
          <Form className='w-100'>
            <div className='row'>
              <div className='col-12 text-center mb-3'>
                <div className='fw-500 fs-7 mb-2'>Akan berakhir dalam</div>
                <div className='flex-center'>
                  <div className='shadow same-35px rounded flex-center bg-dark text-white fs-5'>
                    {(diff?.hours() || 0)?.toString()?.padStart(2, '0')}
                  </div>
                  <div className='fs-3 mx-2'>:</div>
                  <div className='shadow same-35px rounded flex-center bg-dark text-white fs-5'>
                    {(diff?.minutes() || 0)?.toString()?.padStart(2, '0')}
                  </div>
                  <div className='fs-3 mx-2'>:</div>
                  <div className='shadow same-35px rounded flex-center bg-dark text-white fs-5'>
                    {(diff?.seconds() || 0)?.toString()?.padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4 mx-auto bg-white p-4 position-relative'>
                {error && (
                  <div className='bg-light-danger text-danger rounded p-3 d-flex mb-3'>
                    <i className='fas fa-exclamation-circle fs-7 text-danger mt-1' />
                    <span className='ms-2'>{error}</span>
                  </div>
                )}
                <div className='fs-6 fw-600 text-primary text-center'>RESET YOUR PASSWORD</div>
                <div className='fs-8 text-center mb-4'>
                  Password dan confirm password harus di isi
                </div>
                <div className='mb-3'>
                  <div className='mb-1 text-primary fs-7'>New Password</div>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    className='form-control form-control-solid border-primary py-2 fs-6'
                    // defaultValue='Reja Jamil'
                  />
                  {errors?.password && (
                    <div className='fs-8 mt-1 text-danger'>{errors?.password}</div>
                  )}
                </div>
                <div className='mb-3'>
                  <div className='mb-1 text-primary fs-7'>Confirm Password</div>
                  <Field
                    type='password'
                    name='password_confirmation'
                    placeholder='Enter Password'
                    className='form-control form-control-solid border-primary py-2 fs-6'
                    // defaultValue='Reja Jamil'
                  />
                  {errors?.password_confirmation && (
                    <div className='fs-8 mt-1 text-danger'>{errors?.password_confirmation}</div>
                  )}
                </div>
                <div className='row pt-3'>
                  <div className='col mb-3 text-nowrap'>
                    <button
                      type='submit'
                      disabled={!isValid || loadingBtn}
                      className='btn w-100 btn-primary text-white px-3 py-2'
                    >
                      {loadingBtn ? (
                        <span className='indicator-progress d-block'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      ) : (
                        <>
                          <i className='las la-check me-2 ms-n1' />
                          <span>Reset Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className='text-center fs-8 mt-3'>
                  <span className='me-2'>Remember your password ?</span>
                  <Link
                    to='/login'
                    className='fw-500 text-primary fs-7 pointer text-hover-underline underline-offset-3'
                  >
                    "Login"
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default Index
