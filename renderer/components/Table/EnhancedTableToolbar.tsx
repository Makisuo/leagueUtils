import React from 'react'
import clsx from 'clsx'

import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
		},
	})
)
interface Props {
	title: string
	username?: string
	className?: string
}
const EnhancedTableToolbar = (props: Props) => {
	const classes = useStyles()

	const { title, username, className } = props

	return (
		<Box display='flex' className={clsx(classes.root, className)}>
			<Box flexGrow={0.2}>
				<Typography variant='h6' id='tableTitle' component='div'>
					{title}
				</Typography>
			</Box>
			{username && (
				<Typography variant='h5' id='tableTitle' component='div'>
					{username.toUpperCase()}
				</Typography>
			)}
		</Box>
	)
}

export default EnhancedTableToolbar
