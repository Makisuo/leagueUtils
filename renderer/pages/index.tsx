import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import { useStore } from '../stores/mainStore'

import {
	Container,
	Paper,
	Box,
	Avatar,
	Typography,
	makeStyles,
	createStyles,
} from '@material-ui/core'

import { getCurrentVersion, getSummoner } from '../utils/API/LeagueAPI'

import Bronze from '../public/images/ranks/Bronze.png'
import { CircularProgress } from '../components'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(4),
		},
		rankPaper: {
			width: '50%',
			margin: theme.spacing(1),
			padding: theme.spacing(4),
		},
		paper: {
			margin: theme.spacing(1),
			padding: theme.spacing(4),
		},
		avatar: {
			border: `1.5px solid ${theme.palette.primary.main}`,
			width: theme.spacing(12),
			height: theme.spacing(12),
		},
		platTypography: {
			color: 'purple',
			fontWeight: 'bold',
		},
	})
)

const Home = () => {
	const classes = useStyles()

	const username = useStore((state) => state.username)
	const [data, setData] = useState(null)
	const [patch, setPatch] = useState(null)

	//If the component is loaded set the current Patch

	useAsyncEffect(async () => {
		setPatch(await getCurrentVersion())
	}, [])

	useAsyncEffect(async () => {
		setData(await getSummoner(username))
	}, [username])

	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
				<Box display='flex' justifyContent='center' paddingBottom={1}>
					<Avatar
						className={classes.avatar}
						src={`https://cdn.communitydragon.org/${
							patch || '11.13'
						}/profile-icon/${data?.profileIconId || 1}`}
					/>
				</Box>
				<hr />
				<Box display='flex' justifyContent='center'>
					<Typography
						variant={'h4'}
					>{`Welcome ${username}!`}</Typography>
				</Box>
			</Paper>
			<Box display='flex' justifyContent='space-between'>
				<Paper className={classes.rankPaper}>
					<Box
						display='flex'
						justifyContent='center'
						marginBottom={3}
					>
						<CircularProgress
							value={89}
							url={Bronze}
							size={'10rem'}
							thickness={3}
							imageWidth={'80%'}
						></CircularProgress>
					</Box>
					<Box>
						<Typography
							className={classes.platTypography}
							align='center'
						>
							Platinum 1 / 0 LP
						</Typography>
						<Typography align='center'>57% WR 21 games</Typography>
					</Box>
				</Paper>
				<Paper className={classes.rankPaper}>
					<Typography variant={'h4'}>
						Winrate of individual Champs
					</Typography>
					<Typography variant={'body1'}>Coming soon</Typography>
				</Paper>
			</Box>
			<Paper className={classes.paper}>
				<Typography variant={'h4'}>Account Statitcs ETC </Typography>
				<Typography variant={'body1'}>Coming soon</Typography>
			</Paper>
			<Paper className={classes.paper}>
				<Typography variant={'h4'}>Account Statitcs ETC</Typography>
				<Typography variant={'body1'}>Coming soon</Typography>
			</Paper>
		</Container>
	)
}

export default Home
