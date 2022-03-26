import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";
import absoluteUrl from "next-absolute-url";

const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { image } = req.body;

    if (!image) {
      return res.status(500).json({ message: "There is no image" });
    }
    try {
      const imageType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];
      if (!imageType || !base64FileData) {
        return res.status(500).json({ message: "Image data not valid" });
      }
      const fileName = nanoid();
      const ext = imageType.split("/")[1];
      const path = `${fileName}.${ext}`;
      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .upload(path, decode(base64FileData), {
          imageType,
          upsert: true,
        });
      if (uploadError) {
        console.log(uploadError);
        throw new Error("Image upload Failed!!");
      }
      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ message: "Something went horribly wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method :${req.method}: is not supported.` });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

