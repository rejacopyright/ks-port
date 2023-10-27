import { getAbout } from '@api/about'
import { detailBanner } from '@api/banner'
import Banner from '@components/banner'
import { SimpleLoader } from '@components/loader'
import { Sticky } from '@helpers'
import { FC, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import { Link, useParams } from 'react-router-dom'

const CustomToggle: FC<any> = ({ children, eventKey, active, activeKey, setActiveKey }) => {
  const [isHover, setIsHover] = useState<any>(false)
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setActiveKey(activeKey ? '' : eventKey)
  })
  useEffect(() => {
    setIsHover(active)
  }, [active])

  return (
    <div
      className={`pointer py-2 px-3 flex-between fw-500 rounded mb-1 ${
        isHover ? 'bg-primary text-white' : 'bg-light-primary text-primary'
      }`}
      onClick={decoratedOnClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(active || false)}
    >
      {children}
    </div>
  )
}
const Submenu: FC<any> = ({ title, active }) => {
  const [isHover, setIsHover] = useState<any>(false)
  useEffect(() => {
    setIsHover(active)
  }, [active])
  return (
    <div
      className={`pointer py-2 px-3 flex-start fw-500 rounded mb-1 ms-3 ${
        isHover ? 'bg-primary text-white' : 'bg-light-primary text-primary'
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(active || false)}
    >
      <i className='las la-dot-circle' />
      <span className='ms-2'>{title}</span>
    </div>
  )
}
const MenuBtn: FC<any> = ({ to = '/about', title = 'About', active = false, child, scope }) => {
  const { scope: path } = useParams()
  const [isHover, setIsHover] = useState<any>(false)
  const [activeKey, setActiveKey] = useState<any>('')
  useEffect(() => {
    setActiveKey(child?.map(({ scope: s }: any) => s)?.includes(path) ? scope : '')
  }, [child, path, scope])
  useEffect(() => {
    setIsHover(active)
  }, [active])
  return (
    <div className='col-auto col-md-12 mb-1'>
      {child?.length > 0 ? (
        <Accordion activeKey={activeKey}>
          <CustomToggle
            active={active}
            eventKey={scope}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          >
            <span>{title}</span>
            <i className='las la-angle-right d-none d-md-block' />
          </CustomToggle>
          <Accordion.Collapse eventKey={scope}>
            <>
              {child?.map(({ scope, title: subTitle }: any, index: any) => (
                <Link key={index} to={`/about/${scope}`}>
                  <Submenu title={subTitle} active={path === scope} />
                </Link>
              ))}
            </>
          </Accordion.Collapse>
        </Accordion>
      ) : (
        <Link to={to}>
          <div
            className={`pointer py-2 px-3 flex-between fw-500 rounded mb-1 ${
              isHover ? 'bg-primary text-white' : 'bg-light-primary text-primary'
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(active || false)}
          >
            <span>{title}</span>
          </div>
        </Link>
      )}
    </div>
  )
}
const Title: FC<any> = ({ _title }) => {
  return (
    <div className='flex-center'>
      <div className='fs-3 fw-500'>ABOUT US</div>
      {/* <div className='fs-8 fw-500 mx-2'>/</div>
      <div className='fs-5 fw-400'>{title}</div> */}
    </div>
  )
}
const Index: FC<any> = ({ children }) => {
  const { scope: path } = useParams()
  const [menus, setMenus] = useState<any>([])
  const [title, setTitle] = useState<any>('')
  const [loading, setLoading] = useState<any>(false)
  const [banner, setBanner] = useState<any>(undefined)
  useEffect(() => {
    detailBanner('about').then(({ data }) => {
      setBanner(data?.file)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    getAbout()
      .then(({ data: { data } = {} }) => {
        setMenus(data?.filter(({ active }: any) => active))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    const detail = menus?.find(({ scope }: any) => scope === path) || menus?.[0]
    setTitle(detail?.title)
    document.title = detail?.title || 'About'
  }, [path, menus])
  return (
    <>
      <Banner height='200' content={<Title title={title} />} src={banner} />
      <div className='container py-5 w-100' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-auto col-md-3 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                {/* <div className='d-none d-md-block text-primary text-uppercase mb-2'>About Us</div> */}
                {loading ? (
                  <SimpleLoader height={35} count={5} className='col-12 mb-2' />
                ) : (
                  <div className='row'>
                    {menus
                      ?.filter(({ parent, scope }: any) => !parent && scope !== 'organization')
                      ?.map(({ scope, title, children: child }: any, index: any) => (
                        <MenuBtn
                          key={index}
                          to={`/about/${scope}`}
                          title={title}
                          active={path === scope || (scope === 'company' && !path)}
                          child={child}
                          scope={scope}
                        />
                      ))}
                  </div>
                )}
              </div>
            </Sticky>
          </div>
          <div className='col-md col-md-9'>{children}</div>
        </div>
      </div>
    </>
  )
}
export default Index
