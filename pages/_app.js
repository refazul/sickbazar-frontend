import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client';

import 'tailwindcss/tailwind.css'
import '../styles/bonik/global.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}