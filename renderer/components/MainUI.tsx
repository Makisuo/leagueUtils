import React, { useState } from 'react'
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
	Typography,
	Divider,
	IconButton,
	Link as MaterialLink,
	TextField,
} from '@material-ui/core'

import Link from '../components/Link'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import LensIcon from '@material-ui/icons/Lens'
import MenuIcon from '@material-ui/icons/Menu'
import RandomizeIcon from '@material-ui/icons/InsertChart'
import RandomIcon from '@material-ui/icons/Help'

import { LeagueLogo, DiscordLogo, TwitterLogo } from '../assets'
import { doesSummonerExist } from '../utils/API/LeagueAPI'
import { useStore } from '../stores/mainStore'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
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

export default function MiniDrawer(props) {
	const classes = useStyles()
	const theme = useTheme()
	const username = useStore((state) => state.username)
	const setUsername = useStore((state) => state.setUsername)

	const [open, setOpen] = useState(false)
	const [usernameInput, setUsernameInput] = useState(username)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const onUsernameInputUpdate = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUsernameInput(event.target.value)
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
							const exist = await doesSummonerExist(username)
							if (exist) {
								setUsername(usernameInput)
							}
						}}
					>
						<TextField
							label='Username'
							placeholder={username}
							type='username'
							id='username-input'
							onInput={onUsernameInputUpdate}
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
				<div>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button component={Link} href={'/'}>
						<ListItemIcon>
							<LeagueLogo width={24} height={24} />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button component={Link} href={'/masteryOverview'}>
						<ListItemIcon>
							<LensIcon />
						</ListItemIcon>
						<ListItemText primary={'Mastery Overview'} />
					</ListItem>
					<ListItem button component={Link} href={'/nextChamp'}>
						<ListItemIcon>
							<SkipNextIcon />
						</ListItemIcon>
						<ListItemText primary={'Next Champ'} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button component={Link} href={'/randomChamp'}>
						<ListItemIcon>
							<RandomIcon />
						</ListItemIcon>
						<ListItemText primary={'Random Champ'} />
					</ListItem>
					<ListItem button component={Link} href={'/champOverview'}>
						<ListItemIcon>
							<RandomizeIcon />
						</ListItemIcon>
						<ListItemText primary={'Champion Overview'} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button component={Link} href={'/ultimateBravery'}>
						<ListItemIcon>
							<RandomIcon />
						</ListItemIcon>
						<ListItemText primary={'Bronze Bravery'} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem
						button
						component={MaterialLink}
						href='https://discord.gg/agxM7pC'
						target='_blank'
						color='inherit'
					>
						<ListItemIcon>
							<DiscordLogo width={24} height={24} />
						</ListItemIcon>
						<ListItemText primary={'Discord'} />
					</ListItem>
					<ListItem
						button
						component={MaterialLink}
						href='https://twitter.com/Krumel__'
						target='_blank'
						color='inherit'
					>
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
