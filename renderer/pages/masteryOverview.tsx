import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import { useStore } from '../stores/mainStore'

import {
	makeStyles,
	Container,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	LinearProgress,
	createStyles,
} from '@material-ui/core'

import { MasteryTokens, Table } from '../components/'

import { getComparator, stableSort } from '../utils/tableUtils'
import { formatDate, getChampionNameById } from '../utils/basics'
import { getMasteryData, getAllChampions } from '../utils/API/LeagueAPI'

import HextechIcon from '../public/images/hextech-icon.png'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(4),
		},
		image: {
			width: 24,
			height: 24,
		},
	})
)

const MasteryOverview = () => {
	const classes = useStyles()

	const username = useStore((state) => state.username)

	const [data, setData] = useState(null)
	const [championData, setChampionData] = useState(null)

	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('points')

	useAsyncEffect(async () => {
		getData(username)
	}, [username])

	const getData = async (name) => {
		setChampionData(Object.values(await getAllChampions()))
		setData(await getMasteryData(name))
	}

	return (
		<Container className={classes.root}>
			<Table
				tableToolBar={{
					title: 'Champion Mastery Overview',
					username: username,
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
						data && championData
							? formatData(data, championData)
							: [],
						getComparator(order, orderBy)
					).map((row, index: number) => {
						return (
							<TableRow hover tabIndex={-1} key={index}>
								<TableCell align='right'>
									<Typography
										component={'a'}
										href={`/champion/${row.name}`}
									>
										{row.name}
									</Typography>
								</TableCell>
								<TableCell align='right'>{row.level}</TableCell>
								<TableCell align='right'>
									{row.points}
								</TableCell>
								<TableCell align='center'>
									<img
										className={classes.image}
										style={
											!row.chestAvailable
												? {
														filter: 'grayscale(1)',
														opacity: 0.2,
												  }
												: {}
										}
										src={HextechIcon}
										alt='League Chest :D'
									/>
								</TableCell>
								<TableCell align='right'>
									{row.lastPlayed}
								</TableCell>
								<TableCell align='right'>
									<LinearProgress
										variant='determinate'
										value={row.progress * 100}
									/>
								</TableCell>
								<TableCell align='right'>
									{row.pointsToNextLevel === 0 ? (
										<MasteryTokens
											level={row.level}
											tokens={row.tokensEarned}
										/>
									) : (
										row.pointsToNextLevel
									)}
								</TableCell>
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
	{ id: 'level', numeric: true, disablePadding: false, label: 'Level' },
	{ id: 'points', numeric: true, disablePadding: false, label: 'Points' },
	{
		id: 'chestAvailable',
		numeric: true,
		disablePadding: false,
		label: 'Chest Earned',
	},
	{
		id: 'lastPlayed',
		numeric: true,
		disablePadding: false,
		label: 'Last Played',
	},
	{ id: 'progress', numeric: true, disablePadding: false, label: 'Progress' },
	{
		id: 'pointsToNextLevel',
		numeric: true,
		disablePadding: false,
		label: 'Points to next level',
	},
]

const formatData = (data, championData) => {
	return data.map(
		({
			championId,
			championLevel,
			championPoints,
			championPointsSinceLastLevel,
			championPointsUntilNextLevel,
			chestGranted,
			lastPlayTime,
			tokensEarned,
		}) => {
			return createData(
				getChampionNameById(championId, championData),
				championLevel,
				championPoints,
				chestGranted,
				formatDate(lastPlayTime),
				championPointsSinceLastLevel /
					(championPointsSinceLastLevel +
						championPointsUntilNextLevel),
				championPointsUntilNextLevel,
				tokensEarned
			)
		}
	)
}
const createData = (
	name: string,
	level: number,
	points: number,
	chestAvailable: boolean,
	lastPlayed: string,
	progress: number,
	pointsToNextLevel: number,
	tokensEarned: number
) => {
	return {
		name,
		level,
		points,
		chestAvailable,
		lastPlayed,
		progress,
		pointsToNextLevel,
		tokensEarned,
	}
}

export default MasteryOverview
