export interface AudioPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    getCurrentPosition(): Promise<number>;
}

export class HTML5AudioPlayer implements AudioPlayer {
    htmlAudioElement: HTMLAudioElement;

    constructor(src: string) {
        this.htmlAudioElement = new Audio(src);
    }

    play(): void {
        this.htmlAudioElement.play();
    }

    pause(): void {
        this.htmlAudioElement.pause();
    }

    stop(): void {
        this.htmlAudioElement.pause();
        this.htmlAudioElement.currentTime = 0;
    }

    getCurrentPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.htmlAudioElement.currentTime);
        });
    }

}

import { Media, MediaObject } from '@ionic-native/media';
import { Observable } from 'rxjs';

export class IonicNativeAudioPlayer implements AudioPlayer {

    ionicMediaObj: MediaObject;

    constructor(src: string) {
        var prefix = "/android_asset/www/";
        if (window['device'].platform === "iPhone") {
            prefix = "";
        }
        this.ionicMediaObj = Media.create(prefix + src);
        console.log("Ionic media object: ", this.ionicMediaObj);
    }

    play(): void {
        this.ionicMediaObj.play();
    }

    pause(): void {
        this.ionicMediaObj.pause();
    }

    stop(): void {
        this.ionicMediaObj.stop();
    }

    getCurrentPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ionicMediaObj.getCurrentPosition().then((val) => {
                if (val >= 0) {
                    resolve(val);
                }
            });
        });
    }

}