'use server'

interface FormData {
	username: string;
	password: string;
}

export async function login(credentials: FormData) {
	try {
		const response = await fetch(`${process.env.API_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('ログインに失敗しました');
	}
}