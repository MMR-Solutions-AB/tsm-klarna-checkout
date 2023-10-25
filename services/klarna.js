import fetch from 'node-fetch';

export function getKlarnaAuth() {
	const username = process.env.PUBLIC_KEY;
	const password = process.env.SECRET_KEY;
	const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
	return auth;
}

// Skapar en order via Klarnas API
export async function createOrder(product) {
	const path = '/checkout/v3/orders';
	const auth = getKlarnaAuth();

	const url = process.env.BASE_URL + path;
	const method = 'POST';
	const headers = {
		'Content-Type': 'application/json',
		Authorization: auth
	};

	const quantity = 1;
	const price = product.price * 100;
	const total_amount = price * quantity;
	const total_tax_amount = total_amount * 0.2;

	// The payload we send to Klarna
	const payload = {
		purchase_country: 'SE',
		purchase_currency: 'SEK',
		locale: 'sv-SE',
		order_amount: total_amount,
		order_tax_amount: total_tax_amount,
		order_lines: [
			{
				type: 'physical',
				reference: product.id,
				name: product.title,
				quantity,
				quantity_unit: 'pcs',
				unit_price: price,
				tax_rate: 2500,
				total_amount: total_amount,
				total_discount_amount: 0,
				total_tax_amount
			}
		],
		merchant_urls: {
			terms: 'https://www.example.com/terms.html',
			checkout: 'https://www.example.com/checkout.html?order_id={checkout.order.id}',
			confirmation: 'https://localhost:3000/confirmation?order_id={checkout.order.id}',
			push: 'https://www.example.com/api/push?order_id={checkout.order.id}'
		}
	};

	const body = JSON.stringify(payload);
	const response = await fetch(url, { method, headers, body });
	const jsonResponse = await response.json();

	// "200" is success from Klarna KCO docs
	if (response.status === 200 || response.status === 201) {
		return jsonResponse;
	} else {
		console.error('ERROR: ', jsonResponse);
		return { html_snippet: `<h1>${JSON.stringify(jsonResponse)}</h1>` };
	}
}

// hämtar vår egna skapade order från API
export async function retrieveOrder(order_id) {
	const path = '/checkout/v3/orders/' + order_id;
	const auth = getKlarnaAuth();

	const url = process.env.BASE_URL + path;
	const method = 'GET';
	const headers = { Authorization: auth };
	const response = await fetch(url, { method, headers });

	// "200" is success from Klarna KCO docs
	if (response.status === 200 || response.status === 201) {
		const jsonResponse = await response.json();
		return jsonResponse;
	} else {
		console.error('ERROR: ', response.status, response.statusText);
		return {
			html_snippet: `<h1>${response.status} ${response.statusText}</h1>`
		};
	}
}
