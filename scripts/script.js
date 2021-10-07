const baseURL = 'https://swapi.dev/api/';

const getFilms = async () => {
    try {
        const respond = await fetch(`${baseURL}films/`);
        const data = await respond.json();
        const filmsData = {
            name: [],
            year: []
        }
        for (const x of data.results) {
            filmsData.name.push(x.title);
            filmsData.year.push(parseInt(x.release_date.slice(0,4)));
        }

        return filmsData;
    } catch (error) {
        console.log(error)
    }
}

const getCharacters = async () => {
    try {
        const charactersData = {
            name: [],
            appearances: []
        }
        
        for (let i = 1; i <= 18; i++) {
            const respondCharacter = await fetch(`${baseURL}people/${i}`);
            const dataCharacter = await respondCharacter.json();
            if(!dataCharacter.detail){
                charactersData.name.push(dataCharacter.name)
                charactersData.appearances.push(dataCharacter.films.length)
            }
        }
        return charactersData;
    } catch (error) {
        console.log(error)
    }
    
}

const getGraphics = async () => {
    try {
        const films = await getFilms().then(data => data)
        const characters = await getCharacters().then(data => data)
        const graphics = [films, characters]
        return graphics;
    } catch (error) {
        console.log(error)
    }
} 

getGraphics().then(([films, characters]) => {
    let filmsOptions = {
        low: 1970,
        high: 2010,
        axisY: {
            offset: 60,
            onlyInteger: true,
        }
    }

    let charactersOptions = {
        axisY: {
            offset: 60,
            onlyInteger: true
        }
    }

    new Chartist.Line('#starWarsFilms', {
        labels: films.name,
        series: [films.year]
    }, filmsOptions);

    new Chartist.Bar('#starWarsCharacters', {
        labels: characters.name,
        series: [characters.appearances]
    }, charactersOptions);
});