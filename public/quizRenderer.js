const quizContainer = document.getElementById('questions-container');

const questions = [];
const answers = [];
fetch('api/getquestions')
    .then(response => response.json())
    .then(data => {
        data.forEach(question => {
            const div = document.createElement('div');
            div.innerHTML = `
            <h3>${question.question}</h3>
            <ul>
              ${question.options.map((option, index) => `<li><input type="radio" name="q${questions.length}" value="${index}">${option.text}</li>`).join('')}
            </ul>
          `;
            quizContainer.appendChild(div);
            questions.push(question);
        });
    });

function submitQuiz() {
    questions.forEach(question => {
        const answer = document.querySelector(`input[name="q${questions.indexOf(question)}"]:checked`).value;
        answers.push(answer);
    });
    fetch('api/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}