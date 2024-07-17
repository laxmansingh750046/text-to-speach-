let recognition; // Declare recognition variable outside the function

function speakText() {
    const inputText = document.getElementById("inputText").value;
    if (inputText.trim() !== "") {
        let speech = new SpeechSynthesisUtterance();
        speech.text = inputText;
        window.speechSynthesis.speak(speech);
    }
}

function startListening() {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en";
    recognition.continuous = true;
    recognition.interimResults = true;

    const outputText = document.getElementById("outputText");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        outputText.value = transcript;
    };

    recognition.onend = function () {
        startButton.style.display = "block";
        stopButton.style.display = "none";
    };

    startButton.style.display = "none";
    stopButton.style.display = "block";

    recognition.start();
}

function stopListening() {
    if (recognition && recognition.abort) {
        recognition.stop();
    }
}
