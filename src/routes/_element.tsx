import { FC, Suspense } from 'react'

interface Props {
  el: any
}

export const Element: FC<Props> = ({ el }: any) => {
  const El: any = el
  return (
    <Suspense fallback=''>
      <El />
    </Suspense>
  )
}
