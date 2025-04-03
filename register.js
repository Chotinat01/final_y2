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
            const response = await axios.get(`${BASE_URL}/accounts/${id}`)
            const account = response.data;

            let codeNameDOM = document.querySelector('input[name=codename]');
            let passWordDOM = document.querySelector('input[name=password]');
            let emailDOM = document.querySelector('input[name=email]');
            let telDOM = document.querySelector('input[name=tel]');
           
    
            codeNameDOM.value = account.codename
            passWordDOM.value = account.password
            emailDOM.value = account.email
            telDOM.value = account.tel
        } catch (error) {
            console.log('error', error)
        }
    }
}

//ดักกรอกข้อมูลไม่ครบ
const validateDataAccounts= (accountData) => {
    let errors = []
    if (!accountData.codeName) {    
        errors.push('กรุณากรอกโค้ดเนม')
    }
    if (!accountData.passWord) {
        errors.push('กรุณาสร้างรหัสผ่าน')
    }
    if (!accountData.email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!accountData.tel) {
        errors.push('กรุณากรอกเบอร์โทรศัพท์')
    }
    return errors;
}

const submitDataAcc = async () => {
    let codeNameDOM = document.querySelector('input[name=codename]');
    let passWordDOM = document.querySelector('input[name=password]');
    let emailDOM = document.querySelector('input[name=email]');
    let telDOM = document.querySelector('input[name=tel]');
    let messageDOM = document.getElementById('message');

try {  
        let accountData = {
            codeName: codeNameDOM.value,
            passWord: passWordDOM.value,
            email: emailDOM.value,
            tel: telDOM.value,
        }
        
        console.log('submitDataAcc', accountData);

        let message = 'บันทึกข้อมูลเรียบร้อย'
        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/accounts`, accountData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/accounts/${selectedID}`, accountData);
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
