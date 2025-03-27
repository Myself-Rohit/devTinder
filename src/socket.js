import { Server } from "socket.io";

const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:5173",
		},
	});

	io.on("connection", (socket) => {
		socket.on("joinChat", ({ senderId, receiverId }) => {
			const roomId = [senderId, receiverId].sort().join("_");
			socket.join(roomId);
		});
		socket.on("sendMessage", ({ senderId, receiverId, message }) => {
			const roomId = [senderId, receiverId].sort().join("_");
			io.to(roomId).emit("messageReceived", {
				senderId,
				receiverId,
				message,
			});
		});
		socket.on("disconnect", () => {});
	});
};
export default initializeSocket;
