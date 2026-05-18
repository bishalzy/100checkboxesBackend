import { CheckBox } from '../db/models.js';


const updateCheckbox = async (uniqueId, checked) => {
    try{
        const checkbox = await CheckBox.findOneAndUpdate({ uniqueId }, { checked }, { returnDocument: 'after' });
        return checkbox;
    } catch (error) {
        console.error('Error updating checkbox:', error);
        throw error;
    }
}

export default updateCheckbox;