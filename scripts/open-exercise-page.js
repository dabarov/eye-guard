const openEyeExercise = async () => {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    console.log(alarm);
    chrome.tabs.create({ url: "chrome://newtab/" });
};

const ALARM_NAME = 'eyeguard';

async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1
        });
    }
}

createAlarm();

chrome.alarms.onAlarm.addListener(openEyeExercise);