'use client'
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation'; // 'next/router'ではなく'next/navigation'を使用
import { login } from '@/app/actions/auth';

interface FormData {
	username: string;
	password: string;
}

interface FormError {
	username?: string;
	password?: string;
	submit?: string;
}

const LoginForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<FormData>({
		username: '',
		password: ''
	});
	const [errors, setErrors] = useState<FormError>({});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// バリデーション
		const newErrors: FormError = {};
		if (!formData.username) newErrors.username = 'ユーザー名を入力してください';
		if (!formData.password) newErrors.password = 'パスワードを入力してください';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			await login({
				username: formData.username,
				password: formData.password
			});
			router.push('/dashboard');
		} catch (error) {
			if (error instanceof Error) {
				setErrors({
					submit: error.message
				});
			} else {
				setErrors({
					submit: '予期せぬエラーが発生しました'
				});
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		// エラーをクリア
		if (errors[name as keyof FormError]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-300">
			<div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-medium text-center text-gray-800 mb-8">ログイン</h1>

				{errors.submit && (
					<div className="mb-6 p-3 bg-red-100 text-red-700 rounded">
						{errors.submit}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
							ユーザー名
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className={`w-full px-3 py-3 border-2 rounded-md transition-colors text-gray-900
                ${errors.username ? 'border-red-500' : 'border-gray-200'}
                focus:border-blue-500 focus:outline-none`}
						/>
						{errors.username && (
							<p className="mt-1 text-sm text-red-500">{errors.username}</p>
						)}
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
							パスワード
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={`w-full px-3 py-3 border-2 rounded-md transition-colors text-gray-900
                ${errors.password ? 'border-red-500' : 'border-gray-200'}
                focus:border-blue-500 focus:outline-none`}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-500">{errors.password}</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						ログイン
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;