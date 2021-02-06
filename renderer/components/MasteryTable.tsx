import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
	Paper,
	LinearProgress,
} from '@material-ui/core'

import HextechIcon from '../public/images/hextech-icon.png'

import { formatDate, getChampionNameById } from '../utils/basics'

import Tokens from './Tokens'

import { getComparator, stableSort } from '../utils/tableUtils'
import { useStore } from '../stores/mainStore'

function createData(
	name,
	level,
	points,
	chestAvailable,
	lastPlayed,
	progress,
	pointsToNextLevel,
	tokensEarned
) {
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

function EnhancedTableHead(props) {
	const { classes, order, orderBy, onRequestSort } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))

const EnhancedTableToolbar = () => {
	const classes = useToolbarStyles()

	const username = useStore((state) => state.username)

	return (
		<Box display='flex' className={classes.root}>
			<Box flexGrow={0.2}>
				<Typography variant='h6' id='tableTitle' component='div'>
					Champion Mastery Thingy
				</Typography>
			</Box>
			<Typography variant='h5' id='tableTitle' component='div'>
				{username}
			</Typography>
		</Box>
	)
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(3),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	image: {
		width: 24,
		height: 24,
	},
}))

export default function EnhancedTable(props) {
	const classes = useStyles()
	const [order, setOrder] = React.useState('desc')
	const [orderBy, setOrderBy] = React.useState('points')
	const [selected, setSelected] = React.useState([])

	let { data, championData } = props
	let rows = []

	const formatData = (data) => {
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

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	if (data && championData) {
		rows = formatData(data)
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={'medium'}
						aria-label='enhanced table'
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(
								rows,
								getComparator(order, orderBy)
							).map((row, index) => {
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.name}
									>
										<TableCell align='right'>
											{/* <Link
												to={{
													pathname: '/champion',
													state: row.name,
												}}
												style={{
													textDecoration: 'none',
													color: 'inherit',
												}}
											>
												{row.name}
											</Link> */}
											<Typography>{row.name}</Typography>
										</TableCell>
										<TableCell align='right'>
											{row.level}
										</TableCell>
										<TableCell align='right'>
											{row.points}
										</TableCell>
										<TableCell align='center'>
											<img
												className={classes.image}
												style={
													!row.chestAvailable
														? {
																filter:
																	'grayscale(1)',
																opacity: 0.2,
														  }
														: {}
												}
												src={HextechIcon}
												alt=''
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
												<Tokens
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
				</TableContainer>
			</Paper>
		</div>
	)
}
