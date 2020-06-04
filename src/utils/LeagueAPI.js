import { getLuminance } from '@material-ui/core'

let apiKey = 'RGAPI-6a0664c7-c99e-4c13-baba-ab0907f44801'

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

export const getLowestChampionMastery = async (name) => {
	const championArray = await getChampionMastery(name)
	const lowestChamp = championArray.reduce((element, currentElement) => {
		let { championPoints } = element
		let { highestChampionPoints } = currentElement

		return highestChampionPoints > championPoints ? element : currentElement
	})
	return lowestChamp
}

export const getNextChampionLevelUp = async (name) => {
	const championArray = await getChampionMastery(name)
	const lowestChamp = championArray.reduce((element, currentElement) => {
		let { championPointsUntilNextLevel } = element
		if (championPointsUntilNextLevel === 0) {
			return currentElement
		}
		if (currentElement.championPointsUntilNextLevel === 0) {
			return element
		}
		return championPointsUntilNextLevel < currentElement.championPointsUntilNextLevel ? element : currentElement
	})
	return lowestChamp
}
