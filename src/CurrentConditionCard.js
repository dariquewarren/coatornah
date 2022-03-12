import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function CurrentConditionCard(props) {
const [showDetails, toggleDetails] = useState(false)
const [userMessage, setUserMessage] = useState(undefined)

const handleDecision = (temperature)=>{
    
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
      handleDecision(props.temp_f)

      console.log('CurrentConditionCard',props)
    },[props])
  return  (
    


    <Card
    style={{border:'6px ridge green',backgroundColor:'green',color: 'white', width:'70%', marginLeft:'auto', marginRight:'auto',marginBottom:"2rem",paddingTop:'2rem',height:'auto'}}
    >
    <Card.Title>{userMessage}
</Card.Title>
  {(showDetails)
    ?
    <Card.Body
    >
   
    <h3>Currently</h3>

    <img
     style={{height:'4rem', width:'4rem'}}
     src={props.condition.icon}
     alt={props.condition.text}
    />
    <Card.Text>{props.condition.text}</Card.Text>
    <Card.Text>Temp: {props.temp_f}{'\u00B0'}F</Card.Text>
    
    <Card.Text>Wind: {props.wind_mph} MPH</Card.Text>
    <Card.Text>Rain: {props.precip_in} Inches</Card.Text>
    <Card.Text>Humidity: {props.humidity}%</Card.Text>
    

    </Card.Body>  
    :
    <Card.Body >
    <h3>Currently</h3>
    
    <Card.Img src={props.condition.icon} alt={props.condition.text} style={{height:'5rem', width:'5rem'}}/>
    <Card.Title>{props.condition.text}</Card.Title>
    <Card.Text>{props.temp_f}{'\u00B0'}F With {props.wind_mph} MPH Winds and {props.humidity}% Humidity </Card.Text>
    
    <h3>Recommendation: {userMessage} </h3>
    
    </Card.Body>
}


<Button
    variant='success'
    onClick={()=>toggleDetails(!showDetails)}
    >{(showDetails)?'Show Brief Version':'Show Detailed Version'}</Button>
    </Card>
    
  )
}

export default CurrentConditionCard