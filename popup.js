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
    resultDiv.innerHTML = "Loading contests...";

    const contests = await fetchContests();

    const ongoing = contests.filter(isOngoing);
    const upcoming = contests.filter(isUpcoming);

    let html = "<h3>🔥 Ongoing Contests</h3>";

    if (ongoing.length === 0) {
        html += "<p>No ongoing contests right now.</p>";
    } else {
        ongoing.forEach(c => {
            html += `
                <div>
                    <b>${c.name}</b> (${c.site})<br>
                    Ends: ${formatTime(c.end_time)}<br><br>
                </div>
            `;
        });
    }

    html += "<hr><h3>⏳ Upcoming Contests</h3>";

    if (upcoming.length === 0) {
        html += "<p>No upcoming contests.</p>";
    } else {
        upcoming.slice(0, 20).forEach(c => {
            html += `
                <div>
                    <b>${c.name}</b> (${c.site})<br>
                    Starts: ${formatTime(c.start_time)}<br><br>
                </div>
            `;
        });
    }

    resultDiv.innerHTML = html;
};
