let apiKey = 'RGAPI-c6f87d9a-2ce3-4669-8e61-10792bdef265'

export const getSummoner = async (name) => {
	const respond = await fetch(
		`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`,
	)
	const result = await respond.json()
	console.log(result)
	if(result.status) {
		return
	}
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

//Frontendrequest
export const getChampionById = async (id) => {
	const response = await fetch('http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion.json')
	const { data } = await response.json()
	for (let i in data) {
		if (parseInt(data[i].key) === id) {
			return data[i]
		}
	}
}

export const getAllChampions = async () => {
	const respond = await fetch(`http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion.json`)
	const result = await respond.json()
	return result.data
}
