import { Button, Card, ConfigProvider, theme } from 'antd';
import React, { useState } from 'react';


const DarkModeToggle = () => {
    // const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);

return (
    <ConfigProvider>
        <Card style={{ width: "max-content" }}>
            <Button>
                Change Theme to {isDarkMode ? "Light" : "Dark"}
            </Button>
        </Card>
    </ConfigProvider>
)
};

export default DarkModeToggle;