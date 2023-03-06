import { getProducts, getProduct } from './services/api.js';
import { createOrder, retrieveOrder } from './services/klarna.js';
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
	try {
		const { id } = req.params;
		const product = await getProduct(id);
		const klarnaJsonResponse = await createOrder(product);
		const html_snippet = klarnaJsonResponse.html_snippet;
		res.send(html_snippet);
	} catch (error) {
		res.send(error.message);
	}
});

app.get('/confirmation', async function (req, res) {
	const order_id = req.query.order_id;
	const klarnaJsonResponse = await retrieveOrder(order_id);
	const html_snippet = klarnaJsonResponse.html_snippet;
	res.send(html_snippet);
});

app.listen(process.env.PORT);
