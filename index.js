function GameBoard() {
	let board = [];

	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) {
			board[i].push("- ");
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

	return { printBoard, placeMarker, getBoard };
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
			changePlayer();
		}
	};

	updateBoard();
	let boardTiles = document.querySelectorAll(".board-tile");
	console.log(boardTiles);

	boardTiles.forEach((tile) => {
		tile.addEventListener("click", () => {
			let row = tile.id.slice(-2, -1);
			let col = tile.id.slice(-1);
			playTurn(row, col);
		});
	});

	return { playTurn, checkForWin };
}

const game = GameController();
