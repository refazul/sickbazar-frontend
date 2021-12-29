import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client';

import 'tailwindcss/tailwind.css'
import '../styles/bonik/global.css'
import Layout from '../components/bonik/layout'

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}