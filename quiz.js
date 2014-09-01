var allQuestions = [
	{
		question: "Who is Prime Minister of the United Kingdom?", 
		choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
		correctAnswer:0
	},
	{
		question: "What is the air-velocity of an unladen swallow?",
		choices: ["African or European swallow?", "choice a", "choice b", "choice c"],
		correctAnswer: 0
	},
	{
		question: "Who is the best Doctor?",
		choices: ["Christopher Eccleston", "David Tennant", "Are there really any other choices?"],
		correctAnswer: 0
	},
	{
		question: "Where is the home of Thomas Jefferson?",
		choices: ["Charlotte, NC", "Charlotttesville, VA", "Pensacola, FL", "Richmond, VA"],
		correctAnswer: 1
	},
	{
		question: "Who wrote Catch-22?",
		choices: ["Ernest Hemingway", "Joseph Conrad", "Joseph Heller"],
		correctAnswer: 2
	}
];

var question_index = 0;
var test_taker_answers = [];

var displayQuestion = function()
{
	var options = "";
	if(question_index < allQuestions.length){

		$('h3').text(allQuestions[question_index].question);
		for(var count = 0; count < allQuestions[question_index].choices.length; count++)
		{
			options += "<input class='options' type='radio' name='quiz' value='" + count + "' class='q1'>" + " " + allQuestions[question_index].choices[count] + "</input></br>";
		}

		$('#answers').html(options);

		$('input:radio[name=quiz]').click(function() {
			test_taker_answers[question_index] = $('input:radio[name=quiz]:checked').val();
		});
	}

	else {
		showResult()
	}
}

var showResult = function()
{
	$('h3').text('Your results are!');
	$('button').hide();
	var results ="";
	var num_correct = 0;

	for(var i = 0; i < test_taker_answers.length; i++)
	{
		if(test_taker_answers[i] == allQuestions[i].correctAnswer)
		{
			//console.log("You got one correct!");
			results += "You got Question " + (i + 1) + " correct!<br />";
			num_correct++;
		}
		$('#results').html(results);
		$('#score').html("You got " + num_correct + " questions correct!<br /> Your score is " + ((num_correct/allQuestions.length) * 100) + ".");
	}
}

$(document).ready(function(){
	$('button').click(function() {
		$('#answers').text('');
		question_index++;
		displayQuestion();
	});

	displayQuestion();
});
