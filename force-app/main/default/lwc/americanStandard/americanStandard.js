import { LightningElement , api} from 'lwc';

export default class AmericanStandard extends LightningElement {

    openModal = false;
    removeImage = true;
    /* pass below array to child */
    @api getImageList = [{id: 0, value: 'https://d3fk6rzgmc6ii4.cloudfront.net/Project/Sites/Lixil/shared/PROMO-Card/Grohe/Homepage/Turbo/Bathroom-Modern-1.jpg'}];

    handleCloseModal() {
        this.openModal = false;
    }

    handleEdit() {
        this.openModal = true;
    }

    handleSaveData(event) {
        /* get final array from child */
        let getImageList = event.detail;
        
        let updatedImageList = [];
        getImageList.forEach(image => {
            if (image.value !== '') {
                updatedImageList.push(image);
            }
        })

        /* assign final array empty if each value of an array is null or undefined */
        let eachValueFieldEmpty = getImageList.every(obj => Object.values(obj).every(value => value === null || value === undefined || value === ''));
        if (eachValueFieldEmpty) {
            getImageList = [];
            updatedImageList = getImageList;
        }

        this.getImageList = updatedImageList;
    }
}