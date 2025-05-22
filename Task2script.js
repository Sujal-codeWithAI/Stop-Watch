document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStop');
    const lapBtn = document.getElementById('lap');
    const resetBtn = document.getElementById('reset');
    const lapsContainer = document.getElementById('laps');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    // Format time as HH:MM:SS
    function formatTime(ms) {
        let date = new Date(ms);
        return date.toISOString().substr(11, 8);
    }

    // Update the display
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    // Start or stop the stopwatch
    function toggleStartStop() {
        if (isRunning) {
            clearInterval(timerInterval);
            startStopBtn.textContent = 'Start';
            startStopBtn.style.backgroundColor = '#4CAF50';
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            startStopBtn.textContent = 'Stop';
            startStopBtn.style.backgroundColor = '#FF9800';
        }
        isRunning = !isRunning;
    }

    // Record lap time
    function recordLap() {
        if (!isRunning) return;
        
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-item';
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.prepend(lapTime);
    }

    // Reset the stopwatch
    function resetStopwatch() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#4CAF50';
        lapsContainer.innerHTML = '';
    }

    // Event listeners
    startStopBtn.addEventListener('click', toggleStartStop);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', resetStopwatch);

    // Initialize display
    updateDisplay();
});