// ─────────────────────────────────────────────
// IMPORTANT: All DOM elements should be selected at the TOP
// ─────────────────────────────────────────────
const dropBtn     = document.querySelector(".Dropdown-title");
const droplist    = document.querySelector(".list");
const theading    = document.querySelector("#temp-heading");
const input       = document.getElementById('user-input');
const submitDiv   = document.querySelector('#sent-or-call');
const chatbox     = document.getElementById('chat');          // ← THIS WAS COMMENTED → UNCOMMENT THIS

// Dropdown function (unchanged)
function toggleDropdown() {
    if (droplist.style.display === 'none' || droplist.style.display === '') {
        droplist.style.display = 'block';
    } else {
        droplist.style.display = 'none';
    }
}

dropBtn.addEventListener('click', toggleDropdown);
droplist.style.display = 'none';

// Random welcome text (unchanged)
function setRandomQuestion() {
    const messages = [
        "How can I help you?",
        "Where should we begin?",
        "What can I help with?",
        "Ready when you are.",
        "What are you working on?"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    theading.textContent = messages[randomIndex];
}
setRandomQuestion();

// Submit icon logic (unchanged)
function updateSubmitIcon() {
    const hasText = input.value.trim().length > 0;
    if (hasText) {
        submitDiv.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
        submitDiv.style.color = 'black';
    } else {
        submitDiv.innerHTML = `<img src="./Assets/images/call.png" alt="call">`;
        submitDiv.style.color = '';
    }
}

input.addEventListener('input', updateSubmitIcon);
updateSubmitIcon();

// ─────────────────────────────────────────────
// FIXED CLICK HANDLER
// ─────────────────────────────────────────────
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();           // new line na banay
        submitDiv.click();            // same logic trigger karo
    }
});submitDiv.addEventListener('click', () => {
    const message = input.value.trim();
    if (!message) return;

    const div = document.createElement('div');
    div.className = 'user-bobble';

    const p = document.createElement('p');
    p.textContent = message;

    div.appendChild(p);
    chatbox.appendChild(div);

    // ─── Ye styles zaroori hain text wrap ke liye ───
    div.style.backgroundColor   = 'var(--bg-Light-Gray)';
    div.style.border            = 'none';
    div.style.borderRadius      = '15px';
    div.style.padding           = '8px 14px';          // thoda comfortable padding
    div.style.boxShadow         = '0px 0px 5px var(--bg-Black)';
    div.style.maxWidth          = '75%';               // ya 400px — dono theek, 75% zyada responsive
    div.style.width             = 'fit-content';
    div.style.display           = 'inline-block';      // ya 'flex' bhi chalega lekin inline-block behtar

    // Ye teen lines text ko wrap karne ke liye sabse zaroori hain
    div.style.wordWrap          = 'break-word';        // ya wordBreak: 'break-word'
    div.style.whiteSpace        = 'pre-wrap';          // normal line breaks + wrapping
    div.style.overflowWrap      = 'break-word';        // modern name for word-wrap

    // Optional: better readability
    p.style.margin              = '0';
    p.style.wordBreak           = 'break-word';        // extra safety

    input.value = "";
    theading.style.display = 'none';
    chatbox.scrollTop = chatbox.scrollHeight;
});
// ─────────────────────────────────────────────
// Commented code jo abhi bhi useful ho sakta hai (nahi hataya)
// ─────────────────────────────────────────────

/*
// AI functionality started from here 
const ApiKey = "sk-or-v1-XXXXXXXXXXX";
const MODEL = "";

async function askAI(prompt) {
    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",  
                "X-Title": "My Test App"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 200
            })
        });

        if (!res.ok) {
            const err = await res.json();
            console.log("Error:", err.error?.message || res.status);
            return;
        }

        const data = await res.json();
        let reply = data.choices?.[0]?.message?.content;
        console.log("AI reply:", reply);
    } catch (e) {
        console.log("Fetch fail:", e.message);
    }
}

// For Test 
// askAI("Elon Musk ke baare mein 50 words mein bata");
*/

/*
// jsonplaceholder users fetch (testing ke liye tha)
async function getUsers() {
    try {
        loading.textContent = 'loading...'
        let response = await fetch("https://jsonplaceholder.typicode.com/users")
        let data = await response.json();
        loading.textContent = " "

        container.innerHTML = data.map(item => `
            <h2>${item.name}</h2>
            <div class="user-info"><span class="label">Username:</span> ${item.username}</div>
            <div class="user-info"><span class="label">Email:</span> ${item.email}</div>
            <div class="user-info"><span class="label">Phone:</span> ${item.phone}</div>
        `).join('');
    } catch (error) {
        loading.textContent = ""
        err.textContent = `${error}`
    }
}
*/