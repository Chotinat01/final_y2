const BASE_URL = 'http://localhost:8600'
/*
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบการเข้าสู่ระบบ
    if (username === "admin" && password === "1234") {
        alert("เข้าสู่ระบบสำเร็จ!");
        window.location.href = "user.html"; // เปลี่ยนเส้นทางไปหน้าถัดไป
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
});
*/
/*
function togglePassword() {
    const passwordInput = document.getElementById("password");
    // สลับการแสดงผลรหัสผ่าน
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
*/


const cheack_info = async () => {
    // ดึงค่าผู้ใช้ รหัสผ่านจากฟอร์ม
    const codename = document.getElementById("codename").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${BASE_URL}/login`, {codename, password});
        // ตรวจสอบผลลัพธ์จากเซิร์ฟเวอร์
        if (response.data.success) {
            alert('Login successful');
            // เพิ่มเงื่อนไขการเปลี่ยนหน้า
            if (codename === "maping") {
                window.location.href = 'user.html'; //ไปหน้าuser
            } else {
                window.location.href = 'list.html'; //ไปหน้าlist
            }

        } else {
            console.log('Invalid credentials:', response.data.message);
            alert('Codename or Password wrong!');
        }
    } catch (error) {
        console.error('Error login:', error);
        alert('Username or password is incorrect. Please try again.');
    }
}

// Event listener สำหรับฟอร์ม login
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    await cheack_info(); // เรียกใช้ฟังก์ชัน cheack_info() เพื่อทำการล็อกอิน
});
