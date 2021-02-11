import {useState, useEffect} from 'react';
import axios from 'axios';

import {Container, Box, Typography} from '@material-ui/core';

import {formBuilder} from './modules/forms/forms';
import {Question} from './core/models/question.model';

import './App.scss';

export const App = (): JSX.Element => {
  const [formData, setFormData] = useState<{ questions: any[] }>();

  useEffect(() => {
    (async function getData() {
      const result = await axios.get<{ questions: Question[] }>('/data/questions.json');
      setFormData(result.data);
    })();
  }, []);


  const onSubmit = (values: any) => {
    console.log(values);
    // alert(JSON.stringify(values));
    return;
  };

  if (!formData) {
    return (
      <Typography>...loading</Typography>
    );
  }

  const formGroupComponent = formBuilder(formData);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
             style={{minHeight: '300px', border: '1px solid grey'}}>
          <Box display="flex" flexDirection="column" width="100%">
            {formGroupComponent({onSubmit, label: 'Submit'})}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default App;
