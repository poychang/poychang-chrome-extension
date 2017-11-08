import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = `PoyChang's Chrome Extension`;

  click() {
    console.log('將此網站(http://www.cnblogs.com/artech/)的文章版面清乾淨 ;)');

    chrome.tabs.query({active: true, currentWindow: true}, tab => {
      chrome.tabs.executeScript(
          tab[0].id, {
            code: `
        document.getElementById('sideBar').remove();
        document.getElementById('myRewards').remove();
        document.getElementById('div_digg').remove();
        document.getElementsByClassName('forFlow')[0].style.marginLeft = 0;
        `
          },
          function(response) {});
    });
  }
}
