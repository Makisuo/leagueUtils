import React from 'react'
import clsx from 'clsx'

import {
	Box,
	createStyles,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'

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
	search?: boolean
	setSearchArgs?: Function
}
const EnhancedTableToolbar = (props: Props) => {
	const classes = useStyles()

	const { title, username, className, search, setSearchArgs } = props

	return (
		<Box display='flex' className={clsx(classes.root, className)}>
			<Box flexGrow={1} display='flex'>
				<Box flexGrow={0.3}>
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
			{search && (
				<Box>
					<TextField
						label='Champion'
						variant='filled'
						onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
							setSearchArgs(event.target.value)
						}
					/>
				</Box>
			)}
		</Box>
	)
}

export default EnhancedTableToolbar
