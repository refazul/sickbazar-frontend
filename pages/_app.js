import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client';

import 'tailwindcss/tailwind.css'
import '../styles/bonik/global.css'
import Layout from '../components/bonik/layout'

import { Provider } from 'react-redux'
import store from '../store'

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
        </Provider>
    );
}