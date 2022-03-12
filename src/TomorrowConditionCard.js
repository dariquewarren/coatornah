import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function TomorrowConditionCard(props) {
const [userMessage, setUserMessage] = useState(undefined)
const isCoatNeeded = (temperature)=>{
    
  if(temperature< 49 ){
    setUserMessage('Grab a COAT')
  return 'coat'
  }else if(temperature >= 50 && temperature <= 69){
    setUserMessage('Wear a JACKET')
    return 'jacket'
  }else if(temperature > 70 && temperature <= 77){
    setUserMessage('Just wear LONG SLEEVE')
    return 'long sleeve'
  }else if(temperature > 77 && temperature <=84){
    setUserMessage('Just wear SHORT SLEEVE')
    return 'short sleeve'
  }else if(temperature >= 85){
    setUserMessage('EMERGENCIES ONLY! Dress LIGHT and STAY HYDRATED ')

  }else if(temperature >= 95){
    setUserMessage('STAY HOME! OR Dress LIGHT and DRINK WATER! ')
    return 'stay home'
  
  } 
    }

    useEffect(()=>{
      isCoatNeeded(props.avgtemp_f) 

      
    },[props])

  return (
    <Card style={{border:"6px ridge green",backgroundColor:'green', color:"white",  width:'70%',paddingTop:'2rem', marginLeft:'auto', marginRight:'auto',marginBottom:'2rem', height:'auto'}}>
    <h3>Tomorrow</h3>
    <Card.Title>{userMessage}</Card.Title>
   <Card.Body>
   
   <img style={{height:'4rem', width:'4rem'}} src={props.condition.icon} alt={props.condition.text}/>
   <Card.Text>
   
   {props.condition.text}</Card.Text>
   <Card.Text>Low: {props.mintemp_f}{'\u00B0'}F</Card.Text>
   <Card.Text>High: {props.maxtemp_f}{'\u00B0'}F </Card.Text>
   <Card.Text>Rain: {props.daily_chance_of_rain}% </Card.Text>
   <Card.Text>Humidity: {props.avghumidity}% </Card.Text>
   <Card.Text>Wind {props.maxwind_mph} MPH</Card.Text>
  
  
   </Card.Body>


    
    
    </Card>
  )
}

export default TomorrowConditionCard