import { FC } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import Tooltip from 'react-bootstrap/Tooltip'

const Index: FC<any> = ({
  children = '',
  placement = 'auto', // 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
  title = 'Title',
  trigger = ['hover', 'focus'], // 'hover' | 'click' |'focus' | ['hover', 'click', 'focus']
  active = true,
  className = '',
}) => {
  const renderTooltip = (props: any) => (
    <Tooltip {...props} className={className}>
      {title}
    </Tooltip>
  )
  return (
    <OverlayTrigger
      overlay={renderTooltip}
      placement={placement}
      trigger={trigger}
      show={active ? undefined! : false}
    >
      {children}
    </OverlayTrigger>
  )
}

export default Index
