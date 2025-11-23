async function fetchContests() {
    const res = await fetch("https://kontests.net/api/v1/all");
    return await res.json();
}

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleString();
}

function isOngoing(contest) {
    const now = Date.now();
    const start = new Date(contest.start_time).getTime();
    const end = new Date(contest.end_time).getTime();
    return now >= start && now <= end;
}

function isUpcoming(contest) {
    const now = Date.now();
    const start = new Date(contest.start_time).getTime();
    return start > now;
}

window.onload = async () => {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Loading contests...";

    let contests = [];
    try {
        contests = await fetchContests();
    } catch (err) {
        resultDiv.textContent = "Failed to load contests.";
        console.error(err);
        return;
    }

    const ongoing = contests.filter(isOngoing);
    const upcoming = contests.filter(isUpcoming);

    // Clear previous content
    resultDiv.textContent = "";

    // ---------------------------
    // Section: Ongoing Contests
    // ---------------------------

    const ongoingHeader = document.createElement("h3");
    ongoingHeader.textContent = "🔥 Ongoing Contests";
    resultDiv.appendChild(ongoingHeader);

    if (ongoing.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No ongoing contests right now.";
        resultDiv.appendChild(p);
    } else {
        ongoing.forEach(c => {
            const div = document.createElement("div");

            const title = document.createElement("b");
            title.textContent = `${c.name} (${c.site})`;
            div.appendChild(title);

            div.appendChild(document.createElement("br"));

            const end = document.createElement("span");
            end.textContent = "Ends: " + formatTime(c.end_time);
            div.appendChild(end);

            div.appendChild(document.createElement("br"));
            div.appendChild(document.createElement("br"));

            resultDiv.appendChild(div);
        });
    }

    // Divider
    const hr = document.createElement("hr");
    resultDiv.appendChild(hr);

    // ---------------------------
    // Section: Upcoming Contests
    // ---------------------------

    const upcomingHeader = document.createElement("h3");
    upcomingHeader.textContent = "⏳ Upcoming Contests";
    resultDiv.appendChild(upcomingHeader);

    if (upcoming.length === 0) {
        const p = document.createElement("p");
        p.textContent = "No upcoming contests.";
        resultDiv.appendChild(p);
    } else {
        upcoming.slice(0, 20).forEach(c => {
            const div = document.createElement("div");

            const title = document.createElement("b");
            title.textContent = `${c.name} (${c.site})`;
            div.appendChild(title);

            div.appendChild(document.createElement("br"));

            const start = document.createElement("span");
            start.textContent = "Starts: " + formatTime(c.start_time);
            div.appendChild(start);

            div.appendChild(document.createElement("br"));
            div.appendChild(document.createElement("br"));

            resultDiv.appendChild(div);
        });
    }
};
