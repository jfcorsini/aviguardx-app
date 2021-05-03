import { updateStatus } from "../../graphql/api";

export default async function entriesHandler(req, res) {
  const { body, method } = req;
  const { secret, status } = body;
  if (secret !== process.env.SUPER_SECRET) {
    return res.status(404).json({ error: "Wrong secret. Don't hack pls" });
  }

  switch (method) {
    case "PATCH":
      // Get data from your database
      const gqlResponse = await updateStatus(status);
      if (gqlResponse.errors) {
        return res.status(404).json(gqlResponse);
      }
      res.status(200).json({
        ...gqlResponse.data.updateStatus,
      });
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
