import React, { Fragment, useState } from 'react'
import {
	Typography,
	makeStyles,
	Container,
	Paper,
	CircularProgress,
	Grid,
	LinearProgress,
	Box,
	List,
	ListItemText,
} from '@material-ui/core'
import { getSummoner, getNextChampionLevelUp, getChampionById, getLowestChampionMastery } from '../utils/LeagueAPI'
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		backgroundImage: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg',
	},
	paper: {
		marginTop: theme.spacing(5),
		padding: theme.spacing(4),
	},
	list: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.secondary.dark,
		borderRadius: 4,
	},
}))

const NextLevelUp = (props) => {
	const [ masteryData, setMasteryData ] = useState(null)
	const [ championData, setChampioData ] = useState(null)

	const getMasteryData = async (name) => {
		setMasteryData(await getNextChampionLevelUp(name))
	}
	const getChampionData = async (id) => {
		setChampioData(await getChampionById(id))
	}
	if (masteryData === null) {
		getMasteryData('Makisuo UwU')
	}
	if (masteryData !== null && championData === null) {
		getChampionData(masteryData.championId)
	}
	console.log(masteryData, championData)
	const classes = useStyles()
	return (
		<Fragment>
			<Container className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						{championData && (
							<Fragment>
								<Grid item xs={5}>
									<img
										src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.name}_0.jpg`}
										alt='Lol'
									/>
								</Grid>
								<Grid item xs={7}>
									<Typography variant={'h2'}>{championData.name}</Typography>
									<Grid container>
										<Grid item xs={12}>
											<Box display='flex' justifyContent='center' m={1} p={1}>
												<Box p={1}>
													<CircularProgress
														className={classes.circularProgress}
														size={'9rem'}
														thickness={6}
														variant='static'
														value={
															masteryData.championPointsSinceLastLevel /
															(masteryData.championPointsSinceLastLevel +
																masteryData.championPointsUntilNextLevel) *
															100
														}
													/>
												</Box>
											</Box>
											<Box display='flex' justifyContent='flex-start' m={1} p={1}>
												<Box p={1}>
													<List className={classes.list}>
														<ListItemText
															primary='Total Mastery Points'
															secondary={masteryData.championPoints}
														/>
														<ListItemText
															primary='Mastery Points Until LevelUP'
															secondary={masteryData.championPointsUntilNextLevel}
														/>
													</List>
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<LinearProgress
										variant='determinate'
										value={
											masteryData.championPointsSinceLastLevel /
											(masteryData.championPointsSinceLastLevel +
												masteryData.championPointsUntilNextLevel) *
											100
										}
									/>
								</Grid>
							</Fragment>
						)}
					</Grid>
				</Paper>
			</Container>
		</Fragment>
	)
}

export default NextLevelUp