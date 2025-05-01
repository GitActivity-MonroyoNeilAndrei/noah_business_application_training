//CALENDAR VIEW - ARC09032024
$(document).ready(function () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function generateCalendar(month, year, calendarId) {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        $(`#month-${calendarId}`).text(monthNames[month]);
        $(`#year-${calendarId}`).text(year);

        let calendarBody = `
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>`;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            calendarBody += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    calendarBody += "<td></td>";
                } else if (date > daysInMonth) {
                    break;
                } else {
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        calendarBody += `<td class="today">${date}</td>`;
                    } else {
                        calendarBody += `<td>${date}</td>`;
                    }
                    date++;
                }
            }
            calendarBody += "</tr>";
        }
        calendarBody += `
                </tbody>
            </table>`;
        $(`#calendar-${calendarId}`).html(calendarBody);
    }

    // Initialize both calendars
    generateCalendar(currentMonth, currentYear, 1);
    generateCalendar(currentMonth, currentYear, 2);

    $(`#next-1`).click(function () {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear, 1);
    });

    $(`#last-1`).click(function () {
        currentMonth = (currentMonth - 1 + 12) % 12;
        if (currentMonth === 11) {
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear, 1);
    });

    $(`#next-2`).click(function () {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear, 2);
    });

    $(`#last-2`).click(function () {
        currentMonth = (currentMonth - 1 + 12) % 12;
        if (currentMonth === 11) {
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear, 2);
    });
});