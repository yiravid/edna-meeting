import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import { ssml } from 'alexa-ssml';
import fetch from 'isomorphic-fetch';

@Skill
export default class Ednameeting {

  @Launch
  @Intent('StartMeetingIntent')
  start({ meetingRoom = 'Red Ventures' }) {
    console.log('Making a request...');
    const url = 'http://ednameeting.herokuapp.com/start-meeting/' + meetingRoom;
    console.log('From: ', url);
    
    return fetch(url).then(response => response.json()).then(({payload}) => {
      console.log(payload);
      return say(`Welcome to Edna Meeting, Your meeting in ${meetingRoom} is starting now.`)
        .card({ title:'Ednameeting', content:`Welcome to Edna Meeting, You meeting in ${meetingRoom} is starting now.`});
    });
  }
  
  @Intent('EndMeetingIntent')
  end() {
    console.log('Making a request...');
    const url = 'http://ednameeting.herokuapp.com/end-meeting/';
    console.log('From: ', url);
    
    return fetch(url).then(response => response.json()).then(({payload}) => {
      console.log(payload);
      return say(payload)
        .card({ title:'Ednameeting', content: payload});
    });
  }
  
  @Intent('NearbyRoomIntent')
  nearby() {
    console.log('Making a request...');
    const url = 'http://ednameeting.herokuapp.com/new-room/';
    console.log('From: ', url);
    
    return fetch(url).then(response => response.json()).then(() => {
      return say('It looks like Red Velvet will be open in 5 minutes, I went ahead and booked this room for you.')
        .card({ title:'Ednameeting', content: 'It looks like Red Velvet will be open in 5 minutes, I went ahead and booked this room for you.'});
    });
  }
  
  @Intent('ProTipIntent')
  protips() {
    
  let tips = [
      'The best meetings have a clear agenda.',
      'The best meetings have a clear goal.',
      'The best meetings happen when everyone leaves with clear action items.',
      'The best meetings are less than 30 minutes or 60 minutes. Meetings can be shorter than you think.',
      'The best meetings have a leader who keeps everyone on topic. Limit small talk and off topic discussions.',
      'The best meetings have a clear definition of when the meeting is over.',
      'The best meetings have fewer people than you think. Are only the most important people present?',
      'The best meetings happen when everyone is engaged. Try to limit distractions from your phone or laptop.'
    ];
    
    let randomTipIndex = Math.floor(Math.random() * tips.length);

    let randomProTip = tips[randomTipIndex];
    
    return say(randomProTip).card({ title:'Edna Meeting Pro Tip', content: randomProTip}).build();
  }
  
  @Intent('InvitePersonToMeetingIntent')
  inviteToMeeting({ person = 'Tim Johnson' }) {
    console.log('Making a request...');
    const url = 'http://ednameeting.herokuapp.com/invite/' + person;
    console.log('From: ', url);
    
    return fetch(url).then(response => response.json()).then(({ payload }) => {
      return say(payload)
        .card({ title:'Ednameeting', content: payload});
    });
  }
  
  @Intent('ShowMeetingListAttendees')
  meetingAttendees() {
    const url = 'http://ednameeting.herokuapp.com/meeting-list/';
    
    return fetch(url).then(response => response.json()).then(({payload}) => {      
      console.log(payload);
      let response = '';
      for(let attendee of payload) {
        response += attendee + ', ';
      }      
      response += ' are currently in your meeting.';
      
      return say(response)
        .card({ title:'Edna Meeting Meeting List', content: response});
    });
  }
  
  @Intent('AMAZON.HelpIntent')
  help() {
    return ask('I say hello to people. Who should I say hello to?').reprompt('Who should I say hello to?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return say(<speak>Goodbye!</speak>);
  }
}
