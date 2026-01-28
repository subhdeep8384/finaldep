import { prisma } from "db/client";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const data = await prisma.user.findMany()
    res.send(data)
})
app.post("/", async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name
        }
    })

    res.send(user)
})

app.listen(3001, () => {
    console.log("Server is running on port 3000")
})