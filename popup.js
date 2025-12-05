async function fetchContests() {
    const codeForces = await fetch("https://codeforces.com/api/contest.list?gym=false");
    return await codeForces.json();
}

function formatTime(timestamp) {
    return new Date(timestamp).toUTCString();
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


    // Clear previous content
    resultDiv.textContent = "Codeforces Contests:\n\n";
    contests.result = contests.result.filter(c => c.phase === "BEFORE");

    if (contests.result.length === 0) {
        resultDiv.textContent = "No ongoing or upcoming contests.";
        return;
    }
    contests.result.forEach(contest => {
        const contestDiv = document.createElement("div");
        contestDiv.className = "contest";
        const title = document.createElement("h3");
        title.textContent = contest.name;
        contestDiv.appendChild(title);
        const startTime = document.createElement("p");
        startTime.textContent = `Start: ${new Date(contest.startTimeSeconds * 1000)}`;
        const endTime = document.createElement("p");
        endTime.textContent = `End: ${new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000)}`;
        contestDiv.appendChild(startTime);
        contestDiv.appendChild(endTime);
        resultDiv.appendChild(contestDiv);
        console.log(contest);   
    });

    const leetcodeDiv = document.getElementById("leetcode");
    leetcodeDiv.textContent = "LeetCode contests:\n\n";
    try {
        const leetcodeResponse = await fetch("https://alfa-leetcode-api.onrender.com/contests/upcoming");
        const leetcodeData = await leetcodeResponse.json();
        if (leetcodeData.length === 0) {
            leetcodeDiv.textContent = "No upcoming LeetCode contests.";
        }
        else { 
            leetcodeData.contests.forEach(contest => {
                const contestDiv = document.createElement("div");
                contestDiv.className = "contest";
                const title = document.createElement("h3");
                title.textContent = contest.title;
                contestDiv.appendChild(title);
                const startTime = document.createElement("p");
                startTime.textContent = `Start: ${formatTime(new Date(contest.originStartTime * 1000))}`;
                const endTime = document.createElement("p");
                endTime.textContent = `End: ${formatTime(new Date((contest.originStartTime + contest.duration) * 1000))}`;
                contestDiv.appendChild(startTime);
                contestDiv.appendChild(endTime);
                leetcodeDiv.appendChild(contestDiv);
            });
        }
    } catch (err) {
        resultDiv.textContent = "Failed to load contests.";
        console.error(err);
        return;
    }


}