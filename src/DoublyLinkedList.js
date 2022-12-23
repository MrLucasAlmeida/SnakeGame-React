class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;

    }
    addToTail(r,c) {
        if (this.head == null) {
            this.head = LinkedListNode(r,c);
            this.tail = this.head;
        }
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        this.tail = LinkedListNode(r,c);
        curr.next = this.tail;
        
    }
    addToHead(r,c) {
        if (this.head == null) {
            this.head = LinkedListNode(r,c);
            this.tail = this.head;
        }
        const temp = this.head;
        this.head = LinkedListNode(r,c);
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
    constructor(r,c) {
        this.row = r;
        this.col = c;
        this.direction = 'right';
        this.next = null;
    }
}




// useEffect(() => {
    //     const interval = setInterval(() => {
    //         moveSnake();
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);



    // const moveSnake = () => {
    //     // check if next move is valid
    //     // check if ate apple


    //     // check if next move is valid
    //     if (!canSnakeMove(snake.head)) {
    //         alert('you died');
    //     }
    //     // if next move doesn't eat apple then cut off tail
    //     if (!ateApple(snake.head)) {
    //         // remove tail from snakelist
    //         const tail = snake.removeTail();
    //         // remove tail from board
    //         removeSnakeBody(tail.row,tail.col);
    //     }

        
    // }