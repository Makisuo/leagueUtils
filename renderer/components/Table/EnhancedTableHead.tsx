import React from 'react'

import {
	createStyles,
	makeStyles,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		root: {},
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
	})
)
interface Props {
	onRequestSort: Function
	headCells: {
		id: string
		numeric: boolean
		disablePadding: boolean
		label: string
	}[]
	order: any
	orderBy: string
}
const EnhancedTableHead = (props: Props) => {
	const classes = useStyles()
	const { headCells, order, orderBy, onRequestSort } = props
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

export default EnhancedTableHead
