var home = null;
 function Home(){
	this.currentTurn = null;
	this.gameOver = false;
	this.checkedPlayerOne = null;
	this.checkedPlayerTwo = null;
	this.checkedPlayerOneImage = './X.png';
	this.checkedPlayerTwoImage = './O.png';
};

Home.prototype.initialize = function(){
	this.currentTurn = 1;
	this.gameOver = false;
	this.checkedPlayerOne = [];
	this.checkedPlayerTwo = [];
	this.showMessage('Player one turn.');
	this.clearEvents();
	this.clearData();
	this.setEvents();
};

Home.prototype.clearEvents = function(){
	var squares = $('.grid-square');
	squares.off('click');
	$('#restartGame').off('click');	
};

Home.prototype.clearData = function(){
	$('.grid-square').each(function(){
		var square = $(this);
		square.data('checked', false);
		square.data('checked-by', '');
		square.find('img').attr('src', '').hide();
		square.removeClass('checked-winning-square');
	});
};

Home.prototype.setEvents = function(){
	var realThis = this;
	var squares = $('.grid-square');
	squares.on('click', realThis.checkSquare);
	$('#restartGame').on('click', function (){
		realThis.initialize();
	});
};

Home.prototype.checkSquare = function(){
	var square = $(this);
	if (home.gameOver) return;
	if (square.data('checked') === true) return;
	square.data('checked', true);
	square.data('checked-by', home.currentTurn);
	switch (home.currentTurn){
		case 1:
			square.find('img').attr('src', home.checkedPlayerOneImage).show();
			home.checkedPlayerOne.push(square.data('numeric-position'));
			home.checkWinner(1);
			if (!home.gameOver) {
				home.currentTurn = 2;
				home.showMessage('Player two turn.');
			}
			break;
		case 2:
			square.find('img').attr('src', home.checkedPlayerTwoImage).show();
			home.checkedPlayerTwo.push(square.data('numeric-position'));
			home.checkWinner(2);
			if (!home.gameOver) {
				home.currentTurn = 1;
				home.showMessage('Player one turn.');
			}
			break;
	}

};

Home.prototype.containsAll = function(arrayToFind, arrayToSearch)
{
	for (var i = 0; i < arrayToFind.length; i++)
	{
		if($.inArray(arrayToFind[i], arrayToSearch) == -1) return false;
	}
  	return true;
};

Home.prototype.checkWinner = function(player){
	var arrayToCheck = null;
	var winningMessage = '';
	switch (player)
	{
		case 1:
			arrayToCheck = home.checkedPlayerOne;
			winningMessage = 'Player one wins!';
			break;
		case 2:
			arrayToCheck = home.checkedPlayerTwo;
			winningMessage = 'Player two wins!';				
			break;
	}

	if (home.containsAll([1,2,3], arrayToCheck))
	{
		home.drawWinningRow([1,2,3]);
		home.showMessage(winningMessage);
		home.gameOver = true;
	}
	else if(home.containsAll([4,5,6], arrayToCheck)) 
	{
		home.drawWinningRow([4,5,6]);
		home.showMessage(winningMessage);
		home.gameOver = true;
	}
	else if(home.containsAll([7,8,9], arrayToCheck))
	{
		home.drawWinningRow([7,8,9]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	} 
	else if (home.containsAll([1,5,9], arrayToCheck))
	{
		home.drawWinningRow([1,5,9]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	} else if(home.containsAll([2,5,8], arrayToCheck))
	{
		home.drawWinningRow([2,5,8]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	}
	else if (home.containsAll([7,5,3], arrayToCheck))
	{
		home.drawWinningRow([7,5,3]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	}
	else if (home.containsAll([1,4,7], arrayToCheck))
	{
		home.drawWinningRow([1,4,7]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	}
	else if (home.containsAll([3,6,9], arrayToCheck))
	{
		home.drawWinningRow([3,6,9]);
		home.showMessage(winningMessage);
		home.gameOver = true;	
	}

	if (!home.gameOver && (home.checkedPlayerOne.length + home.checkedPlayerTwo.length) === 9)
	{
		home.showMessage('Draw!');
		home.gameOver = true;
	}

};

Home.prototype.showMessage = function(message){
	$('#currentMessage').text(message);
};

Home.prototype.drawWinningRow = function(squares){
	for (var i = 0; i < squares.length; i ++)
	{
		$('.grid-square[data-numeric-position=' + squares[i] + ']').addClass('checked-winning-square');
	}
};

Home.prototype.restartGame = function(){
	this.initialize();
}

$(document).ready(function(){
	home = new Home();
	home.initialize();
});