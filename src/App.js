
import {useState, useEffect, useRef} from 'react'
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import CurrentConditionCard from './CurrentConditionCard'
import HourlySuggestionCard from './HourlySuggestionCard'
import TomorrowConditionCard from './TomorrowConditionCard'


function App() {
  const urlRef =useRef()
const [userRequest, setUserRequest] = useState(undefined)
const [errorMessage, setErrorMessage] = useState(undefined)

const [requestLocation, setRequestLocation] = useState('')
const [requestCurrent, setRequestCurrent] = useState('')
const [requestForecast, setRequestForecast] = useState('')
const [requestTomorrow, setRequestTomorrow] = useState('')




const getForecast = (query)=>{
  const weatherForecastAddress = `http://api.weatherapi.com/v1/forecast.json?key=a4c18e83a5a4402ea38233925220103&q=${query}&days=2&aqi=no&alerts=no`
  fetch(weatherForecastAddress).then((data)=>{
    return data.json()
  }).then((data)=>{
    const realTodayForecast  = data.forecast.forecastday
    const mergedhours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
    const realTomorrowForecast  = data.forecast.forecastday[1].day
   
    setRequestForecast(mergedhours)
    setRequestTomorrow(realTomorrowForecast)
   })
}

const getTemp = (userquery)=>{
  const weatherapiAddress = `http://api.weatherapi.com/v1/current.json?key=a4c18e83a5a4402ea38233925220103&q=${userquery}&aqi=no`
  getForecast(userquery)
  fetch(weatherapiAddress).then((data)=>{
    return data.json()
  }).then((data)=>{
    var currentTemp = data.current.temp_f
    var currentLocation = data.location
    setRequestLocation(currentLocation)
    var currentWeather = data.current
    setRequestCurrent(currentWeather)
    setErrorMessage(``)

     
  }).catch((e)=>{
    setErrorMessage(`INVALID REQUEST '${userRequest}'.TRY AGAIN OR CHECK NETWORK CONNECTION`)
    
  })
}
 

useEffect(()=>{
  
}, [requestLocation, requestCurrent, requestLocation.name, errorMessage])
  return (
    <div className="App">
    <h1>COAT OR NAH?</h1>
    <h6>Brief Tailored forecast for the ladies...</h6>

   <Container >
   
     
   <h3>{errorMessage}</h3>
    <Form.Group>
    <Form
     onSubmit={(e)=>{
       e.preventDefault()
       if(userRequest)
       getTemp(userRequest)
     }}
     style={{marginTop:'2rem', marginBottom:'2rem', marginBottom:'2rem'}}
     >
     
     <Form.Control 
     style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}
     type='text' placeholder={(userRequest)?userRequest:'City, Zipcode'} onChange={(e)=>{
       e.preventDefault()
       setUserRequest(e.target.value)
     }}/>
     <Button 
     style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}
     type = 'submit'>Submit</Button>
     </Form>
     </Form.Group>
     <h4>{(requestLocation.name)?`Showing ${requestLocation.name}`:''}</h4>

     </Container>
    
     <hr/>
    
    {(requestCurrent)
      ?  
    <CurrentConditionCard 
    
    {...requestCurrent}/>
      :
      <p></p>
    }
   
  



{(requestForecast)
  ?

  
  <HourlySuggestionCard {...requestForecast}/>


  :
  <p></p>}


{(requestTomorrow)
  ?
  <>
  <TomorrowConditionCard {...requestTomorrow} />
  </>
  :
  <p></p>}




  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <p>Coded By: Darique Warren</p>
  <p
  ref={urlRef}
  style={{cursor:'pointer', textDecoration:'underline'}}
  onMouseLeave={()=>{
    urlRef.current.style.fontSize ='1rem'
  }}
  onMouseEnter={()=>{
   urlRef.current.style.fontSize ='1.5rem'
  }}
  onClick={()=>{
    window.location.assign('https://www.dariquewarren.com')
  }}
  > dariquewarren.com</p>
    

    </div>
  );
}

export default App;
