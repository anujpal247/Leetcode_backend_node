import Docker from 'dockerode';
import { CPP_IMAGE, JAVA_IMAGE, PYTHON_IMAGE } from '../constants';
import logger from '../../config/logger.config';


export async function pullImage(image: string) {
  const docker = new Docker();

  return new Promise((resolve, reject) => {
    docker.pull(image, (err: Error, stream: NodeJS.ReadableStream) => {
      if (err) return err;

      docker.modem.followProgress(
        stream,
        function onFinished(finalErr, output){
          if (finalErr) return reject(finalErr);
          resolve(output);
        },
        function onProgress(event){
          console.log(event.status);
        }
      )
    })
  })
}

export async function pullAllImages() {
  const images = [PYTHON_IMAGE, CPP_IMAGE, JAVA_IMAGE];

  const promises = images.map(image => pullImage(image));

  try {
    await Promise.all(promises);
    logger.info("Images pulled successfully");
  } catch (error) {
    logger.error("Error pulling images", error);
  }
}