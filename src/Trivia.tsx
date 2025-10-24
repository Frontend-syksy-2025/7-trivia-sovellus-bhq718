import { useState } from "react";

type TriviaQuestion = {
    category: string;
    type: "multiple" | "boolean";
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export default function Trivia() {
    const [question, setQuestion] = useState<TriviaQuestion | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>(
        "Click the button to get a trivia question!"
    );

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://opentdb.com/api.php?amount=1");
            if (response.status === 429) {
                setQuestion(null);
                setMessage("Please try again in a moment.");
                setLoading(false);
                return;
            }
            if (!response.ok) {
            throw new Error("Error in fetch: " + response.statusText); 
            } 
            const data = await response.json();
            const results: TriviaQuestion[] = data.results || [];
            setQuestion(results[0]);
            setLoading(false);
        }
        catch(error: any) {
            console.error(error.statusText)
        }
    };

    function renderAnswers(question: TriviaQuestion) {
        const options = question.type === "multiple"
            ? [...question.incorrect_answers, question.correct_answer]
            : ["True", "False"];
        return (
            <div>
                <ul>
                    {options.map((option, i) => (
                    <li key={i}>
                        {option}
                    </li>
                    ))}
                </ul>
                
            </div>
        );
    }

    return (
        <>
            <div style={{marginLeft: 20}}>
                <button onClick={fetchQuestion} disabled={loading}>
                {loading ? "Loading..." : "Get a trivia question"}
                </button>

                {message && !question ? ( <p>{message}</p> ) : null}

                {question ? (
                    <div>
                        <h3>{question.question}</h3>
                        <p>Category: {question.category}</p>
                        <p>Difficulty: {question.difficulty}</p>
                        {renderAnswers(question)}
                    </div>
                ) : null}
            </div>
        </>
    );
}