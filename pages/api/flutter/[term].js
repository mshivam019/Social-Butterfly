import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import db from "../../../utils/db";
import Flutter from "../../../models/flutter";

export default withApiAuthRequired(async function handler(req, res) {
	try {
		switch (req.method) {
			case "GET":
				await db.connect();
				const term = req.query.term;
				const flutter = await Flutter.find({
					body: { $regex: term, $options: "i" },
				});
				res.status(200).json(flutter);
				break;
			default:
				res.status(405).end();
				break;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	} finally {
		await db.disconnect();
	}
});
