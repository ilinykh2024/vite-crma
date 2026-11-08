import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const EditForm = () => {
	// id из параметров URL
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const navigate = useNavigate();

	// состояние для хранения всех заявок из localStorage
	const [allUsers, setAllUsers] = useState([]);

	// состояние для полей формы текущей редактируемой заявки
	const [formData, setFormData] = useState({
		id: '',
		date: '',
		product: '',
		name: '',
		email: '',
		phone: '',
		status: 'Выберите...',
	});

	useEffect(() => {
		const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
		setAllUsers(savedUsers);

		//ищем конкретного пользователя по id
		if (id) {
			const foundUser = savedUsers.find(
				(user) => String(user.id) === String(id),
			);
			if (foundUser) {
				setFormData({
					id: foundUser.id || '',
					date: foundUser.date || '',
					product: foundUser.product || 'course-html',
					name: foundUser.name || '',
					email: foundUser.email || '',
					phone: foundUser.phone || '',
					status: foundUser.status || '',
				});
			}
		}
	}, [id]);

	// обработчик изменений для всех инпутов и селектов
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// определения класса стиля на основе статуса
	const getStyleStatus = (status) => {
		if (status === 'В работе') return 'badge-warning';
		if (status === 'Завершенный' || status === 'complete')
			return 'badge-success';
		return 'badge-danger'; // Для статуса "Новая" или по умолчанию
	};

	// сохранение изменений
	const handleSubmit = (e) => {
		e.preventDefault();

		const updatedUser = {
			...formData,
			styleStatus: getStyleStatus(formData.status),
		};

		const updatedUsersList = allUsers.map((user) =>
			String(user.id) === String(id) ? updatedUser : user,
		);

		localStorage.setItem('users', JSON.stringify(updatedUsersList));
		setAllUsers(updatedUsersList);

		navigate('/table');
	};

	// удаление заявки
	const handleDelete = () => {
		// фильтруем массив, исключая текущую заявку
		const updatedUsersList = allUsers.filter(
			(user) => String(user.id) !== String(id)
		);

		// сохраняем обновленный список в localStorage
		localStorage.setItem('users', JSON.stringify(updatedUsersList));

		// перенаправляем пользователя на страницу таблицы
		navigate('/table');
	};

	return (
		<div className="with-nav form-wrapper">
			<div className="container-fluid">
				{/* Заголовок */}
				<div className="row justify-content-between align-items-center">
					<div className="col">
						<div className="admin-heading-1">Работа с заявкой</div>
					</div>
					<div className="col text-right">
						<Link to="/table" className="btn btn-link">
							Вернуться назад
						</Link>
					</div>
				</div>

				{/* Форма */}
				<div className="row">
					<div className="col">
						<form id="form" onSubmit={handleSubmit}>
							<div className="card mb-4">
								<div className="card-header">
									Данные о заявке
								</div>
								<div className="card-body">
									{/* ID */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>ID:</strong>
										</div>
										<div className="col">
											Заявка №
											<span id="number">
												{formData.id}
											</span>
										</div>
									</div>

									{/* Дата создания */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Дата создания:</strong>
										</div>
										<div className="col" id="date">
											{formData.date}
										</div>
									</div>

									{/* Продукт */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Продукт:</strong>
										</div>
										<div className="col">
											<select
												id="product"
												name="product"
												className="custom-select"
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
												<option value="course-php">
													Курс по PHP
												</option>
												<option value="course-wordpress">
													Курс по WordPress
												</option>
											</select>
										</div>
									</div>

									{/* Имя */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Имя:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
											/>
										</div>
									</div>

									{/* Email */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Email:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
											/>
										</div>
									</div>

									{/* Телефон */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Телефон:</strong>
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
											/>
										</div>
									</div>

									{/* Статус */}
									<div className="row mb-3">
										<div className="col-md-2">
											<strong>Статус заявки:</strong>
										</div>
										<div className="col">
											<select
												className="custom-select"
												id="status"
												name="status"
												value={formData.status}
												onChange={handleChange}
											>
												<option value="Выберите...">
													Выберите...
												</option>
												<option value="new">
													Новая
												</option>
												<option value="inwork">
													В работе
												</option>
												<option value="complete">
													Завершена
												</option>
											</select>
										</div>
									</div>
								</div>
							</div>

							{/* Кнопка отправки */}
							<div className="row justify-content-between">
								<div className="col text-right">
									<button
										type="submit"
										className="btn btn-primary"
										style={{ marginRight: '10px' }} // отступ справа
									>
										Сохранить изменения
									</button>
									<button
										type="button"
										className="btn btn-danger"
										onClick={handleDelete}
									>
										Удалить заявку
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditForm;
