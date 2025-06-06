"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { v4 as uuid } from "uuid"
import { supabase } from "../database/supabase"
import QRCode from "qrcode"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export async function createQRCode() {
  try {
    const id = uuid()

    // Générer l’image du QR Code (par ex., un lien vers l’instrument)
    const qrData = `${APP_URL}/instruments/${id}`
    const qrImageBuffer = await QRCode.toBuffer(qrData)

    // Créer un nom de fichier unique
    const fileName = `qr-codes/${id}.png`

    // Uploader sur Supabase
    const { data, error } = await supabase.storage
      .from("qr-codes")
      .upload(fileName, qrImageBuffer, {
        contentType: "image/png",
        upsert: true,
      })

    if (error) throw new Error(`Supabase upload error: ${error.message}`)
    
    console.log("QR Code uploaded successfully", data.path)

    // Obtenir l'URL publique de l'image
    const { data: publicUrlData } = supabase.storage
      .from("qr-codes")
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl

    if (!imageUrl) throw new Error("Failed to get QR code public URL")

    // Créer le QRCode dans la base de données
    const qrCode = await prisma.qRCode.create({
      data: {
        id,
        imageUrl,
      },
    })

    return { qrCode, success: true }

  } catch (error) {
    handleError({ error, message: "Error creating QR Code" })
    return { qrCode: null, success: false }
  }
}

export async function getQRCodeById(id: string) {
  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: {
        id
      }
    })
    
    return { qrCode, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting QR Code" })
    return { qrCode: null, success: false }
  }
}

