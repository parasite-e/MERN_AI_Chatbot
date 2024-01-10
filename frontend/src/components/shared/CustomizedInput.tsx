import { TextField } from "@mui/material"

type Props = {
    name: string,
    type: string,
    label: string
}

const CustomizedInput = (props: Props) => {
    return (
        <TextField
            margin="normal"
            inputProps={{ style: { width: "400px", borderRadius: 10, fontSize: 20, color: "white" } }}
            name={props.name}
            type={props.type}
            label={props.label}
        />
    )
}

export default CustomizedInput