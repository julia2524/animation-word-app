const quizzes = [
  {
    word: "사과",
    answer: "apple",
    choices: {
      topLeft: "butterfly",
      topRight: "dog",
      bottomLeft: "apple",
      bottomRight: "umbrella",
    },
  },
  {
    word: "강아지",
    answer: "dog",
    choices: {
      topLeft: "dog",
      topRight: "cat",
      bottomLeft: "car",
      bottomRight: "fish",
    },
  },
  {
    word: "나비",
    answer: "butterfly",
    choices: {
      topLeft: "star",
      topRight: "butterfly",
      bottomLeft: "tree",
      bottomRight: "flower",
    },
  },
  {
    word: "우산",
    answer: "umbrella",
    choices: {
      topLeft: "umbrella",
      topRight: "cloud",
      bottomLeft: "water",
      bottomRight: "weather-sunny",
    },
  },
] as const;

export default quizzes;
