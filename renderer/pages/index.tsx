import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import { Container, Paper, Box, Avatar } from '@material-ui/core'
import { useStore } from '../stores/mainStore'
import { getCurrentVersion, getSummoner } from '../utils/API/LeagueAPI'
import useAsyncEffect from 'use-async-effect'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(4),
		},
		paper: {
			marginBottom: theme.spacing(1),
			padding: theme.spacing(4),
		},
		avatar: {
			border: `1.5px solid ${theme.palette.primary.main}`,
			width: theme.spacing(12),
			height: theme.spacing(12),
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
				<Box display='flex' justifyContent='center' marginTop={3}>
					<Typography
						variant={'h4'}
					>{`Welcome ${username}!`}</Typography>
				</Box>
			</Paper>
			<Paper className={classes.paper}>
				<Typography variant={'h4'}>Account Statitcs ETC </Typography>
				<Typography variant={'body1'}>Coming soon</Typography>
			</Paper>
		</Container>
	)
}

export default Home
