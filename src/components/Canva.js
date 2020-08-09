import React, {Component} from 'react';
import Canvas, {ImageData} from 'react-native-canvas';

const IMAGE_SIZE = 28;
const SCALE = 3;
const SCALED_SIZE = IMAGE_SIZE * SCALE;
export default class Canva extends Component {
  componentDidUpdate() {
    this.renderCanvas();
  }

  componentDidMount() {
    const canvas = this.canvas;
    if (canvas) {
      this.renderCanvas();
    }
  }
  renderCanvas = async () => {
    if (this.canvas) {
      const imagePixels = this.props.imagePixels;
      const canvas = this.canvas;
      const ctx = await canvas.getContext('2d');
      ctx.fillRect(0, 0, SCALED_SIZE, SCALED_SIZE);
      let j = 0;
      ctx.getImageData(0, 0, SCALED_SIZE, SCALED_SIZE).then(imageData => {
        const data = Object.values(imageData.data);
        const length = Object.keys(data).length;
        for (var row = 0; row < IMAGE_SIZE; row++) {
          for (var col = 0; col < IMAGE_SIZE; col++) {
            var sourcePixel = [
              imagePixels[j],
              imagePixels[j],
              imagePixels[j],
              255,
            ];
            for (var y = 0; y < SCALE; y++) {
              var destRow = row * SCALE + y;
              for (var x = 0; x < SCALE; x++) {
                var destCol = col * SCALE + x;
                for (var i = 0; i < 4; i++) {
                  data[(destRow * SCALED_SIZE + destCol) * 4 + i] =
                    sourcePixel[i];
                }
              }
            }
            j += 1;
          }
        }
        const imgData = new ImageData(canvas, data, SCALED_SIZE, SCALED_SIZE);
        ctx.putImageData(imgData, 0, 0);
      });
    } else {
      console.log('No canvas?');
    }
  };
  render() {
    return <Canvas ref={canvas => (this.canvas = canvas)} />;
  }
}
