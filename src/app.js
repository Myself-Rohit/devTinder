import express from "express";

const app = express();
const port = 7777;

app.get("/test", (req, res) => {
	res.send("testingggg");
});
app.get("/hello", (req, res) => {
	res.send("hello hello");
});
app.listen(port, () => {
	console.log(`app running at ${port}`);
});
