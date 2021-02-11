import React from 'react';
import {render, screen} from '@testing-library/react';

import {
  labelToId,
  makeFormPair,
  makeFormPairs,
  makeFormGroup,
  mapFormComponents,
  mapQuestions,
  makeFormGroupKeys,
  formsFactory,
  MakeTextInput,
  MakeSelectBox
} from '../forms';

import testData from '../__test_data__/forms-test-data';

describe('Test forms module', () => {
  test('Test labelToId', () => {
    const result = labelToId('Sample Field');
    expect(result).toBe('sample_field');
  });

  test('Test makeFormPair', () => {
    const result = makeFormPair(labelToId('Sample Field'));
    expect(result).toEqual({ sample_field: '' });
  });

  test('Test makeFormPairs', () => {
    const questionFields = testData.questions[0].fields;
    const result = makeFormPairs(questionFields.map((field) => field.name));
    expect(result).toEqual([
      { first_name: '' },
      { last_name: '' },
      { email: '' },
      { phone_number: '' }
    ]);
  });

  test('Test makeFormGroup', () => {
    const questionFields = testData.questions[0].fields;
    const result = makeFormGroup(makeFormPairs(questionFields.map((field) => field.name)));
    expect(result).toEqual({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    });
  });

  test('Test mapFormComponents', () => {
    const mapTextInput = mapFormComponents('text');
    const mapDropdown = mapFormComponents('dropdown');
    expect(mapTextInput).toEqual(MakeTextInput);
    expect(mapDropdown).toEqual(MakeSelectBox);
  });

  test('Test makeFormGroupKeys', () => {
    const result = makeFormGroupKeys(testData.questions);
    expect(result).toEqual([
      { first_name: '', last_name: '', email: '', phone_number: '' },
      { street_address: '', post_code: '', country: '' }
    ]);
  });

  test('Test formsFactory', () => {
    const result = formsFactory(testData);
    expect(result.formGroup).toBeDefined();
    expect(result.formComponents).toBeDefined();
    expect(result.formGroup).toEqual({
      first_name: '', last_name: '', email: '', phone_number: '',
      street_address: '', post_code: '', country: ''
    });
    // Should be 9 entries long, including question headings
    expect(result.formComponents.length).toEqual(9);
  });
});

