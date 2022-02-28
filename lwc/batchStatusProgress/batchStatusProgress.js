/**
 * Created by Misi on 10/22/2021.
 */

import {api, LightningElement} from 'lwc';
import getBatchStatus from '@salesforce/apex/BatchStatusChecker.getBatchStatus';

export default class BatchStatusProgress extends LightningElement {

    @api jobId;
    @api label;
    @api timeout = 1000;
    progress = 0;
    requestId = Math.random();

    connectedCallback() {
        let id = window.setInterval(async () => {
            this.requestId = Math.random();
            let requestId = this.requestId;
            const batchStatus = await getBatchStatus({jobId: this.jobId});
            //console.log(`batchStatus`,JSON.parse(JSON.stringify(batchStatus)));
            if (requestId === this.requestId) {
                let progress = Math.round((batchStatus.JobItemsProcessed + batchStatus.NumberOfErrors) / batchStatus.TotalJobItems * 100);
                if (Number.isNaN(progress) === false) {
                    this.progress = progress;
                }
            }
            if (batchStatus.Status === 'Completed') {
                this.progress = 100;
                window.clearInterval(id);
                this.dispatchEvent(new CustomEvent('finish', {detail: {job: batchStatus}}));
            }
        }, this.timeout)
    }
}