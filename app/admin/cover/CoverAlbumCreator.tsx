"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Props {
  success: boolean
  error?: string
}

export default function CoverAlbumCreator({ success, error }: Props) {
  const router = useRouter()

  useEffect(() => {
    if (success) {
      toast.success("Kapak albümü oluşturuldu.")
    } else {
      toast.error(`Kapak albümü oluşturulurken hata oluştu: ${error}`)
    }
    router.refresh()
  }, [])

  return (
    <div className="w-[92%] mx-auto text-center my-20">
      Kapak albümü bulunamadı. Albüm Oluşturuluyor...
    </div>
  )
}