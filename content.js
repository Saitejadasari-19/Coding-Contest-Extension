function detectPlatform(url){
    if(url.includes("codeforces.com")){
        return "Codeforces";
    }
    if(url.includes("leetcode.com")){
        return "LeetCode";
    }    
    if(url.includes("hackerrank.com")){
        return "HackerRank";
    }   
    if(url.includes("atcoder.jp")){
        return "AtCoder";
    }
    if(url.includes("codechef.com")){
        return "CodeChef";
    }
    if(url.includes("geeksforgeeks.org")){
        return "GeeksforGeeks";
    }
    return "Unknown";
}
chrome.runtime.sendMessage({
    platform: detectPlatform(window.location.href),
    url: window.location.href
});