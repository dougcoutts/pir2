var Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both'),
  led = new Gpio(4, 'out');    //#A

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
  console.log(value ? 'there is someone!' : 'not anymore!');
  led.write(value, function() { //#E
    console.log( value ? 'the LED is on' : 'the LED is off');
  });
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize pin 17 in input mode, 'both' means we want to handle both rising and falling interrupt edges
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
