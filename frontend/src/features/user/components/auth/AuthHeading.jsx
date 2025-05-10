import { PageHeader } from '@primer/react';
import { Box } from "@primer/react";

const AuthHeading = ({title}) => {
    return (
        <div className="auth-heading">
            <Box>
                <PageHeader>
                    <PageHeader.TitleArea varient="large">
                        <PageHeader.Title>{title}</PageHeader.Title>
                    </PageHeader.TitleArea>
                </PageHeader>
            </Box>
        </div>
    );
}

export default AuthHeading;