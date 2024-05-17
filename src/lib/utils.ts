import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as base64 from "base64-js";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateTime: Date): string {
  return format(dateTime, "yyyy-MM-dd HH:mm:ss");
}
export function _raw_to_object(raw: string[]): any {
  const data: any = {};
  for (const i of raw) {
    if (i.length > 1) {
      const keyValue = i.split("=");
      const name = keyValue[0];
      const val = keyValue[1];
      data[name] = val;
    } else {
      data["NaN"] = "NaN";
    }
  }
  return data;
}
// export async function convertImageToBase64(imagePath: string): Promise<string> {
//   const imageBuffer = fs.readFileSync(imagePath);
//   const base64String = base64.fromByteArray(imageBuffer);
//   return base64String;
// }
