// class Greeting {
// 	english() {
// 		console.log("hello");
// 	}
// 	spanish() {
// 		console.log("Halo");
// 	}
// }

// class MoreGreeting {
// 	static build() {
// 		const greeting = new Greeting();
// 		const moreGreeting = new MoreGreeting(greeting);
// 		return new Proxy(moreGreeting, {
// 			get: function (target, property) {
// 				return target[property] || greeting[property];
// 			},
// 		});
// 	}
// 	constructor(greeting) {
// 		this.greeting = greeting;
// 	}
// 	german() {
// 		console.log("Hallo");
// 	}

// 	french() {
// 		console.log("bonjour");
// 	}

// 	englishFrench() {
// 		this.greeting.english();
// 		this.french();
// 	}
// }

// const superGreet = MoreGreeting.build();

// // const greeting = new Greeting();
// // const moreGreeting = new MoreGreeting();

// // const superGreet = new Proxy(moreGreeting, {
// // 	get: function (target, property) {
// // 		console.log(target[property] || greeting[property]);
// // 	},
// // });

// // jshint ignore: start

// superGreet.english;
// superGreet.englishFrench();
