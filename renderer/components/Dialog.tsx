import React, { ReactElement } from 'react'

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
	dialog: ReactElement<typeof DialogContentText>
	open: boolean
	handler: (open: boolean, status?: string) => void
}
const AlertDialog = (props: Props) => {
	const { title, dialog, open, handler } = props
	return (
		<Dialog
			open={open}
			onClose={() => handler(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>{dialog}</DialogContent>
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
