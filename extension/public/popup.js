document.getElementById("sendBtn").addEventListener('click', async () => {
    try {
        const prompt = document.querySelector(".userPrompt").value

        const res = await fetch("http://localhost:4500/home", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: prompt })
        });

        const data = await res.json()
        document.querySelector(".aiOutput").textContent = data.response;

    } catch (e) {
        console.error('ERROR:', e)
    }
})
