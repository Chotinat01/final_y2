const BASE_URL = 'http://localhost:8600'

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('user page loaded');
    const response = await axios.get(`${BASE_URL}/employees`);
    console.log(response.data);

    const employeeDOM = document.getElementById('employee');

    let htmlData = '<table border="1">';
    htmlData += `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
            <th>Date</th>
            <th>TimeStart</th>
            <th>TimeEnd</th>
            <th class="balance" colspan="2">Modify</th>
        </tr>
    `;

    for (let i = 0; i < response.data.length; i++) {
        let employee = response.data[i];
        let formattedDate = new Date(employee.date).toLocaleDateString('th-TH'); // Format date
        let StartTime = employee.timestart.slice(0, 5); // Format time
        let EndTime = employee.timeend.slice(0, 5); // Format time

        htmlData += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.firstname} ${employee.lastname}</td>
                <td>${employee.age}</td>
                <td>${employee.gender}</td>
                <td>${employee.action}</td>
                <td>${formattedDate}</td>
                <td>${StartTime}</td>
                <td>${EndTime}</td> 
                <td>
                    <a href='form.html?id=${employee.id}'>
                        <button>Edit</button>
                    </a>
                </td>
                <td>
                    <button class="delete" data-id='${employee.id}'>Delete</button>
                </td>
            </tr>
        `;
    }
    htmlData += '</table>';
    employeeDOM.innerHTML = htmlData;

    const deleteDOMs = document.querySelectorAll('.delete');
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            if (confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
                try {
                    await axios.delete(`${BASE_URL}/employees/${id}`);
                    loadData();
                } catch (error) {
                    console.log('error', error);
                }
            }
        });
    }
    
}
