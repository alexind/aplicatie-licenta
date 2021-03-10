import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

declare var $: any;

@Injectable({
    providedIn: 'root'
})

export class NotificationsService {
    constructor(
        public firestore: AngularFirestore,
        private router: Router
    ) {
    }

    showNotification(message, from, align, type) {
        // type can be ['', 'info', 'success', 'warning', 'danger'];
        $.notify({
            icon: "pe-7s-bell",
            message: message
        }, {
            type: type,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }
}


