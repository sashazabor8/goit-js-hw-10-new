import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
    width: '500px',
    clickToClose: true,
    fontSize: '20px'
}

function notifyError () {
    Notify.failure('Oops, there is no country with that name', options)
}

function notifyInfo () {
    Notify.info('Too many matches found. Please enter a more specific name.', options);
}

export {notifyError,notifyInfo}