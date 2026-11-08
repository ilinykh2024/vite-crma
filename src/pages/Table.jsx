import { useState } from 'react';
import avatarUrl from '../avatars/avatar-128.jpg';
import { Link } from 'react-router-dom';
import {
	getStatusBadgeClass,
	getStatusText,
	getProductName,
} from '../utils/helpers';

const Table = () => {
	// ! users или users?
	const [users] = useState(() => {
		const savedUsers = localStorage.getItem('users');
		return savedUsers ? JSON.parse(savedUsers) : [];
	});

	console.log('from localst', users);

	//фильтрация
	const [filterStatus, setFilterStatus] = useState('all');
	const [filterProduct, setFilterProduct] = useState('all');

	// !ПЕРЕДЕЛАТЬ
	//отображения текста статуса
	// const getStatusText = (status) => {
	// 	if (status === 'new') return 'Новая';
	// 	if (status === 'inwork') return 'В работе';
	// 	if (status === 'complete') return 'Завершенный';
	// 	return status; // Если статус уже на русском
	// };

	//фильтрации массива перед рендером
	const filteredusers = users.filter((user) => {
		const matchStatus =
			filterStatus === 'all' || user.status === filterStatus;

		const matchProduct =
			filterProduct === 'all' || user.product === filterProduct;

		return matchStatus && matchProduct;
	});

	//количества новых заявок для левой панели
	const newusersCount = users.filter(
		(req) => req.status === 'new',
	).length;

	return (
		<div className="with-nav body--dashboard">
			<div className="left-panel blue-skin">
				<div className="left-panel__logo">
					<div className="left-panel__logo-title">CRM заявки</div>
					<div className="left-panel__logo-subtitle">
						{' '}
						учебный проект webcademy{' '}
					</div>
				</div>

				<div className="left-panel__user clearfix">
					<div className="left-panel__user-photo">
						<img src={avatarUrl} alt="Avatar" />
					</div>
					<div className="left-panel__user-name">
						Петр <br /> Васильевич
					</div>
				</div>

				{/* навигация левая */}
				<div className="left-panel__navigation">
					<div className="left-panel__navigation-title">Заявки</div>
					<ul>
						<li>
							<a
								data-value="all"
								data-role="left-status"
								href="#"
								className={
									filterStatus === 'all' ? 'active' : ''
								}
								onClick={(e) => {
									e.preventDefault();
									setFilterStatus('all');
								}}
							>
								Все вместе
							</a>
						</li>
						<li>
							<a
								href="#"
								className={
									filterStatus === 'new' ? 'active' : ''
								}
								onClick={(e) => {
									e.preventDefault();
									setFilterStatus('new');
								}}
							>
								Новые{' '}
								<div className="badge" id="badge-new">
									{newusersCount}
								</div>
							</a>
						</li>
						<li>
							<a
								href="#"
								className={
									filterStatus === 'inwork' ? 'active' : ''
								}
								onClick={(e) => {
									e.preventDefault();
									setFilterStatus('inwork');
								}}
							>
								В работе
							</a>
						</li>
						<li>
							<a
								href="#"
								className={
									filterStatus === 'complete' ? 'active' : ''
								}
								onClick={(e) => {
									e.preventDefault();
									setFilterStatus('complete');
								}}
							>
								Завершенные
							</a>
						</li>
					</ul>
				</div>
			</div>

			{/* главный контент */}
			<div className="main-wrapper">
				<div className="container-fluid">
					<div className="admin-heading-1">Все заявки</div>

					{/* фильтры */}
					<form action="" onSubmit={(e) => e.preventDefault()}>
						<div className="row mb-3 justify-content-start">
							<div className="col">
								<div
									id="topStatusBar"
									className="btn-group"
									role="group"
									aria-label="..."
								>
									<button
										type="button"
										className={`btn ${filterStatus === 'all' ? 'btn-dark' : 'btn-light'}`}
										onClick={() => setFilterStatus('all')}
									>
										Все
									</button>
									<button
										type="button"
										className={`btn ${filterStatus === 'new' ? 'btn-dark' : 'btn-light'}`}
										onClick={() => setFilterStatus('new')}
									>
										Новые
									</button>
									<button
										type="button"
										className={`btn ${filterStatus === 'inwork' ? 'btn-dark' : 'btn-light'}`}
										onClick={() =>
											setFilterStatus('inwork')
										}
									>
										В работе
									</button>
									<button
										type="button"
										className={`btn ${filterStatus === 'complete' ? 'btn-dark' : 'btn-light'}`}
										onClick={() =>
											setFilterStatus('complete')
										}
									>
										Завершенные
									</button>
								</div>
							</div>

							{/* селект продуктов */}
							<div className="col">
								<select
									className="custom-select"
									id="productSelect"
									value={filterProduct}
									onChange={(e) =>
										setFilterProduct(e.target.value)
									}
								>
									<option value="all">Все продукты</option>
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
					</form>

					{/* таблица с динамическими данными */}
					<table className="table fs-14">
						<thead>
							<tr>
								<th>ID</th>
								<th>дата</th>
								<th>продукт</th>
								<th>имя</th>
								<th>email</th>
								<th>телефон</th>
								<th>статус</th>
								<th></th>
							</tr>
						</thead>
						<tbody id="tbody">
							{/* рендерим отфильтрованный массива filteredusers */}
							{filteredusers.map((user, index) => (
								<tr key={user.id || index}>
									<th scope="row">
										{user.id || index + 1}
									</th>
									<td>{user.date || '20.10.2026'}</td>
									<td>
										{getProductName(user.product) || user.productName}
									</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>
										<div
											className={`badge badge-pill ${getStatusBadgeClass(user.status)}`}
										>
											{getStatusText(user.status)}
										</div>
									</td>
									<td>
										<Link to={`/edit?id=${user.id}`}>
											Редактировать
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;
