/*
var allQuestions is the object that holds each question, possible answers in an array, and the index of the correct answer
*/
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

var question_index = 0; //keeps track of which question is being asked to appear on screen
var test_taker_answers = []; //array that will hold the answer of the test taker
var time = []; //array that holds the time in milliseconds

/*
function that adds the current time in milliseconds to the time array
*/
var trackTime = function()
{
	time.push($.now());
}

/*
function that caluclates the time on each question by subtracting the next array item from the previous array item
it then places the times for each question into the dom
*/
var calculateTime = function()
{
	var times = "";
	for(var time_index = 0; time_index < time.length - 1; time_index++)
	{
		times += "It took " + (time[time_index + 1] - time[time_index]) /1000 + " seconds to answer question " + (time_index + 1) + ".<br />";
	}
	$('#times').html(times);
	$('#total-time').html('It took you ' + ((time[time.length - 1]) - time[0]) /1000 + ' seconds to finish the quiz.');
}

var startOver = function()
{
	question_index = 0;
	test_taker_answers = [];
	time = [];
	$('#results').html("");
	$('#score').html("");
	$('#times').html("");
	$('#total-time').html('');
	$('div#correct-answers').hide('');
	$('button#button-reset').hide();
	$('button#next').show();
	$('button#show-correct-answers').hide();
	displayQuestion();
}

/*
function that will show the correct answers for all questions
*/
var showAnswers = function()
{
	correct_answers = "";
	for(var iterator = 0; iterator < allQuestions.length; iterator++)
	{
		correct_answers += '<h4>' + allQuestions[iterator].question + '</h4>';
		correct_answers += '<p>' + allQuestions[iterator].choices[allQuestions[iterator].correctAnswer] + '</p>';
	}
	$('div#correct-answers').html(correct_answers);
}

/*
function to display the questions if there's more questions left
otherwise moves on to show the results by calling the showResults function
*/
var displayQuestion = function()
{
	var options = "";
	if(question_index < allQuestions.length){
		trackTime();

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
		trackTime();
		showResult()
	}
}

/*
function that will place the results of the test on the screen
*/
var showResult = function()
{
	showAnswers();
	$('h3').text('Your results are...');
	$('button#next').hide();
	$('button#button-reset').show();
	$('button#show-correct-answers').show();
	var results ="";
	var num_correct = 0;

	for(var i = 0; i < test_taker_answers.length; i++)
	{
		if(test_taker_answers[i] == allQuestions[i].correctAnswer)
		{
			results += "<p class='correct'>You got Question " + (i + 1) + " correct!</p>";
			num_correct++;
		}
		else
		{
			results += "<p class='incorrect'>You got Question " + (i + 1) + " incorrect!</p>";
		}
	}
	$('#results').html(results);
	$('#score').html("You got " + num_correct + " questions correct!<br /> Your score is " + ((num_correct/allQuestions.length) * 100) + ".");

	calculateTime();

	$('#button-reset').click(function(){
		startOver();
	});

	$('button#show-correct-answers').click(function(){
		$('div#correct-answers').slideDown('slow');
	})
}

/*
initializes everything when the page loads
*/
$(document).ready(function(){
	$('button#next').click(function() {
		$('#answers').text('');
		question_index++;
		displayQuestion();
	});
	$('div#correct-answers').hide();
	$('button#button-reset').hide();
	$('button#show-correct-answers').hide();
	displayQuestion();
});
