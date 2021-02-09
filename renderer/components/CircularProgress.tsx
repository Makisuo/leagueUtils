import React from 'react'

import {
	Box,
	CircularProgress,
	CircularProgressProps,
	Typography,
} from '@material-ui/core'

interface Props extends CircularProgressProps {
	value: number
}
export default function CircularProgressWithLabel(props: Props) {
	return (
		<Box position='relative' display='inline-flex'>
			<CircularProgress variant='determinate' {...props} />
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
				<Typography
					variant='h6'
					component='div'
					color='textSecondary'
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	)
}
