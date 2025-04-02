const BASE_URL = 'http://localhost:8600'

const images = ["picture/me3.jpg", "picture/me.jpg", "picture/me2.jpg"];
        let currentIndex = 0;

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            document.getElementById("creator-image").src = images[currentIndex];
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            document.getElementById("creator-image").src = images[currentIndex];
        }