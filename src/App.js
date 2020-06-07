import React, { useState } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
// import Store from 'electron-store'

import history from './utils/history'

import Main from './components/MainUI'

import HomePage from './pages/HomePage'
import NextLevelUpPage from './pages/NextLevelUpPage'
import MasteryOverviewPage from './pages/MasteryOverviewPage'

function App (){
	const theme = createMuiTheme({
		palette: {
			type: 'dark',
			contrastThreshold: 5,
		},
	})

	const [ username, setUserName ] = useState(window.localStorage.getItem('username'))

	const setUser = (username) => {
		window.localStorage.setItem('username', username)
		console.log(window.localStorage)
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
					</Switch>
				</Main>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
