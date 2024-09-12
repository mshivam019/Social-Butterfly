import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import User from "../../../models/user";
import db from "../../../utils/db";

export default withApiAuthRequired(async function handler(req, res) {
	try {
		await db.connect();
		const { user } = await getSession(req, res);
		switch (req.method) {
			case "GET":
				const dbuser = await User.findOne({ email: user.email });
				if (!dbuser) {
					const newUser = new User({
						id: user.sid,
						email: user.email,
						name: user.name,
						picture: user.picture,
						nickname: user.nickname,
						data: {
							sub: user.sub,
						},
					});
					await newUser.save();
					res.status(200).json(newUser);
				} else {
					res.status(200).json(dbuser);
				}
				break;
			case "PUT":
				const updatedUser = await User.findByIdAndUpdate(req.body._id, {
					nickname: req.body.nickname,
					picture: req.body.picture,
				});
				res.status(200).json(updatedUser);
				break;
			default:
				res.status(405).json({ message: "Method not allowed" });
				break;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	} finally {
		await db.disconnect();
	}
});
