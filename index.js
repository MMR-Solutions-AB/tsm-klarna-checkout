import express from 'express';
const app = express();
import { config } from 'dotenv';
config();

app.get('/', async (req, res) => {
	const markup = `<h1>Hello world</h1>`;
	res.send(markup);
});

app.get('/product/:id', async function (req, res) {
	const { id } = req.params;
	const markup = `<h1>Hello ${id}</h1>`;
	res.send(markup);
});

app.get('/confirmation', async function (req, res) {
	const markup = `<h1>Hello confirmation</h1>`;
	res.send(markup);
});

app.listen(process.env.PORT);
