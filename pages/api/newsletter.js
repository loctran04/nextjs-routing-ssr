function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        if (!email || !email.includes("@")) {
            res.status(422).json({ message: "Some data is missing!" });
            return;
        }
        console.log(email);
        res.status(200).json({
            message: "Thank you for subscribing to our newsletter",
        });
    }
}

export default handler;
