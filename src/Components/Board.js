import React, { useState, useEffect} from 'react';
import '../Styling/Board.css';



export default function Board() {
    const BOARD_WIDTH = 20;
    const BOARD_HEIGHT = 20;
    


    const [board, setBoard] = useState(() =>
        new Array(BOARD_HEIGHT).fill(0).map(() => new Array(BOARD_WIDTH).fill(0))
    );
    const [snake, setSnake] = useState(async () => {
        const addSnakeToBoard = sl => {
            // adds the snake to the board
            setBoard(prev => {
                let curr = sl.head;
                const newAr = [...prev];
                while (curr != null) {
                    newAr[curr.row][curr.col] = 1;
                    console.log(curr.row);
                    console.log(curr.col);
                    curr = curr.next;
                    
                }
                return newAr;
            });
        }
    
        let snakeList = new DoublyLinkedList();
        await snakeList.addToHead(10,5,'right');
        await snakeList.addToTail(10,4,'right');
        await snakeList.addToTail(10,3,'right');
        await snakeList.addToTail(10,2,'right');
        // add the snake to the board
        await addSnakeToBoard(snakeList);
        return snakeList;
    });


    useEffect(() => {
        const interval = setInterval(() => {
            // moveSnake();
        }, 1000);
        return () => clearInterval(interval);
      }, []);



    const moveSnake = () => {
        // check if next move is valid
        // check if ate apple


        // check if next move is valid
        if (!canSnakeMove(snake.head)) {
            alert('you died');
        }
        // if next move doesn't eat apple then cut off tail
        if (!ateApple(snake.head)) {
            // remove tail from snakelist
            const tail = snake.removeTail();
            // remove tail from board
            removeSnakeBody(tail.row,tail.col);
        }

        
    }



    const makeApple = () => {
            let r = Math.floor(Math.random() * BOARD_HEIGHT);
            let c = Math.floor(Math.random() * BOARD_WIDTH);
        while (board[r][c] == 1) {
            r = Math.floor(Math.random() * BOARD_HEIGHT);
            c = Math.floor(Math.random() * BOARD_WIDTH);
            console.log(r);
            console.log(c);
        }
        setBoard(prev => {
            const newAr = [...prev];
            newAr[r][c] = 2;
            return newAr;
        });
    }
    const buildSnakeBody = (r,c) => {
        setBoard(prev => {
            const newAr = [...prev];
            newAr[r][c] = 1;
            return newAr;
        });
    }
    const removeSnakeBody = (r,c) => {
        setBoard(prev => {
            const newAr = [...prev];
            newAr[r][c] = 0;
            return newAr;
        });
    }
    // takes in the node of the head of the snake
    const canSnakeMove = snakeHeadNode => {
        const outOfBounds = (r,c) => {
            return r<0 && c<0 && r>=BOARD_HEIGHT && c>=BOARD_WIDTH;
        }
        const hitSnake = (r,c) => board[r][c] == 1;
        const rowVal = snakeHeadNode.row;
        const col = snakeHeadNode.col;
        const dir = snakeHeadNode.direction;
        switch (dir) {
            case 'up':
                return (outOfBounds(rowVal-1,col) || hitSnake(rowVal-1,col));
            case 'right':
                return (outOfBounds(rowVal,col+1) || hitSnake(rowVal,col+1));
            case 'down':
                return (outOfBounds(rowVal+1,col) || hitSnake(rowVal+1,col));
            case 'left':
                return (outOfBounds(rowVal,col-1) || hitSnake(rowVal,col-1));
            default:
                throw "invalid direction";
        }

    }

    const ateApple = snakeHeadNode => {
        const hitSnake = (r,c) => board[r][c] == 1;
        const row = snakeHeadNode.row;
        const col = snakeHeadNode.col;
        const dir = snakeHeadNode.direction;
        switch (dir) {
            case 'up':
                return board[row-1][col] == 2;
            case 'right':;
                return board[row][col+1] == 2;
            case 'down':
                return board[row+1][col] == 2;
            case 'left':
                return board[row][col-1] == 2;
            default:
                throw "invalid direction";
        }
    }


    



  return (
    <body>
        <button onClick={makeApple}>Make apple</button>
        <div className='board'>
            {console.log('rendered')}
            {board.map((row, rowInd) => (
                    row.map((cell, cellInd) => (
                        <span 
                        key={'cell_'+rowInd*10+cellInd} 
                        className={cell == 1 ?'snake' : (cell == 2 ? 'apple' : 'cell')}></span>
                    ))
            ))}

        </div>
    </body>
  )
}




class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;

    }
    addToTail(r, c, dir) {
        if (this.head == null) {
            this.head = new LinkedListNode(r,c,dir);
            this.tail = this.head;
        }
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        this.tail = new LinkedListNode(r,c,dir);
        curr.next = this.tail;
        
    }
    addToHead(r, c, dir) {
        if (this.head == null) {
            this.head = new LinkedListNode(r,c, dir);
            this.tail = this.head;
        }
        const temp = this.head;
        this.head = new LinkedListNode(r,c,dir);
        this.head.next = temp;
    }
    removeTail() {
        if (this.head == null) {
            return null;
        }
        // means that there is only 1 node
        if (this.head == this.tail) {
            const temp = this.tail;
            this.head = null;
            this.tail = null;
            return temp;
        }
        let curr = this.head;
        while (curr.next != this.tail) {
            curr = curr.next;
        }
        const temp = this.tail;
        this.tail = curr
        this.tail.next = null;
        return temp;

    }
}


class LinkedListNode {
    constructor(r, c, dir) {
        this.row = r;
        this.col = c;
        this.direction = dir;
        this.next = null;
    }
}