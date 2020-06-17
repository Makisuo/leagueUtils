import React, { useState } from 'react'
import { Box, Container, Typography, Paper, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
}))

const ChampPage = (props) => {
	const classes = useStyles()
	const [ champion, setChampion ] = useState('Annie')

	if (props.location.state && props.location.state.champion !== champion) {
		setChampion(props.location.state.champion)
	}

	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
				<Avatar />
				<Typography variant='h5' align='center'>
					{champion}
				</Typography>
			</Paper>
		</Container>
	)
}

export default ChampPage
