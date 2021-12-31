import React, { useState } from 'react'
import EventNotification from '../EventNotification/EventNotification'
import { CarData } from '../../api/data-generator'
import Checkbox from '../Checkbox/Checkbox'

import './Notifications.styles.scss';

type Props = {
  carData: CarData[]
}
const Notifications = ({carData}: Props) => {
  const [isFilterByFuel, setIsFilterByFuel] = useState(false);
  return (
    <div className={'flex col container'}>
      <div className={'filter'}>
        <Checkbox onChange={(e: InputEvent) => setIsFilterByFuel((e.target as HTMLInputElement).checked)}>Filter events where fuel level is under 15%</Checkbox>
      </div>
      <div className={'list'}>
      {carData.map(item => {
        if(isFilterByFuel && item.fuel < 0.15) {
          return null;
        }
        return <EventNotification carEvent={item} key={item.timestamp} />
      })}
      </div>
    </div>
  )
}

export default Notifications
