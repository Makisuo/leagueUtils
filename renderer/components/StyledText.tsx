import React, { ReactElement } from 'react'
import _ from 'lodash'
import { Bold, Colored } from './StyleComponets'
import { Typography } from '@material-ui/core'

interface Props {
	text: string
	keywords: keyword[]
	fontIcons?: Icon[]
	typography?: boolean
	variant?:
		| 'button'
		| 'caption'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'inherit'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'overline'
		| 'srOnly'
}

interface keyword {
	keyword: string
	color?: string
	size?: string
	bold?: boolean
}

interface Icon {
	name: string
	component: ReactElement
}
const StyledText = (props: Props) => {
	const { text, keywords, typography, variant } = props
	const renderText = text.split(' ')

	const render = renderText.map((word, index: number) => {
		const matchingKeyword = _.find(keywords, [
			'keyword',
			word.toLowerCase().trim(),
		])
		console.log(word)
		if (matchingKeyword) {
			if (matchingKeyword.bold) {
				return (
					<Bold
						key={index}
						color={matchingKeyword.color}
						fontSize={matchingKeyword.size}
					>
						{word}{' '}
					</Bold>
				)
			} else {
				return (
					<Colored
						key={index}
						color={matchingKeyword.color}
						fontSize={matchingKeyword.size}
					>
						{word}{' '}
					</Colored>
				)
			}
		}
		return <span key={index}>{word} </span>
	})

	return typography ? (
		<Typography variant={variant}>{render}</Typography>
	) : (
		<>{render}</>
	)
}

export default StyledText
