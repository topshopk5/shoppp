document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - 60; 
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Handling
    const form = document.getElementById('purchaseForm');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const phone = document.getElementById('phone').value;
        const phoneError = document.getElementById('phone-error');
        // Validate SDT Việt Nam
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        
        if (!vnf_regex.test(phone)) {
            phoneError.textContent = "Số điện thoại không hợp lệ (cần 10 số).";
            phoneError.style.display = 'block';
            return;
        } else {
            phoneError.style.display = 'none';
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        submitBtn.disabled = true;

        // --- CẤU HÌNH GỬI GOOGLE SHEET ---
        // Thay link script của bạn vào đây
        const scriptURL = 'LINK_GOOGLE_APPS_SCRIPT_CUA_BAN';

        let formData = new FormData(form);
        formData.append('time', new Date().toLocaleString());

        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                alert('Đặt hàng thành công! Shop sẽ liên hệ sớm ạ.');
                form.reset();
                submitBtn.innerHTML = 'GỬI ĐƠN HÀNG';
                submitBtn.disabled = false;
            })
            .catch(error => {
                alert('Lỗi mạng! Bạn vui lòng nhắn tin qua Messenger giúp Shop nhé.');
                submitBtn.innerHTML = 'THỬ LẠI';
                submitBtn.disabled = false;
            });
    });
});