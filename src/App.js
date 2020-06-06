import React, { useState } from 'react'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Route, Switch, HashRouter } from 'react-router-dom'
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HashRouter history={history}>
				<Switch>
					<Route
						path='/'
						exact
						render={(props) => (
							<Main>
								<HomePage />
							</Main>
						)}
					/>
					<Route
						path='/mastery'
						render={(props) => (
							<Main>
								<NextLevelUpPage />
							</Main>
						)}
					/>
					<Route
						path='/nextChamp'
						render={(props) => (
							<Main>
								<MasteryOverviewPage />
							</Main>
						)}
					/>
				</Switch>
			</HashRouter>
		</ThemeProvider>
	)
}

export default App
