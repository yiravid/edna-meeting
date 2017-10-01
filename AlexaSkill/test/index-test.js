import test from 'ava';
import { handler as Skill } from '..';
import { Request } from 'alexa-annotations';

// test('LaunchRequest', t => {
//   const event = Request.launchRequest().build();
// 
//   return Skill(event).then(response => {
//     t.deepEqual(response, {
//       version: '1.0',
//       response: {
//         shouldEndSession: true,
//         outputSpeech: { type: 'PlainText', text: 'Ednameeting launched!' }
//       }
//     });
//   });
// });

test('StartMeetingIntent', t => {
  const event = Request.intent('AMAZON.HelpIntent').build();

  return Skill(event).then(response => {
    t.deepEqual('test', 'test');
    console.log(response);
  });
});
