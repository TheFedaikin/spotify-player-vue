// * In the big app the storage should have a wrapper that accepts key as argument.
// * This wrapper will serve two purposes: it should handle error/edge cases and
// * It allows us to change it to any other storage mechanism when we don't change the outer interface.
// * For this demo purposes this abstraction is enough, IMO
export const saveTokenToStorage = (token: string): void => sessionStorage.setItem('token', token)

export const getTokenFromStorage = (): string => sessionStorage.getItem('token') || ''

export const removeTokenFromStorage = (): void => sessionStorage.removeItem('token')
