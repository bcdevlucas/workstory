import {ReactElement, ReactNode} from 'react';
import {Question} from '../../core/models/question.model';
import SelectDropdown from './components/select-dropdown';
import TextInput from './components/text-input';
import {BaseInputProps} from './models/forms.model';
import {Typography} from '@material-ui/core';
import {Formik, Form} from 'formik';
import SubmitButton from './components/submit-button';

type FormInputFactoryType = (props: BaseInputProps) => ReactElement<typeof SelectDropdown | typeof TextInput>;

type ConfigFormFieldType = "text" | "dropdown";

interface FormWrapperProps {
  onSubmit: (values: any) => void;
  label: string;
}

const labelToId = (text: string) => text.replace(/([A-Za-z])/g, "$1");
// TODO: If we make the key value undefined which is preferable, we have to provide a text default to dropdowns....
const makeFormPair = (id: string) => ({[id]: ''});
const makeFormPairs = (labels: string[]) =>
  labels.map((l) => makeFormPair(labelToId(l)));
const makeFormGroup = (formPairs: ReturnType<typeof makeFormPairs>) =>
  formPairs.reduce((acc, cur) => ({...acc, ...cur}), {});

const MakeSelectBox = (
props: BaseInputProps = {
  value: "",
  placeholder: "",
  label: "",
  options: []
}): ReactElement => <SelectDropdown {...(props as any)} />;

const mapFormComponents = (type: ConfigFormFieldType) => {
  const componentToFormInputMap: Record<ConfigFormFieldType,
  FormInputFactoryType> = {
    text: MakeTextInput,
    dropdown: MakeSelectBox
  };

  return componentToFormInputMap[type];
};

const mapQuestions = (questions: Question[]) =>
  questions.map((question) => {
    const titleComponent = (
      <Typography key={question.title} variant="h4">{question.title}</Typography>
    );

    const formComponents = question.fields
      .map((f) => ({...f, key: f["name"]}))
      .map((f) => mapFormComponents(f.type)(f));

    return [titleComponent, ...formComponents];
  });

const MakeTextInput: FormInputFactoryType = (props: BaseInputProps = {
  value: "",
  placeholder: "",
  label: "",
  options: []
}) => {
  return <TextInput {...(props as any)} />;
};

const makeFormGroupKeys = (questions: Question[]) =>
  questions.map((question) =>
    makeFormGroup(makeFormPairs(question.fields.map((field) => field.name))));

function formsFactory(data: { questions: Question[] }) {
  const {questions} = data;

  const formComponents = mapQuestions(questions).reduce((a, b) => [...a, ...b], []);

  const formGroup = makeFormGroupKeys(questions).reduce((a, b) => ({...a, ...b}), {});

  return {
    formGroup,
    formComponents
  };
}

const formBuilder = (data: { questions: Question[] }) => {
  const {formComponents, formGroup} = formsFactory(data);

  return (props: FormWrapperProps) => (
    <Formik onSubmit={props.onSubmit} initialValues={formGroup}>
      {({handleSubmit}): ReactNode => (
      <>
        <Form className={"form-wrapper"} onSubmit={handleSubmit} noValidate>
          {formComponents}
          <SubmitButton>{props.label}</SubmitButton>
        </Form>
      </>
      )}
    </Formik>
  );
};

export {formBuilder};
