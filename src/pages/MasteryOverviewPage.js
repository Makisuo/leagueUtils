import React, { Fragment, useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import { getMasteryData } from '../utils/LeagueAPI'
import Table from '../components/Table'

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
	const classes = useStyles()

	const [ data, setData ] = useState(null)
	const [ currentUser, setCurrentUser ] = useState(null)

	let { username } = props

	const getData = async (name) => {
		setData(await getMasteryData(name))
	}

	if (currentUser !== username) {
		setCurrentUser(username)
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
