const keyboardSound = [
  new Audio("/Sound/keystroke1.mp3"),
  new Audio("/Sound/keystroke2.mp3"),
  new Audio("/Sound/keystroke3.mp3"),
  new Audio("/Sound/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomSound = () => {
    const random =
      keyboardSound[Math.floor(Math.random * keyboardSound.length)];

    random.currentTime = 0;
    random
      .play()
      .catch((error) => console.log("Error in playing sound", error));
  };

  return playRandomSound;
}

export default useKeyboardSound;
