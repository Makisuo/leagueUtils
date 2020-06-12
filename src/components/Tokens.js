import React, { Fragment } from 'react'

import { Box, makeStyles } from '@material-ui/core/'

import Token from '@material-ui/icons/FiberManualRecord'

const useStyles = makeStyles((theme) => ({
	ownedTokens: {
		color: 'blue',
	},
}))

export default function CircularProgressWithLabel (props){
	const classes = useStyles()
	const { tokens, level } = props

	return (
		<Box>
			{level === 5 ? (
				<Fragment>
					<Token className={tokens >= 1 ? classes.ownedTokens : ''} />
					<Token className={tokens >= 2 ? classes.ownedTokens : ''} />
				</Fragment>
			) : level === 6 ? (
				<Fragment>
					<Token className={tokens >= 1 ? classes.ownedTokens : ''} />
					<Token className={tokens >= 2 ? classes.ownedTokens : ''} />
					<Token className={tokens >= 3 ? classes.ownedTokens : ''} />
				</Fragment>
			) : (
				'MASTERED'
			)}
		</Box>
	)
}
