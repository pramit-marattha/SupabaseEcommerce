export default async function handler(req, res) {
  if (req.method === "POST") {
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method :${req.method}: not supported.` });
  }
}
