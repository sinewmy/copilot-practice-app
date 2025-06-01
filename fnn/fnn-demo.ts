import { FNN } from './fnn';

// Example: 2 input neurons, 1 hidden layer (3 neurons, relu), 1 output neuron (sigmoid)
const model = new FNN();
model.addLayer(2, 3, 'relu'); // input layer to hidden layer
model.addLayer(3, 1, 'sigmoid'); // hidden layer to output

// Example input
const input = [0.5, -0.2];
const output = model.predict(input);

console.log('Input:', input);
console.log('Output:', output);
