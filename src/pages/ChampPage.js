import React, { useState } from 'react'
import {
	Avatar,
	Box,
	Container,
	Divider,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	ExpansionPanel,
	Grid,
	List,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { getChampionIdByName, getMasteryDataOfChampion, getChampionById, getChampionByName } from '../utils/LeagueAPI'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
	image: {
		// borderRight: `0.1em solid ${theme.palette.divider}`,
		// paddingRight: theme.spacing(3),
	},
	padding: {
		paddingBottom: theme.spacing(3),
	},
}))

const ChampPage = (props) => {
	const classes = useStyles()
	const [ currChampion, setCurrChampion ] = useState(null)
	const [ champion, setChampion ] = useState('Annie')
	const [ championData, setChampionData ] = useState(null)
	const [ masteryData, setMasteryData ] = useState(null)

	const getChampionId = async () => {
		setMasteryData(await getMasteryDataOfChampion(props.username, champion))
		setChampionData(await getChampionByName(champion))
	}

	if (champion !== currChampion) {
		if (props.location.state) {
			setChampion(props.location.state)
		}
		setCurrChampion(champion)
		getChampionId()
	}
	console.log(championData)
	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={1} justify='center'>
					<Grid item>
						<Avatar src={`http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/${champion}.png`} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h5' align='center'>
							{champion}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={5}>
						<img
							className={classes.image}
							src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${currChampion}_0.jpg`}
							alt=''
						/>
					</Grid>
					<Grid item xs={7}>
						<Typography variant='h4'>Overview</Typography>
						<Divider />
						<Box className={classes.padding} />
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>Champ Overview</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								{championData && (
									<List className={classes.list}>
										<ListItemText primary='Role' secondary={`${championData.roles}`} />
										<ListItemText
											primary='Crowd Control'
											secondary={`${championData.playstyleInfo.crowdControl}`}
										/>
										<ListItemText
											primary='Damage'
											secondary={`${championData.playstyleInfo.damage}`}
										/>
										<ListItemText
											primary='Tankiness'
											secondary={`${championData.playstyleInfo.durability}`}
										/>
										<ListItemText
											primary='Mobility'
											secondary={`${championData.playstyleInfo.mobility}`}
										/>
										<ListItemText
											primary='Utilitly'
											secondary={`${championData.playstyleInfo.utility}`}
										/>
										<ListItemText
											primary='Dificulty'
											secondary={`${championData.tacticalInfo.difficulty}`}
										/>
									</List>
								)}
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>Personal Stats</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
									ex, sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>Mastery Stats</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
									ex, sit amet blandit leo lobortis eget.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	)
}

export default ChampPage
