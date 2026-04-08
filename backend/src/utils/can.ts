import { type Idea, type User, type UserPermissions } from '../prisma/generated/prisma-client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeIdea = Pick<Idea, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPermissions) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockIdeas = (user: MaybeUser) => hasPermission(user, 'BLOCK_IDEAS')

export const canEditIdea = (user: MaybeUser, idea: MaybeIdea) => !!user && !!idea && user.id === idea.authorId
