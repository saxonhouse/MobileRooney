function rooneyRater(volume, length) {
    function volumeScale(volume) {
      if (volume < -35) {
        volume = -35
      }
      else if (volume > -5) {
        volume = -5
      }
      volume += 35;
      volume /= 6;
      return volume;
    }

    function lengthScale(length) {
      if (length > 13) {
      length = 13
      }
      length /= 2.6
      return length;
    }

    let volumeFive = volumeScale(volume);
    let lengthFive = lengthScale(length);
    let score = (volumeFive + lengthFive) / 2
    return score;
}

export default rooneyRater
