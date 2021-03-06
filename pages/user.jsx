import {withAuth, useLoginContext} from '../utils/auth';
import {ProfileTabNavigator} from '../components/TabNavigator';
import Button from '../components/Button';
import styles from '../styles/User.module.css';

function Profile() {
	const {user, pets, logout} = useLoginContext();

	return (
		<main className={styles.container}>
			<h2 className="box">Mi perfil</h2>
			<div className={styles.dataContainer}>
				<h4>
					Nombre: <span>{user.name}</span>
				</h4>
				<h4>
					Apellido: <span>{user.lastName}</span>
				</h4>
				<h4>
					Correo electrónico: <span>{user.email}</span>
				</h4>
				<h4>
					Cantidad de mascotas: <span>{pets.length}</span>
				</h4>
			</div>
			<Button handleClick={logout} label="Cerrar sesión" size="large" />
		</main>
	);
}

const Component = withAuth(Profile);
Component.TabNavigator = ProfileTabNavigator;

export default Component;
