import { Helmet } from "react-helmet-async";

export default function SEO({

    title,
    description,
    keywords,
    image = "https://www.ciclosebiorritmos.com/logo512.png",
    url = "https://www.ciclosebiorritmos.com",

}) {

    return (

        <Helmet>

            <title>{title}</title>

            <meta
                name="description"
                content={description}
            />

            <meta
                name="keywords"
                content={keywords}
            />

            <meta
                name="robots"
                content="index,follow,max-image-preview:large"
            />

            <meta
                name="author"
                content="Ciclos e Biorritmos"
            />

            <link
                rel="canonical"
                href={url}
            />

            {/* Open Graph */}

            <meta property="og:type" content="website"/>

            <meta property="og:title" content={title}/>

            <meta property="og:description" content={description}/>

            <meta property="og:image" content={image}/>

            <meta property="og:url" content={url}/>

            <meta property="og:site_name" content="Ciclos e Biorritmos"/>

            <meta property="og:locale" content="pt_BR"/>

            {/* Twitter */}

            <meta name="twitter:card" content="summary_large_image"/>

            <meta name="twitter:title" content={title}/>

            <meta name="twitter:description" content={description}/>

            <meta name="twitter:image" content={image}/>

        </Helmet>

    );

}