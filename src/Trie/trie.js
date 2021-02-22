export class TrieNode {
	constructor(val, parent) {
		this.val = val;
		this.children = {}
		this.parent = parent;
		this.end = false;
	}

	// Get the word from this node
	getWord() {
		const word = [];
		let node = this;

		do {
			word.unshift(node.val);
			node = node.parent;
		} while (node);
		
		return word.join('');
	}
}

export default class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	// Helper method for returning a node at the search string (if it's there)
	_getNode(search) {
		let found = true;
		let i = 0;

		let node = this.root;

		while (i < search.length && found) {
			const next = node.children[search[i]];

			if (!next) {
				found = false;
			}

			node = next;
			i++;
		}

		if (found) {
			return node;
		}

		return null;
	}

	// Searches for a string, and returns if it's included in the Trie
	contains(search) {
		return Boolean(this._getNode(search));
	}

	// Inserts the string into the tree
	insert(string) {
		let node = this.root;
		string.split('').forEach((c) => {
			if (!node.children[c]) {
				// Insert a new child at this character
				node.children[c] = new TrieNode(c, node);
			}

			node = node.children[c];
		});

		node.end = true;
	}

	// Returns all strings with the search root
	find(search) {
		const node = this._getNode(search);

		if (!node) {
			return [];
		}

		const matches = [];

		// Make sure we include the word we searched for, if it's a word
		if (node.end) {
			matches.push(search);
		}

		this.findAllWords(node, matches);

		return matches;
	}

	// This can be moved to another class / helper
	getAliases(char) {
		if (char === '0') {
			return ['0', 'o'];
		}

		return [char];
	}

	fuzzyFind(search, matches = [], from) {
		let node = from || this.root;
		const aliases = this.getAliases(search[0]);

		if (node.end) {
			matches.push(node.getWord());
		}

		aliases.forEach((a) => {
			if (node.children[a]) {
				this.fuzzyFind(search.slice(1, search.length), matches, node.children[a]);
			}
		});

		return matches;
	}

	// Find all the child words of a given node
	findAllWords(node, arr) {
		// Breadth search for every word after this one
		for (const child of Object.values(node.children)) {
			if (child.end) {
				arr.push(child.getWord());
			}
			this.findAllWords(child, arr);
		}
	}

	// Removes a word (if it's found)
	remove(search) {
		const node = this._getNode(search);
		if (node) {
			node.end = false;
		}
	}
}
