import React from 'react'
import createCarStreamer from './api/car-data-streamer'
import { Streamer } from './api/streamer'
import { CarData } from './api/data-generator'
type StreamersMap = Record<string, Streamer>

export const useManageVINs = () => {
  const [carData, setCarData] = React.useState<CarData[]>([]);
  const [streamersByVIN, setStreamersByVIN] = React.useState<StreamersMap>({})
  const handleNewVIN = React.useCallback((VIN) => {
      if(streamersByVIN[VIN]) {
        return;
      }
      const carStreamer = createCarStreamer(VIN);
      carStreamer.subscribe((data) => setCarData(prev => [...prev, data]));
      carStreamer.start();
      setStreamersByVIN(prev => {
          return {
            ...prev,
            [VIN]: carStreamer,
          }
        },
      )
    }
    , []);

  const handleVINCheck = React.useCallback((VIN: string, checked: boolean) => {
    if (checked) {
      streamersByVIN[VIN]?.start();
    } else {
      streamersByVIN[VIN]?.stop();
    }
  }, [streamersByVIN]);

  return { carData, handleVINCheck, handleNewVIN, VINs: Object.keys(streamersByVIN) }
}
