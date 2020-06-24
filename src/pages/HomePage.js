import React, { Fragment, useState } from 'react'
import { Typography, makeStyles, Container, Paper, Avatar, Box } from '@material-ui/core'
import { getSummoner, getCurrentVersion } from '../utils/API/LeagueAPI'

const useStyles = makeStyles((theme) => ({
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
}))

const Home = (props) => {
	const classes = useStyles()

	const [ currentUser, setCurrentUser ] = useState(null)
	const [ data, setData ] = useState(null)
	const [ patch, setPatch ] = useState(null)

	const { username } = props
	const getUserData = async (username) => {
		setPatch(await getCurrentVersion())
		setData(await getSummoner(username))
	}

	if (username !== currentUser) {
		setCurrentUser(username)
		getUserData(username)
	}

	return (
		<Fragment>
			<Container className={classes.root}>
				<Paper className={classes.paper}>
					<Box display='flex' justifyContent='center'>
						{data && (
							<Avatar
								className={classes.avatar}
								src={`https://cdn.communitydragon.org/${patch}/profile-icon/${data.profileIconId}`}
							/>
						)}
					</Box>
					<hr />
					<Box display='flex' justifyContent='center' marginTop={3}>
						<Typography variant={'h4'}>{`Welcome ${username}!`}</Typography>
					</Box>
				</Paper>
				<Paper className={classes.paper}>
					<Typography variant={'h4'}>Account Statitcs ETC </Typography>
					<Typography variant={'body1'}>Comming soon</Typography>
				</Paper>
			</Container>
		</Fragment>
	)
}

export default Home
