import React from 'react'
import Schema from './schemas/error-schema.json'
import customSchema from './schemas/custom-error-schema.json'
import { SchemaForm } from '..'
import { mount } from 'enzyme'
import { getComponentTree, getByCSSSelector } from './test-utils'

describe('ErrorSchemaTests', () => {
    it('should check the error messages are triggered', () => {

        const data = {
            min1: 0,
            max10: 11,
            exclusiveMin1: 0,
            exclusiveMax10: 11,
            minLength: '',
            pattern: 'wrong',
            maxLength: 'maxlengthexceeded'
        }

        const form = mount(<SchemaForm schema={Schema} data={data}/>)
        let tree = getComponentTree(mount(<SchemaForm schema={Schema} data={data}/>))
       
        const submitButton = getByCSSSelector(form, 'button').last()
        submitButton.simulate('click')

        tree = getComponentTree(form)

        expect(['Field is required', 'Field must be at least 5 characters', 
        'Field must not exceed 5 characters',
         'Field does not match pattern (\\d[a-z]{3}\\.[A-Z]{3})', 
         'Value should be at least 1', 'Value should be at most 10',
         'Value should be greater than 1', 
         'Value should be lower than 10']).toEqual(tree.map((i) => i.errorText))
    })

    it('should check the error messages are not triggered', () => {
         
        const data = {
            requiredField: 'test',
            minLength: '12345',
            maxLength: '123ed',
            pattern: '5abc.ABC',
            min1: 1,
            max10: 10,
            exclusiveMin1: 2,
            exclusiveMax10: 9
        }

        const form = mount(<SchemaForm schema={Schema} data={data}/>)
        let tree = getComponentTree(form)
       
        const submitButton = getByCSSSelector(form, 'button').last()
        submitButton.simulate('click')

        tree = getComponentTree(form)

        expect([0, 0, 0, 0, 0, 0, 0, 0]).toEqual(tree.map((i) => i.errorText))
    })

    it('should check the error messages for edge cases', () => {
       
        const data = {
            requiredField: 'test',
            minLength: '1234',
            maxLength: '1234',
            pattern: '5abc.ABC',
            min1: 1,
            max10: 9,
            exclusiveMin1: 1,
            exclusiveMax10: 10
        }

        const form = mount(<SchemaForm schema={Schema} data={data}/>)
        let tree = getComponentTree(form)
       
        const submitButton = getByCSSSelector(form, 'button').last()
        submitButton.simulate('click')

        tree = getComponentTree(form)

        expect([0, 'Field must be at least 5 characters',
         0, 0, 0, 0, 'Value should be greater than 1', 
         'Value should be lower than 10']).toEqual(tree.map((i) => i.errorText))
    })
    
    it('should check custom errors', () => {

        const data = {
            min1: 0,
            max10: 11,
            exclusiveMin1: 0,
            exclusiveMax10: 11,
            minLength: '',
            pattern: 'wrong',
            maxLength: 'maxlengthexceeded',
            minItems: ['a'],
            unique: ['a', 'a']
        }
    
        const formatError = (err: any) => {
            err.message = `Keyword: ${err.keyword}`
            return err
        }

        const form = mount(<SchemaForm schema={customSchema} data={data} errorFormatter={formatError} />)
        let tree = getComponentTree(form)

        const submitButton = getByCSSSelector(form, 'button').last()
        submitButton.simulate('click')

        tree = getComponentTree(form)

        expect(['Keyword: required', 'Keyword: minLength', 
        'Keyword: maxLength',
         'Keyword: pattern', 
         'Keyword: minimum', 'Keyword: maximum',
         'Keyword: exclusiveMinimum', 
         'Keyword: exclusiveMaximum']).toEqual(tree.map((i) => i.errorText))

    })
})
