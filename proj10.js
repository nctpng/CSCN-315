
const puzzle = document.getElementById("puzzle");
const timer = document.getElementById("timer");
const successMsg = document.getElementById("success");
const resetBtn = document.getElementById("reset");

let pieces = [];
let correctOrder = [];
let startTime, timerInterval;

function createPieces() {
    puzzle.innerHTML = ""; // Clear previous pieces
    pieces = [];
    correctOrder = [];

    for (let i = 0; i < 4; i++) {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.setAttribute("draggable", true);
        piece.dataset.index = i;
        piece.style.backgroundPosition = "center";
        piece.style.backgroundImage = `url('img/piece${i+1}.png')`;
        piece.style.backgroundSize = "cover"

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);

        pieces.push(piece);
        correctOrder.push(i);
    }
}

function shufflePieces(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showPieces() {
    puzzle.innerHTML = ""; // Clear previous pieces
    pieces.forEach(piece => puzzle.appendChild(piece));
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timer.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timer.textContent = "Time: 0s";
}

function dragStart(e) {
    if (e.target.classList.contains("locked")) return;
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

function dragOver(e) {
    e.preventDefault(); // Allow dropping
}

function drop(e) {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const targetIndex = e.target.dataset.index;
    
    if (e.target.classList.contains("locked")) return; // Prevent dropping on locked pieces
    
    const draggedPiece = pieces.find(piece => piece.dataset.index === draggedIndex);
    const targetPiece = pieces.find(piece => piece.dataset.index === targetIndex);

    if (!draggedPiece || !targetPiece) {
        console.error("Drag or drop target not found:", { draggedPiece, targetPiece });
        return;
    }

    // Swap pieces
    const draggedPos = pieces.indexOf(draggedPiece);
    const targetPos = pieces.indexOf(targetPiece);
    [pieces[draggedPos], pieces[targetPos]] = [pieces[targetPos], pieces[draggedPos]];
    
    showPieces(); // Update display
    checkWin();
}

function checkWin() {
    let correct = 0;
    pieces.forEach((piece, index) => {
        if (parseInt(piece.dataset.index) === correctOrder[index]) {
            piece.classList.add("locked")
            piece.setAttribute("draggable", false);
            correct++;
        } else {
            piece.classList.remove("locked");
            piece.setAttribute("draggable", true);
        }
    });

    if (correct === pieces.length) {
        successMsg.style.display = "block";
        successMsg.textContent = `Congratulations! You solved the puzzle in ${timer.textContent}`;
        stopTimer();
    } else {
        successMsg.style.display = "none";
    }
}

function resetGame() {
    successMsg.style.display = "none";
    successMsg.textContent = "";
    stopTimer();
    createPieces();
    shufflePieces(pieces);
    showPieces();
    startTimer();
    checkWin();
}

resetBtn.addEventListener("click", resetGame);

// Initialize the game
resetGame();
checkWin();