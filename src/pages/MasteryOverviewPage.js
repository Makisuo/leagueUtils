import React, { Fragment, useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import { getMasteryData } from '../utils/LeagueAPI'
import Table from '../components/Table'

let currentUser

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	paper: {
		marginBottom: theme.spacing(1),
		padding: theme.spacing(4),
	},
}))

const MasteryOverview = (props) => {
	console.log(props)

	const classes = useStyles()

	const [ data, setData ] = useState(null)

	const { username, previousUsername } = props

	const getData = async (name) => {
		setData(await getMasteryData(name))
		currentUser = username
	}

	if (data === null && previousUsername !== username) {
		getData(username)
	}
	return (
		<Fragment>
			<Container className={classes.root}>
				<Table data={data} />
			</Container>
		</Fragment>
	)
}

export default MasteryOverview
