import { Button } from '@primer/react'

export default function AuthButton({ disabled, onClick, value}) {
    return (
        <Button
            variant="primary"
            disabled={disabled}
            onClick={onClick}>
            {value}
        </Button>
    );
};