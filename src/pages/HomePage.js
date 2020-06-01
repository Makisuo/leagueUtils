import React, { Fragment } from 'react'
import { Typography, makeStyles, Container, Paper } from '@material-ui/core'

import { LolApi, Constants } from 'twisted'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		backgroundImage: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg',
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
}))

const Home = (props) => {
	let apiKey = 'RGAPI-2551364f-3275-43d2-a249-f620c937f92c'
	const test = async () => {
		const respond = await fetch(
			'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Makisuo?api_key=RGAPI-2551364f-3275-43d2-a249-f620c937f92c',
			{ mode: 'no-cors' },
		)
		const result = await respond.body
		console.log(result)
		return respond
	}
	console.log(test())
	const classes = useStyles()
	return (
		<Fragment>
			<Container className={classes.root}>
				<Paper className={classes.paper}>
					<Typography variant={'h4'}>{`Welcome!`}</Typography>
					<Typography variant={'body1'}>
						Thank you for using our services and products! You can use the the transentis portal to get
						access to your transentis products, projects and manage diffrent services. Click on the burger
						menu in the left corner and go to projects to get started. Or go to the help page to get more
						advanced help with your products or get in direct contact with us.
					</Typography>
				</Paper>
				<Paper className={classes.paper}>
					<Typography variant={'h4'}>Some basic other Text about Transentis and our mission </Typography>
					<Typography variant={'body1'}>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
						ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
						dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
						sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
						justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
						ipsum dolor sit amet.
					</Typography>
				</Paper>
			</Container>
		</Fragment>
	)
}

export default Home
