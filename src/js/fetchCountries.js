const BASE_URL = 'https://restcountries.com/v3.1'
const searchParams  = new URLSearchParams({
    fields: 'name,flags,population,languages,capital'
})

export const fetchCountries = (name) => {
    return fetch(`${BASE_URL}/name/${name}?${searchParams}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('не найдено')
        }
        
    })
}

