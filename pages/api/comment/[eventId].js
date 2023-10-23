import firebase_app from "@/firebase/config";
import { ref, getDatabase, push, get } from "@firebase/database";

export default async function handler(req, res) {
    const eventId = req.query.eventId;
    if (!eventId) {
        res.status(422).json({ message: "Missing event id" });
    }
    const { name, email, comment } = req.body;
    const commentsDb = ref(getDatabase(firebase_app), "comments/" + eventId);
    if (req.method === "GET") {
        const response = await get(commentsDb);
        const data = response.val();
        const listComments = Object.keys(data).map((item) => {
            return {
                id: item,
                ...data[item],
            };
        });
        res.status(200).json({
            comments: listComments,
        });
    }
    if (req.method === "POST") {
        await push(commentsDb, {
            name,
            email,
            comment,
        });
        res.status(201).json({ message: "Added comment" });
    }
}
