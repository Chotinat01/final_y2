const BASE_URL = 'http://localhost:8600'

let mode = 'CREATE'; 
let selectedID = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'EDIT';
        selectedID = id;
        
        try {
            const response = await axios.get(`${BASE_URL}/employees/${id}`)
            const employee = response.data;

            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let timestartDOM = document.querySelector('input[name=timestart]');
            let timeendDOM = document.querySelector('input[name=timeend]');
            

            firstNameDOM.value = employee.firstname
            lastNameDOM.value = employee.lastname
            ageDOM.value = employee.age
            timestartDOM.value = employee.timestart.slice(0, 5) // Format time
            timeendDOM.value = employee.timeend.slice(0, 5) // Format time
            

            let genderDOMs = document.querySelectorAll('input[name=gender]') ;
            let actionDOMs = document.querySelectorAll('input[name=action]') ;

            for (let i = 0; i < genderDOMs.length; i++) {
                if (genderDOMs[i].value == employee.gender) {
                    genderDOMs[i].checked = true;
                }
            }
            for (let i = 0; i < actionDOMs.length; i++) {
                if (actionDOMs[i].value == employee.action) {
                    actionDOMs[i].checked = true;
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

const validateData = (employeeData) => {
    let errors = [] 
    if (!employeeData.firstName) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!employeeData.lastName) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!employeeData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!employeeData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    if (!employeeData.action) {
        errors.push('กรุณาเลือกการกระทำ')
    }
    if (!employeeData.timestart) {
        errors.push('กรุณาเลือกเวลาเริ่มต้น');
    }
    if (!employeeData.timeend) {
        errors.push('กรุณาเลือกเวลาสิ้นสุด');
    }
    if (employeeData.timestart >= employeeData.timeend) {
        errors.push('เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด');
    }
    
    return errors;
}

const submitData = async () => {
    //ให้พวก ข้างล่างนี้รับข้อมูลจากหน้าที่กรอก
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let actionDOM = document.querySelector('input[name=action]:checked') || {};
    let dateDOM = document.querySelector('input[name=date]');
    let timestartDOM = document.querySelector('input[name=timestart]');
    let timeendDOM = document.querySelector('input[name=timeend]');

    let messageDOM = document.getElementById('message');

try {  
    //
        let employeeData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            action: actionDOM.value,
            date: dateDOM.value,
            timestart: timestartDOM.value,
            timeend: timeendDOM.value,
            //cause: causeDOM.value,
        }
        console.log('submitData', employeeData);

        let message = 'บันทึกข้อมูลเรียบร้อย'
        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/employees`, employeeData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/employees/${selectedID}`, employeeData);
            message = 'แก้ไขข้อมูลเรียบร้อย'
            console.log('response', response.data);
        }
        
        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);

        if (error.response) {
            console.log('error.response', error.response.data.message);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }
        let htmlData = '<div>'
        htmlData += `<div> ${error.message} </div>`;
        htmlData += '<ul>';

        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li> ${error.errors[i]} </li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}

        