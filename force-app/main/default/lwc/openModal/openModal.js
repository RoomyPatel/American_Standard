import { LightningElement , api  } from 'lwc';

export default class OpenModal extends LightningElement {

    updatedItem = {}; 
    displayVideos = true;
    /* get below array from parent */
    @api fields;

    hideModalBox() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleInputChange(event) {

        let id = event.target.dataset.id;
        let value = event.target.value;
        let fields = JSON.parse(JSON.stringify(this.fields));
        
        let updatedArr = [];
        fields.forEach(field => {
            /* update value of input field in an array based on condition */
            if (field.id == id) {
                field.value = value;
            }
            updatedArr.push(field);

        })
        
        this.fields = updatedArr;
    }

    handleAdd() {

        /* create randomId and add new multiple input fields in an existing array
        based on randomId */
        let randomId = new Date().getTime();
        let newInputField = { id: randomId, value: '' };
        this.fields = [...this.fields, newInputField];
        
        /* get values to the corresponding ids */ 
        let fields = this.fields;
        fields.forEach(field => {
            this.updatedItem[field.id] = field.value;
        });

        /* convert above object of id , value into array of key-value pair */
        let keyValueImageList = Object.entries(this.updatedItem).map(([key,value]) => ({id: key, value }));
        this.fields = JSON.parse(JSON.stringify(keyValueImageList));
    }

    handleDelete(event) {
        let fields = this.fields;

        /* delete input fields based on filter fields with condition */
        let updatedArr = fields.filter(field => {
            let currentId = event.target.dataset.id;
            if (field.id !== currentId) {
                /* by below condition we can delete default input field */
                if (fields.length === 1) {
                    return field = null;
                }
                return field;
            }
        });
        this.fields = updatedArr;
    }

    handleSave() {
        let fields = this.fields;
        /* pass above array to parent */
        let saveEvent = new CustomEvent('save', { detail: fields });
        this.dispatchEvent(saveEvent);
        this.dispatchEvent(new CustomEvent('close'));
    }
}