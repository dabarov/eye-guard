// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

const ALARM_NAME = 'eyeguard';

const setAlarm = (event) => {
    const minutes = parseInt(event.target.value);
    chrome.storage.local.set({ minutes: minutes });
    minutesValue.textContent = minutes.toString();
    chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: minutes,
        periodInMinutes: minutes,
    });
}

const openEyeExercise = async () => {
    chrome.tabs.create({ url: "chrome://newtab/" });
};

const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


const showTimeLeft = async () => {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (!alarm) return;
    const scheduledTime = alarm.scheduledTime;
    const timeLeft = new Date(scheduledTime - (new Date()).getTime());
    const h = timeLeft.getHours() - 1;
    const m = checkTime(timeLeft.getMinutes());
    const s = checkTime(timeLeft.getSeconds());
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(() => {
        showTimeLeft()
    }, 1000);
}

const rangeElement = document.getElementById('myRange');
const minutesValue = document.getElementById('minutesValue');
const storage_value = chrome.storage.local.get(['minutes']).then((result) => {
    if (typeof result !== undefined) {
        rangeElement.value = result.minutes;
        minutesValue.textContent = result.minutes;
    }
});

showTimeLeft();
rangeElement.addEventListener('change', setAlarm);
document.getElementById('try-now').addEventListener("click", async (e) => await openEyeExercise());
chrome.alarms.onAlarm.addListener(openEyeExercise);