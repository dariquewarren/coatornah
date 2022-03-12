
import {useState, useEffect, useRef} from 'react'
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
  const weatherForecastAddress = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${query}&days=2&aqi=no&alerts=no`
  fetch(weatherForecastAddress).then((data)=>{
    return data.json()
  }).then((data)=>{
    const mergedhours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
    const realTomorrowForecast  = data.forecast.forecastday[1].day
   
    setRequestForecast(mergedhours)
    setRequestTomorrow(realTomorrowForecast)
   })
}

const getTemp = (userquery)=>{
 if(userquery){
  const weatherapiAddress = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${userquery}&aqi=no`
  getForecast(userquery)
  fetch(weatherapiAddress).then((data)=>{
    return data.json()
  }).then((data)=>{
    var currentLocation = data.location
    setRequestLocation(currentLocation)
    var currentWeather = data.current
    setRequestCurrent(currentWeather)
    setErrorMessage(``)

     
  }).catch((e)=>{
    window.location.reload('blank_')
  })
 }else{
   return
 }
}
 

useEffect(()=>{
}, [requestLocation, requestCurrent, requestLocation.name, errorMessage])
  return (
    <div className="App">
    <h1>COAT OR NAH?</h1>
    <h6>Tailored forecast for the ladies...</h6>

   <Container >
   
     
   <h3>{errorMessage}</h3>
    <Form.Group>
    <Form
     onSubmit={(e)=>{
       e.preventDefault()
       if(userRequest){
        getTemp(userRequest)
       }else{
return
       }
       

       
     }}
     style={{marginTop:'2rem', marginBottom:'2rem'}}
     >
     
     <Form.Control 
     style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}
     type='text' placeholder='City, Zipcode' onChange={(e)=>{
       e.preventDefault()

       setUserRequest(e.target.value)
     }}/>
     <Button 
     disabled={(!userRequest)}
     style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}
     type = 'submit'>Submit</Button>
     </Form>
     </Form.Group>

     </Container>
    
     <hr/>
     <h4>{(requestLocation.name)?`${requestLocation.name}, ${requestLocation.region}, ${requestLocation.country}`:''}</h4>

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
