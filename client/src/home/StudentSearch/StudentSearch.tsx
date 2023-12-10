import { ReactElement, useState } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    onSearch: (query: string) => void
}

export default (props: Props): ReactElement => {
    const [value, setValue] = useState('');
    const search = () => {
        props.onSearch(value);
    }
    return (
        <Container sx={{ mb: 2 }}>
            <TextField variant="outlined" size="small" sx={{ mr: 1 }} onChange={(e) => setValue(e.target.value)}></TextField>
            <Button variant="contained" onClick={search} style={{ marginTop: "4px" , backgroundColor: "#92C1B7" }}>Search</Button>
        </Container>
    );
}