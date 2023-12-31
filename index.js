function GameBoard() {
	let board = [];
	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) {
			board[i][j] = "- ";
		}
	}

	const getBoard = () => board;

	const placeMarker = (row, column, player) => {
		if (board[row][column] == "- ") {
			board[row][column] = player.marker;
			return true;
		}
		return false;
	};

	const printBoard = () => {
		let display = "";
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				display += board[i][j];
			}
			display += "\n";
		}
		console.log(display);
	};

	const resetBoard = () => {
		board = [];
		for (let i = 0; i < 3; i++) {
			board[i] = [];
			for (let j = 0; j < 3; j++) {
				board[i][j] = "- ";
			}
		}
	};

	return { printBoard, placeMarker, getBoard, resetBoard };
}

function GameController() {
	let gameWon = false;

	let playerOneName = "Player One";
	let playerTwoName = "Player Two";

	const boardController = GameBoard();

	const players = [
		{
			name: playerOneName,
			marker: "x ",
		},
		{
			name: playerTwoName,
			marker: "o ",
		},
	];

	let activePlayer = players[0];
	console.log(activePlayer);

	const changePlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
		console.log(`${activePlayer.name}'s turn.`);
	};

	const updateDisplay = () => {
		let board = boardController.getBoard();
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let tile = document.querySelector("#" + "tile-" + i + j);

				tile.textContent = board[i][j];
			}
		}
	};

	const updateBoard = () => {
		console.log("Updated Board: ");
		boardController.printBoard();
		updateDisplay();
	};

	const checkForWin = () => {
		let gameState = boardController.getBoard();
		// Check for Matching Rows
		gameState.forEach((row) => {
			if (row[0] === row[1] && row[0] === row[2] && row[0] !== "- ") {
				console.log(`${activePlayer.name} won!`);
				gameWon = true;
				return;
			}
		});

		// Check for Matching Columns
		for (let i = 0; i < 3; i++) {
			if (
				gameState[0][i] === gameState[1][i] &&
				gameState[0][i] === gameState[2][i] &&
				gameState[0][i] !== "- "
			) {
				console.log(`${activePlayer.name} won!`);
				gameWon = true;
				return;
			}
		}
	};

	const playTurn = (row, column) => {
		if (!gameWon) {
			console.log("check 1");
			let validMove = boardController.placeMarker(
				row,
				column,
				activePlayer
			);
			if (!validMove) {
				console.log("Invalid Move");
				updateBoard();
				return;
			}
			updateBoard();
			checkForWin();
		}
		if (!gameWon) {
			console.log("check 2");
			changePlayer();
		}
		if (gameWon) {
			console.log("Winning Board:");
			boardController.printBoard();
			let winContainer = document.querySelector(".game-won-container");
			winContainer.style.display = "flex";
		}
	};

	updateBoard();

	let boardTiles = document.querySelectorAll(".board-tile");
	boardTiles.forEach((tile) => {
		tile.addEventListener("click", () => {
			let row = tile.id.slice(-2, -1);
			let col = tile.id.slice(-1);
			playTurn(row, col);
		});
	});

	const resetGame = () => {
		activePlayer = players[0];
		gameWon = false;
		boardController.resetBoard();
		console.log("reset board:");
		updateBoard();
		let winContainer = document.querySelector(".game-won-container");
		winContainer.style.display = "none";
		console.log(gameWon);
	};

	return { playTurn, checkForWin, resetGame, updateBoard };
}

const game = GameController();
