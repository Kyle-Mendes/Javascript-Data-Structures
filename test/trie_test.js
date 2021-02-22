// mocha --compilers js:babel-core/register Trie/test.js
import Trie from "../src/Trie/trie";

var expect = require('chai').expect;

describe('Trie', () => {
	let trie;

	it('Can instantiate', () => {
		expect(new Trie()).to.be.ok;
	});

	describe('adding values', () => {
		beforeEach(() => {
			trie = new Trie();
		});

		it ('Can add a value', () => {
			trie.insert('hello');

			expect(trie.root.children.h).to.exist;
			expect(trie.root.children.h.children.e).to.exist;
			expect(trie.root.children.h.children.e.children.l).to.exist;
			expect(trie.root.children.h.children.e.children.l.children.l).to.exist;
			expect(trie.root.children.h.children.e.children.l.children.l.children.o).to.exist;
		});
	});
	
	describe('finding values', () => {
		beforeEach(() => {
			trie = new Trie();
		});

		it('Can report if a string is found', () => {
			trie.insert('hello');

			expect(trie.contains('hello')).to.be.true;
			expect(trie.contains('hell')).to.be.true;

			expect(trie.contains('helo')).to.be.false;
			expect(trie.contains('world')).to.be.false;
		});

		it('Can report if a string is found', () => {
			trie.insert('hello');
			expect(trie.find('hello')[0]).to.equal('hello');
		});

		it('Can report if a string is found', () => {
			trie.insert('hello');
			expect(trie.find('hel')[0]).to.equal('hello');

			trie.insert('helium');
			expect(trie.find('hel')[1]).to.equal('helium');

			expect(trie.find('helicopter').length).to.equal(0);

			trie.insert('hell');
			trie.insert('helicopter');
			trie.insert('height');

			expect(trie.find('hel').length).to.equal(4); // hello, helium, hell, helicopter
			expect(trie.find('hei').length).to.equal(1); // height
		});

		it('Can support nonalphanumerics', () => {
			trie.insert('ding-dong');
			expect(trie.find('ding')[0]).to.equal('ding-dong');
		});

		it('Can fuzzy find matches', () => {
			// Middle of the string
			trie.insert('book');
			expect(trie.find('b00k').length).to.equal(0);
			expect(trie.fuzzyFind('b00k')[0]).to.equal('book');
			expect(trie.fuzzyFind('book')[0]).to.equal('book');

			// Beginning
			trie.insert('okay');
			expect(trie.find('0kay').length).to.equal(0);
			expect(trie.fuzzyFind('0kay')[0]).to.equal('okay');
			expect(trie.fuzzyFind('okay')[0]).to.equal('okay');

			// Beginning
			trie.insert('too');
			expect(trie.find('t00').length).to.equal(0);
			expect(trie.fuzzyFind('to0')[0]).to.equal('too');
			expect(trie.fuzzyFind('t00')[0]).to.equal('too');
			expect(trie.fuzzyFind('t0o')[0]).to.equal('too');
			expect(trie.fuzzyFind('too')[0]).to.equal('too');
		});

		it('Can fuzzy find matches, even substrings', () => {
			trie.insert('book');
			expect(trie.fuzzyFind('b00king')[0]).to.equal('book');
			expect(trie.fuzzyFind('booking')[0]).to.equal('book');
			expect(trie.fuzzyFind('booking')[0]).to.equal('book');
		});

	});

	describe('removing values', () => {
		beforeEach(() => {
			trie = new Trie();
		});

		it ('Can remove a value', () => {
			trie.insert('hello');
			expect(trie.contains('hello')).to.be.true;

			trie.remove('hello');
			expect(trie.find('hel')).to.be.empty;
		});
	});

});
