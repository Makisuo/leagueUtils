import React, { useState } from 'react'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import Main from './components/Sidebar'

import HomePage from './pages/HomePage'

function App (){
	const [ darkMode, setDarkMode ] = useState(true)

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: darkMode ? 'dark' : 'light',
					contrastThreshold: 5,
				},
			}),
		[ darkMode ],
	)
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router history={history}>
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
						exact
						render={(props) => (
							<Main>
								<HomePage />
							</Main>
						)}
					/>
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

export default App
