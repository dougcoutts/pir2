var moment = require('moment'),
  Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both'),
  led = new Gpio(4, 'out'),
  eventTime = moment().format();    //#A


console.log('Start up at: ' + eventTime);  // Start up date & time

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
  console.log(value ? 'there is someone!' : 'not anymore!');
  led.write(value, function() { //#E
    eventTime = moment().format();
    console.log( value ? 'LED on: ' + eventTime : 'LED off: ' + eventTime);
  });
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);
