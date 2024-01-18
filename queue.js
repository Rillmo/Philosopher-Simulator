class Node {
    constructor(data) {
       this.data = data;
       this.next = null;
    }
}

 class LinkedList {
    constructor() {
       this.head = null;
       this.tail = null;
       this.length = 0;
    }
    
    // function to add data to linked list
    add(data) {
       const newNode = new Node(data);
       if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
       } else {
          this.tail.next = newNode;
          this.tail = newNode;
       }
       this.length++;
       return this;
    }
    
    //function to add data to tail
    addToTail(data) {
       let newNode = new Node(data);
       if (this.head === null) {
          this.head = newNode;
          return;
       }
       let current = this.head;
       while (current.next !== null) {
          current = current.next;
       }
       current.next = newNode;
    }

	isEmpty() {
		return this.length === 0;
	}
    
    deleteHead() {
		let delNode;
		if (this.head === null)
			return null;
		delNode = this.head;
		this.head = this.head.next;
		return delNode;
	}
    
    printAll() {
       let current = this.head;
       while (current) {
          console.log(current.data);
          current = current.next;
       }
    }
}

class Queue {
    constructor() {
        this.items = new LinkedList();
    }
    enqueue(item) {
        this.items.addToTail(item);
        return item + ' inserted';
    }
    dequeue() {
        var item = this.items.deleteHead();
        return item;
    }
    peek() {
        return this.items.head;
    }
    get printQueue() {
        return this.items.printAll;
    }
}