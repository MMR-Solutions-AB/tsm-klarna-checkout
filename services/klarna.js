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
}

// hämtar vår egna skapade order från API
export async function retrieveOrder(order_id) {}
