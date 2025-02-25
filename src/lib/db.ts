import mongoose from "mongoose";

export async function connectDB() {
	try {
		const { connection } = await mongoose.connect(
			process.env.MONGODB_URI as string
		);
		if (connection.readyState === 1) {
			return Promise.resolve(connection);
		}
	} catch (error) {
		console.error("Error connecting to database: ", error);
		return Promise.reject(error);
	}
}
export async function getConnectionDBClient(): Promise<mongoose.mongo.MongoClient> {
	return await connectDB().then((connection) => {
		if (!connection) {
			throw new Error("Failed to get a valid connection");
		}
		return connection.getClient();
	});
}
