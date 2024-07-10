export const host =
  process.env.NODE_ENV === "production"
    ? "https://kaistvision.kaist.ac.kr"
    : "http://localhost:3000";

export function createImageUrl(path?: string) {
  return `https://jrglixhztdhphnzlkzrg.supabase.co/storage/v1/object/public${path}`;
}

export function createFileName(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return generateRandomString();
  }
  const extension = fileName.split(".").pop();
  return `${generateRandomString()}.${extension}`;
}

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
