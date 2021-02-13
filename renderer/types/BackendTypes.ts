export interface Summoner {
	id: string
	accountId: string
	puuid: string
	name: string
	profileIconId: number
	revisionDate: number
	summonerLevel: number
}

export interface MasteryOfChampion {
	championId: number
	championLevel: number
	championPoints: number
	lastPlayTime: number
	championPointsSinceLastLevel: number
	championPointsUntilNextLevel: number
	chestGranted: boolean
	tokensEarned: number
	summonerId: string
}
