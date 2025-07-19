const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Supabase配置
const supabaseUrl = 'https://nyxfvbzrrqutzjbvepgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJlUzI1NilsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZil6lm55eGZ2YnpycnF1dHpqYnZlcGdwliwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzkyNzAslmV4cCI6MjA2ODUxNTI3MH0.0A-KIKJSOSLL5EpaipSuw_4SxVclu_FtT3ORsGwWSaA';

const supabase = createClient(supabaseUrl, supabaseKey);

// 中间件
app.use(express.json());
app.use(express.static('public'));

// 路由：获取所有预约
app.get('/api/appointments', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('appointment_time', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 路由：创建新预约
app.post('/api/appointments', async (req, res) => {
    try {
        const { customer_name, phone, service, appointment_time } = req.body;
        
        // 验证必填字段
        if (!customer_name || !phone || !service || !appointment_time) {
            return res.status(400).json({ error: '所有字段都是必填的' });
        }

        const { data, error } = await supabase
            .from('appointments')
            .insert([{ customer_name, phone, service, appointment_time }])
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 路由：更新预约
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_name, phone, service, appointment_time } = req.body;
        
        const { data, error } = await supabase
            .from('appointments')
            .update({ customer_name, phone, service, appointment_time, updated_at: new Date() })
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 路由：删除预约
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: '预约已删除' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 路由：按日期查询预约
app.get('/api/appointments/date/:date', async (req, res) => {
    try {
        const { date } = req.params;
        
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .gte('appointment_time', `${date}T00:00:00`)
            .lt('appointment_time', `${date}T23:59:59`)
            .order('appointment_time', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`美容店预约系统运行在 http://localhost:${PORT}`);
}); 