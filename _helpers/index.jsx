export const htmlToString = (text) => {
  if (typeof text === 'string') {
    return text?.replace(/(<([^>]+)>|&[A-Za-z0-9#]+;)/gi, '')?.toString()
  } else {
    return text
  }
}

export const strToSlug = (str) => {
  return str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, '')
    ?.replace(/[\s_-]+/g, '-')
    ?.replace(/^-+|-+$/g, '')
}

export const toCapitalize = (text) => {
  return text.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
}

export const randomString = () => {
  const rand =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return rand
}
