import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Nav from '../components/bonik/nav'

export default function Home() {
    return (
        <div>
            <Nav></Nav>
        </div>
    )
}