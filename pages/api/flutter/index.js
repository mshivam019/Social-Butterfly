import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import db from "../../../utils/db";
import Flutter from "../../../models/flutter";

export default withApiAuthRequired(async function handler(req, res) {
	try {
		switch (req.method) {
			case "GET":
				const flutters = await Flutter.find().sort({ postedAt: -1 });
				res.status(200).json(flutters);
				break;
			case "POST":
				const pflutter = await Flutter.create(req.body);
				res.status(200).json(pflutter);
				break;
			case "PUT":
				const puflutter = await Flutter.findByIdAndUpdate(
					req.body._id,
					req.body
				);
				res.status(200).jsonpu(puflutter);
				break;
			case "DELETE":
				const dflutter = await Flutter.findByIdAndDelete(req.body._id);
				res.status(200).json(dflutter);
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