// Simple Feedforward Neural Network (FNN) implementation in TypeScript
// Supports forward propagation with fully connected layers and ReLU/Sigmoid activations

export type Activation = 'relu' | 'sigmoid';

function relu(x: number): number {
    return Math.max(0, x);
}

function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}

function activate(x: number, activation: Activation): number {
    if (activation === 'relu') return relu(x);
    if (activation === 'sigmoid') return sigmoid(x);
    return x;
}

export class Layer {
    weights: number[][];
    biases: number[];
    activation: Activation;

    constructor(inputSize: number, outputSize: number, activation: Activation) {
        // Initialize weights and biases randomly
        this.weights = Array.from({ length: outputSize }, () =>
            Array.from({ length: inputSize }, () => Math.random() * 2 - 1)
        );
        this.biases = Array.from({ length: outputSize }, () => Math.random() * 2 - 1);
        this.activation = activation;
    }

    forward(input: number[]): number[] {
        return this.weights.map((row, i) => {
            const sum = row.reduce((acc, w, j) => acc + w * input[j], 0) + this.biases[i];
            return activate(sum, this.activation);
        });
    }
}

export class FNN {
    layers: Layer[] = [];

    addLayer(inputSize: number, outputSize: number, activation: Activation) {
        this.layers.push(new Layer(inputSize, outputSize, activation));
    }

    predict(input: number[]): number[] {
        return this.layers.reduce((inp, layer) => layer.forward(inp), input);
    }
}
