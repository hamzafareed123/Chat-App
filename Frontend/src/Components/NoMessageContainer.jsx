import React from 'react'
import { MessageCircle } from 'lucide-react'

const NoMessageContainer = () => {
  return (
    <div className='w-full h-full flex items-center justify-center '>
      <div className='flex flex-col items-center justify-center gap-3 text-gray-400'>
         <MessageCircle className="w-12 h-12 text-gray-400" />

        <h3 className="text-lg font-semibold text-gray-300">
          Select a Conversation
        </h3>

        <p className="text-sm">
          Choose a contact to start chatting
        </p>
      </div>
    </div>
  )
}

export default NoMessageContainer