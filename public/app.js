document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentsTableBody = document.querySelector('#appointments-table tbody');
    const searchButton = document.getElementById('search-button');
    const searchDateInput = document.getElementById('search-date');

    const apiUrl = '/api/appointments';

    // 获取并显示所有预约
    const fetchAppointments = async (url = apiUrl) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('网络响应错误');
            const appointments = await response.json();
            renderAppointments(appointments);
        } catch (error) {
            console.error('获取预约失败:', error);
        }
    };

    // 渲染预约列表
    const renderAppointments = (appointments) => {
        appointmentsTableBody.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.customer_name}</td>
                <td>${appointment.phone}</td>
                <td>${appointment.service}</td>
                <td>${new Date(appointment.appointment_time).toLocaleString()}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editAppointment(${appointment.id}, '${appointment.customer_name}', '${appointment.phone}', '${appointment.service}', '${appointment.appointment_time}')">编辑</button>
                    <button onclick="deleteAppointment(${appointment.id})">删除</button>
                </td>
            `;
            appointmentsTableBody.appendChild(row);
        });
    };

    // 表单提交（创建/更新预约）
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('appointment-id').value;
        const appointmentData = {
            customer_name: document.getElementById('customer-name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            appointment_time: document.getElementById('appointment-time').value,
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });
            if (!response.ok) throw new Error('保存预约失败');
            appointmentForm.reset();
            fetchAppointments();
        } catch (error) {
            console.error('保存预约失败:', error);
        }
    });

    // 编辑预约
    window.editAppointment = (id, name, phone, service, time) => {
        document.getElementById('appointment-id').value = id;
        document.getElementById('customer-name').value = name;
        document.getElementById('phone').value = phone;
        document.getElementById('service').value = service;
        document.getElementById('appointment-time').value = new Date(time).toISOString().slice(0, 16);
    };

    // 删除预约
    window.deleteAppointment = async (id) => {
        if (!confirm('确定要删除此预约吗？')) return;

        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('删除预约失败');
            fetchAppointments();
        } catch (error) {
            console.error('删除预约失败:', error);
        }
    };

    // 按日期搜索
    searchButton.addEventListener('click', () => {
        const date = searchDateInput.value;
        if (date) {
            fetchAppointments(`${apiUrl}/date/${date}`);
        } else {
            fetchAppointments();
        }
    });

    // 初始加载
    fetchAppointments();
}); 