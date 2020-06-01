import { getLuminance } from '@material-ui/core'

let apiKey = 'RGAPI-2551364f-3275-43d2-a249-f620c937f92c'

export const getSummoner = async (name) => {
	const respond = await fetch(
		`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`,
	)
	const result = await respond.json()
	return result
}

export const getChampionMastery = async (name) => {
	const { id } = await getSummoner(name)
	const respond = await fetch(
		`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${apiKey}`,
	)
	const result = await respond.json()
	return result
}

export const getLowestChampionMastery = async (name) => {}

export const getNextChampionLevelUp = async (name) => {
	const championArray = await getChampionMastery(name)
	console.log(championArray)
	const test = championArray.reduce((element, currentElement) => {
		let { championPointsUntilNextLevel } = element
		if (championPointsUntilNextLevel === 0) {
			return currentElement
		}
		if (currentElement.championPointsUntilNextLevel === 0) {
			return element
		}
		return championPointsUntilNextLevel < currentElement.championPointsUntilNextLevel ? element : currentElement
	})
	console.log(test)
}
