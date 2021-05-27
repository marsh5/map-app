// 'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
    //private class field
    #map;
    #mapEvent;

    constructor(){
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', () => {
            inputElevation.closest('.form__row').classList.toggle('form__row-hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row-hidden');
            
        });
    }

    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), 
            () =>{
            alert('Could not get your position')
            })
        }
    }

    _loadMap(position){
        const { latitude, longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

        const coords = [latitude, longitude];

        //leaflet library
        this.#map = L.map('map').setView(coords, 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        L.marker(coords).addTo(this.#map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField(){

    }

    _newWorkout(e){
        e.preventDefault()
            
        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        
        
        //display marker
        const { lat, lng } = mapEvent.latlng;
    
        L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup({
            maxWidth: 250,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
    
        }))
        .setPopupContent('Workout')
        .openPopup();
    
    }
}

const app = new App();


