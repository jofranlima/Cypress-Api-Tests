let fs = require("fs");
let { render } = require("mustache");


async function collectCypressTestResults(results) {

    const browserNameCapitalized = results.browserName.charAt(0).toUpperCase() + results.browserName.slice(1)

    const durationInMillis = parseInt(JSON.stringify(results.totalDuration));
    const durationInSeconds = durationInMillis / 1000;

    let summary = {
        browser: browserNameCapitalized,
        passed: results.totalPassed,
        failed: results.totalFailed,
        pendind: results.totalPending,
        skipped: results.totalSkipped,
        duration: durationInSeconds
    }

    let template = fs.readFileSync("./.github/templates/summary.md").toString();
    let output = render(template, summary);
    fs.writeFileSync(`cypress/reports/summary-${results.browserName}.md`, output);
}



module.exports = collectCypressTestResults;