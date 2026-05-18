
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CheckBoxSchema = new Schema({
    uniqueId: {type:Number,required:true,unique:true},
    checked: {type:Boolean,required:true}
})

export const CheckBox = model('CheckBox',CheckBoxSchema)