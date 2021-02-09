import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles } from '@material-ui/core/styles'
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

import { getComparator, stableSort } from '../utils/tableUtils'
import { EnhancedTableToolbar } from './Table'

function createData(name, hp, hp_18, mana, ad, as, ar, mr, ms, range) {
	return { name, hp, hp_18, mana, ad, as, ar, mr, ms, range }
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

const EnhancedTableHead = (props) => {
	const { classes, order, orderBy, onRequestSort } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						className={classes.tableHead}
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

const useToolbarStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
		},
	})
)

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(3),
	},
	container: {
		[theme.breakpoints.up('md')]: {
			maxHeight: '78%',
		},
		[theme.breakpoints.up('sm')]: {
			maxHeight: '75%',
		},
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
		width: 32,
		height: 32,
	},
	tableHead: {
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function EnhancedTable(props) {
	const classes = useStyles()
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('points')
	const [selected, setSelected] = useState([])

	let { data } = props
	let rows = []

	const formatData = (data) => {
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
				<EnhancedTableToolbar title={'Champion Overview'} />
				<TableContainer className={classes.container}>
					<Table
						aria-labelledby='tableTitle'
						size={'medium'}
						aria-label='enhanced table'
						stickyHeader
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
									<TableRow hover key={row.name}>
										<TableCell align='right'>
											{row.name}
										</TableCell>
										<TableCell align='right'>
											{row.hp}
										</TableCell>
										<TableCell align='right'>
											{row.hp_18}
										</TableCell>
										<TableCell align='right'>
											{row.mana}
										</TableCell>
										<TableCell align='right'>
											{row.ad}
										</TableCell>
										<TableCell align='right'>
											{row.as}
										</TableCell>
										<TableCell align='right'>
											{row.ar}
										</TableCell>
										<TableCell align='right'>
											{row.mr}
										</TableCell>
										<TableCell align='right'>
											{row.ms}
										</TableCell>
										<TableCell align='right'>
											{row.range}
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
