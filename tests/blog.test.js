const Page = require("./helpers/Page");
let page;

beforeEach(async () => {
	page = await Page.build();

	// visit a page
	await page.goto("http://localhost:3000");
});

afterEach(async () => {
	await page.close();
});

describe("When logged in", () => {
	beforeEach(async () => {
		await page.login();

		await page.click(".btn-floating");
	});

	test("should show blog name label when user want to create a new blog", async () => {
		const blogLabel = await page.getContentsOf(".title label");
		expect(blogLabel).toEqual("Blog Title");
	});

	describe("When using valid input", () => {
		beforeEach(async () => {
			await page.type(".title input", "My Title");
			await page.type(".content input", "My Content");
			await page.click('button[type="submit"]');
		});

		test("submitting takes user to a review screen", async () => {
			const confirmationText = await page.getContentsOf("form h5");
			expect(confirmationText).toEqual("Please confirm your entries");
		});

		test("saved blogs showed in the blogs index", async () => {
			await page.click("button.green");
			// the above takes some amount of time saving blog to db and retrieve it from the db after it has been saved so we need to wait for some selectors to show up
			await page.waitForSelector(".card");

			const blogTitle = await page.getContentsOf(
				".card-content .card-title"
			);
			const blogContent = await page.getContentsOf(".card-content p");

			expect(blogTitle).toEqual("My Title");
			expect(blogContent).toEqual("My Content");
		});
	});

	describe("When using invalid input", () => {
		beforeEach(async () => {
			await page.click('button[type="submit"]');
		});

		test("submitting shows error message", async () => {
			const titleError = await page.getContentsOf(".title .red-text");
			const contentError = await page.getContentsOf(".content .red-text");
			expect(titleError).toEqual("You must provide a value");
			expect(contentError).toEqual("You must provide a value");
		});
	});
});

describe("When not logged in", () => {
	const actions = [
		{
			method: "get",
			path: "/api/blogs",
		},
		{
			method: "post",
			path: "api/blogs",
			data: {
				title: "T",
				content: "C",
			},
		},
	];

	test("should handle blog creation and read operatons", async () => {
		const results = await page.execRequest(actions);
		for (let result of results) {
			expect(result).toEqual({ error: "You must log in!" });
		}
	});
});
