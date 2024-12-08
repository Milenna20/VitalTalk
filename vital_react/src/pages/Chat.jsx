import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLogo from '../assets/images/user.png'
import axios from "axios";
import "../styles/chat.css";

const Chat = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("chat-page");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [moodData, setMoodData] = useState({
        "Muy mal": 0,
        "Mal": 0,
        "Regular": 0,
        "Bien": 0,
        "Muy bien": 0,
    });
    const [loading, setLoading] = useState(false);  

    const updateMoodStats = () => {
        const totalMoods = Object.values(moodData).reduce((a, b) => a + b, 0);
        return Object.entries(moodData).map(([mood, count]) => {
            const percentage = totalMoods > 0 ? (count / totalMoods) * 100 : 0;
            return (
                <div key={mood}>
                    <p>{`${mood}: ${count}`}</p>
                    <div
                        className="mood-stat-bar"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            );
        });
    };

    const usuario = JSON.parse(localStorage.getItem('data'));
    const nombreUsuario = usuario.nombre + ' ' + usuario.apellido
    

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
        const savedMoodData = JSON.parse(localStorage.getItem("moodData")) || {
            "Muy mal": 0,
            "Mal": 0,
            "Regular": 0,
            "Bien": 0,
            "Muy bien": 0,
        };

        setMessages(savedMessages);
        setMoodData(savedMoodData);
    }, []);

    const showPage = (pageId) => {
        setActivePage(pageId);
    };

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = { sender: "user", text: message };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            localStorage.setItem("messages", JSON.stringify(updatedMessages));

            setMessage("");
            setLoading(true);  

            try {
                const userId = localStorage.getItem("usuario_id");
                const response = await axios.post("http://localhost:3000/ask", {
                    user_id: userId,
                    message: message,
                });
                const botMessage = { sender: "bot", text: response.data.respuesta };
                const newMessages = [...updatedMessages, botMessage];
                setMessages(newMessages);
                localStorage.setItem("messages", JSON.stringify(newMessages));
            } catch (error) {
                const errorMessage = { sender: "bot", text: "Lo siento, hubo un problema al procesar tu mensaje." };
                const newMessages = [...updatedMessages, errorMessage];
                setMessages(newMessages);
                localStorage.setItem("messages", JSON.stringify(newMessages));
            } finally {
                setLoading(false);  
            }
        }
    };

    const trackMood = (mood) => {
        const updatedMoodData = {
            ...moodData,
            [mood]: moodData[mood] + 1,
        };
        setMoodData(updatedMoodData);
        localStorage.setItem("moodData", JSON.stringify(updatedMoodData));
    };

    const logout = () => {
        localStorage.removeItem("data");
        localStorage.removeItem("messages");
        localStorage.removeItem("usuario_id");
        localStorage.removeItem("moodData");
        navigate("/");
    };

    return (
        <div className="container_chat">
            {activePage === "chat-page" && (
                <div id="chat-page" className="page active">
                    <div className="header">
                        <div className="logo_user">
                        <Link to="/formulario">
                        <img className="logo" src={UserLogo} alt="" />
                        </Link>
                        <span>
                            {nombreUsuario}
                        </span>
                        </div>
                        <button onClick={logout}>Cerrar Sesión</button>
                        <button onClick={() => showPage("mood-page")}>Seguimiento Emocional</button>
                    </div>
                    <div id="chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    msg.sender === "user" ? "user-message" : "bot-message"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="message bot-message">
                                <em>Estamos procesando tu mensaje...</em>
                            </div>
                        )}
                    </div>
                    <div id="user-input">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe tu mensaje aquí..."
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
            )}
            {activePage === "mood-page" && (
                <div id="mood-page" className="page">
                    <div className="header">
                        Seguimiento Emocional
                        <button onClick={() => showPage("chat-page")}>Volver al Chat</button>
                    </div>
                    <div id="mood-tracker">
                        <h2>¿Cómo te sientes ahora?</h2>
                        <button onClick={() => trackMood("Muy mal")}>😢</button>
                        <button onClick={() => trackMood("Mal")}>🙁</button>
                        <button onClick={() => trackMood("Regular")}>😐</button>
                        <button onClick={() => trackMood("Bien")}>🙂</button>
                        <button onClick={() => trackMood("Muy bien")}>😄</button>
                    </div>
                    <div className="container_recursos">
                        <Link to="/recursos" className="recursos">Ir a Recursos</Link>
                    </div>
                    <div id="mood-stats">
                        <h2>Historial de Estado de Ánimo</h2>
                        {updateMoodStats()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;



