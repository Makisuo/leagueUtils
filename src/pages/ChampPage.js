import React, { useState } from 'react'
import { Container, Typography, Paper, Avatar, Box, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { getChampionIdByName, getMasteryDataOfChampion } from '../utils/LeagueAPI'

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
		setMasteryData(await getMasteryDataOfChampion(props.username, champion))
	}

	if (champion !== currChampion) {
		if (props.location.state) {
			setChampion(props.location.state)
		}
		setCurrChampion(champion)
		getChampionId()
	}

	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={1} justify='center'>
					<Grid item>
						<Avatar src={`http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/${champion}.png`} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h5' align='center'>
							{champion}
						</Typography>
						<Divider />
					</Grid>
				</Grid>
			</Paper>
		</Container>
	)
}

export default ChampPage
