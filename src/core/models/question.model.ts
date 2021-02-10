interface QuestionFormFields {
  name: string;
  label: string;
  type: any;
  options?: string[] | undefined;
}

export interface Question {
  title: string;
  fields: QuestionFormFields[]
}
