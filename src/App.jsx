import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Table from "./pages/Table";
import Edit from "./pages/Edit";

function App() {
	return (
		<>
			<HashRouter>
				<nav className="project-nav">
					<div className="project-nav__links-wrapper">
						<Link to="/">Форма добавления заявок</Link>
						<Link to="/table">Таблица с заявками</Link>
						<Link to="/edit">Редактирование заявки</Link>
					</div>
				</nav>

				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/table" element={<Table />} />
					<Route path="/edit" element={<Edit />} />
				</Routes>
			</HashRouter>
		</>
	);
}

export default App;
