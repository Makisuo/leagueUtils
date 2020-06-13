import React, { Fragment, useState } from 'react'
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
	IconButton,
} from '@material-ui/core'
import { getSummoner, getNextChampionLevelUp, getChampionById, getMasteryData } from '../utils/LeagueAPI'
import CircularProgress from '../components/CircularProgress'

import CachedIcon from '@material-ui/icons/Cached'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	content: {
		marginLeft: theme.spacing(2),
	},
	paper: {
		// backgroundImage: 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg)',
		marginTop: theme.spacing(5),
		padding: theme.spacing(4),
		minHeight: 400,
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
	const [ currentUser, setCurrentUser ] = useState(null)

	let { username } = props

	const getMasteryData = async (name) => {
		let temp = await getNextChampionLevelUp(name)
		setMasteryData(temp)
		setChampioData(await getChampionById(temp.championId))
	}

	const reloadData = async () => {
		getMasteryData(currentUser)
	}

	if (username !== currentUser) {
		setCurrentUser(username)
		getMasteryData(username)
	}

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
										src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`}
										alt='Lol'
									/>
								</Grid>
								<Grid item xs={7}>
									<Box display='flex'>
										<Box flexGrow={1}>
											<Typography variant={'h2'}>{championData.name}</Typography>
										</Box>
										<Box>
											<IconButton onClick={reloadData}>
												<CachedIcon />
											</IconButton>
										</Box>
									</Box>
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
												<Box
													className={classes.content}
													p={1}
													border={1}
													borderRadius={'10px'}
													borderColor='secondary.main'
												>
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
												<Box
													p={1}
													border={1}
													borderColor='secondary.main'
													borderRadius={'10px'}
													className={classes.content}
												>
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
