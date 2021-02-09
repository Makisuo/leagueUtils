import React, { useEffect, useState } from 'react'
import {
	makeStyles,
	Container,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core'

import { Table } from '../components'

import { getComparator, stableSort } from '../utils/tableUtils'
import { getAllChampions } from '../utils/API/LeagueAPI'

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
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('points')

	const getData = async () => {
		setChampionData(Object.values(await getAllChampions()))
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<Container className={classes.root}>
			<Table
				tableToolBar={{
					title: 'Champion Mastery Overview',
				}}
				tableTitle='Champion Mastery Overview Table'
				headCells={headCells}
				order={order}
				setOrder={setOrder}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
			>
				<TableBody>
					{stableSort(
						championData ? formatData(championData) : [],
						getComparator(order, orderBy)
					).map((row, index: number) => {
						return (
							<TableRow hover key={row.name}>
								<TableCell align='right'>{row.name}</TableCell>
								<TableCell align='right'>{row.hp}</TableCell>
								<TableCell align='right'>{row.hp_18}</TableCell>
								<TableCell align='right'>{row.mana}</TableCell>
								<TableCell align='right'>{row.ad}</TableCell>
								<TableCell align='right'>{row.as}</TableCell>
								<TableCell align='right'>{row.ar}</TableCell>
								<TableCell align='right'>{row.mr}</TableCell>
								<TableCell align='right'>{row.ms}</TableCell>
								<TableCell align='right'>{row.range}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Container>
	)
}

const headCells = [
	{ id: 'name', numeric: true, disablePadding: false, label: 'Champion' },
	{ id: 'hp', numeric: true, disablePadding: false, label: 'HP' },
	{ id: 'hp_18', numeric: true, disablePadding: false, label: 'HP@18' },
	{ id: 'mana', numeric: true, disablePadding: false, label: 'Mana' },
	{ id: 'ad', numeric: true, disablePadding: false, label: 'AD' },
	{ id: 'as', numeric: true, disablePadding: false, label: 'AS' },
	{ id: 'ar', numeric: true, disablePadding: false, label: 'AR' },
	{ id: 'mr', numeric: true, disablePadding: false, label: 'MR' },
	{ id: 'ms', numeric: true, disablePadding: false, label: 'MS' },
	{ id: 'range', numeric: true, disablePadding: false, label: 'Range' },
]

const formatData = (data: any) => {
	return data.map(({ name, stats }) => {
		return createData(
			name,
			stats.hp,
			Math.floor(stats.hp + stats.hpperlevel * 17),
			stats.mp,
			stats.attackdamage,
			stats.attackspeed,
			stats.armor,
			stats.spellblock,
			stats.movespeed,
			stats.attackrange
		)
	})
}

const createData = (
	name: string,
	hp: number,
	hp_18: number,
	mana: number,
	ad: number,
	as: number,
	ar: number,
	mr: number,
	ms: number,
	range: number
) => {
	return { name, hp, hp_18, mana, ad, as, ar, mr, ms, range }
}
export default MasteryOverview
