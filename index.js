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
	let playerOneName = "Player One";
	let playerTwoName = "Player Two";

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
	};

	const board = GameBoard();

	const updateBoard = () => {
		board.printBoard();
		console.log(`${activePlayer.name}'s turn.`);
	};

	const playTurn = (row, column) => {
		let validMove = board.placeMarker(row, column, activePlayer);
		if (!validMove) {
			console.log("Invalid Move");
			updateBoard();
			return;
		}

		changePlayer();
		updateBoard();
	};

	updateBoard();

	return { playTurn };
}

let game = GameController();
