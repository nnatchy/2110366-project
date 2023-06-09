import Head from 'next/head'

import { Inter } from 'next/font/google'

import React from "react"

import Main from '../components/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>plants-watering</title>
        <meta name='description' content='Published by LockPaoMai' />
      </Head>
      <Main/>
    </div>
  )
}

