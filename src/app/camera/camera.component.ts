import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  public constructor(private router: Router) {
  }

  @ViewChild('videoElement') videoElement: any;
  video: any;

  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('canvasElementCob') canvasElementCob: ElementRef;
  public context: CanvasRenderingContext2D;
  public contextCob: CanvasRenderingContext2D;

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }
  sound() {
    this.initCamera({ video: true, audio: true });
  }

  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }

  initCamera(config: any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

      console.log(browser);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.context = (<HTMLCanvasElement>this.canvasElement.nativeElement).getContext('2d');
      this.drawVideo(this.context, this.video, 320, 240);
      this.video.play();
    });
  }

  drawVideo(context, video, width, height) { 
    var ctxcob = this.contextCob = (<HTMLCanvasElement>this.canvasElementCob.nativeElement).getContext('2d');
    ctxcob.drawImage(video, 0, 0, width, height);
    var ctx = context
        
    var idataSrc = ctxcob.getImageData(0, 0, width, height), // original
      idataTrg = ctx.createImageData(width, height),    // empty data
      dataSrc = idataSrc.data,                              // reference the data itself
      dataTrg = idataTrg.data,
      len = dataSrc.length, i = 0, luma;

    for(var i=0; i < len; i += 4) {
      luma = dataSrc[i] * 0.2126 + dataSrc[i+1] * 0.7152 + dataSrc[i+2] * 0.0722;
      dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
      dataTrg[i+3] = dataSrc[i+3];
    }
    context.putImageData(idataTrg, 0, 0);

    //context.drawImage(video, 0, 0, width, height); // draws current video frame to canvas     
    var delay = 24;
    setTimeout (() => {
      this.drawVideo(this.context, this.video, width, height);
   }, delay);
  }

}
