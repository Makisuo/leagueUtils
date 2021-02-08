import React, { useState } from 'react'
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
			LCU.disenchantChampions(championsToDisenchant)
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
								Champion Shard Crafting
							</Typography>
						</Box>
						<Box display='flex' flexDirection='row'>
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
							<Box maxWidth='50%'>
								<Typography variant='h6' color='textSecondary'>
									Usage
								</Typography>
								<Typography>
									This tools help you disenchant your champion
									shards faster and more reliable than doing
									it by hand. In the standard mode (all
									Checkboxes unchecked) you will disenchant
									every champion shard of every champion you
									already have level 7 and/or have more than 2
									(1 for Level 6) left over. With the options
									on the left you have the possibility to
									disenchant all, disenchant champions you
									don't own or only keep champion shard for
									those you already have Level 5 or 6
								</Typography>
							</Box>
						</Box>
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
