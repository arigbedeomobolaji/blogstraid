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

test("jest is working properly", () => {
	const result = 2 + 3;
	expect(result).toBe(5);
});

test("check that page title is correct", async () => {
	const title = await page.getContentsOf("a.left.brand-logo");
	expect(title).toEqual("Blogster");
});

test("Clicking on Login in with Google takes you to google oauth", async () => {
	const [response] = await Promise.all([
		page.waitForNavigation({ timeout: 60000 }),
		page.click(".right li a"),
	]);
	if (response !== null) {
		const url = await page.url();
		expect(url).toMatch(/accounts\.google\.com/);
	}
});

test("Should show logout link when user successfully login", async () => {
	await page.login();

	const logoutText = await page.getContentsOf('a[href="/auth/logout"]');
	expect(logoutText).toEqual("Logout");
});
