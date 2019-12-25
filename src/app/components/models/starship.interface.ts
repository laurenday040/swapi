export interface StarshipModel {
	cargo_capacity: number,
	consumables: string,
	cost_in_credits: string,
	created: string,
	crew: string,
	edited: string,
	films: string [],
	hyperdrive_rating: string,
	length: number,
	manufacturer: string,
	max_atmosphering_speed: string,
	MGLT: number,
	model: string,
	passengers: number,
	pilots: string[],
	starship_class: string,
	url: string
    name: string,
    /**
     * local aux property
     */
    stops?:number
}