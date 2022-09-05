function f1() {
	let user = {
		name: "张三",
		age: 18,
		parent: {
			name: "parent",
		},
	};

	let parent = user.parent;
	return parent;
}

let p = f1();

console.log(p); // { name: 'parent' }
