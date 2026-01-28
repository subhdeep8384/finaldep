import { prisma } from "db/client";
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3002 });
console.log("WebSocket server started on ws://localhost:3002");
type Message =
    | {
        type: "create";
        email: string;
        name: string;
    }
    | {
        type: "get";
        name: string;
    };

wss.on("connection", (ws) => {
    console.log("connected")
    ws.on("message", async (msg) => {

        let parsedmsg: Message;
        try {
            parsedmsg = JSON.parse(msg.toString());
        } catch {
            ws.send(JSON.stringify({ error: "Invalid JSON" }));
            return;
        }

        if (parsedmsg.type === "create") {
            await prisma.user.create({
                data: {
                    email: parsedmsg.email,
                    name: parsedmsg.name
                }
            })

            ws.send(JSON.stringify({ type: "created" }))
        }
        else if (parsedmsg.type === "get") {
            const data = await prisma.user.findMany()
            ws.send(JSON.stringify(data))
        }
    })
})

