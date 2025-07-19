-- 创建美容店预约表
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(200) NOT NULL,
    appointment_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(appointment_time);
CREATE INDEX IF NOT EXISTS idx_appointments_service ON appointments(service);

-- 添加注释
COMMENT ON TABLE appointments IS '美容店预约表';
COMMENT ON COLUMN appointments.id IS '预约ID，主键';
COMMENT ON COLUMN appointments.customer_name IS '顾客姓名';
COMMENT ON COLUMN appointments.phone IS '顾客电话';
COMMENT ON COLUMN appointments.service IS '预约的服务项目';
COMMENT ON COLUMN appointments.appointment_time IS '预约时间';
COMMENT ON COLUMN appointments.created_at IS '创建时间';
COMMENT ON COLUMN appointments.updated_at IS '更新时间'; 