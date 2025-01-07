// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/db"
import mongoose from "mongoose"


export default function handler(req, res) {
  db.connectDb()
  db.disconnectDb()

  res.status(200).json({ name: "John Doe" })
}

