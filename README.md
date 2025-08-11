# Trivia API (Total 3 points)

## Fetch and Display a Random Trivia Question (2 points)
Use the Open Trivia Database API to fetch and display a new random trivia question only when the user clicks a button. Do not fetch a question automatically when the app loads.

Show this message when no question has been fetched yet "Click the button to get a trivia question!". Replace it once the user fetches the first question.

Use this API endpoint to fetch a single question:
`https://opentdb.com/api.php?amount=1`

## Handle API Rate Limiting (1 point)
The Open Trivia API restricts requests to one every 5 seconds per IP address. If requests are made too frequently, the API returns a **429 Too Many Requests** response.

- Detect this status and display the message: "Please try again in a moment." to inform the user.
