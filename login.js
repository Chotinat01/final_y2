document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

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
