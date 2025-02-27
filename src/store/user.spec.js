import useStore from '../hooks/useStore'
import { resetUserStore, setAPIKey, clearCurrentUser, setCurrentUser } from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Igor' })
    expect(store.User.state.currentUser.name).toBe('Igor')
  })

  it('should set api_key on current user', () => {
    const store = useStore()
    setAPIKey('123')

    expect(store.User.state.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()

    setCurrentUser({ name: 'Igor' })
    expect(store.User.state.currentUser.name).toBe('Igor')

    clearCurrentUser()

    expect(store.User.state.currentUser.name).toBeFalsy()
  })
})
