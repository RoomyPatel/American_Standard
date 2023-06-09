import { LightningElement, api } from 'lwc';
import IMAGE from '@salesforce/resourceUrl/image';

export default class Videos extends LightningElement {
    imageUrl = IMAGE + '/image/waterTap.jpg';
    openModal = false;
    removeVideo = true;
    videoUrl = 'https://www.youtube.com/embed/JfJYHfrOGgQ';

    /* pass below array to child */
    @api getVideoList = [{ id: 0, value: this.videoUrl}];
    

    handleCloseModal() {
        this.openModal = false;
    }

    handleEdit() {
        this.openModal = true;
    }

    handleSaveData(event) {
        /* get final array from child */
        let getVideoList = event.detail;
        let updatedVideoList = [];

        getVideoList.forEach(video => {
            if (video.value !== '') {
                let videoValue = video.value;
                /* to display and play video properly, change URL with embed format*/
                if (videoValue.includes('/watch?v=')) {
                    let res = videoValue.split('=');
                    let embeddedUrl = "https://www.youtube.com/embed/" + res[1];
                    video.value = embeddedUrl;
                }
                updatedVideoList.push(video);
            }
        })


        /* assign final array empty if each value of an array is null or undefined */
        let eachValueFieldEmpty = getVideoList.every(obj => Object.values(obj).every(value => value === null || value === undefined || value === ''));
        if (eachValueFieldEmpty) {
            getVideoList = [];
            updatedVideoList = getVideoList;
        }

        this.getVideoList = updatedVideoList;
        
    }
}