import ajv, { LimitParams, PatternParams, ComparisonParams } from 'ajv'

export interface Formatter {
    [key: string]: Function
}

const formatters: Formatter = {
    'required': (error: ajv.ErrorObject) => {
        return 'Field is required'
    },
    'minLength': (error: ajv.ErrorObject) => {
        const params: LimitParams = error.params as LimitParams;
        return `Field must be at least ${params.limit} characters`
    },
    'maxLength': (error: ajv.ErrorObject) => {
        const params: LimitParams = error.params as LimitParams;
        return `Field must not exceed ${params.limit} characters`
    },
    'pattern': (error: ajv.ErrorObject) => {
        const params: PatternParams = error.params as PatternParams;
        return `Field does not match pattern (${params.pattern})`
    },
    'minimum': (error: ajv.ErrorObject) => {
        const params: ComparisonParams = error.params as ComparisonParams;
        return `Value should be at least ${params.limit}`
    },
    'maximum': (error: ajv.ErrorObject) => {
        const params: ComparisonParams = error.params as ComparisonParams;
        return `Value should be at most ${params.limit}`
    },
    'exclusiveMinimum': (error: ajv.ErrorObject) => {
        const params: ComparisonParams = error.params as ComparisonParams;
        return `Value should be greater than ${params.limit}`
    },
    'exclusiveMaximum': (error: ajv.ErrorObject) => {
        const params: ComparisonParams = error.params as ComparisonParams;
        return `Value should be lower than ${params.limit}`
    },
    'minItems': (error: ajv.ErrorObject) => {
        const params: LimitParams = error.params as LimitParams;
        return `Should not have fewer than ${params.limit} items`
    },
    'uniqueItems': (error: ajv.ErrorObject) => {
        return 'Should not contain duplicate items'
    }
}

export default function formatErrors(errors: ajv.ErrorObject[], customFn: Function | null): ajv.ErrorObject[] {

    if (errors) {
        errors.forEach((error: ajv.ErrorObject) => {
            if (customFn) {
                customFn(error)
            } else {
                const { keyword } = error;
                const formatter: Function = formatters[keyword];
                if (formatter) {
                    error.message = formatter(error);
                }
            }
        })
    }

    return errors
}