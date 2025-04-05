import { FormControl, TextInput } from "@primer/react";

const AuthInput = ({ label, type, value, onChange }) => {
    return (
        <FormControl>
            <FormControl.Label>{label}</FormControl.Label>
            <TextInput
                type={type}
                autoComplete="off"
                value={value}
                onChange={onChange}
            />
        </FormControl>
    );
};

export default AuthInput;