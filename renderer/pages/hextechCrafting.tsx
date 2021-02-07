import {
	Button,
	Checkbox,
	createStyles,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	makeStyles,
	Paper,
} from '@material-ui/core'
import { Box, Typography, Container } from '@material-ui/core'
import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Dialog } from '../components'
import LCU from '../utils/API/LCU'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: theme.spacing(4),
		},
		formControl: {
			margin: theme.spacing(3),
		},
	})
)

const hextechCrafting = () => {
	const classes = useStyles()

	const [checkBoxState, setCheckBoxState] = useState({
		disenchantAll: false,
		disenchantUnowned: false,
		keepOnlyForLevel5And6: false,
	})
	const [dialogOpen, setDialogOpen] = useState(false)

	const [lcuState, setLcuState] = useState({
		count: 0,
		beAmount: 0,
		championsToDisenchant: [],
	})

	useAsyncEffect(async () => {
		await LCU.connect()
	}, [])

	const handleChange = (event) => {
		setCheckBoxState({
			...checkBoxState,
			[event.target.name]: event.target.checked,
		})
	}
	const handleDialog = (open: boolean, event: string) => {
		setDialogOpen(open)
		if (event === 'AGREE') {
			console.log(championsToDisenchant)
		}
	}

	const startDisenchanting = async () => {
		const [
			count,
			be,
			championToDisenchant,
		] = await LCU.getChampionsToDisenchant(
			disenchantAll,
			disenchantUnowned,
			keepOnlyForLevel5And6
		)
		setLcuState({
			count: count,
			beAmount: be,
			championsToDisenchant: championToDisenchant,
		})
		setDialogOpen(true)
	}

	const {
		disenchantAll,
		disenchantUnowned,
		keepOnlyForLevel5And6,
	} = checkBoxState

	const { count, beAmount, championsToDisenchant } = lcuState

	return (
		<>
			<Container className={classes.root}>
				<Paper>
					<Box
						display='flex'
						justifyContent='center'
						padding={3}
						flexDirection='column'
					>
						<Box width='100%'>
							<Typography variant='h3' align='center'>
								Hextech Crafting
							</Typography>
						</Box>
						<FormControl
							component='fieldset'
							className={classes.formControl}
						>
							<FormLabel component='legend'>
								Disenchant Options
							</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={disenchantAll}
											onChange={handleChange}
											name='disenchantAll'
										/>
									}
									label='Disenchant All'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={disenchantUnowned}
											disabled={disenchantAll}
											onChange={handleChange}
											name='disenchantUnowned'
										/>
									}
									label='Disenchant Unowned'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={keepOnlyForLevel5And6}
											disabled={disenchantAll}
											onChange={handleChange}
											name='keepOnlyForLevel5And6'
										/>
									}
									label='Keep only for Level 5 and 6'
								/>
							</FormGroup>
							<FormHelperText>Be careful</FormHelperText>
						</FormControl>
						<Button
							variant='outlined'
							onClick={() => startDisenchanting()}
						>
							Disenchant
						</Button>
					</Box>
				</Paper>
			</Container>
			<Dialog
				title='Disenchant'
				text={`Do you really wanna disenchant?
            With agreeing to this you will disenchant ${count} Champion Shard and get will get in return ${beAmount}BE`}
				open={dialogOpen}
				handler={handleDialog}
			></Dialog>
		</>
	)
}

export default hextechCrafting
