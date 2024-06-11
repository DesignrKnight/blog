import React from 'react';
import { useColorMode } from 'theme-ui';

const Tweet = ({ children }) => {
	const [colorMode] = useColorMode();

	return (
		<blockquote className="twitter-tweet" data-theme={colorMode}>
			{children}
		</blockquote>
	);
};

export default Tweet;
