const BASE_URL = 'http://localhost:8600'

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('user page loaded');
    const response = await axios.get(`${BASE_URL}/employees`);
    console.log(response.data);

    const employeeDOM = document.getElementById('employee'); // ต้องมี <div id="employee"></div> ใน HTML

    let htmlData = '<table>';  // เริ่มต้นการสร้างตาราง
    htmlData += `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
            <th>Age</th>
            <th>Gender</th>
            <th class="balance" colspan="2">Modify</th>
        </tr>
    `;

    // สร้างแถวตารางสำหรับข้อมูลแต่ละแถว
    for (let i = 0; i < response.data.length; i++) {
        let employee = response.data[i];
        htmlData += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.firstname} ${employee.lastname}</td>
                <td>${employee.age}</td>
                <td>${employee.gender}</td>
                <td>${employee.action}</td>

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
    employeeDOM.innerHTML = htmlData; // ใส่ข้อมูลตารางลงใน DOM

    // ลบข้อมูลเมื่อคลิกปุ่ม delete
    const deleteDOMs = document.querySelectorAll('.delete'); // ใช้ querySelectorAll เพื่อเลือกปุ่ม delete ทุกปุ่ม
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            // ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/employees/${id}`);
                loadData(); // โหลดข้อมูลใหม่หลังจากลบเสร็จ
            } catch (error) {
                console.log('error', error);
            }
        });
    }
}
