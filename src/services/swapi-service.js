export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);
        const body = await response.json();
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}` + `, recieived ${response.status}`);
        }
        return body;
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    getPerson(id) {
        const person = this.getResource(`/people/${id}`);
        return this._transformPlanet(person);
    }

    async getAllPlanet() {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    async getAllStarships(id) {
        const res = await this.getResource(`/starships/${id}`);
        return res.results.map(this._transformPerson);
    }

    getStarship(id) {
        const starship = this.getResource(`/starships/${id}`);
        return this._transformPlanet(starship);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotatiomPeriod: planet.rotatiom_period,
            diameter: planet.diameter
        }
    }
    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,
        }
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            constInCredits: starship.constInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

}
