import React, { useEffect, useState } from 'react'

import { useStore } from '../stores/mainStore'

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
import CachedIcon from '@material-ui/icons/Cached'

import { CircularProgress } from '../components'

import { getNextChampionLevelUp, getChampionById } from '../utils/API/LeagueAPI'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	content: {
		marginLeft: theme.spacing(2),
	},
	image: {
		border: `1px solid ${theme.palette.primary.main}`,
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

const NextLevelUp = () => {
	const username = useStore((state) => state.username)

	const [masteryData, setMasteryData] = useState(null)
	const [championData, setChampioData] = useState(null)

	const getMasteryData = async (name) => {
		let temp = await getNextChampionLevelUp(name)
		setMasteryData(temp)
		setChampioData(await getChampionById(temp.championId))
	}

	const reloadData = async () => {
		getMasteryData(username)
	}

	useEffect(() => {
		getMasteryData(username)
	}, [username])

	const classes = useStyles()
	return (
		<>
			<Container className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						{championData && (
							<>
								<Grid item xs={5}>
									<img
										className={classes.image}
										src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`}
										alt='Lol'
									/>
								</Grid>
								<Grid item xs={7}>
									<Box display='flex'>
										<Box flexGrow={1}>
											<Typography variant={'h2'}>
												{championData.name}
											</Typography>
											<Typography variant={'subtitle1'}>
												{championData.title}
											</Typography>
										</Box>
										<Box>
											<IconButton onClick={reloadData}>
												<CachedIcon />
											</IconButton>
										</Box>
									</Box>
									<Grid container>
										<Grid item xs={12}>
											<Box
												display='flex'
												justifyContent='center'
												m={1}
												p={1}
											>
												<Box p={1}>
													<CircularProgress
														size={'9rem'}
														thickness={6}
														value={
															(masteryData.championPointsSinceLastLevel /
																(masteryData.championPointsSinceLastLevel +
																	masteryData.championPointsUntilNextLevel)) *
															100
														}
													/>
												</Box>
											</Box>
											<Box
												display='flex'
												justifyContent='flex-start'
												m={1}
												p={1}
											>
												<Box
													className={classes.content}
													p={1}
													border={1}
													borderRadius={'10px'}
													borderColor='secondary.main'
												>
													<List
														className={classes.list}
													>
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
													<List
														className={classes.list}
													>
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
											(masteryData.championPointsSinceLastLevel /
												(masteryData.championPointsSinceLastLevel +
													masteryData.championPointsUntilNextLevel)) *
											100
										}
									/>
								</Grid>
							</>
						)}
					</Grid>
				</Paper>
			</Container>
		</>
	)
}

export default NextLevelUp
