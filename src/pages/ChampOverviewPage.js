import React, { Fragment, useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'

import { getAllChampions } from '../utils/LeagueAPI'

import ChampOverviewTable from '../components/ChampOverviewTable'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
}))

const MasteryOverview = (props) => {
	const classes = useStyles()

	const [ championData, setChampionData ] = useState(null)
	const [ isInit, setIsInit ] = useState(true)

	const getData = async () => {
		setChampionData(Object.values(await getAllChampions()))
	}

	if (isInit === true) {
		setIsInit(false)
		getData()
	}

	console.log(championData)

	return (
		<Fragment>
			<Container className={classes.root}>
				<ChampOverviewTable data={championData} />
			</Container>
		</Fragment>
	)
}

export default MasteryOverview
