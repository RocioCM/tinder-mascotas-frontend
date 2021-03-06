import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useLoginContext} from '../utils/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from '../styles/Login.module.css';

const fields = [
	{id: 'name', label: 'Nombre', type: 'text'},
	{id: 'lastName', label: 'Apellido', type: 'text'},
	{id: 'email', label: 'Email', type: 'email'},
	{id: 'password', label: 'Contraseña', type: 'password'},
	{id: 'passwordRepeat', label: 'Repetir contraseña', type: 'password'},
];

const Register = () => {
	const [form, setForm] = useState({
		name: '',
		lastName: '',
		email: '',
		password: '',
		passwordRepeat: '',
	});
	const [message, setMessage] = useState({type: 'error', value: ''});
	const [loading, setLoading] = useState(false);
	const {register} = useLoginContext();
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/');
	}, []);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm((prevForm) => ({...prevForm, [name]: value}));
	};

	const validateErrors = () => {
		if (Object.values(form).some((value) => value === ''))
			return 'Todos los campos son obligatorios';
		if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(form.email))
			return 'El correo electrónico es inválido';
		if (form.password !== form.passwordRepeat)
			return 'Las contraseñas deben coincidir';
	};

	const handleRegister = async () => {
		const error = validateErrors();
		if (error) {
			setMessage({type: 'error', value: error});
			return;
		}

		setLoading(true);
		const {passwordRepeat, ...payload} = form;
		const registerError = await register(payload);
		setMessage(
			registerError
				? {type: 'error', value: registerError}
				: {type: 'success', value: 'Usuario creado exitosamente'}
		);
		setLoading(false);
	};

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Registrarse</h2>
			{message.value && <p className={styles[message.type]}>{message.value}</p>}
			{fields.map(({id, label, type}) => (
				<Input
					key={id}
					className={styles.input}
					placeholder={label}
					name={id}
					value={form[id]}
					type={type}
					handleChange={handleChange}
				/>
			))}
			<Button
				disabled={loading}
				label="Registrar"
				handleClick={handleRegister}
				size="large"
			/>
		</main>
	);
};

export default Register;
