import fetch from 'node-fetch';

// Hämtar alla produkter från Fake store api
// OBS! Se till att ge FAKE_STORE_API_URL url:en i din .env fil
export async function getProducts() {
	const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products`);
	const products = await res.json();
	return products;
}

// Hämtar en produkt från Fake store api
// OBS! Se till att ge FAKE_STORE_API_URL url:en i din .env fil
export async function getProduct(id) {
	const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products/${id}`);
	const product = await res.json();
	return product;
}
