// Importações do React e bibliotecas externas
import React from 'react';
import { Switch } from 'antd';
import { BulbFilled } from '@ant-design/icons';

interface DarkModeSwitchProps {
    isDarkMode: boolean;
    onSwitchChange: (checked: boolean) => void;
}

// Componente DarkModeSwitch
const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ isDarkMode, onSwitchChange }) => {
    return (
        <Switch
            checked={isDarkMode}
            onChange={onSwitchChange}
            checkedChildren={<BulbFilled style={{ color: '#fff' }} />}
            unCheckedChildren={<BulbFilled style={{ color: '#333' }} />}
            title={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            style={{
                position: 'absolute',
                top: 10,
                left: 10, 
                backgroundColor: isDarkMode ? '#333' : '#fff',
                border: isDarkMode ? '1px solid #fff' : '1px solid #d9d9d9',
            }}
        />
    );
};

export default DarkModeSwitch;