import { put } from "@vercel/blob";

export async function uploadPdf(filename: string, buffer: Buffer): Promise<string> {
  const blob = await put(filename, buffer, {
    access: "private",
    contentType: "application/pdf",
    addRandomSuffix: false,
  });
  return blob.url;
}