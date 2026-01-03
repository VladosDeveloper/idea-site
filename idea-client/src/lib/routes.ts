export const getAllIdeasRoute = () => '/ideas'

// export const viewIdeaRouteParams =
export const getViewIdeaRoute = ({ ideaNick }: { ideaNick: string }) => `/ideas/${ideaNick}`
