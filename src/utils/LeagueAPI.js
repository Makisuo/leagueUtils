let apiKey = 'RGAPI-d4f86ca5-50f5-432c-8bd9-9d8803bb1c81'

export const getSummoner = async (name) => {
	const respond = await fetch(
		`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`,
	)
	const result = await respond.json()
	return result
}

export const getMasteryData = async (name) => {
	const { id } = await getSummoner(name)
	const respond = await fetch(
		`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${apiKey}`,
	)
	const result = await respond.json()
	return result
}

export const getAllChampions = async () => {
	const respond = await fetch(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`)
	const result = await respond.json()
	console.log(result)
	return result
}

export const getLowestChampionMastery = async (name) => {
	const championArray = await getMasteryData(name)
	const lowestChamp = championArray.reduce((element, currentElement) => {
		let { championPoints } = element
		let { highestChampionPoints } = currentElement

		return highestChampionPoints > championPoints ? element : currentElement
	})
	return lowestChamp
}

export const getNextChampionLevelUp = async (name) => {
	const championArray = await getMasteryData(name)
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

export const getChampionById = async (id) => {
	const response = await fetch('http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion.json')
	const { data } = await response.json()
	for (let i in data) {
		if (parseInt(data[i].key) === id) {
			return data[i]
		}
	}
}
