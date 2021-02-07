import React from 'react'
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@material-ui/core'

interface Props {
	title: string
	text: string
	open: boolean
	handler: (open: boolean, status?: string) => void
}
const AlertDialog = (props: Props) => {
	const { title, text, open, handler } = props
	return (
		<Dialog
			open={open}
			onClose={() => handler(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => handler(false, 'DISAGREE')}
					color='primary'
				>
					Disagree
				</Button>
				<Button
					onClick={() => handler(false, 'AGREE')}
					color='primary'
					autoFocus
				>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AlertDialog
