// Dropdown function
const dropBtn = document.querySelector(".Dropdown-title");
const droplist = document.querySelector(".list");

function toggleDropdown() {
    if (droplist.style.display === 'none' || droplist.style.display === '') {
        droplist.style.display = 'block';
    } else {
        droplist.style.display = 'none';
    }
}

dropBtn.addEventListener('click', toggleDropdown);

// Initial state
droplist.style.display = 'none';

// Temporary heading (random welcome text)
const theading = document.querySelector("#temp-heading");

function setRandomQuestion() {
    const messages = [
        "How can I help you?",
        "What’s in your mind today?",
        "What’s on the agenda today?",
        "Where should we begin?",
        "What can I help with?",
        "Ready when you are.",
        "What are you working on?"
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    theading.textContent = messages[randomIndex];
}

setRandomQuestion();

// Input + Submit button logic
const input = document.getElementById('user-input');
const submitDiv = document.querySelector('#sent-or-call');

function updateSubmitIcon() {
    const hasText = input.value.trim().length > 0;

    if (hasText) {
        submitDiv.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
        submitDiv.style.color = 'black';
    } else {
        submitDiv.innerHTML = `<img src="./Assets/images/call.png" alt="call">`;
        submitDiv.style.color = ''; // default
    }
}

// Real-time update (input event better than setInterval)
input.addEventListener('input', updateSubmitIcon);

// Initial check
updateSubmitIcon();

// Click handler (call ya send dono handle karega)
submitDiv.addEventListener('click', () => {
    const hasText = input.value.trim().length > 0;

    if (hasText) {
        console.log("Send message:", input.value);
        // yahan future mein AI call ya chat append karna hai
        // input.value = ""; // optional: clear after send
        // updateSubmitIcon();
    } else {
        console.log("usercall is working (mic/call button)");
        // yahan call/mic ka logic aayega
    }
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