import { randomString } from '@helpers'
import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const TextLoader: FC<any> = ({ count = 3, height = 25, className = '' }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row'>
          {Array(count)
            .fill(count)
            .map(() => {
              const random = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
              return (
                <div className={className} key={randomString()}>
                  <div className='row'>
                    <div className='col'>
                      <div className='col-12 mt-0 mb-1' style={{ lineHeight: height / 2 + 'px' }}>
                        <Skeleton
                          className='my-0'
                          width={random * 10 + '%'}
                          height={height / 3}
                          count={1}
                        />
                      </div>
                      <div className='col-12 m-0' style={{ lineHeight: height / 2 + 'px' }}>
                        <Skeleton className='my-0' height={height} count={1} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </SkeletonTheme>
  )
}

export const ListLoader: FC<any> = ({
  count = 3,
  height = 25,
  className = 'col-12',
  circle = true,
}) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row'>
          {Array(count)
            .fill(count)
            .map(() => {
              const random = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
              return (
                <div className={className} key={randomString()}>
                  <div className='row'>
                    <div className='col-auto' style={{ lineHeight: height / 2 + 'px' }}>
                      <Skeleton
                        className='my-0'
                        width={height}
                        height={height}
                        count={1}
                        circle={circle}
                      />
                    </div>
                    <div className='col'>
                      <div className='row'>
                        <div className='col-12 m-0' style={{ lineHeight: height / 2 + 'px' }}>
                          <Skeleton
                            className='my-0'
                            width={random * 10 + '%'}
                            height={height / 3}
                            count={1}
                          />
                        </div>
                        <div className='col-12 m-0' style={{ lineHeight: height / 2 + 'px' }}>
                          <Skeleton className='my-0' height={height} count={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </SkeletonTheme>
  )
}

export const CardLoader: FC<any> = ({
  count = 3,
  height = 100,
  className = 'col-12',
  icon = true,
}) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row'>
          {Array(count)
            .fill(count)
            .map(() => {
              const random = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
              return (
                <div className={className} key={randomString()}>
                  <div className='row'>
                    <div className='col-12 mb-1' style={{ lineHeight: '20px' }}>
                      <div className='row align-items-center'>
                        {icon && (
                          <div className='col-auto' style={{ lineHeight: '15px' }}>
                            <Skeleton className='my-0' width={30} height={30} count={1} circle />
                          </div>
                        )}
                        <div className={`col ${icon ? 'ps-0' : ''}`} style={{ lineHeight: '15px' }}>
                          <Skeleton
                            className='my-0'
                            width={random * 10 + '%'}
                            height={10}
                            count={1}
                          />
                          <Skeleton className='my-0' height={10} count={1} />
                        </div>
                      </div>
                    </div>
                    <div className='col-12 m-0' style={{ lineHeight: '20px' }}>
                      <Skeleton className='my-0 radius-10' height={height} count={1} />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </SkeletonTheme>
  )
}

export const IconLoader: FC<any> = ({ count = 1, size = 25, className = '', circle = false }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row'>
          {Array(count)
            .fill(count)
            .map(() => (
              <div className={className} key={randomString()}>
                <div className='row'>
                  <div className='col-12 m-0 radius-10' style={{ lineHeight: size / 2 + 'px' }}>
                    <Skeleton
                      className='my-0 radius-10'
                      width={size}
                      height={size}
                      count={1}
                      circle={circle}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </SkeletonTheme>
  )
}

export const ViewLoader: FC<any> = ({ height = 25, heightLabel = 20 }) => {
  const LoopingSkeleton = () => (
    <div className='row'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
        <div className='col-6 mt-3' key={randomString()}>
          <Skeleton height={heightLabel} style={{ width: '30%' }} />
          <Skeleton height={height} style={{ width: '50%' }} />
        </div>
      ))}
    </div>
  )

  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      <div className='row m-5'>{LoopingSkeleton()}</div>
    </SkeletonTheme>
  )
}

export const SimpleLoader: FC<any> = ({
  count = 3,
  height = 25,
  width = '',
  circle = false,
  className = '',
  radius,
}) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row'>
          {Array(count)
            .fill(count)
            .map(() => {
              return (
                <div
                  className={className}
                  key={randomString()}
                  style={{ lineHeight: height / 2 + 'px' }}
                >
                  <Skeleton
                    className={`my-0 ${radius ? `radius-${radius}` : ''}`}
                    height={height}
                    width={width}
                    count={1}
                    circle={circle}
                  />
                </div>
              )
            })}
        </div>
      )}
    </SkeletonTheme>
  )
}
