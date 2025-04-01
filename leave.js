const BASE_URL = 'http://localhost:8600';

window.onload = async () => {
    await loadLeaveData();
}

const loadLeaveData = async () => {
    console.log('leave page loaded');
    const response = await axios.get(`${BASE_URL}/employees`);
    console.log(response.data);

    const leaveEmployeeDOM = document.getElementById('leave-employee');

    let htmlData = '<table border="1">';
    htmlData += `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date</th>
            <th>TimeStart</th>
            <th>TimeEnd</th>
        </tr>
    `;

    for (let i = 0; i < response.data.length; i++) {
        let employee = response.data[i];
        if (employee.action === 'ลา') {
            let formattedDate = new Date(employee.date).toLocaleDateString('th-TH');
            let StartTime = employee.timestart.slice(0, 5);
            let EndTime = employee.timeend.slice(0, 5);

            htmlData += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.firstname} ${employee.lastname}</td>
                    <td>${employee.action}</td>
                    <td>${formattedDate}</td>
                    <td>${StartTime}</td>
                    <td>${EndTime}</td>
                </tr>
            `;
        }
    }
    htmlData += '</table>';
    leaveEmployeeDOM.innerHTML = htmlData;
}