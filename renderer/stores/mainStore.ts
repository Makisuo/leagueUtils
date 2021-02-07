import create from 'zustand'
type State = {
	username: string
	setUsername: (username: string) => void
}
export const useStore = create<State>((set) => ({
	username: 'Makisuo UwU',
	setUsername: (username: string) => {
		// store.set('username', username)
		set(() => ({ username: username }))
	},
}))
