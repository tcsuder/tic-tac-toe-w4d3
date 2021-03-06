describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark()).to.equal("X");
  });

  it("returns true if the difficult level is easy, and false for hard", function() {
    var testPlayer = new Player('X');
    expect(testPlayer.setDifficulty('easy')).to.equal('easy');
  });
});

describe('Space', function() {
  it("returns the player's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("returns the player's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("will change the empty property of a Space when clicked is run", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.clicked()).to.equal(false);
  });

  it("will update the symbol property of the Space object with a player clicks on it", function() {
    var testSpace = new Space(1,2);
    var testPlayer = new Player("X");
    expect(testSpace.placeMark(testPlayer)).to.equal("X");
  });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
    var testBoard = new Board();
    var testBoardMatrix = [[],[],[]];
    for(var i = 1; i <= 3; i++) {
      for(var j = 1; j <= 3; j++) {
        testBoardMatrix[i-1][j-1] = new Space(i,j);
      }
    }
    expect(testBoard.makeSpaces()).to.eql(testBoardMatrix);
  });

  it("will return a specific space on the board using input coordinates", function() {
    var testBoard = new Board();
    var testSpace = new Space(1,2);
    testBoard.makeSpaces();
    expect(testBoard.findSpace(1,2)).to.eql(testSpace);
  });

  it('will return true if there are three spaces with the same symbol in a row',function() {
    var testBoard = new Board();
    testBoard.makeSpaces();
    testBoard.matrix[0][0].symbol = 'X';
    testBoard.matrix[1][1].symbol = 'X';
    testBoard.matrix[2][2].symbol = 'X';
    expect(testBoard.checkWin()).to.equal(true);
  });
});

describe('Game', function() {
  it('will initialize game object with two players', function() {
    var testGame = new Game();
    var testPlayer1 = new Player("X");
    var testPlayer2 = new Player("O");
    expect(testGame.initPlayers()).to.eql([testPlayer1,testPlayer2]);
  });

  it('will initialize a board within game object', function() {
    var testGame = new Game();
    var testBoard = new Board();
    testBoard.makeSpaces();
    expect(testGame.initBoard()).to.eql(testBoard);
  });

  it('will switch players when the function is called', function() {
    var testGame = new Game();
    testGame.player1 = new Player("X");
    testGame.player2 = new Player("O");
    testGame.currentPlayer = testGame.player1;
    expect(testGame.switchTurns()).to.equal(testGame.player2);
  });

  it('will check if the game is over', function() {
    var testGame = new Game();
    testGame.initPlayers();
    testGame.initBoard();
    testGame.gameBoard.matrix[0][0].symbol = testGame.currentPlayer.symbol;
    testGame.gameBoard.matrix[1][0].symbol = testGame.currentPlayer.symbol;
    testGame.gameBoard.matrix[2][0].symbol = testGame.currentPlayer.symbol;
    expect(testGame.checkGameStatus()).to.equal('win');
  });

  it('will return true if AI finds and empty space', function() {
    var testGame = new Game();
    testGame.initBoard();
    testGame.initPlayers();
    testGame.player1.difficulty = 'easy';
    testGame.gameBoard.matrix[0][0].empty = false;
    testGame.gameBoard.matrix[1][0].empty = false;
    testGame.gameBoard.matrix[0][1].empty = false;
    testGame.gameBoard.matrix[2][2].empty = false;
    testGame.gameBoard.matrix[0][2].empty = false;
    expect(testGame.playStyle()).to.equal(true);
  });
});
