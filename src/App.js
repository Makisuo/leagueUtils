import React, { useState } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'

import history from './utils/history'

import Main from './components/MainUI'

import HomePage from './pages/HomePage'
import NextLevelUpPage from './pages/NextLevelUpPage'
import MasteryOverviewPage from './pages/MasteryOverviewPage'
import RandomizePage from './pages/RandomChamp'

function App (){
	const theme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#312955',
				light: '#8583c8',
				dark: '#272d69',
			},
			secondary: {
				main: '#3b2d6a',
			},
			background: {
				default: '#1a123e',
				paper: '#160D33',
			},
		},
	})
	if (!window.localStorage.getItem('username')) {
		window.localStorage.setItem('username', 'Makisuo UwU')
	}
	const [ username, setUserName ] = useState(window.localStorage.getItem('username'))

	const setUser = (username) => {
		window.localStorage.setItem('username', username)
		setUserName(username)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HashRouter history={history}>
				<Main username={username} setUsername={setUser}>
					<Switch>
						<Route path='/' exact render={(props) => <HomePage {...props} username={username} />} />
						<Route
							path='/mastery'
							render={(props) => <MasteryOverviewPage {...props} username={username} />}
						/>
						<Route
							path='/nextChamp'
							render={(props) => <NextLevelUpPage {...props} username={username} />}
						/>
						<Route path='/randomize' render={(props) => <RandomizePage {...props} username={username} />} />
					</Switch>
				</Main>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
