import React, { useState, useEffect, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "../css/AiFixes.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AIFixes() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialContent = location.state || "";
    const [query, setQuery] = useState(initialContent);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const apiUrl =import.meta.env.VITE_API_HOST_URL;

    const handleSearch = async () => {

        if (!query.trim()) return;
        setLoading(true);

        // Add user message
        setMessages(prev => [...prev, { role: "user", content: query }]);

        try {
            const payload = { messages: [{ content: query }] };
            const token = localStorage.getItem("token");
            const res = await fetch(`${apiUrl}`+"/ai/assitant", {
                method: "POST",
                 headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`   
                   },
               body: JSON.stringify(payload),
            });

            const data = await res.json();

            const content =
                (data?.choices?.[0]?.message?.content || "")
                    // .replace(/\n\s*\n/g, "\n");
                    .replace(/'}$/, "");

            setMessages(prev => [...prev, { role: "assistant", content }]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: `❌ ${err.message}` },
            ]);
        } finally {
            setLoading(false);
            setQuery("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSearch();
        }
    };
   

  const goBack = () => {
    navigate(-1); // navigates back one step
  };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

console.log("printing normal ",location.state)

    }, [messages, loading]);

    return (
        <div className="ai-fixes">
            <div className="container">
  <button onClick={goBack} className="primary">Go Back</button>
</div>
            {(messages.length > 0 || loading) && (
                <div className="chat-area">
                    {messages.map((m, i) => (
                        <div key={i} className={`message ${m.role}`}>
                            {m.role === "assistant" ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {m.content}
                                </ReactMarkdown>
                            ) : (
                                <p>{m.content}</p>
                            )}
                        </div>
                    ))}
                    {loading && <p className="loading">Thinking...</p>}
                    <div ref={chatEndRef} />
                </div>
            )}


            <div className="chat-input">
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    rows={2}
                />
                <button onClick={handleSearch} className="send-btn">➤</button>
            </div>
        </div>
    );
}

export default AIFixes;
