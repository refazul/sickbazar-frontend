import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Nav from '../components/bonik/nav'
import Page from '../components/bonik/page'

export default function Home() {
    return (
        <div>
            <Page></Page>
        </div>
    )
}