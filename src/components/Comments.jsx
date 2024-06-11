import React, { useEffect } from 'react';
import { useColorMode, Box, Divider } from 'theme-ui';

const id = 'inject-comments';

const Comments = ({ children }) => {
	const [colorMode] = useColorMode();

	useEffect(() => {
		const script = document.createElement('script');
		const parent = document.getElementById(id);

		script.setAttribute('src', 'https://giscus.app/client.js');
		script.setAttribute('data-repo', 'DesignrKnight/blog');
		script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnk0MDEwMTk2ODU');
		script.setAttribute('data-category', 'General');
		script.setAttribute('data-category-id', 'DIC_kwDOF-cTJc4CRwEK');
		script.setAttribute('data-mapping', 'pathname');
		script.setAttribute('data-strict', '1');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '1');
		script.setAttribute('data-input-position', 'top');
		script.setAttribute('data-theme', colorMode);
		script.setAttribute('data-lang', 'en');
		script.setAttribute('data-loading', 'lazy');

		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('async', 'true');
		parent.appendChild(script);

		return () => {
			while (parent.firstChild) {
				parent.removeChild(parent.lastChild);
			}
		};
	}, [colorMode]);

	return (
		<>
			<Divider />
			<Box sx={{ fontSize: [1, 1, 2] }}>
				<p>Let's chat. Reach out to me or express your thoughts via comments. 🚀</p>
			</Box>
			<div id={id} />
		</>
	);
};

export default Comments;
