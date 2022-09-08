import Provider from '@components/about/Provider'
import Meta from '@components/seo/meta'
const Index = () => {
  return (
    <>
      <Meta title='Vision, Mission & Values' description={undefined} />
      <div className='fs-4 fw-500 mb-2'>Vision, Mission & Values</div>
      <div className=''>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam error culpa, dolorem
        eligendi sapiente est voluptatibus voluptates. Earum mollitia, a, deleniti suscipit impedit
        laborum tempora exercitationem quidem, corrupti quae debitis!
      </div>
    </>
  )
}
Index.Layout = Provider
export default Index
