import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
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
	overrides: {
		MuiCssBaseline: {
			'@global': {
				html: {
					WebkitFontSmoothing: 'auto',
				},
				a: {
					color: 'white !important',
				},
			},
		},
	},
})
