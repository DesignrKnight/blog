import * as React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ redirectLocation }) => {
	const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return isAuthenticated ? (
		<>
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
			<button onClick={() => logout({ returnTo: redirectLocation })}>Log Out</button>
		</>
	) : (
		<button onClick={() => loginWithRedirect()}>Log In</button>
	);
};

const Auth0 = () => {
	const redirectLocation = typeof window !== 'undefined' ? window.location.href : `/`;
	return (
		<Auth0Provider
			domain="aviyel-demo-abel.us.auth0.com"
			clientId="7OOwPn8ddpP4HOhTPfsxgrDOof7vSQec"
			redirectUri={redirectLocation}
		>
			<LoginButton redirectLocation={redirectLocation} />
		</Auth0Provider>
	);
};

export default Auth0;
