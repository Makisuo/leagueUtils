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
} from '@material-ui/core'

import { formatDate } from '../utils/basics'

function createData (name, level, points, chestAvailable, lastPlayed, progress, pointsToNextLevel){
	return { name, level, points, chestAvailable, lastPlayed, progress, pointsToNextLevel }
}

function descendingComparator (a, b, orderBy){
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator (order, orderBy){
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator){
	const stabilizedThis = array.map((el, index) => [ el, index ])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

const headCells = [
	{ id: 'name', numeric: true, disablePadding: false, label: 'Champion' },
	{ id: 'level', numeric: true, disablePadding: false, label: 'Level' },
	{ id: 'points', numeric: true, disablePadding: false, label: 'Points' },
	{ id: 'chestAvailable', numeric: true, disablePadding: false, label: 'Chest Available' },
	{ id: 'lastPlayed', numeric: true, disablePadding: false, label: 'Last Played' },
	{ id: 'progress', numeric: true, disablePadding: false, label: 'Progress' },
	{ id: 'pointsToNextLevel', numeric: true, disablePadding: false, label: 'Points to next level' },
]

function EnhancedTableHead (props){
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
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
	order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
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

	return (
		<Box className={classes.root}>
			<Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
				Champion Mastery Thingy
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
}))

export default function EnhancedTable (props){
	const classes = useStyles()
	const [ order, setOrder ] = React.useState('asc')
	const [ orderBy, setOrderBy ] = React.useState('calories')
	const [ selected, setSelected ] = React.useState([])

	const { data } = props
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
			}) => {
				return createData(
					championId,
					championLevel,
					championPoints,
					chestGranted,
					formatDate(new Date(lastPlayTime)),
					championPointsSinceLastLevel / (championPointsSinceLastLevel + championPointsUntilNextLevel),
					championPointsUntilNextLevel,
				)
			},
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

	if (data) {
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
							{stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
								return (
									<TableRow hover tabIndex={-1} key={row.name}>
										<TableCell align='right'>{row.name}</TableCell>
										<TableCell align='right'>{row.level}</TableCell>
										<TableCell align='right'>{row.points}</TableCell>
										<TableCell align='right'>{row.chestAvailable.toString()}</TableCell>
										<TableCell align='right'>{row.lastPlayed}</TableCell>
										<TableCell align='right'>{row.progress}</TableCell>
										<TableCell align='right'>{row.pointsToNextLevel}</TableCell>
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
