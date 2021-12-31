import React, { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Checkbox from '../Checkbox/Checkbox'

import './SidePanel.styles.scss'

type Props = {
  onNewVIN: (vin: string) => void
  onVINCheck: (vin: string, checked: boolean) => void
  VINs: string[]
}
const VIN_LENGTH = 17
const SidePanel = ({ onNewVIN, onVINCheck, VINs }: Props) => {
  const [inputVal, setInputVal] = useState('')
  const [error, setError] = useState('')
  const handleNewVIN = () => {
    if (inputVal.length === VIN_LENGTH) {
      onNewVIN(inputVal)
      setInputVal('')
    }
  }
  return (
    <div>
      <div className={'flex'}>
        <div className='flex col'>
          <Input value={inputVal}
                 pattern='[A-Z0-9]{17}'
                 minlength={VIN_LENGTH}
                 maxlength={VIN_LENGTH}
                 onChange={(ev: InputEvent) => {
                   setError((ev.target as HTMLInputElement).validationMessage)
                   setInputVal((ev.target as HTMLInputElement).value)
                 }}
                 placeholder={'Type VIN 17 '} />
          <span className={'error'}>{error ? '17 Chars uppercase alphanumeric' : null}</span>
        </div>
        <Button onClick={handleNewVIN}>Add</Button>
      </div>
      <div className={'flex col checkboxes'}>
        {VINs.map(vin =>
          <Checkbox key={vin}
                    onChange={(e: InputEvent) => {
                      onVINCheck(vin, (e.target as HTMLInputElement).checked)
                    }} defaultChecked={true}>{vin}
          </Checkbox>)}
      </div>
    </div>
  )
}

export default SidePanel
