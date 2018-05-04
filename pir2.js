var moment = require('moment'),
  Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both'),
  led = new Gpio(4, 'out');    //#A


console.log(moment().format('LLLL'));  // Start up date & time

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
  console.log(value ? 'there is someone!' : 'not anymore!');
  led.write(value, function() { //#E
    console.log( value ? 'LED on' : 'LED off');
  });
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);
