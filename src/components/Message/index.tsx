import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export default class Message {
  private static readonly MessageContainerID = 'message-container';

  private static init() {
    if (document.getElementById(this.MessageContainerID)) { return; }

    const messageContainer = document.createElement('div');
    messageContainer.id = this.MessageContainerID;
    messageContainer.className = 'fixed top-0 right-0 left-0 h-0 text-center';
    document.body.appendChild(messageContainer);
  }

  public static success(message: string, time = 3) {
    this.init();
    const messageContainer = document.getElementById(this.MessageContainerID);
    if (!messageContainer) { return; }

    const messageEle = document.createElement('div');
    messageEle.style.display = 'inline-block';
    messageEle.innerHTML = renderToStaticMarkup(<>{message}</>);
    const br = document.createElement('br');

    messageContainer.appendChild(messageEle);
    messageContainer.appendChild(br);
    setTimeout(() => {
      messageContainer.removeChild(messageEle);
      messageContainer.removeChild(br);
    }, time * 1000);
  }
}
