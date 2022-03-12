import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const currentTime = new Date()
const currentHour = currentTime.getHours()


function HourlySuggestionCard(props) {
const [userMessage, setUserMessage] = useState(undefined)
const [realHour, setRealHour] = useState(undefined)
  const [forecastStatus, setForecastStatus] = useState('In 1HR')
  
 

  const isCoatNeeded = (temperature)=>{
    
    if(temperature< 49 ){
      setUserMessage('Grab a COAT')
     return 'Grab a COAT'
    }else if(temperature >= 50 && temperature <= 69){
      setUserMessage('Wear a JACKET')
      return 'Wear a JACKET'
    }else if(temperature > 70 && temperature <= 77){
      setUserMessage('Just wear LONG SLEEVE')
      return 'Just wear LONG SLEEVE'
    }else if(temperature > 77 && temperature <=84){
      setUserMessage('Just wear SHORT SLEEVE')
      return 'Just wear SHORT SLEEVE'
    }else if(temperature >= 85){
      setUserMessage('EMERGENCIES ONLY! Dress LIGHT and STAY HYDRATED ')
return 'EMERGENCIES ONLY! Dress LIGHT and STAY HYDRATED '
    }else if(temperature >= 95){
      setUserMessage('STAY HOME! OR Dress LIGHT and DRINK WATER!')
      return 'STAY HOME! OR Dress LIGHT and DRINK WATER!'
    
    } 
      }



useEffect(()=>{
  if(realHour === undefined){
setRealHour(currentHour + 1)
isCoatNeeded(props[currentHour + 1].temp_f)
  }else{
    isCoatNeeded(props[realHour].temp_f)
  }
 
}, [realHour,props])
  return (
  
    <Card style={{border:"6px ridge green", backgroundColor:'green',color:'white',width:'70%',paddingTop:'2rem', marginLeft:'auto', marginRight:'auto',marginBottom:'2rem', height:'auto'}}>
  <h3>{forecastStatus}</h3>
  <Card.Title>{userMessage}</Card.Title>
{
(realHour)
?
<Card.Body>

<img style={{height:'4rem', width:'4rem'}}
src={props[realHour].condition.icon} alt={props[realHour].condition.text}/>

<Card.Text> {props[realHour].condition.text} </Card.Text>
<Card.Text> {props[realHour].temp_f}{'\u00B0'}F</Card.Text>
<Card.Text>Wind: {props[realHour].wind_mph} MPH </Card.Text>
<Card.Text>Rain: {props[realHour].chance_of_rain}%  </Card.Text>
<Card.Text>Humidity: {props[realHour].humidity}% </Card.Text>
<Button
variant='secondary'
  onClick={()=>{
    setForecastStatus('In 1 Hour')

    setRealHour(currentHour + 1)
  }}
  >1Hr</Button>
  <Button
  variant='primary'
  onClick={()=>{
    setForecastStatus('In 2 Hours')

    setRealHour(currentHour + 2)
  }}
  >2HRs</Button>
  <Button
  variant='success'
  onClick={()=>{
    setForecastStatus('In 4 Hours')
    setRealHour(currentHour + 4)
  }}
  >4HRS</Button>
  <Button
  variant='danger'
  onClick={()=>{
    setForecastStatus('In 8 Hours')
    setRealHour(currentHour + 8)
  }}
  >8hrs</Button>
</Card.Body>
:
<p></p>

}





    </Card>
  )
}

export default HourlySuggestionCard