import fetch from 'node-fetch';

export function getKlarnaAuth() {
	const username = process.env.PUBLIC_KEY;
	const password = process.env.SECRET_KEY;
	const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
	return auth;
}

// Skapar en order via Klarnas API
export async function createOrder(product) {}

// hämtar vår egna skapade order från API
export async function retrieveOrder(order_id) {}
