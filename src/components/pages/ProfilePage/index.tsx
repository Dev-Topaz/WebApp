import React, { useState } from 'react';
import Notifications from 'src/components/Notifications';
import WalletConnection from 'src/components/profile/WalletConnection';
import PrivateProfile from 'src/components/profile/PrivateProfile';

const ProfilePage: React.FC = (): JSX.Element => {
    const [step, setStep] = useState<number>(0);

    const handleClick = (newStep: number) => () => {
        setStep(newStep);
    };

    return (
        <>
            {step === 0 && <WalletConnection onClickClose={handleClick(1)} />}
            {step === 1 && <PrivateProfile onClickNotifications={handleClick(2)} />}
            {step === 2 && <Notifications onClose={handleClick(1)} />}
        </>
    );
};

export default ProfilePage;
