import Head from "next/head";
import ClientOnly from "../../components/clientonly";
import Launches from "../../components/launches";

// https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
export default function ClientSide() {
    return (
        <div className="">
            <Head>
                <title>Client</title>
            </Head>

            <main className="">
                <h1>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <Launches />
            </main>
        </div>
    );
}
