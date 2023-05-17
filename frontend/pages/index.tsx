import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'

import firebase from "../lib/firebase"
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import React from "react"
import { useEffect, useState } from "react"

import Floor from '../components/floor'
import Main from '../components/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const db = getFirestore(firebase);
  const toilets = collection(db, "toilets");

  getDocs(toilets).then((snapshot) => {
    console.log(snapshot.docs)
  })

  return (
    <div>
      <Head>
        <title>weather-changing</title>
        <meta name='description' content='Published by LockPaoMai' />
      </Head>
      <Main/>
    </div>
  )
}

