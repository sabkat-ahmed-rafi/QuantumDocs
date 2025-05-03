<h1 align="center">🗎 QuantumDoc</h1>
<h2 align="center">Real-time Collaborative Document Editor</h2>
<p align="center">
  QuantumDoc lets multiple users collaborate on rich-text documents in real time. Built with modern tech like <strong>Next.js</strong>, <strong>Quill.js</strong>, <strong>Y.js</strong>, and <strong>WebSockets</strong>.
</p>

## ✨ Features
-  **Rich-text editing** with Quill.js
-  **Real-time collaboration and CRDT** powered by Y.js and WebSockets
-  **Real-Time Communication** with messaging and video calls using Socket.IO and Agora RTC
-  **Role-based access control** for managing user permissions (admin, editor, viewer)
-  **Download documents** as PDF and DOCX formats
-  **User notes** for leaving notes or comments within documents
-  **Real-time Presence Indicators** to show who is currently online or viewing/editing the document
-  **Typing Indicators** to see when someone is typing in a shared document
-  **Autosave & persistent storage** using MongoDB
-  **Shareable links** for document access (planned)
-  **Responsive design** for both desktop and mobile


## 🔧 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Quill.js  
- **Backend**: Node.js, Express, Socket.IO 
- **Microservices**: User Service, Document Service, Communication Service 
- **Database**: MongoDB  
- **Real-time Sync**: Y.js (CRDT)  
- **Video/Audio**: Agora RTC  
- **Authentication**: Firebase/Auth  
- **State Management**: Redux Toolkit

## 📦 Installation
### 1. Clone the repository
```
git clone https://github.com/sabkat-ahmed-rafi/QuantumDocs.git
```

```
cd quantumdoc
```

### 2. Install frontend dependencies
```
cd frontend

npm install

npm run dev
```

### 3. Install backend services

- ### User Service
```
cd user-service

npm install
```

- ### Document Service
```
cd document-service

npm install
```

- ### Communication Service
```
cd communication-service

npm install
```