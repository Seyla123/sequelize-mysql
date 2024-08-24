import {
  Autocomplete,
  FormControl,
  Paper,
  FormGroup,
  Select,
  TextField,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const role = ["python", "c++", "java"];
const skill = ["data analysis", "data visualization", "machine learning"];

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
          <Select>
            {skill.map((skills) => {
              return (
                <MenuItem value={skills} key={skills}>
                  <ListItemText primary={skills} />
                </MenuItem>
              );
            })}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    renderedInput={(params) => <TextField {...params} />}
                    value="abc"
                    onChange={()=>{}}

                ></DesktopDatePicker>
          </LocalizationProvider>
          <FormGroup row></FormGroup>
        </FormControl>
      </form>
    </Paper>
  );
}

export default ContactForm;
