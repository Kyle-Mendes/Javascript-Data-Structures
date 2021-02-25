class TreeNode {
	constructor(val, left, right) {
		this.val = val;
		this.left = left || undefined;
		this.right = right || undefined;
	}
}

class Tree{
	constructor(val) {
		this.root = new TreeNode(val);
	}
}
