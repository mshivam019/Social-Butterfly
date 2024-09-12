import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import db from "../../../../utils/db";
import Flutter from "../../../../models/flutter";

export default withApiAuthRequired(async function handler(req, res) {
	try {
		switch (req.method) {
			case "PUT":
				await db.connect();

				if (!req.body._id || !req.body.userId) {
					return res
						.status(400)
						.json({ error: "Missing required fields" });
				}

				const flutter = await Flutter.findOneAndUpdate(
					{ _id: req.body._id },
					{ $addToSet: { likes: req.body.userId } },
					{ new: true }
				);

				if (!flutter) {
					return res.status(404).json({ error: "Flutter not found" });
				}

				res.status(200).json(flutter);
				break;
			default:
				res.status(405).json({ error: "Method not allowed" });
				break;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	} finally {
		await db.disconnect();
	}
});
