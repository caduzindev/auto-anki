class Node {
    constructor(value)
    {
        this.value = value
        this.next = null
    }
}

class Queue{
    constructor()
    {
        this.first = null
        this.last = null
        this.size = 0
    }

    enqueue(val){
        let node = new Node(val)

        if (!this.first) {
            this.first = node
            this.last = this.first
        }else {
            this.last.next = node;
            this.last = node;
        }

        this.size++
        return this
    }

    dequeue(){
        if (!this.first) return undefined
        if (!this.first.next) {
            let removed = this.first
            this.first = null
            this.last = null
            this.size = 0

            return removed
        }

        let removed = this.first
        this.first = this.first.next
        this.size--

        return removed

    }
}

module.exports = Queue