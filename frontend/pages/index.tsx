import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'

import React from "react"
import { useEffect, useState } from "react"

import Main from '../components/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-backgroundColor'>
      <Head>
        <title>weather-changing</title>
        <meta name='description' content='Published by LockPaoMai' />
      </Head>
      <Main/>
    </div>
  )
}

