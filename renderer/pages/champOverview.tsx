import React, { useEffect, useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'

import { getAllChampions } from '../utils/API/LeagueAPI'

import { ChampOverviewTable } from '../components'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
}))

const MasteryOverview = () => {
	const classes = useStyles()

	const [championData, setChampionData] = useState(null)

	const getData = async () => {
		setChampionData(Object.values(await getAllChampions()))
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<Container className={classes.root}>
			<ChampOverviewTable data={championData} />
		</Container>
	)
}

export default MasteryOverview
