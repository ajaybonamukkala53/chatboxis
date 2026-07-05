# 💬 ChatBox - Real-Time Chat Application

A real-time chat application built using the **MERN Stack**, **Socket.IO**, and **Express.js**. The application enables users to join a chat room, send messages instantly, and view the number of users currently online.

---

## 🚀 Live Demo

### Frontend

https://chatboxis-3.onrender.com

### Backend

https://chatboxis-1.onrender.com

---

# 📌 Features

* 💬 Real-time messaging using Socket.IO
* 👤 Join chat with a username
* 🟢 Live online users count
* 📢 Join and leave notifications
* ⚡ Instant message delivery
* 📱 Responsive user interface
* 🌐 Deployed on Render
* 🔄 Cross-platform support

---

# 🛠 Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* CORS

### Deployment

* Render (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```text
chatboxis/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── socket.js
│   │   └── ...
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/ajaybonamukkala53/chatboxis.git
```

```bash
cd chatboxis
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🌍 Environment Variables

Create a `.env` file inside the `frontend` folder.

```env
REACT_APP_BACKEND_URL=https://chatboxis-1.onrender.com
```

---

# 🔌 Socket.IO Connection

```javascript
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket"],
});

export default socket;
```

---

# 📡 API

## Home

```
GET /
```

Response

```json
{
  "success": true,
  "message": "🚀 Chatbox Backend is Running Successfully!"
}
```

---

# 🚀 Deployment

## Backend

Hosted on Render

```
https://chatboxis-1.onrender.com
```

## Frontend

Hosted on Render

```
https://chatboxis-3.onrender.com
```

---

# 📸 Screenshots

Add screenshots of:

* Home Screen
* Chat Window
* User Joined
* Live Messages
* Mobile View

---

# 🔮 Future Enhancements

* User authentication
* Private messaging
* Group chat
* Message history using MongoDB
* File and image sharing
* Emoji support
* Typing indicators
* Online/offline status
* Push notifications
* Voice and video calling

---

# 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ajay Bonamukkala**

* GitHub: https://github.com/ajaybonamukkala53

---

⭐ If you found this project useful, consider giving it a star on GitHub!
