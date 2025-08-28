import { useState, useEffect } from 'react';

const LogicalReasoningQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Función para ir a la página principal
  const goToHomePage = () => {
    window.location.href = '/';
  };

  // Preguntas de razonamiento lógico
  const questions = [
    {
      question: "Si todos los gatos son mamíferos y todos los mamíferos son animales, entonces:",
      options: [
        "A) Todos los gatos son animales",
        "B) Algunos animales son gatos",
        "C) Todos los animales son gatos",
        "D) Los gatos no son animales"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cuál es el siguiente número en la secuencia: 2, 4, 8, 16, ___?",
      options: [
        "A) 24",
        "B) 28",
        "C) 32",
        "D) 36"
      ],
      correctAnswer: 2
    },
    {
      question: "Si María es más alta que Luisa и Luisa es más alta que Carmen, entonces:",
      options: [
        "A) Carmen es más alta que María",
        "B) María es más alta que Carmen",
        "C) Luisa es más baja que Carmen",
        "D) María и Carmen tienen la misma altura"
      ],
      correctAnswer: 1
    },
    {
      question: "Un reloj marca las 3:15. ¿Qué ángulo forman las manecillas?",
      options: [
        "A) 0°",
        "B) 7.5°",
        "C) 15°",
        "D) 30°"
      ],
      correctAnswer: 1
    },
    {
      question: "Si A = 1, B = 2, C = 3, ¿qué letra corresponde a la suma A + C?",
      options: [
        "A) B",
        "B) C",
        "C) D",
        "D) E"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Cuál de estas palabras no pertenece al grupo?",
      options: [
        "A) Círculo",
        "B) Cuadrado",
        "C) Triángulo",
        "D) Rectángulo"
      ],
      correctAnswer: 0
    },
    {
      question: "Si 5 máquinas producen 5 artículos en 5 minutos, ¿cuánto tiempo tomará a 100 máquinas producir 100 artículos?",
      options: [
        "A) 5 minutos",
        "B) 20 minutos",
        "C) 100 minutos",
        "D) 500 minutos"
      ],
      correctAnswer: 0
    },
    {
      question: "Complete la serie: Z, W, T, Q, ___",
      options: [
        "A) N",
        "B) M",
        "C) L",
        "D) K"
      ],
      correctAnswer: 0
    },
    {
      question: "Si hoy es lunes, ¿qué día será en 72 horas?",
      options: [
        "A) Jueves",
        "B) Viernes",
        "C) Sábado",
        "D) Domingo"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cuál es la probabilidad de obtener un número par al lanzar un dado?",
      options: [
        "A) 1/6",
        "B) 1/3",
        "C) 1/2",
        "D) 2/3"
      ],
      correctAnswer: 2
    }
  ];

  // Temporizador
  useEffect(() => {
    if (!isTimerRunning || quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, quizFinished]);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    setIsTimerRunning(false);
    setQuizFinished(true);
    
    // Calcular puntuación
    let newScore = 0;
    Object.keys(selectedAnswers).forEach(questionIndex => {
      if (selectedAnswers[questionIndex] === questions[questionIndex].correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300);
    setQuizFinished(false);
    setSelectedAnswers({});
    setIsTimerRunning(true);
  };

  // Formatear el tiempo en minutos y segundos
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (quizFinished) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative transition-colors duration-300">
        {/* Botón para volver al inicio */}
        <button 
          onClick={goToHomePage}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </button>
        
        <div className="pt-12">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Resultados del Cuestionario</h2>
          <div className="score text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Puntuación: {score} / {questions.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">{Math.round((score / questions.length) * 100)}% de respuestas correctas</p>
          </div>
          <div className="performance-feedback text-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded">
            {score >= questions.length * 0.8 ? (
              <p className="text-gray-800 dark:text-white">¡Excelente! Tienes un razonamiento lógico excepcional.</p>
            ) : score >= questions.length * 0.6 ? (
              <p className="text-gray-800 dark:text-white">Buen trabajo. Tienes buenas habilidades de razonamiento lógico.</p>
            ) : score >= questions.length * 0.4 ? (
              <p className="text-gray-800 dark:text-white">Resultado aceptable. Sigue practicando para mejorar.</p>
            ) : (
              <p className="text-gray-800 dark:text-white">Necesitas practicar más el razonamiento lógico.</p>
            )}
          </div>
          <div className="answers-review mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Revisión de respuestas:</h3>
            {questions.map((question, index) => (
              <div key={index} className="answer-item mb-4 p-3 border rounded dark:border-gray-600">
                <p className="text-gray-800 dark:text-white"><strong>Pregunta {index + 1}:</strong> {question.question}</p>
                <p className={selectedAnswers[index] === question.correctAnswer ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  Tu respuesta: {selectedAnswers[index] !== undefined ? question.options[selectedAnswers[index]] : "No respondida"}
                </p>
                <p className="text-green-600 dark:text-green-400">Respuesta correcta: {question.options[question.correctAnswer]}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={restartQuiz} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Realizar el cuestionario nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative transition-colors duration-300">
      {/* Botón para volver al inicio */}
      <button 
        onClick={goToHomePage}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al inicio
      </button>
      
      <div className="pt-12">
        <div className="quiz-header mb-6">
          <div className="quiz-info flex justify-between mb-2">
            <span className="text-gray-800 dark:text-white">Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span className="timer font-semibold text-gray-800 dark:text-white">Tiempo restante: {formatTime(timeLeft)}</span>
          </div>
          <div className="progress-bar bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="progress bg-blue-500 h-2 rounded-full" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="question-container mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{questions[currentQuestion].question}</h3>
          <div className="options-container space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div 
                key={index} 
                className={`option p-3 border rounded cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion] === index 
                    ? 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="text-gray-800 dark:text-white">{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="navigation-buttons flex justify-between">
          <button 
            onClick={goToPreviousQuestion} 
            disabled={currentQuestion === 0}
            className="nav-button px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Anterior
          </button>
          <button 
            onClick={goToNextQuestion} 
            className="nav-button next-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogicalReasoningQuiz;