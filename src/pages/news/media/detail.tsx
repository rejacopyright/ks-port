import '@styles/_froala.scss'

import { detailMedia, getMedia } from '@api/news'
import Banner from '@components/banner'
import { Button } from '@components/button'
import { CardLoader, SimpleLoader, TextLoader } from '@components/loader'
import { htmlToString, slugToTitle, strToSlug } from '@helpers'
import defaultImage from '@images/placeholder-image.jpg'
import moment from 'moment'
import qs from 'qs'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

const Breadcrumb = () => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/news'>News</Link>
        </li>
        <li className='breadcrumb-item'>
          <Link to='/news/media'>Media</Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Detail
        </li>
      </ol>
    </nav>
  )
}

const Index: FC<any> = () => {
  const user = useSelector(({ user }) => user)
  const { search } = useLocation()
  const getParam = useParams()
  const params: any = qs.parse(search, { ignoreQueryPrefix: true })
  const [detail, setDetail] = useState<any>(undefined)
  const [loading, setLoading] = useState<any>(true)
  const [loadingLatestPost, setLoadingLatestPost] = useState<any>(true)
  const [latestPost, setLatestPost] = useState<any>([])
  const [reload, setReload] = useState<any>(false)
  useEffect(() => {
    getMedia({ limit: 5, orderCol: 'updated_at' })
      .then(({ data: { data } = {} }) => {
        setLatestPost(data)
      })
      .finally(() => setLoadingLatestPost(false))
  }, [reload])
  useEffect(() => {
    if (getParam?.title) {
      document.title = slugToTitle(getParam?.title)
    }
  }, [getParam?.title])
  useEffect(() => {
    if (params?.id) {
      detailMedia(params?.id)
        .then(({ data }) => {
          setDetail(data)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [params?.id, reload])
  return (
    <>
      <Banner height='125' content={false} />
      <div className='container py-4 mb-5'>
        <div className='row'>
          <div className='col mb-3'>
            <Breadcrumb />
          </div>
          {user?.id && (
            <div className='col-auto ms-auto mb-4'>
              <Button
                text='Edit This Page'
                theme='light-warning'
                className='flex-center border border-warning ms-auto mb-2'
                icon='pencil-alt'
                iconClass='fs-9'
                dir='left'
                onClick={() => {
                  if (params?.id) {
                    const url: any = `/admin/news/media/edit/${params?.id}?utm_source=usr`
                    const tabEdit: any = window.open(url, '_blank')
                    tabEdit?.window?.addEventListener('load', () => {
                      tabEdit?.window?.addEventListener('unload', () => {
                        setReload((prev: any) => !prev)
                      })
                    })
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className='row'>
          <div className='col-lg-9 mb-5 pe-lg-5'>
            {loading ? (
              <div className='mt-2'>
                <CardLoader count={1} className='col-12 mb-5' height={200} />
                <TextLoader count={3} className='col-12 mb-3' />
              </div>
            ) : detail ? (
              <>
                <h3 className='fw-600 mb-3 text-capitalize lh-40px'>{detail?.title}</h3>
                <div className='mb-3'>
                  {!!detail?.file && (
                    // <div
                    //   className='position-relative h-300px bg-white overflow-hidden radius-10 shadow-lg-bold mb-3'
                    //   style={{ background: `url(${detail?.file}) center / cover no-repeat` }}
                    // />
                    <img className='w-100 radius-10' src={detail?.file} alt='' />
                  )}
                  <div className='flex-end mt-2'>
                    {/* <i className='las la-user me-1 fs-6 text-primary' /> */}
                    <div className='text-primary'>Updated at</div>
                    <div className='text-aa mx-2'>-</div>
                    <div className='text-aa'>
                      {moment(detail?.updated_at || undefined)?.format('DD MMMM Y, H:mm A')}
                    </div>
                    <i className='las la-clock ms-1 fs-7 text-aa' />
                  </div>
                </div>
                <div className=''>
                  <div className='h-5px bg-ee w-100 mb-3 mt-5' />
                  <div
                    className='w-100 overflow-auto'
                    dangerouslySetInnerHTML={{ __html: detail?.description }}
                  />
                </div>
              </>
            ) : (
              <div className='flex-center vh-50 mb-5'>
                <div className='text-center'>
                  <div
                    className='position-relative mx-auto mb-3 same-200px'
                    style={{
                      background: `url(${require(
                        `@images/stock/15-dark.png`
                      )}) center / cover no-repeat`,
                    }}
                  />
                  <div className='fw-300 fs-6'>
                    We&apos;re sorry, but We couldn&apos;t find <br /> the data you&apos;re looking
                    for
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='col-lg-3 mb-5'>
            <div className='d-flex align-items-center mb-4 mt-2'>
              <h5 className='mb-0 text-primary text-nowrap'>Latest Posts</h5>
              <div className='h-5px bg-ee w-100 ms-3' />
            </div>
            {loadingLatestPost ? (
              <div className='mt-2'>
                {Array(3)
                  .fill('')
                  .map((_m: any, index: number) => (
                    <div className='d-flex w-100 mb-3 mt-n3' key={index}>
                      <div className=''>
                        <SimpleLoader count={1} width={100} height={85} className='col-12' />
                      </div>
                      <div className='w-100 ps-2 mt-3'>
                        <TextLoader count={1} className='mb-2' />
                        <SimpleLoader count={2} height={10} className='my-1' />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <>
                {latestPost?.map(
                  ({ id, title, file, description, updated_at }: any, index: number) => (
                    <div
                      className='mb-3 border border-ee radius-10 overflow-hidden hover-sm'
                      key={index}
                    >
                      <Link to={`/news/media/${strToSlug(title)}?id=${id}`}>
                        <div className='row m-0 d-flex flex-nowrap align-items-center bg-white'>
                          <div
                            className='col-auto same-100px'
                            style={{
                              background: `#f5f5f5 url(${
                                file || defaultImage
                              }) center / contain no-repeat`,
                            }}
                          />
                          <div className='px-2 col'>
                            <div className='fs-8 fw-500 text-dark text-truncate-2'>{title}</div>
                            <div className='fs-8 fw-500 text-bb text-truncate-2'>
                              {htmlToString(description)}
                            </div>
                            <div className='fs-9 text-bb mt-2'>
                              {moment(updated_at).format('DD MMM, Y')}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
