import brain from "brain.js";
import normalize from "normalize-number";

const min = 0;
const max = 10;
const norm = value => normalize([min, max], value);
const denorm = value => value * (max - min);
const denormOut = value => value * (max - min) * (max - min);

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [5],
  activation: "sigmoid"
};

const net = new brain.NeuralNetwork(config);

const testCase = [];
for (let a = min; a < max; a++) {
  for (let b = min; b < max; b++) {
    const normA = norm(a);
    const normB = norm(b);
    testCase.push({
      input: [normA, normB],
      output: [normA * normB]
    });
  }
}

net.train(testCase, {
  iterations: 80000,
  errorThresh: 0.00005,
  log: true,
  logPeriod: 2000
});

const testInputs = [];
for (let a = 1; a < 10; a++) {
  testInputs.push([norm(a), norm(5)]);
}

const outputs = testInputs.map(input => net.run(input));
const errors = outputs.map((output, index) =>
  (
    Math.abs(
      (denormOut(output[0]) -
        denorm(testInputs[index][0]) * denorm(testInputs[index][1])) /
        denormOut(output[0])
    ) * 100
  ).toFixed(2)
);

console.log(' =============== ');
console.log(' === results === ');

outputs.forEach((output, index) => {
  console.log(
    `${denorm(testInputs[index][0])} * ${denorm(
      testInputs[index][1]
    )} = ${denormOut(output[0])} (error ${errors[index]}%)`
  );
});
