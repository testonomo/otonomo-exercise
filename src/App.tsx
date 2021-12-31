import './App.css'
import React from 'react'
import SidePanel from './components/SidePanel/SidePanel'
import Notifications from './components/Notifications/Notfications'
import { useManageVINs } from './useManageVins'


const App = () => {
  const { carData, handleNewVIN, handleVINCheck, VINs } = useManageVINs();
  return (
    <div className='App flex'>
      <SidePanel onNewVIN={handleNewVIN} onVINCheck={handleVINCheck} VINs={VINs} />
      <Notifications carData={carData} />
    </div>
  )
}

export default App
