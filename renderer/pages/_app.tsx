import React from 'react'

import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from '../lib/theme'

import { MainUI } from '../components'

import Head from 'next/head'
import type { AppProps } from 'next/app'

declare global {
	interface Window {
		electron: any
	}
}

export default function (props: AppProps) {
	const { Component, pageProps } = props

	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
				<title>League Utils</title>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MainUI>
					<Component {...pageProps} />
				</MainUI>
			</ThemeProvider>
		</>
	)
}
