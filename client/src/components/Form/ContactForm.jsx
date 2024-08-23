import { Autocomplete, FormControl,Paper, FormGroup, TextField } from "@mui/material"

const role = ['python','c++','java']
const skill = ['data analysis','data visualization','machine learning']

function ContactForm() {
  return (
    <Paper>
        <form>
            <FormControl>
                <FormGroup row>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        size="Medium"
                    />
                    <Autocomplete
                        disablePortal
                        id="role"
                        name="role"
                        options={role}
                        renderInput={(params) => <TextField {...params} label="Role" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="skill"
                        name="skill"
                        options={skill}
                        renderInput={(params) => <TextField {...params} label="Skill" />}
                    />
                </FormGroup>
            </FormControl>
        </form>
    </Paper>
  )
}

export default ContactForm