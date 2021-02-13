import React from 'react'

import {
	Box,
	CircularProgress,
	CircularProgressProps,
	Typography,
} from '@material-ui/core'

interface Props extends CircularProgressProps {
	value: number
	imageWidth?: string
	url?: string
}
const CircularProgressWithLabel = (props: Props) => {
	const { value, url, imageWidth, ...rest } = props

	return (
		<Box position='relative' display='inline-flex'>
			<CircularProgress variant='determinate' value={value} {...rest} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position='absolute'
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				{!url && (
					<Typography
						variant='h6'
						component='div'
						color='textSecondary'
					>{`${Math.round(value)}%`}</Typography>
				)}

				{url && (
					<img src={url} style={{ width: imageWidth || '70%' }}></img>
				)}
			</Box>
		</Box>
	)
}

export default CircularProgressWithLabel
