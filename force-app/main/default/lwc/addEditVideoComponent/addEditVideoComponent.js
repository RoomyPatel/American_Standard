import { LightningElement } from 'lwc';
import IMAGE from '@salesforce/resourceUrl/image';

export default class AddEditVideoComponent extends LightningElement {

    /* local video file from static resource */
    video = IMAGE + '/image/movie.mp4';
}