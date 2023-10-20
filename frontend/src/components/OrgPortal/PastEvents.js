import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './OrgPortal.css';

const logo = require("../Login/loginPic.png");


function PastEvents(props)
{

    const [eventCards, setEventCards] = useState();

    function openEventModal(id){
        props.setEventID(id);
        props.setOpenEvent(true);
    }

    let events = [];

    function eventIsPast(date){
        return new Date().toISOString() > new Date(date).toISOString();
    }

    async function getPastEvents(){
        const organizationID = "12345";
        
        let url = buildPath(`api/searchOrganization?organizationID=${organizationID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        console.log(res);

        url = buildPath(`api/searchEvent?organizationID=${organizationID}`);

        response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        res = JSON.parse(await response.text());

        console.log(res);    

        events = [];

        for(let event of res)
            if(eventIsPast(event.date))
                events.push(<Event name={event.name} date={event.date} id={props.eventID}/>)      

        let content = <div className="cards d-flex flex-row cardWhite card-body">{events}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Your Past Events</h1>
    }

    function Event(props){
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openEventModal(props.id)}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={logo}
                        />
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.name}
                            </Typography>
                            <Typography className="eventDate" variant="body2" color="text.secondary">
                                {new Date(props.date).toISOString().split("T")[0]}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </div>
        )
    }

    function Events(){
        return (
            <div className="eventsCard card">       
                {eventCards}
            </div>
        )
    }

    useEffect(()=>{
        getPastEvents();
    },[])

    return(
     <div>
        <EventHeader/>
        <div>
            <Events/>
        </div>
     </div>
    );
};

export default PastEvents;
