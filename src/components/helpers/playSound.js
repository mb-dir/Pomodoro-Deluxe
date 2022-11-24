import { Howl } from "howler";

export default function playSound(
  soundUrl = "https://www.soundjay.com/phone/sounds/telephone-ring-03a.mp3"
) {
  ///https://github.com/goldfire/howler.js/
  const sound = new Howl({
    src: [ soundUrl ],
  });

  sound.play();
}
