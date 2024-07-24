export class GM {
    constructor() {
        this.board = Array(20).fill(null).map(() => Array(20).fill({content: ""}));
        this.player = "A"
    }

    addMap(map) {
        for (let pos of map) {
        const row = Math.floor(pos / 20);
        const col = pos % 20;
        this.board[row][col] = { content: "X" };
        }
    }

    add(i, j) {
        if (this.board[i][j].content === ""){
            if (this.player === "A") {
                this.board[i][j] = { content: "A" };
                this.player = "B"
            }else if(this.player === "B") {
                this.board[i][j] = { content: "B" };
                this.player = "A"
            }
        }
        
    }

    interract(i, j, direction) {
        const directions = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1],
        center: [0, 0]
        };

        const [di, dj] = directions[direction];
        for (let step = 1; step <= 5; step++) {
        const newI = i + di * 1; // NUmero é qunatas casas anda
        const newJ = j + dj * 1;// NUmero é qunatas casas anda
        if (newI < 0 || newI >= 20 || newJ < 0 || newJ >= 20) {
            if(this.player === "A"){
                this.board[i][j] = { content: "A" };
                break; // FORA DA AREA
            }else if(this.player === "B"){
                this.board[i][j] = { content: "B" };
                break; // FORA DA AREA
            }
            break; // FORA DA AREA
        }
        if (this.board[newI][newJ].content !== "") {
            if(this.player === "A"){
                this.board[i][j] = { content: "A" };
                break; // Ocupado
            }else if(this.player === "B"){
                this.board[i][j] = { content: "B" };
                break; // Ocupado
            }
            break; // Ocupado
        }
        if (step === 5) {
            // IR PARA NOVA POSIÇÃO
            this.board[i][j] = { content: "" };
            if(this.player === "A"){
                this.board[newI][newJ] = { content: "A" };
                this.player = "B"
                return
            }else if(this.player === "B"){
                this.board[newI][newJ] = { content: "B" };
                this.player = "A"
                return
            }
            return
        }
        }
    }

    getBoard() {
        return this.board;
    }
}
