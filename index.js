// Import stylesheets
import './style.css';

import liff from '@line/liff';

// Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

const body = document.getElementById('body');

const pictureUrl = document.getElementById('pictureUrl');
const userId = document.getElementById('userId');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');
const email = document.getElementById('email');

const btnShare = document.getElementById('btnShare');

const picURL = document.getElementById('picUrl');
const linkURL = document.getElementById('linkUrl');

async function main() {
  liff.ready.then(() => {
    if (liff.getOS() === 'android') {
    }
    body.style.background = '#888888';

    if (liff.isInClient()) {
      getUserProfile();
    }
    btnShare.style.display = 'block';
  });
  await liff.init({ liffId: '1660697603-900XX2BB' });
}

main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  // userId.innerHTML = '<b>userId: </b>' + profile.userId;
  displayName.innerHTML = '<b>Sender: </b>' + profile.displayName;
  // statusMessage.innerHTML = '<b>statusMessage: </b>' + profile.statusMessage;
  // email.innerHTML = '<b>email: </b>' + liff.getDecodedIDToken().email;
}

async function shareMsg() {
  const result = await liff.shareTargetPicker([
    {
      type: 'flex',
      altText: 'Share Image',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          url: picURL.value,
          size: 'full',
          aspectRatio: '20:30',
          aspectMode: 'cover',
          action: {
            type: 'uri',
            uri: linkURL.value,
          },
          position: 'relative',
        },
      },
    },
  ]);
  if (result) {
    alert('Msg was shared!');
  } else {
    alert('Msg was cancelled by user!');
  }
  liff.closeWindow();
}

btnShare.onclick = () => {
  shareMsg();
};
