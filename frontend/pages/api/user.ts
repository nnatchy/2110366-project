// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from "../../lib/firebase"
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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = getFirestore(firebase);
  if (req.method === "GET") {
    res.status(200).json({
      faculty: "ENGINEER",
      building: "3",
      floor: "3",
      gender: "MALE",
      capacity: "4",
      moisture: 1000, // ความชื้น
      availableRoom: {
        "1": {
          waterPressure: 200
        },
        "2": {
          waterPressure: 200
        },
        "3": {
          waterPressure: 200
        },
        "4": {
          waterPressure: 200
        },
      }
    })
  }
}
