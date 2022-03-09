import Document, { Html, NextScript, Main, Head } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;1,300;1,400&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main> </Main>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;