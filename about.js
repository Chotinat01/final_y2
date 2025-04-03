const BASE_URL = 'http://localhost:8600'

const images = ["picture/me3.jpg", "picture/me.jpg", "picture/me2.jpg"];
        let currentIndex = 0;
        //กดกลับ
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // บวกกับจำนวนภาพทั้งหมด (เพื่อป้องกัน Index ติดลบ) %คือวนกลับไปที่รูปสุดท้ายอัตโนมัติ ถ้า currentIndex ติดลบ
            document.getElementById("creator-image").src = images[currentIndex]; //กำหนด src ของ img ให้เป็น Path ของรูปภาพจาก images[currentIndex]
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            document.getElementById("creator-image").src = images[currentIndex];
        }