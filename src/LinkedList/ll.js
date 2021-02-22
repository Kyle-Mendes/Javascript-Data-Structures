class Node {
	constructor(data, next) {
		this.data = data;
		this.next = next;
	}
}

export default class LinkedList {
	constructor(head) {
		this.head = head || null;
	}

	_tail() {
		let tmp = this.head;

		if (tmp) {

			while(tmp.next) {
				tmp = tmp.next;
			}

			return tmp;
		} else {
			return null;
		}
	}

	_throwEmpty() {
		let err = new ReferenceError('List is empty.');
		throw err;
	}

	/**
	 * A function to see if the list is empty or not;
	 *
	 * @return {boolean} Whether the list is empty or not.
	 */
	isEmpty() {
		return this.head === null;
	}

	// Maybe return the `node` so that the dev has access to `data` and `next`
	// should `data` be changed to `value`?
	includes(val) {
		let current = this.head;

		while (current) {
			if (current.data === val) {
				return current;
			}

			current = current.next;
		}

		return false;
	}

	/**
	 * Empties the list by setting `this.head` to a null value.
	 *
	 * @return {null}
	 */
	clear() {
		this.head = null;
	}

	/**
	 * Returns the value of the first node WITHOUT deleting it from the list.
	 *
	 * @return {*} The value of the first node in the list.
	 */
	getHead() {
		if (! this.isEmpty()) {
			return this.head.data;
		} else {
			this._throwEmpty();
		}
	}

	/*
	 * Returns the value of the last node WITHOUT deleting it from the list.
	 *
	 * @return {*} The value of the last node in the list.
	 */
	getTail() {
		let tail = this._tail();
		if (tail) {
			return this._tail().data;
		} else {
			this._throwEmpty();
		}
	}

	/**
	 * Returns the value of the first node in the list and removes it from the list.
	 * If the Node has a `next` value, sets that Node to `this.head`.
	 * Otherwise sets head to `null`.
	 *
	 * @return {*} The value of the first node in the list.
	 */
	shift() {
		if (this.head) {
			let tmp = this.head;
			this.head = this.head.next;

			return tmp.data;
		} else {
			this._throwEmpty();
		}
	}

	/**
	 * Returns the value of the last node in the list and removes it from the list.
	 * Also, takes the next-to-last node, and sets it's `next` pointer to `null`.
	 *
	 * @return {*} The value of the last node in the list.
	 */
	pop() {
		let tmp = this.head;

		if (tmp) {

			while(tmp.next.next) {
				tmp = tmp.next;
			}

			let tail = tmp.next;
			tmp.next = null;

			return tail.data;
		} else {
			this._throwEmpty();
		}
	}

	/**
	 * Adds a new Node to the front of the list.
	 *
	 * @return {null}
	 */
	prepend(data) {
		let tmp = this.head || null;

		this.head = new Node(data, tmp);
	}

	/**
	 * Adds a new Node to the end of the list.
	 *
	 * @return {null}
	 */
	append(data) {
		if (this.head === null) {
			this.prepend(data);
		} else {
			let tmp = this._tail();

			tmp.next = new Node(data, null);
		}
	}

	/**
	 * Loops through the list and creates an Array from all of the Nodes in the list.
	 *
	 * @return {Array<*>}
	 */
	toArray() {
		let array = [];

		if (this.isEmpty()) {
			this._throwEmpty();
		}

		let tmp = this.head;
		while (tmp.next) {
			array.push(tmp.data);
			tmp = tmp.next;
		}

		// Make sure we push the last value!
		array.push(tmp.data)

		return array;
	}

	/**
	 * Clears the list and fills it with new Nodes from the values of an array.
	 *
	 * @return {null}
	 */
	fromArray(array) {
		this.head = null;

		for (let i = array.length - 1; i > -1; i--) {
			let tmp = this.head;

			this.head = new Node(array[i], tmp);
		}
	}

	/**
	 * Appends an array to the end of the list.
	 *
	 * @return {null}
	 */
	addArray(array) {
		let tail = this._tail();

		array.forEach((val) => {
			tail.next = new Node(val, null);
			tail = tail.next;
		});
	}

	reverse() {
		let current = this.head,
			previous,
			next;

			while (current) {
				next = current.next;
				current.next = previous;
				previous = current;
				current = next;
			}

			this.head = previous;
	}
}
