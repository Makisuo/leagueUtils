import React, { useState } from 'react'
import { Box, Container, Typography, Paper, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { getChampionIdByName } from '../utils/LeagueAPI'

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
	const [ currChampion, setCurrChampion ] = useState(null)
	const [ champion, setChampion ] = useState('Annie')
	const [ masteryData, setMasteryData ] = useState(null)

	const getChampionId = async () => {
		console.log(await getChampionIdByName(champion))
	}

	if (champion !== currChampion) {
		if (props.location.state) {
			setChampion(props.location.state)
		}
		getChampionId()
		setCurrChampion(champion)
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
