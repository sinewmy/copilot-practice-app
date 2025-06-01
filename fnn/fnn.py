import numpy as np

class Layer:
    def __init__(self, input_size, output_size, activation):
        self.weights = np.random.randn(output_size, input_size)
        self.biases = np.random.randn(output_size)
        self.activation = activation

    def forward(self, x):
        z = np.dot(self.weights, x) + self.biases
        return self.activation(z)

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class FNN:
    def __init__(self):
        self.layers = []

    def add_layer(self, input_size, output_size, activation):
        self.layers.append(Layer(input_size, output_size, activation))

    def predict(self, x):
        for layer in self.layers:
            x = layer.forward(x)
        return x

if __name__ == "__main__":
    # Example: 2 input neurons, 1 hidden layer (3 neurons, relu), 1 output neuron (sigmoid)
    model = FNN()
    model.add_layer(2, 3, relu)
    model.add_layer(3, 1, sigmoid)

    input_vec = np.array([0.5, -0.2])
    output = model.predict(input_vec)
    print("Input:", input_vec)
    print("Output:", output)
