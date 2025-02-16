// import pkg from 'joi';

// const { object, string, ref } = require('joi');
// const Joi = require('joi');
import Joi from "joi";
// const { object, string, ref } = Joi;


export const createSampleSchema = Joi.object({
    title: Joi.string().required().label("Saranya"),
    description: Joi.string().optional(),
})
// const schema = object({
//     username: string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     password: string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     repeat_password: ref('password'),

//     access_token: [
//         string(),
//         number()
//     ],

//     birth_year: number()
//         .integer()
//         .min(1900)
//         .max(2013),

//     email: string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })
//     .with('username', 'birth_year')
//     .xor('password', 'access_token')
//     .with('password', 'repeat_password');


// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }


