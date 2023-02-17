import React from 'react'
import dbRef , {useName} from './server/firebase';

const meetClone = () => {
  return (
    <div>
      {useName}
    </div>
  )
}

export default meetClone
