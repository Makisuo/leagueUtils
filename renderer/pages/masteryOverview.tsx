import React, { useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import useAsyncEffect from 'use-async-effect'

import { getMasteryData, getAllChampions } from '../utils/API/LeagueAPI'
import MasteryTable from '../components/MasteryTable'
import { useStore } from '../stores/mainStore'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
}))

const MasteryOverview = () => {
	const classes = useStyles()

	const username = useStore((state) => state.username)

	const [data, setData] = useState(null)
	const [championData, setChampionData] = useState(null)

	useAsyncEffect(async () => {
		getData(username)
	}, [username])

	const getData = async (name) => {
		setChampionData(Object.values(await getAllChampions()))
		setData(await getMasteryData(name))
	}

	return (
		<Container className={classes.root}>
			<MasteryTable data={data} championData={championData} />
		</Container>
	)
}

export default MasteryOverview
