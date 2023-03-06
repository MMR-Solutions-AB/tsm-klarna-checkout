import { getProducts } from './services/api.js';
import express from 'express';
const app = express();
import { config } from 'dotenv';
config();

app.get('/', async (req, res) => {
	const products = await getProducts();
	// Lägga till vilken styling som helst nedan
	const markup = products
		.map(
			(p) =>
				`<a style="display:block;color:black;border:solid black 2px;margin: 20px; padding:10px;" href="/product/${p.id}">
                    ${p.title} - ${p.price}kr
                </a>`
		)
		.join(' ');
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
