import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Nav from '../components/bonik/nav'
import Body from '../components/bonik/body'
import { useQuery, gql } from '@apollo/client';

export default function Home({ rates }) {
    /*
    const { loading, error, data } = useQuery(gql`
    query Query($pageSize: Int) {
        launches(pageSize: $pageSize) {
          launches {
            mission {
              name
            }
            rocket {
              name
            }
          }
        }
      }
    `, {
        variables: { pageSize: 3 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data);
    */
    console.log(rates);
    return (
        <div>
            {
                rates.map((rate) => {
                    return (
                        <div>
                            <span>{rate.currency}</span>
                            <span>{' ' + rate.rate}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps() {
    const API_URL = 'https://48p1r2roz4.sse.codesandbox.io/'
    const query = `
    query GetExchangeRates($currency: String!) {
        rates(currency: $currency) {
            currency
            rate
        }
    }
    `;
    const variables = { "currency": "GBP" }
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()

    return {
        props: {
            rates: json.data.rates
        }
    }
}