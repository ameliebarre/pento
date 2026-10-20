import { useState } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Button, Checkbox, Container, Heading, Input, Label, Text, Textarea, toast } from "@medusajs/ui"

type UploadedFile = { id: string; url: string }

const backendUrl = (import.meta.env.VITE_MEDUSA_BACKEND_URL as string | undefined) || ""

const MediaUploadsPage = () => {
  const [folder, setFolder] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploaded, setUploaded] = useState<UploadedFile[]>([])

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Choose at least one file first")
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      for (const file of files) formData.append("files", file)
      if (folder.trim()) formData.append("folder", folder.trim())

      const response = await fetch(`${backendUrl}/admin/uploads/to-folder`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }

      const data = (await response.json()) as { files: UploadedFile[] }
      setUploaded(data.files)
      setFiles([])
      toast.success(`Uploaded ${data.files.length} file(s) to Cloudinary`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast.success("URL copied")
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Container className="flex flex-col gap-y-6 p-6">
        <div className="flex flex-col gap-y-1">
          <Heading level="h1">Media Uploads</Heading>
          <Text className="text-ui-fg-subtle">
            Upload files to Cloudinary under a chosen folder — the stock Media uploader always uses
            the same default folder.
          </Text>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="folder">Folder (optional)</Label>
          <Input
            id="folder"
            placeholder="e.g. products/drop-chair"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="files">Files</Label>
          <input
            id="files"
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </div>

        <Button onClick={handleUpload} isLoading={isUploading} className="w-fit">
          Upload
        </Button>

        {uploaded.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <Label>Uploaded</Label>
            {uploaded.map((file) => (
              <div key={file.id} className="flex items-center gap-x-2">
                <Text className="truncate text-xs">{file.url}</Text>
                <Button size="small" variant="secondary" onClick={() => copyUrl(file.url)}>
                  Copy
                </Button>
              </div>
            ))}
          </div>
        )}
      </Container>

      <AttachImageUrlsSection />
    </div>
  )
}

type AttachResult = { title: string; handle: string; imageCount: number; thumbnail: string | null }

function AttachImageUrlsSection() {
  const [handle, setHandle] = useState("")
  const [imageUrls, setImageUrls] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [lifestyleImageUrl, setLifestyleImageUrl] = useState("")
  const [replace, setReplace] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [result, setResult] = useState<AttachResult | null>(null)

  const handleAttach = async () => {
    if (!handle.trim()) {
      toast.error("Enter a product handle first")
      return
    }

    const urls = imageUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean)

    setIsSaving(true)
    try {
      const response = await fetch(`${backendUrl}/admin/products/attach-image-urls`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          handle: handle.trim(),
          imageUrls: urls,
          replace,
          thumbnail: thumbnail.trim() || undefined,
          lifestyleImageUrl: lifestyleImageUrl.trim() || undefined,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || `Failed with status ${response.status}`)
      }

      setResult(data.product)
      toast.success(`Updated ${data.product.title}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to attach images")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Container className="flex flex-col gap-y-6 p-6">
      <div className="flex flex-col gap-y-1">
        <Heading level="h2">Attach Existing Cloudinary URLs to a Product</Heading>
        <Text className="text-ui-fg-subtle">
          No file transfer happens here — Medusa only stores the URL strings you paste below. Use
          this for images already hosted on Cloudinary (e.g. from the tool above, or uploaded
          directly on cloudinary.com).
        </Text>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="handle">Product handle</Label>
        <Input
          id="handle"
          placeholder="e.g. drop-chair"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="image-urls">Gallery image URLs (one per line)</Label>
        <Textarea
          id="image-urls"
          rows={6}
          className="font-mono text-xs"
          placeholder={"https://res.cloudinary.com/.../1.webp\nhttps://res.cloudinary.com/.../2.webp"}
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-x-2">
        <Checkbox id="replace" checked={replace} onCheckedChange={(checked) => setReplace(checked === true)} />
        <Label htmlFor="replace">Replace existing gallery instead of appending</Label>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL (hover image on the listing — optional)</Label>
        <Input
          id="thumbnail"
          placeholder="https://res.cloudinary.com/..."
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="lifestyle">Lifestyle image URL (default listing image — optional)</Label>
        <Input
          id="lifestyle"
          placeholder="https://res.cloudinary.com/..."
          value={lifestyleImageUrl}
          onChange={(e) => setLifestyleImageUrl(e.target.value)}
        />
      </div>

      <Button onClick={handleAttach} isLoading={isSaving} className="w-fit">
        Attach to Product
      </Button>

      {result && (
        <div className="flex flex-col gap-y-1">
          <Text className="text-ui-fg-subtle text-sm">
            {result.title} ({result.handle}) — {result.imageCount} image(s) in gallery
            {result.thumbnail ? ", thumbnail set" : ""}
          </Text>
        </div>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({ label: "Media Uploads" })

export default MediaUploadsPage
