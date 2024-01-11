import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Input, Modal, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const UserKeyPopup: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [userKey, setUserKey] = useState<string>(Cookies.get('user-key') || '');

    const handleButtonClick = () => {
        setOpen(true);
    };

    const handleSaveClick = () => {
        Cookies.set('user-key', userKey, { expires: 1 });
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Clique para editar a user-key">
            <Button icon={<SyncOutlined />} onClick={handleButtonClick}>
                User-Key
            </Button>
            </Tooltip>
            <Modal
                title="User-Key"
                open={open}
                onOk={handleSaveClick}
                onCancel={handleCancel}
                style={{ right: 0, left: 'auto' }}
            >
                <Input value={userKey} onChange={(e) => setUserKey(e.target.value)} />
            </Modal>
        </>
    );
};

export default UserKeyPopup;