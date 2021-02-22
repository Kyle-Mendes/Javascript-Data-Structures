// mocha --compilers js:babel-core/register LinkedList/test.js
import LinkedList from "../src/LinkedList/ll";

var expect = require('chai').expect;

describe('LinkedLst', () => {
	var ll;

	it('Can instantiate', () => {
		expect(new LinkedList).to.be.ok;
	});

	describe('adding values', () => {
		beforeEach(() => {
			ll = new LinkedList();
		});

		it ('Can add a value to the head of the list', () => {
			ll.prepend('a');
			expect(ll.head.data).to.equal('a');

			ll.prepend('b');
			expect(ll.head.data).to.equal('b');
			expect(ll.head.next.data).to.equal('a');
		});

		it ('Can add a value to the tail of the list', () => {
			ll.append('a');
			expect(ll.head.data).to.equal('a');

			ll.append('b');
			expect(ll.head.data).to.equal('a');
			expect(ll.head.next.data).to.equal('b');
		});

		it('Can create a Linked List from an array', () => {
			ll.fromArray([1, 2, 3]);

			expect(ll.head.data).to.equal(1);
			expect(ll.head.next.data).to.equal(2);
			expect(ll.head.next.next.data).to.equal(3);
		});

		it('Can add values to a Linked List from an array', () => {
			ll.fromArray([1, 2, 3]);
			ll.addArray(['a', 'b', 'c']);

			expect(ll.head.data).to.equal(1);
			expect(ll.head.next.data).to.equal(2);
			expect(ll.head.next.next.data).to.equal(3);

			let old = ll.head.next.next;

			expect(old.next.data).to.equal('a');
			expect(old.next.next.data).to.equal('b');
			expect(old.next.next.next.data).to.equal('c');
		});
	});

	beforeEach(() => {
		ll = new LinkedList();
		ll.fromArray([1, 2, 3, 'a', 'b', 'c']);
	});

	describe('querying', () => {
		it('Can return the head\'s value', () => {
			expect(ll.getHead()).to.equal(1);
		});

		it('Can return the tail\'s value', () => {
			expect(ll.getTail()).to.equal('c');
		});

		it('Can find a value in a list', () => {
			expect(ll.includes('not there')).to.be.false;
			expect(ll.includes('b')).to.be.ok;
		});

		it('Can test for empty lists', () => {
			let l = new LinkedList();

			expect(ll.isEmpty()).to.be.false;
			expect(l.isEmpty()).to.be.true;
		});

		it('Can export a list as an array', () => {
			expect(ll.toArray()).to.eql([1, 2, 3, 'a', 'b', 'c']);
		});

		it('Can clear a list of all entries', () => {
			expect(ll.getHead()).to.exist;
			expect(ll.head).to.exist;

			ll.clear();
			expect(ll.head).to.not.exist;
			expect(ll.getHead.bind(ll)).to.throw(ReferenceError);
			expect(ll.getTail.bind(ll)).to.throw(ReferenceError);
			expect(ll.shift.bind(ll)).to.throw(ReferenceError);
			expect(ll.pop.bind(ll)).to.throw(ReferenceError);
			expect(ll.toArray.bind(ll)).to.throw(ReferenceError);
		});
	});

	describe('mutating', () => {
it('Can remove the head\'s value', () => {
			expect(ll.shift()).to.equal(1);
			expect(ll.getHead()).to.equal(2);
		});

		it('Can remove the tail\'s value', () => {
			expect(ll.pop()).to.equal('c');
			expect(ll.getTail()).to.equal('b');
		});

		it('Can reverse a list', () => {
			ll.reverse();

			expect(ll.getHead()).to.equal('c');
			expect(ll.getTail()).to.equal(1);
		});

		it('Can return the head\'s value', () => {
		});
	});
});
