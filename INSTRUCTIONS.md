This isn't designed to be difficult, it is designed to showcase coding style. Please take the time you need to complete it to a quality that you would be comfortable submitting for a code review (i.e. production ready).


Using React, create a simple one page form that takes its structure from the JSON config below. Normally the config would be read from a remote server but for this exercise you can mock a simple retrieval function which returns this hard coded JSON.

The application does not need to persist the data anywhere other than local state for this exercise. Include a simple README.md file with instructions on how to run the application and display the working form.

Sample form config:
{
"questions": [
{
"title": "Tell us about yourself",
"fields": [
{ "name": "first_name", "label": "First Name", "type": "text" },
{ "name": "last_name", "label": "Last Name", "type": "text" },
{ "name": "email", "label": "Email", "type": "text" },
{ "name": "phone_number", "label": "Phone Number", "type": "text" }
]
},
{
"title": "Where do you live?",
"fields": [
{ "name": "street_address", "label": "Street Address", "type": "text" },
{ "name": "post_code", "label": "Post Code", "type": "text" },
{ "name": "country", "label": "Country", "type": "dropdown", "options": ["Canada", "USA"] },
]
}
]
}

After reading the above config, the application should display a form with 2 questions, "Tell us about yourself" and "Where do you live". The first question should have 4 text input fields displayed underneath, the second should have 2 text input fields and 1 dropdown. All fields should use the name and label from the config (and in the case of dropdowns, the "options" field).

The application should be structured in such a way that you are able to add new questions and fields by updating only the config. To keep things simple assume there are only 2 types of field: text inputs and dropdowns.

At the end of the form include a button which prints the current application state of your application to the browser console. The output should look similar to the below:

firstName: "Lana",
lastName: "Kane",
country: "Canada",
email: "lana@example.com",
phoneNumber: "555-123-1111",
postCode: "V6B 1S5",
streetAddress: "123 Evergreen Drive"
