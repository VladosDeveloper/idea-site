export const getAllIdeasRoute = () => '/'

const getRouteParams = <T extends Record<string, boolean>>(obj: T) => {
  return Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const viewIdeaRouteParams = getRouteParams({ ideaNick: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams

export const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`

export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'

export const createNewIdeaRoute = () => '/ideas/newIdea'
