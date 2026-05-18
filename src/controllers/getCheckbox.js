import { CheckBox } from '../db/models.js';


const getCheckbox = async (req, res) => {
    try {
        const checkbox = await CheckBox.find({});
        return res.json(checkbox);
    }catch (error) {
        console.error('Error fetching checkbox:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default getCheckbox;