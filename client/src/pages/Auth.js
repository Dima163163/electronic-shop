import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {login, registration} from '../http/userAPI';
import {observer} from 'mobx-react-lite';
import {Context} from '..';

const Auth = observer(() => {
	const {user} = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const click = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			user.setUser(data);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		} catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{height: window.innerHeight - 54}}
		>
			<Card style={{width: 600}} className="p-5">
				<h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш email..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш пароль..."
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Row
						className="d-flex justify-content-between"
						style={{
							marginTop: '1rem',
							paddingLeft: '1rem',
							paddingRight: '1rem'
						}}
					>
						{isLogin ? (
							<div style={{display: 'inline', width: '70%'}}>
								Нет аккаунта?{' '}
								<NavLink to={REGISTRATION_ROUTE}>Загрегестрируйтесь</NavLink>
							</div>
						) : (
							<div style={{display: 'inline', width: '70%'}}>
								Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
							</div>
						)}
						<Button
							style={{display: 'inline', width: '30%'}}
							variant={'outline-success'}
							onClick={click}
						>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
