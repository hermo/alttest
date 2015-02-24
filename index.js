// vim:sw=2:ts=2:
var Alt = require('alt')
var alt = new Alt()

class LocationActions {
  constructor() {
    this.generateActions('updateCity', 'updateCountry')
  }

  updateLocation(city, country) {
    this.dispatch({city, country})
  }
}

var locationActions = alt.createActions(LocationActions)

class LocationStore {
  constructor() {
    this.bindActions(locationActions)

    this.city = 'Somewhere'
    this.country = 'Finland'
  }

  onUpdateLocation(obj) {
    var { city, country } = obj
    this.city = city
    this.country = country
  }

  onUpdateCity(city) {
    this.city = city
  }

  onUpdateCountry(country) {
    this.country = country
  }
}

var locationStore = alt.createStore(LocationStore)

locationStore.listen((data) => {
  console.log(' --> store changed', data)
})


function demo() {
  var l = console.log
  var logState = () => l('State is now', locationStore.getState())

  logState()

  l('Setting city to Helsinki')
  locationActions.updateCity('Helsinki')

  l('Setting location to Ritsem, Sweden')
  locationActions.updateLocation('Ritsem', 'Sweden')

  l('Taking snapshot')
  alt.takeSnapshot()

  l('Setting city to Espoo')
  locationActions.updateCity('Espoo')

  logState()

  l('Espoo is not in Sweden, rollback!')
  alt.rollback()

  logState()

  l('Reset to initial settings')
  alt.flush()

  logState()
}

module.exports = { locationActions, locationStore, alt}

if (!module.parent) demo()
