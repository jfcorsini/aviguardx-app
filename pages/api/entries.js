import { createEntry } from "../../graphql/api";

export default async function entriesHandler(req, res) {
  const { body, method } = req;
  const { secret, ...entryData } = body;
  if (secret !== process.env.SUPER_SECRET) {
    return res.status(404).json({ error: "Wrong secret. Don't hack pls" });
  }

  switch (method) {
    case "POST":
      // Get data from your database
      const gqlResponse = await createEntry(entryData);
      if (gqlResponse.errors) {
        return res.status(404).json(gqlResponse);
      }
      res.status(200).json({
        ...gqlResponse.data.createEntry,
        jsonData: JSON.parse(gqlResponse.data.createEntry.jsonData),
      });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
