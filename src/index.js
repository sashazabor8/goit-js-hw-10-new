import './css/styles.css';
import {fetchCountries} from'./js/fetchCountries.js';
import {notifyError,notifyInfo} from './js/notification.js'
import countrieslist from './hbs/countrieslist.hbs'
import currentCountryInfo from './hbs/currentCountryInfo.hbs'
import languagesCurrentCountry from './hbs/languagesCurrentCountry.hbs'

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('[id="search-box"]'),
    ul: document.querySelector('.country-list'),
    div: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput(e) {
    const nameUserCountry = e.target.value.trim()
    if(nameUserCountry === '') {
        clearPage();
        return
    }
    
    fetchCountries(nameUserCountry)
    .then(country => {
        if (country.length >= 10) {
            clearPage();
            notifyInfo()
        }
        if (country.length > 1 && country.length < 10) {
            clearPage()
            renderMarkupCountrieslist(country)
        }
        if (country.length === 1) {
            clearPage()
            renderMarkupCurrentCountry(country)
        }
    }).catch(error => {
        clearPage();
        notifyError()
    });
}

function clearPage () {
    refs.ul.innerHTML = '';
    refs.div.innerHTML = '';
}

function renderMarkupCountrieslist(countries) {
    const markup = countrieslist(countries);
    refs.ul.innerHTML = markup;
}

function renderMarkupCurrentCountry(country) {
    const markup = currentCountryInfo(country);
    const languagesArray = Object.values(country[0].languages)
    const languagesListMarkup= languagesCurrentCountry(addCommas(languagesArray))
    refs.div.innerHTML = markup;
    refs.div.insertAdjacentHTML('beforeend',languagesListMarkup)
}

function addCommas (arr) {
    return arr.map((item, index) => {
        if (index === arr.length -1) {
            return item;
        }
        return item += ','
    })
}
