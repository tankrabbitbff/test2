const board = document.getElementById('board');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const numRows = 10; // 行数
const numCols = 20; // 列数
const cellSize = 50; // セルのサイズ（ピクセル）
const numPlayers = 4;
let currentPlayer = 1; // 現在のプレイヤー

// プレイヤーごとのマークを定義
const playerMarks = {
    1: '1',
    2: '2',
    3: '3',
    4: '4'
};

// プレイヤーごとの最後にマークを置いたセルを追跡するためのオブジェクト
const lastMarkedCell = {};

// ボードを作成する関数
function createBoard() {
    board.style.gridTemplateColumns = `repeat(${numCols}, ${cellSize}px)`; // 列数とセルサイズを指定

    for (let i = 0; i < numRows * numCols; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${cellSize}px`; // セルの幅を設定
        cell.style.height = `${cellSize}px`; // セルの高さを設定
        cell.dataset.index = i; // 各セルにインデックスを設定
        cell.addEventListener('click', () => markCell(cell));
        board.appendChild(cell);
    }
}

// セルにマークを置く関数
function markCell(cell) {
    const cellIndex = cell.dataset.index;

    // すでにマークが置かれている場合、何もせずに戻る
    if (cell.querySelector('.mark')) {
        return; // セルが既にマークされている場合
    }

    // もしそのセルが最後にマークを置いたセルであれば、新しいマークを置く
    if (lastMarkedCell[currentPlayer] === cellIndex) {
        return; // 同じセルを再度クリックした場合、何もしない
    }

    // すでに前のセルがある場合、前のセルのマークを削除
    if (lastMarkedCell[currentPlayer]) {
        const previousCell = document.querySelector(`.cell[data-index='${lastMarkedCell[currentPlayer]}']`);
        if (previousCell) {
            previousCell.classList.remove(playerMarks[currentPlayer]);
            const previousMark = previousCell.querySelector('.mark');
            if (previousMark) {
                previousCell.removeChild(previousMark);
            }
        }
    }

    // 新しいセルに色を塗る
    cell.classList.add(playerMarks[currentPlayer]); // プレイヤーごとの色を設定するクラスを追加

    // マークを追加する（オプション）
    let mark = cell.querySelector('.mark');
    if (!mark) {
        mark = document.createElement('div');
        mark.className = 'mark'; // マークのクラスを設定
        cell.appendChild(mark);
    }
    mark.textContent = playerMarks[currentPlayer].charAt(0); // プレイヤーごとのマークを表示（オプション）

    // 現在のプレイヤーの最後にマークを置いたセルを記録
    lastMarkedCell[currentPlayer] = cellIndex;

    // プレイヤーを次に切り替える
    currentPlayer = (currentPlayer % numPlayers) + 1;
    updateCurrentPlayerDisplay();
}







