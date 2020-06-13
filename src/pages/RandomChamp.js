import React, { Fragment, useState } from 'react'
import {
	makeStyles,
	Box,
	Button,
	Container,
	Paper,
	List,
	ListItem,
	ListItemText,
	Typography,
	Grid,
} from '@material-ui/core'
import { getRandomChampion } from '../utils/LeagueAPI'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	content: {
		marginRight: theme.spacing(6),
	},
	image: {
		border: `1px solid ${theme.palette.primary.main}`,
	},
	paper: {
		marginTop: theme.spacing(5),
		padding: theme.spacing(4),
		minHeight: 400,
	},
	list: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
		borderRadius: 4,
		height: '100%',
		width: 200,
	},
	button: {
		width: '40%',
		height: '40px',
	},
}))

const Randomize = (props) => {
	const classes = useStyles()

	const [ intialCall, setIntialCall ] = useState(true)
	const [ championData, setChampionData ] = useState(null)

	const getRandom = async () => {
		setChampionData(await getRandomChampion())
	}

	if (intialCall === true) {
		setIntialCall(false)
		getRandom()
	}

	console.log(championData)

	let { username } = props

	return (
		<Fragment>
			<Container className={classes.root}>
				{championData && (
					<Paper className={classes.paper}>
						<Grid container spacing={1}>
							<Grid item xs={5}>
								<img
									className={classes.image}
									src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championData.id}_0.jpg`}
									alt='Lol'
								/>
							</Grid>
							<Grid item xs={7}>
								<Box display='flex'>
									<Box>
										<Typography variant={'h2'}>{championData.name}</Typography>
										<Typography variant={'h6'}>{championData.title}</Typography>
									</Box>
								</Box>
								<Grid container>
									<Grid item xs={12}>
										<Box display='flex' justifyContent='flex-start' m={1} p={1}>
											<Box
												p={1}
												border={1}
												borderColor='secondary.main'
												borderRadius={'10px'}
												className={classes.content}
											>
												<List className={classes.list}>
													<ListItemText primary='About' secondary={`${championData.blurb}`} />
												</List>
											</Box>
											<Box
												className={classes.content}
												p={1}
												border={1}
												borderRadius={'10px'}
												borderColor='secondary.main'
											>
												<List className={classes.list}>
													<ListItemText primary='Role' secondary={`${championData.tags}`} />
													<ListItemText
														primary='Type'
														secondary={`${championData.partype}`}
													/>
													<ListItemText
														primary='Attack'
														secondary={`${championData.info.attack}`}
													/>
													<ListItemText
														primary='Defense'
														secondary={`${championData.info.defense}`}
													/>
													<ListItemText
														primary='Magic'
														secondary={`${championData.info.magic}`}
													/>
													<ListItemText
														primary='Difficulty'
														secondary={`${championData.info.difficulty}`}
													/>
												</List>
											</Box>
										</Box>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Box display='flex' justifyContent='center'>
									<Button
										className={classes.button}
										variant='contained'
										onClick={getRandom}
										color='primary'
									>
										Get Random
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Paper>
				)}
			</Container>
		</Fragment>
	)
}

export default Randomize
