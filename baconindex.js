// vim:sw=2:ts=2:
var Bacon = require('baconjs')
var Immutable = require('immutable')

var updateCityStream = new Bacon.Bus()
var updateCountryStream = new Bacon.Bus()
var updateLocationStream = new Bacon.Bus()

var location = Bacon.update(
  Immutable.Map({ city: 'Somewhere', country: 'Finland' }),
  [updateCityStream], (state, city) => state.set('city', city),
  [updateCountryStream], (state, country) => state.set('country', country),
  [updateLocationStream], (state, {city,country}) => state.merge({city, country})
)

function demo() {
  var l = console.log

  location.onValue((state) => {
    l('The state is now', state)
  })

  l('Setting city to Helsinki')
  updateCityStream.push('Helsinki')

  l('Setting location to Ritsem, Sweden')
  updateLocationStream.push({city: 'Ritsem', country: 'Sweden'})

  l('Setting city to Espoo')
  updateCityStream.push('Espoo')
}

module.exports = { location, updateCityStream, updateCountryStream, updateLocationStream }

if (!module.parent) demo()
