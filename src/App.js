// import React from 'react';
import React, {useState, useEffect, createContext} from 'react';
// import routes & route
import {Routes, Route} from 'react-router-dom'
// import Components
import Header from './components/Header'
import Footer from './components/Footer'
// import Pages
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'

// import data
import {housesData} from './data'
// create context
export const HouseContext = createContext(); 


const App = () => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)')
  const [loading, setLoading] = useState(false)
  
  // return all countries
  useEffect(()=>{
    const allCountries = houses.map((house) => {
      return house.country
    })

    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

    // set countries state
    setCountries(uniqueCountries)
  }, [])

  // return all properties
  useEffect(()=>{
    const allProperties = houses.map((house) => {
      return house.type
    })

    // remove duplicates
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]

    // set properties state
    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {
    // set loading
    setLoading(true)
    // create a function that checks if the string uncludes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('any')
    }
    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(' ')[0])
    // get second value of price which is the maximum price & parse it to number
    const maxPrice = parseInt(price.split(' ')[2])

    const newHouse = housesData.filter(house => {
      const housePrice = parseInt(house.price)
      // if all values are selected
      if(house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice){
        return house
      }

      // if all values are selected
      if(isDefault(country) && isDefault(property) && isDefault(price)){
        return price
      }

      // if country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country
      }

      // if property is not default
      if(isDefault(country) && !isDefault(property) && isDefault(price)){
        return house.type === property
      }

      // if price is not default
      if(isDefault(country) && isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house
        }
      }

      // if country & property is not default
      if(!isDefault(country) && !isDefault(property)){
        return house.country === country && house.type === property
      }

      // if country & price is not default
      if(!isDefault(country) && isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.country === country
        }
      }

      // property and price is not default
      if(isDefault(country) && !isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.type === property
        }
      }

    })
    
    setTimeout(()=>{
      return newHouse.length < 1 ? setHouses([]) : setHouses(newHouse), setLoading(false)
    }, 1000)
  }

  return(
    // I used Arbitrary value for "Header-className" 
    <div className='max-w-[1440px] mx-auto bg-white'>
      
      <HouseContext.Provider value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick
      }}>
        <Header />

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/property/:id' element={<PropertyDetails />}/>
        </Routes>

        <Footer />

      </HouseContext.Provider>
    </div>
  );
};

export default App;
