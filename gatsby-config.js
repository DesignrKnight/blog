// require(`dotenv`).config();

// const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
// const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID;

module.exports = {
	siteMetadata: {
		// Used for the title template on pages other than the index site
		siteTitle: `Abel's Garage`,
		// Default title of the page
		siteTitleAlt: `Abel's Garage: Insights and Stories narrated by Abel`,
		// Can be used for e.g. JSONLD
		siteHeadline: `Abel's Garage`,
		// Will be used to generate absolute URLs for og:image etc.
		siteUrl: `https://garage.designrknight.com`,
		// Used for SEO
		siteDescription: `Insights and Stories narrated by Abel`,
		// Will be set on the <html /> tag
		siteLanguage: `en`,
		// Twitter Handle
		author: `@designrknight`,
	},
	plugins: [
		{
			resolve: `@lekoarts/gatsby-theme-minimal-blog`,
			// See the theme's README for all available options
			options: {
				navigation: [
					{
						title: `Blog`,
						slug: `/blog`,
					},
					{
						title: `About`,
						slug: `/about`,
					},
				],
				externalLinks: [
					{
						name: `Twitter`,
						url: `https://twitter.com/designrknight`,
					},
					{
						name: `GitHub`,
						url: `https://github.com/DesignrKnight`,
					},
					{
						name: `LinkedIn`,
						url: `https://www.linkedin.com/in/designrknight`,
					},
				],
			},
		},
		{
			resolve: `gatsby-omni-font-loader`,
			options: {
				enableListener: true,
				preconnect: [`https://fonts.gstatic.com`],
				interval: 300,
				timeout: 30000,
				// If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
				// See: https://github.com/LekoArts/gatsby-themes/tree/master/examples/minimal-blog#changing-your-fonts
				web: [
					{
						name: `IBM Plex Sans`,
						file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
					},
				],
			},
		},
		// googleAnalyticsTrackingId && {
		// 	resolve: `gatsby-plugin-google-analytics`,
		// 	options: {
		// 		trackingId: process.env.GOOGLE_ANALYTICS_ID,
		// 	},
		// },
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Abel's Garage`,
				short_name: `Abel's Garage`,
				description: `Insights and Stories narrated by Abel`,
				start_url: `/`,
				background_color: `#fff`,
				theme_color: `#6B46C1`,
				display: `standalone`,
				icons: [
					{
						src: `/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/android-chrome-384x384.png`,
						sizes: `384x384`,
						type: `image/png`,
					},
				],
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-twitter`,
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allPost } }) =>
							allPost.nodes.map((post) => {
								const url = site.siteMetadata.siteUrl + post.slug;
								const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

								return {
									title: post.title,
									date: post.date,
									excerpt: post.excerpt,
									url,
									guid: url,
									custom_elements: [{ 'content:encoded': content }],
								};
							}),
						query: `
              {
                allPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    excerpt
                    slug
                  }
                }
              }
            `,
						output: `rss.xml`,
						title: `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog`,
					},
				],
			},
		},
		// shouldAnalyseBundle && {
		// 	resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
		// 	options: {
		// 		analyzerMode: `static`,
		// 		reportFilename: `_bundle.html`,
		// 		openAnalyzer: false,
		// 	},
		// },
	].filter(Boolean),
};
