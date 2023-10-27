export const htmlToString = (text: any) => {
  if (typeof text === 'string') {
    return text?.replace(/(<([^>]+)>|&[A-Za-z0-9#]+;)/gi, '')?.toString()
  } else {
    return text
  }
}

export const strToSlug = (str: any) => {
  return str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, '')
    ?.replace(/[\s_-]+/g, '-')
    ?.replace(/^-+|-+$/g, '')
}

export const encodeHTMLEntities = (text: any) => {
  const textArea = document.createElement('textarea')
  textArea.innerText = text || ''
  let encodedOutput = textArea.innerHTML
  const arr = encodedOutput?.split('<br>')
  encodedOutput = arr?.join('\n')
  return encodedOutput
}

export const decodeHTMLEntities = (text: any) => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text || ''
  return textArea?.value
}

export const toCapitalize = (text: any) => {
  return text.replace(/(?:^|\s)\S/g, (a: any) => a?.toUpperCase())
}

export const slugToTitle = (text: any) => {
  return text
    ?.toString()
    ?.replace(/[-_]/g, ' ')
    ?.replace(/(?:^|\s)\S/g, (a: any) => a?.toUpperCase())
}

export const randomString = () => {
  const rand =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return rand
}

export const mapError = (e: any) => {
  const { response } = e
  const { data } = response || {}
  const res: any = {}
  if (data && data?.data) {
    Object.keys(data?.data).map((map) => {
      return (res[map] = data?.data?.[map]?.[0])
    })
  } else if (typeof data?.message === 'object') {
    Object.keys(data?.message).map((map) => {
      return (res[map] = data?.message?.[map]?.[0])
    })
  } else if (data?.message) {
    res.message = data?.message
  } else if (e?.message) {
    res.message = e?.message
  }
  return res
}

export function getJWTPayload(token: any) {
  let payload = '{}'
  if (token) {
    try {
      const base64Url = token?.split('.')[1]
      const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/')
      const uriComponent = window
        ?.atob(base64)
        ?.split('')
        ?.map((c) => '%' + ('00' + c?.charCodeAt(0)?.toString(16))?.slice(-2))
        ?.join('')
      payload = decodeURIComponent(uriComponent)
    } catch (error) {
      payload = '{}'
    }
  } else {
    payload = '{}'
  }
  return JSON.parse(payload)
}
