import React, { useState, useEffect } from 'react';
import data from '../data';

const Index = () => {
	const [users, setUsers] = useState(() => {
		const savedUsers = localStorage.getItem('users');
		return savedUsers ? JSON.parse(savedUsers) : [];
	});

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		product: 'course-html',
	});

	// Вставка тестовых данных
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * data.length);
		setFormData(data[randomIndex]);
	}, []);

	// Синхронизация состояния с localStorage
	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users));
	}, [users]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Расчет ID
		const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

		// Текущая дата
		const currentDate = new Date().toLocaleDateString('ru-RU');

		// Создание новой записи
		const newRecord = {
			id: nextId,
			date: currentDate,
			name: formData.name,
			phone: formData.phone,
			email: formData.email,
			status: 'new',
			styleStatus: 'badge-danger',
			product: formData.product,
		};

		setUsers((prevUsers) => [...prevUsers, newRecord]);

		setFormData({
			name: '',
			phone: '',
			email: '',
			product: 'course-html',
		});
	};

	return (
		<div className="with-nav radial-bg flex-center">
			<div className="white-plate white-plate--payment">
				<div className="container-fluid">
					<div className="white-plate__header text-center">
						<p className="white-plate__logo">
							<span>Форма</span> заявок
						</p>
					</div>

					<div className="white-plate__line-between white-plate__line-between--main"></div>

					<form id="form" onSubmit={handleSubmit}>
						<label>Ваши данные:</label>
						<div className="form-group">
							<input
								id="name"
								type="text"
								name="name"
								autoComplete="on"
								className="form-control"
								placeholder="Имя и Фамилия"
								required
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<input
								id="phone"
								type="text"
								name="phone"
								autoComplete="on"
								className="form-control"
								placeholder="Телефон"
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<input
								id="email"
								type="email"
								name="email"
								autoComplete="on"
								className="form-control"
								placeholder="Email"
								required
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleFormControlSelect1">
								Продукт:
							</label>
							<select
								id="product"
								name="product"
								className="form-control"
								value={formData.product}
								onChange={handleChange}
							>
								<option value="course-html">
									Курс по верстке
								</option>
								<option value="course-js">
									Курс по JavaScript
								</option>
								<option value="course-vue">
									Курс по VUE JS
								</option>
								<option value="course-php">Курс по PHP</option>
								<option value="course-wordpress">
									Курс по WordPress
								</option>
							</select>
						</div>
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-lg btn-primary btn-block"
							>
								Оформить заявку
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Index;
