import React, { ReactElement, useState } from 'react'

import {
	Box,
	createStyles,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableContainer,
} from '@material-ui/core'
import { EnhancedTableHead, EnhancedTableToolbar } from '.'

const useStyles = makeStyles((theme) =>
	createStyles({
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
		image: {
			width: 24,
			height: 24,
		},
	})
)
interface Props {
	tableToolBar: {
		title: string
		username?: string
	}
	tableTitle?: string
	headCells: {
		id: string
		numeric: boolean
		disablePadding: boolean
		label: string
	}[]
	children: ReactElement<typeof TableBody>
	order: any
	setOrder: Function
	orderBy: string
	setOrderBy: Function
	//These props are to filter for searches
	search?: boolean
	setSearchArgs?: Function
}
const EnhancedTable = (props: Props) => {
	const classes = useStyles()
	const {
		tableToolBar,
		tableTitle,
		headCells,
		order,
		setOrder,
		orderBy,
		setOrderBy,
		children,
		search,
		setSearchArgs,
	} = props

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	return (
		<Box className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					title={tableToolBar.title}
					username={tableToolBar.username}
					search={search}
					setSearchArgs={setSearchArgs}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby={tableTitle}
						size={'medium'}
						aria-label='table'
					>
						<EnhancedTableHead
							headCells={headCells}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						{children}
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default EnhancedTable
