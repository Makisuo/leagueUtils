import React, { Fragment, useState, useMemo } from 'react'
import {
	Typography,
	makeStyles,
	Container,
	Paper,
	Grid,
	LinearProgress,
	Box,
	List,
	ListItemText,
} from '@material-ui/core'
import { getSummoner, getNextChampionLevelUp, getChampionById, getMasteryData } from '../utils/LeagueAPI'
import CircularProgress from '../components/CircularProgress'

let currentUser = ''

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		// backgroundImage: 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg)',
		marginTop: theme.spacing(5),
		padding: theme.spacing(4),
	},
	list: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
		borderRadius: 4,
	},
}))

const NextLevelUp = (props) => {
	const [ masteryData, setMasteryData ] = useState(null)
	const [ championData, setChampioData ] = useState(null)

	let { username, previousUsername } = props

	const getMasteryData = async (name) => {
		let temp = await getNextChampionLevelUp(name)
		setMasteryData(temp)
		setChampioData(await getChampionById(temp.championId))
	}
	const getChampionData = async (id) => {
		console.log('hi')
		setChampioData(await getChampionById(id))
	}

	if (username !== currentUser) {
		currentUser = username
		getMasteryData(username).then()
	}
	// if (masteryData !== null && championData === null) {
	// 	getChampionData(masteryData.championId)
	// }
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
															primary='Mastery Level'
															secondary={`Level ${masteryData.championLevel}`}
														/>
														<ListItemText
															primary='Total Mastery Points'
															secondary={`${masteryData.championPoints} points`}
														/>
														<ListItemText
															primary='Mastery Points Until LevelUP'
															secondary={`${masteryData.championPointsUntilNextLevel} points`}
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
