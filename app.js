// app.js

// Dropdown function (tumhara code)
const dropBtn = document.querySelector(".Dropdown-title");
const droplist = document.querySelector(".list");

dropBtn.addEventListener('click', checkDisplay);

displayNone();
function checkDisplay() {
    if (droplist.style.display === 'none') {
        displayBlock();
    } else {
        displayNone();
    }
}
function displayNone() {
    droplist.style.display = 'none';
}
function displayBlock() {
    droplist.style.display = 'block';
}

// Temporary heading (random text)
const tempHeading = document.querySelector("#temp-heading");

function randomQ() {
    const texts = [
        "How can I help you?",
        "What’s in your mind today?",
        "What’s on the agenda today?",
        "Where should we begin?",
        "What can I help with?",
        "Ready when you are.",
        "What are you working on?"
    ];
    const random = texts[Math.floor(Math.random() * texts.length)];
    tempHeading.textContent = random;
}
randomQ();

// Input icon change (call → arrow)
const input = document.getElementById('user-input');
const submit = document.getElementById('sent-or-call');

setInterval(() => {
    if (input.value.trim() === '') {
        submit.innerHTML = `<img src="./Assets/images/call.png" alt="">`;
        submit.style.backgroundColor = 'white';
    } else {
        submit.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
        submit.style.backgroundColor = 'white';
        submit.style.color = 'black';
    }
}, 100);

// AI Chat Logic
const API_KEY = "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";
const MODEL = "tngtech/deepseek-r1t2-chimera:free";

const chatContainer = document.getElementById('chat');
const historyContainer = document.getElementById('searchHistory');
const newChatBtn = document.getElementById('new-chat-btn');

let currentChatId = Date.now().toString();
let chats = JSON.parse(localStorage.getItem('chatGPTChats')) || {};
let currentMessages = [];
let isFirstMessage = true;

// Auto resize textarea
input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
});

function addMessage(content, role) {
    const msgDiv = document.createElement("div");
    msgDiv.className = role === "user" ? "user-message" : "ai-message";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = content;

    msgDiv.appendChild(contentDiv);
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return contentDiv;
}

function showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "ai-message loading";
    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = "";
    loadingDiv.appendChild(content);
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return content;
}

function cleanMarkdown(text) {
    let cleaned = text;
    cleaned = cleaned.replace(/---+/g, '\n');
    cleaned = cleaned.replace(/#{1,6}\s*/g, '');
    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
    cleaned = cleaned.replace(/\*(.*?)\*/g, "'$1'");
    cleaned = cleaned.replace(/^\s*[-*+]\s*/gm, '• ');
    cleaned = cleaned.replace(/^\s*(\d+\.)\s*/gm, '$1 ');
    cleaned = cleaned.replace(/^\s*>\s*/gm, '');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    return cleaned.trim();
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Pehla message bhejte hi temp heading remove kar do
    if (isFirstMessage) {
        if (tempHeading) {
            tempHeading.remove();
        }
        isFirstMessage = false;
    }

    addMessage(text, "user");
    currentMessages.push({ role: "user", content: text });

    input.value = "";
    input.style.height = "auto";

    submit.style.pointerEvents = "none";

    const loadingContent = showLoading();

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin,
                "X-Title": "Chat GPT Web App",
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful, friendly and conversational AI assistant. 
Always respond naturally in Roman Urdu or Urdu-English mix, just like the user is talking.
Keep answers clear, engaging and well-structured with paragraphs when needed.
At the VERY END of EVERY response, always add 2-3 short, interesting follow-up questions in this EXACT format:

Suggested questions:
1. [short question]
2. [short question]
3. [short question (optional)]

Do NOT add anything after the suggested questions. Keep the suggestions relevant to the current conversation.`
                    },
                    ...currentMessages
                ],
                temperature: 0.7,
                max_tokens: 2048,
            })
        });

        if (!res.ok) throw new Error((await res.json()).error?.message || "API error");

        const data = await res.json();
        let reply = data.choices?.[0]?.message?.content || "No response";
        reply = cleanMarkdown(reply);

        loadingContent.textContent = reply;
        loadingContent.parentElement.classList.remove("loading");

        currentMessages.push({ role: "assistant", content: reply });

        saveCurrentChat();

    } catch (err) {
        loadingContent.textContent = "Error: " + err.message;
        loadingContent.style.color = "#ff6b6b";
        loadingContent.parentElement.classList.remove("loading");
    } finally {
        submit.style.pointerEvents = "auto";
        input.focus();
    }
}

// Events
submit.addEventListener("click", sendMessage);

input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

newChatBtn.addEventListener("click", () => {
    if (confirm("Naya chat shuru karna hai? Current chat save ho jayega.")) {
        currentChatId = Date.now().toString();
        currentMessages = [];
        chatContainer.innerHTML = "";
        tempHeading.textContent = "";
        randomQ();  // New chat pe phir se random text (agar chaho to yeh line hata dena)
        isFirstMessage = true;
        loadHistory();
        input.focus();
    }
});

// History Functions
function loadHistory() {
    if (!historyContainer) return;

    historyContainer.innerHTML = '';
    Object.keys(chats).forEach(id => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.textContent = chats[id].title || "New Chat";
        item.dataset.id = id;

        if (id === currentChatId) item.classList.add("active");

        item.addEventListener("click", () => loadChat(id));
        historyContainer.appendChild(item);
    });
}

function loadChat(chatId) {
    currentChatId = chatId;
    currentMessages = chats[chatId]?.messages || [];
    chatContainer.innerHTML = '';
    currentMessages.forEach(msg => addMessage(msg.content, msg.role));

    document.querySelectorAll('.history-item').forEach(item => {
        item.classList.toggle("active", item.dataset.id === chatId);
    });

    input.focus();
}

function saveCurrentChat() {
    if (currentMessages.length === 0) return;

    const firstMsg = currentMessages.find(m => m.role === "user")?.content || "New Chat";
    const title = firstMsg.substring(0, 60) + (firstMsg.length > 60 ? "..." : "");

    chats[currentChatId] = { title, messages: currentMessages };
    localStorage.setItem('chatGPTChats', JSON.stringify(chats));
    loadHistory();
}

// Initial load
loadHistory();
if (Object.keys(chats).length > 0) {
    const latest = Object.keys(chats).sort().pop();
    loadChat(latest);
}