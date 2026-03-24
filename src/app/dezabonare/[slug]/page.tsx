import { updateUnsubscribeByToken } from "@/lib/notion"

type Props = { params: { slug: string } }

export default async function Page({ params }: Props) {
  const {slug} = await params
  const token = decodeURIComponent(slug)
  const success = await updateUnsubscribeByToken({ token })

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                text-center border border-cyan-500 font-mono px-10 py-5">
      {success
        ? "Te-ai dezabonat cu succes!"
        : "Token invalid sau deja dezabonat"}
    </div>
  )
}