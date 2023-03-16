import express from 'express';
const app = express();
import { config } from 'dotenv';
config();

app.get('/', async (req, res) => {
	const markup = `<h1>Hello Klarna</h1>`;
	res.send(markup);
});

app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const markup = `<h1>Hello ${id}</h1>`;
	res.send(markup);
});

app.get('/confirmation', async (req, res) => {
	const markup = `<h1>Hello confiramtion</h1>`;
	res.send(markup);
});

app.listen(process.env.PORT);
