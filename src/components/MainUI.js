import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Drawer,
	AppBar,
	Toolbar,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
	Divider,
	IconButton,
} from '@material-ui/core'

import MaterialLink from '@material-ui/core/Link'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import LensIcon from '@material-ui/icons/Lens'
import MenuIcon from '@material-ui/icons/Menu'
import RandomizeIcon from '@material-ui/icons/InsertChart'

import { ReactComponent as LeagueLogo } from '../assets/svgs/leagueLogo.svg'
import { ReactComponent as DiscordLogo } from '../assets/svgs/discordLogo.svg'
import { ReactComponent as TwitterLogo } from '../assets/svgs/twitterLogo.svg'

import { doesSummonerExist } from '../utils/LeagueAPI'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	userInput: {
		paddingLeft: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function MiniDrawer (props){
	const classes = useStyles()
	const theme = useTheme()
	const [ open, setOpen ] = React.useState(false)
	const { setUsername } = props

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (
		<div className={classes.root}>
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant='h6' noWrap>
						League Utils
					</Typography>
					<form
						className={classes.userInput}
						autoComplete='on'
						onSubmit={async (e) => {
							e.preventDefault()
							const exist = await doesSummonerExist(document.getElementById('username-input').value)
							if (exist) {
								setUsername(document.getElementById('username-input').value)
							} else {
								// setUsername(null)
							}
						}}
					>
						<TextField
							label='Username'
							placeholder={window.localStorage.getItem('username')}
							type='username'
							id='username-input'
							// variant='outlined'
						/>
					</form>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button component={Link} to={'/'}>
						<ListItemIcon>
							<LeagueLogo width={24} height={24} />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem button component={Link} to={'/mastery'}>
						<ListItemIcon>
							<LensIcon />
						</ListItemIcon>
						<ListItemText primary={'Mastery'} />
					</ListItem>
					<ListItem button component={Link} to={'/nextChamp'}>
						<ListItemIcon>
							<SkipNextIcon />
						</ListItemIcon>
						<ListItemText primary={'Mastery Overview'} />
					</ListItem>
					<ListItem button component={Link} to={'/randomize'}>
						<ListItemIcon>
							<RandomizeIcon />
						</ListItemIcon>
						<ListItemText primary={'Get a random champion'} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button component={MaterialLink} href='https://discord.gg/agxM7pC' target='_blank'>
						<ListItemIcon>
							<DiscordLogo width={24} height={24} />
						</ListItemIcon>
						<ListItemText primary={'Discord'} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<TwitterLogo width={24} height={24} />
						</ListItemIcon>
						<ListItemText primary={'Twitter'} />
					</ListItem>
				</List>
			</Drawer>
			<main className={classes.content}>{props.children}</main>
		</div>
	)
}
