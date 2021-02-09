import React, { Fragment } from 'react'

import { Box, makeStyles } from '@material-ui/core/'

import Token from '@material-ui/icons/FiberManualRecord'

const useStyles = makeStyles((theme) => ({
	ownedTokens: {},
	availableToken: {
		opacity: 0.2,
	},
}))

interface Props {
	tokens: number
	level: number
}

const MasteryTokens = (props: Props) => {
	const classes = useStyles()
	const { tokens, level } = props

	return (
		<Box>
			{level === 5 ? (
				<Fragment>
					<Token
						className={
							tokens >= 1
								? classes.ownedTokens
								: classes.availableToken
						}
					/>
					<Token
						className={
							tokens >= 2
								? classes.ownedTokens
								: classes.availableToken
						}
					/>
				</Fragment>
			) : level === 6 ? (
				<Fragment>
					<Token
						className={
							tokens >= 1
								? classes.ownedTokens
								: classes.availableToken
						}
					/>
					<Token
						className={
							tokens >= 2
								? classes.ownedTokens
								: classes.availableToken
						}
					/>
					<Token
						className={
							tokens >= 3
								? classes.ownedTokens
								: classes.availableToken
						}
					/>
				</Fragment>
			) : (
				'MASTERED'
			)}
		</Box>
	)
}

export default MasteryTokens
